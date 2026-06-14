#!/usr/bin/env python3
"""
whois_mass_check.py — rate-limit-aware mass domain availability scanner.

Finds AVAILABLE (registerable at base price) short domains by querying the
authoritative RDAP service for each TLD (the modern, IETF-standard replacement
for port-43 whois), with an optional raw-whois fallback.

Availability signal:
    HTTP 404 from a registry RDAP server  -> AVAILABLE (not registered)
    HTTP 200                              -> REGISTERED
    HTTP 429 / 503                        -> rate limited (auto backoff + retry)
    other                                 -> UNKNOWN (logged, not counted)

Two candidate categories (the user's priorities):
    sense    : pronounceable / brandable 4-letter strings ("make sense")
    nonsense : random 4-letter strings ("make no sense", second priority)

IMPORTANT about "under base price":
    RDAP/whois only tell you registered vs. not registered. They do NOT return
    price. Many short names that are technically unregistered are flagged
    "premium" by the registry and cost far more than the base renewal price.
    This script therefore checks the GoDaddy availability API (optional, needs a
    free API key) to read the actual price and filter to <= --max-price. Without
    a key it reports availability only and you confirm price at checkout.

Network note:
    Requires real outbound HTTPS (port 443) to registry RDAP hosts. Restricted
    CI / sandbox environments often block this — run it on a normal machine.

Usage examples:
    # 200 brandable 4-letter names across .io/.co/.xyz/.dev, ~1 req/sec
    python3 whois_mass_check.py --tlds io co xyz dev --category sense \
        --count 200 --rps 1 --out available.csv

    # nonsense fallback set, raw whois fallback enabled
    python3 whois_mass_check.py --tlds io --category nonsense --count 500 \
        --whois-fallback

    # price-filtered (needs GODADDY_KEY / GODADDY_SECRET env vars)
    python3 whois_mass_check.py --tlds com io co --category sense \
        --count 300 --max-price 25
"""

import argparse
import csv
import itertools
import json
import os
import random
import socket
import ssl
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict
from datetime import datetime, timezone

# --------------------------------------------------------------------------- #
# Authoritative RDAP endpoints per TLD. {name} is replaced with the full domain.
# Pulled from the IANA RDAP bootstrap registry (dns.json). Add more as needed.
# Anything not listed falls back to the rdap.org bootstrap redirector.
# --------------------------------------------------------------------------- #
RDAP_ENDPOINTS = {
    "com":  "https://rdap.verisign.com/com/v1/domain/{name}",
    "net":  "https://rdap.verisign.com/net/v1/domain/{name}",
    "org":  "https://rdap.publicinterestregistry.org/rdap/domain/{name}",
    "io":   "https://rdap.identitydigital.services/rdap/domain/{name}",
    "sh":   "https://rdap.identitydigital.services/rdap/domain/{name}",
    "ac":   "https://rdap.identitydigital.services/rdap/domain/{name}",
    "co":   "https://rdap.nic.co/domain/{name}",
    "dev":  "https://www.registry.google/rdap/domain/{name}",
    "app":  "https://www.registry.google/rdap/domain/{name}",
    "page": "https://www.registry.google/rdap/domain/{name}",
    "xyz":  "https://rdap.centralnic.com/xyz/domain/{name}",
    "site": "https://rdap.centralnic.com/site/domain/{name}",
    "online": "https://rdap.centralnic.com/online/domain/{name}",
    "tech": "https://rdap.centralnic.com/tech/domain/{name}",
    "me":   "https://rdap.nic.me/domain/{name}",
    "info": "https://rdap.identitydigital.services/rdap/domain/{name}",
}
RDAP_BOOTSTRAP = "https://rdap.org/domain/{name}"

# Raw whois (port 43) servers for the fallback path.
WHOIS_SERVERS = {
    "com": "whois.verisign-grs.com", "net": "whois.verisign-grs.com",
    "org": "whois.pir.org", "io": "whois.nic.io", "sh": "whois.nic.sh",
    "ac": "whois.nic.ac", "co": "whois.nic.co", "dev": "whois.nic.google",
    "app": "whois.nic.google", "page": "whois.nic.google",
    "xyz": "whois.nic.xyz", "me": "whois.nic.me", "info": "whois.afilias.net",
    "site": "whois.nic.site", "online": "whois.nic.online", "tech": "whois.nic.tech",
}
# Strings that indicate "not registered" in raw whois output (registry-dependent).
WHOIS_FREE_MARKERS = (
    "no match", "not found", "no data found", "no entries found",
    "domain not found", "status: available", "is available",
)

HEADERS = {
    "User-Agent": "whois-mass-check/1.0 (+domain-availability scanner)",
    "Accept": "application/rdap+json, application/json;q=0.9, */*;q=0.1",
}

VOWELS = "aeiou"
CONSONANTS = "bcdfghjklmnpqrstvwxyz"


# --------------------------------------------------------------------------- #
# Candidate generation
# --------------------------------------------------------------------------- #
def gen_sense(count, seed=None):
    """Pronounceable / brandable 4-letter strings: CVCV, CVVC, CCVC patterns."""
    rnd = random.Random(seed)
    patterns = ["CVCV", "CVCC", "CCVC", "CVVC", "VCCV"]
    seen, out = set(), []
    guard = 0
    while len(out) < count and guard < count * 200:
        guard += 1
        pat = rnd.choice(patterns)
        s = "".join(rnd.choice(VOWELS) if c == "V" else rnd.choice(CONSONANTS) for c in pat)
        if s not in seen:
            seen.add(s)
            out.append(s)
    return out


def gen_nonsense(count, seed=None):
    """Random 4-letter strings, no pronounceability constraint."""
    rnd = random.Random(seed)
    seen, out = set(), []
    guard = 0
    while len(out) < count and guard < count * 200:
        guard += 1
        s = "".join(rnd.choice("abcdefghijklmnopqrstuvwxyz") for _ in range(4))
        if s not in seen:
            seen.add(s)
            out.append(s)
    return out


def gen_all(seed=None):
    """All 456,976 four-letter combinations (use with care + heavy rate limits)."""
    for combo in itertools.product("abcdefghijklmnopqrstuvwxyz", repeat=4):
        yield "".join(combo)


# --------------------------------------------------------------------------- #
# Per-registry token-bucket rate limiter (keyed by RDAP host)
# --------------------------------------------------------------------------- #
class RateLimiter:
    def __init__(self, rps):
        self.min_interval = 1.0 / rps if rps > 0 else 0.0
        self.last = defaultdict(float)

    def wait(self, key):
        now = time.monotonic()
        delta = now - self.last[key]
        if delta < self.min_interval:
            # small jitter so we never march in lockstep against the registry
            time.sleep(self.min_interval - delta + random.uniform(0, 0.05))
        self.last[key] = time.monotonic()


# --------------------------------------------------------------------------- #
# Lookups
# --------------------------------------------------------------------------- #
_SSL = ssl.create_default_context()


def rdap_check(domain, tld, ctx, max_retries=4):
    """Return (status, http_code). status in AVAILABLE/REGISTERED/UNKNOWN."""
    url = RDAP_ENDPOINTS.get(tld, RDAP_BOOTSTRAP).format(name=domain)
    backoff = 2.0
    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=15, context=ctx) as r:
                return "REGISTERED", r.status
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return "AVAILABLE", 404
            if e.code in (429, 503):
                retry_after = e.headers.get("Retry-After")
                wait = float(retry_after) if (retry_after and retry_after.isdigit()) else backoff
                time.sleep(wait)
                backoff *= 2
                continue
            return "UNKNOWN", e.code
        except (urllib.error.URLError, socket.timeout, TimeoutError) as e:
            time.sleep(backoff)
            backoff *= 2
            continue
    return "UNKNOWN", -1


def whois_check(domain, tld, max_retries=3):
    """Raw port-43 whois fallback. Returns (status, code-or-note)."""
    server = WHOIS_SERVERS.get(tld)
    if not server:
        return "UNKNOWN", "no-whois-server"
    backoff = 2.0
    for _ in range(max_retries):
        try:
            with socket.create_connection((server, 43), timeout=15) as s:
                s.sendall((domain + "\r\n").encode())
                chunks = []
                while True:
                    b = s.recv(4096)
                    if not b:
                        break
                    chunks.append(b)
            text = b"".join(chunks).decode("utf-8", "ignore").lower()
            if any(m in text for m in WHOIS_FREE_MARKERS):
                return "AVAILABLE", "whois"
            return "REGISTERED", "whois"
        except (socket.timeout, OSError):
            time.sleep(backoff)
            backoff *= 2
    return "UNKNOWN", "whois-error"


def godaddy_price(domain, key, secret, ctx):
    """Return (available_bool, price_float_or_None) via GoDaddy API, or (None,None)."""
    url = "https://api.godaddy.com/v1/domains/available?" + urllib.parse.urlencode(
        {"domain": domain, "checkType": "FULL"}
    )
    req = urllib.request.Request(url, headers={
        "Authorization": f"sso-key {key}:{secret}", "Accept": "application/json",
    })
    try:
        with urllib.request.urlopen(req, timeout=15, context=ctx) as r:
            data = json.loads(r.read())
        price = data.get("price")
        # GoDaddy returns price in micro-units (e.g. 11990000 == $11.99)
        price = (price / 1_000_000) if isinstance(price, (int, float)) else None
        return bool(data.get("available")), price
    except Exception:
        return None, None


# --------------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------------- #
def load_done(path):
    done = set()
    if path and os.path.exists(path):
        with open(path, newline="") as f:
            for row in csv.DictReader(f):
                done.add(row["domain"])
    return done


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--tlds", nargs="+", default=["io", "co", "xyz"],
                    help="TLDs to check (no dot). Default: io co xyz")
    ap.add_argument("--category", choices=["sense", "nonsense", "all"], default="sense")
    ap.add_argument("--count", type=int, default=100,
                    help="How many candidate labels to generate (ignored for 'all')")
    ap.add_argument("--length", type=int, default=4, help="(informational; generators are 4-letter)")
    ap.add_argument("--rps", type=float, default=1.0, help="Max requests/sec PER registry host")
    ap.add_argument("--max-price", type=float, default=None,
                    help="Only keep names <= this price (needs GoDaddy API key)")
    ap.add_argument("--whois-fallback", action="store_true",
                    help="Use raw port-43 whois when RDAP returns UNKNOWN")
    ap.add_argument("--out", default="available_domains.csv")
    ap.add_argument("--seed", type=int, default=None)
    ap.add_argument("--resume", action="store_true", help="Skip domains already in --out")
    args = ap.parse_args()

    if args.category == "sense":
        labels = gen_sense(args.count, args.seed)
    elif args.category == "nonsense":
        labels = gen_nonsense(args.count, args.seed)
    else:
        labels = list(gen_all(args.seed))

    gd_key, gd_secret = os.environ.get("GODADDY_KEY"), os.environ.get("GODADDY_SECRET")
    if args.max_price is not None and not (gd_key and gd_secret):
        print("WARN: --max-price set but GODADDY_KEY/GODADDY_SECRET not in env; "
              "price filter disabled, reporting availability only.", file=sys.stderr)

    done = load_done(args.out) if args.resume else set()
    limiter = RateLimiter(args.rps)

    # rate-limit key = registry host (so different TLDs on same registry share a bucket)
    def reg_key(tld):
        ep = RDAP_ENDPOINTS.get(tld, RDAP_BOOTSTRAP)
        return urllib.parse.urlparse(ep).netloc or "bootstrap"

    fieldnames = ["domain", "tld", "category", "status", "code", "price", "checked_at"]
    new_file = not os.path.exists(args.out)
    fout = open(args.out, "a", newline="")
    writer = csv.DictWriter(fout, fieldnames=fieldnames)
    if new_file:
        writer.writeheader()

    total = len(labels) * len(args.tlds)
    n = avail = 0
    found = []
    try:
        for label in labels:
            for tld in args.tlds:
                domain = f"{label}.{tld}"
                n += 1
                if domain in done:
                    continue
                limiter.wait(reg_key(tld))
                status, code = rdap_check(domain, tld, _SSL)
                if status == "UNKNOWN" and args.whois_fallback:
                    status, code = whois_check(domain, tld)

                price = None
                if status == "AVAILABLE" and gd_key and gd_secret:
                    limiter.wait("godaddy")
                    gd_avail, price = godaddy_price(domain, gd_key, gd_secret, _SSL)
                    if gd_avail is False:
                        status = "REGISTERED"  # registry premium/registered per GoDaddy
                    if (args.max_price is not None and price is not None
                            and price > args.max_price):
                        status = "OVER_BUDGET"

                row = {"domain": domain, "tld": tld, "category": args.category,
                       "status": status, "code": code,
                       "price": ("%.2f" % price) if price is not None else "",
                       "checked_at": datetime.now(timezone.utc).isoformat(timespec="seconds")}

                if status == "AVAILABLE":
                    avail += 1
                    found.append((domain, price))
                    writer.writerow(row)
                    fout.flush()
                    pr = f"  ${price:.2f}" if price is not None else ""
                    print(f"[AVAILABLE] {domain}{pr}")

                if n % 25 == 0:
                    print(f"... {n}/{total} checked, {avail} available so far",
                          file=sys.stderr)
    except KeyboardInterrupt:
        print("\nInterrupted — partial results saved.", file=sys.stderr)
    finally:
        fout.close()

    print(f"\nDone. Checked {n} domains, found {avail} AVAILABLE.")
    print(f"Results written to {args.out}")
    if found:
        print("\nAvailable:")
        for d, p in sorted(found):
            print(f"  {d}" + (f"  (${p:.2f})" if p is not None else ""))


if __name__ == "__main__":
    main()

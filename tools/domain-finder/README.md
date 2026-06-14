# Domain availability mass-checker (`whois_mass_check.py`)

Rate-limit-aware scanner that finds **available (registerable) short domains** by
querying each TLD's authoritative **RDAP** service — the IETF-standard, modern
replacement for port-43 `whois` — with an optional raw-`whois` fallback.

Stdlib only. No `pip install`. Just `python3`.

## What it does

- Generates 4-letter candidate labels in two categories:
  - **`sense`** — pronounceable/brandable (CVCV, CCVC, … patterns). *Primary priority.*
  - **`nonsense`** — random 4-letter strings. *Second priority.*
  - (`all` enumerates every 456,976 combination — use only with heavy rate limits.)
- Checks each `label.tld` against the registry RDAP endpoint:
  - `404` → **AVAILABLE**, `200` → **REGISTERED**, `429/503` → auto-backoff + retry.
- Respects a **per-registry** request rate (`--rps`) using a token bucket keyed by
  RDAP host, with jitter — so you never trip a registry's rate limit.
- Optionally reads the **real price** via the GoDaddy API and filters to
  `--max-price` (this is how you enforce "under base price" — RDAP/whois alone do
  **not** expose price).
- Writes AVAILABLE hits to CSV (with `--resume` to continue an interrupted run).

## Usage

```bash
# 200 brandable 4-letter names across .io/.co/.xyz/.dev at ~1 req/sec per registry
python3 whois_mass_check.py --tlds io co xyz dev --category sense \
    --count 200 --rps 1 --out available.csv

# nonsense fallback set with raw-whois fallback enabled
python3 whois_mass_check.py --tlds io --category nonsense --count 500 --whois-fallback

# price-filtered to base price (needs a free GoDaddy API key)
export GODADDY_KEY=...   GODADDY_SECRET=...
python3 whois_mass_check.py --tlds com io co --category sense --count 300 --max-price 25
```

Key flags: `--tlds`, `--category {sense,nonsense,all}`, `--count`, `--rps`
(per-registry), `--max-price`, `--whois-fallback`, `--out`, `--resume`, `--seed`.

## Rate limits / being a good citizen

`--rps` is enforced **per registry host**, so two TLDs on the same backend share
the budget. Defaults to 1 req/sec — safe for essentially every registry. For big
runs keep it at 0.5–1 and let it take its time; the limiter adds jitter and
honors `Retry-After` on 429/503.

## Important realities

1. **All 4-letter `.com` are gone.** Every one of the 456,976 four-letter `.com`
   combinations has been registered for over a decade. A fresh-registration scan
   of `.com` 4-letter names returns **zero** — they only exist on the aftermarket
   (Sedo/Afternic/Dan), not at base price. Scan newer TLDs (`.io .co .xyz .dev
   .app .site …`) for base-price 4-letter availability.
2. **"Available" ≠ "base price."** Registries flag many short/brandable names as
   **premium** (e.g. $100–$10,000/yr) even though they're unregistered. RDAP and
   whois return registered-vs-not only — **not** price. Use `--max-price` with a
   GoDaddy API key, or confirm the price at a registrar's checkout.
3. **Needs real outbound network.** It must reach registry RDAP hosts on port
   443. Locked-down CI/sandbox environments (including the one this repo's web
   sessions run in) block that, so **run this on a normal machine / server.**

## Output

`available_domains.csv` columns:
`domain, tld, category, status, code, price, checked_at`

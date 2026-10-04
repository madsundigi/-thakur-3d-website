# Requests from stage w1-cat (Wave 1, `/ludhiana/cat-grooming/`)

Needs in files this stage does not own. Decisions behind each item: `website-plan/decisions/w1-cat.md`; what was built:
`blueprints/cat-grooming.md` §7. Each item names its owner.

## A · Integrator

| # | Request | Why |
|---|---|---|
| A-1 | When `/ludhiana/cat-grooming/` merges, flip its route to `status: 'live'` in `src/data/routes.ts` and add `'/ludhiana/cat-grooming/': '2026-10-03'` (its last material content edit) to `LASTMOD` in `src/data/lastmod.ts`, in the same commit | The build stops on a live route without a date (04 §7.1, E7); `check:pages --all` P127 needs it for the sitemap; the page's "Last updated" line (02 P143, template SP-11) renders only once the path has a date |
| A-2 | In the integrated `--all` run, resolve this page's two P074 WARNs — links to live Wave-1 routes built by other stages: `/ludhiana/dog-walking/` (footer nav) and `/ludhiana/vet-at-home/` (FAQ #5 + footer nav). Inbound P068 links to `/ludhiana/cat-grooming/` come from the home services grid (H-3), `/pricing/`, the header/footer nav and SP-11 of the dog-grooming page | P074 / P068 are launch-blockers; they can only be checked with every page built |
| A-3 | FYI (chrome / global CSS owner): the page's CSS is 50,423 B of the 51,200 B budget (`check:budgets`, 777 B of headroom), and in the same build `/ludhiana/dog-grooming/` is 50,734 B (466 B of headroom) against 48,029 B at w1-layout — the ~2.7 KB growth is in the shared stylesheet, not in the pages. The next global style addition will tip a money page over; the per-page scoped components are small (this page's three together are smaller than the dog page's) | 08 §8 budget; `check:budgets` is a FAIL once a page passes 51,200 B |

## B · Data (`src/data/*`, `src/lib/pricing.ts` owner)

| # | File | Request | Why |
|---|---|---|---|
| B-1 | `src/data/people.ts` | When a groomer is hired, add their cat speciality for this page's SP-7 cards — `specialityOn: { 'cat-grooming': 'Persian cat de-matting' }` or whatever is **true of them** — alongside the general `speciality`. The layout already reads it (`GroomerCard page={slug}` → `specialityFor()`); nothing on the page changes | Blueprint SP-7 "Cards show cat specialities (e.g. Persian cat de-matting)"; honesty law — only true lines |
| B-2 | `src/lib/pricing.ts` `priceLines('cat-grooming')` | When `/ludhiana/tick-flea-treatment/` goes live (Wave 2), give the "Flea treatment add-on" line a link to it (`href`, or a label link in PriceMatrix) — today the line is plain text with no Book button | Template SP-3: "Add-on mentions link siblings"; P074 forbids the link until the page is live. FAQ #5's "flea treatment" link to the same page is automatic (faq.json + Faq.astro) |
| B-3 | `src/lib/pricing.ts` | FYI, no change: the blueprint SP-4 writes the two packages on one line ("Cat Bath & Brush ₹899 · Cat Full Groom ₹1,399 — any breed, any coat"); the set renders them as two lines with "any breed, any coat" as the note under Cat Full Groom, which is the 06 §5.2 list format (one figure per line, row-end Book). Recorded as W1C-7 | — |
| B-4 | `src/data/lastmod.ts` | See A-1 (the integrator adds the date with the route flip) | — |

## C · Photos (Sunny / shot list 08 §5.2)

| # | Request | Why |
|---|---|---|
| C-1 | Two real photos are still grey placeholders on this page: **hero** `cat-grooming-at-home-ludhiana.jpg` (08 §5.2 shot 5: cat groom, calm handling, cat on a towel at home — alt already the blueprint §5 line; name the breed in the alt in the same commit if the photo shows one, e.g. Persian) and **SP-3** `cat-bath-home-ludhiana.jpg` — a **new shot, not on the 14-shot list**: cat in a shallow lukewarm bath, groomer's hands steadying it (blueprint §5; card 4:3, ≤ 60 KB largest variant; no human face without consent, no house numbers). Drop both files into `src/assets/photos/` under those names — no code change | `test:site` P099 warns that the LCP is the H1, not the hero photo, while the hero is a placeholder; it clears with the real file. The page ships no stock imagery (08 §5.1). The SP-11 card photos (`golden-retriever-bath-home-ludhiana.jpg`, `dog-tick-check-at-home-ludhiana.jpg`) belong to those pages' shots |
| C-2 | Before/after pairs: the first two consented **Persian** pairs (square, 08 §5.3) switch SP-5 on by themselves through `reviews.ts` (caption "{Pet name} · Persian · Full Groom · {Locality}", alts per blueprint §5) | Blueprint SP-5; W1L-11 |

## D · Docs (docs owner)

| # | File | Sync |
|---|---|---|
| D-1 | `08-DESIGN-SYSTEM.md` §5.2 + `src/assets/photos/README.md` | Add the cat-bath shot as **#15**: "Cat in a shallow lukewarm bath, groomer's hands steadying it" · used on `/ludhiana/cat-grooming/` SP-3 · `cat-bath-home-ludhiana.jpg` · card 4:3. The blueprint §5 requires the shot (and its Hinglish alt, 03 §5 row 9) but the shot list predates it (W1C-6) |
| D-2 | `01-SITEMAP.md` §1 | Status of `/ludhiana/cat-grooming/` → `built` once A-1 lands (the blueprint's own status row already says so) |
| D-3 | `09` §7 rank log / launch audit (`02` §5) | Repeat the P040 SERP check for "cat grooming at home ludhiana" / "cat grooming ludhiana" from a phone in Ludhiana (blueprint §1a was done on a US-index web search) |
| D-4 | `blueprints/dog-walking.md`, `vet-at-home.md` builders | Not a request — this page is the second one on `ServicePage`; the `sp7-intro` slot (three points between the H2 and the line) and the `lg` photo split in `PackageTable` are the only page-specific patterns, both in `decisions/w1-cat.md` §2 |

# Requests from stage w1-walk (Wave 1, `/ludhiana/dog-walking/`)

Needs in files this stage does not own. Decisions behind each item: `website-plan/decisions/w1-walk.md`. Each item
names its owner. Nothing here blocks the page: it ships as built.

## A · Integrator

| # | Request | Why |
|---|---|---|
| A-1 | When `/ludhiana/dog-walking/` merges, flip its route to `status: 'live'` in `src/data/routes.ts` and add `'/ludhiana/dog-walking/': '2026-10-03'` (its last material content edit — the 2026-10-04 commits change comments and a table's `wide` flag only) to `LASTMOD` in `src/data/lastmod.ts`, in the same commit | The build stops on a live route without a date (04 §7.1, E7); `check:pages --all` P127 needs it for the sitemap; the page's "Last updated" line (02 P143, template SP-11) renders only once the path has a date |
| A-2 | In the integrated `--all` run, resolve this page's two P074 WARNs: links to `/ludhiana/cat-grooming/` (from the header and footer Services lists — not SP-11, whose cards are dog-grooming and vet-at-home) and `/ludhiana/vet-at-home/` (SP-11 card + the same lists), both built by other stages. Inbound P068 links to this page come from the home services grid (H-3), `/pricing/` PR-6, the header nav and the vet-at-home SP-11 card | P074 / P068 are launch-blockers that only an all-pages build can check |
| A-3 | **CSS budget headroom is 698 B** (50,502 B of 51,200 on this page; the stylesheet is shared). Any shared CSS added by a later stage can tip `check:budgets`; this page adds two small scoped `<style>` blocks (`PlanList` grid, ~0.4 KB) | 08 §8.1 |

## B · Data (`src/data/*`, `src/lib/*` owner)

| # | File | Request | Why |
|---|---|---|---|
| B-1 | `src/lib/schema.ts` `flatRows('dog-walking')` (+ `04` §2.2 per-page table) | The Service Offer names are `1 walk/day monthly` · `2 walks/day monthly` · `Walking Trial Week` (the 04 §2.2 table), while the visible SP-4 lines read `1 walk/day` · `2 walks/day` · `Trial Week (7 walks)` (`priceLines('dog-walking')`) and the `04` §2.5 worked JSON already uses the visible wording. Consider naming the Offers from `priceLineOffers('dog-walking')` so the schema and the page share one source, and syncing the 04 §2.2 row | Template SP-3 "Inclusion names echo the Offer `name` strings — keep wording identical"; 04 §2.0.3. P087 (prices visible) passes either way |
| B-2 | `src/data/content.ts` `AREA_LINES['pakhowal-road']` | FYI: the one-liner "First doorstep groomers here" renders on this page's Pakhowal Road card (SP-9) under "Dog walking in Pakhowal Road". A service-neutral line, or a per-service line, would read better on walking / vet pages | Area template §4 value proposition; cosmetic |
| B-3 | `src/data/people.ts` | Nothing to change: once a walker is hired, the SP-7 H3 "Meet your walkers" and the cards render by themselves (`cardsHeading` is already passed) | W1W-11 |

## C · Components (`src/components/*` owner)

| # | Component | Request | Why |
|---|---|---|---|
| C-1 | `Button.astro` | Add `text-center`: a label that wraps inside the centred flex button sets its second line left-aligned. Seen at 360 on this page's body CTA `Book Dog Walking — from ₹699 (trial week)` (the registry label per E2 — not shortened here) in the SP-2 row and under the SP-4 list | 08 §4.1 button spec; cosmetic |
| C-2 | `InfoTable.astro` | Optional: a per-column floor (e.g. `columns[].minWidth`) for plain-mode text tables. With it the walk-windows table could keep Months + Walk windows whole before scrolling at 360 (152 + 112 px) while giving Why ≥ 14rem — today `wide` is the only lever (W1W-07: Months 158 · Walk windows 214 · Why 268 at 640 px) | 08 §4.8; W1L-20 |
| C-3 | `CheckList.astro` | Optional: an `html`/emphasis form for an item, so the blueprint's bold "and" in "everything above, morning **and** evening" can render (W1W-04). Plain text today; no word changes | blueprint SP-3 |

## D · Photos (Sunny / shot list 08 §5.2)

| # | Request | Why |
|---|---|---|
| D-1 | Hero shot 9 `dog-walker-beagle-park-ludhiana.jpg` (walker with a Beagle on a leash in a neighbourhood park) — a grey placeholder today; the alt is the §5 line | `test:site` P099 warns that the LCP is the subhead while the hero is a placeholder; clears with the real file |
| D-2 | **Add to the 08 §5.2 shot list:** SP-3 `walk-update-whatsapp-gps-route-ludhiana.jpg` — a phone showing a real walk update (GPS route + photo), blueprint §5 row 2 (alt there). Not on the 14-shot list today; a placeholder until shot | blueprint §5; 08 §5.1 (no stock) |
| D-3 | SP-5 "Real walk updates": 3–4 consented walk-update photos into `src/data/reviews.ts` `proofPhotos` (caption `{Pet} · {Breed} · morning walk · {Area}`, consent date). The row renders itself once one exists | template SP-5; blueprint SP-5 |

## E · Docs (docs owner)

| # | File | Sync |
|---|---|---|
| E-1 | `03-KEYWORD-MAP.md` §3, `06-CONVERSION-PLAYBOOK.md` §2.3 | H1 → `Dog Walker in Ludhiana` (the fold-law cut, blueprint §1, `00` §11 E3; W1W-02). Both still show "Dog Walker in Ludhiana — Daily Walks from ₹2,999/month" |
| E-2 | `_TEMPLATE-service-page.md` SP-9 / `01-SITEMAP.md` §2.7 | Note the walking anchor form: "Dog walking in {Area}" (W1W-08) — "{service} at home in {Area}" describes a visit |
| E-3 | `blueprints/dog-walking.md` SP-3 (blueprint owner) | Decide whether template footnote (a) "Everything above is included in the price — nothing on this list costs extra." belongs under the ✓-lists; not built (W1W-05). One line in `PlanList.astro` if yes |
| E-4 | `04-TECHNICAL-SEO.md` §2.2 | See B-1 (Offer names vs the visible labels / the §2.5 worked JSON) |
| E-5 | `blueprints/dog-walking.md` SP-7 | The line 'Cards titled "Meet your walkers" (`[FILL:WALKER_1_NAME]` etc.)' predates the honesty law (people.ts, W1L-14): no card renders until a walker is on the team. Reword to "cards appear once hired" when convenient |

# Requests from stage w1-pricing (Wave 1, `/pricing/`)

Needs in files this stage does not own. Decisions behind each item: `website-plan/decisions/w1-pricing.md`. Each item
names its owner.

## A · Integrator

| # | Request | Why |
|---|---|---|
| A-1 | When `/pricing/` merges, flip its route to `status: 'live'` in `src/data/routes.ts` and add `'/pricing/': '2026-10-03'` (the last material content edit) to `LASTMOD` in `src/data/lastmod.ts`, in the same commit | The build stops on a live route without a date (04 §7.1, E7). `check:pages --all` P127 needs it for the sitemap |
| A-2 | Inbound links for P068: `/book/` already links `/pricing/` (anchor "price list", rendered once `/pricing/` is live). Template SP-4 also requires every money page to link it ("Compare every service on the full price list"). Those pages are built by other stages, so check them in the `--all` run | P068 (launch-blocker) |

## B · Shared components and styles

| # | File · owner | Request | Why / numbers |
|---|---|---|---|
| B-1 | `src/components/InfoTable.astro` · components | **Cap the header note width from md**, e.g. `max-width: 16rem; margin-inline: auto` on the `sub` line (centred columns), so a long note wraps instead of widening its column | Measured on `/pricing/` PR-4 (the shared `PACKAGE_TABLES['dog-grooming']`, Full Groom note "full body dog grooming — haircut, styling, paw & sanitary trim"): at 1280 the column widths are Included 217 · Bath & Brush 144 · **Full Groom 481** · Premium Spa 308 px; at 768, 155 · 106 · 280 · 192. The same table renders on `/ludhiana/dog-grooming/` SP-3 |
| B-2 | `src/components/InfoTable.astro` · components | Optional: a smaller base floor for short numeric/price text cells (today every text cell is ≥ 7rem and the row label ≥ 9.5rem) | Any InfoTable with ≥ 2 text columns is ≥ 376 px wide at base, so it scrolls sideways on every phone. `/pricing/` PR-8 (Groom Club maths) uses `TableFrame` directly for this reason (W1P-07) |
| B-3 | `src/data/services.ts` · data | FYI only: `/pricing/` pins its PR-4 Full Groom note through `columnNotes`, so the shared `PACKAGE_TABLES['dog-grooming']` note can change (or go) for the dog page without changing `/pricing/` | F2-08 put the pricing note on the shared table; this page no longer depends on it |

## C · Site-wide accessibility (chrome / `global.css` owner)

| # | Request | Why / numbers |
|---|---|---|
| C-1 | **Keep keyboard focus clear of the sticky bar below md**: add a bottom scroll padding equal to the space the body already reserves, e.g. `@media (max-width: 767px) { html { scroll-padding-bottom: calc(64px + env(safe-area-inset-bottom)); } }` next to the existing `scroll-padding-top` in `src/styles/global.css` | WCAG 2.2 SC 2.4.11 (Focus Not Obscured, AA; 08 §7 is an AA floor). Measured on `/pricing/` at 360×640: tabbing scrolls a focused element only until it touches the viewport bottom. The "Book Nail Trim + Ear Clean visit" link landed at y 596–640, and the sticky bar covers 584–640, so the link was entirely hidden. The same happens on every page with the sticky bar and focusable content further down |

## D · Docs (docs owner)

| # | File | Sync |
|---|---|---|
| D-1 | `blueprints/pricing.md` §2 row 1 | §2 says the primary keyword "dog grooming price ludhiana" lands in the **PR-1 subhead**, but the §3 PR-1 subhead (built verbatim) does not contain it. Either Sunny rewords the subhead to carry it, or §2 changes to "Title · H1 · meta" (W1P-02) |
| D-2 | `blueprints/pricing.md` §3 | Record what was built where the blueprint is silent: the H2s for PR-2 "Which size is your dog?", PR-9 "First-groom and referral offers" and PR-11 "Prices & payment — your questions"; PR-4's H2 = template SP-3 "What's included in every dog grooming package"; R1 + R2 under PR-5 and PR-7 (06 §5.4); PR-6 = R1 + the walking line in R2's place; PR-7's vet line under R1 + R2; the PR-3 caption shown on screen; the PR-8 table layout "Dog size · Full Groom · Groom Club price (save …)" (decisions §1–§2) |
| D-3 | `09-ANALYTICS-TRACKING.md` §2d | No change needed: the page uses `hero_pricing`, `pricing_row`, `groomclub` and `ctaband_pricing`, all canonical. `pricing_page` is unused, because the page has no other in-body wa.me or tel: link |

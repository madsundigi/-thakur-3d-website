# w1-walk — decision log (Wave 1: `/ludhiana/dog-walking/`)

Branch `wave1/w1-walk` (base `f66d994`). Scope: `src/pages/ludhiana/dog-walking.astro`,
`src/components/pages/dog-walking/{PlanList,WalkWindows}.astro`, `src/data/pages/dog-walking.ts`,
`blueprints/dog-walking.md`. Nothing shared was edited (needs → `requests/w1-walk.md`). Built by the page agent on
2026-10-03 (`a8fb550`, cut off before verification); verified and finished on 2026-10-04.

Rule order applied: `02` [Launch-blocker] > page blueprint > `00` §11 > `06`/`07`/`08`/`04`/`09`. Decisions already
taken and implemented as given: **D2** (hero primary → the booking form with Trial Week preselected — the layout sets
the target for this path), **D3** (R3 is a confirmed fact), **E2** (CTA price = the figure the widget shows), **E3**
(fold law), **E4** (the CTA row after SP-2), **E5** (hero alt = the `08` §5.2 shot), **E7** (lastmod), and the layout
decisions W1L-8…18 (`decisions/w1-layout.md` §2).

## 1 · Decisions

| # | Decision | Why / source |
|---|---|---|
| W1W-01 | **Shape:** `<ServicePage config>` + two partials — `PlanList` → `sp3`, `WalkWindows` → `sp4-extra`. Every blueprint string sits in `src/data/pages/dog-walking.ts` (verbatim; prices through `planPrice()`), with build-time checks: title 50–60 / meta 120–158 without `"` / H1 20–70 (code points, as `check:pages` counts), eyebrow ≤ 30, alts ≤ 125, and every time token in `site.hours.walks` present in the walk-windows table. Chips, body CTA, areas, OG, wa.me prefill, FAQ, steps, R-lines and the SP-7 copy are read from their registries, never repeated. | W1L-8; `decisions/w1-layout.md` §2.3 page-author notes; `02` P011/P019/P024/P026/P056 |
| W1W-02 | **H1 = `Dog Walker in Ludhiana`** (22 chars; primary keyword in the first 4 words). The earlier "— Daily Walks from ₹2,999/month" tail set the H1 in 4 lines at 360 and pushed the photo 62–70 px under the sticky bar; the monthly price stays in the title, the meta, the hero chips and SP-4. Blueprint §1 carries the cut; `03` §3 and `06` §2.3 still show the long form (request E-1). | `00` §11 E3 (fold law, P150 launch-blocker); `decisions/w1-layout.md` §1 agreed copy |
| W1W-03 | **SP-4 R2 = `WALK_PAYMENT_LINE`** ("Monthly plans are paid at month-end by UPI or cash — no advance.") via `sp4.r2`. The blueprint's SP-4 wording read "at the end of each month" and was synced to the registry string on 2026-10-03 — one wording on this page, `/pricing/` PR-6 and FAQ #1. | blueprint SP-4 "R2 adapted"; `content.ts`; ship check §6 |
| W1W-04 | The blueprint's bold **"and"** in "everything above, morning **and** evening" renders as plain text: `CheckList` items are plain strings, and the emphasis changes no word. An `html` item option is offered to the component owner if the emphasis matters (request C-3). | blueprint SP-3; `CheckList.astro` API |
| W1W-05 | **SP-3 body:** lead-in → `CheckList` with the three plans in blueprint order (no badge — the blueprint names none and amber badges are "Most booked" only; no per-card CTA — the E4 row and the SP-4 Book links already carry three routes into the widget) → H3 "Every walk, the same rules" as a ✓-list, the §5 walk-update photo beside it from `md` and after it below `md` (only a non-focusable item moves). **No template SP-3 footnotes:** the blueprint words SP-3 in full; footnote (b) (matting) is a grooming line, and (a) ("nothing on this list costs extra") is left to the blueprint owner (request E-3) — R1 under the SP-4 list already says the price is final. | blueprint §3 SP-3, §5; template SP-3 "non-grooming pages replace the grid with a ✓-list per package"; `08` §1.4 rule 1 |
| W1W-06 | **Hero:** eyebrow, subhead and primary label from the blueprint (label built with `planPrice('dog-walking','walk-trial')`); `secondary: 'call'` ([Call [FILL:PHONE]], hidden below `md`); photo `dog-walker-beagle-park-ludhiana.jpg` with the §5 alt. Fold at 360×640 re-measured on the final build (w1-layout §1 method): H1 bottom 175.7 (2 lines) · subhead 293.2 (4) · primary 353.2 · price chip 16–129.1 · first trust chip 137.1–303.4 (fade at 344: both whole) · photo top 405.2 → +160 = 565.2 vs the bar at 583 — **17.8 px spare**, scrollWidth 360. No P150 exception needed. | blueprint SP-1; `06` §2.3; E3; `decisions/w1-layout.md` §1.2 |
| W1W-07 | **Walk-windows table = `InfoTable` in `sp4-extra`, `onTint`, `wide`.** With the default column floors the Why column was 112 px wide at 360 (the Apr–Jun cell 7 lines; table 589 px tall) and only 62 px of it showed before scrolling; `wide` (the `08` §4.8 640 px minimum) gives Months 158 · Walk windows 214 · Why 268 px, 2–3-line rows (table 336 px), scrolling sideways behind the fade with the Months column sticky — the dog page's breed-table behaviour. 768 (131 · 270 · 333) and 1280 (186 · 437 · 526) are unchanged either way. A per-column floor option would keep the Walk windows column whole before scrolling as well (request C-2). | `08` §4.8; W1L-20; measured 2026-10-04 |
| W1W-08 | **SP-9 anchor prefix "Dog walking in"** → "Dog walking in Dugri". The template pattern "{service} at home in {Area}" (`01` §2.7) describes a visit; walks start at the doorstep and happen outside, so "Dog walking at home in Dugri" would be untrue. The area template's own anchor for this page is "dog walker in {Area}". Request E-2 asks the template owner to note the walking form. | template SP-9; `_TEMPLATE-area-page.md` §4 |
| W1W-09 | **SP-10 H2 = "Dog walking in Ludhiana — your questions"**: the blueprint names no FAQ heading; the template pattern "{Service} at home — your questions" gets the same "at home" problem, so the city replaces it and the H2 carries the §2 secondary "dog walking ludhiana" once more. | template SP-10; blueprint §2 |
| W1W-10 | **SP-12 heading passed verbatim**, not through `r8()`: the blueprint line ("Your Labrador deserves a daily walk with a familiar face. Trial Week slots open this week across Ludhiana.") is not the R8 pattern. Support line verbatim with `planPrice()` figures. | blueprint SP-12; `content.ts` r8 contract |
| W1W-11 | **SP-5** = `{ kind: 'proof', heading: 'Real walk updates' }` — the layout renders the row only once `reviews.ts` `proofPhotos` holds a consented walk photo; nothing (never a placeholder) until then. **SP-7** = `team: 'walkers'`, H2 "Background-verified, fixed walker" (blueprint §2/§3) over `MEET_WALKERS.line`, `cardsHeading: 'Meet your walkers'` for the H3 the blueprint puts over the cards; no card renders while both walkers are `[FILL]` (people.ts honesty law, W1L-14) — the blueprint's "`[FILL:WALKER_1_NAME]` etc." cards are therefore not on the page (request E-5). | template SP-5 pre-launch rule; W1L-11; W1L-14 |
| W1W-12 | **SP-11:** the template sibling set (Dog Grooming at Home · Vet at Home) and the two calendar posts as `sp11.posts` (text links once live, P074); "Last updated" appears once `lastmod.ts` has the path (A-1). **SP-6:** nothing passed — `stepsFor('dog-walking')` and `SP6_LINES` supply the walking lines. | W1L-12; W1L-18; `content.ts` |
| W1W-13 | **`check:prices` reads comments too:** two `₹699` mentions in code comments of the page file failed the gate and were reworded ("<trial price>"). No rupee figure is typed anywhere in this stage's files, comments included. | `07` §4; `scripts/check-prices.mjs` |
| W1W-14 | **P032 reading:** the `CheckList` card titles are `<h3>` with a price line and a ✓-list as their body — plan sub-sections of the SP-3 H2, not bare card labels — and no two headings sit together without text between them (H2 → lead-in → H3 → price + list; H2 → price block → … → H3 → table). **P164 (by word count):** every plan price appears in SP-3 (from word ≈ 150 of 1,155) and the trial price in the hero; the SP-4 block itself starts at 28.8 % / 30.5 % / 29.4 % of the page height at 360 / 768 / 1280 — the template's binding block order, the same on every money page. | `02` P032, P164 |
| W1W-15 | **Hinglish:** exactly one use (FAQ #8); both alts and every heading are English. **Links:** every internal link is rendered through `isLive()` by the layout and the registries — cat-grooming and vet-at-home sibling cards link because the wave-1 preview switch counts them live (the only two `check:pages` WARNs, P074, resolved in the integrated build). | blueprint §6; `02` P074 |

## 2 · Copy written by this stage (customer-facing; everything else is blueprint / registry verbatim)

| Where | Text |
|---|---|
| SP-9 AreaCard anchor prefix | Dog walking in (→ "Dog walking in Dugri" …) — W1W-08 |
| SP-10 FAQ heading | Dog walking in Ludhiana — your questions — W1W-09 |
| SP-4 table caption (sr-only) | Ludhiana walk windows by season (= the H3) |

## 3 · Verification (2026-10-04, final build `965602e`, `PUBLIC_PDS_PREVIEW_LIVE=wave1`)

- `npm run build` ✓ (13 pages).
- `check:pages -- --pages /ludhiana/dog-walking/` → **0 FAIL · 2 WARN** (both P074: links to `/ludhiana/cat-grooming/`
  and `/ludhiana/vet-at-home/`, live wave-1 routes other stages build). Head = blueprint §1 (P012/P020/P026); canonical
  + `og:url`; images (hero eager + preloaded, the rest lazy, every one with width/height/alt); schema types per `04`
  §2.9 with every FAQ and Offer price visible (P087); breadcrumb = BreadcrumbList; NAP; every source canonical (P161).
- `check:budgets -- --pages /ludhiana/dog-walking/` → **0 FAIL · 0 WARN** — CSS 50,502 B of 51,200 (698 B headroom,
  the shared stylesheet — request A-3), 3 tagged scripts, 2 font preloads, booking island 80.7 KB gz (not loaded here).
- `check:prices` → **OK**.
- `test:site -- --pages /ludhiana/dog-walking/ --port 4581` → **0 FAIL · 1 WARN** (P099 at 1280: the LCP is the subhead
  while the hero is a placeholder — clears with the real photo, request D-1). 360 / 768 / 1280: no overflow, no
  console errors, no failed requests, axe clean, JSON-LD parses, CLS 0.000; **fold ok at 360×640**; 11 tracked links
  each logged with its `data-source`; exit card ok at 1280, absent on `/book/`.
- Block walk SP-0…SP-13 against the built HTML: DOM order = template §1; every string = blueprint §1/§3/§4/§5 (the
  FAQPage entries equal the SP-10 text; the Service Offers equal the SP-4 figures); word count 1,155 (P044 ≥ 800).
- Screenshots (fold 360×640, full pages at the three widths, every band clipped at 360 and the SP-3/SP-4 blocks at
  768 and 1280): `scratchpad/wave1/w1-walk/` of this session. Visual defects fixed: the walk-windows table (W1W-07).
  Left as shared-component matters (requests C-1): the registry body-CTA label wraps to two lines at 360 with its
  second line left-aligned inside the centred `Button`.

# w1-layout — decisions log

Wave 1 · stage w1-layout · branch `wave1/w1-layout` (base `abf5c3b`, then fast-forwarded to `ba52caa` for the gates).
Scope: the hero chip row (open issue O-1), `StepsStrip` steps/R4 props, the shared money-page layout
`src/layouts/ServicePage.astro`, and the flagship page `/ludhiana/dog-grooming/` built on it.
Rule order applied: 02 [Launch-blocker] > page blueprint > 00 §11 > 06/07/08/04/09.

---

## 1 · Hero chip row (O-1) and the fold, re-measured

**Method.** Same as f2-components §1: throwaway pages (deleted before commit) rendered each page's Breadcrumb (money
pages) + Hero inside the real `Base` layout, so the sticky header and the sticky bar were present. Playwright Chromium at
360×640, DPR 2, `isMobile`, after `document.fonts.ready`, grey placeholder photo (the same 16:10 box a real photo gets).
The limit is the sticky bar's visible top, **583**. "Photo +160" = photo top + 160. A trust chip counts as fully
visible only when its whole box lies left of the row's edge-fade start (stricter than `test:site`, which checks the
viewport edge).

**Agreed copy (orchestrator, 2026-10-03).** Home subhead without its last sentence and without "sanitised": "Grooming,
walking and vet visits at your door — background-verified professionals, sealed kit, fixed prices from ₹299."
(the home page agent applies that copy). Dog-walking H1 "Dog Walker in Ludhiana". Vet-at-home keeps its **full**
emergency notice. Dog, cat: blueprint heroes as written.

### 1.1 BEFORE (Hero/Chip as of `abf5c3b`, agreed copy, breadcrumb `py-2`)

| Page | H1 bottom | Subhead bottom | Primary bottom | Notice bottom | Price chip x | 1st trust chip x | Fade starts | Photo top | Photo +160 | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| home | 183.5 (3 lines) | 274.7 (3 @16px) | 362.7 | — | 16–110.6 | 118.6–375.1 | 312 | 414.7 | 574.7 | PASS, 8.3 spare · trust chip cut |
| dog-grooming | 183.7 (2) | 301.2 (4) | 361.2 | — | 16–110.6 | 118.6–375.1 | 312 | 413.2 | 573.2 | PASS, 9.8 · trust chip cut |
| cat-grooming | 183.7 (2) | 301.2 (4) | 361.2 | — | 16–110.6 | 118.6–375.1 | 312 | 413.2 | 573.2 | PASS, 9.8 · trust chip cut |
| dog-walking | 183.7 (2) | 301.2 (4) | 361.2 | — | 16–144.6 | 152.6–340.9 | 312 | 413.2 | 573.2 | PASS, 9.8 · trust chip cut |
| vet-at-home | 183.7 (2) | 301.2 (4) | 361.2 | 433.2 (3 lines) | 16–107.0 | 115.0–360.7 | 312 | 485.2 | 645.2 | **FAIL +62.2** · trust chip cut |

### 1.2 AFTER (this branch)

| Page | H1 bottom | Subhead bottom | Primary bottom | Notice bottom | Price chip x | 1st trust chip x | Fade starts | Photo top | Photo +160 | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| home | 183.5 (3) | 274.7 (3) | 362.7 | — | 16–97.6 | 105.6–335.2 | 344 | 414.7 | 574.7 | **PASS, 8.3 spare**, both chips whole |
| dog-grooming | 175.7 (2) | 293.2 (4) | 353.2 | — | 16–97.6 | 105.6–335.2 | 344 | 405.2 | 565.2 | **PASS, 17.8**, both chips whole |
| cat-grooming | 175.7 (2) | 293.2 (4) | 353.2 | — | 16–97.6 | 105.6–335.2 | 344 | 405.2 | 565.2 | **PASS, 17.8**, both chips whole |
| dog-walking | 175.7 (2) | 293.2 (4) | 353.2 | — | 16–129.1 | 137.1–303.4 | 344 | 405.2 | 565.2 | **PASS, 17.8**, both chips whole |
| vet-at-home | 175.7 (2) | 240.4 (2, phone cut) | 300.4 | 363.0 (3, compact) | 16–94.2 | 102.2–321.8 | 344 | 415.0 | 575.0 | **PASS, 8.0**, full notice, both chips whole |
| vet-at-home, full subhead on phones too | 175.7 (2) | 293.2 (4) | 353.2 | 415.8 (3) | 16–94.2 | 102.2–321.8 | 344 | 467.8 | 627.8 | FAIL +44.8 (not shipped: shows why the cut is needed) |

No horizontal overflow on any of them (scrollWidth 360). From md up every hero is unchanged (checked at 768 and 1280:
full subhead, 14px notice, wrapped chips, eyebrow + secondary CTA visible).

**Where the vet pixels came from** (+62.2 → −8.0): `crumbAbove` −8.0 · subhead cut to its first sentence below md
−52.8 (4 lines → 2) · compact notice −9.4 (3 lines × 20px + 12px margin → 3 lines × 18.2px + 8px). Every word of the
emergency line stays; nothing is cut from the vet-at-home.md SP-1 copy. **No P150 exception is needed** for any of the
five heroes.

### 1.3 Decisions

| # | Decision | Why |
|---|---|---|
| W1L-1 | **The hero chip row bleeds 16px into the right page gutter below md** (`margin-right: -16px` on the scroll row) and its edge fade shrinks from 32px to 16px, so the fade lies in the gutter, after the second chip. The row clips its own content: the page never scrolls sideways. | O-1: price-first order kept (template SP-1 rule 5) and both the price chip and the first trust chip are whole at 360 (table above). A narrower fade inside the 328px column could not give the trust chip enough room. |
| W1L-2 | **`Chip dense`** (new, opt-in): below md 8px sides, 4px icon gap, 13px text (the 08 §2.2 micro size, normal case); 32px tall as before; standard 12 · 8 · 14px from md. Only the hero passes it. | Saves 31px on "from ₹599 + ✓ Background-verified groomers" (the widest pair of the five pages) without adding height. 14px text with tighter padding was still 11px short (measured). |
| W1L-3 | While the chip row has keyboard focus the mask is dropped and the focus ring is drawn inside the row (`outline-offset: -2px`) below md; 2px outside again from md. | The bleed puts the row's right edge at the screen edge, where an outside ring would be cut (08 §7.2: focus never clipped). |
| W1L-4 | **`Hero crumbAbove`** (new): when a breadcrumb sits directly above the hero, the base top padding is 8px instead of 16px; md+ unchanged. ServicePage always sets it. | +8px fold room on every money page (dog/cat/walk spare 9.8 → 17.8). The breadcrumb's own 8px bottom padding keeps a 16px gap to the H1. |
| W1L-5 | **`Hero subheadShort`** (new): a phone cut of the subhead. It must be a prefix of `subhead` (build error otherwise); the rest of the sentence stays in the DOM, hidden below md by CSS (02 P110 parity, the E3 pattern used for the eyebrow). Used on vet-at-home only: the phone shows "A registered veterinarian examines your pet at home — no stressful clinic trip." | The dropped words ("₹699 consult; medicines and vaccines at MRP, bill shown to you.") repeat what the chips already say (`₹699 visit`, `Medicines at MRP — bill shown`, `Fixed visit fee ₹699`). |
| W1L-6 | **Compact hero notice below md**: 13px / 1.4, 16px alert icon, 8px above (md+: 14px / 20px, 20px icon, 12px, as before). | vet-at-home ship check "Emergency line visible in SP-1 on a 360 px screen" with the full line: every safety word stays (vet-at-home.md §0 rule 2). |
| W1L-7 | Wave-2 chip pairs measured the same way: dog-vaccination price 16–108.8, trust 116.8–336.4 (whole) · puppy-grooming 16–88.5, 96.5–293.2 (whole) · **tick-flea-treatment 16–193.6, 201.6–431.1 (trust chip cut)**: its price chip "₹699 · ₹399 with a groom" alone is 178px. Not changed here; that page's builder decides (a shorter chip is copy, Sunny's call; otherwise a P150 exception). | Out of this stage's five pages; recorded so nobody is surprised. |

---

## 2 · `src/layouts/ServicePage.astro` and `/ludhiana/dog-grooming/`

### 2.1 Shape

One layout for the seven `/ludhiana/<service>/` pages: `<ServicePage config={…}>` + six named slots (`sp3` required; `sp4-lines`,
`sp4-extra`, `sp5`, `sp7-intro`, `before-faq` optional). The header comment of the file is the API reference (config
field by field, every slot, a minimal page). The layout owns the template's block order SP-0…SP-12 (SP-13 is Base
chrome), the `<head>` (title, meta, canonical/OG through Base, the hero preload, one JSON-LD `@graph` = Service +
FAQPage + BreadcrumbList), the band rhythm and the CTA rhythm. A page file holds only its blueprint's copy values;
everything shared is read from the registries so the four Wave-1 money pages cannot disagree: `MONEY_PAGES[path]`
(hero chips, body CTA + source, areas, SP-11 card, OG, wa.me prefill), `faqFor(path)` (= the FAQPage entries),
`stepsFor(slug)` / `SP6_LINES` / `R2` / `R4` / `r8()`, `people.ts`, `reviews.ts`, `LASTMOD`, `isLive`.

### 2.2 Decisions

| # | Decision | Why |
|---|---|---|
| W1L-8 | **Config + slots, registries for everything shared.** Page-specific H3 sub-sections are small components under `src/components/pages/<slug>/` passed into the slots (dog-grooming: `PackageTable` → `sp3`, `PriceExtras` → `sp4-lines`, `BreedTable` → `sp4-extra`). | 00 §11 rule "page-specific sections live as H3s inside the nearest template block". Three more pages are built on this layout next; a value that lives in one place cannot drift. |
| W1L-9 | **SP-2 ends with the E4 CTA row** = the page's body CTA (`MONEY_PAGES[].cta`: `Book Dog Grooming — from ₹599` → `/book/?src=service_dog-grooming`) **with R2 beside it.** R1 + R2 also sit under the SP-4 matrix (PriceMatrix). | 00 §11 E4 / 07 §2 row 4 fix the CTA; 06 §9 places R2 "beside booking CTA"; template SP-4 places R1 + R2 under the price table. Both placements are the spec's, so R2 appears twice. |
| W1L-10 | **Bands:** hero paper, then sand / paper alternating in DOM order from SP-2, counting SP-5 and `before-faq` only when rendered — so SP-2 is always sand, SP-3 paper, SP-4 sand, and the CtaBand is brand-dark. Section padding 48px, 80px from lg; content 1200px, gutters 16 → 24px. | 08 §1.4 rule 5 (two adjacent sections never share a background) holds whatever blocks a page has; the sand SP-4 is where `onTint` tables go. |
| W1L-11 | **SP-5 is data-driven and otherwise absent.** `sp5: { kind: 'pairs' }` renders at ≥ 2 consented pairs for the page's services, `{ kind: 'proof', heading }` at ≥ 1 proof photo; nothing is rendered below those counts. With ≥ 2 breeds among the pairs, one anchor chip per breed jumps to that breed's first pair (zero JS: anchors, not filters). The `sp5` slot replaces the body only. | Template SP-5 pre-launch rule (never stock, never placeholders); dog-grooming.md SP-5 "breed filter chips limited to breeds with ≥ 1 real pair". |
| W1L-12 | **"Last updated {d Month yyyy}"** closes SP-11, read from `LASTMOD[path]`; absent until the integrator adds the date with the route flip. | 02 P143; E7 (the visible date = the sitemap `<lastmod>`, never the build date). |
| W1L-13 | **The dog page drops the shared Full Groom header note** ("full body dog grooming — haircut, styling, paw & sanitary trim") with `columnNotes={{ 'full-groom': '' }}`. | dog-grooming.md SP-3 = the template worked table verbatim, which has no note; the note is pricing.md PR-4's keyword line and `/pricing/` pins it itself (W1P-06, w1-pricing B-3). It was also the width problem B-1 measured: Full Groom column 369 → 236px at 1280 on this page. |
| W1L-14 | **SP-7 cards:** only people who are on the team (`isPlaceholder` false), at most 3, `page={slug}` so `specialityOn[page]` lines show; the vet card always renders, `[FILL]` tokens included. Heading/line default to `MEET_GROOMERS` / `MEET_WALKERS` / `MEET_VET`. "How we hire" → `/about/` (isLive). | people.ts honesty law; vet-at-home.md §0.3 + 02 P046 (the launch gate `check:fill` must see the unfilled vet, not an empty block). Today: no groomer is hired, so the dog page shows the heading, the line and the link. |
| W1L-15 | **`service_dog-grooming` stays** as the body-CTA source although `src/data/sources.ts` rejects it (the only 2 `check:pages` FAILs on the page, P161). | 09 §2d ("or the page slug when the link preselects nothing"), 07 §2 row 4 ("With nothing preselected: `/book/?src=service_<page-slug>`") and F2-04 define it; `sources.ts` is not in this stage's files — one-line fix requested (`requests/w1-layout.md` A-2). Only the dog page is affected: cat / walking / vet preselect a service, so theirs are `service_<id>`. |
| W1L-16 | **SP-9 closing line** = every 00 §3.3 area the page does not card, in §3.3 order (7 on every money page). | Template SP-9 formula; its worked line listed 6 names (South City was missing) and is corrected in the template. |
| W1L-17 | Hero secondary `'prices'` → `#prices` = the SP-4 `<section id>`; `'call'` → `tel:`; both `source: hero_<slug>`. The primary is never configurable beyond its label (E1 / D2). | Template SP-1 rule 4; 07 §2 row 3. |
| W1L-18 | Everything that links renders text until its target is live: SP-11 blog links (`sp11.posts`), FAQ answer links (Faq.astro), area cards, sibling cards, `/pricing/`, `/how-it-works/`, `/about/`. | 02 P074 (zero links to unpublished URLs). |

### 2.3 Page-author notes — cat-grooming · dog-walking · vet-at-home (and the Wave-2 pages)

- **Don't repeat the registry.** Chips, the body CTA, the 3 areas, the OG image, the SP-11 card and the wa.me prefill
  come from `MONEY_PAGES[path]`; the FAQ set is faq.json's `pages` field; the steps and R4 come from content.ts. If a
  blueprint value disagrees with the registry, the registry (and its data owner) is where the fix goes.
- **Prices:** build every string in the page frontmatter with pricing.ts helpers — `fromPrice('cat-grooming')`,
  `planPrice('dog-walking', 'walk-1x')`, `flatPrice('vet-visit')`, `priceRange('full-groom')`, `addonPrice()`; `check:prices`
  fails a typed ₹ and the layout never formats a number itself.
- **The vet notice** is `hero.notice` (the vet-at-home.md SP-1 emergency line, verbatim). It renders under the CTAs
  after R3, compact below md (W1L-6). Pair it with `hero.subheadShort` = the subhead's first sentence (W1L-5), or the
  fold fails by 44.8px (§1.2). Nothing else needs a notice.
- **SP-3 body (`sp3` slot):** grooming pages — the blueprint lead-in, then
  `<InfoTable table={PACKAGE_TABLES['cat-grooming']} class="mt-4" />` (paper band: no `onTint`; `columnLabels` /
  `columnNotes` by serviceId to adjust a header; `''` removes a note). Walking / vet / vaccination / tick / puppy —
  `<CheckList items={[{ title, priceText, items, note?, badge? }]} />`, one card per package with the blueprint's
  ✓-lines verbatim, `priceText` from the helpers; a per-card CTA goes in `slot="cta-1"`, `"cta-2"`, …
- **SP-4:** `sp4.lines` = the page's `PriceLineSet` name (`'cat-grooming'`, `'dog-walking'`, `'vet-at-home'`;
  `'dog-vaccination'` in Wave 2) renders the flat-price list in place of the matrix; `sp4.r2 = WALK_PAYMENT_LINE` on
  dog-walking. R1 + R2, the mid-page CTA and the `/pricing/` link are automatic. Blueprint H3 tables inside SP-4 (coat
  care, walk windows, the vet emergency footer) → `sp4-extra` with `onTint`; a line that belongs right under R1 + R2 →
  `sp4-lines`.
- **The extra CTA row after SP-2 is automatic** (W1L-9) — never add a second one in a slot.
- **SP-5:** `sp5: { kind: 'proof', heading: '<blueprint H2>' }` on walking / vet, `{ kind: 'pairs' }` on grooming pages;
  the block appears by itself once reviews.ts has the photos. Never pass placeholders through the `sp5` slot.
- **SP-6:** nothing to pass; dog-walking and vet-at-home get their own step 3/4 text and R4 from `SP6_LINES`.
- **SP-7:** `sp7.team` (`'groomers' | 'walkers' | 'vet'`); `cardsHeading` only when the blueprint puts an H3 over the
  cards (dog-walking "Meet your walkers"); `variant: 'full'` on the vet page; `sp7-intro` slot for cat-grooming's three
  "why home" points; `heading` / `line` only when the blueprint's wording differs from people.ts `MEET_*`.
- **SP-8:** `sp8: { medical: true }` on vet-at-home and dog-vaccination (the registered-vets line).
- **SP-9:** `intro` (the blueprint's "…near me" intro) and `prefix` ("Cat grooming at home in"); cards and the closing
  line are automatic.
- **SP-10:** `heading` only ("<Service> at home — your questions" pattern).
- **SP-11:** `posts` = the blueprint's calendar-named blog links (they render once live); siblings are the template's
  fixed sets unless the blueprint says otherwise (`siblings`).
- **SP-12:** `heading` = `r8(breed)` / `r8(breed, area)` / `r8(breed, undefined, 'walk')` when the blueprint's line is
  the R8 pattern, else the blueprint's line verbatim; `support` verbatim; the two buttons, their sources and R3 are
  automatic.
- **Gates for a new page:** `npm run build`, then `check:pages -- --pages /ludhiana/<slug>/` (expect P074 WARNs for
  routes other stages build), `check:budgets`, `check:prices`, `test:site -- --pages /ludhiana/<slug>/ --port <yours>`.
  The fold margins are in §1.2; a hero that fails there is a P150 exception for Sunny, never a silent ship.

---

## 3 · InfoTable and PriceMatrix (w1-pricing requests B-1, B-2, B-4) — APIs unchanged

| # | Decision | Why / numbers |
|---|---|---|
| W1L-19 | **B-1 — header note capped:** the second header line is `.it-sub { max-width: 16rem }`, centred (`margin-inline: auto`) under a centred column. | Measured on the dog page SP-3 while it still carried the `/pricing/` Full Groom note (62 characters): at 1280 the columns went Included 217 → 254 · Bath & Brush 144 → 169 · **Full Groom 481 → 369** · Premium Spa 308 → 360 px (the note itself 256 px); at 768, Full Groom 280 → 232. A block child's `max-width` caps its max-content contribution, so the column stops following the note. |
| W1L-20 | **B-2 — no floor for short-text columns:** a column whose every text cell is ≤ 16 characters loses the 7rem base floor (`.it-short`); when those cells are numeric (they start with ₹, a digit, ~, <, >, ±, − — "₹1,199", "6:00–8:00", "< 10 kg", "₹999 (save ₹200)") they are also `white-space: nowrap`, so a figure never splits from its unit. Word cells ("Medium (most)", "every 4–6 weeks") still wrap. The row-label column loses its 9.5rem floor at ≤ 12 characters ("Small", "Shih Tzu"); longer labels keep it. Centred (✓/—) columns are unchanged. | A first version set every short cell nowrap: on the breed table at 360 that widened Size to 133 and Typical rhythm to 168 px, squeezed "What we recommend" to 125 px and pushed rows to ~150 px. With wrap kept for words the table sits at its `wide` minimum (640): Breed 154 · Size 90 · Coat 119 · What we recommend 159 · Typical rhythm 118, rows ≤ 125 px. 12 characters keeps the sticky label column under half of a 360 screen (the reason for the 9.5rem floor). A numeric 3-column table (Groom Club maths) now needs only its own text width at base. |
| W1L-21 | `columnNotes: { id: '' }` removes a C1 table's note on that page (documented; no code change needed). | W1L-13. |
| W1L-22 | **PriceMatrix:** HTML output byte-identical across the three builds of this stage (the InfoTable change does not touch it). One CSS change, w1-pricing **B-4**: `.pm-line-label` basis 8rem → 7rem, so at 360 "Cat Full Groom" keeps its label and price on one line (7rem + 16px + 157px = 285 ≤ 296); the walking / vet / vaccination / tick lines (price block 210–296px) still wrap onto their own right-aligned line, as designed. | The dog page renders no flat lines; the cat, walking and vet pages and `/pricing/` do. Re-measure on `/pricing/` in the integrated build (requests D-2). |

---

## 4 · Gate results — final build of this stage (`PUBLIC_PDS_PREVIEW_LIVE=wave1`, page `/ludhiana/dog-grooming/`)

| Gate | Result | Notes |
|---|---|---|
| `check:pages -- --pages /ludhiana/dog-grooming/` | **2 FAIL · 11 WARN** | Both FAILs are P161 on `service_dog-grooming` (W1L-15; the `sources.ts` fix is `requests/w1-layout.md` A-2). The 11 WARNs are P074 links to live Wave-1 routes other stages build (`/`, `/pricing/`, `/how-it-works/`, `/about/`, `/contact/`, `/faq/`, `/privacy-policy/`, `/terms/`, cat / walking / vet) — expected in a one-page worktree. Every other rule passes: title 58 / meta 153 / H1 = blueprint §1, canonical + og:url, images (hero eager + preloaded, the rest lazy), fragments, schema types + FAQ/Offer visibility, breadcrumb = BreadcrumbList, NAP, viewport/lang, `rel="noopener"`, every other source canonical |
| `check:budgets -- --pages /ludhiana/dog-grooming/` | **0 FAIL · 0 WARN** | CSS 48,029 B of 51,200; scripts 3 (analytics, JSON-LD, exit card — tagged); 2 font preloads; booking island 80.7 KB gz (the page loads none of it) |
| `check:prices` | **OK** | no ₹ literal in components or copy; FAQ prices match pricing.json |
| `test:site -- --pages /ludhiana/dog-grooming/ --port 4511` | **0 FAIL · 1 WARN** | 360 / 768 / 1280: no overflow, no console errors, no failed requests, axe clean, JSON-LD parses, CLS 0.000; **fold ok at 360×640**; tracking ok (10 links clicked, each logged with its `data-source`); exit card ok at 1280 and absent on `/book/`. The WARN is P099 at 1280 (LCP = the H1 while the hero is a grey placeholder — clears with the real photo, requests C-1) |
| `test:e2e` (port 4510, without the preview flag) | **55 passed, 0 failed** | the booking flow is untouched by this stage |

Screenshots (fold 360×640, full pages at the three widths, hero at 360 / 768 / 1280, chunked 360 and 1280 pages):
`scratchpad/wave1/w1-layout/` of this session. Fold at 360×640 re-measured on the final build: photo top + 160 = 565 vs the
sticky bar's visible top 583 — 17.8 px spare, price chip and first trust chip whole (unchanged from §1.2).

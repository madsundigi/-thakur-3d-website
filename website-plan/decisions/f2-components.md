# f2-components — decisions log

Wave 1 · stage f2-components · branch `wave1/f2-components` (base `bdb53a8`). Scope: `website/src/components/`
Hero, ServiceCard, GroomerCard, StepsStrip, PriceMatrix, CtaBand, Breadcrumb, Faq, Chip, Photo, AreaCard,
ReviewCard, BeforeAfter, plus the new InfoTable, CheckList and TableFrame.
Rule order applied: 02 [Launch-blocker] > page blueprint > 00 §11 > 06/07/08/04/09.

---

## 1 · Fold law (E3 · 02 P150 · 08 §4.6 · template SP-1) — measured

**Method.** Throwaway pages (deleted before commit) rendered each page's Breadcrumb (money pages) + Hero with its
**final** hero copy inside the real `Base` layout, so the sticky header and the sticky bar were present. Copy:
06 §2.3 plus the blueprints (home H-1, dog-grooming / cat-grooming / dog-walking / vet-at-home SP-1). Every price came from
`src/lib/pricing.ts`. Primary CTAs followed E1/D2. The vet hero carried the vet-at-home.md SP-1 emergency line as its
`notice`. Measurement: Playwright Chromium at 360×640, DPR 2, `isMobile`, after `document.fonts.ready`, with the grey
placeholder photo (the same 16:10 box a real photo gets).

**Limit.** E3 puts the sticky bar's top at 640 − 56 = 584. The bar also has a 1px top border, so its visible edge is
at **583**. Verdicts below use 583, the stricter edge. "Photo +160" is the photo's top + 160px. The breadcrumb was
measured twice: as built (`py-3`, 44px tall) and with `py-2` simulated (36px). `py-2` is the chrome agent's change.

### 1.1 BEFORE (Hero as of `bdb53a8`)

| Page | H1 bottom | Subhead bottom | Primary CTA bottom | 1st chip bottom | Photo top | Photo +160 | Over the bar (py-3 / py-2) |
|---|---|---|---|---|---|---|---|
| home | 209.7 (3 lines) | 394.5 (6 lines @18px) | 486.5 | 582.5 | 598.5 | 758.5 | **+175.5 / +175.5** (no breadcrumb) |
| dog-grooming | 217.8 (2) | 373.8 (5 @18) | 437.8 | 533.8 | 549.8 | 709.8 | **+126.8 / +118.8** |
| cat-grooming | 217.8 (2) | 345.0 (4 @18) | 409.0 | 505.0 | 521.0 | 681.0 | **+98.0 / +90.0** |
| dog-walking | 289.5 (4) | 416.7 (4 @18) | 480.7 | 576.7 | 592.7 | 752.7 | **+169.7 / +161.7** |
| vet-at-home | 217.8 (2) | 345.0 (4 @18) | 409.0 | 505.0 | 521.0 | 681.0 | **+98.0 / +90.0** (no `notice` support) |

All five failed. The eyebrow and the secondary CTA were visible, and the subhead was body-lg (18px).

### 1.2 AFTER (this branch: E3 + notice + 8px of gap tightening, F2C-2)

| Page | H1 bottom | Subhead bottom | Primary CTA bottom | Notice bottom | 1st chip bottom | Photo top | Photo +160 | Verdict, breadcrumb py-3 | Verdict, breadcrumb py-2 |
|---|---|---|---|---|---|---|---|---|---|
| home | 183.5 (3 lines) | 327.4 (5 @16px) | 415.4 | — | 455.4 | 467.4 | 627.4 | **FAIL +44.4** | **FAIL +44.4** (no breadcrumb) |
| dog-grooming | 191.7 (2) | 309.2 (4 @16) | 369.2 | — | 409.2 | 421.2 | 581.2 | PASS, 1.8px spare | PASS, 9.8px spare |
| cat-grooming | 191.7 (2) | 309.2 (4 @16) | 369.2 | — | 409.2 | 421.2 | 581.2 | PASS, 1.8px spare | PASS, 9.8px spare |
| dog-walking | 263.3 (4) | 380.9 (4 @16) | 440.9 | — | 480.9 | 492.9 | 652.9 | **FAIL +69.9** | **FAIL +61.9** |
| vet-at-home | 191.7 (2) | 309.2 (4 @16) | 369.2 | 441.2 | 481.2 | 493.2 | 653.2 | **FAIL +70.2** | **FAIL +62.2** |

With py-2: every column moves up 8px on the four money pages, as the verdicts show. Below md the eyebrow and the
secondary CTA are hidden on every page, and there is no horizontal overflow (scrollWidth 360).

Dog and cat pass. Their margin with today's breadcrumb is only 1.8px; once chrome lands `py-2` it is 9.8px.

### 1.3 P150 exceptions for Sunny (still failing; threshold untouched)

For each failing page, candidate copy edits were rendered and measured the same way. The smallest change that clears
the fold is listed first. None of these changes has been made. The copy is plan-locked and needs Sunny.

| Page | Over by (py-3 / py-2) | Smallest copy change that fixes it (measured) | Result | Next options measured |
|---|---|---|---|---|
| **home** (H-1) | +44.4 / +44.4 | Subhead from 5 lines to 3. Delete the closing sentence "Serving Sarabha Nagar, BRS Nagar, Model Town & all of Ludhiana." and "sanitised" ("sealed sanitised kit" → "sealed kit"), so "₹299." stays on line 3. Deleting "background-" instead of "sanitised" measures the same. | PASS, 8.3px spare | Closing sentence only: still +18.0. Hiding the Hinglish support line below md (layout, no copy change) and shortening the closing sentence to "Serving all of Ludhiana.": PASS, 10.0. Hiding the Hinglish line alone: +16.4. |
| **dog-walking** (SP-1) | +69.9 / +61.9 | H1 from 4 lines to 2: "Dog Walker in Ludhiana" (drop " — Daily Walks from ₹2,999/month"). The primary keyword stays first. The monthly price still appears in the title/meta and in SP-4. | PASS, 1.8 (py-3) / 9.8 (py-2) | "Dog Walker in Ludhiana — ₹2,999/month" (3 lines) needs the subhead cut to its first sentence as well: +7.7 / PASS 0.3. That H1 alone: +34.0 / +26.0. |
| **vet-at-home** (SP-1) | +70.2 / +62.2 | Two edits are needed. (1) Subhead = its first sentence only, "A registered veterinarian examines your pet at home — no stressful clinic trip." (2 lines; the ₹699 / MRP facts are already in the chips). (2) The emergency notice down to 2 lines (≈ ≤ 80 characters at 360px), e.g. "Not for emergencies — for accidents, poisoning or seizures, see a 24-hour vet." | PASS, 2.6 (py-3) / 10.6 (py-2) | Edit (1) alone: +17.4 / +9.4. Notice trims that stay at 3 lines change nothing. Edit (2) drops "heavy bleeding" from a mandatory safety line (vet-at-home.md §0.2). **Recommendation: Sunny accepts a P150 exception for vet-at-home rather than weakening the emergency line.** |

### 1.4 Finding — the first *trust* chip is cut off horizontally at 360 on every page (open question)

The base chip row is a single scroll-snap line (08 §4.6) with the price chip first (SP-1 rule 5). The price chip is
always fully visible. The first trust chip, measured as built:

| Page | First trust chip (x) | Fade starts | Readable part |
|---|---|---|---|
| home / dog / cat | 119–375 | 312 (row edge 344) | "✓ Background-verified groom…" |
| dog-walking | 153–341 | 312 | "✓ Fixed verified walke…" |
| vet-at-home | 115–361 | 312 | "✓ Registered veterinarians on…" |

Vertically the chip row clears the bar on dog and cat. Read strictly, E3's "≥ 1 trust chip **fully** visible" fails
horizontally on all five pages, whatever the copy. A CSS-only fix was measured. Below md, show the first trust chip
before the price chip (flex `order`; DOM order and screen-reader order unchanged). Then the first trust chip sits at
16–272 / 16–204 / 16–262, fully visible on every page, and the price chip is the one that gets clipped. Every subhead
or H1 already carries the price. **Not shipped:** it reverses SP-1 rule 5's order on phones. This needs an
orchestrator/Sunny call (requests file, item O-1).

---

## 2 · Component decisions

| # | Decision | Why |
|---|---|---|
| F2C-1 | **E3 as specified.** Below md: the eyebrow is `max-md:hidden` and the H1's top margin applies only from md. The secondary CTA is `max-md:hidden`, so it leaves the tab order too. The subhead is body (16px / 1.65) and becomes body-lg from md, set in the Hero's scoped CSS: `.t-body-lg` is unlayered in global.css, so it beats any Tailwind utility. | E3; 08 §2.2 tokens. The eyebrow stays in the DOM, so its secondary keyword is still crawlable. |
| F2C-2 | **8px of extra fold room.** Below md, the subhead → CTA row and chips → photo gaps go from 16px to 12px (`mt-3`, still on the 4px scale). From md up the spacing is unchanged. | Without it, dog and cat fail by 6.2px with today's breadcrumb; with it they pass, 9.8px spare after py-2. The threshold is not lowered. |
| F2C-3 | **Hero `notice`.** A separate grid item placed right after the copy block. Below md it sits directly under the CTA row, inside the fold. From md it sits under R3 ('copy' → 'reply' → 'notice' → 'chips'), matching vet-at-home.md SP-1 "Under the CTAs, after R3". Markup: `<p role="note">`. Not `role="alert"`, which announces on page load: this is static advice. The alert-circle icon is coral (3.49:1, non-text ≥ 3:1). The text is alert-ink 500, 14px (6.03:1). | Instruction 2; 08 §1.4 rule 4 (coral is a signal; alert text uses alert-ink); 08 §7. |
| F2C-4 | **Hero `compact`.** No photo: a `photo` prop is ignored. Reduced padding: base pt-16px/pb-32px, md 40/40, lg 48/48 (normal hero: 16/64 → md 64 → lg 96). The H1 stays `display`, since it is still a hero. Every other behaviour (E3, chips, R3) is the same. | /pricing/ PR-1. |
| F2C-5 | **C3 hooks.** `data-hero` (section) · `data-hero-h1` · `data-hero-subhead` · `data-hero-photo` (photo wrapper) · `data-hero-notice`. `data-hero-primary` sits on a flex wrapper whose box equals the button's box. Button.astro isn't mine and drops unknown attributes (request R-B1). `data-hero-chip` is on each chip's `<li>`; the li is flex, so its box is the chip's. Its value is `"price"` or `"trust"`, so tests can tell the two apart. | Contract C3. |
| F2C-6 | **Hero chip row is focusable** (`tabindex="0"`). The edge fade is dropped while the row has focus. | axe `scrollable-region-focusable` (serious, pre-existing): below md the row scrolls sideways with nothing focusable in it, so keyboard users could not reach chips 2–5. Verified: Tab reaches it after the primary CTA, ArrowRight snaps chip by chip, and the ring is not faded. Same pattern as the table scroller. |
| F2C-7 | **TableFrame.astro owns the shared table CSS.** It holds the surface, the focusable scroll region, the base fade (dropped on focus-within), the header row, the 52px rows, the zebra, `td.is-featured`, the sticky first column, the 40px trailing pad and the md/lg padding. These rules reach the parent's `<table>` through `:global()` under its scoped scroller. PriceMatrix keeps only its matrix rules: 640px minimum, breeds column, Book links, flat lines, and a 96px scroll-padding set via `.pm :global(.tf-scroll)`. The header-row utilities moved into TableFrame's CSS. | Instruction 3: share, don't duplicate. **PriceMatrix verified unchanged:** 0 differing pixels (full-page shots at 360/768/1280, 4 variants) and 0 computed-style differences (296 elements × 28 properties × 3 widths). |
| F2C-8 | **InfoTable ✓ / —.** ✓ is the Lucide `check` icon (20px, brand), not U+2713: Inter's Latin subset lacks that glyph, so each phone would draw a fallback face. — is U+2014, which Inter has, in slate. Each mark carries sr-only "Included" / "Not included". | Instruction 3; 08 §6.1. |
| F2C-9 | **InfoTable layout.** A column holding any boolean is centred, and strings in it (the durations row) don't wrap. Below md, columns get minimum widths so nothing collapses to one word per line; the table scrolls instead. Row labels ≥ 9.5rem, ✓ columns ≥ 7.5rem, a header with a note longer than 24 characters ≥ 11rem, text cells ≥ 7rem. From md the minimums go and the table fits (checked at 768). Row labels are 16px medium with snug leading. Text cells are 14px with `text-sm` on the td itself, so the line boxes follow it. `wide` sets the 08 §4.8 640px minimum, for wide text tables such as "Grooming by breed". | Measured screenshots at 360/768/1280. |
| F2C-10 | **InfoTable package mode.** The featured column comes from the pricing.json `badge` of `columns[].serviceId`; today that is Full Groom, "Most booked". Its cells are sand and the badge sits under its label. An id that pricing.json doesn't know (e.g. a cat plan id) just gets no badge, with no build error. Durations become a final row whose label is "Typical duration" (template SP-3; override with `durationLabel`). Footnotes go under the table; the default slot renders after them. `columnLabels` / `columnNotes` override by serviceId (object) or by position (array). An array is needed for the cat table, whose two columns share `cat-grooming`. | Contract C1; template SP-3; pricing PR-4. |
| F2C-11 | **InfoTable guards.** A missing caption, a missing `rowHeader`, or a row whose cell count ≠ column count fails the build. `rowHeaders={false}` gives a table with no row headers and nothing sticky (the vet "can / can't" pair). ₹ figures inside cells and notes are set in price type, so pass them from the pricing helpers only. | A data slip must fail the build, never ship. 08 §2.2 price type. |
| F2C-12 | **CheckList.** The prop is `items` (cards). The grid is 1 column at base, 2 from md when there are 2+ cards, 3 from lg when there are 3+. A single card is capped at 36rem. A card shows: optional badge (`Chip kind="badge"`; amber, so "Most booked" only, 08 §1.4 rule 1) → h3 title → price line (figures in 20px price type) → ✓ items (brand check, 14px ink) → note (14px slate) → optional CTA. The per-card CTA uses named slots `cta-1`…`cta-n` (1-based), rendered via `Astro.slots.render`, and is pinned to the card foot (`mt-auto`). | Instruction 4; 06 §5.3; template SP-3. |
| F2C-13 | **ServiceCard.** The default chip is now `cardPriceChip(card page, onPage)` for all 7 money pages, and the `SERVICE_PRICE_CHIP` import is dropped. Verified identical for all 7 pages without `onPage`. `onPage` takes a slug or a path (`'vet-at-home'`, `'/ludhiana/vet-at-home/'`, `'/'`, `'home'`, `'ludhiana'`, `'pricing'`); anything else fails the build. `blurb`/`photo` stay required props until the registry defaults are wired. | Instruction 5; one price source. |
| F2C-14 | **GroomerCard `speciality`.** Replaces item ④'s speciality for that card (e.g. cat-grooming SP-7 "Persian cat de-matting"). It must be true of the person (honesty law). | Instruction 6. |
| F2C-15 | **StepsStrip.** The span wrapping h3/p (invalid HTML) is now a div. A default slot renders under the `<ol>` (R4 / support line + "See the full process"). Added `headingId` (default `steps-heading`), so two strips on one page can't share an id. Added the 08 §4.9 dashed connector, which was missing: a 2px dashed line-colour rail between discs below md, and disc to disc from md, via CSS only. | Instructions 6–7; 08 §4.9. |
| F2C-16 | **Breadcrumb links get a 44px hit area.** An invisible `::before` adds 12px above and below and 4px to each side, so "Home" is about 46×44. Layout is untouched, so the row height and the fold don't change. Neighbouring targets stay 14px apart. `py-3 → py-2` is left to chrome. | 08 §7.3 (the links were 20px tall). Pre-existing bug; it surfaces once "Home" goes live. |
| F2C-17 | **Chip `verified`.** The default tick is drawn as the check icon after "Background-verified", as on GroomerCard, instead of the typed U+2714. The linked badge gets `-my-2.5`, so its 44px hit area doesn't make its row 44px tall. | U+2714 isn't in the Inter subset (fallback face or colour emoji per phone), and screen readers read it as "heavy check mark". GroomerCard already uses this pattern. |
| F2C-18 | No change to CtaBand, Faq, Photo, AreaCard, ReviewCard or BeforeAfter. They were reviewed against 08 §4 / §7 and their data helpers; no real bug found. | Instruction 7. |

---

## 3 · Verification (this branch)

- `npm run build` ✓ · `npm run check:prices` ✓ ("no ₹ literals in components or .ts copy").
- e2e (`E2E_PORT=4416`) **55 passed, 0 failed**.
- Kitchen sink (throwaway, deleted). Contents: Hero with notice, compact Hero, InfoTable package mode (dog, plus cat
  with array notes on a tint), InfoTable plain (wide breed table, no-row-header vet table), CheckList (3 cards with a
  CTA slot; 2 cards with badge + note), ServiceCard `onPage` ×3, GroomerCard speciality + vet card, StepsStrip with
  slot, PriceMatrix, chips. At 360 / 768 / 1280, `scrollWidth` = viewport (no horizontal overflow) and all
  screenshots were reviewed.
- axe-core (wcag2a/aa, 21a/aa, 22aa, best-practice) on the fold pages and the kitchen sink: no violations from these
  components after F2C-6. What remains is outside this scope or an artefact of the test pages: WaFloat outside a
  landmark (chrome, R-C4), and duplicate landmark names only because the throwaway pages render two heroes / two
  identical matrices on one page.

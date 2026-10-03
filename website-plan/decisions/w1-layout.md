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

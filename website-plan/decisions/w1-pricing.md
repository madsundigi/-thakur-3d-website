# Decisions — stage w1-pricing (Wave 1, `/pricing/`)

Branch `wave1/w1-pricing` (base `abf5c3b`, plus the f2-gates merge `ba52caa`). Files: `website/src/pages/pricing.astro`,
`website/src/data/pages/pricing.ts`, `website/src/components/pages/pricing/{PriceSection,SizeGuide,GroomClub,OffersStrip}.astro`,
`website-plan/blueprints/pricing.md` (§2.1 only). Blueprint: `blueprints/pricing.md` (B06).

Rule order applied: 02 [Launch-blocker] > page blueprint > 00 §11 > 06/07/08/04/09. Shared components, layouts, data
files, `routes.ts` and `faq.json` are untouched. Every need in them is in `requests/w1-pricing.md`. The "Loses / sync"
column names the doc that has to follow.

## 1 · Decisions

| # | What | Why | Loses / sync |
|---|---|---|---|
| W1P-01 | **P040 note added** to `pricing.md` as §2.1, dated 2026-10-03, for "dog grooming price ludhiana" (+ "pet grooming price list ludhiana"). It records what ranks: aggregator city pages publishing package prices, directories and one listicle; the secondary query returns no Ludhiana price list. It also records how the page matches that format. The tool's index is US-based and shows no map pack, so the note asks for a re-check on a Ludhiana phone at the launch audit | 02 P040 (launch-blocker). §2.1 keeps every cited section number (§3, §5, §6) and the "Head" parser intact | — |
| W1P-02 | **PR-1 subhead kept verbatim** ("The price you see is the price you pay — …"). §2 says the primary keyword lands in the PR-1 subhead, but the §3 subhead does not contain it. The keyword stays in the title, the H1 ("Dog Grooming & Pet Care Prices in Ludhiana", a close variant) and the meta | Copy law (verbatim wording) over a placement note in the same blueprint. P034 is [Important], and the H1 opens the page | `pricing.md` §2 row 1 (request D-1) |
| W1P-03 | **H2s the blueprint leaves open** are written: PR-2 "Which size is your dog?", PR-9 "First-groom and referral offers", PR-11 "Prices & payment — your questions". **PR-4** uses the template SP-3 H2 "What's included in every dog grooming package": the block is "the ✓-grid from SP-3 — same component, same wording". PR-3/5/6/7/10 are the blueprint's H2s, and PR-8 is `GROOM_CLUB_HEADLINE` | Every block is a `<section>` named by its H2 (08 §7.5 landmarks; 02 P028/P029). The FAQ H2 follows the template SP-10 pattern ("… — your questions"). PR-9 avoids "dog grooming offers", the `/offers/` primary keyword (P033) | `pricing.md` §3 (request D-2) |
| W1P-04 | **R1 + R2 under every price list**: PR-3 (blueprint), PR-5 and PR-7 (06 §5.4: "mandatory … directly under every price table"). **PR-6**: R1 + `WALK_PAYMENT_LINE` in R2's place, exactly as dog-walking SP-4 does ("R2 adapted"). **PR-7**: the blueprint's vet line goes under R1 + R2 (PriceMatrix slot) | The blueprint cites 06 §5 as its price rules. The money pages render their flat lists the same way, so the page and the service pages read alike | `pricing.md` PR-5/PR-7 (request D-2) |
| W1P-05 | **PR-3 caption is visible** (`showCaption`): "Pet grooming price list, Ludhiana" titles the matrix | The blueprint puts the secondary keyword in the caption, so it should be on-screen text, not sr-only | — |
| W1P-06 | **PR-4** = `InfoTable` with `PACKAGE_TABLES['dog-grooming']` (the dog page's SP-3 table, also showing "Premium Spa (dog spa at home)" per F2-08), `onTint`, and `columnNotes={{ 'full-groom': FULL_GROOM_NOTE }}`. The note is the blueprint wording, pinned on this page even though the shared table carries the same note | Brief; pricing.md PR-4. If the shared note changes for the dog page, /pricing/ keeps its keyword note | — |
| W1P-07 | **PR-8 maths table** = a plain `<table>` in the shared `TableFrame`, with three columns: Dog size · Full Groom · Groom Club price, the club cell also showing "save {saving}" (the blueprint's "₹1,199 → **₹1,019** (save ₹180)"). The club column is the featured sand. There is no strikethrough | First built with `InfoTable`. Its base column floors (9.5rem + 3 × 7rem ≈ 488px) made it scroll sideways on every phone width and hid the club price, the key figure. Measured after the change at 360: the region's scrollWidth equals its clientWidth (326 px), so no sideways scroll. 06 §7.4 bans inflated strikethroughs | — |
| W1P-08 | **Groom Club pitch** = `GROOM_CLUB_PITCH` title + body (06 §7.3 verbatim, figures computed), with 06's bold on the title and on "15% off", "free nail-trim visit" and "priority slots". If a phrase disappears from the shared wording, the build fails | "Pitch verbatim from 06 §7.3", formatting included | — |
| W1P-09 | **[Join Groom Club]** = `whatsapp` Button (wa.me, green), `waHref(groomClubWaText())` (size-less prefill: "…for my dog. My dog's size: ___"), `source="groomclub"`. It sits under the table, full width on phones | pricing.md PR-8, 09 §2d, F2-17 | — |
| W1P-10 | **PR-9 offers** = two sand cards: `FIRSTGROOM_LINE` + `FIRSTGROOM_TERMS`, and `REFERRAL_LINE` + `REFERRAL_TERMS`. The "See all offers" link to `/offers/` renders only while `isLive('/offers/')`, so it does not render at launch (`/offers/` is Wave 2) | 06 §7.4 (full terms wherever advertised); 02 P074 | — |
| W1P-11 | **Band rhythm**: hero paper → PR-2 sand → PR-3 paper → PR-4 sand → PR-5 paper → PR-6 sand → PR-7 paper → PR-8 mint → PR-9 paper → PR-10 sand → PR-11 paper → PR-12 brand-dark. Tables and lists on sand or mint use `onTint` (hairline border, no shadow) | 08 §1.4 rule 5 (adjacent sections never share a background), 08 §3.3 | — |
| W1P-12 | **Section geometry** (`PriceSection.astro`): 1200 px container, 16/24 px gutters, 48 px → 80 px vertical padding. The FAQ sits in a 760 px column; PR-10 shows its three paragraphs as three columns from md with a brand left rule | 08 §3.1 | — |
| W1P-13 | **Hero**: compact (`Hero compact`, no photo), eyebrow + H1 + subhead, [Book Now] → `/book/?src=hero_pricing` (amber), [WhatsApp us] → wa.me with `PAGE_PREFILL['/pricing/']`, both `source="hero_pricing"`. The standard 4 trust chips and R3 are the Hero defaults. There is no price chip: the blueprint names trust chips only | pricing.md PR-1, 07 §2 row 3, E3 (secondary + eyebrow hidden below md) | — |
| W1P-14 | **CTA band**: heading verbatim, [Book Now] → `/book/?src=ctaband_pricing` (amber primary), [WhatsApp us] → the page prefill (CtaBand's wa.me default: green). Both carry `source="ctaband_pricing"` and R3 is the default. There is no support line: the blueprint gives none | pricing.md PR-12, 09 §2d | — |
| W1P-15 | **Book links**: PR-3 rows go to `/book/?service=full-groom&size=<size>&src=pricing_row` (PriceMatrix's row link preselects the "Most booked" package). PR-5/6/7 lines go to `/book/?service=<id>&src=pricing_row`. The widget accepts only `service`, `size` and `src`, so the three walking lines share one target (Trial Week preselected) | 07 §2 row 5, 07 §2 prefill params | — |
| W1P-16 | **In-body link count** is 20 in `<main>` (17 of them `/book/` links), above 02 P071's 3–10 | The blueprint puts a Book link on every price row (P071 is [Important]; the blueprint wins). All internal links go to one live target | — |
| W1P-17 | **No extra links to the money pages**. The blueprint lists none for `/pricing/`, and 01 §2 has no outbound rule for it. The page links `/book/` (CTAs and rows) plus `/offers/` once that page is live | Build exactly per blueprint; anchors could be added later via the blueprint | — |
| W1P-18 | **Size guide** (`SizeGuide.astro`): three cards from `SIZE_MATRIX`, the same rows PR-3 prints. Each card shows the size, the kg on its own line and the breeds. A decorative dog icon grows 20 → 24 → 28 px | At 768 an inline kg wrapped mid-value ("10–25 / kg"); a separate line keeps all three cards alike | — |
| W1P-19 | **Head values** come from `data/pages/pricing.ts`: title + H1 verbatim, meta built with `fromPrice` / `planPrice` / `flatPrice` (the blueprint figures). The module fails the build if the title leaves 50–60, the meta leaves 120–158 or contains `"`, or the H1 leaves 20–70 | 02 P011/P019/P024/P026; 07 §4 (no ₹ typed) | — |
| W1P-20 | **Tick & Flea offers**: the markup names "Tick & Flea add-on" and "Tick & Flea standalone". The page shows "Tick & Flea · add-on ₹399 / standalone ₹699", the same words in the same line, so each name is the label plus the word before its figure | F2-13 (data stage) built both from `TICK_FLEA_LINE`; accepted as the visible wording | — |

## 2 · Copy written (not in any doc yet — sync verbatim)

- **H2s:** PR-2 "Which size is your dog?" · PR-9 "First-groom and referral offers" · PR-11 "Prices & payment — your
  questions".
- **PR-8 table:** caption (sr-only) "Groom Club price for one Full Groom a month, by dog size". Headers "Dog size",
  "Full Groom", "Groom Club price". The saving under each club price reads "save {saving}".
- **PR-9 link** (only once `/offers/` is live): "See all offers".

## 3 · Verification (2026-10-03, `PUBLIC_PDS_PREVIEW_LIVE=wave1` build)

- `npm run build` ✓ · `npm run check:prices` ✓ · `npm run check:pages -- --pages /pricing/` → 0 FAIL, 11 WARN (links to
  Wave-1 pages built by other stages) · `npm run test:site -- --pages /pricing/ --port 4531` → 0 FAIL, 0 WARN
  (overflow, console, HTTP, axe, ld+json, CLS 0.000 at 360/768/1280; fold ok; 11 tracked anchors; exit card ok).
- Manual Playwright pass: page `scrollWidth` = viewport at 360/768/1280. At 360 the PR-3 and PR-4 tables scroll inside
  their frames (shared design) and the PR-8 table fits. axe: 0 violations at any impact; the 5 "incomplete" items sit in
  the shared header/footer. No console errors or warnings. One ld+json `@graph` (OfferCatalog + FAQPage +
  BreadcrumbList). Every Offer price is printed on the page. 14 of the 16 Offer names appear verbatim; the two Tick &
  Flea names follow W1P-20. Title 56 · meta 156 · H1 42, equal to `pricing.md` §1.
- Keyboard walk: Tab order = visual order at 360 and 1280; the focus ring on table Book links is not clipped. One
  site-wide finding is filed as request C-1: the sticky bar can hide a focused element at the bottom edge.

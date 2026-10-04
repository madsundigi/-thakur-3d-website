# w1-cat — decisions log

Wave 1 · stage w1-cat · branch `wave1/w1-cat` (base `f66d994`, the nine live Wave-1 pages). Scope: `/ludhiana/cat-grooming/`
on the shared money-page layout `src/layouts/ServicePage.astro` (w1-layout), from `blueprints/cat-grooming.md` on
`blueprints/_TEMPLATE-service-page.md`. Rule order applied: 02 [Launch-blocker] > page blueprint > 00 §11 > 06/07/08/04/09.
Two sessions: the page was built on 2026-10-03 (`a2a2f6d`, cut off before verification) and verified, measured and
documented on 2026-10-04 — no code change was needed after verification.

---

## 1 · Shape

`src/pages/ludhiana/cat-grooming.astro` holds only the blueprint's copy values (`ServicePageConfig`) and three slot
components under `src/components/pages/cat-grooming/`: `PackageTable` → `sp3` (the ✓-grid + the cat-bath photo),
`CoatCareTable` → `sp4-extra` (the H3 "Persian & long-hair coat care"), `WhyHome` → `sp7-intro` (the three "why home"
points). Every ₹ string is built with pricing.ts helpers (`fromPrice`, `planPrice`, `flatPrice`); chips, the body CTA, the
areas, the OG image, the SP-11 card and the wa.me prefill come from `MONEY_PAGES['/ludhiana/cat-grooming/']`; the FAQs from
faq.json (`cat-grooming-1…8`). What was built, block by block: `blueprints/cat-grooming.md` §7.

## 2 · Decisions

| # | Decision | Why |
|---|---|---|
| W1C-1 | **Hero:** primary [Book on WhatsApp] → `/book/?src=hero_cat-grooming`, amber; secondary `'call'` = [Call [FILL:PHONE]] → `tel:`, hidden below `md`. Full subhead on phones (no `subheadShort`). | Blueprint SP-1 / 06 §2.3 verbatim; 00 §11 E1 fixes the target and colour. The fold passes with 17.8 px spare at 360×640 (blueprint §7), so no phone cut of the subhead is needed. |
| W1C-2 | **Hero alt** = "Cat sitting calmly on a towel during cat grooming at home in Ludhiana", no breed named. | 00 §11 E5: the alt describes the 08 §5.2 shot (shot 5, cat on a towel); the blueprint §5 says to name the breed only once the photo shows one — in the same commit as the real file. |
| W1C-3 | **SP-3 has no lead-in.** The block is the H2, the ✓-grid (`PACKAGE_TABLES['cat-grooming']`, blueprint table verbatim) and the §5 cat-bath photo. | The blueprint's SP-3 gives a table and footnotes only; the template SP-3 formula has no lead-in either. Inventing one would be new customer-facing copy. |
| W1C-4 | **SP-3 photo placement:** from `lg` the photo sits beside the grid (7fr/5fr, vertically centred); below `lg` it follows the grid, capped at 480 px. The dog page splits at `md`; this one waits for `lg`. | The 3-column grid is 736 px wide at 768 on its own (both package headings on two lines); in a 7fr share of the 736 px content width it would be squeezed to ~420 px and scroll. At 1280 the grid takes 644 px beside a 460 px photo (measured). The grid stays first in DOM order on phones so the inclusions are never pushed a screen down (the dog page rule). |
| W1C-5 | **The SP-3 grid scrolls 80 px sideways at 360** (408 px in a 328 px column; Included 152 · Cat Bath & Brush 120 · Cat Full Groom 136) behind the InfoTable edge fade, with the sticky Included column. Not changed; no `columnLabels` shortening. | The column headings "Cat Bath & Brush ₹899" / "Cat Full Groom ₹1,399" are the blueprint table's verbatim; the widths are InfoTable's W1L-20 floors (row labels > 12 characters keep 9.5rem, text columns 7rem), so even "Bath & Brush ₹899" would not fit two columns in 328 px (152 + 2 × 112 = 376). 08 §4.8 makes a wide table scroll with a sticky first column; the dog page and `/pricing/` behave the same. Fits without scroll from 768 (736 px). |
| W1C-6 | **SP-3 cat-bath photo:** `cat-bath-home-ludhiana.jpg`, `preset="card"` (4:3), alt = the blueprint §5 line (the page's second and last Hinglish use). The shot is **not** one of the 14 in 08 §5.2. | Blueprint §5 requires the shot and its alt (03 §5 row 9: Hinglish in the cat-bath alt); the blueprint outranks 08. The filename follows 08 §5.5 (`{subject}-{action}-{qualifier}-ludhiana`, 4 words). Adding it to the shot list and the photos README is `requests/w1-cat.md` C-1 / D-1. |
| W1C-7 | **SP-4 = the flat-price list** (`sp4.lines = 'cat-grooming'`, pricing.ts): Cat Bath & Brush ₹899 · Cat Full Groom ₹1,399 (note "any breed, any coat") · Flea treatment add-on ₹399 (note "(cat-safe products)", no Book button) · Nail Trim + Ear Clean visit ₹299. The blueprint's single line "Cat Bath & Brush ₹899 · Cat Full Groom ₹1,399 — any breed, any coat" renders as two lines with the note under Cat Full Groom. | Template SP-4: flat-price pages render the 06 §5.2 flat-price-line list (one figure per line, row-end Book links); the set lives in pricing.ts (shared, w1-pricing) and is not this stage's to reword. An add-on has no Book link because it is booked with a groom (pricing.ts PriceLine rule). The add-on's sibling link (template SP-3) waits for `/ludhiana/tick-flea-treatment/` to be live (P074) — requests B-2. |
| W1C-8 | **The coat-care table** is an H3 inside SP-4, after the mid-page CTA and the `/pricing/` link (`sp4-extra`), as an InfoTable `wide onTint` with `rowHeader="Cat"`; the one ₹ figure comes from `flatPrice('nail-ear')`. | 00 §11 (2026-10-02): page-specific sections are H3 sub-sections inside the nearest template block, never new blocks; the blueprint places it under SP-4. Sand band → `onTint`; 640 px minimum (08 §4.8), so it scrolls below `md` with the sticky Cat column and fits from 768 (734 px). |
| W1C-9 | **SP-7:** the blueprint's H2 "Why home beats the salon for cats" and supporting line replace people.ts `MEET_GROOMERS`; the three points go in the layout's `sp7-intro` slot — between the H2 and the supporting line, before the cards — as a numbered `<ol>` with the StepsStrip discs (08 §4.9), bold lead + sentence verbatim, no card surface; 1-col base, 3-up from `md`. | Blueprint SP-7 order: H2 → 3 points → supporting line → cards. The slot position is the layout's (w1-layout §2.3). No surface because the SP-7 band is sand today and paper once SP-5 renders (W1L-10) — the points must read on either tone. Same `<ol class="list-none">` markup as StepsStrip, so list semantics match site-wide. |
| W1C-10 | **No groomer cards** render (every groomer is a `[FILL:*]` placeholder); the block is H2 → points → line → "How we hire" → `/about/`. The blueprint's "Cards show cat specialities (e.g. Persian cat de-matting)" is people.ts `specialityOn['cat-grooming']`, wired through `GroomerCard page={slug}` by the layout. | people.ts honesty law (W1L-14). The speciality line is data for the hiring owner — only when true of the person (requests B-1). |
| W1C-11 | **SP-10 heading** "Cat grooming at home — your questions". | The blueprint names none; the template SP-10 pattern "<Service> at home — your questions" (dog: "Dog grooming at home — your questions"). |
| W1C-12 | **SP-12 heading verbatim**, not `r8('Persian')`. | The blueprint line "Your Persian deserves a calm, stress-free groom at home. Slots this week across Ludhiana." adds "calm," to the R8 pattern; the blueprint's wording wins. Support line verbatim with `planPrice('cat-grooming', 'cat-bath-brush')`. |
| W1C-13 | **Hinglish budget = exactly 2:** FAQ #8 (question + answer, one use) and the SP-3 alt. The hero alt, the OG alt and the area anchors are English. | 03 §5 rule 4 (one or two per page); blueprint §6 ship check; 03 §5 row 9 places both uses. |
| W1C-14 | **Schema:** Service `offers` = the two flat cat packages only; the ₹399 add-on and the ₹299 nail visit are visible lines without Offers. | 04 §2.2 per-page table ("Cat Bath & Brush → 899 flat · Cat Full Groom → 1399 flat"), kept by 00 §11 E8; `schema.ts` is shared. P087 checks that every schema price is visible, not the reverse. |
| W1C-15 | **SP-5 omitted** via `sp5: { kind: 'pairs' }` (no consented pairs); **SP-11 siblings** = the template's fixed cat set (Dog Grooming · Tick & Flea Treatment) with the week-16 post as `sp11.posts`; **SP-6 / SP-8 / SP-9** need nothing beyond the registries. | Template rules; W1L-11 / W1L-16 / W1L-18. |

## 3 · Block-by-block status (built HTML against the blueprint + template, 2026-10-04)

| Block | Status | Note |
|---|---|---|
| Head | ✓ verbatim | title 58 · meta 156 · H1; canonical/og:url self; og:image `/og/cat-grooming.jpg`; `@graph` Service + FAQPage + BreadcrumbList |
| SP-0 | ✓ | Home › Ludhiana › Cat Grooming at Home; BreadcrumbList = the visible crumb (P084) |
| SP-1 | ✓ verbatim | eyebrow, H1, subhead, CTAs, chip order (price first), alt, R3; fold 17.8 px spare |
| SP-2 | ✓ | proof line, E6 empty state, E4 row `Book Cat Grooming — from ₹899` + R2 |
| SP-3 | ✓ verbatim | H2 = §2 line; 8 rows + duration + footnotes (a) and the matting line; cat-bath photo + alt |
| SP-4 | ✓ | 4 flat lines, R1 + R2, mid-page CTA, `/pricing/` link, H3 coat-care table (3 rows verbatim); no size matrix |
| SP-5 | ✓ omitted | pre-launch rule; data-driven |
| SP-6 | ✓ | 4 steps, R4, "See the full process" |
| SP-7 | ✓ verbatim | H2, the 3 points, supporting line, "How we hire"; no cards (none hired) |
| SP-8 | ✓ | 4 points (on-time point gated) |
| SP-9 | ✓ verbatim | intro, Civil Lines · Kitchlu Nagar · Sarabha Nagar, the 7-area closing line |
| SP-10 | ✓ verbatim | 8 Q&As = FAQPage entries; links only to live targets |
| SP-11 | ✓ | Dog Grooming (linked) · Tick & Flea ("Coming soon"); post link once live; "Last updated" once dated |
| SP-12 | ✓ verbatim | heading, support, wa.me prefill + Call, `ctaband_cat-grooming`, R3 |
| SP-13 | ✓ | `Book · from ₹899`, `sticky_bar`; desktop float |

## 4 · Gate results — final build of this stage (`PUBLIC_PDS_PREVIEW_LIVE=wave1`, page `/ludhiana/cat-grooming/`)

| Gate | Result | Notes |
|---|---|---|
| `npm run build` | OK | 13 pages, no warnings |
| `check:pages -- --pages /ludhiana/cat-grooming/` | **0 FAIL · 2 WARN** | both WARNs are P074 links to live Wave-1 routes other stages build (`/ludhiana/dog-walking/` from the footer nav; `/ludhiana/vet-at-home/` from FAQ #5 and the footer nav) — expected in a one-page worktree; every other rule passes (head = blueprint, canonical/og, images eager/lazy + preload, fragments, schema types, FAQ/Offer visibility, breadcrumb, NAP, viewport/lang, `rel="noopener"`, every source canonical — `service_cat-grooming` is a real service id) |
| `check:budgets -- --pages /ludhiana/cat-grooming/` | **0 FAIL · 0 WARN** | CSS 50,423 B of 51,200 (777 B headroom). In the same build the dog page is 50,734 B and `/pricing/` 47,892 B — the dog page measured 48,029 B at w1-layout, so the growth since then is in the shared stylesheet, not this page: its three scoped components cost less than the dog page's; scripts 3 (analytics, JSON-LD, exit card — tagged); 2 font preloads; booking island 80.7 KB gz (not loaded here) |
| `check:prices` | **OK** | no ₹ literal in components or copy; FAQ prices match pricing.json |
| `test:site -- --pages /ludhiana/cat-grooming/ --port 4571` | **0 FAIL · 1 WARN** | 360 / 768 / 1280: no overflow, no console errors, no failed requests, axe clean, JSON-LD parses, CLS 0.000; **fold ok at 360×640**; tracking ok (11 links, each logged with its `data-source`); exit card ok at 1280, absent on `/book/`. The WARN is P099 at 1280 (LCP = the H1 while the hero is a grey placeholder — clears with the real photo, requests C-1) |

Screenshots (fold 360×640, full pages at the three widths, the exit card, and viewport-sized chunks of each full page):
`scratchpad/wave1/w1-cat/` of this session. Geometry above (fold, table columns) measured with Playwright Chromium against
`astro preview` on port 4571 after `document.fonts.ready`, DPR 2 + `isMobile` at 360×640.

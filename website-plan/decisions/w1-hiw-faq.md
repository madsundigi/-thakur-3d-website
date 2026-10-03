# Decisions — stage w1-hiw-faq (Wave 1: `/how-it-works/` + `/faq/`)

Branch `wave1/w1-hiw-faq` (base `abf5c3b`, gates branch `claude/pet-care-app-strategy-m04hr3` merged). Files:
`website/src/pages/{how-it-works,faq}.astro`, `website/src/data/pages/{how-it-works,faq}.ts`,
`website/src/components/pages/how-it-works/{DayTimeline,PrepChecklist}.astro`,
`website/src/components/pages/faq/CategoryNav.astro`, `website-plan/blueprints/{how-it-works,faq}.md`, this log and
`website-plan/requests/w1-hiw-faq.md`. Built in two sessions on 2026-10-03: the first was cut off right before its
final verification; the finisher re-ran every gate, walked both blueprints block by block against the built HTML,
reviewed the screenshots and wrote the requests file (§3).
Rule order: `02` [Launch-blocker] > page blueprint > `00` §11 > `06`/`07`/`08`/`04`/`09`. No shared component, layout,
data file, `routes.ts` or `faq.json` was edited; what those need is in `requests/w1-hiw-faq.md`.

## 1 · Decisions

| # | What | Why | Loses / sync |
|---|---|---|---|
| HF-01 | **`/faq/` head carries its primary keyword.** Title `Pet Grooming at Home Questions – Ludhiana FAQ \| PetDoorStep` (59), H1 `Pet Grooming at Home Questions, Answered` (40). Meta unchanged (155). | `01-SITEMAP.md` primary = *pet grooming at home questions*. The blueprint title ("…Home FAQs for Ludhiana") did not start with it (`02` P012) and the H1 ("Pet Care at Home — Your Questions, Answered") did not contain it (`02` P026 + the `00` §11 H1 rule "contain its primary keyword verbatim"). Both are launch-blockers, so they beat the blueprint wording; same fix as E11 for `/contact/`. The title keeps the blueprint's "FAQ" + "Ludhiana" as its hook (`02` P016 pattern). | `faq.md` §1 (updated, old wording quoted there). `00` §11 needs a row (request C1); `03` §3 has no trust-page row (request C4). |
| HF-02 | **P040 SERP-intent notes** dated 2026-10-03 in `how-it-works.md` §1a and `faq.md` §1a. | `02` P040 (launch-blocker): documented before the pages were written (commit order shows it). The search tool is US-located, so each note says to re-check from an Indian connection before launch (request C5). `/how-it-works/` has no mapped keyword (01: conversion support), so its note checks the intent queries it serves. | — |
| HF-03 | **HW-1 = `Hero.astro` text-only**: no photo, eyebrow or chips (`trustChips={[]}`); default R3 reply line kept under [Book Now]. | HW-1 names H1 · subhead · CTA only (home H-1 lists chips/photo when it wants them). R3 stays because `06` §9 places it "near first CTA on every page" (`06` §3.1). `test:site` WARNs "no [data-hero-chip]" exactly as f2-gates #16 anticipated; H1, subhead and CTA pass the 360×640 fold. | `06` §2.1 "every hero = … 4 trust chips + real photo" (the blueprint wins). |
| HF-04 | **HW-3 and HW-4 are page components** (`components/pages/how-it-works/`), styled after StepsStrip (40px brand discs, 2px dashed rail — `08` §4.9) and CheckList (Lucide ✓). HW-3: 1 column, from md 2 columns read top-down (1–3 \| 4–6). HW-4: a paper card on the sand band, 2 columns from md, closing line in brand-deep. | StepsStrip only renders `bookingSteps`; CheckList needs priced package cards. Neither fits a 6-line timeline or a plain checklist. | — |
| HF-05 | **HW-4 H2 = "What to prepare"** (the block name). | HW-2/HW-3 quote their H2s; HW-4 says "**What to prepare** (H2 checklist)". | — |
| HF-06 | **HW-6 FAQ H2 = "How it works — your questions"**. | HW-6 gives no heading; template SP-10's pattern ("Dog grooming at home — your questions"). New copy, synced into `how-it-works.md` HW-6. | — |
| HF-07 | **HW-6 ends with "More questions? See all pet grooming at home questions" → `/faq/`** (rendered only while `/faq/` is live). | No blueprint links `/faq/` from page content (grep of all blueprints), and `02` P068 (launch-blocker) needs ≥ 1 contextual inbound link per indexable page; the anchor is `/faq/`'s primary keyword (P069). New copy, synced into `how-it-works.md` HW-6. | — |
| HF-08 | **HW-7**: [Book Now] → `/book/?src=ctaband_how-it-works` (amber) · [WhatsApp us] → `wa.me` + `PAGE_PREFILL['/how-it-works/']` (green, `08` §1.4 rule 2) · both `data-source="ctaband_how-it-works"` · R3 line. | Blueprint HW-7 labels; `09` §2d `ctaband_<slug>`; `07` §2 prefill note. | — |
| HF-09 | **Steps and HowTo share one source.** `<StepsStrip anchors>` + `schemaGraphLd({ type: 'howto' })`, both reading `bookingSteps`. Verified: the built HowTo node equals the `04` §2.8 JSON block exactly, and every step name/text equals the visible `li#step-n`. | `04` §2.8 + HW-2 ship check. | — |
| HF-10 | **FAQ guards at build time**: `/how-it-works/` must render exactly `how-it-works-1…5` (HW-6 "5 Q&As"); `/faq/` must have 28 entries in 6 categories with unique anchors (faq.md §3). Anything else stops `astro build`. | A `faq.json` edit can never silently change these pages. | — |
| HF-11 | **FAQ-1 is a plain page header** (`t-h1`, no Hero): H1 + the blueprint line, whose "WhatsApp us" is an inline `wa.me` link with `PAGE_PREFILL['/faq/']`, `data-source="faq_page"`, new tab + `rel="noopener"`. | `faq.md` §5 names no hero, photo or button; `09` §2d `<slug>_page`. The intro line alone is held to the 65ch measure, so the H1 stays on one line at desktop. | — |
| HF-12 | **`/faq/` CTA band [Book on WhatsApp] uses a booking prefill**: "Hi PetDoorStep! I want to book a service (from your FAQ page). My area: ___ . My pet: ___", derived in `src/data/pages/faq.ts` from the `/how-it-works/` prefill (same shape, page name swapped; the build fails if the shape changes). [Call [FILL:PHONE]] → `telHref()`. Both `data-source="ctaband_faq"`. | `PAGE_PREFILL['/faq/']` is question-shaped ("…a question that isn't on your FAQ page"): right for FAQ-1, the sticky bar and the float, wrong under "Got your answer? Book your first visit…". The shape is the f2-data pattern every other non-money page uses (P158: names the source page). | `07` §2 note ("CtaBand wa.me CTAs use PAGE_PREFILL") for `/faq/` only — request D1 (services.ts to own it) and C2 (07 wording). |
| HF-13 | **Jump-links**: `<nav aria-label="FAQ categories">`, labels = the category H2s, anchors `#booking-and-prices` `#grooming` `#dog-walking` `#vet-and-vaccination` `#safety-and-trust` `#service-areas` (the H2 ids, via `Faq.astro` `headingId`). Pills in the secondary-button skin (`08` §4.1) below lg; from lg a sticky side column (top = header + 24px). Zero JS. | `faq.md` §5. Verified: every link lands its H2 16px under the sticky header (global `scroll-padding-top`) at 360 and 1280; the column stays put while scrolling. | `faq.md` §3/§5 (anchors added). |
| HF-14 | **Category one-line links** render inside `Faq.astro`'s slot (under the H2), text = `FAQ_PAGE_CATEGORY_LINKS`, target = the section `link`, only while `isLive(link)` — so "Safety & trust" shows none until `/safety-hygiene/` ships (Wave 2). | `faq.md` §3; `02` P074. | — |
| HF-15 | **44px hit areas for standalone text links** (the category links, the HW-6 link): `inline-block` + an invisible `::before` 10px above / 8px below the 26px line — layout unchanged, 8–9px kept to the next target. | `08` §7.3 (≥ 44px targets, ≥ 8px apart); Breadcrumb's pattern. `inline-block` because an inline link wrapped across lines gives its `::before` a collapsed containing block (CSS 2.1 §10.1) — measured. | — |
| HF-16 | **Section rhythm** — `/how-it-works/`: paper hero → sand (HW-2) → paper (HW-3) → sand (HW-4) → paper (HW-5 mint card + HW-6) → brand-dark band. `/faq/`: paper → brand-dark band. Section padding 48px → 80px from lg. | `08` §1.4 rule 5, §3.1. | — |
| HF-17 | **P091 and P012/P026 scope.** P091 (city in title + H1 + first paragraph) is read as N/A on both pages: it covers "every local landing page" (money/area pages); both titles still carry Ludhiana. P012/P026 are N/A on `/how-it-works/` (no mapped primary keyword). | `02` §1.3 "Applicable" rule — for the auditor. | — |
| HF-18 | **Blueprint syncs (docs I own)**: `how-it-works.md` FAQ #3 = `faq.json` `how-it-works-3` ("Yes. " + `RESCHEDULE_TEXT`, f2-data F2-20) + as-built notes; `faq.md` §3/§5 = `FAQ_PAGE_CATEGORY_LINKS`, `FAQ_CTA_HEADING`, the in-answer links, the prefills (f2-data request D5); ship checks extended. | Docs must not contradict the build. | — |
| HF-19 | **HW-5 shows the 4 un-gated Promise points.** The shared `PromiseBand.astro` drops point 4 "On time, or ₹100 off" while `policy.onTimeOr100Off` (`src/data/content.ts`) is false, and shows "Read the full Promise" only once `/safety-hygiene/` is live (Wave 2). Nothing to build here. | The blueprint's "5-icon strip (`06` §4.1)" *is* that shared band; `06` §4.1 marks point 4 POLICY GATE and content.ts says "never a softened fifth". A policy call for Sunny (`00` §3.4), not this stage's. | `how-it-works.md` HW-5 as-built note; request S1 so the audit reads 4 points as the gate, not a miss. |

## 2 · Copy written in this stage (not in any doc before; now in the blueprints)

- `/faq/` title `Pet Grooming at Home Questions – Ludhiana FAQ | PetDoorStep` · H1 `Pet Grooming at Home Questions, Answered` (HF-01)
- HW-6 H2 "How it works — your questions" · closing line "More questions? See all pet grooming at home questions" (HF-06/07)
- `/faq/` CTA-band WhatsApp prefill "Hi PetDoorStep! I want to book a service (from your FAQ page). My area: ___ . My pet: ___" (HF-12)
- Not visible: `aria-label="FAQ categories"` on the jump-link nav

## 3 · Verification (finisher pass, 2026-10-03; build with `PUBLIC_PDS_PREVIEW_LIVE=wave1`, main `50f75c3` merged)

- `npm run build` ✓ (5 pages) · `npm run check:prices` ✓ (no ₹ literals; FAQ prices match `pricing.json`).
- `npm run check:pages -- --pages /how-it-works/,/faq/` → **0 FAIL, 20 WARN** — every WARN is P074 "links to <live
  Wave-1 route> which is not in this dist" (`/`, `/pricing/`, the four money pages, `/about/`, `/contact/`, `/terms/`,
  `/privacy-policy/`): other builders' pages, resolved only in the full build (request I3).
- `npm run check:budgets -- --pages /how-it-works/,/faq/` → **0 FAIL, 0 WARN** — CSS `/how-it-works/` 42,002 B, `/faq/`
  40,790 B (≤ 51,200); 3 scripts each (analytics + exit card, both `data-pds`, + one ld+json); 2 font preloads.
- `SHOTS=… npm run test:site -- --pages /how-it-works/,/faq/ --port 4551` → **0 FAIL, 1 WARN** (P150 "no
  [data-hero-chip]" on the chip-less HW-1 hero, HF-03): overflow / console / http / axe / ld+json ok at 360×640,
  768×1024 and 1280×800; CLS 0.000 everywhere; fold ok; click tracking 9 (`/how-it-works/`) + 11 (`/faq/`) links; exit
  card ok at 1280×800.
- Own Playwright pass (`verify.mjs`, scratchpad) → **69 PASS, 0 FAIL**: axe serious/critical 0 with every accordion
  open (3 widths × 2 pages); no console errors; heading outlines never skip; HowTo step name + text = the visible
  `li#step-1…4` character-for-character, step URLs `https://petdoorstep.in/how-it-works/#step-n`; `/faq/` FAQPage =
  28 Q&As, each visible verbatim and in the same order; `#step-1…4` and the 6 jump-links land their target 16 px
  under the sticky header at 360 and 1280; the category column is sticky at 1280 (top 96 = header + 24); first Tab =
  the skip link; Enter on a jump-link navigates.
- Blueprint walk, DOM order, copy verbatim: `/how-it-works/` HW-0 … HW-7 ✓ (head 57 / 155 / 43; HW-2 = `04` §2.8;
  HW-5 renders the 4 un-gated Promise points, HF-19); `/faq/` FAQ-0, FAQ-1, jump-links, the 6 categories
  (7 + 6 + 3 + 5 + 4 + 3 = 28 in §3 order, the §4 entries verbatim, the category links only for live targets), CTA
  band ✓ (head 59 / 155 / 40). JSON-LD `@graph` = HowTo + BreadcrumbList / FAQPage + BreadcrumbList (`04` §2.9);
  breadcrumb names and URLs = the visible crumbs. Neither H1 appears in another blueprint (P027). FAQ #2 durations =
  `00` §3.2 (cat, walks) + `06` duration labels (dog); reschedule wording = `RESCHEDULE_TEXT` (build-enforced).
- Screenshots reviewed (scratchpad `wave1/w1-hiw-faq/`): full pages at 360 / 768 / 1280, the 360×640 folds, section
  crops (jump-link pills, an open accordion, both numbered rails, the CTA bands). No visual defect found.

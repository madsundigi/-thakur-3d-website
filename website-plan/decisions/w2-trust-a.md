# Decisions — stage w2-trust-a (Wave 2: `/reviews/` + `/safety-hygiene/`)

Branch `wave2/w2-trust-a` (base `c41a6b2`, the Wave-1 close-out). Files:
`website/src/pages/{reviews,safety-hygiene}.astro`, `website/src/data/pages/{reviews,safety-hygiene}.ts`,
`website/src/components/pages/reviews/ReviewWall.astro`, `website-plan/blueprints/{reviews,safety-hygiene}.md`
(§1a SERP note + §5 As built), this log and `website-plan/requests/w2-trust-a.md`. Both pages are the trust/proof
differentiators of Wave 2: `/reviews/` curates real Google reviews and sends people to Google to verify them;
`/safety-hygiene/` is the full Promise/hygiene protocol every Wave-1 "Background-verified ✔" badge links to.

Rule order: `02` [Launch-blocker] > page blueprint > `00` §11 > `06`/`07`/`08`/`04`/`09`. No shared component, layout,
data file, `routes.ts`, `sources.ts` or `faq.json` was edited; what those need is in `requests/w2-trust-a.md`.

## 1 · Decisions

| # | What | Why | Loses / sync |
|---|---|---|---|
| TR-01 | **Breadcrumb labels = the `routes.ts` page names**: `Home › Reviews` and `Home › Safety & Hygiene` (capital H). | Breadcrumb/Header/Footer all read `routeLabel()` (the `01` page names), and the BreadcrumbList schema must equal the visible crumb (`02` P084). | The blueprint SH-0 wrote "Safety & hygiene" (lowercase). `routes.ts` owns page names, so the crumb follows it; request C3 syncs the blueprint wording. |
| TR-02 | **RV-2 proof line = the shared `PROOF_LINE`** (`reviews.ts`, `06` §4.4): "★ `[FILL:GOOGLE_RATING]` on Google · `[FILL:REVIEW_COUNT]`+ Ludhiana pet parents", linked to `site.gbpLink`. | RV-2 says the values come "from the single reviews data file", and `PROOF_LINE` is that single source — already rendered byte-identically in the footer and on every Wave-1 page. Typing the blueprint's paraphrase "+ reviews" would diverge from the footer and duplicate the line outside the data file (which this stage can't edit anyway). | The blueprint RV-2 wording "…+ reviews" — a gloss of the same `06` §4.4 line (blueprint > `06`, but RV-2 itself defers to the data file). |
| TR-03 | **RV-3 + RV-4 render from real reviews only; dormant today.** `reviews.ts` holds only `[FILL:REVIEW_n]` seeds, so `reviewsReady()` is false and the **E6 empty state** renders instead of cards (the brief: "the empty state + the GBP link"). `ReviewWall.astro` groups real reviews **by service** in the RV-3 order and adds zero-JS anchor chips (one per non-empty service section + one per locality with ≥ 2 reviews, jumping to that locality's first card). | Honesty law (`02` P055/P086, reviews.md §3): no fabricated review ever ships; the page publishes only once ≥ 10 real Google reviews exist (§4). The grouped/filter UI is built so it renders correctly the moment real reviews land, without fabricating data now. | Nothing lost — mirrors the home `ProofBlock`/service-page SP-2 empty-state pattern. The monthly ritual (`09` §8) rotates the cards once real. |
| TR-04 | **`[FILL:GBP_REVIEW_LINK]` held in `reviews.ts`** (page data) as the RV-2 "Write a review" target. | `src/data/site.ts` owns `gbpLink`/`googleRating`/`reviewCount` but has **no** `gbpReviewLink`; this stage can't edit `site.ts`. The launch grep still catches the token. | Request B1 adds `gbpReviewLink` to `site.ts` as the single source. |
| TR-05 | **SH-4 renders `hiringSteps()`** (the shared `content.ts` source) — **5 of 6** steps; the Punjab Police Saanjh step is gated by `policy.policeVerified` (false) and drops out until `[FILL:POLICE_VERIFICATION_STATUS]` is done for every team member. The list is numbered from the result, never hard-coded to six. | `content.ts` is the SH-4 single source (also feeds `/about/` AB-5 and faq-s1); its own note says "count the steps, never hard-code six while a step is gated". A gated claim must not render until true (`00` §3.4). | The blueprint's ①–⑥; step ③ returns by itself once the gate flips. Auditor: read the 5-step list as that gate (request D1). |
| TR-06 | **WhatsApp prefills are page-named booking prefills** (`REVIEWS_BOOK_PREFILL`/`SAFETY_BOOK_PREFILL`, the `services.ts bookText` shape, `02` P158) held in page data and passed to `Base waText` (sticky bar / float / header) + the CTA-band CTAs. RV-7's **[WhatsApp us]** uses a *feedback* prefill (`REVIEWS_FEEDBACK_PREFILL`), not a booking one. | Non-money pages name the source page in their prefill (same choice as `/faq/`, HF-12). RV-7 opens a complaint/feedback chat, so a booking prefill would be wrong. | Request B2 moves the two booking prefills into `services.ts PAGE_PREFILL`; today the page data holds the literal (same as `/faq/` did pre-D1). |
| TR-07 | **SH-2 = `PromiseBand variant="full"` WITHOUT `medical`.** | `/about/` AB-4 passes `medical` because it has no other vet proof; `/safety-hygiene/` SH-8 is the dedicated registered-vets block, so appending the `MEDICAL_LINE` to SH-2 would duplicate it. | — |
| TR-08 | **SH-7 insurance line = `[FILL:INSURANCE_STATUS]`; the "who pays for a vet check after an incident" promise is NOT written.** | The blueprint: publish the true cover status or omit the line; and the incident-cost promise is held back behind the same gate as `06` §6 answer 4 until Sunny confirms it. The token keeps the insurance status a tracked launch item; no un-gated who-pays promise ships. | Request D1 (auditor reads the missing who-pays line as that gate). The integrator fills or drops the insurance line at launch. |
| TR-09 | **Trust-ops tokens `DISINFECTANT_PRODUCT` + `INSURANCE_STATUS` held in `safety-hygiene.ts`.** | No shared data file owns the `00` §8 "Trust & safety ops" tokens; this stage can't add one. The launch grep catches them. | Request B3 gives them a shared home. |
| TR-10 | **SH-1 hero primary [Book on WhatsApp] → the booking form `/book/?src=hero_safety-hygiene`** (amber, not green). | `06` §3.1 "primary CTA = the booking path"; `00` §11 E1 + `/about/` AB-1 route trust/service hero primaries to `/book/`, and `08` §1.4 rule 2 keeps WhatsApp green for `wa.me` only, so a `/book/` CTA renders amber even when labelled "Book on WhatsApp". | — |
| TR-11 | **P040 SERP-intent notes dated 2026-10-08** in both blueprints' §1a, from a web search. | `02` P040 (launch-blocker): documented before writing. The search tool is US-located (no Ludhiana map pack), so each note says to re-check from an Indian connection before launch. | Request C1. |
| TR-12 | **P012/P026/P091 scope** (for the auditor): `/reviews/` primary keyword = `petdoorstep reviews` (brand) — the title starts "Reviews" and the H1 carries the brand + "Ludhiana"; `/safety-hygiene/` has no mapped keyword, so P012/P026 are N/A. P091 (city in title + H1 + first para) is read **N/A** on both — they are trust pages, not local landing pages — though both titles still name the brand and the reviews H1 names Ludhiana. | `02` §1.3 "Applicable" rule; same reading as `/how-it-works/`/`/faq/` (HF-17). | Request C4 (no trust-page head formula in `03` §3 for the brand review term). |
| TR-13 | **Section rhythm** (`08` §1.4 rule 5, §3.1): `/reviews/` paper header → sand (reviews/empty) → paper (RV-7) → brand-dark band. `/safety-hygiene/` paper hero → paper (SH-2 mint card) → sand → paper → sand → paper → sand → paper → brand-dark band. Section padding 48 → 80 px from lg. | Alternating bands; SH-2's mint Promise card sits on paper like `/about/` AB-4. | — |
| TR-14 | **Images omitted on both pages.** `/reviews/` RV-5 and `/safety-hygiene/` §3 render nothing — no real, consented photos/pairs exist (`reviews.ts beforeAfterPairs` empty; honesty law `08` §5.1). | Real, consented media only; blocks appear by themselves once it exists. | Request C2 adds the SH §3 shots to `08` §5.2. |
| TR-15 | **The 4 residual `check:pages` P074 FAILs are the by-design pre-merge state.** Each page's own canonical + `og:url` point at its route, which `routes.ts` keeps `planned` until merge. | `routes.ts` header: the page builder never flips a status; the integrator does, in the merge commit — then the self-canonical resolves. There is no Wave-2 preview switch (`PREVIEW_WAVE1` is wave-1 only), so a built-but-planned Wave-2 page always shows this. | Request A1 (the flip clears all four). No page code fixes it. |

## 2 · Copy written in this stage (not in any doc before; now in the blueprints / page data)

- RV-7 [WhatsApp us] feedback prefill: "Hi PetDoorStep, I booked a visit and I would like to share some honest feedback: ___" (TR-06).
- `/reviews/` + `/safety-hygiene/` booking prefills (the `bookText` shape naming each page) (TR-06).
- SH-8 link text "See how a vet-at-home visit works" (the blueprint words only the "→ `/ludhiana/vet-at-home/`" target).
- Not visible: `aria-label="Filter reviews"` on the dormant RV-3 chip nav; the RV-3 service-bucket ids (`REVIEW_SERVICE_FILTERS`).
- Everything else (heads, RV-1/RV-2/RV-7/RV-8, SH-1…SH-9, the sealed-kit steps, handling/respect rules) is blueprint-verbatim; SH-2 + SH-4 render from `content.ts`.

## 3 · Verification (2026-10-08; build `PUBLIC_PDS_PREVIEW_LIVE=wave1`, base `c41a6b2`)

- `npm run build` ✓ (17 pages). `npm run check:prices` → **OK** (no ₹ literal in any component or `.ts` copy).
- `npm run check:pages -- --pages /reviews/,/safety-hygiene/` → **4 FAIL, 1 WARN**, all P074 and all the by-design
  self-canonical / not-live-yet artefact of the two `planned` routes (TR-15, request A1). No title/meta/H1, schema,
  source or any other rule FAILs; the checker runs every rule to completion (it prints the `[FILL:*]` note after).
- `npm run check:budgets -- --pages /reviews/,/safety-hygiene/` → **0 FAIL, 0 WARN** — CSS `/reviews/` 42,962 B,
  `/safety-hygiene/` 44,177 B (≤ 51,200); 3 scripts each (analytics + exit card, both `data-pds`, + 1 ld+json);
  2 font preloads.
- `test:site -- --pages /reviews/,/safety-hygiene/ --port 4631` → **0 FAIL, 1 WARN** (P150 "no `[data-hero-chip]`"
  on the chip-less `/safety-hygiene/` hero, TR-10/HF-03): overflow / console / http / axe serious+critical 0 /
  ld+json / CLS 0.000 at 360×640, 768×1024, 1280×800; wa.me/tel click tracking 11 (`/reviews/`) + 10
  (`/safety-hygiene/`) links, each with its `data-source`; exit card ok at 1280, absent on `/book/`.
- `env -u PUBLIC_PDS_PREVIEW_LIVE E2E_PORT=4630 npm run test:e2e` → **55 passed, 0 failed** (dist rebuilt with the
  preview switch unset; identical to the wave1 build since every Wave-1 route is already `status: 'live'`).
- Block-by-block walk vs blueprint, copy verbatim: `/reviews/` RV-0…RV-8 ✓ (head 53/147/47; BreadcrumbList-only,
  zero Review/AggregateRating in the HTML; RV-2 proof line = `PROOF_LINE`; the E6 empty state with the GBP link;
  RV-7 "Not happy?" + the full quote; RV-8 band). `/safety-hygiene/` SH-0…SH-9 ✓ (head 56/154/64; Promise 4
  un-gated points; sealed-kit 6 steps with the disinfectant token; SH-4 5 steps with the police step gated out;
  handling 6 rules + closing; respect 6 items; SH-7 response + insurance token, no who-pays promise; SH-8 → the vet
  page). JSON-LD `@graph` = BreadcrumbList only on both; crumb names + URLs = the visible crumbs.
- Screenshots reviewed (`scratchpad/wave2/w2-trust-a/`): full pages at 360 / 768 / 1280, the 360×640 folds, the
  1280 exit cards. No visual defect; mobile proof-bar buttons stack full-width; the safety page's bands alternate cleanly.

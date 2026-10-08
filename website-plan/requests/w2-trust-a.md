# Requests from stage w2-trust-a (Wave 2: `/reviews/` + `/safety-hygiene/`)

Things this stage needs from files it does not own. The decisions behind each are in
`website-plan/decisions/w2-trust-a.md` (TR-01 … TR-15, verification in its §3). Both pages are finished on branch
`wave2/w2-trust-a`; no shared component, layout, data file, `routes.ts`, `sources.ts` or `faq.json` was edited.

## A · Integrator (the merge commit)

| # | File | Request | Why |
|---|---|---|---|
| A1 | `website/src/data/routes.ts` | Flip `/reviews/` **and** `/safety-hygiene/` from `status: 'planned'` to `'live'` in the merge commit. | The `routes.ts` header: the integrator flips a status, never the page builder. The flip clears the only `check:pages` FAILs this branch has — the 4 self-canonical P074s on each page's own canonical + `og:url` (TR-15) — and turns on everything that waits on `isLive()`: the header nav + footer "Reviews" / "Safety & Hygiene" items, the footer ★ GBP line, `PromiseBand`'s "Read the full Promise" link, the `Chip verified` ("Background-verified ✔") badge target, the `/faq/` "Safety & trust" category link and its in-answer safety references, every Wave-1 "safety page" reference, and both pages' sitemap entries. **Note `/reviews/` also has a content gate** (reviews.md §4: publish only once ≥ 10 real Google reviews exist); `/safety-hygiene/` has an operations gate (every SOP true on publish day). Flip each the day its gate clears — they need not land together. |
| A2 | `website/src/data/lastmod.ts` | Add `'/reviews/': '2026-10-08'` and `'/safety-hygiene/': '2026-10-08'` to `LASTMOD`, in the commit that flips each route live. | One real `lastmod` per live route or the build fails (`04` §7.1, E7). 2026-10-08 is the day both pages' copy was finalised. Update the date if copy changes before go-live. |
| A3 | the merged build | Run `npm run check:pages -- --all` and `npm run test:site` on the full build with `PUBLIC_PDS_PREVIEW_LIVE` **unset**, after A1. | The 4 self-canonical P074s resolve once the routes are live. No sibling P074 WARNs are expected from these two pages: every internal link they emit (`/`, `/book/`, `/ludhiana/vet-at-home/`, the footer/header live routes) already points at a live Wave-1 route. |

## B · Data owners

| # | File | Request | Why |
|---|---|---|---|
| B1 | `website/src/data/site.ts` | Add a `gbpReviewLink: '[FILL:GBP_REVIEW_LINK]'` field (the `00` §8 Google-group token) beside `gbpLink`; let `src/data/pages/reviews.ts` import it for the RV-2 "Write a review" button instead of holding its own `GBP_REVIEW_LINK` token (TR-04). | `site.ts` already owns `gbpLink`/`googleRating`/`reviewCount` as the single source for Google values; the write-a-review URL is the one that was missing. Today `reviews.ts` holds the token so the page can be built, but the value should live in `site.ts` with the rest. |
| B2 | `website/src/data/services.ts` | Add `/reviews/` and `/safety-hygiene/` to `PAGE_PREFILL` (the booking-shaped `bookText('a service', routeLabel(path))` string), so `prefillFor()` returns them; let the two page-data files import `prefillFor` instead of holding `REVIEWS_BOOK_PREFILL` / `SAFETY_BOOK_PREFILL` (TR-06). | Every non-money page's chrome prefill lives in `PAGE_PREFILL`; these two are the only ones missing. Today the page data holds the literal (same interim state `/faq/` had before its D1). **RV-7's feedback prefill stays in `reviews.ts`** — it is not a booking prefill. |
| B3 | a shared data file (e.g. `src/data/content.ts`, beside `policy`) | Own the `00` §8 "Trust & safety ops" tokens `DISINFECTANT_PRODUCT` and `INSURANCE_STATUS`; let `src/data/pages/safety-hygiene.ts` import them (TR-09). | `POLICE_VERIFICATION_STATUS` is already handled in `content.ts` (via `policy.policeVerified`); the other two ops tokens have no shared home, so SH-3/SH-7 hold them in page data for now. The launch grep catches them meanwhile. |

## C · Doc owners

| # | File | Request | Why |
|---|---|---|---|
| C1 | `02` P040 owner / launch audit | Re-run the P040 SERP check for `petdoorstep reviews` / `pet grooming reviews ludhiana` (reviews.md §1a) and the safety trust queries (`is home pet grooming safe`, `how to check if a pet groomer is background-verified` — safety-hygiene.md §1a) from an Indian connection (google.co.in, incognito) before launch, and update both §1a notes. | TR-11: the 2026-10-08 notes were made with a US-located search tool and say so (no Ludhiana map pack / ads visible). |
| C2 | `08-DESIGN-SYSTEM.md` §5.2 (shot list) | Add the safety-hygiene.md §3 shots — sealed, dated kit pouch opened at a Ludhiana home · ID-badge close-up · groomer sanitising hands at a doorway · (basket muzzle, if used) — with `08` §5.4 alts. | TR-14: the SH page renders no images until real, consented safety photos exist; the shots need a home in the §5.2 list so they drop in when shot. Same pattern as the Wave-1 photo-shot requests (shots 13–15). |
| C3 | `blueprints/safety-hygiene.md` SH-0 | Note that the visible breadcrumb + schema read the `routes.ts` page name "Safety & Hygiene" (capital H), not the blueprint's "Safety & hygiene". | TR-01: `routes.ts` owns page names and the BreadcrumbList must equal the visible crumb (`02` P084). The §5 As-built note already records this; the SH-0 line could match. |
| C4 | `03-KEYWORD-MAP.md` §3 | Add (or confirm N/A for) a trust-page head formula covering `/reviews/`'s brand review term (`petdoorstep reviews`) — title/H1 were derived straight from the blueprint, not a `03` §3 formula. | TR-12: §3 has formulas for home/money/pricing/book/area/blog only; `/reviews/` is a brand-keyword trust page and `/safety-hygiene/` has no mapped keyword (same gap `/faq/` hit, HF C4). |

## D · For Sunny (existing policy gates — no new decision asked)

- **S1 · `/safety-hygiene/` shows the gated-out versions of three commitments, by design.** All wait on an existing
  `00` §3.4 / §6 policy gate confirmed in writing by Sunny (log the flip in `00` §11), after which each renders by
  itself — no code change here:
  - SH-4 shows **5 of 6** verification steps — the Punjab Police Saanjh step returns once `policy.policeVerified`
    (`src/data/content.ts`) is true for every team member (`[FILL:POLICE_VERIFICATION_STATUS]`).
  - SH-7 carries **no "who pays for a vet check after an incident" promise** — held back behind the same gate as
    `06` §6 answer 4; and its insurance line is `[FILL:INSURANCE_STATUS]` (fill the true cover status, or drop the
    line, at launch).
  - SH-2's Promise shows **4 of 5** points — point 4 "On time, or ₹100 off" waits for `policy.onTimeOr100Off`
    (same gate `/about/` AB-4 and `/how-it-works/` HW-5 already show, HF-19).
  The auditor should read each as that gate, not as a miss (TR-05, TR-08, TR-07).

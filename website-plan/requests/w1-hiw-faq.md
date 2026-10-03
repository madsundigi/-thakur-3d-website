# Requests from stage w1-hiw-faq (Wave 1: `/how-it-works/` + `/faq/`)

Things this stage needs from files it does not own. The decisions behind each are in
`website-plan/decisions/w1-hiw-faq.md` (HF-01 … HF-19, verification in its §3). Both pages are finished on branch
`wave1/w1-hiw-faq`; no shared component, layout, data file, `routes.ts` or `faq.json` was edited.

## A · Integrator (the merge commit)

| # | File | Request | Why |
|---|---|---|---|
| I1 | `website/src/data/routes.ts` | Flip `/how-it-works/` and `/faq/` from `status: 'planned'` to `'live'` in the merge commit | The routes.ts header: the integrator flips a status, never the page builder. Until then the header "How it works" item, the footer "FAQ" link, home H-4 "See the full process" and the HW-6 "See all pet grooming at home questions" link stay hidden (`isLive()`), and the sitemap omits both URLs |
| I2 | `website/src/data/lastmod.ts` | Add `'/how-it-works/': '2026-10-03'` and `'/faq/': '2026-10-03'` to `LASTMOD` | One date per live route or the build fails (`04` §7.1, E7). 2026-10-03 is the day both pages' copy was finalised (HF-01, HF-06/07, HF-12, HF-18) |
| I3 | the merged build | Run `npm run check:pages -- --all` and `npm run test:site` on the full build, `PUBLIC_PDS_PREVIEW_LIVE` **unset** | P074: this branch's `--pages` run WARNs 20 × "links to <live Wave-1 route> which is not in this dist" (`/`, `/pricing/`, the four money pages, `/about/`, `/contact/`, `/terms/`, `/privacy-policy/`) — other builders' pages, resolved only in the full build. P068: `/faq/`'s contextual inbound link is `/how-it-works/` HW-6 (ships here); `/how-it-works/`'s own come from home H-4 "See the full process" and the money pages' SP-6 R4 line (other builders) |

Nothing on either page needs a change when Wave 2 ships: the `/faq/` "Safety & trust" category link (→ `/safety-hygiene/`),
the in-answer links to `/refund-policy/`, `/ludhiana/dog-vaccination/` and the area pages, and PromiseBand's "Read the
full Promise" link all render by themselves once their routes flip live (`isLive()`).

## B · Data owners

| # | File | Request | Why |
|---|---|---|---|
| D1 | `website/src/data/services.ts` | Own the `/faq/` CTA-band booking prefill — e.g. a `bookPrefillFor(path)` helper, or `PAGE_PREFILL_BOOK['/faq/'] = bookText('a service', routeLabel('/faq/'))` — and let `src/data/pages/faq.ts` import it instead of deriving `FAQ_BOOK_PREFILL` from `prefillFor('/how-it-works/')` | HF-12. `PAGE_PREFILL['/faq/']` is question-shaped (right for the FAQ-1 "WhatsApp us" link, the sticky bar and the float), but [Book on WhatsApp] under "Got your answer? Book your first visit in 2 minutes." needs the booking shape every other non-money page uses: "Hi PetDoorStep! I want to book a service (from your FAQ page). My area: ___ . My pet: ___". Today faq.ts rebuilds it from the `/how-it-works/` string (the build fails if that shape changes), which works but keeps one prefill outside services.ts |

## C · Doc owners

| # | File | Request | Why |
|---|---|---|---|
| C1 | `00-MASTER-PLAN.md` §11 | Add a 2026-10-03 row: **`/faq/` head** — title `Pet Grooming at Home Questions – Ludhiana FAQ \| PetDoorStep` (59) and H1 `Pet Grooming at Home Questions, Answered` (40) carry the `01` primary keyword verbatim (`02` P012/P026, launch-blockers), replacing the blueprint's `Pet Grooming at Home FAQs for Ludhiana \| PetDoorStep` / `Pet Care at Home — Your Questions, Answered`; same fix as E11 for `/contact/` | HF-01. `faq.md` §1 already carries the new lines with a dated note; the §11 log should too |
| C2 | `07-BOOKING-SPEC.md` §2, the "Page-specific WhatsApp prefills" note | Add: "`/faq/`'s `CtaBand` [Book on WhatsApp] carries the booking-shaped prefill naming the FAQ page (`decisions/w1-hiw-faq.md` HF-12), not `PAGE_PREFILL['/faq/']`, which is question-shaped and serves the FAQ-1 link, the sticky bar and the float" | As written ("sticky bar, desktop float, hero and `CtaBand` wa.me CTAs … `PAGE_PREFILL` for other pages") the note contradicts the built `/faq/` band |
| C3 | `02-SEO-PARAMETERS.md` P140 and `08-DESIGN-SYSTEM.md` §4.13 owners | Reconcile the two: P140 says FAQ accordions use `<button aria-expanded>`; `08` §4.13 — and the shared `Faq.astro` both pages render — use zero-JS `<details>/<summary>`, which browsers expose as a button with its expanded state. Recommended: amend P140 to accept `<details>` (it keeps the zero-JS law, `04` §5.2.1); otherwise ask the component owner to change `Faq.astro` | P140 is [Important], not a launch-blocker, and the audit needs one answer for every page with an accordion: `/faq/` has 28, `/how-it-works/` 5, and every money page its SP-10 set |
| C4 | `03-KEYWORD-MAP.md` §3 | Add a trust-page row with `/faq/` as the worked example: title `{keyword, title case} – {hook} \| PetDoorStep` → `Pet Grooming at Home Questions – Ludhiana FAQ \| PetDoorStep`; H1 `{keyword}, Answered` → `Pet Grooming at Home Questions, Answered` | §3 has formulas for home, money, pricing, book, area and blog pages only. `/faq/` is the one trust page with a mapped primary keyword, so its head had to be derived from `02` P012/P026 directly (HF-01) |
| C5 | `02` P040 owner / launch audit | Re-run the P040 SERP check for *pet grooming at home questions* (+ *… ludhiana*) and the `/how-it-works/` intent queries (*how does pet grooming at home work*) from an Indian connection — google.co.in, incognito — before launch, and update `faq.md` §1a and `how-it-works.md` §1a | HF-02: the 2026-10-03 notes were made with a US-located search tool and say so |

## D · For Sunny (an existing policy gate — no new decision asked)

- **S1 · HW-5 Promise strip shows 4 of the 5 points.** Point 4 "On time, or ₹100 off" renders only once
  `policy.onTimeOr100Off` (`website/src/data/content.ts`) is confirmed in writing (`00` §3.4, `06` §4.1 POLICY GATE;
  log the flip in `00` §11). The blueprint's "5-icon strip" is the shared `PromiseBand.astro` and needs nothing from
  this stage; the auditor should read the 4-point strip as that gate, not as a miss (HF-19).

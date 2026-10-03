# Requests from stage w1-legal (Wave 1, legal pages)

Things this stage needs from files it does not own. The decisions behind each are in
`website-plan/decisions/w1-legal.md`; the lawyer's review list is its §3.

## A · Integrator (merge commit)

| # | File | Request | Why |
|---|---|---|---|
| A1 | `src/data/routes.ts` | Flip `/privacy-policy/` and `/terms/` from `'planned'` to `'live'` in the commit that merges `wave1/w1-legal` | 02 P051 (legal pages live and footer-linked); the footer legal row and the booking form's Step 5 consent link (07 §3 Step 5, D4) render through `isLive()` and switch on with it |
| A2 | `src/data/lastmod.ts` | Add `'/privacy-policy/': '2026-10-03'` and `'/terms/': '2026-10-03'` | E7 / contract C6: `check:pages --all` FAILs P127 for both ("no LASTMOD entry") as soon as they are live. Change the date only on a material edit — the next one is the lawyer's sign-off and the token fill |
| A3 | — | P068 needs nothing from you: on this dist `check:pages --all` reports no orphan for either legal page. `/book/` links both from its `<main>` (the static `data-testid="privacy-line"` paragraph → `/privacy-policy/`; FAQ book-3 "terms page" → `/terms/`) and `/terms/` TM-1 links `/privacy-policy/`. Only `/book/` itself is an orphan on this dist, which the content pages fix | requests/f2-gates.md #11 flagged the risk; it is settled by the built `/book/` |
| A4 | `01-SITEMAP.md` status / `00` §6 Wave-1 tracker | Tick `/privacy-policy/` and `/terms/` as built; both stay "pending lawyer sign-off" until 00 §9 item 7 is done | — |

## B · P068 — pages that should link the legal pages in body text (page builders)

Footer links do not count (02 P068: in-body, non-nav). Today's contextual inbound links are `/book/` → both and `/terms/`
→ `/privacy-policy/` (A3). To make the legal pages reachable from more than one page, and because the links read
naturally there, add these in `<main>` through `isLive()` guards:

1. **`/how-it-works/` FAQ #3** (`how-it-works-3`): it states the reschedule rule without book-3's closing sentence. Mirror
   book-3 — "Full details are on our terms page." with "terms page" → `/terms/` (FAQ owner: faq.json is frozen, so this
   is a request to the data owner, or render the link in the page's answer the way `/book/` does).
2. **`/faq/`**: renders book-3 (`pages: ["/book/", "/faq/"]`), so it links `/terms/` automatically once built — nothing
   to add; check it survives the build.
3. **`/contact/`** (CO-3/CO-4 area): one line "How we handle your details is in our Privacy Policy." → `/privacy-policy/`.
4. **`/pricing/`** PR-9 (offers block): "Full offer terms" → `/terms/#offers-and-groom-club` (the fragment exists).
5. **`/safety-hygiene/`** SH-6 (Wave 2, photo consent): "only after you reply YES" → `/privacy-policy/#how-we-use-your-data`;
   SH-5 handling rules → `/terms/#looking-after-your-pet`.
6. **`/offers/`** (Wave 2) OF-2/OF-3/OF-4: each offer's terms line → `/terms/#offers-and-groom-club`.
7. **`/refund-policy/`** (Wave 2) → `/terms/#rescheduling-and-cancelling`, and TM-7 can link back once it is live.

Fragment ids on the legal pages are stable: privacy `who-we-are`, `what-we-collect`, `how-we-use-your-data`,
`who-else-handles-your-data`, `cookies`, `website-statistics`, `how-long-we-keep-your-data`, `how-we-protect-your-data`,
`your-rights`, `grievance-officer`, `children`, `changes-to-this-policy`, `contact-us`; terms `what-we-offer`,
`when-we-work`, `how-booking-works`, `prices`, `payment`, `rescheduling-and-cancelling`, `looking-after-your-pet`,
`vet-visits-and-vaccinations`, `if-something-goes-wrong`, `offers-and-groom-club`, `our-responsibility`,
`governing-law-and-disputes`, `changes-to-these-terms`.

## C · Data owner (`src/data/legal.ts`, `site.ts`) — nothing blocking

- C1 · Comment fixes: `IDENTITY.LIABILITY_TERMS` says "/terms/ TM-13" (it renders in TM-12) and `IDENTITY.JURISDICTION`
  says "TM-14" (TM-13) — the blueprint numbering is TM-12 responsibility, TM-13 governing law, TM-14 changes.
- C2 · `RETENTION`'s Google Analytics period is the literal `'14 months'` next to `GA4_SETTINGS.dataRetentionMonths = 14`.
  The privacy page fails the build if they diverge; deriving the string from the number would remove the duplicate.
- C3 · When the mailbox provider behind `[FILL:EMAIL]` is chosen, add it to `PROCESSORS` (blueprint PP-5 ship check); when
  `/join-as-groomer/` goes live, add a row if applications go anywhere other than WhatsApp. PP-3 row ⑧ already appears on
  its own once that route is live.
- C4 · `LAW.IT_RULES` and `LAW.DPDP_RULES` are exported but no page prints them yet (lawyer point 22). If the lawyer
  wants the full titles, PP-1 or PP-10 is where they go — tell w1-legal.
- C5 · After the lawyer's review, fill every `IDENTITY.*` token and `site.emergencyVets` in one commit with the
  `POLICY_EFFECTIVE_DATE`; `npm run check:fill` is the gate.

## D · Docs to sync (docs agent)

1. **`blueprints/privacy-policy.md`**: PP-1 add the "Last updated: [FILL:POLICY_EFFECTIVE_DATE]" line and the on-page
   contents list ("On this page", one entry per H2); PP-3 column names "What · Details · Why · Legal basis"; PP-6 the
   `_ga_<id>` footnote (decisions W1L-18); §4 ship check "Title, meta and H1 exactly as §1" → done, P021 N/A recorded.
2. **`blueprints/terms.md`**: TM-1 same two header additions; TM-3 four rows with the April–June rule inside the walks
   row (W1L-13); TM-5 add "For medicines and vaccines, see Vet visits and vaccinations."; TM-7 quote `RESCHEDULE_TEXT`
   (W1L-11); TM-11 quote `FIRSTGROOM_TERMS` / `REFERRAL_TERMS` / `GROOM_CLUB_PITCH.body` and the four H3s (W1L-12).
3. **`02` audit**: P021 (CTA in meta) = N/A for `/privacy-policy/` and `/terms/` (both blueprints §4); P051 built, pending
   lawyer sign-off; P143 the visible "Last updated" line exists on both legal pages.
4. **`00-MASTER-PLAN.md` §11**: a row "Legal pages built from legal.ts (B19/B20); lawyer review list in
   `decisions/w1-legal.md` §3" when the integrator merges.
5. **`08-DESIGN-SYSTEM.md`** (optional): the legal-table pattern — cards below `md`, classic table from `md`, explicit
   ARIA roles — is reusable for `/refund-policy/` and any future policy table; note it under §4 if a third page uses it.

## E · Sunny + lawyer

- E1 · Review the two rendered pages (preview build, `PUBLIC_PDS_PREVIEW_LIVE=wave1`) against
  `decisions/w1-legal.md` §3 (22 points) and return: the filled `IDENTITY.*` values, `emergencyVets`,
  `INSURANCE_STATUS`, and any sentence to change. Changed sentences go through w1-legal (the pages) or the data owner
  (`legal.ts` strings), never typed into a page.
- E2 · `00` §3 facts the terms rely on must be confirmed first (terms.md §4): hours (§3.1), prices, no travel charge,
  the reschedule/cancel rule (§3.2).

## F · Gates owner (`scripts/check-legal.mjs`) — observation, low priority

The storage-key scan (a quoted `pds_…` literal, any quote style, in every file under `src/`) matched a quoted `pds_…` example inside a
code comment in a component and FAILed P051. The comment was reworded; skipping `//` and `/* */` comment lines in the
scan would avoid the false positive for the next builder.

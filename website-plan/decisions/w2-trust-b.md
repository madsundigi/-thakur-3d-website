# Decisions — stage w2-trust-b (Wave 2 · trust pages B)

Branch `wave2/w2-trust-b`, base `c41a6b2`. Files: `website/src/pages/{offers,join-as-groomer,refund-policy}.astro`;
blueprints `blueprints/{offers,join-as-groomer}.md` (As-built + P040 appended) and the new `blueprints/refund-policy.md`.
No shared component, layout, data file (`legal.ts`, `routes.ts`, `sources.ts`, `services.ts`, `faq.json` included) was
edited — needs from those files are in `website-plan/requests/w2-trust-b.md`.

Rule order applied: 02 [Launch-blocker] > blueprint > 00 §11 > 06/07/08/04/09. Every ₹ figure renders from
`offers.ts` + `pricing.json` via the pricing helpers / `content.ts` (`check:prices` green); every internal link goes
through `isLive()`; every wa.me/tel:/Instagram anchor carries a canonical `source`; legal/recruitment unknowns stay
visible `[FILL:*]` tokens (00 §8, E12). No client JS. a11y per 08 §7 (test:site axe 0).

## 1 · Decisions

| # | What | Why | Loses / sync |
|---|---|---|---|
| T2B-01 | **/offers/ OF-1 is a plain page header, not the `Hero` component** (no `[data-hero]`) | OF-1 carries no CTA (the first CTA is OF-2), and `Hero` requires a primary CTA and triggers the 360×640 fold law. A header is faithful to OF-1 | offers.md §4 |
| T2B-02 | **OF-2 renders `FIRSTGROOM_TERMS` split on `' Terms: '`** into Offer → How → Terms (OF-2 order) | `FIRSTGROOM_TERMS` (content.ts) is the offer sentence + `Terms:` in one string and is also the OfferCatalog description; splitting keeps one source and never types a ₹ amount | offers.md OF-2 |
| T2B-03 | **OF-3 renders `REFERRAL_TERMS` verbatim** as the whole card body | `REFERRAL_TERMS` (content.ts) already is the full OF-3 body and the referral OfferCatalog description (04 §2.0.3: markup = visible copy) | — |
| T2B-04 | **OF-4 maths table + worked example from helpers**: `groomClubPrices()` rows; example `inr(mediumSave×12)` + `flatPrice('nail-ear')`; `GROOM_CLUB_PITCH` (title+body) verbatim; six OF-4 terms as a ✓-list | pricing.json is the one source; numbers match /pricing/ PR-8; no ₹ typed | offers.md OF-4 |
| T2B-05 | **OF-6 states the four honesty points; the 06 §7.4 competitor-coupon aside is omitted** (an inflated rupee "permanent coupon") | It is 06's explanatory example, not page copy, and a rupee literal is banned in a component (07 §4). The blueprint's OF-6 itself gives the condensed four points | offers.md §4 |
| T2B-06 | **OF-7 `[Book on WhatsApp]` → `waHref(prefillFor('/offers/'))`**, `source="ctaband_offers"` | Mirrors the home CtaBand's page-end "Book on WhatsApp" direct-wa.me pattern; `prefillFor` falls back to the booking default (acceptable for an offers page) | requests C1 (nicer prefill) |
| T2B-07 | **OF-5 seasonal block omitted entirely**; the OfferCatalog `seasonal` row likewise | No live dated offer; OF-5 says omit the section (no "coming soon"), and `schema.ts offerNode()` throws on an empty/`[FILL:SEASONAL_OFFER]` row | — |
| T2B-08 | **/join-as-groomer/ JG-1 is a plain header, not `Hero`** (no `[data-hero]`) | The mandated 66-char H1 risks the 360×640 fold law inside `Hero`; a plain header is a legitimate hero role and removes the risk. test:site: no fold check fires (non-money, no `[data-hero]`), no overflow | join-as-groomer.md §4 |
| T2B-09 | **JG-0 breadcrumb label is `Careers`** (the blueprint's trail name), passed to both the visible `<Breadcrumb>` and the BreadcrumbList JSON-LD | Blueprint JG-0 says `Home › Careers`; P084 only requires the visible crumb and the schema to match each other, which they do. Route label "Join as Groomer" stays for nav/footer | — |
| T2B-10 | **JG-4 heading "Our 5-step process — the same one we promise customers"** — the count is `hiringSteps().length`, not a hard-coded six | The police step is policy-gated (`policy.policeVerified=false`, 00 §3.4 / safety-hygiene SH-4 step 3), so it is omitted; content.ts explicitly says "never hard-code six while a step is gated". When police verification goes live (6 steps), the heading recounts automatically | join-as-groomer.md §4; **blueprint JG-4 wording "6-step" superseded** by the gating rule (00 §3.4 > blueprint on a factual-honesty claim) |
| T2B-11 | **JG-3 rendered as 3 role cards** (h3 + a ✓-list of "You'll need", split on `' · '`), not a 2-column table | The blueprint heads JG-3 "(3 cards)"; the markdown table is just how it tabulates the content. Cards read far better at 360px. The Partner-vet card keeps `[FILL:VET_PARTNER_TERMS]` | — |
| T2B-12 | **JG-6 is 5 plain-HTML Q&As (`<dl>`), no FAQPage markup** | Blueprint JG-6 says "plain HTML"; 04 §2.9 allows BreadcrumbList + JobPosting only on this page (a FAQPage node would be an unexpected top-level type, P077) | — |
| T2B-13 | **One Apply button serves all roles**: `applyText` = the JG-5 prefill with `{role}` = "groomer, walker or vet"; the "What to send" list asks the applicant to name their role | There is no per-role CTA on the page (roles are JG-3 cards), so one honest prefill + the send-list is clearest. Sources: `hero_join-as-groomer` (JG-1), `join-as-groomer_page` (JG-5), `ctaband_join-as-groomer` (JG-7) | — |
| T2B-14 | **/refund-policy/ inlines the legal shell** (Base + `<Breadcrumb>` + 808px column + legal header + "On this page" nav) and reuses the path-agnostic `LegalSection`; contact anchors inlined (`waHref`+`data-source`, `telFor`, `mailto:`) | `LegalPage.astro` / `ContactLink.astro` type their `path` prop to only `/privacy-policy/` or `/terms/`, and this wave may not edit shared components. The inlined shell is byte-faithful to the Wave-1 legal build | requests B1 (widen the unions) |
| T2B-15 | **Refund facts from `legal.ts` + `content.ts RESCHEDULE_TEXT`, nothing invented**: RF-2 `SERVICE_RULES` `pay-after`/`add-ons-first`/`mrp`; RF-3 `RESCHEDULE_TEXT` + TM-7 `[FILL:LATE_CANCEL_RULE]`/`[FILL:NO_SHOW_RULE]` + rain/fog line; RF-4 "no advance → nothing to refund" + `LAW.CONSUMER_ACT`; RF-5 `stop-safely` + TM-10 wording + Grievance Officer tokens | 00 §3.2 (no advance payment so nothing to refund); "one wording site-wide" for the reschedule rule; a lawyer reviews before launch (00 §9 item 7, D4) | refund-policy.md §2 |
| T2B-16 | **/refund-policy/ local WhatsApp prefill** `"Hi PetDoorStep, I have a question about your Refund Policy: ___"`, passed to Base `waText` and the page's contact links | `services.ts PAGE_PREFILL` has no `/refund-policy/` entry and is not editable this wave; `prefillFor` would fall back to the booking default, which is wrong on a legal page. Mirrors the /terms/ PAGE_PREFILL wording | requests C1 |

## 2 · Copy written (not in any doc verbatim — sync)

- **/offers/** — H1 "Dog Grooming Offers in Ludhiana"; OF-1 line "Real offers with full terms — no countdown timers,
  no fake 'last slots'."; OF-2 H2 "New here — code FIRSTGROOM" + How line "The booking form adds FIRSTGROOM
  automatically for first-timers, or type it in your WhatsApp message."; OF-3 H2 "Friends with benefits (the pet
  kind)"; OF-4 worked-example sentence "A Medium dog on Groom Club for a year: 12 Full Grooms at {club} saves {×12},
  plus 12 free nail-trim visits (worth {nail-ear} each)."; OF-4 ✓-list labels (One Full Groom a month · Free Nail Trim
  + Ear Clean visit between grooms · Priority weekend slots · Same groomer on request · Pay per visit after the service
  (UPI or cash) · Cancel anytime on WhatsApp); OF-6 the four rules as written in `offers.astro`; OF-7 heading "Ready
  when you are. Book in 2 minutes."
- **/join-as-groomer/** — section H2s "Why join PetDoorStep", "Roles we're hiring for", "Apply in 2 minutes",
  "Questions from people who join"; JG-2 tiles, JG-3 role requirements and JG-6 answers verbatim from the blueprint;
  applyText = "Hi PetDoorStep, I want to apply as a groomer, walker or vet. Name:  Experience (years):  Area: ".
- **/refund-policy/** — H1 "Refund and Cancellation Policy"; the §1 Title/Meta (refund-policy.md §1); section H2s
  "How and when you pay", "Rescheduling and cancelling", "Refunds", "If something goes wrong", "Changes to this
  policy"; RF-1 intro and RF-4/RF-6 prose as written in `refund-policy.astro`.

## 3 · Points for the lawyer to review — /refund-policy/ (00 §9 item 7, D4)

This page is part of the Terms; its review folds into the w1-legal §3 list. Settle in particular:

1. **"No advance payment, so nothing to refund"** (RF-1, RF-4) — the core claim, and its interplay with the
   Consumer Protection Act 2019 and the Consumer Protection (E-Commerce) Rules 2020 (if they apply to a service booked
   through a website that takes no online payment). Must match /terms/ TM-6/TM-7.
2. **`[FILL:LATE_CANCEL_RULE]` and `[FILL:NO_SHOW_RULE]`** (RF-3) — the same tokens as /terms/ TM-7; 00 §3.2 is silent
   on late cancellations and no-shows. Fill once, render on both pages.
3. **RF-4 "we put it right — redoing the part that went wrong or adjusting the bill"** — is this the remedy PetDoorStep
   commits to, and does it need a cap or conditions? No touch-up / vet-check-cost promise is made here (policy-gated,
   safety-hygiene SH-7; /terms/ TM-12 `[FILL:LIABILITY_TERMS]`).
4. **RF-4 monthly-walking wording** "paid for walks actually done … no advance to return" — confirm it matches how
   month-end billing actually works (00 §3.2; dog-walking SP-4 `WALK_PAYMENT_LINE`).
5. **Grievance Officer block** (RF-5) — same `IDENTITY.GRIEVANCE_*` tokens as the privacy/terms pages.
6. **`POLICY_EFFECTIVE_DATE`** — one token feeds "Effective from" and "Last updated" (as on the Wave-1 legal pages).
7. Whether a standalone refund policy is even required, or whether /terms/ TM-6/TM-7 suffice and this page should link
   there rather than restate (today it restates the honoured facts and links /terms/).

## 4 · Verification record (2026-10-08, build with `PUBLIC_PDS_PREVIEW_LIVE=wave1`)

- **build** OK (18 pages; /offers/, /join-as-groomer/, /refund-policy/ built). **check:prices** OK (no ₹ literal in
  any component or .ts copy). **check:budgets --pages …**: 0 FAIL, 0 WARN (CSS 45,063 / 42,073 / 42,019 B; no script
  beyond JSON-LD + the tagged analytics bootstrap; 2 font preloads). **check:legal --dist**: 0 FAIL, 2 WARN (pre-
  existing `_ga` / `_ga_<id>`); /refund-policy/ introduces no `pds_*` key and no `track()` event, so it does not break
  it. **test:site --pages … --port 4641**: 0 FAIL, 0 WARN at 360×640, 768×1024, 1280×800 (no overflow P113, 0 console
  errors, axe serious+critical 0, ld+json parses, CLS 0, tracking fired on 10/11/11 anchors with the page source,
  exit card present on /offers/ + /join-as-groomer/ and absent on /refund-policy/). **e2e** (`-u
  PUBLIC_PDS_PREVIEW_LIVE E2E_PORT=4640`): 55 passed, 0 failed.
- **check:pages --pages /offers/,/join-as-groomer/,/refund-policy/**: the only FAILs are each page's **self-canonical
  P074** (`<link rel=canonical>` + `og:url` point at the page itself, whose `routes.ts` status is still `'planned'`).
  These clear the moment the integrator flips the three routes to `'live'` (requests A1) — the gate's own WARN says so.
  No head (P011/P012/P019/P020/P026), schema (P077/P082/P084/P086/P087), source (P161), image (P056/P060/P063) or
  link-structure FAIL on any of the three pages. (The classifier blocked a temporary local route-flip to re-prove
  this; the clean non-P074 output above is conclusive.)
- **Block walk vs blueprint**: /offers/ OF-0…OF-7 all present, head = §1 verbatim, Groom Club maths = PR-8, one JSON-LD
  (BreadcrumbList + OfferCatalog, seasonal omitted). /join-as-groomer/ JG-0…JG-7 all present, head = §1 verbatim,
  5-step process (police gated), plain-HTML FAQ, one JSON-LD (BreadcrumbList only). /refund-policy/ RF-0…RF-6 all
  present, built like the Wave-1 legal pages, "Effective from"/"Last updated" from the token, one JSON-LD
  (BreadcrumbList). Screenshots reviewed at 360/768/1280 (scratchpad `wave2/w2-trust-b/`) — no overflow, tables scroll
  within their frame on phones, all `[FILL:*]` tokens visible for `check:fill`.

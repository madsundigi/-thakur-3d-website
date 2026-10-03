# Decisions — stage w1-legal (Wave 1, legal pages)

Branch `wave1/w1-legal`. Files: `website/src/pages/{privacy-policy,terms}.astro`,
`website/src/components/pages/legal/{LegalPage,LegalSection,LegalTable,LegalRow,LegalCell,LawRef,ContactLink,Key}.astro`,
`website/src/components/pages/legal/legal-page.ts`. Blueprints: B19 `blueprints/privacy-policy.md`, B20
`blueprints/terms.md`. No shared component, layout, data file (`legal.ts` included), `routes.ts` or `faq.json` was edited;
needs from those files are in `website-plan/requests/w1-legal.md`.

Rule order applied: 02 [Launch-blocker] > blueprint > 00 §11 > 06/07/08/04/09. Every fact on both pages renders from
`src/data/legal.ts`, `site.ts`, `content.ts`, `offers.ts` or the pricing helpers — no list is retyped in a page — and
every legal unknown is a visible `[FILL:*]` token (E12), never "DRAFT" prose. Booking data is described as used only for
the booking; reminders, reviews and offers only after a YES on WhatsApp (D4). A lawyer reviews the rendered pages before
launch (00 §9 item 7, D4): the review list is §3 below.

## 1 · Decisions

| # | What | Why | Loses / sync |
|---|---|---|---|
| W1L-01 | One shared shell for both pages: `LegalPage` (Base + 2-item breadcrumb + header + contents list), `LegalSection` (H2 + `id`), `LegalTable`/`LegalRow`/`LegalCell` (a real `<table>` with explicit ARIA roles), `LawRef`, `ContactLink`, `Key`. One reading column, 760 px of content (808 px box minus the 24 px lg gutters, 16 px below), prose in `<div class="prose">` (65ch) | Two custom-anatomy pages with the same bones; a heading and its contents-list entry come from one object, so they can never differ | — |
| W1L-02 | Tables are cards below `md` (row header = card title, every cell shows its column label, labels `aria-hidden`) and classic mint-header tables from `md` (08 §4.8). Same DOM at every width (02 P110 parity); roles `table · rowgroup · row · columnheader · rowheader · cell` are set explicitly because the `display` change makes some browsers drop table semantics | Long legal text must read top-to-bottom on a 360 px phone with no sideways scroll; screen readers keep "column 3 of 4, Why" at every width | — |
| W1L-03 | Header shows both lines from `IDENTITY.POLICY_EFFECTIVE_DATE`: "Effective from …." (blueprint PP-1/TM-1) and "Last updated: …" (stage brief; 02 P143 spirit). The sitemap `<lastmod>` is a separate value in `src/data/lastmod.ts` (E7) that the integrator sets | The blueprint asks for the effective date; the brief asks for a visible last-updated line from the same token. One token, two labels, until the lawyer says one suffices (§3 L21) | privacy-policy.md PP-1, terms.md TM-1 (add the "Last updated" line) |
| W1L-04 | An on-page contents list ("On this page", `<nav aria-labelledby>`, two columns from `md`, 44 px rows) sits between the intro and the first H2; every H2 has a fragment id and `html { scroll-padding-top }` lands it below the sticky header | Both pages are 13 sections long; the blueprints have no navigation block. Not a schema block (BreadcrumbList stays the only JSON-LD, 04 §2.9) | privacy-policy.md / terms.md §2: add the contents list to the header block |
| W1L-05 | Build-time guards (`legal-page.ts check()`) stop the build when `legal.ts` stops matching a sentence: every cookie in `STORAGE_KEYS` is a Google Analytics one ("sets two cookies" is computed), `GA4_SETTINGS` flags match the PP-7 list (Signals off, no Ads link/remarketing/audience export, no heatmaps, IP not logged, digits stripped), `GA4_PARAMS` carries no name/phone field, `RETENTION`'s GA period equals `dataRetentionMonths`, `CONSENT_TEXT` slots are filled, `PROCESSORS` still lists Web3Forms (PP-5 backup line), every `SERVICE_RULES` id renders exactly once, every `LEAD_COLUMNS` entry has a plain-English label | A wrong legal statement must never ship; a data change must force the copy to be re-read (00 §9 item 7) | — |
| W1L-06 | PP-3 details column: `LEAD_COLUMNS` through `LEAD_COLUMN_LABELS` with duplicate labels collapsed (service id and label print once), `WAITLIST_COLUMNS` and `OPERATOR_COLUMNS` the same way. Row ⑧ (job applications) renders only while `isLive('/join-as-groomer/')` (Wave 2). Rows ⑥/⑦ are single colspan cells linking to PP-7/PP-6 | Blueprint PP-3 | — |
| W1L-07 | PP-4 and PP-7 print `CONSENT_TEXT` verbatim with the item title as a bold lead-in ("Bookings & WhatsApp.", "Reminders, reviews & offers.", "Analytics.") and `fillContact()` filling `{whatsapp}`/`{email}` from `site.ts` | Blueprint: items verbatim; the built page contains no `{whatsapp}`/`{email}` (checked at build) | — |
| W1L-08 | `LawRef`: the law a sentence rests on prints after it as small slate text (PP-10 `RIGHTS.law`; PP-3 basis column: "DPDP Act s.7(a)" for booking, waitlist, chat, photo update, team notes; "Consent, DPDP Act s.6" for photo featuring) | Blueprint PP-10 style, applied to PP-3 so the basis column reads the same way | — |
| W1L-09 | `ContactLink`: wa.me and `tel:` anchors carry `data-source="privacy-policy_page"` / `"terms_page"` (09 §2d `<slug>_page`); WhatsApp opens the page's own prefill (`services.ts PAGE_PREFILL`, 02 P158) in a new tab with `rel="noopener"`; `mailto:` carries no source (not a tracked event). An unfilled value prints as its token and keeps `tel:[FILL:…]`, so `check:fill` still finds it | 09 §3.2 delegated tracker; test:site tracked 13 (privacy) / 11 (terms) clicks with the right source | — |
| W1L-10 | Cross-references in the blueprint copy ("(PP-4)", "(TM-10)", "medicines and vaccines at MRP: TM-9", "Grievance Officer below") render as in-page links whose text is the target section's heading | A block number means nothing to a reader; the heading text does | — |
| W1L-11 | TM-7 uses `RESCHEDULE_TEXT` (content.ts) verbatim instead of the blueprint's paraphrase ("Reschedule or cancel free until 2 hours…") | F2-20 made it the one wording site-wide; requests/f2-data.md B: "/terms/ … use RESCHEDULE_TEXT verbatim" (book.md ship check) | terms.md TM-7 (quote `RESCHEDULE_TEXT`) |
| W1L-12 | TM-11 uses `FIRSTGROOM_TERMS`, `REFERRAL_TERMS` and `GROOM_CLUB_PITCH.body` (content.ts) verbatim, under H3s `FIRSTGROOM` (the code, `FIRSTGROOM.code`) · `Referral` · `Groom Club` · `Other offers`, instead of the blueprint's paraphrases; the "booking form adds the code automatically…" and "Other offers" sentences are the blueprint's | F2-18: one wording for every page that advertises an offer and for the OfferCatalog markup (06 §7.4); amounts come from offers.ts / pricing.json, so no ₹ is typed (`check:prices` OK) | terms.md TM-11 (quote the content.ts strings) |
| W1L-13 | TM-3 rows render `site.hours.visits` and `site.hours.walks` as they are; the April–June rule is part of the walks row ("(Apr–Jun: before 8:00 or after 19:00)"), not a row of its own. Two more rows: "Dog walks on December–January fog days — Morning walks move to 8:00–9:30." (dog-walking.md SP-4) and "WhatsApp replies — `R3` Messages sent after 19:00 are answered from 9:00." | site.ts is the single source for hours (00 §3.1); a separate Apr–Jun row would retype the fact | terms.md TM-3 (four rows, Apr–Jun inside the walks row) |
| W1L-14 | `SERVICE_RULES` placement (each id once): TM-2 `waitlist` · TM-4 `walking-start` · TM-5 `add-ons-first`, `mats` · TM-6 `pay-after` · TM-8 the 11 rules in the blueprint's order · TM-9 `vet`, `not-emergency`, `mrp`. `not-emergency` renders as a sand `role="note"` callout with the alert icon (the vet-at-home emergency-notice look); its `[FILL:EMERGENCY_VET_LIST]` token is filled from `site.emergencyVets` through `fillSiteTokens()` — the same fill faq.ts applies — so the value is typed once | Blueprint TM-2…TM-9; `check()` fails the build if an id is missing, doubled or unknown | — |
| W1L-15 | Grievance Officer (PP-11) is a mint card: `<dl>` Name · Email · Phone from `IDENTITY.GRIEVANCE_*`, then the reply-time line from `LAW.GRIEVANCE_REPLY` and the Board route. `IDENTITY.DPB_COMPLAINT_LINK` renders as a link only once it is a URL (`isUrl`); while a token, as text | Blueprint PP-11 "Card" | — |
| W1L-16 | PP-14 is a three-row contact list (icon + label + link, 44 px rows) followed by `R3`; no `CtaBand`. The sticky bar stays (07 §2 row 1: every page except `/book/` and `/thank-you/`); the exit card is off (Base `NO_EXIT_CARD`) | Blueprint PP-14 "No CTA band: this is a legal page" refers to SP-12 CtaBand, not the site-wide bar | — |
| W1L-17 | Storage keys, GA4 event and parameter names print through `Key`: a mint code chip in the body face (08 §2.1 allows no third family) with a `<wbr>` after every underscore, `overflow-wrap: anywhere` as the fallback | At 768/1280 the 24 % Name column split keys mid-word ("pds_booking_starte / d"); now they wrap after an underscore. `<wbr>` adds no text, so `check:legal --dist` still finds every key verbatim | — |
| W1L-18 | PP-6 adds one footnote under the table: "In `_ga_<id>`, <id> stands for our Google Analytics measurement ID." | The `legal.ts` key is literally `_ga_<id>`; a reader needs to know the placeholder | privacy-policy.md PP-6 |
| W1L-19 | Head lines, H1 and the thirteen H2 labels are the blueprints' §1 lines and bold block names verbatim; `LegalPage` names the breadcrumb from `routes.ts` labels ("Privacy Policy", "Terms"), the same names the footer legal row uses | 02 P012/P020/P026 (gate: head = blueprint) · 02 P084 (BreadcrumbList = visible crumb) | — |
| W1L-20 | Internal links only through `isLive()`: `/privacy-policy/` in TM-1 and `/pricing/` in TM-2/TM-5 render as links only while live (plain text otherwise); the breadcrumb Home link likewise (shared `Breadcrumb`). Nothing links `/refund-policy/` (Wave 2) | 02 P074 (zero broken links); with `PUBLIC_PDS_PREVIEW_LIVE=wave1` all three are links | — |

## 2 · Copy written (not in any doc yet — sync verbatim)

- **PP-1 / TM-1 header lines:** "Effective from [FILL:POLICY_EFFECTIVE_DATE]." · "Last updated: [FILL:POLICY_EFFECTIVE_DATE]". **Contents list label:** "On this page".
- **PP-3 table:** columns "What · Details · Why · Legal basis"; row titles "Booking form", "Waitlist (Outside Ludhiana)",
  "WhatsApp chat", "Visit photos", "Team notes", "Website statistics", "Saved on your device", "Job applications";
  basis cells "You give it to us to book." / "You give it to us to join the waitlist." / "You send it to us for your
  booking." / "Photo update: part of your booking." + "Featuring: your YES on WhatsApp." / "Part of running your booking.
  The YES date is our record of your consent." / "You send it to us to apply."; "See {section} below." for rows ⑥/⑦.
  Caption (visually hidden): "What we collect, why we collect it and the legal basis".
- **PP-5 table:** columns "Service · What for · Which data"; caption "The services that handle your data for us".
- **PP-6 table:** columns "Name · Where · What for · How long"; "Where" values "Your browser (local storage)" / "Your
  browser (session storage)" / "Your browser (cookie)"; caption "Cookies and data saved on your device"; footnote
  (W1L-18). "We don't use" is an H3.
- **PP-7 list, last item:** "Events never carry your name or mobile number. The events we count are {GA4_EVENTS}, and the
  details we add to them are {GA4_PARAMS}." Other items as the blueprint lists them, written out as sentences ("It runs on
  the live website only.", "Google Signals is switched off.", "There is no Google Ads link, no remarketing and no
  audience export.", "There are no heatmaps or session recordings.", "Detailed visit and event data is kept for 14
  months.", "IP addresses are not logged or stored.", "Area names you type are sent with every digit removed and cut to
  30 characters, so a phone or house number never reaches Google Analytics.").
- **PP-8:** each `RETENTION` row as "**{what}:** {period}".
- **PP-11 card labels:** "Name" · "Email" · "Phone". **PP-14 labels:** "WhatsApp" · "Email" · "Phone".
- **PP-13 / TM-13 cross-references:** "(see How we use your data — the YES rule)" · "(see If something goes wrong)";
  **TM-5:** "For medicines and vaccines, see Vet visits and vaccinations."
- **TM-3 table:** columns "What · When"; rows "Grooming and vet visits", "Dog walks", "Dog walks on December–January fog
  days — Morning walks move to 8:00–9:30.", "WhatsApp replies — {R3} Messages sent after 19:00 are answered from 9:00.";
  caption "When we work".
- **TM-7 list labels:** "**Cancelling less than 2 hours before your slot:** [FILL:LATE_CANCEL_RULE]" · "**If nobody is
  home when we arrive:** [FILL:NO_SHOW_RULE]".
- **TM-11 H3s:** "FIRSTGROOM" · "Referral" · "Groom Club" · "Other offers".

## 3 · Points for the lawyer to review (00 §9 item 7, D4)

Where the point sits on the page is given in brackets. Tokens the review must settle: `IDENTITY.*` in `legal.ts`
(`LEGAL_NAME`, `GRIEVANCE_OFFICER_NAME`, `GRIEVANCE_EMAIL`, `GRIEVANCE_PHONE`, `JURISDICTION`, `RETENTION_LEADS`,
`RETENTION_CHATS`, `RETENTION_PHOTOS`, `MIN_AGE`, `NO_SHOW_RULE`, `LATE_CANCEL_RULE`, `LIABILITY_TERMS`,
`POLICY_EFFECTIVE_DATE`, `DPB_COMPLAINT_LINK`) plus `site.ts` `emergencyVets` (TM-9) and, for TM-12,
`[FILL:INSURANCE_STATUS]` (00 §8).

1. **Identity and address** (PP-2, TM-1). Whether a postal address and registration details (entity type, GSTIN/CIN
   if any) must be published: IT Rules 2011 r.5(3)(d); Consumer Protection (E-Commerce) Rules 2020 r.4(2), if they
   apply to a service booked through a website that takes no payment online. `05` §4 never displays
   `[FILL:BASE_ADDRESS]`.
2. **Provisions in force on the effective date.** The page cites DPDP Act 2023 ss.5, 6, 6(4), 7(a), 8(5)–(10), 9,
   11–14, 13(3) and IT Rules 2011 r.4/r.5 side by side. Confirm which apply on `POLICY_EFFECTIVE_DATE` (DPDP Rules 2025
   commencement schedule) and whether the IT Rules citations stay, go, or change.
3. **Legal basis column** (PP-3, PP-4). Booking, waitlist, WhatsApp chat and team notes rest on s.7(a) ("voluntarily
   provided for a specified purpose"); photo featuring, reminders, review requests and offers rest on consent (s.6)
   recorded as a WhatsApp "YES" with its date in the `opt_in` column (D4, 09 §5). Confirm the s.7(a) reading, and
   whether a WhatsApp YES is valid, verifiable consent (record, withdrawal "as easy as giving it", s.6(4)).
4. **Notice** (s.5). Whether this page is the notice, or a separate notice at the point of collection is needed — the
   booking form's Step 5 consent line links here (07 §3 Step 5, D4); confirm that line's wording is enough.
5. **Google Analytics without a cookie banner** (PP-6, PP-7; `09` §9.4 chose none for Phase 1). With IP addresses not
   logged, Signals off, no advertising features, a random cookie ID and 14-month retention: is consent needed for the
   `_ga` cookies and the event data, or is the current position tenable? Also whether the digit-stripped, 30-character
   `area` / `area_text` values (E10) are acceptable as non-personal data.
6. **Cross-border** (PP-5, `CROSS_BORDER_NOTE`). Google (Sheets, Apps Script, GA4), Web3Forms, Meta (WhatsApp) and
   Cloudflare may store or process outside India: s.16 and any notified restrictions; confirm the sentence.
7. **Processors** (PP-5). Whether the list is complete for launch (the mailbox provider behind `[FILL:EMAIL]` is added
   once chosen; a job-application route once `/join-as-groomer/` is live) and whether written processor contracts are
   required (s.8(2)).
8. **Retention** (PP-8). Values for the three `RETENTION_*` tokens; whether any law requires keeping booking or billing
   records longer (tax/accounting); whether the DPDP Rules' erase-after-inactivity rule applies at this scale; the
   closing line "unless the law requires us to keep it longer".
9. **Rights** (PP-10). The published 7-day deletion promise (`09` §9.5, `RIGHTS` `erasure`) — acceptable as a
   commitment; the nomination right (s.14) wording; correction/completion wording (s.12).
10. **Grievance Officer** (PP-11, TM-10). `LAW.GRIEVANCE_REPLY` = "within one month of receiving it" (IT Rules r.5(9))
    versus the DPDP Rules timeline — publish the stricter one; who may hold the role and which contact details must be
    published; the Board's complaint route for `DPB_COMPLAINT_LINK`.
11. **Breach line** (PP-9). "If a data breach affects you, we will tell you and the Data Protection Board of India as
    the law requires" — s.8(6) and the Rules' form and timeline for notification.
12. **Children** (PP-12). `MIN_AGE`, and whether "If you are younger, please ask a parent or guardian to book for you"
    meets s.9 (verifiable parental consent) given that the booking form does not check age.
13. **Security statements** (PP-9). HTTPS, a private sheet, a secret form endpoint and no card data: acceptable as
    "reasonable security practices" (IT Rules r.8) without naming a standard?
14. **TM-12 `LIABILITY_TERMS`** (written by the lawyer with Sunny). Must settle: who pays for a vet check after an
    incident (`safety-hygiene.md` SH-7), insurance (`[FILL:INSURANCE_STATUS]`), whether a stopped service is charged
    (`06` §6 answer 4), and any cap on liability. **TM-7** `LATE_CANCEL_RULE` and `NO_SHOW_RULE` (`00` §3.2 is silent
    on no-shows).
15. **TM-13 `JURISDICTION`.** An exclusive-courts clause against consumers (Consumer Protection Act 2019 s.34 lets a
    consumer file where they live or work): wording that does not overreach. The page already says nothing in the terms
    limits CPA 2019 rights (`LAW.CONSUMER_ACT`).
16. **TM-8 pet-handling consent** (`handling-consent`) and the muzzle, no-sedation, stop-safely, products and
    walking-safety rules as contract terms: adequacy for a pet-care service; whether an owner's-permission warranty
    is enough.
17. **TM-9 vet framing.** "PetDoorStep arranges the visit and never practises medicine. Diagnosis, prescriptions,
    vaccines and medicines are handled only by a registered veterinarian": is PetDoorStep an intermediary for the
    registered vet (Indian Veterinary Council Act 1984), who does the customer contract with for the vet service, and
    is the MRP line (`mrp`) right.
18. **"Not an emergency service"** (TM-9 callout, `not-emergency`) and the 24-hour hospital list: adequacy of the
    disclaimer.
19. **TM-11 offers.** FIRSTGROOM (one use per household, Full Groom / Premium Spa only, not combinable, 45 days),
    Referral (larger discount applies) and Groom Club terms, and "Offers end on their stated date or are extended with
    a new date": any unfair-trade-practice or promotion-law point; whether "Other offers" needs a general reservation.
20. **TM-6/TM-7 "no advance payment, nothing to refund"** and its interplay with the Wave-2 `/refund-policy/` and the
    E-Commerce Rules, if they apply (point 1).
21. **Dates.** Whether both "Effective from" and "Last updated" stay (today one token feeds both, W1L-03) and whether
    earlier versions must be kept available.
22. **Citations.** Whether the full titles in `LAW.IT_RULES` and `LAW.DPDP_RULES` must be printed (both exports exist and
    are unused today; the page cites "IT Rules 2011" and "DPDP Act" in short form).

## 4 · Verification record (2026-10-03, build with `PUBLIC_PDS_PREVIEW_LIVE=wave1`)

- `check:pages --pages /privacy-policy/,/terms/`: 0 FAIL, 20 WARN (all "links to a live Wave-1 route not in this
  dist" — other builders' pages). `check:pages --all` on this dist: neither legal page fails P068 (`/book/` links both
  from its `<main>` — the static privacy line and FAQ #3 — and `/terms/` links `/privacy-policy/`); P127 fails only for
  the missing `LASTMOD` entries (requests A).
- `check:budgets --pages …`: 0 FAIL, 0 WARN (CSS 42,802 / 42,603 B; no scripts beyond JSON-LD and the tagged analytics
  bootstrap). `check:legal --dist`: 0 FAIL, 2 WARN (`_ga`, `_ga_<id>` are set by gtag.js, not by src/). `check:prices`:
  OK. `test:site --pages … --port 4561`: 0 FAIL, 0 WARN at 360×640, 768×1024 and 1280×800 (no overflow, no console errors, axe clean,
  JSON-LD parses, CLS 0, tracking 13/11 clicks with the page source, exit card absent).
- Block walk, both pages, DOM order: PP-0…PP-14 and TM-0…TM-14 all present; head lines = §1 verbatim; one JSON-LD block
  (BreadcrumbList, 2 items = visible crumb); "Effective from" + "Last updated" from the token; 13 H2s = contents list,
  17/15 fragment links all resolve; every list rendered from `legal.ts` exports (`STORAGE_KEYS`, `LEAD_COLUMNS` +
  `LEAD_COLUMN_LABELS`, `WAITLIST_COLUMNS`, `OPERATOR_COLUMNS`, `PROCESSORS`, `NOT_USED`, `CROSS_BORDER_NOTE`,
  `GA4_EVENTS`, `GA4_PARAMS`, `GA4_SETTINGS`, `RETENTION`, `RIGHTS`, `IDENTITY`, `LAW`, `CONSENT_TEXT`, `SERVICE_RULES`);
  no "DRAFT" prose, no Hinglish, no `{whatsapp}`/`{email}` slot, no typed ₹; 13 distinct `[FILL:*]` tokens on the
  privacy page, 12 on the terms page; `target="_blank"` always with `rel="noopener"`.
- Screenshots reviewed at 360/768/1280 (scratchpad `wave1/w1-legal/`): tables stack as cards at 360 with no sideways
  scroll; one defect found and fixed (W1L-17, keys split mid-word in the Name column from `md`).

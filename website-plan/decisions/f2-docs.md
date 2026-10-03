# Stage f2-docs — change log (2026-10-03)

> Stage: Wave 1 foundation, docs + legal data (branch `wave1/f2-docs`). Owns `website/src/data/legal.ts`,
> `website/src/assets/photos/README.md` and `website-plan/` (except other stages' `decisions/` and `requests/` files).
> Decisions are recorded in `00-MASTER-PLAN.md` §11 (rows dated 2026-10-03). Rule order used to settle conflicts:
> `02` [Launch-blocker] items > the page blueprint > `00` §11 > `06`/`07`/`08`/`04`/`09`. When a decision was applied,
> the losing doc was edited so that no doc contradicts another.

## Decisions applied

| ID | Decision (short) | By |
|---|---|---|
| D1 | Exit nudge → small non-modal corner card on desktop: `07` §2 row 7 conditions and copy kept, ≤ 15% of the viewport (P107), no backdrop, Esc + "No thanks" close, no overlay click; neutral copy variant on cat/walking/vet pages | Sunny |
| D2 | Dog-walking hero primary → `/book/?service=dog-walking&src=hero_dog-walking` (Trial Week preselected), not wa.me | Sunny |
| D3 | "A real person replies on WhatsApp within 10 minutes, 9:00–19:00" is confirmed; the contact page's call-back promise is removed (calls not staffed) | Sunny |
| D4 | Booking data used only to handle the booking (legitimate use); reminders, review requests, rebooking nudges, offers and broadcasts only after a YES on WhatsApp; consent line links `/privacy-policy/`; lawyer reviews the legal pages before launch | Sunny |
| E1 | Dog/cat/vet hero primary → `/book/?src=hero_<slug>` | Engineering |
| E2 | Mid-page CTA ₹ = preselected service/plan price, else the page's lowest price | Engineering |
| E3 | Fold law P150 operationalised (above the sticky bar; hidden secondary CTA + eyebrow below `md`; body-size subhead; breadcrumb `py-2`; failures become a P150 exception for Sunny) | Engineering |
| E4 | Extra CTA row after SP-2; SP-12 `CtaBand` stays the page-end CTA | Engineering |
| E5 | Photo alts follow the `08` §5.2 shot list; new shots 13 + 14 | Engineering |
| E6 | OfferCatalog names = visible `/pricing/` labels | Engineering |
| E7 | Sitemap = live routes only, real `lastmod`; noindex pages emit `noindex, follow` | Engineering |
| E8 | Keep vet/cat Service offers; duplicate FAQ markup accepted; P098 map facade deferred | Engineering |
| E9 | NAP owned by `05` §4; `02` P088 example aligned | Engineering |
| E10 | GA4 `area`/`area_text`: digits stripped, max 30 chars | Engineering |
| E11 | `/contact/` title + H1 carry "pet grooming contact number ludhiana" | Engineering |
| E12 | Legal unknowns are `[FILL:*]` tokens in `00` §8, never "DRAFT" prose | Engineering |
| — | Canonical `source` values (`09` §2d) and the three `data-pds` inline-script exceptions | Engineering |

## Every change, by file

| # | File · section | Change | Why |
|---|---|---|---|
| 1 | `website/src/data/legal.ts` (new) | Import-free data for the legal pages: `STORAGE_KEYS` (7 `pds_*` keys incl. the new `pds_exit_shown`, + `_ga`, `_ga_<id>`), `LEAD_COLUMNS` (25, = `bookingPayload()` keys and the `07` §5a header), `WAITLIST_COLUMNS`, `OPERATOR_COLUMNS`, `LEAD_COLUMN_LABELS`, `GA4_EVENTS`, `GA4_PARAMS`, `GA4_SETTINGS`, `PROCESSORS`, `NOT_USED`, `CROSS_BORDER_NOTE`, `IDENTITY` (14 tokens), `LAW`, `RIGHTS`, `RETENTION`, `SERVICE_RULES` (19, each with a source comment), `CONSENT_TEXT` (= `09` §9.5) + `fillContact()` | Deliverable 1, D4, E10, E12 |
| 2 | `website/src/assets/photos/README.md` | "12 shots" → 14; rows 13 `puppy-first-groom-at-home-ludhiana.jpg` and 14 `dog-tick-check-at-home-ludhiana.jpg`; alt paragraph names the shot-list rule | E5 |
| 3 | `blueprints/privacy-policy.md` (new, B19) | Head (title 54, meta 147, H1 50), blocks PP-0…PP-14 (IT Rules 2011 r.4/r.5 + DPDP Act 2023 notice), no images, ship checks incl. the lawyer's question list | Deliverable 2, D4 |
| 4 | `blueprints/terms.md` (new, B20) | Head (title 58, meta 152, H1 46), blocks TM-0…TM-14, every `SERVICE_RULES` id rendered once, no images, ship checks | Deliverable 2 |
| 5 | `00` §3.1 | "Service hours (draft)" no longer covers WhatsApp replies; new row "WhatsApp reply time (confirmed)"; other drafts left flagged | D3 |
| 6 | `00` §4 | Blueprint row names the legal pages + `legal.ts`; new row for `decisions/<stage>.md` | Housekeeping |
| 7 | `00` §8 | `FOUNDER_NAME` added to People; new Legal group: `LEGAL_NAME` `GRIEVANCE_OFFICER_NAME` `GRIEVANCE_EMAIL` `GRIEVANCE_PHONE` `JURISDICTION` `RETENTION_LEADS` `RETENTION_CHATS` `RETENTION_PHOTOS` `MIN_AGE` `NO_SHOW_RULE` `LATE_CANCEL_RULE` `LIABILITY_TERMS` `POLICY_EFFECTIVE_DATE` `DPB_COMPLAINT_LINK`; E12 sentence. `EMERGENCY_VET_LIST` was already registered | E12, D4, P047 |
| 8 | `00` §9 item 7 | Lawyer sign-off of the legal pages before launch; Legal tokens filled in `legal.ts` | D4 |
| 9 | `00` §11 | 18 rows dated 2026-10-03 (D1–D4, E1–E12, source list, legal blueprints + consistency pass) and a note that these D-numbers are not the §2 ones | All |
| 10 | `01` §1 Legal & utility | New Blueprint column: privacy/terms → the new blueprints (+ `legal.ts`), 404 → `04` §1.6, sitemap/robots → `04` §1.5/§7.1. No Status column touched | Deliverable 3 |
| 11 | `02` P088 | Example now renders the `05` §4 NAP block (as `08` §4.4 and the built footer do); pincode `141001` removed | E9 |
| 12 | `04` §1.2 | Sitemap config: live routes only + real lastmod (helper names illustrative) | E7 |
| 13 | `04` §1.5 | Mechanism note says `noindex, follow` and points at §3.3 (was "§3.2") | E7 |
| 14 | `04` §1.6 | 404 meta → `noindex, follow` | E7 |
| 15 | `04` §2.0 rule 5 | Duplicate FAQ markup (source page + `/faq/`) accepted | E8 |
| 16 | `04` §2.1 | LocalBusiness `image` → `/og/default.png`, `logo` → `/icon-512.png` (the shipped files; matches `src/lib/schema.ts`) | OG file list |
| 17 | `04` §2.2 | Mapping intro notes vet + cat offers stay | E8 |
| 18 | `04` §2.4 | Area breadcrumb paragraph states only the 3-item decision (the "Areas ›" alternative is gone) | Consistency |
| 19 | `04` §2.5 | OfferCatalog JSON rewritten: names = `/pricing/` labels (`Bath & Brush`, `Full Groom`, `Premium Spa`, `Cat Bath & Brush`, `Cat Full Groom`, `Puppy Intro Groom (8 weeks–6 months)`, `Nail Trim + Ear Clean visit`, `Tick & Flea add-on`, `Tick & Flea standalone`, `1 walk/day`, `2 walks/day`, `Trial Week (7 walks)`, `Vet visit`, `Vaccination`, `Deworming`, `Groom Club`), context moved to `description`, page order | E6 |
| 20 | `04` §3.3 | Rule now "noindex pages emit `noindex, follow`": `/thank-you/` and 404 | E7 |
| 21 | `04` §4 | `og:title` = title without " \| PetDoorStep"; `og:image:alt` always; OG file list table (`default.png` ships; dog-grooming, cat-grooming, dog-walking, vet-at-home, blog-default planned; per-post files Wave 3) with alts; spec allows PNG | §4 brief |
| 22 | `04` §5.3 | Inline-script exceptions: analytics bootstrap, exit card, thank-you script, each `data-pds` | Source-list decision |
| 23 | `04` §7.1 | Live routes only; real lastmod kept by hand with the route; no fake dates; CI check also excludes 404 | E7 |
| 24 | `04` §8 | DoD OG line follows the §4 list | OG file list |
| 25 | `05` §3.1 | YES-rule paragraph; WhatsApp ask (step 2) and nudge (step 3) only to opted-in customers; verbal script variant for customers without a YES | D4 |
| 26 | `05` §3.6 | No-gating line explains why opt-in-only WhatsApp asks are not gating | D4 |
| 27 | `05` §4 | Marked as the NAP owner | E9 |
| 28 | `05` §8 | Daily checklist: review asks only for YES customers | D4 |
| 29 | `06` §2.3 | Intro: every hero primary → `/book/`, amber; dog/cat/vet targets written in; dog-walking CTA → booking form | E1, D2, E3 |
| 30 | `06` §3.1 | Primary-CTA behaviour (hero → `/book/`, CtaBand → wa.me; green only on wa.me); R3 confirmed, no call-back promises | E1, D3 |
| 31 | `06` §3.3 | `cta_call`/`cta_whatsapp`/`cta_book` → `call_click`/`whatsapp_click` + widget `booking_started` | Consistency (`00` §11 2026-10-02) |
| 32 | `06` §7.3 | Groom Club WhatsApp pitch only to YES customers; CTA source `groomclub` | D4, source list |
| 33 | `06` §8 | Aligned to the built widget (`07`): 5 steps + review, "Step X of 5", ribbon wording, free-text fields, verbatim errors in `07`, resume-banner wording | Consistency |
| 34 | `06` §9 | E1–E3 annotated (inside the widget `07` strings win); W4/W5 YES-only; new W6 opt-in ask; YES-rule paragraph | D4 |
| 35 | `07` §2 row 2 | Header Book Now exists at every width (was "desktop ≥1024px") | Consistency (`08` §4.3) |
| 36 | `07` §2 row 3 | Labels from the blueprints; primary always `/book/?src=hero_<slug>`, amber; dog walking adds `service=dog-walking`; secondary hidden below `md` | E1, D2, E3 |
| 37 | `07` §2 row 4 | Placement: after SP-2 and after SP-4; CtaBand is the page-end CTA; price rule; no-preselect target `/book/?src=service_<page-slug>` | E2, E4 |
| 38 | `07` §2 row 5 | Pipes inside the code span escaped (the row rendered with 8 cells) | Rendering fix |
| 39 | `07` §2 row 7 | Exit card: non-modal corner card, ≤ 15% viewport, no overlay; neutral variant on cat/walking/vet pages | D1 |
| 40 | `07` §2 (after table) | Page-specific WhatsApp prefills live in `website/src/data/services.ts` (`MONEY_PAGES[].waPrefill`, `PAGE_PREFILL`) | Brief |
| 41 | `07` §3 Step 5 | Consent label gains a `Privacy policy` link (new tab, outside the label, rendered once the page is live) | D4 |
| 42 | `07` §7 | E10 note under the table (table itself unchanged, still byte-identical to `09` §2a) | E10 |
| 43 | `07` §8 | Three `data-pds` inline scripts (was "two") | Source-list decision |
| 44 | `07` §9 | Exit-card a11y: dialog without `aria-modal`, no focus trap, Esc closes | D1 |
| 45 | `08` §0 note 1 | Stale "07 says < 1024px" note closed | Consistency |
| 46 | `08` §2.2 | `body-lg` hero subhead only ≥ md | E3 |
| 47 | `08` §3.3, §3.6 | "exit-nudge modal" → exit card (shadow-3, z-50) | D1 |
| 48 | `08` §4 conventions | Mentions the three inline-script exceptions | Source-list decision |
| 49 | `08` §4.6 | Fold law per E3 | E3 |
| 50 | `08` §4.17a (new) | Exit card skin and constraints | D1 |
| 51 | `08` §4.18 | Breadcrumb `py-2` below md | E3 |
| 52 | `08` §5.2 | 14 shots; alt rule paragraph; rows 13–14 | E5 |
| 53 | `08` §5.6 | OG images follow the `04` §4 file list (`default.png` ships) | OG file list |
| 54 | `08` §8.1 | JS row lists the three `data-pds` inline-script exceptions | Source-list decision |
| 55 | `08` §8.4 | 14 shots in `src/assets/photos/`; OG per the `04` §4 list | E5 |
| 56 | `09` §2a | E10 note under the table (table unchanged) | E10 |
| 57 | `09` §2d | Canonical source table: 12 fixed values + `hero_<slug>`, `service_<id>`, `ctaband_<slug>`, `<slug>_page`; slug definition; 40-char `src` note | Source-list decision |
| 58 | `09` §3.1 | Three inline scripts, each `data-pds` | Source-list decision |
| 59 | `09` §4 | Broadcast row: YES customers only | D4 |
| 60 | `09` §5 | New operator column `opt_in` (date of the YES); column list lives in `legal.ts` | D4 |
| 61 | `09` §9.3, §9.4 | Data used only to handle the booking (s.7(a)); storage list → `legal.ts`; GA4-consent question for the lawyer | D4 |
| 62 | `09` §9.5 | Three paragraphs per D4 (Analytics; Bookings & WhatsApp; Reminders, reviews & offers) = `legal.ts` `CONSENT_TEXT` | D4 |
| 63 | `09` §9.6 | `/thank-you/` is `noindex, follow` | E7 |
| 64 | `blueprints/about.md` | P047 note; founder = `[FILL:FOUNDER_NAME]` (AB-1, alt); AB-2 closing line with founder + `[FILL:LEGAL_NAME]`; AB-6 omitted while no team (AB-5 stays); AB-8 omitted until real numbers; ship checks | P047, brief |
| 65 | `blueprints/contact.md` | Head: title `Pet Grooming Contact Number in Ludhiana \| PetDoorStep` (53), meta (143), H1 `Pet Grooming Contact Number in Ludhiana` (39); CO-1 wording; CO-2 H2 → "WhatsApp, call or email PetDoorStep" (no duplicate of the H1); FAQ #1 call-back sentence removed; ship checks (no call-back, head counts, P098 deferred) | E11, D3, E8 |
| 66 | `blueprints/faq.md` | "27 questions" → 28 (heading + ship check). Count verified against the §3 table and `faq.json` (28 entries on `/faq/`) | Brief |
| 67 | `blueprints/dog-walking.md` | SP-1 primary → booking form with Trial Week preselected; Call hidden below md; hero shot/alt = Beagle (shot 9) | D2, E3, E5 |
| 68 | `blueprints/vet-at-home.md` | SP-1 primary target; §0 rule 4 + FAQ #3 now carry `[FILL:EMERGENCY_VET_LIST]` ("Nearest 24-hour hospitals: …"); hero shot/alt = Pomeranian (shot 10) | E1, brief, E5 |
| 69 | `blueprints/cat-grooming.md` | SP-1 primary target; hero shot/alt = cat on a towel (shot 5) | E1, E5 |
| 70 | `blueprints/dog-grooming.md` | SP-1 primary target written in | E1 |
| 71 | `blueprints/dog-vaccination.md` | Reminder ✓-item, FAQ #5 and FAQ #8 say reminders follow a YES; hero shot/alt = shot 10 vaccination crop (as `08` §5.2 already listed) | D4, E5 |
| 72 | `blueprints/book.md` | `/thank-you/` → `noindex, follow` (status table, B1, ship check); "exit card" naming | E7, D1 |
| 73 | `blueprints/offers.md` | `src=offers` → `offers_page`; Groom Club CTA `data-source="groomclub"` | Source list |
| 74 | `blueprints/pricing.md` | Groom Club CTA source; §5 notes that it wins over older `04` names | Source list, E6 |
| 75 | `blueprints/home.md` | H-3 card photos name shots 13 + 14 | E5 |
| 76 | `blueprints/_TEMPLATE-service-page.md` | Block index + SP-2 closing CTA row; SP-1 CTA target + worked example; SP-1 Mobile fold law; SP-4 price rule; SP-12 source `ctaband_<slug>`; SP-13 event names; §2.6 OG; §4 ship checks (fold, CTA rhythm) | E1–E4, consistency |
| 77 | `blueprints/_TEMPLATE-area-page.md` | AP-10 `src=area_{slug}` → `{slug}_page` | Source list |
| 78 | `blueprints/_TEMPLATE-blog-post.md` | BP-5 `src=blog_{slug}` → `{slug}_page` (+ 40-char note) | Source list |

## Follow-ups for the code owners (not this stage's files)

1. `src/data/faq.json`: `contact-1` drops "Calls work too — if we miss your call during a visit, we call back within 30 minutes." (D3); `vet-at-home-3` ends "… don't wait for a home visit. Nearest 24-hour hospitals: [FILL:EMERGENCY_VET_LIST]."; `dog-vaccination-5` and `dog-vaccination-8` take the new YES wording (D4).
2. `src/layouts/Base.astro`: `og:title` without " | PetDoorStep", `og:image:alt`, robots `noindex, follow`, `data-pds` on the analytics script (E7, `04` §4).
3. `astro.config.mjs`: sitemap filter = live routes, real lastmod (E7).
4. `src/lib/schema.ts` `offerCatalogLd()`: Offer names per `04` §2.5 (E6).
5. Booking widget: consent-line privacy link (`07` §3 Step 5); GA4 `area`/`area_text` cleaning (E10).
6. Exit card component: `pds_exit_shown`, non-modal, `data-pds` (D1); `/thank-you/` script `data-pds`.

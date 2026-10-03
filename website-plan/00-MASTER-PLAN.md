# 00 · MASTER PLAN — PetDoorStep Website Planning System

> **This file is the constitution.** Every other file in `website-plan/` obeys it.
> When Sunny says *"follow the md file"* (in any wording/spelling), the session must:
> **(1)** open this file, **(2)** find the task in the [Progress Tracker](#6--build-waves--progress-tracker),
> **(3)** open the linked file(s) for that task, **(4)** execute exactly what they specify,
> **(5)** tick the tracker and note it in the [Decision Log](#11--decision-log).
> If an instruction from chat conflicts with these files, ask once, then update the file first, then build.

---

## 1 · What we are building

**PetDoorStep** — a doorstep pet-care services website for **Ludhiana, Punjab, India**:
dog & cat grooming at home, dog walking, vet-at-home and related services, booked via a
smart multi-step form that deep-links to WhatsApp. Built to rank #1 locally on Google
(local SEO) and to convert visitors at the highest possible rate, with an architecture
that expands to other Punjab cities and later India **with zero URL migration**.

The business case, market research, competitors and pricing logic live in
`../pet-care-ludhiana-strategy/` (strategy report). This folder is the **website execution plan**.

---

## 2 · Locked decisions (do not re-litigate without Sunny's say-so)

| # | Decision | Choice | Why |
|---|----------|--------|-----|
| D1 | Framework | **Astro** (+ Tailwind CSS; React islands only where interactivity is needed) | Static HTML, near-zero JS → 90+ Lighthouse by default; Core Web Vitals is a ranking signal |
| D2 | Booking (Phase 1) | **Smart multi-step form → WhatsApp deep-link** + lead capture (spec: `07-BOOKING-SPEC.md`) | Zero backend cost, matches how Ludhiana buys; slot/payment engine is Phase 2 |
| D3 | Language | **English content + Hinglish keyword targeting**; Hindi/Punjabi page versions only at Punjab-expansion phase | Matches real search behaviour; avoids splitting early SEO authority |
| D4 | Brand | **PetDoorStep** | Chosen by Sunny (2026-10-02). Says the positioning literally |
| D5 | Domain (planned) | **petdoorstep.in** (preferred) / petdoorstep.com (if available, buy both) | `[FILL:DOMAIN]` until purchased — see Pre-launch checklist |
| D6 | URL architecture | Geo-silo, city-in-path for money pages (see §5) | Zero-migration expansion to Jalandhar/Amritsar/etc. |
| D7 | Site location in repo | Astro project will be scaffolded in **`website/`** subfolder of this repo | Root Vite/Three.js skeleton stays untouched |
| D8 | Hosting (planned) | Static host with global CDN — **Cloudflare Pages** (free tier) recommended; Netlify/Vercel acceptable | Free, fast in India, HTTPS automatic |

---

## 3 · Business facts — SINGLE SOURCE OF TRUTH

Every page, blueprint and schema block must take these values **from here only**.
Change a fact → change it here first, then propagate.

### 3.1 Brand
| Item | Value |
|---|---|
| Brand name | PetDoorStep |
| Tagline (EN) | *Pet care at your doorstep* |
| Support line (Hinglish, optional in hero/socials) | *Ghar baithe pet care — Ludhiana mein!* |
| Logo/colours/typography | See `08-DESIGN-SYSTEM.md` (teal + amber identity carried over from strategy report) |
| Instagram (planned) | `[FILL:INSTAGRAM]` — suggest **@petdoorstep** |
| WhatsApp Business number | `[FILL:WHATSAPP_NUMBER]` (format +91XXXXXXXXXX) |
| Phone (click-to-call) | `[FILL:PHONE]` (may equal WhatsApp number) |
| Email | `[FILL:EMAIL]` — suggest hello@petdoorstep.in |
| Business type for Google | **Service-Area Business (SAB)** — doorstep service, no walk-in storefront; home/office address hidden on GBP |
| Service hours (draft) | Mon–Sun 9:00–19:00 for grooming & vet visits (last booking 17:30) |
| WhatsApp reply time (**confirmed**) | **A real person replies on WhatsApp within 10 minutes, 9:00–19:00**, every day; messages sent after 19:00 are answered from 9:00. Confirmed operational fact (Sunny, 2026-10-03, §11 D3). Calls are **not** staffed for call-backs, so no page promises a call-back time |
| Walk hours (draft) | 6:00–9:30 and 17:30–20:30 daily · Apr–Jun heat rule: walks only before 8:00 or after 19:00 |

### 3.2 Services & launch price menu (DRAFT — Sunny must confirm before launch; benchmarked to Ludhiana ranges in the strategy report)

| Service | Small dog | Medium dog | Large dog | Notes |
|---|---|---|---|---|
| Bath & Brush (bath, blow-dry, brush-out, nail trim, ear clean) | ₹599 | ₹799 | ₹999 | Entry service, monthly repeat |
| Full Groom (Bath & Brush + haircut/styling, paw & sanitary trim) | ₹1,199 | ₹1,499 | ₹1,899 | Hero service |
| Premium Spa Groom (Full Groom + de-shed/de-mat, conditioning masque, perfume) | ₹1,799 | ₹2,199 | ₹2,799 | Upsell |
| Puppy Intro Groom (< 6 months, gentle first-time) | ₹699 flat | | | Lead magnet |
| Cat Grooming — Bath & Brush / Full | ₹899 / ₹1,399 flat | | | Calm-handling trained. B&B: lukewarm bath, gentle dry, brush-out, nail trim, ear & eye clean (~45–60 min). Full: + de-mat, hygiene trim, comfort trim on request (~60–90 min). Cat-safe products only |
| Tick & Flea Treatment | add-on ₹399 · standalone ₹699 | | | Seasonal spike pre-monsoon |
| Nail Trim + Ear Clean visit | ₹299 | | | Quick visit / add-on |
| Dog Walking — 1 walk/day | ₹2,999 / month | | | Fixed walker, ~30-min walk, GPS + photo update |
| Dog Walking — 2 walks/day | ₹4,999 / month | | | ~30 min each, morning + evening |
| Walking Trial Week | ₹699 | | | 7 walks (1/day, ~30 min); converts to monthly |
| Vet Home Visit (consult) | ₹699 + medicines/vaccines at MRP | | | Partner registered vet only |
| Vaccination at Home | ₹199 service fee + vaccine MRP | | | With reminder calendar |
| Deworming Visit | ₹499 incl. standard dewormer | | | |
| **Groom Club** subscription | 1 Full Groom/month at **15% off** + free nail-trim visit + priority slots | | | THE retention product |

Size guide used everywhere: **Small** < 10 kg · **Medium** 10–25 kg · **Large** > 25 kg.

**Travel charge:** none anywhere within Ludhiana city — the listed price is the full price (DRAFT, confirm together with this menu).
**Reschedule / cancel:** free until 2 hours before the confirmed slot — just reply on WhatsApp. No advance payment is ever taken, so there is nothing to refund (DRAFT — `/refund-policy/` mirrors this exactly).
**Not offered in Phase 1** (never imply otherwise in copy): single one-off walks, online/video vet consults, 24×7 or emergency care, boarding, training, supplies.

### 3.3 Service areas (launch set — these become area pages)
Sarabha Nagar · BRS Nagar · Model Town · Civil Lines · Dugri · Pakhowal Road ·
South City · Ferozepur Road · Haibowal Kalan · Kitchlu Nagar
*(Full Ludhiana served; these 10 get dedicated pages. Out-of-area leads are still captured — see `07-BOOKING-SPEC.md`.)*

### 3.4 Trust facts (must appear site-wide; keep claims honest — only publish once true)
- Background-verified, trained groomers (ID + reference checked)
- Fresh sanitised kit for every pet (sealed blades/towels)
- Fixed transparent prices — no doorstep bargaining
- On-time slot or ₹100 off (service promise — confirm before publishing)
- Photo update after every walk/groom
- Registered veterinarians only for all medical services

---

## 4 · File index — what lives where

| File | Owns | Use it when |
|---|---|---|
| `00-MASTER-PLAN.md` | Conventions, facts, waves, tracker, decisions | Always first |
| `01-SITEMAP.md` | Every page: URL, wave, keyword, blueprint link, status | Deciding what to build next |
| `02-SEO-PARAMETERS.md` | The 120+ on-page SEO parameter checklist + per-page audit table | Building or auditing ANY page |
| `03-KEYWORD-MAP.md` | All keyword research + page↔keyword mapping | Writing titles, H1s, content |
| `04-TECHNICAL-SEO.md` | Schema specs, CWV budgets, robots/sitemap/canonicals, OG | Scaffolding + every page build |
| `05-LOCAL-SEO.md` | Google Business Profile, citations, reviews engine, area-page rules | Launch week + monthly routine |
| `06-CONVERSION-PLAYBOOK.md` | CRO rules: hero formula, CTA system, trust blocks, copy voice | Writing any page copy |
| `07-BOOKING-SPEC.md` | Booking widget functional spec, WhatsApp payload, lead storage, events | Building /book/ + all CTAs |
| `08-DESIGN-SYSTEM.md` | Tokens, components, imagery, accessibility | All UI work |
| `09-ANALYTICS-TRACKING.md` | GA4/GSC, conversion events, rank tracking, review ritual | Scaffold + monthly |
| `10-CONTENT-CALENDAR.md` | 26-week blog plan mapped to keywords | Every content week |
| `11-EXPANSION-PLAYBOOK.md` | City-cloning procedure + expansion triggers | When Ludhiana metrics qualify |
| `blueprints/_TEMPLATE-*.md` | Master page anatomies (service / area / blog) | Any page without its own blueprint |
| `blueprints/<page>.md` | Block-by-block spec for that page (legal pages: `privacy-policy.md`, `terms.md`, fed by `website/src/data/legal.ts`) | Building that page |
| `decisions/<stage>.md` | Per build-stage change log: every doc edit a stage made and the decision behind it | Auditing why a doc changed |

---

## 5 · URL architecture (zero-migration geo-silo)

```
/                               home (brand + "pet care services in Ludhiana" head terms)
/ludhiana/                      city hub (Wave 2; links all services + areas)
/ludhiana/dog-grooming/         ┐
/ludhiana/cat-grooming/         │
/ludhiana/dog-walking/          │ MONEY PAGES (city-service)
/ludhiana/vet-at-home/          │
/ludhiana/dog-vaccination/      │
/ludhiana/tick-flea-treatment/  │
/ludhiana/puppy-grooming/       ┘
/ludhiana/areas/<area-slug>/    area pages (sarabha-nagar, brs-nagar, model-town, …)
/pricing/ /book/ /about/ /contact/ /how-it-works/ /reviews/ /faq/
/safety-hygiene/ /join-as-groomer/ /offers/ /thank-you/
/privacy-policy/ /terms/ /refund-policy/
/blog/<post-slug>/
```

**Rules:** lowercase, hyphen-separated slugs; always trailing slash; no dates/stop-words in slugs;
`/thank-you/` is `noindex`; expansion = clone `/jalandhar/…` etc. per `11-EXPANSION-PLAYBOOK.md` —
existing URLs never change. National `/services/<service>/` hub pages are added **only** at
multi-city stage (they then link down to each city version).

---

## 6 · Build waves & progress tracker

> Tick `[x]` + date when done. `[~]` = built, not yet audited. A page is "done" only when it passes the
> `02-SEO-PARAMETERS.md` audit at **all Launch-blocker items** and its blueprint is fully implemented.

> **Status (2026-10-02):** Wave 0 code done — `website/` scaffold, design system, layout chrome, booking widget,
> `/book/`, `/thank-you/`, 404 (built, audit pending). Wave 0 owner tasks (domain, WhatsApp, GA4/GSC, GBP) are Sunny's.
> Next: Wave 1 content pages.

### Wave 0 — Foundations (before any page)
- [ ] Buy domain (petdoorstep.in; also .com if free) → update `[FILL:DOMAIN]` everywhere
- [ ] WhatsApp Business account on `[FILL:WHATSAPP_NUMBER]` (catalogue + quick replies)
- [x] Scaffold Astro project in `website/` per `04-TECHNICAL-SEO.md` + `08-DESIGN-SYSTEM.md` — 2026-10-02
- [ ] GA4 property + Google Search Console + events per `09-ANALYTICS-TRACKING.md`
- [ ] Google Business Profile (SAB) per `05-LOCAL-SEO.md`
- [x] Booking widget built per `07-BOOKING-SPEC.md` (works standalone before pages) — 2026-10-02 (55/55 browser checks pass; storage + WhatsApp go live once the `[FILL]` values arrive)

### Wave 1 — Launch set (site goes live when ALL ticked)
- [ ] `/` home · [ ] `/ludhiana/dog-grooming/` · [ ] `/ludhiana/cat-grooming/`
- [ ] `/ludhiana/dog-walking/` · [ ] `/ludhiana/vet-at-home/`
- [ ] `/pricing/` · [~] `/book/` (built, audit pending) · [ ] `/about/` · [ ] `/contact/`
- [ ] `/how-it-works/` · [ ] `/faq/` · [~] `/thank-you/` (built, audit pending)
- [ ] `/privacy-policy/` · [ ] `/terms/`

### Wave 2 — Depth (weeks 2–6 after launch)
- [ ] `/ludhiana/` hub · [ ] `/ludhiana/dog-vaccination/` · [ ] `/ludhiana/tick-flea-treatment/`
- [ ] `/ludhiana/puppy-grooming/` · [ ] `/reviews/` · [ ] `/safety-hygiene/`
- [ ] `/join-as-groomer/` · [ ] `/offers/` · [ ] `/refund-policy/`
- [ ] 10 × `/ludhiana/areas/<area>/` (one per §3.3 locality)
- [ ] First 2 blog posts from `10-CONTENT-CALENDAR.md`

### Wave 3 — Compounding (ongoing)
- [ ] 1 blog post/week per `10-CONTENT-CALENDAR.md`
- [ ] Monthly SEO + local routine per `05` + `09`
- [ ] Expansion assessment per `11-EXPANSION-PLAYBOOK.md`

---

## 7 · Copy voice (summary — full rules in `06-CONVERSION-PLAYBOOK.md`)

Warm, confident, specific. Simple English a Ludhiana pet parent reads effortlessly; sprinkle
natural Hinglish in FAQs/testimonials where it adds warmth. Always concrete (₹ prices, 60-minute
slots, locality names, breed names). Never: corporate jargon, fake urgency, unverifiable claims.
Pets are "family members", never "animals" in customer-facing copy.

## 8 · Placeholder policy

Unknown real-world values use bracketed tokens — grep-able, impossible to ship accidentally:
| Group | Tokens (owner fills) |
|---|---|
| Identity & contact | `DOMAIN` `WHATSAPP_NUMBER` `PHONE` `EMAIL` `INSTAGRAM` `BASE_ADDRESS` (registration only — never displayed) |
| Google & tracking | `GBP_LINK` `GBP_REVIEW_LINK` `GOOGLE_RATING` `REVIEW_COUNT` `OPENING_DATE` `GA4_ID` `SHEETS_WEBHOOK` `WEB3FORMS_KEY` |
| People | `FOUNDER_NAME` (founder's name as shown on `/about/`, `02` P047) `FOUNDER_PHOTO` `FOUNDER_STORY_DETAILS` `AUTHOR_NAME` `GROOMER_n_NAME` `WALKER_n_NAME` `VET_PARTNER_NAME` `VET_REG_NO` `VET_PARTNER_TERMS` `PAY_RANGES` |
| Trust & safety ops | `DISINFECTANT_PRODUCT` `POLICE_VERIFICATION_STATUS` `INSURANCE_STATUS` `EMERGENCY_VET_LIST` (verify by phone) |
| Legal (live in `website/src/data/legal.ts`; Sunny + lawyer fill, §9 item 7) | `LEGAL_NAME` (registered business name: legal pages and `/about/`, `02` P047) `GRIEVANCE_OFFICER_NAME` `GRIEVANCE_EMAIL` `GRIEVANCE_PHONE` `JURISDICTION` `RETENTION_LEADS` `RETENTION_CHATS` `RETENTION_PHOTOS` `MIN_AGE` `NO_SHOW_RULE` `LATE_CANCEL_RULE` `LIABILITY_TERMS` `POLICY_EFFECTIVE_DATE` `DPB_COMPLAINT_LINK` (the Data Protection Board of India's official complaint route) |
| Local proof | `REVIEW_n` `REVIEW_{SLUG}_n` `LANDMARKS_{SLUG}` `PINCODES_{SLUG}` |
| Offers | `SEASONAL_OFFER` (only while a real dated offer is live) |
| Examples inside `02` | `REVIEW_5` `CASE_NOTE_1` `VISIT_COUNT` — illustrative, never built |
| Expansion only (`11`) | `OPS_LEAD_NAME` + `*_JAL` tokens — not part of the Ludhiana build |

All tokens are written `[FILL:NAME]`. A legal unknown is always a token in this table, never "DRAFT" prose on a page (§11 E12).
**Launch gate:** `grep -r "FILL:" website/` must return zero results before go-live.
No other vagueness is allowed in these files — every spec must be concrete enough to build from.

## 9 · Pre-launch checklist (gate before the site goes public)

0. Name clearance: web search on 2026-10-02 found **no existing "PetDoorStep" brand** in Indian pet services (doorstep players exist under other names: Flying Fur, Woofly, The Pet K9) — still do: domain purchase, Instagram-handle grab, and an IndiaFilings/ipindia trademark search before spending on branding
1. All Wave-0 + Wave-1 boxes ticked; `grep FILL:` clean
2. Every Wave-1 page passes all `[Launch-blocker]` items in `02-SEO-PARAMETERS.md`
3. Booking tested end-to-end on a real phone: form → WhatsApp message arrives → lead row stored → thank-you fires events
4. GBP verified & live; website + booking link attached
5. Prices in §3.2 confirmed by Sunny and identical across /pricing/, service pages, widget
6. 5+ genuine seed reviews collected (pilot customers) for GBP + site
7. Legal pages (`/privacy-policy/`, `/terms/`; `/refund-policy/` once built) reviewed and signed off **by a lawyer** before launch (§11 D4, 2026-10-03); every Legal-group token in §8 filled in `website/src/data/legal.ts`; refund/cancellation policy matches what we'll honour
8. Lighthouse mobile ≥ 90 on home + one service page; sitemap submitted in GSC

## 10 · Expansion in one paragraph (details: `11-EXPANSION-PLAYBOOK.md`)

When Ludhiana hits the trigger metrics (see file 11), clone the city silo:
`/jalandhar/dog-grooming/` etc. from `_TEMPLATE-service-page.md` with **genuinely local**
content (areas, testimonials, team, prices), a second GBP for that service area, and city-specific
citations. Home evolves to multi-city brand page; `/services/` national hubs appear then. Never
templated-text-only city pages (doorway risk) — file 11 defines the minimum unique elements.

## 11 · Decision log

| Date | Decision | By |
|---|---|---|
| 2026-09-30 | Strategy report approved: web-first launch, Ludhiana | Sunny |
| 2026-10-02 | D1–D8 locked (Astro, WhatsApp booking, EN+Hinglish, brand **PetDoorStep**) | Sunny |
| 2026-10-02 | Planning system (this folder) created | Session |
| 2026-10-02 | All 18 page blueprints + 3 templates complete; consistency pass run (see below) | Session |
| 2026-10-02 | **H1 rule:** a page's H1 must contain its primary keyword verbatim; where `03` §3 and `06` §2.3 disagreed, the passing variant was chosen and both files aligned to the page blueprint (blueprint wins on conflict) | Session |
| 2026-10-02 | Page-specific sections (breed tables, season tables, schedules) live as H3 sub-sections inside the nearest template block — never as new blocks | Session |
| 2026-10-02 | Area titles now include "Ludhiana" (`02` P013 launch-blocker); `02` P016 updated to allow the planned `{keyword} – {hook} \| PetDoorStep` pattern | Session |
| 2026-10-02 | One FAQ source (`src/data/faq.json`) renders every page's FAQs and FAQPage markup | Session |
| 2026-10-02 | Wave 0 build: spec conflicts resolved — sticky bar <768px, order Call · WhatsApp · Book Now (`06`/`08` win over `07`); `09` event names win over `08` `cta_*`; nav items render only when live (Reviews hidden until `/reviews/`); area breadcrumb has no "Areas" level; walks get their own time windows and start tomorrow; FIRSTGROOM line added to the WhatsApp message; phone cap 14→16 chars | Session |
| 2026-10-02 | DRAFT facts added to §3 for Sunny to confirm: walk duration/hours + heat rule, trial-week definition, cat package inclusions, no travel charge in Ludhiana, reschedule/cancel rule, "not offered in Phase 1" list | Session |
| 2026-10-03 | **D1 · Exit nudge → exit card.** On desktop it is a small **non-modal corner card**: keeps `07` §2 row 7's trigger conditions and copy; takes ≤ 15% of the viewport (`02` P107, launch-blocker); no backdrop; closes on Esc and "No thanks" (overlay click dropped: there is no overlay). Cat, walking and vet pages show a neutral copy variant, worded in the Wave-1 chrome build. Applied in `07` §2 row 7 + §8 + §9, `08` §3.3, §3.6, §4.17a | Sunny |
| 2026-10-03 | **D2 · Dog-walking hero primary CTA** → the booking form `/book/?service=dog-walking&src=hero_dog-walking` (Trial Week preselected), not wa.me. Applied in `dog-walking.md` SP-1, `06` §2.3, `07` §2 row 3 | Sunny |
| 2026-10-03 | **D3 · Reply time confirmed.** "A real person replies on WhatsApp within 10 minutes, 9:00–19:00" is a confirmed operational fact (§3.1). The `/contact/` "we call back within 30 minutes" promise is removed: calls are not staffed. Applied in §3.1, `contact.md`, `06` §3.1 | Sunny |
| 2026-10-03 | **D4 · Data use + YES rule.** Booking data is used only to handle that booking (legitimate use, DPDP Act s.7(a)). Reminders, review requests, rebooking nudges and offers (`06` §9 W4/W5, broadcasts) go **only** to customers who replied YES on WhatsApp (opt-in ask `06` §9 W6; YES date kept in the leads-sheet `opt_in` column, `09` §5). The booking form's consent line links to `/privacy-policy/`. Legal pages need a lawyer's review before launch (§9 item 7). Applied in `07` §3 Step 5, `09` §4, §5, §9, `06` §7.3, §9, `05` §3, `dog-vaccination.md`, `legal.ts`, the two legal blueprints | Sunny |
| 2026-10-03 | **E1 · Hero primary target.** Dog-grooming, cat-grooming and vet-at-home hero primaries → `/book/?src=hero_<slug>` (`07` §2 row 3). The label stays the blueprint's (e.g. "Book on WhatsApp") and renders amber, because WhatsApp green is for wa.me links only (`08` §1.4 rule 2) | Session |
| 2026-10-03 | **E2 · Mid-page CTA price.** In `Book <Service> — from ₹<price>`, the ₹ figure is the preselected service's (or plan's) price; with nothing preselected it is the page's lowest price (`07` §2 row 4, template SP-4) | Session |
| 2026-10-03 | **E3 · Fold law (P150).** At 360×640: H1, subhead, primary CTA and ≥ 1 trust chip fully visible above the sticky bar, and the top ≥ 160 px of the hero photo visible above it. Below `md` every secondary hero CTA and the eyebrow are hidden (CSS only, still in the DOM: `02` P110 parity holds), the subhead uses body size, the breadcrumb uses `py-2`. A page that still fails becomes an explicit P150 exception for Sunny to decide (`08` §4.6, template SP-1) | Session |
| 2026-10-03 | **E4 · CTA rhythm.** An extra CTA row follows SP-2 (the "after reviews" beat of `02` P153); SP-12 `CtaBand` stays the page-end CTA (template SP-2/SP-12, `07` §2 row 4) | Session |
| 2026-10-03 | **E5 · Photo alts follow the `08` §5.2 shot list** (walking: Beagle · vet: Pomeranian · cat: on a towel); blueprint alt lines updated. New shots 13 `puppy-first-groom-at-home-ludhiana.jpg` (Puppy Grooming card) and 14 `dog-tick-check-at-home-ludhiana.jpg` (Tick & Flea card) | Session |
| 2026-10-03 | **E6 · OfferCatalog names = the visible `/pricing/` labels** (`pricing.md` §5 wins over `04` §2.5; `04` §2.5 rewritten) | Session |
| 2026-10-03 | **E7 · Sitemap = live routes only, with real `lastmod`** (never the build date). Noindex pages (`/thank-you/`, 404) emit `noindex, follow` (`04` §1.2, §1.6, §3.3, §7.1; `book.md`) | Session |
| 2026-10-03 | **E8** · Keep the `04` §2.2 vet and cat `Service` offers. The same Q&A marked up on its source page and on `/faq/` is accepted (`04` §2.0.5). `02` P098 map facade deferred at launch (Important: owner + fix date in the audit, `02` §1.2) | Session |
| 2026-10-03 | **E9 · NAP is owned by `05` §4**; `02` P088's example now renders that block (no pincode) | Session |
| 2026-10-03 | **E10 · GA4 `area` / `area_text`**: digits stripped, max 30 characters, so no personal data reaches GA4 (`09` §2a note, `07` §7 note, `legal.ts` `GA4_SETTINGS`) | Session |
| 2026-10-03 | **E11 · `/contact/` head:** title and H1 carry its primary keyword "pet grooming contact number ludhiana" (natural form "Pet Grooming Contact Number in Ludhiana"); H1 20–70 chars (`contact.md` §1) | Session |
| 2026-10-03 | **E12 · Legal unknowns are `[FILL:*]` tokens** registered in §8 (Legal group), never "DRAFT" prose | Session |
| 2026-10-03 | **Canonical `source` values** (`09` §2d). Fixed: `sticky_bar` `header` `pricing_row` `book_page` `exit_nudge` `float_desktop` `confirm_button` `review_screen` `footer` `noscript_block` `not_found` `groomclub`. Patterns: `hero_<slug>` `service_<id>` `ctaband_<slug>` `<slug>_page`. Inline scripts allowed (`08` §8, `04` §5.3 exceptions): the analytics bootstrap, the exit card and the thank-you script, each tagged `data-pds` | Session |
| 2026-10-03 | Legal blueprints B19 `privacy-policy.md` + B20 `terms.md` added (now 20 page blueprints + 3 templates), fed by the new `website/src/data/legal.ts`. Consistency pass: `cta_*` event names → `09` names (`06` §3.3, template SP-13); area breadcrumb "Areas" alternative removed (`04` §2.4); stale `08` reconciliation note 1 closed; `06` §8 aligned to the built 5-step widget; blog/area/offers `src` values aligned to §2d. Full list: `decisions/f2-docs.md` | Session |

*2026-10-03 rows: D1–D4 are that day's owner decisions and E1–E12 its engineering decisions. They are not the §2 D-numbers. Other files cite them as "`00` §11 D1 (2026-10-03)" or just "D1"/"E7" next to that date.*

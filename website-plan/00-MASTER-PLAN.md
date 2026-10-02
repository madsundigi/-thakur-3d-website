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
| Service hours (draft) | Mon–Sun 9:00–19:00 (last booking 17:30) |

### 3.2 Services & launch price menu (DRAFT — Sunny must confirm before launch; benchmarked to Ludhiana ranges in the strategy report)

| Service | Small dog | Medium dog | Large dog | Notes |
|---|---|---|---|---|
| Bath & Brush (bath, blow-dry, brush-out, nail trim, ear clean) | ₹599 | ₹799 | ₹999 | Entry service, monthly repeat |
| Full Groom (Bath & Brush + haircut/styling, paw & sanitary trim) | ₹1,199 | ₹1,499 | ₹1,899 | Hero service |
| Premium Spa Groom (Full Groom + de-shed/de-mat, conditioning masque, perfume) | ₹1,799 | ₹2,199 | ₹2,799 | Upsell |
| Puppy Intro Groom (< 6 months, gentle first-time) | ₹699 flat | | | Lead magnet |
| Cat Grooming — Bath & Brush / Full | ₹899 / ₹1,399 flat | | | Calm-handling trained |
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
| `blueprints/<page>.md` | Block-by-block spec for that page | Building that page |

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

> Tick `[x]` + date when done. A page is "done" only when it passes the
> `02-SEO-PARAMETERS.md` audit at **all Launch-blocker items** and its blueprint is fully implemented.

### Wave 0 — Foundations (before any page)
- [ ] Buy domain (petdoorstep.in; also .com if free) → update `[FILL:DOMAIN]` everywhere
- [ ] WhatsApp Business account on `[FILL:WHATSAPP_NUMBER]` (catalogue + quick replies)
- [ ] Scaffold Astro project in `website/` per `04-TECHNICAL-SEO.md` + `08-DESIGN-SYSTEM.md`
- [ ] GA4 property + Google Search Console + events per `09-ANALYTICS-TRACKING.md`
- [ ] Google Business Profile (SAB) per `05-LOCAL-SEO.md`
- [ ] Booking widget built per `07-BOOKING-SPEC.md` (works standalone before pages)

### Wave 1 — Launch set (site goes live when ALL ticked)
- [ ] `/` home · [ ] `/ludhiana/dog-grooming/` · [ ] `/ludhiana/cat-grooming/`
- [ ] `/ludhiana/dog-walking/` · [ ] `/ludhiana/vet-at-home/`
- [ ] `/pricing/` · [ ] `/book/` · [ ] `/about/` · [ ] `/contact/`
- [ ] `/how-it-works/` · [ ] `/faq/` · [ ] `/thank-you/`
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
`[FILL:DOMAIN]` `[FILL:WHATSAPP_NUMBER]` `[FILL:PHONE]` `[FILL:EMAIL]` `[FILL:INSTAGRAM]`
`[FILL:GBP_LINK]` `[FILL:FOUNDER_PHOTO]` `[FILL:VET_PARTNER_NAME]` `[FILL:REVIEW_*]`
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
7. Legal pages reviewed; refund/cancellation policy matches what we'll honour
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

# 11 · EXPANSION PLAYBOOK — Ludhiana → Punjab → India, with zero URL migration

> **This file owns** the expansion decision gates, the city order, the step-by-step city-clone procedure, multi-city site evolution, the `/hi/` Hindi plan and cross-city brand governance — and it obeys `00-MASTER-PLAN.md` (facts from §3 only, URLs per §5 only, placeholders per §8). Nothing below is built until §1 is green and Sunny logs the go in `00-MASTER-PLAN.md` §11.

Related files: trigger metrics come from `09-ANALYTICS-TRACKING.md` (KPI report §8) + the leads sheet (`07-BOOKING-SPEC.md` §5) · city keyword method: `03-KEYWORD-MAP.md` §8–9 · anti-doorway rules the clone must obey: `05-LOCAL-SEO.md` §6 · hreflang mechanics: `04-TECHNICAL-SEO.md` §6.3 · page anatomies: `blueprints/_TEMPLATE-service-page.md`, `blueprints/_TEMPLATE-area-page.md` · launch-blocker audit: `02-SEO-PARAMETERS.md`.

---

## 1 · Expansion triggers — ALL five green, or nobody moves

The strategy report's **golden rule** (`../pet-care-ludhiana-strategy/`): *one city must run itself — profitably, excellently, without the founder — before the next city opens.* Expansion multiplies whatever exists, including problems. These five triggers are measured monthly once live; **every one must hold simultaneously** before any Step in §3 begins.

| # | Trigger | Threshold | Measured where | Exact definition |
|---|---|---|---|---|
| T1 | Volume | **≥600 completed bookings/month in Ludhiana, 2 consecutive months** | Leads sheet rows with status `done` (`09-ANALYTICS-TRACKING.md` §5), counted in the monthly KPI report ("Jobs completed" row, 09 §8.1) | A booking = one completed, paid job. A dog-walking subscription counts as **1 booking per month** while active (not per walk). Waitlist leads never count. |
| T2 | Reputation | **GBP ≥4.7★ AND ≥100 reviews** | Ludhiana GBP dashboard → Reviews (engine: `05-LOCAL-SEO.md` §3) | Both numbers true on the day of the go-decision, not a historical peak. |
| T3 | Economics | **Positive monthly contribution in both T1 months** | City P&L sheet kept by the ops lead; attached to that month's KPI entry | Contribution = cash collected from completed Ludhiana jobs − direct delivery costs (groomer/walker payouts, travel/fuel, consumables, kit replacement, Ludhiana marketing spend, comms tools). Excludes founder salary and one-time setup — it's contribution, not net profit, and we say so. |
| T4 | People | **A named ops lead has owned Ludhiana day-to-day for ≥4 consecutive weeks** | Founder's own log | `[FILL:OPS_LEAD_NAME]` handles scheduling, complaints, groomer management and 4–5★ review replies (05 §3.4) with founder involvement ≤2 hours/day. Litmus test: the founder can spend a full week in Jalandhar without Ludhiana wobbling. If not, T4 is red. |
| T5 | Retention | **Repeat-customer rate ≥40% in both T1 months** | Leads sheet, phone-number match | Repeat rate (month M) = completed bookings in M from phone numbers with ≥1 completed booking in any earlier month ÷ all completed bookings in M × 100. The Groom Club (00 §3.2) is the engine that gets this number there. |

**Scale reality check** (arithmetic on locked facts, not a forecast): 600 jobs/month ≈ 20 jobs/day, 7 days a week (00 §3.1 hours) ≈ a 6–8 person field team. The `09-ANALYTICS-TRACKING.md` §8.2 L+6 target is 150 bookings/month — so T1 is a **month-12+ event at the earliest**. Expansion is not a Year-1 plan; budget accordingly.

**Checking ritual:** from month L+6, the monthly KPI report (09 §8.1) gains one extra line — `Expansion gate: T1 🔴/🟢 · T2 · T3 · T4 · T5` — added to the 09 template in the same commit as this file's first gate check (Decision-Log entry).

**Go-decision protocol:** all five green → Sunny + ops lead meet once, pick the city per §2, confirm ~3 months of the new city's operating losses are funded (Step 2 budget), and log the go in `00-MASTER-PLAN.md` §11. Triggers are **necessary, not sufficient** — green lights permit the meeting; only the logged decision starts the clone.

**De-trigger rule:** if any trigger falls below threshold for 2 consecutive months while a clone is mid-build → freeze new spend in the new city (no new hires, citations, or page publishing; already-live pages stay up), fix Ludhiana, resume when all five are green again.

---

## 2 · City order — the Punjab ladder, then India

Order and reasoning from `03-KEYWORD-MAP.md` §8 / `research/keywords.md` §8: competitor density is our demand proxy (aggregators only enter cities with searches), weighed against household income and distance from the Ludhiana base. **All competitor prices below were mined from SERP snippets 2026-10; re-verify before publishing** any comparison.

| Priority | City silo | ~Distance / drive from Ludhiana | Competitive field observed | Why this position | Candidate localities (the §3 Step-3 sprint confirms or kills each) |
|---|---|---|---|---|---|
| 1 | `/chandigarh/` (Mohali + Panchkula as **areas**, per 03 §8) | ~100 km / ~2 h | Most crowded in Punjab: Sploot ₹599–2,499, Pet Vanity, Monika Pet Clinic ₹1,000–1,700, Petlogix, thePetNest, MrnMrsPet | Densest competitor field = largest proven demand; the region's highest-income households; the biggest prize, so it gets the machine first | Sector 8–11 · Sector 21 · Sector 33–36 · Mohali Phase 3B2–Phase 11 · Sunny Enclave · Panchkula Sector 8–15 |
| 2 | `/jalandhar/` | ~60 km / ~1¼ h (NH44) | Light: MrnMrsPet + Pets Army ₹700–1,000 | Closest big city — cheapest to support from Ludhiana ops; near-open organic field | Model Town · Urban Estate Ph 1–2 · New Jawahar Nagar · Green Model Town · GTB Nagar · Adarsh Nagar · Civil Lines · Jalandhar Cantt |
| 3 | `/amritsar/` | ~140 km | MrnMrsPet only — near-open | Big city, strong NRI-family spend; but farthest, so it needs a fully independent city team (no day-trip support) | Ranjit Avenue · Green Avenue · White Avenue · Basant Avenue · Mall Road · Majitha Road |
| 4 | `/patiala/` | ~90 km | thePetNest only — near-open | Smaller market; take it after the clone machine has run 3 times | Urban Estate · Model Town · Leela Bhawan · Bhupindra Road · Rajpura Road |
| — | Moga / Fazilka / Khanna tier | — | salonist.io programmatic stubs only | Wide open but thin demand — serve via the "Outside Ludhiana" waitlist (07 §3) until route density exists (03 §8) | — |
| — | Outside Punjab (Delhi NCR, metros) | — | Vetic-class funded players, `/{city}/lp/{service}` LPs, "visit in 60 mins" framing | A different game. Requires `/hi/` (§5), national hubs (§4), and a fresh strategy review in `../pet-care-ludhiana-strategy/` — deliberately NOT specced further here | — |

**Order-swap rule** (the only allowed exception; decided at go-time, logged in 00 §11): **Jalandhar jumps ahead of Chandigarh** if either (a) trailing-6-month waitlist leads (`lead_type=waitlist`, 07 §3 / KPI row "out_of_area_lead + top cities") from Jalandhar ≥ 2× Chandigarh+Mohali combined, or (b) a Jalandhar city lead is signed and no credible Chandigarh lead is signed within 60 days of the triggers going green. Nothing else re-orders the ladder.

**Minimum to enter any city** (before a single page is built): city lead signed (`[FILL:CITY_LEAD_JAL]` etc.) · ≥2 trained groomers hired for that city · a real operating base address there (GBP verification requires it) · ~3 months of city operating losses funded.

---

## 3 · The clone procedure — 14 steps, worked for Jalandhar

The same steps run for any city; only ops data changes — **never the sentences** (see the anti-boilerplate law in Step 10). Target timeline: **10–12 weeks** from logged go-decision to city launch day.

### Phase A — Decide & research (weeks 1–2)

**Step 1 — Log the go.** Decision-Log entry in `00-MASTER-PLAN.md` §11, verbatim pattern:
`| {date} | EXPANSION GO: Jalandhar. T1–T5 green ({numbers}). City lead: [FILL:CITY_LEAD_JAL]. Budget ₹{amount} approved. | Sunny |`

**Step 2 — City budget sheet** (one page, lives in `../pet-care-ludhiana-strategy/`): hiring (2 groomers + city lead), kit + scooter/travel, citations & outreach, launch-offer cost (§6 patterns only), 3-month loss buffer. Money is a strategy-folder fact; this plan only requires that the sheet exists and is funded.

**Step 3 — Mini keyword sprint** (half-day to one day; re-run the `03-KEYWORD-MAP.md` §9 method for the city):
1. ~20 live SERP checks: `{service}` × `{at home | price | near me}` × `jalandhar` for all 7 services, plus the head term "pet grooming jalandhar".
2. Competitor slug/price mining via domain-restricted searches (mrnmrspet.com, thepetnest.com, petgroomly.com, Pets Army) — every mined price carries the standing caveat *"mined from SERP snippets {date}; re-verify before publishing"*.
3. JustDial Jalandhar category mine: grooming / at-home / walking / tick-flea / vet categories, locality categories, listing counts (the demand taxonomy, as `research/keywords.md` §6 did for Ludhiana).
4. Locality evidence scan for every §2 candidate area (GBP map results, JustDial locality categories) → confirm or kill each; lock the final 6–10 area list.

**Output (one commit):** `website-plan/research/keywords-jalandhar.md` (same table format as `research/keywords.md` §2) **plus** a new "Jalandhar keyword map" section in `03-KEYWORD-MAP.md` mapping every keyword onto the **locked** `/jalandhar/…` URLs. Competitor slugs (`/dog-grooming-in-jalandhar` etc.) are evidence of demand, **never adopted** — 00 §5 slugs only.

**Step 4 — City fact-pack** (one afternoon with the city lead; it feeds every unique element in Step 10): final area list + a city adjacency map (same format as `05-LOCAL-SEO.md` §6 #7) · landmark-based directions per area · parks the walkers will actually use (e.g. Nikku Park — city lead confirms the real list, as Rakh Bagh/Leisure Valley were confirmed for Ludhiana) · serviceable pin codes · breeds the team actually sees (expect Labrador, German Shepherd, Golden Retriever, Shih Tzu, Pomeranian, Beagle, Indie — but write what the team reports, not this guess) · society gate-pass and parking norms per area · partner-vet shortlist `[FILL:VET_PARTNER_JAL]`.

### Phase B — Ops pilot before pages (weeks 3–8)

**Step 5 — Hire & train.** City lead + ≥2 groomers trained on the Ludhiana playbook: trust facts 00 §3.4 are non-negotiable from job one; the 05 §3 review ask-flow fires after the very first job; 2 photos per visit (05 §2.3 rules).

**Step 6 — City GBP** (the week the base goes live — reviews need a venue before pages do). Re-run `05-LOCAL-SEO.md` §1 verbatim with city values:
- Name **exactly `PetDoorStep`** — never "PetDoorStep Jalandhar" (name-guideline suspension trap, 05 §1).
- Primary category `Pet groomer` + secondaries per 05 §1.5; SAB with hidden address `[FILL:JAL_BASE_ADDRESS]`; service areas = the locked Jalandhar area list.
- A dedicated city mobile number `[FILL:JAL_PHONE]` as that city's NAP join key; the central WhatsApp `[FILL:WHATSAPP_NUMBER]` stays the booking channel on the website.
- Video verification at the real city base; booking link `/book/`; Q&A seeded (05 §2.5 set with city names swapped **in the ops answers only** — Q&A is operational data, not ranking copy).
- The NAP master doc (05 §4) gains a per-city canonical block. **Ludhiana's profile never lists Jalandhar service areas** (05 §1.6 trap) — coverage belongs to the city profile.
- GBP description, ready to paste (update area names after Steps 3–4): *"PetDoorStep brings professional pet grooming, dog walking and vet care to your doorstep across Jalandhar — Model Town, Urban Estate, New Jawahar Nagar, GTB Nagar, Green Model Town and nearby areas. Background-verified groomers, a fresh sanitised kit for every pet, fixed transparent prices and on-time slots. Services: dog & cat grooming and bathing at home, puppy grooming, tick & flea treatment, dog walking, and vet-at-home visits for vaccination, deworming and check-ups. Book on WhatsApp in under a minute."*

**Step 7 — Pilot bookings** (soft launch, zero site pages yet). First customers from:
(a) **the waitlist** — every stored `lead_type=waitlist` lead with area/city = Jalandhar (07 §3 Step 1) gets Template J1 below; they opted into exactly this message;
(b) society wellness camps + WhatsApp-group etiquette per 05 §7 (give first, promote rarely);
(c) the new GBP as it starts surfacing.

**Template J1 — waitlist launch WhatsApp (verbatim, merge fields as 05 §3.2):**
> Hi {first_name}! 🐾 You asked PetDoorStep to message you when we reach {city} — good news, we're here! Doorstep dog & cat grooming, dog walking and vet-at-home visits now serve {city}, starting in {area_1}, {area_2} and nearby areas. As an early supporter you get priority slots this month. Book here: {booking_link} — or just reply to this message. *(Reply STOP to stop messages.)*

**Pilot exit bar (gates Phase C publishing):** ≥30 completed Jalandhar jobs · ≥10 genuine reviews on the Jalandhar GBP · ≥2 reviews naming each launch area (`[FILL:REVIEW_JAL_1]`, `[FILL:REVIEW_JAL_2]`… until collected). This is the proof `05-LOCAL-SEO.md` §6 #3 demands — **no proof, no page.**

**Step 8 — City pricing check → price annex.** Benchmark city competitor prices from Step 3 (re-verify live). Default proposal: the Ludhiana menu (00 §3.2) unchanged; any deviation needs one written line of reasoning per row. Sunny approves → **`00-MASTER-PLAN.md` §3.2 gains a "Jalandhar price annex" table FIRST** (00 §3 rule: change the fact there, then propagate) → then create `src/data/pricing/jalandhar.json` with the identical schema of `07-BOOKING-SPEC.md` §4. In the same commit, `src/data/pricing.json` becomes `src/data/pricing/ludhiana.json` and 07 §4 + its ₹-grep gate are amended (Decision-Log entry).

### Phase C — Build the city silo (weeks 7–10, overlapping the pilot)

**Step 9 — Amend `01-SITEMAP.md` first.** Add the full `/jalandhar/` inventory — hub, 7 service URLs, 6–10 area URLs — each with wave, primary keyword (from Step 3), blueprint and status columns. 01 stays the single locked URL registry: **no page exists before its 01 row.** The URL set (pattern already reserved by 00 §5):
`/jalandhar/` · `/jalandhar/dog-grooming/` · `/jalandhar/cat-grooming/` · `/jalandhar/dog-walking/` · `/jalandhar/vet-at-home/` · *(city Wave 2)* `/jalandhar/dog-vaccination/` · `/jalandhar/tick-flea-treatment/` · `/jalandhar/puppy-grooming/` · `/jalandhar/areas/<area-slug>/` ×6–10.

**Step 10 — Build from templates with the minimum unique elements.** City hub from `_TEMPLATE-service-page.md` §City-hub variant; service pages from `_TEMPLATE-service-page.md` informed by their Ludhiana blueprints' structure; area pages from `_TEMPLATE-area-page.md` under the full `05-LOCAL-SEO.md` §6 checklist.

**The anti-boilerplate law:** every aggregator we out-rank (thePetNest, MrnMrsPet, Petgroomly — `research/keywords.md` §1) runs one template in every city with only the city token swapped; that emptiness is *exactly why* a genuinely local page beats them, and token-swapping our own pages would throw the advantage away and paint the doorway-page target on us (Sept-2025 spam update, 05 §6). **Clone the skeleton, never the sentences.**

Minimum unique elements per city page — ship only when every ✔ cell is honestly filled, else the page waits:

| # | Element | City hub | City service page | City area page | Source |
|---|---|---|---|---|---|
| 1 | **Local team by name** — the city's own groomer profile cards (`[FILL:GROOMER_JAL_1_NAME]`…); never Ludhiana staff on Jalandhar pages | ✔ | ✔ (condensed card) | — | `06-CONVERSION-PLAYBOOK.md` §4.2 |
| 2 | **Local testimonials** — ≥2 verbatim Google reviews from that city (area pages: from that area), first name + locality | ✔ | ✔ | ✔ (gating resource) | 05 §6 #3 |
| 3 | **Local landmarks & logistics** — directions landmarks, walkers' real parks, gate-pass norms, pin codes, true arrival-window promise | ✔ | ✔ | ✔ | Step 4 fact-pack; 05 §6 #2/#5 |
| 4 | **City pricing check** — every ₹ renders from `pricing/jalandhar.json`; Ludhiana numbers never pasted in | ✔ | ✔ | ✔ | Step 8; 07 §4 |
| 5 | **≥60–70% unique body copy**, 600–900+ words, majority locality-specific (housing mix, breeds actually seen) | ✔ | ✔ | ✔ | 05 §6 #1 |
| 6 | **3–5 city/locality-specific FAQs** with natural Hinglish seasoning | ✔ | ✔ | ✔ | 05 §6 #4; 03 §5 |
| 7 | **Unique title/H1/meta beyond the city swap** — a different true value prop per page, from Step-3 evidence | ✔ | ✔ | ✔ | 05 §6 #6; 03 §3 formulas |
| 8 | **Conversion path** — widget step-1 embed + wa.me prefill carrying city+area | ✔ | ✔ | ✔ | 07 §3; 05 §6 #8 |
| 9 | **Internal links** — city hub ↔ city services ↔ city areas per the Step-4 adjacency map; no cross-city link stuffing (cities connect via §4 national hubs only) | ✔ | ✔ | ✔ | 01 §2 rules; 05 §6 #7 |

**Step 11 — Audit & schema.** Every city page passes all `[Launch-blocker]` items in `02-SEO-PARAMETERS.md`. Schema per `04-TECHNICAL-SEO.md` §2 with city variables only: BreadcrumbList `Home › Jalandhar › {Service}`; `Service.areaServed` = Jalandhar localities; the city hub carries the Jalandhar `LocalBusiness` block with `sameAs` → `[FILL:GBP_LINK_JAL]` and the city phone.

**Publishing sequence:** hub + 4 launch service pages (dog-grooming, cat-grooming, dog-walking, vet-at-home — mirrors 00 §6 Wave 1) + the 3–4 area pages that already hold proof go live together on launch day; remaining area pages at 1 per 2–4 weeks as proof lands (05 §6 #10 — staggering applies to area pages); the 3 city-Wave-2 service pages (vaccination, tick-flea, puppy) within 6 weeks.

### Phase D — Launch (weeks 10–12)

**Step 12 — City launch checklist** (mirror of `00-MASTER-PLAN.md` §9; every box ticks before the city set goes public):

0. Brand clearance, city edition: one web + JustDial search confirms no same-name operator in the city (trademark work from 00 §9.0 already covers the brand nationally); result logged.
1. City Wave-0 done: base live · `[FILL:CITY_LEAD_JAL]` + 2 groomers trained · city GBP verified · WhatsApp Business quick replies updated with the city menu · `pricing/jalandhar.json` live and mirroring the 00 §3.2 annex.
2. `grep -rn "FILL:" website/src` returns zero hits for the city's content and data files; every launch page passes all `[Launch-blocker]` items in `02-SEO-PARAMETERS.md`.
3. Booking tested end-to-end on a real phone with a Jalandhar address: city + area selected → WhatsApp message arrives reading `Area: {area}, Jalandhar` → lead row stores the city → `/thank-you/` fires events (07 §5–7).
4. City GBP complete: booking link attached, Q&A seeded, 10+ real pilot-job photos uploaded.
5. City prices confirmed by Sunny and identical across the `/pricing/` city view, city service pages and widget (the 07 §4 ₹-grep gate).
6. ≥10 genuine reviews on the city GBP from pilot customers, ≥2 naming launch areas (Step 7 exit bar met).
7. Legal pages re-read for city fit (national policies — no change expected); refund/reschedule promises match what the city team will actually honour.
8. Lighthouse mobile ≥90 on the city hub + one city service page; GSC Request Indexing for every city launch URL (04 §7.2); Template J1 sent to the full city waitlist.

**Step 13 — Citations + city links.** Re-run the `05-LOCAL-SEO.md` §5 table with the Jalandhar NAP block (JustDial, Sulekha, IndiaMART, Bing Places, Apple Business Connect, Facebook/Instagram, Petofy first) at the natural 2–4/day pace. City link plan, first 90 days (then 1 initiative/month per 05 §8): local press pitch — Tribune Jalandhar edition / Dainik outlets, story *"doorstep pet care reaches Jalandhar — background-verified groomers, fixed prices"* · 1 shelter/rescue free-grooming day with a Punjab NGO · 2 RWA wellness camps in launch areas · a college-fest pet-show segment (LPU is adjacent in Phagwara; DAV Jalandhar — `.ac.in`/`.edu.in` event links) · kennel-club contact for show sponsorship.

**Step 14 — Measurement switches on.** Sitemap re-emits automatically at build (04 §7.1) · GSC Request Indexing done in Step 12.8 · the KPI report (09 §8.1) gains a per-city section — same rows, filtered by `page_path` starting `/jalandhar/` and the leads-sheet city — · `RANK-LOG.md` gains the city's 15-keyword set from Step 3 (09 §7 method) · booking events gain a `city` param and the leads sheet a `city` column (07 §5/§7 and 09 §2 amended in one commit, Decision-Log entry).

### Phase E — Operate

The city joins the weekly/monthly/quarterly routine of `05-LOCAL-SEO.md` §8 as its own instance (own GBP posts, own review engine, own area-page gating). First-months targets: the 09 §8.2 L+1/L+3 table **at half values** for a second city (it starts with brand proof Ludhiana never had, but a colder market) — logged in the city's KPI section. **The next city's clock starts** only when §1 triggers hold for the combined operation AND the newest city has reached positive monthly contribution (T3 definition).

---

## 4 · Site evolution at ≥3 cities

### State A — 2 cities (interim; deliberately minimal)

Home keeps its Ludhiana head-term targeting (01 home row unchanged). Only three additions: a slim banner under the hero — copy, verbatim: **"Now also in Jalandhar → Dog & cat grooming, walking and vet at home"** linking `/jalandhar/` — · a Jalandhar footer column (hub + 4 core services + top 3 areas) · the widget's City select (§7 change 2). **No national hubs at 2 cities** — 00 §5 reserves them for multi-city stage, and 2 thin hub pages would be premature.

### State B — ≥3 cities (one release, Decision-Log entry)

**1 · Home becomes the multi-city brand page.**
- H1 — pick one, log the choice: (a) *"Pet care at your doorstep — Ludhiana, Jalandhar & Chandigarh"* (names update as cities join) · (b) *"Doorstep pet care across Punjab — choose your city"* · (c) *"The same verified pet care, now in {n} cities"*.
- **City selector block** (directly under the hero): H2 `Choose your city`; one card per city — city name, `{n} areas served`, `Full Groom from ₹{city small-dog price}` (from that city's pricing file), link to `/{city}/`; ordered by launch date. Plain accessible links, no JS required. Convenience layer: visiting any city hub sets `localStorage.pds_city`; when set, home's primary CTA and the nav deep-link to that city. Progressive enhancement only — **never an auto-redirect, never a geolocation prompt.**
- **Keyword handover:** the "pet grooming ludhiana"-class head terms move to `/ludhiana/` as its primary targets. Same release: update the home + city-hub rows in `03-KEYWORD-MAP.md` and `01-SITEMAP.md`, re-run the 03 §3 title formulas, then watch GSC weekly for 8 weeks (04 §7.2) — expect a brief dip, then recovery on the hub.
- **Schema:** `LocalBusiness` moves off home; home keeps the `Organization + WebSite` @graph (04 §2.6). Each city hub carries its own `LocalBusiness` (04 §2.1 pattern) with its city phone and `sameAs` → that city's GBP. `/contact/` lists every city (ContactPage unchanged in shape).

**2 · National service hubs — exactly 7, only now** (00 §5 rule):
`/services/dog-grooming/` · `/services/cat-grooming/` · `/services/dog-walking/` · `/services/vet-at-home/` · `/services/dog-vaccination/` · `/services/tick-flea-treatment/` · `/services/puppy-grooming/`

Per-hub spec (national variant of `_TEMPLATE-service-page.md`):
- Title pattern `"{Service} at Home | PetDoorStep — {City 1}, {City 2} & {City 3}"`; H1 `"{Service} at Home — PetDoorStep"`.
- 150–250 word intro: what's included (from the pricing files' `includes[]`), the PetDoorStep Promise strip (06 §4.1).
- **City cards linking down** to every `/{city}/{service}/` with that city's from-price — the hub's whole job is routing authority downward.
- 4–6 national (non-city) FAQs: what's included, duration, breed handling, first-groom age.
- **No price table of its own** — prices are city facts; no OfferCatalog. Schema: `Service` with `areaServed` = live cities + BreadcrumbList `Home › Services › {Service}`.
- Linking: every city service page gains one upward link (*"Need us in another city? →"*); blog posts with national intent (rows marked so in `10-CONTENT-CALENDAR.md`) retarget to hubs.

**3 · Nav/footer spec (State B):**
- **Header:** logo · city switcher `Your city: {City} ▾` (lists city hubs; default = `pds_city`, else Ludhiana) · `Services ▾` (the **selected** city's 7 service pages) · Pricing · How it works · Reviews · **Book Now** button (→ `/book/?city={selected}`).
- **Footer:** one column per city (city hub + 4 core services + **top 3** areas — never all 10; the 05 §6 #7 anti-stuffing rule) · one Services column (the 7 national hubs) · trust column (About, Safety & Hygiene, Reviews, FAQ, Join as Groomer, Offers) · legal row · per-city NAP line `PetDoorStep · {City} · {city phone}` linking that city's GBP.
- **Breadcrumbs unchanged:** `Home › {City} › {Service}` — already city-parameterised (01 §2 #6).

**4 · `/pricing/` and `/book/`:** `/pricing/` gains a city switcher on the same URL (default city = `pds_city`, else Ludhiana; server-renders the default city's table + OfferCatalog, swaps client-side; 04 §2.5 amended then). `/book/` Step 1 gains a `City` select above `Area` (07 §3 amendment): areas repopulate from `pricing/{city}.json`; WhatsApp payload line becomes `Area: {area}, {City}`.

---

## 5 · Hindi `/hi/` — transcreation plan (post-Punjab scale)

**Trigger (both must hold):** (a) ≥3 city silos live, each past its Step-12 checklist ≥60 days; (b) a demand or roadmap signal — Devanagari-script queries ≥5% of GSC impressions in any month (checked in the 05 §8 quarterly block), OR a Hindi-belt (non-Punjab) city is logged as next in 00 §11. Until then: **no `/hi/` URLs, no hreflang tags at all, nothing squats on `/hi/`** (04 §6.3).

**Page batches** (each batch = one release):
- **Batch 1 — money pages only:** for each live city — `/hi/{city}/dog-grooming/` · `/hi/{city}/vet-at-home/` · `/hi/{city}/dog-vaccination/` · `/hi/{city}/tick-flea-treatment/` — plus `/hi/pricing/`. (Medical/tick queries skew most Hindi nationally; confirm against our own GSC query-language data before locking the batch and swap in cat-grooming/dog-walking if our data says otherwise — the decision rule is "our GSC, not the guess".)
- **Batch 2** (only if Batch-1 pages earn ≥10% of their cities' organic clicks after 90 days): remaining service pages, `/hi/{city}/` hubs, `/hi/how-it-works/`, `/hi/faq/`, `/hi/` home.
- **Batch 3:** the top-5 BOFU blog posts by assisted conversions (09 data), transcreated.
- **Area pages:** only when a city holds Hindi-language reviews to quote — the 05 §6 #3 proof rule applies in Hindi too.
- **Booking:** Batch-1 CTAs point to the English widget with this assurance line above, verbatim: **"बुकिंग फ़ॉर्म अंग्रेज़ी में है — WhatsApp पर आप हिंदी में बात कर सकते हैं।"** The widget's UI strings get a Hindi strings file only at Batch 2 (07 amendment).

**hreflang — exactly per `04-TECHNICAL-SEO.md` §6.3:** bidirectional 3-line set (`en-IN`, `hi-IN`, `x-default`) on every EN/HI twin, absolute URLs, `x-default` always the English page, `@astrojs/sitemap` i18n alternates on. URL mirror is 1:1 (`/hi/ludhiana/dog-grooming/`); **slugs stay Latin** per 00 §5 — no Devanagari slugs.

**Transcreation, not translation — binding rules:**
1. Source = the page's blueprint + 00 §3 facts, never the English prose fed through a translator. The writer answers the same brief in Hindi from scratch.
2. Writer: native-Hindi copywriter with pet-category familiarity; a second native speaker does a read-aloud review. Register: simple conversational Hindustani (*"aapke ghar par"*), never shuddh-Hindi officialese.
3. Stays Latin/unchanged: brand **PetDoorStep**, service names with a Hindi gloss on first use — *"Full Groom (पूरी ग्रूमिंग)"* — ₹ amounts in Western numerals (₹1,199, never १,१९९), locality names as locally written, phone/WhatsApp strings.
4. FAQs rewritten from **real** Hindi/Hinglish customer WhatsApp messages (anonymised), not translated English FAQs; 03 §5 seasoning applies doubly.
5. Facts and prices render from the same `pricing/{city}.json`; the 07 §4 ₹-grep gate covers `/hi/` pages too. Trust claims stay commitment-faithful to 00 §3.4 — a transcreator may re-voice, **never re-promise**.
6. Titles/H1/meta written for Hindi queries (e.g. H1 *"लुधियाना में घर पर डॉग ग्रूमिंग — PetDoorStep"*), backed by a mini Hindi SERP sprint (Step-3 recipe run with Hindi queries), never transliterated English titles.

---

## 6 · Brand governance — one brand, many cities

**The Promise is the brand.** *The PetDoorStep Promise* (`06-CONVERSION-PLAYBOOK.md` §4.1) renders on every page in every city with the same five commitments, same order, same numbers (including the ₹100 on-time credit and its policy gate) — re-voiced only in `/hi/` per §5 rule 5.

**NEVER changes** (any exception = 00 §11 Decision-Log + Sunny, expected answer: no):

| Invariant | Source of truth |
|---|---|
| Brand name, logo, design tokens — GBP name exactly `PetDoorStep` in every city | 00 §3.1 · `08-DESIGN-SYSTEM.md` · 05 §1 |
| The PetDoorStep Promise — all 5 commitments | 06 §4.1 |
| Trust standards: verified people, fresh sealed kit, fixed prices, photo proof, registered vets only | 00 §3.4 |
| Honesty rules: publish only what is true; no review gating or incentives; no fabricated counters; the `[FILL:*]` launch gate | 00 §3.4/§8 · 05 §3.6 · 06 §4.2 |
| Pricing discipline: fixed transparent ₹; one data file per city mirroring its 00 §3.2 annex; no doorstep bargaining; the ₹-grep gate | 00 §3.2 · 07 §4 |
| Review engine mechanics: ask-flow, templates, SLAs — merge fields (`{locality}`, `{city}`) do all the localising | 05 §3 |
| Size guide: Small <10 kg · Medium 10–25 kg · Large >25 kg | 00 §3.2 |
| URL architecture — nothing ever migrates | 00 §5 (D6) |
| Booking UX principles, incl. the verbatim "No advance payment. Pay by cash or UPI after the service." | 07 §1 |
| Copy voice: warm, specific, honest; pets are family members, never "animals" | 00 §7 · 06 |

**MAY localise** (city variables, each with a named owner):

| Localisable | Rule | Owner |
|---|---|---|
| City price values | 00 §3.2 city annex first → `pricing/{city}.json`; deviation from Ludhiana values needs one written reason per row | Sunny |
| Areas list + adjacency map | City sprint output (Step 3–4) | City lead |
| Testimonials/reviews | ONLY that city's, verbatim with first name + locality (`[FILL:REVIEW_JAL_*]` until real) | City lead |
| Team profile cards | That city's staff only (06 §4.2 spec) | City lead |
| Landmarks, parks, logistics copy, local FAQs | Fact-pack (Step 4); Hinglish/Punjabi seasoning per 03 §5 | Copywriter + city lead |
| Launch & seasonal offers | Only the two sanctioned patterns below; anything else updates 00 §3.2 first | Sunny |
| GBP posts, photos, Q&A; citation NAP block; holiday hours | Per-city GBP + the 05 §4 NAP master's city block | City lead |

**Sanctioned launch-offer patterns** (pick one per city launch, log in 00 §11 — both reuse existing 00 §3.2 numbers, so no new price is invented):
- **A — "Launch 100":** first 100 Full Grooms in {city} at the Groom Club rate (15% off), pitched as a natural bridge into Groom Club membership.
- **B — Free add-on:** a free Nail Trim + Ear Clean visit (₹299 value) with every Full Groom completed in launch month.

---

## 7 · What does NOT change in the codebase — proof Phase 1 was built for this

| Layer | At every new city | Why it already works | File |
|---|---|---|---|
| Templates, layouts, components | Zero edits — new content-collection entries only (city/service/area frontmatter) | Blueprints are city-parameterised by design | `blueprints/_TEMPLATE-*` · 04 §1 |
| Booking widget | Same React island; city + areas arrive as data | Areas are sourced from the pricing data file precisely "so widget and area pages never drift" | 07 §3 Step 1 · §4 |
| Pricing mechanism | Same JSON schema, one new `pricing/{city}.json` | The schema carries no city assumptions | 07 §4 |
| Schema JSON-LD | Same blocks; only variables change (`areaServed`, breadcrumb city, GBP `sameAs`) | 04 §2 blocks are parameterised worked examples | 04 §2 |
| Analytics | Same GA4 property, same event names; city = `page_path` segment + one `city` param | Events were named by service and funnel, never by city | 09 §2 |
| GBP / citations / review playbook | Re-run verbatim per city with the city NAP block | 05 was written city-agnostic | 05 §1–§6 |
| Design system | Untouched | Tokens know no geography | 08 |
| Redirects file | Still near-empty — no URL ever moves | Geo-silo locked on day one | 00 §5 (D6) · 04 §6.1 |
| Sitemap, robots, canonicals | Automatic at build; new URLs just appear | 04 §7.1 integration | 04 |
| Content method | City topics slot into the same weekly cadence | Calendar method is keyword-driven, not city-bound | `10-CONTENT-CALENDAR.md` |

**The complete list of code-touching changes across all of Phases 2–3 — seven, bounded:**
1. `pricing.json` → `src/data/pricing/{city}.json` split + index module — 07 §4 amendment *(2nd city)*
2. Widget Step-1 `City` select + `Area: {area}, {City}` payload token + leads-sheet `city` column — 07 §3/§5 amendment *(2nd city)*
3. Booking events gain a `city` param — 09 §2 amendment *(2nd city)*
4. State-A banner + footer city column *(2nd city)*
5. Home multi-city rebuild + header city switcher *(3rd city, §4 State B)*
6. `/pricing/` city switcher + the 7 national hub pages *(3rd city)*
7. `/hi/` i18n layer — the pre-built 04 §6.3 hreflang stub switches on *(§5 trigger)*

None of these touches an existing URL, template contract, schema pattern or event name — which is exactly what "zero-migration expansion" (00 §2 D6) promised on day one.

**New `[FILL:*]` tokens this file introduces** (00 §8 policy; repeat the pattern per later city with `_CHD`, `_ASR`, `_PTA`): `[FILL:OPS_LEAD_NAME]` · `[FILL:CITY_LEAD_JAL]` · `[FILL:JAL_BASE_ADDRESS]` · `[FILL:JAL_PHONE]` · `[FILL:GBP_LINK_JAL]` · `[FILL:VET_PARTNER_JAL]` · `[FILL:GROOMER_JAL_1_NAME]` · `[FILL:REVIEW_JAL_*]`

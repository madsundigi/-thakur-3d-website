# T2 · AREA-PAGE TEMPLATE — master anatomy for every `/ludhiana/areas/<area>/` page

> This file owns the block order, rules and per-area data for the ten locality pages. It obeys `00-MASTER-PLAN.md`
> (areas from §3.3, prices from §3.2, trust facts from §3.4) and enforces every anti-doorway rule in
> `05-LOCAL-SEO.md` §6. Keywords come from `03-KEYWORD-MAP.md` §4. URLs only from `01-SITEMAP.md`.

---

## 0 · The one rule that matters

Google kills locality pages where only the place name changes. Every competitor's Ludhiana page is exactly that.
**An area page is publishable only when its content layer is genuinely about that locality** — real customers from
there, real logistics, real local questions. The skeleton below may repeat; the words inside it may not.

**Publish gate (all must be true — `05-LOCAL-SEO.md` §6):**

1. ≥ 600 words, of which ≥ 60% are unique to this page (check: paste two area pages into any free text-diff tool —
   shared sentences must be < 40% of the body).
2. ≥ 2 real testimonials from customers in this locality (Google-review quotes, first name + area) **or** ≥ 1 real
   testimonial + ≥ 2 before/after pairs captioned in this locality. No proof → the page waits.
3. AP-5 logistics block complete with true values; 3–5 locality FAQs written from real customer questions.
4. Staggered publishing: first 3–4 pages that have proof, then one new page every 2–4 weeks. Never all ten in a day.

Not-yet-published area pages are referenced elsewhere as **plain text** (no link) — `02-SEO-PARAMETERS.md` P074.

---

## 1 · Block index (DOM order — binding)

| # | Block | Component (`08-DESIGN-SYSTEM.md` §4) | Unique content? |
|---|---|---|---|
| AP-0 | Breadcrumb | `Breadcrumb.astro` | No |
| AP-1 | Hero (locality value proposition) | `Hero.astro` | **Yes** — eyebrow, subhead, photo |
| AP-2 | Local intro — "Pet care in {Area}" | prose | **Yes** — ≥ 150 words |
| AP-3 | Services & prices in {Area} | `ServiceCard.astro` ×4 + price lines | Partly — intro line + "most booked here" |
| AP-4 | Local proof | `ReviewCard.astro` ×2–3 + `BeforeAfter.astro` ×0–2 | **Yes** — locality-only |
| AP-5 | Logistics in {Area} | definition list | **Yes** — true per-area values |
| AP-6 | How it works | `StepsStrip.astro` | No (site-wide strings) |
| AP-7 | The PetDoorStep Promise band | 5-icon strip | No |
| AP-8 | Local FAQs (3–5) | `Faq.astro` | **Yes** |
| AP-9 | Nearby areas + "also serving" | `AreaCard.astro` ×3 + text line | Partly |
| AP-10 | Book in {Area} — widget Step-1 embed | `BookingWidget` island (area preset) | No |
| AP-11 | Final CTA band | `CtaBand.astro` | Partly — breed/area line |
| — | Sticky bar / desktop float (global) | `StickyBar.astro` / `WaFloat.astro` | No |

Head: title/meta per §3 · canonical + OG per `04-TECHNICAL-SEO.md` §3–§4 · JSON-LD `@graph` = **Service (area
variant) + BreadcrumbList** (`04-TECHNICAL-SEO.md` §2.9).

---

## 2 · The blocks

### AP-0 · Breadcrumb
- Visible: `Home › Ludhiana › Areas › {Area}`. "Ludhiana" links `/ludhiana/` once the hub is live (plain text before);
  "Areas" links `/ludhiana/#areas` (the hub's area grid) once live, plain text before.
- Schema: BreadcrumbList with **3 items** — Home (`/`), Ludhiana (`/ludhiana/`), {Area} (this URL). "Areas" has no
  standalone URL, so it is visible-only.

### AP-1 · Hero
- **Eyebrow:** the area's value proposition from the §4 data table (e.g. *Our most-booked area*), ≤ 30 chars.
- **H1:** `Pet Grooming at Home in {Area}, Ludhiana` — carries the §3 primary keyword in the first 5 words (P026).
- **Subhead (formula, ≤ 200 chars):** `{Area} pet parents book us for doorstep grooming, walking and vet visits — {arrival line from AP-5}. Bath & Brush from ₹599, fixed price.`
- **CTAs:** [Book on WhatsApp] → wa.me locality prefill (AP-10) + [Call [FILL:PHONE]]. `src` = `hero_area-{slug}`.
- **Chips:** `from ₹599` + the `06-CONVERSION-PLAYBOOK.md` §2.1 standard 4 trust chips.
- **Photo:** a real visit in this locality (groomer + pet, recognisable local setting — kothi verandah, society
  balcony). Alt formula: `{Breed} being groomed at home in {Area}, Ludhiana`. Until a locality photo exists, use the
  nearest-area photo with an honest alt — never stock.
- R3 line under CTAs: "A real person replies on WhatsApp within 10 minutes, 9:00–19:00."

### AP-2 · Local intro — H2 "Doorstep pet care in {Area}"
Write ≥ 150 words that could only be about this locality. Required ingredients (all true, all specific):
1. Housing mix and what it means for a visit (kothis with verandahs vs apartment societies with lifts and gate passes).
2. The 2–3 landmarks our team uses for directions — from the §4 data table + `[FILL:LANDMARKS_{SLUG}]` (Sunny fills
   from local knowledge; never guess a landmark).
3. Breeds our team actually sees here (from the lead sheet, `07-BOOKING-SPEC.md` §5 — filter by area).
4. Where walkers walk (real parks/lanes) — only on pages where walking is booked in that area.
5. One line naming the nearest partner vet arrangement where true (`[FILL:VET_PARTNER_NAME]`).

**Example opening (Sarabha Nagar — the shape, not copy to reuse elsewhere):** "Sarabha Nagar is where we groom
the most Golden Retrievers in Ludhiana — big double coats in big kothis, usually on a shaded verandah with a garden
tap a few steps away. Our groomers know the lanes between the B-Block market and the Kipps side by heart…"

### AP-3 · Services & prices in {Area} — H2 "Book any service in {Area}"
- Intro line: "Most booked in {Area}: {top 3 services from the lead sheet}." (pre-proof pages don't publish — gate §0).
- **4 `ServiceCard`s — always the same 4 core money pages** (`01-SITEMAP.md` §2 rule 3), each with a locality anchor:
  | Card | Anchor text pattern | Price line (from `pricing.json`) |
  |---|---|---|
  | Dog Grooming | "dog grooming at home in {Area}" → `/ludhiana/dog-grooming/` | Bath & Brush from ₹599 · Full Groom from ₹1,199 |
  | Cat Grooming | "cat grooming in {Area}" → `/ludhiana/cat-grooming/` | ₹899 / ₹1,399 flat |
  | Dog Walking | "dog walker in {Area}" → `/ludhiana/dog-walking/` | ₹2,999/month · Trial Week ₹699 |
  | Vet at Home | "vet home visit in {Area}" → `/ludhiana/vet-at-home/` | ₹699 + medicines at MRP |
- One text line beneath: "Every price, every size: see the full price list" → `/pricing/`.

### AP-4 · Local proof — H2 "What {Area} pet parents say"
- 2–3 `ReviewCard`s **from this locality only** (`[FILL:REVIEW_{SLUG}_1]`, `[FILL:REVIEW_{SLUG}_2]` until real) —
  quote verbatim from Google, first name + area + pet + breed + service + month-year (`06-CONVERSION-PLAYBOOK.md` §4.4).
- 0–2 `BeforeAfter` pairs captioned `{Pet} · {Breed} · {Service} · {Area}` (consent rule `06` §4.3).
- Proof line linking `[FILL:GBP_LINK]`. **No Review/AggregateRating schema** (`04-TECHNICAL-SEO.md` §2.0.4).

### AP-5 · Logistics in {Area} — H2 "Visiting you in {Area}"
A definition list with true values only:
| Item | Value rule |
|---|---|
| Typical slots | From real scheduling: e.g. "Same-week slots most days; weekends book out first." |
| Arrival window | "We arrive inside your confirmed 3-hour window (Morning 9–12 · Afternoon 12–3 · Evening 3–6) and WhatsApp you when we're 15 minutes away." |
| Travel charge | "None — {Area} is inside Ludhiana, so the listed price is the full price." (`00-MASTER-PLAN.md` §3.2) |
| Pin codes served | `[FILL:PINCODES_{SLUG}]` — fill from India Post's lookup, never from memory |
| What we need | "A tap point and a plug — we bring the table, towels, warm-water gear and dryer." |
| Societies | "Gated society? Add the visitor-entry process (MyGate/guard register) in your booking note." |

### AP-6 · How it works
`StepsStrip.astro` with the four site-wide steps verbatim (`04-TECHNICAL-SEO.md` §2.8). No per-area variation.

### AP-7 · Promise band
Verbatim from `06-CONVERSION-PLAYBOOK.md` §4.1 (point 4 only after its policy gate). Link "Read the full Promise" →
`/safety-hygiene/`.

### AP-8 · Local FAQs — H2 "{Area} questions"
3–5 Q&As, 40–80 words, answer-first, written from real questions customers in this area asked on WhatsApp. Plain
HTML accordion — **no FAQPage markup on area pages** (schema matrix `04-TECHNICAL-SEO.md` §2.9).
Question bank to adapt (each answer must be locality-true):
1. "Do you come to {society/block} before 10 am?" — answer with the real earliest slot (9:00) and gate norms.
2. "Where will the groomer park?" — scooter; one sentence on the actual parking reality of the area.
3. "My flat has no balcony tap — can you still bathe my dog?" — yes, bathroom works; we bring warm-water gear.
4. "Is there an extra charge for {Area}?" — no travel charge in Ludhiana (AP-5).
5. "How soon can you come to {Area}?" — the real typical lead time from scheduling data.

### AP-9 · Nearby areas — H2 "Also near you"
- 3 `AreaCard`s from the **fixed adjacency map** in `05-LOCAL-SEO.md` §6.7 (listed per area in §4 below).
- "Also serving" text line naming the future localities assigned to this page in `03-KEYWORD-MAP.md` §4 (plain text,
  no links): e.g. Ferozepur Road page → "Also serving Gurdev Nagar."

### AP-10 · Book in {Area}
- Booking widget island mounted with `area={slug}` preset (Step 1 pre-selected, user can change) — `07-BOOKING-SPEC.md`
  §8 island rules; `src=area_{slug}`.
- Fallback link always present (no-JS): `https://wa.me/[FILL:WHATSAPP_NUMBER]?text=Hi%20PetDoorStep%2C%20I%20want%20pet%20grooming%20at%20home%20in%20{Area-URL-encoded}`.

### AP-11 · Final CTA band
`CtaBand.astro` with R8 pattern: "Your {top breed in this area} deserves a stress-free groom at home. Slots this week
in {Area}." + [Book on WhatsApp] + [Call [FILL:PHONE]].

---

## 3 · Head, keywords & schema

| Slot | Rule |
|---|---|
| Title | `Pet Grooming & Vet in {Area}, Ludhiana \| PetDoorStep` ("on" for road names) — carries "Ludhiana" per `02-SEO-PARAMETERS.md` P013; counts in §4 (all 50–60) |
| Meta (≤ 155) | `PetDoorStep brings grooming, walking and vet visits to homes in {Area} — {local line}. From ₹599, fixed prices. Book on WhatsApp.` — local line per §4 |
| H1 | `Pet Grooming at Home in {Area}, Ludhiana` |
| Primary keyword | `pet grooming {area} ludhiana` — Title (contained), H1, AP-2 first sentence |
| Secondaries → blocks | `dog groomer in {area}` → AP-3 card anchor · `vet home visit {area} ludhiana` → AP-3 card anchor · `dog walker {area}` → AP-3 card anchor · `{top breed} grooming {area}` → AP-2 body |
| Schema `@graph` | **Service** (pattern `04-TECHNICAL-SEO.md` §2.2) with `name` "Pet grooming at home in {Area}, Ludhiana", `areaServed` `{"@type":"Place","name":"{Area}","containedInPlace":{"@type":"City","name":"Ludhiana"}}`, `provider` `{"@id":"https://[FILL:DOMAIN]/#business"}`, `offers` = the Bath & Brush + Full Groom size prices shown in AP-3 · **BreadcrumbList** (3 items, AP-0) |

---

## 4 · Per-area data table (the ten launch pages — `00-MASTER-PLAN.md` §3.3)

Title counts include ` | PetDoorStep`. Hooks come from `03-KEYWORD-MAP.md` §4 SERP evidence; landmarks marked
`[FILL]` must come from Sunny's local knowledge.

| Area (slug) | Title (chars) | Eyebrow / value proposition | Meta local line | Known anchors (verified in research) | Adjacent (AP-9) | Also serving |
|---|---|---|---|---|---|---|
| Sarabha Nagar (`sarabha-nagar`) | Pet Grooming & Vet in Sarabha Nagar, Ludhiana \| PetDoorStep (59) | Our most-booked area | B-Block market to Kipps side | B-Block market, Kipps market side; highest pet-spend locality (Zigly flagship here) | BRS Nagar · Kitchlu Nagar · Pakhowal Road | — |
| BRS Nagar (`brs-nagar`) | Pet Grooming & Vet in BRS Nagar, Ludhiana \| PetDoorStep (55) | Every block, every week | kothis and societies across all blocks | Contested area (thePetNest lists it) — go deepest on proof | Sarabha Nagar · Ferozepur Road · South City | — |
| Model Town (`model-town`) | Pet Grooming & Vet in Model Town, Ludhiana \| PetDoorStep (56) | Ludhiana's pet-parent hub | home grooming without the salon queue | Densest pet-business cluster in the city | Civil Lines · Dugri · Kitchlu Nagar | — |
| Civil Lines (`civil-lines`) | Pet Grooming & Vet in Civil Lines, Ludhiana \| PetDoorStep (57) | Calm visits for busy homes | professional households, flexible slots | Adjacent Tagore Nagar | Model Town · Kitchlu Nagar · Haibowal Kalan | Shastri Nagar · Moti Nagar · Tagore Nagar |
| Dugri (`dugri`) | Pet Grooming & Vet in Dugri, Ludhiana \| PetDoorStep (51) | Phase 1 to Phase 3, covered | all three phases | Large residential catchment, Phases 1–3 | Model Town · South City · Pakhowal Road | Urban Estate Phase 2 |
| Pakhowal Road (`pakhowal-road`) | Pet Grooming & Vet on Pakhowal Road, Ludhiana \| PetDoorStep (59) | First doorstep groomers here | along the whole Pakhowal Road corridor | Affluent corridor; no dedicated local pet business found | Sarabha Nagar · South City · Dugri | — |
| South City (`south-city`) | Pet Grooming & Vet in South City, Ludhiana \| PetDoorStep (56) | Society-friendly visits | gated societies, gate-pass ready | Gated-society catchment beside Pakhowal Road | Dugri · Pakhowal Road · BRS Nagar | Basant Avenue |
| Ferozepur Road (`ferozepur-road`) | Pet Grooming & Vet on Ferozepur Road, Ludhiana \| PetDoorStep (60) | Condos to kothis, covered | condos and homes along Ferozepur Road | Arterial corridor; Gurdev Nagar adjoining | BRS Nagar · Sarabha Nagar · South City | Gurdev Nagar |
| Haibowal Kalan (`haibowal-kalan`) | Pet Grooming & Vet in Haibowal Kalan, Ludhiana \| PetDoorStep (60) | Bath & Brush from ₹599 | Jassian Road side and beyond | Jassian Road | Civil Lines · Kitchlu Nagar · Ferozepur Road | Salem Tabri |
| Kitchlu Nagar (`kitchlu-nagar`) | Pet Grooming & Vet in Kitchlu Nagar, Ludhiana \| PetDoorStep (59) | Next door to PAU | homes near PAU Gate | Near PAU Gate; PAU-campus households | Sarabha Nagar · Civil Lines · Model Town | — |

Road localities use "on" (`03-KEYWORD-MAP.md` §3). Each area's `[FILL:LANDMARKS_{SLUG}]` = 2–3 landmarks Sunny confirms.

---

## 5 · Required to ship (every area page)

- [ ] §0 publish gate passed (word count, uniqueness diff < 40% shared, ≥ 2 local proofs, staggered date)
- [ ] URL identical to `01-SITEMAP.md`; title/meta/H1 exactly per §3–§4; title ≤ 60 chars
- [ ] AP-2 contains landmarks Sunny confirmed + breeds from real lead-sheet data — zero invented local facts
- [ ] AP-3 links all 4 core money pages with locality anchors + `/pricing/`; AP-9 links exactly the 3 adjacency-map areas
- [ ] AP-5 values all true; pin codes filled from India Post; travel-charge line matches `00-MASTER-PLAN.md` §3.2
- [ ] Testimonials quote Google verbatim; no Review/AggregateRating/FAQPage markup on the page
- [ ] Widget mounts with the area preset; wa.me fallback link works with JS disabled
- [ ] Schema `@graph` = Service (area variant) + BreadcrumbList; validates with zero errors (`02-SEO-PARAMETERS.md` P087)
- [ ] `02-SEO-PARAMETERS.md` audit row created; all [Launch-blocker] items pass

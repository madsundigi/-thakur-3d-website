# T1 · SERVICE-PAGE TEMPLATE — master anatomy for every money page + the `/ludhiana/` city hub

> This file owns the block-by-block anatomy that every `/ludhiana/<service>/` money page inherits (and, via §3, the `/ludhiana/` city hub). It obeys `00-MASTER-PLAN.md`: URLs only from `01-SITEMAP.md`, every ₹/area/trust fact only from `00-MASTER-PLAN.md` §3, keywords only from `03-KEYWORD-MAP.md`.

---

## 0 · How to use this template

1. **Inheritance.** Each money page's own blueprint (`blueprints/dog-grooming.md` etc.) supplies the *copy values* (hero block from `06-CONVERSION-PLAYBOOK.md` §2.3, keyword table from `03-KEYWORD-MAP.md` §2, FAQ set); **this file owns block order, per-block rules and defaults**. If a page blueprint is silent on a block, build the block exactly as written here. No blueprint may drop, reorder or add blocks without a `00-MASTER-PLAN.md` §11 Decision-log entry.
2. **Worked example** throughout: `/ludhiana/dog-grooming/` (the hero service). Where a value differs per page, the rule names its source file.
3. **Data sources (never inline literals in the build):** prices → `pricing.json` (mirrors `00-MASTER-PLAN.md` §3.2, per `07-BOOKING-SPEC.md` §4) · review count/rating → the single Astro data file per `06-CONVERSION-PLAYBOOK.md` §4.4 · components → `08-DESIGN-SYSTEM.md` §4 by the names used below.
4. **Placeholders:** only `[FILL:*]` tokens per `00-MASTER-PLAN.md` §8. This file adds no new tokens.
5. **Competitor ₹ figures** are allowed only in body context with the caveat *"market prices mined from SERP snippets 2026-10; re-verify before publishing"* (`06-CONVERSION-PLAYBOOK.md` §5.6). Never in hero, table, schema or FAQ answers.

### Block index (DOM order — binding)

| # | Block | Component (`08-DESIGN-SYSTEM.md` §4) | Required? |
|---|---|---|---|
| SP-0 | Breadcrumb | `Breadcrumb.astro` | Always |
| SP-1 | Hero | `Hero.astro` | Always |
| SP-2 | Social-proof strip | `ReviewCard.astro` ×3 + proof line + closing CTA row (`00` §11 E4) | Always (empty state pre-launch) |
| SP-3 | What's-included package table | custom table (PriceMatrix styling) | Grooming pages; others use a package list |
| SP-4 | Price matrix by size + mid-page CTA | `PriceMatrix.astro` + `Button.astro` | Always (flat-price list where no size matrix) |
| SP-5 | Before/after gallery | `BeforeAfter.astro` ×2–4 | Grooming pages; walking/vet swap to proof-photo row |
| SP-6 | How it works — 4 steps | `StepsStrip.astro` | Always |
| SP-7 | Your groomer / your vet trust block | `GroomerCard.astro` (condensed) ×2–3 | Always |
| SP-8 | The PetDoorStep Promise band | 5-icon strip | Always |
| SP-9 | Areas-served links block | `AreaCard.astro` ×3 | Always |
| SP-10 | FAQ (6–8 Qs) | `Faq.astro` | Always |
| SP-11 | Related services | `ServiceCard.astro` ×2–3 | Always |
| SP-12 | Final CTA band | `CtaBand.astro` | Always |
| SP-13 | Sticky mobile bar + desktop float (global, not in page DOM flow) | `StickyBar.astro` / `WaFloat.astro` | Always |

Head (not a block): title/meta per `03-KEYWORD-MAP.md` §3 formulas · canonical + OG per `04-TECHNICAL-SEO.md` §3–§4 · JSON-LD `@graph` = **Service + FAQPage + BreadcrumbList** per `04-TECHNICAL-SEO.md` §2.9.

---

## 1 · The 14 blocks

### SP-0 · Breadcrumb — `Breadcrumb.astro`

- **Purpose.** Orientation + the geo signal "Ludhiana" above the fold (`02-SEO-PARAMETERS.md` P073/P091); feeds BreadcrumbList schema.
- **Content formula.** `Home › Ludhiana › {Service page name from 01-SITEMAP.md}`. "Ludhiana" is plain text (not a link) until `/ludhiana/` ships in Wave 2; its schema `item` URL is live from day one (`04-TECHNICAL-SEO.md` §2.4).
- **Worked example.** `Home › Ludhiana › Dog Grooming at Home`.
- **SEO slots.** City name in crawlable text within the first DOM elements; breadcrumb anchor "Home" → `/`.
- **Schema.** BreadcrumbList, 3 items, exactly the `04-TECHNICAL-SEO.md` §2.4 worked JSON.
- **Internal links.** `Home` → `/`; `Ludhiana` → `/ludhiana/` once live.
- **Mobile.** Single wrapping line under the header, small type; never truncated at 3 items.

### SP-1 · Hero — `Hero.astro`

- **Purpose.** Pass the 5-second test: what, where, from how much, why trust, how to book — all in one 360 px screen (`02-SEO-PARAMETERS.md` P150).
- **Content formula (DOM order per `08-DESIGN-SYSTEM.md` §4.6):**
  1. **Eyebrow** (micro, brand): service category or tagline, ≤ 30 chars.
  2. **H1** = `03-KEYWORD-MAP.md` §3 money-page formula **`{Service} at Home in Ludhiana`** (pattern P2/P3 from `06-CONVERSION-PLAYBOOK.md` §2.2); primary keyword in the first 5 words (P026).
  3. **Subhead** = benefit + the page's from-prices + the fixed-price promise, ≤ 200 chars — copy verbatim from the page's `06-CONVERSION-PLAYBOOK.md` §2.3 ready-hero block.
  4. **Dual CTA:** labels from the page's §2.3 block (bank: `06-CONVERSION-PLAYBOOK.md` §3.2); behaviour, target and `src` code per `07-BOOKING-SPEC.md` §2 row 3: the primary always links to `/book/?src=hero_<page-slug>` (`00` §11 E1; dog walking adds `service=dog-walking` so Trial Week is preselected, D2) and renders amber even when its label says "WhatsApp" (`08` §1.4 rule 2); the secondary = Call or the in-page price anchor, hidden below `md` (fold law, Mobile below).
  5. **Chip row:** one **from-₹ price chip** first (`Chip.astro` price style, value from `pricing.json` — e.g. `from ₹599`; flat-price pages show the flat figure, e.g. `₹699 flat`), followed by the **4 trust chips** — the `06-CONVERSION-PLAYBOOK.md` §2.1 standard set verbatim, unless the page's §2.3 block overrides chips (cat/walking/vet/vaccination/puppy pages do).
  6. **Photo** + 7. **R3 reply-time line** ("A real person replies on WhatsApp within 10 minutes, 9:00–19:00.").
- **Worked example (`/ludhiana/dog-grooming/`).** Eyebrow: *Pet care at your doorstep*. H1: **Dog Grooming at Home in Ludhiana**. Subhead: "One trained groomer, your verandah or balcony, 60–90 calm minutes. Bath & Brush from ₹599 · Full Groom from ₹1,199 — exact price fixed before we arrive." CTAs: [Book on WhatsApp] → `/book/?src=hero_dog-grooming` + [See exact prices] (anchor `#prices`). Chips: `from ₹599` + standard 4. Title tag: `Dog Grooming at Home in Ludhiana – From ₹599 | PetDoorStep` (58). Meta: the `03-KEYWORD-MAP.md` §3 worked row verbatim.
- **Image spec.** Real groomer + real pet at a real Ludhiana home (`06-CONVERSION-PLAYBOOK.md` §2.1; shot list `08-DESIGN-SYSTEM.md` §5.2). 16:10 base / 4:3 ≥ md, widths [400, 800, 1200], ≤ 120 KB largest, `<Picture>` AVIF/WebP, **eager + `fetchpriority="high"` + preloaded** (it is the LCP). Alt per `08-DESIGN-SYSTEM.md` §5.4 formula, e.g. "Golden Retriever being bathed at home in Sarabha Nagar, Ludhiana".
- **SEO slots.** Primary keyword: H1 + first 100 words (the subhead counts) per `03-KEYWORD-MAP.md` §2 legend; one secondary in the eyebrow only if natural.
- **Schema.** None of its own; H1/prices must match the Service node (`04-TECHNICAL-SEO.md` §2.0.3).
- **Internal links.** Secondary CTA may anchor to `#prices`; no other links in the hero.
- **Mobile.** Single column; chip row = horizontal scroll-snap line. **Fold law (P150; `00` §11 E3; `08` §4.6):** at 360×640, the H1, subhead, primary CTA and ≥ 1 trust chip are fully visible above the sticky bar, and the top ≥ 160 px of the hero photo is visible above it too — verify in DevTools before launch. Below `md`: the secondary CTA and the eyebrow are hidden (CSS only, still in the DOM), the subhead uses body size, the breadcrumb uses `py-2`. A page that still fails is an explicit P150 exception for Sunny to decide (logged in `00` §11), never a silent ship.

### SP-2 · Social-proof strip

- **Purpose.** Third-party verifiability immediately after the promise (beats thePetNest's uncheckable "1 lakh reviews" — research finding).
- **Content formula.** One proof line + 3 `ReviewCard.astro` cards filtered to **this service** (fallback: nearest service, then any). Proof line verbatim: **"★ [FILL:GOOGLE_RATING] on Google · [FILL:REVIEW_COUNT]+ Ludhiana pet parents"**, linked to `[FILL:GBP_LINK]` (`06-CONVERSION-PLAYBOOK.md` §4.4). Card contents: quote 2–3 lines · first name · locality · pet + breed · service chip · month-year.
- **Worked example.** `[FILL:REVIEW_1]` seed format: "Bruno hates car rides, so home grooming was a blessing. On time, polite, and the bathroom was left spotless. — Simran, Sarabha Nagar · Bruno (Golden Retriever) · Full Groom".
- **Pre-launch empty state** (until 3 real reviews exist): render the single E6 string from `06-CONVERSION-PLAYBOOK.md` §9 instead of empty cards.
- **Closing CTA row (`00` §11 E4, 2026-10-03):** the strip ends with a CTA row (the "after reviews" beat of `02` P153) carrying the page's body CTA from `07-BOOKING-SPEC.md` §2 row 4: `Book <Service> — from ₹<price>` (price rule as in SP-4) → `/book/?…&src=service_<id>`. It is part of SP-2, not a new block; SP-12 stays the page-end CTA. Built: the row is the body CTA with reassurance line R2 beside it (`06-CONVERSION-PLAYBOOK.md` §9: R2 sits "beside booking CTA") — `src/layouts/ServicePage.astro`, decision W1L-9.
- **SEO slots.** Locality names inside quotes are genuine local-signal text (P093-adjacent); never mark up stars/ratings in schema (`04-TECHNICAL-SEO.md` §2.0.4).
- **Schema.** **None.** Plain HTML only — self-serving Review/aggregateRating is banned.
- **Internal links.** Proof line → `[FILL:GBP_LINK]` (`rel="noopener"`, external).
- **Mobile.** Cards stack 1-col; proof line stays one line (wrap allowed), never a carousel.

### SP-3 · What's-included package table

- **Purpose.** Kill the #1 doorstep fear — surprise charges — with an itemised ✓-grid (Barkbus "no add-ons" pattern, research teardown #4). Petgroomly/HUFT hide this; we print it.
- **Content formula.** Columns = the page's packages from `00-MASTER-PLAN.md` §3.2; rows = every inclusion named there, ✓/— per package; final row = duration (`06-CONVERSION-PLAYBOOK.md` §5.5). Beneath, two footnotes: (a) "Everything above is included in the price — nothing on this list costs extra." (b) the honest variance line: "Severe matting may need extra de-matting time — quoted on WhatsApp before we start, never after."
- **Worked example (`/ludhiana/dog-grooming/`), from `00-MASTER-PLAN.md` §3.2 verbatim:**

  | Included | Bath & Brush | Full Groom ("Most booked") | Premium Spa |
  |---|---|---|---|
  | Bath with warm water | ✓ | ✓ | ✓ |
  | Blow-dry | ✓ | ✓ | ✓ |
  | Brush-out | ✓ | ✓ | ✓ |
  | Nail trim | ✓ | ✓ | ✓ |
  | Ear clean | ✓ | ✓ | ✓ |
  | Haircut & styling | — | ✓ | ✓ |
  | Paw & sanitary trim | — | ✓ | ✓ |
  | De-shed / de-mat | — | — | ✓ |
  | Conditioning masque | — | — | ✓ |
  | Perfume finish | — | — | ✓ |
  | Typical duration | ~45–60 min | ~60–90 min | ~90–120 min |

  Non-grooming pages replace the grid with a ✓-list per package (e.g. dog-walking: fixed walker · GPS route · photo update after every walk · water break · potty log — facts from `00-MASTER-PLAN.md` §3.2 only).
- **SEO slots.** H2 above the table = the "what is included…" long-tail from the page's `03-KEYWORD-MAP.md` §2 table (worked: **"What's included in every dog grooming package"**). Extractable `<table>` serves AI answers (P165).
- **Schema.** Inclusion names echo the Offer `name` strings in the Service node — keep wording identical.
- **Internal links.** Add-on mentions link siblings (worked: "Tick & Flea add-on ₹399" → `/ludhiana/tick-flea-treatment/`).
- **Mobile.** Real `<table>` with horizontal scroll + sticky first column (PriceMatrix wrapper spec); never stacked duplicate markup.

### SP-4 · Price matrix by size + mid-page CTA — `PriceMatrix.astro`

- **Purpose.** Self-serve quote in 10 seconds; owns every "price/charges" keyword; pre-qualifies WhatsApp chats.
- **Content formula.** `id="prices"`. The **canonical matrix from `06-CONVERSION-PLAYBOOK.md` §5.2 verbatim** (sizes, kg, breed examples, 9 prices), each row ending in `Book` → `/book/?service=<id>&size=<small|medium|large>&src=pricing_row` (`07-BOOKING-SPEC.md` §2 row 5). Directly beneath: reassurance lines R1 + R2 verbatim. Then the **mid-page CTA** per `07-BOOKING-SPEC.md` §2 row 4: `Book <Service> — from ₹<price>` → `/book/?service=<id>&src=service_<id>`. **Price rule (`00` §11 E2):** ₹<price> is the price of the service or plan the link preselects (dog walking preselects Trial Week, so its CTA shows that plan's price); when the link preselects nothing (`/book/?src=service_<page-slug>`), it is the page's lowest price. Every figure comes from `pricing.json`.
- **Worked example (`/ludhiana/dog-grooming/`):**

  | Size | Weight | Example breeds (Ludhiana favourites) | Bath & Brush | Full Groom | Premium Spa |
  |---|---|---|---|---|---|
  | Small | < 10 kg | Shih Tzu, Pomeranian, Lhasa Apso, Toy Poodle, Pug | ₹599 | ₹1,199 | ₹1,799 |
  | Medium | 10–25 kg | Beagle, Cocker Spaniel, most Indies | ₹799 | ₹1,499 | ₹2,199 |
  | Large | > 25 kg | Labrador, German Shepherd, Golden Retriever, Rottweiler | ₹999 | ₹1,899 | ₹2,799 |

  R1: "The price you see is the price you pay — confirmed on WhatsApp before we arrive." R2: **"No advance payment — pay by UPI or cash after the service."** CTA: `Book Dog Grooming — from ₹599`.
  Flat-price pages (cat ₹899/₹1,399 · puppy ₹699 · vet ₹699 + MRP · vaccination ₹199 + MRP · tick & flea ₹399 add-on/₹699 standalone · walking ₹2,999/₹4,999 per month + ₹699 trial) render the `06-CONVERSION-PLAYBOOK.md` §5.2 flat-price-line list instead of the matrix — same R1/R2 lines, same row-end `Book` links.
- **SEO slots.** H2 = the page's price long-tail (worked: **"Dog grooming price in Ludhiana — fixed, by size"**, carrying "dog grooming price ludhiana / charges" per `03-KEYWORD-MAP.md` §2.2). Prices sit in the top 30% of the page (P164).
- **Schema.** The Service node's `offers` array mirrors these exact figures (`04-TECHNICAL-SEO.md` §2.2); mismatch = launch blocker (P049).
- **Internal links.** Row `Book` links as above; one text link "Compare every service on the full price list" → `/pricing/` (satisfies `01-SITEMAP.md` §2.2's `/pricing/` link).
- **Mobile.** Horizontal scroll, sticky Size column, right-edge fade; `Book` targets ≥ 44 px.

### SP-5 · Before/after gallery — `BeforeAfter.astro`

- **Purpose.** "The before/after photograph is the single most persuasive content a grooming business can produce" (research teardown) — and no Ludhiana competitor has even one.
- **Content formula.** 2–4 pairs **of this page's service**, breeds matching the page's `03-KEYWORD-MAP.md` breed long-tails. Caption mandatory: `{Pet name} · {Breed} · {Service} · {Locality}`. Owner consent on WhatsApp before featuring; gallery footer note: "All photos shared with the pet parent's permission." Watermark `[FILL:DOMAIN]` on the after frame.
- **Worked example.** "Simba · Golden Retriever · Full Groom · Model Town" + "Momo · Shih Tzu · Premium Spa Groom · Sarabha Nagar". Alts: "Golden Retriever before full grooming at home in Model Town, Ludhiana" / "…after full grooming…".
- **Pre-launch rule.** No real pairs yet → **omit the block entirely** (never stock, never placeholders — `08-DESIGN-SYSTEM.md` §5.1). The build renders it only when the data file has ≥ 2 pairs for the service.
- **SEO slots.** H2: **"Before & after: real Ludhiana grooms"**. Breed names in alts/captions carry the breed long-tails truthfully (P056).
- **Schema.** None (ImageObject optional later; not Phase 1).
- **Internal links.** Caption localities may link that area page once live ("Model Town" → `/ludhiana/areas/model-town/`).
- **Mobile.** Pairs side-by-side 1fr/1fr (never stacked vertically — comparison is the point); grid 1-col base, 2-col ≥ md; lazy-loaded.

### SP-6 · How it works — `StepsStrip.astro`

- **Purpose.** Pre-live the appointment; collapse "how do I even book this?" into 4 taps.
- **Content formula.** The 4 steps verbatim from `04-TECHNICAL-SEO.md` §2.8: **Choose your service → Tell us about your pet → Pick your area and time slot → Confirm on WhatsApp** — each with its one-line text from that file. Under the strip, reassurance R4: "We bring everything — table, towels, warm-water gear. We just need a tap and a plug."
- **Worked example.** As above — the strings are fixed site-wide; no per-page variation.
- **SEO slots.** H2: **"How it works — booked in under 2 minutes"**. The booking long-tail ("online pet grooming booking ludhiana" family) lives here as body text per `03-KEYWORD-MAP.md` §2.
- **Schema.** None on service pages (HowTo markup lives only on `/how-it-works/` per `04-TECHNICAL-SEO.md` §2.9).
- **Internal links.** One text link "See the full process" → `/how-it-works/`.
- **Mobile.** Vertical list with numbered discs on a left rail; 4-up row ≥ md.

### SP-7 · Your groomer / your vet trust block — `GroomerCard.astro` (condensed)

- **Purpose.** Faces beat adjectives: no Ludhiana competitor shows a single real groomer (research finding #2); Mr n Mrs Pet's recycled profiles are the anti-pattern.
- **Content formula.** Block title **"Meet your groomers"** + supporting line verbatim: "No gig marketplace, no strangers — the same small, verified Ludhiana team every time." 2–3 condensed cards (photo · first name · Background-verified ✔ badge → `/safety-hygiene/` · years + speciality), content order law per `06-CONVERSION-PLAYBOOK.md` §4.2. `[FILL:GROOMER_1_NAME]` etc. until hired; **never publish a card for a person not yet on the team.** Vet/vaccination pages title the block **"Meet your vet"** and add the line "Registered veterinarians only — every medical service, no exceptions."
- **Worked example card.** Photo (branded apron + ID badge) · "[FILL:GROOMER_1_NAME]" · Background-verified ✔ · "[N] years experience · Shih Tzu & Lhasa coats".
- **SEO slots.** E-E-A-T surface (P046 applies on medical pages: `[FILL:VET_PARTNER_NAME]` + VCI reg. no. shown here).
- **Schema.** None.
- **Internal links.** Badge → `/safety-hygiene/`; "How we hire" text link → `/about/`.
- **Mobile.** Horizontal cards (96 px photo left) stacked 1-col; 3-up grid ≥ md.

### SP-8 · The PetDoorStep Promise band

- **Purpose.** The named guarantee (RoverProtect pattern) — PetDoorStep's biggest trust differentiator in this market.
- **Content formula.** 5-icon strip, copy **verbatim from `06-CONVERSION-PLAYBOOK.md` §4.1** (verified people · fresh sealed kit · fixed prices · on-time-or-₹100-off · photo proof). Point 4 ships **only after** the `00-MASTER-PLAN.md` §3.4 policy gate is confirmed — until then render 4 icons, never a softened fifth. Medical pages append the registered-vets line.
- **Worked example.** Icon strip labels: "Verified people, always." · "A fresh, sealed kit for every pet." · "Fixed, transparent prices." · "On time, or ₹100 off." · "Proof after every visit."
- **SEO slots.** Trust facts here are the `00-MASTER-PLAN.md` §3.4 claims Google's helpful-content test looks for (P042); keep claims identical sitewide (P166 entity consistency).
- **Schema.** None.
- **Internal links.** Band links "Read the full Promise" → `/safety-hygiene/`.
- **Mobile.** 2×2(+1) icon grid; 5-up row ≥ lg.

### SP-9 · Areas-served links block — `AreaCard.astro`

- **Purpose.** Silo glue: money page → 3 area pages (`01-SITEMAP.md` §2.2) with locality-anchored text; also answers "do you come to my area?".
- **Content formula.** Intro line: "We groom at homes across Ludhiana — these areas book {service} most:" + 3 `AreaCard`s from the **fixed assignment table below** + closing line listing the remaining §3.3 areas as plain text ("…and Civil Lines, Dugri, Pakhowal Road, South City, Ferozepur Road, Haibowal Kalan, Kitchlu Nagar — all of Ludhiana served." — the 7 areas the page does not card, in `00-MASTER-PLAN.md` §3.3 order; built from `src/data/content.ts` AREA_SLUGS minus the page's three). Anchor pattern: "{service} at home in {Area}" (`01-SITEMAP.md` §2.7). Cards for not-yet-live area pages render as plain text (`05-LOCAL-SEO.md` §6.10 staggered publishing).

  **Fixed money-page → area assignment (every area linked from ≥ 2 money pages; change only via Decision log):**

  | Money page | Links these 3 area pages |
  |---|---|
  | `/ludhiana/dog-grooming/` | Sarabha Nagar · Model Town · BRS Nagar |
  | `/ludhiana/cat-grooming/` | Civil Lines · Kitchlu Nagar · Sarabha Nagar |
  | `/ludhiana/dog-walking/` | Dugri · South City · Pakhowal Road |
  | `/ludhiana/vet-at-home/` | Civil Lines · Model Town · Haibowal Kalan |
  | `/ludhiana/dog-vaccination/` | Dugri · Haibowal Kalan · Ferozepur Road |
  | `/ludhiana/tick-flea-treatment/` | Ferozepur Road · South City · BRS Nagar |
  | `/ludhiana/puppy-grooming/` | Kitchlu Nagar · Pakhowal Road · Model Town |

- **Worked example anchor.** "dog grooming at home in Sarabha Nagar" → `/ludhiana/areas/sarabha-nagar/`.
- **SEO slots.** H2: **"Areas we serve in Ludhiana"**; the ten §3.3 locality names appear as crawlable text (P093 support, list format per P165).
- **Schema.** None here (areaServed lives in the LocalBusiness/Service nodes).
- **Internal links.** Exactly 3 area links + the implicit footer top-5 (never all 10 from body + footer combined — `02-SEO-PARAMETERS.md` P076).
- **Mobile.** 2-col compact cards base; 3-col ≥ md.

### SP-10 · FAQ — `Faq.astro`

- **Purpose.** Objection-handling layer + answer-engine surface (P160, P167); competitors earn zero FAQ coverage.
- **Content formula.** **6–8 questions** (inside `04-TECHNICAL-SEO.md` §2.3's 5–8 band), each a real query from the page's `03-KEYWORD-MAP.md` §2 FAQ rows, answered in 40–80 words, answer-first (P163). Mandatory coverage: price · safety/verification · kit hygiene · time taken · anxious/aggressive pets · payment (UPI/cash). Include 1–2 Hinglish phrasings per `03-KEYWORD-MAP.md` §5 (max two per page). Reuse `06-CONVERSION-PLAYBOOK.md` §6 objection answers verbatim where they match; answers gated by policy (free touch-up, stop-without-pay) stay out until confirmed.
- **Worked example (`/ludhiana/dog-grooming/`, 8 Qs).** The four `04-TECHNICAL-SEO.md` §2.3 worked Q&As verbatim (cost · areas covered · kit hygiene · large/anxious dogs) **plus**:
  5. *"How long does a home grooming session take?"* — "Bath & Brush takes about 45–60 minutes, a Full Groom 60–90 and a Premium Spa up to 120. We book slots so your groomer is never rushing your dog — last booking of the day is 17:30."
  6. *"What do you need from me at home?"* — "Just a tap point and a plug — we bring the table, towels, warm-water gear and dryer, and we leave your bathroom or balcony clean. You're welcome to stay and watch the whole groom; most pet parents do."
  7. *"Do you do medicated baths?"* — "Only vet-guided: if your dog has a prescribed medicated shampoo, our groomer will use it at no extra charge. We don't diagnose skin issues ourselves — for that, book a ₹699 vet home visit."
  8. *"Cash ya UPI — payment kaise hota hai?"* — "Jaise aapko easy lage: UPI or cash, after the service. No advance payment, koi hidden charges nahi — the WhatsApp-confirmed price is final."
- **SEO slots.** Each question is an H3 inside the FAQ H2 (**"Dog grooming at home — your questions"**); PAA phrasing verbatim (P167); long-tails from the keyword table land here.
- **Schema.** FAQPage node mirrors every visible Q&A word-for-word (`04-TECHNICAL-SEO.md` §2.3); expect no visual rich result (markup is for answer engines).
- **Internal links.** Answers link where named: `/pricing/`, `/ludhiana/vet-at-home/`, `/safety-hygiene/`, `/ludhiana/tick-flea-treatment/` (counts toward P071's 3–10 in-body links).
- **Mobile.** `<details>` accordion, zero JS, first item closed; 44 px summary rows.

### SP-11 · Related services — `ServiceCard.astro`

- **Purpose.** Silo cross-links (`01-SITEMAP.md` §2.2: 2–3 sibling services) + average-order-value nudge.
- **Content formula.** 2–3 sibling cards: photo · service name (= `01-SITEMAP.md` page name) · one-liner (≤ 70 chars, from that page's `06-CONVERSION-PLAYBOOK.md` §2.3 subhead) · `from ₹` chip. **Fixed sibling sets:** dog-grooming → puppy-grooming, tick-flea-treatment, cat-grooming · cat-grooming → dog-grooming, tick-flea-treatment · dog-walking → dog-grooming, vet-at-home · vet-at-home → dog-vaccination, tick-flea-treatment, dog-walking · dog-vaccination → vet-at-home, puppy-grooming · tick-flea-treatment → dog-grooming, vet-at-home · puppy-grooming → dog-vaccination, dog-grooming.
- **Worked example card.** Puppy Grooming — "A gentle first-time groom for puppies under 6 months." — `₹699 flat` → `/ludhiana/puppy-grooming/`.
- **SEO slots.** H2: **"Pet parents also book"**; descriptive anchors (P069).
- **Schema.** None.
- **Internal links.** The 2–3 sibling links + 1–2 supporting blog posts (the posts that name this page as primary money page in `10-CONTENT-CALENDAR.md` §2.2 — rendered as text links under the cards once published; this completes `01-SITEMAP.md` §2.2).
- **Mobile.** 1-col stack; 2–3-up ≥ md.
- **Built addition.** The block ends with the page's "Last updated {d Month yyyy}" line (`02-SEO-PARAMETERS.md` P143), read from `src/data/lastmod.ts` — the same date as the sitemap `<lastmod>`; it renders only once the path has a date there (decision W1L-12).

### SP-12 · Final CTA band — `CtaBand.astro`

- **Purpose.** Catch readiness at scroll end (CTA rhythm P153: after hero, after prices, after reviews, at page end).
- **Content formula.** H2 per `06-CONVERSION-PLAYBOOK.md` §9 R8 pattern: "Your {breed} deserves a stress-free {service} at home. Slots this week in {area}." (breed/area = the page's top examples, static text) + support line + [Book on WhatsApp] (page prefill per `07-BOOKING-SPEC.md` §5; `data-source="ctaband_<page-slug>"`, `09` §2d) + [Call [FILL:PHONE]] (on-dark, same source) + R3 reply-time line. This is the page-end CTA (`00` §11 E4).
- **Worked example.** "Your Labrador deserves a stress-free groom at home. Slots this week across Ludhiana." Support: "Fixed prices from ₹599 · no advance payment · photo update after the groom."
- **SEO slots.** None targeted — conversion block; keep keyword-natural.
- **Schema / Internal links.** None / the two CTAs only.
- **Mobile.** Stacked, centred, full-bleed brand-dark band.

### SP-13 · Sticky mobile bar + desktop float (site-wide chrome)

- **Purpose.** Keep Call/WhatsApp/Book in the thumb zone at every decision moment.
- **Spec.** `StickyBar.astro` < 768 px: `Call | WhatsApp | Book Now`, with the service-page variant label **"Book · from ₹{from-price}"** from `pricing.json`; behaviour + targets + `src` per `07-BOOKING-SPEC.md` §2 row 1; skin per `08-DESIGN-SYSTEM.md` §4.5. Desktop ≥ 768 px: `WaFloat.astro` with this page's prefill. Hidden on `/thank-you/` and while the widget is open. Events per the `09-ANALYTICS-TRACKING.md` §2 registry: `call_click` / `whatsapp_click` with `source: sticky_bar` (or `float_desktop`); Book is measured by the widget's `booking_started`.
- **Worked example label.** `Book · from ₹599` on `/ludhiana/dog-grooming/`.
- **Mobile.** 56 px + safe-area; 48 px targets; reserve layout space so it never causes CLS (P101).

---

## 2 · Page-level SEO & schema summary (apply to every money page)

1. **Title/H1/meta** from `03-KEYWORD-MAP.md` §3 formulas + the page's §2 worked row; title 50–60 chars (P011), primary keyword first (P012), `| PetDoorStep` suffix (P014).
2. **Keyword placement** per the `03-KEYWORD-MAP.md` §2 legend: primary = Title + H1 + first 100 words; secondaries = the H2s named in this template's blocks; long-tails = FAQ/H3s. Record each secondary→H2 assignment in the page blueprint before writing (P036).
3. **JSON-LD `@graph`:** Service (pattern `04-TECHNICAL-SEO.md` §2.2, offers = exactly the page's visible prices) + FAQPage (§2.3) + BreadcrumbList (§2.4). Validate per §2.0.6.
4. **Word floor:** ≥ 800 words (P044), reached by answering more questions — never padding.
5. **Internal-link quota** (P070): `/pricing/` + `/book/` + 2–3 siblings + 3 area pages + 1–2 blog posts — all satisfied by blocks SP-4/9/10/11 above; 3–10 contextual in-body links (P071).
6. **OG/canonical** per `04-TECHNICAL-SEO.md` §3–§4 (og:image = the page's own file from the §4 OG file list, else `/og/default.png`; `og:title` without the brand suffix; `og:image:alt` always set).

---

## 3 · CITY-HUB VARIANT — `/ludhiana/` (Wave 2)

The hub inherits this template with these substitutions (everything not named below stays as §1):

| Change | Spec |
|---|---|
| **Head** | Title: `Pet Care Services in Ludhiana – At Your Door \| PetDoorStep` (58). H1: **Pet Care Services in Ludhiana — All at Your Doorstep** (53). Meta (157): "All PetDoorStep pet care services in Ludhiana: grooming from ₹599, walking ₹2,999/mo, vet visit ₹699, vaccination ₹199 + MRP. Fixed prices. Book on WhatsApp." |
| **Keyword targeting** | Primary: *pet care services in ludhiana* (per `01-SITEMAP.md`). Secondaries: *pet care ludhiana* (intro), *pet grooming at home ludhiana* (services-grid H2 echo, links the dog-grooming page as the target — never compete with it), *doorstep pet care ludhiana* (subhead). When the hub ships, append its keyword table to `03-KEYWORD-MAP.md` §2 (same procedure `10-CONTENT-CALENDAR.md` §1 uses for new topics) so P033's no-cannibal check has a row to audit. |
| SP-0 Breadcrumb | 2 items: `Home › Ludhiana` (schema 2-item BreadcrumbList). |
| SP-1 Hero | H1 as above; subhead: "Grooming, walking, vet visits, vaccination and tick care — one background-verified Ludhiana team, fixed prices, booked on WhatsApp in 2 minutes." CTAs [Book on WhatsApp] + [See exact prices] → `/pricing/`. Chip row: `from ₹299` (lowest §3.2 entry: Nail Trim + Ear Clean) + standard 4 trust chips. |
| **SP-3 + SP-4 → Services grid** | Replaced by a 7-card `ServiceCard.astro` grid — one card per money page (name from `01-SITEMAP.md`, one-liner from `06-CONVERSION-PLAYBOOK.md` §2.3 subhead, `from ₹` chip from `pricing.json`, link to the money page). H2: **"Every service, one verified team"**. Grid: 1-col base · 2-col md · 3-col lg (3+3+1 centred). This block carries the hub's reason to exist: routing. |
| SP-5 gallery | Optional; include only with ≥ 3 cross-service pairs. |
| **SP-9 → Areas grid** | Expanded to all **10** `AreaCard.astro` cards (the `00-MASTER-PLAN.md` §3.3 set; card one-liners from `_TEMPLATE-area-page.md` §2 data table). H2: **"Pick your area"**. Not-yet-live areas render as plain text cards. |
| SP-10 FAQ | 4 hub-level Qs (coverage, hours 9:00–19:00, how booking works, "why no app" — answer: "No app. No login. Book in 90 seconds on WhatsApp."). **Plain HTML only — no FAQPage markup on the hub** (schema matrix `04-TECHNICAL-SEO.md` §2.9 gives the hub BreadcrumbList + WebPage only). |
| SP-11 Related services | Dropped (the services grid already does this). |
| **Schema** | `@graph` = BreadcrumbList + `WebPage` node with `about: {"@id": "https://[FILL:DOMAIN]/#business"}` — exactly `04-TECHNICAL-SEO.md` §2.9. No Service node, no FAQPage. |
| Internal links | The hub links: all 7 money pages + all live area pages + `/pricing/` + `/book/` + `/how-it-works/`. Every money page's breadcrumb starts linking "Ludhiana" the day the hub ships. |

---

## 4 · Required to ship (per page — all boxes ticked before `01-SITEMAP.md` status moves to `built`)

- [ ] URL character-identical to `01-SITEMAP.md` (P001); research-style slugs mapped onto it, never adopted
- [ ] All 14 blocks present in §1 order (hub: §3 substitutions); none invented, none dropped
- [ ] Title 50–60 chars, primary keyword first, `| PetDoorStep` suffix (P011/P012/P014); H1 = `03-KEYWORD-MAP.md` formula, unique sitewide (P026/P027)
- [ ] Meta description 120–158 chars, keyword + Ludhiana in first 100, one CTA + one trust fact (P019–P021)
- [ ] Every ₹ figure identical to `00-MASTER-PLAN.md` §3.2 / `pricing.json` — hero chip, subhead, tables, FAQ, schema, sticky-bar label all match (P049; launch gate `00-MASTER-PLAN.md` §9.5)
- [ ] Price matrix is a real `<table>` with R1 + R2 lines beneath (P156, P165)
- [ ] 4 trust chips + from-₹ chip in hero; fold test passed at 360×640 above the sticky bar (SP-1 Mobile, P150, P155), or Sunny's P150 exception logged in `00` §11
- [ ] CTA rhythm: hero → CTA row after SP-2 reviews (E4) → mid-page CTA after the matrix → CtaBand; one primary per viewport (P151/P153); all CTAs carry correct `src` per `07-BOOKING-SPEC.md` §2 and `09` §2d
- [ ] 6–8 FAQ Q&As visible and mirrored verbatim in FAQPage markup (P160; `04-TECHNICAL-SEO.md` §2.0.3)
- [ ] Link quota filled: `/pricing/` + `/book/` + fixed siblings (SP-11) + fixed 3 areas (SP-9) + 1–2 calendar-named blog posts (P070); zero "click here" anchors (P069); zero links to unpublished URLs (render as text until live — P074)
- [ ] Schema `@graph` (Service + FAQPage + BreadcrumbList; hub: Breadcrumb + WebPage) passes Rich Results Test + validator.schema.org with zero errors (P087); **no Review/aggregateRating anywhere**
- [ ] Real photos only — no stock, no placeholder imagery; hero eager + preloaded, alts per `08-DESIGN-SYSTEM.md` §5.4 (P056, P063)
- [ ] ≥ 800 words; every claim true today (policy-gated lines held back until `00-MASTER-PLAN.md` §3.4 confirmations)
- [ ] `grep "FILL:"` on the built page returns only tokens scheduled for pre-launch fill (`00-MASTER-PLAN.md` §8 gate)
- [ ] Full `02-SEO-PARAMETERS.md` audit row created; all [Launch-blocker] items pass before `audited`

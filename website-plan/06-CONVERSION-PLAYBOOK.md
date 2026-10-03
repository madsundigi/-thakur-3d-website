# 06 · CONVERSION PLAYBOOK — CRO & copy law for every page

> This file owns conversion rules and copy voice for every page: hero formulas, CTA system, trust blocks, price display, objection handling, offers and microcopy. It obeys `00-MASTER-PLAN.md` (facts from §3 only, URLs from `01-SITEMAP.md` only, placeholders per 00 §8).

**How to use this file:** anyone writing or reviewing page copy applies §1–§9 below. Page-level block order lives in `blueprints/<page>.md`; booking-widget behaviour lives in `07-BOOKING-SPEC.md`; colours/typography/components live in `08-DESIGN-SYSTEM.md`; event names live in `09-ANALYTICS-TRACKING.md`. Where copy below depends on a business policy not yet confirmed by Sunny, it is flagged **[POLICY GATE]** — publish only after the matching 00 §3.4 confirmation.

---

## 1 · Voice & tone — 8 rules

Summary (from 00 §7): warm, confident, specific; simple English a Ludhiana pet parent reads effortlessly; Hinglish only as seasoning in FAQs/testimonials/support lines; pets are **family members**, never "animals".

| # | Rule | ❌ Bad (never publish) | ✅ Good (publishable) |
|---|------|------------------------|------------------------|
| 1 | **Pets are family, never "animals" or "it".** Use the pet's name or "your dog/your cat/your pet"; pronoun "they". | "We groom all animals safely. The animal is handled by trained staff." | "Bruno is family — so we groom him like family, right at your home." |
| 2 | **Specific beats generic.** Every claim carries a number, a name, a locality or a timeframe. | "We offer affordable, high-quality grooming services across the city." | "Full Groom for a Labrador: ₹1,899 at your home in Sarabha Nagar, 60–90 minutes, photo update after." |
| 3 | **Simple Indian English.** Short sentences (≤ 18 words). Everyday words: "comes to your home", not "doorstep service delivery paradigm". No corporate jargon ("leverage", "solutions", "end-to-end"). | "We leverage a holistic, end-to-end pet wellness solution ecosystem." | "One groomer. Your home. Everything brought along — table, towels, warm water gear." |
| 4 | **Hinglish is seasoning, not the dish.** Allowed ONLY in: FAQ answers, testimonials (as spoken), the 00 §3.1 support line, and one-liner reassurances. Never in H1s, nav, buttons, prices or legal text. | H1: "Ghar pe full groom karwao, tension-free!" | FAQ answer ending: "…and payment is after the service — cash ya UPI, jo aapko easy lage." |
| 5 | **Talk to one pet parent (second person).** "You" and "your", never "our customers" or "clients" in body copy. | "Customers can avail our services by contacting our team." | "You pick the time. We come to you. You pay after you've seen the result." |
| 6 | **Honest or silent.** No fake urgency, no invented stats, no claims we can't prove with a link or a photo. Numbers (rating, pets groomed) come from one Astro data file and update monthly. | "Hurry! Only 2 slots left today! 10,000+ happy customers!" (pre-launch) | "★ [FILL:GOOGLE_RATING] on Google from [FILL:REVIEW_COUNT] Ludhiana pet parents — read them yourself." (links to [FILL:GBP_LINK]) |
| 7 | **Active voice, verbs first.** Buttons and headings start with a verb or the outcome; avoid passive and noun-stacks. | "Bookings can be made via the WhatsApp facility provided." | "Book on WhatsApp — takes 60 seconds." |
| 8 | **Reassure at the moment of anxiety, not in a far-away paragraph.** Each scary step (price, stranger-at-home, payment) gets its reassurance line placed immediately beside it. | Pricing table with no note; hygiene info buried on `/safety-hygiene/` only. | Under every price table: "The price you see is the price you pay — confirmed on WhatsApp before we arrive." Next to the booking button: "No advance payment — pay by UPI/cash after the service." |

**Banned words/phrases in customer-facing copy:** "animals", "cheap", "best in class", "world-class", "state-of-the-art", "avail", "do the needful", "hurry", "limited time" (unless a real dated offer), "TBD".

---

## 2 · Above-the-fold formula

### 2.1 The formula

Every hero = **[Keyword-true H1] + [emotional/benefit subhead] + [primary CTA + secondary CTA] + [4 trust chips] + [real photo]** — all visible in one screen on a 360 px phone. H1 wording must carry the page's primary keyword from `03-KEYWORD-MAP.md`; the emotional hook (Barkbus finding: sell the relationship and the outcome, not the task) lives in the subhead or an eyebrow line, never at the cost of the keyword H1. Photo rules: real groomer + real pet at a real Ludhiana home per §4.3 — never stock (`08-DESIGN-SYSTEM.md` imagery section).

**Standard trust-chip set** (from 00 §3.4; reuse verbatim unless a page-specific chip below overrides one):
`✔ Background-verified groomers` · `✔ Sealed sanitised kit per pet` · `✔ Fixed prices — no doorstep bargaining` · `✔ Photo update after every visit`

### 2.2 Headline pattern library (6 patterns)

| # | Pattern | Template | Example |
|---|---------|----------|---------|
| P1 | **Emotional identity** (Barkbus) | "Your {pet} has a {family-word}. Now they have a {role} who comes home." | "Your dog has a family. Now they have a groomer who comes home." |
| P2 | **Service + place + doorstep** (keyword-true workhorse) | "{Service} at Home in {Ludhiana/Locality}" | "Dog Grooming at Home in Ludhiana" |
| P3 | **Price-anchor promise** | "{Service} from ₹{price} — fixed price, no surprises" | "Full Groom at home from ₹1,199 — fixed price, no surprises" |
| P4 | **Neighbourhood trust** (Rover) | "Trusted {service} in {locality list} & all of Ludhiana" | "Trusted doorstep pet care in Sarabha Nagar, BRS Nagar, Model Town & all of Ludhiana" |
| P5 | **Anti-salon contrast** | "No {pain 1}. No {pain 2}. No {pain 3}. Just {outcome at home}." | "No cages. No car rides. No waiting rooms. Just a calm groom in your own home." |
| P6 | **Question + credential** (Vetic style) | "Looking for {need}? {Credentialed answer}." | "Looking for a vet who comes home? Registered veterinarians, at your door in Ludhiana." |

Use P2/P3 for H1 on money pages (SEO), P1/P5 as subheads, P4 on home/area pages, P6 for vet/medical pages.

### 2.3 Ready heroes (copy-paste for blueprints)

All CTA pairs follow §3. Prices from 00 §3.2 only. Hero photo briefs are in each page blueprint. **Every hero primary links to the booking form** `/book/?src=hero_<page-slug>` (`07` §2 row 3; `00` §11 E1 and D2, 2026-10-03) and renders amber even when its label says "WhatsApp" (`08` §1.4 rule 2). Below `md` the secondary CTA and the eyebrow are hidden (`08` §4.6 fold law).

**HOME `/`**
- Eyebrow: *Pet care at your doorstep* (tagline, 00 §3.1)
- H1: **Pet Grooming & Pet Care at Home in Ludhiana**
- Alt H1 (A/B after launch): **Your dog has a family. Now they have a groomer who comes home.** (then the keyword line becomes the subhead)
- Subhead: "Grooming, walking and vet visits at your door — background-verified professionals, sealed sanitised kit, fixed prices from ₹299. Serving Sarabha Nagar, BRS Nagar, Model Town & all of Ludhiana."
- CTA: [Book on WhatsApp] + [Call [FILL:PHONE]]
- Trust chips: standard set.

**`/ludhiana/dog-grooming/`**
- H1: **Dog Grooming at Home in Ludhiana**
- Subhead: "One trained groomer, your verandah or balcony, 60–90 calm minutes. Bath & Brush from ₹599 · Full Groom from ₹1,199 — exact price fixed before we arrive."
- CTA: [Book on WhatsApp] → `/book/?src=hero_dog-grooming` + [See exact prices] (anchors to on-page price matrix)
- Trust chips: standard set.

**`/ludhiana/cat-grooming/`**
- H1: **Cat Grooming at Home in Ludhiana**
- Subhead: "Calm-handling trained groomers for your cat — no car ride, no strange salon smells. Bath & Brush ₹899 · Full Groom ₹1,399, flat price for all cats."
- CTA: [Book on WhatsApp] → `/book/?src=hero_cat-grooming` + [Call [FILL:PHONE]]
- Trust chips: swap chip 4 → `✔ Calm-handling trained for cats`.

**`/ludhiana/dog-walking/`**
- H1: **Dog Walker in Ludhiana — Daily Walks from ₹2,999/month**
- Subhead: "The same fixed, verified walker every day, with GPS route and photo update after every walk. Try a full week for ₹699 before you commit."
- CTA: [Start ₹699 Trial Week] → the booking form `/book/?service=dog-walking&src=hero_dog-walking`, Trial Week preselected (`00` §11 D2; not a wa.me link) + [Call [FILL:PHONE]]
- Trust chips: `✔ Fixed verified walker` · `✔ GPS + photo after every walk` · `✔ Fixed monthly price` · `✔ Background-verified`.

**`/ludhiana/vet-at-home/`**
- H1: **Vet at Home in Ludhiana** (eyebrow: *Vet home visit, Ludhiana* — final per `blueprints/vet-at-home.md`)
- Subhead: "A registered veterinarian examines your pet at home — no stressful clinic trip. ₹699 consult; medicines and vaccines at MRP, bill shown to you."
- CTA: [Book Vet on WhatsApp] → `/book/?src=hero_vet-at-home` + [Call [FILL:PHONE]]
- Trust chips: `✔ Registered veterinarians only` · `✔ Medicines at MRP — bill shown` · `✔ Fixed visit fee ₹699` · `✔ Mon–Sun 9:00–19:00`.

**`/ludhiana/dog-vaccination/`**
- H1: **Dog Vaccination at Home in Ludhiana** (price lives in the chip + subhead — final per `blueprints/dog-vaccination.md`)
- Subhead: "Registered vet, cold-chain carried vaccine, done in your living room — with a reminder calendar so you never miss a due date."
- CTA: [Book Vaccination on WhatsApp] + [Call [FILL:PHONE]]
- Trust chips: `✔ Registered veterinarians only` · `✔ Vaccine at MRP — wrapper shown` · `✔ ₹199 fixed service fee` · `✔ Free reminder calendar`.

**`/ludhiana/tick-flea-treatment/`**
- H1: **Tick & Flea Treatment for Dogs in Ludhiana — At Your Home**
- Subhead: "Ticks love Punjab's monsoon. We don't. Standalone treatment ₹699, or add it to any groom for ₹399 — sealed fresh kit, every single pet."
- CTA: [Book on WhatsApp] + [Call [FILL:PHONE]]
- Trust chips: standard set.

**`/ludhiana/puppy-grooming/`**
- H1: **Puppy Grooming at Home in Ludhiana — First Groom ₹699**
- Subhead: "A gentle first-time groom for puppies under 6 months — short sessions, lots of breaks, treats allowed. One flat price: ₹699, any breed."
- CTA: [Book Puppy's First Groom] + [Call [FILL:PHONE]]
- Trust chips: `✔ Gentle first-time handling` · `✔ ₹699 flat, any breed` · `✔ Sealed sanitised kit` · `✔ Photo update for the family`.

**Area pages `/ludhiana/areas/<area>/`** (pattern — exact per-area copy in `blueprints/_TEMPLATE-area-page.md`):
- H1: **Pet Grooming at Home in {Area}, Ludhiana**
- Subhead: "{Area} pet parents book us for doorstep grooming, walking and vet visits — usually with same-week slots. Bath & Brush from ₹599, fixed price."
- CTA: [Book on WhatsApp] + [Call [FILL:PHONE]] · Trust chips: standard set.

**`/pricing/` and `/book/`** heroes are owned by their blueprints but must follow §2.1 formula and §5 price rules.

---

## 3 · CTA system

### 3.1 Hierarchy

| Level | CTA | Behaviour |
|---|---|---|
| **Primary** | **"Book on WhatsApp"** | Context decides target: in every hero it links to the booking form `/book/?src=hero_<page-slug>` (`07` §2 row 3; `00` §11 E1/D2), and the widget's last step hands over to WhatsApp; on `/book/` it is the widget itself; everywhere else (e.g. the page-end `CtaBand`) it is a `wa.me/[FILL:WHATSAPP_NUMBER]?text=<page-specific prefill>` deep link. Prefill payloads + ref codes are specified in `07-BOOKING-SPEC.md`. Styled as the WhatsApp-green solid button on wa.me links only; a link to `/book/` is the amber primary button (`08-DESIGN-SYSTEM.md` §1.4 rules 1–2). |
| **Secondary** | **Call** | `tel:[FILL:PHONE]` click-to-call. Outline/ghost style. Always shows the number itself on desktop ("Call [FILL:PHONE]") — a visible number is itself a trust signal. |
| **Tertiary** (optional, max 1 per screen) | "See exact prices" / "How it works" | In-page anchor or internal link; text link or quiet button. Never competes visually with primary. |

Rules: exactly one primary CTA per viewport-height of content; every money page repeats the primary CTA after the price table, after reviews, and at page end; reply-time promise sits near the first primary CTA: **"A real person replies on WhatsApp within 10 minutes, 9:00–19:00."** (a confirmed operational fact, 00 §3.1, `00` §11 D3 2026-10-03). Never promise a call-back time: calls are not staffed for call-backs (D3).

### 3.2 Button label bank (use these; never "Submit", "Click here", "Learn more" on money pages)

- Book on WhatsApp
- Book Now
- See price & book →
- Confirm on WhatsApp →  *(booking widget final step only, per 07)*
- Call [FILL:PHONE]
- See exact prices
- Start ₹699 Trial Week
- Book Puppy's First Groom
- Book Vet on WhatsApp
- Join Groom Club
- Get ₹200 off — first groom  *(offer contexts only, §7)*
- Check my area  *(area-coverage widget)*
- WhatsApp us

### 3.3 Sticky mobile action bar (site-wide spec)

- **Visibility:** fixed to viewport bottom, **always visible at < 768px**; hidden ≥ 768px (desktop uses sticky-header Book Now instead); hidden while the booking widget is open and on `/thank-you/`.
- **Height:** **56px** + `env(safe-area-inset-bottom)` padding; each tap target ≥ 48px.
- **3 buttons, left → right:** `Call` | `WhatsApp` | `Book Now`, in a `1fr | 1fr | 1.4fr` grid — Book Now is widest.
  - **Call** → `tel:[FILL:PHONE]`; icon + "Call"; surface-colour background, teal text (tokens from `08-DESIGN-SYSTEM.md`).
  - **WhatsApp** → `wa.me` deep link with the current page's prefill; icon + "WhatsApp"; WhatsApp-green token from 08.
  - **Book Now** → opens booking widget (or `/book/` as fallback); amber primary-CTA token from 08; boldest treatment.
- **Service pages variant:** Book Now label carries the live from-price for that page: "Book · from ₹1,199".
- Exact hex values, radii, elevation, icons: `08-DESIGN-SYSTEM.md` (this file owns behaviour + labels only). Tap events per the `09-ANALYTICS-TRACKING.md` §2 registry (its names win, `00` §11 2026-10-02): Call fires `call_click` and WhatsApp fires `whatsapp_click`, both with `source: sticky_bar`; Book Now is a plain link to `/book/?src=sticky_bar`, measured by the widget's `booking_started`.

---

## 4 · Trust system

### 4.1 The named guarantee — **"The PetDoorStep Promise"**

One named program (RoverProtect pattern) instead of scattered reassurances. Rendered as a 5-icon strip on every page + a full block on `/safety-hygiene/` and `/about/`. Publishable copy (facts from 00 §3.4 — do not reword the commitments, only the prose):

> ### The PetDoorStep Promise
> 1. **Verified people, always.** Every groomer and walker is background-verified before their first visit — ID checked, references called. You'll know who is coming before the doorbell rings.
> 2. **A fresh, sealed kit for every pet.** Blades and towels come sealed and sanitised, opened in front of you. Nothing used on another pet ever touches yours.
> 3. **Fixed, transparent prices.** The price on this website is the price you pay — confirmed on WhatsApp before we arrive. No doorstep bargaining, no surprise add-ons.
> 4. **On time, or ₹100 off.** If we miss your confirmed slot window, your visit costs ₹100 less. Simple. **[POLICY GATE — confirm per 00 §3.4 before publishing]**
> 5. **Proof after every visit.** A photo update lands on your WhatsApp after every groom and every walk — see exactly how it went.

On medical pages, append: **"Registered veterinarians only — every medical service, no exceptions."** (00 §3.4).

### 4.2 Verified-groomer profile card — content spec

Shown on `/about/`, service pages (condensed), and in the WhatsApp booking confirmation (per `07-BOOKING-SPEC.md`). Each card contains, in order:

1. Real photo (branded apron + ID badge visible; photo rules §4.3)
2. First name — `[FILL:GROOMER_1_NAME]` etc. until hired
3. "Background-verified ✔" badge (links to `/safety-hygiene/`)
4. Years of experience (real number)
5. Speciality, one line (e.g. "Shih Tzu & Lhasa coats", "anxious and senior dogs", "Persian cat de-matting")
6. Languages: Punjabi / Hindi / English (list only what's true)
7. One human line, ≤ 20 words (e.g. "Has groomed 800+ dogs; his own Indie is called Sheru.")
8. "Pets groomed" counter — only once the real count exists; never fabricate.

Sitewide block title: **"Meet your groomers"**. Supporting line: "No gig marketplace, no strangers — the same small, verified Ludhiana team every time."

### 4.3 Before/after gallery rules

- **Real pets only**, groomed by us, photographed at the actual visit. No stock, no sourced images, ever.
- Caption format (mandatory): **"{Pet name} · {Breed} · {Service} · {Locality}"** — e.g. "Simba · Golden Retriever · Full Groom · Model Town".
- **Consent:** owner's okay collected on WhatsApp before featuring ("Okay to feature Simba's photos on our website/Instagram? Reply YES"); store the reply. Footer note on gallery: "All photos shared with the pet parent's permission."
- Pairs shot same angle/light where possible; filter chips by breed: Shih Tzu · Labrador · German Shepherd · Golden Retriever · Beagle · Pomeranian · Indie · Persian cat.
- Corner watermark: `[FILL:DOMAIN]` (photos travel in Ludhiana pet WhatsApp groups — free distribution).
- Rotate so each area page shows pets from that locality where available.

### 4.4 Review display rules

- **Source of truth = Google reviews** (GBP, engine in `05-LOCAL-SEO.md`). Sitewide proof line: "★ [FILL:GOOGLE_RATING] on Google · [FILL:REVIEW_COUNT]+ Ludhiana pet parents" — always linked to [FILL:GBP_LINK] (verifiability beats volume; thePetNest's self-hosted "1 lakh reviews" can't be checked — ours can).
- Review card contents: quote (2–3 lines) · owner first name · **locality** · pet name + breed · service taken · 5-star row · month-year. Example seed format: `[FILL:REVIEW_1]` = "Bruno hates car rides, so home grooming was a blessing. On time, polite, and the bathroom was left spotless. — Simran, Sarabha Nagar · Bruno (Golden Retriever) · Full Groom".
- Locality-tagged rotation: each area page shows 2–3 reviews from that locality (or nearest) — reviews double as unique local content.
- Numbers live in one Astro data file, refreshed monthly (`09-ANALYTICS-TRACKING.md` ritual). Never display a rating/count that GBP doesn't back. No self-serving review stars in schema (per `01-SITEMAP.md` note + `04-TECHNICAL-SEO.md`).

---

## 5 · Price transparency rules

1. **Exact ₹ figures from 00 §3.2 on every page that mentions a service.** Never "starting at" unless coat condition genuinely varies the price — and then the variance is stated ("severe matting may add de-matting, quoted before we start, never after").
2. **The canonical size matrix** (reuse everywhere; kg guide from 00 §3.2):

| Size | Weight | Example breeds (Ludhiana favourites) | Bath & Brush | Full Groom | Premium Spa |
|---|---|---|---|---|---|
| Small | < 10 kg | Shih Tzu, Pomeranian, Lhasa Apso, Toy Poodle, Pug | ₹599 | ₹1,199 | ₹1,799 |
| Medium | 10–25 kg | Beagle, Cocker Spaniel, most Indies | ₹799 | ₹1,499 | ₹2,199 |
| Large | > 25 kg | Labrador, German Shepherd, Golden Retriever, Rottweiler | ₹999 | ₹1,899 | ₹2,799 |

   Flat-price lines shown beneath the matrix: Puppy Intro Groom (< 6 months) ₹699 · Cat Bath & Brush ₹899 / Cat Full Groom ₹1,399 · Nail Trim + Ear Clean ₹299 · Tick & Flea add-on ₹399 / standalone ₹699 · Vet visit ₹699 + MRP · Vaccination ₹199 + vaccine MRP · Deworming ₹499 · Walking ₹2,999/mo (1 walk/day) · ₹4,999/mo (2 walks/day) · Trial Week ₹699.
3. **Every package card lists its ✓-inclusions** (from the 00 §3.2 service definitions) — an itemised list makes the price feel bigger-value and kills "what's extra?" doubt. Nothing is extra except clearly flagged add-ons.
4. **The two mandatory reassurance lines**, placed directly under every price table and on the booking widget's final step:
   - "The price you see is the price you pay — confirmed on WhatsApp before we arrive. No surprise charges at your door."
   - **"No advance payment — pay by UPI or cash after the service."**
5. **Duration labels** on package cards (Vetic pattern): Bath & Brush ~45–60 min · Full Groom ~60–90 min · Premium Spa ~90–120 min.
6. **Competitor/market price mentions** (e.g. on `/pricing/` context block or blog rate-card posts) may cite: thePetNest Ludhiana ₹899–₹1,599, Mr n Mrs Pet ₹999–₹2,799, Urban Pets Grooming ₹2,000–₹2,300 — always with the caveat *"market prices mined from SERP snippets 2026-10; re-verify before publishing"* and never implying our prices change with theirs.
7. Prices appear identically on `/pricing/`, every service page, and the booking widget — one source file; mismatch is a launch blocker (00 §9.5).

---

## 6 · Objection handling — the 7 answers

Publish these in `/faq/` and the matching service-page FAQ accordions (FAQPage schema per `04-TECHNICAL-SEO.md`). Wording is final publishable copy.

1. **"A stranger in my home?"**
   Every PetDoorStep groomer is background-verified before their first visit — ID checked and references called. You get your groomer's name and photo on WhatsApp before they arrive, and they carry an ID badge at your door. You (or any family member) can stay and watch the whole groom — most pet parents do.

2. **"Will they handle my dog roughly?"**
   Our groomers are trained for calm, patient handling — breaks, treats and slow introductions are part of the job, not a favour. You're right there through the session, and we send photo updates as we go. If your dog is anxious, tell us in the booking notes and we'll plan extra time at no extra charge.

3. **"Will there be hidden charges at the door?"**
   No. The price on this website is the price you pay, confirmed on WhatsApp before we arrive — no doorstep bargaining, ever. The only possible addition is a clearly flagged add-on like de-matting for a severely matted coat, and we tell you before we start, never after.

4. **"My dog bites / is aggressive."**
   Tell us while booking — we assign a groomer experienced with reactive dogs and go muzzle-friendly, slow and reward-based. For a nervous first-timer, ask for a free 10-minute meet-and-greet at your door before you confirm anything. If on the day your dog is too stressed to continue safely, we stop and you don't pay.  **[POLICY GATE — "don't pay if we stop" needs Sunny's confirmation, same gate as 00 §3.4 on-time promise]**

5. **"Is home grooming really hygienic?"**
   Often more hygienic than a salon: your pet is the only pet. Blades and towels arrive sealed and sanitised and are opened in front of you; our full protocol is published at `/safety-hygiene/`. We need just a tap point and a plug — we bring everything else and leave your bathroom or balcony clean.

6. **"Why not just go to a salon?"**
   No car ride, no cages, no waiting room full of barking strangers — the top three stress triggers for most pets. At home your pet gets one groomer's full attention for 60–90 minutes, and you see everything. Same professional result, minus the stress (and your afternoon back).

7. **"What if I'm not happy with the result?"**
   Tell us on WhatsApp within 24 hours with a photo, and we'll send the groomer back for a free touch-up visit. We'd rather fix a haircut than lose a family. **[POLICY GATE — free touch-up policy needs Sunny's confirmation before publishing; until then this answer is held back]**

---

## 7 · Offers

All offers live on `/offers/` and are echoed on relevant service pages. Every offer states its exact terms — no asterisks hiding conditions.

### 7.1 Launch offer — code **FIRSTGROOM**
- **₹200 off your first Full Groom or Premium Spa + a free Nail Trim + Ear Clean visit (₹299 value) between grooms**, redeemable within 45 days of the first visit.
- Mechanics: customer sends code FIRSTGROOM in the WhatsApp booking message (widget appends it automatically for first-timers — see `07-BOOKING-SPEC.md`); one use per household; no minimum beyond the qualifying service.
- Display copy: "New here? **₹200 off your first groom** + a free nail-trim visit on us. Code **FIRSTGROOM** — applied automatically when you book."

### 7.2 Referral — "Friends with benefits (the pet kind)"
- **₹150 off for you, ₹150 off for them.** Your friend quotes your name/number on their first booking; you get ₹150 off your next service, they get ₹150 off their first. No cap on referrals. **One discount per booking — the larger applies:** if the friend's first booking is a Full Groom or Premium Spa, FIRSTGROOM's ₹200 replaces their ₹150 (you still get yours). Same rule on `/offers/`.
- Display copy: "Love your groomer? Share them. Your friend gets ₹150 off their first groom, you get ₹150 off your next one."

### 7.3 Groom Club (the retention product — 00 §3.2)
Pitch copy (use on `/offers/`, `/pricing/`, and post-service WhatsApp — the WhatsApp use only for customers who replied YES, `00` §11 D4):
> **Groom Club — your pet's standing appointment.**
> One Full Groom every month at **15% off** (Small ₹1,019 · Medium ₹1,274 · Large ₹1,614 — you save ₹180–₹285 every month), plus a **free nail-trim visit** between grooms and **priority slots** (first pick of weekend times). Same groomer every visit on request. Pay per visit as always — UPI or cash after the service, cancel anytime on WhatsApp.
- CTA: [Join Groom Club] → WhatsApp prefill per 07 (`source: groomclub`, `09` §2d).

### 7.4 Honesty rules (absolute)
- **No fake urgency or scarcity, ever.** No countdown timers, no "only 2 slots left" unless it reflects real capacity for a real date, no "offer ends tonight" that renews tomorrow.
- No inflated strikethrough prices (the Urban Pets "₹500 permanent coupon" pattern is banned). Strikethroughs only for a genuinely temporary, dated offer against our real standard price.
- Every offer shows its full terms where it's advertised. Offers end on their stated date or are honestly extended with a new date.

---

## 8 · Form & widget CRO rules

(Full flow, payloads, fields and edge cases are owned by `07-BOOKING-SPEC.md` — these are the binding CRO constraints it implements.)

1. **3–5 fields per step, 5 steps + a review screen** (`07` §3: Area · Service · Pet · Time · Contact — the built widget; 07 owns the flow). Easiest questions first (area, service, pet type, size as tap-chips); personal details (name, phone) last.
2. **Progress dots** + "Step X of 5" always visible. Never imply more steps than exist.
3. **Live price ribbon**: the moment size + package are chosen, pin `Your price: ₹1,499 · Full Groom · Medium` (`07` §3 wording) on screen through all remaining steps.
4. **Chips and selects over typing**; the only free text is breed and note (both optional), your name, and an area name when "Other area in Ludhiana" is picked (`07` §3).
5. **Error microcopy is inline, specific and kind — never browser alerts.** The widget's verbatim strings live in `07` §3 (they win over the older E1–E3 drafts in §9).
6. **Honest slots:** time windows are "preferred", with the line "We confirm your exact slot on WhatsApp within 10 minutes" — never fake a live-availability grid (Urban Company's documented failure).
7. **State persists** (localStorage) with a resume banner on return: "Welcome back! Continue your booking — {service_label} in {area}." (`07` §6).
8. **Out-of-area is a lead, not a dead end:** "Outside Ludhiana" choice captures a WhatsApp number for the waitlist.
9. Final step always shows the §5.4 no-advance-payment line, and the primary button reads "Confirm on WhatsApp →".

---

## 9 · Microcopy bank

Ready strings — copy verbatim. (B = button, R = reassurance, E = error/empty, T = thank-you, W = WhatsApp auto-reply.)

**Buttons** — see full bank in §3.2; canonical primary/secondary: `Book on WhatsApp` / `Call [FILL:PHONE]`.

| # | Context | String |
|---|---------|--------|
| R1 | Under any price table | The price you see is the price you pay — confirmed on WhatsApp before we arrive. |
| R2 | Beside booking CTA / widget final step | No advance payment — pay by UPI or cash after the service. |
| R3 | Near first CTA on every page | A real person replies on WhatsApp within 10 minutes, 9:00–19:00. |
| R4 | Hero / how-it-works | We bring everything — table, towels, warm-water gear. We just need a tap and a plug. |
| R5 | Booking widget step 1 | Takes about 60 seconds. No app, no login, no payment now. |
| R6 | Anxious-pet note field placeholder | Anything we should know? (first groom, anxious, skin issues, senior pet…) |
| R7 | Slot step | We confirm your exact slot on WhatsApp within 10 minutes. |
| R8 | Service page footer CTA | Your {breed} deserves a stress-free groom at home. Slots this week in {area}. |
| E1 | Phone field invalid | That number looks short — WhatsApp numbers have 10 digits (we'll add +91). *(Inside the booking widget the `07` §3 Step 5 string is used verbatim instead.)* |
| E2 | Required chip not picked | Pick one to continue — tap the option that fits best. *(Inside the widget: the `07` §3 per-step strings.)* |
| E3 | Outside-area selection | We're not in your area yet — but we're expanding. Leave your WhatsApp number and you'll be first to know (plus ₹200 off your first groom when we arrive). *(Inside the widget: the `07` §3 Step 1 waitlist copy; the ₹200 also appears in `faq.md` faq-a1.)* |
| E4 | Widget failed to open WhatsApp (desktop, no app) | WhatsApp didn't open? No problem — message us directly at [FILL:WHATSAPP_NUMBER] or call [FILL:PHONE]. |
| E5 | 404 page | This page wandered off like an unleashed Beagle. Head home, or book a groom while you're here. |
| E6 | Empty reviews section (pre-launch) | Fresh reviews coming soon — we're new in Ludhiana and earning them one happy pet at a time. Read our live Google reviews at [FILL:GBP_LINK]. |
| T1 | `/thank-you/` headline | Done! Your booking request is on WhatsApp. 🐾 |
| T2 | `/thank-you/` body | We'll confirm your exact slot within 10 minutes (9:00–19:00). Meanwhile, save our number — [FILL:WHATSAPP_NUMBER] — so you never miss our updates. |
| T3 | `/thank-you/` secondary | First time with us? Code FIRSTGROOM saves you ₹200 — already noted in your booking. |
| W1 | WhatsApp greeting (business hours) | Hi! 🐾 You've reached PetDoorStep — pet care at your doorstep in Ludhiana. Share your pet's name, breed and your area, and we'll confirm your slot in minutes. |
| W2 | WhatsApp away message (after 19:00) | We're with our own pets right now 🐶 Bookings reopen at 9:00 AM — leave your message and you're first in the queue. Emergencies: please contact your nearest vet clinic. |
| W3 | Booking confirmation template | Confirmed! ✅ {Service} for {Pet} on {Date}, {Window}. Your groomer: {Name} (background-verified — photo attached). Price: ₹{Price}, payable after service by UPI/cash. Need to reschedule? Just reply here. |
| W4 | Post-service follow-up (same evening) — **YES customers only** (D4) | How did {Pet} like today's {Service}? 😊 Two quick favours: (1) a 2-line Google review helps other Ludhiana pet parents find us → [FILL:GBP_LINK] (2) okay to feature {Pet}'s photos on our website? Reply YES and we'll tag {locality} proudly. |
| W5 | Rebooking nudge (4–6 weeks post-groom) — **YES customers only** (D4) | {Pet}'s coat is due for some love around {date} 🛁 Want the same groomer, same time slot? Reply YES and we'll lock it in — or join Groom Club and save 15% every month. |
| W6 | Opt-in ask (once, right after W3, same words to every customer — `00` §11 D4) | One more thing: would you like reminders, review requests and offers from us on WhatsApp? Reply YES. No reply means none of these messages, and you can tell us to stop any time. |

**Usage rules:** emojis allowed in WhatsApp strings and `/thank-you/` only (max 1 per message elsewhere — see `08-DESIGN-SYSTEM.md`); every `{placeholder}` in W-strings is filled by a human or the widget payload per `07-BOOKING-SPEC.md`; Hinglish may be added to W1/W4 naturally when the customer writes in Hinglish first.
**YES rule (`00` §11 D4, 2026-10-03):** W4, W5, the review asks (`05` §3), reminders (such as vaccination due dates) and any offer or broadcast go only to customers who replied YES to W6. Log the date in the leads-sheet `opt_in` column (`09` §5) and clear it the day the customer asks to stop. W1–W3 and every message about a booking the customer made are not affected. W4's photo question may be asked on its own (§4.3) to a customer who did not opt in.

---

*Cross-references: facts 00 §3 · URLs `01-SITEMAP.md` · per-page SEO `02-SEO-PARAMETERS.md` · keywords `03-KEYWORD-MAP.md` · schema `04-TECHNICAL-SEO.md` · reviews engine `05-LOCAL-SEO.md` · booking flow `07-BOOKING-SPEC.md` · tokens/components `08-DESIGN-SYSTEM.md` · events `09-ANALYTICS-TRACKING.md` · blog CTAs `10-CONTENT-CALENDAR.md`.*

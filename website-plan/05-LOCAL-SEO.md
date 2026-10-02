# 05 · LOCAL SEO — Google Business Profile, reviews, citations & the Ludhiana off-page playbook

> **This file owns** everything that ranks PetDoorStep *outside* the website: Google Business Profile (GBP) setup and content, the review engine, NAP + citations, area-page legitimacy rules, local link building, and the monthly routine. It obeys `00-MASTER-PLAN.md` — every price comes from §3.2, every area from §3.3, every trust claim from §3.4, placeholders per §8 only, and every URL from `01-SITEMAP.md`.

**Sibling files:** on-page checklist `02-SEO-PARAMETERS.md` · keywords `03-KEYWORD-MAP.md` · schema/UTM plumbing `04-TECHNICAL-SEO.md` · copy voice `06-CONVERSION-PLAYBOOK.md` · WhatsApp booking payloads `07-BOOKING-SPEC.md` · QR/print visual tokens `08-DESIGN-SYSTEM.md` · GBP insights + review ritual logging `09-ANALYTICS-TRACKING.md` · content that earns local links `10-CONTENT-CALENDAR.md` · per-city replication `11-EXPANSION-PLAYBOOK.md` · area-page anatomy `blueprints/_TEMPLATE-area-page.md`.

**Why this file matters (research context, Whitespark local ranking factor weights):** GBP signals ≈ 32% of local-pack rank, reviews ≈ 20% (recency now top-5), on-page ≈ 19%, links ≈ 15%, citations ≈ 7–9% (inconsistency *caps* everything). Proximity is uncontrollable — so a service-area business must win every controllable signal below. Competitor market data cited in this file is **mined from SERP snippets 2026-10; re-verify before publishing**.

**New [FILL] tokens defined by this file** (add to `00-MASTER-PLAN.md` §8 list on next edit): `[FILL:GBP_REVIEW_LINK]` (the `https://g.page/r/<code>/review` short link from the GBP dashboard), `[FILL:BASE_ADDRESS]` (real operating base in Ludhiana — verification only, never displayed), `[FILL:OPENING_DATE]` (business start date for the GBP "Opening date" field).

---

## 1 · Google Business Profile setup — Service-Area Business (SAB), step by step

PetDoorStep is a textbook SAB: we travel to customers and serve nobody at our base. Per `00-MASTER-PLAN.md` §3.1, business type = **Service-Area Business, address hidden**. Most pet-startup GBP suspensions come from breaking SAB rules — follow this sequence exactly.

### 1.1 Before touching Google (pre-setup)

1. **Freeze the canonical NAP** (§4 of this file) — every field below is copy-pasted from it, character for character.
2. **Business name on GBP = `PetDoorStep`** — the brand name alone. Never "PetDoorStep – Dog Grooming at Home Ludhiana"; keyword-stuffing the name violates Google's Business Name guideline and is the #1 suspension/re-suspension trigger.
3. **Create/confirm the Google account** on a business Gmail or Workspace account the founder (Sunny) controls — never an agency's account.
4. **Prepare verification proof assets:** branded groomer T-shirts, branded kit bags, grooming table/dryer/consumables stock, GST or Udyam registration (or a utility bill) matching `[FILL:BASE_ADDRESS]`, business cards, the booking screen on a phone.

### 1.2 Profile creation (order matters)

1. Go to `google.com/business` → "Add your business".
2. Business name: `PetDoorStep` (exact).
3. Primary category: **Pet groomer** (full category plan in §1.5).
4. At "Do you want to add a location customers can visit?" → **answer NO.** This is the SAB fork. When Google's flow asks the business model, pick **"I deliver goods and services to my customers."**
5. **Service areas — enter exactly these** (Google allows up to 20; add in this order):
   - `Ludhiana` (the city — always first)
   - The ten §3.3 launch localities, as recognised by Google's picker: `Sarabha Nagar`, `BRS Nagar`, `Model Town`, `Civil Lines`, `Dugri`, `Pakhowal Road`, `South City`, `Ferozepur Road`, `Haibowal Kalan`, `Kitchlu Nagar`.
   - If the picker rejects a locality name, substitute the covering pin code: `141001`, `141002`, `141010`, `141012`, `141013`.
   - Do **not** add anything wider (no "Punjab", no Jalandhar) — a service area wider than real coverage reads as spam and dilutes relevance. Note: service areas only *describe* coverage; proximity to the hidden base still drives map rank.
6. Enter `[FILL:BASE_ADDRESS]` when Google asks for the verification address, then after verification go to **Business Information → Location → clear/remove the address** so it never displays. Hidden address + service areas = compliant SAB. A displayed home address customers can't visit = guideline violation.
7. Phone: `[FILL:PHONE]` · Website: `https://[FILL:DOMAIN]/?utm_source=gbp&utm_medium=organic&utm_campaign=profile` (root URL + UTM; tracking convention lives in `09-ANALYTICS-TRACKING.md`).
8. Hours: **Mon–Sun 9:00–19:00** (from §3.1; last booking 17:30 is stated in the description and services, not in the hours field). Add holiday hours each month (Diwali, Gurpurab) via the routine in §8.

### 1.3 Verification — expect video

- New Indian SAB profiles are routinely pushed to **video verification**: one continuous 30–90 s daylight video showing (a) surroundings proving the location (street, landmark near `[FILL:BASE_ADDRESS]`), (b) proof of operation (branded kit bag, dryer, table, shampoo stock, uniform, the `/book/` screen on a phone), (c) proof of authority (GST/Udyam certificate, visiting card, unlocking the stock area).
- Record once, calmly. Failed or suspicious attempts cascade into suspensions that take weeks to appeal.
- **Never** verify with a P.O. box, coworking desk, virtual office, or a friend's shop — these trigger hard suspensions.

### 1.4 Post-verification completion — same week (completeness is a measured ranking input)

1. **Description (max 750 chars) — paste this:**
   > PetDoorStep brings professional pet grooming, dog walking and vet care to your doorstep across Ludhiana — Sarabha Nagar, BRS Nagar, Model Town, Civil Lines, Dugri, Pakhowal Road, South City, Ferozepur Road, Haibowal Kalan, Kitchlu Nagar and nearby areas. Background-verified groomers, a fresh sanitised kit for every pet, fixed transparent prices and on-time slots. Services: dog and cat grooming at home, puppy grooming, tick and flea treatment, daily dog walking with photo updates, and vet-at-home visits for vaccination, deworming and check-ups by registered veterinarians. Open every day 9:00–19:00 (last booking 17:30). Book on WhatsApp in under a minute.
   (No URLs or phone numbers inside the description — Google policy.)
2. **Services section** — add every item from §2.1 below, under the matching category, with the exact ₹ values from `00-MASTER-PLAN.md` §3.2.
3. **Attributes:** enable "Online appointments"; add "Identifies as women-owned" only if true.
4. **Opening date:** `[FILL:OPENING_DATE]` (prominence signal; unlocks "Years in business").
5. **Photos:** day-one set per §2.3 (logo 720×720, cover 1024×576, 10+ real job photos).
6. **Appointment/booking link:** `https://[FILL:DOMAIN]/book/?utm_source=gbp&utm_medium=organic&utm_campaign=appointment_link` (`/book/` is the locked booking URL from `01-SITEMAP.md`; widget spec in `07-BOOKING-SPEC.md`).
7. **Chat:** Edit profile → Contact → Chat/social links → add WhatsApp: `https://wa.me/[FILL:WHATSAPP_NUMBER]?text=Hi%20PetDoorStep%2C%20I%20want%20to%20book%20a%20service` (use the number's digits only, no `+`, e.g. `91XXXXXXXXXX`). In India this button out-converts the call button for under-40 pet parents. Keep missed-chat rate under 5% — Google disables chat for slow responders.
8. **Q&A seeding:** post all 10 owner Q&As from §2.5 (owner-posted Q&A is explicitly allowed).
9. **Social links:** add `[FILL:INSTAGRAM]` and the Facebook page once live (§5 rows 6–7).

### 1.5 Category recommendations (primary + secondaries, with reasoning)

The **primary category is the single biggest controllable ranking factor** — Google matches queries to categories, not to the description.

| Slot | Category (exact GBP taxonomy name) | Reasoning |
|---|---|---|
| **Primary** | `Pet groomer` | Grooming is the revenue core (§3.2 hero service = Full Groom) and matches the highest-volume local queries: "pet groomer ludhiana", "pet grooming near me". |
| Secondary 1 | `Dog walker` | Direct match for the §3.2 walking subscriptions; near-zero GBP competition in Ludhiana for "dog walker ludhiana". |
| Secondary 2 | `Pet care service` | Catch-all matching "pet care at home ludhiana"; also safely absorbs vet-at-home queries until the vet category is allowed (next row). |
| Secondary 3 — conditional | `Veterinarian` | **Add only if/when the partner-vet arrangement with `[FILL:VET_PARTNER_NAME]` legally supports it** (registered veterinarian formally on the service roster, written agreement). Claiming it earlier is misrepresentation and a suspension risk. Until then, `Pet care service` carries vet-at-home relevance. |
| Do NOT add | `Pet store`, `Dog trainer`, `Pet sitter`, `Pet boarding service` | We do not sell these services (§3.2 is the complete list). Irrelevant categories dilute relevance and invite manual review. Add `Dog trainer`/`Pet sitter` only if those services are first added to §3.2. |

Quarterly re-check (per §8): Google occasionally adds categories — if a **"Mobile pet groomer"**-type category appears in India's taxonomy, adopt it as *primary* and demote `Pet groomer` to secondary. Mirror whatever categories are live here onto Bing Places and Apple Business Connect (§5 rows 4–5).

### 1.6 SAB "don'ts" — the suspension traps

- One SAB, one profile. **Never** create "PetDoorStep Dugri", "PetDoorStep Model Town" etc. — second profiles only when a genuinely separate staffed branch exists (see `11-EXPANSION-PLAYBOOK.md` for the city rule).
- Never un-hide the address while customers can't visit. (Google's auto-edits sometimes re-show it — the Friday check in §8 catches this.)
- Never keyword-stuff the business name; never add unserved categories.
- Never buy reviews or review-swap with other businesses from the same devices/IP (§3.6).
- Never list a service area you won't actually serve.

---

## 2 · GBP content: services, booking link, photos, posts, Q&A

### 2.1 Services with prices (source: `00-MASTER-PLAN.md` §3.2 ONLY — update there first, here second)

Enter each as a GBP Service item under the stated category. GBP price field type is noted (Fixed / From). Descriptions below are ≤300 chars — paste verbatim.

**Under `Pet groomer`:**

| Service item name | Price field | Description (paste) |
|---|---|---|
| Bath & Brush at Home | From ₹599 | Bath, blow-dry, brush-out, nail trim and ear clean — at your home in Ludhiana. Small dogs ₹599 · medium ₹799 · large ₹999. Fixed prices, no doorstep bargaining. Fresh sanitised kit opened in front of you, photo update after every groom. |
| Full Dog Groom at Home | From ₹1,199 | Bath & Brush plus haircut/styling and paw & sanitary trim, done at your doorstep by background-verified groomers. Small ₹1,199 · medium ₹1,499 · large ₹1,899. Popular with Shih Tzu, Labrador, Golden Retriever and German Shepherd parents across Ludhiana. |
| Premium Spa Groom | From ₹1,799 | Full Groom plus de-shed/de-mat, conditioning masque and finishing perfume. Small ₹1,799 · medium ₹2,199 · large ₹2,799. Ideal for double coats — Golden Retrievers, German Shepherds — and show-ready finishes, at home in Ludhiana. |
| Puppy Intro Groom | Fixed ₹699 | Gentle first-time grooming for puppies under 6 months — ₹699 flat. Slow, calm handling so your puppy's first groom builds trust, done at home where they feel safe. Serving all Ludhiana areas. |
| Cat Grooming at Home | From ₹899 | Cat Bath & Brush ₹899 or Full Cat Groom ₹1,399 — flat prices. Calm-handling trained groomers, no cages, no car rides: your cat stays in its own home in Ludhiana. Fresh sanitised kit every visit. |
| Tick & Flea Treatment | Fixed ₹699 | Standalone tick & flea treatment at home ₹699, or add it to any groom for ₹399. Book before monsoon — Punjab's tick season peaks then. Fixed transparent pricing, all of Ludhiana covered. |
| Nail Trim + Ear Clean Visit | Fixed ₹299 | Quick home visit for nail trimming and ear cleaning — ₹299. Perfect between grooms, free as a monthly add-on for Groom Club members. At your doorstep anywhere in Ludhiana. |

**Under `Dog walker`:**

| Service item name | Price field | Description (paste) |
|---|---|---|
| Dog Walking — 1 walk/day | Fixed ₹2,999 | Monthly plan: one walk every day by the same fixed, background-verified walker — ₹2,999/month. GPS-tracked route and a photo update after every walk. Serving Sarabha Nagar, BRS Nagar, Model Town, Dugri, South City and all Ludhiana areas. |
| Dog Walking — 2 walks/day | Fixed ₹4,999 | Monthly plan: two walks every day, same fixed walker — ₹4,999/month, with GPS tracking and photo updates. Ideal for high-energy dogs like Labradors, German Shepherds and Beagles. |
| Walking Trial Week | Fixed ₹699 | Try us for one week — ₹699. Meet your fixed walker, see the GPS and photo updates, then decide on a monthly plan. No pressure, fixed price. |

**Under `Pet care service`:**

| Service item name | Price field | Description (paste) |
|---|---|---|
| Vet Home Visit | Fixed ₹699 | Consultation at your home by a registered veterinarian — ₹699, plus medicines/vaccines at MRP with the printed price shown to you. No clinic queues, no stressed pets. All medical services by registered vets only. |
| Vaccination at Home | From ₹199 | ₹199 service fee + vaccine at MRP (MRP shown on the vial). Administered at home by a registered veterinarian, with a reminder calendar so you never miss a due date. |
| Deworming Visit | Fixed ₹499 | Deworming at home — ₹499 including a standard dewormer, given by a registered veterinarian. Weight-checked dosing and a reminder for the next round. |
| Groom Club (monthly subscription) | From ₹1,019 | Our retention plan: one Full Groom every month at 15% off (small dogs ₹1,019 · medium ₹1,274 · large ₹1,614), plus a free nail-trim visit between grooms and priority slots. Cancel anytime. |

*Groom Club prices shown are §3.2 Full Groom prices minus 15%, rounded to the rupee: 1,199→1,019 · 1,499→1,274 · 1,899→1,614. If §3.2 changes, recompute.*

**Market context (do not copy into GBP — internal benchmark only, mined from SERP snippets 2026-10; re-verify before publishing):** thePetNest Ludhiana lists ₹899 spa bath → ₹1,599 full service; Mr n Mrs Pet ₹999–₹2,799 size×tier; Urban Pets Grooming ₹2,000–₹2,300; Pupkitt vet home consult ₹500 and tick treatment ₹400. Our §3.2 menu undercuts thePetNest's entry price visibly (₹599 vs ₹899) while publishing prices Petgroomly hides.

### 2.2 Booking link placement

- GBP Appointment link = `https://[FILL:DOMAIN]/book/?utm_source=gbp&utm_medium=organic&utm_campaign=appointment_link`.
- Every GBP post CTA button uses a UTM-tagged locked URL from `01-SITEMAP.md` (`/book/`, `/pricing/`, service or area pages) — never a bare URL, never an invented slug.
- WhatsApp chat link stays live per §1.4 step 7; quick-reply templates live in `07-BOOKING-SPEC.md`.

### 2.3 Photo strategy

**Day-one minimum set (upload before going live):**
1. Logo 720×720 PNG (from `08-DESIGN-SYSTEM.md`).
2. Cover 1024×576 — real groomer bathing a dog at a Ludhiana home (never stock).
3. Sanitised kit laid out, sealed blades/towels visible (trust fact §3.4 — this photo IS the positioning).
4. Groomer in branded tee mid-groom, pet calm.
5–8. Two before/after pairs (e.g. Shih Tzu full groom; Golden Retriever de-shed).
9. Walker + dog with leash, park setting (Rakh Bagh / neighbourhood park).
10. Vet partner kit/vaccine cold box (faces only with consent).
11. Team photo with founder.
12. Branded kit bag/scooter — the "arriving at your gate" shot.

**Ongoing cadence: 3–5 photos/week**, captured by groomers as part of the job close-out checklist: *"2 photos per visit; owner's spoken consent logged in the job sheet; pet only — no human faces unless approved."* Upload the week's best each Monday.

**Shot rotation (what to shoot):** before/after by breed (Shih Tzu, Pomeranian, Labrador, Golden Retriever, Beagle, German Shepherd, Indie), kit-sanitisation ritual, groomer at work, happy-pet portraits, locality context (society gate, verandah — no house numbers), team faces.

**Video: 1–2/month, under 30 s:** kit-sanitisation ritual; a calm cat groom; groomer self-intro ("Main 5 saal se groom kar raha hoon…").

**File naming before upload** (harmless, occasionally helpful): `dog-grooming-at-home-sarabha-nagar-ludhiana-01.jpg` pattern — service + area + city + counter.

### 2.4 Posts — cadence + 5 ready templates

**Cadence: 1–2 posts/week**, published Mondays (plus one mid-week when there's a fresh before/after). Rotation = T1→T2→T3→T4→T2→T5→repeat (before/afters twice per cycle — they convert best). Every post: exactly one photo, 100–300 words, one CTA button to a UTM-tagged locked URL. Merge fields in `{braces}`; owner consent required wherever a pet name/locality is used.

**T1 — Offer post: Groom Club** *(CTA button "Learn more" → `https://[FILL:DOMAIN]/pricing/?utm_source=gbp&utm_medium=organic&utm_campaign=post_groomclub`; switch to `/offers/` once that Wave-2 page is live)*
> Groom karao, har mahine save karo 🐾 The PetDoorStep **Groom Club** gives your dog one Full Groom at home every month at **15% off**, a **free nail-trim visit** between grooms, and **priority slots** on weekends. Perfect for Shih Tzus, Pomeranians and other coats that need monthly care. Fixed prices, background-verified groomers, fresh sanitised kit every single visit — at your doorstep in Sarabha Nagar, BRS Nagar, Model Town, Dugri, South City and all of Ludhiana.

**T2 — Before/after transformation** *(CTA "Book" → `/book/` with UTM `post_beforeafter`)*
> Meet {pet_name}, a {breed} from {locality} ✨ {He/She} came to us with {a matted coat / overgrown nails / heavy shedding} — and 90 minutes later looked like this. Full Groom at home: bath, blow-dry, haircut & styling, paw and sanitary trim, all done in {pet_name}'s own home with a freshly sanitised kit, photo update sent to {owner first name} right after. Small dogs ₹1,199 · medium ₹1,499 · large ₹1,899 — fixed, no doorstep bargaining.

**T3 — Educational: tick season** *(CTA "Book" → `/ludhiana/tick-flea-treatment/` with UTM `post_tickseason`; use `/book/` until that Wave-2 page is live)*
> Punjab's tick season peaks just before the monsoon 🕷️ Quick weekly check for your dog: inside the ears, between the toes, under the collar, around the tail base. Found even one tick? There are usually more. Our **Tick & Flea Treatment** is ₹699 as a standalone home visit, or ₹399 added to any groom — safe products, applied by trained groomers, with after-care instructions for your home. Labradors and German Shepherds that walk in parks daily need this most.

**T4 — Service spotlight: vet at home** *(CTA "Book" → `/ludhiana/vet-at-home/` with UTM `post_vetathome`)*
> Vaccination due but your dog hates the clinic? A **registered veterinarian** comes to your home: consultation ₹699 (+ medicines/vaccines at MRP — the printed price, shown to you), **vaccination at home** for just a ₹199 service fee + vaccine MRP, and a reminder calendar so you never miss a booster. No queues, no car anxiety, no waiting-room infections. Serving all Ludhiana, 9:00–19:00 every day.

**T5 — Area spotlight** *(CTA "Learn more" → `https://[FILL:DOMAIN]/ludhiana/areas/{area-slug}/?utm_source=gbp&utm_medium=organic&utm_campaign=post_area`; publish only for areas whose page is live per §6)*
> At your doorstep in **{Area}** 🏡 This month our groomers completed {real number} grooms and walks in {Area} — from {real breed} baths near {real landmark} to daily walks for {real breed}s. Same-week slots available, fixed prices from ₹599, fresh sanitised kit for every pet, photo update after every visit. {Area} pet parents: your dog never has to travel for a groom again.

*Policy note: offers in posts are allowed; incentivised reviews are not (§3.6). Never put a review ask inside a post offer.*

### 2.5 Q&A seeding — 10 ready Q&As (owner-posted; post question and answer from the business account)

1. **Q: Which areas of Ludhiana do you cover?**
   A: We serve all of Ludhiana, with dedicated teams in Sarabha Nagar, BRS Nagar, Model Town, Civil Lines, Dugri, Pakhowal Road, South City, Ferozepur Road, Haibowal Kalan and Kitchlu Nagar. If you're elsewhere in Ludhiana, message us on WhatsApp — we almost certainly reach you.
2. **Q: What does full grooming for a Labrador cost at home?**
   A: Most adult Labradors are large size (over 25 kg), so a Full Groom at home is ₹1,899 — bath, blow-dry, haircut/styling, paw and sanitary trim. A medium-build Lab (10–25 kg) is ₹1,499. Prices are fixed — what we quote is what you pay.
3. **Q: Do you groom cats at home?**
   A: Yes — our groomers are calm-handling trained for cats. Cat Bath & Brush is ₹899 and a Full Cat Groom is ₹1,399, both flat prices, done in your home so your cat never needs a carrier or car ride.
4. **Q: Do I need to provide anything at home — water, electricity, towels?**
   A: We bring the full kit: table mat, dryer, shampoos, towels and tools, all sanitised and sealed. We only need access to a tap/bathing point and one power plug for the dryer. The groomer handles cleanup before leaving.
5. **Q: Are your groomers background verified?**
   A: Yes — every groomer and walker is ID- and reference-checked before joining, and trained on our handling and hygiene standards. You'll get the groomer's name before the visit.
6. **Q: Do you sanitise equipment between pets?**
   A: Always. Every pet gets a fresh sanitised kit — sealed blades and towels, opened in front of you at the start of the visit. It's the core of how we work.
7. **Q: Can I book for the same day?**
   A: Often, yes — message us on WhatsApp and we'll confirm the nearest slot. We work Mon–Sun 9:00–19:00, with the last booking at 17:30. Weekend slots fill fastest; Groom Club members get priority.
8. **Q: How do I book?**
   A: Two ways: tap the booking link on this profile (takes about 90 seconds, no app, no login), or WhatsApp us directly. You'll get a confirmation with your groomer's name before the visit.
9. **Q: My dog is nervous/aggressive with strangers. Can you still groom him?**
   A: Usually yes — our groomers are trained to read stress signals and go slow, and grooming at home (familiar smells, you nearby) is already calmer than a salon. Tell us the breed and temperament on WhatsApp first; for safety we may suggest a muzzle-acclimatised session or, for medical-grade cases, a vet-assisted visit.
10. **Q: Do you offer vet services at home?**
    A: Yes — home consultations (₹699 + medicines/vaccines at MRP), vaccination at home (₹199 service fee + vaccine MRP, with a reminder calendar) and deworming visits (₹499 incl. standard dewormer). All medical services are performed by registered veterinarians only.

**Maintenance:** check Q&A weekly (§8); answer new public questions within 48 h; upvote correct owner answers; report spam answers — anyone can answer, and a wrong answer left standing costs bookings.

---

## 3 · Review engine

Review recency is a top-5 local ranking factor. This is an always-on engine built into operations, not a campaign.

### 3.1 The ask-flow (after EVERY completed service — grooms, walks milestone, vet visits)

| Step | When | What happens |
|---|---|---|
| 1. Verbal ask | T+0, at job close-out | Groomer's script (memorise): *"If you were happy with how {pet_name}'s groom went, a Google review really helps a small local team like ours. You'll get a WhatsApp link in a few minutes — it takes 30 seconds."* Verbal ask + promised link is the highest-converting combo. Groomer also shows the QR card (§3.3). |
| 2. WhatsApp ask | T+30–60 min | Template A (EN) or A-H (Hinglish) below, sent from WhatsApp Business — same message to **every** customer, no sentiment filtering. |
| 3. Single nudge | T+3 days, only if no review AND no complaint | Template B. **One nudge maximum, ever.** |
| 4. Thank-you | Within 24 h of the review appearing | Template C on WhatsApp + the public reply (§3.4). |
| Complaint at any point | Immediately | Service-recovery flow: founder callback same day, free re-visit if justified. This is allowed — what's prohibited is making the *review ask* conditional on sentiment. |

For monthly walking clients: ask at the end of the Trial Week and again at the end of month 1, then stop (don't nag subscribers).

**Review link:** get the short link from the GBP dashboard ("Ask for reviews") → store as `[FILL:GBP_REVIEW_LINK]`. Create the utility redirect `https://[FILL:DOMAIN]/review` → 301 → `[FILL:GBP_REVIEW_LINK]` so print materials never go stale. *(This is a redirect, not a page: it is NOT added to `01-SITEMAP.md`, is excluded from sitemap.xml, and lives in the redirects list in `04-TECHNICAL-SEO.md`.)*

### 3.2 Verbatim WhatsApp templates (merge fields: {first_name} {pet_name} {service} {locality} {review_link})

**Template A — post-service ask (English):**
> Hi {first_name}! 🐾 Thank you for choosing PetDoorStep for {pet_name}'s {service} today in {locality}. We hope {pet_name} is feeling fresh!
> If you have 30 seconds, a Google review would mean the world to our small Ludhiana team: {review_link}
> It also helps other pet parents in {locality} find safe, at-home pet care. Thank you! 🙏

**Template A-H — post-service ask (Hinglish variant — pick per customer's chat language):**
> Hi {first_name}! 🐾 Aaj {pet_name} ki {service} ke liye PetDoorStep chunne ka shukriya. Umeed hai {pet_name} ekdum fresh feel kar raha/rahi hai!
> Sirf 30 second ka ek Google review hamari choti si Ludhiana team ke liye bahut bada support hota hai: {review_link}
> Aapke review se {locality} ke doosre pet parents ko bhi ghar-par safe pet care milti hai. Dhanyavaad! 🙏

**Template B — single nudge (T+3d; EN, swap to Hinglish tone per customer):**
> Hi {first_name}, just a gentle reminder from PetDoorStep 🐶 If you have a minute, we'd be grateful for a quick Google review of {pet_name}'s {service}: {review_link}
> And if anything wasn't right, simply reply here — the founder will personally sort it out.

*(That last line is an open feedback invitation sent to everyone — it is not gating, because the review ask already went to all customers.)*

**Template C — thank-you after they post:**
> {first_name}, we saw your review — thank you so much! 🙏 It genuinely helps our team. {pet_name}'s groom notes are saved with us; we'll remind you when the next session is due.

### 3.3 QR review card — print spec

- **Format:** 88 × 55 mm (standard visiting card), 300 gsm, matte lamination, rounded corners. Colours/typography tokens from `08-DESIGN-SYSTEM.md` (teal + amber).
- **Front:** PetDoorStep logo top-left · headline **"Loved {your pet}'s groom?"** · QR code min 30 × 30 mm, error-correction level M, quiet zone 4 modules · caption under QR: **"Scan to leave a Google review — takes 30 seconds"** · printed fallback URL: `[FILL:DOMAIN]/review`.
- **Back:** "Book again on WhatsApp" + `[FILL:WHATSAPP_NUMBER]` · one-line service list: *Grooming · Walking · Vet at home — doorstep, all Ludhiana* · tagline *Pet care at your doorstep*.
- **QR target:** `https://[FILL:DOMAIN]/review` (the re-pointable 301 from §3.1 — never encode the raw Google URL, so reprints are never needed).
- **Deployments:** laminated card in every groomer's kit bag (shown at job close) · sticker (70 × 70 mm, same QR) on every kit trolley/bag · thank-you card left behind after each visit · footer of every invoice/receipt PDF · vaccination-record card given after vet visits · standee at camps/events (§7).

### 3.4 Reply templates + SLA (reply to 100% of reviews — owner responses are an engagement signal)

| Review type | SLA | Owner |
|---|---|---|
| 5★ (with or without text) | ≤ 48 h | Ops/marketing, from this playbook |
| 4★ | ≤ 48 h | Ops/marketing |
| 3★ | ≤ 24 h | Founder |
| 1–2★ | **Same business day** | Founder |
| Suspected fake/competitor | Flag via GBP "Report review" ≤ 24 h + public holding reply | Founder |

**Positive reply — variant 1 (5★ with text):**
> Thank you, {first_name}! So glad {pet_name}'s {service} at home in {locality} went well — {groomer_name} will be delighted to hear it. See you at the next session! — Team PetDoorStep

**Positive reply — variant 2 (4–5★, little/no text):**
> Thank you for the stars, {first_name}! It was a pleasure grooming {pet_name} — we've saved the coat notes for next time. Whenever {pet_name} is due again, we're one WhatsApp away. — Team PetDoorStep

*(Vary wording every time; never paste identical replies twice in a row. Naturally naming the pet, service and locality helps relevance — never force keywords.)*

**3★ reply:**
> Thank you for the honest feedback, {first_name}. You're right that {specific gap, e.g. "we ran 20 minutes late"} — we've {specific fix, e.g. "adjusted that day's route planning"}. We'd love the chance to show you the standard we promise; please WhatsApp us and the founder will arrange it personally.

**Negative reply (1–2★):**
> We're sorry, {first_name} — this is not the standard we promise. I've personally reviewed {pet_name}'s visit and we'd like to make it right with a free re-visit at your convenience. Please WhatsApp us on [FILL:WHATSAPP_NUMBER] so I can sort this out today. — Founder, PetDoorStep

*(Empathise, state the concrete fix, move detail offline. Never argue publicly, never reveal booking/customer details. After genuine resolution it is fine to ask the customer to **consider updating** the review — never demand it.)*

**Fake/competitor review holding reply:**
> We take every review seriously, but we have no record of any booking under this name. If you are a genuine customer, please WhatsApp [FILL:WHATSAPP_NUMBER] with your booking details and we will resolve this immediately. We have reported this review to Google for verification.

### 3.5 Velocity target

- **Months 1–2:** 5–8 reviews/month (starts with the 5+ genuine pilot-customer seed reviews required by `00-MASTER-PLAN.md` §9 item 6).
- **Month 3 onward: 8–15 reviews/month, steady.** At expected booking volumes and the standard 15–25% ask-to-review conversion, this is realistic — and a steady drip outranks a spike. Sudden bursts look purchased to Google's filters; an engine beats a campaign.
- Track count/velocity/average monthly in the review audit (§8), logged per `09-ANALYTICS-TRACKING.md`.

### 3.6 ⚠️ NEVER do this (review policy — enforced, penalties include losing ALL reviews)

- **No incentives, ever.** No discount, free add-on, Groom Club perk or gift for a review — positive or otherwise.
- **No gating.** Never ask only happy-seeming customers, never route unhappy ones to a private form while happy ones get the Google link. Same ask, every customer.
- **No fake reviews.** No reviews from staff, family, swapped with other businesses, or purchased. No posting from office devices/IP on customers' behalf.
- **No keyword scripting.** You may ask "what service did we do and how did it go?" (which naturally elicits service + locality words) — you may not tell customers what to write.
- One nudge maximum; never pressure.

---

## 4 · NAP — the canonical block

The single source for Name–Address–Phone. **Copy-paste character-for-character into every listing, the site footer, email signatures and print.** Any change: update `00-MASTER-PLAN.md` §3.1 first, then GBP, then the P1 citations within one week, then the rest.

```
Name:     PetDoorStep
Category: Pet groomer / at-home pet care (service-area business — no walk-in address)
Phone:    [FILL:PHONE]
WhatsApp: [FILL:WHATSAPP_NUMBER]
Website:  https://[FILL:DOMAIN]/
Email:    [FILL:EMAIL]
Address:  [FILL:BASE_ADDRESS]   ← verification/registration only. HIDDEN on GBP;
          on directories, enable "hide address" / service-area mode wherever offered.
Service area: Ludhiana, Punjab, India — Sarabha Nagar, BRS Nagar, Model Town,
          Civil Lines, Dugri, Pakhowal Road, South City, Ferozepur Road,
          Haibowal Kalan, Kitchlu Nagar (full city served)
Hours:    Mon–Sun 9:00–19:00 (last booking 17:30)
```

**Rules:**
1. Name is `PetDoorStep` alone — no city, no keywords, no "™", everywhere.
2. One phone number for life — it is the join key across every citation. Never rotate it.
3. The site-wide footer NAP block (`01-SITEMAP.md` internal-linking rule 5) renders exactly these values, marked up with LocalBusiness schema per `04-TECHNICAL-SEO.md` (no self-serving `aggregateRating` — Google ignores self-serving review stars on LocalBusiness).
4. Where a directory *forces* a visible address, use `[FILL:BASE_ADDRESS]` consistently (never a fake/borrowed address) — consistency beats cosmetics.
5. Quarterly drift audit (§8): Google-search the phone number and `"PetDoorStep"` in quotes; fix any listing that drifted.

---

## 5 · Citations — India directory build list

Build order: P1 = launch weeks 1–2 · P2 = month 1 · P3 = months 2–3. Pace: **2–4 listings/day max** from the same IP (natural pace). Every listing: NAP from §4 verbatim + one of three rotating 2–3-sentence descriptions (write 3 variants once, reuse) + link to `https://[FILL:DOMAIN]/` + category "Pet grooming / pet care". Log every live URL + login credential in the NAP master sheet (founder-owned; never let an agency own logins).

| # | Directory | URL | Free/Paid | Priority | Notes |
|---|---|---|---|---|---|
| 1 | Justdial | justdial.com | Free (aggressive paid upsells) | **P1** | India's #1 local discovery. **Ludhiana already has live categories "Dog Grooming Services At Home in Ludhiana", "Mobile Pet Grooming Ludhiana", "Mobile Veterinary Clinics Ludhiana" (observed 2026-10) — get listed in exactly these.** Search for any auto-created PetDoorStep listing first and claim it rather than duplicating. Expect sales calls — list free first, buy nothing at launch. Also a review venue: seed 2–3 genuine customer reviews here too. |
| 2 | Sulekha | sulekha.com | Free listing; optional pay-per-lead | **P1** | Strong home-services intent; "pet grooming" lead category exists. Free listing only at launch. |
| 3 | IndiaMART | indiamart.com | Free | **P1** | B2B-skewed but very high authority; list as a service provider for citation value. |
| 4 | Bing Places for Business | bingplaces.com | Free | **P1** | Import from GBP in minutes; feeds Bing/Copilot local results. Mirror GBP categories. |
| 5 | Apple Business Connect | businessconnect.apple.com | Free | **P1** | Apple Maps = iPhone-owning affluent audience, exactly the target customer. Supports service-area businesses. |
| 6 | Facebook Business Page | facebook.com/business | Free | **P1** | Citation + de-facto local discovery; enable the WhatsApp button; NAP in About. |
| 7 | Instagram Business (`[FILL:INSTAGRAM]`) | instagram.com | Free | **P1** | NAP in bio/contact; before/after reels are the top pet-service conversion asset in India. |
| 8 | Petofy | petofy.com | Free | **P1** (pet-niche) | Indian pet-services platform (groomers, vets, walkers register); niche-relevant citation + possible leads. |
| 9 | AskLaila | asklaila.com | Free | P2 | Veteran Indian local directory with Ludhiana coverage. |
| 10 | Yellow Pages India | yellowpages.in | Free | P2 | Classic structured citation. |
| 11 | Grotal | grotal.com | Free | P2 | Chandigarh/Punjab-strong directory — regional relevance bonus for Ludhiana. |
| 12 | Clickindia | clickindia.com | Free | P2 | Classifieds + services listing. |
| 13 | IndiaBizList | indiabizlist.com | Free | P2 | General India business directory; straightforward NAP citation. |
| 14 | MyFurries | myfurries.com | Free | P2 (pet-niche) | Indian pet-business directory; verify signup is live at build time — if dead, skip and note in NAP sheet. |
| 15 | PetBacker | petbacker.in | Free listing; commission on marketplace leads | P2 (pet-niche) | Global pet-services marketplace active in India (grooming, walking); doubles as lead source + review venue. Keep our own WhatsApp funnel primary. |
| 16 | Cylex India | cylex-india.com | Free | P2 | Structured citation that also accepts reviews. |
| 17 | Hotfrog India | hotfrog.in | Free | P2 | Global directory, Indian subdomain; easy approval. |
| 18 | Brownbook | brownbook.net | Free | P2 | High-authority global citation. |
| 19 | ThreeBestRated (Ludhiana pet groomers) | threebestrated.in | Free (editorially selected — cannot self-add) | P3 | They hand-pick 3 businesses per category per city via a 50-point inspection of reviews/reputation. Action: once we hold 25+ Google reviews at 4.8+, email their listed contact requesting evaluation for "Pet Grooming in Ludhiana". Treat as an earned citation, not a signup. |
| 20 | TradeIndia | tradeindia.com | Free | P3 | B2B; citation value only. |
| 21 | Quikr Services | quikr.com | Free | P3 | Services classifieds; residual pet-care traffic. |
| 22 | Monkoodog business listing | monkoodog.com | Free | P3 (pet-niche) | Indian pet app with a business directory. |
| 23 | DogSpot services | dogspot.in | Free | P3 (pet-niche) | Legacy Indian pet platform; list if its services directory is accepting new entries. |
| 24 | StartupIndia / Udyam listing | startupindia.gov.in | Free | P3 | Government-adjacent trust citation once the business is registered. |

**Execution rules:** identical NAP everywhere (§4) · enable "service area / hide address" wherever offered · descriptions rotate among 3 master variants (never one spun paragraph 24 times) · every live listing URL + login goes in the NAP master sheet · quarterly audit per §8.

---

## 6 · Area-page legitimacy rules (anti-doorway)

Google's doorway-page policy (enforced hard in the Sept-2025 spam update) kills near-duplicate locality pages where only the place name changes. Competitor teardown finding: **every** competitor's Ludhiana page is exactly that — zero locality names, token-swapped city text. Our `/ludhiana/areas/<slug>/` pages (the ten §3.3 localities, URLs locked in `01-SITEMAP.md`) win only by being genuinely local. These rules feed `blueprints/_TEMPLATE-area-page.md` — that template must enforce every one.

**An area page ships ONLY when ALL of these are true:**

1. **≥60–70% unique body copy** (page floor 600–900 words, majority locality-specific): housing mix (kothis vs apartment societies), breeds our team actually sees there, parks/walking routes our walkers actually use. Not spun, not swapped.
2. **Locality-true logistics block:** the real arrival-window promise for that area, travel-fee rule (per §3.4: fixed transparent prices — if no travel fee inside Ludhiana, say so explicitly), serviceable pin codes.
3. **Real proof from that locality:** ≥2 testimonials from customers *in that area* (quote Google reviews verbatim, first name + area — `[FILL:REVIEW_*]` tokens until collected) and/or before/after photos captioned there. **No proof yet = the page waits.** This is the gating resource.
4. **3–5 locality-specific FAQs:** society gate-pass norms, parking for the groomer's scooter, water/power availability in flats vs kothis, timing norms ("Do you come to {society} before 10 am?").
5. **Distinct data points:** most-booked services in that area, typical slot availability, nearest landmark used in directions, nearest partner-vet note where relevant (`[FILL:VET_PARTNER_NAME]`).
6. **Unique title/H1/meta beyond a name swap** — a different true value proposition per page (e.g. "same-week slots" vs "our most-booked area" vs "cat-grooming specialists nearby"), per the per-page rows in `03-KEYWORD-MAP.md` and the checklist in `02-SEO-PARAMETERS.md`.
7. **Structured internal links — fixed adjacency map** (each area page links to its 3 geographic neighbours below + all 4+ core money pages + `/book/`, per `01-SITEMAP.md` linking rules; no sitewide footer block stuffing all 10 area links on every page — footer carries top 5 only):

   | Area page | Links to (adjacent areas) |
   |---|---|
   | Sarabha Nagar | BRS Nagar · Kitchlu Nagar · Pakhowal Road |
   | BRS Nagar | Sarabha Nagar · Ferozepur Road · South City |
   | Model Town | Civil Lines · Dugri · Kitchlu Nagar |
   | Civil Lines | Model Town · Kitchlu Nagar · Haibowal Kalan |
   | Dugri | Model Town · South City · Pakhowal Road |
   | Pakhowal Road | Sarabha Nagar · South City · Dugri |
   | South City | Dugri · Pakhowal Road · BRS Nagar |
   | Ferozepur Road | BRS Nagar · Sarabha Nagar · South City |
   | Haibowal Kalan | Civil Lines · Kitchlu Nagar · Ferozepur Road |
   | Kitchlu Nagar | Sarabha Nagar · Civil Lines · Model Town |

8. **A real conversion path on-page:** booking widget step-1 embed (`07-BOOKING-SPEC.md`) + WhatsApp deep link pre-filled with the locality: `https://wa.me/[FILL:WHATSAPP_NUMBER]?text=Hi%20PetDoorStep%2C%20I%20want%20pet%20grooming%20at%20home%20in%20{Area}`.
9. **One page per locality per intent.** Never a second "pet grooming {area}" page beside "dog grooming {area}" — the locked sitemap already guarantees this; never propose additions.
10. **Staggered publishing (execution order within Wave 2):** publish the first 3–4 area pages that have real pilot-customer proof, then one new page per 2–4 weeks as genuine proof accumulates. Mass-publishing all 10 on one day is the exact doorway fingerprint the 2025 spam update punished. (This sequences, not changes, the Wave-2 checklist in `00-MASTER-PLAN.md` §6.)

**Template skeleton is allowed** (hero → services + §3.2 prices → how-it-works → local proof → local FAQs → booking) — it's the *content layer* that must be locality-true.

---

## 7 · Local link building — Ludhiana

Target: **one executed initiative per month** (§8). Five real Ludhiana links beat fifty directory links. Avoid entirely: paid link farms, reciprocal-link directories, "Punjab SEO directories" with no traffic.

1. **GADVASU dog show sponsorship** — Guru Angad Dev Veterinary & Animal Sciences University (Ludhiana) runs an annual dog show/breed competition with 100+ pet owners and local press coverage. Sponsor or support it: event-page mention/link, press coverage, and the single most target-rich offline audience in the city. Also pitch a guest talk on at-home grooming hygiene to its pet clinic.
2. **Local press launch story** — pitch The Tribune (Ludhiana edition) and Hindustan Times Ludhiana/HT City: *"Ludhiana startup brings background-verified pet grooming to your doorstep"* — founder story + stray-care CSR angle earns the link. Pitch Punjabi dailies (Ajit, Jagbani) for brand reach even without links.
3. **Free grooming days for shelters/rescues** — partner with Punjab animal-welfare NGOs and Ludhiana rescuer networks (e.g. CAPE India (Punjab), local SPCA/stray-feeder groups): monthly free grooming/tick-treatment for rescued dogs → NGO website/social links, press mentions, authentic photo content for GBP (§2.3).
4. **RWA/society partnerships** in the §3.3 localities: sponsor society newsletters and Diwali events; run weekend **"pet wellness camps"** in society parks with the partner vet (`[FILL:VET_PARTNER_NAME]`) — vaccination + free nail-clip. ADDA/MyGate-managed societies have noticeboards and community feeds; camps generate reviews, branded search and QR-card scans even when no hyperlink exists.
5. **Society WhatsApp group etiquette** (the highest-leverage zero-cost channel — one wrong move gets the brand banned):
   - Join only groups where a real member (customer, friend, RWA contact) adds us or posts on our behalf.
   - **Give first:** answer pet questions genuinely (tick season, vet timings, lost-pet boosts) for weeks before any promotion.
   - Promote only when admins invite it or on designated "promo days"; max 1 message/month/group; always a useful framing ("Sunday vaccination camp in the park, ₹199 service fee + vaccine MRP") — never a bare price list.
   - Never DM group members cold. Happy customers posting their own before/after photos is the goal — ask them (no incentive) if they'd share.
6. **Veterinary clinic referral network** — non-competing local clinics (they do medical, we do grooming/walking): reciprocal "recommended groomer" placement on their site/GBP posts in exchange for listing them on a "our vet partners" section. First targets (from research, re-verify current operation before outreach): Dr Tiwari's Dog Care, Dr Singh's VDI & Pet Hub, GADVASU-alumni clinics. Note: Pupkitt (strong local vet chain) is a competitor in vet-at-home — approach only with a grooming-referral posture, not partnership dependence.
7. **Pet shops & aquarium stores cross-promo** — they sell supplies, we sell services: flyer/QR swap at billing counters + link exchange on "partners" pages.
8. **Ludhiana Kennel Club / KCI-affiliated clubs** — membership/sponsorship of shows → sponsor-page and participant-list links; also a breeder audience for Puppy Intro Groom (₹699).
9. **PAU & college fests** — Punjab Agricultural University, CT University, GNDEC: sponsor a "pet show" segment at fests; `.ac.in`/`.edu.in` event-page links are strong, and students are future Groom Club customers.
10. **Local event sponsorships** — Ludhiana marathons/cyclothons ("pet-friendly water stop"), Rotary/Lions/JCI community events — sponsor pages link out.
11. **Hyperlocal linkable content** (built with `10-CONTENT-CALENDAR.md`): "Vet-verified tick-season calendar for Punjab", "Pet-friendly parks & cafes in Ludhiana — the complete list (Rakh Bagh, Leisure Valley…)", "What a dog groom should cost in Ludhiana (2026 price survey)". Pitch each to Punjab lifestyle blogs and Instagram city pages (@ludhiana.diaries-type accounts) — bio/story links + branded search.
12. **Punjabi/Hinglish pet creators (YouTube/Instagram)** — barter a groom for an honest vlog. Links are usually nofollow; the value is massive local demand-gen and branded search.
13. **Supplier/brand partner pages** — grooming-product brands (Captain Zack, Wahl India, Himalaya pet care) list "professional partners/salons"; request inclusion once we're an active buyer.
14. **Guest expertise** — groomer/vet answers for Tribune/HT pet-care columns and contributed care guides on Indian pet blogs (DogSpot, Monkoodog) with an attribution link.

---

## 8 · Monthly local-SEO routine (checklist — copy into each month's ops doc; results logged per `09-ANALYTICS-TRACKING.md`)

### Weekly (90–120 min total)
- [ ] **Mon:** publish 1 GBP post from the §2.4 rotation; mirror to Instagram/Facebook.
- [ ] **Mon:** upload the week's 3–5 best job photos (consent logged) per §2.3.
- [ ] **Daily (ops-embedded):** review-ask WhatsApp fires for every completed job (§3.1); T+3d nudges go out; groomers capture 2 photos/visit.
- [ ] **Daily:** reply to new reviews within SLA (§3.4: ≤3★ same day, others ≤48 h); answer GBP Q&A and chat within hours (missed-chat <5%).
- [ ] **Fri:** check GBP for "Google updated your info" auto-edits and revert wrong ones — especially any un-hiding of the address (silent killer for SABs).

### Monthly (half-day block)
- [ ] **GBP Insights pull:** branded vs discovery searches, top queries, calls/chats/booking-link clicks, photo views vs competitors → log month-over-month deltas in the `09-ANALYTICS-TRACKING.md` sheet.
- [ ] **Review audit:** count, average rating, velocity vs the 8–15/month target (§3.5), keyword presence in review text; flag/report fakes; refresh one reply template so responses don't go robotic.
- [ ] **Citations:** build/verify the next 3–5 listings from the §5 table until all 24 are live.
- [ ] **Area page:** publish the next `/ludhiana/areas/<slug>/` page **only if** its §6 checklist is fully satisfied (real local proof in hand); otherwise collect proof this month instead.
- [ ] **Content:** 1–2 blog posts per `10-CONTENT-CALENDAR.md`; confirm site prices still match `00-MASTER-PLAN.md` §3.2 everywhere (stale prices kill trust and surface in reviews).
- [ ] **Links:** execute exactly 1 initiative from §7 (one camp, one pitch or one sponsorship is enough).
- [ ] **Rank spot-check:** manual incognito checks centred on Sarabha Nagar and Model Town for: "pet grooming at home ludhiana", "dog groomer near me", "dog walker ludhiana", "vet home visit ludhiana" (grid tool like LocalFalcon only if budgeted).
- [ ] **Competitor watch:** thePetNest / Mr n Mrs Pet / Petgroomly Ludhiana pages, Pupkitt and Pupping GBP activity, any new "Pet groomer" GBP entrants in Ludhiana — note their review velocity and categories.
- [ ] **Hygiene:** address still hidden · categories unchanged (and check for a new "Mobile pet groomer" category per §1.5) · services/₹ current vs §3.2 · next month's holiday hours set (Diwali/Gurpurab) · `/book/` appointment link + WhatsApp chat link working end-to-end on a real phone.

### Quarterly
- [ ] Full NAP drift audit: Google the phone number and `"PetDoorStep"` in quotes; fix every drifted listing from the NAP master sheet.
- [ ] GBP category taxonomy re-check (§1.5).
- [ ] Re-confirm the vet-category condition: `Veterinarian` secondary stays off until the `[FILL:VET_PARTNER_NAME]` arrangement legally supports it.
- [ ] Review service-area list vs real coverage; expansion prep only per `11-EXPANSION-PLAYBOOK.md` (a new city gets its own GBP only with a real local base/team — one Ludhiana profile cannot rank in Jalandhar).

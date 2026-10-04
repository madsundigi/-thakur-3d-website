# B05 · VET AT HOME — `/ludhiana/vet-at-home/`

> Page blueprint (medical). Inherits `_TEMPLATE-service-page.md` (block order, rules, defaults); this file supplies
> this page's values. Obeys `00-MASTER-PLAN.md` (prices §3.2, "registered veterinarians only" §3.4, hours §3.1);
> keywords from `03-KEYWORD-MAP.md` §2.5.

| URL | Wave | Template | Schema `@graph` | Status |
|---|---|---|---|---|
| `/ludhiana/vet-at-home/` | 1 | T1 — all 14 blocks (SP-3 = ✓-lists, SP-4 = flat list, SP-5 = proof-photo row, SP-7 = "Meet your vet") | Service + FAQPage + BreadcrumbList | blueprinted |

## 0 · Legal & honesty rules for this page (launch blockers)

1. Diagnosis, prescriptions, vaccines and medicines are handled **only by a registered veterinarian** (BVSc & AH,
   registered with the state veterinary council). PetDoorStep arranges and schedules the visit; it never practises medicine.
2. The page **never** implies emergency, night or 24×7 cover (`00-MASTER-PLAN.md` §3.2 "not offered"). The emergency
   routing line (SP-1 and FAQ #3) is mandatory.
3. `[FILL:VET_PARTNER_NAME]` and `[FILL:VET_REG_NO]` must be real before this page ships — no anonymous vet.
4. `[FILL:EMERGENCY_VET_LIST]` = 2 nearby 24-hour veterinary hospitals with phone numbers, **verified by calling them**
   (candidate to check: the GADVASU teaching veterinary hospital, Ludhiana). Shown in FAQ #3 (the token is part of
   the answer text below, so `faq.json` entry `vet-at-home-3` carries it verbatim too) and the footer of SP-4.

## 1 · Head

- **Title** (50): `Vet at Home in Ludhiana – ₹699 Visit | PetDoorStep`
- **Meta** (144): `Vet at home in Ludhiana: a registered vet examines your pet at your door. Consult ₹699, medicines at MRP. Slots 9am–7pm daily. Book on WhatsApp.`
- **H1:** `Vet at Home in Ludhiana`

## 1a · SERP intent check (`02` P040) — 2026-10-03

Checked before building, for the sitemap's wording of this page's query, **"vet home visit ludhiana"** (`01` §1 keyword
column; `03` §2.5 S), and for the primary keyword **"vet at home ludhiana"** (`03` §2.5 P). Tool: the build session's
web search. It uses a US-based index, not google.co.in on a Ludhiana phone, and it cannot show the map pack — repeat
the check on a phone in Ludhiana during the launch audit (`02` §5).

- **What ranks for "vet home visit ludhiana":**
  - **Directories and listing categories**, most of the page: JustDial "Veterinary Clinics in Ludhiana", JustDial
    "Mobile Veterinary Clinics in Ludhiana" and a single clinic listing ("Vets For Pets", Sarabha Nagar);
    indiaonline.in "Best Pet Clinics Near Me in Ludhiana"; petofy.com "Veterinary Doctors in Ludhiana with Clinic
    Address"; lybrate.com "Veterinarians in Ludhiana — book instant appointment, consult online, view fees";
    joonsquare.com "Best Veterinary in Ludhiana Punjab".
  - **One at-home service page from a Ludhiana clinic chain:** Pupkitt "Vets On Call — Veterinary Home Services"
    (home consultation and treatment ₹500 all-in for 45 minutes, booked on a Sunder Nagar phone number), plus
    Pupkitt's "Best Veterinary Hospital in Ludhiana" page.
  - **Local businesses in the snippets:** "Vets At Home", a clinic at 45-B Tagore Nagar, Civil Lines (9:00–20:00,
    "7 years"); "Vet Doctor Home Visit — DeePet Services" (dogs and cats, vaccinations, surgery, "24x7"); Silver Oak
    Pet Care's home page.
- **What ranks for "vet at home ludhiana":** no Ludhiana page at all — Vetic's national and metro "vet at home"
  landing pages (Delhi, Noida, Gurgaon, Bengaluru: "vet visit in 60 mins", ₹299 home consultation, not offered in
  Ludhiana), a Careers360 question about GADVASU and one prototype site. Locally, the field for the exact H1 phrase is
  empty.
- **Competitor figures** (Pupkitt ₹500 all-in · Vetic ₹299 in the metros) were mined from SERP snippets 2026-10-03;
  re-verify before quoting them anywhere. They stay off this page (template §0 rule 5: never in hero, table, schema or
  FAQ; `03` §2.5 names them only as the expectation anchor for the ₹699 fee).
- **Intent:** buyer — someone whose pet needs seeing without a clinic trip — plus a navigational slice: "Vets At Home"
  is the trading name of that Civil Lines clinic, so part of the query means *that* business. The page never uses the
  phrase as a brand: the H1 keeps the generic "Vet at Home in Ludhiana" and the eyebrow names the service.
- **Format that ranks:** directories and one service page. Nothing local publishes a fixed home-visit fee, the vet's
  registration, what the visit includes, or honest emergency routing; the listings that promise "24x7" are exactly what
  this page will not claim (§0 rule 2).
- **How this page matches:** it is the service landing page the query lacks — not a directory, not a listicle.
  - "vet at home ludhiana" in the title, H1 and subhead (§1); "vet home visit" in the eyebrow and the SP-4 H2 (§2).
  - The fixed ₹699 fee answers "charges / fee" first: hero chip, SP-4 flat list with R1 + R2, the Offer in the Service
    markup.
  - SP-3 prints what the visit includes (✓-lists) and the H3 "What a home visit can — and can't — do", which sends
    accident, poisoning and surgery cases to a hospital — the honest counter to the "24x7" listings.
  - SP-7 names the registered vet with BVSc & AH and the registration number (`02` P046).
  - The hero notice and FAQ #3 carry the emergency routing line and the two verified 24-hour hospitals.
  - FAQ #5 (cats), #6 (same-day), #7 (no online consults) and #8 (Hinglish) answer the long-tails the directories leave
    unanswered (`03` §2.5).

## 2 · Keyword → block assignment

| Keyword (03 §2.5) | Role | Lands in |
|---|---|---|
| vet at home ludhiana | P | Title · H1 · SP-1 subhead |
| vet home visit ludhiana | S | SP-1 eyebrow *Vet home visit, Ludhiana* |
| veterinary doctor home visit ludhiana | S | SP-3 H2 **"What a veterinary doctor's home visit includes"** |
| home visit vet charges / fee | S | SP-4 H2 **"Vet home visit charges — fixed ₹699"** |
| vet on call ludhiana · dog doctor near me | S | SP-9 intro line · FAQ #6 body |
| deworming visit ludhiana | L | SP-3 deworming ✓-list |
| cat vet home visit | L | FAQ #5 |
| what does the ₹699 visit include | L | FAQ #1 |
| online vet consultation · 24 hour vet | L | FAQ #7 · #3 (honest answers) |
| dog ka doctor ghar pe (Hinglish) | L | FAQ #8 |

## 3 · Block values

- **SP-1 Hero** (`06` §2.3): eyebrow *Vet home visit, Ludhiana* · subhead "A registered veterinarian examines your pet at home — no stressful clinic trip. ₹699 consult; medicines and vaccines at MRP, bill shown to you." · CTAs [Book Vet on WhatsApp] → `/book/?src=hero_vet-at-home` (`00` §11 E1; amber, `08` §1.4) + [Call [FILL:PHONE]] · chips `₹699 visit` + `✔ Registered veterinarians only` · `✔ Medicines at MRP — bill shown` · `✔ Fixed visit fee ₹699` · `✔ Mon–Sun 9:00–19:00`. Under the CTAs, after R3: **"Not for emergencies — for accidents, poisoning, seizures or heavy bleeding, go to the nearest 24-hour vet hospital now."**
- **SP-3 Visit types (✓-lists)** — H2 per §2:
  - **Vet Home Visit — ₹699:** ✓ full examination by a registered vet (temperature, weight, heart & lungs, skin, ears, eyes, teeth) ✓ diagnosis and written prescription ✓ medicines or vaccines at printed MRP, wrapper and bill shown ✓ visit summary on WhatsApp ✓ typically 20–30 minutes
  - **Vaccination at Home — ₹199 + vaccine MRP:** ✓ cold-chain carried vaccine ✓ reminder calendar → full details on `/ludhiana/dog-vaccination/`
  - **Deworming Visit — ₹499:** ✓ standard dewormer included ✓ dose by weight (pet weighed first)
  - **H3 "What a home visit can — and can't — do":**
    | Ideal at home | Needs a clinic or hospital |
    |---|---|
    | Check-ups, vaccinations, deworming | Road accidents and injuries, heavy bleeding |
    | Skin, ear and eye problems | Suspected poisoning, seizures, breathing trouble |
    | Tick and flea issues, mild tummy upsets | Bloody diarrhoea or suspected parvo |
    | Follow-ups after illness, senior-pet reviews | X-rays, ultrasound, surgery, drips |
- **SP-4 Prices** — H2 per §2; flat list `Vet visit ₹699 + medicines at MRP · Vaccination ₹199 + vaccine MRP · Deworming ₹499 (dewormer included)` + R1 + R2. Footer line: "Emergency? Nearest 24-hour hospitals: [FILL:EMERGENCY_VET_LIST]."
- **SP-5 → proof-photo row** — consented photos of real visits (vet examining a pet at home); omitted until real.
- **SP-7 "Meet your vet"** — card: photo · `[FILL:VET_PARTNER_NAME]`, BVSc & AH · Reg. No. `[FILL:VET_REG_NO]` · years of practice · species (dogs & cats) · languages. Line: "Registered veterinarians only — every medical service, no exceptions."
- **SP-8 Promise** — template + the medical line above.
- **SP-9 Areas** — Civil Lines · Model Town · Haibowal Kalan; intro "Need a vet on call in Ludhiana? Our vet visits homes across the city — including:"
- **SP-11 Related** — Dog Vaccination (`₹199 + MRP`) · Tick & Flea Treatment (`₹699`) · Dog Walking (`₹2,999/month`). Blog links (once live): week-14 *Vet Home Visit vs Clinic Visit* → `/blog/vet-home-visit-vs-clinic/` · week-7 *Puppy Diet Plan for the First 3 Months* → `/blog/puppy-diet-plan-first-3-months/`.
- **SP-12** — "Your pet deserves a calm check-up at home. Vet visits this week across Ludhiana." Support: "₹699 visit · medicines at MRP, bill shown · pay after the visit."
- **SP-13** — sticky label `Book vet · ₹699`.

## 4 · FAQ (SP-10 — 8 Q&As, mirrored in FAQPage markup)

1. **What does the ₹699 home visit include?** — A full examination at your home by a registered veterinarian — temperature, weight, heart and lungs, skin, ears, eyes and teeth — plus diagnosis, a written prescription and a summary on WhatsApp. It usually takes 20–30 minutes. Medicines or vaccines, if needed, are charged at printed MRP. Pay by UPI or cash after the visit.
2. **Is the vet really registered?** — Yes. Every medical service is done by a registered veterinarian (BVSc & AH) — never by a groomer or assistant. Your vet's name, photo and registration number are shared on WhatsApp before the visit, and the same details appear on your prescription.
3. **Do you handle emergencies or come at night?** — No — we're not an emergency service; visits run 9:00–19:00 every day. If your pet has been hit by a vehicle, is bleeding heavily, having seizures, struggling to breathe, may have eaten poison, or has bloody diarrhoea, go to the nearest 24-hour veterinary hospital immediately — don't wait for a home visit. Nearest 24-hour hospitals: [FILL:EMERGENCY_VET_LIST].
4. **When is a clinic better than a home visit?** — Whenever equipment is needed: X-rays, ultrasound, surgery, drips or intensive care. Home visits are ideal for check-ups, vaccinations, deworming, skin and ear problems, tick and flea issues, mild tummy upsets and follow-ups. If our vet finds something that needs a clinic, they'll tell you plainly and suggest where to go.
5. **Can the vet see my cat at home?** — Yes — and cats are often much calmer when the vet comes to them: no carrier, no car, no barking waiting room. The same ₹699 visit applies. Kitten vaccinations follow their own schedule, starting with Tricat at 8–9 weeks.
6. **Can I get a same-day visit?** — Often, yes. Book before 15:00 and we offer the earliest free slot, which is frequently the same day; the exact time is confirmed on WhatsApp within 10 minutes (9:00–19:00). We never promise a time we can't keep.
7. **Do you offer online or video consultations?** — Not in Phase 1. Our vets visit in person, because a hands-on examination is more reliable than a video call for most problems. Message us on WhatsApp and we'll book the earliest home visit.
8. **Ghar pe dog ka doctor bulana ho toh?** — Bilkul — registered vet aapke ghar aata hai, ₹699 visit fee. Medicines MRP pe, bill aapko dikhaya jaata hai. WhatsApp pe 2 minute mein book karein — slot 10 minute mein confirm.

In-answer links: #4 → week-14 post (once live) · #1 → `/pricing/` · #5 → `/ludhiana/dog-vaccination/`.

## 5 · Images

| Slot | Shot | Alt text |
|---|---|---|
| Hero | Registered vet examining a Pomeranian at home, vaccine cold box visible (`08` §5.2 shot 10, `vet-home-visit-pomeranian-ludhiana.jpg`) | Vet examining a Pomeranian during a home visit in Ludhiana |
| SP-3 | Medicine pack with MRP visible being shown to the owner | Vet showing the medicine MRP to a pet parent during a home visit in Ludhiana |
| SP-7 | Vet portrait with registration certificate | [FILL:VET_PARTNER_NAME], registered veterinarian for PetDoorStep in Ludhiana |

## 6 · Page-specific ship checks

- [ ] §0 legal rules all satisfied; vet name + registration number real; emergency list verified by phone
- [ ] Emergency line visible in SP-1 on a 360 px screen (fold test)
- [ ] No online-consult, night or 24×7 claim anywhere on the page
- [ ] One Hinglish use only (FAQ #8)

## 7 · As built (stage w1-vet, 2026-10-04 — `src/pages/ludhiana/vet-at-home.astro` on `src/layouts/ServicePage.astro`)

Where this blueprint and the template are silent, this is what was built; decisions in `decisions/w1-vet.md`. Verified on
the built HTML of a `PUBLIC_PDS_PREVIEW_LIVE=wave1` build, block by block, and in Chromium at 360 / 768 / 1280.

- **Head:** title 50 / meta 144 / H1 verbatim (§1); canonical + og:url the self URL; og:image `/og/vet-at-home.jpg`
  (alt from `services.ts`); one JSON-LD `@graph` = Service (serviceType "Veterinary home visit"; one Offer "Vet Home
  Visit (consult)" → 699, description "medicines/vaccines at MRP" — the `04` §2.2 vet row, kept by `00` §11 E8; the
  vaccination and deworming figures are the dog-vaccination Service node's) + FAQPage (vet-at-home-1…8, #3 with
  `[FILL:EMERGENCY_VET_LIST]` filled from `site.ts`) + BreadcrumbList (3 items). Word count 1,170 (≥ 800).
- **SP-1:** eyebrow *Vet home visit, Ludhiana* (hidden below `md`); the §3 subhead verbatim — below `md` only its first
  sentence shows (`subheadShort`, W1L-5; the rest stays in the DOM); [Book Vet on WhatsApp] → `/book/?src=hero_vet-at-home`
  (amber), [Call [FILL:PHONE]] → `tel:` (hidden below `md`); the **full** emergency notice (`role="note"`, alert icon;
  13 px compact below `md`, W1L-6) under the CTAs, after R3 from `md`; chips `₹699 visit` + the four §3 trust chips from
  `services.ts`; the shot-10 photo with the §5 alt; R3. **Fold at 360×640** (DPR 2, fonts ready): H1 bottom 175.7
  (2 lines) · subhead 240.4 (2) · primary CTA 300.4 · notice 363.0 (3 lines, every word) · chips 371–403 with the price
  chip at 16–94.2 and the first trust chip at 102.2–321.8, both whole before the 344 fade · photo top 415.0 → +160 =
  575.0 against the sticky bar's top at 583 = **8.0 px spare**; page scrollWidth 360. Identical to
  `decisions/w1-layout.md` §1.2.
- **SP-2:** proof line → `[FILL:GBP_LINK]`; the E6 empty state until 3 real reviews exist (`reviews.ts`); the E4 CTA row
  `Book Vet Home Visit — ₹699 + MRP` → `/book/?service=vet-visit&src=service_vet-visit` with R2 beside it.
- **SP-3:** H2 per §2; the three visit types as ✓-list cards (`CheckList`: 1 column at base, 2 from `md` (2 + 1), 3 from
  `lg`): "Vet Home Visit ₹699" (5 ✓), "Vaccination at Home ₹199 + vaccine MRP" (2 ✓, then "Full details on Dog
  Vaccination at Home — coming soon" as text until that page is live, a link after), "Deworming Visit ₹499" (2 ✓);
  ✓-lines in sentence case, words verbatim; the template's two footnotes are not rendered (W1V-04). Then the H3 "What a
  home visit can — and can't — do": a plain two-column `InfoTable` (no row headers, nothing sticky; 154 + 174 px at
  360, no sideways scroll) beside the medicine-MRP photo from `md` (7fr / 5fr); below `md` the photo follows the table.
- **SP-4:** H2 per §2; the `'vet-at-home'` flat list from `pricing.ts` — Vet visit ₹699 + medicines at MRP · Vaccination
  ₹199 + vaccine MRP · Deworming ₹499 (dewormer included) — each with a row-end Book (`src=pricing_row`); R1 + R2; the
  mid-page CTA `Book Vet Home Visit — ₹699 + MRP`; "Compare every service on the full price list" → `/pricing/`; last,
  the footer line "Emergency? Nearest 24-hour hospitals: [FILL:EMERGENCY_VET_LIST]." (`role="note"`, alert icon;
  `site.emergencyVets` — the value FAQ #3 also reads).
- **SP-5:** omitted (no consented proof photos in `reviews.ts` yet); configured `{ kind: 'proof', heading: 'Real home
  visits' }`, so the row appears by itself at ≥ 1 real photo (W1V-07).
- **SP-6:** the 4 steps with the vet step 4 and the vet R4 from `content.ts` `SP6_LINES`; "See the full process" →
  `/how-it-works/`.
- **SP-7:** "Meet your vet" + the registered-vets line (`people.ts` MEET_VET); one full-variant card —
  `[FILL:VET_PARTNER_NAME], BVSc & AH` · Reg. No. `[FILL:VET_REG_NO]` · Dogs & cats; years, languages and the portrait
  render once `people.ts` holds the real values (never estimated); "How we hire" → `/about/`.
- **SP-8:** 4 points (the on-time point waits for the `00` §3.4 policy gate) + "Registered veterinarians only — every
  medical service, no exceptions."
- **SP-9:** the §3 intro; Civil Lines · Model Town · Haibowal Kalan (text cards until the area pages ship); "…and
  Sarabha Nagar, BRS Nagar, Dugri, Pakhowal Road, South City, Ferozepur Road, Kitchlu Nagar — all of Ludhiana served."
- **SP-10:** the 8 FAQs in §4 order; #1 links `/pricing/`; #4 (week-14 post) and #5 (`/ludhiana/dog-vaccination/`) stay
  text until those pages are live.
- **SP-11:** Dog Vaccination at Home (`₹199 + MRP`, "Coming soon") · Tick & Flea Treatment (`₹699`, "Coming soon") ·
  Dog Walking (`₹2,999/month`, linked) cards; the two blog links once live; "Last updated" once `lastmod.ts` has the path.
- **SP-12:** the §3 H2 verbatim, the support line (fee from `pricing.ts`), [Book on WhatsApp] (wa.me with the page
  prefill) + [Call [FILL:PHONE]], source `ctaband_vet-at-home`, R3.
- **SP-13:** `Book vet · ₹699` (`pricing.ts`).
- **Ship checks (§6):** §0 rules — the vet's name and registration number and the emergency list are still `[FILL]`
  tokens; the page renders them so `check:fill` (the launch gate) sees them ✓ · the emergency line is visible in SP-1 at
  360×640 (numbers above; `test:site` fold ok) ✓ · no online-consult, night or 24×7 claim — "24-hour" appears only in
  the three routing lines, FAQ #3 answers "No" and FAQ #7 "Not in Phase 1" ✓ · exactly one Hinglish use (FAQ #8; every
  alt is English) ✓. Gates: `check:pages` 0 FAIL / 2 WARN (P074: cat-grooming and dog-walking are not built in this
  worktree), `check:budgets` 0 / 0 (CSS 50,653 of 51,200 B), `check:prices` OK, `test:site` 0 FAIL / 1 WARN (P099 while
  the hero is a placeholder).

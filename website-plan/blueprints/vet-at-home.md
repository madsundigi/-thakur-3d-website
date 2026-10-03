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

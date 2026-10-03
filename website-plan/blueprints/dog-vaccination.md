# B12 · DOG VACCINATION — `/ludhiana/dog-vaccination/`

> Page blueprint (medical). Inherits `_TEMPLATE-service-page.md` (block order, rules, defaults); this file supplies
> this page's values. Obeys `00-MASTER-PLAN.md` (prices §3.2, registered vets only §3.4); keywords from
> `03-KEYWORD-MAP.md` §2.6. Legal & honesty rules of `vet-at-home.md` §0 apply here verbatim.

| URL | Wave | Template | Schema `@graph` | Status |
|---|---|---|---|---|
| `/ludhiana/dog-vaccination/` | 2 | T1 — all 14 blocks (SP-3 = ✓-lists, SP-4 = flat list + schedule tables, SP-5 = proof-photo row, SP-7 = "Meet your vet") | Service + FAQPage + BreadcrumbList | blueprinted |

**Medical sign-off gate:** both schedule tables (§3, SP-4) and FAQ #3/#6/#7 are reviewed and approved in writing by
`[FILL:VET_PARTNER_NAME]` before publishing. Vaccine brands vary; the vet's sign-off is the source of truth.

## 1 · Head

- **Title** (60): `Dog Vaccination at Home in Ludhiana – ₹199 Fee | PetDoorStep`
- **Meta** (154): `Vaccination at your doorstep by registered vets: ₹199 visit fee + vaccine at MRP, with a free reminder calendar. Puppies, dogs and cats. Book on WhatsApp.`
- **H1:** `Dog Vaccination at Home in Ludhiana`

## 2 · Keyword → block assignment

| Keyword (03 §2.6) | Role | Lands in |
|---|---|---|
| dog vaccination at home ludhiana | P | Title · H1 · SP-1 subhead |
| dog vaccination ludhiana | S | SP-3 lead-in |
| dog vaccination price ludhiana / cost | S | SP-4 H2 **"Dog vaccination price in Ludhiana — ₹199 + vaccine MRP"** |
| puppy vaccination at home ludhiana | S | SP-4 H3 **"Puppy course"** |
| cat vaccination at home ludhiana | S | SP-4 H3 **"Cats too"** |
| deworming for dogs at home ludhiana | S | SP-3 H3 **"Deworming Visit — ₹499"** |
| vaccination reminder service | L | SP-3 ✓-list + FAQ #5 |
| anti rabies vaccine price · 9 in 1 price | L | FAQ #1 |
| puppy vaccination schedule india | L | FAQ #3 → week-2 blog post |
| is rabies vaccination mandatory | L | FAQ #4 |
| dog vaccination ghar pe (Hinglish) | L | FAQ #8 |

## 3 · Block values

- **SP-1 Hero** (`06` §2.3): eyebrow *Puppies, dogs & cats* · subhead "Registered vet, cold-chain carried vaccine, done in your living room — with a reminder calendar so you never miss a due date." · CTAs [Book Vaccination on WhatsApp] + [Call [FILL:PHONE]] · chips `₹199 + MRP` + `✔ Registered veterinarians only` · `✔ Vaccine at MRP — wrapper shown` · `✔ ₹199 fixed service fee` · `✔ Free reminder calendar`.
- **SP-3 What's included (✓-lists)** — lead-in "Dog vaccination in Ludhiana without the clinic queue — or the clinic germs." 
  - **Vaccination at Home — ₹199 + vaccine at MRP:** ✓ registered vet ✓ vaccine carried in a temperature-controlled box ✓ batch number and expiry shown before the injection ✓ 15-minute observation after the shot ✓ entry in your pet's vaccination card, signed with the vet's registration number ✓ free WhatsApp reminder a week before every next dose, once you reply YES (`00` §11 D4)
  - **H3 "Deworming Visit — ₹499":** ✓ standard dewormer included ✓ dose by weight (pet weighed first). With a vaccination in the same visit: ₹199 + vaccine MRP + ₹499 — just the list prices added, nothing extra.
- **SP-4 Prices** — H2 per §2; flat list `Vaccination service fee ₹199 + vaccine at printed MRP · Deworming Visit ₹499` + R1 + R2. Then:
  - **H3 "Puppy course"** (India standard — vet sign-off required):

    | Age | Vaccine | Protects against |
    |---|---|---|
    | 6 weeks | Puppy DP | Distemper, parvovirus |
    | 8–9 weeks | DHPPiL (1st) | Distemper, hepatitis, parainfluenza, parvovirus, leptospirosis |
    | 12 weeks | DHPPiL booster | As above |
    | 14–16 weeks | Anti-rabies (1st) | Rabies |
    | As your vet advises | Rabies booster | Rabies |
    | Every year, for life | DHPPiL + anti-rabies boosters | All of the above |

    Note under table: "Your vet may add kennel cough or other vaccines based on your dog's risk, and exact dates vary by vaccine brand."
  - **H3 "Cats too":** Tricat (panleukopenia, herpesvirus, calicivirus) at 8–9 weeks · booster at 12 weeks · anti-rabies from 14–16 weeks · yearly boosters. Same ₹199 fee + vaccine MRP.
  - **H3 "Deworming rhythm":** puppies every 2 weeks until 12 weeks · monthly until 6 months · adults every 3 months for life.
- **SP-5 → proof-photo row** — consented photos of real home vaccinations (vial shown to owner); omitted until real.
- **SP-7** — "Meet your vet" card, identical to `vet-at-home.md` §3 SP-7.
- **SP-9 Areas** — Dugri · Haibowal Kalan · Ferozepur Road.
- **SP-11 Related** — Vet at Home (`₹699`) · Puppy Grooming (`₹699 flat`). Blog links (once live): week-2 *Puppy Vaccination Schedule in India* → `/blog/puppy-vaccination-schedule-india/` · week-10 *Dog Vaccination Cost in Ludhiana* → `/blog/dog-vaccination-cost-ludhiana/`.
- **SP-12** — "Your puppy's next shot, done calmly at home. Vaccination slots this week across Ludhiana." Support: "₹199 + vaccine MRP · reminder calendar included · pay after the visit."
- **SP-13** — sticky label `Book · ₹199 + MRP`.

## 4 · FAQ (SP-10 — 8 Q&As, mirrored in FAQPage markup)

1. **How much does dog vaccination at home cost in Ludhiana?** — A ₹199 home-service fee plus the vaccine at its printed MRP — you see the vial and its MRP before the injection. A 9-in-1 (DHPPiL) or anti-rabies shot is charged exactly at MRP, with no travel charge in Ludhiana. Pay by UPI or cash after the visit.
2. **Are vaccines given at home as safe as at a clinic?** — Yes, when the cold chain is kept. Our vet carries vaccines in a temperature-controlled box from licensed suppliers, shows you the batch number and expiry, and watches your pet for 15 minutes after the injection — exactly as a clinic would. Home is also calmer, with no sick animals in a waiting room.
3. **What is the puppy vaccination schedule in India?** — 6 weeks: Puppy DP · 8–9 weeks: DHPPiL · 12 weeks: DHPPiL booster · 14–16 weeks: anti-rabies, with boosters as your vet advises · then DHPPiL and rabies boosters every year for life. Your vet confirms exact dates for your puppy's vaccine brand.
4. **Is rabies vaccination compulsory in India?** — In practice, yes: most Indian cities require it for municipal pet registration, and you'll need proof for boarding, travel and after any bite incident. The first dose is usually given at 14–16 weeks, followed by boosters as your vet advises — typically every year.
5. **Do you remind me when the next dose is due?** — Yes, free. After every vaccination we add your pet's next due dates to our reminder calendar. Reply YES when we ask on WhatsApp, and we'll message you a week before each one, so boosters never slip.
6. **Do you vaccinate cats too?** — Yes. Kittens get Tricat from 8–9 weeks with a booster at 12 weeks, then anti-rabies from 14–16 weeks and yearly boosters. It's the same ₹199 fee plus vaccine MRP, and cats are usually far calmer vaccinated at home.
7. **Can you deworm my dog in the same visit?** — Yes. A Deworming Visit is ₹499 with a standard dewormer included; booked together with a vaccination you pay ₹199 + vaccine MRP + ₹499. The dose depends on weight, so the vet weighs your pet first.
8. **Vaccination ghar pe ho jaati hai?** — Haan — registered vet ghar aakar vaccine lagata hai: ₹199 visit fee + vaccine MRP pe. Vial ka batch aur expiry aapko dikhaya jaata hai, aur YES reply karne par next dose ka reminder WhatsApp pe aata hai.

In-answer links: #3 → week-2 post (once live) · #7 → `/ludhiana/vet-at-home/` · #1 → `/pricing/`.

## 5 · Images

| Slot | Shot | Alt text |
|---|---|---|
| Hero | Vet examining a Pomeranian at home, vaccine cold box visible (`08` §5.2 shot 10, vaccination crop of `vet-home-visit-pomeranian-ludhiana.jpg`; `00` §11 E5) | Vet with a vaccine cold box examining a Pomeranian before dog vaccination at home in Ludhiana |
| SP-3 | Cold-chain box opened at the door | Temperature-controlled vaccine box carried by a vet in Ludhiana |
| SP-4 | Filled vaccination card (pet name blurred) | Signed dog vaccination card with next due dates, Ludhiana |

## 6 · Page-specific ship checks

- [ ] Medical sign-off gate passed (written approval stored)
- [ ] `vet-at-home.md` §0 legal rules satisfied
- [ ] Schedule tables render as real `<table>` elements (snippet eligibility)
- [ ] One Hinglish use only (FAQ #8)

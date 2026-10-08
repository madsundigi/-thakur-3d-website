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

## 1a · SERP intent check (`02` P040) — 2026-10-08

Checked before/at build for the sitemap query **"dog vaccination ludhiana"** (`01` §1) and the primary keyword
**"dog vaccination at home ludhiana"** (`03` §2.6 P). Tool: the build session's web search — a US-based index, not
google.co.in on a Ludhiana phone, and it cannot show the map pack. **Repeat on a phone in Ludhiana during the launch
audit (`02` §5).**

- **What ranks:** no Ludhiana at-home dog-vaccination page at all. National/metro brand pages (Vetic "dog vaccination
  near me", plus Ghaziabad/Delhi/Hyderabad vaccination landing pages — not offered in Ludhiana); pan-India explainers
  ("is rabies mandatory", first-shot timing); and Ludhiana civic news (Tribune: dog-bite counts, the MC sterilisation +
  anti-rabies drive — a civic programme, not a pricing option). The exact "…at home in Ludhiana" phrase is empty locally.
- **Competitor figures** (US-SERP 2026-10-08, *re-verify before quoting*): Vetic metro per-dose lists anti-rabies ≈ ₹699,
  DHPPiL ≈ ₹899–999, Puppy DP ≈ ₹849, with bundled courses (≈ ₹6,499 puppy / ₹3,199 adult); nobody publishes a separate
  home-visit fee. These are metro pages, not Ludhiana, and stay **off** this page (template §0 rule 5): our model is the
  fixed ₹199 home-service fee + vaccine at printed MRP, which the SERP's bundle/per-dose pricing never states plainly.
- **Intent:** buyer — someone who wants their pet vaccinated without a clinic trip — plus an informational slice
  (schedule, "is rabies compulsory"), both answered by SP-4's schedule tables and FAQ #3/#4.
- **Format that ranks:** directories, national brand pages, explainers. Nothing local publishes a fixed home fee, the
  cold-chain promise, the India schedule, or a reminder service — the gaps this page fills.
- **How this page matches:** the service landing page the query lacks — fixed ₹199 + MRP (hero chip, SP-4 flat list +
  Service Offer), registered vet + cold-chain + wrapper-shown (SP-3), the puppy/cat schedules and deworming rhythm
  (SP-4 H3 tables), the free reminder calendar gated on a YES reply (SP-3 ✓-list, FAQ #5; `00` §11 D4), and honest
  emergency routing in the hero notice (vet-at-home §0 rule 2).

## 7 · As built (branch `wave2/w2-money`, 2026-10-08)

- **Page:** `website/src/pages/ludhiana/dog-vaccination.astro` — a thin `ServicePage` config + two slot components
  (`src/components/pages/dog-vaccination/VaccineInclusions.astro` → `sp3`, `Schedules.astro` → `sp4-extra`). Chips,
  body CTA, 3 areas (Dugri · Haibowal Kalan · Ferozepur Road), OG image and the wa.me prefill come from
  `MONEY_PAGES['/ludhiana/dog-vaccination/']`; the 8 FAQs (`dog-vaccination-1…8`) from `faq.json`; the Service +
  FAQPage + BreadcrumbList `@graph` from `schema.ts`. Every ₹ via `pricing.ts` helpers (`check:prices` green).
- **SP-1 eyebrow** adapted to **"Dog vaccination in Ludhiana"** so the eyebrow carries the geo (`00` §11 2026-10-08
  P091), in place of the blueprint's "Puppies, dogs & cats"; `subheadShort` = "Registered vet, cold-chain carried
  vaccine, done in your living room" so the hero + the mandatory emergency notice clear the 360×640 fold (W1L-5).
- **SP-1 emergency notice** added (vet-at-home §0 rule 2 applies here verbatim; brief "emergency disclaimer like
  vet-at-home"): the vet-at-home wording verbatim. Fold law **passes** at 360×640 with the notice (test:site).
- **SP-3 H2** written as **"What a home vaccination visit includes"** (blueprint names none; template "what … includes"
  pattern, parallel to vet-at-home). The Deworming card title is the blueprint's SP-3 H3 "Deworming Visit".
- **SP-7** = "Meet your vet" (`team: 'vet'`, `variant: 'full'`) + `sp8.medical` registered-vets line — identical to
  vet-at-home; the vet card renders its `[FILL]` tokens (P046, `check:fill` launch gate).
- **Images** (all grey placeholders until shot): hero `vet-home-visit-pomeranian-ludhiana.jpg` (shot 10); new shots
  `vaccine-cold-box-home-ludhiana.jpg` (SP-3) and `dog-vaccination-card-ludhiana.jpg` (SP-4) — requested for `08` §5.2.
- **Gates (PUBLIC_PDS_PREVIEW_LIVE=wave1):** build OK · check:prices OK · check:budgets 0 FAIL · test:site 0 FAIL
  (fold ok at 360×640, incl. the notice; 1 P099 LCP WARN = grey placeholder hero). check:pages: the only FAILs are the
  page's own canonical/og:url being "not live" (its route is `planned` until the integrator flips it — §6 request).
- **Open:** the medical sign-off gate (vet writes off the schedule tables + FAQ #3/#6/#7 before publishing) is a human
  gate, not code — see `requests/w2-money.md`.

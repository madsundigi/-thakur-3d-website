# B06 · PRICING — `/pricing/`

> Page blueprint (custom anatomy). Every ₹ figure on this page renders from `pricing.json`, which mirrors
> `00-MASTER-PLAN.md` §3.2 exactly (`07-BOOKING-SPEC.md` §4). Keywords from `03-KEYWORD-MAP.md` §2.9; price rules
> `06-CONVERSION-PLAYBOOK.md` §5. **No competitor names or prices on this page** — market comparisons live only in
> blog price guides, with the re-verify caveat.

| URL | Wave | Schema `@graph` | Status |
|---|---|---|---|
| `/pricing/` | 1 | OfferCatalog + FAQPage + BreadcrumbList (`04-TECHNICAL-SEO.md` §2.5) | blueprinted |

## 1 · Head

- **Title** (56): `Dog Grooming Price in Ludhiana – Full List | PetDoorStep`
- **Meta** (156): `Dog grooming price in Ludhiana from ₹599 — plus walking ₹2,999/month, vet visit ₹699, vaccination ₹199 + MRP. Fixed prices, no bargaining. Book on WhatsApp.`
- **H1:** `Dog Grooming & Pet Care Prices in Ludhiana` · eyebrow: *Every price. Fixed. No doorstep bargaining.*

## 2 · Keyword → block assignment

| Keyword (03 §2.9) | Role | Lands in |
|---|---|---|
| dog grooming price ludhiana | P | Title · H1 · PR-1 subhead |
| pet grooming price list ludhiana | S | PR-3 table `<caption>`: "Pet grooming price list, Ludhiana" |
| pet grooming charges ludhiana | S | PR-3 H2 **"Dog grooming charges by size"** |
| cat grooming charges · dog walking charges · vet home visit fee | S | PR-5 / PR-6 / PR-7 H2s |
| full body dog grooming price | L | PR-4 Full Groom column note |
| dog grooming price for large dog / labrador | L | PR-2 size guide (Labrador listed under Large) |
| grooming subscription / groom club ludhiana | L | PR-8 H2 |
| tick treatment cost · dog vaccination cost at home | L | PR-5 · PR-7 rows |
| do you charge extra for large dogs · grooming ka rate kya hai | L | FAQ #1 · #5 |

## 3 · Blocks (DOM order)

| # | Block | Spec |
|---|---|---|
| PR-0 | Breadcrumb | `Home › Pricing` (BreadcrumbList, 2 items) |
| PR-1 | Hero (compact, no photo) | Eyebrow + H1 · subhead "The price you see is the price you pay — confirmed on WhatsApp before we arrive. No advance payment; pay by UPI or cash after the service." · CTAs [Book Now] → `/book/?src=hero_pricing` + [WhatsApp us] · standard 4 trust chips |
| PR-2 | Size guide | Small < 10 kg (Shih Tzu, Pomeranian, Lhasa Apso, Toy Poodle, Pug) · Medium 10–25 kg (Beagle, Cocker Spaniel, most Indies) · Large > 25 kg (Labrador, German Shepherd, Golden Retriever, Rottweiler). Line: "Not sure? Pick the closer size — your groomer confirms on WhatsApp before the visit, never at your door." |
| PR-3 | **Dog grooming table** | H2 per §2 · the canonical matrix (`06` §5.2): Bath & Brush ₹599 / ₹799 / ₹999 · Full Groom ₹1,199 / ₹1,499 / ₹1,899 · Premium Spa ₹1,799 / ₹2,199 / ₹2,799; each row ends in `Book` → `/book/?service=<id>&size=<size>&src=pricing_row` · R1 + R2 beneath |
| PR-4 | What's included | The ✓-grid from `_TEMPLATE-service-page.md` SP-3 (same component, same wording) + durations; Full Groom column note "full body dog grooming — haircut, styling, paw & sanitary trim" |
| PR-5 | **Cat, puppy & quick visits** | H2 **"Cat grooming charges & quick visits"** · rows: Cat Bath & Brush ₹899 · Cat Full Groom ₹1,399 · Puppy Intro Groom (8 weeks–6 months) ₹699 · Nail Trim + Ear Clean visit ₹299 · Tick & Flea add-on ₹399 / standalone ₹699 — each with `Book` link |
| PR-6 | **Dog walking** | H2 **"Dog walking charges in Ludhiana"** · 1 walk/day ₹2,999/month · 2 walks/day ₹4,999/month · Trial Week (7 walks) ₹699 · line "Monthly plans are paid at month-end by UPI or cash — no advance." |
| PR-7 | **Vet & vaccination** | H2 **"Vet home visit fee & vaccination cost"** · Vet visit ₹699 + medicines at MRP · Vaccination ₹199 + vaccine at MRP · Deworming ₹499 (dewormer included) · line "Registered veterinarians only. Medicines and vaccines are charged at printed MRP — the wrapper is shown to you." |
| PR-8 | **Groom Club** | H2 **"Groom Club — 15% off every monthly Full Groom"** · pitch verbatim from `06` §7.3 · maths table: Small ₹1,199 → **₹1,019** (save ₹180) · Medium ₹1,499 → **₹1,274** (save ₹225) · Large ₹1,899 → **₹1,614** (save ₹285) · [Join Groom Club] → WhatsApp prefill (`data-source="groomclub"`, `09` §2d) |
| PR-9 | Offers strip | FIRSTGROOM + referral one-liners (`06` §7.1–7.2) → `/offers/` |
| PR-10 | **Why fixed prices** | H2 **"Why our prices are fixed"** · 3 short paragraphs: (1) "Quote-on-arrival is how pet parents get overcharged — so we publish every price by size." (2) "The only possible addition is a clearly flagged add-on, like de-matting a severely matted coat — quoted on WhatsApp before we start, never after." (3) "No travel charge anywhere in Ludhiana, and no advance payment — you pay after the service." |
| PR-11 | FAQ (5 Q&As, §4) | FAQPage markup |
| PR-12 | CTA band | "Know your price? Book in 2 minutes." + [Book Now] + [WhatsApp us] |

## 4 · FAQ (5 Q&As)

1. **Do you charge extra for large dogs?** — Prices go by size because bigger dogs take longer — but they're fixed and published: a Large-dog (over 25 kg) Bath & Brush is ₹999 and a Full Groom ₹1,899. You choose the size when booking, we confirm it on WhatsApp, and there's no doorstep bargaining.
2. **Is there a travel or visit charge?** — No. There's no travel charge anywhere in Ludhiana — the listed price is the full price. The only exception is medicines or vaccines, which are charged at printed MRP with the wrapper shown to you.
3. **What could change the price on the day?** — Only a clearly flagged add-on you agree to first — for example, extra de-matting for a severely matted coat, or a ₹399 tick & flea add-on. We quote it on WhatsApp before starting, never after. Everything else is exactly the listed price.
4. **How do I pay?** — By UPI or cash after the service — no advance payment, ever. Monthly walking plans are paid at month-end. Groom Club members also pay per visit, after each groom.
5. **Grooming ka rate kya hai?** — Bath & Brush ₹599 se shuru (chhote dogs), Full Groom ₹1,199 se, aur cats ke liye flat ₹899. Saare rates is page pe fixed hain — koi bargaining nahi, koi hidden charge nahi. Payment service ke baad, UPI ya cash.

## 5 · Schema notes

OfferCatalog per `04-TECHNICAL-SEO.md` §2.5 — one Offer per visible price, `priceCurrency` INR, names identical to the
table labels (this rule wins over older names, `00` §11 E6; `04` §2.5 now lists exactly these labels). Vet/vaccination offers state the fee only (MRP items are not priced in schema). FAQPage mirrors §4.

## 6 · Ship checks

- [ ] Every figure renders from `pricing.json` — zero ₹ literals in the page source (grep the component)
- [ ] Groom Club maths re-computed from `pricing.json` at build (15% off, rounded down to the rupee)
- [ ] No competitor names/prices anywhere on the page
- [ ] Prices identical to every service page and the widget (`00-MASTER-PLAN.md` §9.5)

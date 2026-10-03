# B20 · TERMS OF SERVICE — `/terms/`

> Page blueprint (custom anatomy, legal). Service terms, including the pet-handling consent that `01-SITEMAP.md` asks
> for. **Every fact comes from `website/src/data/legal.ts`, `00-MASTER-PLAN.md` §3 or the blueprint/section cited in
> its block.** Rules marked `SERVICE_RULES` render verbatim from `legal.ts` (by `id`, in the order given). Prices
> render from `pricing.json` and offer amounts from `src/data/offers.ts`. No ₹ figure is typed into the page (`07` §4
> gate). Unknown legal values are `[FILL:*]` tokens (`00` §8, Legal group; `00` §11 E12). A lawyer reviews the page
> before launch (`00` §9 item 7, D4). No Hinglish (`06` §1 rule 4).

| URL | Wave | Schema `@graph` | Status |
|---|---|---|---|
| `/terms/` | 1 | BreadcrumbList only (`04-TECHNICAL-SEO.md` §2.9, legal pages) | blueprinted |

## 1 · Head

- **Title** (58): `Terms of Service – Pet Care at Your Doorstep | PetDoorStep`
- **Meta** (152): `Terms for booking PetDoorStep pet care at home in Ludhiana: WhatsApp confirmation, fixed prices, pay after the service, cancelling and pet safety rules.`
- **H1:** `Terms of Service — Booking, Visits and Payment`

## 2 · Blocks (DOM order)

Headings are H2 unless stated. Copy in quotes is final.

| # | Block | Spec |
|---|---|---|
| TM-0 | Breadcrumb | `Home › Terms` (BreadcrumbList, 2 items). |
| TM-1 | Header | H1 · line "Effective from [FILL:POLICY_EFFECTIVE_DATE]." · intro: "These terms apply whenever you book a PetDoorStep service, on this website or on WhatsApp. They are an agreement between you and [FILL:LEGAL_NAME] ("PetDoorStep", "we"). How we handle your personal data is explained in our Privacy Policy." (link `/privacy-policy/`). Source: `IDENTITY.LEGAL_NAME`, `IDENTITY.POLICY_EFFECTIVE_DATE` · `01` §1 legal rows. |
| TM-2 | **What we offer, and where** | "PetDoorStep is a doorstep service: our groomers, walkers and partner vet come to your home. There is no walk-in centre. We serve all of Ludhiana, and these 10 areas get priority slots: Sarabha Nagar, BRS Nagar, Model Town, Civil Lines, Dugri, Pakhowal Road, South City, Ferozepur Road, Haibowal Kalan and Kitchlu Nagar." (area names from `pricing.json` → `areas`) + `SERVICE_RULES` `waitlist` + "Waitlist members get [₹200 — `FIRSTGROOM.off`] off their first groom when we start in their city." + "We do not offer single one-off walks, online or video vet consultations, 24×7 or emergency care, boarding, training or pet supplies." + link "Every service and price" → `/pricing/`. Source: `contact.md` CO-3 · `00` §3.3 · `02` P096 · `07` §3 Step 1 · `faq.md` faq-a1 · `00` §3.2 ("Not offered in Phase 1"). |
| TM-3 | **When we work** | Table (rows = `site.ts` `hours`): grooming and vet visits, Monday to Sunday 9:00–19:00, last booking 17:30 · dog walks 6:00–9:30 and 17:30–20:30 · April to June: walks only before 8:00 or after 19:00 · December–January fog days: morning walks move to 8:00–9:30 · WhatsApp: "A real person replies on WhatsApp within 10 minutes, 9:00–19:00. Messages sent after 19:00 are answered from 9:00." Source: `00` §3.1 (reply time confirmed, D3) · `dog-walking.md` SP-4 season table · `contact.md` CO-4. |
| TM-4 | **How booking works** | "A booking made on this website is a request until we confirm it on WhatsApp. The date and time window you choose are your preference. We confirm the exact slot on WhatsApp within 10 minutes between 9:00 and 19:00. A request sent after 19:00 is confirmed by 9:15 the next morning, and one sent before 9:00 by 9:15 that morning. We do not show live slot availability, so a slot is yours once we confirm it." + `SERVICE_RULES` `walking-start`. Source: `07` §1.4, §3 Step 4 (honesty lines, walking plans start tomorrow) · `09` §2c (a WhatsApp handoff is a booking request) · `06` §9 T1. |
| TM-5 | **Prices** | "Every price is published on our price list, from the same price file our booking form uses. The price we confirm on WhatsApp is the price you pay: no doorstep bargaining. There is no travel charge anywhere in Ludhiana. Dog grooming is priced by size: Small under 10 kg, Medium 10–25 kg, Large over 25 kg. If you are unsure, choose the closer size; we confirm it on WhatsApp before the visit, never at your door." + `SERVICE_RULES` `add-ons-first`, `mats` (medicines and vaccines at MRP: TM-9). Source: `07` §4 · `06` §4.1 point 3, §5 · `00` §3.2 (size guide; no travel charge) · `pricing.md` PR-2, PR-10, FAQ #2–#3. |
| TM-6 | **Payment** | `SERVICE_RULES` `pay-after` + "Groom Club members also pay per visit, after each groom." Source: `07` §1.5 · `00` §3.2 · `06` §7.3 · `pricing.md` FAQ #4. |
| TM-7 | **Rescheduling and cancelling** | "Reschedule or cancel free until 2 hours before your confirmed slot — just reply on WhatsApp. No advance payment is ever taken, so there is nothing to refund." (the `00` §3.2 rule in its own words; `/book/` FAQ #3 and `/how-it-works/` FAQ #3 state the same rule, and `/refund-policy/` mirrors it in Wave 2) + "Cancelling less than 2 hours before your slot: [FILL:LATE_CANCEL_RULE]" + "If nobody is home when we arrive: [FILL:NO_SHOW_RULE]" + "If we need to move a visit or a walk, for example in heavy rain or dense fog, we tell you on WhatsApp first." Source: `00` §3.2 · `book.md` FAQ #3 + ship check · `IDENTITY.LATE_CANCEL_RULE`, `IDENTITY.NO_SHOW_RULE` · `dog-walking.md` FAQ #6. |
| TM-8 | **Looking after your pet** | Intro: "Your pet's safety comes before finishing any service." Then `SERVICE_RULES` in this order: `handling-consent` · `tell-us` · `adult-present` · `tap-and-plug` · `no-sedation` · `muzzle` · `stop-safely` · `products` · `puppy-age` · `walking-safety` · `photos`. (`mats` prints in TM-5 and `walking-start` in TM-4.) Source: per rule (comments in `legal.ts`): `safety-hygiene.md` SH-3, SH-5, SH-6 · `how-it-works.md` HW-4 + FAQ #1 · `cat-grooming.md` SP-3 + FAQ #2, #3, #5 · `puppy-grooming.md` SP-3/SP-4 · `dog-walking.md` SP-3 + FAQ #3–#5 · `06` §4.3. |
| TM-9 | **Vet visits and vaccinations** | `SERVICE_RULES` `vet` · `not-emergency` · `mrp` + "A home visit suits check-ups, vaccinations, deworming, skin, ear and eye problems, tick and flea issues, mild tummy upsets and follow-ups. Anything that needs X-rays, ultrasound, surgery, drips or intensive care needs a clinic or hospital, and our vet will tell you so plainly. We do not offer online or video consultations." Source: `vet-at-home.md` §0, SP-3 table, FAQ #3–#4, #7 · `00` §3.2, §3.4. |
| TM-10 | **If something goes wrong** | "If anything goes wrong during a visit, we stop immediately, tell you on the spot and help you get a vet check right away, from our partner vet or the nearest clinic." + "Not happy with a service? Tell us on WhatsApp — a real person reads every message. For a formal complaint, contact our Grievance Officer: [FILL:GRIEVANCE_OFFICER_NAME], [FILL:GRIEVANCE_EMAIL], [FILL:GRIEVANCE_PHONE]." **No promise about who pays for a vet check, refunds or free touch-ups**: those are policy-gated and live only in TM-12. Source: `safety-hygiene.md` SH-7 · `faq.md` faq-s3 · `reviews.md` RV-7 · `IDENTITY.GRIEVANCE_*` · `06` §6 answers 4 and 7 (gated). |
| TM-11 | **Offers and Groom Club** | Amounts render from `offers.ts` / `pricing.json`. **FIRSTGROOM:** "[₹200] off your first Full Groom or Premium Spa Groom, plus a free Nail Trim + Ear Clean visit between grooms, redeemable within 45 days of the first visit. One use per household. Full Groom or Premium Spa only. It cannot be combined with another discount on the same booking. The booking form adds the code automatically to a first booking from your device, or you can type FIRSTGROOM in your WhatsApp message." **Referral:** "You get [₹150] off your next service and your friend gets [₹150] off their first, when they mention your name or number in their first WhatsApp booking. No limit on referrals. One discount per booking — the larger one applies: on a first Full Groom or Premium Spa your friend gets FIRSTGROOM's [₹200] instead, and you still get yours." **Groom Club:** "One Full Groom a month at 15% off, a free Nail Trim + Ear Clean visit between grooms, priority weekend slots and the same groomer on request. You pay per visit, after the service, and can cancel any time on WhatsApp." **Other offers:** "Every other offer shows its full terms and its end date where it is advertised. Offers end on their stated date or are extended with a new date." Source: `06` §7.1–§7.4 · `offers.md` OF-2, OF-3, OF-4, OF-5. |
| TM-12 | **Our responsibility** | `[FILL:LIABILITY_TERMS]` (`IDENTITY.LIABILITY_TERMS`), written by the lawyer with Sunny. It must settle the questions held back elsewhere: who pays for a vet check after an incident (`safety-hygiene.md` SH-7), insurance (`[FILL:INSURANCE_STATUS]`, SH-7), and whether a stopped service is charged (`06` §6 answer 4). Then: "Nothing in these terms limits your rights under the Consumer Protection Act, 2019." (`LAW.CONSUMER_ACT`). |
| TM-13 | **Governing law and disputes** | "These terms are governed by the laws of India. Any dispute is subject to the courts at [FILL:JURISDICTION]. Please raise any problem with us first (TM-10); most are sorted out on WhatsApp the same day." Source: `IDENTITY.JURISDICTION`. |
| TM-14 | **Changes to these terms** | "When we change these terms, we update the effective date at the top of this page. A booking follows the terms in force on the day you made it." + contact line: WhatsApp `[FILL:WHATSAPP_NUMBER]` · email `[FILL:EMAIL]` (`site.ts`; anchors carry `data-source="terms_page"`, `09` §2d). |

## 3 · Images

None. The page is text only (no hero photo; og:image is `/og/default.png`, `04-TECHNICAL-SEO.md` §4).

## 4 · Ship checks

- [ ] Lawyer has reviewed and signed off the rendered page (`00` §9 item 7, D4), including TM-12 and TM-13
- [ ] `[FILL:LEGAL_NAME]`, `[FILL:POLICY_EFFECTIVE_DATE]`, `[FILL:NO_SHOW_RULE]`, `[FILL:LATE_CANCEL_RULE]`,
      `[FILL:LIABILITY_TERMS]`, `[FILL:JURISDICTION]`, `[FILL:GRIEVANCE_*]` and `[FILL:EMERGENCY_VET_LIST]` filled;
      `grep -r "FILL:" website/` clean for this page (`00` §8)
- [ ] `00` §3 drafts this page relies on are confirmed by Sunny: service and walk hours (§3.1), prices, no travel
      charge and the reschedule/cancel rule (§3.2). Until then the page cannot pass `00` §9 item 5
- [ ] TM-7 states the same rule as `00` §3.2, `/book/` FAQ #3 and `/how-it-works/` FAQ #3: free until 2 hours
      before the confirmed slot, nothing to refund
- [ ] Every `SERVICE_RULES` id is rendered exactly once, verbatim from `legal.ts` (TM-2, TM-4, TM-5, TM-6, TM-8,
      TM-9); offer amounts from `offers.ts` / `pricing.json`; zero ₹ literals in the page source
      (`npm run check:prices`)
- [ ] Nothing policy-gated appears: no on-time-or-₹100-off promise, no free touch-up, no "stop and you don't pay",
      no incident-cost promise (`content.ts` `policy` flags; `06` §4.1, §6)
- [ ] Title, meta and H1 exactly as §1; meta has no double quotes. P021 (CTA in meta) is N/A on legal pages; record
      it as N/A in the `02` audit
- [ ] Indexable and self-canonical; BreadcrumbList is the only schema; linked from the footer legal row on every page
      (`02` P051); `/terms/` set to `live` in `website/src/data/routes.ts` on publish day

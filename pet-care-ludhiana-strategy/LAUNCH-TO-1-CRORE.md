# PetDoorStep — launch to the first ₹1 crore

**Business plan, financial model and investment breakdown · Ludhiana first, then Punjab · prepared 10 Oct 2026**

What this plan covers: what to do next, from today to the first ₹1 crore, across every part of the business. That includes an investment breakdown with a low-cost alternative for every line item. It assumes PetDoorStep runs as an asset-light marketplace. Independent groomers, walkers and registered vets deliver the services, and PetDoorStep earns commission and subscriptions. Sunny works on it full-time and manages it.

Because PetDoorStep earns a commission, "₹1 crore" has two meanings, and this plan tracks both: **₹1 crore of GMV** (what customers pay for services booked through PetDoorStep) and **₹1 crore of platform revenue** (what PetDoorStep itself keeps).

The numbers come from a reproducible model in `model/` (`assumptions.json` → `model.mjs` → `model-output.json`), built on 174 researched facts (`model/facts.json`). Figures in **[R2-23]**-style brackets cite those facts (Appendix B). This plan supersedes the projections in the earlier strategy report.

## Contents

- [The answer in one page](#the-answer-in-one-page)
- [How PetDoorStep makes money](#how-petdoorstep-makes-money)
- [Fix before launch: website and policy conflicts](#fix-before-launch-website-and-policy-conflicts)
- [The next 30 days (10 Oct – 9 Nov 2026)](#the-next-30-days-10-oct-9-nov-2026)
- [The first 90 days, week by week](#the-first-90-days-week-by-week)
- [Supply: finding, vetting and keeping providers](#supply-finding-vetting-and-keeping-providers)
- [Demand: getting customers, channel by channel](#demand-getting-customers-channel-by-channel)
- [Operations and tech stack](#operations-and-tech-stack)
- [The numbers: scenarios, milestones and what moves them](#the-numbers-scenarios-milestones-and-what-moves-them)
- [Investment: what it costs and the cheap way to do it](#investment-what-it-costs-and-the-cheap-way-to-do-it)
- [Funding the plan: cheapest money first](#funding-the-plan-cheapest-money-first)
- [Legal, tax and compliance](#legal-tax-and-compliance)
- [Team and hiring](#team-and-hiring)
- [KPIs and the monthly money dashboard](#kpis-and-the-monthly-money-dashboard)
- [Roadmap to ₹1 crore](#roadmap-to-1-crore)
- [Risks and how to handle them](#risks-and-how-to-handle-them)
- [Decisions only you can make](#decisions-only-you-can-make)
- [Appendix A — Assumptions and where they come from](#appendix-a-assumptions-and-where-they-come-from)
- [Appendix B — Research sources](#appendix-b-research-sources)


---

## The answer in one page

### Two ₹1 crore finish lines
- **₹1 Cr GMV** (all customer payments for bookings through us): **Aug 2028 (month 21)**. Range: Apr 2028 (aggressive) to May 2029 (conservative).
- **₹1 Cr platform revenue** (what PetDoorStep keeps, ex-GST): **Feb 2030 (month 39)**. Range: Apr 2029 to beyond 60 months.

GMV runs about 4.7× revenue. Base-case planning dates, not promises; month 1 is Dec 2026.

### What it takes
- **Cities:** Ludhiana alone reaches ₹1 Cr GMV, but ₹1 Cr revenue only beyond 60 months. Reaching it needs Tricity, opening Jul 2028 (month 20), then Jalandhar, both via the T1–T5 gate.
- **Providers:** 2 groomers and 1 registered vet at launch; 25 groomers and 4 vets by Nov 2028.
- **Team:** you alone until an ops coordinator joins at 250 jobs a month, in Oct 2027 (month 11); then a lead per city.
- **Volume:** plan cash on the base case, 21 / 37 / 116 jobs in months 1 / 3 / 6. The 15 / 60 / 150 bookings in `09-ANALYTICS-TRACKING.md` §8.2 are stretch targets.

### Money, the cheap way
| | Bootstrap (start here) | Recommended |
|---|---|---|
| Before launch | ₹46,520 | ₹1.8 lakh |
| Peak cash need | ₹2.7 lakh | ₹18.2 lakh |
| Line up (with buffer) | ₹4.0 lakh | ₹24.0 lakh |
| ₹1 Cr GMV | Sep 2028 | Aug 2028 |
| Payback | Jan 2029 (month 26) | May 2030 (month 42) |

**Start on the bootstrap lines**, upgrading a line only at its milestone: paid ads after a CAC (cost per new customer) test, a salaried city lead at the Tricity clone, a custom app at 1,000 active repeat customers. **Exception: buy liability insurance (CGL with care-custody-control cover) from launch**, budgeting ₹30,000/year (estimate — get 2–3 quotes). The bootstrap model starts it in month 7, so add half a year's premium. **The bootstrap peak excludes your living costs**: there is no founder draw in year 1.

Monthly EBITDA (operating profit) turns positive in Apr 2028 (month 17), yet year 2 shows −₹2.2 lakh: Tricity's launch costs land late that year.

### Three make-or-break factors
1. **GST s.9(5).** If home grooming counts as "housekeeping", PetDoorStep pays GST on full groom prices [R3-04] (CA must confirm). Peak cash: ₹96.3 lakh. Get a written CA opinion before providers sign.
2. **Repeat bookings.** In the base case, repeat share passes 40% (T5) in Jun 2027 (month 7). If it lags, Tricity and every later date slip. At "Repeat rate −25%", ₹1 Cr revenue slips to May 2030.
3. **Commission held, leakage blocked.** "Take rate −5 pp" is the biggest cash hit: peak ₹25.4 lakh. Keep the ₹350 cap, on-platform perks and the 7-day pause rule [R1-33].

### What to do on Monday, 12 Oct
- [ ] **Sign your 2 core groomers this week and file PP Saanjh the day each signs**; it takes up to 30 days [R2-23].
- [ ] **Book the CA consult** (questions in Legal, tax and compliance).
- [ ] **Create the Google Business Profile** as a service-area business.
- [ ] **Request 2–3 CGL insurance quotes.**
- [ ] **Start the three copy decisions due 17 Oct** (Decisions only you can make).

---

## How PetDoorStep makes money

### The model in plain words
PetDoorStep is a **managed marketplace**:
- **Who supplies:** independent partner groomers, walkers and registered vets. Each partner is the legal supplier, and the customer pays them.
- **Who books:** pet parents book through PetDoorStep (website or WhatsApp) at fixed list prices.
- **Who guarantees standards:** PetDoorStep vets, trains and uniforms partners, sets sealed-kit and photo-update rules, handles complaints and keeps the "On time, or ₹100 off" promise.

Two terms:
- **GMV:** everything customers pay for services booked through PetDoorStep (medicines sold at MRP excluded).
- **Platform revenue:** what PetDoorStep keeps (commission, Groom Club and Pro fees, supplies margin), ex-GST. It is much smaller than GMV: in the base case GMV runs about 4.7× platform revenue. So ₹1 Cr GMV arrives Aug 2028 (month 21), but ₹1 Cr platform revenue arrives Feb 2030 (month 39).

### Revenue lines
| Line | Who pays | Rate | Note |
|---|---|---|---|
| Grooming commission | Provider | 15% at launch, 20% from month 4, 22% from month 13 of each city | **Capped at ₹350 per job** |
| Walking commission | Walker | 12% | Low on purpose (see below) |
| Vet work | Vet | ₹150 per visit, ₹50 per vaccination visit, 20% of deworming | No margin on medicines: the vet sells them at MRP [R3-27] (lawyer must confirm) |
| Groom Club | Customer | ₹499/year | 15% off a monthly Full Groom + priority. UC Plus is reportedly ₹249–399 [R1-11] |
| Pro plan | Provider, optional | ₹299/month from month 6 | Priority dispatch, kit discounts. Never a deposit [R1-07] |
| Supplies | Provider, optional | cost + 15% | Urban Company earns about 16% of revenue this way, but some workers report pressure to buy [R1-09]. Keep it optional |

All lines together come to 15.0% of GMV in Feb 2027 (launch rate), 20.0% by Nov 2027 and 22.0% by Nov 2030. Walking's lower rate and the cap pull the blend down; Club, Pro and supplies income push it back up.

### One job, worked through
| Job (customer pays) | PetDoorStep keeps | Provider keeps | GST on commission (1) | Provider net (2) |
|---|---|---|---|---|
| Medium Full Groom, ₹1,499 | ₹300 (20.0%) | ₹1,199 | ₹54 | ₹1,005 |
| Large Premium Spa, ₹2,799 | ₹350, capped (uncapped: ₹616) | ₹2,449 | ₹63 | ₹2,246 |
| Small Bath & Brush, ₹599 | ₹120 (20.0%) | ₹479 | ₹22 | ₹318 |
| Walking 1×/day, ₹2,999/month | ₹360 | About ₹88 a walk | 18% of commission | Own travel |
| Vet visit, ₹699 + medicines | ₹150 | ₹549 + medicine sales | 18% of fee | Vet's own costs |

(1) GST on commission is 18% [R3-05] (CA must confirm). It applies only once PetDoorStep registers for GST, which the base case expects in Dec 2028 (month 25). Unregistered providers can't claim it back. (2) Net is after GST, ₹90 of consumables and ₹50 of travel. Grooms use the 20% rate, and the Spa uses 22% to show the cap. Customers pay no travel charge anywhere in Ludhiana city (the site promises this), so travel always comes out of the provider's share.

Average groomer net in the model: ₹13,300 a month in Feb 2027, ₹33,400 by Nov 2027, against a floor of ₹25,000 (Urban Company partners average ₹28,322 [R1-08]). Early months are thin. The bootstrap tier, where this plan starts, handles that by recruiting salon groomers part-time: they keep their salon job and take PetDoorStep grooms on off-days. The recommended tier instead pays a launch top-up (₹12,000/month for 2 groomers × 3 months; see Supply). A small Bath & Brush leaves only ₹318, so **cluster small jobs by locality** (e.g. Sarabha Nagar + Model Town in one day).

### Who funds each discount
- **FIRSTGROOM (₹200 off + free nail visit): PetDoorStep.** It credits the ₹200 on the provider's weekly invoice and pays the provider ₹150 for the nail visit.
- **Referral (₹150 + ₹150): PetDoorStep**, credited the same way after the friend's first paid job.
- **"On time, or ₹100 off":** split 50% PetDoorStep / 50% provider.
- **Groom Club 15%:** a price tier, not a subsidy. Commission is charged on the member price (average ₹1,244), so both sides earn proportionally less. The between-grooms nail visit is member-priced and paid to the provider, not free.

### Groom Club economics
- **Members (base case):** 82 by Nov 2027, 446 by Nov 2028 and 842 by Nov 2029. Bootstrap tracks closely (425 by Nov 2028).
- **Fee income is small.** Each member pays ₹499/year, straight to PetDoorStep. Even at 842 members, the fee is a small slice of platform revenue. **The Club's job is retention:** members book a groom almost every month, far more often than other regulars in the model.
- **For providers:** a member groom pays 15% less than list, and commission is charged on that lower price. In return the groomer gets a steady monthly booking in a known locality, which fills the calendar and cuts travel between jobs.
- **For PetDoorStep:** it gives up 15% of the commission on each member groom but keeps the customer booking on-platform. The member nail visit costs it nothing, because the customer pays the member price to the provider. **Sell the Club after the first groom**, not before.

### Does a customer pay back what it cost to win them?
**CAC (customer acquisition cost)** is what it costs to win one new paying customer. The model's planning CACs: Google Business Profile and SEO ₹50, vet clinics and pet shops ₹150, RWA flyers and camps ₹200, nano-influencer barter ₹250, and Meta ads ₹600 (built from home-services lead costs of a reported ₹100–250 [R4-22]).
- **The first groom earns little or nothing.** FIRSTGROOM's ₹200 credit and the ₹150 nail-visit payment take most or all of the commission, which is ₹300 on a Medium Full Groom at the standard rate and less at the 15% launch rate.
- **Repeat grooms pay back the CAC.** Each repeat Medium Full Groom earns ₹300; a small Bath & Brush earns only ₹120. Every cheap channel (GBP, vet clinics, RWA, barter) costs less than one repeat Medium Full Groom earns, so a customer from those channels pays back within a repeat groom or two.
- **Meta ads pay back only from loyal customers.** One Meta customer costs more than a repeat groom earns, so it takes several repeat grooms, spread over months. The model assumes only 35% of new customers become regulars at first, rising to 50%.
- **So: test before scaling ads.** The bootstrap plan starts Meta in Jun 2027. Scale it only if a small test shows a cost per booked customer at or below ₹600 and the repeat rate is on track. Until then, put the effort into GBP reviews, vet clinics and referrals.
- **Contribution** (platform revenue minus discounts, launch top-ups, marketing, payment fees and the levy) turns positive Oct 2027 (month 11) in the base case and Aug 2027 (month 9) on bootstrap.

### Phase-1 payment flow
1. **Customer books.** PetDoorStep confirms provider, slot and price on WhatsApp, with a booking ID.
2. **Customer pays the provider directly** after the service, to the provider's own UPI QR or in cash. From 15 Oct 2026 the merchant fee (MDR) is 0% on UPI payments up to ₹2,000 and on any payment to a small merchant receiving up to ₹1 lakh a month [R5-01].
3. **Every Monday, PetDoorStep sends each provider one commission invoice** for last week's jobs, minus any discount credits. The provider pays it by UPI.
4. **7-day rule:** invoice unpaid after 7 days → the provider's new bookings pause until paid. No fines, no deposits, no prepaid commission wallet. Holding provider money could raise RBI prepaid-instrument questions (lawyer must confirm), and Urban Company's upfront-fee plan triggered protests [R1-07].

Because PetDoorStep never holds customer money, it needs no RBI payment-aggregator licence [R3-30, R5-08] (lawyer must confirm), and it avoids GST TCS, which applies only when the platform collects payment [R3-03] (CA must confirm). It is also less likely to be taxed as supplier of the whole job [R3-08] (CA must confirm). The Groom Club fee is paid straight to PetDoorStep.

**Phase 2: move only when one of two things happens.** Either PetDoorStep's own turnover passes ₹40 lakh, which is Razorpay Route's entry gate [R5-04] (base-case revenue is ₹27.3 lakh in year 2 and ₹56.0 lakh in year 3), or commission leakage is clearly high. Customers then pay via a licensed split product (Razorpay Route or Cashfree Easy Split). Costs: about 2% + GST [R5-02] plus 0.25% + GST per transfer [R5-05], or 1.95% + 0.2–0.25% on Cashfree [R5-06]; the model uses 2.65% all-in. **Time it so Razorpay's 0% new-merchant offer covers the switch** [R5-03]. In the model's test (Gateway split payments from 1,500 jobs/month), the ₹1 Cr revenue date stays at Feb 2030.

### Why the cap, and why walking is 12%
- **Cap:** when one platform added a commission, off-platform deals doubled, and leakage was likelier on higher-priced jobs [R1-33]. Urban Company's appliance commission tops out at ₹399 a job [R1-05]. Our cap holds a Large Spa at an effective 12.5%, removing most of the reason to go direct.
- **Walking:** at 12%, a walker keeps about ₹88 a walk. That is near ThePetNest's estimate of about ₹95 [R2-04] and inside the ₹70–200 walkers reportedly charge [R2-07]. A grooming-level cut would drop a walker to the bottom of that band and well below ThePetNest's ₹95 [R2-04], making walkers hard to keep (R2 rec).

---

## Fix before launch: website and policy conflicts

These are **launch blockers, not live problems**. The site is not deployed, so nothing is publicly wrong today. Apart from row 2d, none of them is a `[FILL:*]` token, so `npm run check:fill` will not catch them, and they have to be fixed by hand. **Sunny picks the wording first. The website edit then happens in a separate change**, not in this plan.

| # | Conflict | Where (file:line) | What to change |
|---|---|---|---|
| 1 | "No gig marketplace" contradicts the managed-marketplace model | `website/src/data/people.ts:80`; `website-plan/06-CONVERSION-PLAYBOOK.md:182` (§4.2) | Replace with option A or B below, and update the playbook line to match |
| 2a | Kit promise: "provide the sealed-kit supplies; you never pay for them" | `website/src/pages/join-as-groomer.astro:37` | "We train you on our standards. Buy sealed-kit supplies from us at cost plus a small margin, or your own to our spec." |
| 2b | "Never. No joining fee, no deposit, no kit charge." | `join-as-groomer.astro:95`; `website/src/data/faq.json:617` (join-as-groomer-5) | **Keep** "no joining fee, no deposit, ever". Drop "no kit charge". Add: "Optional Pro plan (₹299/month) for priority jobs. Never required." |
| 2c | "No joining fee or deposit — ever. Anyone asking you for money in our name is not us." | `join-as-groomer.astro:174` | **Keep as is**: it protects recruits from fraud, and Urban Company's upfront-fee plan triggered protests [R1-07] |
| 2d | `[FILL:PAY_RANGES]` reads like a salary | `join-as-groomer.astro:36` | Fill as a payout share plus per-job earnings (e.g. Medium Full Groom: you keep ₹1,199 at the standard rate), not a monthly wage |
| 2e | Plan to add JobPosting `baseSalary` | `join-as-groomer.astro:7` (comment) | Do not add salary-based JobPosting schema for independent partners; edit the comment |
| 3 | Supplier wording: terms.astro:98 "our groomers, walkers and partner vet come to your home"; faq.json:131 "Our groomers, walkers and vet come to your home" | `website/src/pages/terms.astro:98`; `website/src/data/faq.json:131` (contact-2) | Terms must say that independent partner professionals supply the service, and that PetDoorStep books, vets and sets standards. Have the lawyer draft `[FILL:LIABILITY_TERMS]` to match. Marketing copy says "our partner groomers" |
| 4 | Groom Club is "pay per visit", with a "free nail-trim visit" and no fee | `faq.json:81`; `website/src/data/content.ts:162-163`; `website/src/data/pricing.json:53`; `website/src/pages/offers.astro:49,52,128` | After Sunny decides: show the ₹499/year fee and a member-price nail visit on /offers/, /pricing/ and the FAQ (FIRSTGROOM's free nail visit stays) |
| 5 | "the same people who groom and care for pets at Ludhiana homes" | `website/src/pages/blog/index.astro:44` | Keep only if partner groomers really contribute. Otherwise use "Written by the PetDoorStep team in Ludhiana" |
| 6 | Old strategy report: hybrid model, old name, conflicting numbers | `pet-care-ludhiana-strategy/pet-care-ludhiana-strategy.html` (lines below) + `PawMitra-Ludhiana-Pet-Care-Strategy.pdf` | Add a "superseded by the launch plan" note at the top. Don't reuse its numbers |
| 7 | Travel charge: the site promises "no travel charge anywhere within Ludhiana city" | `website-plan/00-MASTER-PLAN.md:82` (§3.2); `website/src/data/faq.json:6`, `:67` (same promise in `website/src/data/pages/pricing.ts:85`, `website/src/pages/terms.astro:141` and the area pages) | Keep the promise. If Sunny approves a surcharge (Decision 3), it applies only outside the city and its listed service localities; publish the rule on /pricing/ and in FAQ :67 |

Details for row 6 (this plan supersedes all of these):
- **l.717–719:** "Managed / hybrid (recommended start)… own grooming/walking". This plan uses a partner marketplace instead.
- **l.948:** "~1,000 bookings/month by month 6". The model has 116 jobs in May 2027. Even `website-plan/09` §8.2's 150 bookings at month 6 is a stretch target; cash is planned on the model's base case.
- **l.1124:** "Blended booking value ₹700–900". Today's price list gives an average groom of ₹1,123.
- **l.776:** "₹999/month 'Groom + 2 walks/week'". Walking alone is ₹2,999/month.
- **l.238, l.1090:** working name "PawMitra". The PDF's file name uses it too.

### Two replacement lines for `people.ts:80`
Both are honest that providers are partner professionals and keep the "no strangers, verified" trust promise:
- **Option A:** "No strangers at your door: vetted, trained partner groomers working to PetDoorStep standards, and the same groomer on request."
- **Option B:** "Not an open app. A small, verified circle of Ludhiana partner groomers, trained to our standards. Same groomer on request."

- [ ] **Pick A or B by 17 Oct 2026**, then make the website change (rows 1–5 and 7) in one separate commit.
- [ ] **Decide on the Groom Club fee** (row 4) before the /offers/ and /pricing/ copy is touched.
- [ ] **Decide the out-of-city travel rule** (Decision 3) by 17 Oct 2026.
- [ ] **Add the "superseded" note to the old report** (row 6) so no one quotes its numbers.

---

## The next 30 days (10 Oct – 9 Nov 2026)

Start the three slowest items now: signing the 2 groomers whose police checks gate the pilot, the Google Business Profile (GBP) and the CA consult. Costs are shown as **standard / low-cost** (the full list is in Investment). Whichever column you pick, buy liability insurance before the first pilot groom.

### Money & legal
- [ ] **Book the CA consult for this week, by Fri 16 Oct.** Cover GST s.9(5), TCS, TDS 194-O with a TAN, and entity choice. The question that matters most: is at-home grooming "housekeeping" under s.9(5) [R3-04] (CA must confirm)? Also ask whether converting an LLP into a Pvt Ltd later keeps or resets the incorporation date for the Startup India Seed Fund's under-2-years rule [R5-30] and for DPIIT recognition [R3-15] (CA must confirm). ₹10,000 / ₹3,000. Done when: you have a written answer by Fri 16 Oct, before the first groomer signs.
- [ ] **Register the business and apply for a TAN.** LLP ₹7,000, or proprietorship with free Udyam registration ₹0 [R3-16]. A proprietorship cannot get DPIIT recognition [R3-15] (CA must confirm both). The TAN is needed for TDS under s.194-O and its quarterly return [R3-09] (CA must confirm). See Legal and tax. Done when: you have the certificate, the TAN and a current account.
- [ ] **Run a free trademark search, then file in Class 44.** ₹7,500, or ₹4,500 if you file yourself at the Udyam/startup rate [R3-19] (lawyer must confirm). Done when: you have the application number.
- [ ] **Send the terms, privacy policy and provider agreement to a lawyer**, plus the copy fixes in Fix before launch. ₹25,000 / ₹7,500. Done when: every Legal [FILL] has signed-off text.
- [ ] **Buy liability insurance before the first pilot groom, on either budget.** Get 2–3 quotes for commercial general liability (CGL) with care-custody-control cover, which covers pets in a provider's care (lawyer must confirm the wording). Free to quote; plan ₹30,000/year (estimate — get 2–3 quotes). The bootstrap model only starts paying for it in month 7, so buying it now adds those earlier months' premium to the bootstrap cash need. Done when: the policy is in force and INSURANCE_STATUS can be filled truthfully.
- [ ] **Set up commission collection.** Customers pay the provider after the service, on the provider's own UPI QR or in cash. Small merchants pay no MDR (the bank fee on UPI) under the rules that start 15 Oct [R5-01] (CA must confirm). PetDoorStep sends each provider a weekly commission invoice, and their bookings pause if it is unpaid after 7 days. No deposits and no prepaid wallets. Free. Done when: the leads sheet has a commission-ledger tab and an invoice template.

### Website go-live
- [ ] **Fill the contact and tracking fields**: PHONE, WHATSAPP_NUMBER, EMAIL, DOMAIN, INSTAGRAM, GA4_ID, SHEETS_WEBHOOK, WEB3FORMS_KEY. Domain ₹1,000 / ₹1,000 [R5-18]; business SIM ₹1,500 / ₹500. Done when: a test lead reaches the sheet.
- [ ] **Fill the legal fields with the lawyer's text**: LEGAL_NAME, POLICY_EFFECTIVE_DATE, JURISDICTION, LIABILITY_TERMS, LATE_CANCEL_RULE, NO_SHOW_RULE, MIN_AGE, RETENTION_*, GRIEVANCE_OFFICER_*, DPB_COMPLAINT_LINK, INSURANCE_STATUS. Free (the lawyer's fee is above). Done when: `npm run check:legal` passes.
- [ ] **Fill the safety, people and local fields**: DISINFECTANT_PRODUCT, VET_PARTNER_*, VET_REG_NO, EMERGENCY_VET_LIST, GROOMER_1..3_NAME, WALKER_1..2_NAME, FOUNDER_*, AUTHOR_NAME, LANDMARKS_{area}, SEASONAL_OFFER. Write PAY_RANGES as a payout % and earnings per job, not a salary (see Fix before launch). Name only signed, verified partners. Free. Done when: none of these appear in `check:fill`.
- [ ] **Do the photo shoot.** ₹20,000 / ₹3,000 (student, barter). Brand polish ₹10,000 / ₹0 (Canva). Done when: no placeholder images remain (`check:fill` fails on them).
- [ ] **Deploy a preview to Cloudflare Pages** following `website/README.md`. Free [R5-19]. Done when: the preview loads.
- [ ] **Test a booking on a real phone**: form, WhatsApp message, lead row, GA4 events. Free. Done when: it works on two phones.
- [ ] **Leave GOOGLE_RATING, REVIEW_COUNT and REVIEW_1..5 open** until the pilot produces real reviews. Never invent them. Free. Done by 9 Nov: `npm run check:fill` lists only these. Production launch, the Search Console sitemap and Lighthouse ≥90 (page quality) come in week 7.

### Google Business Profile (day 1)
- [ ] **Create the profile today** as a service-area business named exactly "PetDoorStep", primary category Pet groomer (`05-LOCAL-SEO.md` §1). Free. **Record the verification video** at your real base once the polos and certificate arrive. Then hide the address and add services, prices, the booking link and 10 Q&As. Done when: the profile is verified and GBP_LINK and GBP_REVIEW_LINK are filled.

### Prices
- [ ] **Confirm the price list** and set `pricesConfirmed: true`. Free. Done when: `npm run check:prices` passes.
- [ ] **Decide the Large Full Groom.** At ₹1,899 it is above ThePetNest's top Ludhiana tier of ₹1,599 [R1-19]. Either keep it and include dematting and de-shedding, or set it at ₹1,599–1,699. Your call. Free. Done when: one price is in `pricing.json`.
- [ ] **Keep "no travel charge anywhere within Ludhiana city"** (`website-plan/00-MASTER-PLAN.md` §3.2). A surcharge can only ever apply outside the listed service localities, and whether to have one, and how much, is your decision. If it would clash with the "within Ludhiana city" promise, reword the promise first. Free. Done when: your decision is written into §3.2 and the FAQ and booking form say the same thing.

### Supply
- [ ] **Sign the 2 core groomers by Sat 17 Oct** (salon contacts first), on a one-page partner letter; they move to the lawyer-reviewed agreement once it is ready. **File PP Saanjh the day each provider signs**: ₹200 each, up to 30 days [R2-23], plus an Aadhaar QR check for about ₹10 [R2-25]. **For the 2 pilot groomers, also order a private check** (reportedly 7–14 days, ₹799–1,599 [R2-24]) so they can clear before 3 Nov. Low-cost ₹1,500 for 6 (Saanjh + Aadhaar QR; the 2 private checks are extra); standard ₹7,200 adds a private check for everyone. Nobody enters a customer's home until their check has cleared. Done when: every provider has a Saanjh receipt within 1 day of signing.
- [ ] **Sign the rest by Sat 24 Oct: 1–2 more groomers, 2 walkers and 1 registered vet.** Source groomers from salons and Justdial, and the vet from GADVASU graduates [R2-15]. Pitch take-home pay per job: a full-time groomer should net at least ₹25,000/month [R1-08]. On the bootstrap lines you start on, recruit salon groomers who keep their job and take PetDoorStep grooms on their days off. The recommended budget instead tops up 2 core groomers: ₹12,000/month for 2 groomers × 3 months. See Supply. Free. Done when: every role has a signed person with a Saanjh receipt.
- [ ] **Run supervised trial grooms with each groomer**, with you present, on pets of family and friends. Standard: 2 supervised sessions per groomer (₹9,000); low-cost: 1 session + SOP + video (₹3,000). Done when: each groomer passes the SOP (standard operating procedure) checklist: sealed kit, before/after photos, on time.
- [ ] **Order uniforms and ID cards** from Ludhiana hosiery suppliers [R2-27]. ₹3,300 / ₹2,400. Done when: they arrive in time for the GBP video.
- [ ] **Enrol every provider in PMSBY accident cover** [R3-29] (CA must confirm). ₹120 / ₹120. Done when: each shows the bank confirmation.
- [ ] **Buy kit stock**: sealed-kit consumables ₹20,000 / ₹8,000; loaner kit ₹19,000 / ₹0 (hire only groomers with a kit); vet cold-chain carrier ₹1,600 / ₹0. Done when: the stock is at your base.

### Demand prep
- [ ] **Claim the Instagram handle** (free) and **order the print kit**: flyers with a WhatsApp QR, standees and stickers [R4-33] [R4-35]. ₹15,000 / ₹5,000. Done when: it is delivered before launch week.
- [ ] **Ask about a stall at the GADVASU Dog Show** in December, which drew 100+ owners in 2024 [R4-38]. The fee is not published, so get a quote. Done when: you know the date and fee.
- [ ] **Book 2 RWA (residents' welfare association) camps for December**, for example in Sarabha Nagar and BRS Nagar. Run demo nail trims and vaccination visits; Ludhiana has the most dog bites in Punjab [R4-06]. Stall and camps together: ₹10,000 / ₹2,000 (low-cost is 1 society camp offered free, in return for running a free vaccination or grooming camp). Done when: the dates are confirmed in writing.
- [ ] **List 10 vet clinics and pet shops** to carry standees and send referrals. Free. Done when: each has a contact name and a visit date.
- [ ] **Keep paid ads off.** Meta's October–December rates are reportedly 25–50% higher per 1,000 views [R4-21]. Free. Done when: no ad spend before Mar 2027.

### Pilot prep
- [ ] **Line up 12 pilot customers** (friends and RWA contacts). **Book pilot slots 3–7 Nov, before Diwali on 8 Nov, only if a private or Saanjh check has cleared by 2 Nov; otherwise run all 12 pilot grooms 9–21 Nov.** Each customer gets a Full Groom at half price, and the platform tops up the groomer: ₹8,400 / ₹5,000 (8 grooms). The discount never depends on a review. Done when: all 12 slots are in the jobs tab.
- [ ] **Log every pilot job**: minutes, km and supplies. This tests the model's ₹90 for supplies and ₹50 for travel per job. Free. Done when: all 12 pilot rows (8 on the low-cost line) have minutes, km and supplies.

**Pre-launch total: ₹1.8 lakh standard vs ₹46,520 low-cost.** Liability insurance is a running cost, so it is not in these totals.

---

## The first 90 days, week by week

Week 1 starts Monday 12 Oct 2026. Weeks 1–4 carry out "The next 30 days" checklist, which is only summarised here. Weeks 4–7 are the November pilot. Week 8 is the public launch. Weeks 9–13 bring in new customers and get the first ones to come back.

| Week · dates | Focus | Key actions | Done when |
|---|---|---|---|
| 1 · 12–18 Oct | Set-up: start the slow items | CA consult held by Fri 16 Oct; business registered and TAN applied for; GBP created; 2 core groomers signed by Sat 17 Oct, Saanjh filed the same day, private checks ordered for both | 2 groomers signed, each with a Saanjh receipt |
| 2 · 19–25 Oct | Set-up: supply | Remaining groomers, 2 walkers and 1 vet signed by Sat 24 Oct, Saanjh filed on signing day; supervised trial grooms; lawyer briefed; uniforms ordered; [FILL] groups filled | Every role signed; every Saanjh receipt in hand |
| 3 · 26 Oct–1 Nov | Set-up: site, GBP, insurance | Photo shoot; preview deployed; real-phone booking test; GBP verification video; liability insurance bought; private checks back for the 2 pilot groomers | Booking test passes; GBP verification submitted; policy in force |
| 4 · 2–8 Nov | Pilot starts; Diwali week | Mon 2 Nov check: pilot grooms 3–7 Nov only if a check has cleared, otherwise all 12 move to 9–21 Nov; print kit ordered; camp and Dog Show enquiries done | 30-day list ticked except the review fields |
| 5 · 9–15 Nov | Pilot | Pilot grooms; review request after every job (`05-LOCAL-SEO.md` §3); log minutes, km and supplies | At least 6 of the 12 pilot grooms done |
| 6 · 16–22 Nov | Pilot | Finish the 12 grooms by 21 Nov; one vet and one walker trial visit once their checks clear (week 6 or 7); first weekly commission invoices as a dry run | 12 grooms done; reviews arriving |
| 7 · 23–29 Nov | Fix SOPs, site goes live | Rewrite SOPs from pilot notes; fill review fields; `check:fill` clean; production deploy; GSC sitemap; Lighthouse ≥90; lawyer sign-off | 5+ genuine Google reviews; every `00-MASTER-PLAN.md` §9 box ticked |
| 8 · 30 Nov–6 Dec | **Public launch, Tue 1 Dec** (Dec 2026 is M1) | Launch posts; WhatsApp pilot customers who opted in; ₹150 + ₹150 referral live from day 1 (credit paid only after the friend's first completed job); flyers in 2 sectors; RWA camp 1; standees at partner clinics | First bookings from people you don't know |
| 9 · 7–13 Dec | Dog Show prep | Confirm the GADVASU date (the 2024 show was on 15 Dec [R4-38]); stall kit: standee, QR review cards, demo nail trims; RWA camp 2 | Stall confirmed or dropped |
| 10 · 14–20 Dec | GADVASU Dog Show | Run the stall; collect WhatsApp opt-ins; promote the vaccination visit (₹199 + vaccine at MRP) | Leads logged with "dog show" as the source |
| 11 · 21–27 Dec | Referral push | Remind every customer of the referral; check no credit was paid before the friend's job was complete; first rebooking reminders to pilot customers who opted in | Every referral tracked in the leads sheet |
| 12 · 28 Dec–3 Jan | Groom Club | Pilot dogs are now due again (grooming every 4–8 weeks [R4-13]); offer Groom Club to every repeat customer on the terms Sunny has chosen | Every repeat customer has been offered it |
| 13 · 4–10 Jan | First KPI review | Mon 4 Jan: December review (see KPIs and the monthly money dashboard); write down 3 actions; decide at the 1 Feb review whether to run the Meta CAC test in Mar 2027 (Decision 12) | KPI log entry and 3 actions recorded |

### What good looks like at day 90
- **December bookings ≥15, reviews ≥6 at ≥4.8★, about 300 site sessions.** These are the `09-ANALYTICS-TRACKING.md` §8.2 stretch targets for launch month; the cash-planning base case is below. (09 counts bookings submitted; the model counts completed jobs.)
- **The model's base case for December** (the case to plan cash against, not a promise): 21 completed jobs, 17 of them from new customers, GMV ₹24,659 (everything customers paid) and platform revenue ₹3,667 (PetDoorStep's share). The month's operating result is −₹12,870 on the bootstrap lines you start on, or −₹78,490 on the recommended lines: a planned loss either way. That takes 2 active groomers and 1 vet.
- **The base case for Feb 2027 (M3)**: 37 jobs, GMV ₹43,858, revenue ₹6,771, repeat customers 28%. From here the 09 stretch targets run well ahead of the model (60 bookings and 25 reviews in the third month). Push the team toward the targets and plan cash on the base case.
- **Habits that are already running**: every provider pays commission within 7 days, every complaint is acknowledged within 48 hours, the SOPs are written down, and you know the real minutes and supplies each groom takes.

### If it's going slower
1. **Fix conversion before buying traffic.** If fewer than 30% of people who start a booking finish it (the 09 target), or WhatsApp replies are taking longer than 10 minutes, fix that first. Lead with the ₹599 Bath & Brush and FIRSTGROOM where price is the objection.
2. **Do more through the cheapest channels.** Add 2 more RWA camps and 5 more clinic or pet-shop partners. The planned cost per new customer is ₹50 via GBP, ₹150 via vets and pet shops and ₹200 via RWAs, against ₹600 via Meta ads.
3. **Stay on the bootstrap lines and delay upgrades.** You are already on ₹5,000/month marketing and no draw until month 13. If December and January run below the base case, postpone the Meta CAC test from Mar 2027 to Jun 2027 and keep the launch top-up off.
4. **If jobs fall below the conservative case for 2 months in a row**, follow the slow-down rules in KPIs and the monthly money dashboard.

---

## Supply: finding, vetting and keeping providers

Providers, not customers, are the month-1 constraint. You launch with 2 good groomers and 1 registered vet, and one careless groomer can sink the Google rating.

### Where to find each provider type

| Provider | Where to look | What they want |
|---|---|---|
| Groomers, Ludhiana | Pet-shop and spa groomers on Ferozepur Road, Sarabha Nagar and Model Town; home groomers listed on Justdial | More than a salary, and no fees for leads [R1-14] |
| Groomers, Tricity (city 2) | Independent groomers who already charge Rs 1,000-1,900 a groom (reportedly) [R1-24] | Pay only for completed jobs, and steady bookings |
| Walkers | Students and early risers living inside the launch localities | Short routes near home |
| Vets | Fresh GADVASU graduates (about 242 BVSc seats a year in Punjab [R2-15]) and clinic vets for evening or weekend slots | Income on top of typical private pay of Rs 20,000-35,000 [R2-09] |

- **Onboard only vets registered** with the Punjab State Veterinary Council or VCI [R2-12, R3-26] (lawyer must confirm). **Check service rules** before onboarding a government Veterinary Officer [R2-10]. The vet keeps ₹549 of the ₹699 visit and sells vaccines and medicines at MRP under their own practice. PetDoorStep never stocks drugs [R3-27] (lawyer must confirm).
- **Cold start.** Default (bootstrap tier): **recruit salon groomers part-time.** They keep their job and groom for PetDoorStep on days off, with no guarantee. Upgrade (recommended tier), only if part-timers cannot cover launch bookings: **top up the core launch groomers** to ₹12,000/month for 2 groomers × 3 months.

### The pitch, with numbers

- **One job**: on a Medium Full Groom (₹1,499), PetDoorStep's commission is ₹300, so the groomer collects ₹1,199. From that come GST on the commission once PetDoorStep is registered (₹54), consumables (₹90) and fuel (₹50). The groomer keeps **₹1,005**.
- **Big jobs**: the commission cap of ₹350 means the groomer keeps ₹2,246 of a Large Premium Spa (₹2,799).
- **A month**: in the base model the average groomer nets **₹33,400** at month 12. Salaried Punjab and Tricity groomers earn roughly Rs 15,000-35,000 [R2-01, R2-02]. Urban Company's average partner nets Rs 28,322 [R1-08]. **Pause recruiting if average net drops below ₹25,000.**
- **Walkers**: ₹88 a walk on the ₹2,999 plan, after the 12% commission. Metro walkers get Rs 70-200 a walk (indicative) [R2-07].
- **Say it plainly**: "independent partner, paid per completed job, no joining fee, no deposit, no lead fees." The optional Pro plan (₹299/month from month 6) is never a deposit or a target [R1-07]. See "Fix before launch" for the join page.

### Vetting checklist

- [ ] **File PP Saanjh police verification the day each provider signs** (core groomers by 17 Oct 2026). It costs Rs 200 and can take up to 30 days [R2-23]; nobody enters a home until it clears.
- [ ] **Check ID with Aadhaar offline QR**, which costs Rs 0-10. **Never store Aadhaar numbers** [R2-25].
- [ ] **Call 2 references**: a past employer and a past customer.
- [ ] **Pay for a trial groom** on a friend's dog. Watch handling, hygiene and finish.
- [ ] **Enrol each provider in PMSBY** accident cover, Rs 20 a year [R3-29] (CA must confirm; check at the bank).
- The low-cost path costs about Rs 250 per provider (R2 rec). The standard alternative is a private background check at Rs 799-1,599 (indicative) [R2-24].

### Training: 3-5 days in-house

Skip academies (Rs 49,000-65,000 + GST [R2-26]). **Hire salon-experienced groomers and run a 3-5 day onboarding** [R2-26], led by a senior groomer paid per session:

1. **Standards**: sealed kit, fixed prices, photo routine, WhatsApp scripts. Anything medical goes to the vet.
2. **Two supervised grooms** in pilot homes.
3. **Hard cases**: anxious dogs, cats, matted coats, and when to stop.
4. **Sign-off groom** with Sunny watching, then issue 2 polos and an ID card from Ludhiana hosiery suppliers (Rs 150-215 a polo [R2-27]).

Walkers get a supervised first week: **leash only, and routes that avoid stray packs.** Ludhiana district recorded 28,390 dog-bite cases in 2024 [R4-06].

### Kit

- **Providers own their kit.** The minimum spec costs about Rs 18,000-19,000 (indicative) [R2-21]. It covers a pro clipper such as the Codos CP-9700 (Rs 7,298 [R2-16]), a 3800W dryer (from Rs 4,599 [R2-17]), a scissor set, a foldable tub (Rs 1,499-2,499 [R2-18]), shampoo, brushes and towels. A table is optional; a non-slip mat works. A pro kit costs Rs 85,000-1,10,000 [R2-21], so it is for top groomers only.
- **Sell sealed blade and towel packs at cost + 15%.** They are optional, never compulsory [R1-09]; see "How PetDoorStep makes money".
- **Lend a loaner kit only in the recommended tier**: one basic kit to a skilled groomer who has none, with the cost recovered in weekly instalments on their statement. In the bootstrap tier, **recruit only groomers who own a kit.**

### Quality standards

- **Open the sealed kit in front of the customer.** Send before and after photos to the customer and the PetDoorStep team group.
- **Ask for a 1-5 rating on WhatsApp** after every job.
- **Put it right, as the refund policy promises**: if something was not right, redo the part that went wrong or adjust the bill. The original groomer redoes it unpaid. A free 48-hour re-groom guarantee is not on the site or in the model, so offering one is a founder decision.
- **3-strike rule**: one strike each for a no-show, a missing photo, an upheld complaint or a rating of 3 or below. **Three strikes in 90 days and the provider is offboarded.** Rough handling means immediate removal (PCA Act s.11 [R3-25], lawyer must confirm).

### Weekly settlement

Customers pay the provider directly, by UPI or cash. **Every Monday, send each provider a statement.** It adds commission on last week's jobs, plus any Pro fee, supplies or kit instalment. It subtracts the credits PetDoorStep funds: FIRSTGROOM ₹200, ₹150 for each free FIRSTGROOM nail-trim visit, referral credits, PetDoorStep's share of the "On time, or ₹100 off" credit (split 50% PetDoorStep / 50% provider) and any launch top-up. The provider settles the balance by UPI. **Pause bookings for anyone unpaid after 7 days.**

**Take no provider deposits and run no prepaid wallets.** The weekly invoice and the 7-day pause are the only collection controls. Holding provider money may raise RBI prepaid-instrument issues (lawyer must confirm).

### Disputes, damage and pet injury

1. **Stop the groom**, calm the pet and call Sunny immediately.
2. **If the pet is hurt, go to the nearest vet on the emergency list.** PetDoorStep pays first, settles blame later.
3. **Send photos and a written note within the hour.** The provider is paused for that customer until the review.
4. **Buy CGL insurance with a care-custody-control extension (pets in your care) before the first paid job, in both tiers.** Premiums are unsourced; the model carries ₹30,000/year (estimate — get 2–3 quotes). The bootstrap model only starts the premium in month 7, so budget it from launch on top of the bootstrap figures. The provider agreement sets who pays what (lawyer must confirm).

### Stopping off-platform deals

On one platform, adding a commission doubled off-platform deals, mostly on expensive jobs [R1-33]. A cleaning app that added real value lost at most 1 in 83 relationships [R1-32]. So:

- **Cap the commission** at ₹350, which makes the effective take on a Large Spa only 12.5%.
- **Mask phone numbers.** Calls go through the PetDoorStep number; share the address on the day.
- **Keep perks on-platform only**: Groom Club price, the put-it-right promise, "On time, or ₹100 off" and referral credits.
- **Offer "rebook my groomer"**, as ThePetNest does [R1-19].
- **Warn, then block**, as Urban Company does [R1-31].
- **Use a non-solicit clause** only while the partnership lasts. Post-term non-competes and deposit forfeiture are likely unenforceable (lawyer must confirm).

### Headcount the base case needs

| Providers | May 2027 (M6) | Nov 2027 (M12) | Nov 2028 (M24) |
|---|---|---|---|
| Groomers | 3 | 7 | 25 |
| Walkers | 1 | 2 | 9 |
| Vets | 1 | 1 | 4 |

- **Recruit one ahead**: always keep one trained groomer on the bench. Groomers reach 10 in Mar 2028 (month 16); the M24 figures include the Tricity team.

---

## Demand: getting customers, channel by channel

Use free channels first: Google, WhatsApp, referrals and societies. Pay for ads only once real reviews exist. **CAC** (customer acquisition cost) means the marketing spend needed to win one new paying customer. The CACs below are the model's assumptions; replace them with your own numbers after 2-3 months.

| Channel | What to do | Cost and CAC | Low-cost version | Start |
|---|---|---|---|---|
| Google Business Profile + reviews | **Verify as a service-area business** with the address hidden. Leave a review QR card and send the review link after every job | Free. CAC ₹50 (shared with SEO) | Same | Verify before the Nov pilot |
| Website SEO (26 guides built) | **Deploy, submit the sitemap** in Search Console, add 1 locality post a month | Hosting free [R5-19] | Same | Oct-Nov 2026 |
| WhatsApp | **Use broadcast lists** in the free Business app (256 per list [R4-29]). **Move to a BSP** (an official WhatsApp API reseller) when reminders need automating | AiSensy Rs 1,500-3,200/month + GST [R4-27]; Interakt and Wati are similar (indicative) [R4-28] | Free app until about 250-500 customers (R4 rec) | Day 1 |
| RWA / society camps | **Run a free nail-trim or vaccination camp** in exchange for notice-board space | Agencies charge Rs 7,500-12,700 per society per month [R4-36], so don't pay. CAC ₹200 | 1 free camp in a society | Nov pilot, then 2 a month |
| Vet clinics and pet shops | **Place a standee and QR stickers**, and pay a referral fee per booked customer | Standee Rs 950-1,800 [R4-35]. CAC ₹150 | QR stickers only | Dec 2026 |
| GADVASU Dog Show | **Book a stall or demo nail-trims** and collect WhatsApp opt-ins | 100+ owners attend [R4-38]. Stall fee unpublished, so get a quote | Demo slot with one groomer | Dec 2026 (call this month) |
| Flyers + newspaper inserts | **Print A5 flyers with a WhatsApp QR**, inserted on paper routes in target sectors | 1,000 flyers Rs 500-2,000 [R4-33]. Inserts Rs 200-350 per 1,000 [R4-34]. CAC ₹200 | Hand-deliver 1,000 in 2 sectors | Launch week |
| Instagram + nano creators | **Post Reels of real grooms. Give a creator a free groom** for a disclosed Reel plus a referral code | Nano creators charge Rs 500-8,000 a post [R4-30]. CAC ₹250 | Barter only, under Rs 20,000 per creator a year (194R TDS) with #ad/#collab disclosure (ASCI) [R4-32] (CA must confirm) | Nov 2026 |
| Referral ₹150 + ₹150 | **Release the credit only after the friend's first completed, paid job** | Urban Company reportedly gives Rs 100 + Rs 100 [R4-18]. Model: 20% of new customers | Same | Launch |
| Meta Click-to-WhatsApp Reels ads | **Target a 3-5 km radius** around target localities (R4 rec). **Run a 2-3 week test first** | Reels CPM (cost per 1,000 impressions) Rs 45-140 [R4-20]. Cost per lead Rs 100-250 [R4-22]. Chat free for up to 7 days after the click [R4-26]. CAC ₹600 | Small test only; the bootstrap model assumes ads from Jun 2027 | CAC test Mar 2027; scale only if CAC ≤ ₹600 |
| Google Search ads | **Start only when you can spend at least Rs 15,000/month** [R4-23] | Rs 8-35 a click, Rs 150-400 a lead [R4-23] | Skip | After Meta proves its CAC |
| Justdial | **List free now.** Buy a paid plan only after 2-3 months of tracking enquiry quality | Paid plans Rs 18,000-36,500 a year [R4-37] | Free listing | Now |

Ad, print and RWA rates are indicative agency and vendor figures, so test them before trusting them. Month numbers count from launch (Dec 2026 = month 1). Fixed local marketing starts at ₹5,000/month per city (bootstrap), rising to ₹15,000/month once CAC is proven; see "Investment".

### Monthly marketing plan, months 1-6 (bootstrap)

The model sets one fixed marketing amount per city and does not split it by channel. Run these activities each month and **keep the month's total within ₹5,000/month**:

| Channel | Each month | Unit cost |
|---|---|---|
| RWA / society camps | **2 free nail-trim or vaccination camps**, a new society each time | The groomer's time and a few flyers; no agency fee [R4-36] |
| Print | **1,000 A5 flyers with a WhatsApp QR** into 2 target sectors; add newspaper inserts once a sector responds | Rs 500-2,000 per 1,000 flyers [R4-33]; inserts Rs 200-350 per 1,000 [R4-34] |
| Vet clinics and pet shops | **Sign 1-2 new clinics or shops** with QR stickers; 1 standee at the busiest | Stickers Rs 0.45-20 each, standee Rs 950-1,800 [R4-35]; referral fee only per booked customer |
| Creators | **1 barter groom** for a nano creator's disclosed Reel | A free groom, no cash; stay under Rs 20,000 per creator a year [R4-32] (CA must confirm) |
| Google, WhatsApp, referrals | **Review ask after every job**, a weekly GBP post, reminder broadcasts | Free; referral credits are netted off commission on the weekly statement |

- **Shift money every month** to the channel with the lowest CAC in the lead sheet. December adds the GADVASU Dog Show; the launch print kit and stalls are pre-launch lines (see "Investment").

### Which channels pay back

- **Cheapest first.** Model CACs: Google and SEO ₹50, vet clinics ₹150, RWA and flyers ₹200, creators ₹250, Meta ads ₹600.
- **Don't expect the first job to repay paid acquisition.** A Medium Full Groom earns ₹300 commission, and a first booking usually carries the ₹200 FIRSTGROOM discount that PetDoorStep funds, plus a free nail-trim visit (₹150 to the provider). Meta's ₹600 is more than the whole commission on that groom. Paid customers pay back only through repeat bookings, so retention matters more than reach.
- **Measure it monthly.** Tag every lead's source in the sheet. CAC per channel = that channel's spend ÷ its new paying customers. CAC payback = the number of completed jobs before a customer's commission covers their CAC.
- **Scale a paid channel only if** its measured CAC is at or below the model's and its customers rebook at least as often as organic ones.

### The vaccination visit: a cheap way in

- **Lead with ₹199 + vaccine at MRP.** It is cheaper than Supertails' Rs 799 home anti-rabies visit [R1-15]. PetDoorStep earns only ₹50 per visit; the real prize is a new customer record.
- **Use the local context, without scare tactics.** Ludhiana district recorded 28,390 dog-bite cases in 2024, 13,488 of them in the city [R4-06]. Anti-rabies cover is something owners already care about.
- **Send only registered vets** [R2-12] (lawyer must confirm), carrying the vaccine in a cold box (Rs 900-1,999 [R2-22]).
- **End every visit with the FIRSTGROOM offer** and a WhatsApp reminder date for the next dose.

### Retention: where the money is

- **Send a WhatsApp reminder every 4-8 weeks**: 4-6 weeks for long coats, 6-10 for short coats [R4-13].
- **Rebook at the door.** The groomer proposes the next date before leaving. Salons aim for 60%+ rebooking at checkout (indicative) [R4-15].
- **Sell Groom Club**: 15% off a monthly Full Groom plus priority slots. It becomes a paid membership at ₹499/year if Sunny approves (see "How PetDoorStep makes money"). The model has 12 members by May 2027, 82 by Nov 2027 and 446 by Nov 2028. The average member Full Groom is ₹1,244. The discount lowers the job value for groomer and PetDoorStep alike, and the groomer gets a booked monthly visit in return.
- **Keep messaging cheap.** Utility messages cost Rs 0.115 + GST each, and marketing templates Rs 0.8631 + GST [R4-24], so use marketing templates rarely.
- **Model assumptions**: 35% of new customers book again in year 1, rising to 50%. The share of jobs from repeat customers (T5) goes 15% → 39% and first passes 40% in Jun 2027 (month 7). For comparison, 30-40% of first-time salon clients book again (indicative) [R4-15], and repeat customers brought Urban Company 77% of its transaction value [R4-16].

### Seasonality

- **Peak in Apr-Jun** (pre-summer and summer) and the Jul-Sep tick season. **Expect a dip in the Dec-Jan cold**; the model assumes this pattern.
- **Diwali (8 Nov) falls in the pilot month**: offer pilot slots as a "pre-Diwali groom" to friends and RWA contacts.
- **No paid ads before the new year.** Oct-Dec Meta CPMs run 25-50% above average (indicative) [R4-21], and the first CAC test is Mar 2027 at the earliest.
- **In winter, push vaccination, deworming, cat grooms and Bath & Brush**, and save cash for a Mar-Apr push.

### Market-size reality check: why Tricity matters

- Ludhiana's metro population is about 20.3 lakh [R4-03], and the district had 4.36 lakh urban households in 2011 [R4-02]. But only 45,880 of the city's households (16%) owned a car in 2011-13 data [R4-04], and car ownership is the best proxy for who can afford a ₹1,199-1,899 groom. Only 3,321 pet dogs were registered over five years, a big undercount [R4-05]. About 23.7% of Indian pet owners use groomers (indicative) [R4-12].
- That puts the **core paying pool at roughly 1,700-4,700 households** (R4 rec). The model assumes 5,000 Ludhiana households will try PetDoorStep at least once over its lifetime; most will not become regulars.
- **Ludhiana alone** reaches ₹1 Cr GMV in Aug 2028, but ₹1 Cr platform revenue only beyond 60 months.
- **Tricity is the biggest prize.** It is richer, priced about Rs 100 above Ludhiana in the mid-tier [R1-19, R1-20], and crowded. The base case opens it in Jul 2028 (month 20), and only once all the T1-T5 expansion triggers hold.

### Tricity playbook (city 2): what is different

- **Open only through the gate.** T1-T5 must hold for 2 consecutive months. The base case opens Tricity in Jul 2028 (month 20), the bootstrap case in Aug 2028 (month 21).
- **Start from the Ludhiana menu** and change a row only with a written reason (11-EXPANSION-PLAYBOOK Step 8). The field: ThePetNest Chandigarh Rs 899 / 1,299 / 1,599 [R1-20]; Mr n Mrs Pet Rs 999-2,499 [R1-22]; Monika's Rs 1,000-1,900 (reportedly) [R1-24]; Petlogix and Pet Vanity Rs 1,200-3,600 (indicative) [R1-23]; HUFT spas in Sector 22B, Panchkula and Mohali [R1-28]. The ₹1,199 / ₹1,499 Full Grooms sit mid-field. The ₹1,899 Large is above ThePetNest's top tier, so spell out what it includes (R1 rec).
- **Walking**: Sploot charges Rs 2,400 (20 min) and Rs 3,540 (40 min) a month [R1-26]. **State the walk length** on the ₹2,999 plan.
- **Demand signal**: Chandigarh requires every dog over 4 months to be registered, and an older count found about 9,500 registered pet dogs (indicative) [R4-40], against 3,321 in Ludhiana over five years [R4-05].
- **Supply**: **sign a city lead and at least 2 trained groomers** before any page goes up, and secure a real base address for the Google profile (11-EXPANSION-PLAYBOOK §2). Recruit from independent Tricity groomers (see "Supply").
- **Budget**: the city clone costs ₹1.1 lakh standard or ₹20,000 low-cost (line items in "Investment"), plus about 3 months of city losses. The city lead is ₹10,000/month + 10% of city revenue in the bootstrap tier; **switch to a salaried lead (₹30,000/month salary) at the Tricity clone** if cash allows. Fixed marketing starts at ₹5,000/month.
- **Why year 2 dips**: base-case year-2 EBITDA is −₹2.2 lakh even though monthly EBITDA turns positive in Apr 2028 (month 17). The Tricity launch costs in months 19-24 explain the gap.

---

## Operations and tech stack

Phase 1, when customers pay providers directly, runs on WhatsApp, a Google Sheet and discipline. Every job follows the same 9 steps, so a future ops coordinator can take over without guesswork.

### Booking to payout, step by step

1. **Customer books on /book/.** The form creates a reference (PDS-date-code), sends a row to the Google Sheet lead log and opens WhatsApp with the booking pre-filled.
2. **Confirm on WhatsApp within 10 minutes** (9:00-19:00): price, slot window, address pin and pet notes.
3. **Update the lead sheet**: status `confirmed`, zone and provider name.
4. **Dispatch by zone.** Send the provider a job card (pet, address, notes, price), and send the customer the provider's name, photo and verified badge.
5. **Visit.** The provider opens the sealed kit in front of the customer and sends before and after photos to the customer and the PetDoorStep team group.
6. **Customer pays the provider directly**, by the provider's UPI QR or cash. That is the website price minus any FIRSTGROOM or referral credit.
7. **Provider marks the job done** with "DONE + ref + amount + UPI/cash". Ops sets status `done`; only `done` rows count towards expansion trigger T1.
8. **Monday: send each provider the weekly commission statement**; bookings pause if it is unpaid after 7 days (see "Supply").
9. **Ask for a review the same evening** with the Google review link, and suggest the next date.

### Dispatch rules

- **Draw 3-4 zones** on Google My Maps, for example a Sarabha Nagar–BRS Nagar–Ferozepur Road cluster. Give each provider a home zone.
- **Cluster jobs.** Same-zone jobs go back-to-back in one time window, and nobody crosses the city for a single job.
- **Keep trips within about 8 km by zoning.** Fuel costs about Rs 1.7-2.5 per km [R2-29], and the model allows ₹50 a job. **Inside Ludhiana city there is never a travel charge** (00-MASTER-PLAN §3.2). For jobs outside the city and its listed localities, it is Sunny's call (Decision 3): either a flat Rs 50-100 surcharge paid 100% to the provider (R2 rec), published on /pricing/ before launch, or decline the job.
- **Walks**: one walker per cluster of nearby homes, in fixed morning and evening slots.

### Tool stack

| Stage | Tool | Cost | Low-cost alternative |
|---|---|---|---|
| Chat and bookings | WhatsApp Business app, then AiSensy (an official WhatsApp API reseller) | App free. AiSensy Rs 1,500-3,200/month + GST [R4-27], plus Rs 0.115 per utility message [R4-24] | Stay on the free app until about 250-500 customers (R4 rec) |
| Lead log | Google Sheets + Apps Script (already built) | Free | Same |
| Email and ops apps | Google Workspace Business Starter [R5-13] + AppSheet (check it is included) [R5-14], or Glide [R5-15] | Rs 270/user/month + GST [R5-13]. Glide $49-60/month (indicative) [R5-15] | AppSheet free for up to 10 test users [R5-14]; Google Forms for onboarding |
| Groom Club fees | UPI QR into the business current account; add a Razorpay payment link only if card payments are needed | UPI QR free. Razorpay 2% + GST [R5-02], Rs 199 onboarding with no GST number needed [R5-09]. Its 0% offer is for new merchants only (90 days or Rs 5 lakh [R5-03]), so activating now uses it up before the Phase-2 switch | UPI QR only |
| Bulk payouts to providers (later, only if PetDoorStep collects centrally) | RazorpayX [R5-07] | Rs 4-9 + GST per payout [R5-07] | Manual UPI each Monday |
| Masked calling | Cloud telephony number | Get 2–3 quotes | All contact through the PetDoorStep number; address shared on the day |
| Website | Cloudflare Pages [R5-19] | Free [R5-19]; .in domain about $3–10 a year (indicative) [R5-18]; budget ₹1,000 | Same |

Skip field-service apps. They charge per technician: Zoho FSM is reportedly Rs 1,000-1,800 per user a month [R5-17], which is too costly with many part-time providers. Central collection through Razorpay Route needs more than Rs 40 lakh turnover [R5-04]; see "How PetDoorStep makes money".

### Customer support

- **Name a grievance officer on the site.** The legal minimum is to acknowledge a complaint within 48 hours and resolve it within one month [R3-21] (lawyer must confirm).
- **Aim much faster**: reply the same working day, and reply to any review of 3 stars or below the same day.
- **Log every complaint** in a sheet tab, with ref, provider, cause, fix and credit given, and review it every Monday with the 3-strike tally.

### Hygiene and quality operations

- **Pack sealed blade and towel packs centrally**, sanitised with the disinfectant named on /safety-hygiene/, and sell them to providers at cost + 15% [R1-09]. Low-cost option: providers pack to the same written spec.
- **Use a checklist on every visit.** Before: seal intact, mat down, coat checked. After: area cleaned, photos sent, payment logged.
- **Spot-check 5 photo sets a week**, and make one surprise visit per groomer each month.

### When to build an app

- **Default (bootstrap): run the provider app on AppSheet and Sheets**, then buy a no-code upgrade (AppSheet or Glide) for ₹1.0 lakh. The bootstrap model has this upgrade in Sep 2028 (month 22).
- **Upgrade to a custom app at about 1,000 active repeat customers**, which the base case reaches in Aug 2028 (month 21). Budget ₹7.0 lakh for a freelance Flutter MVP, Android first. Freelance MVPs cost about Rs 6.5-9.5 lakh [R5-23] and agencies Rs 6-55 lakh [R5-22] (both indicative). Google Play costs $25 once, while Apple costs Rs 8,700 a year [R5-24]. Phone-OTP login on Firebase needs its paid plan (indicative) [R5-21].
- **Avoid "Urban Company clone" scripts.** They cost $999-1,499, but bring lock-in and code-quality and security risk (indicative) [R5-23].
- The first ops coordinator is planned for Oct 2027 (month 11), at 250 jobs a month; see "Team".

---

## The numbers: scenarios, milestones and what moves them

Every figure in this plan comes from one model (`pet-care-ludhiana-strategy/model/`). It runs month by month from the pre-launch pilot (M0 = Nov 2026) through public launch (M1 = Dec 2026) for 60 months. Demand follows a word-of-mouth adoption curve for each city, sized from the researched Ludhiana market with a cautious ramp. It runs below the website plan's 15 / 60 / 150 booking targets at months 3 and 6, which stay as stretch targets. Repeat customers, Groom Club members, walking plans and vet visits build on top. Commission comes from today's price list, and costs from the research. These are **planning numbers, not forecasts**: they show what has to be true, and you replace them with real data month by month.

**GMV** is everything customers pay for services booked through PetDoorStep. **Platform revenue** is what PetDoorStep keeps: commission, Groom Club fees, provider Pro fees and the supplies margin, excluding GST. **EBITDA** is monthly operating profit before tax and one-off spends (pre-launch setup, new-city setup, the app build). **Peak cash need** is the deepest your cumulative cash goes, including those one-off spends. It is the amount you must have available.

### Four scenarios

| Scenario | ₹1 Cr GMV | ₹1 Cr platform revenue | Monthly profit (EBITDA) turns positive | Peak cash need |
|---|---|---|---|---|
| Conservative | May 2029 (M30) | not by M60 | Apr 2029 (M29) | ₹28.4 L |
| Base (recommended tier) | Aug 2028 (M21) | Feb 2030 (M39) | Apr 2028 (M17) | ₹18.2 L |
| Aggressive | Apr 2028 (M17) | Apr 2029 (M29) | Jun 2028 (M19) | ₹16.8 L |
| Base demand, bootstrap tier | Sep 2028 (M22) | Mar 2030 (M40) | Mar 2028 (M16) | ₹2.7 L |

Conservative = a smaller market (0.7× Ludhiana's 5,000 lifetime trial customers), slower word of mouth and lower repeat rates. Aggressive = a 1.3× market with faster growth. The bootstrap row keeps base-case demand but uses the low-cost spending choices throughout (see Investment).

### Base case, month by month

| Month | Jobs | GMV | Platform revenue | Cumulative GMV / revenue |
|---|---|---|---|---|
| M1 · Dec 2026 | 21 | ₹24,659 | ₹3,667 | ₹42,227 / ₹6,302 |
| M3 · Feb 2027 | 37 | ₹43,858 | ₹6,771 | ₹1.2 L / ₹17,824 |
| M6 · May 2027 | 116 | ₹1.4 L | ₹27,022 | ₹4.3 L / ₹78,591 |
| M12 · Nov 2027 | 356 | ₹4.3 L | ₹83,957 | ₹21.5 L / ₹4.2 L |
| M18 · May 2028 | 925 | ₹10.9 L | ₹2.3 L | ₹64.7 L / ₹13.4 L |
| M24 · Nov 2028 | 1,340 | ₹16.2 L | ₹3.4 L | ₹1.50 Cr / ₹31.5 L |
| M36 · Nov 2029 | 2,279 | ₹27.3 L | ₹5.9 L | ₹4.14 Cr / ₹87.5 L |
| M48 · Nov 2030 | 2,593 | ₹31.1 L | ₹6.7 L | ₹7.86 Cr / ₹1.68 Cr |
| M60 · Nov 2031 | 2,279 | ₹27.1 L | ₹5.9 L | ₹11.36 Cr / ₹2.44 Cr |

| Year (from launch) | GMV | Platform revenue | EBITDA |
|---|---|---|---|
| Year 1 | ₹21.3 L | ₹4.1 L | −₹5.0 L |
| Year 2 | ₹1.29 Cr | ₹27.3 L | −₹2.2 L |
| Year 3 | ₹2.64 Cr | ₹56.0 L | ₹10.1 L |

### What moves the dates

| What changes (base case) | ₹1 Cr GMV | ₹1 Cr revenue | Peak cash need |
|---|---|---|---|
| Base case as modelled | Aug 2028 (M21) | Feb 2030 (M39) | ₹18.2 L |
| Take rate −5 pp | Aug 2028 (M21) | Jun 2030 (M43) | ₹25.4 L |
| Take rate +5 pp | Aug 2028 (M21) | Nov 2029 (M36) | ₹14.3 L |
| Prices −15% (price war) | Sep 2028 (M22) | Apr 2030 (M41) | ₹22.0 L |
| Prices +15% | Jul 2028 (M20) | Dec 2029 (M37) | ₹15.7 L |
| Growth −30% | Mar 2029 (M28) | Jan 2031 (M50) | ₹20.8 L |
| Growth +30% | May 2028 (M18) | Jul 2029 (M32) | ₹18.1 L |
| Repeat rate −25% | Sep 2028 (M22) | May 2030 (M42) | ₹21.8 L |
| Repeat rate +20% | Aug 2028 (M21) | Dec 2029 (M37) | ₹15.9 L |
| Ludhiana only (no expansion) | Aug 2028 (M21) | not by M60 | ₹13.8 L |
| Gateway split payments from 1,500 jobs/month | Aug 2028 (M21) | Feb 2030 (M39) | ₹18.2 L |
| GST registered from day 1 (voluntary) | Aug 2028 (M21) | Feb 2030 (M39) | ₹18.9 L |
| GST s.9(5) applied to grooming (downside) | Aug 2028 (M21) | Feb 2030 (M39) | ₹96.3 L |
| Gig-worker levy charged on GMV, not revenue | Aug 2028 (M21) | Feb 2030 (M39) | ₹19.1 L |

The two lines that matter most: **Ludhiana alone never reaches ₹1 crore of platform revenue inside five years**, so the second milestone depends on the Punjab expansion. And **if grooming were taxed under GST s.9(5)**, the business would not make money at today's prices. A CA must rule that out before launch (see Legal).

---

## Investment: what it costs and the cheap way to do it

PetDoorStep is asset-light: groomers own their kits and customers pay them directly. Two budget tiers are modelled, and four choices drive most of the gap:

- **Founder draw:** recommended pays ₹15,000/month from month 1, ₹30,000/month from month 13, ₹50,000/month from month 25. Bootstrap pays nothing in year 1, then ₹20,000/month from month 13, ₹40,000/month from month 25.
- **Launch guarantee:** recommended tops up the core launch groomers (₹12,000/month for 2 groomers × 3 months). Bootstrap uses part-time salon groomers with no guarantee.
- **City leads:** a ₹30,000/month salary on recommended; ₹10,000/month + 10% of city revenue on bootstrap.
- **App:** custom (₹7.0 lakh) or no-code (₹1.0 lakh), built only at about 1,000 active repeat customers.

Bootstrap also cuts marketing to ₹5,000/month per city (from ₹15,000/month) and starts ads in Jun 2027 (not Mar 2027). The bootstrap model starts insurance only in month 7, but **buy CGL with care-custody-control cover from launch in both tiers**: budget ₹30,000/year (estimate — get 2–3 quotes) and add half a year's premium to the bootstrap figures.

### Totals, recommended vs bootstrap

- **Before launch:** ₹1.8 lakh vs ₹46,520
- **First 6 months of losses:** ₹2.8 lakh vs ₹60,090
- **Each new city:** ₹1.1 lakh vs ₹20,000, plus about 3 months of its losses
- **Peak cash need:** ₹18.2 lakh vs ₹2.7 lakh. That is the deepest the business goes into the red before paying back, counting pre-launch spend, losses, city setups and the app.
- **Payback (all cash back):** May 2030 (month 42) vs Jan 2029 (month 26)

**The bootstrap peak excludes your own living costs for year 1.** The bootstrap founder draw is zero until month 13, so you live on savings until then (see Funding, "Your own runway"). Even so, bootstrap barely slows the model. ₹1 Cr GMV comes Sep 2028 (month 22) instead of Aug 2028 (month 21), about a month later, for far less cash. **Start on the bootstrap lines and upgrade a line only when its milestone is hit.** Which tier to run is a founder decision (see Decisions).

### When to upgrade a line

| Line | Start with | Upgrade to | When |
|---|---|---|---|
| Liability insurance | CGL with care-custody-control cover | n/a | **From launch, both tiers** |
| Paid ads | None until the test | Meta Click-to-WhatsApp | A 2–3 week test in Mar 2027 shows CAC (cost per new customer) at or below ₹600. Otherwise wait until Jun 2027 |
| City lead | ₹10,000/month + 10% of city revenue | ₹30,000/month salary | At the Tricity clone |
| App | WhatsApp + Google Sheet | Custom app (₹7.0 lakh); no-code (₹1.0 lakh) if cash is short | About 1,000 active repeat customers |
| Launch top-up | None (part-time salon groomers) | ₹12,000/month for 2 groomers × 3 months | Only if 2 good groomers won't sign without it |
| Founder draw | None until month 13 | ₹15,000/month from month 1, ₹30,000/month from month 13, ₹50,000/month from month 25 | If your savings run short |

### Before launch, line by line

| Item | Standard | Low-cost | Cheap way |
|---|---|---|---|
| Business entity: LLP (get quotes) | ₹7,000 | ₹0 | Proprietorship + free Udyam [R3-16]. It can't get DPIIT recognition [R3-15] (CA must confirm), so this plan takes the LLP |
| Trademark, Class 44 | ₹7,500 | ₹4,500 | Self-file on IP India at the ₹4,500 Udyam rate [R3-19]; run the free public search first |
| CA structuring consult (get quotes) | ₹10,000 | ₹3,000 | One focused call using this plan's question list. Never skip it |
| Lawyer review: T&Cs, privacy, provider agreement (get quotes) | ₹25,000 | ₹7,500 | Law-school legal-aid clinic or a junior advocate's fixed fee |
| Domain (.in) | ₹1,000 | ₹1,000 | No cheaper safe option |
| Business phone + WhatsApp Business | ₹1,500 | ₹500 | New prepaid SIM; the WhatsApp Business app is free |
| Brand polish (logo files, social templates) | ₹10,000 | ₹0 | Reuse the website's design system and free Canva templates |
| Photo shoot (real groomers, pets, homes) | ₹20,000 | ₹3,000 | Photography student on barter (a free groom) + a good phone |
| Background checks, 6 providers | ₹7,200 | ₹1,500 | PP Saanjh ₹200 [R2-23] + Aadhaar offline check up to ₹10 [R2-25] each; start now |
| Uniform + ID card, 6 providers | ₹3,300 | ₹2,400 | Printed polos + PVC ID from Ludhiana hosiery suppliers [R2-27] |
| Training to your standards, 3 groomers | ₹9,000 | ₹3,000 | 1 supervised session each + written SOP + video; skip academies [R2-26] |
| Sealed-kit consumables, starter stock | ₹20,000 | ₹8,000 | Smaller first order; providers buy to the same spec. Recovered through supplies sales |
| Loaner groomer kit | ₹19,000 | ₹0 | Recruit only groomers who own a kit |
| Vet cold-chain carrier | ₹1,600 | ₹0 | The partner vet brings their own |
| Provider accident cover (PMSBY), 6 providers | ₹120 | ₹120 | Same: ₹20 a year each [R3-29]. Covers the provider, not pet injury |
| Pilot grooms for first reviews | ₹8,400 | ₹5,000 | 8 pilot grooms with friends and RWA contacts |
| Launch print kit (flyers, standees, QR stickers) | ₹15,000 | ₹5,000 | 1,000 flyers hand-delivered in 2 sectors + QR stickers + 1 standee |
| Launch stalls: GADVASU Dog Show + RWA camps (get quotes) | ₹10,000 | ₹2,000 | 1 free society camp with demo nail trims; ask GADVASU for the stall fee |
| **Total before launch** | **₹1.8 lakh** | **₹46,520** | |

Lines marked "get quotes" are estimates: replace each with 2 real quotes. The low-cost total assumes a proprietorship; the LLP this plan recommends adds the entity line's standard cost back. Liability insurance is a running cost, so it is not in these totals.

### Each new city

| Item | Standard | Low-cost | Cheap way |
|---|---|---|---|
| City lead: hiring + 1 month overlap | ₹30,000 | ₹0 | Revenue-share lead, no upfront cost. Not for Tricity: hire a salaried lead there |
| Provider onboarding, 4 providers | ₹15,000 | ₹4,000 | Saanjh checks + printed polos + 1 supervised session |
| Base address for GBP verification, 3 months | ₹15,000 | ₹0 | The city lead's home address, hidden on GBP as a service-area business |
| Founder travel and stay during the clone | ₹20,000 | ₹8,000 | Bus or train day-trips |
| Launch print + events | ₹20,000 | ₹6,000 | Flyers + 1 society stall |
| City photo shoot | ₹10,000 | ₹2,000 | Student barter + phone |
| Registration / legal per city | ₹5,000 | ₹0 | Likely not needed with no premises; check the Punjab Shops Act (CA must confirm) |
| **Total per city** | **₹1.1 lakh** | **₹20,000** | |

Add about 3 months of the city's losses on top. For Tricity, add the salaried lead (₹30,000/month salary) even on the bootstrap path.

### Monthly running costs

- **Founder draw:** ₹15,000/month from month 1, ₹30,000/month from month 13, ₹50,000/month from month 25 on recommended; ₹20,000/month from month 13, ₹40,000/month from month 25 on bootstrap.
- **Ops coordinator:** ₹20,000/month each. The first joins at 250 jobs a month, in Oct 2027 (month 11); the second at 900 jobs, in May 2028 (month 18).
- **City lead, each city after Ludhiana:** ₹30,000/month salary or ₹10,000/month + 10% of city revenue. Tricity gets the salaried lead either way.
- **Fixed local marketing, per city:** ₹15,000/month vs ₹5,000/month, plus a larger launch budget in a new city's first 3 months. Demand splits it by channel.
- **Acquisition, per new customer (model):** Google profile ₹50, vet clinics and pet shops ₹150, RWA flyers ₹200, creators ₹250, Meta ads ₹600. FIRSTGROOM and referral credits are marketing costs too.
- **Liability insurance (CGL):** ₹30,000/year (estimate — get 2–3 quotes), paid yearly, from launch in both tiers.
- **Accounting (CA retainer):** ₹2,500/month (+₹2,500 once GST-registered; estimate). Get quotes. It covers books, TDS returns and, later, GST returns.
- **Aggregator levy:** modelled at 1% of revenue from month 1 [R2-31] (CA must confirm).
- **Software and sundries:** small at launch and rising with volume; bootstrap keeps them lower.
- **Masked calling, if you use it:** get quotes.

### How the cash need builds

EBITDA here is the monthly operating result, before one-off spends.

| Month | Recommended: monthly EBITDA | Bootstrap: monthly EBITDA |
|---|---|---|
| Dec 2026 (month 1) | −₹78,490 | −₹12,870 |
| Feb 2027 (month 3) | −₹39,609 | −₹12,109 |
| May 2027 (month 6) | −₹37,408 | −₹5,354 |
| Nov 2027 (month 12) | −₹37,650 | −₹12,402 |
| May 2028 (month 18) | ₹12,463 | ₹49,279 |
| Nov 2028 (month 24) | ₹48,657 | ₹90,835 |

Add the pre-launch spend, city setups and the app to these losses, and the running total bottoms out at the peak. On the recommended tier that is ₹18.2 lakh in Sep 2028 (month 22), as Tricity opens and the app is built. On bootstrap it is ₹2.7 lakh in Feb 2028 (month 15), just before the business turns EBITDA-positive in Mar 2028 (month 16). On bootstrap, add the earlier insurance and your living costs.

### Ten low-cost rules

1. **Barter for content.** Trade a free groom for a student photo shoot. Nano pet creators get a groom instead of ₹500–8,000 a post [R4-30]. Keep each under ₹20,000 a year to avoid 10% TDS under s.194R [R4-32] (CA must confirm), and ask them to tag posts #gifted [R4-32].
2. **Let providers own their kits** (an indicative ₹18,000–29,000 [R2-21]). Sell providers sealed consumables at cost + 15%; that line earns Urban Company about 16% of revenue [R1-09]. Never make buying them a condition of joining.
3. **Verify through PP Saanjh:** ₹200 [R2-23] plus up to ₹10 for an Aadhaar offline check [R2-25], against an indicative ₹799–1,599 privately [R2-24]. Apply now; it can take up to 30 days [R2-23].
4. **Buy uniforms from Ludhiana's hosiery hub,** where polos cost ₹150–215 [R2-27].
5. **Skip grooming academies** (₹49,000–65,000 + GST [R2-26]). Hire salon-experienced groomers; teach your standards with a supervised session, an SOP and a video.
6. **Pay city leads for results until a city is big enough.** For the Tricity clone, hire a salaried lead (₹30,000/month salary). For smaller cities, start on ₹10,000/month + 10% of city revenue. Either way, use the lead's home as the GBP base.
7. **Use free tools first:** Cloudflare Pages [R5-19], and the WhatsApp Business app until its 256-contact broadcasts get tight [R4-29]. Providers' own UPI QRs carry 0% MDR on payments up to ₹2,000, and on all payments for small merchants [R5-01]. So skip a 2% + GST gateway [R5-02] and a soundbox [R5-10].
8. **Spend only when a milestone pays for it.** Run no ads in Oct–Dec, when CPMs reportedly run 25–50% higher [R4-21]. Skip Justdial's paid plans (₹18,000–36,500 a year [R4-37]) until the free channels are working. Open a city only through T1–T5.
9. **Go offline first.** Flyers cost an indicative ₹500–2,000 per 1,000 [R4-33]. The GADVASU Dog Show draws 100+ owners each December [R4-38].
10. **Take grants before equity** (see Funding).

**Never cut the CA consult, the lawyer review or liability insurance** (see Risks). Each line's source and trade-off are in Appendix A.

---

## Funding the plan: cheapest money first

### How much

- **Bootstrap tier:** peak need ₹2.7 lakh, around Feb 2028 (month 15). Line up ₹4.0 lakh (with a buffer). **This excludes your own living costs for year 1**: the bootstrap draw is zero until month 13 (₹20,000/month from month 13, ₹40,000/month from month 25), so set aside a separate year of personal expenses before choosing this tier. Add half a year of insurance, budgeted at ₹30,000/year (estimate — get 2–3 quotes), because CGL starts at launch. Savings and family can cover the business side.
- **Recommended tier:** peak need ₹18.2 lakh, around Sep 2028 (month 22), when Tricity and the app land together. Line up ₹24.0 lakh: grants plus a loan or angel money.

Neither figure covers the GST s.9(5) downside (₹96.3 lakh). A CA must rule that out first (see Risks). Holding the commission matters too: a 5-point cut pushes the recommended peak to ₹25.4 lakh, above the ₹24.0 lakh you'd line up.

### Your own runway

On the bootstrap tier, PetDoorStep pays you nothing from the pilot month (Nov 2026) to month 12 (Nov 2027). That is 13 months.

- [ ] **Add up your monthly household costs:** rent, food, EMIs, insurance, family support.
- [ ] **Keep 13 months of them, plus a buffer, in a separate account** that the business never touches.
- [ ] **If you can't, take the recommended draw (₹15,000/month from month 1, ₹30,000/month from month 13, ₹50,000/month from month 25).** The business then needs more than ₹4.0 lakh: add the draw for every month you take it.
- [ ] **Write down family money as a loan or a gift** before it arrives.

### The ladder

| Source | Amount | Cost | Eligibility and catch | When |
|---|---|---|---|---|
| Own savings, family | Pre-launch and early months | None (write down: loan or gift) | Personal risk | Now |
| **GADVASU VLIIF** ignition grant [R5-34] | Up to ₹10 lakh | Grant | **Best fit:** Ludhiana vet university with a Ludhiana Angels Network MoU. Pet-services eligibility unconfirmed | Nov 2026–Jan 2027 |
| Startup Punjab seed grant [R5-31, R5-32] | ₹3 lakh in policy; ₹5 lakh announced | Grant | Paid through a recognised incubator | After incubation |
| MUDRA Kishore / Tarun [R5-25, R5-26] + Punjab IBDP subsidy [R5-31] | ₹50,000–5 lakh / ₹5–10 lakh | About 8.5–12% a year; IBDP subsidises 8% a year of interest for 5 years | Collateral-free, but you are personally liable. IBDP cover for MUDRA unconfirmed (CA must confirm) | Once you have 3 months of traction data (lender/incubator must confirm) |
| CGTMSE [R5-29] | 85% guarantee on micro loans up to ₹5 lakh | Annual fee | Needs Udyam | With any bank loan |
| Startup India Seed Fund [R5-30] | Reportedly up to ₹20 lakh grant + ₹50 lakh debt | Grant / debt | DPIIT entity under 2 years old; via an incubator; 2026 status unclear | Before the LLP turns 2 |
| PAU PABI [R5-35] | ₹5 lakh / ₹25 lakh | Grant | Agri-business incubator; pet fit unclear | If VLIIF says no |
| Chandigarh Startup Policy [R5-33] | Up to ₹7 lakh seed | Grant | Probably needs a Chandigarh base | Tricity phase |
| CIIF Chitkara [R5-36] | ₹10–25 lakh | Equity, convertible or debt | Company only; 3 months in a CIIF programme first | Tricity phase |
| Ludhiana Angels Network [R5-37]; Chandigarh angels | LAN reportedly invests ₹50 lakh in each pick | Pre-seed is an indicative ₹5–25 lakh for 15–20% [R5-38] | Needs traction and a Pvt Ltd | Only with traction |
| PMEGP [R5-27] / Stand-Up India [R5-28] | Skip | n/a | PMEGP was approved only to 2025-26 and no extension was found [R5-27]; it also fits asset-light businesses poorly. Stand-Up India is SC/ST/women-only and reportedly ended March 2025 [R5-28] | Not planned |

### Sequence

1. **Oct–Nov 2026: form the LLP (see Legal, tax and compliance), then register free** with Udyam [R3-16], DPIIT [R3-15] and Startup Punjab (CA must confirm). A proprietorship can't get DPIIT recognition [R3-15].
2. **At the same CA consult, ask about conversion:** does converting the LLP into a Pvt Ltd later keep or reset the incorporation date for the Seed Fund's under-2-years rule [R5-30] and for DPIIT recognition [R3-15]? (CA must confirm.) The answer decides when to convert.
3. **Nov 2026–Jan 2027: apply to VLIIF** [R5-34]. Ask VLIIF for a meeting; the December Dog Show is also a GADVASU event [R4-38].
4. **From Mar 2027, once you have 3 months of traction data: ask the incubator to file for the Punjab seed grant** [R5-31] (incubator must confirm eligibility and timing). Take a MUDRA Kishore loan, with the IBDP subsidy and CGTMSE cover, only if working capital is tight.
5. **By late 2027: apply to the Startup India Seed Fund** if it is open; its 2026 status is unclear [R5-30].
6. **Spring 2028, as T1–T5 turn green: decide on outside money for Tricity.** The base case opens it in Jul 2028 (month 20), bootstrap in Aug 2028 (month 21). On the bootstrap path, grants and cash flow should cover the low-cost city setup (₹20,000) plus a salaried Tricity lead (₹30,000/month salary) and about 3 months of the city's losses. On recommended, pitch the Chandigarh policy, CIIF or angels. Convert to a Pvt Ltd before any equity, timed by the CA's answer in step 2.

### Have ready

- [ ] **LLP registration, PAN and a current account**
- [ ] **DPIIT certificate, Udyam number and Startup Punjab registration**
- [ ] **13 months of personal expenses set aside** if you run the bootstrap tier
- [ ] **A 10–12 slide pitch deck on this plan's numbers:** ₹1 Cr GMV by Sep 2028 (month 22) and peak cash ₹2.7 lakh on the bootstrap lines; Aug 2028 (month 21) and ₹18.2 lakh on recommended; unit economics (see How PetDoorStep makes money)
- [ ] **3 months of traction data:** jobs, repeat rate, reviews, contribution
- [ ] **The CA's written note on GST s.9(5).** Every serious funder will ask for it.
- [ ] **The CA's answer on LLP-to-Pvt Ltd conversion** and the Seed Fund's 2-year clock

---

## Legal, tax and compliance

The legal/tax research (R3) had no web access, so its points are unverified. **Book one CA session and one lawyer review before launch** (see Investment).

### 1. Entity
- **Register an LLP now (Oct–Nov 2026; recommended).** It costs ₹500 in government fees and needs no audit below ₹40 lakh turnover [R3-18] (CA must confirm). An LLP can get free DPIIT recognition [R3-15] (CA must confirm). That helps with Startup Punjab and incubator applications such as GADVASU's VLIIF (up to ₹10 lakh, under DST criteria [R5-34]). The 80-IAC tax holiday also needs an Inter-Ministerial Board certificate [R3-14, R5-39] (CA must confirm).
- **Low-cost option: sole proprietorship + Udyam.** Free, but no DPIIT recognition, which shuts out DPIIT-linked schemes such as the Seed Fund and weakens incubator applications [R3-15] (CA must confirm). Claims would also fall on you personally (lawyer must confirm).
- **Convert to Pvt Ltd only when raising equity.** There is no MCA fee up to ₹15 lakh capital, but every company needs a yearly audit [R3-17] (CA must confirm).
- **Mind the Seed Fund clock.** The fund reportedly takes only entities under 2 years old, and its 2026 status is unclear [R5-30]. An LLP formed in Oct 2026 stays eligible until Oct 2028, so apply by mid-2028 at the latest. Ask the CA whether a later LLP-to-Pvt Ltd conversion keeps or resets the incorporation date (CA must confirm).

### 2. Registrations
- [ ] **Udyam:** free; use the official portal only [R3-16] (CA must confirm).
- [ ] **DPIIT + Startup Punjab:** both free; apply after forming the LLP [R3-15] (CA must confirm) [R5-31].
- [ ] **Trademark, Class 44:** ₹4,500 with Udyam/DPIIT status vs ₹9,000 without. Add Classes 45 and 35 later [R3-19] (lawyer must confirm).
- [ ] **Punjab professional tax:** reportedly ₹200 a month [R3-20] (CA must confirm).
- [ ] **Shops & Establishments:** open question (lawyer, row 15).

### 3. GST
- **Register when PetDoorStep's own turnover** (not GMV) passes ₹20 lakh in a financial year [R3-01] (CA must confirm). Base case: Dec 2028 (month 25).
- **Keep the agent structure.** The provider is the supplier, and PetDoorStep invoices only its commission. Fixed prices and a service guarantee could make it look like the principal, taxed on full GMV [R3-08] (CA must confirm), so Terms wording matters.
- **Let providers under ₹20 lakh stay unregistered** [R3-02] (CA must confirm).
- **Keep payments direct to avoid TCS**, which applies only when the platform collects payment [R3-03] (CA must confirm).
- **Get the CA's written view on s.9(5) "housekeeping" before launch. This is the top tax risk.** Under s.9(5), the platform itself pays GST on "housekeeping services such as plumbing, carpentering etc." from unregistered suppliers. Grooming isn't named, but the wording is open-ended [R3-04] (CA must confirm). If applied, PetDoorStep pays GST on every groom's full price: peak cash need ₹96.3 lakh (vs ₹18.2 lakh), and EBITDA break-even beyond 60 months.
- **Confirm the vet exemption.** Veterinary clinic services are exempt [R3-06] (CA must confirm that home visits count).
- **Charge 18% GST on commission and fees once registered** [R3-05] (CA must confirm). Providers bear the GST on their commission.
- **Don't register early just to reclaim GST on ads.** Ads carry 18% GST, reclaimable only if registered [R4-39] (CA must confirm), but registering voluntarily raises peak cash (₹18.9 lakh vs ₹18.2 lakh).

### 4. Income tax
- **Plan for TDS (old s.194-O).** The platform deducts 0.1% even when customers pay providers directly. Individual providers with PAN earning up to ₹5 lakh a year are exempt [R3-09, R5-11] (CA must confirm). **Get a TAN.**
- **Use the new section numbers.** The Income-tax Act 2025 reportedly replaced the 1961 Act from 1 April 2026, and this TDS is now in s.393 [R3-10] (CA must confirm).

### 5. Platform rules
- **Name a grievance officer** on the site. Acknowledge complaints within 48 hours and resolve them within a month. Show provider details and refund terms. Charge no cancellation fee unless PetDoorStep bears a similar one [R3-21] (lawyer must confirm). Fill `[FILL:GRIEVANCE_OFFICER_*]` and `[FILL:LATE_CANCEL_RULE]` to match.
- **Add a consent checkbox to /book/ now.** Most DPDP duties reportedly start around May 2027, and penalties go up to ₹250 crore [R3-22] (lawyer must confirm). Use the offline Aadhaar check, so you never store Aadhaar numbers [R2-25].
- **Budget for the social-security levy.** Aggregators pay 1–2% of turnover (capped at 5% of payouts) from a date not yet notified, and register workers within 45 days [R2-31, R3-23] (lawyer must confirm). The model sets aside 1% of platform revenue. If the levy is charged on GMV, peak cash rises to ₹19.1 lakh (vs ₹18.2 lakh; lawyer must confirm the base).

### 6. Vets and medicines
- **Onboard only registered vets.** IVC Act s.30 lets only registered vets practise [R2-12, R3-26] (lawyer must confirm).
- **Use no para-vets; groomers never vaccinate.** Diploma holders may vaccinate only under a vet's supervision [R2-13], and the High Court has questioned how Punjab supervises them [R2-14] (lawyer must confirm).
- **Let the vet sell medicines at MRP** under their own practice. PetDoorStep holds no stock [R3-27] (lawyer must confirm).

### 7. Provider contracts
- **Sign an independent-contractor agreement.** Partners accept or decline jobs, own their kit and are paid per job. If treated as employees, Punjab minimum wages could apply [R2-30] (lawyer must confirm).
- **Keep non-solicit terms modest.** Post-term non-competes are void under s.27 of the Contract Act (lawyer must confirm).
- **Take no deposits, prepaid wallets or target-linked fees** [R1-07].

### 8. Insurance
- **Enrol every provider in PMSBY:** ₹2 lakh accident cover for ₹20 a year [R3-29] (CA must confirm).
- **Buy CGL with care-custody-control cover before launch, in both tiers.** Plan ₹30,000/year (estimate — get 2–3 quotes). The bootstrap cash model only books the premium from month 7, so set the first year's premium aside from savings. Don't fill `[FILL:INSURANCE_STATUS]` as "insured" until a policy exists.
- **Book no pet-insurance referral income** without an IRDAI licence [R3-28] (lawyer must confirm).

### 9. Influencers
- **Log the barter value given to each creator.** Above ₹20,000 a year, it attracts 10% TDS under s.194R [R4-32] (CA must confirm). **Require ASCI disclosure** (#ad/#collab) [R4-32] (lawyer must confirm).

### 10. Compliance calendar
Ask the CA to turn this into dated reminders. The CA retainer is unpriced (get quotes); the model plans ₹2,500/month (+₹2,500 once GST-registered; estimate).

| When | Do this | Basis |
|---|---|---|
| Oct–Nov 2026 | **Form the LLP; get PAN, TAN and a current account.** Then Udyam, DPIIT, Startup Punjab and the Class 44 trademark | [R3-15, R3-16, R3-18, R3-19] (CA / lawyer must confirm) |
| Before the first pilot job (Nov 2026) | **Buy CGL; enrol each provider in PMSBY; publish the grievance officer; add the /book/ consent checkbox** | [R3-21, R3-22, R3-29] (lawyer must confirm) |
| Within 45 days of onboarding each provider | **Register them on the government portal**, once the aggregator rules require it | [R2-31] (lawyer must confirm) |
| Every month | **Account for Punjab professional tax** (₹200 a month per taxable person; the CA sets when to pay) | [R3-20] (CA must confirm) |
| Every quarter | **File the TDS return** for platform TDS (26Q under the old Act; the CA confirms the new form and dates) | [R3-09, R3-10] (CA must confirm) |
| By May 2027 | **Have DPDP notice, consent records and a breach plan in place** | [R3-22] (lawyer must confirm) |
| 30 May each year (first: 2027) | **LLP Form 11** (annual return). Late filing costs ₹100 a day per form | [R3-18] (CA must confirm) |
| 30 Oct each year (first: 2027) | **LLP Form 8** (accounts and solvency) | [R3-18] (CA must confirm) |
| When own turnover nears ₹20 lakh in a financial year | **Register for GST**, charge 18% on commission and fees, start GST returns | [R3-01, R3-05] (CA must confirm); base case Dec 2028 (month 25) |
| When own turnover passes ₹40 lakh | **Book an LLP audit** (base-case platform revenue reaches ₹56.0 lakh in year 3) | [R3-18] (CA must confirm) |
| By mid-2028 | **Apply to the Seed Fund**, while the LLP is under 2 years old | [R5-30] (CA must confirm) |
| When notified | **Start paying the social-security levy** | [R2-31, R3-23] (lawyer must confirm) |

### Ask your CA / lawyer
| # | Question | Who |
|---|---|---|
| 1 | Is app-booked home grooming or walking "housekeeping" under s.9(5)? Should we seek an advance ruling? | CA |
| 2 | With direct payment, do we owe s.52 TCS or need registration below ₹20 lakh? | CA |
| 3 | How do we deduct TDS on money we never handle? Via the commission invoice? | CA |
| 4 | What GST rate and SAC apply to grooming and walking after 22 Sept 2025 (18% or 5%) [R3-07]? | CA |
| 5 | Do home vet visits qualify for the vet-clinic exemption? | CA |
| 6 | Proprietorship, LLP or Pvt Ltd for DPIIT, tax and the Seed Fund clock? | CA |
| 7 | GST timing and revenue recognition for prepaid Groom Club fees and referral credits? | CA |
| 8 | What Terms wording and invoicing keep the provider the legal supplier? | Lawyer |
| 9 | Are we an "aggregator"? Is the levy charged on GMV or our revenue, and from when? | Lawyer |
| 10 | Do our contractor terms risk misclassification? Which non-solicit terms survive s.27? | Lawyer |
| 11 | May we take commission on vet fees? Can vets sell vaccines on home visits without a drug licence? | Lawyer |
| 12 | May groomers apply topical tick-and-flea products? | Lawyer |
| 13 | Limitation clauses and provider indemnities for pet injury, death, escape or dog bites? | Lawyer |
| 14 | What privacy notice, consent, Aadhaar handling and WhatsApp opt-in does DPDP require? | Lawyer |
| 15 | Is Punjab Shops & Establishments registration needed with no premises? | Lawyer |
| 16 | If we form an LLP now and convert it to a Pvt Ltd before raising equity, does the conversion keep or reset the incorporation date for the Startup India Seed Fund's under-2-years rule and for DPIIT recognition? | CA |

---

## Team and hiring

The groomers, walkers and vets are independent partner professionals, not employees (see Supply). This section covers the people PetDoorStep pays directly, and you.

### Sunny's job at each phase
- **Now until launch (Oct–Nov 2026): you build the business.** You handle legal, the website, recruiting, verification and the pilot, and you attend the first groom of every new groomer.
- **From launch until the first ops hire, you are ops, sales and quality in one.** The base case puts that hire at Oct 2027 (month 11), and so do the bootstrap lines (Oct 2027 (month 11)). Answer WhatsApp within 10 minutes between 9:00 and 19:00, assign jobs, check every new partner's first job, send the weekly commission invoices and reply to every review. You are also the grievance officer the E-Commerce Rules require [R3-21] (lawyer must confirm).
- **After the first ops hire: hand over job assignment and WhatsApp.** Your time then goes to growing supply, partnerships with vets and RWAs, Groom Club and the monthly money review.
- **Before any new city: meet T4.** A named ops lead must run Ludhiana for at least 4 consecutive weeks while you spend no more than 2 hours a day on it. Hire your first coordinator with that role in mind.

### Your own runway
On the bootstrap lines (the plan's default) PetDoorStep pays you nothing until month 13, and the bootstrap peak cash need excludes your living costs. Set those aside first: see Funding, "Your own runway".

### Ops coordinators
Hire the first coordinator at about 250 jobs a month, which is Oct 2027 (month 11) in the base case. The salary is ₹20,000/month, above Punjab's skilled minimum wage of ₹15,414 from 1 May 2026 [R2-30]. Hire the second at about 900 jobs a month, which is May 2028 (month 18). Let the job count, not the calendar, decide when you hire. The coordinators handle job assignment, WhatsApp, complaints, review replies and the commission ledger.

### Vets
Recruit GADVASU graduates for part-time evening and weekend visits. Punjab has about 242 BVSc (vet degree) seats a year [R2-15], and private-sector freshers typically earn ₹20,000–30,000 a month [R2-09], so paid home visits make good extra income. Every vet must be registered with the Punjab State Veterinary Council [R3-26] (lawyer must confirm). The vet keeps ₹549 of each ₹699 visit.

### Partners the base case needs

| Month | Groomers | Walkers | Vets |
|---|---|---|---|
| May 2027 | 3 | 1 | 1 |
| Nov 2027 | 7 | 2 | 1 |
| Nov 2028 (2 cities) | 25 | 9 | 4 |

The lawyer must confirm that minimum-wage and gig-worker rules do not turn these partners into employees [R2-30] [R2-31].

### Who to hire, and when

| Hire | Trigger | Cost | Low-cost alternative |
|---|---|---|---|
| Part-time CA | Week 1 | Get 2 quotes; plan ₹2,500/month (+₹2,500 once GST-registered; estimate) | One focused call, then a CA only for TAN and quarterly TDS returns (CA must confirm); books in Google Sheets until GST registration (Dec 2028 (month 25)) |
| Senior groomer as trainer | Each new groomer | ₹1,500 per session, 2 sessions per groomer | 1 session plus the written SOP and a video |
| Ops coordinator 1 | About 250 jobs a month; base case Oct 2027 (month 11) | ₹20,000/month | Part-time on the busiest days until the trigger |
| Ops coordinator 2 | About 900 jobs a month; base case May 2028 (month 18) | ₹20,000/month | Move reminders and job assignment into the no-code app first (see Ops and tech) |
| City lead | About 1 month before each city opens; Chandigarh Tricity comes first, in Jul 2028 (month 20) in the base case (Aug 2028 (month 21) on the bootstrap lines) | ₹30,000/month salary: the planned upgrade for the Tricity clone | ₹10,000/month + 10% of city revenue |
| Vets | 1 at launch, more as visits grow | Paid per visit (₹549 of ₹699) | Same: no retainer |

---

## KPIs and the monthly money dashboard

These rows add money and marketplace health to the website and Google numbers in the `09-ANALYTICS-TRACKING.md` §8 monthly report. Same log (`website-plan/tracking/KPI-LOG.md`); figures come from three tabs in the leads sheet (jobs, commission ledger, spend) and the bank statement. Base-case values are the model's cash-planning numbers, not promises; the 09 §8.2 numbers are stretch targets.

| KPI | Definition | Base case Feb 2027 · May 2027 · Nov 2027 (or target) | Tracked in |
|---|---|---|---|
| Completed jobs | Paid, completed jobs. A walking plan counts as 1 per month (T1) | 37 · 116 · 356 (09 stretch: 60 bookings at M3, 150 at M6) | Jobs tab, status "done" |
| GMV | Everything customers paid for completed jobs | ₹43,858 · ₹1.4 lakh · ₹4.3 lakh | Jobs tab |
| Platform revenue | Commission, Groom Club, Pro plans and supplies margin, before GST | ₹6,771 · ₹27,022 · ₹83,957 | Commission ledger |
| Effective take rate | Platform revenue ÷ GMV | 15.0% · 19.0% · 20.0% (schedule: 15%, then 20%, then 22%, capped at ₹350 per job) | Calculated |
| Contribution | Platform revenue minus the costs that grow with jobs: discounts we fund, groomer top-ups, local marketing, payment fees and the levy. Excludes the founder draw and one-time set-up | −₹16,109 · −₹13,908 · ₹8,850; positive from Oct 2027 (month 11) (bootstrap lines: Aug 2027 (month 9)) | Monthly P&L tab |
| Cash balance | Bank balance on the last day of the month; runway = balance ÷ average burn over the last 3 months | Bootstrap (default): peak need ₹2.7 lakh around Feb 2028 (month 15), excluding your living costs. Recommended: ₹18.2 lakh around Sep 2028 (month 22) | Bank statement |
| Cumulative GMV and revenue | Running totals since the pilot | See the milestone checkpoints below | Jobs tab + commission ledger |
| New customers by channel | First completed job, split by "heard from" | 23 · 61 · 141 new in that month (all channels) | Jobs tab |
| CAC by channel | Cost to acquire a customer: channel spend plus discounts ÷ new customers from that channel | Targets: GBP ₹50, RWA ₹200, vet/pet shop ₹150, influencer ₹250, Meta ₹600 | Spend tab + jobs tab |
| Repeat-customer % | T5: this month's jobs from phone numbers with an earlier completed job ÷ all this month's jobs | 28% · 39% · 52%; first above 40% in Jun 2027 (month 7) | Jobs tab, phone match |
| Groom Club members | Paid members active at month end | If the fee is approved: 3 · 12 · 82 | Members tab |
| Active groomers | At least 1 completed job this month | 2 · 3 · 7 | Jobs tab |
| Average groomer net earnings | The provider's share minus supplies and fuel, per full-time groomer | Target ≥ ₹25,000/month [R1-08]; base case ₹13,300 · ₹26,100 · ₹33,400 | Commission ledger |
| Provider churn | Providers who were active last month and did no jobs this month ÷ all active last month | Call every leaver | Jobs tab |
| Commission paid on time | Weekly invoices paid within 7 days ÷ invoices issued | All of them; bookings pause after 7 days | Commission ledger |
| Leakage signals | Customers with 2+ jobs and no booking for 8+ weeks while their groomer is still active (grooms fall due every 4–8 weeks [R4-13]); customer reports of offers to book off the platform [R1-31] | Look into every case | Jobs tab |
| Google rating and reviews | From the GBP dashboard | 09 stretch targets: 25 by the third month, 60 by the sixth, ≥4.8★; T2 needs ≥4.7★ and ≥100 | GBP |
| Complaint resolution | Acknowledge within 48 hours, resolve within 1 month [R3-21] (lawyer must confirm) | Every complaint | Complaints tab |

Groomers earn below target at first, while 2 of them share a small number of jobs. That gap is why the recommended budget tops up 2 core groomers.

On the bootstrap lines Meta ads start later, so the model's jobs are 93 in May 2027 and 323 in Nov 2027. If you postpone the Meta test, compare jobs against these. The bootstrap cash figure also assumes insurance only from month 7; buying it from launch, as this plan says, adds the earlier months' premium.

**Expansion gate.** From the sixth month after launch (May 2027), add one line to every report: `Expansion gate: T1 · T2 · T3 · T4 · T5`, each marked red or green, as defined in `11-EXPANSION-PLAYBOOK.md` §1. A new city opens only after all five have been green for 2 months in a row. In the base case, Ludhiana first reaches 600 jobs a month in Mar 2028 (month 16) (Apr 2028 (month 17) on the bootstrap lines).

### Milestone checkpoints on the way to ₹1 crore
Add both running totals to the log every month. At each checkpoint, compare them with this table.

| Checkpoint | Base: total GMV | Base: total revenue | Bootstrap: total GMV | Bootstrap: total revenue |
|---|---|---|---|---|
| M12 · Nov 2027 | ₹21.5 lakh | ₹4.2 lakh | ₹19.1 lakh | ₹3.7 lakh |
| M18 · May 2028 | ₹64.7 lakh | ₹13.4 lakh | ₹59.1 lakh | ₹12.2 lakh |
| M24 · Nov 2028 | ₹1.50 crore | ₹31.5 lakh | ₹1.40 crore | ₹29.3 lakh |
| M36 · Nov 2029 | ₹4.14 crore | ₹87.5 lakh | ₹3.91 crore | ₹82.5 lakh |
| M48 · Nov 2030 | ₹7.86 crore | ₹1.68 crore | ₹7.57 crore | ₹1.62 crore |

- **₹1 Cr GMV:** Aug 2028 (month 21) in the base case, Sep 2028 (month 22) on the bootstrap lines.
- **₹1 Cr platform revenue:** Feb 2030 (month 39) in the base case, Mar 2030 (month 40) on the bootstrap lines. GMV runs at about 4.7× platform revenue, so this milestone takes much longer.
- **Ludhiana alone** reaches ₹1 Cr GMV (Aug 2028) but not ₹1 Cr revenue (beyond 60 months). The second milestone needs the Punjab cities, opened only through the T1–T5 gate.
- **The floor to watch:** the conservative case has ₹9.6 lakh total GMV at M12 and ₹58.5 lakh at M24. Below that, use the slow-down rules.

### Slow-down and stop rules
Check these in step 2 of the monthly ritual. They are triggers for a decision, not automatic verdicts.

| Signal | For how long | What you do |
|---|---|---|
| Completed jobs or repeat % behind the base case | 2 months in a row | Stay on the bootstrap lines and postpone every upgrade (Meta test, salaried city lead, custom app); work through "If it's going slower" in the 90-day plan |
| Completed jobs below the conservative case: 20 · 56 · 142 in Feb 2027 · May 2027 · Nov 2027 | 2 months in a row | Re-plan cash on the conservative case: contribution turns positive only in Feb 2028 (month 15), and ₹1 Cr GMV moves to May 2029. No new hires and no paid ads until jobs are back above it for 2 months |
| Meta cost per new customer above ₹600 | At the end of the CAC test | Switch ads off and move the money to RWA camps and clinic partners |
| Monthly contribution still negative in Feb 2028 (month 15) | Once | This is later than even the conservative case: stop all spend except the essentials and decide with your CA whether to change the model or stop |
| The CA says s.9(5) applies to grooming [R3-04] | Before launch | Do not launch on today's pricing: in the model, peak cash need becomes ₹96.3 lakh and EBITDA (operating profit) never turns positive in the model: beyond 60 months |

### The monthly ritual (first working day, 60 minutes)
1. **Fill in the log (20 min):** copy this month's numbers from the jobs tab, the commission ledger, the bank, GA4 and GBP.
2. **Compare (20 min):** put this month next to last month, the base case and the conservative case. Mark any row that has been behind the base case for 2 months in a row, and apply the slow-down rules.
3. **Decide (20 min):** write no more than 3 actions, each with an owner, a date and the file or sheet it changes. Tick off last month's 3 first, then check the next 2 months of the compliance calendar (Legal, tax and compliance §10).

---

## Roadmap to ₹1 crore

There are two finish lines. **₹1 Cr GMV** is everything customers pay for services booked through PetDoorStep. **₹1 Cr platform revenue** is PetDoorStep's own share, ex-GST. Dates are the base case on the recommended budget: planning dates, not promises. On the bootstrap lines this plan recommends starting on, ₹1 Cr GMV comes about a month later, in Sep 2028 (month 22); the Milestones table shows both.

### Phase 0: pre-launch and pilot (Nov 2026)

- **Clear the launch gate** (`website-plan/00-MASTER-PLAN.md` §9): `[FILL:*]` done, CA and lawyer sign-off, GBP verified.
- **Sign and police-verify the 2 launch groomers and the partner vet.**
- **Buy liability insurance** (CGL with care-custody-control cover) before the first pilot groom, on either budget.
- **Run pilot grooms in the pre-Diwali rush** (Diwali is 8 Nov) for 5+ genuine reviews, with no ads. Details are in The next 30 days.

### Phase 1: launch and fit (months 1–6, Dec 2026–May 2027)

The goal is proof that people rebook. Commission starts at the partner launch rate of 15% for a city's first 3 months, then 20% from month 4. The provider Pro plan starts in month 6. **Paid ads start with a 2–3 week Meta test in Mar 2027**; scale only if CAC (cost per new customer) is at or below ₹600, otherwise wait until Jun 2027.

| Metric | Month 1 | Month 3 | Month 6 |
|---|---|---|---|
| Stretch target: bookings (09 §8.2) | 15 | 60 | 150 |
| Target: reviews, cumulative (09 §8.2) | 6 | 25 | 60 |
| Target: sessions (09 §8.2) | 300 | 1,200 | 3,000 |
| Cash-planning base case: jobs | 21 | 37 | 116 |
| Bootstrap tier: jobs | 21 | 37 | 93 |

The 15 / 60 / 150 bookings are stretch targets. Plan cash on the base case. The bootstrap tier is slower by month 6 because it spends less on marketing and runs no ads yet.

By May 2027 the base case has 3 groomers, a 39% repeat share, monthly GMV of ₹1.4 lakh, platform revenue of ₹27,022 and EBITDA (the monthly operating result) of −₹37,408. Launch falls in the model's winter dip, so judge December and January against the plan.

### Phase 2: Ludhiana density (months 7–18, to May 2028)

The goal is a Ludhiana that runs without you on every job. Base-case dates:

- **Repeat share passes 40% (T5):** Jun 2027 (month 7)
- **Contribution positive:** Oct 2027 (month 11). From here each month's revenue covers marketing, promos and other direct costs.
- **First ops hire,** at 250 jobs a month: Oct 2027 (month 11). Train this person as the T4 ops lead.
- **Commission rises to 22%** from month 13
- **10 groomers:** Mar 2028 (month 16)
- **Ludhiana passes 600 jobs a month (T1):** Mar 2028 (month 16)
- **First EBITDA-positive month:** Apr 2028 (month 17). It dips again when Tricity opens (see Year by year).
- **Second ops hire:** May 2028 (month 18)

### Phase 3: Tricity clone, opening Jul 2028 (month 20)

Tricity opens only after all five triggers hold for 2 months in a row. The clone then takes 10–12 weeks (`website-plan/11-EXPANSION-PLAYBOOK.md` §3). On the bootstrap lines it opens Aug 2028 (month 21).

- **Hire a salaried city lead (₹30,000/month salary)**, even on the bootstrap path, and give them a month's overlap in Ludhiana.
- **Budget the setup:** ₹1.1 lakh standard or ₹20,000 low-cost (line items in Investment), plus about 3 months of the city's losses.
- **Expect a dip:** in the base case, Tricity's launch months push total EBITDA below zero for about three months.

Around the same time:

- **App build:** Aug 2028 (month 21)
- **₹1 Cr GMV:** Aug 2028 (month 21)
- **Peak cash need (₹18.2 lakh):** Sep 2028 (month 22)
- **GST registration:** Dec 2028 (month 25), once PetDoorStep's own turnover passes ₹20 lakh in a year [R3-01] (CA must confirm)

The model assumes reviews (T2) and the ops lead (T4) keep pace with volume. If they lag, every later date slips.

### Phase 4: Jalandhar and Amritsar

Jalandhar opens Aug 2029 (month 33) and Amritsar Oct 2030 (month 47). Each city waits until the one before it has positive contribution. Under the order-swap rule, Jalandhar can go before Tricity. The base case doesn't open Patiala within 5 years; the fast case opens it Jan 2031 (month 50). ₹1 Cr platform revenue arrives Feb 2030 (month 39), and payback comes May 2030 (month 42).

### Milestones

| Milestone | Base case | Bootstrap tier | Range (fast – slow) | Depends on |
|---|---|---|---|---|
| Contribution positive | Oct 2027 (month 11) | Aug 2027 (month 9) | Aug 2027 (month 9) – Feb 2028 (month 15) | Repeat bookings, cheap acquisition |
| First EBITDA-positive month | Apr 2028 (month 17) | Mar 2028 (month 16) | Jun 2028 (month 19) (see note) – Apr 2029 (month 29) | Ludhiana volume |
| Tricity opens | Jul 2028 (month 20) | Aug 2028 (month 21) | Mar 2028 (month 16) – Jul 2029 (month 32) | All five triggers |
| ₹1 Cr GMV | Aug 2028 (month 21) | Sep 2028 (month 22) | Apr 2028 – May 2029 | Ludhiana density |
| Peak cash need | ₹18.2 lakh | ₹2.7 lakh | ₹16.8 lakh – ₹28.4 lakh | Tier; Tricity and app timing |
| ₹1 Cr platform revenue | Feb 2030 (month 39) | Mar 2030 (month 40) | Apr 2029 – beyond 60 months | Punjab expansion |
| Payback (all cash back) | May 2030 (month 42) | Jan 2029 (month 26) | Apr 2029 (month 29) – not within 60 months | Tier; city losses |

Note: the ranges don't always run in order. The fast case turns EBITDA-positive later than the base case because it opens Tricity sooner. The bootstrap peak excludes your living costs in year 1.

### Cumulative checkpoints (base case)

| By | Total GMV so far | Total revenue so far | Monthly contribution | Groom Club members |
|---|---|---|---|---|
| May 2027 (month 6) | ₹4.3 lakh | ₹78,591 | −₹13,908 | 12 |
| Nov 2027 (month 12) | ₹21.5 lakh | ₹4.2 lakh | ₹8,850 | 82 |
| May 2028 (month 18) | ₹64.7 lakh | ₹13.4 lakh | ₹1.0 lakh | 241 |
| Nov 2028 (month 24) | ₹1.50 crore | ₹31.5 lakh | ₹1.7 lakh | 446 |
| Nov 2029 (month 36) | ₹4.14 crore | ₹87.5 lakh | ₹3.4 lakh | 842 |
| Nov 2030 (month 48) | ₹7.86 crore | ₹1.68 crore | ₹4.4 lakh | 1,081 |

Use these as checkpoints: if total GMV at month 12 or 18 is well short, the ₹1 Cr dates slip with it (see the slow-down rules in KPIs). Contribution is revenue minus marketing, promos and other direct costs, before fixed costs. Groom Club members pay ₹499/year.

**Ludhiana alone won't deliver the second crore.** With no expansion, Ludhiana reaches ₹1 Cr GMV by Aug 2028, but not ₹1 Cr platform revenue (model result: beyond 60 months). The demand researcher estimates the core paying pool at only about 1,700–4,700 households, working from 45,880 car-owning households [R4-04] and a reported 23.7% of owners using groomers [R4-12]. The second milestone depends on Punjab expansion.

### Year by year

| Year | GMV (base) | Platform revenue (base) | EBITDA (base) | EBITDA (bootstrap) |
|---|---|---|---|---|
| 1 (to Nov 2027) | ₹21.3 lakh | ₹4.1 lakh | −₹5.0 lakh | −₹1.5 lakh |
| 2 (to Nov 2028) | ₹1.29 crore | ₹27.3 lakh | −₹2.2 lakh | ₹2.4 lakh |
| 3 (to Nov 2029) | ₹2.64 crore | ₹56.0 lakh | ₹10.1 lakh | ₹15.3 lakh |

Year 2 EBITDA (−₹2.2 lakh) is negative although monthly EBITDA turns positive in Apr 2028 (month 17). The early months of year 2 are still loss-making, partly because the founder draw steps up in month 13. Then Tricity's launch costs push EBITDA below zero again for about three months after it opens in Jul 2028 (month 20). On the bootstrap lines the model shows year 2 positive, mainly because the founder draw, marketing and the city setup cost less. The salaried Tricity lead recommended above would trim that.

This plan supersedes the projections in the older strategy report (`pet-care-ludhiana-strategy/pet-care-ludhiana-strategy.html`, under the old name PawMitra). That report assumed a hybrid own-staff model and an average ticket below today's price list (₹1,123).

---

## Risks and how to handle them

The first two risks are tax and legal, and they are the only ones that could break the business rather than slow it down.

| Risk | What could happen | How we reduce it | Early-warning sign |
|---|---|---|---|
| **GST s.9(5)** | Grooming is treated as "housekeeping", so PetDoorStep pays GST on the whole grooming bill [R3-04], reportedly at 18% [R3-07] (CA must confirm). Peak cash would be ₹96.3 lakh, and EBITDA would not turn positive within 5 years (model: beyond 60 months). | **Get a written CA opinion before launch.** Keep the provider as the legal supplier. | The CA calls it "arguable"; any ruling on app-booked home services |
| **Treated as the supplier** | Fixed prices, our brand and our guarantee put GST and income tax on full GMV [R3-08] (CA and lawyer must confirm). | **Name the provider on every bill, invoice commission separately and let providers decline jobs** (see Fix before launch). | Copy or bills in PetDoorStep's name |
| **Customers go direct** | In one study, adding a commission doubled off-platform deals, and pricier jobs leaked most [R1-33]. Another found at most 1 in 83 relationships leaked [R1-32]. | **Cap commission at ₹350; keep perks on-platform; warn, then block** [R1-31]. | A regular stops booking while their groomer stays busy |
| **Provider churn** | Rivals reportedly assure ₹20,000–25,000 a month [R1-10], so thin weeks push groomers to leave. | **Sell take-home pay** (model: ₹33,400 by month 12). Offer the launch top-up (₹12,000/month for 2 groomers × 3 months) only if 2 good groomers won't sign without it. No deposits [R1-07]. | Groomers declining jobs |
| **Pet injury** | A cut, burn or escape goes viral or becomes a claim. PMSBY covers only the provider [R3-29]. | **Buy CGL with care-custody-control cover before launch,** budgeted at ₹30,000/year (estimate — get 2–3 quotes); SOPs, 2 photos a visit, a vet incident plan, liability terms (lawyer must confirm). | Any 1–3★ review |
| **Price war** | Urban Company already works in Ludhiana and Chandigarh, with no pet category yet [R1-12]; HUFT spas give ₹500 off a first spa [R1-28]; Vetic sells ₹199–299 home vet visits outside Punjab [R1-16]; Delhi budget groomers charge about ₹999 [R1-25]. In the Prices −15% (price war) case, ₹1 Cr revenue slips to Apr 2030 and peak cash rises to ₹22.0 lakh. | **Compete on trust and the same groomer, not price.** Use ₹599 Bath & Brush as the entry; Groom Club keeps regulars. | Customers asking for a price match |
| **Thin market** | Ludhiana alone doesn't reach ₹1 Cr revenue in the model (result: beyond 60 months). Hard data is scarce: only 3,321 dogs were registered with the MC in 5 years [R4-05]. | **Grow repeat, walking and vet visits; build the waitlist** for other cities. | New customers flat for 3 months |
| **Expansion drag** | In the base case Tricity opens in Jul 2028 (month 20), and its launch months push total EBITDA below zero again for about three months. | **Open only through T1–T5; fund 3 months of city losses before opening; hire a salaried Tricity lead; one city at a time.** | Ludhiana contribution falls while the clone runs |
| **Seasonality** | The model's winter dip hits at launch. Q4 ad prices reportedly run 25–50% higher [R4-21]. | **Pilot before Diwali; no paid ads before the Mar 2027 test.** | Winter bookings stay below plan into spring |
| **Vet regulation** | The High Court is pressing s.30 enforcement [R2-14]; only registered vets may practise [R2-12]. | **Use only Punjab-registered vets.** Vets sell medicines at MRP themselves [R3-27] (lawyer must confirm). | A vet can't show registration |
| **Aggregator levy** | 1–2% of turnover, once notified [R2-31, R3-23] (CA must confirm). | **Modelled at 1% of revenue; if charged on GMV, peak cash rises to ₹19.1 lakh.** Register providers within 45 days [R2-31]. | The government notifies the rate |
| **Walks and strays** | The district had 28,390 dog bites in 2024 [R4-06]; a walker or client dog is attacked. | **Daylight walks on owner-approved routes, leash only;** liability terms (lawyer must confirm). | Walker near-miss reports |
| **Customer data** | Shared addresses are misused. DPDP duties reportedly start around May 2027, with penalties up to ₹250 crore [R3-22] (lawyer must confirm). | **Share only what the job needs;** fill in the retention rules. | A provider contacts a customer outside a job |
| **Unpaid commission** | A provider stops paying the weekly commission. | **Pause bookings after 7 days unpaid;** reconcile weekly. No deposits or prepaid wallets: the weekly invoice and the 7-day rule only. | Jobs marked done with no payment record |
| **Founder burnout** | Everything runs through you until the first ops hire, in Oct 2027 (month 11). | **Take one full day off a week; write SOPs;** give a second person backup access to WhatsApp and the sheet. If savings run short before month 13, switch to the recommended draw (₹15,000/month from month 1, ₹30,000/month from month 13, ₹50,000/month from month 25). | 4 weeks without a day off |

If the monthly numbers fall behind plan, apply the slow-down and stop rules in KPIs.

### Sensitivity

In the base case, ₹1 Cr platform revenue arrives Feb 2030 and peak cash is ₹18.2 lakh.

- **Take rate −5 pp** (lower commission): revenue milestone Jun 2030, peak cash ₹25.4 lakh. Outside s.9(5), this is the biggest cash hit.
- **Growth −30%:** ₹1 Cr GMV Mar 2029, revenue Jan 2031, peak cash ₹20.8 lakh. This is the longest delay.
- **Repeat rate −25%:** revenue May 2030, peak cash ₹21.8 lakh.

Each of these costs months and extra cash. Take rate −5 pp (₹25.4 lakh) needs more than the ₹24.0 lakh the recommended tier lines up, so hold the commission line. The s.9(5) case (₹96.3 lakh) would break the plan, which is why the CA opinion comes first.

---

## Decisions only you can make

Each row gives our default and a deadline. Log every choice in `00-MASTER-PLAN.md` §11 (Decision log).

| # | Decision | Our default | Decide by |
|---|---|---|---|
| 1 | "No gig marketplace" line (`people.ts:80`) | Option A in Fix before launch ("No strangers at your door…") | 17 Oct 2026 |
| 2 | Groom Club fee | ₹499/year for 15% off + priority; the nail visit becomes member-priced. FIRSTGROOM's free nail visit stays | 17 Oct 2026 |
| 3 | Travel charge | Keep "no travel charge anywhere within Ludhiana city". Beyond the city and its listed localities only: a flat surcharge, published on /pricing/ and paid 100% to the provider, or decline the job | 17 Oct 2026 |
| 4 | Commission schedule (goes into the provider agreement) | 15% for a city's first 3 months, 20% from its month 4, 22% from its month 13, capped at ₹350 a job; walking 12% | 18 Oct 2026 |
| 5 | Large Full Groom price | Keep ₹1,899 and show what it adds over ThePetNest's ₹1,599 tier [R1-19] (e.g. extra time for a large coat, the sealed kit and photo updates). Or set ₹1,599–1,699 (R1 recommendation). Keep de-shed/de-mat as the Premium Spa difference | 25 Oct 2026 |
| 6 | Vet partner terms | Registered vets only. We keep ₹150 a visit, ₹50 a vaccination visit and 20% of deworming; the vet sells medicines at MRP [R3-27]; no retainer (lawyer must confirm) | 25 Oct 2026 |
| 7 | Launch top-up for groomers | None: recruit salon groomers part-time. If 2 good groomers haven't signed by then, offer ₹12,000/month for 2 groomers × 3 months | 25 Oct 2026 |
| 8 | Budget tier | Bootstrap lines; upgrade a line only at its milestone; CGL insurance from launch either way | 12 Oct 2026 |
| 9 | Founder draw | Nothing in year 1, then ₹20,000/month from month 13, ₹40,000/month from month 25, if savings cover a year of living costs. If not: the recommended draw and a bigger raise | 31 Oct 2026 |
| 10 | Entity | LLP now [R3-15, R3-18]; convert to Pvt Ltd only before equity. Ask the CA whether converting keeps or resets the incorporation date for the Seed Fund's under-2-years rule [R5-30] and for DPIIT (CA must confirm) | 31 Oct 2026 |
| 11 | First incubator | GADVASU VLIIF, up to ₹10 lakh [R5-34]. Meet the team at the December Dog Show [R4-38] | Apply by 31 Jan 2027 |
| 12 | Paid ads | A 2–3 week Meta Click-to-WhatsApp test in Mar 2027. Scale only if CAC (cost per new customer) is at or below ₹600; otherwise wait until Jun 2027 | 1 Feb 2027 KPI review |
| 13 | Payment phase 2 | Direct UPI/cash plus the weekly invoice until own turnover passes ₹40 lakh [R5-04] or leakage is clearly high. Then a licensed split product (about 2.65%), timed to Razorpay's 0% new-merchant offer [R5-03] | Review quarterly; decide by Dec 2028 (month 25) |
| 14 | Expansion go/no-go | Only when T1–T5 are all green 2 months running. Tricity first, unless Jalandhar qualifies under the order-swap rule | Go meeting about 12 weeks before opening; base case opens Jul 2028 (month 20) |

---

## Appendix A — Assumptions and where they come from

The model's inputs live in `model/assumptions.json`. Change a number, then run `node model.mjs --check && node tokens.mjs && node build-report.mjs` and this document regenerates with the new dates.

| Assumption | Source / reasoning |
|---|---|
| `demand.ludhianaTAM` | R4-02,R4-03,R4-04,R4-08,R4-12 + R4 rec: ~60-80k car-owning households x 15-25% with a dog x share willing to try paid home grooming → 5,000 lifetime trial customers (base); conservative 0.7x, aggressive 1.3x |
| `demand.bassP/bassQ` | Calibrated to the R4 market size with a cautious ramp: base M1/M3/M6 jobs come out at ~21/37/116, i.e. below website-plan/09 §8.2's 15/60/150 at M3/M6 — keep 09's numbers as stretch targets and plan cash on the model |
| `demand.repeatRate` | R4-15 (30-40% first-timer second booking), R4-16 (UC 77% NTV from repeat), R4 rec 35-45% yr-1 |
| `demand.repeatFrequency` | R4-13 (groom every 4-8 weeks; 3-6/yr typical) → 0.45/month for regulars |
| `offers.memberFrequency` | Groom Club = 1 Full Groom/month (website/src/data/pricing.json groomClub) with some skips → 0.9 |
| `demand.cac` | R4-20..23 (Meta CPL ₹100-250, 25-40% lead→booking, +18% GST if unregistered → ~₹600 paid CAC), R4-33..36 (print), R4-30/31 (nano barter) |
| `demand.referralShareOfNew` | R4-18, R4-19, R4 rec (referrals 10-20% of new by M6) |
| `seasonality` | Assumption: Punjab grooming peaks pre-summer/summer (Apr-Jun), dips in Dec-Jan cold; tick season Jul-Sep (website-plan/10 content calendar) |
| `take.groomByAge` | R1-04 (UC beauty 8.5-25%, avg 20-22%), R2-05 (UC ~28%, protests above 30%), R1 rec 15-20% at launch → 20-25% |
| `take.groomCap` | R1-05 (UC capped slab ₹399), R1-33 (commission doubles leakage, more on high tickets) |
| `take.walk` | R1-26/27, R2-07/08, R2 rec (walkers need ~₹85-90/walk → 10-15% take) |
| `mix.health flat fees` | R2 rec (vet keeps ₹500-550 of ₹699), R3-27 (vet sells MRP items, platform takes no drug margin) |
| `offers.groomClubFeeYear` | R1-11 (UC Plus ₹249-399/6-12 mo), R1-29 (Zigly ₹499/yr) → ₹499/yr |
| `offers.proFee` | R1 rec (optional ₹299-499/mo Pro, no deposits tied to targets), R1-07 |
| `offers.supplies` | R1-09 (UC tools/consumables ~16% of revenue), R2-19/20 (consumables ₹50-170/groom) |
| `supply.groomerJobsPerDay` | R2-06 (UC partners ~91 platform hours/month), R2 rec (2 grooms/day realistic) → 3/day max at 60% utilisation |
| `supply.consumablesPerJob` | R2-19, R2-20 |
| `supply.travelPerJob` | R2-28, R2-29 (₹17-40 fuel per 10-16 km round trip; ₹30-95 all-in) |
| `supply.minGroomerNet` | R1-08/R2-06 (UC avg net ₹28,322/month), R2-01/02 (salaried ₹17-35k) |
| `supply.launchGuarantee` | Recommended tier only; R1-10 warns full guarantees need VC money → small 3-month top-up for 2 core groomers |
| `payments` | R5-01..07, R5 rec: direct UPI/cash to provider (0% MDR ≤₹2,000 and small merchants), weekly commission settlement; gateway split only after ₹40 L turnover (Route gate R5-04) at ~2.65% |
| `tax.gstThreshold` | R3-01, R5-12 (₹20 L services; Punjab normal-category) |
| `tax.aggregatorLevyPct` | R2-31, R3-23 (Code on Social Security 1-2% of turnover, cap 5% of payouts; contingent) |
| `tax.gst95 (sensitivity)` | R3-04 (s.9(5) 'housekeeping' risk) |
| `costs.opsSalary` | R2-30 (Punjab skilled minimum wage ₹15,414 from 1 May 2026) → ₹20k coordinator |
| `costs.insuranceAnnual` | UNSOURCED - R3 could not price CGL/care-custody cover; get 2-3 quotes |
| `costs.accounting` | UNSOURCED estimate - CA retainer for books, TDS 194-O/26Q, GST returns after registration |
| `tiers.*.tools` | R5-13 (Workspace ₹270+GST/seat), R4-27 (AiSensy ₹1,350-1,500+GST), R4-24/25 (WA messages), R5-14/15 (AppSheet/Glide) |
| `tiers.*.appCost` | R5-22/23 (freelance Flutter MVP ₹6.5-9.5 L; agency ₹6-55 L); bootstrap = no-code upgrade |
| `tiers.recommended.cityLead` | website-plan/11 §2-3; bootstrap = revenue share (assumption) |
| `expansion.cities.sizeFactor` | Assumption vs Ludhiana: Tricity larger/more affluent with the densest competitor field (website-plan/11 §2, R1-20..24), Jalandhar/Amritsar/Patiala smaller |
| `expansion.gate` | website-plan/11 §1 T1 (≥600 jobs/month ×2), T3, T5 (≥40% repeat), month-12+ |
| `investment` | See each line's src; unsourced lines are estimates to replace with quotes |
| `funding` | R5-25..38 |

### Investment line items: trade-offs and sources

| Item | Trade-off of the low-cost option | Source |
|---|---|---|
| Business entity | A proprietorship cannot get DPIIT recognition, so it cannot use the incubator grants; incorporate before applying (and keep the company under 2 years old for the Seed Fund) | R3-15,R3-16,R3-18,R5-30,R5-34,R5-39 (professional fees: get 2 quotes) |
| Trademark 'PetDoorStep' (Class 44) | DIY risks a weak clearance search; do a free public search first | R3-19 |
| CA structuring consult (GST s.9(5), TCS, TDS 194-O, entity) | Cheapest high-impact spend in the plan - do not skip it | R3 needs_CA_or_lawyer |
| Lawyer review: T&Cs, privacy, provider agreement | Provider agreement (independent contractor, non-solicit) must be right before scale | R3-08,R3-21,R3-22, R1 CA list |
| Domain (.in) | None | R5-18 |
| Dedicated business phone + WhatsApp Business | None at launch volumes | R4-29,R5-10 |
| Brand polish (logo files, social templates) | Slightly less polished social posts | website-plan/08-DESIGN-SYSTEM |
| Photo shoot (real groomers, pets, Ludhiana homes) | Fewer hero-quality shots | website-plan/08 §5.2 |
| Background verification (6 launch providers) | Saanjh takes up to 30 days - start now | R2-23,R2-24,R2-25 |
| Uniform + ID card (6 providers) | None | R2-27 |
| Training & standards (3 groomers) | Skip ₹49-65k academy courses either way | R2-26, R2 rec |
| Sealed-kit consumables starter stock | Working capital, recovered through supplies sales | R1-09,R2-19,R2-20 |
| Loaner groomer kit | Smaller recruiting pool | R2-21 |
| Vet cold-chain carrier | None | R2-22 |
| Provider accident cover (PMSBY) | Accident cover only, not pet-injury liability | R3-29 |
| Pilot grooms for first reviews (12 jobs at 50% off) | Fewer seed reviews at launch | website-plan/09 §8.2, 05 §3 |
| Launch print kit (flyers, standees, QR stickers) | Less reach in societies | R4-33,R4-34,R4-35 |
| Launch stalls (GADVASU Dog Show, Dec 2026 + RWA camps) | Slower first-month bookings | R4-36,R4-38 |
| City lead hiring + 1 month overlap/training | Harder to find a strong lead on revenue share | website-plan/11 §2-3 |
| Provider onboarding (4 providers) | As Ludhiana | R2-23,R2-27 |
| Operating base for GBP verification (3 months) | GBP must still verify at a real address | website-plan/11 §2, 05 §1 |
| Founder travel & stay during clone | More founder time | website-plan/11 §3 |
| Launch print + events | Slower ramp | website-plan/11 §6 |
| City photo shoot | Fewer quality photos | website-plan/08 |
| Registration/legal per city | Check Punjab S&E Act applicability | R3 open question |

---

## Appendix B — Research sources

174 facts were gathered on 10 Oct 2026 by five research passes (marketplace economics, supply, legal/tax, demand/marketing, payments/funding). The 124 cited in this plan are listed below. Confidence: **H** = official/primary and current; **M** = reputable secondary or slightly dated; **L** = indicative only. The legal/tax pass ran without web access, so its facts reflect established law and **must be confirmed by a CA or lawyer**. Every web source was read from search results rather than the full page. Re-verify any figure before you rely on it.

| Id | Claim | Source | Date | Conf. |
|---|---|---|---|---|
| R1-05 | Under Urban Company's 'SLA' commission structure for appliance partners, each job costs a fixed lead credit of Rs 120 (12 credits). A post-job commission is then debited by job value: Rs 0 for jobs up to Rs 250, Rs 30 for Rs 251-500, Rs 65-130 for Rs 501-1,000, Rs 150-225 for Rs 1,001-1,500, Rs 240-320 for Rs 1,501-2,000, Rs 340-399 for Rs 2,001-2,350, and a flat Rs 399 above Rs 2,350. The earlier subscription plan was removed and 'no initial investment' is required. | [Urban Company partner support helpsite (PX Appliances)](https://pxappliances.helpsite.com/articles/135524-new-commission-structure-sla) | undated | M |
| R1-07 | In Dec 2021 Urban Company introduced a 'minimum guarantee plan'. Beauty partners paid Rs 3,000 (Salon Prime) or Rs 2,000 (Salon Classic) upfront for guaranteed leads, against a target of at least 40 jobs a month. Partners protested, and Urban Company sued four of the protesters. | [The Wire; The Quint; Inc42](https://thewire.in/rights/urban-company-sues-workers-for-protesting-against-unfair-labour-practices-protest-called-off) | 2021-12 | M |
| R1-08 | In 9M FY26, Urban Company's active service partners averaged Rs 28,322 a month in net earnings in hand, up from Rs 26,489 a year earlier. The top 20% averaged Rs 42,418, the top 10% Rs 47,471 and the top 5% Rs 51,673. | [Urban Company Investor Relations (Earnings Index 9M FY26)](https://investorrelations.urbancompany.com/announcements-and-highlights/service-partners-earnings-index-9m-fy26) | 2026-02 | H |
| R1-09 | Urban Company earned about Rs 187-188 crore in FY25 from selling tools and consumables (beauty kits, repair tools, cleaning gear) to service professionals. That is roughly 16% of its Rs 1,144.5 crore operating revenue, up about 27% year on year. Some gig workers say they are pressured to buy through the platform. | [The Captable; Entrackr; MediaNama](https://the-captable.com/2025/06/urban-companys-rising-product-business-native-ro/) | 2025-06 | M |
| R1-10 | Urban Company's InstaHelp reportedly gives workers an assured income of about Rs 20,000-25,000 a month at Rs 150-180 an hour. Rival Pronto promises Rs 22,000-30,000, and Snabbit charges customers about Rs 169-199 an hour. InstaHelp was estimated to lose about Rs 381 per order. | [The Week](https://www.theweek.in/news/biz-tech/2026/05/04/instant-home-services-india.html) | 2026-05 | M |
| R1-11 | Urban Company Plus membership gives 15% off every service plus priority booking. Coupon sites list it at Rs 299 for 6 months or Rs 399 for 12 months, while a student teardown cites Rs 249 for 6 months. The plan is location-specific, and early cancellation is generally not refunded. | [Zoutons coupon aggregator; NextLeap teardown](https://www.zoutons.com/urban-company-coupons) | undated | L |
| R1-12 | Urban Company operates in Chandigarh (salon-at-home, e.g. a spatula waxing bundle from Rs 599 and a monthly maintenance package at Rs 1,912). It also lists Ludhiana men's grooming providers with packages of about Rs 368-1,606. No search turned up an Urban Company pet-grooming or pet-care category. | [Urban Company city pages (Ludhiana, Chandigarh)](https://www.urbancompany.com/ludhiana-mens-grooming) | undated | M |
| R1-14 | A Jan 2024 Justdial tax invoice shows a one-year package at Rs 3,000 + Rs 540 GST = Rs 3,540. It auto-renews via ECS/NACH and needs 3 months' notice to cancel. An older report (The Ken) quoted Rs 20,000/year for the cheapest package. Consumer forums show about 4,288 complaints, many about poor lead quality and continued ECS debits. | [Scribd copy of Justdial invoice; The Ken; consumercomplaints](https://www.scribd.com/document/698381992/file) | 2024-01 | L |
| R1-15 | Supertails charges Rs 499 for an at-home visit by a vet and vet assistant, or Rs 699 with a general consultation. Procedures are extra. Home anti-rabies vaccination for dogs is listed at Rs 799 (60 min). The service covers only selected Bengaluru pincodes. | [Supertails at-home vet FAQ; supertails.com/products/home-vac](https://supertails.com/pages/at-home-vet-services) | undated | M |
| R1-16 | Vetic advertises an at-home vet visit at Rs 299 including consultation and visitation (national, Delhi and Noida pages), and Rs 199 as a limited-time offer in Gurgaon and Bengaluru. Medicines, vaccines and consumables are billed separately. Vetic runs 60+ clinics in Delhi NCR, Bengaluru, Mumbai, Pune and Hyderabad, and none were found in Punjab or Chandigarh. | [Vetic vet-at-home pages](https://vetic.in/vet-at-home-near-me) | undated | M |
| R1-19 | ThePetNest, an online pet-care marketplace sending background-verified groomers to homes, lists these Ludhiana prices: dog Spa Bath Rs 899, dog Trans-fur-mation Rs 1,199, dog Full Service Rs 1,599, cat Bath + Basic Rs 899 and cat Full Service Rs 1,999. It notes that charges may vary by pet and city. | [ThePetNest Ludhiana page](https://thepetnest.com/pet-grooming/ludhiana) | undated | M |
| R1-20 | ThePetNest's Chandigarh prices are Spa Bath Rs 899, Trans-fur-mation Rs 1,299 and Full Service Rs 1,599. It also offers a Premium membership giving up to 10% off at checkout. | [ThePetNest Chandigarh page](https://thepetnest.com/pet-grooming/chandigarh) | undated | M |
| R1-22 | Mr n Mrs Pet (Wanderlust Pet Services, Jaipur) offers doorstep grooming in Chandigarh in tiers of Basic Rs 999, Plus Rs 1,499, Pro Rs 1,999 and Elite Rs 2,499. A second tier set runs Rs 1,299-2,799 (dog vs cat split unclear). Its Chandigarh dog-walking page says charges start at Rs 999 a month. | [mrnmrspet.com Chandigarh grooming and walking pages](https://www.mrnmrspet.com/dog-grooming-in-chandigarh) | undated | M |
| R1-23 | Petlogix (Chandigarh) lists Standard Rs 1,900 (from Rs 2,200), Luxury Rs 2,900 and Paw LUXE Rs 3,600. Pet Vanity runs a mobile grooming van in Chandigarh/Mohali with basic dog grooming at Rs 1,200-1,600 by size. Pet Smile Clinic (Sector 37C) advertises premium home grooming and a 'Total Care Combo' at Rs 1,600. | [Petlogix; petvanity.in; Pet Smile Google Business](https://petlogix.in/pages/services-chandigarh) | undated | L |
| R1-24 | Monika Pet Clinic and Pet Grooming (Chandigarh/Mohali/Kharar) lists Spa Bath Rs 1,000, Bath + Basic Rs 1,400, Full Grooming Rs 1,700 and Grooming with Extra Care about Rs 1,900, each about 1 hour. Vaccines are DHPPI Rs 1,200 and anti-rabies Rs 700. It also appears in Salonist's Mohali mobile-grooming category. | [Salonist listing](https://salonist.io/cs/s/MonikaPetClinicandPetGrooming) | undated | L |
| R1-25 | Budget at-home groomers in Delhi NCR price full grooming at about Rs 999. All Tails charges Rs 999 / 1,299 / 1,799 with travel included. Woofly charges Full Grooming Rs 999, Basic Rs 760 and Spa Bath Rs 399. Athomepetgrooming charges full Rs 999 and spa Rs 700. A 2026 guide puts at-home dog grooming in India at Rs 999-2,499. | [All Tails; woofly.in; athomepetgrooming.com](https://alltails.in/pet-grooming/delhi) | undated | M |
| R1-26 | Sploot's Chandigarh dog-walking subscriptions are Rs 2,400 a month for a 20-minute daily walk and Rs 3,540 a month for a 40-minute premium plan, tax included. Sploot works with freelance walkers: 35 at launch in 2022, when its subscription was Rs 3,000 a month. Its top partner walkers with more than 1.5 years' tenure net about Rs 25,000 a month. | [Sploot Chandigarh page; discoveringbrands listing; YourStory](https://sploot.space/dog-walking/chandigarh) | undated | M |
| R1-28 | Heads Up For Tails runs store-plus-spa outlets in Ludhiana (Gurdev Nagar, Sat Paul Mittal Rd; rated 4.5-4.6 on about 200 reviews), Chandigarh Sector 22B, Panchkula Sector 9, Mohali Phase 10 and Amritsar. HUFT Rewards is free and points-based (Bronze/Silver/Gold). Silver includes 1 free bath-and-blow-dry spa voucher and Gold includes 2. HUFT advertises Rs 500 off the first spa booking. | [HUFT store locator; headsupfortails.com/pages/huft-rewards](https://stores.headsupfortails.com/pet-store-in-punjab-ludhiana-gurdev-nagar-99512/home) | undated | M |
| R1-31 | Urban Company's partner FAQ defines offline booking as a partner taking requests directly from a customer by call or SMS, for example after collecting the customer's number on a first job. Customers report it in the app, and Urban Company verifies before acting. Partners get warnings via the app or WhatsApp and can be blocked until they complete training. Another version calls it 'Zero Tolerance', with removal from the platform. | [Urban Company partner support helpsite; JM Financial report ](https://onjobfhc.helpsite.com/articles/126001-disintermediation-offline-booking-outside-uc-actioning) | undated | M |
| R1-32 | A Kellogg/SSRN study of a Moscow home-cleaning app, which marked up cleaner fees by up to 40%, used high-frequency geolocation and found no evidence of cleaners returning to client homes off-platform. It estimates that no more than 1 in 83 relationships formed on the app end in disintermediation. | [Astashkina, Bray, Momot, Salikhov - SSRN / Kellogg](https://papers.ssrn.com/abstract=4244111) | 2023-11 | M |
| R1-33 | A study of an on-demand cargo-delivery platform (Lalamove) found that introducing a commission raised leakage by nearly 4 percentage points, doubling detected off-platform transactions. Leakage was more likely on higher-priced jobs, and customers typically received about half of the commission savings. Counterfactuals suggest non-fulfilment penalties plus distance-based commission discounts reduce leakage. | [Xie & Zhu, 'Platform Leakage' (PKU HSBC Business School semi](https://english.phbs.pku.edu.cn/info/3882/48882.htm) | undated | M |
| R2-04 | ThePetNest charges providers a one-time, non-refundable onboarding fee: Rs 499 for dog walkers and Rs 249 for veterinarians. Its dog-walker earnings estimator assumes about Rs 95 per completed walk. | [ThePetNest dog walker and veterinarian partner pages (https:](https://thepetnest.com/dog-walker) | undated | M |
| R2-07 | A Bengaluru guide puts standard 30-minute walks at Rs 70-100 (Rs 100-150 in premium areas) and suggests beginners start near Rs 80. Experienced walkers charge about Rs 200 per walk. Floofers lists 30-minute walks at Rs 150-300 with a 10% platform fee. ThePetNest estimates about Rs 95 per walk to the walker. | [WagnBush; MahaMoney (https://english.mahamoney.com/how-much-](https://wagnbush.com/blog/dog-walker-salary-bengaluru-earning-guide) | 2025 | L |
| R2-09 | Indeed puts the average veterinarian salary at Rs 25,749 a month in Punjab (9 salaries, Dec 2025) and Rs 32,587 nationally. Private veterinary doctor listings in Ludhiana and Mohali show Rs 20,000-65,706 a month (mostly dairy or farm roles). A Careers360 answer gives Rs 20,000-30,000 a month for private-sector freshers. | [Indeed India; Glassdoor/Indeed job aggregator listings (Fron](https://in.indeed.com/career/veterinarian/salaries/Punjab) | 2025-12 | M |
| R2-10 | PPSC advertised 300 Group-A Veterinary Officer posts (March 2024) at Rs 47,600 initial pay. Probationers get only minimum pay without allowances for 3 years, and the Tribune reports that starting pay was cut from Rs 56,100 to Rs 47,600. A PGIMER Chandigarh one-year contract Veterinary Officer post (applications to 11 Sep 2026) pays the DC rate of Rs 58,110 a month. | [AffairsCloud (PPSC 2024); Tribune (https://m.tribuneindia.co](https://affairscloud.com/jobs/ppsc-recruitment-2024-veterinary-officer-posts-300-vacancies-apply-now) | 2026-08 | M |
| R2-12 | Section 30 bars anyone other than a registered veterinary practitioner from holding a veterinary post or practising veterinary medicine in a state. A proviso lets a state government, by order, permit diploma or certificate holders (veterinary supervisors, stockmen, stock assistants) to render 'minor veterinary services' only under the supervision of a registered veterinary practitioner. Each state must notify its own list of minor services. | [India Code - IVC Act 1984; Indian Kanoon (https://future.ind](https://www.indiacode.nic.in/handle/123456789/22401) | 1984 | M |
| R2-13 | Punjab notified its minor veterinary services list on 2 Nov 2006 (Dept of Animal Husbandry) and repeated it on 17 May 2011. The list includes securing animals, drenching, injections, castration of farm ruminants and vaccination, all under a registered practitioner's supervision. | [NDDB Dairy Knowledge Portal - Punjab notification compilatio](https://www.dairyknowledge.in/dkp/sites/default/files/punjab.pdf) | 2011-05 | M |
| R2-14 | In CWP-23149-2018 (Punjab State Veterinary Officers Association), decided 29 Apr 2026, the Punjab & Haryana High Court pressed the state to implement s.30. The state said it had placed Veterinary Inspectors under Veterinary Officer supervision. The court called one VO supervising 9-10 dispensaries unworkable. The state reported 969 of 1,508 sanctioned VO posts filled. | [Punjab & Haryana High Court judgment copy (third-party hoste](https://fhwzizvulsqxfzkaqeia.supabase.co/storage/v1/object/public/judgments/section-30-ivca-statutory-compliance-requires-functional-staffing-not-mere-appointments-punjab-haryana-hc-851158.pdf) | 2026-04 | M |
| R2-15 | GADVASU's 2024-25 first counselling covered 242 B.V.Sc & A.H seats across CoVS Ludhiana, CoVS Rampura Phul and Khalsa College Amritsar. The 2-year Diploma in Veterinary Science & Animal Health Technology is offered at Veterinary Polytechnic Kaljharani (Bathinda): 82 seats in 2018, plus 80 seats at Baba Hira Das Ji College of Veterinary Pharmacy, Badal. | [GADVASU notices; Diploma prospectus 2022-23 (https://www.gad](https://gadvasu.in/notices/6549) | 2024 | M |
| R2-16 | Amazon.in prices: Codos CP-9700 (5-speed, ceramic blade) Rs 7,298; Andis AGC Super 2-Speed UltraEdge Rs 22,400-23,800 (MRP Rs 28,000); Wahl 9266-834 Multi Cut kit Rs 23,168 (MRP Rs 33,099). Andis UltraEdge replacement blades cost Rs 4,208 (size 7 skip-tooth) to Rs 5,650 (T-84). Budget cordless kits run Rs 663-1,199. | [Amazon.in listings (Andis, Codos https://www.amazon.in/PET-F](https://www.amazon.in/Andis-Professional-Ultraedge-Clipping-Power-Breeds-Burgandy/dp/B09T3BCML1) | 2026 | M |
| R2-17 | IndiaMART lists 5.2HP/3800W pet blow dryers at Rs 4,599 (New Delhi, MOQ 10) to Rs 8,000 (Kolkata). A stainless-steel single-motor blaster costs Rs 14,001 (Pune). An imported Shernbao 6.0HP DHD-2400T is Rs 30,468 on Ubuy, excluding shipping and customs. | [IndiaMART listings; Ubuy India](https://www.indiamart.com/proddetail/dog-dryer-for-pet-hair-dryer-for-dogs-5-2hp-3800w-pet-grooming-dryer-adjustable-speed-b0b68z1blf-2856727043391.html) | 2026 | M |
| R2-18 | Foldable grooming tables with arm on Amazon.in: Breeze Touch 32-inch Rs 9,999-10,459; LEIBOU stainless steel Rs 20,563; imported models Rs 30,000-53,000. Scissor sets: basic 4-piece Rs 979-999, mid Rs 1,496-1,899, pro Fenice 4-piece Rs 7,962 and Moontay chunker Rs 9,960. Foldable dog bath tubs: Rs 1,499-2,499. | [Amazon.in / Flipkart listings](https://www.amazon.in/LEIBOU-Professional-Foldable-Grooming-Stainless/dp/B092LVZ6JQ) | 2026 | M |
| R2-21 | Built from the listed prices. Basic mobile kit: Codos CP-9700 Rs 7,298, 3800W dryer Rs 4,599, scissor set Rs 999, foldable tub Rs 1,499, 5L shampoo Rs 1,299, plus about Rs 2,000-3,000 of brushes, nail clipper, towels and ear cleaner, for about Rs 18,000-19,000; add Rs 10,000 for a Breeze Touch table. Pro kit: Andis AGC2 Rs 22,400-23,800, two extra blades Rs 8,400-11,300, blaster Rs 14,001, LEIBOU table Rs 20,563, pro shears Rs 7,962-9,960, tub Rs 2,300, Hydra 5L Rs 6,063, misc Rs 3,000-5,000, for about Rs 85,000-93,000 (about Rs 1.1 lakh with an imported dryer). | [Derived from R2-16 to R2-19 listings](https://www.amazon.in/gp/bestsellers/pet-supplies/27373332031) | 2026-10 | L |
| R2-22 | A 1.7 L vaccine carrier with 4 ice packs costs Rs 1,599-1,999 on Amazon.in (Macpole, FAIRBIZPS, Mowell) and Rs 900-1,175 per piece wholesale on IndiaMART. | [Amazon.in; IndiaMART (https://www.indiamart.com/proddetail/e](https://www.amazon.in/Vaccine-Carrier-Liter-macpole-Supplies/dp/B0B18K94JX) | 2026 | M |
| R2-23 | Punjab Saanjh service forms list facilitation charges of Rs 200 for Private Employee Verification (30-day stipulated time in Barnala), Rs 200 for domestic helper verification (5 days) and Rs 100 for character verification. An older Mohali (SAS Nagar) right-to-service table showed Rs 50 for tenant/servant verification. | [Punjab Govt Saanjh forms; Barnala Police (https://barnala.pu](https://punjab.gov.in/wp-content/uploads/2020/10/Police-Clearance-certificate-For-Private-Employee-Verification.pdf) | 2022-03 | M |
| R2-24 | SpringVerify packages run Rs 799-1,599 per candidate (2026 review). JantaKhoj charges Rs 375-500 for address verification and Rs 950 for criminal verification per check. Court and criminal record checks run about Rs 500-1,500 per jurisdiction with 7-14 day turnaround. Digital ID checks cost Rs 6-200. 18% GST applies. OnGrid launched Veriffy, a consumer BGV service with 24-hour reports, in July 2026; its prices are not public. IDfy, OnGrid and AuthBridge quote prices only on request. | [ThePeoplesBoard 2026; JantaKhoj (https://jantakhoj.com/verif](https://www.thepeoplesboard.com/tools/top-15-background-check-tools-in-india-2026/) | 2026 | L |
| R2-25 | Aadhaar Paperless Offline e-KYC lets the holder share a UIDAI-signed XML (name, address, photo, gender, DOB, hashed mobile and email) that a verifier checks offline without collecting the Aadhaar number. A vendor (eKYCNow / Message Central) charges Rs 10 per offline verification with no setup fee. UIDAI's online authentication fees (Rs 20 per e-KYC in 2019, cut to Rs 3 in 2021) apply only to licensed AUA/KUA entities and were revised again by Circular 15 of 2025 (8 Dec 2025). | [Message Central eKYCNow; UIDAI Circular 15 of 2025 (https://](https://www.messagecentral.com/product/ekyc-now/offline-aadhaar-ekyc-india) | 2025-12 | M |
| R2-26 | ThePetNest's beginner grooming certification costs Rs 49,000-65,000 excluding GST, runs 2-3 months with 140+ hours of hands-on practice, and is offered in Bengaluru, Noida and Mumbai. Indian grooming schools typically run basic and advanced diplomas of 20-60 days; Education World (undated) says certified freshers joining parlours start at Rs 1-1.5 lakh a year. IPPC Bangalore offers a 2-week 'Grooming Foundations' course. | [ThePetNest; Education World (https://educationworld.in/pet-c](https://thepetnest.com/pet-grooming-course) | 2026 | M |
| R2-27 | IndiaMART Ludhiana suppliers list customised logo polos at Rs 185-215 a piece (220-240 GSM pique, including embroidered) and promotional polos at Rs 150-155; print-only services cost Rs 10-30 a piece. Bulk PVC ID cards cost Rs 4-25 each, or Rs 6-11 with lanyard printing (MOQ about 100). Retail Amazon.in sets with holder and lanyard cost about Rs 88-140 each (5-pack Rs 699; 25-pack Rs 2,199). | [IndiaMART Ludhiana directory; IndiaMART PVC ID card (https:/](https://dir.indiamart.com/ludhiana/promotional-polo-t-shirts.html) | 2026 | M |
| R2-29 | Real-world mileage is about 61 kmpl for a Hero Splendor (owner feedback, Shriram Finance, Dec 2025) and 43-50 kmpl for a Honda Activa 125 (Bajaj Finserv). At Rs 105.8 a litre, fuel costs about Rs 1.7-2.5 per km. HR forums cite company two-wheeler reimbursement of Rs 3-6 per km, which covers wear as well. | [Shriram Finance; Bajaj Finserv (https://www.bajajfinserv.in/](https://www.shriramfinance.in/articles/two-wheeler-loan/2025/delivery-bikes-mileage-splendor-activa-platina) | 2025-12 | M |
| R2-30 | Under the Punjab notification of 1 May 2026, monthly minimum wages are: unskilled Rs 13,486 (Rs 518.69/day), semi-skilled Rs 14,383, skilled Rs 15,414 and highly skilled Rs 16,601. | [AscentHR (notification Labour-Lab0MIWA/1/2021-4L/166 dt 1 Ma](https://ascent-hr.com/notification/revision-of-minimum-wages-punjab-010526/) | 2026-05 | M |
| R2-31 | The Code on Social Security 2020 came into force on 21 Nov 2025. Aggregators must contribute 1-2% of annual turnover, capped at 5% of amounts paid or payable to gig and platform workers. The Seventh Schedule covers e-marketplaces for goods or services, professional services providers, healthcare and 'any other goods/services platform'. The Social Security (Central) Rules 2026 were notified around 8-9 May 2026 and require worker registration on the government portal within 45 days. The contribution start date and rate await a separate notification. | [Taxmann; IMPRI (https://www.impriindia.com/?p=75715); ThePeo](https://www.taxmann.com/post/blog/analysis-aggregator-obligations-code-on-social-security/) | 2026-05 | M |
| R3-01 | A supplier of services must register for GST once aggregate turnover in a financial year exceeds Rs 20 lakh. The Rs 10 lakh threshold applies only to the special-category states (Manipur, Mizoram, Nagaland, Tripura), and Punjab is a normal-category state. Aggregate turnover is counted per PAN across India and includes exempt supplies such as veterinary services. | [UNVERIFIED THIS RUN - model knowledge of CGST Act 2017 s.22(](https://cbic-gst.gov.in/) | 2019-02-01 | M |
| R3-02 | Under s.24(x) CGST, an e-commerce operator that must collect TCS under s.52 has to register regardless of turnover. Notification 65/2017-Central Tax exempts persons supplying SERVICES through an ECO from compulsory registration under s.24(ix) while their aggregate turnover stays within the s.22 threshold (Rs 20 lakh in Punjab). | [UNVERIFIED THIS RUN - model knowledge of CGST Act s.24(ix)/(](https://cbic-gst.gov.in/) | 2017-11-15 | M |
| R3-03 | An ECO that collects consideration on behalf of suppliers must collect TCS on the net value of taxable supplies. From 10 July 2024 the rate is 0.25% CGST + 0.25% SGST (0.5% intra-state, 0.5% IGST inter-state); it was 1% before. Notification 15/2024-Central Tax made the change. The ECO files GSTR-8 monthly. | [UNVERIFIED THIS RUN - model knowledge of CGST Act s.52 and N](https://cbic-gst.gov.in/) | 2024-07-10 | M |
| R3-04 | Notification 17/2017-Central Tax (Rate), as amended, lists the services on which the ECO itself pays GST under s.9(5). They are passenger transport (radio taxi, motorcab, maxicab, motorcycle), accommodation services, restaurant services (from 1 Jan 2022), and 'housekeeping services such as plumbing, carpentering etc.' except where the supplier is itself liable to register under s.22(1). Pet grooming, walking and vet services are not named. | [UNVERIFIED THIS RUN - model knowledge of Notification 17/201](https://cbic-gst.gov.in/) | 2017-08-22 | M |
| R3-05 | Commission or service fees charged by a marketplace to service providers, and customer membership fees such as 'Groom Club', are standard-rated at 18% GST (intermediary/support services, SAC 9985/9983 family). Providers that are not registered cannot claim this input tax credit back. | [UNVERIFIED THIS RUN - model knowledge of Notification 11/201](https://cbic-gst.gov.in/) | 2025-09-22 | M |
| R3-06 | Notification 12/2017-Central Tax (Rate) exempts (Nil rate) 'services by a veterinary clinic in relation to health care of animals or birds' (Heading 9983, believed to be Sr. No. 47). | [UNVERIFIED THIS RUN - model knowledge of Notification 12/201](https://cbic-gst.gov.in/) | 2017-06-28 | M |
| R3-07 | Pet grooming and dog walking have no specific GST entry and default to the 18% residual rate. The GST rate rationalisation effective 22 Sept 2025 cut 'beauty and physical well-being' services (salons, barbers, gyms, yoga) to 5% without ITC, but those entries cover human services and probably do not extend to animal grooming. | [UNVERIFIED THIS RUN - model knowledge of the 56th GST Counci](https://cbic-gst.gov.in/) | 2025-09-22 | L |
| R3-08 | A platform taxes only its commission/fee if it acts as an ECO or intermediary and the independent provider is the legal supplier. If instead the platform sets fixed prices, sells under its own brand, invoices the customer in its own name, guarantees the service, and controls and pays the providers, tax authorities may treat it as the principal supplier. GST (once registered) and income tax would then fall on the full GMV. | [UNVERIFIED THIS RUN - analysis based on CGST Act s.2(44)/(45](https://www.indiacode.nic.in/) | 2017-07-01 | L |
| R3-09 | An e-commerce operator must deduct TDS on the gross amount of services facilitated through its platform. The rate fell from 1% to 0.1% from 1 Oct 2024 (Finance (No.2) Act 2024). Payments a customer makes directly to the provider are deemed paid by the ECO and are included. No TDS is needed for an individual/HUF participant whose gross amount for the FY is Rs 5 lakh or less and who has furnished PAN/Aadhaar. | [UNVERIFIED THIS RUN - model knowledge of Income-tax Act 1961](https://incometaxindia.gov.in/) | 2024-10-01 | M |
| R3-10 | The Income-tax Act, 2025 (assent August 2025) replaced the 1961 Act from 1 April 2026 (tax year 2026-27). Its TDS provisions, including the ECO TDS equivalent of s.194-O, sit in a consolidated tabular section (s.393). Rates and thresholds were broadly carried over. | [UNVERIFIED THIS RUN - model knowledge of Income-tax Act 2025](https://incometaxindia.gov.in/) | 2025-08-21 | L |
| R3-15 | DPIIT recognition is free and online. It is open to private limited companies, LLPs and registered partnership firms (not sole proprietorships) up to 10 years from incorporation, with turnover up to Rs 100 crore in any FY, that work on innovation or a scalable model. Benefits include self-certification under 6 labour and 3 environmental laws, IPR fee rebates and fast-tracking, eligibility for the 80-IAC application, and Fund of Funds/SISFS access. | [UNVERIFIED THIS RUN - model knowledge of DPIIT notification ](https://www.startupindia.gov.in/) | 2019-02-19 | M |
| R3-16 | Udyam registration is free, Aadhaar/PAN-based and self-declared on the official Udyam portal. From 1 April 2025 a micro enterprise is one with investment up to Rs 2.5 crore and turnover up to Rs 10 crore. Benefits include MSME delayed-payment protection, CGTMSE collateral-free credit and the reduced trademark fee. | [UNVERIFIED THIS RUN - model knowledge of MSMED Act s.7 class](https://udyamregistration.gov.in/) | 2025-04-01 | M |
| R3-17 | Incorporating via MCA SPICe+ has a zero filing fee for authorised capital up to Rs 15 lakh. Name reservation is about Rs 1,000, plus state stamp duty on MoA/AoA and DSCs for directors. Annual duties: statutory audit for every company regardless of turnover, AOC-4 and MGT-7/7A filings, ADT-1 auditor appointment, director KYC, and an INC-20A commencement declaration within 180 days. | [UNVERIFIED THIS RUN - model knowledge of Companies (Registra](https://www.mca.gov.in/) | 2020-02-15 | M |
| R3-18 | The LLP incorporation fee scales with contribution (Rs 500 for contribution up to Rs 1 lakh). Each year it files Form 11 (annual return, due 30 May) and Form 8 (statement of accounts and solvency, due 30 Oct). An audit is needed only if turnover exceeds Rs 40 lakh or contribution exceeds Rs 25 lakh. Late filing costs Rs 100 per day per form. | [UNVERIFIED THIS RUN - model knowledge of LLP Act 2008 s.34-3](https://www.mca.gov.in/) | 2022-04-01 | M |
| R3-19 | Under the Trade Marks Rules 2017, the TM-A application fee is Rs 4,500 per class (e-filing) for individuals, startups (DPIIT) and small enterprises (Udyam), versus Rs 9,000 per class for others (Rs 5,000/10,000 for physical filing). Relevant Nice classes: 44 (animal grooming, veterinary services), 45 (pet sitting/dog walking), 35 (online marketplace), and 9/42 (app/software). | [UNVERIFIED THIS RUN - model knowledge of Trade Marks Rules 2](https://ipindia.gov.in/) | 2017-03-06 | M |
| R3-20 | The Punjab State Development Tax Act 2018 levies Rs 200 per month (Rs 2,400 per year) on persons engaged in professions, trades, callings and employment who are assessable to income tax. Employers deduct it from salaried employees whose income is taxable. | [UNVERIFIED THIS RUN - model knowledge of the Punjab State De](https://www.indiacode.nic.in/) | 2018-04-01 | L |
| R3-21 | The rules apply to marketplace e-commerce entities offering goods OR services. Obligations: appoint a grievance officer and show their name and contact on the platform; acknowledge complaints within 48 hours and resolve them within one month; display seller/provider details (name, address, contact, ratings), the price breakup, and refund/cancellation and payment terms; avoid manipulating prices or posting fake reviews; and levy no cancellation charges unless the entity bears similar charges itself. The CCPA Dark Patterns Guidelines (30 Nov 2023) also ban 13 dark patterns. | [UNVERIFIED THIS RUN - model knowledge of the Consumer Protec](https://consumeraffairs.nic.in/) | 2020-07-23 | M |
| R3-22 | The DPDP Rules 2025 were notified in November 2025 with a phased start. Data Protection Board provisions applied at once, consent-manager provisions after about 12 months, and most data-fiduciary duties (notice, consent, security safeguards, breach notification to the Board and affected users, erasure, grievance handling, verifiable parental consent for children) after about 18 months (around May 2027). Maximum penalties reach Rs 250 crore for failing to maintain security safeguards. | [UNVERIFIED THIS RUN - model knowledge of the DPDP Act 2023 a](https://www.meity.gov.in/) | 2025-11-14 | L |
| R3-25 | The Prevention of Cruelty to Animals (Pet Shop) Rules 2018 require registration with the State Animal Welfare Board for establishments that sell or trade pet animals. The Dog Breeding and Marketing Rules 2017 cover breeders. Neither expressly covers at-home grooming, walking or vet visits where no animals are sold, though the general cruelty offences in PCA Act 1960 s.11 apply to anyone handling animals. | [UNVERIFIED THIS RUN - model knowledge of the PCA Act 1960 an](https://awbi.gov.in/) | 2018-09-05 | L |
| R3-26 | Indian Veterinary Council Act 1984 s.30 says only a registered veterinary practitioner (on a State or the Indian Veterinary Practitioners Register) may practise veterinary medicine. Diploma or certificate holders may give minor veterinary services only under supervision. | [UNVERIFIED THIS RUN - model knowledge of the Indian Veterina](https://www.indiacode.nic.in/) | 1984-08-01 | M |
| R3-27 | Retail sale or stocking of drugs, including veterinary drugs and vaccines, needs a drug sale licence under the Drugs and Cosmetics Act 1940 and Drugs Rules 1945. Registered practitioners supplying medicines to their own patients fall under a limited exemption. Selling above MRP breaches Legal Metrology rules. | [UNVERIFIED THIS RUN - model knowledge of the Drugs and Cosme](https://www.indiacode.nic.in/) | 1945-12-21 | L |
| R3-28 | Insurance Act 1938 s.40 bars paying commission or remuneration for soliciting or procuring insurance business to anyone other than a licensed insurance agent or intermediary. Earning pet-insurance referral fees therefore needs an IRDAI licence (e.g. corporate agent, insurance marketing firm, or a POSP tie-up) or an arrangement through a licensed broker or web aggregator. | [UNVERIFIED THIS RUN - model knowledge of Insurance Act 1938 ](https://irdai.gov.in/) | 2015-03-20 | M |
| R3-29 | Pradhan Mantri Suraksha Bima Yojana provides Rs 2 lakh accidental death or total disability cover (Rs 1 lakh for partial disability) for ages 18-70 at Rs 20 per year (raised from Rs 12 from 1 June 2022), auto-debited from a bank account. | [UNVERIFIED THIS RUN - model knowledge of the PMSBY scheme (p](https://www.jansuraksha.gov.in/) | 2022-06-01 | M |
| R4-02 | Ludhiana district has about 716,826 households: 436,030 urban and 280,796 rural. Average household size is 4.88. | [villageinfo.org (Census 2011 derived)](https://villageinfo.org/district/ludhiana) | undated | M |
| R4-03 | Macrotrends puts the Ludhiana metro area at about 2.03 million in 2025, up 2.06% from 1,988,000 in 2024. population.city projects 2,016,312 for 2026. | [Macrotrends (UN WUP-based estimate); population.city](https://www.macrotrends.net/cities/21319/ludhiana/population) | 2025 | M |
| R4-04 | In the SECC urban table, Ludhiana Municipal Corporation has 287,012 households. Of these, 45,880 (15.99%) own a four-wheeler and 47.62% own a two-wheeler. Across urban Ludhiana district, 56,559 of 348,263 households (16.24%) own a four-wheeler. | [Socio Economic and Caste Census (SECC) urban - Motorized whe](https://secc.gov.in/getMotorizesWheelersUrbanDistrictReport.htm/03/07) | undated | M |
| R4-05 | Only 3,321 pet dogs were registered with Ludhiana Municipal Corporation over five years. More than 2,000 registered in the first year, but few renewed. The fee is Rs 500 a year, renewable each April. | [The Tribune (Ludhiana)](https://www.tribuneindia.com/news/ludhiana/pet-owners-in-ludhianas-bypass-registration-civic-responsibility) | 2025-08 | M |
| R4-06 | Ludhiana district recorded 28,390 dog-bite cases in 2024, the highest in Punjab; 13,488 were in the city. The MC says about 1.5 lakh stray dogs have been sterilised since 2015. | [The Tribune (Ludhiana)](https://www.tribuneindia.com/news/ludhiana/ludhiana-municipal-corporations-sterilisation-drive-fails-to-curb-rising-dog-bite-cases) | 2025-01 | M |
| R4-12 | In a TGM Research India survey, 23.7% of pet owners use groomer services and 22% use pet training. | [TGM Research - Pet care survey India](https://tgmresearch.com/pet-care-survey-results-in-india.html) | undated | L |
| R4-13 | Indian vet chain Vetic recommends professional grooming every 4-8 weeks and nail trims every 4-6 weeks. A vet blog says a professional groom every 1-3 months is enough for most dogs that are brushed at home. | [Vetic blog; VetHelpDirect](https://vetic.in/blog/healthy-lifestyle/how-much-is-pet-grooming-service-costs-and-factors-influencing-pricing-in-india/) | undated | M |
| R4-15 | Grooming-business benchmarks: 60-70% of clients return for at least a second appointment within 12 months, 30-40% of first-time clients book a second appointment, typical gap between visits is 4-8 weeks, and the target rebooking-at-checkout rate is 60% or more. | [Dojo Business (salon retention guide); Franpos](https://dojobusiness.com/blogs/news/pet-grooming-salon-customer-retention) | undated | L |
| R4-16 | At Urban Company, repeat customers acquired before FY23 contributed about 77% of FY23 Net Transaction Value, and the company expected this to exceed 90%. Spend per annual transacting consumer was Rs 3,786 (FY23), Rs 3,959 (FY24) and Rs 4,079 (FY25). | [Urban Company Annual Business Summary FY23 (investor relatio](https://investorrelations.urbancompany.com/announcements-and-highlights/urban-company-annual-business-summary-fy-2023) | undated | H |
| R4-18 | Urban Company's refer-and-earn gives the referrer Rs 100 after the friend's first service, and the friend gets Rs 100 off services. Invites are shared via WhatsApp or an in-app link. | [Zoutons coupon aggregator](https://www.zoutons.com/urban-company-coupons) | 2026-06 | L |
| R4-20 | 2026 Indian benchmarks for Instagram ads: CPM Rs 45-350 and CPC Rs 6-55. Reels CPM is Rs 45-140, Stories Rs 80-200 and Feed Rs 150-350. Reels typically run 25-40% cheaper than feed. | [upGrowth - Instagram ads pricing India 2026](https://upgrowth.in/instagram-ads-pricing-india-2026/) | undated | L |
| R4-21 | Indian Meta CPMs by city tier: metros USD 2.50-3.50, Tier-2 USD 1.50-2.50, Tier-3 USD 0.80-1.80. Tier-1 is 2-3x Tier-3. October-December is peak season, with CPMs 25-50% above average. Meta India CPL is listed at USD 1.50-12. | [Sotros Infotech - Paid Social Ads Benchmarks India 2026](https://sotrosinfotech.com/blog/paid-social-ads-benchmarks-india-southeast-asia-2026/) | 2026-06 | L |
| R4-22 | From 2025 agency client data, Meta lead-ad CPL in India is Rs 100-250 for home services and Rs 180-380 (or Rs 150-350) for healthcare and clinics. A general range of Rs 40-150 per lead is also cited. | [OwlClaw - Meta Ads Benchmarks India](https://owlclaw.com/benchmarks/meta-ads-benchmarks-india) | undated | L |
| R4-23 | Indian Google Ads CPC for local services (plumber, salon, dentist) is about Rs 8-35 per click. A local service business needs Rs 15,000-30,000 a month to generate 80-200 leads in a tight radius, at Rs 150-400 per lead. Below Rs 15,000 a month there is too little data to optimise. | [upGrowth - Google Ads pricing India 2026](https://upgrowth.in/google-ads-pricing-india-2026/) | undated | L |
| R4-24 | Since 1 July 2025, Meta has charged per delivered template message. The India marketing rate rose from Rs 0.7846 to Rs 0.8631 on 1 January 2026. Utility and authentication are about Rs 0.115 per message. All rates exclude 18% GST. | [WhAutomate; Spurnow; IBTimes India (citing Meta rate card)](https://whautomate.com/whatsapp-business-api-pricing-india) | undated | M |
| R4-26 | Meta's pricing documentation, updated 28 September 2026, says the free entry-point window opened by a Click-to-WhatsApp ad 'may remain open for up to 7 days' (previously 72 hours). All messages in that window are free. Click costs are set by the normal Meta auction plus 18% GST. | [Spurnow (citing Meta pricing documentation)](https://www.spurnow.com/en/blogs/click-to-whatsapp-ads-benchmarks) | 2026-09 | M |
| R4-27 | AiSensy's pricing from 1 July 2025: Basic Rs 1,500/month and Pro Rs 3,200/month plus GST (Rs 1,350 and Rs 2,880 a month when billed annually). Both include 1 owner and 5 agents; extra agents are Rs 750/month. Chatbot flows are an add-on at Rs 2,500/month for the first 5 flows. | [AiSensy help centre (official)](https://wiki.aisensy.com/en/articles/11652273-pricing-update-effective-from-july-1) | 2025-07 | H |
| R4-28 | Interakt: Starter Rs 3,499/quarter or Rs 11,999/year (1 channel), Growth Rs 7,699/quarter, Advanced Rs 10,499/quarter, plus a 12-25% message markup. Wati: Growth Rs 2,499-2,699/month, Pro Rs 5,999-6,499. Gallabox: Growth about Rs 2,399/month billed yearly (other sources about Rs 5,999). | [Codingclave (Interakt); YCloud and RichAutomate (Wati); Zoko](https://codingclave.com/blog/interakt-pricing-india-2026) | undated | L |
| R4-29 | The free WhatsApp Business app limits each broadcast list to 256 recipients. You can create unlimited lists, but messages reach only contacts who have saved your number. Sending the same message to many lists quickly can trigger spam filters. | [Qiscus; Telecrm; ChatArchitect (vendor guides)](https://www.qiscus.com/en/blog/whatsapp-broadcast-limit/) | undated | M |
| R4-30 | Indian nano creators (1K-10K followers) charge about Rs 2,000-8,000 per post or Reel (upGrowth 2026). Other sources give Rs 500-3,000 per post (Dazzlerr) and Rs 500-5,000 per Reel (Kofluence 2025). Nano engagement is typically 6-12%. | [upGrowth; Dazzlerr; Kofluence 2025 report preview](https://upgrowth.in/influencer-marketing-pricing-india-2026/) | undated | M |
| R4-32 | Section 194R (Finance Act 2022) requires 10% TDS on benefits or perquisites, including free products or services given to influencers, above Rs 20,000 per recipient per year. ASCI guidelines (in force since 14 June 2021) treat gifted or barter content as needing disclosure (#ad, #collab, #gifted). CCPA can fine up to Rs 10 lakh for individuals and Rs 50 lakh for entities over misleading ads. | [IANS Life (194R); Sansa Legal / Jurigram (ASCI)](https://www.ianslife.in/life-style/indias-new-tax-policy-set-impact-influencers) | undated | M |
| R4-33 | Indian bulk flyer printers list Rs 0.50 per piece (minimum 1,000) up to Rs 0.50-2 per piece. That puts 1,000 flyers at about Rs 500-2,000 before design, delivery and GST. | [ExportersIndia supplier listings](https://www.exportersindia.com/bangalore/flyers-printing.htm) | undated | L |
| R4-34 | Indian newspaper pamphlet insertion costs about Rs 0.20-0.35 per piece for insertion only (Rs 200-350 per 1,000) in Delhi-NCR and other cities, with IndiaMART listings up to Rs 1.30. The Media Ant rack rates are about Rs 1.12-1.41 per pamphlet, with minimum billing of about Rs 10,000-12,800. Some vendors require 10,000 units. | [IndiaMART listings; The Media Ant; Smartads](https://dir.indiamart.com/new-delhi/newspaper-inserting-services.html) | undated | L |
| R4-35 | A printed 6x3 ft roll-up standee with stand costs about Rs 950-1,800 per piece on IndiaMART. QR stickers range from Rs 0.45 per piece (2x1 inch paper) to about Rs 10-20 per piece for vinyl or Paytm-style stickers. | [IndiaMART seller listings](https://m.indiamart.com/spdigitalprints/roll-up-standee.html) | undated | L |
| R4-36 | RWA society advertising vendors list an RWA banner in Delhi at Rs 7,500/month (Adzone). Smartads lists Rs 38,000 per RWA for 3 months (non-lit, minimum 50 units) and Rs 6,000 per signage board per month. | [Smartads; Adzone Communications (IndiaMART)](https://smartads.in/services/traditional/rwa-branding-advertising-in-india) | undated | L |
| R4-37 | Justdial's average annual subscription fee was Rs 18,000-20,000 (Inc42, Q1 FY24). Its advertising page in 2026 shows an indicative one-year Standard plan from Rs 100/day (about Rs 36,500/year). Justdial had 631,530 active paid campaigns at 31 March 2026. | [Inc42; Business Wire/yespress overview; Justdial investor pr](https://inc42.com/?p=408697) | undated | M |
| R4-38 | GADVASU (veterinary university, Ludhiana) holds an annual dog show in December. The 2024 edition (15 Dec 2024) drew more than 100 owners and the 2023 edition more than 125. Dog groomers, pet-food makers and pharma companies take part. Pet Fed held a Chandigarh stop at Elante Mall (24-25 Feb 2023) with 100+ stalls. | [GADVASU news/activity pages; Curly Tales/IANS (Pet Fed)](https://www.gadvasu.in/activity/10111) | 2024-12 | M |
| R4-39 | Meta and Google ads invoiced by their Indian entity carry 18% GST, which is claimable as input credit only by GST-registered businesses. Invoices from Irish entities carry no Indian GST and need 18% IGST under reverse charge. The 6% Equalisation Levy on online ads was removed from 1 April 2025. | [TaxGarden (compliance blog)](https://taxgarden.in/blog/gst-on-advertising-services-google-meta-ads-rcm-india-2026) | undated | M |
| R4-40 | Chandigarh MC's Pet and Community Dogs Bylaws require registration of every dog over 4 months old and cap dogs by house size (5 marla: 1, 10 marla: 2, 12 marla: 3, 1 kanal: 4). An older Tribune report counted about 9,500 registered pet dogs in Chandigarh. Panchkula has also made registration mandatory. | [The Tribune (Chandigarh); News Arena](https://www.tribuneindia.com/news/chandigarh/good-and-bad-news-for-dog-lovers-in-chandigarh-mc-issues-new-laws-key-changes-and-regulations) | undated | L |
| R5-01 | NPCI's new framework, effective 15 Oct 2026, charges a 0.4% MDR on person-to-merchant (P2M) UPI payments above Rs 2,000, capped at Rs 300 per transaction. Payments up to Rs 2,000 and P2P transfers stay free, and the merchant may not add MDR to the customer's bill. Small merchants in the 'P2PM' category, who receive up to Rs 1 lakh a month through UPI QR straight into their bank account, keep zero MDR on every payment whatever its size. A merchant is moved to P2M only after receiving more than Rs 1 lakh a month for 3 months in a row. | [Business Today (also Moneylife, Vyapar, Inc42 coverage of NP](https://www.businesstoday.in/latest/economy/story/upi-mdr-gst-npci-says-small-merchants-and-96-of-transactions-remain-unaffected-from-october-15-557039-2026-09-22) | 2026-09-22 | M |
| R5-02 | Razorpay charges a 2% platform fee plus 18% GST on most domestic methods, UPI and RuPay debit included, even though government MDR on those is zero. RuPay credit cards on UPI cost 2.15%, and Amex, Diners and corporate cards cost 3%. There is no setup fee and no annual maintenance charge. | [Razorpay blog - payment gateway pricing explained](https://razorpay.com/blog/razorpay-payment-gateway-pricing-explained/) | undated | M |
| R5-03 | Newly activated Razorpay merchants pay no platform fee on eligible domestic transactions for 90 days or until Rs 5 lakh cumulative value, whichever comes first. GST and a Rs 199 + tax KYC processing fee are not waived. Prepaid cards, corporate cards, Amex, Diners and EMI are excluded. | [Razorpay blog + razorpay.com/terms/90-day-free-pg-offer/](https://razorpay.com/blog/razorpay-0-percent-platform-fee-offer-90-days-new-merchants-2026/) | 2026-07 | M |
| R5-04 | Under RBI's Sept 2025 PA Directions, Razorpay offers Route only to businesses whose domestic turnover exceeds Rs 40 lakh (or export turnover exceeds Rs 5 lakh) in the current or preceding financial year. GST-exempt and first-year businesses may self-declare turnover. A written payer-payee transparency declaration is also required, meaning the linked account (the provider) must deal directly with customers. Route access was disabled for merchants that missed the 31 Dec 2025 proofs deadline. As an alternative, Razorpay suggests a two-step flow: settle into your own account, then pay vendors. | [Razorpay Route FAQ (official docs)](https://razorpay.com/docs/payments/route/faqs/) | undated | H |
| R5-05 | Razorpay's worked example for Route transfers applies a 0.25% transfer fee plus 18% GST, on top of a 2% payment fee. The example uses a Rs 1,000 payment with Rs 100 platform commission. | [Razorpay docs - Route transfers and related fees example](https://razorpay.com/docs/payments/route/transfer-fees-example.md) | undated | M |
| R5-06 | Cashfree's standard domestic rate is 1.95% (cards, netbanking, wallets). Its limited-period 1.6% offer was valid until 31 Jul 2026. UPI is priced 'as per applicable law'. Easy Split (marketplace split) is listed at 0.2-0.25% of order value on top of collection charges. Vendors must complete KYC (PAN, bank account, business type, GST/CIN if any), and non-compliant vendors are blocked from settlement. | [Cashfree docs pricing; cashfree.com/easy-split/split-payment](https://www.cashfree.com/docs/help/account/pricing) | 2026 | M |
| R5-07 | RazorpayX payout fees per transfer are: IMPS/UPI Rs 4 below Rs 1,000; Rs 6 for Rs 1,000-25,000; Rs 9 above Rs 25,000; NEFT/RTGS Rs 5. GST is charged on top. Third-party sources put Cashfree payouts at about Rs 3-15 per transfer, varying by rail. | [RazorpayX Payouts page; precisiontech.in Cashfree partner pa](https://razorpay.com/x/payouts_x/) | undated | M |
| R5-09 | Razorpay onboards unregistered individuals using their personal PAN, with no GST number required. The Individual business type pays a Rs 199 onboarding fee. A GST certificate becomes required once annual turnover exceeds Rs 20 lakh (Rs 10 lakh in special-category states). | [Razorpay docs - Create a Razorpay Account / easy submit KYC](https://razorpay.com/docs/payments/easy-submit-kyc/) | undated | M |
| R5-10 | PhonePe SmartSpeaker has two plans. The monthly plan costs Rs 318 one-time setup plus Rs 125 a month deducted from settlements. The zero-rental plan costs Rs 999 one-time (GST included) plus a Rs 25 monthly service fee. The premium voice option adds Rs 15 a month. | [PhonePe merchant help centre](https://cms.phonepe.com/en/mx/merchant-help/phonepe-smartspeaker/about-phonepe-smartspeaker/what-are-charges-applicable-phonepe-smartspeaker) | undated | H |
| R5-13 | Google Workspace Business Starter lists at about Rs 270 per user per month in India plus 18% GST (Rs 318.60), or about Rs 3,240 per user per year on annual billing. Resellers advertise first-year promos as low as Rs 1,932 per user per year. | [Netspace India (reseller); StartupTalky; Precisiontech](https://www.netspaceindia.com/email-solutions/google-workspace-pricing/) | 2026 | M |
| R5-14 | Since July 2023, AppSheet Core licences come by default with domain-verified Google Workspace Business Starter, Standard and Plus editions. AppSheet's free tier lets you build prototypes and invite up to 10 test users at no cost. Paid standalone plans are about $5 (Starter) and $10 (Core) per user per month. | [Google Workspace Updates blog; solutions.appsheet.com/pricin](https://workspaceupdates.googleblog.com/2023/07/appsheet-core-licenses-included-by-default-for-more-google-workspace-editions.html) | 2023-07 | M |
| R5-15 | Glide's Maker plan costs $49 a month billed annually or $60 monthly. It includes 3 published apps and 500 updates a month, with extra updates at $0.02 each. Unlimited users are allowed only on personal or education email domains; work-email users need Business (about $199-249 a month). | [Jet Admin blog (competitor) - Glide pricing July 2026](https://www.jetadmin.io/blog/glide-pricing-current-plans-real-costs-and-jet-admin-alternatives-july-2026/) | 2026-07 | L |
| R5-17 | Zoho FSM in India has a free plan (2 users per one partner), Standard at Rs 1,000 and Professional at Rs 1,800 per user per month excluding GST; another partner quotes about Rs 1,400 per technician per month. Jobber Core is $49 a month for 1 user, extra users $29 each, and Connect is $139 a month for up to 5 users. Fieldproxy has been reported at Rs 400-800 per field user per month. | [PrecisionTech (Zoho partner); aaxonix.com; fieldproxy.ai Job](https://precisiontech.in/software/zoho/zoho-fsm/) | 2026 | L |
| R5-18 | A .in domain costs about $2-4 for the first year and $5.50-10 a year to renew. Examples: Hostinger $2.99 first year / $9.99 renewal, HIOX India $4.14 / $8.81, cheapest renewal $5.50 at Above.com. | [domainoffer.net comparison (Jul 2026); cybernews.com best .i](https://domainoffer.net/tld/in) | 2026-07 | L |
| R5-19 | Cloudflare Pages' free plan allows 500 builds a month, 1 concurrent build, a 20-minute build timeout and up to 20,000 files per site. Official docs list no bandwidth cap, and third parties describe bandwidth as unmetered. Pages Functions count against the Workers free tier (about 100,000 requests a day). | [Cloudflare Pages limits (official docs)](https://developers.cloudflare.com/pages/platform/limits) | 2026 | H |
| R5-21 | Supabase's free tier gives 2 projects, a 500 MB Postgres database, 1 GB file storage and 50,000 auth MAU; free projects pause after a week of inactivity. Firebase phone-OTP sign-in has required the paid Blaze plan since Sept 2024, with per-SMS charges in India (first 10 SMS a day free). Email and social auth stay free up to 50,000 MAU. | [Jet Admin Supabase guide 2026; blog.logto.io Firebase auth p](https://www.jetadmin.io/blog/supabase-pricing-2026-guide-to-plans-limits-and-real-world-costs/) | 2026 | L |
| R5-22 | Indian app development in 2026 runs about Rs 6-18 lakh for a lean MVP on one platform and Rs 20-55 lakh for a growth-stage iOS + Android product. Advanced feature sets (payments, geolocation, push) add Rs 1-3 lakh each, and complex modules (real-time chat, multi-tenant admin) add Rs 3-10 lakh+. A mid-tier Bengaluru agency quotes about Rs 24-38 lakh over 14-18 weeks. | [Riolabz (agency) 2026; rohitraj.tech notes (agency tiers)](https://www.riolabz.com/blogs/cost-of-mobile-app-development-in-india-in-2026) | 2026 | L |
| R5-23 | An India-based consultant prices a 12-screen Flutter MVP (Firebase/Supabase auth, payments, push) at Rs 6.5-9.5 lakh over 5-8 weeks. India Flutter agency rates are about $25-60 an hour, with freelancers 15-30% lower. White-label 'UrbanClap clone' scripts start at about $999-1,499 for an MVP licence, excluding third-party APIs and hosting, against $12,000-25,000 for a custom MVP from the same vendor. | [rohitraj.tech (consultant); getwidget.dev rates; miracuves.c](https://rohitraj.tech/notes/hire-flutter-developer-india-2026) | 2026 | L |
| R5-24 | Apple Developer Program enrolment costs Rs 8,700 a year in India. Google Play developer registration is a one-time $25. | [Apple Developer Forums (user reports); vendor blog for Googl](https://developer.apple.com/forums/thread/835350) | 2026-02 | M |
| R5-27 | Under PMEGP, the maximum project cost for service units is Rs 20 lakh. The margin-money subsidy is 15% urban / 25% rural for general category and 25% urban / 35% rural for special categories. Own contribution is 10% (general) or 5% (special). The scheme was approved for 2021-22 to 2025-26, and I found no notice extending it to 2026-27. | [KVIC revised PMEGP guidelines; Bank of Maharashtra PMEGP pag](https://www.kviconline.gov.in/pmegpeportal/dashboard/notification/Revised_PMEGP_Scheme_Guidelines_07122023_compressed.pdf) | 2023-12 | M |
| R5-28 | Stand-Up India gives bank loans of Rs 10 lakh to Rs 1 crore for greenfield enterprises to SC/ST and/or women entrepreneurs, who must hold 51% of non-individual entities. The scheme was extended only up to 2025 and reportedly ended March 2025, pending a relaunch. Budget 2025-26 announced a new scheme of term loans up to Rs 2 crore for 5 lakh first-time women, SC and ST entrepreneurs; I found no evidence it has launched. | [SBI Stand-Up India page; Outlook Money (Budget 2025); telang](https://sbi.co.in/web/get-business-product-information/stand-up-india) | 2025 | M |
| R5-29 | From 1 Apr 2025 CGTMSE guarantees collateral-free credit to micro and small enterprises up to Rs 10 crore. Cover is 85% for micro enterprises up to Rs 5 lakh and 75% above that, with higher cover for women and SC/ST and +5 points in credit-deficient districts. The borrower pays an annual guarantee fee, kept low for loans up to Rs 10 lakh. | [Bajaj Finserv CGTMSE guide (Dec 2025); Poonawalla Fincorp](https://bajajfinserv.in/cgtmse-scheme) | 2025-12 | M |
| R5-30 | SISFS pays through approved incubators: grants up to Rs 20 lakh for proof of concept, prototype and trials, plus up to Rs 50 lakh as convertible debentures or debt for market entry. It is for DPIIT-recognised startups incorporated less than 2 years before applying. The original Rs 945 crore scheme covered 2021-25. Its 2026 status is unclear: an aggregator lists it open but reports the last cycle closing 31 May 2026, and DPIIT was pushing for a revival in late 2025. | [Bajaj Finserv explainer (Apr 2026); beststartup.in (Jul 2026](https://www.bajajfinserv.in/startup-india-seed-fund-scheme-details) | 2026-04 | L |
| R5-31 | Punjab's Industrial and Business Development Policy 2022 offers startups: a seed grant up to Rs 3 lakh via state/centre-recognised incubators; an 8% a year interest subsidy for 5 years on bank loans, capped at Rs 5 lakh a year; reimbursement of 25% of lease rent for 1 year, capped at Rs 3 lakh, for startups in incubators, IT parks or notified locations; and 100% stamp-duty reimbursement on MoA/AoA registration for Startup Punjab-registered startups. | [Startup India - Punjab state policy page; Startup India SRF ](https://www.startupindia.gov.in/content/sih/en/state-startup-policies/Punjab-state-policy.html) | 2026 | H |
| R5-33 | The Chandigarh Startup Policy 2025 has a grant-based seed fund with a Rs 10 crore annual corpus (Rs 50 crore over 5 years). Up to 20 seed-stage startups get up to Rs 7 lakh each, with an extra Rs 2 lakh for women-led or transgender-founded ventures. Up to 20 early-growth startups get up to Rs 12 lakh each. | [The Tribune; Startup India SRF 2026 Chandigarh report](https://www.tribuneindia.com/news/chandigarh/guv-unveils-startup-policy-says-city-can-become-hub) | 2025-04 | M |
| R5-34 | GADVASU's Veterinary Livestock Innovation and Incubation Foundation (VLIIF), a DST-NIDHI Inclusive Technology Business Incubator in Ludhiana, gives ignition grants of up to Rs 10 lakh per startup under DST criteria. It reports 28 startups incubated and Rs 50 lakh of ignition grants given. It has signed an MoU with Ludhiana Angels Network for mentoring and early-stage funding access, and applications go through vliif.com. | [GADVASU news; The Tribune (VLIIF agreements with startups)](https://www.gadvasu.in/news/10975) | undated | M |
| R5-35 | PAU's Punjab Agri Business Incubator (RKVY-RAFTAAR) runs UDDAM, a pre-seed programme with grants up to Rs 5 lakh, and UDAAN, an incubation programme for startups with an MVP, with grants up to Rs 25 lakh. PABI reports training 250+ startups and funding 92 with Rs 11.5 crore+. | [StartupGrants India provider listing; incorpx.io UDDAM 2026 ](https://www.startupgrantsindia.com/providers/punjab-agri-business-incubator-pabi-punjab-agricultural-university) | 2026 | M |
| R5-36 | Chitkara Innovation Incubator Foundation (DST TBI, Rajpura) runs a DST NIDHI Seed Support Program offering Rs 10-25 lakh (higher in exceptional cases) as equity, convertible instruments or debt. Eligible startups are India-registered companies, preferably DPIIT-recognised, with at least 3 months in a CIIF resident or virtual programme. Equity exit is considered in 3-5 years. CIIF reports funding 101 startups. | [Chitkara University CIIF NIDHI-SSP page](https://chitkara.edu.in/ciif/nidhissp.php) | undated | H |
| R5-37 | Ludhiana Angels Network is an LLP set up in 2024 at the BCM campus, Sector 32, Ludhiana, focused on manufacturing and supply chain but technology-agnostic. Its Fuelerator 3.0 programme (Rs 1,000 application fee, deadline 30 Aug 2026) shortlisted 30 startups and selected 4 for Rs 50 lakh equity funding each. | [StartupGrants India listing (not LAN's own site)](https://www.startupgrantsindia.com/fuelerator-3-lan-startup-fund) | 2026-08 | L |
| R5-38 | Typical Indian pre-seed cheques are about Rs 5-25 lakh, mostly from angels, and founders usually give up about 15-20% equity at pre-revenue seed. | [eChai Ventures founder guide](https://echai.ventures/startingup/seed-fundraising/how-do-i-actually-value-a-pre-revenue-startup-and-where-does-the-seed-number-come-from) | undated | L |

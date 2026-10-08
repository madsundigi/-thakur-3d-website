# B17 · JOIN AS GROOMER — `/join-as-groomer/`

> Page blueprint — the supply side. A doorstep pet-care brand is only as good as the people at the door; this page
> recruits them. Obeys `00-MASTER-PLAN.md`; verification process identical to `safety-hygiene.md` SH-4.

| URL | Wave | Schema | Status |
|---|---|---|---|
| `/join-as-groomer/` | 2 | BreadcrumbList; + one JobPosting per **live** opening (real `validThrough` and `baseSalary`) | blueprinted |

## 1 · Head

- **Title** (55): `Pet Groomer & Dog Walker Jobs in Ludhiana | PetDoorStep`
- **Meta** (154): `Join PetDoorStep in Ludhiana as a pet groomer, dog walker or partner vet. Steady bookings, fair pay, training and respect. Apply on WhatsApp in 2 minutes.`
- **H1:** `Join PetDoorStep — Groomer, Walker & Vet Partner Roles in Ludhiana`
- Primary keyword: *pet groomer jobs ludhiana* (Title · H1 · JG-1 subhead)

## 2 · Blocks (DOM order)

**JG-0** Breadcrumb `Home › Careers` · **JG-1 Hero** — H1 · subhead "Pet groomer jobs in Ludhiana with steady bookings near your home, fair and transparent pay, real training — and pet parents who book you by name." · CTA [Apply on WhatsApp].

**JG-2 · Why join** (4 tiles)
1. **Steady bookings** — we find the customers; you do what you're good at.
2. **Fair, transparent pay** — `[FILL:PAY_RANGES]` (per-groom and monthly-walker pay, published here once final). Tips are yours, in full.
3. **Training & kit** — we train you on our standards and provide the sealed-kit supplies; you never pay for them.
4. **Respect and growth** — customers see your name and photo and can request you; senior-groomer and team-lead roles open as we expand across Punjab.

**JG-3 · Roles** (3 cards)

| Role | You'll need |
|---|---|
| **Groomer** | 1+ year grooming experience or a completed grooming course · comfortable with dogs (all sizes) and cats · own two-wheeler + licence · smartphone with WhatsApp · Punjabi or Hindi |
| **Dog walker** | 18+ · genuinely loves dogs · reliable for early mornings (from 6:00) and evenings · lives in or near our service areas · smartphone with WhatsApp |
| **Partner vet** | BVSc & AH, registered with the Punjab State Veterinary Council · home-visit availability within 9:00–19:00 · terms: `[FILL:VET_PARTNER_TERMS]` |

**JG-4 · How we hire** (H2 "Our 6-step process — the same one we promise customers") — the SH-4 steps verbatim: application → ID, address proof and two references → police verification (once live per SH-4) → skills trial on a volunteer pet → training on our standards → three supervised visits, then solo. Line: "**No joining fee or deposit — ever.** Anyone asking you for money in our name is not us."

**JG-5 · Apply** (H2 "Apply in 2 minutes")
- Primary: [Apply on WhatsApp] → `wa.me/[FILL:WHATSAPP_NUMBER]?text=Hi%20PetDoorStep%2C%20I%20want%20to%20apply%20as%20a%20{role}.%20Name%3A%20%20Experience%20(years)%3A%20%20Area%3A%20`
- What to send (listed on the page): name · phone · role (Groomer / Walker / Vet) · years of experience · your area of Ludhiana · two-wheeler (yes/no) · languages. No CV needed.

**JG-6 · FAQ** (5 Q&As, plain HTML)
1. **Do I need my own grooming kit?** — No. We provide the standard sealed kit and supplies, and train you on how we clean and seal it after every visit.
2. **Is this full-time or part-time?** — Both. You choose your available slots; full-time groomers get first pick of bookings in their area.
3. **How soon will I get bookings?** — After your three supervised visits, bookings follow demand in your area — we'll tell you honestly what to expect before you start.
4. **Do you train beginners?** — Walkers, yes — we train you fully. Groomers need basic grooming skills; we then train you on our handling, hygiene and heat-safety standards.
5. **Do I have to pay anything to join?** — Never. No joining fee, no deposit, no kit charge.

**JG-7** CTA band — "Love pets? Let's talk." + [Apply on WhatsApp].

## 3 · Ship checks

- [ ] `[FILL:PAY_RANGES]` published or the pay line reads "shared on your first call" — never vague promises of income
- [ ] JobPosting markup only for roles open today, with real `validThrough` and `baseSalary`
- [ ] Process wording identical to `safety-hygiene.md` SH-4

---

## 4 · As built (Wave 2 · w2-trust-b · 2026-10-08)

Built as `website/src/pages/join-as-groomer.astro`. `git switch` base `c41a6b2`.

- **Head** — Title/Meta/H1 exactly as §1 (no ₹, static strings). Primary keyword *pet groomer jobs ludhiana* in
  Title · H1 · the JG-1 subhead.
- **JG-0** — breadcrumb `Home › Careers`: the second crumb label is `Careers` (the blueprint's trail name), passed
  to both the visible `<Breadcrumb>` and the BreadcrumbList JSON-LD so they match (P084). The route label stays
  "Join as Groomer" for nav/footer.
- **JG-1** — header (H1 · subhead · [Apply on WhatsApp] · R3), text-only, **no `[data-hero]`**: the long mandated
  66-char H1 would risk the 360×640 fold law in the Hero component, so a plain header is used (decision log). Apply →
  `waHref(applyText)`, `source="hero_join-as-groomer"`.
- **JG-2** — 4 why-join tiles verbatim; tile 2 carries the honest `[FILL:PAY_RANGES]` token (00 §8), so the pay line
  is never a vague income promise (ship check).
- **JG-3** — 3 role cards (the blueprint calls JG-3 "3 cards"); each "You'll need" list verbatim, the Partner-vet
  card carries `[FILL:VET_PARTNER_TERMS]`.
- **JG-4** — the SH-4 steps **verbatim** from `content.ts` `hiringSteps()`. The police step is policy-gated
  (`policy.policeVerified = false`, 00 §3.4), so it is omitted and the heading counts the claimable steps:
  **"Our 5-step process — the same one we promise customers"** (content.ts: never hard-code six while gated).
  Decision logged. Line "No joining fee or deposit — ever…" verbatim.
- **JG-5** — "What to send" list verbatim + "No CV needed." Apply → `waHref(applyText)`, `source="join-as-groomer_page"`.
  `applyText` = the JG-5 prefill with `{role}` = "groomer, walker or vet" (one button, all roles; the list asks the
  applicant to name their role).
- **JG-6** — 5 Q&As as **plain HTML** (`<dl>`), **no FAQPage markup** (04 §2.9 allows BreadcrumbList + JobPosting only).
- **JG-7** — CtaBand "Love pets? Let's talk." · [Apply on WhatsApp], `source="ctaband_join-as-groomer"`.
- **Schema** — `schemaGraphLd({ type: 'breadcrumb-only', crumbs })` = BreadcrumbList only. **JobPosting is added per
  live role with real `validThrough` + `baseSalary`; none is open yet** (schema.ts §535), so breadcrumb-only today.
- **Gates** — build · check:prices · check:budgets (CSS 42,073 B) · test:site (no overflow 360/768/1280, axe 0,
  ld+json ok) all green. `check:pages`: only the self-canonical P074 (route 'planned' until integrator flips live).
- Ship checks: [x] pay line is the honest `[FILL:PAY_RANGES]` token (never vague income) · [x] no JobPosting markup
  until a role is open · [x] process wording identical to safety-hygiene.md SH-4 (shared `HIRING_STEPS`).

## 5 · P040 · SERP intent — *pet groomer jobs ludhiana* (checked 2026-10-08)

Note: WebSearch is US-biased, so Ludhiana-local results were thin; the SERP **format** is still clear.

- Google ranks **job-board / aggregator listings** (apna.co "beautician/hair-stylist jobs in Ludhiana",
  evaniosjobs.com pet-groomer pages, jobstreet career-advice) — the format is a **JobPosting feed**, not editorial
  career pages.
- Real **Ludhiana-based groomer openings are thin**: the nearest concrete listing was Amritsar (Kay Cee, Ranjit
  Avenue — **₹20,000–₹35,000/month, 1+ year experience, basic English, full-time, work-from-office**). Useful
  benchmarks: that pay band informs `[FILL:PAY_RANGES]`, and "1+ year experience" matches our Groomer requirement.
- **Verdict:** a branded **recruitment page carrying JobPosting markup per live role** (once roles open, with real
  `validThrough`/`baseSalary`) matches the JobPosting-feed intent and can rank against job boards while a clear
  WhatsApp "apply in 2 minutes" flow + honest pay/no-fee messaging differentiate it. Confirms the 04 §2.9 plan:
  BreadcrumbList now, JobPosting per opening.

# B18 · OFFERS & GROOM CLUB — `/offers/`

> Page blueprint. Offer definitions and honesty rules from `06-CONVERSION-PLAYBOOK.md` §7; prices from
> `00-MASTER-PLAN.md` §3.2 via `pricing.json`. Every offer shows its full terms where it's advertised — no asterisks.

| URL | Wave | Schema `@graph` | Status |
|---|---|---|---|
| `/offers/` | 2 | BreadcrumbList + OfferCatalog (live offers only) | blueprinted |

## 1 · Head

- **Title** (56): `Dog Grooming Offers in Ludhiana – ₹200 Off | PetDoorStep`
- **Meta** (154): `Dog grooming offers in Ludhiana: ₹200 off your first groom with code FIRSTGROOM, ₹150 referral rewards, and Groom Club — 15% off every monthly Full Groom.`
- **H1:** `Dog Grooming Offers in Ludhiana`

## 2 · Blocks (DOM order)

**OF-0** Breadcrumb `Home › Offers` · **OF-1** H1 + "Real offers with full terms — no countdown timers, no fake 'last slots'."

**OF-2 · New here — code FIRSTGROOM** (card)
- Offer: **₹200 off your first Full Groom or Premium Spa Groom + a free Nail Trim + Ear Clean visit (₹299 value)** between grooms, redeemable within 45 days of the first visit.
- How: the booking form adds FIRSTGROOM automatically for first-timers (`07-BOOKING-SPEC.md`), or type it in your WhatsApp message.
- Terms: one use per household · applies to Full Groom or Premium Spa only · not combinable with another discount on the same booking.
- CTA: [Get ₹200 off — first groom] → `/book/?service=full-groom&src=offers_page` (`<slug>_page` pattern, `09` §2d)

**OF-3 · Refer a friend** (card) — "Friends with benefits (the pet kind)"
- **You get ₹150 off your next service; your friend gets ₹150 off their first service.**
- If your friend's first booking is a Full Groom or Premium Spa, they get FIRSTGROOM's ₹200 instead (one discount per booking — the larger one applies); you still get your ₹150.
- How: your friend mentions your name or number in their first WhatsApp booking. No limit on referrals.

**OF-4 · Groom Club** (feature block, H2 "Groom Club — your pet's standing appointment")
- Pitch verbatim from `06` §7.3.
- Maths table (from `pricing.json`, 15% off, rounded down):

  | Size | Full Groom | Groom Club price | You save / month |
  |---|---|---|---|
  | Small | ₹1,199 | ₹1,019 | ₹180 |
  | Medium | ₹1,499 | ₹1,274 | ₹225 |
  | Large | ₹1,899 | ₹1,614 | ₹285 |

- Worked example: "A Medium dog on Groom Club for a year: 12 Full Grooms at ₹1,274 saves **₹2,700**, plus **12 free nail-trim visits** (worth ₹299 each)."
- Terms: one Full Groom a month · free Nail Trim + Ear Clean visit between grooms · priority weekend slots · same groomer on request · pay per visit after the service (UPI or cash) · cancel anytime on WhatsApp.
- CTA: [Join Groom Club] → WhatsApp prefill "Hi PetDoorStep, I want to join Groom Club for my {size} dog." (`data-source="groomclub"`, `09` §2d)

**OF-5 · Seasonal offers** — rendered **only while a real, dated offer is live**: `[FILL:SEASONAL_OFFER]` with name, exact saving, start and end dates, terms. When none is live, the section is omitted entirely (no "coming soon").

**OF-6 · Our offer rules** (H2) — verbatim from `06` §7.4: no fake urgency or scarcity; no inflated strikethrough prices; full terms shown wherever an offer appears; offers end on their stated date or are honestly extended with a new date.

**OF-7** CTA band — "Ready when you are. Book in 2 minutes." + [Book on WhatsApp].

## 3 · Ship checks

- [ ] Groom Club maths regenerated from `pricing.json` at build; numbers match `/pricing/` PR-8
- [ ] Referral and FIRSTGROOM interaction rule identical in `06-CONVERSION-PLAYBOOK.md` §7 and the WhatsApp reply templates
- [ ] OfferCatalog lists only offers live today; seasonal section absent when no live offer

---

## 4 · As built (Wave 2 · w2-trust-b · 2026-10-08)

Built as `website/src/pages/offers.astro`. `git switch` base `c41a6b2`.

- **Head** — Title/Meta/H1 exactly as §1; the three ₹ figures are rendered from `offers.ts` + `pricing.json`
  (`inr(FIRSTGROOM.off)`, `inr(REFERRAL.youGet)`, `groomClubPercent()`), so no rupee literal is typed (07 §4;
  `check:prices` green). En dash (U+2013) in the Title, em dash (U+2014) in the Meta, matching §1 byte for byte.
- **OF-1** — text-only page header (no `[data-hero]`): OF-1 carries no CTA (the first CTA is OF-2), so the Hero
  component — and the 360×640 fold law it triggers — is not used. H1 + the "Real offers with full terms…" line.
- **OF-2** — `FIRSTGROOM_TERMS` (content.ts) is the offer sentence + `Terms:` in one string (= the OfferCatalog
  description). It is `split(' Terms: ')` so the card shows Offer → How → Terms (OF-2 order) from the one source,
  never a hand-typed amount. CTA `Get ₹200 off — first groom` → `/book/?service=full-groom&src=offers_page`.
- **OF-3** — `REFERRAL_TERMS` (content.ts) verbatim = the whole OF-3 body (= the referral OfferCatalog description).
- **OF-4** — `GROOM_CLUB_PITCH` (title + body) verbatim; the maths table is `groomClubPrices()` (regenerated from
  `pricing.json`, matches /pricing/ PR-8); worked example `inr(save×12)` + `flatPrice('nail-ear')`; the six OF-4
  terms as a ✓-list; CTA `Join Groom Club` → `waHref(groomClubWaText())`, `data-source="groomclub"`.
- **OF-5** — omitted entirely (no live dated offer); the OfferCatalog `seasonal` row is likewise omitted.
- **OF-6** — the four honesty points of OF-6. The 06 §7.4 competitor-coupon aside (an inflated rupee "permanent
  coupon") is 06's example, not page copy, and would be a rupee literal in a component — omitted (decision log).
- **OF-7** — CtaBand "Ready when you are. Book in 2 minutes." · [Book on WhatsApp] → `waHref(prefillFor('/offers/'))`,
  `source="ctaband_offers"`.
- **Schema** — `schemaGraphLd({ type: 'offers', crumbs })` = BreadcrumbList + OfferCatalog (FIRSTGROOM · referral ·
  Groom Club; seasonal omitted). The three offers carry no numeric `price` field, so P087's Offer-price visibility
  check does not apply. Zero client JS.
- **Gates** — build · check:prices · check:budgets (CSS 45,063 B) · test:site (no overflow 360/768/1280, axe 0,
  ld+json ok) all green. `check:pages --pages /offers/,…`: only the self-canonical P074 (route 'planned' until the
  integrator flips it live).
- Ship checks: [x] Groom Club maths from pricing.json (matches PR-8) · [x] referral/FIRSTGROOM interaction rule =
  content.ts (= 06 §7) · [x] OfferCatalog lists live offers only, seasonal section absent.

## 5 · P040 · SERP intent — *dog grooming offers ludhiana* (checked 2026-10-08)

Note: WebSearch is US-biased, so Ludhiana-local results were thin; the SERP **format** is still clear.

- Google ranks **directory/aggregator pages** (salonist.io pet/dog-grooming directory for Punjab, threebestrated.in
  "best veterinary hospitals in Ludhiana") and **vet-clinic listings** (Vets for Pets, Sarabha Nagar; Pet Care and
  Cure, Kitchlu Nagar) — not dedicated "offers" landing pages, and **no local pack of offer pages, no offer listicle**.
- **No competitor publishes real, full-terms offer copy.** Aggregators surface only generic package prices (a
  regional reference seen on salonist listings: bath ~1400, full groom ~1700, spa ~1000 — Mohali/Amritsar, not
  Ludhiana, currency unstated) and app features ("early access to new slots", one-tap rebook).
- **Verdict:** the page matches a transactional **offers landing page** served to brand + "offers" intent; there is
  no established "offers listicle" to mimic, so a clean offers page with inline, honest terms (no asterisks, no fake
  urgency — our 06 §7.4 rules) is the correct format *and* the differentiator against directory noise.

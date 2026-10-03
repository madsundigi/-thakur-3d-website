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

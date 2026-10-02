# B10 · HOW IT WORKS — `/how-it-works/`

> Page blueprint (custom anatomy). The 4 booking steps are the **HowTo** steps in `04-TECHNICAL-SEO.md` §2.8 —
> visible text and schema must match word-for-word; anchors `#step-1`…`#step-4` are referenced by the schema URLs.

| URL | Wave | Schema `@graph` | Status |
|---|---|---|---|
| `/how-it-works/` | 1 | HowTo + BreadcrumbList | blueprinted |

## 1 · Head

- **Title** (57): `How It Works – Pet Care at Home in Ludhiana | PetDoorStep`
- **Meta** (155): `How doorstep pet care works with PetDoorStep in Ludhiana: pick a service, tell us about your pet, choose a slot and confirm on WhatsApp in under 2 minutes.`
- **H1:** `How PetDoorStep Works — Booked in 2 Minutes`

## 2 · Blocks (DOM order)

| # | Block | Spec |
|---|---|---|
| HW-0 | Breadcrumb | `Home › How it works` |
| HW-1 | Hero | H1 · subhead "Four steps from 'my dog needs a bath' to a calm, clean pet — without leaving home." · CTA [Book Now] → `/book/?src=hero_how-it-works` |
| HW-2 | **Booking: 4 steps** (H2 "Booking takes under 2 minutes") | `StepsStrip.astro`, ids `step-1`…`step-4`; names + text **verbatim** from `04` §2.8: ① Choose your service ② Tell us about your pet ③ Pick your area and time slot ④ Confirm on WhatsApp |
| HW-3 | **On the day** (H2 "What happens after you book") | 6-step timeline: ① "Within 10 minutes (9:00–19:00) we confirm your exact slot on WhatsApp, with your groomer's name and photo." ② "We message you when we're 15 minutes away." ③ "Your groomer arrives with an ID badge and opens a sealed, sanitised kit in front of you." ④ "The groom happens in your bathroom, balcony or verandah — watch as much as you like." ⑤ "We clean up, and you get photos of the result." ⑥ "Pay by UPI or cash, at exactly the confirmed price." |
| HW-4 | **What to prepare** (H2 checklist) | ✓ A tap point and a plug point near a bathroom, balcony or verandah ✓ Let your pet play and toilet before we arrive ✓ Keep the leash and a few treats handy ✓ Tell us about anxiety, skin issues or a first groom in your booking note ✓ An adult at home for grooming and vet visits · Line: "We bring everything else — table, towels, warm-water gear and dryer." |
| HW-5 | Promise band | 5-icon strip (`06` §4.1) |
| HW-6 | FAQ (5 Q&As, plain HTML — this page's schema is HowTo + BreadcrumbList only) | see §3 |
| HW-7 | CTA band | "That's it. Book your first visit in 2 minutes." + [Book Now] + [WhatsApp us] |

## 3 · FAQ

1. **Do I need to be home during the visit?** — Yes — an adult needs to be home for grooming and vet visits. For dog walks, the walker can collect your dog from a family member or your society gate, as you agree on WhatsApp.
2. **How long does a visit take?** — Bath & Brush about 45–60 minutes, Full Groom 60–90, Premium Spa up to 120; cat grooms 45–90; a vet visit usually 20–30 minutes; walks about 30 minutes.
3. **Can I reschedule?** — Yes, free until 2 hours before your confirmed slot — just reply on WhatsApp. There's no advance payment, so there's nothing to refund.
4. **Can I get the same groomer every time?** — Yes, on request — most pet parents prefer it, and pets relax faster with a familiar person. Groom Club members get it as standard, along with priority slots.
5. **What if my pet gets stressed during the groom?** — We pause, comfort and take breaks — calm matters more than speed. If your pet is too stressed to continue safely, we stop rather than force it, and plan a gentler session together.

## 4 · Ship checks

- [ ] HW-2 text = HowTo schema text, character-for-character; anchors resolve
- [ ] Durations in FAQ #2 match `00-MASTER-PLAN.md` §3.2 and `06` §5.5
- [ ] Reschedule wording identical to `book.md` FAQ #3

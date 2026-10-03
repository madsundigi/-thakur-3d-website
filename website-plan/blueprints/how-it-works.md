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

## 1a · SERP intent check (`02` P040) — 2026-10-03

- **Query.** This page has no mapped primary keyword (`01-SITEMAP.md`: "— (conversion support)"), so the check used the
  intent it serves: *how does pet grooming at home work* / *how it works dog grooming at home* (+ "book doorstep",
  "India", "WhatsApp" variants).
- **What ranks** (web search on 2026-10-03 with a US-located search tool — not a google.co.in SERP; re-check from an
  Indian connection, incognito, before launch): no local pack. Provider and platform **"how it works / what to expect"
  pages** — Rover's help article "How does dog grooming work on Rover?", Woofie's "What to expect during your first
  mobile dog groom", Groom Arts' booking guidance — plus generic explainers ("In-home dog grooming: what pet owners
  should know"). Their shared format: numbered booking steps → the groomer arrives with all the equipment → the groom
  happens at home → clean-up, with FAQs on being home, duration and rescheduling. Indian results (e.g. LBB on a Delhi
  grooming van) describe booking by call or WhatsApp. No Ludhiana page ranks.
- **How this page matches.** Same format: 4 numbered booking steps (HW-2, = the HowTo markup) → a 6-step day-of
  timeline (HW-3: arrival with ID badge + sealed kit, groom in bathroom/balcony/verandah, clean-up + photos, payment)
  → a prep checklist (HW-4) → 5 FAQs (HW-6: being home, duration, rescheduling, same groomer, stress). What the
  ranking pages lack and this page has: confirmation on WhatsApp within 10 minutes, fixed prices with no advance
  payment, Ludhiana specifics.

## 2 · Blocks (DOM order)

| # | Block | Spec |
|---|---|---|
| HW-0 | Breadcrumb | `Home › How it works` |
| HW-1 | Hero | H1 · subhead "Four steps from 'my dog needs a bath' to a calm, clean pet — without leaving home." · CTA [Book Now] → `/book/?src=hero_how-it-works` |
| HW-2 | **Booking: 4 steps** (H2 "Booking takes under 2 minutes") | `StepsStrip.astro`, ids `step-1`…`step-4`; names + text **verbatim** from `04` §2.8: ① Choose your service ② Tell us about your pet ③ Pick your area and time slot ④ Confirm on WhatsApp |
| HW-3 | **On the day** (H2 "What happens after you book") | 6-step timeline: ① "Within 10 minutes (9:00–19:00) we confirm your exact slot on WhatsApp, with your groomer's name and photo." ② "We message you when we're 15 minutes away." ③ "Your groomer arrives with an ID badge and opens a sealed, sanitised kit in front of you." ④ "The groom happens in your bathroom, balcony or verandah — watch as much as you like." ⑤ "We clean up, and you get photos of the result." ⑥ "Pay by UPI or cash, at exactly the confirmed price." |
| HW-4 | **What to prepare** (H2 checklist) | ✓ A tap point and a plug point near a bathroom, balcony or verandah ✓ Let your pet play and toilet before we arrive ✓ Keep the leash and a few treats handy ✓ Tell us about anxiety, skin issues or a first groom in your booking note ✓ An adult at home for grooming and vet visits · Line: "We bring everything else — table, towels, warm-water gear and dryer." |
| HW-5 | Promise band | 5-icon strip (`06` §4.1) |
| HW-6 | FAQ (5 Q&As, plain HTML — this page's schema is HowTo + BreadcrumbList only) | see §3 · H2 "How it works — your questions" (template SP-10 pattern) · closing line "More questions? See all pet grooming at home questions" → `/faq/` (anchor = the `/faq/` primary keyword; renders only while `/faq/` is live) |
| HW-7 | CTA band | "That's it. Book your first visit in 2 minutes." + [Book Now] + [WhatsApp us] |

As built (2026-10-03, stage w1-hiw-faq; decisions in `decisions/w1-hiw-faq.md`):

- **HW-1** is `Hero.astro` without photo, eyebrow or chips (HW-1 names none), with the R3 reply line under the CTA
  (`06` §9 R3, "near first CTA on every page"). [Book Now] → `/book/?src=hero_how-it-works`.
- **HW-2** `StepsStrip.astro` with `anchors`: `li#step-1`…`li#step-4` are the HowTo step URLs; steps and markup read
  the same `bookingSteps` (`src/data/content.ts`), so text and schema cannot drift.
- **HW-3 / HW-4** are numbered (HW-3) and ✓ (HW-4) lists with the wording above, verbatim.
- **HW-6** closing link exists because no other blueprint links `/faq/` from page content, and `02` P068
  (launch-blocker) needs one contextual inbound link per indexable page.
- **HW-7** [Book Now] → `/book/?src=ctaband_how-it-works` (amber) · [WhatsApp us] → `wa.me` with
  `PAGE_PREFILL['/how-it-works/']` ("Hi PetDoorStep! I want to book a service (from your How it works page). My area:
  ___ . My pet: ___"), green · both `data-source="ctaband_how-it-works"` · R3 reply line.

## 3 · FAQ

1. **Do I need to be home during the visit?** — Yes — an adult needs to be home for grooming and vet visits. For dog walks, the walker can collect your dog from a family member or your society gate, as you agree on WhatsApp.
2. **How long does a visit take?** — Bath & Brush about 45–60 minutes, Full Groom 60–90, Premium Spa up to 120; cat grooms 45–90; a vet visit usually 20–30 minutes; walks about 30 minutes.
3. **Can I reschedule?** — Yes. Rescheduling or cancelling is free until 2 hours before your confirmed slot — just reply on WhatsApp. Since we never take advance payment, there's nothing to refund.
   *(Synced 2026-10-03 to `faq.json` `how-it-works-3`: "Yes. " + `RESCHEDULE_TEXT` — the one reschedule wording, identical to `book.md` FAQ #3's first two sentences; f2-data F2-20.)*
4. **Can I get the same groomer every time?** — Yes, on request — most pet parents prefer it, and pets relax faster with a familiar person. Groom Club members get it as standard, along with priority slots.
5. **What if my pet gets stressed during the groom?** — We pause, comfort and take breaks — calm matters more than speed. If your pet is too stressed to continue safely, we stop rather than force it, and plan a gentler session together.

## 4 · Ship checks

- [ ] HW-2 text = HowTo schema text, character-for-character; anchors resolve
- [ ] Durations in FAQ #2 match `00-MASTER-PLAN.md` §3.2 and `06` §5.5
- [ ] Reschedule wording identical to `book.md` FAQ #3 (both contain `RESCHEDULE_TEXT`; `src/lib/faq.ts` fails the build otherwise)
- [ ] Title, meta and H1 exactly as §1 (title 57, meta 155 with no double quotes, H1 43); H1 on no other page (P027)
- [ ] Hero H1, subhead and [Book Now] fully visible above the sticky bar at 360×640 (fold law, `08` §4.6)

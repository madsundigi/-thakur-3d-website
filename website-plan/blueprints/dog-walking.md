# B04 · DOG WALKING — `/ludhiana/dog-walking/`

> Page blueprint. Inherits `_TEMPLATE-service-page.md` (block order, rules, defaults); this file supplies this page's
> values. Obeys `00-MASTER-PLAN.md` (walk plans §3.2, walk hours §3.1); keywords from `03-KEYWORD-MAP.md` §2.4.
> **SEO note:** nobody in Ludhiana publishes dog-walking rates — printing ours wins the price queries outright.

| URL | Wave | Template | Schema `@graph` | Status |
|---|---|---|---|---|
| `/ludhiana/dog-walking/` | 1 | T1 — all 14 blocks (SP-3 = ✓-lists, SP-4 = flat list, SP-5 = proof-photo row) | Service + FAQPage + BreadcrumbList | built (w1-walk, 2026-10-03) — pending the integrator's route flip |

## 1 · Head

- **Title** (51): `Dog Walker in Ludhiana – ₹2,999/Month | PetDoorStep`
- **Meta** (148): `Background-verified, fixed daily dog walker in Ludhiana. ₹2,999/month (1 walk/day), GPS + photo after every walk. Trial week ₹699. Book on WhatsApp.`
- **H1:** `Dog Walker in Ludhiana` (primary keyword in the first 4 words — P026). Fold-law cut, 2026-10-03: the earlier
  "— Daily Walks from ₹2,999/month" tail set the H1 in 4 lines at 360 px and pushed the hero photo 62–70 px under the sticky
  bar (`decisions/f2-components.md` S-2, `decisions/w1-layout.md` §1 agreed copy, `00` §11 E3); the monthly price stays in
  the title, the meta, the SP-1 chips and SP-4. `03` §3 and `06` §2.3 still show the long form — sync requested
  (`requests/w1-walk.md`).

## 2 · Keyword → block assignment

| Keyword (03 §2.4) | Role | Lands in |
|---|---|---|
| dog walker ludhiana | P | Title · H1 · SP-1 subhead |
| dog walking ludhiana | S | Breadcrumb label "Dog Walking" · SP-3 lead-in |
| verified / trusted dog walker ludhiana | S | SP-7 H2 **"Background-verified, fixed walker"** |
| dog walking charges ludhiana / monthly cost | S | SP-4 H2 **"Dog walking charges in Ludhiana — fixed monthly plans"** |
| dog walking service near me ludhiana · dog walker near me | S | SP-9 intro line |
| gps tracked dog walking / photo update after walk | L | SP-3 H2 **"What every walk includes"** |
| dog walking trial ludhiana | L | SP-1 primary CTA + SP-12 |
| morning evening dog walker · daily dog walking | L | SP-4 H3 walk-window table |
| is the same walker fixed · summer timings | L | FAQ #2 · #4 |
| dog walker ka rate / walking wala chahiye (Hinglish) | L | FAQ #8 (single combined use) |

### 2.1 · SERP intent check (`02` P040) — 2026-10-03

Checked before building, for the primary keyword **"dog walker ludhiana"**, plus the secondary "dog walking charges
ludhiana monthly". Tool: the build session's web search. It uses a US-based index, not google.co.in on a Ludhiana phone,
and it cannot show the map pack — so repeat the check on a phone in Ludhiana during the launch audit (`02` §5).

- **What ranks:**
  - **Marketplace listing pages.** PetBacker, "Top Dog Walking in Ludhiana with Best Prices"
    (petbacker.in/s/dog-walking/ludhiana--punjab--india, with a .com mirror "Top Ludhiana Dog Walking Prices & Reviews"):
    39 individual walker listings, each with its own ask, "vetted" walkers, insurance wording. PetBacker's Ludhiana
    dog-sitter and daycare pages rank beside it.
  - **Directories.** JustDial's "Top Dog Walking Services in Ludhiana" category page — kennels, a dog hostel and pet shops
    (Civil Lines, New Model Town) listed under dog walking — and myfurries.com's Ludhiana dog-trainers list.
  - **Out-of-city service pages.** Sploot's Delhi dog-walking page and dogsathi.in (national): the single-provider
    service-page format, but none of them for Ludhiana.
  - **The secondary query** returns no Ludhiana result at all — UK, US and South African rate pages and generic
    "average cost of a dog walker" articles. Nobody publishes a Ludhiana monthly rate; the `03` §2.4 finding stands.
  - Competitor figures are not used on this page (`06` §5.6: snippet-mined prices never go in hero, table, schema or FAQ).
- **Intent:** buyer. People want a trusted walker nearby and a price before they message; what ranks are listing pages
  where the walker, the price and the trust signals change from listing to listing.
- **How this page matches:** a single-provider service page for Ludhiana — the format Sploot holds in Delhi and nobody
  holds here — carrying what a marketplace cannot promise: one fixed, verified walker, a printed monthly price and a
  ₹699 trial.
  - The query sits in the title, the H1 and the SP-1 subhead (§1, §3).
  - SP-4 prints the three plans as a flat price list with Book links, so the "charges / monthly cost" queries are
    answered on the page; SP-3 lists what every walk includes.
  - SP-7 names the verification; FAQ #1, #2 and #3 answer cost, "same walker every day?" and safety answer-first.
  - Service markup carries the three plan Offers and FAQPage the eight Q&As (§4).

## 3 · Block values

- **SP-1 Hero** (`06` §2.3): eyebrow *Daily dog walking* · subhead "The same fixed, verified walker every day, with GPS route and photo update after every walk. Try a full week for ₹699 before you commit." · CTAs [Start ₹699 Trial Week] → the booking form `/book/?service=dog-walking&src=hero_dog-walking`, which preselects Trial Week, the widget's default dog-walking plan (`00` §11 D2, 2026-10-03; `07` §2 row 3 — not a wa.me link) + [Call [FILL:PHONE]] (hidden below `md`, `08` §4.6) · chips `₹699 trial week` + `✔ Fixed verified walker` · `✔ GPS + photo after every walk` · `✔ Fixed monthly price` · `✔ Background-verified`.
- **SP-3 Plans (✓-lists)** — H2 "What every walk includes"; lead-in: "Dog walking in Ludhiana, done like a routine your dog can trust."
  - **1 walk/day — ₹2,999/month:** ✓ ~30-minute walk every day ✓ the same fixed walker ✓ GPS route shared after the walk ✓ photo update + short walk note (pee/poop/water/mood) on WhatsApp ✓ water carried on every walk
  - **2 walks/day — ₹4,999/month:** ✓ everything above, morning **and** evening (~30 min each)
  - **Trial Week — ₹699:** ✓ meet-and-greet with your walker first ✓ 7 walks (1/day, ~30 min) ✓ full updates — no commitment after
  - **H3 "Every walk, the same rules":** leash on at all times (double-clip lead, never off-leash near roads) · 5-second back-of-hand tarmac test before setting off · routes planned around known stray hotspots · towel-dry paws and belly after rain · walker never leaves your dog unattended.
- **SP-4 Prices** — H2 per §2; flat list: `1 walk/day ₹2,999/month · 2 walks/day ₹4,999/month · Trial Week ₹699 (7 walks)` + R1 + R2 adapted: "Monthly plans are paid at month-end by UPI or cash — no advance." (content.ts `WALK_PAYMENT_LINE` — the one wording shared with `/pricing/` PR-6 and FAQ #1; this line read "at the end of each month" until 2026-10-03, synced to the registry — W1W-03). Then **H3 "Ludhiana walk windows by season"** (walk hours `00-MASTER-PLAN.md` §3.1):

  | Months | Walk windows | Why |
  |---|---|---|
  | Apr–Jun | Before 8:00 or after 19:00 only | 38–45°C days; midday tarmac burns paws, heatstroke risk |
  | Jul–Sep | 6:00–9:30 · 17:30–20:30, shortened between showers | Monsoon: paws and belly towel-dried after every walk (fungal risk) |
  | Oct–Mar | 6:00–9:30 · 17:30–20:30 | Comfortable months; full-length walks |
  | Dec–Jan fog days | Morning walks move later (8:00–9:30) | Visibility and road safety |
- **SP-5 → proof-photo row** — H2 **"Real walk updates"**: 3–4 consented update photos captioned `{Pet} · {Breed} · morning walk · {Area}`; omitted until real photos exist.
- **SP-7** — H2 **"Background-verified, fixed walker"** + line "Every walker is ID- and reference-checked, trained in leash handling and heat safety, and meets your dog before the first walk." Cards titled "Meet your walkers" (`[FILL:WALKER_1_NAME]` etc.).
- **SP-9 Areas** — Dugri · South City · Pakhowal Road; intro "Searching for a dog walking service near me in Ludhiana? Our walkers know these neighbourhoods best:"
- **SP-11 Related** — Dog Grooming (`from ₹599`) · Vet at Home (`₹699`). Blog links (once live): week-6 *How Much Does a Dog Walker Cost Per Month in India?* → `/blog/dog-walker-cost-india/` · week-20 *Dog Walking in Ludhiana Summers* → `/blog/dog-walking-summer-timings-ludhiana/`.
- **SP-12** — "Your Labrador deserves a daily walk with a familiar face. Trial Week slots open this week across Ludhiana." Support: "₹699 for 7 walks · then ₹2,999/month · no advance payment."
- **SP-13** — sticky label `Book trial · ₹699` (shortened 2026-10-03: the longer label wrapped to two lines in the 360 px sticky bar).

## 4 · FAQ (SP-10 — 8 Q&As, mirrored in FAQPage markup)

1. **How much does a dog walker cost in Ludhiana?** — ₹2,999 a month for one ~30-minute walk a day, or ₹4,999 a month for two (morning and evening). Not sure yet? Start with a 7-walk Trial Week for ₹699. Prices are fixed, there's no travel charge in Ludhiana, and monthly plans are paid at month-end by UPI or cash — no advance.
2. **Will the same walker come every day?** — Yes. You get one assigned walker so your dog builds trust and routine, plus a verified backup walker introduced in advance for leave days. Dogs walk better, pull less and relax faster with a familiar person.
3. **How do I know my dog is safe with your walker?** — Every walker is background-verified (ID and references checked) and trained in leash handling and heat safety. Dogs stay on a double-clip lead, never off-leash near roads, and you get the GPS route plus a photo and short note after every walk. You meet your walker before the first walk.
4. **What times do you walk dogs in Ludhiana's summer?** — From April to June we walk only before 8:00 or after 19:00 — midday tarmac can burn paws and heatstroke is a real risk. Walkers carry water on every walk and do the 5-second back-of-hand tarmac test before setting off.
5. **Do you walk reactive or anxious dogs?** — We meet every dog before the first walk. Mildly reactive or nervous dogs are fine — walkers keep distance from strays and triggers. If a dog is strongly aggressive, we'll tell you honestly that a trainer should come first, rather than risk your dog or anyone else.
6. **What happens when it rains or there's heavy fog?** — In monsoon rain we shorten the walk or shift the slot, and the walker towel-dries paws and belly afterwards. On dense winter-fog mornings we move the walk later for visibility and road safety. You're told on WhatsApp before any change.
7. **Can I book just one walk?** — Not yet — in Phase 1 we offer monthly plans and the 7-walk Trial Week (₹699), which is the best way to try us. One-off walks are on our roadmap; ask to join the waitlist on WhatsApp.
8. **Dog walker ka rate kya hai? Roz same walker aayega?** — ₹2,999 mahine ka (roz 1 walk) ya ₹4,999 (roz 2 walks). Haan — roz wahi verified walker aata hai, aur har walk ke baad photo aur GPS route WhatsApp pe milta hai. Pehle ₹699 ka Trial Week try karein.

## 5 · Images

| Slot | Shot | Alt text |
|---|---|---|
| Hero | Walker with a Beagle on a leash in a neighbourhood park (`08` §5.2 shot 9, `dog-walker-beagle-park-ludhiana.jpg`) | Beagle on a leash walk with a PetDoorStep dog walker in a neighbourhood park in Ludhiana |
| SP-3 | Phone showing a real walk update (route + photo) | WhatsApp walk update with GPS route and photo from a dog walker in Ludhiana |
| SP-5 | Real update photos (data file) | {Breed} on a morning walk in {Area}, Ludhiana |

## 6 · Page-specific ship checks

- [ ] Walk windows match `00-MASTER-PLAN.md` §3.1 exactly (heat rule Apr–Jun)
- [ ] No promise of single walks; FAQ #7 wording honest
- [ ] Payment line says month-end, no advance — consistent with `/pricing/` and `/offers/`
- [ ] One Hinglish use only (FAQ #8)

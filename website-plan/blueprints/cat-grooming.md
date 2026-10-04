# B03 · CAT GROOMING — `/ludhiana/cat-grooming/`

> Page blueprint. Inherits `_TEMPLATE-service-page.md` (block order, rules, defaults); this file supplies this page's
> values. Obeys `00-MASTER-PLAN.md`; keywords from `03-KEYWORD-MAP.md` §2.3.
> **SEO note:** research found **no dedicated Ludhiana cat-grooming page anywhere** — the easiest #1 on the site. Depth wins it.

| URL | Wave | Template | Schema `@graph` | Status |
|---|---|---|---|---|
| `/ludhiana/cat-grooming/` | 1 | T1 — all 14 blocks | Service + FAQPage + BreadcrumbList | built (w1-cat, 2026-10-04) — pending the integrator's route flip |

## 1 · Head

- **Title** (58): `Cat Grooming at Home in Ludhiana – From ₹899 | PetDoorStep`
- **Meta** (156): `Stress-free cat grooming at home in Ludhiana — no scary salon trips. Bath & Brush ₹899, Full Groom ₹1,399. Calm-handling trained groomers. Book on WhatsApp.`
- **H1:** `Cat Grooming at Home in Ludhiana`

## 1a · SERP intent check (`02` P040) — 2026-10-03

Checked before the page was built, for the primary keyword in `01-SITEMAP.md` §1, **"cat grooming at home ludhiana"**,
plus `03` §2.3's primary **"cat grooming ludhiana"**. Tool: the build session's web search (a standard and an extended
pass per query). It uses a US-based index, not google.co.in on a Ludhiana phone, and it cannot show the map pack or ads —
repeat the check on a phone in Ludhiana during the launch audit (`02` §5) and log it in the `09` §7 rank log.

- **What ranks for "cat grooming at home ludhiana" (extended pass, in the order returned):**
  1. thePetNest — "Pet Grooming Service at Home in Ludhiana" (dog-and-cat city-template service page,
     thepetnest.com/pet-grooming/ludhiana); its snippet prices cat bath + basic grooming "starting at ₹899" (market
     price mined from SERP snippets 2026-10; re-verify before publishing — it stays off the page, template §0 rule 5).
     Its national thepetnest.com/pet-grooming page ranks beside it.
  2. Urban Pets Grooming — "Pet Grooming In Ludhiana" (city-template service page, urbanpetsgrooming.in).
  3. Petgroomly — "Pet grooming services at Home in Ludhiana" (city-template service page, petgroomly.com).
  4. Petofy — "List of Pet Grooming Service Centre in Ludhiana" (directory).
  5. Pupping — "Premium Pet Grooming, Ludhiana" (one local groomer's home page, pupping.in).
  6. Pupkitt — "5 Best Pet Grooming Service Providers In Ludhiana" (listicle).
  7. Other cities fill the rest of the page: Woofly "Dog & Cat Grooming at Home in Delhi", thePetNest Lucknow.
- **The standard pass** for the same query returned no Ludhiana result at all — generic "cat grooming at home" tips
  and UK mobile-cat-grooming listings. **"cat grooming ludhiana"** returned an ownpetz.com Ludhiana grooming
  classifieds category with no active listings, a Salonist directory page for Moga, Vetic's Noida cat-grooming page
  and its cat-grooming blog tag.
- **Finding:** no dedicated Ludhiana cat-grooming page exists. Every Ludhiana result is a dog-first pet-grooming city
  template that mentions cats in passing, a directory or a listicle; the only dedicated cat-grooming pages that rank
  belong to other cities (Vetic Noida, Woofly Delhi). This confirms the header note above.
- **Intent:** buyer. Local service pages rank, not articles, with packages and prices in the snippets. **The page
  matches that format:** one city, one service, the flat prices in the hero, SP-3 and SP-4, the inclusions as a real
  table, and the FAQ carrying the research long-tails ("why do cats hate salons", the Persian schedule) that today
  return only national blogs.

## 2 · Keyword → block assignment

| Keyword (03 §2.3) | Role | Lands in |
|---|---|---|
| cat grooming ludhiana | P | Title · H1 · SP-1 subhead |
| cat grooming at home ludhiana | S | Title (contained) · SP-1 eyebrow *Cat grooming at home* |
| cat bathing service at home | S | SP-3 H2: **"Cat Bath & Brush — ₹899, everything included"** |
| cat groomer ludhiana | S | SP-7 supporting line |
| cat grooming near me | S | SP-9 intro line |
| why do cats hate salons / stress-free cat grooming | L | SP-7 H2 **"Why home beats the salon for cats"** (§3) |
| persian cat grooming at home | L | SP-4 H3 **"Persian & long-hair coat care"** (§3) |
| cat grooming price / charges ludhiana | L | SP-4 H2: **"Cat grooming price in Ludhiana — one flat price"** |
| cat matted fur removal · cat nail clipping | L | SP-3 rows · FAQ #3 |
| flea treatment for cats at home | L | FAQ #5 → `/ludhiana/tick-flea-treatment/` |
| how often should a persian cat be groomed | L | FAQ #4 → week-16 blog post |
| billi ko nehlana (Hinglish) | L | FAQ #8 + cat-bath photo alt |

## 3 · Block values

- **SP-1 Hero** (`06-CONVERSION-PLAYBOOK.md` §2.3): eyebrow *Cat grooming at home* · H1 above · subhead "Calm-handling trained groomers for your cat — no car ride, no strange salon smells. Bath & Brush ₹899 · Full Groom ₹1,399, flat price for all cats." · CTAs [Book on WhatsApp] → `/book/?src=hero_cat-grooming` (`00` §11 E1; amber, `08` §1.4) + [Call [FILL:PHONE]] · chips `from ₹899` + standard set with chip 4 swapped to `✔ Calm-handling trained for cats`.
- **SP-3 Package table** (inclusions from `00-MASTER-PLAN.md` §3.2 cat row):

  | Included | Cat Bath & Brush ₹899 | Cat Full Groom ₹1,399 |
  |---|---|---|
  | Lukewarm bath, cat-safe shampoo | ✓ | ✓ |
  | Gentle towel + blow-dry | ✓ | ✓ |
  | Brush-out & loose-coat removal | ✓ | ✓ |
  | Nail trim | ✓ | ✓ |
  | Ear & eye (tear-stain) clean | ✓ | ✓ |
  | De-matting | — | ✓ |
  | Hygiene trim | — | ✓ |
  | Comfort trim (Persians, on request) | — | ✓ |
  | Typical duration | ~45–60 min | ~60–90 min |

  Footnotes: template (a) + "Tight mats close to the skin are clipped, never pulled — we show you before we start."
- **SP-4 Prices** — flat-price list (no size matrix): `Cat Bath & Brush ₹899 · Cat Full Groom ₹1,399 — any breed, any coat` · `Flea treatment add-on ₹399 (cat-safe products)` · `Nail Trim + Ear Clean visit ₹299`. R1 + R2 beneath. Then **H3 "Persian & long-hair coat care"**:

  | Cat | At home, daily | With us | Rhythm |
  |---|---|---|---|
  | Persian / Himalayan | 5-minute comb, face & eye wipe | Full Groom (de-mat + comfort trim in summer) | every 4–8 weeks |
  | Long-haired mixed breed | 3–4 combs a week | Bath & Brush, Full Groom if mats form | every 6–8 weeks |
  | Short-haired & Indie cats | Weekly brush | Bath & Brush or just nails + ears (₹299 visit) | every 6–8 weeks |
- **SP-5** — Persian before/after pairs when ≥ 2 exist; else omitted (template rule).
- **SP-7** — H2 **"Why home beats the salon for cats"**, then 3 points before the groomer cards:
  1. "**No carrier, no car.** For most cats the journey is the worst part of grooming — at home it doesn't exist."
  2. "**No dog smells, no barking.** Your cat stays in its own territory, which keeps stress (and scratches) down."
  3. "**One groomer, your room, breaks allowed.** We pause whenever your cat needs to — nobody is waiting for the table."
  Supporting line: "Your cat groomer in Ludhiana is calm-handling trained and background-verified." Cards show cat specialities (e.g. "Persian cat de-matting").
- **SP-9 Areas** — Civil Lines · Kitchlu Nagar · Sarabha Nagar; intro "Looking for cat grooming near me? We visit homes across Ludhiana — these areas book cat grooming most:"
- **SP-11 Related** — Dog Grooming (`from ₹599`) · Tick & Flea Treatment (`₹699 · ₹399 add-on`). Blog link (once live): week-16 *How Often Should a Persian Cat Be Groomed in India?* → `/blog/persian-cat-grooming-schedule-india/`.
- **SP-12** — "Your Persian deserves a calm, stress-free groom at home. Slots this week across Ludhiana." Support: "Flat ₹899 · no advance payment · photo update after the groom."
- **SP-13** — sticky label `Book · from ₹899`.

## 4 · FAQ (SP-10 — 8 Q&As, mirrored verbatim in FAQPage markup)

1. **How much does cat grooming at home cost in Ludhiana?** — One flat price for every cat, any breed or coat: Bath & Brush ₹899, Full Groom ₹1,399. There's no travel charge in Ludhiana and no advance payment — pay by UPI or cash after the session. The price is confirmed on WhatsApp before we arrive.
2. **How do you groom a cat that hates being handled?** — At home most cats are far calmer — no carrier, no car, no dog smells. Our groomers use low-stress handling: nails first, a gentle towel-wrap hold and short breaks, with you nearby. We never sedate. If your cat is too stressed to continue safely, we stop rather than force it.
3. **My Persian has hard mats — can you remove them without shaving?** — Small mats can be worked out with de-matting tools during a Full Groom. Tight mats close to the skin are painful to comb out, so they're clipped — never pulled, which can tear skin. We show you the mats before starting and leave you a 5-minute daily combing routine so they don't return.
4. **How often should a Persian cat be groomed?** — A Persian needs a 5-minute comb every day at home and a professional groom every 4–8 weeks, with a bath as part of that groom. Short-haired and Indie cats need far less: a brush-out, nail trim and ear check every 6–8 weeks keeps them comfortable.
5. **Can you treat my cat for fleas?** — Yes, with cat-safe products only. Many dog anti-tick products contain permethrin, which is toxic to cats, so we never use them on cats. Add flea treatment to any groom for ₹399 or book it standalone for ₹699; for skin wounds or heavy infestations we'll suggest a ₹699 vet home visit.
6. **Is it hygienic if you groomed a dog before my cat?** — Yes. Every pet gets a fresh, sealed, sanitised kit opened in front of you — blades, combs and towels never move from one pet to another — and cats get cat-only shampoo. Your groomer is background-verified, and our full protocol is published on the safety page.
7. **How long does a cat groom take?** — Bath & Brush takes about 45–60 minutes and a Full Groom 60–90 minutes. We build in breaks whenever your cat needs one, so we never rush — calm beats quick with cats.
8. **Billi ko ghar pe nehlana hai — kaise book karein?** — Bilkul! Book on WhatsApp in under 2 minutes: choose Cat Grooming, pick your area and a time window, and we confirm the exact slot within 10 minutes (9:00–19:00). Flat ₹899 for Bath & Brush — pay by UPI or cash after the groom.

In-answer links: #4 → week-16 post (once live) · #5 → `/ludhiana/tick-flea-treatment/` + `/ludhiana/vet-at-home/` · #6 → `/safety-hygiene/`.

## 5 · Images

| Slot | Shot | Alt text |
|---|---|---|
| Hero | Calm-handling cat groom, the cat sitting on a towel at home (`08` §5.2 shot 5, `cat-grooming-at-home-ludhiana.jpg`) | Cat sitting calmly on a towel during cat grooming at home in Ludhiana (name the breed, e.g. Persian, once the photo shows it) |
| SP-3 | Cat in a shallow lukewarm bath, groomer's hands steadying it | billi ko nehlana — gentle cat bath at home in Ludhiana |
| SP-5 | Persian before/after (data file) | Persian cat before/after full groom at home in {Area}, Ludhiana |

## 6 · Page-specific ship checks

- [ ] Permethrin warning present in FAQ #5 (cat safety — non-negotiable)
- [ ] Every price is a flat cat price; no size matrix rendered on this page
- [ ] Exactly 2 Hinglish uses (FAQ #8 + SP-3 alt)

## 7 · As built (stage w1-cat, 2026-10-04 — `src/pages/ludhiana/cat-grooming.astro` on `src/layouts/ServicePage.astro`)

Where this blueprint and the template are silent, this is what was built; decisions in `decisions/w1-cat.md`, needs in
other owners' files in `requests/w1-cat.md`.

- **Head:** title 58 / meta 156 / H1 verbatim (§1); canonical + og:url the self URL; og:image `/og/cat-grooming.jpg`
  (alt "PetDoorStep — cat grooming at your home in Ludhiana, from ₹899"); JSON-LD one `@graph` = Service (name = the H1,
  serviceType "Cat grooming at home", **2 flat Offers**: Cat Bath & Brush 899 · Cat Full Groom 1399 — the `04` §2.2 cat row,
  `00` §11 E8) + FAQPage (cat-grooming-1…8) + BreadcrumbList (3 items). ≈ 900 words in `<main>` (P044 floor 800).
- **SP-0:** `Home › Ludhiana › Cat Grooming at Home` — "Ludhiana" is text until `/ludhiana/` ships; all three schema item URLs.
- **SP-1:** eyebrow *Cat grooming at home* (hidden below `md`); [Book on WhatsApp] → `/book/?src=hero_cat-grooming` (amber,
  E1), [Call [FILL:PHONE]] → `tel:` (hidden below `md`); chips `from ₹899` · Background-verified groomers · Sealed sanitised
  kit per pet · Fixed prices — no doorstep bargaining · Calm-handling trained for cats (`MONEY_PAGES`); photo
  `cat-grooming-at-home-ludhiana.jpg` (eager, `fetchpriority="high"`, preloaded) with the §5 alt; R3 under the CTAs.
  **Fold at 360×640, measured on the built page:** H1 bottom 175.7 · subhead 293.2 · primary 353.2 · price chip 16–97.6
  and first trust chip 105.6–335.2 (both whole, the fade starts at 344) · photo top 405.2 → +160 = 565.2 against the
  sticky bar at 583 — **17.8 px spare**, no horizontal overflow (scrollWidth 360). No P150 exception needed.
- **SP-2:** proof line → `[FILL:GBP_LINK]`; the E6 empty state until 3 real reviews exist (`reviews.ts`); the E4 row =
  `Book Cat Grooming — from ₹899` → `/book/?service=cat-grooming&src=service_cat-grooming` with R2 beside it.
- **SP-3:** H2 = the §2 line "Cat Bath & Brush — ₹899, everything included"; no lead-in (§3 gives none, the template formula
  has none); grid = `PACKAGE_TABLES['cat-grooming']` verbatim (2 package columns, 8 inclusion rows, the duration row,
  footnote (a) + the matting line); then the §5 cat-bath photo `cat-bath-home-ludhiana.jpg`, alt "billi ko nehlana — gentle
  cat bath at home in Ludhiana" (Hinglish use 2 of 2). From `lg` the photo sits beside the grid (7fr/5fr: table 644 px,
  photo 460 px at 1280); below `lg` it follows the grid (capped at 480 px), so the inclusions are never pushed a screen down.
  At 360 the grid is 408 px in a 328 px column: it scrolls 80 px behind the edge fade with the sticky Included column
  (InfoTable, W1L-20 floors) — both package headings stay verbatim (W1C-5).
- **SP-4:** the flat-price list (`lines: 'cat-grooming'`, PriceMatrix `<dl>`): Cat Bath & Brush ₹899 [Book] · Cat Full
  Groom ₹1,399 "any breed, any coat" [Book] · Flea treatment add-on ₹399 "(cat-safe products)" (no Book — an add-on is
  booked with a groom; it links `/ludhiana/tick-flea-treatment/` only once that page is live, requests B-2) · Nail Trim +
  Ear Clean visit ₹299 [Book] → R1 + R2 → mid-page CTA `Book Cat Grooming — from ₹899` → "Compare every service on the
  full price list" → `/pricing/` → H3 "Persian & long-hair coat care" (3 rows verbatim, `wide` table: 640 px minimum,
  scrolls sideways below `md` with the sticky Cat column; "(₹299 visit)" from `flatPrice('nail-ear')`). No size matrix.
- **SP-5:** omitted (no consented pairs yet); renders itself from `reviews.ts` at ≥ 2 cat pairs.
- **SP-6:** the 4 steps + R4 + "See the full process" → `/how-it-works/`.
- **SP-7:** H2 "Why home beats the salon for cats" → the 3 points (numbered discs, an `<ol>`) → the supporting line → "How
  we hire" → `/about/`. No cards until a groomer is hired (people.ts honesty law); the cat specialities then come from
  `specialityOn['cat-grooming']` (requests B-1).
- **SP-8:** 4 points (the on-time point waits for the §3.4 policy gate).
- **SP-9:** the §3 intro, 3 AreaCards "Cat grooming at home in Civil Lines / Kitchlu Nagar / Sarabha Nagar" (text until
  the area pages ship), then "…and BRS Nagar, Model Town, Dugri, Pakhowal Road, South City, Ferozepur Road, Haibowal
  Kalan — all of Ludhiana served." (the 7 areas not carded).
- **SP-10:** H2 "Cat grooming at home — your questions" (template pattern; §4 names none); the 8 Q&As verbatim, FAQPage
  mirrors them. Answer links render only while live: #5 → `/ludhiana/vet-at-home/` now; `/ludhiana/tick-flea-treatment/`
  (#5), `/safety-hygiene/` (#6) and the week-16 post (#4) stay text until Wave 2 / the post ships.
- **SP-11:** Dog Grooming at Home (`from ₹599`, linked) · Tick & Flea Treatment (`₹699 · ₹399 add-on`, "Coming soon", no
  link); the week-16 post link appears once live; "Last updated" once `lastmod.ts` has the path.
- **SP-12:** H2 = the §3 line verbatim (it adds "calm," to R8, so not `r8()`), support "Flat ₹899 · no advance payment ·
  photo update after the groom.", [Book on WhatsApp] (wa.me, prefill "Hi PetDoorStep! I want to book cat grooming (from
  your Cat Grooming at Home page). My area: ___ . My cat: ___") + [Call [FILL:PHONE]], source `ctaband_cat-grooming`, R3.
- **SP-13:** sticky `Call | WhatsApp | Book · from ₹899` (→ `/book/?service=cat-grooming&src=sticky_bar`); desktop float
  with the page prefill.
- **Ship checks (§6):** permethrin warning in FAQ #5 ✓ · every price a flat cat price, no size matrix rendered ✓ · exactly 2
  Hinglish uses (FAQ #8 + the SP-3 alt; the hero alt is English per E5) ✓. Gates (`PUBLIC_PDS_PREVIEW_LIVE=wave1`):
  `check:pages` 0 FAIL · 2 WARN (P074 links to `/ludhiana/dog-walking/` and `/ludhiana/vet-at-home/`, built by other stages) ·
  `check:budgets` 0 · 0 (CSS 50,423 B of 51,200) · `check:prices` OK · `test:site` 0 FAIL · 1 WARN (P099: the LCP is the H1
  while the hero is a placeholder) — 360 / 768 / 1280: no overflow, no console errors, axe clean, JSON-LD parses, CLS 0.000,
  fold ok at 360×640, 11 tracked links each logged with its `data-source`.

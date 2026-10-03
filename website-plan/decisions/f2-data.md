# Decisions — stage f2-data (Wave 1, shared data)

Branch `wave1/f2-data`. Files: `website/src/data/{services.ts (new), content.ts, offers.ts, site.ts, people.ts,
reviews.ts, routes.ts, faq.json}`, `website/src/lib/{pricing.ts, schema.ts, faq.ts}`.

Rule order applied: 02 [Launch-blocker] > page blueprint > 00 §11 > 06/07/08/04/09. Owner decisions D1–D4 and
engineering decisions E1–E12 were implemented as given, not re-opened. Every row below names the doc that has to be
synced ("Loses / sync"). Every string under **Copy written** is new copy, not in any doc yet.

## 1 · Decisions

| # | What | Why | Loses / sync |
|---|---|---|---|
| F2-01 | `MONEY_PAGES[path].heroChips` is `{ price, trust }`, not a flat list | Maps 1:1 onto `Hero.astro`'s `priceChip` + `trustChips` props. Price = `heroPriceChip(slug)`; trust = 06 §2.1 set or the page's 06 §2.3 override. Strings carry no ✔ (Chip.astro draws it) | — |
| F2-02 | `preselect`: dog-grooming `null`; cat `cat-grooming`; walking `dog-walking` (D2); vet `vet-visit`; vaccination `vaccination`; tick `tick-flea`; puppy `puppy-intro` | Dog grooming sells 3 equal packages. The template SP-4 worked CTA "Book Dog Grooming — from ₹599" is the page's lowest price, which under E2 means nothing is preselected | — |
| F2-03 | `serviceIds` are the page's own packages only (dog page: `bath-brush`, `full-groom`, `premium-spa`; not the à-la-carte nail/tick mentions) | Otherwise E2's "page's lowest price" becomes ₹299 and contradicts the template's "from ₹599" | — |
| F2-04 | Mid-page CTA source for a page with no preselect = `service_dog-grooming` (the page slug stands in for `<id>`); href `/book/?src=service_dog-grooming` | 07 §2 row 4 / 09 §2d write `service_<id>`, which needs a single pricing id. The page slug keeps the value unique per entry point | 07 §2 row 4, 09 §2d (note the slug form) |
| F2-05 | CTA label = `Book <name> — <price>`. Name = the preselected service's pricing.json label, so it matches the widget card the visitor lands on. With no preselect the name is "Dog Grooming". Price is "from …" only when the service has several prices: by-size → `from ₹599`, plans → the widget card chip (`from ₹899`, `from ₹699 (trial week)`), flat → exact (`₹699`), "+ MRP" fee → `₹699 + MRP` | E2 (R1 honesty) + 06 §5.1 ("never 'starting at' unless the price genuinely varies"): "from ₹199" would hide the vaccine MRP, and "from ₹699" for Tick & Flea is false, since the add-on costs ₹399 | 07 §2 row 4 pattern "Book <Service> — from ₹<from-price>" (kept verbatim on dog + cat) |
| F2-06 | Card photos follow the 08 §5.2 shot list (E5). Shot 13 `puppy-first-groom-at-home-ludhiana.jpg` = the puppy-grooming.md §5 hero shot (groomer on the floor with a Shih Tzu puppy, treat in hand). Shot 14 `dog-tick-check-at-home-ludhiana.jpg` = groomer doing a full-body tick check on an Indie dog at home (Indie = the tick page's breed). The vaccination card reuses shot 10, which 08 §5.2 already names for both vet heroes; its alt leads with the cold box, which is in the shot | E5. The home.md §5 H-3 alt formula "{Service} at home in Ludhiana" is kept as the tail of the alts where it reads true | 08 §5.2 rows 13–14, home.md §5 H-3 alt row, `src/assets/photos/README.md` |
| F2-07 | OG: own image for dog/cat/walking/vet (04 §4 list); vaccination, tick and puppy use `petdoorstep-home.jpg`. The alts follow the 04 §4 example "PetDoorStep — dog grooming at your home in Ludhiana, from ₹599". Walking and vet are adapted (walks are not "at your home") | 04 §4 | 04 §4 (alt per image; the image text must print the same words) |
| F2-08 | `PACKAGE_TABLES['dog-grooming']` is ONE table for the dog page SP-3 and /pricing/ PR-4 ("same component, same wording"). It carries both page notes: column label "Premium Spa (dog spa at home)" (dog-grooming.md §2) and the Full Groom note "full body dog grooming — haircut, styling, paw & sanitary trim" (pricing.md PR-4). Columns follow the `MATRIX_COLUMNS` order and ids, so the "Most booked" badge comes from `requireService(serviceId).badge` | pricing.md PR-4 | dog-grooming.md §3 SP-3, pricing.md PR-4 (both notes on both pages) |
| F2-09 | "Typical duration" is a separate `durations` array plus the `PACKAGE_DURATION_LABEL` constant, not a row | Contract C1 shape. The label is template SP-3 wording | — |
| F2-10 | No `PACKAGE_TABLES['puppy-grooming']` | puppy-grooming.md SP-3 is a single-package ✓-list, not a ✓-grid (its header row says so) | — |
| F2-11 | Dog-grooming Service Offer names are built from the grid: "{column label} — {what it includes}", e.g. "Full Groom — Bath & Brush plus haircut & styling, paw & sanitary trim", "Premium Spa (dog spa at home) — Full Groom plus de-shed / de-mat, conditioning masque, perfume finish" | Template SP-3: inclusion names echo the Offer names, wording identical. Task: names consistent with the grid columns | 04 §2.2 worked offer names (area variant shares them) |
| F2-12 | /pricing/ OfferCatalog (E6): one Offer per visible price, named as the page labels it, in page order. Bath & Brush · Full Groom · Premium Spa (min–max by size; description = sizes + the grid's inclusions) · Cat Bath & Brush · Cat Full Groom · Puppy Intro Groom (8 weeks–6 months) · Nail Trim + Ear Clean visit · Tick & Flea add-on · Tick & Flea standalone · 1 walk/day · 2 walks/day · Trial Week (7 walks) · Vet visit · Vaccination · Deworming · Groom Club. Built from `matrixColumns()` + `priceLineOffers()` (the lines the page renders) | pricing.md §5 wins over 04 §2.5 (E6). "+ MRP" fees carry the fee only. The visible price text ("₹699 + medicines at MRP", "₹2,999/month") or the line note goes in `description` | 04 §2.5 |
| F2-13 | Tick & Flea is worded once: `TICK_FLEA_LINE` / `tickFleaLine()` in pricing.ts. Visible line "Tick & Flea · add-on ₹399 / standalone ₹699"; Offers "Tick & Flea add-on" (399) and "Tick & Flea standalone" (699) | Task: visible wording and the two offer names must match | 04 §2.5 |
| F2-14 | Groom Club Offer is named "Groom Club" (the label on both /pricing/ and /offers/). Description = the pricing.json benefit + the club prices (Small ₹1,019 · Medium ₹1,274 · Large ₹1,614), all computed | "Groom Club monthly subscription" appears on no page. The club prices are visible in the PR-8 and OF-4 maths tables | 04 §2.5 last row |
| F2-15 | Promise: `promisePoints[].body` = 06 §4.1 prose verbatim. The point 4 label and body use `inr(ON_TIME_OFF)` (`ON_TIME_OFF = 100` in offers.ts), still gated by `policy.onTimeOr100Off` | Task; 07 §4 (no typed ₹) | scripts/check-prices.mjs exemption is now unused (see requests) |
| F2-16 | `GROOM_CLUB_PITCH.title` = "Groom Club — your pet's standing appointment" (no period: it is the OF-4 H2). Body = 06 §7.3 verbatim, every figure computed. Added `GROOM_CLUB_HEADLINE` = "Groom Club — 15% off every monthly Full Groom" (pricing PR-8 H2 + home H-10 tile), so 15% comes from pricing.json | One source for the % | — |
| F2-17 | `groomClubWaText(size)` = offers.md OF-4 prefill with the size lower-cased ("…for my medium dog."). The size-less wording for the single /pricing/ PR-8 button asks for the size | offers.md OF-4 | pricing.md PR-8 (button prefill) |
| F2-18 | `FIRSTGROOM_TERMS` / `REFERRAL_TERMS` = offers.md OF-2/OF-3 wording. It moved here from schema.ts `firstGroomOffer()` / `referralOffer()`, which now import it. One source for page and markup | 06 §7.4 (full terms wherever advertised; /offers/ is Wave 2) | — |
| F2-19 | `WALK_PAYMENT_LINE` = "Monthly plans are paid at month-end by UPI or cash — no advance." | pricing.md PR-6 wording; matches the dog-walking-1 FAQ ("paid at month-end") | dog-walking.md SP-4 ("…at the end of each month…") |
| F2-20 | `RESCHEDULE_TEXT` = "Rescheduling or cancelling is free until 2 hours before your confirmed slot — just reply on WhatsApp. Since we never take advance payment, there's nothing to refund." book-3 and how-it-works-3 = "Yes. " + RESCHEDULE_TEXT. faq.ts fails the build if either loses it | It has to stand alone on /terms/ and /refund-policy/ AND sit verbatim in both FAQ answers (book.md + how-it-works.md ship checks). Second sentence = book.md FAQ #3's | book.md FAQ #3, how-it-works.md FAQ #3, 00 §3.2 reschedule line, refund policy |
| F2-21 | book-3's last sentence is now "Full details are on our terms page and our refund & cancellation policy page." Links: "terms page" → /terms/, "refund & cancellation policy page" → /refund-policy/ | Task (links to both). /refund-policy/ is Wave 2, so at launch only the /terms/ link can resolve. The old "Full terms are on our refund & cancellation policy page" would point nowhere | book.md FAQ #3 |
| F2-22 | contact-1 drops its whole last sentence ("Calls work too — if we miss your call during a visit, we call back within 30 minutes.") | D3 | contact.md FAQ #1 + its ship check |
| F2-23 | vet-at-home-3 ends "… don't wait for a home visit. Nearest 24-hour hospitals: [FILL:EMERGENCY_VET_LIST]." | vet-at-home.md §0 rule 4. Same words as the SP-4 footer line | vet-at-home.md FAQ #3 |
| F2-24 | faq.ts fills `[FILL:EMERGENCY_VET_LIST]` inside answers from `site.emergencyVets`. Filling site.ts fills contact-3 + vet-at-home-3, and the FAQPage markup follows | faq.json is frozen after this stage; one fill point per value | — |
| F2-25 | home-1 links its 10 locality names to their area pages; each renders only once that page is live (`answerParts`) | Task | faq.md (home-1 links) |
| F2-26 | `HIRING_STEPS` = the 6 safety-hygiene.md SH-4 steps verbatim. Step 3 (police verification) is gated by a new `policy.policeVerified = false`. SH-4: claim it only once done for every team member (00 §8 POLICE_VERIFICATION_STATUS). The AB-5 4-line summary = steps 2, 4, 5, 6 (`summary: true`), the same steps faq-s1 tells. `hiringSteps()` returns what may be claimed today | Task; honesty gate | join-as-groomer.md JG-4 H2 "Our 6-step process" is false while step 3 is gated (count from `hiringSteps().length`) |
| F2-27 | `SP6_LINES` + `stepsFor(slug)`: dog-walking replaces step 3 (the shared "9:00 am–7:00 pm" slot is wrong for walks — 00 §3.1), step 4 and R4; vet-at-home replaces step 4 and R4. Step names stay the 04 §2.8 names | Neither blueprint words SP-6, so the lines are written from 00 §3.1/§3.2, 07 §3 step 4 (walks start tomorrow, after a meet-and-greet) and the pages' own blueprint facts (water on every walk; GPS + photo; vet name/photo/reg. no. on WhatsApp; 20–30 min; MRP + bill; adult at home per how-it-works FAQ #1). HowTo markup (/how-it-works/) keeps the original steps | dog-walking.md, vet-at-home.md SP-6 |
| F2-28 | site.ts: `legalName: '[FILL:LEGAL_NAME]'`, `founderName: '[FILL:FOUNDER_NAME]'`, `emergencyVets: '[FILL:EMERGENCY_VET_LIST]'` | E12; 02 P047 (About names founder + registered business name). about.md AB-1's alt names "Sunny Thakur" — kept as a token anyway per the stage brief; Sunny fills the public name | 00 §8 (add LEGAL_NAME, FOUNDER_NAME) |
| F2-29 | people.ts: `specialityOn` (per money page) + `specialityFor(p, page)`. No values set — nobody is hired, so assigning "Persian cat de-matting" to a placeholder would invent a fact. The blueprint examples live in the doc comment | Honesty law (about.md AB-6, people.ts header) | — |
| F2-30 | people.ts `TEAM_LANGUAGES = ['Punjabi', 'Hindi', 'English']` (about.md AB-7). schema.ts `availableLanguage` is now derived from it (output unchanged: en, hi, pa) | One source for the language claim on the page and in markup | — |
| F2-31 | reviews.ts: `ProofPhoto` (service, photo, alt ≤ 125, caption, locality?, consent date required), `proofPhotos = []`, `proofPhotosFor(serviceId \| ids, count = 4)`, with a build-time guard | dog-walking/vet/vaccination SP-5 proof-photo rows; same consent law as before/after pairs | — |
| F2-32 | routes.ts: dog-vaccination label → "Dog Vaccination at Home" (01). Header rewritten (the integrator flips statuses, never page builders). `PUBLIC_PDS_PREVIEW_LIVE=wave1` makes every wave-1 route live. `PREVIEW_WAVE1` exported; `isLive` and `liveRoutes` honour it. Reads `import.meta.env` (Vite inlines it) then `process.env`, each in try/catch | C7. Verified: Astro SSR build, React island bundle (value inlined), an Astro config importing routes.ts (with and without `.ts`), esbuild ESM and CJS bundles under plain Node | 08 §4.4 footer service labels → use the 01 names (footer renders route labels) |
| F2-33 | content.ts `SERVICE_PRICE_CHIP` / `LOWEST_PRICE_CHIP` are marked @deprecated and derived from `cardPriceChip()` / `heroPriceChip('home')`. Values are byte-identical (verified). content.ts does not import services.ts (no cycle: services.ts imports content.ts) | Task | — |
| F2-34 | pricing.ts gains numeric twins (`fromAmount`, `flatAmount`, `planAmount`, `addonAmount`), `PriceLine.offers` + `LineOffer`, `priceLineOffers(set)`. Every `priceLines()` line's visible text is unchanged (verified) | Schema built from the same lines the pages render | — |
| F2-35 | schema.ts `BUSINESS_IMAGE_PATH` / `BUSINESS_LOGO_PATH` values unchanged; a comment per constant gives the target (`/og/petdoorstep-home.jpg`, `/images/petdoorstep-logo.png`) | Task | — |

## 2 · Copy written (not in any doc yet — sync verbatim)

**Card blurbs** (`MONEY_PAGES[*].card.blurb`, ≤ 70 chars, each from its 06 §2.3 subhead):
- dog-grooming — "Bath & Brush, Full Groom or Premium Spa — a pet spa at home." (home.md H-3 phrase included)
- cat-grooming — "Calm-handling trained groomers — no car ride, no strange salon smells."
- dog-walking — "The same fixed, verified walker every day, with GPS and photo updates."
- vet-at-home — "A registered veterinarian examines your pet at home — no clinic trip."
- dog-vaccination — "Registered vet, cold-chain carried vaccine, done in your living room."
- tick-flea-treatment — "Ticks love Punjab's monsoon. We don't. Anti-tick bath at your home."
- puppy-grooming — "A gentle first-time groom for puppies under 6 months." (template SP-11 worked example, verbatim)

**Card photo alts** (08 §5.4, ≤ 125):
- dog — "Groomer bathing a Golden Retriever on a verandah — dog grooming at home in Ludhiana"
- cat — "Groomer calmly handling a cat on a towel — cat grooming at home in Ludhiana"
- walking — "Beagle on a leash with a PetDoorStep dog walker in a neighbourhood park in Ludhiana"
- vet — "Vet examining a Pomeranian during a home visit in Ludhiana" (vet-at-home.md hero alt with the shot's breed)
- vaccination — "Vet with a vaccine cold box examining a Pomeranian at home in Ludhiana"
- tick — "Groomer checking an Indie dog for ticks at home in Ludhiana"
- puppy — "Shih Tzu puppy's first groom at home in Ludhiana" (puppy-grooming.md §5 hero alt, verbatim)

**OG alts**: "PetDoorStep — dog grooming at your home in Ludhiana, from ₹599" (04 §4 example) · "PetDoorStep — cat grooming at
your home in Ludhiana, from ₹899" · "PetDoorStep — daily dog walking at your doorstep in Ludhiana, ₹2,999/month" ·
"PetDoorStep — a registered vet at your home in Ludhiana, ₹699 per visit" · home image: "PetDoorStep — pet care at your
doorstep in Ludhiana".

**WhatsApp prefills** (02 P158: service + source page; area/pet asked as blanks, as in the 07 §6 default):
- money pages: "Hi PetDoorStep! I want to book {dog grooming · cat grooming · a vet home visit · a vaccination at home ·
  tick & flea treatment · my puppy's first groom} (from your {01 page name} page). My area: ___ . My {dog · cat · pet ·
  puppy}: ___"
- dog-walking: "Hi PetDoorStep! I want to start dog walking with the ₹699 Trial Week (from your Dog Walking page). My area: ___ . My dog: ___"
- `/`: "Hi PetDoorStep! I want to book a service (from your home page). My area: ___ . My pet: ___" · `/pricing/`, `/about/`,
  `/how-it-works/`: same with "(from your Pricing / About / How it works page)"
- `/contact/`: "Hi PetDoorStep, I have a question" (contact.md CO-2, verbatim)
- `/faq/`: "Hi PetDoorStep, I have a question that isn't on your FAQ page: ___"
- `/privacy-policy/`: "Hi PetDoorStep, I have a question about your Privacy Policy: ___" · `/terms/`: "… about your Terms: ___"
- Groom Club, no size: "Hi PetDoorStep, I want to join Groom Club for my dog. My dog's size: ___"

**CTA labels** (built): "Book Dog Grooming — from ₹599" · "Book Cat Grooming — from ₹899" · "Book Dog Walking — from ₹699
(trial week)" · "Book Vet Home Visit — ₹699 + MRP" · "Book Vaccination at Home — ₹199 + MRP" · "Book Tick & Flea Treatment
— ₹699" · "Book Puppy Intro Groom — ₹699".

**Package table captions**: "What's included in each dog grooming package" · "What's included in each cat grooming package".

**SP6_LINES**:
- dog-walking step 3: "Choose your Ludhiana locality and a start date. Walks run 6:00–9:30 and 17:30–20:30 — from April to June, only before 8:00 or after 19:00."
- dog-walking step 4: "Your booking opens in WhatsApp with all details pre-filled. Send it, and our team confirms your start date. Your background-verified walker meets your dog before the first walk."
- dog-walking R4: "We carry water on every walk and send the GPS route and a photo after it — you just keep the leash handy."
- vet step 4: "Your booking opens in WhatsApp with all details pre-filled. Send it, and our team confirms your slot. A registered veterinarian comes to your home — their name, photo and registration number are shared on WhatsApp before the visit."
- vet R4: "An adult needs to be home for the visit, which usually takes 20–30 minutes. Medicines or vaccines, if needed, are charged at printed MRP — the bill is shown to you."

**/faq/ category links** (`FAQ_PAGE_CATEGORY_LINKS`): booking "Compare every service on the full price list" (template
SP-4 anchor) · grooming "Dog grooming at home in Ludhiana — from ₹599" · walking "Daily dog walks in Ludhiana — ₹2,999/month"
· vet "Vet home visits in Ludhiana — ₹699 per visit" · safety "Read our full safety & hygiene standards" · areas "Ask about
your area — WhatsApp, call or email us". **CTA heading** (`FAQ_CTA_HEADING`): "Got your answer? Book your first visit in 2
minutes." (echoes how-it-works HW-7 / about AB-9).

**FAQ answer text changed**: book-3, how-it-works-3 (F2-20/21), contact-1 (F2-22), vet-at-home-3 (F2-23). All other ids,
questions, answers and `pages` arrays are verbatim; faq.json is frozen from here.

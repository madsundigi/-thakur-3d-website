# B08 · ABOUT — `/about/`

> Page blueprint (custom anatomy). Obeys `00-MASTER-PLAN.md`; trust copy from `06-CONVERSION-PLAYBOOK.md` §4.
> **Honesty rule:** no invented personal facts about Sunny or the team — personal specifics are `[FILL]` tokens Sunny
> writes; everything else below is ready to publish. **`02` P047 (launch-blocker):** this page names the founder
> (`[FILL:FOUNDER_NAME]`), the groomer verification process (AB-5) and the registered business name
> (`[FILL:LEGAL_NAME]`, the same value as `IDENTITY.LEGAL_NAME` in `website/src/data/legal.ts`).

| URL | Wave | Schema `@graph` | Status |
|---|---|---|---|
| `/about/` | 1 | AboutPage (`mainEntity` → `#business`) + BreadcrumbList | blueprinted |

## 1 · Head

Primary keyword (`01-SITEMAP.md`): *petdoorstep* (brand). It sits in the first 30 characters of the title (`02` P012)
and in the H1's first 5 words (P026); the `| PetDoorStep` suffix stays (P014).

- **Title** (60): `About PetDoorStep – Ludhiana Doorstep Pet Care | PetDoorStep` (was `About Us – Doorstep Pet Care in Ludhiana | PetDoorStep`, 54, whose brand keyword started at character 44 — a `02` P012 launch-blocker fail; changed 2026-10-03, `decisions/w1-about-contact.md` W1AC-01)
- **Meta** (149): `PetDoorStep is a Ludhiana doorstep pet-care team: background-verified groomers, a registered partner vet, fixed prices and a photo after every visit.`
- **H1:** `About PetDoorStep — Ludhiana's doorstep pet-care team`

**SERP-intent check (`02` P040, 2026-10-03).** A web search for `petdoorstep` returns no PetDoorStep result yet (the
brand is not live). The engine reads the string as "pet door step": PetSTEP dog ramps (Amazon, Handi Products),
Wikipedia's "Pet door" and an unrelated "My Doorstep Vet" contact page. `petdoorstep OR "pet doorstep" Ludhiana` returns
Ludhiana's doorstep groomers instead: Mr n Mrs Pet's Ludhiana page, Pupping, Pup Ping's Facebook page and JustDial's
mobile-grooming category. So the intent is navigational: someone who has heard the name wants the real business, who
runs it and whether it can be trusted, and search engines still have to learn that "PetDoorStep" is a Ludhiana
pet-care entity. The page matches that by spelling the brand exactly in the first words of the title and the H1,
pairing it with "Ludhiana" and "doorstep pet care" in the title, H1 and meta, and pointing AboutPage `mainEntity` at the
one `#business` node. It also gives a brand-checker the founder and registered business name (P047), the hiring checks
and the Promise. Limits of this check: the search tool is US-located and returns organic links only, so the knowledge
panel, the local pack and the google.co.in order were not visible. Re-check the query on a phone in Ludhiana
(incognito) before launch.

## 2 · Blocks (DOM order)

| # | Block | Spec |
|---|---|---|
| AB-0 | Breadcrumb | `Home › About` |
| AB-1 | Hero | H1 · subhead "Pet care at your doorstep — built in Ludhiana, for Ludhiana's pet parents." · photo `[FILL:FOUNDER_PHOTO]` (the founder, `[FILL:FOUNDER_NAME]`, with their own pet, at home) · CTA [Book on WhatsApp] → `/book/?src=hero_about` (every hero primary links to the booking form, `07` §2 row 3 / `00` §11 E1; amber, `08` §1.4 rule 2) · the `06` §2.1 standard trust-chip set and the R3 reply line, as the `08` §4.6 hero anatomy renders on every page (fold law E3: ≥ 1 chip above the sticky bar) · no secondary CTA (2026-10-03, `decisions/w1-about-contact.md` W1AC-03) |
| AB-2 | **Our story** (H2 "Why we started PetDoorStep") | Paragraph 1 (ready): "PetDoorStep started with a very Ludhiana problem. Getting a dog groomed meant a car ride, a crowded salon, or a freelancer who might not turn up — and nobody could tell you the price until they saw your dog." + `[FILL:FOUNDER_STORY_DETAILS]` (2–3 true sentences: Sunny's own pet moment that sparked the idea). Paragraph 2 (ready): "So we built the service we wanted for our own pets: verified people who come to your home, a fresh sealed kit for every pet, every price published on the website, and a photo after every visit. We started in Ludhiana because it's home — we know the lanes, the 45-degree summers and the tick season — and we'd rather be the best in one city than average in ten." Closing line (small, slate): "PetDoorStep was founded in Ludhiana by [FILL:FOUNDER_NAME]. Registered business name: [FILL:LEGAL_NAME]." (P047) |
| AB-3 | Mission | One line, large type: "Make professional pet care as easy as ordering at home — and as trustworthy as family." |
| AB-4 | **The PetDoorStep Promise** | Full 5-point block verbatim from `06` §4.1 (point 4 only after its policy gate) + the `06` §4.1 medical line "Registered veterinarians only — every medical service, no exceptions." (`00` §3.4): the page's only on-page support for the meta's "registered partner vet" while AB-6 has no vet card (2026-10-03, W1AC-06) |
| AB-5 | **How we hire** (H2) | 4-line summary of the 6-step verification process (`safety-hygiene.md` SH-4; `hiringSteps({ summary: true })` in `content.ts` — the police-verification step stays behind its policy gate) + links "Our full safety standards" → `/safety-hygiene/` · "Join the team" → `/join-as-groomer/` (each link renders only once its Wave-2 page is live, `02` P074; the summary stays either way) |
| AB-6 | **Meet the team** | Full `GroomerCard`s (all 8 fields, `06` §4.2) for every real team member + the vet card (`vet-at-home.md` SP-7). **A card exists only for a person already on the team.** While nobody is on the team yet, the whole block is **omitted** (no heading, no empty grid, no token cards); AB-5 "How we hire" stays either way |
| AB-7 | **Proudly Ludhiana** (H2) | "We serve every corner of Ludhiana — from Sarabha Nagar and Model Town to Dugri, South City and Haibowal Kalan. Our team speaks Punjabi, Hindi and English, and plans every visit around Ludhiana's seasons: early walks in May, tick checks in the monsoon, and gentle winter grooms when the fog rolls in." (Languages line: list only languages the team truly speaks.) |
| AB-8 | Numbers strip | Pets groomed · walks done · Google rating — **omitted until real numbers exist** in the data file; never estimated, never a "coming soon" placeholder |
| AB-9 | CTA band | "Meet us at your doorstep. Book your first visit in 2 minutes." + [Book on WhatsApp] + [Call [FILL:PHONE]] |

## 3 · Images

| Slot | Alt text |
|---|---|
| AB-1 | [FILL:FOUNDER_NAME], founder of PetDoorStep, with their dog at home in Ludhiana (adjust to the true photo) |
| AB-6 | "{First name}, background-verified PetDoorStep groomer" |

## 4 · Ship checks

- [ ] `[FILL:FOUNDER_STORY_DETAILS]` and `[FILL:FOUNDER_PHOTO]` filled by Sunny with true content
- [ ] `[FILL:FOUNDER_NAME]` and `[FILL:LEGAL_NAME]` filled and visible on the page (`02` P047, launch-blocker);
      `LEGAL_NAME` identical to `IDENTITY.LEGAL_NAME` in `legal.ts` and the legal pages
- [ ] Team cards only for real, verified members; AB-6 omitted while there are none; AB-8 omitted until real
      numbers exist; AB-5 always present
- [ ] AboutPage `mainEntity` points at the same `#business` `@id` as home and contact
- [x] Built 2026-10-03 (`wave1/w1-about-contact`, `decisions/w1-about-contact.md`): every block above in DOM order, AB-6
      and AB-8 omitted by their rules; `check:pages` / `check:budgets` / `test:site` green for this page (P099 LCP is a
      WARN until the real hero photo lands — Chrome ignores the grey placeholder)

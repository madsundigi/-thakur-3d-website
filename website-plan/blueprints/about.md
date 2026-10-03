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

- **Title** (54): `About Us – Doorstep Pet Care in Ludhiana | PetDoorStep`
- **Meta** (149): `PetDoorStep is a Ludhiana doorstep pet-care team: background-verified groomers, a registered partner vet, fixed prices and a photo after every visit.`
- **H1:** `About PetDoorStep — Ludhiana's doorstep pet-care team`

## 2 · Blocks (DOM order)

| # | Block | Spec |
|---|---|---|
| AB-0 | Breadcrumb | `Home › About` |
| AB-1 | Hero | H1 · subhead "Pet care at your doorstep — built in Ludhiana, for Ludhiana's pet parents." · photo `[FILL:FOUNDER_PHOTO]` (the founder, `[FILL:FOUNDER_NAME]`, with their own pet, at home) · CTA [Book on WhatsApp] |
| AB-2 | **Our story** (H2 "Why we started PetDoorStep") | Paragraph 1 (ready): "PetDoorStep started with a very Ludhiana problem. Getting a dog groomed meant a car ride, a crowded salon, or a freelancer who might not turn up — and nobody could tell you the price until they saw your dog." + `[FILL:FOUNDER_STORY_DETAILS]` (2–3 true sentences: Sunny's own pet moment that sparked the idea). Paragraph 2 (ready): "So we built the service we wanted for our own pets: verified people who come to your home, a fresh sealed kit for every pet, every price published on the website, and a photo after every visit. We started in Ludhiana because it's home — we know the lanes, the 45-degree summers and the tick season — and we'd rather be the best in one city than average in ten." Closing line (small, slate): "PetDoorStep was founded in Ludhiana by [FILL:FOUNDER_NAME]. Registered business name: [FILL:LEGAL_NAME]." (P047) |
| AB-3 | Mission | One line, large type: "Make professional pet care as easy as ordering at home — and as trustworthy as family." |
| AB-4 | **The PetDoorStep Promise** | Full 5-point block verbatim from `06` §4.1 (point 4 only after its policy gate) |
| AB-5 | **How we hire** (H2) | 4-line summary of the 6-step verification process (`safety-hygiene.md` SH-4) + links "Our full safety standards" → `/safety-hygiene/` · "Join the team" → `/join-as-groomer/` |
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

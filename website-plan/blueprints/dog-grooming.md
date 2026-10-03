# B02 · DOG GROOMING — `/ludhiana/dog-grooming/`

> Page blueprint (flagship). Inherits `_TEMPLATE-service-page.md` — block order, rules and defaults live there; this
> file supplies only this page's values. Obeys `00-MASTER-PLAN.md`; keywords from `03-KEYWORD-MAP.md` §2.2.
> **The template's worked examples are this page's values** unless a block below says otherwise.

| URL | Wave | Template | Schema `@graph` | Status |
|---|---|---|---|---|
| `/ludhiana/dog-grooming/` | 1 (flagship) | T1 — all 14 blocks | Service + FAQPage + BreadcrumbList | built (w1-layout, 2026-10-03) — pending the integrator's route flip |

## 1 · Head

- **Title** (58): `Dog Grooming at Home in Ludhiana – From ₹599 | PetDoorStep`
- **Meta** (153): `Professional dog grooming at your home in Ludhiana. Bath & Brush ₹599–₹999, Full Groom ₹1,199–₹1,899. Verified groomers, sanitised kit. Book on WhatsApp.`
- **H1:** `Dog Grooming at Home in Ludhiana`
- Canonical `https://[FILL:DOMAIN]/ludhiana/dog-grooming/` · og:image = hero crop 1200×630 (`04-TECHNICAL-SEO.md` §4)

## 2 · Keyword → block assignment (P036 — fixed before writing)

| Keyword (03 §2.2) | Role | Lands in |
|---|---|---|
| dog grooming at home ludhiana | P | Title · H1 · SP-1 subhead (first 100 words) |
| doorstep dog grooming ludhiana | S | SP-1 eyebrow: *Doorstep dog grooming* |
| dog grooming ludhiana | S | Title (contained) · SP-2 proof line context |
| dog grooming home service ludhiana | S | SP-3 lead-in sentence |
| dog parlour ludhiana | S | SP-3 bold lead-in: **"Looking for a dog parlour in Ludhiana? We bring the parlour home."** |
| dog groomer near me | S | SP-9 intro: "Searching 'dog groomer near me'? We groom at homes across Ludhiana — these areas book dog grooming most:" |
| what is included in a full grooming package | L | SP-3 H2 (template) |
| dog grooming price ludhiana / charges | L | SP-4 H2 (template) |
| shih tzu / golden retriever / labrador grooming ludhiana | L | SP-4 H3 "Grooming by breed" (§3) |
| dog spa at home · dog deshedding treatment | L | SP-3 Premium Spa column label "Premium Spa (dog spa at home)" + de-shed row |
| dog haircut ludhiana | L | SP-3 body line under the table: "Need a dog haircut in Ludhiana? Every Full Groom includes breed-appropriate haircut & styling." |
| dog nail cutting service near me | L | SP-4 à-la-carte line (§3) |
| mobile dog grooming / grooming van ludhiana | L | SP-3 lead-in: "No grooming van needed — your groomer carries a complete kit to your verandah, balcony or bathroom." |
| medicated bath · how long does grooming take | L | SP-10 FAQ #7 · #5 |

## 3 · Block values (only where this page adds to the template)

- **SP-1 Hero** — template worked example verbatim, except eyebrow = *Doorstep dog grooming*. Primary [Book on WhatsApp] → `/book/?src=hero_dog-grooming` (`00` §11 E1). Chips: `from ₹599` + standard 4.
- **SP-3 Package table** — template worked table verbatim. Lead-in (above table, 2 sentences): "**Looking for a dog parlour in Ludhiana? We bring the parlour home.** No grooming van needed — your groomer carries a complete kit to your verandah, balcony or bathroom, and every dog grooming home service in Ludhiana is priced before we arrive."
- **SP-4 Price matrix** — template worked matrix verbatim, then two additions inside the block:
  - **À-la-carte line:** "Just nails? **Nail Trim + Ear Clean visit ₹299.** Ticks? Add **Tick & Flea treatment for ₹399** to any groom." (links `/ludhiana/tick-flea-treatment/`)
  - **H3 "Grooming by breed"** (facts: research FAQ bank §3.1; never-shave rule for double coats):

    | Breed | Size | Coat | What we recommend | Typical rhythm |
    |---|---|---|---|---|
    | Shih Tzu | Small | Long, mats easily | Full Groom — a short "puppy cut" keeps it cool and tangle-free | every 4–6 weeks |
    | Pomeranian | Small | Thick double coat | Bath & Brush; de-shed in spring — never shave | every 4–6 weeks |
    | Beagle | Medium | Short, sheds | Bath & Brush; ear clean every visit (floppy ears trap moisture) | every 6–8 weeks |
    | Indie | Medium (most) | Short | Bath & Brush with a full tick check | every 6–8 weeks |
    | Labrador | Large | Double, heavy shedder | Bath & Brush; Premium Spa de-shed during the Mar–May coat blow | every 6–8 weeks |
    | Golden Retriever | Large | Long double coat | Full Groom — tidy feathering, never shave | every 4–6 weeks |
    | German Shepherd | Large | Double, heavy shedder | Premium Spa de-shed at coat-blow time — never shave | every 6–8 weeks |
- **SP-5 Gallery** — template rule; breed filter chips limited to breeds with ≥ 1 real pair.
- **SP-7, SP-8, SP-12, SP-13** — template worked examples verbatim (`Book · from ₹599`).
- **SP-9 Areas** — Sarabha Nagar · Model Town · BRS Nagar (template fixed table) with the "dog groomer near me" intro from §2.
- **SP-10 FAQ** — the **8 Q&As in the template's SP-10 worked example** are final for this page (4 from `04-TECHNICAL-SEO.md` §2.3 + #5–#8). FAQPage markup mirrors them word-for-word. Hinglish uses: FAQ #8 ("Cash ya UPI…") + nail-trim photo alt (§4) — the page's maximum of 2.
- **SP-11 Related** — Puppy Grooming (`₹699 flat`) · Tick & Flea Treatment (`₹699 · ₹399 add-on`) · Cat Grooming (`from ₹899`). Blog text links under the cards (once live): week-11 post *What Is Included in a Full Dog Grooming Package?* → `/blog/full-dog-grooming-package-included/` · week-12 post *Pet Grooming at Home vs Salon in India* → `/blog/home-grooming-vs-salon-india/`.

## 4 · Images (real photos only — shot list `08-DESIGN-SYSTEM.md` §5.2)

| Slot | Shot | Alt text |
|---|---|---|
| Hero (LCP, eager, preloaded) | Groomer bathing a Golden Retriever on a Ludhiana verandah | Golden Retriever being bathed at home in Sarabha Nagar, Ludhiana |
| SP-3 | Sealed kit pouch being opened in front of the owner | Groomer opening a sealed, sanitised grooming kit at a home in Ludhiana |
| SP-4 | Nail trim close-up | dog ke nails kaatna — nail trim at home in Ludhiana |
| SP-5 | 2–4 before/after pairs (data file) | Per template: "{Breed} before/after {service} at home in {Area}, Ludhiana" |
| SP-7 | Groomer portraits (apron + ID badge) | "{First name}, background-verified PetDoorStep groomer" |

## 5 · Page-specific ship checks (in addition to the template §4 list)

- [ ] Breed table present with all 7 rows; "never shave" wording intact for double-coated breeds
- [ ] À-la-carte line shows ₹299 and ₹399 exactly as `pricing.json`
- [ ] Exactly 2 Hinglish uses (FAQ #8 + nail-trim alt)
- [ ] Meta is the 153-char version above (03's 159-char draft exceeds P019's 158 ceiling)

## 6 · As built (stage w1-layout, 2026-10-03 — `src/pages/ludhiana/dog-grooming.astro` on `src/layouts/ServicePage.astro`)

Where this blueprint and the template are silent, this is what was built; decisions in `decisions/w1-layout.md` §2.

- **Head:** title 58 / meta 153 / H1 verbatim (§1); canonical + og:url the self URL; og:image `/og/dog-grooming.jpg`; JSON-LD one `@graph` = Service (3 Offers, one per package, min–max by size) + FAQPage (dog-grooming-1…8) + BreadcrumbList (3 items). Word count 1,320.
- **SP-1:** eyebrow *Doorstep dog grooming*; [Book on WhatsApp] → `/book/?src=hero_dog-grooming` (amber), [See exact prices] → `#prices` (hidden below `md`); chips `from ₹599` + the standard 4; R3 under the CTAs. Fold at 360×640: photo top + 160 = 565 against the sticky bar at 583 (17.8 px spare), price chip and first trust chip whole (decisions §1).
- **SP-2:** proof line → `[FILL:GBP_LINK]`; the E6 empty state until 3 real reviews exist (`reviews.ts`); the E4 CTA row = `Book Dog Grooming — from ₹599` → `/book/?src=service_dog-grooming` with R2 beside it.
- **SP-3:** the §3 lead-in (bold first sentence) sits beside the sealed-kit photo from `md` and above the grid; below `md` the photo follows the haircut line so the grid is not pushed a screen down. Grid = `PACKAGE_TABLES['dog-grooming']` verbatim (Premium Spa column "Premium Spa (dog spa at home)", "Most booked" on Full Groom, no header note — `/pricing/`'s "full body dog grooming" note is that page's, W1L-13), duration row, footnotes (a) + the matting line, then the haircut line.
- **SP-4:** matrix + R1/R2 → the à-la-carte line with the nail-trim thumbnail (112 px, 160 px from `md`) → mid-page CTA `Book Dog Grooming — from ₹599` → "Compare every service on the full price list" → H3 "Grooming by breed" (7 rows, `wide` table: scrolls sideways below `md`, sticky Breed column). "Tick & Flea treatment" links `/ludhiana/tick-flea-treatment/` once live; plain bold text until then.
- **SP-5:** omitted (no consented pairs yet); renders itself from `reviews.ts` at ≥ 2 pairs, with one anchor chip per breed once ≥ 2 breeds have a pair.
- **SP-6:** the 4 steps + R4 + "See the full process" → `/how-it-works/`.
- **SP-7:** heading + line only — no cards until a groomer is hired (people.ts honesty law); "How we hire" → `/about/`.
- **SP-8:** 4 points (the on-time point waits for the §3.4 policy gate).
- **SP-9:** the §2 intro, 3 AreaCards (text until the area pages ship), then "…and Civil Lines, Dugri, Pakhowal Road, South City, Ferozepur Road, Haibowal Kalan, Kitchlu Nagar — all of Ludhiana served." (7 areas: every §3.3 area not carded).
- **SP-10:** the 8 FAQs; answer links render only while their target is live (FAQ #7 → `/ludhiana/vet-at-home/`; FAQ #3's `/safety-hygiene/` stays text until Wave 2).
- **SP-11:** Puppy Grooming · Tick & Flea Treatment · Cat Grooming at Home cards (not-yet-live pages show "Coming soon", no link); the two blog links appear once those posts are live; "Last updated" line once `lastmod.ts` has the path.
- **SP-12:** H2 = R8 with {breed} Labrador and no area ("…Slots this week across Ludhiana."), the §3 support line, [Book on WhatsApp] (wa.me, page prefill) + [Call [FILL:PHONE]], source `ctaband_dog-grooming`, R3.
- **Ship checks (§5):** breed table 7 rows with "never shave" ×3 ✓ · à-la-carte ₹299 / ₹399 from `pricing.json` ✓ · exactly 2 Hinglish uses (FAQ #8 + the nail-trim alt) ✓ · meta = the 153-char line ✓. Gates: `check:pages` passes every rule except P161 on `service_dog-grooming` (a `sources.ts` gap — `requests/w1-layout.md` A-2); `check:budgets`, `check:prices`, `test:site` (fold, axe, CLS 0, tracking) pass.


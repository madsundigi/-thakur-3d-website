# w1-about-contact — decision log (Wave 1: `/about/` + `/contact/`)

Branch `wave1/w1-about-contact`. Scope: `src/pages/{about,contact}.astro`, `src/components/pages/contact/{ContactCard,HoursTable}.astro`,
`src/data/pages/{about,contact}.ts`, `blueprints/{about,contact}.md`. Nothing shared was edited (needs → `requests/w1-about-contact.md`).

Rule order applied: `02` [Launch-blocker] > page blueprint > `00` §11 > `06`/`07`/`08`/`04`/`09`. Decisions already taken
and implemented as given: **D3** (reply line = the confirmed fact; no call-back promise anywhere on `/contact/`), **E1**
(every hero primary → `/book/?src=hero_<slug>`, amber), **E3** (fold law), **E8** (no map at launch, P098 deferred),
**E9** (NAP = `05` §4 via `Nap.astro`, never retyped), **E11** (`/contact/` head), **P047** (`/about/` names the founder,
the hiring checks and the registered business name).

## 1 · Decisions

| # | Decision | Why / source |
|---|---|---|
| W1AC-01 | **`/about/` title → `About PetDoorStep – Ludhiana Doorstep Pet Care \| PetDoorStep`** (60 chars). The blueprint's `About Us – Doorstep Pet Care in Ludhiana \| PetDoorStep` (54) put the brand keyword at character 44 — a P012 launch-blocker fail (keyword in the first 30). Meta (149) and H1 unchanged; `about.md` §1 carries the change with this id. | `02` P012 > blueprint |
| W1AC-02 | **`/contact/` head = `00` §11 E11 verbatim**: title `Pet Grooming Contact Number in Ludhiana \| PetDoorStep` (53), meta (143, no `"`), H1 `Pet Grooming Contact Number in Ludhiana` (39, 20–70). `check:pages` holds built = blueprint (P012/P020/P026 equal). | E11; `02` P011/P019/P026 |
| W1AC-03 | **AB-1 hero** = `Hero.astro` with the blueprint's H1, subhead, founder photo and [Book on WhatsApp] → `/book/?src=hero_about` (amber: not a wa.me link). The `08` §4.6 anatomy adds the `06` §2.1 standard trust-chip set and the R3 reply line — the fold law needs ≥ 1 chip above the sticky bar and the chips are true facts from `00` §3.4. No secondary CTA: the blueprint names none and the sticky bar carries Call + WhatsApp below `md`. `<Photo slot="head" preload>` for the LCP. | `07` §2 row 3; E1; E3; `06` §2.1; `04` §5.2.2 |
| W1AC-04 | **AB-2 story** in `<div class="prose">`: P1 (ready) + `[FILL:FOUNDER_STORY_DETAILS]` in one paragraph, P2 (ready), closing line `text-sm text-slate`. Founder + registered name come from `site.founderName` / `site.legalName` (one place each); **the build throws when `site.legalName ≠ IDENTITY.LEGAL_NAME` (`legal.ts`)**, so `/about/` and the legal pages can never show two different registered names (about.md ship check 2). | P047; `requests/f2-chrome.md` 7 |
| W1AC-05 | **AB-3 mission = `<p class="t-h1">`**, centred, `max-w-[30ch]` — display type on a paragraph, not an h-tag (a one-line slogan is not a section), and 30ch instead of the 65ch body measure so it sets in three centred lines from `md`. | `02` P032; `08` §2.2 |
| W1AC-06 | **AB-4 = `<PromiseBand variant="full" medical />`.** The full block renders the `06` §4.1 points through `content.ts` (point 4 stays behind its policy gate — 4 points today). `medical` appends the `06` §4.1 line "Registered veterinarians only — every medical service, no exceptions." (`00` §3.4 fact): the meta promises "a registered partner vet" and, with AB-6 omitted (no vet card yet), nothing else on the page substantiates it. One prop to drop if the blueprint owner prefers the bare block (request 9). | `06` §4.1; `00` §3.4; `02` P020 (meta reflects the page) |
| W1AC-07 | **AB-5 = `hiringSteps({ summary: true })`** — the 4 summary lines of SH-4 (ID + references, skills trial, training, supervised visits); the police-verification step is excluded by its policy gate until confirmed. Rendered as an `<ol>` with check icons. The two links render only while their Wave-2 pages are live (`isLive`), so today neither shows; the summary stays either way. | about.md AB-5; `02` P074; `requests/f2-chrome.md` |
| W1AC-08 | **AB-6 omitted while nobody is on the team** (`team.filter(!isPlaceholder)` is empty — no heading, no empty grid, no token cards); it renders `GroomerCard`s automatically, vet card included, once a real person is in `people.ts`. **AB-8 omitted** (no real numbers; never estimated, never "coming soon"). AB-7's band is `bg-paper` while AB-6 is absent and `bg-sand` once it renders, so two adjacent sections never share a background. | about.md AB-6/AB-8 honesty rule; `08` §1.4 rule 5 |
| W1AC-09 | **AB-7 languages** = `TEAM_LANGUAGES` (`people.ts`) joined as prose ("Punjabi, Hindi and English") by `languagesProse()`, which throws on an empty list — the line lists only what the team truly speaks, and removing a language there changes the page and the Service schema together. | about.md AB-7 note; `04` §2.2 |
| W1AC-10 | **AB-9 = `CtaBand`**: heading verbatim; [Book on WhatsApp] = `wa.me` with the `/about/` prefill (`PAGE_PREFILL['/about/']`: "Hi PetDoorStep! I want to book a service (from your About page). My area: ___ . My pet: ___"), [Call [FILL:PHONE]] = `tel:`; both `source="ctaband_about"`. | `06` §3.1 ("everywhere else … wa.me"); `09` §2d `ctaband_<slug>`; `02` P158 |
| W1AC-11 | **CO-1 is a plain header, not a `Hero`**: H1 + the reply line (body size on phones, body-lg from `md`, like the hero subhead). The blueprint gives CO-1 no CTA, chips or photo, and the fold law applies to `[data-hero]` pages only (`test:site` prints "—"). | contact.md CO-1; E3 |
| W1AC-12 | **CO-2 = `ContactCard` (page component)**: icon + channel name + the action as a `Button` whose visible text is the number / address / handle itself, with an sr-only channel prefix ("WhatsApp +91 …", "Call …") so the link names stay distinct. WhatsApp = `variant="whatsapp"` (the page's only green button — it is the wa.me link) with the CO-2 prefill `Hi PetDoorStep, I have a question`; Call / Email / Instagram = secondary outline. The channel names are **`<p class="t-h3">`, not `<h3>`**: P032 keeps card labels out of h-tags and bans two consecutive headings with no body text between them (the H2 would be followed by four). Email note "Replies within one working day." (blueprint fragment set as a sentence). WhatsApp number via `whatsappDisplay()`. | contact.md CO-2; `02` P032; `08` §1.4 rule 2; `requests/f2-chrome.md` 5 |
| W1AC-13 | **CO-3 = `<Nap source="contact_page" tone="light" />`** on a mint card, followed by "Doorstep service — we come to you. There is no walk-in centre." and `Website: https://[FILL:DOMAIN]/` — the two `05` §4 fields `Nap` does not print. The NAP text is byte-identical to the footer by construction (same component; verified on the built page: text and hrefs equal, only `data-source` differs). Never the base address. **`check:pages` P088 FAILs on this page because it counts two `<address data-testid="nap">` blocks and allows exactly one** — a gate reading stricter than `02` P088 ("identical byte-for-byte site-wide"), the blueprint (CO-3 is a visible NAP block) and the component owner's own request. The block stays; the gate change is request 2. | contact.md CO-3; E9; `requests/f2-chrome.md` 5; `02` P088/P089 |
| W1AC-14 | **CO-4 = `HoursTable`** (page component): the page's own `<table>` inside the shared `TableFrame` (surface, focusable scroll region, mint header, zebra, sticky row headers). Not `InfoTable`: its 9.5rem label floor leaves ~118 px for the hours at 360 px, which split every range at its dash. Here the label column wraps (40 % below `md`, 14rem from `md`) and each day or time range is kept on one line. Rows: visits = `site.hours.visits` itself (the NAP hours); walks and replies keep the blueprint wording, and **the build fails if a time in them is missing from `site.hours`** (a `00` §3.1 hours change that skips this table cannot ship). sr-only caption "PetDoorStep hours" = the scroll region's name. | contact.md CO-4; `08` §4.8; `00` §3.1 |
| W1AC-15 | **CO-5** = the 10 `routes.ts` area entries in `00` §3.3 order, map-pin icon, 2 / 3 / 5 columns; each a link only once its area page is live (plain text today, Wave 2). | contact.md CO-5; `02` P074 |
| W1AC-16 | **CO-6 quick links** = the blueprint's three + **"Privacy Policy" → `/privacy-policy/`**: the legal page needs a contextual in-body inbound link (footer links do not count for P068; the D4 consent link lives inside the widget and is invisible to a static crawl — `requests/f2-gates.md` 11). "Ready to book?" → `/book/?src=contact_page` (every route into the widget carries its source). All `isLive`-gated. | `02` P068; `07` §2; `09` §2d |
| W1AC-17 | **CO-7 = `<Faq page="/contact/">`** (the 3 `faq.json` entries, plain `<details>`; no FAQPage on this page per `04` §2.9). The blueprint names no heading: **"Contacting PetDoorStep — your questions"**, on the template SP-10 "{topic} — your questions" pattern. `[FILL:EMERGENCY_VET_LIST]` is filled from `site.emergencyVets` by `lib/faq.ts`. | contact.md §3; `04` §2.9; `_TEMPLATE-service-page.md` SP-10 |
| W1AC-18 | **No map on `/contact/`** (`02` P098, Important) — deferred per E8. To be recorded in the page audit as an open Important item with an owner and a fix date ≤ 14 days after go-live (`02` §1 rule 2) — request 4. | E8; contact.md ship check |
| W1AC-19 | **JSON-LD** = one `@graph` per page from `schemaGraphLd()`: `/about/` AboutPage (`mainEntity` → `#business`) + BreadcrumbList; `/contact/` LocalBusiness (the same `localBusinessLd()` block as home, `@id` `https://…/#business`) + BreadcrumbList + ContactPage (`mainEntity` → `#business`). Exactly the `04` §2.9 rows; `check:pages` P077/P078/P084 pass. | `04` §2.9; about.md / contact.md ship checks |
| W1AC-20 | **Sources**: `/about/` `hero_about` (hero → `/book/?src=hero_about`) and `ctaband_about`; `/contact/` `contact_page` on every in-page anchor — the four cards, the `Nap` links and the `/book/` quick link (`09` §2d `<slug>_page`). Chrome anchors keep their own (`header`, `sticky_bar`, `float_desktop`, `footer`, `exit_nudge`). `check:pages` P161 and `test:site` click-tracking pass (10 / 13 anchors). | `09` §2d; `07` §2 |
| W1AC-21 | **Band rhythm** — `/about/`: paper (hero) → sand (story) → paper (mission + mint Promise card) → sand (hire) → paper (Ludhiana) → brand-dark (CTA band) → footer. `/contact/`: paper (header + cards + mint NAP card) → sand (hours) → paper (areas + quick links) → sand (FAQ) → footer. Long text (AB-2, AB-7) in `.prose`; everything else on the 1200 px container with `px-4 lg:px-6`. | `08` §1.4 rule 5; `requests/f2-chrome.md` 7 |
| W1AC-22 | **Zero client JS and no new copy outside the blueprints**: both pages ship only the three tagged inline scripts; every ₹ figure is absent (none needed; `check:prices` OK); every `[FILL:*]` token is a registered `00` §8 token printed through its data source so `check:fill` finds it. OG image = the default `petdoorstep-home.jpg` for both (`04` §4 lists no file for these pages). | `08` §8.1; `00` §8; `04` §4 |

## 2 · Copy written by this stage (customer-facing; everything else is blueprint / `06` / `content.ts` verbatim)

| Where | Text |
|---|---|
| `/contact/` CO-7 FAQ heading | Contacting PetDoorStep — your questions |
| `/contact/` CO-2 ③ email note | Replies within one working day. |
| `/contact/` CO-3 website line | Website: https://[FILL:DOMAIN]/ (the `05` §4 field name + value) |
| `/contact/` CO-4 table furniture | caption "PetDoorStep hours" · column headers "Service" / "Hours" · row labels "Grooming & vet visits" · "Dog walks" · "WhatsApp replies" (blueprint) |
| `/contact/` CO-6 group label | Quick links (`aria-label`) · "Privacy Policy" (the route label) |
| `/contact/` sr-only button prefixes | WhatsApp · Call · Email · Instagram |
| `/about/` AB-1 alt | [FILL:FOUNDER_NAME], founder of PetDoorStep, with their dog at home in Ludhiana (about.md §3) |

## 3 · Verification (2026-10-03, build with `PUBLIC_PDS_PREVIEW_LIVE=wave1`, gates merged from `50f75c3`)

- `npm run build` ✓ (5 pages) · `npm run check:prices` ✓.
- `npm run check:pages -- --pages /about/,/contact/` → **1 FAIL, 20 WARN**. The 20 WARNs are P074 "links to a live Wave-1
  route not in this dist" (other builders' pages). The FAIL is `/contact/ P088 2 NAP blocks — exactly one <address
  data-testid="nap"> per page` (W1AC-13, request 2). Head copy = blueprint on both pages; JSON-LD per `04` §2.9; every
  `data-source` / `?src=` canonical; `rel="noopener"` on every `_blank`; every image has width/height/alt; hero preload
  present on `/about/`.
- `npm run check:budgets -- --pages /about/,/contact/` → **0 FAIL, 0 WARN** (CSS 41,093 B / 41,580 B raw of 51,200;
  3 scripts each = analytics + exit card + ld+json; 2 font preloads).
- `SHOTS=… npm run test:site -- --pages /about/,/contact/ --port 4541` → **0 FAIL, 2 WARN**: both pages at 360×640,
  768×1024, 1280×800 — no sideways scroll, no console errors, no failed requests, axe clean, ld+json parses, CLS 0.000;
  `/about/` fold law ok (H1, subhead, primary CTA, chip above the sticky bar); click tracking ok (10 anchors on `/about/`,
  13 on `/contact/`); exit card ok on both. The 2 WARNs are P099 on `/about/` at 768 / 1280: the LCP is the H1 because
  the hero is still the grey dev placeholder, which Chrome ignores for LCP — re-check with the real photo.
- NAP identity on the built `/contact/`: both `<address data-testid="nap">` blocks have identical text and identical
  hrefs (script over `dist/contact/index.html`); the body one carries `data-source="contact_page"`, the footer's `footer`.
- No "call back" / "30 minutes" wording anywhere on either page (grep over `dist/`).
- Heading outlines: `/about/` h1 → 5 h2 (story, Promise, hire, Ludhiana, CTA band) + the footer's; `/contact/` h1 → 4 h2
  (cards, hours, areas, FAQ) with h3 only on the FAQ questions.
- Screenshots at the three widths plus the 360×640 folds reviewed by eye (scratchpad `wave1/w1-about-contact/`): band
  rhythm, card grid (1 / 2 columns), hours table (ranges never split), area grid (2 / 3 / 5 columns), CTA band stacking
  at `md`, footer — nothing clipped or overlapping.

# Requests from w1-about-contact (`/about/` + `/contact/`)

Each item names the owner. The build behind every finding is this branch with `PUBLIC_PDS_PREVIEW_LIVE=wave1` and the
gates merged from `50f75c3`; details and ids (W1AC-nn) in `decisions/w1-about-contact.md`.

1. **Integrator — flip both pages live.** In `src/data/routes.ts` set `/about/` and `/contact/` to `status: 'live'`, and
   in `src/data/lastmod.ts` add `'/about/': '2026-10-03'` and `'/contact/': '2026-10-03'` (the build fails on a live
   route without a date). Both pages are already linked from the footer (P047 needs `/about/` there) and from the header
   menu once live; `check:pages --all` then also verifies their P068 inbound links (item 6).
2. **`scripts/check-pages.mjs` owner (f2-gates) — P088 counts NAP blocks instead of comparing them.** `/contact/` CO-3
   renders `<Nap source="contact_page" tone="light" />` exactly as `requests/f2-chrome.md` 5 asks ("never retype the
   NAP"), so the page carries two `<address data-testid="nap">` blocks (CO-3 + footer) that are byte-identical by
   construction — verified on the built page: same text, same hrefs. The gate's `nap.length !== 1 → FAIL` is the **only
   FAIL on this stage** and would block `check:pages --all` at integration. Suggested change (keeps the cross-page
   check intact): collect every `address[data-testid="nap"]` on the page; FAIL "no NAP" when there are none; FAIL
   "NAP blocks differ on this page" when any two differ in text + hrefs; otherwise record the first block as `info.nap`
   for the cross-page comparison. `02` P088's wording ("identical byte-for-byte site-wide") is satisfied either way.
3. **`00-MASTER-PLAN.md` §11 owner — log four stage decisions** (or point at the decisions file): W1AC-01 `/about/`
   title change (P012), W1AC-06 the `06` §4.1 medical line on `/about/`'s full Promise, W1AC-16 the "Privacy Policy" quick
   link on `/contact/` (P068), W1AC-17 the CO-7 heading "Contacting PetDoorStep — your questions".
4. **Sunny — P098 audit record.** `/contact/` ships without the map facade (`02` P098, Important; `00` §11 E8). `02` §1
   rule 2 lets it go live only as an open Important item **with an owner and a fix date ≤ 14 days after go-live** — add
   that line to the `/contact/` audit block (`02` §5 template) when the page is audited.
5. **Sunny — tokens these pages print** (all in one place each; `npm run check:fill` lists them): `site.ts` →
   `[FILL:FOUNDER_NAME]`, `[FILL:LEGAL_NAME]` (**the same value as `IDENTITY.LEGAL_NAME` in `legal.ts` — the build
   throws if they differ**), `[FILL:PHONE]`, `[FILL:WHATSAPP_NUMBER]`, `[FILL:EMAIL]`, `[FILL:INSTAGRAM]`,
   `[FILL:DOMAIN]`, `[FILL:EMERGENCY_VET_LIST]` (the contact-3 FAQ answer, verified by phone); `src/data/pages/about.ts`
   → `[FILL:FOUNDER_STORY_DETAILS]` (2–3 true sentences); the founder photo → drop
   `src/assets/photos/petdoorstep-team-founder-ludhiana.jpg` (`08` §5.2 shot 12, 4:3 crop; alt in `about.ts` to match
   what it really shows). Then re-run `test:site` on `/about/`: the P099 LCP WARN (placeholder ignored by Chrome) must
   turn green with the real photo.
6. **Integrator — P068 inbound links (other owners' pages).** `/about/` is linked in-body from home H-8 ("How we hire" →
   `/about/`, `home.md`); `/contact/` from the `/faq/` "Service areas & what's next" category link (`faq.md` §3,
   `lib/faq.ts` `FAQ_SECTIONS`). Neither is in this dist; `check:pages --all` confirms them at integration. In return
   these pages give in-body links to `/book/` (both), `/pricing/`, `/how-it-works/` and `/privacy-policy/` (contact).
7. **`blueprints/about.md` / `06` §4.1 owner — confirm the medical line on `/about/`** (W1AC-06: "Registered
   veterinarians only — every medical service, no exceptions." under the full Promise, the page's only on-page support
   for the meta's "registered partner vet" while there is no vet card). If declined, drop the `medical` prop from the
   `PromiseBand` call in `about.astro` and the AB-4 note — a one-line change.
8. **Sunny — SERP re-check before launch** (both blueprints §1): `petdoorstep` and `pet grooming contact number
   ludhiana` on a phone in Ludhiana, incognito; the desk check was US-located and saw no local pack.
9. **No action, for the record.** `people.ts`: AB-6 "Meet the team" appears by itself once a real person (name not a
   token) is in `team` — groomers, walkers, then the vet card. Wave 2: the AB-5 links appear when `/safety-hygiene/` and
   `/join-as-groomer/` go live; the CO-5 area names become links when their area pages do. `09` §2d: nothing new —
   `hero_about`, `ctaband_about` and `contact_page` are already canonical.

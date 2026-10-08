# Requests from stage w2-money (Wave 2)

Branch `wave2/w2-money` — the three money pages `/ludhiana/dog-vaccination/`, `/ludhiana/tick-flea-treatment/`,
`/ludhiana/puppy-grooming/`. Needs in files this stage does not own; the decisions behind each item are in
`website-plan/decisions/w2-money.md`; what was built is each blueprint's new §7. Each item names its owner.

Nothing here blocks the merge on build/prices/budgets/test:site/e2e: those gates pass. The open items are the
route-flip (A), one fold copy-call and the medical sign-off (B), the photos (C) and the people/pricing/faq follow-ups
(D/E) — all the same shape as the Wave-1 stages' requests.

## A · Integrator

| # | Request | Why |
|---|---|---|
| A-1 | On merge, **flip all three routes to `status: 'live'`** in `src/data/routes.ts` **and add `'/ludhiana/dog-vaccination/': '2026-10-08'`, `'/ludhiana/tick-flea-treatment/': '2026-10-08'`, `'/ludhiana/puppy-grooming/': '2026-10-08'`** to `LASTMOD` in `src/data/lastmod.ts`, in the same commit | A live route without a date stops the build (04 §7.1, E7); `check:pages --all` P127 needs it for the sitemap; each page's "Last updated" line (02 P143, template SP-11) renders only once its path has a date. The flip also clears this stage's only `check:pages` FAILs — each page's own canonical/og:url, reported "not live" while the route is `planned` (W2M-12). |
| A-2 | In the integrated `--all` run, resolve the **P074 / P068** cross-links that can only be checked with every page built. These three pages now link live siblings: dog-vaccination → vet-at-home (SP-11 + FAQ #7 "Deworming Visit") + puppy-grooming (SP-11); tick-flea → dog-grooming + vet-at-home (SP-11 + the coral box + FAQ #3); puppy → dog-grooming (SP-11 + the 6-month line) + dog-vaccination (SP-11 + FAQ #7/#8 links). Inbound P068 links already exist from Wave-1 pages (vet-at-home SP-3 "Full details on Dog Vaccination at Home" + SP-11; dog-grooming SP-11 "Tick & Flea"; cat-grooming / dog-grooming "Puppy Grooming" cards) and fill in by `isLive()` on the flip | P074 / P068 are launch-blockers checkable only in the `--all` build. |
| A-3 | **No edit needed as other Wave-2 routes flip.** When the area pages (Dugri, Haibowal Kalan, Ferozepur Road, South City, BRS Nagar, Kitchlu Nagar, Pakhowal Road, Model Town), `/safety-hygiene/`, `/ludhiana/` and the calendar blog posts (weeks 2, 8, 10, 21, 22, 23) flip live, these pages grow their links by themselves (`isLive()`): SP-9 area cards, SP-11 blog links, the puppy FAQ #3 → `/safety-hygiene/`, and the puppy/tick/vaccination cross-FAQ links already in `faq.json`. SP-5 appears once `reviews.ts` holds consented pairs/proof photos; SP-7 cards fill from `people.ts`. Rebuild + re-run `check:pages` | 02 P074; W1L-18. |
| A-4 | FYI (chrome / global-CSS owner): these pages sit at **50,956 / 50,752 / 50,955 B of the 51,200 B** CSS budget (≈ 250–450 B headroom), continuing the trend w1-cat flagged (A-3 there). The next shared-stylesheet addition will tip a money page over `check:budgets`; the per-page scoped components here are small and are not the cause | 08 §8; `check:budgets` FAILs at > 51,200 B. |

## B · Sunny — decisions & launch fills (`00` §8 gate, `npm run check:fill`)

| # | Request | Why |
|---|---|---|
| B-1 | **tick-flea hero price chip — a copy call.** `heroPriceChip('tick-flea-treatment')` in `src/lib/pricing.ts` is the blueprint's "₹699 · ₹399 with a groom" (~178px at 360), which cuts the first **trust** chip at 360×640 (price chip 16–193.6, trust 201.6–431.1). `test:site`'s fold law **passes** (it accepts the fully-visible price chip as its chip), so this is not a merge blocker — but the stricter P150 reading wants a trust chip visible too (W1L-7, W2M-5). Either **shorten the chip** in `pricing.ts` (e.g. drop the standalone figure to "₹399 with a groom", ~90px, which makes the first trust chip whole) **or log a P150 exception** in `00` §11. Builder's recommendation: the shorter chip — the standalone ₹699 is already in the subhead, the SP-4 list and the sticky bar | P150 is a launch-blocker that outranks the blueprint chip copy; both fixes are owner/data-owner files this stage must not edit. |
| B-2 | **dog-vaccination medical sign-off** (not code, no `[FILL]`): the registered vet reviews and approves **in writing** the two SP-4 schedule tables (Puppy course, Cats too) and FAQ #3/#6/#7 before the page publishes — vaccine brands vary, the vet's sign-off is the source of truth | dog-vaccination.md "Medical sign-off gate" + §6 ship check; W2M-13. |
| B-3 | **Registered-vet fill** (shared with vet-at-home's request): `src/data/people.ts` `vets[0]` real `name` + `regNo` (state veterinary council) + `years`/`languages`/`line`/`photo`. The dog-vaccination SP-7 "Meet your vet" card renders the same `[FILL]` tokens as vet-at-home until filled | §0 rules 1 + 3 ("no anonymous vet"); 02 P046 [Launch-blocker]; `check:fill`. (dog-vaccination needs **no** `emergencyVets` fill — its hero notice is a generic routing line, not a hospital list.) |

## C · Photos (Sunny / shot list `08` §5.2)

| # | Request | Why |
|---|---|---|
| C-1 | **Register + shoot four new photos** (all grey placeholders now; add filenames to the `08` §5.2 list as shots 15–18, following the `00` §11 2026-10-08 close-out "photo shots 13–15" note): `anti-tick-bath-indie-dog-ludhiana.jpg` (tick-flea hero — groomer giving an anti-tick bath to an Indie dog on a balcony), `vaccine-cold-box-home-ludhiana.jpg` (dog-vaccination SP-3 — cold-chain box opened at the door), `dog-vaccination-card-ludhiana.jpg` (dog-vaccination SP-4 — signed vaccination card, pet name blurred), `puppy-towel-dry-after-bath-ludhiana.jpg` (puppy SP-3 — a Labrador puppy towel-dried after a bath). Alts are already the blueprint §5 lines | Blueprint §5 image tables; cat-grooming set the precedent (a §5 shot not in 08 §5.2 follows 08 §5.5 and is requested). |
| C-2 | The two **reused** heroes are also still placeholders: `vet-home-visit-pomeranian-ludhiana.jpg` (shot 10 — dog-vaccination hero, vaccination crop) and `puppy-first-groom-at-home-ludhiana.jpg` (shot 13 — puppy hero); tick-flea's SP-3 reuses `dog-tick-check-at-home-ludhiana.jpg` (shot 14). `test:site` P099 warns the LCP is the H1, not the hero, while the hero is a placeholder (Chrome ignores placeholder images); it clears with the real file | No stock imagery (08 §5.1); the 08 §0 grep gate blocks placeholders at launch. |

## D · Data (`src/data/*`, `src/lib/pricing.ts` owner)

| # | File | Request | Why |
|---|---|---|---|
| D-1 | `src/lib/pricing.ts` | If B-1 is resolved by shortening the chip, change only `heroPriceChip('tick-flea-treatment')`; the SP-4 list, the hero subhead, the sticky-bar label and the card chip are separate and already correct | W2M-5; keeps the one copy change in one place. |
| D-2 | `src/data/people.ts` | When a groomer is hired, add their puppy speciality for the puppy-grooming SP-7 cards — `specialityOn: { 'puppy-grooming': 'Gentle with first-timers and nervous puppies' }` or whatever is **true of them**. The layout already reads it (`GroomerCard page={slug}`); nothing on the page changes | puppy-grooming.md SP-7 "speciality line example"; honesty law — only true lines. No groomer is on the team yet, so no SP-7 card renders today. |

## E · Docs / FAQ (`faq.json` + blueprint owners)

| # | File | Request | Why |
|---|---|---|---|
| E-1 | `src/data/faq.json` | FYI — the `puppy-grooming-1` answer was reworded on 2026-10-08 ("Check your pup's vaccination dates **with your vet** first", no link) when `/ludhiana/dog-vaccination/` was not live (`00` §11 2026-10-08 honesty row). The puppy blueprint FAQ #1 intends the cross-link "on **our vaccination page** first" → `/ludhiana/dog-vaccination/`. Now that the page is live, the owner may restore the blueprint wording + add the link (frozen-file change → a decision-log entry). The puppy FAQ already cross-links the vaccination page from #7 and #8, so the silo is covered either way | 02 P074 forbade the link before the page shipped; now it is allowed (P069/P070). Optional, not a blocker. |

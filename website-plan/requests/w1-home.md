# Requests from w1-home (Wave 1, the home page `/`)

Branch `wave1/w1-home`. The R-numbers are the ones the "Loses / sync" column of `website-plan/decisions/w1-home.md`
cites. Each item names its owner. Nothing here blocks the merge: the page passes every gate on its own
(`decisions/w1-home.md` §3).

## Integrator (the merge commit)

| # | Request | Why |
|---|---|---|
| I-1 | **Flip `/` to live** in `src/data/routes.ts` (`status: 'live'`) **and add `'/': '2026-10-03'` to `LASTMOD`** in `src/data/lastmod.ts`, in the same commit. | `routes.ts` rule: the integrator flips a status, never the page builder. The build fails for a live route without a `LASTMOD` entry, and the sitemap needs the real date (`00` §11 E7, `02` P127). 2026-10-03 is the page's first material build. In this worktree's preview build `/` sits in `sitemap-0.xml` without `<lastmod>` for exactly this reason. |
| I-2 | **Run the gates with the build's environment and the whole Wave-1 dist.** `check:pages --pages /` prints 11 P074 WARNs here, one per live Wave-1 route that `/` links but that is not built in this worktree: `/ludhiana/dog-grooming/`, `/ludhiana/cat-grooming/`, `/ludhiana/dog-walking/`, `/ludhiana/vet-at-home/`, `/pricing/`, `/how-it-works/`, `/about/`, `/contact/`, `/faq/`, `/privacy-policy/`, `/terms/`. `--all` turns each into a FAIL until that page lands. | `website/README.md` "Checks"; f2-gates request 12. |
| I-3 | **P068 heads-up for `--all`.** From its `<main>` the home page links `/book/` (hero primary), the four Wave-1 money pages (H-3 cards), `/how-it-works/` (H-4), `/pricing/` (H-5) and `/about/` (H-8 "How we hire"). It does **not** link `/contact/`, `/faq/`, `/privacy-policy/` or `/terms/` in-body (footer links do not count), and home.md gives no block for such links. Those four need a contextual link from another page's body. | `02` P068 (launch-blocker); f2-gates request 11. |
| I-4 | **Wave 2 needs no home edit.** When `/offers/`, `/safety-hygiene/`, `/reviews/` or an area page flips live, the home page grows its links by itself at the next build (`isLive()`): the H-10 tiles link `/offers/`, "Read the full Promise" appears under the Promise, the H-9 cards and the FAQ #1 area names link their area pages. H-7 (before/after) and the H-8 groomer cards appear by themselves once `src/data/reviews.ts` holds ≥ 3 consented pairs and `src/data/people.ts` a real groomer (W1H-05, W1H-06). Rebuild and re-run `check:pages`. | `02` P074; home.md H-7 … H-10. |

## `06-CONVERSION-PLAYBOOK.md` owner

| # | Request | Why |
|---|---|---|
| R-1 | **§2.3 HOME subhead → the W1H-01 text:** "Grooming, walking and vet visits at your door — background-verified professionals, sealed kit, fixed prices from ₹299." (drop the closing sentence "Serving Sarabha Nagar, BRS Nagar, Model Town & all of Ludhiana." and the word "sanitised"). Log the change in `00` §11. | The built page and home.md H-1 already say this (orchestrator decision on f2-components S-1, option a). With the §2.3 text the fold fails `02` P150 by 44.4 px at 360×640; as built it passes with 8.3 px spare. |

## Chrome / shared-component owners (`Base.astro`, `PromiseBand.astro`, `Hero.astro`)

| # | Request | Why |
|---|---|---|
| R-2 | **`Base.astro` default `og:image:alt`** → the `04` §4 file-list alt "PetDoorStep — pet care at your doorstep in Ludhiana". The default prints "Pet care" with a capital P. The home page passes `ogImageAlt` explicitly, so this is for the pages that rely on the default. | `04` §4; W1H-08. |
| R-3 | **`PromiseBand.astro`: a bare (full-bleed) variant, or card padding 16 px until `lg`.** `08` §3.1 puts card padding at 24 px from ≥ 1024 and the page gutter at 16 px until then, but the strip pads `md:p-6` (24 px from 768). On its mint band the home page pulls the card back by the same amount (`-m-4 md:-m-6`) and clips the band's x-overflow so the 8 px that falls outside the viewport from 768 to 1023 never scrolls (W1H-09). A bare variant, or `lg:p-6`, lets that wrapper and the clip go. Optional: the page is correct as built (heading x = 16 / 16 / 16 / 24 / 64 px at 360 / 768 / 1023 / 1024 / 1280, no overflow). | `08` §3.1, §1.4 rule 5. |
| R-4 | **Hero chip row at 360 (f2-components O-1, still open).** On `/` the first trust chip is cut at the right edge of the scroll-snap row; `test:site` reads the fold vertically and passes. Whatever fix lands must add **no vertical height below `md`**: the home fold has 8.3 px to spare above the sticky bar (W1H-01), so a wrapped second chip row would fail P150 here. | `02` P150; decisions f2-components §1.4. |

## Sunny / photos (`08` §5.2 shot list)

| # | Request | Why |
|---|---|---|
| S-1 | **The hero photo** (shot 1, `golden-retriever-bath-home-ludhiana.jpg`, served as a 1200×900 crop) and the 7 H-3 card photos are placeholders. Until the real hero lands, `test:site` WARNs P099 (the LCP element is the H1, because Chrome ignores placeholder images) and Lighthouse mobile ≥ 90 (`00` §9.8) cannot be run meaningfully; it is home.md §6's one open ship check. The alt is home.md §5 verbatim ("ghar baithe pet care — doorstep pet grooming at home in Ludhiana"): if the real shot differs, change the alt in the same commit (`00` §11 E5; W1H-11). | `04` §5.2.2; home.md §6. |
| S-2 | **`[FILL:*]` tokens visible on `/`** come from the shared data files: `PHONE`, `WHATSAPP_NUMBER`, `EMAIL`, `GBP_LINK`, `GOOGLE_RATING`, `REVIEW_COUNT` (`check:fill` is the launch gate). The H-2 proof line and the E6 empty state link `[FILL:GBP_LINK]`; with 3 real Google reviews in `src/data/reviews.ts` the block switches to review cards on its own (W1H-12). | `02` P055; `06` §4.4. |

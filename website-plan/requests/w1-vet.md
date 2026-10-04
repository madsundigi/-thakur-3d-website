# Requests from stage w1-vet (Wave 1, `/ludhiana/vet-at-home/`)

Branch `wave1/w1-vet`. Needs in files this stage does not own; the decisions behind each item are in
`website-plan/decisions/w1-vet.md`. Each item names its owner. Nothing here blocks the merge: the page passes every gate
on its own (decisions §3).

## A · Integrator

| # | Request | Why |
|---|---|---|
| A-1 | When `/ludhiana/vet-at-home/` merges, **flip its route to `status: 'live'`** in `src/data/routes.ts` **and add `'/ludhiana/vet-at-home/': '2026-10-03'`** to `LASTMOD` in `src/data/lastmod.ts`, in the same commit | The build stops on a live route without a date (04 §7.1, E7); `check:pages --all` P127 needs it for the sitemap; the page's "Last updated" line (02 P143, template SP-11) renders only once the path has a date |
| A-2 | In the integrated `--all` run, resolve this page's 2 P074 WARNs — `/ludhiana/cat-grooming/` and `/ludhiana/dog-walking/`, live Wave-1 routes other stages build (the SP-11 Dog Walking card is the only one of the two linked from the body; cat-grooming is footer/nav) — and the P068 inbound links to this page from another page's `<main>`: home H-3 card, `/pricing/` PR-7, `/faq/` vet-category link, dog-grooming FAQ #7 ("vet home visit"), cat-grooming FAQ #5, dog-walking SP-11; in Wave 2 tick-flea FAQ #3 + SP-11 and dog-vaccination SP-11 + FAQ #7 | P074 / P068 are launch-blockers that can only be checked with every page built |
| A-3 | **Wave 2 needs no edit here.** When `/ludhiana/dog-vaccination/`, `/ludhiana/tick-flea-treatment/`, the area pages, `/safety-hygiene/` or the two blog posts flip live, the page grows its links by itself (`isLive()`): the SP-3 "Full details on Dog Vaccination at Home" pointer, the SP-11 cards, FAQ #4 / #5 links, the SP-9 area cards, "Read the full Promise". SP-5 appears by itself once `src/data/reviews.ts` holds ≥ 1 consented vet proof photo; the SP-7 card fills in from `src/data/people.ts`. Rebuild and re-run `check:pages` | 02 P074; W1L-18, W1V-05, W1V-07, W1V-08 |

## B · Sunny — launch fills (`00` §8 gate, `npm run check:fill`)

| # | Request | Why |
|---|---|---|
| B-1 | `src/data/site.ts` `emergencyVets`: **two nearby 24-hour veterinary hospitals with phone numbers, verified by calling them** (candidate to check: the GADVASU teaching veterinary hospital, Ludhiana). Write it as a plain phrase — e.g. "X Hospital, Area — 0161-…; Y Hospital, Area — 98…" — because it is read into "Nearest 24-hour hospitals: {list}." in FAQ #3 (`src/lib/faq.ts`) and in the SP-4 footer line, from the same field (W1V-06) | vet-at-home.md §0 rule 4 (launch blocker); the two placements can never disagree |
| B-2 | `src/data/people.ts` `vets[0]`: the real `name` and `regNo` (state veterinary council), then `years`, `languages`, `line` and `photo` (1:1 portrait with the registration certificate — blueprint §5), every value true, none estimated. The card renders whatever is filled (W1V-08) | §0 rules 1 + 3 ("no anonymous vet"); 02 P046 [Launch-blocker] |

## C · Photos (Sunny / shot list 08 §5.2)

| # | Request | Why |
|---|---|---|
| C-1 | Three real photos are still grey placeholders on this page: hero `vet-home-visit-pomeranian-ludhiana.jpg` (shot 10: registered vet examining a Pomeranian at home, vaccine cold box visible — the alt is already the blueprint §5 line, 00 §11 E5), SP-3 `vet-showing-medicine-mrp-ludhiana.jpg` (medicine pack with the MRP visible, shown to the owner), SP-7 the vet portrait (B-2). The SP-11 cards reuse the vaccination / tick / walking card shots other stages requested | `test:site` P099 warns that the LCP is the subhead, not the hero photo, while the hero is a placeholder (Chrome ignores placeholder images); it clears with the real file. No stock imagery (08 §5.1); the placeholders are blocked at launch by the 08 §0 grep gate |

## D · Docs (blueprint / spec owners)

| # | File | Request | Why |
|---|---|---|---|
| D-1 | `blueprints/vet-at-home.md` SP-5 | The proof-photo row has no H2 in the blueprint. Built with **"Real home visits"** (mirrors dog-walking.md SP-5 "Real walk updates"); confirm it or give the wording. Nothing renders until real photos exist, so there is time | W1V-07 |
| D-2 | template SP-4 vs `04` §2.2 | FYI: template SP-4 says the Service `offers` array "mirrors these exact figures", but the `04` §2.2 per-page table (kept by `00` §11 E8) gives the vet page **one** Offer (consult → 699, "medicines/vaccines at MRP") while SP-4 shows three lines; `src/lib/schema.ts` follows `04`. If the vaccination (199) and deworming (499) lines should also be Offers on this page, that is a `schema.ts` change for the gates/data owner — not requested here. 02 P087 and P049 pass either way | W1V-10 |
| D-3 | `02` P046 "linked bio" | The SP-7 card shows the vet's name, "BVSc & AH" and the Reg. No., and the block links "How we hire" → `/about/`, but the card itself links no bio: `/about/` AB-6 omits the team while nobody is hired. Once the vet is real, AB-6 renders the card under `#team-heading`; `GroomerCard.astro` (shared) could then link the vet's name there, or the launch audit counts the `/about/` card as the bio. Owner: GroomerCard / about / the audit | 02 P046 [Launch-blocker] |

## E · Data / shared components (FYI, not blocking)

| # | File | Note | Why |
|---|---|---|---|
| E-1 | CSS budget (`08` §8.1) | This page sits at **50,653 of 51,200 B** (547 B headroom; the dog page at 48,029). `VisitTypes.astro`'s scoped grid is about 600 B of it. A page that adds more page-specific CSS (cat / walking, Wave 2's vaccination schedule tables) may cross the budget; the budget owner may want to look at the shared CSS before then | `check:budgets` passes today |
| E-2 | `src/data/content.ts` `AREA_LINES['haibowal-kalan'].oneLiner` | "Bath & Brush from ₹599" is grooming copy; on this page it sits under "Vet at home in Haibowal Kalan" (SP-9, screenshot `chunk-360-04.png`) and in Wave 2 it will sit under "Dog vaccination at home in Haibowal Kalan". The other nine one-liners are service-neutral. Either a neutral line, or `ServicePage` passing `oneLiner` per page (`AreaCard` already takes the prop) | 06 tone; not a gate |

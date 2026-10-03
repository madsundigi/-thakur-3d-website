# Requests from stage w1-layout (Wave 1, `src/layouts/ServicePage.astro` + `/ludhiana/dog-grooming/`)

Needs in files this stage does not own. Decisions behind each item: `website-plan/decisions/w1-layout.md`. Each item
names its owner.

## A · Integrator

| # | Request | Why |
|---|---|---|
| A-1 | When `/ludhiana/dog-grooming/` merges, flip its route to `status: 'live'` in `src/data/routes.ts` and add `'/ludhiana/dog-grooming/': '2026-10-03'` (its last material content edit) to `LASTMOD` in `src/data/lastmod.ts`, in the same commit | The build stops on a live route without a date (04 §7.1, E7); `check:pages --all` P127 needs it for the sitemap; the page's "Last updated" line (02 P143, template SP-11) renders only once the path has a date |
| A-2 | **P161, blocks the `--all` run until fixed — `src/data/sources.ts` (gates/data owner):** `isCanonicalSource()` rejects `service_dog-grooming`, the body-CTA source of a money page that preselects nothing. `npm run check:pages -- --pages /ludhiana/dog-grooming/` reports exactly 2 FAIL, both this value (the E4 row after SP-2 and the mid-page CTA — the same `MONEY_PAGES[].cta` link, `/book/?src=service_dog-grooming`). The spec allows it: 09 §2d row "Pattern `service_<id>`" — "`<id>` is the preselected pricing.json service id, **or the page slug when the link preselects nothing**"; 07 §2 row 4 — "With nothing preselected: `/book/?src=service_<page-slug>`"; decision F2-04. Fix (one line + a doc line): `if (s.startsWith('service_')) return ids.has(s.slice(8)) \|\| MONEY_SLUGS.has(s.slice(8));` with `MONEY_SLUGS` = the 7 money-page slugs, copied import-free like `ROUTE_SLUGS`, and the `SERVICE_IDS` comment extended with the slug form | No value this stage's files can emit is both canonical and true: `service_full-groom` would claim a preselect the link does not make (E2 would then also demand that service's price in the label), and `dog-grooming_page` is the `<slug>_page` pattern for a page's other in-body wa.me / tel: links (09 §2d). Only `sources.ts` is wrong, and it is not in this stage's files |
| A-3 | In the integrated `--all` run, resolve this page's links to live Wave-1 routes built by other stages: `/`, `/pricing/`, `/how-it-works/`, `/about/`, `/ludhiana/cat-grooming/`, `/ludhiana/vet-at-home/` (11 P074 WARNs in this worktree, expected). Inbound P068 links to `/ludhiana/dog-grooming/` come from the home services grid (H-3), `/pricing/`, the header nav and SP-11 of the cat / walking / tick pages | P074 / P068 are launch-blockers; they can only be checked with every page built |

## B · Data (`src/data/*` owner)

| # | File | Request | Why |
|---|---|---|---|
| B-1 | `src/data/services.ts` `PACKAGE_TABLES['dog-grooming']` | FYI: the dog page drops the Full Groom header note ("full body dog grooming — haircut, styling, paw & sanitary trim") with `columnNotes={{ 'full-groom': '' }}`, because dog-grooming.md SP-3 is the template worked table verbatim, which has no note, and `/pricing/` pins the note itself (W1P-06). The `note` on the shared table and the services.ts comment "carries both page notes" can go whenever convenient; nothing breaks either way | W1L-13; closes the loop on w1-pricing B-3 |
| B-2 | `src/data/lastmod.ts` | See A-1 (the integrator adds the date with the route flip) | — |

## C · Photos (Sunny / shot list 08 §5.2)

| # | Request | Why |
|---|---|---|
| C-1 | Three real photos are still grey placeholders on this page: hero `golden-retriever-bath-home-ludhiana.jpg` (shot: groomer bathing a Golden Retriever on a Ludhiana verandah), SP-3 `sealed-sanitised-grooming-kit.jpg` (sealed kit pouch opened in front of the owner), SP-4 `dog-nail-trim-at-home.jpg` (nail trim close-up). Alts are already the blueprint §4 lines | `test:site` P099 warns that the LCP is the H1, not the hero photo, while the hero is a placeholder (Chrome ignores placeholder images); it clears with the real file. The page ships no stock imagery (08 §5.1) |

## D · Docs (docs owner)

| # | File | Sync |
|---|---|---|
| D-1 | `09-ANALYTICS-TRACKING.md` §2d | No change: `service_<page-slug>` is already written there. A-2 makes `sources.ts` match it |
| D-2 | `blueprints/pricing.md` / stage w1-pricing | FYI: w1-pricing request B-4 (PriceMatrix flat-line label basis 8rem → 7rem) is applied in this stage's `PriceMatrix.astro`; re-measure "Cat Full Groom" at 360 on `/pricing/` in the integrated build (expected: one line, 285 ≤ 296) |
| D-3 | `blueprints/cat-grooming.md`, `dog-walking.md`, `vet-at-home.md` builders | Not a request — the ServicePage API and the page-author notes are in `src/layouts/ServicePage.astro` (header) and `decisions/w1-layout.md` §2.3 |

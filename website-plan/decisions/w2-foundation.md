# Decisions — Wave 2 FOUNDATION (`wave2/w2-foundation`)

Shared infrastructure for the Wave-2 pages: the blog content collection + index/[slug], the `/ludhiana/` city hub, the
ten dynamic area pages, and the registry/gate plumbing they need. Base commit `c41a6b2`. Rule order (02 [Launch-blocker]
> blueprint > 00 §11 > 06/07/08/04/09) governs every call below.

| # | Decision | Why |
|---|---|---|
| D1 | **Blog content config lives at `src/content.config.ts`, not `src/content/config.ts`.** | Astro 7 (7.3.5) rejects the legacy path with `LegacyContentConfigError` and requires each collection to declare a `loader`. The task named `src/content/config.ts`; Astro 7's requirement wins. Posts + the README still live in `src/content/blog/`; the glob loader excludes `README.md`. |
| D2 | **Added `category` to the blog front-matter contract** (enum of the six `_TEMPLATE-blog-post.md` §6 index topics). | §1 front-matter did not list it, but the BlogCard (08 §4.15) and the index category chips (§6) both need a front-matter category. Defined once in `src/content.config.ts` (`BLOG_CATEGORIES`). |
| D3 | **`heroImage` is a `src/assets/photos/` filename; the og:image is derived as `/og/blog/<slug>.jpg`.** | The template's `./images/<slug>-hero.jpg` does not fit the site's existing `<Photo>` asset system (resolves names from `src/assets/photos/`, renders a dev placeholder until the shoot). The 04 §2.7 og crop (`/og/blog/<slug>.jpg`) is added to `public/og/blog/` by the post author; the build fails if that crop is missing (Base.astro og check). |
| D4 | **`description` floor raised to 120 chars in the schema** (zod `min(120).max(158)`). | The template says ≤ 155, but check:pages P019 (02 launch-blocker) holds every indexable meta to 120–158. Matching the schema to the gate fails a too-short description at build, not at the gate. |
| D5 | **`Base.astro` gained optional `ogType` + `articlePublished`/`articleModified` props** (default `website`, no article metas). | `og:type` is only emitted from Base, and blog posts need `og:type=article` + `article:published_time`/`article:modified_time` (04 §2.7, and the new check:pages rule). The change is byte-for-byte backward-compatible: every existing page passes nothing → identical output (verified: Wave-1 heads unchanged, e2e 55/55). Base.astro was not in the stage's file list, but the deliverable (og:type=article on posts) is impossible without it, and it is exactly the "shared infrastructure the Wave-2 pages need" this stage owns. **Flagged for the integrator** in `requests/w2-foundation.md`. |
| D6 | **Area/hub/blog `source` values use the canonical 09 §2d patterns** — `hero_<slug>`, `ctaband_<slug>`, `<slug>_page` — **not** the area template's `hero_area-<slug>`. | P161 (02 launch-blocker, enforced by check:pages) only accepts `hero_<ROUTE_SLUG>` etc.; `area-<slug>` is not a route slug. The template's `hero_area-<slug>` predates `src/data/sources.ts`. The area slugs are already in `ROUTE_SLUGS`. |
| D7 | **Area H1 is `Pet Grooming at Home in {Area}, Ludhiana` ("in" even for road localities);** the SERP title keeps "on" for roads (Pakhowal Road, Ferozepur Road). | 04 §2.0.3: the H1 and the Service-node `name` must match, and `areaServiceLd()` (src/lib/schema.ts, not editable here) builds the name as "…in {Area}, Ludhiana". The title's "on" for roads is the 03 §3 keyword form and is a separate string. |
| D8 | **Area meta tightened** from the §3 "PetDoorStep brings … to homes in {Area}" formula to `Doorstep grooming, walking and vet visits {in/on} {Area}, Ludhiana — {local line}. Fixed prices from ₹599. Book on WhatsApp.` | The §3 formula ran 161–162 chars for Civil Lines, Pakhowal Road and Ferozepur Road (over the P019 158 cap, a 02 launch-blocker). The tightened form lands at 122–152 for all ten; the §4 local line is unchanged and "Ludhiana" is still carried (P013). ₹ from `fromPrice()`. |
| D9 | **Area AP-10 is a WhatsApp CTA + a link to `/book/`, NOT the booking island.** | 04 §5.3 / check:budgets P103: the React island ships on `/book/` only (every other page is zero-JS). The template's AP-10 island loses to the launch-blocker; the template's own no-JS wa.me fallback is used, plus an "Open the booking form" link to `/book/?src=<slug>_page`. |
| D10 | **Area AP-3 shows the three dog-grooming size ranges** (`priceRange('bath-brush'/'full-groom'/'premium-spa')`) under the four service cards. | The area Service node (`areaServiceLd` → the three dog packages) carries each Offer's min + max price. check:pages P087 requires every schema price to be visible on the page; the cards only show the "from" (min) price, so the size-range line makes the max prices visible too. |
| D11 | **Blog index category chips are plain labels, not links,** for now. | The per-category tag/filter pages are Wave 3; linking them now would break P074 (links only to live pages). They become filter links when the tag pages ship. |
| D12 | **Area pages build in both modes** (getStaticPaths over all ten); liveness/linking/sitemap are driven by route status, not by whether the file builds. | Matches the routes model ("a page built on a branch keeps its route 'planned' until it lands"). In production they are built-but-not-live (not in the sitemap, linked only as plain text); the integrator flips each route to `live` when its §0 publish gate passes. |

## check-pages.mjs changes (Wave-1 behaviour kept identical)

- **New head rule (P117):** a blog post must carry `og:type=article` + exactly one each of `article:published_time` /
  `article:modified_time` (ISO dates); every other indexable page stays `og:type=website`. Wave-1 pages all emit
  `website`, so they pass unchanged.
- **New schema-matrix row:** `/blog/` index → `BreadcrumbList` (the `_TEMPLATE-blog-post.md` §6 schema). Blog posts,
  area pages and the hub already had rows in `scripts/lib/plan.mjs` (`BlogPosting`, `Service`, `WebPage` + Breadcrumb).
- **Broadened WARN:** in `--pages` mode, a link to a *live route whose page is not in this partial dist* is a WARN
  ("another builder owns that page"), was previously limited to wave ≤ 1. Under `wave2` preview the header/footer link
  the not-yet-built Wave-2 pages (reviews, offers, safety-hygiene, join-as-groomer, the 3 wave-2 money pages) on every
  page, so without this the preview gate would FAIL. `--all` still FAILs an unbuilt live route. Wave-1 runs never reach
  the wave ≥ 2 branch (nothing links non-live routes), so their output is unchanged.

## Verification (final state: clean `wave2` build, empty blog collection)

- `wave2` build ✓ (27 pages; the only React island is on `/book/`) · production build (no switch) ✓ (Wave-2 links plain
  text, Wave-2 pages out of the sitemap, Wave-1 heads byte-identical).
- `check:prices` OK · `check:pages --pages /blog/,/ludhiana/,/ludhiana/areas/{sarabha-nagar,dugri,model-town,ferozepur-road}/`
  → 0 FAIL · `check:budgets` 0 FAIL (dog-grooming CSS back under 51,200 B after trimming new utilities).
- `test:site` on `/blog/` (empty state), `/ludhiana/`, and five area pages → 0 FAIL (no overflow at 360/768/1280, axe
  serious/critical 0, ld+json parses, no console errors); the only WARNs are the placeholder-LCP note Wave-1 also shows.
- `e2e` 55/55 (run with `env -u PUBLIC_PDS_PREVIEW_LIVE`, E2E_PORT=4610).
- Blog-post path verified end-to-end with a throwaway post (removed): og:type=article + article times + BlogPosting /
  BreadcrumbList, passes check:pages.

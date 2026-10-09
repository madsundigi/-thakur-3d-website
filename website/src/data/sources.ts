// Canonical analytics `source` values — mirrors website-plan/09-ANALYTICS-TRACKING.md §2d (the `src` entry points of
// 07-BOOKING-SPEC.md §2 plus the anchor locations 09 defines). Every `data-source` attribute and every `/book/?src=`
// value on the site must pass isCanonicalSource(); anything else is a bug (09 §2d) — `npm run check:pages` fails it.
//
// Import-free on purpose (pure data + one function): scripts/check-pages.mjs and tests/site.mjs load this file in
// plain Node. So the route slugs and service ids are copied here, not imported. check:pages warns when they drift from
// src/data/routes.ts or src/data/pricing.json — update the two lists below in the commit that adds a route or service.

/** Fixed values. 09 §2d names all but `groomclub` (Groom Club CTAs → /offers/, Wave-1 contract C2). */
export const SOURCES = [
  'sticky_bar',
  'header',
  'pricing_row',
  'book_page',
  'exit_nudge',
  'float_desktop',
  'confirm_button',
  'review_screen',
  'footer',
  'noscript_block',
  'not_found',
  'groomclub',
  'blog_card', // a tracked CTA inside a BlogCard / blog body (08 §4.15; blueprints/_TEMPLATE-blog-post.md BP-5/BP-10)
] as const;

export type FixedSource = (typeof SOURCES)[number];

/** Page slugs for `hero_<slug>`, `ctaband_<slug>` and `<slug>_page`: the last path segment of every route in
 *  src/data/routes.ts, with `/` → `home` (07 §2 row 3: "home = hero_home"). */
export const ROUTE_SLUGS = [
  'home', 'book', 'pricing',
  'ludhiana', 'dog-grooming', 'cat-grooming', 'dog-walking', 'vet-at-home',
  'dog-vaccination', 'tick-flea-treatment', 'puppy-grooming',
  'how-it-works', 'about', 'contact', 'faq', 'reviews', 'safety-hygiene', 'offers', 'join-as-groomer',
  'privacy-policy', 'terms', 'refund-policy',
  'sarabha-nagar', 'brs-nagar', 'model-town', 'civil-lines', 'dugri',
  'pakhowal-road', 'south-city', 'ferozepur-road', 'haibowal-kalan', 'kitchlu-nagar',
  // blog index + posts (01-SITEMAP §4) — `blog_page`, `hero_<post-slug>`, `ctaband_<post-slug>`, `<post-slug>_page`.
  'blog', 'dog-grooming-price-list-ludhiana', 'puppy-vaccination-schedule-india',
  // Wave-3 posts (calendar weeks 3–14):
  'diwali-pet-care-ludhiana', 'winter-dog-care-north-india', 'wedding-season-pet-care-punjab',
  'dog-walker-cost-india', 'puppy-diet-plan-first-3-months', 'puppy-first-grooming-age',
  'dog-deworming-schedule-india', 'dog-vaccination-cost-ludhiana', 'full-dog-grooming-package-included',
  'home-grooming-vs-salon-india', 'how-often-bathe-dog-india', 'vet-home-visit-vs-clinic',
] as const;

/** Service ids for `service_<id>` — the `services[].id` values of src/data/pricing.json (07 §2 row 4). */
export const SERVICE_IDS = [
  'full-groom', 'bath-brush', 'premium-spa', 'puppy-intro', 'cat-grooming', 'dog-walking',
  'vet-visit', 'vaccination', 'tick-flea', 'deworming', 'nail-ear',
] as const;

const fixed: ReadonlySet<string> = new Set<string>(SOURCES);
const slugs: ReadonlySet<string> = new Set<string>(ROUTE_SLUGS);
const ids: ReadonlySet<string> = new Set<string>(SERVICE_IDS);

/** True for a 09 §2d canonical source: a fixed value, `hero_<slug>`, `ctaband_<slug>`, `<slug>_page` or
 *  `service_<id>` (slug = a ROUTE_SLUGS entry, id = a SERVICE_IDS entry). */
export function isCanonicalSource(s: string | null | undefined): boolean {
  if (typeof s !== 'string' || s === '') return false;
  if (fixed.has(s)) return true;
  if (s.startsWith('hero_')) return slugs.has(s.slice(5));
  if (s.startsWith('ctaband_')) return slugs.has(s.slice(8));
  if (s.startsWith('service_')) return ids.has(s.slice(8)) || slugs.has(s.slice(8)); // `service_<page-slug>` when nothing is preselected (07 §2 row 4)
  if (s.endsWith('_page')) return slugs.has(s.slice(0, -5));
  return false;
}

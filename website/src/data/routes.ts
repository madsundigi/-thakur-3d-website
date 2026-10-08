// Page registry — mirrors website-plan/01-SITEMAP.md (path, page name, wave). Every internal link on the site goes
// through isLive(): a page is linked ONLY while its route counts as live (02-SEO-PARAMETERS P074: zero broken
// internal links); until then nav items, cards and in-answer links render as plain text or not at all.
//
// Who flips a status: the integrator, in the commit that merges a finished page — never the page builder. A page
// built on a branch keeps its route 'planned' until it lands together with every link that points at it.
//
// Preview switch (review builds only): with PUBLIC_PDS_PREVIEW_LIVE=wave1 in the build environment, every wave-1
// route counts as live without editing a status, so the whole launch set can be clicked through before it ships.
// PUBLIC_PDS_PREVIEW_LIVE=wave2 does the same for every wave ≤ 2 route (so Wave-2 cross-links render during review);
// wave1 stays wave-1-only. Never set either for a production build. It is read wherever this module runs: Astro pages and the React booking island
// (Vite inlines PUBLIC_* values as import.meta.env.*), astro.config.mjs and plain Node / esbuild bundles
// (process.env). A runtime without either simply sees no preview.

export type RouteStatus = 'live' | 'planned';
export type RouteGroup = 'core' | 'service' | 'area' | 'trust' | 'legal' | 'blog';

export interface RouteEntry {
  path: string;
  label: string; // page name per 01-SITEMAP (used for nav, footer, breadcrumbs)
  group: RouteGroup;
  wave: 0 | 1 | 2 | 3;
  status: RouteStatus;
}

export const routes: RouteEntry[] = [
  // core & conversion
  { path: '/', label: 'Home', group: 'core', wave: 1, status: 'live' },
  { path: '/book/', label: 'Book a Service', group: 'core', wave: 1, status: 'live' },
  { path: '/pricing/', label: 'Pricing', group: 'core', wave: 1, status: 'live' },
  // money pages
  { path: '/ludhiana/', label: 'Ludhiana', group: 'service', wave: 2, status: 'live' },
  { path: '/ludhiana/dog-grooming/', label: 'Dog Grooming at Home', group: 'service', wave: 1, status: 'live' },
  { path: '/ludhiana/cat-grooming/', label: 'Cat Grooming at Home', group: 'service', wave: 1, status: 'live' },
  { path: '/ludhiana/dog-walking/', label: 'Dog Walking', group: 'service', wave: 1, status: 'live' },
  { path: '/ludhiana/vet-at-home/', label: 'Vet at Home', group: 'service', wave: 1, status: 'live' },
  { path: '/ludhiana/dog-vaccination/', label: 'Dog Vaccination at Home', group: 'service', wave: 2, status: 'live' },
  { path: '/ludhiana/tick-flea-treatment/', label: 'Tick & Flea Treatment', group: 'service', wave: 2, status: 'live' },
  { path: '/ludhiana/puppy-grooming/', label: 'Puppy Grooming', group: 'service', wave: 2, status: 'live' },
  // trust, info & supply
  { path: '/how-it-works/', label: 'How it works', group: 'trust', wave: 1, status: 'live' },
  { path: '/about/', label: 'About', group: 'trust', wave: 1, status: 'live' },
  { path: '/contact/', label: 'Contact', group: 'trust', wave: 1, status: 'live' },
  { path: '/faq/', label: 'FAQ', group: 'trust', wave: 1, status: 'live' },
  { path: '/reviews/', label: 'Reviews', group: 'trust', wave: 2, status: 'live' },
  { path: '/safety-hygiene/', label: 'Safety & Hygiene', group: 'trust', wave: 2, status: 'live' },
  { path: '/offers/', label: 'Offers', group: 'trust', wave: 2, status: 'live' },
  { path: '/join-as-groomer/', label: 'Join as Groomer', group: 'trust', wave: 2, status: 'live' },
  // legal
  { path: '/privacy-policy/', label: 'Privacy Policy', group: 'legal', wave: 1, status: 'live' },
  { path: '/terms/', label: 'Terms', group: 'legal', wave: 1, status: 'live' },
  { path: '/refund-policy/', label: 'Refund Policy', group: 'legal', wave: 2, status: 'live' },
  // blog (index + the first two posts — 01-SITEMAP §4; anatomy blueprints/_TEMPLATE-blog-post.md). The posts' .md
  // content is owned by the content builder (src/content/blog/); these rows let isLive() gate the links to them.
  { path: '/blog/', label: 'Blog', group: 'blog', wave: 2, status: 'live' },
  { path: '/blog/dog-grooming-price-list-ludhiana/', label: 'Dog Grooming Price List in Ludhiana', group: 'blog', wave: 2, status: 'live' },
  { path: '/blog/puppy-vaccination-schedule-india/', label: 'Puppy Vaccination Schedule (India)', group: 'blog', wave: 2, status: 'live' },
  // areas (staggered publishing — 05-LOCAL-SEO §6.10)
  ...[
    ['sarabha-nagar', 'Sarabha Nagar'], ['brs-nagar', 'BRS Nagar'], ['model-town', 'Model Town'],
    ['civil-lines', 'Civil Lines'], ['dugri', 'Dugri'], ['pakhowal-road', 'Pakhowal Road'],
    ['south-city', 'South City'], ['ferozepur-road', 'Ferozepur Road'], ['haibowal-kalan', 'Haibowal Kalan'],
    ['kitchlu-nagar', 'Kitchlu Nagar'],
  ].map(([slug, label]) => ({
    path: `/ludhiana/areas/${slug}/`, label, group: 'area' as const, wave: 2 as const, status: 'planned' as const,
  })),
];

/** The preview switch value, or undefined. Each read is guarded: plain Node has no import.meta.env, a browser has no
 *  process — neither may throw. Vite replaces `import.meta.env.PUBLIC_PDS_PREVIEW_LIVE` with the build-time value. */
function previewSwitch(): string | undefined {
  try {
    const v: unknown = import.meta.env.PUBLIC_PDS_PREVIEW_LIVE;
    if (typeof v === 'string' && v) return v;
  } catch {
    /* no import.meta.env here (plain Node / esbuild bundle) — fall through to process.env */
  }
  try {
    const v = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.PUBLIC_PDS_PREVIEW_LIVE;
    if (typeof v === 'string' && v) return v;
  } catch {
    /* no process (browser) */
  }
  return undefined;
}

/** True only in a review build made with PUBLIC_PDS_PREVIEW_LIVE=wave1 (every wave-1 route then counts as live). */
export const PREVIEW_WAVE1: boolean = previewSwitch() === 'wave1';
/** True only in a review build made with PUBLIC_PDS_PREVIEW_LIVE=wave2 (every wave ≤ 2 route then counts as live). */
export const PREVIEW_WAVE2: boolean = previewSwitch() === 'wave2';

const byPath = new Map(routes.map((r) => [r.path, r]));

const counts = (r: RouteEntry | undefined): boolean =>
  !!r && (r.status === 'live' || (PREVIEW_WAVE1 && r.wave === 1) || (PREVIEW_WAVE2 && r.wave <= 2));

export const isLive = (path: string): boolean => counts(byPath.get(path));
export const routeLabel = (path: string): string => byPath.get(path)?.label ?? path;
export const liveRoutes = (group: RouteGroup): RouteEntry[] => routes.filter((r) => r.group === group && counts(r));

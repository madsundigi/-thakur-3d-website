// Page registry — mirrors website-plan/01-SITEMAP.md. A page links anywhere on the site ONLY when its status is
// 'live' (02-SEO-PARAMETERS P074: zero broken internal links). Flip a page to 'live' in the same commit that builds it.

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
  { path: '/', label: 'Home', group: 'core', wave: 1, status: 'planned' },
  { path: '/book/', label: 'Book a Service', group: 'core', wave: 1, status: 'live' },
  { path: '/pricing/', label: 'Pricing', group: 'core', wave: 1, status: 'planned' },
  // money pages
  { path: '/ludhiana/', label: 'Ludhiana', group: 'service', wave: 2, status: 'planned' },
  { path: '/ludhiana/dog-grooming/', label: 'Dog Grooming at Home', group: 'service', wave: 1, status: 'planned' },
  { path: '/ludhiana/cat-grooming/', label: 'Cat Grooming at Home', group: 'service', wave: 1, status: 'planned' },
  { path: '/ludhiana/dog-walking/', label: 'Dog Walking', group: 'service', wave: 1, status: 'planned' },
  { path: '/ludhiana/vet-at-home/', label: 'Vet at Home', group: 'service', wave: 1, status: 'planned' },
  { path: '/ludhiana/dog-vaccination/', label: 'Dog Vaccination', group: 'service', wave: 2, status: 'planned' },
  { path: '/ludhiana/tick-flea-treatment/', label: 'Tick & Flea Treatment', group: 'service', wave: 2, status: 'planned' },
  { path: '/ludhiana/puppy-grooming/', label: 'Puppy Grooming', group: 'service', wave: 2, status: 'planned' },
  // trust, info & supply
  { path: '/how-it-works/', label: 'How it works', group: 'trust', wave: 1, status: 'planned' },
  { path: '/about/', label: 'About', group: 'trust', wave: 1, status: 'planned' },
  { path: '/contact/', label: 'Contact', group: 'trust', wave: 1, status: 'planned' },
  { path: '/faq/', label: 'FAQ', group: 'trust', wave: 1, status: 'planned' },
  { path: '/reviews/', label: 'Reviews', group: 'trust', wave: 2, status: 'planned' },
  { path: '/safety-hygiene/', label: 'Safety & Hygiene', group: 'trust', wave: 2, status: 'planned' },
  { path: '/offers/', label: 'Offers', group: 'trust', wave: 2, status: 'planned' },
  { path: '/join-as-groomer/', label: 'Join as Groomer', group: 'trust', wave: 2, status: 'planned' },
  // legal
  { path: '/privacy-policy/', label: 'Privacy Policy', group: 'legal', wave: 1, status: 'planned' },
  { path: '/terms/', label: 'Terms', group: 'legal', wave: 1, status: 'planned' },
  { path: '/refund-policy/', label: 'Refund Policy', group: 'legal', wave: 2, status: 'planned' },
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

const byPath = new Map(routes.map((r) => [r.path, r]));

export const isLive = (path: string): boolean => byPath.get(path)?.status === 'live';
export const routeLabel = (path: string): string => byPath.get(path)?.label ?? path;
export const liveRoutes = (group: RouteGroup): RouteEntry[] =>
  routes.filter((r) => r.group === group && r.status === 'live');

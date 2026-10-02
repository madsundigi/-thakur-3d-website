// JSON-LD builders — patterns from website-plan/04-TECHNICAL-SEO.md §2. No Review/AggregateRating, ever (§2.0.4).
// Every price comes from src/data/pricing.json (via ./pricing), every offer amount from src/data/offers.ts, every
// contact value from src/data/site.ts, every FAQ from src/data/faq.json (via ./faq). Absolute URLs are built from
// Astro.site — the same base as the canonical (§3).
// Use one <script> per page holding a single @graph (§2.0.1): `jsonLd={[schemaGraphLd({ type: 'pricing', crumbs }, Astro.site)]}`.
import { bookingSteps } from '../data/content';
import { FIRSTGROOM } from '../data/offers';
import { routeLabel, routes } from '../data/routes';
import { instagramHref, isFilled, site as biz } from '../data/site';
import { faqFor, type FaqEntry } from './faq';
import { areas, getService, inr, sizeGuide, type Service } from './pricing';

export interface Crumb { label: string; path: string }

export function breadcrumbLd(items: Crumb[], site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      item: new URL(it.path, site).href,
    })),
  };
}

// ---- shared ------------------------------------------------------------------------------------------------------

export type JsonLd = Record<string, unknown>;
type Site = URL | undefined;

const CONTEXT = 'https://schema.org';

/** Absolute URL on the site origin — identical to the canonical the base layout emits (04 §3.1). */
export function absUrl(path: string, site: Site): string {
  if (!site) throw new Error('schema: Astro.site is not set (astro.config.mjs `site`) — JSON-LD needs absolute URLs');
  return new URL(path, site).href;
}

/** The stable @id values (04 §2.0.2: one entity, one @id). LocalBusiness doubles as the Organization (04 §2.6). */
export const ldId = {
  business: (site: Site) => absUrl('/#business', site),
  website: (site: Site) => absUrl('/#website', site),
  service: (path: string, site: Site) => `${absUrl(path, site)}#service`,
  catalog: (site: Site) => `${absUrl('/pricing/', site)}#catalog`,
  offersCatalog: (site: Site) => `${absUrl('/offers/', site)}#catalog`,
  article: (slug: string, site: Site) => `${absUrl(`/blog/${slug}/`, site)}#article`,
  webpage: (path: string, site: Site) => `${absUrl(path, site)}#webpage`,
};

const ref = (id: string) => ({ '@id': id });

/** Image + logo used by the business node. 04 §2.1 names /og/petdoorstep-home.jpg and /images/petdoorstep-logo.png,
 *  neither of which exists yet — these point at the shipped brand OG image and 512 px icon so Google never fetches
 *  a 404. Swap to the 04 paths in the commit that adds those files. */
export const BUSINESS_IMAGE_PATH = '/og/default.png';
export const BUSINESS_LOGO_PATH = '/icon-512.png';

// Facts that live only in 04 §2.1 (not contact values): country code + Ludhiana city-centre coordinate.
const COUNTRY = 'IN';
const GEO = { latitude: 30.9010, longitude: 75.8573 };

const BUSINESS_DESCRIPTION =
  'Doorstep pet care in Ludhiana, Punjab: dog and cat grooming at home, dog walking, vet-at-home visits, vaccination and tick & flea treatment. Background-verified groomers, fresh sanitised kit for every pet, fixed transparent prices.';

/** Opening hours parsed from site.hours.visits ("Mon–Sun 9:00–19:00 …") so the hours live in one place. */
function openingHours() {
  const m = biz.hours.visits.match(/^Mon–Sun (\d{1,2}):(\d{2})–(\d{1,2}):(\d{2})/);
  if (!m) throw new Error(`schema: cannot read opening hours from site.hours.visits "${biz.hours.visits}" — update openingHours()`);
  const hhmm = (h: string, mm: string) => `${h.padStart(2, '0')}:${mm}`;
  return [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: hhmm(m[1], m[2]),
    closes: hhmm(m[3], m[4]),
  }];
}

function need(id: string): Service {
  const s = getService(id);
  if (!s) throw new Error(`schema: service "${id}" missing from pricing.json`);
  return s;
}
function bySize(id: string) {
  const p = need(id).pricing;
  if (p.type !== 'by_size') throw new Error(`schema: "${id}" is not priced by size`);
  return p;
}
function flatPrice(id: string): number {
  const p = need(id).pricing;
  if (p.type === 'flat' || p.type === 'flat_plus') return p.price;
  throw new Error(`schema: "${id}" has no flat price`);
}
function plusText(id: string): string {
  const p = need(id).pricing;
  if (p.type !== 'flat_plus') throw new Error(`schema: "${id}" is not flat_plus`);
  return p.plus;
}
function addonPrice(id: string): number {
  const p = need(id).pricing;
  if (p.type !== 'flat' || !p.addonPrice) throw new Error(`schema: "${id}" has no add-on price`);
  return p.addonPrice;
}
function planPrice(serviceId: string, planId: string): number {
  const p = need(serviceId).pricing;
  const plan = p.type === 'plans' ? p.plans.find((x) => x.id === planId) : undefined;
  if (!plan) throw new Error(`schema: plan "${planId}" missing from "${serviceId}"`);
  return plan.price;
}
/** Schema prices are plain numbers as strings (04 §2.5: "price": "699"). */
const num = (n: number) => String(n);

// ---- §2.1 LocalBusiness (service-area business: no street address) -------------------------------------------------

export function localBusinessLd(site: Site): JsonLd {
  // sameAs is URL-typed: an unfilled token would resolve to a junk URL and be dropped silently, so it is left out
  // until the value exists. telephone/email keep their visible [FILL:*] tokens (launch gate: npm run check:fill).
  const sameAs = [isFilled(biz.instagram) ? instagramHref() : null, isFilled(biz.gbpLink) ? biz.gbpLink : null]
    .filter((v): v is string => !!v);
  return {
    '@context': CONTEXT,
    '@type': 'LocalBusiness',
    '@id': ldId.business(site),
    name: biz.name,
    slogan: biz.tagline,
    description: BUSINESS_DESCRIPTION,
    url: absUrl('/', site),
    telephone: biz.phone,
    email: biz.email,
    image: absUrl(BUSINESS_IMAGE_PATH, site),
    logo: absUrl(BUSINESS_LOGO_PATH, site),
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    address: {
      '@type': 'PostalAddress',
      addressLocality: biz.city,
      addressRegion: biz.region,
      addressCountry: COUNTRY,
    },
    geo: { '@type': 'GeoCoordinates', latitude: GEO.latitude, longitude: GEO.longitude },
    areaServed: [
      { '@type': 'City', name: biz.city },
      ...areas.map((a) => ({ '@type': 'Place', name: `${a}, ${biz.city}` })),
    ],
    openingHoursSpecification: openingHours(),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

// ---- §2.2 Service (money pages + area variant) ---------------------------------------------------------------------

export type ServicePage =
  | 'dog-grooming' | 'cat-grooming' | 'dog-walking' | 'vet-at-home'
  | 'dog-vaccination' | 'tick-flea-treatment' | 'puppy-grooming';

interface OfferRow { name: string; price: number; description?: string }

const DOG_GROOM_ROWS: { id: string; name: string; kg: boolean }[] = [
  { id: 'bath-brush', name: 'Bath & Brush — bath, blow-dry, brush-out, nail trim, ear clean', kg: true },
  { id: 'full-groom', name: 'Full Groom — Bath & Brush plus haircut/styling, paw & sanitary trim', kg: false },
  { id: 'premium-spa', name: 'Premium Spa Groom — Full Groom plus de-shed/de-mat, conditioning masque, perfume', kg: false },
];

/** The three dog-grooming packages as size-ranged Offers (04 §2.2 worked example). */
function dogGroomOffers(url: string): JsonLd[] {
  return DOG_GROOM_ROWS.map((r) => {
    const p = bySize(r.id);
    const description = r.kg
      ? `Small dog (${sizeGuide.small.kg}) ${inr(p.small)} · Medium (${sizeGuide.medium.kg}) ${inr(p.medium)} · Large (${sizeGuide.large.kg}) ${inr(p.large)}`
      : `Small dog ${inr(p.small)} · Medium ${inr(p.medium)} · Large ${inr(p.large)}`;
    return {
      '@type': 'Offer',
      name: r.name,
      priceCurrency: 'INR',
      priceSpecification: { '@type': 'PriceSpecification', minPrice: p.small, maxPrice: p.large, priceCurrency: 'INR' },
      description,
      availability: 'https://schema.org/InStock',
      url,
    };
  });
}

/** Flat-price Offer rows per money page (04 §2.2 per-page table). */
function flatRows(page: Exclude<ServicePage, 'dog-grooming'>): OfferRow[] {
  switch (page) {
    case 'cat-grooming':
      return [
        { name: 'Cat Bath & Brush', price: planPrice('cat-grooming', 'cat-bath-brush') },
        { name: 'Cat Full Groom', price: planPrice('cat-grooming', 'cat-full') },
      ];
    case 'dog-walking':
      return [
        { name: '1 walk/day monthly', price: planPrice('dog-walking', 'walk-1x') },
        { name: '2 walks/day monthly', price: planPrice('dog-walking', 'walk-2x') },
        { name: 'Walking Trial Week', price: planPrice('dog-walking', 'walk-trial') },
      ];
    case 'vet-at-home':
      return [{ name: 'Vet Home Visit (consult)', price: flatPrice('vet-visit'), description: plusText('vet-visit') }];
    case 'dog-vaccination':
      return [
        { name: 'Vaccination at Home', price: flatPrice('vaccination'),
          description: `${inr(flatPrice('vaccination'))} service fee + ${plusText('vaccination')}` },
        { name: 'Deworming Visit', price: flatPrice('deworming') },
      ];
    case 'tick-flea-treatment':
      return [
        { name: 'Add-on with any groom', price: addonPrice('tick-flea') },
        { name: 'Standalone visit', price: flatPrice('tick-flea') },
      ];
    case 'puppy-grooming': {
      const s = need('puppy-intro');
      return [{ name: `${s.label} (${s.constraint})`, price: flatPrice('puppy-intro') }];
    }
  }
}

/** name = the page H1's keyword phrase (04 §2.0.3: H1 and Service node must match); serviceType per 04 §2.2. */
export const SERVICE_PAGES: Record<ServicePage, { name: string; serviceType: string }> = {
  'dog-grooming': { name: 'Dog Grooming at Home in Ludhiana', serviceType: 'Dog grooming at home' },
  'cat-grooming': { name: 'Cat Grooming at Home in Ludhiana', serviceType: 'Cat grooming at home' },
  'dog-walking': { name: 'Dog Walker in Ludhiana', serviceType: 'Dog walking' },
  'vet-at-home': { name: 'Vet at Home in Ludhiana', serviceType: 'Veterinary home visit' },
  'dog-vaccination': { name: 'Dog Vaccination at Home in Ludhiana', serviceType: 'Pet vaccination at home' },
  'tick-flea-treatment': { name: 'Tick & Flea Treatment for Dogs in Ludhiana', serviceType: 'Tick and flea treatment at home' },
  'puppy-grooming': { name: 'Puppy Grooming at Home in Ludhiana', serviceType: 'Puppy grooming at home' },
};

function serviceNode(o: { path: string; name: string; serviceType: string; areaServed: JsonLd; offers: JsonLd[] }, site: Site): JsonLd {
  return {
    '@context': CONTEXT,
    '@type': 'Service',
    '@id': ldId.service(o.path, site),
    name: o.name,
    serviceType: o.serviceType,
    url: absUrl(o.path, site),
    provider: ref(ldId.business(site)),
    areaServed: o.areaServed,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: absUrl('/book/', site),
      availableLanguage: ['en', 'hi', 'pa'],
    },
    offers: o.offers,
  };
}

/** Service node for a money page `/ludhiana/<page>/`; offers = exactly that page's visible prices. */
export function serviceLd(page: ServicePage, site: Site): JsonLd {
  const path = `/ludhiana/${page}/`;
  const url = absUrl(path, site);
  const offers = page === 'dog-grooming'
    ? dogGroomOffers(url)
    : flatRows(page).map((r) => ({
        '@type': 'Offer',
        name: r.name,
        ...(r.description ? { description: r.description } : {}),
        price: num(r.price),
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url,
      }));
  return serviceNode({ path, ...SERVICE_PAGES[page], areaServed: { '@type': 'City', name: biz.city }, offers }, site);
}

/** Area-page variant (04 §2.2 last row): "Pet Grooming at Home in {Area}, Ludhiana", one Place, the 3 dog packages. */
export function areaServiceLd(areaSlug: string, site: Site): JsonLd {
  const path = `/ludhiana/areas/${areaSlug}/`;
  if (!routes.some((r) => r.path === path && r.group === 'area')) throw new Error(`schema: unknown area "${areaSlug}"`);
  const area = routeLabel(path);
  return serviceNode({
    path,
    name: `Pet Grooming at Home in ${area}, ${biz.city}`,
    serviceType: 'Pet grooming at home',
    areaServed: { '@type': 'Place', name: `${area}, ${biz.city}` },
    offers: dogGroomOffers(absUrl(path, site)),
  }, site);
}

// ---- §2.3 FAQPage --------------------------------------------------------------------------------------------------

/** FAQPage from faq.json entries — question/answer text verbatim (the same entries Faq.astro renders). */
export function faqPageLd(entries: readonly FaqEntry[]): JsonLd {
  if (!entries.length) throw new Error('schema: faqPageLd() needs at least one FAQ entry');
  return {
    '@context': CONTEXT,
    '@type': 'FAQPage',
    mainEntity: entries.map((e) => ({
      '@type': 'Question',
      name: e.q,
      acceptedAnswer: { '@type': 'Answer', text: e.a },
    })),
  };
}

// ---- §2.5 OfferCatalog (/pricing/) ----------------------------------------------------------------------------------

export function offerCatalogLd(site: Site): JsonLd {
  const sized = (name: string, id: string, includes: string) => {
    const p = bySize(id);
    return {
      '@type': 'Offer',
      name,
      description: `Small ${inr(p.small)} · Medium ${inr(p.medium)} · Large ${inr(p.large)}. ${includes}`,
      priceCurrency: 'INR',
      priceSpecification: { '@type': 'PriceSpecification', minPrice: p.small, maxPrice: p.large, priceCurrency: 'INR' },
    };
  };
  const flat = (name: string, price: number, description?: string) => ({
    '@type': 'Offer',
    name,
    ...(description ? { description } : {}),
    price: num(price),
    priceCurrency: 'INR',
  });
  return {
    '@context': CONTEXT,
    '@type': 'OfferCatalog',
    '@id': ldId.catalog(site),
    name: 'PetDoorStep Ludhiana — Doorstep Pet Care Price List',
    url: absUrl('/pricing/', site),
    provider: ref(ldId.business(site)),
    itemListElement: [
      sized('Bath & Brush (dog)', 'bath-brush', 'Bath, blow-dry, brush-out, nail trim, ear clean.'),
      sized('Full Groom (dog)', 'full-groom', 'Bath & Brush plus haircut/styling, paw & sanitary trim.'),
      sized('Premium Spa Groom (dog)', 'premium-spa', 'Full Groom plus de-shed/de-mat, conditioning masque, perfume.'),
      flat('Puppy Intro Groom (under 6 months)', flatPrice('puppy-intro')),
      flat('Cat Grooming — Bath & Brush', planPrice('cat-grooming', 'cat-bath-brush')),
      flat('Cat Grooming — Full', planPrice('cat-grooming', 'cat-full')),
      flat('Tick & Flea Treatment — add-on with any groom', addonPrice('tick-flea')),
      flat('Tick & Flea Treatment — standalone visit', flatPrice('tick-flea')),
      flat('Nail Trim + Ear Clean visit', flatPrice('nail-ear')),
      flat('Dog Walking — 1 walk/day, monthly', planPrice('dog-walking', 'walk-1x'), 'Fixed walker, GPS + photo update after every walk.'),
      flat('Dog Walking — 2 walks/day, monthly', planPrice('dog-walking', 'walk-2x')),
      flat('Dog Walking — Trial Week', planPrice('dog-walking', 'walk-trial')),
      flat('Vet Home Visit (consultation)', flatPrice('vet-visit'), 'Registered veterinarians only. Medicines/vaccines at MRP.'),
      flat('Vaccination at Home', flatPrice('vaccination'),
        `${inr(flatPrice('vaccination'))} service fee + ${plusText('vaccination')}, with reminder calendar.`),
      flat('Deworming Visit (standard dewormer included)', flatPrice('deworming')),
      groomClubOffer(),
    ],
  };
}

/** The Groom Club row — shared by the /pricing/ catalog (04 §2.5, last row) and the /offers/ catalog. */
function groomClubOffer(): JsonLd {
  return {
    '@type': 'Offer',
    name: 'Groom Club monthly subscription',
    description: '1 Full Groom per month at 15% off + free nail-trim visit + priority slots. Price depends on dog size — see Full Groom rates.',
  };
}

// ---- §2.9 /offers/ — OfferCatalog scoped to the offers live today -------------------------------------------------

/** An offer the /offers/ page shows whose amount is not (yet) in src/data/offers.ts — pass the page's visible copy,
 *  built with inr() from data, so markup and text stay identical (04 §2.0.3). */
export interface LiveOffer { name: string; description: string }
export interface LiveOffers { referral: LiveOffer; seasonal?: LiveOffer }

function offerNode(o: LiveOffer): JsonLd {
  // A row only for a real, live offer: never an empty or [FILL:SEASONAL_OFFER] placeholder (blueprints/offers.md OF-5).
  if (!o.name.trim() || !o.description.trim() || /\[FILL:/.test(o.name + o.description)) {
    throw new Error(`schema: offer "${o.name}" is not a live offer — omit it until its real terms exist`);
  }
  return { '@type': 'Offer', name: o.name, description: o.description };
}

/** FIRSTGROOM (06 §7.1) — wording from blueprints/offers.md OF-2; amounts from offers.ts + pricing.json. */
export function firstGroomOffer(): LiveOffer {
  const nailEar = need('nail-ear');
  return {
    name: `${FIRSTGROOM.code} — ${inr(FIRSTGROOM.off)} off your first groom`,
    description:
      `${inr(FIRSTGROOM.off)} off your first Full Groom or Premium Spa Groom + a free ${nailEar.label} (${inr(flatPrice('nail-ear'))} value) between grooms, ` +
      `redeemable within ${FIRSTGROOM.validDays} days of the first visit. ` +
      'Terms: one use per household · applies to Full Groom or Premium Spa only · not combinable with another discount on the same booking.',
  };
}

/** `/offers/` OfferCatalog (04 §2.9; blueprints/offers.md: "OfferCatalog (live offers only)"), rows in the page's
 *  block order: FIRSTGROOM (OF-2) · referral (OF-3) · Groom Club (OF-4) · seasonal (OF-5, only while a real dated
 *  offer is live — omit it otherwise, exactly as the page omits the section). The referral row is passed in because
 *  its amount is not in src/data/offers.ts yet; build it from the same values the OF-3 card renders. */
export function offersCatalogLd(site: Site, live: LiveOffers): JsonLd {
  return {
    '@context': CONTEXT,
    '@type': 'OfferCatalog',
    '@id': ldId.offersCatalog(site),
    name: 'PetDoorStep Ludhiana — Current Offers',
    url: absUrl('/offers/', site),
    provider: ref(ldId.business(site)),
    itemListElement: [
      offerNode(firstGroomOffer()),
      offerNode(live.referral),
      groomClubOffer(),
      ...(live.seasonal ? [offerNode(live.seasonal)] : []),
    ],
  };
}

// ---- §2.6 WebSite (+ LocalBusiness as the Organization) — home ----------------------------------------------------

export function websiteLd(site: Site): JsonLd {
  return {
    '@context': CONTEXT,
    '@type': 'WebSite',
    '@id': ldId.website(site),
    url: absUrl('/', site),
    name: biz.name,
    inLanguage: 'en-IN',
    publisher: ref(ldId.business(site)),
  };
}

/** Home's single @graph: WebSite + LocalBusiness + home FAQPage — "and nothing else" (04 §2.6). */
export function websiteGraphLd(site: Site): JsonLd {
  return graphLd(websiteLd(site), localBusinessLd(site), faqPageLd(faqFor('/')));
}

// ---- §2.8 HowTo (/how-it-works/) -----------------------------------------------------------------------------------

/** HowTo from the 4 site-wide booking steps (src/data/content.ts — the text StepsStrip renders). */
export function howToLd(site: Site, steps: readonly { name: string; text: string }[] = bookingSteps): JsonLd {
  return {
    '@context': CONTEXT,
    '@type': 'HowTo',
    name: 'How to book doorstep pet care in Ludhiana with PetDoorStep',
    description: 'Book dog or cat grooming, dog walking or a vet visit at your home in Ludhiana in under two minutes, confirmed on WhatsApp.',
    totalTime: 'PT2M',
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: absUrl(`/how-it-works/#step-${i + 1}`, site),
    })),
  };
}

// ---- §2.7 BlogPosting (/blog/<slug>/) ------------------------------------------------------------------------------

/** Post fields the blog layout passes — names follow the front-matter of blueprints/_TEMPLATE-blog-post.md §1, which
 *  wins over 04 §2.7's draft names (publishDate/updatedDate/vetReviewed). `author` is the byline the layout renders
 *  ("By [FILL:AUTHOR_NAME], PetDoorStep" until filled); `image` is the og:image the page emits (the 1200×630 hero crop,
 *  04 §2.7: /og/blog/<slug>.jpg); `reviewer` only when a real vet reviewed the post (template BP-8). */
export interface BlogPostLdInput {
  slug: string;
  title: string;
  description: string;
  date: string | Date;
  updated?: string | Date;
  author: string;
  image: string;
  reviewer?: { name: string };
}

/** ISO 8601 calendar date (04 §2.7: "2026-11-05"). */
function isoDate(d: string | Date, field: string): string {
  const v = d instanceof Date ? d.toISOString().slice(0, 10) : d;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) throw new Error(`schema: blog ${field} "${v}" is not an ISO date (YYYY-MM-DD)`);
  return v;
}

export function blogPostingLd(post: BlogPostLdInput, site: Site): JsonLd {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) throw new Error(`schema: blog slug "${post.slug}" must be lowercase-hyphenated`);
  if (post.title.length > 110) throw new Error(`schema: blog headline is ${post.title.length} chars — 04 §2.7 caps it at 110`);
  const path = `/blog/${post.slug}/`;
  const published = isoDate(post.date, 'date');
  return {
    '@context': CONTEXT,
    '@type': 'BlogPosting',
    '@id': ldId.article(post.slug, site),
    mainEntityOfPage: absUrl(path, site),
    headline: post.title,
    description: post.description,
    image: absUrl(post.image, site),
    author: { '@type': 'Person', name: post.author, url: absUrl('/about/', site) },
    publisher: ref(ldId.business(site)),
    datePublished: published,
    dateModified: post.updated ? isoDate(post.updated, 'updated') : published,
    inLanguage: 'en-IN',
    ...(post.reviewer ? { reviewedBy: { '@type': 'Person', name: post.reviewer.name, jobTitle: 'Veterinarian' } } : {}),
  };
}

// ---- §2.9 page-type nodes (ContactPage / AboutPage / hub WebPage) -------------------------------------------------

/** `/contact/`: ContactPage wrapping mainEntity → #business. */
export function contactPageLd(site: Site): JsonLd {
  return { '@context': CONTEXT, '@type': 'ContactPage', '@id': ldId.webpage('/contact/', site),
    url: absUrl('/contact/', site), mainEntity: ref(ldId.business(site)) };
}

/** `/about/`: AboutPage with mainEntity → #business. */
export function aboutPageLd(site: Site): JsonLd {
  return { '@context': CONTEXT, '@type': 'AboutPage', '@id': ldId.webpage('/about/', site),
    url: absUrl('/about/', site), mainEntity: ref(ldId.business(site)) };
}

/** `/ludhiana/` hub: WebPage with about → #business. */
export function webPageLd(path: string, site: Site): JsonLd {
  return { '@context': CONTEXT, '@type': 'WebPage', '@id': ldId.webpage(path, site),
    url: absUrl(path, site), about: ref(ldId.business(site)) };
}

// ---- one @graph per page --------------------------------------------------------------------------------------------

/** Merge blocks into ONE `{ @context, @graph }` object (04 §2.0.1). Nested @graph objects are flattened. */
export function graphLd(...nodes: JsonLd[]): JsonLd {
  const flat = nodes.flatMap((n) => (Array.isArray(n['@graph']) ? (n['@graph'] as JsonLd[]) : [n]));
  return {
    '@context': CONTEXT,
    '@graph': flat.map(({ '@context': _context, ...rest }) => rest),
  };
}

/** The 04 §2.9 schema-per-page matrix as one call — pass the result as Base's `jsonLd={[…]}`.
 *  Row → spec: `/` home · `/contact/` contact · `/ludhiana/<service>/` service · `/ludhiana/areas/<area>/` area ·
 *  `/ludhiana/` city-hub · `/pricing/` pricing · `/how-it-works/` howto · `/about/` about · `/faq/` faq ·
 *  `/blog/<slug>/` blog · `/offers/` offers · `/reviews/`, `/safety-hygiene/`, `/book/`, legal pages and
 *  `/join-as-groomer/` breadcrumb-only (JobPosting is added per live role only — none is open yet) ·
 *  `/thank-you/`, `/404` no JSON-LD at all. */
export type SchemaSpec =
  | { type: 'home' }
  | { type: 'service'; service: ServicePage; crumbs: Crumb[] }
  | { type: 'area'; area: string; crumbs: Crumb[] }
  | { type: 'city-hub'; crumbs: Crumb[] }
  | { type: 'pricing'; crumbs: Crumb[] }
  | { type: 'howto'; crumbs: Crumb[] }
  | { type: 'about'; crumbs: Crumb[] }
  | { type: 'contact'; crumbs: Crumb[] }
  | { type: 'faq'; crumbs: Crumb[] }
  | { type: 'blog'; post: BlogPostLdInput; crumbs: Crumb[] }
  | { type: 'offers'; live: LiveOffers; crumbs: Crumb[] }
  | { type: 'breadcrumb-only'; crumbs: Crumb[] };

export function schemaGraphLd(spec: SchemaSpec, site: Site): JsonLd {
  switch (spec.type) {
    case 'home':
      return websiteGraphLd(site);
    case 'service':
      return graphLd(serviceLd(spec.service, site), faqPageLd(faqFor(`/ludhiana/${spec.service}/`)), breadcrumbLd(spec.crumbs, site));
    case 'area':
      return graphLd(areaServiceLd(spec.area, site), breadcrumbLd(spec.crumbs, site));
    case 'city-hub':
      return graphLd(breadcrumbLd(spec.crumbs, site), webPageLd('/ludhiana/', site));
    case 'pricing':
      return graphLd(offerCatalogLd(site), faqPageLd(faqFor('/pricing/')), breadcrumbLd(spec.crumbs, site));
    case 'howto':
      return graphLd(howToLd(site), breadcrumbLd(spec.crumbs, site));
    case 'about':
      return graphLd(aboutPageLd(site), breadcrumbLd(spec.crumbs, site));
    case 'contact':
      return graphLd(localBusinessLd(site), breadcrumbLd(spec.crumbs, site), contactPageLd(site));
    case 'faq':
      return graphLd(faqPageLd(faqFor('/faq/')), breadcrumbLd(spec.crumbs, site));
    case 'blog':
      return graphLd(blogPostingLd(spec.post, site), breadcrumbLd(spec.crumbs, site));
    case 'offers':
      return graphLd(breadcrumbLd(spec.crumbs, site), offersCatalogLd(site, spec.live));
    case 'breadcrumb-only':
      return graphLd(breadcrumbLd(spec.crumbs, site));
  }
}

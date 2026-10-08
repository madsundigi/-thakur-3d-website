// Money-page registry — one entry per /ludhiana/<service>/ page (01-SITEMAP "Money pages"). Every value a page, card,
// CTA or WhatsApp link needs about a service page lives here once, so the home grid, SP-11 cards, heroes, sticky bar
// and float can never disagree. Rules:
//  · prices only through src/lib/pricing.ts helpers (07 §4 — no ₹ typed in this file; npm run check:prices);
//  · copy is verbatim from the cited blueprint, or written to 06 voice and logged in website-plan/decisions/f2-data.md;
//  · one-way imports: this file → pricing.ts / content.ts / routes.ts / site.ts — never the reverse.
// The module validates itself on load: a blurb over 70 chars, an alt over 125, a bad service id or area slug, or a
// package row with the wrong cell count fails `astro build`.
import { TRUST_CHIPS } from './content';
import { routeLabel, routes } from './routes';
import { WA_DEFAULT_TEXT } from './site';
import {
  bookHref, chipText, DOG_GROOM_IDS, flatPrice, fromPrice, heroPriceChip, inr, MATRIX_COLUMNS, planPrice,
  requireService, stickyBookLabel, type MoneyPage, type Service,
} from '../lib/pricing';

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────────────

/** The 7 money paths in 01-SITEMAP order. */
export const MONEY_PATHS = [
  '/ludhiana/dog-grooming/',
  '/ludhiana/cat-grooming/',
  '/ludhiana/dog-walking/',
  '/ludhiana/vet-at-home/',
  '/ludhiana/dog-vaccination/',
  '/ludhiana/tick-flea-treatment/',
  '/ludhiana/puppy-grooming/',
] as const;
export type MoneyPath = (typeof MONEY_PATHS)[number];

export interface MoneyPageInfo {
  path: MoneyPath;
  /** Last path segment = the pricing.ts MoneyPage key, e.g. 'dog-grooming'. */
  slug: MoneyPage;
  /** Page name from 01-SITEMAP (= routes.ts label): nav, breadcrumb, card h3. */
  label: string;
  /** pricing.json ids this page sells (its own packages, not à-la-carte mentions): review/proof filters, E2 prices. */
  serviceIds: readonly string[];
  /** pricing.json id the page's body CTA + sticky Book preselect in the widget; null = the page sells several
   *  equal packages (dog grooming). Heroes preselect only on dog-walking (owner decision D2). */
  preselect: string | null;
  /** ServiceCard (home H-3, SP-11, hub): blurb ≤ 70 chars from the page's 06 §2.3 subhead; photo = 08 §5.2 shot. */
  card: { blurb: string; photo: { name: string; alt: string } };
  /** Hero chip row (template SP-1 rule 5): price chip first, then the 4 trust chips (06 §2.1, or the page's 06 §2.3
   *  override). Strings carry no ✔ — Chip.astro draws it. */
  heroChips: { price: string; trust: readonly string[] };
  /** SP-9: the 3 area slugs from the fixed money-page → area table (template SP-9). */
  areas: readonly string[];
  /** wa.me prefill for every WhatsApp link on this page (sticky bar, float, CTA band): names the service and the
   *  page, asks for area + pet (02 P158, 06 §3.1). */
  waPrefill: string;
  /** og:image — file in public/og/ from the 04 §4 Phase-1 list (pages without their own use petdoorstep-home.jpg). */
  og: { file: string; alt: string };
  /** Mid-page CTA after the prices (07 §2 row 4, template SP-4): "Book <Service> — <price>", priced per E2. */
  cta: { label: string; href: string; source: string };
}

// ── Shared bits ───────────────────────────────────────────────────────────────────────────────────────────────────

const HOME_OG = { file: 'petdoorstep-home.jpg', alt: 'PetDoorStep — pet care at your doorstep in Ludhiana' } as const;

/** "Hi PetDoorStep! I want to book dog grooming (from your Dog Grooming at Home page). My area: ___ . My dog: ___" —
 *  WA_DEFAULT_TEXT's shape (07 §6) with the service and the source page named (02 P158). */
const bookText = (what: string, page: string, pet = 'pet'): string =>
  `Hi PetDoorStep! I want to book ${what} (from your ${page} page). My area: ___ . My ${pet}: ___`;

/** CTA price for a preselected service (E2: the figure equals what the widget shows once it lands): several prices →
 *  the widget card chip ("from ₹599", "from ₹699 (trial week)"); one flat price → that price; "+ MRP" fee → "₹699 + MRP". */
function ctaPrice(svc: Service): string {
  const p = svc.pricing;
  switch (p.type) {
    case 'by_size':
    case 'plans':
      return chipText(svc);
    case 'flat':
      return inr(p.price);
    case 'flat_plus':
      return `${inr(p.price)} + MRP`;
  }
}

interface PageConfig {
  serviceIds: readonly string[];
  preselect: string | null;
  /** CTA service name when nothing is preselected (template SP-4 worked example: "Book Dog Grooming — from ₹599"). */
  ctaService?: string;
  blurb: string;
  photo: { name: string; alt: string };
  trust: readonly string[];
  areas: readonly string[];
  waPrefill: string;
  og: { file: string; alt: string };
}

// ── The registry ──────────────────────────────────────────────────────────────────────────────────────────────────
// Sources per field: blurb ← 06 §2.3 subhead (dog-grooming adds home.md H-3 "Premium Spa — a pet spa at home") ·
// photo ← 08 §5.2 shot list (+ E5 shots 13/14), alt per 08 §5.4 · trust ← 06 §2.3 / page blueprint SP-1 ·
// areas ← _TEMPLATE-service-page.md SP-9 table · og ← 04 §4 · waPrefill ← 02 P158 / 06 §3.1 (wording logged).

const CONFIG: Record<MoneyPath, PageConfig> = {
  '/ludhiana/dog-grooming/': {
    serviceIds: DOG_GROOM_IDS,
    preselect: null,
    ctaService: 'Dog Grooming',
    blurb: 'Bath & Brush, Full Groom or Premium Spa — a pet spa at home.',
    photo: {
      name: 'golden-retriever-bath-home-ludhiana.jpg',
      alt: 'Groomer bathing a Golden Retriever on a verandah — dog grooming at home in Ludhiana',
    },
    trust: TRUST_CHIPS,
    areas: ['sarabha-nagar', 'model-town', 'brs-nagar'],
    waPrefill: bookText('dog grooming', routeLabel('/ludhiana/dog-grooming/'), 'dog'),
    og: { file: 'dog-grooming.jpg', alt: `PetDoorStep — dog grooming at your home in Ludhiana, from ${fromPrice(DOG_GROOM_IDS)}` },
  },
  '/ludhiana/cat-grooming/': {
    serviceIds: ['cat-grooming'],
    preselect: 'cat-grooming',
    blurb: 'Calm-handling trained groomers — no car ride, no strange salon smells.',
    photo: {
      name: 'cat-grooming-at-home-ludhiana.jpg',
      alt: 'Groomer calmly handling a cat on a towel — cat grooming at home in Ludhiana',
    },
    trust: [TRUST_CHIPS[0], TRUST_CHIPS[1], TRUST_CHIPS[2], 'Calm-handling trained for cats'],
    areas: ['civil-lines', 'kitchlu-nagar', 'sarabha-nagar'],
    waPrefill: bookText('cat grooming', routeLabel('/ludhiana/cat-grooming/'), 'cat'),
    og: { file: 'cat-grooming.jpg', alt: `PetDoorStep — cat grooming at your home in Ludhiana, from ${fromPrice('cat-grooming')}` },
  },
  '/ludhiana/dog-walking/': {
    serviceIds: ['dog-walking'],
    preselect: 'dog-walking',
    blurb: 'The same fixed, verified walker every day, with GPS and photo updates.',
    photo: {
      name: 'dog-walker-beagle-park-ludhiana.jpg',
      alt: 'Beagle on a leash with a PetDoorStep dog walker in a neighbourhood park in Ludhiana',
    },
    trust: ['Fixed verified walker', 'GPS + photo after every walk', 'Fixed monthly price', 'Background-verified'],
    areas: ['dugri', 'south-city', 'pakhowal-road'],
    waPrefill:
      `Hi PetDoorStep! I want to start dog walking with the ${planPrice('dog-walking', 'walk-trial')} Trial Week ` +
      `(from your ${routeLabel('/ludhiana/dog-walking/')} page). My area: ___ . My dog: ___`,
    og: {
      file: 'dog-walking.jpg',
      alt: `PetDoorStep — a daily dog walker in Ludhiana, from ${planPrice('dog-walking', 'walk-1x')} a month`,
    },
  },
  '/ludhiana/vet-at-home/': {
    serviceIds: ['vet-visit', 'vaccination', 'deworming'],
    preselect: 'vet-visit',
    blurb: 'A registered veterinarian examines your pet at home — no clinic trip.',
    photo: {
      name: 'vet-home-visit-pomeranian-ludhiana.jpg',
      alt: 'Vet examining a Pomeranian during a home visit in Ludhiana',
    },
    trust: ['Registered veterinarians only', 'Medicines at MRP — bill shown', `Fixed visit fee ${flatPrice('vet-visit')}`, 'Mon–Sun 9:00–19:00'],
    areas: ['civil-lines', 'model-town', 'haibowal-kalan'],
    waPrefill: bookText('a vet home visit', routeLabel('/ludhiana/vet-at-home/')),
    og: { file: 'vet-at-home.jpg', alt: `PetDoorStep — a registered vet at your home in Ludhiana, ${flatPrice('vet-visit')} visit` },
  },
  '/ludhiana/dog-vaccination/': {
    serviceIds: ['vaccination', 'deworming'],
    preselect: 'vaccination',
    blurb: 'Registered vet, cold-chain carried vaccine, done in your living room.',
    photo: {
      name: 'vet-home-visit-pomeranian-ludhiana.jpg',
      alt: 'Vet with a vaccine cold box examining a Pomeranian at home in Ludhiana',
    },
    trust: ['Registered veterinarians only', 'Vaccine at MRP — wrapper shown', `${flatPrice('vaccination')} fixed service fee`, 'Free reminder calendar'],
    areas: ['dugri', 'haibowal-kalan', 'ferozepur-road'],
    waPrefill: bookText('a vaccination at home', routeLabel('/ludhiana/dog-vaccination/')),
    og: HOME_OG,
  },
  '/ludhiana/tick-flea-treatment/': {
    serviceIds: ['tick-flea'],
    preselect: 'tick-flea',
    blurb: "Ticks love Punjab's monsoon. We don't. Anti-tick bath at your home.",
    photo: {
      name: 'dog-tick-check-at-home-ludhiana.jpg',
      alt: 'Groomer checking an Indie dog for ticks at home in Ludhiana',
    },
    trust: TRUST_CHIPS,
    areas: ['ferozepur-road', 'south-city', 'brs-nagar'],
    waPrefill: bookText('tick & flea treatment', routeLabel('/ludhiana/tick-flea-treatment/')),
    og: HOME_OG,
  },
  '/ludhiana/puppy-grooming/': {
    serviceIds: ['puppy-intro'],
    preselect: 'puppy-intro',
    blurb: 'A gentle first-time groom for puppies under 6 months.',
    photo: {
      name: 'puppy-first-groom-at-home-ludhiana.jpg',
      alt: "Shih Tzu puppy's first groom at home in Ludhiana",
    },
    trust: ['Gentle first-time handling', `${flatPrice('puppy-intro')} flat, any breed`, 'Sealed sanitised kit', 'Photo update for the family'],
    areas: ['kitchlu-nagar', 'pakhowal-road', 'model-town'],
    waPrefill: bookText("my puppy's first groom", routeLabel('/ludhiana/puppy-grooming/'), 'puppy'),
    og: HOME_OG,
  },
};

function build(path: MoneyPath): MoneyPageInfo {
  const c = CONFIG[path];
  const slug = path.split('/')[2] as MoneyPage;
  const svc = c.preselect ? requireService(c.preselect) : null;
  // E2: the figure is the preselected service's price, or the page's lowest price when nothing is preselected.
  const price = svc ? ctaPrice(svc) : `from ${fromPrice(c.serviceIds)}`;
  // 07 §2 row 4 / 09 §2d: src=service_<id>; with no single service the page slug stands in (service_dog-grooming).
  const source = `service_${c.preselect ?? slug}`;
  return {
    path,
    slug,
    label: routeLabel(path),
    serviceIds: c.serviceIds,
    preselect: c.preselect,
    card: { blurb: c.blurb, photo: c.photo },
    heroChips: { price: heroPriceChip(slug), trust: c.trust },
    areas: c.areas,
    waPrefill: c.waPrefill,
    og: c.og,
    cta: {
      label: `Book ${svc ? svc.label : c.ctaService} — ${price}`,
      href: bookHref({ service: c.preselect ?? undefined, src: source }),
      source,
    },
  };
}

export const MONEY_PAGES: Readonly<Record<MoneyPath, MoneyPageInfo>> = Object.fromEntries(
  MONEY_PATHS.map((p) => [p, build(p)]),
) as Record<MoneyPath, MoneyPageInfo>;

export const isMoneyPath = (path: string): path is MoneyPath => (MONEY_PATHS as readonly string[]).includes(path);

/** The registry entry for a pricing.ts MoneyPage slug ('dog-grooming' → MONEY_PAGES['/ludhiana/dog-grooming/']). */
export const moneyPageBySlug = (slug: MoneyPage): MoneyPageInfo => MONEY_PAGES[`/ludhiana/${slug}/` as MoneyPath];

// ── WhatsApp prefill + sticky Book for every page ─────────────────────────────────────────────────────────────────

/** wa.me prefill for the non-money Wave-1 pages (02 P158: name the source page). /contact/ is contact.md CO-2 verbatim. */
export const PAGE_PREFILL: Readonly<Record<
  '/' | '/pricing/' | '/about/' | '/contact/' | '/how-it-works/' | '/faq/' | '/privacy-policy/' | '/terms/',
  string
>> = {
  '/': bookText('a service', 'home'),
  '/pricing/': bookText('a service', routeLabel('/pricing/')),
  '/about/': bookText('a service', routeLabel('/about/')),
  '/contact/': 'Hi PetDoorStep, I have a question',
  '/how-it-works/': bookText('a service', routeLabel('/how-it-works/')),
  '/faq/': "Hi PetDoorStep, I have a question that isn't on your FAQ page: ___",
  '/privacy-policy/': `Hi PetDoorStep, I have a question about your ${routeLabel('/privacy-policy/')}: ___`,
  '/terms/': `Hi PetDoorStep, I have a question about your ${routeLabel('/terms/')}: ___`,
};

/** The prefill for any page: its money-page waPrefill, else PAGE_PREFILL, else the 07 §6 default. Pass it to Base's
 *  `waText` (sticky bar WhatsApp, desktop float, header) and to the page's own wa.me CTAs. */
export function prefillFor(path: string): string {
  if (isMoneyPath(path)) return MONEY_PAGES[path].waPrefill;
  return (PAGE_PREFILL as Readonly<Record<string, string>>)[path] ?? WA_DEFAULT_TEXT;
}

/** Sticky-bar Book Now target (07 §2 row 1): /book/?src=sticky_bar, plus the page's preselect on money pages, e.g.
 *  "/book/?service=cat-grooming&src=sticky_bar" (bookHref order: service · size · src). */
export function stickyBookHrefFor(path: string): string {
  const pre = isMoneyPath(path) ? MONEY_PAGES[path].preselect : null;
  return bookHref({ service: pre ?? undefined, src: 'sticky_bar' });
}

/** Sticky-bar Book label: the money page's SP-13 label (stickyBookLabel), else "Book Now" (06 §3.3). */
export function stickyBookLabelFor(path: string): string {
  return isMoneyPath(path) ? stickyBookLabel(MONEY_PAGES[path].slug) : 'Book Now';
}

// ── SP-3 package tables (✓-grids) ─────────────────────────────────────────────────────────────────────────────────

export interface PackageColumn {
  /** pricing.json id — the "Most booked" badge comes from it (requireService(id).badge, as in matrixColumns()). */
  serviceId: string;
  label: string;
  /** Small line under the column heading (pricing.md PR-4 Full Groom note). */
  note?: string;
}
/** One inclusion: cells align with `columns`; true = ✓, false = —, a string = text. */
export interface PackageRow { label: string; cells: (boolean | string)[] }
export interface PackageTable {
  /** <caption> text (sr-only is fine; the H2 above the table belongs to the page). */
  caption: string;
  columns: PackageColumn[];
  rows: PackageRow[];
  /** The final "Typical duration" row (06 §5.5), one per column — label: PACKAGE_DURATION_LABEL. */
  durations?: string[];
  footnotes: string[];
}

/** Row heading of a table's `durations` row (template SP-3). */
export const PACKAGE_DURATION_LABEL = 'Typical duration';

/** Template SP-3 footnote (a) — every grid carries it. */
const INCLUDED_FOOTNOTE = 'Everything above is included in the price — nothing on this list costs extra.';

/**
 * SP-3 ✓-grids, verbatim from their blueprints. dog-grooming = the template worked table (_TEMPLATE-service-page.md
 * SP-3, 00 §3.2) with columns in MATRIX_COLUMNS order; /pricing/ PR-4 renders the same table ("same component, same
 * wording"), so it carries both page notes: the Premium Spa label "Premium Spa (dog spa at home)" (dog-grooming.md §2)
 * and the Full Groom note (pricing.md PR-4). cat-grooming = cat-grooming.md SP-3. puppy-grooming has no key: its SP-3
 * is a single-package ✓-list, not a grid (puppy-grooming.md SP-3).
 */
export const PACKAGE_TABLES: Readonly<{ 'dog-grooming': PackageTable; 'cat-grooming': PackageTable }> = {
  'dog-grooming': {
    caption: "What's included in each dog grooming package",
    columns: MATRIX_COLUMNS.map((c) => ({
      serviceId: c.id,
      label: c.id === 'premium-spa' ? `${c.label} (dog spa at home)` : c.label,
      ...(c.id === 'full-groom' ? { note: 'full body dog grooming — haircut, styling, paw & sanitary trim' } : {}),
    })),
    rows: [
      { label: 'Bath with warm water', cells: [true, true, true] },
      { label: 'Blow-dry', cells: [true, true, true] },
      { label: 'Brush-out', cells: [true, true, true] },
      { label: 'Nail trim', cells: [true, true, true] },
      { label: 'Ear clean', cells: [true, true, true] },
      { label: 'Haircut & styling', cells: [false, true, true] },
      { label: 'Paw & sanitary trim', cells: [false, true, true] },
      { label: 'De-shed / de-mat', cells: [false, false, true] },
      { label: 'Conditioning masque', cells: [false, false, true] },
      { label: 'Perfume finish', cells: [false, false, true] },
    ],
    durations: ['~45–60 min', '~60–90 min', '~90–120 min'],
    footnotes: [
      INCLUDED_FOOTNOTE,
      'Severe matting may need extra de-matting time — quoted on WhatsApp before we start, never after.',
    ],
  },
  'cat-grooming': {
    caption: "What's included in each cat grooming package",
    columns: [
      { serviceId: 'cat-grooming', label: `Cat Bath & Brush ${planPrice('cat-grooming', 'cat-bath-brush')}` },
      { serviceId: 'cat-grooming', label: `Cat Full Groom ${planPrice('cat-grooming', 'cat-full')}` },
    ],
    rows: [
      { label: 'Lukewarm bath, cat-safe shampoo', cells: [true, true] },
      { label: 'Gentle towel + blow-dry', cells: [true, true] },
      { label: 'Brush-out & loose-coat removal', cells: [true, true] },
      { label: 'Nail trim', cells: [true, true] },
      { label: 'Ear & eye (tear-stain) clean', cells: [true, true] },
      { label: 'De-matting', cells: [false, true] },
      { label: 'Hygiene trim', cells: [false, true] },
      { label: 'Comfort trim (Persians, on request)', cells: [false, true] },
    ],
    durations: ['~45–60 min', '~60–90 min'],
    footnotes: [INCLUDED_FOOTNOTE, 'Tight mats close to the skin are clipped, never pulled — we show you before we start.'],
  },
};

/**
 * What a package column includes, in the table's own words — the Service schema Offer names echo it (template SP-3:
 * "Inclusion names echo the Offer name strings … keep wording identical"). When a column includes everything the
 * previous one does, it reads "{previous label} plus {the rest}":
 *   packageSummary(PACKAGE_TABLES['dog-grooming'], 1) → "Bath & Brush plus haircut & styling, paw & sanitary trim".
 */
export function packageSummary(table: PackageTable, col: number): string {
  const included = (c: number) => table.rows.filter((r) => r.cells[c] === true).map((r) => r.label);
  const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
  const mine = included(col);
  const prev = col > 0 ? included(col - 1) : [];
  if (prev.length && prev.every((l) => mine.includes(l))) {
    return `${table.columns[col - 1].label} plus ${mine.filter((l) => !prev.includes(l)).map(lower).join(', ')}`;
  }
  return mine.map(lower).join(', ');
}

// ── Build-time validation ─────────────────────────────────────────────────────────────────────────────────────────
(function validate() {
  const problems: string[] = [];
  const areaPaths = new Set(routes.filter((r) => r.group === 'area').map((r) => r.path));
  for (const path of MONEY_PATHS) {
    const m = MONEY_PAGES[path];
    if (m.label === path) problems.push(`${path}: not in routes.ts`);
    if (m.card.blurb.length > 70) problems.push(`${path}: card blurb is ${m.card.blurb.length} chars (≤ 70, 08 §4.7)`);
    for (const [what, alt] of [['card alt', m.card.photo.alt], ['og alt', m.og.alt]] as const) {
      if (!alt.trim() || alt.length > 125) problems.push(`${path}: ${what} must be 1–125 chars (02 P056), is ${alt.length}`);
    }
    if (!m.serviceIds.length) problems.push(`${path}: no serviceIds`);
    for (const id of m.serviceIds) requireService(id);
    if (m.preselect && !m.serviceIds.includes(m.preselect)) problems.push(`${path}: preselect "${m.preselect}" is not one of its serviceIds`);
    if (m.areas.length !== 3) problems.push(`${path}: SP-9 links exactly 3 areas`);
    for (const a of m.areas) if (!areaPaths.has(`/ludhiana/areas/${a}/`)) problems.push(`${path}: unknown area slug "${a}"`);
    if (!m.waPrefill.trim()) problems.push(`${path}: empty waPrefill`);
    if (m.heroChips.trust.length !== 4) problems.push(`${path}: hero needs the 4 trust chips (06 §2.1)`);
  }
  if (!MONEY_PAGES['/ludhiana/dog-grooming/'].card.blurb.includes('Premium Spa — a pet spa at home')) {
    problems.push('dog-grooming card blurb must mention "Premium Spa — a pet spa at home" (home.md H-3)');
  }
  for (const [key, t] of Object.entries(PACKAGE_TABLES)) {
    for (const r of t.rows) if (r.cells.length !== t.columns.length) problems.push(`PACKAGE_TABLES.${key} "${r.label}": ${r.cells.length} cells for ${t.columns.length} columns`);
    if (t.durations && t.durations.length !== t.columns.length) problems.push(`PACKAGE_TABLES.${key}: durations ≠ columns`);
    for (const c of t.columns) requireService(c.serviceId);
  }
  if (problems.length) throw new Error(`src/data/services.ts is invalid:\n  ${problems.join('\n  ')}`);
})();

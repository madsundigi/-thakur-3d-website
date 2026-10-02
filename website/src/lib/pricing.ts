// Price computation — the single source is src/data/pricing.json (mirrors 00-MASTER-PLAN §3.2).
// Rules: website-plan/07-BOOKING-SPEC.md §4. No ₹ literal may appear in any component.
import data from '../data/pricing.json';

export type Size = 'small' | 'medium' | 'large';
export type PetType = 'dog' | 'cat';

interface BySize { type: 'by_size'; small: number; medium: number; large: number }
interface Flat { type: 'flat'; price: number; addonPrice?: number }
interface FlatPlus { type: 'flat_plus'; price: number; plus: string }
export interface Plan { id: string; label: string; price: number; per: 'visit' | 'week' | 'month' }
interface Plans { type: 'plans'; plans: Plan[] }
export type Pricing = BySize | Flat | FlatPlus | Plans;

export interface Service {
  id: string;
  label: string;
  pet: 'dog' | 'cat' | 'both';
  badge?: string;
  constraint?: string;
  pricing: Pricing;
  includes: string[];
}

interface SizeInfo { label: string; kg: string; examples: string[] }

export const pricingData = data as unknown as {
  currency: 'INR';
  updated: string;
  pricesConfirmed: boolean;
  areas: string[];
  sizeGuide: Record<Size, SizeInfo>;
  services: Service[];
  groomClub: { label: string; benefit: string; url: string };
};

export const services = pricingData.services;
export const areas = pricingData.areas;
export const sizeGuide = pricingData.sizeGuide;
export const SIZES: Size[] = ['small', 'medium', 'large'];

export const DOG_GROOM_IDS = ['bath-brush', 'full-groom', 'premium-spa'];
export const GROOMING_IDS = ['bath-brush', 'full-groom', 'premium-spa', 'puppy-intro', 'cat-grooming'];

export const getService = (id: string | null | undefined): Service | undefined =>
  id ? services.find((s) => s.id === id) : undefined;

export const getPlan = (service: Service | undefined, planId: string | null | undefined): Plan | undefined =>
  service && service.pricing.type === 'plans' ? service.pricing.plans.find((p) => p.id === planId) : undefined;

/** Default plan when a plans-type service is selected (07 §3 Step 2: first pill is the default). */
export const defaultPlanId = (service: Service | undefined): string | null =>
  service && service.pricing.type === 'plans' ? service.pricing.plans[0].id : null;

/** Indian grouping: 1899 → "₹1,899" (07 §4). */
export const inr = (n: number): string => `₹${n.toLocaleString('en-IN')}`;

const tickFlea = getService('tick-flea');
export const TICK_ADDON_PRICE: number =
  tickFlea && tickFlea.pricing.type === 'flat' && tickFlea.pricing.addonPrice ? tickFlea.pricing.addonPrice : 0;

/** Card chip text (07 §4 table, column "Card chip"). */
export function chipText(service: Service): string {
  const p = service.pricing;
  switch (p.type) {
    case 'by_size':
      return `from ${inr(p.small)}`;
    case 'flat':
      return inr(p.price);
    case 'flat_plus':
      return `${inr(p.price)} + ${p.plus}`;
    case 'plans': {
      const min = Math.min(...p.plans.map((x) => x.price));
      return `from ${inr(min)}${service.id === 'dog-walking' ? ' (trial week)' : ''}`;
    }
  }
}

/** Numeric total when the price is exact (null for flat_plus or when size/plan is still unknown). */
export function priceAmount(service: Service, size: Size | null, planId: string | null, addon: boolean): number | null {
  const p = service.pricing;
  if (p.type === 'by_size') return size ? p[size] + (addon ? TICK_ADDON_PRICE : 0) : null;
  if (p.type === 'flat') return p.price;
  if (p.type === 'plans') return getPlan(service, planId)?.price ?? null;
  return null;
}

/** price_shown string (07 §4 table, column "price_shown"). Null while not yet computable. */
export function formatPrice(service: Service, size: Size | null, planId: string | null, addon: boolean): string | null {
  const p = service.pricing;
  switch (p.type) {
    case 'by_size': {
      if (!size) return null;
      const total = p[size] + (addon ? TICK_ADDON_PRICE : 0);
      return addon ? `${inr(total)} (incl. Tick & Flea add-on)` : inr(total);
    }
    case 'flat':
      return inr(p.price);
    case 'flat_plus':
      return `${inr(p.price)} + ${p.plus}`;
    case 'plans': {
      const plan = getPlan(service, planId);
      return plan ? `${inr(plan.price)} / ${plan.per}` : null;
    }
  }
}

/** Price-ribbon text (07 §3 global behaviour). */
export function ribbonText(service: Service, size: Size | null, planId: string | null, addon: boolean, petType: PetType | null): string {
  const shown = formatPrice(service, size, planId, addon);
  if (service.pricing.type === 'by_size' && !shown) {
    return `${chipText(service)} — exact price after size`;
  }
  const plan = getPlan(service, planId);
  const name = plan ? `${service.label} — ${plan.label}` : service.label;
  const sizeLabel = size && service.pricing.type === 'by_size' && petType !== 'cat' ? ` · ${sizeGuide[size].label}` : '';
  return `Your price: ${shown} · ${name}${sizeLabel}`;
}

/** Card price for a by-size service at a given size — used by the Premium-Spa switch suggestion. */
export function sizePrice(serviceId: string, size: Size): number | null {
  const s = getService(serviceId);
  return s && s.pricing.type === 'by_size' ? s.pricing[size] : null;
}

// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Page-copy helpers (Wave 1). Page authors never type a ₹ figure: every price string a page needs comes from here.
// Everything below is a pure function or a plain literal — nothing is computed at import time, so the booking island
// (which imports this module) tree-shakes it all away. An unknown service/plan id throws: a typo must fail the build,
// never render a wrong price.

/** The pricing.json service for `id`, or a build error. */
export function requireService(id: string): Service {
  const s = getService(id);
  if (!s) throw new Error(`pricing: unknown service id "${id}" (ids live in src/data/pricing.json)`);
  return s;
}

/** Every amount a service is sold at (by_size: the 3 sizes · plans: each plan · flat/flat_plus: the fee). */
function amountsOf(s: Service): number[] {
  const p = s.pricing;
  switch (p.type) {
    case 'by_size':
      return [p.small, p.medium, p.large];
    case 'flat':
    case 'flat_plus':
      return [p.price];
    case 'plans':
      return p.plans.map((x) => x.price);
  }
}

/** Lowest price across one or more services: fromPrice('bath-brush') → "₹599"; fromPrice(DOG_GROOM_IDS) → "₹599". */
export function fromPrice(ids: string | readonly string[]): string {
  const list = typeof ids === 'string' ? [ids] : ids;
  return inr(Math.min(...list.flatMap((id) => amountsOf(requireService(id)))));
}

/** Lowest–highest with an en dash: priceRange('full-groom') → "₹1,199–₹1,899". Single-price services → "₹699". */
export function priceRange(id: string): string {
  const a = amountsOf(requireService(id));
  const lo = Math.min(...a);
  const hi = Math.max(...a);
  return lo === hi ? inr(lo) : `${inr(lo)}–${inr(hi)}`;
}

/** By-size price as text: sizePriceText('full-groom', 'medium') → "₹1,499" (the number version is sizePrice). */
export function sizePriceText(id: string, size: Size): string {
  const n = sizePrice(requireService(id).id, size);
  if (n === null) throw new Error(`pricing: "${id}" is not priced by size`);
  return inr(n);
}

/** Plan price: planPrice('dog-walking', 'walk-1x') → "₹2,999". Copy adds its own unit ("/month", "/mo"). */
export function planPrice(id: string, planId: string): string {
  const plan = getPlan(requireService(id), planId);
  if (!plan) throw new Error(`pricing: "${id}" has no plan "${planId}"`);
  return inr(plan.price);
}

/** Flat fee (flat or "+ MRP" services): flatPrice('vet-visit') → "₹699"; flatPrice('vaccination') → "₹199". */
export function flatPrice(id: string): string {
  const p = requireService(id).pricing;
  if (p.type !== 'flat' && p.type !== 'flat_plus') throw new Error(`pricing: "${id}" has no single flat price`);
  return inr(p.price);
}

/** Add-on price: addonPrice() → "₹399" (Tick & Flea with any groom — the only add-on in 00 §3.2). */
export function addonPrice(id = 'tick-flea'): string {
  const p = requireService(id).pricing;
  if (p.type !== 'flat' || !p.addonPrice) throw new Error(`pricing: "${id}" has no add-on price`);
  return inr(p.addonPrice);
}

/** The pricing.json "plus" wording of a "+ MRP" service: plusText('vet-visit') → "medicines/vaccines at MRP". */
export function plusText(id: string): string {
  const p = requireService(id).pricing;
  if (p.type !== 'flat_plus') throw new Error(`pricing: "${id}" is not a "+ MRP" service`);
  return p.plus;
}

/** Lowest fixed price on the whole menu → "₹299" (home subhead / hub chip "from ₹299"). "+ MRP" fees are excluded —
 *  they are not fixed totals. */
export function lowestFixedPrice(): string {
  return inr(Math.min(...services.filter((s) => s.pricing.type !== 'flat_plus').flatMap(amountsOf)));
}

/** Splits copy around its ₹ figures so a component can set the figures in price type:
 *  "₹699 + medicines at MRP" → [{ text: "₹699", figure: true }, { text: " + medicines at MRP", figure: false }]. */
export function priceParts(text: string): { text: string; figure: boolean }[] {
  return text
    .split(/(₹[\d,]+)/)
    .filter(Boolean)
    .map((t) => ({ text: t, figure: /^₹[\d,]+$/.test(t) }));
}

/** Booking-widget deep link (07-BOOKING-SPEC §2 — params service · size · src, in that order):
 *  bookHref({ service: 'full-groom', size: 'small', src: 'pricing_row' }) → "/book/?service=full-groom&size=small&src=pricing_row".
 *  `src` must be a canonical source value (09-ANALYTICS-TRACKING §2d): pricing_row, service_<id>, hero_<page-slug>, … */
export function bookHref(opts: { service?: string; size?: Size; src: string }): string {
  const q = new URLSearchParams();
  if (opts.service) q.set('service', requireService(opts.service).id);
  if (opts.size) q.set('size', opts.size);
  q.set('src', opts.src);
  return `/book/?${q.toString()}`;
}

// ── Groom Club (06 §7.3, blueprints/pricing.md PR-8) ────────────────────────────────────────────────────────────

/** Discount in percent, parsed from pricing.json groomClub.benefit ("…at 15% off…") so the JSON stays the one source. */
export function groomClubPercent(): number {
  const m = /(\d+)% off/.exec(pricingData.groomClub.benefit);
  if (!m) throw new Error('pricing: groomClub.benefit must state "<n>% off"');
  return Number(m[1]);
}

export interface ClubPrice {
  size: Size;
  label: string; // "Small"
  regular: string; // "₹1,199" — the Full Groom price
  club: string; // "₹1,019" — Groom Club price, rounded down to the rupee
  save: string; // "₹180"
  amounts: { regular: number; club: number; save: number };
}

/** Groom Club maths per size: one Full Groom at groomClubPercent() off, rounded down to the rupee (pricing.md §6). */
export function groomClubPrices(): ClubPrice[] {
  const pct = groomClubPercent();
  return SIZES.map((size) => {
    const regular = sizePrice('full-groom', size) as number;
    const club = Math.floor((regular * (100 - pct)) / 100);
    return {
      size,
      label: sizeGuide[size].label,
      regular: inr(regular),
      club: inr(club),
      save: inr(regular - club),
      amounts: { regular, club, save: regular - club },
    };
  });
}

/** Monthly saving range → "₹180–₹285" (06 §7.3 "you save ₹180–₹285 every month"). */
export function groomClubSavingsRange(): string {
  const saves = groomClubPrices().map((c) => c.amounts.save);
  return `${inr(Math.min(...saves))}–${inr(Math.max(...saves))}`;
}

// ── The canonical size matrix (06-CONVERSION-PLAYBOOK §5.2 — "reuse everywhere") ────────────────────────────────

/** Row facts, verbatim from 06 §5.2 (kg guide = 00 §3.2). The widget keeps its own shorter sizeGuide examples. */
export const SIZE_MATRIX: Record<Size, { label: string; kg: string; examples: string }> = {
  small: { label: 'Small', kg: '< 10 kg', examples: 'Shih Tzu, Pomeranian, Lhasa Apso, Toy Poodle, Pug' },
  medium: { label: 'Medium', kg: '10–25 kg', examples: 'Beagle, Cocker Spaniel, most Indies' },
  large: { label: 'Large', kg: '> 25 kg', examples: 'Labrador, German Shepherd, Golden Retriever, Rottweiler' },
};

/** Matrix columns in 06 §5.2 order with their verbatim headings ("Premium Spa", not the widget's "Premium Spa Groom"). */
export const MATRIX_COLUMNS: readonly { id: string; label: string }[] = [
  { id: 'bath-brush', label: 'Bath & Brush' },
  { id: 'full-groom', label: 'Full Groom' },
  { id: 'premium-spa', label: 'Premium Spa' },
];

export interface MatrixColumn {
  id: string;
  label: string; // column heading, e.g. "Premium Spa"
  service: string; // pricing.json label, e.g. "Premium Spa Groom" (used in accessible link names)
  badge?: string; // "Most booked" — from pricing.json
}
export interface MatrixCell {
  serviceId: string;
  amount: number;
  price: string; // "₹1,199"
  href: string; // /book/?service=…&size=…&src=…
}
export interface MatrixRow {
  size: Size;
  label: string; // "Small"
  kg: string; // "< 10 kg"
  examples: string; // "Shih Tzu, Pomeranian, …"
  cells: MatrixCell[]; // one per MATRIX_COLUMNS entry, same order
}

/** Column metadata for the matrix header (badge from pricing.json: Full Groom → "Most booked"). */
export function matrixColumns(): MatrixColumn[] {
  return MATRIX_COLUMNS.map((c) => {
    const s = requireService(c.id);
    return { id: c.id, label: c.label, service: s.label, badge: s.badge };
  });
}

/** The 3 size rows × 3 services, every cell priced from pricing.json with its Book link (07 §2 row 5). */
export function matrixRows(src = 'pricing_row'): MatrixRow[] {
  return SIZES.map((size) => ({
    size,
    ...SIZE_MATRIX[size],
    cells: MATRIX_COLUMNS.map((c) => {
      const amount = sizePrice(c.id, size) as number;
      return { serviceId: c.id, amount, price: inr(amount), href: bookHref({ service: c.id, size, src }) };
    }),
  }));
}

// ── Flat-price lines (06 §5.2 "flat-price lines"; per-page lists from the blueprints, wording verbatim) ──────────

export interface PriceLine {
  label: string; // left column, e.g. "Cat Bath & Brush"
  price: string; // right column — ONLY from the helpers above, e.g. "₹899", "₹699 + medicines at MRP"
  note?: string; // small slate line under the label, e.g. "(7 walks)"
  service?: string; // pricing.json id → row-end Book link (omitted on add-on rows: an add-on is booked with a groom)
  size?: Size; // optional size preselect for the Book link
  href?: string; // explicit link override (rare)
}

/** Which verbatim list: the 06 §5.2 canonical set, a /pricing/ section, or a money page's SP-4 flat list. */
export type PriceLineSet =
  | 'canonical' // 06 §5.2 — every flat-price line
  | 'pricing-cat-quick' // pricing.md PR-5 "Cat grooming charges & quick visits"
  | 'pricing-walking' // pricing.md PR-6 "Dog walking charges in Ludhiana"
  | 'pricing-vet' // pricing.md PR-7 "Vet home visit fee & vaccination cost"
  | 'cat-grooming' // cat-grooming.md SP-4
  | 'dog-walking' // dog-walking.md SP-4
  | 'vet-at-home' // vet-at-home.md SP-4
  | 'dog-vaccination' // dog-vaccination.md SP-4 (Wave 2)
  | 'tick-flea-treatment' // tick-flea-treatment.md SP-4 (Wave 2)
  | 'puppy-grooming'; // puppy-grooming.md SP-4 (Wave 2)

/** The verbatim flat-price lines for a page/section. PriceMatrix adds the Book links (its `source` prop). */
export function priceLines(set: PriceLineSet): PriceLine[] {
  const tick = `add-on ${addonPrice()} / standalone ${flatPrice('tick-flea')}`;
  const catBB: PriceLine = { label: 'Cat Bath & Brush', price: planPrice('cat-grooming', 'cat-bath-brush'), service: 'cat-grooming' };
  const catFull: PriceLine = { label: 'Cat Full Groom', price: planPrice('cat-grooming', 'cat-full'), service: 'cat-grooming' };
  const walk1 = planPrice('dog-walking', 'walk-1x');
  const walk2 = planPrice('dog-walking', 'walk-2x');
  const trial = planPrice('dog-walking', 'walk-trial');
  switch (set) {
    case 'canonical':
      return [
        { label: 'Puppy Intro Groom (< 6 months)', price: flatPrice('puppy-intro'), service: 'puppy-intro' },
        catBB,
        catFull,
        { label: 'Nail Trim + Ear Clean', price: flatPrice('nail-ear'), service: 'nail-ear' },
        { label: 'Tick & Flea', price: tick, service: 'tick-flea' },
        { label: 'Vet visit', price: `${flatPrice('vet-visit')} + MRP`, service: 'vet-visit' },
        { label: 'Vaccination', price: `${flatPrice('vaccination')} + vaccine MRP`, service: 'vaccination' },
        { label: 'Deworming', price: flatPrice('deworming'), service: 'deworming' },
        { label: 'Walking', price: `${walk1}/mo`, note: '(1 walk/day)', service: 'dog-walking' },
        { label: 'Walking', price: `${walk2}/mo`, note: '(2 walks/day)', service: 'dog-walking' },
        { label: 'Trial Week', price: trial, service: 'dog-walking' },
      ];
    case 'pricing-cat-quick':
      return [
        catBB,
        catFull,
        { label: 'Puppy Intro Groom (8 weeks–6 months)', price: flatPrice('puppy-intro'), service: 'puppy-intro' },
        { label: 'Nail Trim + Ear Clean visit', price: flatPrice('nail-ear'), service: 'nail-ear' },
        { label: 'Tick & Flea', price: tick, service: 'tick-flea' },
      ];
    case 'pricing-walking':
      return [
        { label: '1 walk/day', price: `${walk1}/month`, service: 'dog-walking' },
        { label: '2 walks/day', price: `${walk2}/month`, service: 'dog-walking' },
        { label: 'Trial Week (7 walks)', price: trial, service: 'dog-walking' },
      ];
    case 'pricing-vet':
      return [
        { label: 'Vet visit', price: `${flatPrice('vet-visit')} + medicines at MRP`, service: 'vet-visit' },
        { label: 'Vaccination', price: `${flatPrice('vaccination')} + vaccine at MRP`, service: 'vaccination' },
        { label: 'Deworming', price: flatPrice('deworming'), note: '(dewormer included)', service: 'deworming' },
      ];
    case 'cat-grooming':
      return [
        catBB,
        { ...catFull, note: 'any breed, any coat' },
        { label: 'Flea treatment add-on', price: addonPrice(), note: '(cat-safe products)' },
        { label: 'Nail Trim + Ear Clean visit', price: flatPrice('nail-ear'), service: 'nail-ear' },
      ];
    case 'dog-walking':
      return [
        { label: '1 walk/day', price: `${walk1}/month`, service: 'dog-walking' },
        { label: '2 walks/day', price: `${walk2}/month`, service: 'dog-walking' },
        { label: 'Trial Week', price: trial, note: '(7 walks)', service: 'dog-walking' },
      ];
    case 'vet-at-home':
      return [
        { label: 'Vet visit', price: `${flatPrice('vet-visit')} + medicines at MRP`, service: 'vet-visit' },
        { label: 'Vaccination', price: `${flatPrice('vaccination')} + vaccine MRP`, service: 'vaccination' },
        { label: 'Deworming', price: flatPrice('deworming'), note: '(dewormer included)', service: 'deworming' },
      ];
    case 'dog-vaccination':
      return [
        { label: 'Vaccination service fee', price: `${flatPrice('vaccination')} + vaccine at printed MRP`, service: 'vaccination' },
        { label: 'Deworming Visit', price: flatPrice('deworming'), service: 'deworming' },
      ];
    case 'tick-flea-treatment':
      return [
        { label: 'Add-on with any groom', price: addonPrice() },
        { label: 'Standalone visit', price: flatPrice('tick-flea'), service: 'tick-flea' },
      ];
    case 'puppy-grooming':
      return [
        { label: 'Puppy Intro Groom', price: flatPrice('puppy-intro'), note: 'any breed, 8 weeks to 6 months', service: 'puppy-intro' },
      ];
  }
}

// ── Per-page price chips & labels (wording from each page blueprint / 06 §2.3 / template SP-1, SP-11, SP-13) ────

export type MoneyPage =
  | 'dog-grooming'
  | 'cat-grooming'
  | 'dog-walking'
  | 'vet-at-home'
  | 'dog-vaccination'
  | 'tick-flea-treatment'
  | 'puppy-grooming';

/** Price chip on a ServiceCard (home H-3, hub grid, SP-11 "Pet parents also book"): "from ₹599", "₹699 flat", … */
export function cardPriceChip(page: MoneyPage): string {
  switch (page) {
    case 'dog-grooming': return `from ${fromPrice(DOG_GROOM_IDS)}`;
    case 'cat-grooming': return `from ${fromPrice('cat-grooming')}`;
    case 'dog-walking': return `${planPrice('dog-walking', 'walk-1x')}/month`;
    case 'vet-at-home': return flatPrice('vet-visit');
    case 'dog-vaccination': return `${flatPrice('vaccination')} + MRP`;
    case 'tick-flea-treatment': return `${flatPrice('tick-flea')} · ${addonPrice()} add-on`;
    case 'puppy-grooming': return `${flatPrice('puppy-intro')} flat`;
  }
}

/** The price chip that leads a hero's chip row (template SP-1 rule 5): "from ₹599", "₹699 trial week", … */
export function heroPriceChip(page: MoneyPage | 'home' | 'ludhiana'): string {
  switch (page) {
    case 'home':
    case 'ludhiana': return `from ${lowestFixedPrice()}`;
    case 'dog-walking': return `${planPrice('dog-walking', 'walk-trial')} trial week`;
    case 'vet-at-home': return `${flatPrice('vet-visit')} visit`;
    case 'tick-flea-treatment': return `${flatPrice('tick-flea')} · ${addonPrice()} with a groom`;
    default: return cardPriceChip(page);
  }
}

/** Sticky-bar Book label on a money page (SP-13): "Book · from ₹599", "Trial week ₹699 · Book", … */
export function stickyBookLabel(page: MoneyPage): string {
  switch (page) {
    case 'dog-grooming':
    case 'cat-grooming': return `Book · ${cardPriceChip(page)}`;
    case 'dog-walking': return `Trial week ${planPrice('dog-walking', 'walk-trial')} · Book`;
    case 'vet-at-home': return `Book vet · ${flatPrice('vet-visit')}`;
    case 'dog-vaccination': return `Book · ${flatPrice('vaccination')} + MRP`;
    case 'tick-flea-treatment': return `Book · ${flatPrice('tick-flea')}`;
    case 'puppy-grooming': return `Book · ${flatPrice('puppy-intro')}`;
  }
}

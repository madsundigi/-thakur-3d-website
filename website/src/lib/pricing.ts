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

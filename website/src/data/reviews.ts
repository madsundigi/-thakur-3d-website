// Customer proof — Google review seeds (ReviewCard.astro) and consented before/after pairs (BeforeAfter.astro).
// Display rules: 06-CONVERSION-PLAYBOOK §4.3–§4.4, 08-DESIGN-SYSTEM §4.11–§4.12.
//
// HONESTY LAW: Google is the source of truth. A review here is a real Google review quoted VERBATIM (trim only with
// "…", never reword); never write, invent or estimate one (02 P055, reviews.md §3). Until the seed reviews are
// collected (00 §9.6) each slot is a [FILL:REVIEW_n] token (00 §8). NO Review / AggregateRating schema, ever (04 §2.0.4).
import { site } from './site';
import { getService } from '../lib/pricing';

export interface Review {
  id: string; // the slot token name, e.g. "REVIEW_1" (area pages: "REVIEW_{SLUG}_n", 00 §8)
  quote: string; // verbatim from Google — "[FILL:REVIEW_1]" until collected
  service: string; // pricing.json id of the service taken (seeds: the service this slot is to be collected for)
  serviceLabel?: string; // chip text override, e.g. "Full Groom" for a cat-grooming plan (default: pricing.json label)
  rating: 1 | 2 | 3 | 4 | 5; // the Google star rating, as shown on Google
  name?: string; // owner first name
  locality?: string; // Ludhiana locality, e.g. "Sarabha Nagar"
  pet?: string; // pet name
  breed?: string;
  date?: string; // "YYYY-MM" — rendered as "Oct 2026"
  ownerReply?: string; // our public reply on Google, verbatim (reviews.md RV-4)
}

// Seed slots REVIEW_1…REVIEW_5 (02 P055; 00 §9.6 "5+ genuine seed reviews"). When a real review arrives, replace the
// quote and add name · locality · pet · breed · date exactly as on Google, and set `service`/`rating` to the truth.
export const reviews: Review[] = [
  { id: 'REVIEW_1', quote: '[FILL:REVIEW_1]', service: 'full-groom', rating: 5 },
  { id: 'REVIEW_2', quote: '[FILL:REVIEW_2]', service: 'bath-brush', rating: 5 },
  { id: 'REVIEW_3', quote: '[FILL:REVIEW_3]', service: 'cat-grooming', rating: 5 },
  { id: 'REVIEW_4', quote: '[FILL:REVIEW_4]', service: 'dog-walking', rating: 5 },
  { id: 'REVIEW_5', quote: '[FILL:REVIEW_5]', service: 'vet-visit', rating: 5 },
];

/** True while the review is still a [FILL:*] seed slot. */
export const isSeedReview = (r: Review): boolean => r.quote.includes('[FILL:');

/** Reviews that are real (collected from Google). */
export const realReviews = (): Review[] => reviews.filter((r) => !isSeedReview(r));

/** Template SP-2 / home H-2: show cards only once this many real reviews exist; until then render REVIEWS_EMPTY_STATE. */
export const reviewsReady = (min = 3): boolean => realReviews().length >= min;

// Nearest-service fallback groups (template SP-2: "filtered to this service — fallback: nearest service, then any").
const GROUP: Record<string, string> = {
  'bath-brush': 'grooming', 'full-groom': 'grooming', 'premium-spa': 'grooming', 'puppy-intro': 'grooming',
  'cat-grooming': 'grooming', 'nail-ear': 'grooming', 'tick-flea': 'grooming',
  'dog-walking': 'walking',
  'vet-visit': 'vet', vaccination: 'vet', deworming: 'vet',
};

/**
 * Pick reviews for a block.
 * - `services`: the page's service ids — exact matches first, then the same group, then any (SP-2).
 * - `locality`: area pages — that locality ONLY (_TEMPLATE-area-page AP-4); returns fewer rather than borrowing.
 * - neither: a mix across service groups (home H-2 "mixed services, mixed localities").
 * - `includeSeeds`: false by default — pre-launch blocks render REVIEWS_EMPTY_STATE instead of [FILL] cards.
 */
export function pickReviews(opts: { services?: string[]; locality?: string; count?: number; includeSeeds?: boolean } = {}): Review[] {
  const { services, locality, count = 3, includeSeeds = false } = opts;
  let pool = includeSeeds ? [...reviews] : realReviews();
  if (locality) pool = pool.filter((r) => r.locality === locality);
  if (services?.length) {
    const groups = new Set(services.map((s) => GROUP[s]));
    const rank = (r: Review) => (services.includes(r.service) ? 0 : groups.has(GROUP[r.service]) ? 1 : 2);
    return pool.map((r, i) => ({ r, i })).sort((a, b) => rank(a.r) - rank(b.r) || a.i - b.i).slice(0, count).map((x) => x.r);
  }
  if (locality) return pool.slice(0, count);
  const seen = new Set<string>();
  const mixed = pool.filter((r) => (seen.has(GROUP[r.service]) ? false : (seen.add(GROUP[r.service]), true)));
  return [...mixed, ...pool.filter((r) => !mixed.includes(r))].slice(0, count);
}

/** Chip text for the service taken: the explicit label, else the pricing.json label ("Full Groom", "Cat Grooming"). */
export const reviewServiceLabel = (r: Review): string => r.serviceLabel ?? getService(r.service)?.label ?? r.service;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** "2026-10" → "Oct 2026" (locale-independent so builds are deterministic). */
export function monthYear(ym: string): string {
  const [y, m] = ym.split('-').map(Number);
  return MONTHS[m - 1] ? `${MONTHS[m - 1]} ${y}` : ym;
}

// Sitewide proof line (06 §4.4) — always rendered as a link to site.gbpLink. Numbers live in site.ts (one data file).
export const PROOF_LINE = `★ ${site.googleRating} on Google · ${site.reviewCount}+ Ludhiana pet parents`;

// Pre-launch empty state (06 §9 E6) — rendered INSTEAD of review cards until reviewsReady(). Link the URL to site.gbpLink.
export const REVIEWS_EMPTY_STATE = `Fresh reviews coming soon — we're new in Ludhiana and earning them one happy pet at a time. Read our live Google reviews at ${site.gbpLink}.`;

// ── Before/after pairs (06 §4.3, 08 §4.12/§5.3) ─────────────────────────────────────────────────────────────────

export interface BeforeAfterPair {
  id: string; // e.g. "simba-golden-retriever-model-town"
  pet: string; // pet name — caption "{Pet name} · {Breed} · {Service} · {Locality}"
  breed: string; // e.g. "Golden Retriever", "Persian cat"
  service: string; // pricing.json id of the service shown
  serviceLabel?: string; // caption text override (default: pricing.json label, e.g. "Full Groom")
  altService?: string; // service phrase inside the alts (default: caption label lower-cased), e.g. "full grooming"
  locality: string; // where it was really shot (alts name it — 08 §5.4)
  before: string; // Photo.astro asset name, 1:1 (08 §5.3)
  after: string; // Photo.astro asset name, same angle/light as `before`
  consent: string; // date (YYYY-MM-DD) the owner's "YES" arrived on WhatsApp — stored per 06 §4.3; required
}

// Real, consented pairs only — none yet. Blocks are omitted until enough exist (SP-5: ≥ 2 for the service;
// home H-7: ≥ 3). Never stock, never placeholders (08 §5.1).
export const beforeAfterPairs: BeforeAfterPair[] = [];

/** Pairs for a block: by service ids (SP-5) and/or locality (area pages, AP-4). */
export function pairsFor(opts: { services?: string[]; locality?: string; count?: number } = {}): BeforeAfterPair[] {
  const { services, locality, count = 4 } = opts;
  return beforeAfterPairs
    .filter((p) => (!services?.length || services.includes(p.service)) && (!locality || p.locality === locality))
    .slice(0, count);
}

/** Caption service label for a pair. */
export const pairServiceLabel = (p: BeforeAfterPair): string => p.serviceLabel ?? getService(p.service)?.label ?? p.service;

// Customer proof — Google review seeds (ReviewCard.astro) and consented before/after pairs (BeforeAfter.astro).
// Display rules: 06-CONVERSION-PLAYBOOK §4.3–§4.4, 08-DESIGN-SYSTEM §4.11–§4.12.
//
// HONESTY LAW: Google is the source of truth. A review here is a real Google review quoted VERBATIM (trim only with
// "…", never reword); never write, invent or estimate one (02 P055, reviews.md §3). Until the seed reviews are
// collected (00 §9.6) each slot is a [FILL:REVIEW_n] token (00 §8). NO Review / AggregateRating schema, ever (04 §2.0.4).
import { site } from './site';
import { getService } from '../lib/pricing';

export interface Review {
  id: string; // e.g. "REVIEW_1" — the seed slot it fills (area pages: "REVIEW_{SLUG}_n", 00 §8)
  quote: string; // verbatim from Google (trim only with "…", never reword)
  rating: 1 | 2 | 3 | 4 | 5; // the star rating exactly as shown on Google
  service: string; // pricing.json id of the service actually taken
  serviceLabel?: string; // chip text override, e.g. "Full Groom" for a cat-grooming plan (default: pricing.json label)
  name: string; // owner first name, as on Google
  date: string; // "YYYY-MM" of the Google review — rendered as "Oct 2026"
  locality?: string; // Ludhiana locality, e.g. "Sarabha Nagar" (only when known to be true)
  pet?: string; // pet name
  breed?: string;
  ownerReply?: string; // our public reply on Google, verbatim (reviews.md RV-4)
}

/**
 * A review slot not yet collected (00 §9.6 "5+ genuine seed reviews"). Only the [FILL:REVIEW_n] token exists — no
 * rating, service, name or date is known, so none is stored: a seed never shows stars, a "Rated n out of 5" line, a
 * service chip or a date (06 §4.4 "never display a rating/count that GBP doesn't back"). ReviewCard renders a seed as
 * its bare token (08 §4.11 "seeded with [FILL:REVIEW_1]-style tokens until real"), which the launch grep then catches.
 */
export interface ReviewSeed {
  id: string;
  quote: `[FILL:${string}]`;
  // Unknown until collected — a seed can never carry them (also enforced at build time by assertReview).
  rating?: never;
  service?: never;
  name?: never;
  date?: never;
}

export type ReviewSlot = Review | ReviewSeed;

// Seed slots REVIEW_1…REVIEW_5 (02 P055). When a real review arrives, replace the WHOLE slot with a Review: the quote
// verbatim plus rating · service · name · date exactly as on Google (and locality · pet · breed when known). The build
// fails if a non-seed entry misses any required field (assertReview below) — nothing ever defaults to 5 stars.
export const reviews: ReviewSlot[] = [
  { id: 'REVIEW_1', quote: '[FILL:REVIEW_1]' },
  { id: 'REVIEW_2', quote: '[FILL:REVIEW_2]' },
  { id: 'REVIEW_3', quote: '[FILL:REVIEW_3]' },
  { id: 'REVIEW_4', quote: '[FILL:REVIEW_4]' },
  { id: 'REVIEW_5', quote: '[FILL:REVIEW_5]' },
];

/** True while the slot is still a [FILL:*] seed. */
export const isSeedReview = (r: ReviewSlot): r is ReviewSeed => r.quote.includes('[FILL:');

/** Build-time guard: a real review must carry every fact the card shows, taken from Google — never a default. */
export function assertReview(r: ReviewSlot): void {
  if (isSeedReview(r)) {
    const extra = Object.keys(r).filter((k) => k !== 'id' && k !== 'quote');
    if (extra.length) {
      throw new Error(`reviews.ts ${r.id}: a [FILL] seed must not carry ${extra.join(', ')} — unknown until collected`);
    }
    return;
  }
  const x = r as Partial<Review>;
  const missing = [
    !x.quote?.trim() && 'quote',
    !(Number.isInteger(x.rating) && (x.rating as number) >= 1 && (x.rating as number) <= 5) && 'rating (1–5, as on Google)',
    !(x.service && getService(x.service)) && 'service (a pricing.json id)',
    !x.name?.trim() && 'name',
    !(x.date && /^\d{4}-(0[1-9]|1[0-2])$/.test(x.date)) && 'date ("YYYY-MM")',
  ].filter(Boolean);
  if (missing.length) throw new Error(`reviews.ts ${r.id}: a real review needs ${missing.join(', ')} taken from Google`);
}
reviews.forEach(assertReview);
const ids = reviews.map((r) => r.id);
const dup = ids.find((id, i) => ids.indexOf(id) !== i);
if (dup) throw new Error(`reviews.ts: duplicate review id ${dup}`);

/** Reviews that are real (collected from Google). */
export const realReviews = (): Review[] => reviews.filter((r): r is Review => !isSeedReview(r));

/** Template SP-2 / home H-2: show cards only once this many real reviews exist; until then render REVIEWS_EMPTY_STATE. */
export const reviewsReady = (min = 3): boolean => realReviews().length >= min;

// Nearest-service fallback groups (template SP-2: "filtered to this service — fallback: nearest service, then any").
const GROUP: Record<string, string> = {
  'bath-brush': 'grooming', 'full-groom': 'grooming', 'premium-spa': 'grooming', 'puppy-intro': 'grooming',
  'cat-grooming': 'grooming', 'nail-ear': 'grooming', 'tick-flea': 'grooming',
  'dog-walking': 'walking',
  'vet-visit': 'vet', vaccination: 'vet', deworming: 'vet',
};

interface PickOptions { services?: string[]; locality?: string; count?: number; includeSeeds?: boolean }
/**
 * Pick reviews for a block. Real reviews always come first; seeds (only with `includeSeeds`) fill what is left.
 * - `services`: the page's service ids — exact matches first, then the same group, then any (SP-2).
 * - `locality`: area pages — that locality ONLY (_TEMPLATE-area-page AP-4); returns fewer rather than borrowing
 *   (the generic REVIEW_n seeds are never added there: area slots are REVIEW_{SLUG}_n, 00 §8).
 * - neither: a mix across service groups (home H-2 "mixed services, mixed localities").
 * - `includeSeeds`: false by default — pre-launch blocks render REVIEWS_EMPTY_STATE instead of [FILL] cards.
 */
export function pickReviews(opts?: PickOptions & { includeSeeds?: false }): Review[];
export function pickReviews(opts: PickOptions): ReviewSlot[];
export function pickReviews(opts: PickOptions = {}): ReviewSlot[] {
  const { services, locality, count = 3, includeSeeds = false } = opts;
  let pool = realReviews();
  if (locality) pool = pool.filter((r) => r.locality === locality);
  let picked: Review[];
  if (services?.length) {
    const groups = new Set(services.map((s) => GROUP[s]));
    const rank = (r: Review) => (services.includes(r.service) ? 0 : groups.has(GROUP[r.service]) ? 1 : 2);
    picked = pool.map((r, i) => ({ r, i })).sort((a, b) => rank(a.r) - rank(b.r) || a.i - b.i).map((x) => x.r);
  } else if (locality) {
    picked = pool;
  } else {
    const seen = new Set<string>();
    const mixed = pool.filter((r) => (seen.has(GROUP[r.service]) ? false : (seen.add(GROUP[r.service]), true)));
    picked = [...mixed, ...pool.filter((r) => !mixed.includes(r))];
  }
  const seeds = includeSeeds && !locality ? reviews.filter(isSeedReview) : [];
  return [...picked, ...seeds].slice(0, count);
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

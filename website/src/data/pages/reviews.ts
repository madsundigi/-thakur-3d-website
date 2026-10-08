// /reviews/ copy — website-plan/blueprints/reviews.md §2 (B15), verbatim where the blueprint words it; new copy (the
// RV-7 feedback line, the two WhatsApp prefills) is written to 06 voice and logged in decisions/w2-trust-a.md.
//
// HONESTY LAW (reviews.md §3, 06 §4.4, 02 P055/P086): Google is the source of truth. Ratings, counts and review text
// live ONLY in src/data/reviews.ts + src/data/site.ts as real values or [FILL:*] tokens — never invented here. NO
// Review/AggregateRating markup, ever (04 §2.0.4). The page publishes only once ≥ 10 real Google reviews exist
// (reviews.md ship checks); until then the cards block renders the E6 empty state (REVIEWS_EMPTY_STATE) and the
// proof bar carries the [FILL:GOOGLE_RATING]/[FILL:REVIEW_COUNT] tokens. No rupee figure here.
import { routeLabel } from '../routes';

export const REVIEWS_PATH = '/reviews/';

/** RV-1 / §1 head — verbatim from reviews.md §1 (title 53, meta 147, H1 47). */
export const REVIEWS_HEAD = {
  title: 'Reviews – What Ludhiana Pet Parents Say | PetDoorStep',
  description:
    'Real Google reviews from Ludhiana pet parents who book PetDoorStep for grooming, walking and vet visits at home — with locality, breed and service.',
  h1: 'What Ludhiana Pet Parents Say About PetDoorStep',
} as const;

/** RV-1 header line, verbatim (reviews.md RV-1). */
export const REVIEWS_INTRO = 'Every review here is a real Google review — tap through and check.';

/** RV-2 proof-bar button labels (reviews.md RV-2). The ★ line itself is the shared PROOF_LINE (reviews.ts, 06 §4.4). */
export const PROOF_BAR = {
  seeAll: 'See all reviews on Google',
  write: 'Write a review',
} as const;

/**
 * RV-2 "Write a review" target. The GBP write-a-review URL is a [FILL:GBP_REVIEW_LINK] token (00 §8 Google group); it
 * is NOT yet in src/data/site.ts (which owns gbpLink / googleRating / reviewCount). Held here as the token until
 * site.ts gains a `gbpReviewLink` field — requested in requests/w2-trust-a.md (B1). The launch grep catches it.
 */
export const GBP_REVIEW_LINK = '[FILL:GBP_REVIEW_LINK]';

/**
 * RV-3/RV-4 service buckets, in the reviews.md RV-3 filter order (Dog grooming · Cat grooming · Walking · Vet &
 * vaccination). `serviceIds` are src/data/pricing.json ids; a real review's `service` lands it in exactly one bucket.
 * Dormant until real reviews exist (the cards block renders the E6 empty state meanwhile).
 */
export const REVIEW_SERVICE_FILTERS: readonly { id: string; label: string; serviceIds: readonly string[] }[] = [
  { id: 'dog-grooming', label: 'Dog grooming', serviceIds: ['full-groom', 'bath-brush', 'premium-spa', 'puppy-intro', 'nail-ear', 'tick-flea'] },
  { id: 'cat-grooming', label: 'Cat grooming', serviceIds: ['cat-grooming'] },
  { id: 'walking', label: 'Walking', serviceIds: ['dog-walking'] },
  { id: 'vet', label: 'Vet & vaccination', serviceIds: ['vet-visit', 'vaccination', 'deworming'] },
] as const;

/** RV-7 "Not happy?" — H2 = the block name; body = the quote verbatim (reviews.md RV-7). */
export const RV_NOT_HAPPY = {
  heading: 'Not happy?',
  body:
    "Had a not-so-great experience? Tell us on WhatsApp — a real person reads every message and replies within 10 minutes (9:00–19:00). We'd rather fix it than lose your trust.",
  cta: 'WhatsApp us',
} as const;

/** RV-8 CTA-band heading, verbatim (reviews.md RV-8). */
export const RV_CTA_HEADING = 'Join them — book your first visit in 2 minutes.';

// ── WhatsApp prefills (02 P158: name the source page; shape = services.ts bookText, 07 §6) ───────────────────────
// Held here until services.ts PAGE_PREFILL owns /reviews/ (requests/w2-trust-a.md B2). `routeLabel` keeps the page
// name in one place (routes.ts).

/** RV-7 feedback message (new copy — reviews.md RV-7 words no prefill). Not booking-shaped: it opens a feedback chat. */
export const REVIEWS_FEEDBACK_PREFILL =
  'Hi PetDoorStep, I booked a visit and I would like to share some honest feedback: ___';

/** RV-8 + the page chrome: the booking-shaped prefill naming this page (same shape every non-money page uses). */
export const REVIEWS_BOOK_PREFILL =
  `Hi PetDoorStep! I want to book a service (from your ${routeLabel(REVIEWS_PATH)} page). My area: ___ . My pet: ___`;

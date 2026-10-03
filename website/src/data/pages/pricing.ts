// /pricing/ page copy — website-plan/blueprints/pricing.md (B06). Strings are the blueprint's wording verbatim (§1 head,
// §3 blocks). Where the blueprint leaves a string open (some section headings, the Groom Club table labels), the copy
// is written to 06 voice and logged in website-plan/decisions/w1-pricing.md. No rupee figure is typed in this file:
// every amount renders from src/data/pricing.json through src/lib/pricing.ts (07 §4; `npm run check:prices`).
// Shared copy stays in its shared home and is imported by the page: R1/R2/R3, WALK_PAYMENT_LINE, the Groom Club
// headline + pitch + prefill and the offer lines/terms (src/data/content.ts), the FAQ (src/data/faq.json).
import { DOG_GROOM_IDS, flatPrice, fromPrice, planPrice } from '../../lib/pricing';

export const PRICING_PATH = '/pricing/';

/** §1 Head. Title and H1 verbatim; the meta is the blueprint sentence with its four figures read from pricing.json. */
export const HEAD = {
  title: 'Dog Grooming Price in Ludhiana – Full List | PetDoorStep',
  description:
    `Dog grooming price in Ludhiana from ${fromPrice(DOG_GROOM_IDS)} — plus walking ${planPrice('dog-walking', 'walk-1x')}/month, ` +
    `vet visit ${flatPrice('vet-visit')}, vaccination ${flatPrice('vaccination')} + MRP. Fixed prices, no bargaining. Book on WhatsApp.`,
} as const;

/** PR-1 compact hero (no photo). Labels from the 06 §3.2 button bank, as the blueprint names them. */
export const HERO = {
  eyebrow: 'Every price. Fixed. No doorstep bargaining.',
  h1: 'Dog Grooming & Pet Care Prices in Ludhiana',
  subhead:
    'The price you see is the price you pay — confirmed on WhatsApp before we arrive. No advance payment; pay by UPI or cash after the service.',
  book: 'Book Now',
  whatsapp: 'WhatsApp us',
} as const;

/** 09 §2d source values used on this page (07 §2 rows 3 and 5, 06 §7.3). */
export const SRC = {
  hero: 'hero_pricing',
  row: 'pricing_row',
  ctaBand: 'ctaband_pricing',
  groomClub: 'groomclub',
} as const;

/** Section H2s in DOM order. PR-3, PR-5, PR-6, PR-7, PR-10: blueprint verbatim. PR-4: the template SP-3 H2 (the block is
 *  "the ✓-grid from SP-3 — same component, same wording"). PR-8's H2 is GROOM_CLUB_HEADLINE (content.ts). The blueprint
 *  names no H2 for PR-2, PR-9 and PR-11: those three are written here (decisions log). */
export const H2 = {
  sizeGuide: 'Which size is your dog?',
  dogTable: 'Dog grooming charges by size',
  included: "What's included in every dog grooming package",
  catQuick: 'Cat grooming charges & quick visits',
  walking: 'Dog walking charges in Ludhiana',
  vet: 'Vet home visit fee & vaccination cost',
  offers: 'First-groom and referral offers',
  fixed: 'Why our prices are fixed',
  faq: 'Prices & payment — your questions',
} as const;

/** PR-2 line under the size guide. */
export const SIZE_GUIDE_LINE =
  'Not sure? Pick the closer size — your groomer confirms on WhatsApp before the visit, never at your door.';

/** PR-3 matrix <caption> (§2: the "pet grooming price list ludhiana" slot). */
export const DOG_TABLE_CAPTION = 'Pet grooming price list, Ludhiana';

/** PR-4 Full Groom column note (§2: the "full body dog grooming price" slot). Passed to InfoTable as columnNotes, so
 *  this page shows the blueprint wording whatever the shared PACKAGE_TABLES note says. */
export const FULL_GROOM_NOTE = 'full body dog grooming — haircut, styling, paw & sanitary trim';

/** PR-7 line under the vet & vaccination prices. */
export const VET_LINE =
  'Registered veterinarians only. Medicines and vaccines are charged at printed MRP — the wrapper is shown to you.';

/** PR-8 maths table (06 §7.3 figures, computed by groomClubPrices()) and the button label (06 §3.2 bank). `save`
 *  prefixes the saving under each club price — the blueprint's "₹1,019 (save ₹180)". */
export const GROOM_CLUB = {
  caption: 'Groom Club price for one Full Groom a month, by dog size',
  rowHeader: 'Dog size',
  regular: 'Full Groom',
  club: 'Groom Club price',
  save: 'save',
  join: 'Join Groom Club',
} as const;

/** PR-9: anchor text to /offers/ — rendered only once that Wave-2 page is live. */
export const OFFERS_LINK = 'See all offers';

/** PR-10, the three short paragraphs verbatim. */
export const FIXED_PRICE_PARAGRAPHS = [
  'Quote-on-arrival is how pet parents get overcharged — so we publish every price by size.',
  'The only possible addition is a clearly flagged add-on, like de-matting a severely matted coat — quoted on WhatsApp before we start, never after.',
  'No travel charge anywhere in Ludhiana, and no advance payment — you pay after the service.',
] as const;

/** PR-12 CTA band heading. */
export const CTA_BAND_HEADING = 'Know your price? Book in 2 minutes.';

// ---- build-time checks: 02 launch-blocker lengths (P011 title 50–60 · P019/P024 meta 120–158, no double quote ·
// P026 H1 20–70), counted in characters (code points), as the check:pages gate counts them.
(function validate() {
  const len = (s: string) => [...s].length;
  const problems: string[] = [];
  if (len(HEAD.title) < 50 || len(HEAD.title) > 60) problems.push(`title is ${len(HEAD.title)} chars (50–60, P011)`);
  if (len(HEAD.description) < 120 || len(HEAD.description) > 158) problems.push(`meta is ${len(HEAD.description)} chars (120–158, P019)`);
  if (HEAD.description.includes('"')) problems.push('meta contains a double quote (P024)');
  if (len(HERO.h1) < 20 || len(HERO.h1) > 70) problems.push(`H1 is ${len(HERO.h1)} chars (20–70, P026)`);
  if (problems.length) throw new Error(`src/data/pages/pricing.ts: ${problems.join(' · ')}`);
})();

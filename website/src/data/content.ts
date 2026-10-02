// Shared site copy that multiple components render. Copy sources are cited per block.

// Policy gates (00-MASTER-PLAN §3.4, 06-CONVERSION-PLAYBOOK §4.1/§6): a gated promise renders ONLY when true.
// Flip a gate only after Sunny confirms the policy in writing (log it in 00 §11).
export const policy = {
  onTimeOr100Off: false, // Promise point 4
  freeTouchUp: false, // objection answer 7
  stopNoPay: false, // objection answer 4
} as const;

// The PetDoorStep Promise — 5-icon strip labels (06 §4.1; template SP-8 worked example).
export const promisePoints: { id: string; label: string; icon: 'shield-check' | 'sparkles' | 'check-circle-2' | 'clock' | 'camera'; gated?: keyof typeof policy }[] = [
  { id: 'verified', label: 'Verified people, always.', icon: 'shield-check' },
  { id: 'kit', label: 'A fresh, sealed kit for every pet.', icon: 'sparkles' },
  { id: 'prices', label: 'Fixed, transparent prices.', icon: 'check-circle-2' },
  { id: 'on-time', label: 'On time, or ₹100 off.', icon: 'clock', gated: 'onTimeOr100Off' },
  { id: 'proof', label: 'Proof after every visit.', icon: 'camera' },
];

export const MEDICAL_LINE = 'Registered veterinarians only — every medical service, no exceptions.';

// The 4 booking steps — verbatim from 04-TECHNICAL-SEO §2.8 (HowTo). Visible text and schema must match.
export const bookingSteps = [
  { name: 'Choose your service', text: 'Pick what your pet needs: grooming, walking, vet visit, vaccination or tick & flea treatment. Fixed prices are shown upfront.' },
  { name: 'Tell us about your pet', text: 'Select dog or cat and the size — Small under 10 kg, Medium 10–25 kg, Large over 25 kg — so we quote the exact price, not an estimate.' },
  { name: 'Pick your area and time slot', text: 'Choose your Ludhiana locality and a convenient slot between 9:00 am and 7:00 pm, any day of the week.' },
  { name: 'Confirm on WhatsApp', text: 'Your booking opens in WhatsApp with all details pre-filled. Send it, and our team confirms your slot. A background-verified groomer arrives at your doorstep with a fresh sanitised kit.' },
];

// Microcopy bank (06 §9) — used verbatim.
export const R1 = 'The price you see is the price you pay — confirmed on WhatsApp before we arrive.';
export const R2 = 'No advance payment — pay by UPI or cash after the service.';
export const R3 = 'A real person replies on WhatsApp within 10 minutes, 9:00–19:00.';
export const R5 = 'Takes about 60 seconds. No app, no login, no payment now.';
export const R7 = 'We confirm your exact slot on WhatsApp within 10 minutes.';
export const R4 = 'We bring everything — table, towels, warm-water gear. We just need a tap and a plug.';
export const R6 = 'Anything we should know? (first groom, anxious, skin issues, senior pet…)';
/** R8 exactly as 06 §9 writes it, {breed}/{area} unfilled. Render it through r8() — never hand-edit the wording. */
export const R8 = 'Your {breed} deserves a stress-free groom at home. Slots this week in {area}.';
/**
 * R8 filled (06 §9; CtaBand heading on service pages SP-12 and area pages AP-11). With no `area` it ends
 * "Slots this week across Ludhiana." (the SP-12 worked example); `service` swaps "groom" (SP-12 pattern
 * "a stress-free {service} at home").  r8('Labrador') → "Your Labrador deserves a stress-free groom at home. Slots this week across Ludhiana."
 */
export const r8 = (breed: string, area?: string, service = 'groom'): string =>
  `Your ${breed} deserves a stress-free ${service} at home. Slots this week ${area ? `in ${area}` : 'across Ludhiana'}.`;

// /thank-you/ copy (06 §9 T1–T3, E4). T3 shows only when the widget appended FIRSTGROOM to this booking.
import { FIRSTGROOM } from './offers';
const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`;
export const T1 = 'Done! Your booking request is on WhatsApp. 🐾';
export const T3 = `First time with us? Code ${FIRSTGROOM.code} saves you ${rupees(FIRSTGROOM.off)} — already noted in your booking.`;

// Standard trust-chip set (06 §2.1, facts from 00 §3.4) — verbatim. Chip.astro draws the ✔ as its check icon, so
// the strings carry no tick. Pages whose 06 §2.3 hero block overrides chips pass their own list to Hero.
export const TRUST_CHIPS: readonly string[] = [
  'Background-verified groomers',
  'Sealed sanitised kit per pet',
  'Fixed prices — no doorstep bargaining',
  'Photo update after every visit',
];

// ── Price-chip strings — every figure read from pricing.json (07 §4: no ₹ literals) ──
import { getService, inr, type Service } from '../lib/pricing';
const svc = (id: string): Service => {
  const s = getService(id);
  if (!s) throw new Error(`content.ts: service "${id}" is missing from pricing.json`);
  return s;
};
/** Lowest price of a service: small size, cheapest plan, or the flat/base fee. */
const fromPrice = (id: string): number => {
  const p = svc(id).pricing;
  if (p.type === 'by_size') return p.small;
  if (p.type === 'plans') return Math.min(...p.plans.map((x) => x.price));
  return p.price;
};
const planPrice = (id: string, planId: string): number => {
  const p = svc(id).pricing;
  const hit = p.type === 'plans' ? p.plans.find((x) => x.id === planId) : undefined;
  if (!hit) throw new Error(`content.ts: plan "${planId}" is missing from pricing.json`);
  return hit.price;
};
const addonPrice = (id: string): number => {
  const p = svc(id).pricing;
  return p.type === 'flat' && p.addonPrice ? p.addonPrice : 0;
};

/** ServiceCard price chip per money page — the blueprints/home.md H-3 formats, keyed by route path. */
export const SERVICE_PRICE_CHIP: Readonly<Record<string, string>> = {
  '/ludhiana/dog-grooming/': `from ${inr(fromPrice('bath-brush'))}`,
  '/ludhiana/cat-grooming/': `from ${inr(fromPrice('cat-grooming'))}`,
  '/ludhiana/dog-walking/': `${inr(planPrice('dog-walking', 'walk-1x'))}/month`,
  '/ludhiana/vet-at-home/': inr(fromPrice('vet-visit')),
  '/ludhiana/dog-vaccination/': `${inr(fromPrice('vaccination'))} + MRP`,
  '/ludhiana/tick-flea-treatment/': `${inr(fromPrice('tick-flea'))} · ${inr(addonPrice('tick-flea'))} add-on`,
  '/ludhiana/puppy-grooming/': `${inr(fromPrice('puppy-intro'))} flat`,
};

/** Hero price chip on home + the /ludhiana/ hub: "from" + the Nail Trim + Ear Clean visit price — the lowest 00 §3.2
 *  entry (T1 template §3 hub row; blueprints/home.md H-1). */
export const LOWEST_PRICE_CHIP = `from ${inr(fromPrice('nail-ear'))}`;

// ── Area cards (08 §4.14) ──
// oneLiner = the "Eyebrow / value proposition" column of blueprints/_TEMPLATE-area-page.md §4, verbatim (each area's
// genuinely distinct line); localLine = that table's "Meta local line". Area names/paths come from routes.ts.
export const AREA_LINES: Readonly<Record<string, { oneLiner: string; localLine: string }>> = {
  'sarabha-nagar': { oneLiner: 'Our most-booked area', localLine: 'B-Block market to Kipps side' },
  'brs-nagar': { oneLiner: 'Every block, every week', localLine: 'kothis and societies across all blocks' },
  'model-town': { oneLiner: "Ludhiana's pet-parent hub", localLine: 'home grooming without the salon queue' },
  'civil-lines': { oneLiner: 'Calm visits for busy homes', localLine: 'professional households, flexible slots' },
  dugri: { oneLiner: 'Phase 1 to Phase 3, covered', localLine: 'all three phases' },
  'pakhowal-road': { oneLiner: 'First doorstep groomers here', localLine: 'along the whole Pakhowal Road corridor' },
  'south-city': { oneLiner: 'Society-friendly visits', localLine: 'gated societies, gate-pass ready' },
  'ferozepur-road': { oneLiner: 'Condos to kothis, covered', localLine: 'condos and homes along Ferozepur Road' },
  'haibowal-kalan': { oneLiner: `Bath & Brush from ${inr(fromPrice('bath-brush'))}`, localLine: 'Jassian Road side and beyond' },
  'kitchlu-nagar': { oneLiner: 'Next door to PAU', localLine: 'homes near PAU Gate' },
};

/** The ten area slugs in 00 §3.3 order (home H-9 / hub grid order). */
export const AREA_SLUGS: readonly string[] = Object.keys(AREA_LINES);

// Shared site copy that multiple components render. Copy sources are cited per block.
// Rupee figures are never typed here: every amount comes from src/data/pricing.json (via src/lib/pricing.ts) or
// src/data/offers.ts, formatted with inr() (07 §4; `npm run check:prices` enforces it).
import { FIRSTGROOM, ON_TIME_OFF, REFERRAL } from './offers';
import { routes } from './routes';
import {
  cardPriceChip, flatPrice, fromPrice, groomClubPercent, groomClubPrices, groomClubSavingsRange, heroPriceChip, inr,
  pricingData, sizeGuide, type MoneyPage, type Size,
} from '../lib/pricing';

// Policy gates (00-MASTER-PLAN §3.4, 06-CONVERSION-PLAYBOOK §4.1/§6): a gated promise renders ONLY when true.
// Flip a gate only after Sunny confirms the policy in writing (log it in 00 §11).
export const policy = {
  onTimeOr100Off: false, // Promise point 4
  freeTouchUp: false, // objection answer 7
  stopNoPay: false, // objection answer 4
  // safety-hygiene.md SH-4 step 3: claim police verification (Punjab Police Saanjh) only once it is done for every
  // team member — the 00 §8 POLICE_VERIFICATION_STATUS fill. Until then HIRING_STEPS leaves that step out.
  policeVerified: false,
} as const;

// The PetDoorStep Promise (06 §4.1; template SP-8 worked example): 5-icon strip `label` + the full-block prose `body`,
// both verbatim ("do not reword the commitments, only the prose"). Point 4 stays gated — never a softened fifth.
export const promisePoints: {
  id: string;
  label: string;
  body: string;
  icon: 'shield-check' | 'sparkles' | 'check-circle-2' | 'clock' | 'camera';
  gated?: keyof typeof policy;
}[] = [
  {
    id: 'verified', label: 'Verified people, always.', icon: 'shield-check',
    body: "Every groomer and walker is background-verified before their first visit — ID checked, references called. You'll know who is coming before the doorbell rings.",
  },
  {
    id: 'kit', label: 'A fresh, sealed kit for every pet.', icon: 'sparkles',
    body: 'Blades and towels come sealed and sanitised, opened in front of you. Nothing used on another pet ever touches yours.',
  },
  {
    id: 'prices', label: 'Fixed, transparent prices.', icon: 'check-circle-2',
    body: 'The price on this website is the price you pay — confirmed on WhatsApp before we arrive. No doorstep bargaining, no surprise add-ons.',
  },
  {
    id: 'on-time', label: `On time, or ${inr(ON_TIME_OFF)} off.`, icon: 'clock', gated: 'onTimeOr100Off',
    body: `If we miss your confirmed slot window, your visit costs ${inr(ON_TIME_OFF)} less. Simple.`,
  },
  {
    id: 'proof', label: 'Proof after every visit.', icon: 'camera',
    body: 'A photo update lands on your WhatsApp after every groom and every walk — see exactly how it went.',
  },
];

export const MEDICAL_LINE = 'Registered veterinarians only — every medical service, no exceptions.';

// The 4 booking steps — verbatim from 04-TECHNICAL-SEO §2.8 (HowTo). Visible text and schema must match.
export const bookingSteps = [
  { name: 'Choose your service', text: 'Pick what your pet needs: grooming, walking, vet visit, vaccination or tick & flea treatment. Fixed prices are shown upfront.' },
  { name: 'Tell us about your pet', text: 'Select dog or cat and the size — Small under 10 kg, Medium 10–25 kg, Large over 25 kg — so we quote the exact price, not an estimate.' },
  { name: 'Pick your area and time slot', text: 'Choose your Ludhiana locality and a convenient slot between 9:00 am and 7:00 pm, any day of the week.' },
  { name: 'Confirm on WhatsApp', text: 'Your booking opens in WhatsApp with all details pre-filled. Send it, and our team confirms your slot. A background-verified groomer arrives at your doorstep with a fresh sanitised kit.' },
];

export interface BookingStep { name: string; text: string }

/**
 * SP-6 on the two non-grooming Wave-1 money pages. The shared step 4 ("A background-verified groomer arrives … with a
 * fresh sanitised kit") and R4 ("We bring everything — table, towels, warm-water gear…") describe a groom, and step 3's
 * "9:00 am and 7:00 pm" slot is wrong for walks (00 §3.1 walk hours). Neither blueprint words SP-6, so these lines are
 * written from 00 §3 facts and the pages' own blueprint facts (logged in website-plan/decisions/f2-data.md).
 * Step names stay the 04 §2.8 names; only the text changes. HowTo markup lives on /how-it-works/ only (04 §2.9), which
 * keeps the original 4 steps.
 */
export const SP6_LINES: Readonly<Record<'dog-walking' | 'vet-at-home', { step3?: BookingStep; step4: BookingStep; r4: string }>> = {
  'dog-walking': {
    step3: {
      name: bookingSteps[2].name,
      text: 'Choose your Ludhiana locality and a start date. Walks run 6:00–9:30 and 17:30–20:30 — from April to June, only before 8:00 or after 19:00.',
    },
    step4: {
      name: bookingSteps[3].name,
      text: 'Your booking opens in WhatsApp with all details pre-filled. Send it, and our team confirms your start date. Your background-verified walker meets your dog before the first walk.',
    },
    r4: 'We carry water on every walk and send the GPS route and a photo after it — you just keep the leash handy.',
  },
  'vet-at-home': {
    step4: {
      name: bookingSteps[3].name,
      text: 'Your booking opens in WhatsApp with all details pre-filled. Send it, and our team confirms your slot. A registered veterinarian comes to your home — their name, photo and registration number are shared on WhatsApp before the visit.',
    },
    r4: 'An adult needs to be home for the visit, which usually takes 20–30 minutes. Medicines or vaccines, if needed, are charged at printed MRP — the bill is shown to you.',
  },
};

/** The 4 SP-6 steps for a page: the shared 04 §2.8 steps with that page's SP6_LINES swapped in (grooming pages: none). */
export function stepsFor(page?: MoneyPage): BookingStep[] {
  const o = page === 'dog-walking' || page === 'vet-at-home' ? SP6_LINES[page] : undefined;
  return bookingSteps.map((s, i) => (i === 2 && o?.step3) || (i === 3 && o?.step4) || s);
}

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

/** Dog-walking payment line — one wording for dog-walking.md SP-4 ("R2 adapted") and pricing.md PR-6; matches the
 *  dog-walking-1 FAQ answer ("paid at month-end by UPI or cash — no advance"). */
export const WALK_PAYMENT_LINE = 'Monthly plans are paid at month-end by UPI or cash — no advance.';

/** The one reschedule/cancel wording (00 §3.2: free until 2 hours before the confirmed slot, nothing to refund).
 *  book-3 and how-it-works-3 in faq.json contain it verbatim (src/lib/faq.ts checks), and /terms/ and
 *  /refund-policy/ render it as is (book.md ship check: identical wording everywhere). */
export const RESCHEDULE_TEXT =
  "Rescheduling or cancelling is free until 2 hours before your confirmed slot — just reply on WhatsApp. Since we never take advance payment, there's nothing to refund.";

// /thank-you/ copy (06 §9 T1–T3, E4). T3 shows only when the widget appended FIRSTGROOM to this booking.
export const T1 = 'Done! Your booking request is on WhatsApp. 🐾';
export const T3 = `First time with us? Code ${FIRSTGROOM.code} saves you ${inr(FIRSTGROOM.off)} — already noted in your booking.`;

// ── Offers (06 §7) — shown wherever an offer is advertised. /offers/ is Wave 2, so every one-liner is paired with its
// full terms inline (06 §7.4: "Every offer shows its full terms where it's advertised"). The TERMS strings are also
// the /offers/ OfferCatalog descriptions (src/lib/schema.ts), so markup and page text are one source.

/** 06 §7.1 display copy. */
export const FIRSTGROOM_LINE = `New here? ${inr(FIRSTGROOM.off)} off your first groom + a free nail-trim visit on us. Code ${FIRSTGROOM.code} — applied automatically when you book.`;
/** 06 §7.1 terms in full (wording: offers.md OF-2). */
export const FIRSTGROOM_TERMS =
  `${inr(FIRSTGROOM.off)} off your first Full Groom or Premium Spa Groom + a free Nail Trim + Ear Clean visit (${flatPrice('nail-ear')} value) between grooms, ` +
  `redeemable within ${FIRSTGROOM.validDays} days of the first visit. ` +
  'Terms: one use per household · applies to Full Groom or Premium Spa only · not combinable with another discount on the same booking.';

/** 06 §7.2 display copy. */
export const REFERRAL_LINE = `Love your groomer? Share them. Your friend gets ${inr(REFERRAL.friendGets)} off their first groom, you get ${inr(REFERRAL.youGet)} off your next one.`;
/** 06 §7.2 terms in full (wording: offers.md OF-3). */
export const REFERRAL_TERMS =
  `You get ${inr(REFERRAL.youGet)} off your next service; your friend gets ${inr(REFERRAL.friendGets)} off their first service. ` +
  `If your friend's first booking is a Full Groom or Premium Spa, they get ${FIRSTGROOM.code}'s ${inr(FIRSTGROOM.off)} instead ` +
  `(one discount per booking — the larger one applies); you still get your ${inr(REFERRAL.youGet)}. ` +
  'Your friend mentions your name or number in their first WhatsApp booking. No limit on referrals.';

/** Groom Club headline — pricing.md PR-8 H2 and the home H-10 tile: "Groom Club — 15% off every monthly Full Groom". */
export const GROOM_CLUB_HEADLINE = `${pricingData.groomClub.label} — ${groomClubPercent()}% off every monthly Full Groom`;

/** Groom Club pitch, 06 §7.3 verbatim (use on /offers/, /pricing/ PR-8, post-service WhatsApp). The title is the OF-4 H2;
 *  every figure is computed from pricing.json (15% off a Full Groom, rounded down — pricing.md §6). */
export const GROOM_CLUB_PITCH: { title: string; body: string } = {
  title: `${pricingData.groomClub.label} — your pet's standing appointment`,
  body:
    `One Full Groom every month at ${groomClubPercent()}% off (${groomClubPrices().map((c) => `${c.label} ${c.club}`).join(' · ')} — ` +
    `you save ${groomClubSavingsRange()} every month), plus a free nail-trim visit between grooms and priority slots ` +
    '(first pick of weekend times). Same groomer every visit on request. Pay per visit as always — UPI or cash after ' +
    'the service, cancel anytime on WhatsApp.',
};

/** [Join Groom Club] WhatsApp prefill (06 §7.3 CTA → offers.md OF-4): with a size, "Hi PetDoorStep, I want to join
 *  Groom Club for my medium dog." (a per-size button); without one, the single /pricing/ PR-8 button's wording, which
 *  asks for the size because the club price depends on it. Pass the text to waHref(). */
export function groomClubWaText(size?: Size): string {
  return size
    ? `Hi PetDoorStep, I want to join Groom Club for my ${sizeGuide[size].label.toLowerCase()} dog.`
    : "Hi PetDoorStep, I want to join Groom Club for my dog. My dog's size: ___";
}

// ── How we hire (safety-hygiene.md SH-4 — the 6 steps verbatim; about.md AB-5 summary; join-as-groomer.md JG-4;
// faq.json faq-s1 tells the same steps in prose). A gated step renders only once its policy gate is true.
export interface HiringStep {
  id: string;
  text: string; // SH-4 wording verbatim (sentence case)
  summary: boolean; // one of the 4 lines in the about.md AB-5 summary (the faq-s1 steps)
  gated?: keyof typeof policy;
}
export const HIRING_STEPS: readonly HiringStep[] = [
  { id: 'apply', text: 'Application on WhatsApp', summary: false },
  { id: 'id-references', text: 'Government ID + address proof checked, two references called', summary: true },
  { id: 'police', text: 'Police verification via the Punjab Police Saanjh service', summary: false, gated: 'policeVerified' },
  { id: 'skills-trial', text: 'Skills trial on a volunteer pet, scored on handling and hygiene', summary: true },
  { id: 'training', text: 'Training on our standards: calm handling, hygiene, heat safety, basic pet first aid', summary: true },
  { id: 'supervised', text: 'Three supervised visits before working solo; every visit after that is rated by the pet parent', summary: true },
];

/** The hiring steps a page may claim today: all (SH-4, JG-4) or the 4-line AB-5 summary. Count headings from the
 *  result ("Our {n}-step process") — never hard-code six while a step is gated. */
export const hiringSteps = (opts: { summary?: boolean } = {}): HiringStep[] =>
  HIRING_STEPS.filter((s) => (!s.gated || policy[s.gated]) && (!opts.summary || s.summary));

// Standard trust-chip set (06 §2.1, facts from 00 §3.4) — verbatim. Chip.astro draws the ✔ as its check icon, so
// the strings carry no tick. Pages whose 06 §2.3 hero block overrides chips pass their own list to Hero.
export const TRUST_CHIPS: readonly string[] = [
  'Background-verified groomers',
  'Sealed sanitised kit per pet',
  'Fixed prices — no doorstep bargaining',
  'Photo update after every visit',
];

// ── Price-chip strings — every figure read from pricing.json (07 §4: no ₹ literals) ──

/** ServiceCard price chip per money page — the blueprints/home.md H-3 formats, keyed by route path.
 *  @deprecated Use MONEY_PAGES (src/data/services.ts) and cardPriceChip() (src/lib/pricing.ts). Kept only until
 *  ServiceCard.astro stops importing it. */
export const SERVICE_PRICE_CHIP: Readonly<Record<string, string>> = Object.fromEntries(
  routes
    .filter((r) => r.group === 'service' && r.path !== '/ludhiana/')
    .map((r) => [r.path, cardPriceChip(r.path.split('/')[2] as MoneyPage)]),
);

/** Hero price chip on home + the /ludhiana/ hub: "from" + the lowest fixed price on the menu (the Nail Trim + Ear Clean
 *  visit — T1 template §3 hub row; blueprints/home.md H-1).
 *  @deprecated Use heroPriceChip('home') from src/lib/pricing.ts. Kept only until its importers move. */
export const LOWEST_PRICE_CHIP = heroPriceChip('home');

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
  'haibowal-kalan': { oneLiner: `Bath & Brush from ${fromPrice('bath-brush')}`, localLine: 'Jassian Road side and beyond' },
  'kitchlu-nagar': { oneLiner: 'Next door to PAU', localLine: 'homes near PAU Gate' },
};

/** The ten area slugs in 00 §3.3 order (home H-9 / hub grid order). */
export const AREA_SLUGS: readonly string[] = Object.keys(AREA_LINES);


// /safety-hygiene/ copy — website-plan/blueprints/safety-hygiene.md §2 (B16), verbatim. This is the differentiator
// page every "Background-verified ✔" badge links to. Obeys 00-MASTER-PLAN §3.4; Promise copy from 06 §4.1.
//
// HONESTY LAW (safety-hygiene.md header): every SOP line is an operating commitment — a line publishes only once the
// team actually does it. Unknown real-world values are [FILL:*] tokens (00 §8 Trust & safety ops): the launch grep
// catches them. Police verification is gated in src/data/content.ts (policy.policeVerified) and drops out of the
// verification steps until true; the incident-cost promise is held back behind the same gate as 06 §6 answer 4.
// The 5-point Promise (SH-2) and the verification steps (SH-4) render from the shared src/data/content.ts, so this
// page can never drift from /about/ or the FAQ. No ₹ figure here.
import { routeLabel } from '../routes';

export const SAFETY_PATH = '/safety-hygiene/';

/** §1 head — verbatim from safety-hygiene.md §1 (title 56, meta 154, H1 64). */
export const SAFETY_HEAD = {
  title: 'Safety & Hygiene Standards – Home Grooming | PetDoorStep',
  description:
    'How PetDoorStep keeps your pet safe at home: background-verified groomers, a fresh sealed kit for every pet, calm handling rules and registered vets only.',
  h1: 'Our Safety & Hygiene Standards — the PetDoorStep Promise in Full',
} as const;

/** SH-1 hero subhead, verbatim (safety-hygiene.md SH-1). */
export const SAFETY_SUBHEAD =
  'What we do before, during and after every visit — written down, so you can hold us to it.';

// ── Trust & safety ops tokens (00 §8) — no shared data file owns these yet (request B3). ──────────────────────────
/** SH-3 step 1: the veterinary-grade disinfectant used on tools. */
export const DISINFECTANT_PRODUCT = '[FILL:DISINFECTANT_PRODUCT]';
/** SH-7 insurance line: the true cover status, or the line is omitted at launch until a policy exists. */
export const INSURANCE_STATUS = '[FILL:INSURANCE_STATUS]';

/** SH-3 "A fresh, sealed kit for every pet" — the 6-step ritual, verbatim. Step 1 carries DISINFECTANT_PRODUCT. */
export const SEALED_KIT = {
  heading: 'A fresh, sealed kit for every pet',
  steps: [
    `After every visit, blades, combs and brushes are washed, disinfected with ${DISINFECTANT_PRODUCT} (a veterinary-grade disinfectant), dried and sealed in a pouch labelled with the date.`,
    'Towels are hot-washed and sealed one set per pet.',
    'Before touching your pet, your groomer sanitises hands and puts on a fresh apron.',
    'At your door, the sealed pouch is opened in front of you.',
    'Used tools go straight into a separate "used" bag — nothing is reused before it\'s cleaned again.',
    'Cats get cat-only shampoo and products; dog anti-tick products are never used on cats.',
  ],
} as const;

/** SH-4 "Verified people, always" — heading only; the steps render from hiringSteps() (src/data/content.ts, SH-4). */
export const VERIFY_HEADING = 'Verified people, always';

/** SH-5 "How we handle your pet" — the calm-handling rules, verbatim. `lead` is the bold phrase; `rest` the sentence. */
export const HANDLING = {
  heading: 'How we handle your pet',
  rules: [
    { lead: 'No sedation, ever.', rest: 'We never give pets anything to calm them.' },
    { lead: 'Stress signals we watch for:', rest: 'lip-licking, yawning, trembling, a tucked tail, showing the whites of the eyes — any of these means a pause, comfort and a break.' },
    { lead: 'Muzzles:', rest: 'only with your consent, only a comfortable basket muzzle, only for reactive dogs, and never left on unattended.' },
    { lead: 'Senior pets:', rest: 'shorter sessions, a non-slip mat, gentle positioning for stiff joints.' },
    { lead: 'Heat:', rest: 'dryers on low heat with breaks; walks follow our summer rule (before 8:00 or after 19:00, April–June).' },
    { lead: 'Health first:', rest: 'open wounds, a skin infection or signs of illness mean we stop and suggest a vet visit before grooming.' },
  ],
  /** The closing commitment, a full sentence (no bold lead). */
  closing: 'If a pet is too stressed to continue safely, we stop rather than force it.',
} as const;

/** SH-6 "Guests in your home" — respect-for-your-home commitments, verbatim (the · list, as items). */
export const RESPECT = {
  heading: 'Guests in your home',
  items: [
    'ID badge on arrival',
    'shoe covers on request',
    'we work only in the space you choose (never the kitchen or prayer room)',
    'hair, water and mess cleaned up before we leave',
    'photos only of your pet, only with your permission',
    'no personal phone calls during a session',
  ],
} as const;

/** SH-7 "If something goes wrong" — the response commitment, verbatim. The insurance line is INSURANCE_STATUS; the
 *  "who pays for a vet check" promise is held back (policy gate, same as 06 §6 answer 4) — not written here. */
export const IF_WRONG = {
  heading: 'If something goes wrong',
  body:
    'If anything goes wrong during a visit, we stop immediately, tell you on the spot, and help you get a vet check right away — from our partner vet or the nearest clinic.',
} as const;

/** SH-8 "Registered vets only" — the line verbatim; links to the live vet-at-home page (isLive in the page). */
export const VETS_ONLY = {
  heading: 'Registered vets only',
  body:
    'Every medical service — consultations, vaccinations, deworming, prescriptions — is done by a registered veterinarian. No exceptions.',
  linkPath: '/ludhiana/vet-at-home/',
  linkText: 'See how a vet-at-home visit works',
} as const;

/** SH-9 CTA-band heading, verbatim (safety-hygiene.md SH-9). */
export const SAFETY_CTA_HEADING = 'Standards you can see at your own door. Book your first visit.';

/** The booking-shaped WhatsApp prefill naming this page (02 P158; shape = services.ts bookText). Held here until
 *  services.ts PAGE_PREFILL owns /safety-hygiene/ (requests/w2-trust-a.md B2). */
export const SAFETY_BOOK_PREFILL =
  `Hi PetDoorStep! I want to book a service (from your ${routeLabel(SAFETY_PATH)} page). My area: ___ . My pet: ___`;

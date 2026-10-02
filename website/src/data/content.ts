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

// /thank-you/ copy (06 §9 T1–T3, E4). T3 shows only when the widget appended FIRSTGROOM to this booking.
import { FIRSTGROOM } from './offers';
const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`;
export const T1 = 'Done! Your booking request is on WhatsApp. 🐾';
export const T3 = `First time with us? Code ${FIRSTGROOM.code} saves you ${rupees(FIRSTGROOM.off)} — already noted in your booking.`;

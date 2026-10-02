// Validation rules, caps and VERBATIM error strings — website-plan/07-BOOKING-SPEC.md §3 + §6.
// Copy lives here once; components import these constants.

export const CAPS = { name: 60, breed: 40, note: 300, areaText: 60, phoneRaw: 16 } as const;

export const ERR = {
  area: 'Please choose your area so we can check coverage.',
  areaOther: 'Please tell us your area or city.',
  service: 'Please pick a service to continue.',
  petType: 'Is it a dog or a cat? Tap one.',
  size: 'Pick your dog\'s size — a close guess is fine, the kg guide is right there.',
  puppy: 'Puppy Intro Groom is for puppies under 6 months. Please tick to confirm, or pick Bath & Brush instead.',
  breedLong: 'Breed looks too long — 40 characters max.',
  date: 'Please pick a day for the visit.',
  window: 'Please pick a time window.',
  windowClosed: 'That window just closed for today — please pick another.',
  nameEmpty: 'Please tell us your name.',
  nameLong: 'Name looks too long — 60 characters max.',
  phone: 'Please enter a 10-digit mobile number starting with 6–9 (e.g. 98765 43210).',
  consent: 'We confirm every booking on WhatsApp — please tick to allow WhatsApp contact.',
  noteLong: 'Note is too long — 300 characters max.',
} as const;

// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Strip control characters (keeps \t, \n, \r) — 07 §6 "Abusive input". */
export const clean = (s: string): string => s.replace(CONTROL, '');

/** Normalise an Indian mobile number (07 §3 Step 5). Returns 10 digits or null when invalid. */
export function normalizePhone(raw: string): string | null {
  let d = raw.replace(/[\s\-()]/g, '');
  if (d.startsWith('+91')) d = d.slice(3);
  else if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

export const MOBILE_REGEX = /^[6-9]\d{9}$/;

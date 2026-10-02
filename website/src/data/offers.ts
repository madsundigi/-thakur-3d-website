// Offers — definitions from website-plan/06-CONVERSION-PLAYBOOK.md §7. Amounts live here (not in components)
// so the ₹-literal launch gate (07 §4) stays clean; format with inr().

export const FIRSTGROOM = {
  code: 'FIRSTGROOM',
  off: 200,
  services: ['full-groom', 'premium-spa'], // "₹200 off your first Full Groom or Premium Spa"
  validDays: 45,
} as const;

/** Referral (06 §7.2, blueprints/offers.md OF-3): ₹150 off the referrer's next service + ₹150 off the friend's first.
 *  One discount per booking — on a first Full Groom / Premium Spa the friend gets FIRSTGROOM's larger amount instead. */
export const REFERRAL = {
  youGet: 150,
  friendGets: 150,
} as const;

/** A booking qualifies when it's the first on this device and the service is a qualifying groom. */
export const qualifiesForFirstGroom = (serviceId: string | null, priorBookings: number): boolean =>
  priorBookings === 0 && !!serviceId && (FIRSTGROOM.services as readonly string[]).includes(serviceId);

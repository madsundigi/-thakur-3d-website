// Offers — definitions from website-plan/06-CONVERSION-PLAYBOOK.md §7. Amounts live here (not in components)
// so the ₹-literal launch gate (07 §4) stays clean; format with inr().

export const FIRSTGROOM = {
  code: 'FIRSTGROOM',
  off: 200,
  services: ['full-groom', 'premium-spa'], // "₹200 off your first Full Groom or Premium Spa"
  validDays: 45,
} as const;

/** A booking qualifies when it's the first on this device and the service is a qualifying groom. */
export const qualifiesForFirstGroom = (serviceId: string | null, priorBookings: number): boolean =>
  priorBookings === 0 && !!serviceId && (FIRSTGROOM.services as readonly string[]).includes(serviceId);

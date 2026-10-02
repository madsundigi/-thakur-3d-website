// Booking reference PDS-<YYYYMMDD>-<4 chars> — website-plan/07-BOOKING-SPEC.md §5(b).
const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'; // no 0/O/1/I

export function makeRef(now: Date = new Date()): string {
  const ymd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const tail = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
  return `PDS-${ymd}-${tail}`;
}

export const REF_PATTERN = /^PDS-\d{8}-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{4}$/;

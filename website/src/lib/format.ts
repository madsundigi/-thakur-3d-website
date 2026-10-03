// Display formatters for contact values and head tags — pure functions with no data imports, so they are safe in
// any page, component or island. An unfilled [FILL:*] token (00-MASTER-PLAN §8) passes through unchanged, so the
// launch gate (npm run check:fill) still finds it in the built HTML.

const isToken = (v: string): boolean => v.startsWith('[FILL:');

/** Digits of an Indian mobile with its 91 prefix: "+91 98765 43210" / "9876543210" → "919876543210". */
function waDigits(value: string): string {
  const d = value.replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91') && /^[6-9]/.test(d.slice(2))) return d;
  if (d.length === 10 && /^[6-9]/.test(d)) return `91${d}`;
  throw new Error(`format: "${value}" is not an Indian mobile number (src/data/site.ts whatsapp: digits incl. 91, e.g. "919876543210")`);
}

/** The WhatsApp number as people read and save it: whatsappDisplay('919876543210') → '+91 98765 43210'. */
export function whatsappDisplay(value: string): string {
  if (isToken(value)) return value;
  const d = waDigits(value);
  return `+91 ${d.slice(2, 7)} ${d.slice(7)}`;
}

/** tel: link to the WhatsApp number ("Save our number", blueprints/book.md TY-3): 'tel:+919876543210'. */
export function whatsappTelHref(value: string): string {
  return isToken(value) ? `tel:${value}` : `tel:+${waDigits(value)}`;
}

/** og:title = the page <title> minus the brand suffix (04-TECHNICAL-SEO §4): "… – From ₹599 | PetDoorStep" → "… – From ₹599".
 *  The brand-led home title ("PetDoorStep — …") has no suffix and is returned as is. */
export function ogTitleFrom(title: string): string {
  return title.replace(/\s*\|\s*PetDoorStep\s*$/, '');
}

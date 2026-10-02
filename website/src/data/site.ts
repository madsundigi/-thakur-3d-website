// Business identity & contact — the ONLY place these values live.
// Sources: website-plan/00-MASTER-PLAN.md §3.1 and 05-LOCAL-SEO.md §4 (NAP block).
// Unknown real-world values are [FILL:*] tokens (00 §8). `npm run check:fill` lists every one left;
// the site may not launch until it reports zero.

export const site = {
  name: 'PetDoorStep',
  tagline: 'Pet care at your doorstep',
  taglineHinglish: 'Ghar baithe pet care — Ludhiana mein!',
  domain: '[FILL:DOMAIN]',
  phone: '[FILL:PHONE]', // display format, e.g. "+91 98765 43210"
  whatsapp: '[FILL:WHATSAPP_NUMBER]', // digits only incl. country code, e.g. "919876543210"
  email: '[FILL:EMAIL]',
  instagram: '[FILL:INSTAGRAM]', // handle without @
  gbpLink: '[FILL:GBP_LINK]',
  googleRating: '[FILL:GOOGLE_RATING]',
  reviewCount: '[FILL:REVIEW_COUNT]',
  ga4Id: '[FILL:GA4_ID]',
  city: 'Ludhiana',
  region: 'Punjab',
  hours: {
    visits: 'Mon–Sun 9:00–19:00 (last booking 17:30)',
    walks: '6:00–9:30 and 17:30–20:30 daily (Apr–Jun: before 8:00 or after 19:00)',
    replies: 'WhatsApp replies 9:00–19:00, every day',
  },
} as const;

export const isFilled = (value: string): boolean => !value.startsWith('[FILL:');

/** tel: href — keeps the token visible while unfilled so the launch gate catches it. */
export const telHref = (): string =>
  isFilled(site.phone) ? `tel:${site.phone.replace(/[^\d+]/g, '')}` : `tel:${site.phone}`;

/** wa.me deep link with a prefilled message (07-BOOKING-SPEC §5c). */
export const waHref = (text: string): string =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

/** Default prefill (07 §6 noscript block). */
export const WA_DEFAULT_TEXT = 'Hi PetDoorStep! I want to book a service. My area: ___ . My pet: ___';

export const instagramHref = (): string => `https://instagram.com/${site.instagram}`;

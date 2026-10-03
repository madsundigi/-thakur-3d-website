// Safe wrapper over the window.track helper defined in the base layout (09-ANALYTICS-TRACKING §3.3), plus the canonical
// event names (09 §2) and the one place free-text areas are made safe for GA4 (decision E10).

/** The 09 §2 event registry, in registry order: §2a booking funnel, then §2b site-wide. page_view and scroll are sent by
 *  GA4 itself (config + Enhanced measurement) — they are listed because they are registered, never fired from code. */
export const GA4_EVENTS = [
  'booking_started',
  'booking_step_completed',
  'booking_submitted',
  'whatsapp_click',
  'call_click',
  'out_of_area_lead',
  'thank_you_view',
  'page_view',
  'scroll',
  'ig_click',
] as const;

export type Ga4Event = (typeof GA4_EVENTS)[number];

type Params = Record<string, string | number | boolean>;

/** E10: an area typed by the visitor ("Other area" / waitlist city) can carry a house or phone number. Strip every
 *  digit, tidy what is left and cap it at 30 characters before it reaches GA4 — no PII in analytics (09 §9). */
export const gaArea = (text: string): string =>
  text
    .replace(/\d+/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:])/g, '$1')
    .replace(/^[\s,.;:/#-]+|[\s,.;:/#-]+$/g, '')
    .slice(0, 30)
    .trim();

/** Params that hold a visitor-typed area — sanitised by track() on EVERY event, whoever fires it. */
const AREA_PARAMS = ['area', 'area_text'] as const;

export const track = (name: Ga4Event, params?: Params): void => {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { track?: (n: string, p?: Params) => void };
  if (typeof w.track !== 'function') return;
  let p = params;
  for (const key of AREA_PARAMS) {
    const v = p?.[key];
    if (typeof v === 'string') p = { ...p, [key]: gaArea(v) };
  }
  w.track(name, p);
};

// Legal data: the ONE source for /privacy-policy/ and /terms/ (website-plan/blueprints/privacy-policy.md,
// website-plan/blueprints/terms.md). Each value cites the plan doc or code it comes from.
//
// Import-free on purpose: plain data plus one pure helper, so Node scripts and tests can load it without
// Astro or Vite. Unknown real-world values are [FILL:*] tokens registered in 00-MASTER-PLAN §8 (decision E12,
// 2026-10-03: legal unknowns are tokens, never "DRAFT" prose). `npm run check:fill` lists them until filled.
// A lawyer reviews both legal pages before launch (00 §9 item 7, decision D4 2026-10-03).
// No rupee figures here: prices render from pricing.json (07 §4; scripts/check-prices.mjs gate 2).

// ── On-device storage + cookies ─────────────────────────────────────────────────────────────────────────────────
// Every key the site writes, found by grepping website/src for pds_ / localStorage / sessionStorage, plus the GA4
// cookies set by gtag.js. Add a row in the same commit as any new key.

export type StorageStore = 'localStorage' | 'sessionStorage' | 'cookie';

export interface StorageKey {
  key: string;
  store: StorageStore;
  purpose: string;
  lifetime: string;
}

export const STORAGE_KEYS: StorageKey[] = [
  // 07 §6 draft resume. BookingWidget.tsx DRAFT_KEY with DRAFT_MAX_AGE = 48 h. The draft holds everything typed,
  // including name and mobile number.
  {
    key: 'pds_booking_draft_v1',
    store: 'localStorage',
    purpose: 'Saves your unfinished booking form, including the details you typed, so you can pick up where you left off.',
    lifetime: '48 hours. An older draft is deleted the next time the booking form opens. It is also deleted when you send the booking or tap Start fresh.',
  },
  // 07 §5a last-resort queue. lib/leads.ts QUEUE_KEY, capped at 10 and retried by flushUnsentLeads() on widget mount.
  {
    key: 'pds_unsent_leads',
    store: 'localStorage',
    purpose: 'Holds up to 10 booking or waitlist requests that could not reach us, so they can be sent again.',
    lifetime: 'Until the request is delivered. We retry each time the booking form opens.',
  },
  // FIRSTGROOM applies to a first booking on this device only (06 §7.1; data/offers.ts qualifiesForFirstGroom).
  {
    key: 'pds_booking_count',
    store: 'localStorage',
    purpose: 'Counts the bookings sent from this device, so the first-groom offer is applied only to a first booking.',
    lifetime: 'Until you clear your browser data.',
  },
  // 07 §5 step (d). Also hides the exit card after a booking (07 §2 row 7).
  {
    key: 'pds_last_booking',
    store: 'localStorage',
    purpose: 'Remembers the reference and time of your last booking, so the before-you-go card is not shown after you have booked.',
    lifetime: 'Until your next booking replaces it or you clear your browser data.',
  },
  // thank-you.astro TY-4 (blueprints/book.md B2): the first-timer line shows only for the booking that got the offer.
  {
    key: 'pds_first_offer',
    store: 'localStorage',
    purpose: 'Remembers which booking received the first-groom offer, so the thank-you page can confirm it.',
    lifetime: 'Until your next booking replaces or removes it, or you clear your browser data.',
  },
  // 09 §2a: booking_started fires once per session (BookingWidget.tsx onStart).
  {
    key: 'pds_booking_started',
    store: 'sessionStorage',
    purpose: 'Makes sure the start of a booking is counted only once per visit in our statistics.',
    lifetime: 'Until you close the browser tab.',
  },
  // 07 §2 row 7, exit card (decision D1 2026-10-03): shown at most once per session.
  {
    key: 'pds_exit_shown',
    store: 'sessionStorage',
    purpose: 'Makes sure the before-you-go card appears at most once per visit.',
    lifetime: 'Until you close the browser tab.',
  },
  // GA4 cookies (09 §1, §3.1). gtag.js loads only when location.hostname is the live domain (PDS_LIVE in
  // layouts/Base.astro), so local builds and preview deploys never set them. Default GA4 expiry is 2 years and is
  // renewed on every visit. "<id>" is the measurement ID without its "G-" prefix.
  {
    key: '_ga',
    store: 'cookie',
    purpose: 'Google Analytics 4: tells repeat visits from the same browser apart using a random ID. Set on the live website only.',
    lifetime: '2 years from your last visit.',
  },
  {
    key: '_ga_<id>',
    store: 'cookie',
    purpose: 'Google Analytics 4: keeps track of the current visit. Set on the live website only.',
    lifetime: '2 years from your last visit.',
  },
];

// ── The lead row ─────────────────────────────────────────────────────────────────────────────────────────────────
// Sheet header row, exact order: 07 §5a, which is the API contract per 07 §10. It is identical to the keys of
// bookingPayload() in lib/leads.ts. Waitlist rows fill only WAITLIST_COLUMNS (07 §5a; waitlistPayload()).

export const LEAD_COLUMNS: string[] = [
  'ts', 'ref', 'lead_type', 'source', 'page_url', 'service_id', 'service_label', 'plan', 'addon_tick_flea',
  'pet_type', 'size', 'breed', 'first_groom', 'coat_matting', 'coat_ticks', 'coat_shedding', 'area', 'date_pref',
  'window_pref', 'name', 'phone', 'note', 'price_shown', 'consent_whatsapp', 'ua',
];

export const WAITLIST_COLUMNS: string[] = ['ts', 'ref', 'lead_type', 'source', 'area', 'name', 'phone'];

// Columns the team adds by hand, after `ua` (append-only, 07 §10): heard_from and status per 09 §5; opt_in is the
// date the customer replied YES on WhatsApp (decision D4 2026-10-03, 09 §5).
export const OPERATOR_COLUMNS: string[] = ['heard_from', 'status', 'opt_in'];

// Plain-English names for the privacy page's "what we store" list (blueprints/privacy-policy.md PP-3).
export const LEAD_COLUMN_LABELS: Record<string, string> = {
  ts: 'Date and time of your request',
  ref: 'Booking reference (PDS-…)',
  lead_type: 'Booking or waitlist',
  source: 'The button or page you booked from',
  page_url: 'The web address of the page you booked on',
  service_id: 'The service you chose',
  service_label: 'The service you chose',
  plan: 'The plan you chose (cat grooming or dog walking)',
  addon_tick_flea: 'Whether you added tick & flea treatment',
  pet_type: 'Dog or cat',
  size: "Your dog's size",
  breed: 'Breed (optional)',
  first_groom: 'Whether this is a first groom with us',
  coat_matting: 'Coat condition: matting',
  coat_ticks: 'Coat condition: ticks or fleas',
  coat_shedding: 'Coat condition: heavy shedding',
  area: 'Your area of Ludhiana (or your city, for the waitlist)',
  date_pref: 'Preferred date',
  window_pref: 'Preferred time window',
  name: 'Your name',
  phone: 'Your mobile number',
  note: 'Your note to us (optional)',
  price_shown: 'The price shown to you',
  consent_whatsapp: 'Your tick allowing WhatsApp contact',
  ua: 'Your browser and device type (user agent)',
  heard_from: 'How you heard about us (asked on WhatsApp)',
  status: 'Booking status: confirmed, done or cancelled',
  opt_in: 'The date you replied YES to reminders and offers',
};

// ── Google Analytics 4 ───────────────────────────────────────────────────────────────────────────────────────────
// The 09 §2 registry: §2a booking funnel, then §2b site-wide events.
export const GA4_EVENTS: string[] = [
  'booking_started', 'booking_step_completed', 'booking_submitted', 'whatsapp_click', 'call_click',
  'out_of_area_lead', 'thank_you_view', 'page_view', 'scroll', 'ig_click',
];

// Custom event parameters we send (09 §2a, §2d). track() adds page_path. GA4 adds its own automatic page fields.
// None of them carries a name or a phone number. Free-text area values are cleaned first: GA4_SETTINGS.areaText.
export const GA4_PARAMS: string[] = [
  'source', 'page_path', 'step', 'step_name', 'service', 'size', 'area', 'price_shown', 'ref', 'area_text',
];

export const GA4_SETTINGS = {
  liveDomainOnly: true, // 09 §3.1: library loads only on the live domain; dev/preview only console.debug
  googleSignals: false, // 09 §1 step 5, §9.1
  googleAdsLinked: false, // 09 §1 step 5: no Google Ads link in Phase 1
  remarketing: false, // 09 §9.1: no remarketing, no advertising features
  audienceExport: false, // 09 §9.1
  heatmapsOrRecording: false, // 09 §9.1: no heatmaps, no session recording
  dataRetentionMonths: 14, // 09 §1 step 4
  ipAddressesLogged: false, // 09 §9.2: GA4 does not log or store IP addresses (built in, no config flag)
  enhancedMeasurement: {
    // 09 §1 step 3
    pageViews: true,
    scrolls: true,
    outboundClicks: false,
    siteSearch: false,
    videoEngagement: false,
    fileDownloads: false,
  },
  // Decision E10 (2026-10-03): `area` (booking_submitted) and `area_text` (out_of_area_lead) are sent with every
  // digit removed and cut to 30 characters, so a typed phone or house number never reaches GA4.
  areaText: { stripDigits: true, maxLength: 30 },
};

// ── Who else handles the data ────────────────────────────────────────────────────────────────────────────────────
// 07 §5a (lead pipeline), 07 §5 step (c) (WhatsApp), 09 §1 (GA4), 00 §2 D8 (hosting). Fonts are self-hosted
// (04 §1.3, 08 §2.1), so there is no Google Fonts request. Add a row before adding any new service (02 P106 cap).

export interface Processor {
  name: string;
  purpose: string;
  data: string;
}

export const PROCESSORS: Processor[] = [
  {
    name: 'Google Sheets, through Google Apps Script (Google)',
    purpose: 'Stores booking and waitlist requests in our private leads sheet.',
    data: 'Everything you enter in the booking form (see the list above). For the waitlist: your name, mobile number and area or city.',
  },
  {
    name: 'Web3Forms',
    purpose: 'A backup only: if the sheet cannot be reached, it emails the same request to our inbox.',
    data: 'The same booking or waitlist details.',
  },
  {
    name: 'WhatsApp (Meta Platforms)',
    purpose: 'You send the booking from your own WhatsApp. We confirm it there and talk to you about your visits.',
    data: 'Your WhatsApp number and profile name, the booking message and anything you send in the chat, including photos.',
  },
  {
    name: 'Google Analytics 4 (Google)',
    purpose: 'Counts visits and booking steps, so we can see which pages help people. Live website only.',
    data: 'Pages viewed, buttons tapped and booking steps, with the booking reference, service, size, area and price shown. Also your device and browser type, approximate location and a random cookie ID. Never your name or mobile number.',
  },
  {
    name: 'Cloudflare Pages (Cloudflare)',
    purpose: 'Hosts this website and delivers its pages.',
    data: 'The technical data every browser sends to a website: IP address, browser type and the page requested.',
  },
];

// Things the site deliberately does not use (09 §9.1, 09 §1, 04 §1.3 / §5.2.6, 02 P106).
export const NOT_USED: string[] = [
  'Advertising or remarketing cookies, pixels or tags',
  'Google Signals or a Google Ads link',
  'Heatmaps or session recording',
  'Chat widgets',
  'Google Fonts or any other font service (our fonts are served from our own site)',
];

// The services above may keep data on servers outside India (lawyer to confirm the wording, 00 §9 item 7).
export const CROSS_BORDER_NOTE =
  'Some of these services may store or process data on servers outside India. We use them only for the purposes listed here.';

// ── Legal unknowns: owner and lawyer fill these (00 §8 "Legal" group) ───────────────────────────────────────────
export const IDENTITY = {
  LEGAL_NAME: '[FILL:LEGAL_NAME]', // registered business name: legal pages, and /about/ (02 P047)
  GRIEVANCE_OFFICER_NAME: '[FILL:GRIEVANCE_OFFICER_NAME]', // IT Rules 2011 r.5(9); DPDP Act s.8(9)
  GRIEVANCE_EMAIL: '[FILL:GRIEVANCE_EMAIL]',
  GRIEVANCE_PHONE: '[FILL:GRIEVANCE_PHONE]',
  JURISDICTION: '[FILL:JURISDICTION]', // courts named in /terms/ TM-14
  RETENTION_LEADS: '[FILL:RETENTION_LEADS]', // leads sheet + backup emails
  RETENTION_CHATS: '[FILL:RETENTION_CHATS]', // WhatsApp chats
  RETENTION_PHOTOS: '[FILL:RETENTION_PHOTOS]', // visit photos (update photos and consented features)
  MIN_AGE: '[FILL:MIN_AGE]', // minimum age to book (DPDP Act s.9: under 18 needs a parent or guardian)
  NO_SHOW_RULE: '[FILL:NO_SHOW_RULE]', // /terms/ TM-7 (00 §3.2 says nothing about no-shows yet)
  LATE_CANCEL_RULE: '[FILL:LATE_CANCEL_RULE]', // /terms/ TM-7: cancelling inside the 2-hour window
  LIABILITY_TERMS: '[FILL:LIABILITY_TERMS]', // /terms/ TM-13. Incident costs are policy-gated (safety-hygiene SH-7).
  POLICY_EFFECTIVE_DATE: '[FILL:POLICY_EFFECTIVE_DATE]', // shown at the top of both legal pages
  DPB_COMPLAINT_LINK: '[FILL:DPB_COMPLAINT_LINK]', // official complaint route of the Data Protection Board of India
};

// ── Laws the pages name (lawyer confirms what is in force on the effective date, 00 §9 item 7) ──────────────────
export const LAW = {
  DPDP_ACT: 'Digital Personal Data Protection Act, 2023',
  DPDP_RULES: 'Digital Personal Data Protection Rules, 2025',
  IT_RULES:
    'Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011',
  BOARD: 'Data Protection Board of India',
  GRIEVANCE_REPLY: 'within one month of receiving it', // IT Rules 2011 r.5(9) upper limit
  CONSUMER_ACT: 'Consumer Protection Act, 2019', // /terms/ TM-13: the terms never limit these rights
};

// ── Your rights (DPDP Act ss.6(4), 11–14; IT Rules 2011 r.5(6), r.5(7), r.5(9)) ─────────────────────────────────
export const RIGHTS: { id: string; text: string; law: string }[] = [
  { id: 'access', text: 'Ask what personal data we hold about you, what we do with it and who we have shared it with.', law: 'DPDP Act s.11' },
  { id: 'correction', text: 'Ask us to correct, complete or update it.', law: 'DPDP Act s.12; IT Rules 2011 r.5(6)' },
  // 7 days: 09 §9.5 ("we action deletion requests within 7 days").
  { id: 'erasure', text: 'Ask us to delete it. We act on deletion requests within 7 days.', law: 'DPDP Act s.12' },
  { id: 'withdraw', text: "Withdraw any YES you gave us on WhatsApp, for reminders, offers or featuring your pet's photos. Tell us and they stop.", law: 'DPDP Act s.6(4); IT Rules 2011 r.5(7)' },
  { id: 'grievance', text: 'Complain to our Grievance Officer, who replies within one month.', law: 'DPDP Act s.13; IT Rules 2011 r.5(9)' },
  { id: 'nominate', text: 'Nominate someone to use these rights for you if you die or are unable to act.', law: 'DPDP Act s.14' },
  { id: 'board', text: 'If our Grievance Officer does not resolve your complaint, complain to the Data Protection Board of India.', law: 'DPDP Act s.13(3)' },
];

// ── How long we keep data ────────────────────────────────────────────────────────────────────────────────────────
export const RETENTION: { what: string; period: string }[] = [
  { what: 'Booking and waitlist records (leads sheet and backup emails)', period: IDENTITY.RETENTION_LEADS },
  { what: 'WhatsApp chats', period: IDENTITY.RETENTION_CHATS },
  { what: 'Photos of your pet', period: IDENTITY.RETENTION_PHOTOS },
  { what: 'Google Analytics statistics', period: '14 months' }, // GA4_SETTINGS.dataRetentionMonths (09 §1)
  { what: 'Data saved on your own device', period: 'As listed for each item in the storage table' }, // STORAGE_KEYS
];

// ── Service rules for /terms/ (pet handling, products, payment) ─────────────────────────────────────────────────
export interface ServiceRule {
  id: string;
  text: string;
}

export const SERVICE_RULES: ServiceRule[] = [
  // 01-SITEMAP §1 legal row ("Service terms incl. pet-handling consent").
  { id: 'handling-consent', text: "By booking, you confirm that you are the pet's owner or have the owner's permission, and you agree to our groomer, walker or vet handling your pet for the service you booked." },
  // how-it-works.md HW-4; 06 §6 answer 4 ("Tell us while booking"); 07 §3 Step 5 note field.
  { id: 'tell-us', text: 'Tell us in your booking note about anxiety, aggression, skin problems or a first groom, so we can plan for it.' },
  // safety-hygiene.md SH-5 ("No sedation, ever"); cat-grooming.md FAQ #2.
  { id: 'no-sedation', text: 'We never sedate pets or give them anything to calm them.' },
  // safety-hygiene.md SH-5 (muzzles).
  { id: 'muzzle', text: 'A muzzle is used only with your consent, only a comfortable basket muzzle, only for reactive dogs, and it is never left on unattended.' },
  // safety-hygiene.md SH-5 ("Health first"; "If a pet is too stressed to continue safely, we stop").
  { id: 'stop-safely', text: 'If your pet is too stressed to continue safely, or has an open wound, a skin infection or signs of illness, we stop rather than force it and suggest a vet visit.' },
  // how-it-works.md HW-4 + FAQ #1.
  { id: 'adult-present', text: 'An adult must be at home for grooming and vet visits. For walks, the walker can collect your dog from a family member or at your society gate, as agreed on WhatsApp.' },
  // how-it-works.md HW-4; 06 §9 R4; template SP-10 FAQ #6.
  { id: 'tap-and-plug', text: 'Please have a tap and a plug point ready near a bathroom, balcony or verandah. We bring everything else: table, towels, warm-water gear and dryer.' },
  // cat-grooming.md FAQ #5; safety-hygiene.md SH-3 item 6; tick-flea-treatment.md SP-3 product rule; template SP-10 FAQ #7.
  { id: 'products', text: 'Cats get cat-safe products only. We never use dog anti-tick products on cats, because many contain permethrin, which is toxic to cats. A medicated shampoo is used only when your vet has prescribed it. We do not diagnose skin problems.' },
  // puppy-grooming.md SP-3/SP-4 + ship check (8 weeks everywhere); 07 §3 Step 3 under-6-months confirmation.
  { id: 'puppy-age', text: 'The Puppy Intro Groom is for puppies from 8 weeks to 6 months old. From 6 months, regular dog grooming applies.' },
  // dog-walking.md SP-3 H3 "Every walk, the same rules" + FAQ #3/#4; 00 §3.1 heat rule.
  { id: 'walking-safety', text: 'On every walk your dog stays on a double-clip lead, never off-leash near roads, and is never left unattended. From April to June we walk only before 8:00 or after 19:00.' },
  // dog-walking.md SP-3 (Trial Week meet-and-greet) + FAQ #3/#5; 07 §3 Step 4 (walking plans always start tomorrow).
  { id: 'walking-start', text: 'Every walking plan starts with a meet-and-greet, so the first walk is the next day at the earliest. If a dog is strongly aggressive, we will tell you honestly that a trainer should come first.' },
  // cat-grooming.md SP-3 footnote + FAQ #3; template SP-3 footnote (b); 06 §5.1.
  { id: 'mats', text: 'Tight mats close to the skin are clipped, never pulled, because pulling can tear skin. We show you the mats before we start, and any extra de-matting is quoted on WhatsApp before we begin.' },
  // vet-at-home.md §0 rule 1; 00 §3.4 ("Registered veterinarians only").
  { id: 'vet', text: 'PetDoorStep arranges the visit and never practises medicine. Diagnosis, prescriptions, vaccines and medicines are handled only by a registered veterinarian.' },
  // vet-at-home.md §0 rules 2 and 4, FAQ #3; contact.md FAQ #3; 00 §3.2 "Not offered in Phase 1".
  { id: 'not-emergency', text: 'PetDoorStep is not an emergency service. Visits run 9:00–19:00. If your pet is injured, bleeding heavily, having seizures, struggling to breathe or may have eaten poison, go straight to the nearest 24-hour veterinary hospital: [FILL:EMERGENCY_VET_LIST].' },
  // 07 §1.5; 00 §3.2; book.md FAQ #4; dog-walking.md SP-4; pricing.md FAQ #4.
  { id: 'pay-after', text: 'No advance payment is ever taken. You pay by UPI or cash after the service, at the price confirmed on WhatsApp. Monthly walking plans are paid at the end of each month.' },
  // 06 §5.1 and §6 answer 3; pricing.md PR-10 + FAQ #3; template SP-3 footnote (b).
  { id: 'add-ons-first', text: 'Nothing is added at your door. An add-on, such as extra de-matting for a severely matted coat or the tick & flea add-on, is quoted on WhatsApp before we start, never after, and goes ahead only if you agree.' },
  // 00 §3.2; vet-at-home.md SP-3; pricing.md PR-7; dog-vaccination.md FAQ #1.
  { id: 'mrp', text: 'Medicines and vaccines are charged at their printed MRP. You are shown the wrapper or vial and the bill.' },
  // 00 §3.4 (photo update after every walk/groom); 06 §4.3 (YES before featuring); safety-hygiene.md SH-6.
  { id: 'photos', text: "You get a photo update after every groom and walk. We photograph only your pet, and your pet's photos appear on our website, Instagram or Google profile only after you reply YES on WhatsApp." },
  // 07 §3 Step 1 (waitlist path); faq.md faq-a1; 00 §3.3.
  { id: 'waitlist', text: 'We serve Ludhiana only. If you are outside Ludhiana, you can join our waitlist, and we will message you on WhatsApp the day we start in your area.' },
];

// ── Privacy copy: 09 §9.5 paragraphs, updated per decision D4 (2026-10-03) ─────────────────────────────────────
// Keep identical to 09 §9.5. The {whatsapp} and {email} slots are filled from src/data/site.ts with fillContact(),
// so the contact values stay in one file. The built page must contain no "{whatsapp}" or "{email}" text.
export const CONSENT_TEXT: { title: string; body: string }[] = [
  {
    title: 'Analytics',
    body: 'We use Google Analytics 4 to understand how visitors use this website — pages viewed, buttons tapped, and how people found us. Google Analytics does not log or store your IP address, and we have switched off all advertising and remarketing features. We look at this data only in aggregate (for example, "how many people visited the pricing page"), never to identify you.',
  },
  {
    title: 'Bookings & WhatsApp',
    body: 'When you book, we store the details you enter (name, mobile number, area, pet details, preferred date and time, and any note) in our private records and use them only to handle that booking — confirming it on WhatsApp at the number you give us, arranging the visit and answering your messages about it. We never sell or share your number.',
  },
  {
    title: 'Reminders, reviews & offers',
    body: 'We send reminders, review requests, rebooking messages and offers on WhatsApp only after you reply YES, and they stop as soon as you tell us. To see, correct or delete your data, WhatsApp us on {whatsapp} or email {email} — we action deletion requests within 7 days.',
  },
];

/** Fills the {whatsapp} and {email} slots in CONSENT_TEXT with the values from src/data/site.ts. */
export const fillContact = (text: string, contact: { whatsapp: string; email: string }): string =>
  text.split('{whatsapp}').join(contact.whatsapp).split('{email}').join(contact.email);

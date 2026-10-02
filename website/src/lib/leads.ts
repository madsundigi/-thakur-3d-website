// Lead storage — website-plan/07-BOOKING-SPEC.md §5(a). Fire-and-forget: NEVER blocks the WhatsApp handoff.
// Primary: Google Sheets Apps Script web app (no-cors, text/plain). Fallback: Web3Forms email. Last resort:
// localStorage queue, retried on the next page load.
import { areaText, sizeApplies, windowLabel, type BookingState } from './booking';
import { getPlan, getService } from './pricing';
import { priceShown } from './whatsapp';

// The webhook URL token IS the credential — it lives only here (07 §5a).
const SHEETS_WEBHOOK = '[FILL:SHEETS_WEBHOOK]';
const WEB3FORMS_KEY = '[FILL:WEB3FORMS_KEY]';
const QUEUE_KEY = 'pds_unsent_leads';
const QUEUE_CAP = 10;

const filled = (v: string) => !v.startsWith('[FILL:');

export type LeadPayload = Record<string, string>;

export function bookingPayload(s: BookingState): LeadPayload {
  const svc = getService(s.serviceId);
  return {
    ts: new Date().toISOString(),
    ref: s.ref ?? '',
    lead_type: 'booking',
    source: s.source,
    page_url: typeof location !== 'undefined' ? location.href : '',
    service_id: s.serviceId ?? '',
    service_label: svc?.label ?? '',
    plan: getPlan(svc, s.planId)?.label ?? '',
    addon_tick_flea: s.addonTickFlea ? 'yes' : '',
    pet_type: s.petType ?? '',
    size: s.size && sizeApplies(s) ? s.size : '',
    breed: s.breed.trim(),
    first_groom: s.firstGroom ?? '',
    coat_matting: s.coat.matting ? 'yes' : '',
    coat_ticks: s.coat.ticks ? 'yes' : '',
    coat_shedding: s.coat.shedding ? 'yes' : '',
    area: areaText(s),
    date_pref: s.date ?? '',
    window_pref: windowLabel(s),
    name: s.name.trim(),
    phone: s.phone,
    note: s.note.trim(),
    price_shown: priceShown(s),
    consent_whatsapp: s.consent ? 'yes' : 'no',
    ua: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  };
}

export function waitlistPayload(s: BookingState, ref: string): LeadPayload {
  return {
    ts: new Date().toISOString(),
    ref,
    lead_type: 'waitlist',
    source: s.source,
    area: s.waitlist.areaText.trim(),
    name: s.waitlist.name.trim(),
    phone: s.waitlist.phone,
  };
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function postSheets(p: LeadPayload): Promise<boolean> {
  if (!filled(SHEETS_WEBHOOK)) return false;
  try {
    await fetch(SHEETS_WEBHOOK, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(p),
    });
    return true; // opaque response — a resolved promise counts as success (07 §5a)
  } catch {
    return false;
  }
}

async function postWeb3Forms(p: LeadPayload): Promise<boolean> {
  if (!filled(WEB3FORMS_KEY)) return false;
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `PetDoorStep lead ${p.ref}`, ...p }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function readQueue(): LeadPayload[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? (JSON.parse(raw) as LeadPayload[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(q: LeadPayload[]): void {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(-QUEUE_CAP)));
  } catch {
    /* private mode — the lead still travels inside the WhatsApp message */
  }
}

/** Sheets → retry once after 2 s → Web3Forms → localStorage queue. */
async function deliver(p: LeadPayload): Promise<boolean> {
  if (await postSheets(p)) return true;
  if (filled(SHEETS_WEBHOOK)) {
    await wait(2000);
    if (await postSheets(p)) return true;
  }
  return postWeb3Forms(p);
}

export function submitLead(p: LeadPayload): void {
  void deliver(p).then((ok) => {
    if (!ok) {
      if (!filled(SHEETS_WEBHOOK) && !filled(WEB3FORMS_KEY)) {
        console.warn('[leads] storage not configured ([FILL:SHEETS_WEBHOOK] / [FILL:WEB3FORMS_KEY]) — queued locally');
      }
      writeQueue([...readQueue(), p]);
    }
  });
}

/** Retry queued leads once per page load (07 §5a). */
export function flushUnsentLeads(): void {
  const q = readQueue();
  if (!q.length || (!filled(SHEETS_WEBHOOK) && !filled(WEB3FORMS_KEY))) return;
  writeQueue([]);
  q.forEach((p) => submitLead(p));
}

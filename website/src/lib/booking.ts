// Booking state model — shape per website-plan/07-BOOKING-SPEC.md §8 (+ UI bookkeeping fields).
import { getPlan, getService, sizeGuide, type PetType, type Size } from './pricing';
import { windowOptions } from './schedule';

export const AREA_OTHER = 'Other area in Ludhiana';
export const AREA_OUTSIDE = 'Outside Ludhiana';

export const STEP_NAMES = ['area', 'service', 'pet', 'schedule', 'contact', 'review'] as const; // event step_name
export const DOT_LABELS = ['Area', 'Service', 'Pet', 'Time', 'Contact'] as const; // 07 §3 global
export const REVIEW_STEP = 6;

export type FirstGroom = 'Yes, first time' | 'Groomed before';

export interface BookingState {
  step: number; // 1–5, 6 = review
  furthest: number; // furthest step reached (completed dots are tappable)
  editing: boolean; // entered from a review Edit link → Next reads "Save & review"
  area: string;
  areaOther: string;
  serviceId: string | null;
  planId: string | null;
  addonTickFlea: boolean;
  petType: PetType | null;
  size: Size | null;
  puppyConfirmed: boolean;
  breed: string;
  firstGroom: FirstGroom | null;
  coat: { matting: boolean; ticks: boolean; shedding: boolean };
  date: string | null; // ISO yyyy-mm-dd
  dateLabel: string | null; // "Today" / "Tomorrow" / "Sat 04 Oct" — captured at selection
  window: string | null; // window id
  name: string;
  phone: string;
  note: string;
  consent: boolean;
  ref: string | null;
  source: string;
  waitlist: { name: string; phone: string; areaText: string; done: boolean };
}

export const initialState = (source = 'book_page'): BookingState => ({
  step: 1,
  furthest: 1,
  editing: false,
  area: '',
  areaOther: '',
  serviceId: null,
  planId: null,
  addonTickFlea: false,
  petType: null,
  size: null,
  puppyConfirmed: false,
  breed: '',
  firstGroom: null,
  coat: { matting: false, ticks: false, shedding: false },
  date: null,
  dateLabel: null,
  window: null,
  name: '',
  phone: '',
  note: '',
  consent: true, // 07 §3 Step 5: checked by default
  ref: null,
  source,
  waitlist: { name: '', phone: '', areaText: '', done: false },
});

export const COAT_LABELS: Record<keyof BookingState['coat'], string> = {
  matting: 'Matting / tangles',
  ticks: 'Ticks or fleas',
  shedding: 'Heavy shedding',
};

export const areaText = (s: BookingState): string => (s.area === AREA_OTHER ? s.areaOther.trim() : s.area);

export const petLabel = (p: PetType | null): string => (p === 'cat' ? 'Cat' : p === 'dog' ? 'Dog' : '');

/** Size is asked for every service except cat and Puppy Intro Groom (07 §3 Step 3). */
export const sizeApplies = (s: BookingState): boolean => s.petType !== 'cat' && s.serviceId !== 'puppy-intro';

export const sizeLabel = (s: BookingState): string =>
  s.size && sizeApplies(s) ? `${sizeGuide[s.size].label} (${sizeGuide[s.size].kg})` : '';

export const windowLabel = (s: BookingState): string =>
  windowOptions(s.serviceId, s.planId).find((w) => w.id === s.window)?.label ?? '';

export const serviceLine = (s: BookingState): string => {
  const svc = getService(s.serviceId);
  if (!svc) return '';
  const plan = getPlan(svc, s.planId);
  return `${svc.label}${plan ? ` — ${plan.label}` : ''}${s.addonTickFlea ? ' + Tick & Flea add-on' : ''}`;
};

export const noteLine = (s: BookingState): string => {
  const flags = (Object.keys(s.coat) as (keyof BookingState['coat'])[]).filter((k) => s.coat[k]).map((k) => COAT_LABELS[k]);
  const parts = [
    s.firstGroom === 'Yes, first time' ? 'First groom' : '',
    flags.join(', '),
    s.note.trim(),
  ].filter(Boolean);
  return parts.join('. ');
};

// Date strip + time windows — website-plan/07-BOOKING-SPEC.md §3 Step 4, with the walk hours from
// 00-MASTER-PLAN §3.1 (walks run 6:00–9:30 and 17:30–20:30, so walking gets its own windows).

export interface DateOption { iso: string; label: string; isToday: boolean }
export interface WindowOption { id: string; label: string; startHour: number }

export const VISIT_WINDOWS: WindowOption[] = [
  { id: 'morning', label: 'Morning 9–12', startHour: 9 },
  { id: 'afternoon', label: 'Afternoon 12–3', startHour: 12 },
  { id: 'evening', label: 'Evening 3–6', startHour: 15 },
];

export const WALK_WINDOWS: WindowOption[] = [
  { id: 'walk-morning', label: 'Morning walks 6:00–9:30', startHour: 6 },
  { id: 'walk-evening', label: 'Evening walks 17:30–20:30', startHour: 17.5 },
];

/** 2 walks/day = both windows; one fixed option keeps the step's contract (date strip + window). */
export const WALK_BOTH: WindowOption[] = [{ id: 'walk-both', label: 'Morning + evening walks', startHour: 6 }];

const DAY = new Intl.DateTimeFormat('en-GB', { weekday: 'short' });
const DM = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' });

const isoOf = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/**
 * Next 7 days. Visits: today included only before 15:00. Walks: always start tomorrow (meet-and-greet first).
 */
export function dateOptions(now: Date, isWalking: boolean): DateOption[] {
  const includeToday = !isWalking && now.getHours() < 15;
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (includeToday ? 0 : 1));
  const todayIso = isoOf(now);
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const out: DateOption[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const iso = isoOf(d);
    let label = `${DAY.format(d)} ${DM.format(d)}`;
    if (iso === todayIso) label = 'Today';
    else if (iso === isoOf(tomorrow)) label = 'Tomorrow';
    out.push({ iso, label, isToday: iso === todayIso });
  }
  return out;
}

export function windowOptions(serviceId: string | null, planId: string | null): WindowOption[] {
  if (serviceId === 'dog-walking') return planId === 'walk-2x' ? WALK_BOTH : WALK_WINDOWS;
  return VISIT_WINDOWS;
}

/** A window is closed when the chosen date is today and the current time is past its start (07 §3 Step 4). */
export function isWindowClosed(win: WindowOption, dateIso: string | null, now: Date): boolean {
  if (!dateIso || dateIso !== isoOf(now)) return false;
  return now.getHours() + now.getMinutes() / 60 >= win.startHour;
}

export const todayIso = (now: Date): string => isoOf(now);

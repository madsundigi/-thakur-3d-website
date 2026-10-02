// Step 4 — Schedule (07-BOOKING-SPEC §3). Honest windows: never fake live availability.
import { useEffect } from 'react';
import { dateOptions, isWindowClosed, windowOptions } from '../../../lib/schedule';
import { errId, type StepProps } from '../types';
import { Choice, FieldError, Fieldset } from '../ui';

/** 07 §1.4 honesty line; the before-9-am variant is our extension for early-morning bookings. */
export function confirmLine(now: Date): string {
  const h = now.getHours();
  if (h >= 19) return 'Received after 7 pm? We confirm by 9:15 next morning.';
  if (h < 9) return 'Received before 9 am? We confirm by 9:15 this morning.';
  return 'Your slot is confirmed on WhatsApp within 10 minutes (9:00–19:00).';
}

export default function StepSchedule({ state, set, errors }: StepProps) {
  const now = new Date();
  const isWalking = state.serviceId === 'dog-walking';
  const dates = dateOptions(now, isWalking);
  const windows = windowOptions(state.serviceId, state.planId);

  // 2 walks/day has exactly one option — select it for the user.
  useEffect(() => {
    if (windows.length === 1 && state.window !== windows[0].id) set({ window: windows[0].id });
  }, [windows.length, state.window]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-5">
      <div>
        <Fieldset legend={isWalking ? 'Start date' : 'Date'}>
          <div className="chip-row pb-1" role="presentation">
            {dates.map((d, i) => (
              <Choice key={d.iso} id={`pds-date-${i}`} name="pds-date" field={i === 0 ? 'date' : undefined}
                checked={state.date === d.iso} describedBy={errId('date')}
                onChange={() => set({ date: d.iso, dateLabel: d.label })}>
                {d.label}
              </Choice>
            ))}
          </div>
        </Fieldset>
        <FieldError id={errId('date')} message={errors.date} />
      </div>

      <div>
        <Fieldset legend="Time window">
          <div className="flex flex-wrap gap-2">
            {windows.map((w, i) => {
              const closed = isWindowClosed(w, state.date, now);
              return (
                <Choice key={w.id} id={`pds-window-${i}`} name="pds-window" field={i === 0 ? 'window' : undefined}
                  checked={state.window === w.id} disabled={closed}
                  describedBy={closed ? `pds-window-${i}-help` : errId('window')}
                  onChange={() => !closed && set({ window: w.id })}>
                  {w.label}
                </Choice>
              );
            })}
          </div>
          {windows.map((w, i) =>
            isWindowClosed(w, state.date, now) ? (
              <p key={w.id} id={`pds-window-${i}-help`} className="sr-only">Too soon for today — pick another window or day.</p>
            ) : null,
          )}
          {windows.some((w) => isWindowClosed(w, state.date, now)) ? (
            <p className="m-0 mt-2 text-sm text-slate" aria-hidden="true">Too soon for today — pick another window or day.</p>
          ) : null}
        </Fieldset>
        <FieldError id={errId('window')} message={errors.window} />
      </div>

      <p className="m-0 rounded-sm bg-mint px-3 py-2 text-sm text-brand-deep" data-testid="confirm-line">{confirmLine(now)}</p>
    </div>
  );
}

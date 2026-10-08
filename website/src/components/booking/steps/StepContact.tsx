// Step 5 — Contact (07-BOOKING-SPEC §3). Phone normalised + validated against ^[6-9]\d{9}$.
// Consent line: 07 verbatim; owner decision D4 links its promise to /privacy-policy/ once that page is live.
import { isLive } from '../../../data/routes';
import { CAPS } from '../../../lib/validate';
import { errId, FIELD_IDS, type StepProps } from '../types';
import { FieldError, inputClass } from '../ui';

const PRIVACY = '/privacy-policy/';

export default function StepContact({ state, set, errors }: StepProps) {
  const promise = 'We never spam or share your number.';
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor={FIELD_IDS.name} className="mb-2 block font-semibold text-ink">Your name</label>
        <input id={FIELD_IDS.name} data-field="name" type="text" autoComplete="name" maxLength={CAPS.name}
          value={state.name} onChange={(e) => set({ name: e.target.value })}
          aria-invalid={errors.name ? true : undefined} aria-describedby={errId('name')} className={inputClass(!!errors.name)} />
        <FieldError id={errId('name')} message={errors.name} />
      </div>
      <div>
        <label htmlFor={FIELD_IDS.phone} className="mb-2 block font-semibold text-ink">Mobile number</label>
        <input id={FIELD_IDS.phone} data-field="phone" type="tel" inputMode="numeric" autoComplete="tel" maxLength={CAPS.phoneRaw}
          value={state.phone} placeholder="98765 43210" onChange={(e) => set({ phone: e.target.value })}
          aria-invalid={errors.phone ? true : undefined} aria-describedby={errId('phone')} className={inputClass(!!errors.phone)} />
        <FieldError id={errId('phone')} message={errors.phone} />
      </div>
      <div>
        <label htmlFor={FIELD_IDS.note} className="mb-2 block font-semibold text-ink">Anything we should know?</label>
        <textarea id={FIELD_IDS.note} data-field="note" rows={3} maxLength={CAPS.note} value={state.note}
          placeholder="Skin issues, anxious pet, gate / society entry instructions…" onChange={(e) => set({ note: e.target.value })}
          aria-invalid={errors.note ? true : undefined} aria-describedby={errId('note')} className={inputClass(!!errors.note)} />
        <FieldError id={errId('note')} message={errors.note} />
      </div>
      <div>
        <label htmlFor={FIELD_IDS.consent} className="flex min-h-11 cursor-pointer items-start gap-3">
          <input id={FIELD_IDS.consent} data-field="consent" type="checkbox" className="mt-1 h-5 w-5 flex-none accent-brand"
            checked={state.consent} onChange={(e) => set({ consent: e.target.checked })} aria-describedby={errId('consent')} />
          <span className="text-sm">
            Confirm my booking on WhatsApp at this number. {promise}
          </span>
        </label>
        {isLive(PRIVACY) ? (
          <p className="m-0 mt-1 pl-8 text-sm">
            <a href={PRIVACY} target="_blank" rel="noopener" data-testid="consent-privacy"
              className="text-brand underline decoration-[1.5px] underline-offset-[3px] hover:text-brand-deep">
              Privacy policy<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        ) : null}
        <FieldError id={errId('consent')} message={errors.consent} />
      </div>
    </div>
  );
}

// Step 1 — Area (07-BOOKING-SPEC §3). Native select on phones, chips from 768px.
import { AREA_OTHER, AREA_OUTSIDE } from '../../../lib/booking';
import { areas } from '../../../lib/pricing';
import { CAPS } from '../../../lib/validate';
import { errId, FIELD_IDS, type StepProps } from '../types';
import { Choice, FieldError, Fieldset, inputClass } from '../ui';

const OPTIONS = [...areas, AREA_OTHER, AREA_OUTSIDE];

export default function StepArea({ state, set, errors, onStart }: StepProps & { onStart: () => void }) {
  const pick = (area: string) => {
    onStart();
    set({ area, areaOther: area === AREA_OTHER ? state.areaOther : '' });
  };
  return (
    <div className="space-y-3">
      <div className="md:hidden">
        <label htmlFor={FIELD_IDS.area} className="mb-2 block font-semibold text-ink">Your area</label>
        <select
          id={FIELD_IDS.area}
          data-field="area"
          value={state.area}
          onFocus={onStart}
          onChange={(e) => pick(e.target.value)}
          aria-invalid={errors.area ? true : undefined}
          aria-describedby={errId('area')}
          className={inputClass(!!errors.area)}
        >
          <option value="" disabled>Choose your area</option>
          {OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <Fieldset legend="Your area" className="hidden md:block">
        <div className="flex flex-wrap gap-2">
          {OPTIONS.map((o, i) => (
            <Choice key={o} id={`pds-area-chip-${i}`} name="pds-area-chip" field="area" checked={state.area === o}
              onChange={() => pick(o)} onFocus={onStart} describedBy={errId('area')}>
              {o}
            </Choice>
          ))}
        </div>
      </Fieldset>
      <p className="m-0 text-sm text-slate">We serve all of Ludhiana. These areas get priority same-day slots.</p>
      <FieldError id={errId('area')} message={errors.area} />
      {state.area === AREA_OTHER ? (
        <div>
          <label htmlFor={FIELD_IDS.areaOther} className="mb-2 block font-semibold text-ink">Your area</label>
          <input
            id={FIELD_IDS.areaOther}
            data-field="areaOther"
            type="text"
            maxLength={CAPS.areaText}
            value={state.areaOther}
            placeholder="e.g. Jamalpur, Dugri Phase 2, Gill Road"
            onChange={(e) => set({ areaOther: e.target.value })}
            aria-invalid={errors.areaOther ? true : undefined}
            aria-describedby={errId('areaOther')}
            className={inputClass(!!errors.areaOther)}
          />
          <FieldError id={errId('areaOther')} message={errors.areaOther} />
        </div>
      ) : null}
    </div>
  );
}

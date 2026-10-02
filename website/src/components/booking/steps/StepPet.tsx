// Step 3 — Pet (07-BOOKING-SPEC §3). Size hidden for cats + Puppy Intro Groom; grooming-only questions.
import { sizeApplies, type FirstGroom } from '../../../lib/booking';
import { getService, GROOMING_IDS, SIZES, sizeGuide } from '../../../lib/pricing';
import { CAPS } from '../../../lib/validate';
import { errId, FIELD_IDS, type StepProps } from '../types';
import { Choice, FieldError, Fieldset, inputClass } from '../ui';

const FIRST: FirstGroom[] = ['Yes, first time', 'Groomed before'];

export default function StepPet({ state, set, errors }: StepProps) {
  const svc = getService(state.serviceId);
  const locked = svc && svc.pet !== 'both' ? svc.pet : null;
  const isGrooming = !!state.serviceId && GROOMING_IDS.includes(state.serviceId);
  return (
    <div className="space-y-5">
      <div>
        <Fieldset legend="Your pet">
          <div className="flex gap-2">
            {(['dog', 'cat'] as const).map((p) => (
              <Choice key={p} id={`pds-pet-${p}`} name="pds-pet" field={p === 'dog' ? 'petType' : undefined}
                checked={state.petType === p} disabled={!!locked && locked !== p} describedBy={errId('petType')}
                onChange={() => set({ petType: p, size: p === 'cat' ? null : state.size })}>
                {p === 'dog' ? 'Dog' : 'Cat'}
              </Choice>
            ))}
          </div>
        </Fieldset>
        <FieldError id={errId('petType')} message={errors.petType} />
      </div>

      {sizeApplies(state) ? (
        <div>
          <Fieldset legend="Size">
            <div className="grid gap-2">
              {SIZES.map((s) => (
                <Choice key={s} id={`pds-size-${s}`} name="pds-size" field={s === 'small' ? 'size' : undefined}
                  checked={state.size === s} describedBy={errId('size')} className="w-full" onChange={() => set({ size: s })}>
                  {sizeGuide[s].label} — {sizeGuide[s].kg} ({sizeGuide[s].examples.join(', ')})
                </Choice>
              ))}
            </div>
          </Fieldset>
          <FieldError id={errId('size')} message={errors.size} />
        </div>
      ) : null}

      {state.serviceId === 'puppy-intro' ? (
        <div>
          <label htmlFor={FIELD_IDS.puppy} className="flex min-h-11 cursor-pointer items-center gap-3">
            <input id={FIELD_IDS.puppy} data-field="puppy" type="checkbox" className="h-5 w-5 accent-brand"
              checked={state.puppyConfirmed} onChange={(e) => set({ puppyConfirmed: e.target.checked })}
              aria-describedby={errId('puppy')} />
            <span>My puppy is under 6 months old</span>
          </label>
          <FieldError id={errId('puppy')} message={errors.puppy} />
        </div>
      ) : null}

      <div>
        <label htmlFor={FIELD_IDS.breed} className="mb-2 block font-semibold text-ink">Breed (optional)</label>
        <input id={FIELD_IDS.breed} data-field="breed" type="text" maxLength={CAPS.breed} value={state.breed}
          placeholder="e.g. Shih Tzu, Labrador, Indie" onChange={(e) => set({ breed: e.target.value })}
          aria-invalid={errors.breed ? true : undefined} aria-describedby={errId('breed')} className={inputClass(!!errors.breed)} />
        <FieldError id={errId('breed')} message={errors.breed} />
      </div>

      {isGrooming ? (
        <>
          <Fieldset legend="First groom with us?">
            <div className="flex flex-wrap gap-2">
              {FIRST.map((f, i) => (
                <Choice key={f} id={`pds-first-${i}`} name="pds-first" checked={state.firstGroom === f} onChange={() => set({ firstGroom: f })}>
                  {f}
                </Choice>
              ))}
            </div>
          </Fieldset>
          <Fieldset legend="Coat condition (optional)">
            <div className="flex flex-wrap gap-2">
              {(['matting', 'ticks', 'shedding'] as const).map((k) => (
                <Choice key={k} id={`pds-coat-${k}`} name={`pds-coat-${k}`} type="checkbox" checked={state.coat[k]}
                  onChange={() => set({ coat: { ...state.coat, [k]: !state.coat[k] } })}>
                  {k === 'matting' ? 'Matting / tangles' : k === 'ticks' ? 'Ticks or fleas' : 'Heavy shedding'}
                </Choice>
              ))}
            </div>
          </Fieldset>
        </>
      ) : null}
    </div>
  );
}

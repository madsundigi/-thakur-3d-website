// Outside-Ludhiana waitlist (07-BOOKING-SPEC §3 Step 1) — never a dead end.
import type { FormEvent } from 'react';
import type { BookingState } from '../../../lib/booking';
import { CAPS } from '../../../lib/validate';
import { errId, FIELD_IDS, type Errors } from '../types';
import { FieldError, inputClass } from '../ui';

interface Props {
  state: BookingState;
  setWaitlist: (patch: Partial<BookingState['waitlist']>) => void;
  errors: Errors;
  onSubmit: (e: FormEvent) => void;
  onBackToLudhiana: () => void;
}

export default function Waitlist({ state, setWaitlist, errors, onSubmit, onBackToLudhiana }: Props) {
  const w = state.waitlist;
  if (w.done) {
    return (
      <div className="rounded-lg bg-mint p-4" data-testid="waitlist-done">
        <p className="m-0 font-semibold text-ink">Done! You're on the list for {w.areaText.trim()}. We'll WhatsApp you when we launch there.</p>
        <button type="button" onClick={onBackToLudhiana}
          className="mt-3 min-h-11 cursor-pointer p-0 font-semibold text-brand underline underline-offset-[3px]">
          Just visiting? Book for a Ludhiana address →
        </button>
      </div>
    );
  }
  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4 rounded-lg bg-mint p-4">
      <p className="m-0 text-ink">PetDoorStep currently serves Ludhiana. Leave your number and we'll message you on WhatsApp the day we start in your area — no spam, promise.</p>
      <div>
        <label htmlFor={FIELD_IDS.wlName} className="mb-2 block font-semibold">Your name</label>
        <input id={FIELD_IDS.wlName} data-field="wlName" type="text" autoComplete="name" maxLength={CAPS.name} value={w.name}
          onChange={(e) => setWaitlist({ name: e.target.value })} aria-describedby={errId('wlName')} className={inputClass(!!errors.wlName)} />
        <FieldError id={errId('wlName')} message={errors.wlName} />
      </div>
      <div>
        <label htmlFor={FIELD_IDS.wlPhone} className="mb-2 block font-semibold">Mobile number</label>
        <input id={FIELD_IDS.wlPhone} data-field="wlPhone" type="tel" inputMode="numeric" autoComplete="tel" maxLength={CAPS.phoneRaw}
          value={w.phone} onChange={(e) => setWaitlist({ phone: e.target.value })} aria-describedby={errId('wlPhone')}
          className={inputClass(!!errors.wlPhone)} />
        <FieldError id={errId('wlPhone')} message={errors.wlPhone} />
      </div>
      <div>
        <label htmlFor={FIELD_IDS.wlArea} className="mb-2 block font-semibold">Your area / city</label>
        <input id={FIELD_IDS.wlArea} data-field="wlArea" type="text" maxLength={CAPS.areaText} value={w.areaText}
          placeholder="e.g. Khanna, Jalandhar, Phagwara" onChange={(e) => setWaitlist({ areaText: e.target.value })}
          aria-describedby={errId('wlArea')} className={inputClass(!!errors.wlArea)} />
        <FieldError id={errId('wlArea')} message={errors.wlArea} />
      </div>
      <button type="submit" className="min-h-12 w-full cursor-pointer rounded-md bg-cta px-6 font-semibold text-ink hover:bg-cta-hover">
        Join the waitlist
      </button>
    </form>
  );
}

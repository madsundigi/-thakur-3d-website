// Step 2 — Service (07-BOOKING-SPEC §3). Every label, price and include renders from pricing.json.
import type { BookingState } from '../../../lib/booking';
import { chipText, defaultPlanId, inr, services, type Service } from '../../../lib/pricing';
import { isLive } from '../../../data/routes';
import { windowOptions } from '../../../lib/schedule';
import { errId, type StepProps } from '../types';
import { CheckIcon, Choice, FieldError } from '../ui';

function servicePatch(svc: Service, state: BookingState): Partial<BookingState> {
  const patch: Partial<BookingState> = {
    serviceId: svc.id,
    planId: defaultPlanId(svc),
    addonTickFlea: false,
    puppyConfirmed: svc.id === 'puppy-intro' ? state.puppyConfirmed : false,
  };
  if (svc.pet === 'dog') patch.petType = 'dog';
  if (svc.pet === 'cat') { patch.petType = 'cat'; patch.size = null; }
  const wasWalking = state.serviceId === 'dog-walking';
  const isWalking = svc.id === 'dog-walking';
  if (wasWalking !== isWalking) { patch.date = null; patch.dateLabel = null; patch.window = null; }
  return patch;
}

export default function StepService({ state, set, errors }: StepProps) {
  return (
    <div className="space-y-3">
      <fieldset className="m-0 min-w-0 border-0 p-0" aria-describedby={errId('service')}>
        <legend className="mb-2 text-base font-semibold text-ink">What does your pet need?</legend>
        <div className="grid grid-cols-1 gap-3 xs:grid-cols-2">
          {services.map((svc) => {
            const selected = state.serviceId === svc.id;
            const plans = svc.pricing.type === 'plans' ? svc.pricing.plans : [];
            return (
              <div key={svc.id} className={`rounded-md border ${selected ? 'border-2 border-brand bg-mint' : 'border-[1.5px] border-muted bg-paper'}`}>
                <label htmlFor={`pds-service-${svc.id}`} className="block cursor-pointer p-3">
                  <input
                    id={`pds-service-${svc.id}`}
                    data-field={svc.id === services[0].id ? 'service' : undefined}
                    type="radio"
                    name="pds-service"
                    className="peer sr-only"
                    checked={selected}
                    onChange={() => set(servicePatch(svc, state))}
                  />
                  <span className="flex flex-wrap items-center gap-2 rounded-sm peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-brand">
                    {selected ? <span className="text-brand"><CheckIcon /></span> : null}
                    <span className="font-semibold text-ink">{svc.label}{svc.constraint ? ` (${svc.constraint})` : ''}</span>
                    {svc.badge ? <span className="rounded-pill bg-cta px-2 py-0.5 text-[0.8125rem] font-semibold text-ink">{svc.badge}</span> : null}
                  </span>
                  <span className="mt-2 inline-block rounded-pill bg-sand px-2.5 py-1 text-sm font-semibold tabular-nums text-ink">{chipText(svc)}</span>
                  <ul className="mt-2 list-none space-y-0.5 p-0 text-sm text-slate">
                    {svc.includes.map((inc) => <li key={inc}>✓ {inc}</li>)}
                  </ul>
                </label>
                {selected && plans.length ? (
                  <fieldset className="m-0 min-w-0 border-0 px-3 pb-3 pt-0">
                    <legend className="sr-only">Choose a plan for {svc.label}</legend>
                    <div className="flex flex-wrap gap-2">
                      {plans.map((plan) => (
                        <Choice key={plan.id} id={`pds-plan-${plan.id}`} name="pds-plan" checked={state.planId === plan.id}
                          onChange={() => set({
                            planId: plan.id,
                            // keep the chosen window unless this plan changes the window set (walk-2x vs single walks)
                            window: windowOptions(svc.id, plan.id).some((w) => w.id === state.window) ? state.window : null,
                          })}>
                          {plan.label} {inr(plan.price)}{plan.per === 'month' ? '/month' : ''}
                        </Choice>
                      ))}
                    </div>
                  </fieldset>
                ) : null}
              </div>
            );
          })}
        </div>
      </fieldset>
      <FieldError id={errId('service')} message={errors.service} />
      {isLive('/offers/') ? (
        <p className="m-0 text-sm"><a href="/offers/" className="prose-link">Want 15% off every month? See Groom Club →</a></p>
      ) : null}
    </div>
  );
}

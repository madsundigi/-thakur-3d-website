// Price ribbon — pinned under the dots from the moment a service is chosen (07 §1.7, §3; skin 08 §4.19).
import type { BookingState } from '../../lib/booking';
import { getService, ribbonText } from '../../lib/pricing';

export default function PriceRibbon({ state }: { state: BookingState }) {
  const svc = getService(state.serviceId);
  if (!svc) return null;
  const text = ribbonText(svc, state.size, state.planId, state.addonTickFlea, state.petType);
  return (
    <div
      className="sticky top-[var(--header-h)] z-20 mt-3 rounded-sm border-l-[3px] border-cta bg-sand px-3 py-2 text-sm text-ink shadow-2"
      data-testid="price-ribbon"
    >
      <span className="font-bold tabular-nums">{text}</span>
    </div>
  );
}

// Review screen (07-BOOKING-SPEC §3 "Review screen") — summary + Edit links, price, add-on, Spa suggestion, Confirm.
import { useState, type MouseEvent } from 'react';
import { site, telHref } from '../../../data/site';
import { areaText, COAT_LABELS, petLabel, serviceLine, sizeLabel, windowLabel, type BookingState } from '../../../lib/booking';
import { DOG_GROOM_IDS, inr, sizePrice, TICK_ADDON_PRICE } from '../../../lib/pricing';
import { composeMessage, priceShown, waUrl } from '../../../lib/whatsapp';
import { Choice, PhoneIcon, WhatsAppGlyph } from '../ui';
import { FIRSTGROOM } from '../../../data/offers';

interface Props {
  state: BookingState;
  set: (patch: Partial<BookingState>) => void;
  onEdit: (step: number) => void;
  onConfirm: (e: MouseEvent<HTMLAnchorElement>) => void;
  submitting: boolean;
  waPath: string;
  firstOffer: boolean;
}

const prettyPhone = (p: string) => (p.length === 10 ? `${p.slice(0, 5)} ${p.slice(5)}` : p);

export default function Review({ state, set, onEdit, onConfirm, submitting, waPath, firstOffer }: Props) {
  const [spaDismissed, setSpaDismissed] = useState(false);
  const flags = (Object.keys(state.coat) as (keyof BookingState['coat'])[]).filter((k) => state.coat[k]).map((k) => COAT_LABELS[k]);
  const petBits = [petLabel(state.petType), sizeLabel(state), state.breed.trim(), state.firstGroom ?? '', ...flags].filter(Boolean);
  const rows: { label: string; value: string; step: number }[] = [
    { label: 'Area', value: `${areaText(state)}, ${site.city}`, step: 1 },
    { label: 'Service', value: serviceLine(state), step: 2 },
    { label: 'Pet', value: petBits.join(' · '), step: 3 },
    { label: 'Date & window', value: `${state.dateLabel ?? ''}, ${windowLabel(state)}`, step: 4 },
    { label: 'Name & mobile', value: `${state.name.trim()} · ${prettyPhone(state.phone)}`, step: 5 },
    { label: 'Note', value: state.note.trim() || '—', step: 5 },
  ];

  const showAddon = state.coat.ticks && !!state.serviceId && DOG_GROOM_IDS.includes(state.serviceId);
  const spaPrice = state.size ? sizePrice('premium-spa', state.size) : null;
  const showSpa = !spaDismissed && state.coat.matting && (state.serviceId === 'bath-brush' || state.serviceId === 'full-groom') && spaPrice;
  const message = composeMessage(state, firstOffer);

  return (
    <div className="space-y-5">
      <dl className="m-0 divide-y divide-line rounded-md border border-line">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start justify-between gap-3 px-3 py-2.5">
            <div className="min-w-0">
              <dt className="text-sm text-slate">{r.label}</dt>
              <dd className="m-0 break-words text-ink">{r.value}</dd>
            </div>
            <button type="button" onClick={() => onEdit(r.step)} aria-label={`Edit ${r.label}`}
              className="min-h-11 flex-none cursor-pointer px-2 text-sm font-semibold text-brand underline underline-offset-[3px] hover:text-brand-deep">
              Edit
            </button>
          </div>
        ))}
      </dl>

      {showAddon ? (
        <Choice id="pds-addon" name="pds-addon" type="checkbox" checked={state.addonTickFlea}
          onChange={() => set({ addonTickFlea: !state.addonTickFlea })}>
          Add Tick &amp; Flea Treatment +{inr(TICK_ADDON_PRICE)}
        </Choice>
      ) : null}

      {showSpa ? (
        <div className="rounded-md border border-line bg-sand p-3" data-testid="spa-suggestion">
          <p className="m-0 text-ink">Heavy matting? Premium Spa Groom includes de-matting — switch for {inr(spaPrice as number)}?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" onClick={() => set({ serviceId: 'premium-spa', planId: null })}
              className="min-h-11 cursor-pointer rounded-md border-[1.5px] border-brand bg-paper px-4 font-semibold text-brand hover:bg-mint">Switch</button>
            <button type="button" onClick={() => setSpaDismissed(true)}
              className="min-h-11 cursor-pointer px-3 font-semibold text-brand underline underline-offset-[3px]">Keep my choice</button>
          </div>
        </div>
      ) : null}

      <div className="rounded-md bg-sand p-3" data-testid="review-price">
        <p className="m-0 text-lg text-ink">Your price: <span className="font-bold tabular-nums">{priceShown(state)}</span></p>
        <p className="m-0 text-sm text-slate">Fixed price — no doorstep bargaining, nothing extra at the door.</p>
      </div>

      {firstOffer ? (
        <p className="m-0 rounded-sm bg-mint px-3 py-2 text-sm text-brand-deep" data-testid="first-offer">
          New here? Code {FIRSTGROOM.code} — {inr(FIRSTGROOM.off)} off your first groom + a free nail-trim visit — is added to your booking.
        </p>
      ) : null}

      <div className="space-y-1 text-sm">
        <p className="m-0 font-semibold text-ink">No advance payment. Pay by cash or UPI after the service.</p>
        <p className="m-0 text-slate">Your slot is confirmed on WhatsApp within 10 minutes (9:00–19:00).</p>
      </div>

      <a
        href={waUrl(message)}
        target="_blank"
        rel="noopener"
        data-track-off=""
        data-source="confirm_button"
        data-testid="confirm-whatsapp"
        onClick={onConfirm}
        aria-disabled={submitting || undefined}
        className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-base font-semibold text-ink no-underline transition-colors duration-[120ms] ${
          submitting ? 'pointer-events-none bg-line text-slate' : 'bg-wa hover:bg-wa-hover'
        }`}
      >
        <WhatsAppGlyph path={waPath} />
        {submitting ? 'Opening WhatsApp…' : 'Confirm on WhatsApp →'}
      </a>
      <p className="m-0 text-center text-sm text-slate">
        Prefer a call?{' '}
        <a href={telHref()} data-source="review_screen" className="inline-flex items-center gap-1 font-semibold text-brand underline underline-offset-[3px]">
          <PhoneIcon size={16} /> {site.phone}
        </a>
      </p>
    </div>
  );
}

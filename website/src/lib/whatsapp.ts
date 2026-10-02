// WhatsApp message composer — exact template from website-plan/07-BOOKING-SPEC.md §5(c).
import { site } from '../data/site';
import { areaText, noteLine, petLabel, serviceLine, sizeLabel, windowLabel, type BookingState } from './booking';
import { formatPrice, getService } from './pricing';
import { FIRSTGROOM } from '../data/offers';

const MAX_MESSAGE = 1500; // 07 §5: hard cap; the note is truncated first

export function priceShown(s: BookingState): string {
  const svc = getService(s.serviceId);
  return svc ? formatPrice(svc, s.size, s.planId, s.addonTickFlea) ?? '' : '';
}

function build(s: BookingState, note: string, firstOffer: boolean): string {
  const breed = s.breed.trim();
  const lines: (string | null)[] = [
    'Hi PetDoorStep! New booking request from the website.',
    '',
    `Ref: ${s.ref ?? ''}`,
    `Service: ${serviceLine(s)}`,
    `Pet: ${petLabel(s.petType)}${breed ? ` (${breed})` : ''}`,
    sizeLabel(s) ? `Size: ${sizeLabel(s)}` : null,
    `Area: ${areaText(s)}, ${site.city}`,
    `Date: ${s.dateLabel ?? ''}, ${windowLabel(s)}`,
    `Name: ${s.name.trim()}`,
    `Price shown: ${priceShown(s)}`,
    note ? `Note: ${note}` : null,
    firstOffer ? `Offer: ${FIRSTGROOM.code} (first groom)` : null,
    `Source: website (${s.source})`,
  ];
  return lines.filter((l) => l !== null).join('\n');
}

/** firstOffer: first booking on this device + qualifying groom (06 §7.1) — appends the FIRSTGROOM line. */
export function composeMessage(s: BookingState, firstOffer = false): string {
  let note = noteLine(s);
  let msg = build(s, note, firstOffer);
  if (msg.length > MAX_MESSAGE) {
    const overflow = msg.length - MAX_MESSAGE;
    note = note.slice(0, Math.max(0, note.length - overflow - 1)) + '…';
    msg = build(s, note, firstOffer);
  }
  return msg.slice(0, MAX_MESSAGE);
}

export const waUrl = (message: string): string =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

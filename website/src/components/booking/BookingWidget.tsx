// <BookingWidget /> — the ONE React island on the site (website-plan/07-BOOKING-SPEC.md §8).
// Steps & copy: 07 §3 · prices: 07 §4 · submission: 07 §5 · edge cases: 07 §6 · events: 09 §2a · a11y: 07 §9.
import { useCallback, useEffect, useReducer, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { track } from '../../lib/analytics';
import {
  AREA_OTHER, AREA_OUTSIDE, areaText, initialState, REVIEW_STEP, sizeApplies, STEP_NAMES, type BookingState,
} from '../../lib/booking';
import { bookingPayload, flushUnsentLeads, submitLead, waitlistPayload } from '../../lib/leads';
import { areas, defaultPlanId, getService, pricingData, SIZES, type Size } from '../../lib/pricing';
import { makeRef } from '../../lib/ref';
import { dateOptions, isWindowClosed, windowOptions } from '../../lib/schedule';
import { CAPS, ERR, normalizePhone } from '../../lib/validate';
import { priceShown } from '../../lib/whatsapp';
import { qualifiesForFirstGroom } from '../../data/offers';
import PriceRibbon from './PriceRibbon';
import ProgressDots from './ProgressDots';
import Review from './steps/Review';
import StepArea from './steps/StepArea';
import StepContact from './steps/StepContact';
import StepPet from './steps/StepPet';
import StepSchedule from './steps/StepSchedule';
import StepService from './steps/StepService';
import Waitlist from './steps/Waitlist';
import type { Errors, FieldKey } from './types';
import { ChevronLeftIcon } from './ui';

const DRAFT_KEY = 'pds_booking_draft_v1';
const DRAFT_MAX_AGE = 48 * 3600 * 1000;
const SRC_PATTERN = /^[a-z0-9_-]{1,40}$/;

const STEP_TITLES = ['Where should we come?', 'Choose a service', 'Tell us about your pet', 'Pick a day and time', 'Your details', 'Check & confirm'];

type Action =
  | { type: 'set'; patch: Partial<BookingState> }
  | { type: 'goto'; step: number; editing?: boolean }
  | { type: 'replace'; state: BookingState };

function reducer(s: BookingState, a: Action): BookingState {
  switch (a.type) {
    case 'set': return { ...s, ...a.patch };
    case 'goto': return { ...s, step: a.step, editing: a.editing ?? false, furthest: Math.max(s.furthest, a.step) };
    case 'replace': return a.state;
  }
}

/** Per-step validation with the verbatim 07 §3 messages. */
function validate(step: number, s: BookingState, now: Date): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!s.area) e.area = ERR.area;
    else if (s.area === AREA_OTHER && !s.areaOther.trim()) e.areaOther = ERR.areaOther;
  }
  if (step === 2 && !getService(s.serviceId)) e.service = ERR.service;
  if (step === 3) {
    if (!s.petType) e.petType = ERR.petType;
    if (sizeApplies(s) && !s.size) e.size = ERR.size;
    if (s.serviceId === 'puppy-intro' && !s.puppyConfirmed) e.puppy = ERR.puppy;
    if (s.breed.length > CAPS.breed) e.breed = ERR.breedLong;
  }
  if (step === 4) {
    const dates = dateOptions(now, s.serviceId === 'dog-walking');
    const win = windowOptions(s.serviceId, s.planId).find((w) => w.id === s.window);
    if (!s.date || !dates.some((d) => d.iso === s.date)) e.date = ERR.date;
    if (!win) e.window = ERR.window;
    else if (s.date && isWindowClosed(win, s.date, now)) e.window = ERR.windowClosed;
  }
  if (step === 5) {
    if (!s.name.trim()) e.name = ERR.nameEmpty;
    else if (s.name.length > CAPS.name) e.name = ERR.nameLong;
    if (!normalizePhone(s.phone)) e.phone = ERR.phone;
    if (!s.consent) e.consent = ERR.consent;
    if (s.note.length > CAPS.note) e.note = ERR.noteLong;
  }
  return e;
}

/** Focus the first VISIBLE control of the first invalid field (07 §9). */
function focusFirstInvalid(errors: Errors) {
  const order: FieldKey[] = ['area', 'areaOther', 'service', 'petType', 'size', 'puppy', 'breed', 'date', 'window',
    'name', 'phone', 'note', 'consent', 'wlName', 'wlPhone', 'wlArea'];
  const key = order.find((k) => errors[k]);
  if (!key) return;
  const el = Array.from(document.querySelectorAll<HTMLElement>(`[data-field="${key}"]`))
    .find((n) => n.offsetParent !== null || n.getClientRects().length > 0);
  el?.focus();
}

interface Props {
  waPath: string; // WhatsApp glyph path (simple-icons), passed in so the island doesn't bundle the icon set
  presetArea?: string; // area pages (_TEMPLATE-area-page AP-10)
  defaultSource?: string;
}

interface Draft { state: BookingState; savedAt: number }

export default function BookingWidget({ waPath, presetArea, defaultSource = 'book_page' }: Props) {
  const [state, dispatch] = useReducer(reducer, defaultSource, initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [draft, setDraft] = useState<Draft | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [priorBookings, setPriorBookings] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  const touched = useRef(false);
  const submitted = useRef(false);

  const set = useCallback((patch: Partial<BookingState>) => {
    touched.current = true;
    setDraft(null);
    dispatch({ type: 'set', patch });
  }, []);

  // Mount: prefill from URL (07 §2), resume banner (07 §6), flush queued leads (07 §5a).
  useEffect(() => {
    if (!pricingData.pricesConfirmed) console.warn('[pricing] pricesConfirmed=false — prices are DRAFT until Sunny confirms 00 §3.2');
    flushUnsentLeads();
    try { setPriorBookings(parseInt(localStorage.getItem('pds_booking_count') ?? '0', 10) || 0); } catch { /* ignore */ }
    const q = new URLSearchParams(location.search);
    const patch: Partial<BookingState> = {};
    const src = q.get('src');
    if (src && SRC_PATTERN.test(src)) patch.source = src;
    const svc = getService(q.get('service'));
    if (svc) {
      patch.serviceId = svc.id;
      patch.planId = defaultPlanId(svc);
      if (svc.pet !== 'both') patch.petType = svc.pet;
    }
    const size = q.get('size') as Size | null;
    if (size && SIZES.includes(size)) patch.size = size;
    if (presetArea && areas.includes(presetArea)) patch.area = presetArea;
    if (Object.keys(patch).length) dispatch({ type: 'set', patch });
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw) as Draft;
        const fresh = Date.now() - d.savedAt < DRAFT_MAX_AGE;
        if (fresh && d.state && (d.state.furthest > 1 || d.state.area)) setDraft(d);
        else localStorage.removeItem(DRAFT_KEY);
      }
    } catch { /* private mode */ }
  }, [presetArea]);

  // Persist the draft on every change (07 §6) — but never overwrite an old draft the user hasn't decided on yet.
  useEffect(() => {
    if (submitted.current || (draft && !touched.current)) return;
    if (!touched.current) return;
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ state, savedAt: Date.now() })); } catch { /* ignore */ }
  }, [state, draft]);

  // Move focus to the step heading on step change (07 §9) — not on first render.
  const waitlistView = state.area === AREA_OUTSIDE && state.step > 1;
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    headingRef.current?.focus();
  }, [state.step, waitlistView]);

  const onStart = useCallback(() => {
    try {
      if (sessionStorage.getItem('pds_booking_started')) return;
      sessionStorage.setItem('pds_booking_started', '1');
    } catch { /* ignore */ }
    track('booking_started', { source: state.source });
  }, [state.source]);

  const goReview = (s: BookingState) => {
    const patch: Partial<BookingState> = {};
    const phone = normalizePhone(s.phone);
    if (phone) patch.phone = phone;
    if (!s.ref) patch.ref = makeRef();
    if (Object.keys(patch).length) dispatch({ type: 'set', patch });
    track('booking_step_completed', { step: 6, step_name: STEP_NAMES[5] });
    dispatch({ type: 'goto', step: REVIEW_STEP });
  };

  const next = () => {
    const now = new Date();
    const errs = validate(state.step, state, now);
    if (Object.keys(errs).length) { setErrors(errs); requestAnimationFrame(() => focusFirstInvalid(errs)); return; }
    setErrors({});
    track('booking_step_completed', { step: state.step, step_name: STEP_NAMES[state.step - 1] });
    if (state.step === 1 && state.area === AREA_OUTSIDE) { dispatch({ type: 'goto', step: 2 }); return; }
    if (state.editing || state.step === 5) {
      // Re-validate every step: an edit (e.g. a new service) can invalidate a later answer.
      for (let s = 1; s <= 5; s++) {
        if (Object.keys(validate(s, state, now)).length) { dispatch({ type: 'goto', step: s, editing: true }); return; }
      }
      goReview(state);
      return;
    }
    dispatch({ type: 'goto', step: state.step + 1 });
  };

  const back = () => { setErrors({}); dispatch({ type: 'goto', step: Math.max(1, state.step - 1) }); };

  const onConfirm = (e: MouseEvent<HTMLAnchorElement>) => {
    if (submitting) { e.preventDefault(); return; } // double-submit guard (07 §6)
    setSubmitting(true);
    window.setTimeout(() => setSubmitting(false), 3000);
    const ref = state.ref ?? makeRef();
    track('booking_submitted', {
      service: state.serviceId ?? '', size: state.size ?? '', area: areaText(state),
      price_shown: priceShown(state), ref, source: state.source,
    });
    track('whatsapp_click', { source: 'confirm_button' });
    submitLead(bookingPayload({ ...state, ref }));
    submitted.current = true;
    try {
      localStorage.setItem('pds_last_booking', JSON.stringify({ ref, ts: Date.now() }));
      localStorage.setItem('pds_booking_count', String(priorBookings + 1));
      if (firstOffer) localStorage.setItem('pds_first_offer', ref); else localStorage.removeItem('pds_first_offer');
      localStorage.removeItem(DRAFT_KEY);
    } catch { /* ignore */ }
    window.setTimeout(() => {
      location.assign(`/thank-you/?ref=${encodeURIComponent(ref)}&service=${encodeURIComponent(state.serviceId ?? '')}`);
    }, 1200);
    // No preventDefault: the anchor itself opens wa.me (works even if JS dies after render — 07 §5c).
  };

  const submitWaitlist = (e: FormEvent) => {
    e.preventDefault();
    const w = state.waitlist;
    const errs: Errors = {};
    if (!w.name.trim()) errs.wlName = ERR.nameEmpty;
    else if (w.name.length > CAPS.name) errs.wlName = ERR.nameLong;
    const phone = normalizePhone(w.phone);
    if (!phone) errs.wlPhone = ERR.phone;
    if (!w.areaText.trim()) errs.wlArea = ERR.areaOther;
    if (Object.keys(errs).length) { setErrors(errs); requestAnimationFrame(() => focusFirstInvalid(errs)); return; }
    setErrors({});
    const next = { ...state, waitlist: { ...w, phone: phone as string } };
    submitLead(waitlistPayload(next, makeRef()));
    track('out_of_area_lead', { area_text: w.areaText.trim(), source: state.source });
    set({ waitlist: { ...next.waitlist, done: true } });
  };

  const resume = () => {
    if (!draft) return;
    touched.current = true;
    dispatch({ type: 'replace', state: { ...draft.state, step: Math.min(draft.state.furthest, REVIEW_STEP), editing: false } });
    setDraft(null);
  };
  const startFresh = () => {
    try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
    setDraft(null);
  };

  const firstOffer = qualifiesForFirstGroom(state.serviceId, priorBookings);
  const title = waitlistView ? "We're reaching your city soon." : STEP_TITLES[state.step - 1];
  const nextLabel = state.editing ? 'Save & review' : state.step === 5 ? 'Review booking →' : 'Next';

  return (
    <section aria-label="Book a service" className="rounded-lg border border-line bg-paper p-4 shadow-1 md:p-6" data-testid="booking-widget">
      {draft ? (
        <div className="mb-4 rounded-md bg-mint p-3" data-testid="resume-banner">
          <p className="m-0 text-ink">
            Welcome back! Continue your booking
            {getService(draft.state.serviceId) ? ` — ${getService(draft.state.serviceId)?.label}` : ''}
            {draft.state.area && draft.state.area !== AREA_OUTSIDE ? ` in ${areaText(draft.state)}` : ''}.
          </p>
          <div className="mt-2 flex gap-2">
            <button type="button" onClick={resume} className="min-h-11 cursor-pointer rounded-md bg-cta px-4 font-semibold text-ink hover:bg-cta-hover">Resume</button>
            <button type="button" onClick={startFresh} className="min-h-11 cursor-pointer px-3 font-semibold text-brand underline underline-offset-[3px]">Start fresh</button>
          </div>
        </div>
      ) : null}

      {!waitlistView ? (
        <>
          <ProgressDots step={state.step} onJump={(n) => { setErrors({}); dispatch({ type: 'goto', step: n }); }} />
          {state.step >= 2 ? <PriceRibbon state={state} /> : null}
        </>
      ) : null}

      <h2 ref={headingRef} tabIndex={-1} className="t-h3 mb-4 mt-4 scroll-mt-[calc(var(--header-h)+64px)] font-body outline-none" data-testid="step-title">
        {title}
      </h2>

      {waitlistView ? (
        <Waitlist
          state={state}
          setWaitlist={(p) => set({ waitlist: { ...state.waitlist, ...p } })}
          errors={errors}
          onSubmit={submitWaitlist}
          onBackToLudhiana={() => { setErrors({}); set({ area: '', waitlist: { name: '', phone: '', areaText: '', done: false } }); dispatch({ type: 'goto', step: 1 }); }}
        />
      ) : state.step === 1 ? <StepArea state={state} set={set} errors={errors} onStart={onStart} />
        : state.step === 2 ? <StepService state={state} set={set} errors={errors} />
        : state.step === 3 ? <StepPet state={state} set={set} errors={errors} />
        : state.step === 4 ? <StepSchedule state={state} set={set} errors={errors} />
        : state.step === 5 ? <StepContact state={state} set={set} errors={errors} />
        : <Review state={state} set={set} onEdit={(n) => { setErrors({}); dispatch({ type: 'goto', step: n, editing: true }); }}
            onConfirm={onConfirm} submitting={submitting} waPath={waPath} firstOffer={firstOffer} />}

      {!(waitlistView && state.waitlist.done) ? (
        <div className="mt-6 flex items-center justify-between gap-3">
          {state.step > 1 ? (
            <button type="button" onClick={back} className="inline-flex min-h-11 cursor-pointer items-center gap-1 px-1 font-semibold text-brand hover:text-brand-deep">
              <ChevronLeftIcon /> Back
            </button>
          ) : <span />}
          {state.step < REVIEW_STEP && !waitlistView ? (
            <button type="button" onClick={next} data-testid="next"
              className="min-h-12 cursor-pointer rounded-md bg-cta px-6 font-semibold text-ink shadow-1 hover:bg-cta-hover">
              {nextLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

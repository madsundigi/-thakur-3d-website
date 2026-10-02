// Widget UI primitives — skin per website-plan/08-DESIGN-SYSTEM.md §4.2 + §4.19, a11y per 07 §9.
import type { ReactNode } from 'react';

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const CheckIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...svgProps} width={size} height={size}><path d="M20 6 9 17l-5-5" /></svg>
);

export const ChevronLeftIcon = ({ size = 20 }: { size?: number }) => (
  <svg {...svgProps} width={size} height={size}><path d="m15 18-6-6 6-6" /></svg>
);

export const AlertIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...svgProps} width={size} height={size}>
    <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

export const PhoneIcon = ({ size = 20 }: { size?: number }) => (
  <svg {...svgProps} width={size} height={size}>
    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
  </svg>
);

/** WhatsApp glyph — path from simple-icons (CC0), filled (08 §6.2 exception). Passed in from the page so the
 * widget bundle doesn't import simple-icons. */
export const WhatsAppGlyph = ({ path, size = 20 }: { path: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d={path} /></svg>
);

export function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <div id={id} role="alert" aria-live="polite" className="min-h-0">
      {message ? (
        <p className="mt-1 flex items-start gap-1.5 text-sm text-alert-ink">
          <span className="mt-0.5 text-alert"><AlertIcon /></span>
          <span>{message}</span>
        </p>
      ) : null}
    </div>
  );
}

interface ChoiceProps {
  id: string;
  name: string;
  type?: 'radio' | 'checkbox';
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  onFocus?: () => void;
  describedBy?: string;
  field?: string; // data-field hook: the widget focuses the first VISIBLE control of an invalid field (07 §9)
  children: ReactNode;
  className?: string;
}

/** Selectable chip (08 §4.2): paper + muted border; selected = mint + 2px brand border + check icon. ≥44px. */
export function Choice({ id, name, type = 'radio', checked, disabled, onChange, onFocus, describedBy, field, children, className = '' }: ChoiceProps) {
  return (
    <label htmlFor={id} className={`relative inline-flex ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <input
        id={id}
        name={name}
        data-field={field}
        type={type}
        checked={checked}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        aria-describedby={describedBy}
        onChange={onChange}
        onFocus={onFocus}
        className="peer sr-only"
      />
      <span
        className={[
          'flex min-h-11 w-full items-center gap-2 rounded-pill border px-4 py-2 text-[0.9375rem] font-medium transition-colors duration-[120ms]',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand',
          checked ? 'border-2 border-brand bg-mint text-ink' : 'border-[1.5px] border-muted bg-paper text-ink',
          disabled ? 'opacity-50' : 'hover:border-brand',
        ].join(' ')}
      >
        {checked ? <span className="text-brand"><CheckIcon /></span> : null}
        <span className="leading-snug">{children}</span>
      </span>
    </label>
  );
}

export function Fieldset({ legend, children, className = '' }: { legend: ReactNode; children: ReactNode; className?: string }) {
  return (
    <fieldset className={`m-0 min-w-0 border-0 p-0 ${className}`}>
      <legend className="mb-2 text-base font-semibold text-ink">{legend}</legend>
      {children}
    </fieldset>
  );
}

export const inputClass = (invalid: boolean) =>
  [
    'block w-full rounded-sm bg-paper px-3 py-2.5 text-base text-ink min-h-11',
    'placeholder:text-slate',
    invalid ? 'border-[1.5px] border-alert' : 'border border-muted',
  ].join(' ');

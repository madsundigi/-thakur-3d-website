// Progress — 5 dots (aria-hidden) + "Step X of 5 — name" live text (07 §3 global, §9; skin 08 §4.19).
// Completed dots (before the current step) are tappable to go back; future dots are not.
import { DOT_LABELS } from '../../lib/booking';

interface Props {
  step: number; // 1–5, 6 = review
  onJump: (step: number) => void;
}

export default function ProgressDots({ step, onJump }: Props) {
  const text = step >= 6 ? 'Review — check & confirm' : `Step ${step} of 5 — ${DOT_LABELS[step - 1]}`;
  return (
    <div className="flex items-center justify-between gap-3">
      <ol className="m-0 flex list-none items-center gap-0 p-0" aria-hidden="true">
        {DOT_LABELS.map((label, i) => {
          const n = i + 1;
          const dot = <span className={`block h-2 w-2 rounded-pill ${n <= step ? 'bg-brand' : 'bg-line'}`} />;
          return (
            <li key={label} className="flex">
              {n < step ? (
                <button type="button" tabIndex={-1} title={label} onClick={() => onJump(n)}
                  className="flex h-6 w-6 cursor-pointer items-center justify-center">
                  {dot}
                </button>
              ) : (
                <span className="flex h-6 w-6 items-center justify-center">{dot}</span>
              )}
            </li>
          );
        })}
      </ol>
      <p className="m-0 text-sm text-slate" aria-live="polite" data-testid="progress-text">{text}</p>
    </div>
  );
}

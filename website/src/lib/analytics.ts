// Safe wrapper over the window.track helper defined in the base layout (09-ANALYTICS-TRACKING §3.3).
type Params = Record<string, string | number | boolean>;

export const track = (name: string, params?: Params): void => {
  if (typeof window !== 'undefined' && typeof (window as unknown as { track?: unknown }).track === 'function') {
    (window as unknown as { track: (n: string, p?: Params) => void }).track(name, params);
  }
};

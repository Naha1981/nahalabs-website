/**
 * Motion helpers. CSS handles transitions; these cover the JS scroll APIs,
 * which ignore `prefers-reduced-motion` unless told otherwise.
 */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const scrollBehavior = (): ScrollBehavior =>
  prefersReducedMotion() ? 'auto' : 'smooth';

import Lenis from 'lenis';

let lenis: Lenis | null = null;

/**
 * Site-wide Lenis smooth scrolling, client-only. In-page anchors route
 * through lenis.scrollTo so the motion stays consistent. Never inits under
 * prefers-reduced-motion.
 */
export function initLenis(): Lenis | null {
  if (lenis || typeof window === 'undefined') return lenis;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({ lerp: 0.11, smoothWheel: true });

  const raf = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  document.addEventListener('click', (event) => {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    const hash = anchor?.getAttribute('href');
    if (!hash || hash.length < 2) return;
    const target = document.querySelector(hash);
    if (!target) return;
    event.preventDefault();
    lenis?.scrollTo(target as HTMLElement, { offset: -76, duration: 1.4 });
  });

  return lenis;
}

import React, { useEffect, useRef } from 'react';

const INPUTS = ['Website', 'WhatsApp', 'ERP', 'CRM', 'Invoices', 'GPS'];
const OUTPUTS = ['Decisions', 'Alerts', 'Actions', 'Recovery'];

const EVIDENCE = [
  { tag: 'DealerSignal', body: '20 verified buyer & seller leads in one day', meta: 'Gauteng motor retail · 10 Oct 2026', featured: true },
  { tag: 'CargoIQ', body: 'Quote → Risk → Recovery', meta: 'Freight margin intelligence', featured: false },
  { tag: 'Flavourly', body: 'Demand → Prep → Margin', meta: 'Restaurant revenue intelligence', featured: false },
  { tag: 'RailWatch', body: 'Signal → Detection → Dispatch', meta: 'Infrastructure intelligence', featured: false },
];

/**
 * CinematicIntelligenceHero visual - "Intelligence Core" pattern from the
 * NahaLabs Auren/Jiro design study: real operational signals flow into a
 * central intelligence layer and return as decisions, alerts and actions.
 * Pure HTML/CSS/SVG (no WebGL), pauses off-screen, honours reduced motion.
 */
export const IntelligenceCore: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');

    // Pause all decorative animation while the hero is off-screen.
    const io = new IntersectionObserver(
      ([entry]) => root.classList.toggle('nh-core-paused', !entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(root);

    // Subtle pointer parallax on capable devices only.
    const onMove = (event: PointerEvent) => {
      if (reduced.matches || coarse.matches) return;
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      root.style.setProperty('--px', (x * 10).toFixed(2));
      root.style.setProperty('--py', (y * 8).toFixed(2));
    };
    const onLeave = () => {
      root.style.setProperty('--px', '0');
      root.style.setProperty('--py', '0');
    };
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);

    return () => {
      io.disconnect();
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="nh-core" ref={rootRef} role="img"
      aria-label="Diagram: business signals such as the website, WhatsApp, ERP, CRM, invoices and GPS flow into the NahaLabs engine and return as decisions, alerts, actions and recovery.">
      <div className="nh-core-stage">
        <svg className="nh-core-paths" viewBox="0 0 640 560" preserveAspectRatio="none" aria-hidden="true">
          {INPUTS.map((_, i) => (
            <path key={`in-${i}`} className="nh-core-path" style={{ animationDelay: `${i * 0.55}s` }}
              d={`M 96 ${88 + i * 76} C 200 ${88 + i * 76}, 220 280, 312 280`} />
          ))}
          {OUTPUTS.map((_, i) => (
            <path key={`out-${i}`} className="nh-core-path nh-core-path-out" style={{ animationDelay: `${i * 0.7}s` }}
              d={`M 332 280 C 420 280, 440 ${140 + i * 93}, 544 ${140 + i * 93}`} />
          ))}
        </svg>

        <div className="nh-core-col nh-core-inputs" aria-hidden="true">
          {INPUTS.map((s) => <span key={s}>{s}</span>)}
        </div>

        <div className="nh-core-engine" aria-hidden="true">
          <div className="nh-core-ring nh-core-ring-one" />
          <div className="nh-core-ring nh-core-ring-two" />
          <div className="nh-core-mark">N</div>
          <div className="nh-core-caption">NAHALABS ENGINE</div>
        </div>

        <div className="nh-core-col nh-core-outputs" aria-hidden="true">
          {OUTPUTS.map((s) => <span key={s}>{s}</span>)}
        </div>

        <div className="nh-core-orbit" aria-hidden="true">
          {EVIDENCE.map((card, i) => (
            <article key={card.tag} className={`nh-core-card nh-core-card-${i}${card.featured ? ' is-featured' : ''}`}>
              <p className="nh-core-card-tag">
                {card.featured && <span className="nh-core-featured-dot" />}
                {card.tag}
              </p>
              <p className="nh-core-card-body">{card.body}</p>
              <p className="nh-core-card-meta">{card.meta}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

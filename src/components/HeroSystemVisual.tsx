import React from 'react';

/**
 * The hero's dominant visual. Not a stock photo: an animated diagram that tells the
 * page's actual story in one glance — scattered operational friction (spreadsheets,
 * manual approvals, delayed quotes, inventory gaps) flowing into one engineered
 * system, and out the other side as the three outcomes the page promises below
 * (Find lost revenue / Remove operational friction / Turn data into action).
 *
 * Pure inline SVG + CSS (see index.css, "HERO SYSTEM VISUAL"). No canvas, no motion
 * library, no bundle cost. Fully static and legible with JavaScript and animation
 * both off; entrance and loop animation degrade to a single still frame under
 * `prefers-reduced-motion: reduce` (handled globally in index.css).
 */
const INPUTS = [
  { id: 'in1', x: 74, y: 96, label: 'Spreadsheets', path: 'M74,96 Q150,70 236,224' },
  { id: 'in2', x: 56, y: 202, label: 'Manual approvals', path: 'M56,202 Q140,196 220,238' },
  { id: 'in3', x: 62, y: 308, label: 'Delayed quotes', path: 'M62,308 Q140,300 222,266' },
  { id: 'in4', x: 88, y: 404, label: 'Inventory gaps', path: 'M88,404 Q160,370 238,278' },
];

const OUTPUTS = [
  { id: 'out1', x: 432, y: 146, label: 'Recovered revenue', path: 'M264,222 Q350,150 432,146' },
  { id: 'out2', x: 458, y: 250, label: 'Autonomous execution', path: 'M270,250 Q370,250 458,250' },
  { id: 'out3', x: 432, y: 354, label: 'Removed friction', path: 'M264,278 Q350,350 432,354' },
];

export const HeroSystemVisual: React.FC = () => {
  return (
    <figure className="hero-visual sys-diagram m-0 w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] rounded-sm ring-1 ring-line bg-surface relative overflow-hidden">
      <p className="sr-only">
        Diagram: scattered operational friction — spreadsheets, manual approvals, delayed quotes,
        inventory gaps — flowing into one engineered NahaLabs system, and out again as recovered
        revenue, autonomous execution and removed friction.
      </p>

      <svg
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className="sys-svg absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="sysGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-champagne)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--color-champagne)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sysMonogram" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5D1B0" />
            <stop offset="55%" stopColor="#C8AE82" />
            <stop offset="100%" stopColor="#9C8358" />
          </linearGradient>
        </defs>

        {/* Faint field, pure texture, no motion. */}
        <g className="sys-grid" stroke="var(--color-line)" strokeWidth="1">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`v${i}`} x1={30 + i * 55} y1="20" x2={30 + i * 55} y2="480" />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`h${i}`} x1="20" y1={30 + i * 55} x2="480" y2={30 + i * 55} />
          ))}
        </g>

        {/* Input side: thinner, dimmer, irregular timing — the friction being pulled in. */}
        <g className="sys-in">
          {INPUTS.map((n, i) => (
            <path
              key={n.id}
              d={n.path}
              pathLength={1}
              className="sys-line sys-line-in"
              style={{ '--sys-delay': `${i * 0.6}s`, '--sys-draw-delay': `${0.15 + i * 0.09}s` } as React.CSSProperties}
            />
          ))}
        </g>

        {/* Output side: steadier pace and full opacity — the ordered result. */}
        <g className="sys-out">
          {OUTPUTS.map((n, i) => (
            <path
              key={n.id}
              d={n.path}
              pathLength={1}
              className="sys-line sys-line-out"
              style={{ '--sys-delay': `${i * 0.7}s`, '--sys-draw-delay': `${0.75 + i * 0.09}s` } as React.CSSProperties}
            />
          ))}
        </g>

        {/* Core: the engineered system. */}
        <circle cx="250" cy="250" r="92" fill="url(#sysGlow)" className="sys-core-glow" />
        <circle cx="250" cy="250" r="44" className="sys-core-ring" fill="none" />
        <circle cx="250" cy="250" r="34" className="sys-core" fill="var(--color-canvas)" />
        {/* Positioning lives on this outer <g> (SVG `transform` attribute). The inner group is
            what the CSS entrance animation scales — a CSS `transform` on the same element as an
            SVG `transform` attribute replaces it instead of composing with it, which would throw
            the mark's position away the moment the animation starts. */}
        <g transform="translate(232,232)">
          <g className="sys-core-mark">
            <rect x="0" y="1" width="4.4" height="4.4" fill="url(#sysMonogram)" />
            <rect x="0" y="9" width="3.8" height="28.5" fill="url(#sysMonogram)" />
            <path d="M 1 12 L 26 37 L 21.8 37 L 1 16.4 Z" fill="url(#sysMonogram)" />
            <path d="M 4.4 9 L 29.5 34 L 29.5 29.6 L 8.7 9 Z" fill="url(#sysMonogram)" />
            <rect x="25.6" y="9" width="3.8" height="28.5" fill="url(#sysMonogram)" />
            <rect x="25.6" y="40.5" width="4.4" height="4.4" fill="url(#sysMonogram)" />
          </g>
        </g>

        {/* Input nodes */}
        {INPUTS.map((n, i) => (
          <g key={n.id} className="sys-node sys-node-in" style={{ '--sys-delay': `${0.1 + i * 0.09}s` } as React.CSSProperties}>
            <circle cx={n.x} cy={n.y} r="5.5" />
            <text x={n.x - 6} y={n.y - 14} textAnchor="start" className="sys-label sys-label-hide-mobile">
              {n.label}
            </text>
          </g>
        ))}

        {/* Output nodes */}
        {OUTPUTS.map((n, i) => (
          <g key={n.id} className="sys-node sys-node-out" style={{ '--sys-delay': `${0.85 + i * 0.09}s` } as React.CSSProperties}>
            <circle cx={n.x} cy={n.y} r="5.5" />
            <text
              x={n.x - 6}
              y={n.y - 14}
              textAnchor="end"
              className="sys-label sys-label-out sys-label-hide-mobile"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* Travelling pulses: motion-path with a static fallback position, never a broken state. */}
        {INPUTS.map((n, i) => (
          <circle
            key={`p-${n.id}`}
            r="3.4"
            className="sys-pulse sys-pulse-in"
            style={{ offsetPath: `path("${n.path}")`, '--sys-flow-delay': `${1.3 + i * 0.55}s` } as React.CSSProperties}
          />
        ))}
        {OUTPUTS.map((n, i) => (
          <circle
            key={`p-${n.id}`}
            r="3.4"
            className="sys-pulse sys-pulse-out"
            style={{ offsetPath: `path("${n.path}")`, '--sys-flow-delay': `${1.9 + i * 0.7}s` } as React.CSSProperties}
          />
        ))}
      </svg>

      <figcaption className="sys-caption absolute left-5 right-5 bottom-5 sm:left-7 sm:right-7 sm:bottom-7 flex items-baseline justify-between gap-4 text-caption text-fg-3">
        <span>Operational friction</span>
        <span className="text-accent">One engineered system</span>
      </figcaption>
    </figure>
  );
};

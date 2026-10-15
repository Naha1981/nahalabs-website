import React from "react";

export type VisualKind = 'netpulse' | 'fieldproof';

const NODES = [
  { x: 330, y: 70, flag: false },
  { x: 470, y: 120, flag: false },
  { x: 560, y: 210, flag: true },
  { x: 500, y: 330, flag: false },
  { x: 380, y: 380, flag: true },
  { x: 270, y: 300, flag: false },
  { x: 250, y: 160, flag: false },
];

const CHECKS = [
  { label: 'Units: feet vs metres', flag: true },
  { label: 'Duplicate readings', flag: false },
  { label: 'Datum recorded', flag: true },
  { label: 'Pump-test steps in order', flag: false },
  { label: 'Technician sign-off', flag: false },
];

/**
 * Animated, code-drawn visuals for showcase entries that have no photograph.
 * Pure SVG/CSS; animation is disabled for reduced motion in light-home.css.
 */
export const SystemVisual: React.FC<{ kind: VisualKind; label?: string }> = ({ kind, label }) => {
  if (kind === 'netpulse') {
    return (
      <div className="nh-viz nh-viz-netpulse" role="img" aria-label="Animated diagram: a spreadsheet is scanned and a network map highlights duplicate IP addresses. Illustrative, synthetic data.">
        <svg viewBox="0 0 640 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g className="nh-viz-sheet">
            {Array.from({ length: 9 }).map((_, r) => (
              <g key={r}>
                <rect x="30" y={60 + r * 36} width="150" height="24" rx="3" className={r === 3 || r === 6 ? 'nh-viz-row is-flag' : 'nh-viz-row'} />
                <rect x="38" y={68 + r * 36} width="60" height="8" rx="2" className="nh-viz-bar" />
                <rect x="106" y={68 + r * 36} width="64" height="8" rx="2" className="nh-viz-bar" />
              </g>
            ))}
            <rect x="24" y="52" width="162" height="3" className="nh-viz-scan" />
          </g>
          {NODES.map((n, i) => (
            <line key={`l${i}`} x1="400" y1="225" x2={n.x} y2={n.y} className="nh-viz-link" style={{ animationDelay: `${i * 0.4}s` }} />
          ))}
          <circle cx="400" cy="225" r="26" className="nh-viz-hub" />
          <circle cx="400" cy="225" r="26" className="nh-viz-hub-ring" />
          {NODES.map((n, i) => (
            <g key={`n${i}`}>
              <circle cx={n.x} cy={n.y} r="9" className={n.flag ? 'nh-viz-node is-flag' : 'nh-viz-node'} style={{ animationDelay: `${i * 0.3}s` }} />
              {n.flag && <circle cx={n.x} cy={n.y} r="9" className="nh-viz-alert" />}
            </g>
          ))}
          <text x="560" y="180" className="nh-viz-tag">DUPLICATE IP</text>
          <text x="380" y="412" className="nh-viz-tag">EXPIRED WARRANTY</text>
        </svg>
        <span className="nh-viz-label">{label ?? 'ILLUSTRATIVE · SYNTHETIC DATA'}</span>
      </div>
    );
  }

  return (
    <div className="nh-viz nh-viz-fieldproof" role="img" aria-label="Animated diagram: technician notes are scanned and each evidence check is ticked or flagged for review. Illustrative.">
      <svg viewBox="0 0 640 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect x="40" y="40" width="210" height="370" rx="6" className="nh-viz-page" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x="58" y={70 + i * 27} width={150 - ((i * 37) % 60)} height="8" rx="2" className="nh-viz-bar" />
        ))}
        <rect x="46" y="60" width="198" height="3" className="nh-viz-scan nh-viz-scan-v" />
        {CHECKS.map((c, i) => (
          <g key={c.label} className="nh-viz-check" style={{ animationDelay: `${0.8 + i * 0.9}s` }}>
            <rect x="310" y={70 + i * 62} width="290" height="46" rx="6" className={c.flag ? 'nh-viz-chip is-flag' : 'nh-viz-chip'} />
            <circle cx="336" cy={93 + i * 62} r="10" className={c.flag ? 'nh-viz-dot is-flag' : 'nh-viz-dot'} />
            <text x="336" y={98 + i * 62} textAnchor="middle" className="nh-viz-mark">{c.flag ? '!' : '\u2713'}</text>
            <text x="360" y={98 + i * 62} className="nh-viz-text">{c.label}</text>
          </g>
        ))}
        <path d="M250 225 C280 225 285 225 310 225" className="nh-viz-link" />
      </svg>
      <span className="nh-viz-label">{label ?? 'ILLUSTRATIVE · MADE-UP DATA'}</span>
    </div>
  );
};

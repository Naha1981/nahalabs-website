import React from 'react';
import { ASSETS } from '../data/assets';
import { Reveal } from './Reveal';

interface FeaturedSystemsProps {
  onSelectSystem: (systemName: string, problemDesc: string) => void;
}

const SYSTEMS = [
  {
    id: 'flavourly',
    name: 'FLAVOURLY', // passed to the enquiry form; keep stable
    displayName: 'Flavourly',
    category: 'Hospitality and food operations',
    headline: 'Recover revenue hidden inside restaurant demand.',
    description:
      'Predictive kitchen prep, automated ingredient replenishment, and real-time food cost margin tracking for high-volume multi-location dining.',
    image: ASSETS.flavourly,
    imageFallback: ASSETS.flavourlyJpg,
    alt: 'A busy restaurant dining room with an open kitchen, the setting for the Flavourly kitchen demand and margin system',
    outcomes: [
      'Dynamic demand-driven kitchen prep forecasting',
      'Automated supplier invoice reconciliation and stock leakage alerts',
      'Margin visibility down to the individual dish and location',
    ],
  },
  {
    id: 'cargoiq',
    name: 'CARGOiQ',
    displayName: 'CargoIQ',
    category: 'Freight forwarding and logistics',
    headline: 'Autonomous freight intelligence and quote margin protection.',
    description:
      'Instant multi-modal carrier rate validation, automated quote assembly, and proactive port demurrage risk mitigation across African trade corridors.',
    image: ASSETS.cargoiq,
    imageFallback: ASSETS.cargoiqJpg,
    alt: 'Container trucks and gantry cranes at a freight terminal, the setting for the CargoIQ rate validation and demurrage protection system',
    outcomes: [
      'Multi-carrier tariff comparison and sub-second client quote generation',
      'Autonomous port detention and demurrage penalty warning engine',
      'Quote assembly without manual spreadsheet handling',
    ],
  },
  {
    id: 'railwatch',
    name: 'RAILWATCH',
    displayName: 'RailWatch',
    category: 'Rail transit and corridor telemetry',
    headline: 'Autonomous corridor and heavy infrastructure intelligence.',
    description:
      'Continuous predictive track condition monitoring, automated incident dispatch, and digital corridor security surveillance across SADC rail networks.',
    image: ASSETS.railwatch,
    imageFallback: ASSETS.railwatchJpg,
    alt: 'Railway tracks and signal gantries at dusk, the setting for the RailWatch track condition and corridor monitoring system',
    outcomes: [
      'Real-time line telemetry and predictive defect detection',
      'Autonomous security incident dispatch and crew escalation',
      'Full audit trail from detection through to crew dispatch',
    ],
  },
  {
    id: 'enterprise',
    name: 'REVENUE OS',
    displayName: 'Revenue OS',
    category: 'Enterprise B2B and high-value sales',
    headline: 'High-velocity commercial pipeline and autonomous deal qualification.',
    description:
      'Instant inbound enterprise intent scoring, automated prospect data enrichment, and digital worker follow-up before buyer momentum fades.',
    image: ASSETS.enterpriseJhb,
    imageFallback: ASSETS.enterpriseJhbJpg,
    alt: 'Johannesburg office towers at dusk, the setting for the Revenue OS inbound intent and pipeline system',
    outcomes: [
      'Sub-second inbound enterprise enrichment and executive intent mapping',
      'Autonomous digital worker outreach active within 120 seconds of inquiry',
      'Continuous enrichment as new inbound signals arrive',
    ],
  },
];

export const FeaturedSystems: React.FC<FeaturedSystemsProps> = ({ onSelectSystem }) => {
  return (
    <section id="systems" data-tone="dark" className="section bg-canvas text-fg">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-6 items-end">
          <h2 className="lg:col-span-7 font-serif text-h1 font-medium">Systems we engineer.</h2>
          <p className="lg:col-span-4 lg:col-start-9 text-lead text-fg-2">
            We don't design conceptual prototypes or hypothetical slides. Here's the kind of system we
            build around high-stakes commercial friction.
          </p>
        </div>

        <div className="mt-14 sm:mt-20">
          {SYSTEMS.map((sys) => (
            <Reveal
              as="article"
              key={sys.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 py-12 lg:py-16 last:pb-0 border-t border-line"
            >
              <div id={`system-showcase-${sys.id}`} className="lg:col-span-5 scroll-mt-24">
                <picture>
                  <source srcSet={sys.image} type="image/webp" />
                  <img
                    src={sys.imageFallback}
                    alt={sys.alt}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={960}
                    className="w-full aspect-[4/3] object-cover rounded-sm ring-1 ring-line"
                  />
                </picture>
              </div>

              <div className="lg:col-span-7 flex flex-col">
                <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-small">
                  <span className="font-semibold text-fg">{sys.displayName}</span>
                  <span className="text-fg-3">{sys.category}</span>
                </p>

                <h3 className="mt-4 font-serif text-h2 font-medium max-w-[26ch]">{sys.headline}</h3>

                <p className="mt-5 text-body text-fg-2 max-w-[40rem]">{sys.description}</p>

                <ul className="rule-list mt-8 max-w-[40rem] text-small text-fg">
                  {sys.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => onSelectSystem(sys.name, sys.headline)}
                    className="link"
                  >
                    Tailor {sys.displayName} to your business
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

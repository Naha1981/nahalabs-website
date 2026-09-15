import React from 'react';
import { ArrowUpRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { ASSETS } from '../data/assets';

interface FeaturedSystemsProps {
  onSelectSystem: (systemName: string, problemDesc: string) => void;
}

export const FeaturedSystems: React.FC<FeaturedSystemsProps> = ({ onSelectSystem }) => {
  const systems = [
    {
      id: 'flavourly',
      name: 'FLAVOURLY',
      category: 'Hospitality & Food Operations',
      headline: 'Recover revenue hidden inside restaurant demand.',
      description: 'Predictive kitchen prep, automated ingredient replenishment, and real-time food cost margin tracking for high-volume multi-location dining.',
      image: ASSETS.flavourly,
      imageFallback: '/assets/images/flavourly_system_1789398600949_opt.jpg',
      alt: 'Flavourly Restaurant Kitchen Demand and Food Margin Intelligence System',
      outcomes: [
        'Dynamic demand-driven kitchen prep forecasting',
        'Automated supplier invoice reconciliation & stock leakage alerts',
        '+18% average operating margin uplift across active locations',
      ],
      badge: 'Revenue Recovery',
    },
    {
      id: 'cargoiq',
      name: 'CARGOiQ',
      category: 'Freight Forwarding & Global Logistics',
      headline: 'Autonomous freight intelligence and quote margin protection.',
      description: 'Instant multi-modal carrier rate validation, automated quote assembly, and proactive port demurrage risk mitigation across African trade corridors.',
      image: ASSETS.cargoiq,
      imageFallback: '/assets/images/cargoiq_system_1789398617043_opt.jpg',
      alt: 'CargoIQ Freight Forwarding Rate Validation and Demurrage Protection System',
      outcomes: [
        'Multi-carrier tariff comparison & sub-second client quote generation',
        'Autonomous port detention & demurrage penalty warning engine',
        '94% faster quote turnaround with zero human spreadsheet leakage',
      ],
      badge: 'Margin Protection',
    },
    {
      id: 'railwatch',
      name: 'RAILWATCH',
      category: 'Rail Transit & Corridor Telemetry',
      headline: 'Autonomous corridor and heavy infrastructure intelligence.',
      description: 'Continuous predictive track condition monitoring, automated incident dispatch, and digital corridor security surveillance across SADC rail networks.',
      image: ASSETS.railwatch,
      imageFallback: '/assets/images/railwatch_system_1789398646749_opt.jpg',
      alt: 'RailWatch Autonomous Railway Track Condition and Corridor Monitoring System',
      outcomes: [
        'Real-time line telemetry & predictive defect detection',
        'Autonomous security incident dispatch & crew escalation',
        '-62% incident response latency across heavy transit corridors',
      ],
      badge: 'Autonomous Telemetry',
    },
    {
      id: 'enterprise',
      name: 'REVENUE OS',
      category: 'Enterprise B2B & High-Value Sales',
      headline: 'High-velocity commercial pipeline and autonomous deal qualification.',
      description: 'Instant inbound enterprise intent scoring, automated prospect data enrichment, and digital worker follow-up before buyer momentum fades.',
      image: ASSETS.enterpriseJhb,
      imageFallback: '/assets/images/enterprise_jhb_1789398631359_opt.jpg',
      alt: 'NahaLabs Revenue OS Enterprise Inbound Intent and Pipeline System',
      outcomes: [
        'Sub-second inbound enterprise enrichment and executive intent mapping',
        'Autonomous digital worker outreach active within 120 seconds of inquiry',
        '+3.4x qualified enterprise pipeline generated in first 30 days',
      ],
      badge: 'Pipeline Acceleration',
    },
  ];

  return (
    <section id="systems" className="py-24 sm:py-36 bg-[#080909] border-b border-[#1c1d21] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#C8AE82] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8AE82]" />
            <span>Operational Proof</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F3F0EA] tracking-tight leading-[1.08]">
            Systems we’ve built.
          </h2>

          <p className="text-base sm:text-lg text-[#A5A29B] leading-relaxed max-w-2xl">
            We don't design conceptual prototypes or hypothetical slides. Here are production systems engineered around high-stakes commercial friction.
          </p>
        </div>

        {/* 4 Large Product Launch Cards */}
        <div className="space-y-16 lg:space-y-24">
          {systems.map((sys, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={sys.id}
                id={`system-showcase-${sys.id}`}
                className="rounded-3xl border border-[#202228] bg-gradient-to-b from-[#111215] to-[#090a0c] p-6 sm:p-10 lg:p-12 transition-all duration-300 hover:border-[#C8AE82]/50 shadow-2xl"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Left (or Right): Text & Outcomes */}
                  <div className={`lg:col-span-6 space-y-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-[#C8AE82]/10 border border-[#C8AE82]/30 text-[11px] font-mono tracking-wider text-[#C8AE82] uppercase">
                        {sys.badge}
                      </span>
                      <span className="text-xs font-mono text-[#777] uppercase tracking-widest">
                        {sys.category}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xs font-mono tracking-[0.25em] text-[#A5A29B] uppercase font-bold">
                        {sys.name}
                      </h3>
                      <h4 className="text-2xl sm:text-4xl font-extrabold text-[#F3F0EA] tracking-tight leading-snug">
                        {sys.headline}
                      </h4>
                    </div>

                    <p className="text-sm sm:text-base text-[#A5A29B] leading-relaxed">
                      {sys.description}
                    </p>

                    {/* Three Proof Points */}
                    <div className="space-y-3 pt-2">
                      {sys.outcomes.map((outcome, oIdx) => (
                        <div key={oIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#F3F0EA]">
                          <CheckCircle2 className="w-4 h-4 text-[#C8AE82] shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA to diagnose or deploy this system */}
                    <div className="pt-4">
                      <button
                        onClick={() => onSelectSystem(sys.name, sys.headline)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#18191d] hover:bg-[#C8AE82] text-[#F3F0EA] hover:text-[#080909] border border-[#2c2e36] hover:border-[#C8AE82] text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer active:scale-95 shadow-md"
                      >
                        <span>Deploy or tailor this system</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Large Product Visual */}
                  <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative rounded-2xl overflow-hidden border border-[#262830] bg-[#0c0d10] shadow-2xl group">
                      <img
                        src={sys.image}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== sys.imageFallback) {
                            target.src = sys.imageFallback;
                          }
                        }}
                        alt={sys.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto aspect-video lg:aspect-[4/3] object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080909]/80 via-transparent to-transparent pointer-events-none" />
                      
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#A5A29B] bg-[#080909]/80 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[#222]">
                        <span className="text-[#F3F0EA] font-semibold">{sys.name} SYSTEM CORE</span>
                        <span className="text-[#C8AE82]">IN PRODUCTION</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

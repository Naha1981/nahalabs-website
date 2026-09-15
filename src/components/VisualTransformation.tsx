import React, { useState } from 'react';
import { ArrowRight, AlertTriangle, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { ASSETS } from '../data/assets';

interface TransformationCase {
  id: string;
  domain: string;
  systemName: string;
  image: string;
  imageFallback: string;
  before: {
    label: string;
    metric: string;
    friction: string;
    tags: string[];
  };
  after: {
    label: string;
    metric: string;
    outcome: string;
    tags: string[];
  };
}

export const VisualTransformation: React.FC = () => {
  const cases: TransformationCase[] = [
    {
      id: 'cargoiq',
      domain: 'Freight Logistics',
      systemName: 'CARGOiQ',
      image: ASSETS.cargoiq,
      imageFallback: ASSETS.cargoiqJpg,
      before: {
        label: 'Manual Dispatch',
        metric: '24–48h Quote Turnaround',
        friction: 'Rates trapped in dispersed spreadsheets, carrier PDFs, and delayed WhatsApp threads.',
        tags: ['Manual Tariff Lookup', 'Delayed Responses', 'Demurrage Bleed'],
      },
      after: {
        label: 'Autonomous Intelligence',
        metric: '0.4s Automated Dispatch',
        outcome: 'Sub-second multi-carrier rate calculation, instant PDF quote generation, and demurrage warning engine.',
        tags: ['Real-Time Carrier APIs', 'Margin Protected', 'Sub-Second Turnaround'],
      },
    },
    {
      id: 'flavourly',
      domain: 'Hospitality & Kitchens',
      systemName: 'FLAVOURLY',
      image: ASSETS.flavourly,
      imageFallback: ASSETS.flavourlyJpg,
      before: {
        label: 'Estimates & Wastage',
        metric: '14% Ingredient Spoilage',
        friction: 'Chefs guessing prep volumes, supplier invoices reconciled manually at month-end.',
        tags: ['Guesswork Prep', 'Unnoticed Spoilage', 'Margin Leakage'],
      },
      after: {
        label: 'Predictive Kitchen OS',
        metric: '+18% Margin Recovery',
        outcome: 'Demand-driven daily prep schedules, automated vendor invoice reconciliation, and leakage alerts.',
        tags: ['Dynamic Forecasting', 'Zero Wastage Overprep', 'Audited Invoices'],
      },
    },
    {
      id: 'railwatch',
      domain: 'Heavy Infrastructure',
      systemName: 'RAILWATCH',
      image: ASSETS.railwatch,
      imageFallback: ASSETS.railwatchJpg,
      before: {
        label: 'Periodic Patrols',
        metric: 'Hours-long Incident Lag',
        friction: 'Defects discovered only during scheduled physical audits or following corridor derailments.',
        tags: ['Periodic Audits', 'Blind Spots', 'Expensive Downtime'],
      },
      after: {
        label: 'Continuous Telemetry',
        metric: 'Real-Time Anomaly Alerting',
        outcome: 'Continuous vibration and track telemetry with autonomous incident escalation to maintenance crews.',
        tags: ['24/7 Sensor Stream', 'Autonomous Escalation', '-62% Response Lag'],
      },
    },
    {
      id: 'revenue',
      domain: 'Commercial Enterprise',
      systemName: 'REVENUE OS',
      image: ASSETS.enterpriseJhb,
      imageFallback: ASSETS.enterpriseJhbJpg,
      before: {
        label: 'Stale Inbound Inboxes',
        metric: '2.5 Days First Contact',
        friction: 'High-value enterprise inquiries sit in unattended inboxes while prospect urgency wanes.',
        tags: ['Cold Lead Decay', 'Manual Data Scraping', 'Lost Momentum'],
      },
      after: {
        label: 'Autonomous Worker Pipeline',
        metric: '< 120s Intent Execution',
        outcome: 'Automated prospect intelligence enrichment, intent qualification, and personalized executive follow-up.',
        tags: ['Instant Intent Score', 'Autonomous Workers', '3.4x Conversion'],
      },
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(cases[0].id);
  const [viewMode, setViewMode] = useState<'after' | 'before' | 'split'>('after');

  const currentCase = cases.find((c) => c.id === activeTab) || cases[0];

  return (
    <section id="transformation" className="py-20 sm:py-32 bg-[#080909] border-b border-[#1c1d21] relative overflow-hidden">
      
      {/* Background Subtle Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-[90vw] h-[450px] bg-gradient-to-r from-[#C8AE82]/5 via-[#C8AE82]/10 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header — Centered on mobile, left-aligned or centered gracefully */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#C8AE82] uppercase mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8AE82]" />
            <span>Visual Proof</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F3F0EA] tracking-tight leading-[1.08] text-center">
            The before and after <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] via-[#E5D1B0] to-[#C8AE82]">
              transformation.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#A5A29B] leading-relaxed max-w-xl mx-auto text-center">
            How operational friction turns into autonomous execution across African commerce.
          </p>
        </div>

        {/* System Domain Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 max-w-4xl mx-auto">
          {cases.map((c) => {
            const isActive = c.id === activeTab;
            return (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#C8AE82] text-[#080909] font-bold border-[#C8AE82] shadow-lg shadow-[#C8AE82]/20'
                    : 'bg-[#121316] text-[#A5A29B] hover:text-[#F3F0EA] border-[#22242a] hover:border-[#383b44]'
                }`}
              >
                <span>{c.domain}</span>
                <span className={`text-[10px] opacity-70 uppercase ${isActive ? 'text-[#080909]' : 'text-[#C8AE82]'}`}>
                  {c.systemName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Transformation Mode Switcher (Before / After / Split) */}
        <div className="flex items-center justify-center mb-8">
          <div className="p-1 rounded-full bg-[#111215] border border-[#262830] flex items-center gap-1">
            <button
              onClick={() => setViewMode('before')}
              className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                viewMode === 'before'
                  ? 'bg-red-950 text-red-300 font-bold border border-red-700/60 shadow'
                  : 'text-[#888] hover:text-[#CCC]'
              }`}
            >
              Before (Friction)
            </button>
            <button
              onClick={() => setViewMode('after')}
              className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                viewMode === 'after'
                  ? 'bg-[#C8AE82] text-[#080909] font-bold shadow'
                  : 'text-[#888] hover:text-[#CCC]'
              }`}
            >
              After (NahaLabs OS)
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`hidden sm:inline-flex px-4 sm:px-5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-[#22242c] text-[#F3F0EA] font-bold border border-[#3c404d]'
                  : 'text-[#888] hover:text-[#CCC]'
              }`}
            >
              Side-by-Side
            </button>
          </div>
        </div>

        {/* High-Impact Visual Proof Container */}
        {viewMode === 'split' ? (
          /* Desktop Side-by-Side Comparison Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Left: The Before State */}
            <div className="rounded-3xl border border-[#2f1b1b] bg-gradient-to-b from-[#160e0e] to-[#0c0808] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-red-950/70 border border-red-800/50 text-[10px] font-mono tracking-widest text-red-400 uppercase">
                    BEFORE: CONVENTIONAL PROCESS
                  </span>
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>

                {/* Minimalist Graphic Simulation of Chaos */}
                <div className="relative h-48 sm:h-64 rounded-2xl border border-red-900/30 bg-[#120a0a] overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#ff000008_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                  <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 mb-3">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-red-200 tracking-tight mb-1">
                    {currentCase.before.metric}
                  </div>
                  <p className="text-xs text-red-300/80 max-w-sm">
                    {currentCase.before.friction}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentCase.before.tags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-[#201010] border border-red-900/40 text-[11px] font-mono text-red-300">
                      ✕ {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-red-950 text-xs font-mono text-red-400/80">
                Cost: Human bottlenecks and unmonitored margin bleed.
              </div>
            </div>

            {/* Right: The After State (Real Production Visual) */}
            <div className="rounded-3xl border border-[#C8AE82] bg-gradient-to-b from-[#14151a] to-[#090a0d] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden ring-1 ring-[#C8AE82]/50">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#C8AE82]/20 border border-[#C8AE82] text-[10px] font-mono tracking-widest text-[#E5D1B0] uppercase font-bold">
                    AFTER: NAHALABS {currentCase.systemName}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#C8AE82]" />
                </div>

                {/* High-Impact Visual Asset */}
                <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden border border-[#2d2f3b] bg-[#0c0d10] shadow-inner group">
                  <img
                    src={currentCase.image}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== currentCase.imageFallback) {
                        target.src = currentCase.imageFallback;
                      }
                    }}
                    alt={currentCase.systemName}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080909]/90 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-[#F3F0EA] bg-[#080909]/80 backdrop-blur-md px-3 py-2 rounded-lg border border-[#C8AE82]/30">
                    <span className="font-bold text-[#C8AE82]">{currentCase.after.metric}</span>
                    <span className="text-emerald-400 text-[10px] uppercase">Active Engine</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentCase.after.tags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-[#171922] border border-[#2f3240] text-[11px] font-mono text-[#E5D1B0] flex items-center gap-1">
                      <Check className="w-3 h-3 text-[#C8AE82]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#22242e] text-xs font-mono text-[#C8AE82]">
                Execution: Sub-second automation. Deterministic bottom-line impact.
              </div>
            </div>

          </div>
        ) : (
          /* High-Impact Single Visual Card with Toggle Switch (Before vs After) */
          <div className="max-w-4xl mx-auto rounded-3xl border border-[#262832] bg-gradient-to-b from-[#131418] to-[#090a0d] p-6 sm:p-10 shadow-2xl overflow-hidden relative">
            
            {viewMode === 'before' ? (
              /* Before View (Red accented minimal friction card) */
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-red-950/70 border border-red-800/50 text-[10px] font-mono tracking-widest text-red-400 uppercase">
                      BEFORE: CONVENTIONAL FRICTION
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#F3F0EA] mt-2">
                      {currentCase.before.label}
                    </h3>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className="text-2xl sm:text-3xl font-black text-red-400 font-mono">
                      {currentCase.before.metric}
                    </div>
                    <div className="text-xs text-[#888] font-mono">Operational Latency</div>
                  </div>
                </div>

                {/* Visual Representation of Friction State */}
                <div className="relative rounded-2xl border border-red-900/30 bg-[#140b0b] p-8 sm:p-12 text-center overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-red-950 border border-red-700/40 flex items-center justify-center text-red-400 mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <p className="text-base sm:text-lg text-red-200 max-w-md mx-auto mb-6">
                    "{currentCase.before.friction}"
                  </p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {currentCase.before.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-[#1c0d0d] border border-red-900/50 text-xs font-mono text-red-300">
                        ✕ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#221515] text-xs font-mono text-[#888]">
                  <span>Status: Vulnerable to human error & margin leakage</span>
                  <button
                    onClick={() => setViewMode('after')}
                    className="text-[#C8AE82] hover:text-[#E5D1B0] flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <span>View NahaLabs solution</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* After View (High-Impact Real Visual Production Asset) */
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-[#C8AE82]/20 border border-[#C8AE82] text-[10px] font-mono tracking-widest text-[#E5D1B0] uppercase font-bold">
                      AFTER: NAHALABS INTELLIGENT SYSTEM
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#F3F0EA] mt-2">
                      {currentCase.systemName} · {currentCase.after.label}
                    </h3>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className="text-2xl sm:text-3xl font-black text-[#C8AE82] font-mono">
                      {currentCase.after.metric}
                    </div>
                    <div className="text-xs text-[#888] font-mono">Autonomous Execution</div>
                  </div>
                </div>

                {/* High-Impact Production Visual Asset */}
                <div className="relative rounded-2xl overflow-hidden border border-[#2a2c38] bg-[#0c0d10] shadow-2xl group">
                  <img
                    src={currentCase.image}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== currentCase.imageFallback) {
                        target.src = currentCase.imageFallback;
                      }
                    }}
                    alt={currentCase.systemName}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto max-h-[460px] object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080909]/90 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-[#F3F0EA] bg-[#080909]/85 backdrop-blur-md px-4 py-3 rounded-xl border border-[#C8AE82]/40">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#C8AE82]" />
                      <span className="font-semibold">{currentCase.after.outcome}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#C8AE82] text-[#080909] font-bold text-[10px] uppercase shrink-0">
                      PROVEN METRIC
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
                  {currentCase.after.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-[#161820] border border-[#2a2d39] text-xs font-mono text-[#E5D1B0] flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#C8AE82]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};

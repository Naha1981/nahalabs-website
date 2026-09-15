import React from 'react';
import { ArrowRight, AlertTriangle, ShieldCheck, Cpu, Database, TrendingUp } from 'lucide-react';

export const VisualTransformation: React.FC = () => {
  return (
    <section className="py-24 sm:py-36 bg-[#080909] border-b border-[#1c1d21] relative overflow-hidden">
      
      {/* Background Subtle Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#C8AE82]/5 via-[#C8AE82]/10 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#C8AE82] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8AE82]" />
            <span>Workflow Transformation</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F3F0EA] tracking-tight leading-[1.08]">
            From operational drag <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] via-[#E5D1B0] to-[#C8AE82]">
              to automated precision.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#A5A29B] leading-relaxed">
            What happens when you replace manual spreadsheet handoffs and delayed human intervention with a custom NahaLabs intelligence system.
          </p>
        </div>

        {/* Dramatic 3-Column Architecture: Before → Intelligence Layer → After */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* 1. The Conventional Reality (Before) */}
          <div className="lg:col-span-4 rounded-3xl border border-[#2b1e1e] bg-gradient-to-b from-[#140e0e] to-[#0d0909] p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-[10px] font-mono tracking-widest text-red-400 uppercase">
                  CONVENTIONAL OPERATION
                </span>
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </div>

              <h3 className="text-2xl font-bold text-[#F3F0EA] tracking-tight">
                Fragmented & Reactive
              </h3>

              <div className="space-y-4 text-sm text-[#A5A29B]">
                <div className="p-3.5 rounded-xl bg-[#1c1212]/60 border border-red-900/30">
                  <div className="font-semibold text-red-300 mb-1">Scattered Spreadsheets</div>
                  <div className="text-xs text-[#8c8282]">Rates, inventory, and orders trapped in disparate Excel sheets and inbox threads.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1c1212]/60 border border-red-900/30">
                  <div className="font-semibold text-red-300 mb-1">Delayed Lead & Quote Response</div>
                  <div className="text-xs text-[#8c8282]">Turnaround takes 24–48 hours; high-value prospects choose faster competitors.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1c1212]/60 border border-red-900/30">
                  <div className="font-semibold text-red-300 mb-1">Unnoticed Margin Bleed</div>
                  <div className="text-xs text-[#8c8282]">Unbilled demurrage, kitchen wastage, and pricing errors erode gross profit silently.</div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-red-950 text-xs font-mono text-red-400/80">
              Outcome: Constant firefighting, expensive human bottlenecks.
            </div>
          </div>

          {/* 2. The NahaLabs Intelligence Layer (Centerpiece) */}
          <div className="lg:col-span-4 rounded-3xl border border-[#C8AE82] bg-gradient-to-b from-[#181920] to-[#0e0f13] p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative ring-1 ring-[#C8AE82]/50">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#C8AE82]/20 border border-[#C8AE82] text-[10px] font-mono tracking-widest text-[#E5D1B0] uppercase font-bold">
                  NAHALABS INTELLIGENCE LAYER
                </span>
                <Cpu className="w-5 h-5 text-[#C8AE82] animate-pulse" />
              </div>

              <h3 className="text-2xl font-bold text-[#F3F0EA] tracking-tight">
                Autonomous Decision Engine
              </h3>

              <div className="space-y-4 text-sm text-[#A5A29B]">
                <div className="p-3.5 rounded-xl bg-[#15161c] border border-[#2d2f3b]">
                  <div className="font-semibold text-[#F3F0EA] mb-1 flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-[#C8AE82]" />
                    <span>Real-Time Unified Ingestion</span>
                  </div>
                  <div className="text-xs text-[#A5A29B]">Normalizes carrier APIs, POS transaction streams, ERP records, and inbound inquiries.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#15161c] border border-[#2d2f3b]">
                  <div className="font-semibold text-[#F3F0EA] mb-1 flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-[#C8AE82]" />
                    <span>Deterministic Rules & AI Models</span>
                  </div>
                  <div className="text-xs text-[#A5A29B]">Calculates optimal tariff, flags invoice discrepancies, and drafts executive responses in milliseconds.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#15161c] border border-[#2d2f3b]">
                  <div className="font-semibold text-[#F3F0EA] mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C8AE82]" />
                    <span>Autonomous Digital Workers</span>
                  </div>
                  <div className="text-xs text-[#A5A29B]">Dispatches alerts, schedules follow-ups, and logs audit trails 24/7 without manual fatigue.</div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#262833] text-xs font-mono text-[#C8AE82]">
              Execution: Zero tech theatre. Pure deterministic automation.
            </div>
          </div>

          {/* 3. The Transformed Reality (After) */}
          <div className="lg:col-span-4 rounded-3xl border border-[#1e2a22] bg-gradient-to-b from-[#0c140f] to-[#080d0a] p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                  TRANSFORMED OPERATION
                </span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>

              <h3 className="text-2xl font-bold text-[#F3F0EA] tracking-tight">
                Deterministic & Profitable
              </h3>

              <div className="space-y-4 text-sm text-[#A5A29B]">
                <div className="p-3.5 rounded-xl bg-[#111c14]/60 border border-emerald-900/30">
                  <div className="font-semibold text-emerald-300 mb-1">Sub-Second Turnaround</div>
                  <div className="text-xs text-[#85998a]">Enterprise quotes and customer inquiries serviced in seconds, dramatically boosting close rates.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#111c14]/60 border border-emerald-900/30">
                  <div className="font-semibold text-emerald-300 mb-1">Protected Operating Margins</div>
                  <div className="text-xs text-[#85998a]">Automatic tariff auditing and inventory loss warnings prevent thousands in daily leakage.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#111c14]/60 border border-emerald-900/30">
                  <div className="font-semibold text-emerald-300 mb-1">Executive Clarity</div>
                  <div className="text-xs text-[#85998a]">Leadership views audited commercial indicators rather than outdated monthly reconciliations.</div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-emerald-950 text-xs font-mono text-emerald-400/80">
              Outcome: Scalable operating leverage, protected cash flow.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

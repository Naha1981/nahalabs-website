import React, { useState, useEffect, useRef } from 'react';
import { ACTION_SCENARIOS } from '../data/narrative';
import { Activity, ArrowRight, Play, CheckCircle2, ChevronRight, Zap, ArrowDown } from 'lucide-react';

export const IntelligenceInAction: React.FC = () => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const scenario = ACTION_SCENARIOS[activeScenarioIdx];

  const handleScenarioChange = (idx: number) => {
    setActiveScenarioIdx(idx);
    setActiveStepIdx(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate normalized scroll offset within view (-1 to 1)
        const progress = ((windowHeight - rect.top) / (windowHeight + rect.height)) * 2 - 1;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffsetA = Math.round(scrollProgress * 28);
  const parallaxOffsetB = Math.round(scrollProgress * -20);

  return (
    <section ref={sectionRef} id="action" className="py-24 sm:py-36 bg-[#080909] relative overflow-hidden">
      {/* Dynamic Ambient Glow with Parallax Motion */}
      <div
        className="absolute top-1/4 -right-40 w-96 h-96 bg-[#C8AE82]/5 rounded-full blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${parallaxOffsetA}px)` }}
      />
      <div
        className="absolute bottom-1/4 -left-40 w-96 h-96 bg-[#81B29A]/5 rounded-full blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${parallaxOffsetB}px)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151515] border border-[#262626] text-[11px] font-mono tracking-widest text-[#C8AE82] uppercase mb-4">
            <Activity className="w-3.5 h-3.5 text-[#C8AE82]" />
            <span>04 / LIVE PIPELINES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.1]">
            SEE INTELLIGENCE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] to-[#C8AE82]">
              IN ACTION.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A5A29B]">
            Real business operations in South Africa. Step inside an active NahaLabs intelligent pipeline to observe how raw signals transform into balance sheet revenue.
          </p>
        </div>

        {/* Scenario Selector Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {ACTION_SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => handleScenarioChange(idx)}
              className={`p-4 rounded-sm text-left transition-all border cursor-pointer ${
                activeScenarioIdx === idx
                  ? 'bg-[#161718] border-[#C8AE82] shadow-lg shadow-[#C8AE82]/10'
                  : 'bg-[#101112] border-[#222222] hover:border-[#333333]'
              }`}
            >
              <div className="text-[10px] font-mono tracking-widest text-[#C8AE82] uppercase mb-1">
                SCENARIO 0{idx + 1}
              </div>
              <div className="text-sm font-bold text-[#F3F0EA] truncate">
                {sc.industry}
              </div>
              <div className="text-xs font-mono text-[#A5A29B] mt-1 flex items-center gap-1">
                <span>{sc.systemRef}</span>
                <ChevronRight className="w-3 h-3 text-[#C8AE82]" />
              </div>
            </button>
          ))}
        </div>

        {/* The Interactive Pipeline Stage Viewer with Parallax Shift */}
        <div
          className="bg-[#121314] rounded-xl border border-[#262626] p-6 sm:p-10 shadow-2xl transition-transform duration-500 ease-out"
          style={{ transform: `translateY(${Math.round(scrollProgress * -8)}px)` }}
        >
          
          {/* Header of Active Pipeline */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#222222] gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#C8AE82] tracking-widest uppercase block mb-1">
                OPERATIONAL TRIGGER
              </span>
              <h3 className="text-lg sm:text-2xl font-bold text-[#F3F0EA]">
                "{scenario.trigger}"
              </h3>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto bg-[#181819] px-3.5 py-1.5 rounded border border-[#2a2a2a] text-xs font-mono text-[#C8AE82]">
              <span className="w-2 h-2 rounded-full bg-[#C8AE82] animate-ping" />
              <span>PIPELINE ENGINE: {scenario.systemRef}</span>
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-8">
            {scenario.steps.map((st, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStepIdx(idx)}
                className={`p-3.5 rounded border text-left transition-all ${
                  activeStepIdx === idx
                    ? 'bg-[#C8AE82]/15 border-[#C8AE82] text-white'
                    : 'bg-[#151516] border-[#262626] text-[#A5A29B] hover:text-[#F3F0EA]'
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-[10px] font-mono">
                  <span>STAGE 0{idx + 1}</span>
                  {activeStepIdx > idx ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C8AE82]" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#555]" />
                  )}
                </div>
                <div className="text-xs sm:text-sm font-bold tracking-wide uppercase">
                  {st.step}
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Deep-Dive Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0a0b0c] p-6 sm:p-8 rounded border border-[#222222]">
            
            <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-[#222222] pb-4 lg:pb-0 lg:pr-6">
              <span className="text-[10px] font-mono text-[#A5A29B] uppercase tracking-widest block">
                CURRENT SIGNAL
              </span>
              <h4 className="text-base sm:text-lg font-bold text-[#F3F0EA]">
                {scenario.steps[activeStepIdx].step}
              </h4>
              <div className="text-xs font-mono text-[#C8AE82] bg-[#18181a] p-2.5 rounded border border-[#2a2a2a]">
                ENGINE: {scenario.steps[activeStepIdx].engine}
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#A5A29B] uppercase tracking-widest block mb-1">
                  SYSTEM TELEMETRY
                </span>
                <p className="text-sm sm:text-base font-medium text-[#F3F0EA] leading-relaxed">
                  {scenario.steps[activeStepIdx].signal}
                </p>
              </div>

              <div className="p-4 rounded bg-[#161718] border-l-2 border-[#C8AE82] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#C8AE82] uppercase tracking-widest block mb-0.5">
                    DECISION OUTCOME
                  </span>
                  <p className="text-xs sm:text-sm text-[#F3F0EA]">
                    {scenario.steps[activeStepIdx].outcome}
                  </p>
                </div>
                <Zap className="w-5 h-5 text-[#C8AE82] shrink-0 ml-4" />
              </div>
            </div>

          </div>

          {/* Bottom Total Economic Impact */}
          <div className="mt-8 pt-6 border-t border-[#222222] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#C8AE82] tracking-widest uppercase block mb-1">
                MEASURABLE BUSINESS OUTCOME
              </span>
              <p className="text-sm sm:text-base font-bold text-[#F3F0EA]">
                {scenario.economicImpact}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveStepIdx((prev) => (prev + 1) % scenario.steps.length)}
                className="px-4 py-2 rounded-full border border-[#333] hover:border-[#C8AE82] bg-[#181819] text-xs font-mono text-[#F3F0EA] hover:text-[#C8AE82] transition-colors flex items-center gap-2"
              >
                <span>NEXT STAGE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

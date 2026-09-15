import React, { useState } from 'react';
import { CheckCircle2, FileSearch, Hammer, Rocket } from 'lucide-react';

interface ScrollMethodSectionProps {
  onStartDiagnosis?: () => void;
}

export const ScrollMethodSection: React.FC<ScrollMethodSectionProps> = ({ onStartDiagnosis }) => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      step: '01',
      title: 'Diagnosis',
      question: 'What is actually broken?',
      icon: FileSearch,
      timeline: '1–2 Weeks',
      badge: 'Fixed Scope · Zero Retainers',
      description: 'We audit the workflow, identify where value or time is lost, and define the exact intelligence system required. If automation or AI is the wrong solution, we tell you immediately.',
      deliverables: [
        'Root-cause process & bottleneck architecture audit',
        'Commercial feasibility and ROI projection report',
        'Detailed system specification & deployment blueprint',
      ],
      axiom: 'We only build what directly improves your operating margin.',
    },
    {
      step: '02',
      title: 'Prototype',
      question: 'What should the system do?',
      icon: Hammer,
      timeline: '2–3 Weeks',
      badge: 'Working Production Architecture',
      description: 'We engineer a working prototype integrated with your actual data streams, testing real-world accuracy, operator adoption, and commercial leverage before wide rollout.',
      deliverables: [
        'Functional prototype running on live/sampled company data',
        'Core model, rule engine, and integration testing',
        'Executive & operational usability validation',
      ],
      axiom: 'We demonstrate measurable execution before production deployment.',
    },
    {
      step: '03',
      title: 'Production',
      question: 'How do we put it into operation?',
      icon: Rocket,
      timeline: '3–6 Weeks',
      badge: 'Hardened Enterprise Deployment',
      description: 'We deploy the hardened system into your production infrastructure with comprehensive security, automated error handling, operator handover, and SLA guarantees.',
      deliverables: [
        'Containerized production deployment with security hardening',
        'Team operational handover & documentation',
        'Ongoing system maintenance, latency monitoring, and model optimization',
      ],
      axiom: 'The system runs autonomously, elevating your team rather than replacing their judgment.',
    },
  ];

  return (
    <section id="approach" className="py-20 sm:py-32 bg-[#0a0b0d] border-b border-[#1c1d21] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header — Centered on mobile, left-aligned on desktop */}
        <div className="max-w-3xl mb-14 sm:mb-20 space-y-4 text-center lg:text-left mx-auto lg:mx-0">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#C8AE82] uppercase mx-auto lg:mx-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8AE82]" />
            <span>The NahaLabs Method</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F3F0EA] tracking-tight leading-[1.08]">
            Diagnosis. Prototype. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] via-[#E5D1B0] to-[#C8AE82]">
              Production.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#A5A29B] leading-relaxed max-w-2xl mx-auto lg:mx-0">
            We don't do open-ended retainers or infinite consulting roadmaps. Every project executes in three disciplined, predictable stages.
          </p>
        </div>

        {/* 3 Interactive Horizontal Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 sm:mb-12">
          {stages.map((st, idx) => {
            const Icon = st.icon;
            const isActive = activeStage === idx;
            return (
              <button
                key={st.step}
                onClick={() => setActiveStage(idx)}
                className={`p-5 sm:p-6 rounded-2xl border text-center sm:text-left transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#15161b] border-[#C8AE82] shadow-xl shadow-[#C8AE82]/5 ring-1 ring-[#C8AE82]'
                    : 'bg-[#101114] border-[#22242a] hover:border-[#383b45]'
                }`}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="font-mono text-sm font-bold text-[#C8AE82]">
                    {st.step}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-[#C8AE82] text-[#080909]' : 'bg-[#1a1c22] text-[#A5A29B]'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#F3F0EA] mb-1">
                  {st.title}
                </h3>
                <p className="text-xs font-mono text-[#A5A29B]">
                  {st.question}
                </p>
              </button>
            );
          })}
        </div>

        {/* Stage In-Depth Architectural Card */}
        <div className="rounded-3xl border border-[#262830] bg-gradient-to-b from-[#141519] to-[#0c0d10] p-6 sm:p-10 lg:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#C8AE82] bg-[#1a1c24] px-3.5 py-1.5 rounded-full border border-[#2e313d] mx-auto lg:mx-0">
                {stages[activeStage].badge}
              </div>

              <div className="space-y-2 w-full">
                <div className="text-xs font-mono text-[#A5A29B] tracking-[0.2em] uppercase">
                  Stage {stages[activeStage].step} — {stages[activeStage].title}
                </div>
                <h4 className="text-2xl sm:text-4xl font-extrabold text-[#F3F0EA] tracking-tight">
                  {stages[activeStage].question}
                </h4>
              </div>

              <p className="text-base sm:text-lg text-[#A5A29B] leading-relaxed max-w-xl">
                {stages[activeStage].description}
              </p>

              <div className="space-y-3 pt-2 w-full">
                <div className="text-xs font-mono text-[#F3F0EA] tracking-wider uppercase">
                  Key Deliverables:
                </div>
                {stages[activeStage].deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start justify-center lg:justify-start gap-3 text-sm text-[#F3F0EA] text-left">
                    <CheckCircle2 className="w-4 h-4 text-[#C8AE82] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#0a0b0d] border border-[#22242c] text-xs font-mono text-[#C8AE82] italic w-full">
                "{stages[activeStage].axiom}"
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#0f1013] border border-[#22242a] text-center space-y-6 w-full">
              <div className="w-20 h-20 rounded-2xl bg-[#17181e] border border-[#2c2e38] flex items-center justify-center text-[#C8AE82] shadow-inner">
                {React.createElement(stages[activeStage].icon, { className: 'w-10 h-10' })}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-[#A5A29B] uppercase tracking-widest">
                  Ready to execute
                </div>
                <div className="text-xl font-bold text-[#F3F0EA]">
                  Start with a 45-minute technical diagnosis.
                </div>
                <p className="text-xs text-[#888] max-w-xs mx-auto">
                  We review your bottleneck, verify technical viability, and estimate return on investment before any commitments.
                </p>
              </div>

              {onStartDiagnosis && (
                <button
                  onClick={onStartDiagnosis}
                  className="w-full py-3.5 px-6 rounded-full bg-[#C8AE82] hover:bg-[#E5D1B0] text-[#080909] font-bold text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                >
                  Book Diagnosis
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

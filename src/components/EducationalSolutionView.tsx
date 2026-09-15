import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, ArrowUpRight, X } from 'lucide-react';
import { SolutionPathway } from '../types';
import { CASE_STUDIES } from '../data/caseStudies';
import { CaseStudyCarousel } from './CaseStudyCarousel';

interface EducationalSolutionViewProps {
  pathway: SolutionPathway;
  onClose?: () => void;
  onDiagnoseProblem: (systemName: string, problemLabel: string) => void;
}

export const EducationalSolutionView: React.FC<EducationalSolutionViewProps> = ({
  pathway,
  onClose,
  onDiagnoseProblem,
}) => {
  const pathwayCaseStudies = CASE_STUDIES.filter((cs) =>
    pathway.caseStudyIds.includes(cs.id)
  );

  return (
    <div className="bg-[#0c0d0f] border border-[#26282e] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
      {/* Top Banner & Header */}
      <div className="p-8 sm:p-10 lg:p-12 border-b border-[#1f2127] bg-gradient-to-br from-[#131519] via-[#0f1013] to-[#0c0d0f] relative">
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close educational view"
            className="absolute top-6 right-6 p-2 rounded-full border border-[#2a2c33] bg-[#16181d] text-[#A5A29B] hover:text-[#F3F0EA] hover:border-[#C8AE82] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C8AE82]/30 bg-[#C8AE82]/10 text-xs font-mono text-[#C8AE82] uppercase tracking-widest">
            <span>INTENT ARCHITECTURE</span>
            <span className="text-[#666]">/</span>
            <span>EDUCATIONAL GUIDE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F3F0EA] tracking-tight">
            {pathway.title}
          </h2>

          <p className="text-lg sm:text-xl text-[#C8AE82] font-serif italic max-w-2xl leading-relaxed">
            "{pathway.tagline}"
          </p>

          <p className="text-sm sm:text-base text-[#A5A29B] leading-relaxed max-w-3xl pt-2">
            {pathway.description}
          </p>
        </div>

        {/* What This Solves Examples Pill Grid */}
        <div className="mt-8 pt-6 border-t border-[#1e2025]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#777] block mb-3">
            Target Commercial Failures We Engineer Against:
          </span>
          <div className="flex flex-wrap gap-2">
            {pathway.examples.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#272930] bg-[#15171c] text-xs text-[#E5D1B0] font-mono"
              >
                <span className="w-1 h-1 rounded-full bg-[#C8AE82]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Systematic Approach Section */}
      <div className="p-8 sm:p-10 lg:p-12 border-b border-[#1f2127] bg-[#0e0f12]">
        <div className="max-w-4xl mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C8AE82]">
            The NahaLabs Methodology
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F3F0EA] mt-1">
            How We Systematically Engineer the Solution
          </h3>
          <p className="text-sm text-[#A5A29B] mt-2">
            We do not apply generic software wrappers. We trace the mechanical bottlenecks across your enterprise.
          </p>
        </div>

        {/* Step Progression Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pathway.approachSteps.map((s, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[#22242a] bg-[#121417] hover:border-[#C8AE82]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-mono font-bold text-[#C8AE82]">
                    {s.step}
                  </span>
                  <span className="text-[10px] font-mono text-[#666] uppercase tracking-wider">
                    Phase {idx + 1}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#F3F0EA] mb-2">
                  {s.label}
                </h4>
                <p className="text-xs sm:text-sm text-[#A5A29B] leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Deep Dive Points */}
      <div className="p-8 sm:p-10 lg:p-12 border-b border-[#1f2127] bg-[#111215]">
        <div className="max-w-4xl mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C8AE82]">
            Executive Briefing
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F3F0EA] mt-1">
            Core Realities Behind This Business Problem
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pathway.educationalPoints.map((point, pIdx) => (
            <div
              key={pIdx}
              className="p-6 rounded-xl border border-[#22242a] bg-[#14161a] flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#C8AE82]/10 border border-[#C8AE82]/30 flex items-center justify-center text-[#C8AE82] font-mono font-bold text-xs mb-4">
                  0{pIdx + 1}
                </div>
                <h4 className="text-base font-bold text-[#F3F0EA] mb-2">
                  {point.heading}
                </h4>
                <p className="text-xs sm:text-sm text-[#A5A29B] leading-relaxed">
                  {point.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence & Case Studies Section */}
      <div className="p-8 sm:p-10 lg:p-12 bg-[#0c0d0f]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C8AE82] uppercase tracking-widest mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C8AE82]" />
              <span>Evidence & Proof</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F3F0EA]">
              See How We Solve This in the Real World
            </h3>
            <p className="text-sm text-[#A5A29B] mt-1">
              Short, outcome-led case study carousels demonstrating how we turned this problem into an intelligent system.
            </p>
          </div>

          <button
            onClick={() => onDiagnoseProblem(pathway.title, pathway.tagline)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C8AE82] text-[#080909] font-bold text-xs uppercase tracking-wider hover:bg-[#E5D1B0] transition-colors cursor-pointer self-start sm:self-auto shadow-lg shadow-[#C8AE82]/10"
          >
            <span>Diagnose Your Business</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel Grid for this specific pathway */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pathwayCaseStudies.map((cs) => (
            <CaseStudyCarousel
              key={cs.id}
              caseStudy={cs}
              onDiagnoseProblem={onDiagnoseProblem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

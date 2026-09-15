import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { CaseStudyItem } from '../types';

interface CaseStudyCarouselProps {
  caseStudy: CaseStudyItem;
  onDiagnoseProblem: (systemName: string, problemLabel: string) => void;
}

export const CaseStudyCarousel: React.FC<CaseStudyCarouselProps> = ({
  caseStudy,
  onDiagnoseProblem,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const totalSlides = caseStudy.slides.length;
  const currentSlide = caseStudy.slides[currentSlideIndex];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'The Situation':
        return 'text-[#A5A29B] border-[#333]';
      case 'The Problem':
        return 'text-[#E07A5F] border-[#E07A5F]/40';
      case 'The NahaLabs Solution':
        return 'text-[#C8AE82] border-[#C8AE82]/50';
      case 'The Business Outcome':
        return 'text-[#81B29A] border-[#81B29A]/50';
      case 'The Bigger Idea':
        return 'text-[#F3F0EA] border-[#C8AE82]';
      default:
        return 'text-[#C8AE82] border-[#C8AE82]/40';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#111215] border border-[#23252a] hover:border-[#383a42] rounded-xl overflow-hidden transition-all duration-300 shadow-xl">
      {/* Top Header Card Info */}
      <div className="p-6 border-b border-[#1f2126] bg-[#14161a] flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-[#C8AE82] bg-[#C8AE82]/10 px-2 py-0.5 rounded border border-[#C8AE82]/20">
              {caseStudy.number}
            </span>
            <span className="text-xs font-mono tracking-widest text-[#A5A29B] uppercase">
              {caseStudy.subCategoryTag}
            </span>
          </div>

          {/* Proof Badge: Verified Case Study vs Case Study Concept */}
          {caseStudy.isConcept ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-[#262118] text-[#E5D1B0] border border-[#C8AE82]/30">
              <AlertCircle className="w-3 h-3 text-[#C8AE82]" />
              <span>CONCEPT & PILOT</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-[#15231c] text-[#81B29A] border border-[#81B29A]/30">
              <ShieldCheck className="w-3 h-3 text-[#81B29A]" />
              <span>CASE STUDY</span>
            </span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#F3F0EA] tracking-tight">
            {caseStudy.systemName}
          </h3>
          <p className="text-sm text-[#C8AE82] italic mt-1 font-serif">
            "{caseStudy.headline}"
          </p>
        </div>
      </div>

      {/* Slide Viewport Area */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between min-h-[260px] bg-gradient-to-b from-[#111215] to-[#0c0d0e]">
        <div>
          {/* Current Stage Indicator */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className={`text-[11px] font-mono uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded border ${getStageColor(currentSlide.stageName)} bg-[#16181d]`}>
              Slide {currentSlide.slideNumber} — {currentSlide.stageName}
            </span>
            <span className="text-xs font-mono text-[#666]">
              {currentSlideIndex + 1} of {totalSlides}
            </span>
          </div>

          {/* Slide Content Lines */}
          <div className="space-y-3 pt-2 text-[#D3CFCA] text-sm sm:text-base leading-relaxed">
            {currentSlide.content.map((paragraph, idx) => (
              <p key={idx} className="font-sans">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Highlight Callout */}
          {currentSlide.highlight && (
            <div className="mt-4 pt-3 border-t border-[#1f2126] flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C8AE82] flex-shrink-0 mt-0.5" />
              <p className="text-xs font-mono text-[#C8AE82]/90 leading-normal">
                {currentSlide.highlight}
              </p>
            </div>
          )}
        </div>

        {/* Slide Controls & Action Footer */}
        <div className="pt-6 mt-6 border-t border-[#1c1e22] flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Slide Dots / Progress Indicator */}
          <div className="flex items-center gap-1.5">
            {caseStudy.slides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentSlideIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dotIdx === currentSlideIndex
                    ? 'w-6 bg-[#C8AE82]'
                    : 'w-2 bg-[#2d3036] hover:bg-[#444852]'
                }`}
              />
            ))}
          </div>

          {/* Carousel Arrows & Action Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="w-10 h-10 sm:w-8 sm:h-8 rounded border border-[#2a2c32] bg-[#16181d] text-[#A5A29B] hover:text-[#F3F0EA] hover:border-[#C8AE82] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="w-10 h-10 sm:w-8 sm:h-8 rounded border border-[#2a2c32] bg-[#16181d] text-[#A5A29B] hover:text-[#F3F0EA] hover:border-[#C8AE82] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
              </button>
            </div>

            <button
              onClick={() => onDiagnoseProblem(caseStudy.systemName, caseStudy.businessProblemLabel)}
              className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-3 sm:py-1.5 min-h-[40px] sm:min-h-0 rounded bg-[#1c1e23] hover:bg-[#C8AE82] hover:text-[#080909] text-xs font-mono text-[#F3F0EA] border border-[#2d3037] hover:border-[#C8AE82] transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>Solve this</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

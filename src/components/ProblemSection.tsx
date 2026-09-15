import React from 'react';
import { PROBLEM_QUESTIONS } from '../data/narrative';
import { AlertCircle, HelpCircle } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-36 bg-[#080909] border-b border-[#181818] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151515] border border-[#262626] text-[11px] font-mono tracking-widest text-[#C8AE82] uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#C8AE82]" />
            <span>08 / DIAGNOSTIC DISCOVERY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.1]">
            WE DON’T START <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] to-[#C8AE82]">
              WITH TECHNOLOGY.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A5A29B] max-w-2xl">
            We interrogate the actual balance sheet and daily operating machinery before recommending a single algorithmic framework.
          </p>
        </div>

        {/* The 7 High-Stakes Operational Questions */}
        <div className="space-y-4">
          {PROBLEM_QUESTIONS.map((q, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-sm bg-[#0e0f11] border border-[#1f2022] hover:border-[#C8AE82]/50 transition-all duration-300 flex items-start sm:items-center justify-between gap-6 group"
            >
              <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                <span className="font-mono text-xs sm:text-sm text-[#C8AE82] tracking-widest pt-1 sm:pt-0">
                  0{idx + 1}
                </span>
                <p className="text-lg sm:text-2xl md:text-3xl font-bold text-[#A5A29B] group-hover:text-[#F3F0EA] transition-colors leading-snug">
                  {q}
                </p>
              </div>

              <span className="text-[11px] font-mono text-[#555] group-hover:text-[#C8AE82] transition-colors uppercase whitespace-nowrap hidden md:block">
                DIAGNOSE →
              </span>
            </div>
          ))}
        </div>

        {/* Final Statement */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-sm bg-[#121315] border-l-4 border-[#C8AE82] border-y border-r border-[#262626]">
          <span className="text-[10px] font-mono text-[#C8AE82] tracking-[0.25em] uppercase block mb-2">
            THE NAHALABS AXIOM
          </span>
          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#F3F0EA] tracking-tight">
            FIND THE PROBLEM. ENGINEER THE SYSTEM.
          </h3>
          <p className="mt-3 text-sm sm:text-base text-[#A5A29B] max-w-xl">
            Zero technology theatre. Pure commercial clarity backed by robust software execution.
          </p>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { LAB_TOPICS } from '../data/narrative';
import { FlaskConical, Radio, ArrowUpRight, Terminal } from 'lucide-react';

export const LabSection: React.FC = () => {
  return (
    <section id="lab" className="py-24 sm:py-36 bg-[#080909] border-b border-[#181818] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151515] border border-[#262626] text-[11px] font-mono tracking-widest text-[#C8AE82] uppercase mb-4">
              <FlaskConical className="w-3.5 h-3.5 text-[#C8AE82]" />
              <span>10 / EXPERIMENTAL & APPLIED RESEARCH</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.1]">
              NAHALABS LAB.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#A5A29B] leading-relaxed">
            Some ideas become products. Some become infrastructure. Some teach us what is possible.
          </p>
        </div>

        {/* 6 Experimental Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAB_TOPICS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-sm bg-[#101113] border border-[#202124] hover:border-[#C8AE82]/50 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#1c1d20] pb-3 mb-4">
                  <span className="text-[10px] font-mono text-[#A5A29B]">
                    LAB_SPEC // 0{idx + 1}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#18191b] border border-[#2c2d30] text-[9px] font-mono text-[#C8AE82] uppercase">
                    {item.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#F3F0EA] tracking-tight group-hover:text-white transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#A5A29B] leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#18191a] flex items-center justify-between text-[11px] font-mono text-[#666] group-hover:text-[#C8AE82] transition-colors">
                <span>INSPECTION READY</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Lab Experimental Note */}
        <div className="mt-12 p-6 rounded-sm bg-[#121315] border border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A5A29B]">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#C8AE82] animate-pulse" />
            <span>Open research and engineering notes are maintained on the NahaLabs technical repository.</span>
          </div>
          <span className="text-[#C8AE82] uppercase tracking-wider">
            BUILDING IN JOHANNESBURG FOR AFRICA
          </span>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { GENERAL_INTELLIGENCE_ITEMS } from '../data/narrative';
import { CheckCircle, ArrowUpRight, Sparkles, Building2 } from 'lucide-react';

interface GeneralIntelligenceProps {
  onConsult: () => void;
}

export const GeneralIntelligence: React.FC<GeneralIntelligenceProps> = ({ onConsult }) => {
  return (
    <section className="py-24 sm:py-32 bg-[#080909] border-b border-[#181818] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151515] border border-[#262626] text-[11px] font-mono tracking-widest text-[#C8AE82] uppercase mb-4">
              <Building2 className="w-3.5 h-3.5 text-[#C8AE82]" />
              <span>06 / GROWING ENTERPRISE & SME TIER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.1]">
              INTELLIGENCE FOR THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] to-[#C8AE82]">
                EVERYDAY BUSINESS.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#A5A29B]">
              Practical intelligent systems for growing businesses across Johannesburg, Soweto, and Southern Africa.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-[#151516] border border-[#2e2e2e] text-[11px] font-mono text-[#C8AE82] uppercase tracking-wider">
              PRODUCTISED SYSTEMS · PRACTICAL · MONTHLY
            </span>
            <span className="text-xs font-mono text-[#777]">
              DEPLOYMENT TIMEFRAME: 14 TO 21 DAYS
            </span>
          </div>
        </div>

        {/* 9 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GENERAL_INTELLIGENCE_ITEMS.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-sm bg-[#111213] border border-[#222222] hover:border-[#C8AE82]/60 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-[#A5A29B]">
                    0{idx + 1} // CAPABILITY
                  </span>
                  <CheckCircle className="w-4 h-4 text-[#C8AE82]/60 group-hover:text-[#C8AE82] transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#F3F0EA] group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-[#A5A29B] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1a1a1a] flex items-center justify-between text-[11px] font-mono text-[#777] group-hover:text-[#C8AE82] transition-colors">
                <span>PRODUCTION READY</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-sm bg-[#141517] border border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-[#F3F0EA]">
              Ready to deploy practical intelligence into your business operations?
            </h4>
            <p className="text-xs sm:text-sm text-[#A5A29B] mt-1">
              Start with a diagnostic consultation to pinpoint the highest ROI opportunity.
            </p>
          </div>
          <button
            onClick={onConsult}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#C8AE82] text-[#080909] font-bold text-xs tracking-wider uppercase hover:bg-[#E5D1B0] transition-colors whitespace-nowrap"
          >
            Explore General Intelligence
          </button>
        </div>

      </div>
    </section>
  );
};

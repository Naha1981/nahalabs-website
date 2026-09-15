import React from 'react';
import { MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

interface AboutStudioSectionProps {
  onStartConversation?: () => void;
}

export const AboutStudioSection: React.FC<AboutStudioSectionProps> = ({ onStartConversation }) => {
  return (
    <section id="about" className="py-20 sm:py-32 bg-[#0a0b0d] border-b border-[#1c1d21] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Short, High-Conviction Story — Centered on mobile, left-aligned on desktop */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#C8AE82] uppercase mx-auto lg:mx-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8AE82]" />
              <span>About NahaLabs</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F3F0EA] tracking-tight leading-[1.08]">
              High-conviction engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] via-[#E5D1B0] to-[#C8AE82]">
                from Johannesburg.
              </span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#A5A29B] leading-relaxed max-w-2xl">
              <p className="text-lg sm:text-xl font-medium text-[#F3F0EA]">
                NahaLabs was founded by Thabiso Naha on a straightforward observation: modern enterprises are inundated with software licenses and AI hype, yet their most critical operational bottlenecks remain entirely manual.
              </p>

              <p>
                We don't build generic web apps or bill endless consulting hours. We identify expensive commercial friction—unbilled freight detention, kitchen food waste, delayed enterprise sales quotes—and engineer bespoke intelligent systems that eliminate it permanently.
              </p>

              <p>
                Headquartered in Johannesburg and serving clients across Gauteng, South Africa, Lesotho, and the wider continent, we build systems designed to operate under real-world commercial conditions.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 border-t border-[#20222a] text-xs font-mono text-[#A5A29B] w-full">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C8AE82]" />
                <span>JOHANNESBURG & GAUTENG</span>
              </div>
              <span className="text-[#333]">·</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C8AE82]" />
                <span>NO SUBSCRIPTION FLUFF</span>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Studio Anchor Box */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-3xl border border-[#262830] bg-gradient-to-b from-[#141519] to-[#0c0d10] p-6 sm:p-10 shadow-2xl space-y-6 max-w-md mx-auto lg:max-w-none">
              
              <div className="flex items-center justify-between pb-6 border-b border-[#22242a]">
                <div>
                  <div className="text-xl font-bold text-[#F3F0EA]">Thabiso Naha</div>
                  <div className="text-xs font-mono text-[#C8AE82] tracking-wider uppercase">Founder & Systems Architect</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#1c1d24] border border-[#30333e] flex items-center justify-center font-mono font-bold text-xs text-[#C8AE82]">
                  TN
                </div>
              </div>

              <div className="space-y-3 text-xs font-mono text-[#A5A29B] leading-relaxed">
                <div className="flex items-center gap-2 text-[#F3F0EA]">
                  <span className="text-[#C8AE82]">✦</span>
                  <span>Direct founder-led technical engagement</span>
                </div>
                <div className="flex items-center gap-2 text-[#F3F0EA]">
                  <span className="text-[#C8AE82]">✦</span>
                  <span>Production-first delivery in 3–6 weeks</span>
                </div>
                <div className="flex items-center gap-2 text-[#F3F0EA]">
                  <span className="text-[#C8AE82]">✦</span>
                  <span>Tied directly to measurable bottom-line metrics</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#090a0c] border border-[#202228] text-xs text-[#A5A29B]">
                "Our reputation is built on whether our systems actually save our clients money or make them more efficient. Everything else is secondary."
              </div>

              {onStartConversation && (
                <button
                  onClick={onStartConversation}
                  className="w-full py-3.5 px-6 rounded-full border border-[#2d2f38] hover:border-[#C8AE82] bg-[#15161b] hover:bg-[#1a1b22] text-[#F3F0EA] font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-between transition-all duration-200 cursor-pointer shadow-md"
                >
                  <span>Discuss an opportunity</span>
                  <ArrowRight className="w-4 h-4 text-[#C8AE82]" />
                </button>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

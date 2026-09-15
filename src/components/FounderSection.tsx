import React from 'react';
import { FOUNDER_INFO } from '../data/narrative';
import { Terminal, Shield, User, Camera } from 'lucide-react';

export const FounderSection: React.FC = () => {
  return (
    <section id="founder" className="py-24 sm:py-36 bg-[#0a0b0c] border-b border-[#181818] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151515] border border-[#262626] text-[11px] font-mono tracking-widest text-[#C8AE82] uppercase mb-4">
            <User className="w-3.5 h-3.5 text-[#C8AE82]" />
            <span>11 / FOUNDING ARCHITECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.1]">
            BUILT BY SOMEONE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] to-[#C8AE82]">
              OBSESSED WITH USEFUL INTELLIGENCE.
            </span>
          </h2>
        </div>

        {/* Founder Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Biography & Approach */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Name & Role */}
            <div className="border-b border-[#222222] pb-5">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F3F0EA]">
                {FOUNDER_INFO.name}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#C8AE82] tracking-widest uppercase mt-1">
                {FOUNDER_INFO.role}
              </p>
            </div>

            {/* Structured Strict Biography */}
            <div className="space-y-4 text-sm sm:text-base text-[#A5A29B] leading-relaxed">
              <p className="text-lg sm:text-xl font-semibold text-[#F3F0EA]">
                {FOUNDER_INFO.bio[0]}
              </p>
              
              <div className="p-3 rounded bg-[#121314] border border-[#222] font-mono text-xs text-[#C8AE82]">
                {FOUNDER_INFO.bio[1]}
              </div>

              <p>
                {FOUNDER_INFO.bio[2]}
              </p>

              <p>
                {FOUNDER_INFO.bio[3]}
              </p>

              {/* Approach Box */}
              <div className="p-5 rounded-sm bg-[#141517] border-l-2 border-[#C8AE82] border-y border-r border-[#262626] my-4">
                <div className="text-[10px] font-mono text-[#C8AE82] tracking-widest uppercase mb-2">
                  THE APPROACH
                </div>
                <div className="font-mono text-xs text-[#F3F0EA] space-y-1">
                  <div>• Diagnose the problem.</div>
                  <div>• Find the opportunity.</div>
                  <div>• Engineer the system.</div>
                  <div>• Put it into production.</div>
                  <div>• Measure whether it created value.</div>
                </div>
              </div>

              <p>
                {FOUNDER_INFO.bio[5]}
              </p>
            </div>

            {/* Regional Integrity Note */}
            <div className="pt-4 border-t border-[#222222] flex items-center gap-3 text-xs font-mono text-[#777]">
              <span className="w-2 h-2 rounded-full bg-[#C8AE82]" />
              <span>HEADQUARTERED IN JOHANNESBURG · BUILDING FOR SOUTH AFRICA & LESOTHO</span>
            </div>
          </div>

          {/* Right Column: Founder Image Placeholder (Strictly respecting Section 4 & 29) */}
          <div className="lg:col-span-5">
            <div 
              id="founder-image-slot"
              className="relative aspect-[3/4] w-full max-w-[420px] mx-auto rounded-sm bg-[#121314] border-2 border-dashed border-[#333333] hover:border-[#C8AE82]/60 transition-colors flex flex-col items-center justify-center p-8 text-center group overflow-hidden shadow-2xl"
              aria-label="Founder Image Placeholder for Thabiso Naha"
            >
              {/* Subtle background mesh */}
              <div className="absolute inset-0 bg-[radial-gradient(#C8AE82_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

              {/* Placeholder Content */}
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#18191b] border border-[#2e2f32] flex items-center justify-center text-[#C8AE82] group-hover:scale-105 transition-transform">
                  <Camera className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono tracking-widest text-[#C8AE82] uppercase">
                    FOUNDER PORTRAIT SLOT
                  </div>
                  <h4 className="text-base font-bold text-[#F3F0EA]">
                    Thabiso Naha
                  </h4>
                  <p className="text-xs text-[#A5A29B] max-w-[240px]">
                    Founder & Intelligent Systems Engineer
                  </p>
                </div>

                <div className="pt-4 border-t border-[#222222] w-full">
                  <p className="text-[11px] font-mono text-[#666] leading-relaxed">
                    [ RESERVED FOR CANONICAL FOUNDER PHOTO ]
                  </p>
                  <span className="inline-block mt-2 px-2.5 py-1 rounded bg-[#18181a] border border-[#2a2a2a] text-[10px] font-mono text-[#A5A29B]">
                    3:4 Portrait Ratio · Enterprise Dark Grade
                  </span>
                </div>
              </div>

              {/* Corner brackets for architectural styling */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#C8AE82]/50" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#C8AE82]/50" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#C8AE82]/50" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#C8AE82]/50" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

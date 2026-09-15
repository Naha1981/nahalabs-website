import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ASSETS } from '../data/assets';

interface HeroProps {
  onExploreSystems: () => void;
  onStartConversation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreSystems, onStartConversation }) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center pt-28 pb-16 lg:py-32 overflow-hidden bg-[#080909]"
    >
      {/* Subtle ambient lighting behind hero */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#C8AE82]/10 via-[#C8AE82]/3 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Focused Editorial Headline & Two CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6 sm:space-y-8">
            
            {/* Subtle Brand Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#C8AE82] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8AE82]" />
              <span>NahaLabs · Intelligent Systems</span>
            </div>

            {/* Huge Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.06]">
              We engineer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] via-[#E5D1B0] to-[#C8AE82]">
                intelligent systems
              </span> <br />
              for businesses that have something worth fixing.
            </h1>

            {/* One Sharp Supporting Sentence */}
            <p className="text-base sm:text-xl text-[#A5A29B] font-normal leading-relaxed max-w-xl">
              Turning operational friction, invisible revenue leaks, and fragmented spreadsheets into autonomous, measurable commercial advantage.
            </p>

            {/* Two Direct CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={onExploreSystems}
                id="hero-explore-cta"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#C8AE82] text-[#080909] font-bold text-xs font-mono tracking-wider uppercase hover:bg-[#E5D1B0] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg shadow-[#C8AE82]/15"
              >
                <span>Explore our systems</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onStartConversation}
                id="hero-conversation-cta"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-[#2b2d35] bg-[#121316] text-[#F3F0EA] font-semibold text-xs font-mono tracking-wider uppercase hover:border-[#C8AE82] hover:bg-[#181a20] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>Start a conversation</span>
                <ArrowUpRight className="w-4 h-4 text-[#C8AE82]" />
              </button>
            </div>
          </div>

          {/* Right Column: Spectacular Product/System Visual */}
          <div className="lg:col-span-6 relative flex items-center justify-center w-full">
            
            {/* Ambient backlight */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#C8AE82]/20 to-transparent blur-3xl rounded-full scale-95 pointer-events-none" />

            <div className="relative w-full max-w-md lg:max-w-[520px] rounded-2xl overflow-hidden border border-[#22242a] bg-[#111215] shadow-2xl group mx-auto">
              <img
                src={ASSETS.hero}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== ASSETS.heroJpg) {
                    target.src = '/assets/images/nahalabs_hero_1789398573439.jpg';
                  }
                }}
                alt="NahaLabs Industrial Business Intelligence Cylinder over South African Landscape"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width={1280}
                height={1280}
                className="w-full h-auto aspect-square object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Minimal aesthetic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080909]/90 via-transparent to-transparent pointer-events-none" />

              {/* Discreet caption */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#A5A29B] bg-[#0c0d10]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#262830]">
                <span className="text-[#F3F0EA] font-semibold">Business Intelligence Fuel</span>
                <span className="text-[#C8AE82]">Autonomous Operations</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

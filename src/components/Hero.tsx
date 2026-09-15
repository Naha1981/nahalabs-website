import React from 'react';
import { ArrowRight, ArrowDownRight, Compass, ShieldCheck } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onExploreSystems: () => void;
  onBringProblem: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreSystems, onBringProblem }) => {
  const { lang, t } = useLanguage();

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#080909]"
    >
      {/* Background Architectural Grid & Subtle Radial Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full bg-[radial-gradient(#C8AE82_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#C8AE82]/5 blur-[160px] rounded-full pointer-events-none" />
      </div>

      {/* Top Meta Indicator Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 sm:pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#222222]/80 pb-4 text-[11px] font-mono tracking-widest text-[#A5A29B]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8AE82] animate-pulse" />
            <span className="text-[#C8AE82]">SYSTEMS ACTIVE</span>
            <span className="text-[#333]">|</span>
            <span>JOHANNESBURG · GAUTENG · LESOTHO</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>METHOD: DIAGNOSIS → PROTOTYPE → PRODUCTION</span>
            <span className="text-[#333]">|</span>
            <span className="text-[#F3F0EA]">SOUTH AFRICA / AFRICA / GLOBAL</span>
          </div>
        </div>
      </div>

      {/* Main Hero Viewport Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Action */}
          <div className="lg:col-span-6 z-20 flex flex-col items-start space-y-6 sm:space-y-8">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded border border-[#C8AE82]/30 bg-[#151515]/90 text-[11px] font-mono tracking-[0.2em] text-[#C8AE82] uppercase">
              <Compass className="w-3.5 h-3.5 text-[#C8AE82]" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Massive Display Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:6xl xl:text-7xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.05]">
                {t.hero.titleLine1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] via-[#E5D1B0] to-[#C8AE82]">
                  {t.hero.titleLine2}
                </span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#A5A29B] font-normal leading-relaxed max-w-xl">
              {t.hero.tagline}
            </p>

            {/* Methodology Progression Tag */}
            <div className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-wider text-[#F3F0EA] border-l-2 border-[#C8AE82] pl-3 py-1">
              <span className="text-[#A5A29B]">{lang === 'st' ? 'MOKGWA:' : 'METHOD:'}</span>
              <span className="font-semibold text-[#F3F0EA]">{lang === 'st' ? 'TLHAHLOBO' : 'DIAGNOSIS'}</span>
              <span className="text-[#C8AE82]">→</span>
              <span className="font-semibold text-[#F3F0EA]">{lang === 'st' ? 'MOETSO' : 'PROTOTYPE'}</span>
              <span className="text-[#C8AE82]">→</span>
              <span className="font-semibold text-[#F3F0EA]">{lang === 'st' ? 'TSHEBETSO' : 'PRODUCTION'}</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={onExploreSystems}
                id="hero-explore-cta"
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-[#C8AE82] text-[#080909] font-bold text-xs tracking-wider uppercase hover:bg-[#E5D1B0] transition-all duration-200 shadow-lg shadow-[#C8AE82]/10 focus:outline-none cursor-pointer"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onBringProblem}
                id="hero-problem-cta"
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full border border-[#333333] bg-[#151515] text-[#F3F0EA] font-semibold text-xs tracking-wider uppercase hover:border-[#C8AE82] hover:bg-[#222222] transition-all duration-200 cursor-pointer"
              >
                <span>{t.hero.ctaSecondary}</span>
                <ArrowDownRight className="w-4 h-4 text-[#C8AE82] group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Micro Support Line */}
            <div className="flex items-center gap-4 text-xs font-mono text-[#A5A29B] pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C8AE82]" />
                <span className="tracking-wide">AI OPPORTUNITY ENGINEERING</span>
              </div>
              <span className="text-[#333]">·</span>
              <span>NO TECH THEATRE</span>
            </div>
          </div>

          {/* Right Column: The Canonical Hero Artwork Canister */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Ambient Backlight Glow behind canister */}
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-t from-[#C8AE82]/10 via-[#C8AE82]/5 to-transparent blur-3xl rounded-full pointer-events-none" />

            {/* The Approved Hero Image Container */}
            <div className="relative w-full max-w-[540px] rounded-lg overflow-hidden border border-[#262626] bg-[#121212] shadow-2xl group">
              <img
                src={ASSETS.hero}
                alt="NahaLabs Business Intelligence Fuel Industrial Cylinder over South African Landscape"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Technical Overlay Vignette & Micro Annotations */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080909]/90 via-transparent to-black/20 pointer-events-none" />

              {/* Float Microcopy Pill Top Right */}
              <div className="absolute top-4 right-4 bg-[#080909]/80 backdrop-blur-md px-3 py-1.5 rounded border border-[#333333] text-[10px] font-mono text-[#C8AE82] tracking-wider uppercase hidden sm:block">
                SYSTEM CORE: BI FUEL
              </div>

              {/* Overlay Bottom Specifications */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#F3F0EA] border-t border-[#333333]/80 pt-3 bg-[#080909]/60 backdrop-blur-md px-4 py-2 rounded">
                <div className="flex items-center gap-3">
                  <span className="text-[#C8AE82]">DATA</span>
                  <span>·</span>
                  <span className="text-[#C8AE82]">AI</span>
                  <span>·</span>
                  <span className="text-[#C8AE82]">AGENTS</span>
                  <span>·</span>
                  <span className="text-[#C8AE82]">AUTOMATION</span>
                  <span>·</span>
                  <span className="text-[#C8AE82]">REVENUE</span>
                </div>
              </div>
            </div>

            {/* Floating Editorial Metric Card on Desktop */}
            <div className="absolute -bottom-6 -left-6 bg-[#151515]/95 border border-[#2c2c2c] backdrop-blur-md p-4 rounded shadow-2xl hidden xl:block max-w-[210px] z-20">
              <div className="text-[10px] font-mono text-[#C8AE82] tracking-widest uppercase mb-1">
                SYSTEM TARGETS
              </div>
              <p className="text-xs font-semibold text-[#F3F0EA] leading-snug">
                MORE INSIGHTS.<br />
                MORE OPPORTUNITIES.<br />
                MORE REVENUE.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Ticker Marquee Beneath Hero */}
      <div className="w-full border-y border-[#1c1e22] bg-[#0b0c0e]/90 py-3 overflow-hidden mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-1.5 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#777] uppercase">
          <span>INDUSTRIES & OPERATIONAL ENVIRONMENTS WE SERVE</span>
          <span className="text-[#C8AE82]">PROVEN COMMERCIAL IMPACT</span>
        </div>
        <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex shrink-0 items-center gap-8 animate-marquee whitespace-nowrap text-xs font-mono tracking-widest text-[#A5A29B]">
            <span>FREIGHT FORWARDING & LOGISTICS</span>
            <span className="text-[#C8AE82]">✦</span>
            <span>HOSPITALITY & RESTAURANTS</span>
            <span className="text-[#C8AE82]">✦</span>
            <span>ENTERPRISE B2B SALES</span>
            <span className="text-[#C8AE82]">✦</span>
            <span>TELECOMMUNICATIONS & INFRASTRUCTURE</span>
            <span className="text-[#C8AE82]">✦</span>
            <span>TOWNSHIP RETAIL & COMMERCE</span>
            <span className="text-[#C8AE82]">✦</span>
            <span>FINANCIAL SERVICES & INSURANCE</span>
            <span className="text-[#C8AE82]">✦</span>
            <span>CREATOR COMMERCE ATTRIBUTION</span>
            <span className="text-[#C8AE82]">✦</span>
            <span>CROSS-BORDER SADC TRADE</span>
            <span className="text-[#C8AE82]">✦</span>
          </div>
          <div className="flex shrink-0 items-center gap-8 animate-marquee whitespace-nowrap text-xs font-mono tracking-widest text-[#A5A29B]" aria-hidden="true">
            <span>FREIGHT FORWARDING & LOGISTICS</span>
            <span className="text-[#C8AE82]">✦</span>
            <span>HOSPITALITY & RESTAURANTS</span>
            <span className="text-[#C8AE82]">✦</span>
            <span>ENTERPRISE B2B SALES</span>
            <span className="text-[#C8AE82]">✦</span>
            <span>TELECOMMUNICATIONS & INFRASTRUCTURE</span>
            <span className="text-[#C8AE82]">✦</span>
            <span>TOWNSHIP RETAIL & COMMERCE</span>
            <span className="text-[#C8AE82]">✦</span>
            <span>FINANCIAL SERVICES & INSURANCE</span>
            <span className="text-[#C8AE82]">✦</span>
            <span>CREATOR COMMERCE ATTRIBUTION</span>
            <span className="text-[#C8AE82]">✦</span>
            <span>CROSS-BORDER SADC TRADE</span>
            <span className="text-[#C8AE82]">✦</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Ticker / Scroll Prompt */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="flex items-center justify-between text-xs font-mono text-[#A5A29B]">
          <div className="flex items-center gap-2">
            <span className="text-[#C8AE82]">NAHALABS</span>
            <span>/</span>
            <span>INTELLIGENT SYSTEMS ENGINEERING (PTY) LTD</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[#C8AE82]">
            <span>SCROLL TO EXPLORE ARCHITECTURE</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};

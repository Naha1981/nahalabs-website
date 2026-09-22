import React from 'react';
import { LocationData } from '../types';
import { MapPin, ArrowLeft, ArrowRight, Shield, CheckCircle, Building } from 'lucide-react';

interface LocationViewProps {
  location: LocationData;
  onBack: () => void;
  onContact: () => void;
}

export const LocationView: React.FC<LocationViewProps> = ({ location, onBack, onContact }) => {
  return (
    <div className="pt-28 pb-32 bg-[#080909] min-h-screen text-[#F3F0EA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A5A29B] hover:text-[#C8AE82] transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO NAHALABS PRIMARY DIRECTORY</span>
        </button>

        {/* Hero Header */}
        <div className="border-b border-[#222222] pb-12 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151515] border border-[#262626] text-[11px] font-mono tracking-widest text-[#C8AE82] uppercase mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#C8AE82]" />
            <span>REGIONAL HUB // {location.city} ({location.province})</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.1]">
            {location.heroHeadline}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#A5A29B] leading-relaxed max-w-3xl">
            {location.heroSubtext}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {location.districts.map((district, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 rounded bg-[#151618] border border-[#28292c] text-xs font-mono text-[#C8AE82]"
              >
                {district}
              </span>
            ))}
          </div>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Strategic Context & Focus Areas */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Strategic Context */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#F3F0EA] tracking-tight">
                Strategic Economic Context
              </h2>
              <p className="text-sm text-[#A5A29B] leading-relaxed">
                {location.strategicContext}
              </p>
            </div>

            {/* Economic Focus Pillars */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#F3F0EA] tracking-tight">
                High-Impact Operational Sectors
              </h3>
              <div className="space-y-2.5">
                {location.economicFocus.map((focus, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded bg-[#121314] border border-[#222222] text-xs sm:text-sm text-[#F3F0EA] flex items-center gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-[#C8AE82] shrink-0" />
                    <span>{focus}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Systems Deployed */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#F3F0EA] tracking-tight">
                Relevant NahaLabs Systems for {location.city}
              </h3>
              <div className="space-y-2.5">
                {location.coreSolutions.map((sol, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded bg-[#151618] border-l-2 border-[#C8AE82] border-y border-r border-[#262626] text-xs sm:text-sm text-[#A5A29B]"
                  >
                    <span className="text-[#F3F0EA] font-medium">{sol}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Regional Scenario & CTA */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Local Intervention Snapshot */}
            <div className="p-8 rounded-sm bg-[#121315] border border-[#262626] shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                <span className="text-[10px] font-mono text-[#C8AE82] uppercase tracking-widest">
                  REGIONAL SCENARIO
                </span>
                <span className="text-xs font-mono text-[#A5A29B]">{location.city}</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#A5A29B] uppercase tracking-wider block mb-1">
                  OPERATIONAL CONTEXT
                </span>
                <p className="text-xs text-[#F3F0EA] leading-relaxed">
                  {location.localCaseStudy.context}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#C8AE82] uppercase tracking-wider block mb-1">
                  NAHALABS APPROACH
                </span>
                <p className="text-xs text-[#A5A29B] leading-relaxed">
                  {location.localCaseStudy.intervention}
                </p>
              </div>

              <div className="p-4 rounded bg-[#18191c] border border-[#2e2f33]">
                <span className="text-[10px] font-mono text-[#C8AE82] uppercase tracking-wider block mb-1">
                  TARGET OUTCOME
                </span>
                <p className="text-xs font-semibold text-[#F3F0EA]">
                  {location.localCaseStudy.outcome}
                </p>
              </div>
            </div>

            {/* Regional Consultation Card */}
            <div className="p-8 rounded-sm bg-gradient-to-b from-[#16171a] to-[#101112] border border-[#C8AE82]/40 shadow-2xl space-y-4 text-center">
              <h4 className="text-lg font-bold text-[#F3F0EA]">
                Deploy Intelligent Systems in {location.city}
              </h4>
              <p className="text-xs text-[#A5A29B] leading-relaxed">
                Connect directly with our engineering team for an operational diagnostic specific to your regional footprint.
              </p>
              <button
                onClick={onContact}
                className="w-full py-3.5 rounded-full bg-[#C8AE82] text-[#080909] font-bold text-xs tracking-wider uppercase hover:bg-[#E5D1B0] transition-colors flex items-center justify-center gap-2"
              >
                <span>Initiate Diagnostic In {location.city}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

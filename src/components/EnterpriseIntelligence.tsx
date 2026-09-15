import React from 'react';
import { ENTERPRISE_INDUSTRIES } from '../data/narrative';
import { ASSETS } from '../data/assets';
import { ArrowRight, Shield, Layers, Target, CheckCircle2 } from 'lucide-react';

interface EnterpriseIntelligenceProps {
  onStartEnterprise: () => void;
}

export const EnterpriseIntelligence: React.FC<EnterpriseIntelligenceProps> = ({ onStartEnterprise }) => {
  return (
    <section id="enterprise" className="py-24 sm:py-36 bg-[#0c0d0e] border-b border-[#181818] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151515] border border-[#262626] text-[11px] font-mono tracking-widest text-[#C8AE82] uppercase mb-4">
            <Shield className="w-3.5 h-3.5 text-[#C8AE82]" />
            <span>07 / BESPOKE ENTERPRISE SYSTEMS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.1]">
            WHEN THE PROBLEM IS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] to-[#C8AE82]">
              TOO VALUABLE FOR A TEMPLATE.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A5A29B]">
            NahaLabs engineers bespoke intelligent systems around the economics, data and operations of your organisation.
          </p>
        </div>

        {/* The Core Enterprise Philosophy Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#131416] border border-[#262626] rounded-sm p-8 sm:p-12 mb-16 shadow-2xl">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-[11px] font-mono text-[#C8AE82] tracking-widest uppercase">
              ENGINEERING ADAPTABILITY
            </div>
            <blockquote className="text-2xl sm:text-3xl font-extrabold text-[#F3F0EA] leading-snug">
              "Your problem doesn't need to fit our product.<br />
              <span className="text-[#C8AE82]">Our engineering adapts to your problem.</span>"
            </blockquote>
            <p className="text-sm text-[#A5A29B] leading-relaxed max-w-xl">
              When millions in margin are locked behind legacy ERP silos, unstructured vendor contracts, or multi-depot transport bottlenecks, standard SaaS tools cannot bridge the divide. We engineer dedicated production systems with your team.
            </p>
            <div className="pt-2">
              <button
                onClick={onStartEnterprise}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#C8AE82] text-[#080909] font-bold text-xs tracking-wider uppercase hover:bg-[#E5D1B0] transition-colors"
              >
                <span>Start An Enterprise Conversation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded overflow-hidden border border-[#2c2c2c] h-72 sm:h-80">
            <img 
              src={ASSETS.enterpriseJhb} 
              alt="Johannesburg Sandton Financial and Commercial Skyline" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono text-[#C8AE82] tracking-widest uppercase block">
                REGIONAL DEPLOYMENT CORRIDOR
              </span>
              <p className="text-xs text-[#F3F0EA] font-semibold">
                Sandton · Rosebank · City Deep · Pretoria Industrial
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise Industries Grid */}
        <div className="space-y-4">
          <div className="text-[11px] font-mono text-[#A5A29B] tracking-widest uppercase mb-6">
            PRIMARY ENTERPRISE SECTORS SERVED
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENTERPRISE_INDUSTRIES.map((ind, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-sm bg-[#101112] border border-[#222222] hover:border-[#333] transition-colors"
              >
                <div className="text-[10px] font-mono text-[#C8AE82] uppercase mb-1">
                  SECTOR 0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-[#F3F0EA] mb-2">
                  {ind.name}
                </h3>
                <p className="text-xs text-[#A5A29B] leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

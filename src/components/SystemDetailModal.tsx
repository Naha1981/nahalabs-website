import React from 'react';
import { SystemItem } from '../types';
import { X, CheckCircle, Layers, ArrowRight, ShieldCheck } from 'lucide-react';

interface SystemDetailModalProps {
  system: SystemItem | null;
  onClose: () => void;
  onConsult: (systemName: string) => void;
}

export const SystemDetailModal: React.FC<SystemDetailModalProps> = ({ system, onClose, onConsult }) => {
  if (!system) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-4xl bg-[#121314] border border-[#2a2a2a] rounded-md shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar with Status and Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222222] bg-[#161718]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#222] text-[#C8AE82] font-mono text-[10px] tracking-widest uppercase border border-[#333]">
              {system.status}
            </span>
            <span className="text-xs font-mono text-[#A5A29B] tracking-wider">
              {system.category}
            </span>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-[#A5A29B] hover:text-[#F3F0EA] hover:bg-[#222222] transition-colors focus:outline-none"
            aria-label="Close system detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left / Top Image Banner */}
          <div className="md:col-span-5 relative h-64 md:h-auto min-h-[260px] bg-[#0c0d0e]">
            <img 
              src={system.image} 
              alt={system.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono text-[#C8AE82] tracking-widest uppercase block mb-1">
                SYSTEM IDENTIFIER
              </span>
              <h4 className="text-2xl font-black text-white tracking-tight">
                {system.name}
              </h4>
              <p className="text-xs text-[#A5A29B]">
                {system.subtitle}
              </p>
            </div>
          </div>

          {/* Right Details Column */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Short Proposition */}
            <div>
              <div className="text-[10px] font-mono text-[#C8AE82] tracking-widest uppercase mb-1">
                CORE PROPOSITION
              </div>
              <p className="text-base font-semibold text-[#F3F0EA] leading-snug">
                {system.shortProposition}
              </p>
            </div>

            {/* Problem Statement */}
            <div className="p-4 rounded bg-[#18191b] border-l-2 border-[#C8AE82] border-y border-r border-[#262626]">
              <div className="text-[10px] font-mono text-[#C8AE82] tracking-widest uppercase mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8AE82]" />
                <span>THE COMMERCIAL PROBLEM</span>
              </div>
              <p className="text-xs text-[#A5A29B] leading-relaxed">
                {system.problemStatement}
              </p>
            </div>

            {/* What it Does */}
            <div>
              <div className="text-[10px] font-mono text-[#C8AE82] tracking-widest uppercase mb-2">
                SYSTEM CAPABILITIES
              </div>
              <ul className="space-y-2">
                {system.whatItDoes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#F3F0EA]">
                    <CheckCircle className="w-4 h-4 text-[#C8AE82] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Value */}
            <div>
              <div className="text-[10px] font-mono text-[#C8AE82] tracking-widest uppercase mb-1">
                MEASURABLE BUSINESS VALUE
              </div>
              <p className="text-xs font-semibold text-[#C8AE82] bg-[#C8AE82]/10 p-3 rounded border border-[#C8AE82]/20">
                {system.businessValue}
              </p>
            </div>

            {/* Architecture Layers */}
            <div>
              <div className="text-[10px] font-mono text-[#A5A29B] tracking-widest uppercase mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#C8AE82]" />
                <span>ENGINEERED STACK</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {system.architectureLayers.map((layer, idx) => (
                  <span key={idx} className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#1f2022] text-[#A5A29B] border border-[#2e2f32]">
                    {layer}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] font-mono text-[#A5A29B]">
                STATUS: {system.status}
              </span>
              <button
                onClick={() => {
                  onClose();
                  onConsult(system.name);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C8AE82] text-[#080909] font-bold text-xs tracking-wider uppercase hover:bg-[#E5D1B0] transition-colors"
              >
                <span>Deploy / Consult On This System</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

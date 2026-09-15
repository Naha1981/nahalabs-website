import React from 'react';
import { X, Shield } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#121314] border border-[#2a2a2a] rounded p-6 sm:p-8 max-h-[85vh] overflow-y-auto my-8 shadow-2xl text-[#A5A29B] text-xs space-y-4 leading-relaxed"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#222222] pb-3 text-[#F3F0EA]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#C8AE82]" />
            <h3 className="text-base font-bold tracking-wide uppercase">
              {type === 'privacy' ? 'Privacy Policy & POPIA Notice' : 'Terms of Engineering Engagement'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded text-[#A5A29B] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {type === 'privacy' ? (
          <div className="space-y-3">
            <p className="font-semibold text-[#F3F0EA]">
              Protection of Personal Information Act (POPIA) Compliance
            </p>
            <p>
              NahaLabs (PTY) Ltd respects the privacy of our clients, prospective partners, and visitors. In compliance with the South African Protection of Personal Information Act (POPIA), all operational information submitted through our contact forms or during client diagnostics is treated with strict confidentiality.
            </p>
            <p>
              We collect contact information, company operational briefs, and business parameters exclusively to assess technical feasibility and respond with engineering proposals. We do not sell, rent, or distribute client data or operational telemetry to third-party brokers.
            </p>
            <p>
              Client telemetry within production systems engineered by NahaLabs remains the exclusive intellectual and proprietary property of the respective client organisation, hosted within client-designated cloud or on-premise infrastructure.
            </p>
            <p className="font-mono text-[11px] text-[#C8AE82]">
              Inquiries regarding data retention or POPIA access: ai-solutions@nahalabs.co.za
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="font-semibold text-[#F3F0EA]">
              Engagement Methodology & Intellectual Property
            </p>
            <p>
              1. <strong>Scope of Engagements:</strong> NahaLabs operates on a Diagnosis → Prototype → Production methodology. Each phase requires explicit mutual verification before subsequent commitments are executed.
            </p>
            <p>
              2. <strong>Diagnostic Assessments:</strong> Preliminary operational problem evaluations are exploratory. System recommendations are tailored to the specific business economics and data infrastructure presented by the client.
            </p>
            <p>
              3. <strong>Confidentiality:</strong> Both parties agree to maintain mutual commercial confidentiality regarding trade secrets, freight data, customer lists, and bespoke margin formulas.
            </p>
            <p>
              4. <strong>Jurisdiction:</strong> All contracts and engagements are governed by the laws of the Republic of South Africa, with legal domicile in Johannesburg, Gauteng.
            </p>
            <p className="font-mono text-[11px] text-[#C8AE82]">
              NahaLabs (PTY) Ltd · Johannesburg, South Africa
            </p>
          </div>
        )}

        <div className="pt-3 border-t border-[#222222] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-[#222] hover:bg-[#333] text-[#F3F0EA] font-mono text-xs"
          >
            Close Notice
          </button>
        </div>
      </div>
    </div>
  );
};

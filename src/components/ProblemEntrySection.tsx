import React, { useState } from 'react';
import { UserCheck, DollarSign, Cpu, ArrowRight, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { BusinessIntent } from '../types';
import { SOLUTION_PATHWAYS } from '../data/solutionPaths';
import { EducationalSolutionView } from './EducationalSolutionView';

interface ProblemEntrySectionProps {
  onDiagnoseProblem: (systemName: string, problemLabel: string) => void;
}

export const ProblemEntrySection: React.FC<ProblemEntrySectionProps> = ({
  onDiagnoseProblem,
}) => {
  const [activeIntent, setActiveIntent] = useState<BusinessIntent | null>(null);

  const handleSelectIntent = (intent: BusinessIntent) => {
    if (activeIntent === intent) {
      // Toggle off if already active
      setActiveIntent(null);
    } else {
      setActiveIntent(intent);
      // Smooth scroll to the educational view after slight delay
      setTimeout(() => {
        const el = document.getElementById('solution-deep-dive');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const pathways = [
    {
      id: 'customers' as BusinessIntent,
      title: 'Get More Customers',
      subtitle: 'Turn enquiries, conversations and demand into more qualified customers and revenue.',
      cta: 'Explore Growth',
      icon: UserCheck,
      color: 'from-[#C8AE82]/20 via-[#1c1a16] to-[#121316]',
      borderColor: 'hover:border-[#C8AE82]',
      accentColor: '#C8AE82',
      examples: [
        'Lead capture & qualification',
        'Booking conversion',
        'Customer engagement & retention',
        'Attribution to physical tills'
      ]
    },
    {
      id: 'recovery' as BusinessIntent,
      title: 'Recover Lost Revenue',
      subtitle: 'Find money disappearing through operational leakage, errors, delays and missed recovery opportunities.',
      cta: 'Explore Revenue Recovery',
      icon: DollarSign,
      color: 'from-[#81B29A]/20 via-[#161c18] to-[#121316]',
      borderColor: 'hover:border-[#81B29A]',
      accentColor: '#81B29A',
      examples: [
        'Freight invoice discrepancies',
        'Waiting-time & demurrage leakage',
        'Claims review & reconciliation gaps',
        'Compliance & regulatory losses'
      ]
    },
    {
      id: 'operations' as BusinessIntent,
      title: 'Build an Intelligent Operating System',
      subtitle: 'Connect fragmented processes, data and legacy systems into an intelligent layer that helps the business see, decide and act.',
      cta: 'Explore Intelligent Operations',
      icon: Cpu,
      color: 'from-[#E5D1B0]/20 via-[#1a1815] to-[#121316]',
      borderColor: 'hover:border-[#E5D1B0]',
      accentColor: '#E5D1B0',
      examples: [
        'Autonomous digital workers (Pamela)',
        'Decision intelligence layers',
        'Legacy ERP non-invasive integration',
        'AI readiness & automation ROI audit'
      ]
    }
  ];

  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#080909] relative border-b border-[#1c1d21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C8AE82]/30 bg-[#16171a] text-xs font-mono tracking-[0.2em] text-[#C8AE82] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C8AE82]" />
            <span>PRIMARY BUSINESS INTENTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F3F0EA] tracking-tight">
            What are you trying to improve?
          </h2>

          <p className="text-base sm:text-lg text-[#A5A29B] leading-relaxed">
            NahaLabs doesn't start with generic software. Choose your primary commercial objective to see how we systematically engineer the solution.
          </p>
        </div>

        {/* 3 Large Pathway Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {pathways.map((item) => {
            const Icon = item.icon;
            const isSelected = activeIntent === item.id;

            return (
              <div
                key={item.id}
                id={`intent-card-${item.id}`}
                onClick={() => handleSelectIntent(item.id)}
                className={`group relative rounded-2xl border transition-all duration-300 p-8 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#C8AE82] bg-gradient-to-b from-[#181a20] to-[#101114] shadow-2xl ring-1 ring-[#C8AE82]'
                    : 'border-[#22242a] bg-gradient-to-b from-[#131418] to-[#0d0e11] hover:border-[#383a42]'
                }`}
              >
                {/* Active Indicator Pin */}
                {isSelected && (
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#C8AE82] text-[#080909] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Selected Intent</span>
                  </div>
                )}

                <div>
                  {/* Icon Header */}
                  <div className="w-14 h-14 rounded-xl bg-[#1a1c22] border border-[#2a2c34] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7 text-[#C8AE82]" />
                  </div>

                  <h3 className="text-2xl font-bold text-[#F3F0EA] tracking-tight mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#A5A29B] leading-relaxed mb-6">
                    {item.subtitle}
                  </p>

                  {/* Bullet Examples */}
                  <div className="space-y-2 pt-4 border-t border-[#1f2127]">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#666] block">
                      Target Focus Areas:
                    </span>
                    {item.examples.map((ex, exIdx) => (
                      <div key={exIdx} className="flex items-center gap-2 text-xs text-[#D3CFCA]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8AE82]/70 flex-shrink-0" />
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA button */}
                <div className="pt-8 mt-6">
                  <div
                    className={`w-full py-3 px-5 rounded-xl border text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-between transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#C8AE82] text-[#080909] border-[#C8AE82]'
                        : 'bg-[#181a20] text-[#F3F0EA] border-[#2b2d35] group-hover:border-[#C8AE82] group-hover:bg-[#1e2027]'
                    }`}
                  >
                    <span>{isSelected ? 'Viewing Architecture' : `${item.cta} →`}</span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Intent Educational Deep-Dive Drawer/Section */}
        {activeIntent && (
          <div id="solution-deep-dive" className="mt-14 pt-4 scroll-mt-24">
            <EducationalSolutionView
              pathway={SOLUTION_PATHWAYS[activeIntent]}
              onClose={() => setActiveIntent(null)}
              onDiagnoseProblem={onDiagnoseProblem}
            />
          </div>
        )}

      </div>
    </section>
  );
};

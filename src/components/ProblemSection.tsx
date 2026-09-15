import React from 'react';
import { ArrowRight, Coins, Layers, Zap } from 'lucide-react';

interface ProblemSectionProps {
  onSelectOutcome: (outcome: string) => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onSelectOutcome }) => {
  const outcomes = [
    {
      id: 'revenue',
      title: 'Find lost revenue',
      icon: Coins,
      tag: 'FINANCIAL IMPACT',
      summary: 'Recover invisible margin leakage, unbilled freight demurrage, kitchen inventory waste, and uncaptured inbound pipeline.',
      action: 'Diagnose revenue leaks',
    },
    {
      id: 'friction',
      title: 'Remove operational friction',
      icon: Layers,
      tag: 'HUMAN EFFICIENCY',
      summary: 'Eliminate manual spreadsheet coordination, delayed approvals, and double data entry with autonomous digital workflows.',
      action: 'Streamline operations',
    },
    {
      id: 'action',
      title: 'Turn data into action',
      icon: Zap,
      tag: 'DECISION VELOCITY',
      summary: 'Replace passive executive reporting dashboards with automated decision engines that act before losses compound.',
      action: 'Automate decisions',
    },
  ];

  return (
    <section id="solutions" className="py-24 sm:py-32 bg-[#0a0b0d] border-b border-[#1c1d21] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Massive Editorial Statement */}
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#C8AE82] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8AE82]" />
            <span>The Operating Reality</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F3F0EA] tracking-tight leading-[1.08]">
            Businesses don’t need more software. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] via-[#E5D1B0] to-[#C8AE82]">
              They need better systems.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#A5A29B] leading-relaxed max-w-2xl">
            Most companies already pay for dozens of tools that don't talk to each other. We engineer the intelligent layer that connects them and drives bottom-line execution.
          </p>
        </div>

        {/* Three Large Outcome Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {outcomes.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onSelectOutcome(item.title)}
                className="group relative rounded-2xl border border-[#202228] bg-gradient-to-b from-[#131418] to-[#0c0d10] hover:border-[#C8AE82]/70 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#C8AE82]/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[#1a1c22] border border-[#2d2f38] flex items-center justify-center text-[#C8AE82] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#71747e] uppercase">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#F3F0EA] tracking-tight mb-4 group-hover:text-[#C8AE82] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#A5A29B] leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-8 mt-8 border-t border-[#1e2026] flex items-center justify-between text-xs font-mono text-[#F3F0EA] group-hover:text-[#C8AE82] transition-colors">
                  <span>{item.action}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

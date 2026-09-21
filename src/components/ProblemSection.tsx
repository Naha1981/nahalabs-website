import React from 'react';

interface ProblemSectionProps {
  onSelectOutcome: (outcome: string) => void;
}

const OUTCOMES = [
  {
    id: 'revenue',
    title: 'Find lost revenue',
    summary:
      'Recover invisible margin leakage, unbilled freight demurrage, kitchen inventory waste, and uncaptured inbound pipeline.',
    action: 'Diagnose revenue leaks',
  },
  {
    id: 'friction',
    title: 'Remove operational friction',
    summary:
      'Eliminate manual spreadsheet coordination, delayed approvals, and double data entry with autonomous digital workflows.',
    action: 'Streamline operations',
  },
  {
    id: 'action',
    title: 'Turn data into action',
    summary:
      'Replace passive executive reporting dashboards with automated decision engines that act before losses compound.',
    action: 'Automate decisions',
  },
];

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onSelectOutcome }) => {
  return (
    <section id="solutions" data-tone="light" className="section bg-canvas text-fg">
      <div className="wrap">
        <h2 className="font-serif text-h1 font-medium">
          <span className="block">Too sophisticated for off-the-shelf software.</span>
          <span className="block">Too specific for generic consulting.</span>
          <span className="block">Too important to manage manually.</span>
        </h2>

        <p className="mt-8 max-w-[36rem] text-lead text-fg-2">
          Most companies already pay for dozens of tools that don't talk to each other. We engineer
          the intelligent layer that connects them and drives bottom-line execution.
        </p>

        <ul className="mt-14 sm:mt-20 border-t border-line-strong">
          {OUTCOMES.map((item) => (
            <li key={item.id} className="border-b border-line">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectOutcome(item.title);
                }}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-3 py-8 sm:py-10 transition-colors hover:bg-surface/60 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-sm"
              >
                <h3 className="lg:col-span-4 font-serif text-h3 font-medium">{item.title}</h3>
                <p className="lg:col-span-5 text-body text-fg-2">{item.summary}</p>
                <span className="lg:col-span-3 lg:justify-self-end self-start text-button font-medium text-accent underline underline-offset-[0.4em] decoration-line-strong group-hover:decoration-accent transition-colors">
                  {item.action}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

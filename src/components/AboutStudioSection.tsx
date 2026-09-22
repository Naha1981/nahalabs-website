import React from 'react';

interface AboutStudioSectionProps {
  onStartConversation?: () => void;
}

const COMMITMENTS = [
  'Direct founder-led technical engagement',
  'Diagnosis to production in 6–11 weeks',
  'Tied directly to measurable bottom-line metrics',
];

export const AboutStudioSection: React.FC<AboutStudioSectionProps> = () => {
  return (
    <section id="about" data-tone="dark" className="section bg-canvas text-fg">
      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-14">
        <div className="lg:col-span-7">
          <h2 className="font-serif text-h1 font-medium">Founder-led engineering from Johannesburg.</h2>

          <div className="mt-8 space-y-5 measure text-body text-fg-2">
            <p className="text-lead text-fg">
              NahaLabs was founded by Thabiso Naha on a straightforward observation: modern enterprises
              are inundated with software licenses and AI hype, yet their most critical operational
              bottlenecks remain entirely manual.
            </p>
            <p>
              We don't build generic web apps or bill endless consulting hours. We identify expensive
              commercial friction, such as unbilled freight detention, kitchen food waste and delayed
              enterprise sales quotes, and engineer bespoke intelligent systems that eliminate it
              permanently.
            </p>
            <p>
              Headquartered in Johannesburg and serving clients across Gauteng, South Africa, Lesotho,
              and the wider continent, we build systems designed to operate under real-world commercial
              conditions.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9 lg:pt-3" aria-label="Founder">
          <p className="font-serif text-h3 font-medium">Thabiso Naha</p>
          <p className="mt-1 text-small text-fg-3">Founder and Systems Architect</p>

          <ul className="rule-list mt-8 text-body text-fg">
            {COMMITMENTS.map((c) => (
              <li key={c} className="py-4">
                {c}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};

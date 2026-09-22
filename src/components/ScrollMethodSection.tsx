import React from 'react';
import { Reveal } from './Reveal';

interface ScrollMethodSectionProps {
  onStartDiagnosis?: () => void;
}

const STAGES = [
  {
    title: 'Diagnosis',
    question: 'What is actually broken?',
    timeline: '1–2 weeks',
    description:
      'We audit the workflow, identify where value or time is lost, and define the exact intelligence system required. If automation or AI is the wrong solution, we tell you immediately.',
    deliverables: [
      'Root-cause process and bottleneck audit',
      'Commercial feasibility and ROI projection',
      'System specification and deployment blueprint',
    ],
  },
  {
    title: 'Prototype',
    question: 'What should the system do?',
    timeline: '2–3 weeks',
    description:
      'We engineer a working prototype integrated with your actual data streams, testing real-world accuracy, operator adoption, and commercial leverage before wide rollout.',
    deliverables: [
      'Working prototype on live or sampled company data',
      'Core model, rule engine and integration testing',
      'Executive and operational usability validation',
    ],
  },
  {
    title: 'Production',
    question: 'How do we put it into operation?',
    timeline: '3–6 weeks',
    description:
      'We deploy the hardened system into your production infrastructure with security, automated error handling, operator handover, and SLA guarantees.',
    deliverables: [
      'Containerised production deployment with security hardening',
      'Team handover and documentation',
      'Deployment monitoring and a defined post-launch support window',
    ],
  },
];

export const ScrollMethodSection: React.FC<ScrollMethodSectionProps> = ({ onStartDiagnosis }) => {
  return (
    <section id="approach" data-tone="light" className="section bg-canvas text-fg">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-6 items-end">
          <h2 className="lg:col-span-7 font-serif text-h1 font-medium">
            Diagnosis. Prototype. Production.
          </h2>
          <p className="lg:col-span-4 lg:col-start-9 text-lead text-fg-2">
            Fixed scope, no open-ended retainers. Every project runs in three disciplined stages, and
            we only build what directly improves your operating margin.
          </p>
        </div>

        <ol className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-x-10 lg:gap-x-14 gap-y-12">
          {STAGES.map((stage, i) => (
            <Reveal as="li" key={stage.title} className="border-t border-line-strong pt-6 flex flex-col">
              <div className="flex items-baseline justify-between gap-4 text-small text-fg-3">
                <span>Stage {i + 1}</span>
                <span>{stage.timeline}</span>
              </div>

              <h3 className="mt-5 font-serif text-h2 font-medium">{stage.title}</h3>
              <p className="mt-2 text-body font-medium text-fg">{stage.question}</p>
              <p className="mt-4 text-body text-fg-2">{stage.description}</p>

              <ul className="rule-list mt-8 text-small text-fg">
                {stage.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>

        <div className="mt-16 sm:mt-20 pt-10 border-t border-line-strong grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-6 items-center">
          <div className="lg:col-span-7">
            <h3 className="font-serif text-h2 font-medium">Start with a 45-minute technical diagnosis.</h3>
            <p className="mt-3 text-body text-fg-2 max-w-[36rem]">
              We review your bottleneck, verify technical viability, and estimate return on investment
              before any commitments.
            </p>
          </div>
          {onStartDiagnosis && (
            <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              <button type="button" onClick={onStartDiagnosis} className="btn btn-primary w-full sm:w-auto">
                Book a diagnosis
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

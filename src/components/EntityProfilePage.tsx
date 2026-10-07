import React from 'react';
import { ButtonLink } from './Button';

const SITE = 'https://nahalabs.co.za';
const FOUNDER_LINKEDIN = 'https://za.linkedin.com/in/thabiso-naha-4985316b';

const focusAreas = [
  'Intelligent systems engineering',
  'AI Opportunity Engineering',
  'Revenue intelligence and lead follow-up',
  'WhatsApp and workflow automation',
  'Operational and logistics intelligence',
  'Computer vision and geospatial intelligence',
  'Document and evidence intelligence',
  'Custom AI agents and software',
];

export const EntityProfilePage: React.FC = () => (
  <div data-site-theme="light" data-tone="light" className="min-h-screen bg-[#F2F4F7] text-[#0B0E10]">
    <main>
      <section className="border-b border-[#1b1c1f]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-4xl">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C8AE82]">Company profile</p>
            <h1 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-[-0.04em]">
              NahaLabs is an intelligent systems engineering company based in Johannesburg, South Africa.
            </h1>
            <p className="mt-7 max-w-3xl text-lg sm:text-xl leading-relaxed text-[#A5A29B]">
              We identify operational and commercial problems that are expensive to solve manually, then combine software, data, automation and AI into systems designed around the client's real workflow.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#1b1c1f]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 rounded-xl border border-[#24262a] bg-[#101112] p-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C8AE82]">Entity</p>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="text-[#777]">Legal name</dt><dd className="mt-1 text-[#D7D3CA]">NahaLabs (PTY) Ltd</dd></div>
              <div><dt className="text-[#777]">Brand</dt><dd className="mt-1 text-[#D7D3CA]">NahaLabs</dd></div>
              <div><dt className="text-[#777]">Base</dt><dd className="mt-1 text-[#D7D3CA]">Johannesburg, Gauteng, South Africa</dd></div>
              <div><dt className="text-[#777]">Markets</dt><dd className="mt-1 text-[#D7D3CA]">South Africa, Lesotho and wider African markets</dd></div>
              <div><dt className="text-[#777]">Contact</dt><dd className="mt-1 text-[#D7D3CA]">ai-solutions@nahalabs.co.za</dd></div>
            </dl>
          </div>

          <div className="lg:col-span-2 rounded-xl border border-[#24262a] bg-[#0d0e10] p-6 sm:p-8">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C8AE82]">Founder</p>
            <h2 className="mt-3 text-3xl font-semibold">Thabiso Naha</h2>
            <p className="mt-1 text-[#8f8c85]">Founder and Systems Architect</p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#A5A29B]">
              Thabiso Naha builds intelligent systems for organisations that need software to produce practical actions, evidence and commercial outcomes.
            </p>
            <ButtonLink href={FOUNDER_LINKEDIN} target="_blank" rel="noreferrer" variant="secondary">
              Founder Profile on LinkedIn
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-[#1b1c1f]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C8AE82]">What NahaLabs works on</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Focus areas</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {focusAreas.map((item) => (
              <div key={item} className="rounded-lg border border-[#24262a] bg-[#0d0e10] p-4 text-sm leading-6 text-[#D7D3CA]">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1b1c1f]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C8AE82]">How projects are described</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Facts, evidence and proposals are kept separate.</h2>
            <p className="mt-5 text-base leading-7 text-[#A5A29B]">
              NahaLabs distinguishes source-backed facts, customer-confirmed outcomes, public engineering work, proposals and assumptions. A system page should never turn a design target into a claimed customer result.
            </p>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              ['Source-backed', 'External facts are linked to the original public source.'],
              ['Public engineering work', 'Open repositories and public demos are identified as engineering evidence, not customer case studies.'],
              ['Proposal / assumption', 'Future ideas and target outcomes are labelled as such.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-[#24262a] bg-[#101112] p-5">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#8f8c85]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C8AE82]">NahaLabs</p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight">Intelligent systems for real business problems.</h2>
          <p className="mt-5 max-w-2xl mx-auto text-base leading-7 text-[#A5A29B]">
            Diagnosis → Prototype → Production. The work starts with a business problem, not a request to add AI.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/systems" variant="primary">View public engineering work</ButtonLink>
            <ButtonLink href="/insights" variant="secondary">Read NahaLabs insights</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  </div>
);

export const getEntityProfileJsonLd = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': SITE + '/#organization',
      name: 'NahaLabs',
      legalName: 'NahaLabs (PTY) Ltd',
      url: SITE,
      email: 'ai-solutions@nahalabs.co.za',
      description: 'NahaLabs is an intelligent systems engineering company based in Johannesburg, South Africa.',
      founder: { '@id': SITE + '/about#founder' },
      areaServed: [
        { '@type': 'City', name: 'Johannesburg' },
        { '@type': 'AdministrativeArea', name: 'Gauteng' },
        { '@type': 'Country', name: 'South Africa' },
        { '@type': 'Country', name: 'Lesotho' }
      ]
    },
    {
      '@type': 'Person',
      '@id': SITE + '/about#founder',
      name: 'Thabiso Naha',
      jobTitle: 'Founder and Systems Architect',
      url: FOUNDER_LINKEDIN,
      sameAs: [FOUNDER_LINKEDIN],
      worksFor: { '@id': SITE + '/#organization' }
    }
  ]
});

import React from 'react';
import { ButtonLink } from './Button';

const SITE = 'https://www.nahalabs.co.za';

export const PressPage: React.FC = () => (
  <div data-site-theme="light" data-tone="light" className="min-h-screen bg-[#F2F4F7] text-[#0B0E10]">
    <main>
      <section className="border-b border-[#1b1c1f]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C8AE82]">Press & research</p>
          <h1 className="mt-5 max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-[-0.04em]">
            NahaLabs research, engineering commentary and company background.
          </h1>
          <p className="mt-7 max-w-3xl text-lg sm:text-xl leading-relaxed text-[#A5A29B]">
            This page is a source for journalists, researchers and partners looking for concise company facts, public engineering evidence and original NahaLabs analysis.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1b1c1f]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-2 gap-5">
          <article className="rounded-xl border border-[#24262a] bg-[#101112] p-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C8AE82]">Company boilerplate</p>
            <p className="mt-4 text-base leading-7 text-[#D7D3CA]">
              NahaLabs is an intelligent systems engineering company based in Johannesburg, South Africa. It combines software, data, automation and AI to address operational and commercial problems where manual processes, fragmented information or slow decision cycles create measurable friction.
            </p>
          </article>
          <article className="rounded-xl border border-[#24262a] bg-[#101112] p-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C8AE82]">Contact</p>
            <p className="mt-4 text-base leading-7 text-[#D7D3CA]">Founder: Thabiso Naha<br />Company: NahaLabs (PTY) Ltd<br />Location: Johannesburg, Gauteng, South Africa<br />Email: ai-solutions@nahalabs.co.za</p>
          </article>
        </div>
      </section>

      <section className="border-b border-[#1b1c1f]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C8AE82]">Research themes</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Topics NahaLabs publishes about.</h2>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              'AI Opportunity Engineering',
              'Revenue and lead-response systems',
              'Freight, ports and operational evidence',
              'Restaurant revenue intelligence',
              'Geospatial and computer vision systems',
              'AI agents and business automation',
            ].map((topic) => (
              <div key={topic} className="rounded-lg border border-[#24262a] bg-[#0d0e10] p-4 text-sm text-[#D7D3CA]">{topic}</div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <div className="rounded-xl border border-[#C8AE82]/40 bg-[#12110f] p-7 sm:p-9">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C8AE82]">Interview / source requests</p>
            <h2 className="mt-3 text-3xl font-semibold">Contact NahaLabs.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#A5A29B]">
              For company background, founder commentary, technical context or access to public engineering work, contact NahaLabs directly.
            </p>
            <ButtonLink href="mailto:ai-solutions@nahalabs.co.za" variant="primary">Email NahaLabs</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  </div>
);

export const getPressJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': SITE + '/press#page',
  url: SITE + '/press',
  name: 'NahaLabs Press & Research',
  description: 'Company background, public engineering evidence and research themes from NahaLabs.',
  isPartOf: { '@id': SITE + '/#website' },
  about: { '@id': SITE + '/#organization' }
});

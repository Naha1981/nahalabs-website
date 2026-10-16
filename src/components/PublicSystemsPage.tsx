import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ButtonLink } from './Button';

const SITE = 'https://www.nahalabs.co.za';
const systems = [
  { id: 'revenuedesk', name: 'RevenueDesk', audience: 'Service businesses', description: 'A front-desk system for organising enquiries, preparing follow-up and reviewing the gaps between first contact and booked work.', status: 'Live', url: '/revenuedesk', action: 'Explore RevenueDesk' },
  { id: 'flavourly', name: 'Flavourly', audience: 'Restaurants', description: 'A Restaurant Revenue OS designed for profit growth, revenue recovery, customer retention and repeat sales through insights, marketing, loyalty programmes and personalised engagement. WhatsApp is one part of the system.', status: '', url: '/contact', action: 'Request a walkthrough' },
  { id: 'cargoiq', name: 'CargoIQ', audience: 'Freight and logistics', description: 'Inspect shipment events, delay timelines and the records behind a freight dispute. Evidence for human review, not a promise of recovery.', status: 'Live', url: '/cargo-iq', action: 'Open CargoIQ' },
  { id: 'fieldproof', name: 'FieldProof', audience: 'Field operations', description: 'Review pump-test notes, missing evidence and inconsistent units before a report is approved. Sample data. Fictional records.', status: 'Live', url: '/fieldproof', action: 'Open FieldProof' },
  { id: 'smilebridge', name: 'Smile Bridge', audience: 'Dental practices', description: 'A patient conversion system: a practice video greeting, one approved question at a time, emergencies escalated to a person first, and routing to booking, WhatsApp or a callback.', status: 'In pilot', url: '/smile-bridge', action: 'View product page' },
  { id: 'netpulse', name: 'NetPulse', audience: 'Internet service providers', description: 'Spreadsheet checks for duplicate IPs, equipment warranties and data quality. Sample data. Fictional records.', status: 'Live', url: '/netpulse', action: 'Open NetPulse' },
  { id: 'railwatch', name: 'RailWatch', audience: 'Infrastructure teams', description: 'Corridor signals, incident records and response workflows in one monitoring review. Sample data. Fictional records.', status: 'Live', url: '/railwatch', action: 'Open RailWatch' },
  { id: 'bankbook', name: 'BankBook', audience: 'Bookkeepers', description: 'Review invoice fields against their source, inspect bank-statement matches and record a human decision. Sample data. Fictional records. No tax filing.', status: 'Live', url: '/bankbook', action: 'Explore BankBook' },
];

export const PublicSystemsPage: React.FC = () => (
  <div data-site-theme="light" data-tone="light" className="product-directory min-h-screen bg-[#F2F4F7] text-[#0B0E10]">
    <main>
      <section className="border-b border-line">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24 pt-28 sm:pt-32">
          <p className="text-caption font-mono uppercase tracking-[0.18em] text-accent">THE PRODUCT WORK</p>
          <h1 className="mt-5 max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.04] tracking-[-0.045em]">Find your workflow.<br />Inspect the system.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fg-2">Intelligent systems for the work between an enquiry, a record and a decision. See what each product is designed to do and where it stands today.</p>
          <div className="product-stage-note mt-8 max-w-3xl"><span className="product-status">EARLY-STAGE ENGINEERING</span><p>These are working systems shown on fictional data, not paid-client case studies. A production engagement needs an agreed scope, data permissions, testing and support plan.</p></div>
        </div>
      </section>
      <section aria-label="Products and systems">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16 grid md:grid-cols-2 gap-5">
          {systems.map(system => (
            <article id={system.id} key={system.id} className="product-card">
              <div className="product-card-meta"><span>{system.audience}</span>{system.status && <span className="product-status">{system.status}</span>}</div>
              <h2>{system.name}</h2><p>{system.description}</p>
              <a href={system.url} className="nh-text-link">{system.action} <ArrowUpRight size={17} aria-hidden="true" /></a>
            </article>
          ))}
          <article className="product-card product-card-invite">
            <p className="text-caption font-mono uppercase tracking-[0.18em] text-accent">A DIFFERENT WORKFLOW?</p>
            <h2>Start with the problem.</h2><p>Tell us where enquiries stall, records go missing or checks depend on memory. We will discuss the workflow before proposing a system.</p>
            <ButtonLink href="/contact">Discuss your workflow</ButtonLink>
          </article>
        </div>
      </section>
    </main>
  </div>
);

export const getPublicSystemsJsonLd = () => ({
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', '@id': SITE + '/systems#page', url: SITE + '/systems', name: 'NahaLabs Products and Systems', description: 'Explore intelligent systems from NahaLabs.', isPartOf: { '@id': SITE + '/#website' } },
    { '@type': 'ItemList', '@id': SITE + '/systems#list', itemListElement: systems.map((system, index) => ({ '@type': 'ListItem', position: index + 1, name: system.name, url: SITE + '/systems#' + system.id })) },
  ],
});

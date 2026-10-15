import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ButtonLink } from './Button';

const SITE = 'https://www.nahalabs.co.za';
const systems = [
  { id: 'revenuedesk', name: 'RevenueDesk', audience: 'Service businesses', description: 'A front-desk prototype for organising enquiries, preparing follow-up and reviewing the gaps between first contact and booked work.', status: 'Prototype', url: '/revenuedesk', action: 'Explore RevenueDesk' },
  { id: 'flavourly', name: 'Flavourly', audience: 'Restaurants', description: 'An AI-powered Restaurant Revenue OS designed for profit growth, revenue recovery, customer retention and repeat sales through insights, marketing, loyalty programmes and personalised engagement. WhatsApp is one part of the system.', status: 'Prototype', url: '/contact', action: 'Request a walkthrough' },
  { id: 'cargoiq', name: 'CargoIQ', audience: 'Freight and logistics', description: 'Inspect shipment events, delay timelines and the records behind a freight dispute. Evidence for human review, not a promise of recovery.', status: 'Interactive demo', url: '/cargo-iq', action: 'Open the CargoIQ demo' },
  { id: 'fieldproof', name: 'FieldProof', audience: 'Field operations', description: 'Review pump-test notes, missing evidence and inconsistent units before a report is approved. The demo uses fictional data.', status: 'Interactive demo', url: '/gtg', action: 'Open the FieldProof demo' },
  { id: 'netpulse', name: 'NetPulse', audience: 'Internet service providers', description: 'Explore spreadsheet checks for duplicate IPs, equipment warranties and data quality. Use synthetic data only in the public demo.', status: 'Interactive demo', url: '/netpulse', action: 'Open the NetPulse demo' },
  { id: 'railwatch', name: 'RailWatch', audience: 'Infrastructure teams', description: 'Explore corridor signals, incident records and response workflows in a monitoring demo. Not a live railway deployment.', status: 'Interactive demo', url: '/railwatch', action: 'Open the RailWatch demo' },
  { id: 'bankbook', name: 'BankBook', audience: 'Bookkeepers', description: 'Review invoice fields against their source, inspect bank-statement matches and record a human decision. Fictional South African data; no tax filing.', status: 'Interactive demo', url: '/bankbook', action: 'Explore BankBook' },
];

export const PublicSystemsPage: React.FC = () => (
  <div data-site-theme="light" data-tone="light" className="product-directory min-h-screen bg-[#F2F4F7] text-[#0B0E10]">
    <main>
      <section className="border-b border-line">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24 pt-28 sm:pt-32">
          <p className="text-caption font-mono uppercase tracking-[0.18em] text-accent">THE PRODUCT WORK</p>
          <h1 className="mt-5 max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.04] tracking-[-0.045em]">Find your workflow.<br />Inspect the system.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fg-2">Intelligent systems for the work between an enquiry, a record and a decision. See what each product is designed to do and where it stands today.</p>
          <div className="product-stage-note mt-8 max-w-3xl"><span className="product-status">EARLY-STAGE ENGINEERING</span><p>These are demos and prototypes, not paid-client case studies. A production engagement needs an agreed scope, data permissions, testing and support plan.</p></div>
        </div>
      </section>
      <section aria-label="Products and demos">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16 grid md:grid-cols-2 gap-5">
          {systems.map(system => (
            <article id={system.id} key={system.id} className="product-card">
              <div className="product-card-meta"><span>{system.audience}</span><span className="product-status">{system.status}</span></div>
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
    { '@type': 'CollectionPage', '@id': SITE + '/systems#page', url: SITE + '/systems', name: 'NahaLabs Products and Demos', description: 'Explore early-stage intelligent systems, interactive demos and prototypes from NahaLabs.', isPartOf: { '@id': SITE + '/#website' } },
    { '@type': 'ItemList', '@id': SITE + '/systems#list', itemListElement: systems.map((system, index) => ({ '@type': 'ListItem', position: index + 1, name: system.name, url: SITE + '/systems#' + system.id })) },
  ],
});

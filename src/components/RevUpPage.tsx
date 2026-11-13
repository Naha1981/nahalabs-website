import React, { useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';

const SITE = 'https://www.nahalabs.co.za';
const PATH = '/revup';
const APP_URL = 'https://revup.nahalabs.co.za';
const API_DOCS_URL = 'https://revup.nahalabs.co.za/api/v1/docs';
const TITLE = 'RevUp | WhatsApp Receptionist for Small Businesses | NahaLabs';
const DESCRIPTION =
  "RevUp helps South African small businesses handle WhatsApp enquiries, calendar bookings and Google review requests.";

const capabilities = [
  ['WhatsApp receptionist', 'Handle customer enquiries on your business WhatsApp and hand over when a person should step in.'],
  ['Calendar bookings', 'Keep booking requests and calendar availability together. A held booking is labelled honestly, not presented as confirmed.'],
  ['Google review booster', 'A review-request capability for happy customers. Review the message and recipient before using it.'],
  ['Plain-language numbers', 'See the workspace dashboard and analytics without technical jargon.'],
];

const getJsonLd = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': SITE + PATH + '#page',
      url: SITE + PATH,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { '@id': SITE + '/#website' },
      inLanguage: 'en-ZA',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': SITE + PATH + '#software',
      name: 'RevUp',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: DESCRIPTION,
      url: SITE + PATH,
      creator: { '@id': SITE + '/#organization' },
    },
    {
      '@type': 'Service',
      '@id': SITE + PATH + '#service',
      name: 'RevUp',
      serviceType: 'WhatsApp enquiries and bookings for South African small businesses',
      provider: { '@id': SITE + '/#organization' },
      areaServed: { '@type': 'Country', name: 'South Africa' },
      url: SITE + PATH,
      description: DESCRIPTION,
    },
  ],
});

export const getRevUpJsonLd = getJsonLd;

export const RevUpPage: React.FC = () => {
  useEffect(() => {
    document.title = TITLE;

    const upsert = (selector: string, attrs: Record<string, string>, content: string) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        Object.entries(attrs).forEach(([key, value]) => el!.setAttribute(key, value));
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    upsert('meta[name="description"]', { name: 'description' }, DESCRIPTION);
    upsert('meta[property="og:title"]', { property: 'og:title' }, TITLE);
    upsert('meta[property="og:description"]', { property: 'og:description' }, DESCRIPTION);
    upsert('meta[property="og:url"]', { property: 'og:url' }, SITE + PATH);

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = SITE + PATH;

    const oldJsonLd = document.getElementById('nahalabs-revup-jsonld');
    oldJsonLd?.remove();
    const script = document.createElement('script');
    script.id = 'nahalabs-revup-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(getJsonLd());
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <div data-site-theme="light" data-tone="light" className="min-h-screen bg-[#F2F4F7] text-[#0B0E10]">
      <main>
        <section className="section border-b border-line">
          <div className="wrap">
            <div className="max-w-4xl">
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">NAHALABS / SOUTH AFRICAN SMALL BUSINESSES</p>
              <h1 className="mt-5 text-display font-semibold tracking-tight">
                Never miss an enquiry. Keep control of the reply.
              </h1>
              <p className="mt-7 max-w-3xl text-lead text-fg-2">
                RevUp helps South African small businesses handle WhatsApp enquiries, calendar bookings and Google review requests.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={APP_URL} className="btn btn-primary">
                  Get started <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/contact" className="btn btn-outline">
                  Talk to NahaLabs
                </a>
              </div>
            </div>

            <div className="mt-14 grid md:grid-cols-4 border-y border-line">
              {[
                ['01', 'Sign up', 'Create a private workspace. Billed monthly from R499.'],
                ['02', 'Enquiries', 'Set up the WhatsApp receptionist.'],
                ['03', 'Bookings', 'Review calendar bookings and held requests.'],
                ['04', 'Review', 'Check conversations and workspace numbers.'],
              ].map(([number, title, body]) => (
                <div key={number} className="py-5 pr-5 border-b md:border-b-0 md:border-r last:border-r-0 border-line">
                  <div className="text-caption font-mono text-fg-3">{number}</div>
                  <h2 className="mt-3 text-h3 font-semibold">{title}</h2>
                  <p className="mt-2 text-small text-fg-2">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section border-b border-line">
          <div className="wrap grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">THE OLD WORKFLOW</p>
              <h2 className="mt-3 text-h1 font-semibold">Customer enquiries should not get lost in a busy day.</h2>
            </div>
            <div className="space-y-5 text-body leading-relaxed text-fg-2">
              <p>
                A small business needs a clear place for customer enquiries and booking requests, even when the owner is busy with the work.
              </p>
              <p>
                Start with a private workspace, set up the receptionist and review what it does.
              </p>
            </div>
          </div>
        </section>

        <section className="section border-b border-line">
          <div className="wrap">
            <div className="max-w-3xl">
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">WHAT REVUP DOES</p>
              <h2 className="mt-3 text-h1 font-semibold">One system between the customer and the calendar.</h2>
              <p className="mt-5 text-body text-fg-2">
                The current focus is enquiries, bookings and clear workspace information.
              </p>
            </div>

            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-2 border-t border-line">
              {capabilities.map(([title, body]) => (
                <article key={title} className="border-b border-r border-line p-6 min-h-40">
                  <h3 className="text-h3 font-semibold">{title}</h3>
                  <p className="mt-3 text-small leading-relaxed text-fg-2">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section border-b border-line">
          <div className="wrap grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
            <div>
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">HOW IT WORKS</p>
              <h2 className="mt-3 text-h1 font-semibold">Start with your own private workspace.</h2>
            </div>
            <div>
              <ul className="rule-list">
                {[
                  'Create your account and choose a monthly plan. There is no free trial.',
                  'Start with an empty private workspace, not invented customer records.',
                  'Set up the business WhatsApp receptionist and calendar connection.',
                  'Review booking requests and their actual confirmation status.',
                  'Keep customer work separate from other accounts.',
                  'Use the get-started checklist to track setup.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body text-fg-2">
                    <Check className="w-4 h-4 mt-1 text-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section border-b border-line">
          <div className="wrap grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">THE DIFFERENCE</p>
              <h2 className="mt-3 text-h1 font-semibold">Clear status beats a promise.</h2>
            </div>
            <div className="space-y-5 text-body leading-relaxed text-fg-2">
              <p>
                A booking request is not a confirmed booking until the calendar accepts it. RevUp labels a held request so the owner knows what still needs attention.
              </p>
            </div>
          </div>
        </section>

        <section className="section border-b border-line">
          <div className="wrap grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">CONTROL</p>
              <h2 className="mt-3 text-h1 font-semibold">The owner keeps the pen.</h2>
            </div>
            <div className="space-y-5 text-body leading-relaxed text-fg-2">
              <p>
                Review conversations, follow setup steps and step in when a customer needs a person.
              </p>
              <p>
                From R499 a month, billed monthly from day one. No setup fee. Cancel anytime.
              </p>
            </div>
          </div>
        </section>

        <section className="section border-b border-line">
          <div className="wrap grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">FOR OPERATORS</p>
              <h2 className="mt-3 text-h1 font-semibold">Built to be driven by software as well.</h2>
            </div>
            <div className="space-y-5 text-body leading-relaxed text-fg-2">
              <p>
                Read the current API documentation if you want to connect your own workflow.
              </p>
              <p>
                <a href={API_DOCS_URL} className="link">
                  Read the RevUp Agent API documentation <ArrowUpRight className="inline w-4 h-4 align-[-0.125em]" />
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="border border-line-strong bg-surface p-7 sm:p-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">START THIS WEEK</p>
                <h2 className="mt-3 text-h1 font-semibold">Put your number to work.</h2>
                <p className="mt-4 max-w-2xl text-body text-fg-2">
                  Create your private workspace and follow the setup checklist. From R499 a month, billed monthly from day one. No setup fee.
                </p>
              </div>
              <a href={APP_URL} className="btn btn-primary shrink-0">
                Get started <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

import React, { useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Check, X } from 'lucide-react';

const SITE = 'https://www.nahalabs.co.za';
const PATH = '/bankbook';
const DEMO_URL = 'https://bankbook-tax.lovable.app/';
const TITLE = 'BankBook | Invoice & Bank Review Desk | NahaLabs';
const DESCRIPTION =
  'BankBook is a NahaLabs review desk for bookkeepers: check extracted invoice data against its source, reconcile it with a bank statement, and record a human decision for every match. Live demo on fictional South African data.';

const steps = [
  ['01', 'Import', 'Sample invoices and a bank CSV load with every row keeping its file and line reference.'],
  ['02', 'Field review', 'Each extracted field shows its source and confidence. Low confidence is flagged.'],
  ['03', 'Reconciliation', 'Matches are proposed on currency, direction, exact cents and invoice reference. You approve or reject.'],
  ['04', 'Exceptions', 'Duplicates, unmatched payments and invoices whose totals do not add up, in one queue.'],
  ['05', 'Export', 'A CSV of every line with its reviewed status, plus the audit trail.'],
];

const itIs = [
  'A review desk for bookkeepers, not another place data goes to hide.',
  'Every extracted field stays tied to its source document and line.',
  'A human approves or rejects every proposed match - nothing posts itself.',
  'A full audit trail exports with the reviewed data.',
];

const itIsNot = [
  'Not production accounting, and no tax filing.',
  'No live bank feeds - statements come in as CSV.',
  'No messages sent to your clients or suppliers.',
  'The demo runs on fictional South African invoices and bank lines only.',
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
      name: 'BankBook',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: DESCRIPTION,
      url: SITE + PATH,
      creator: { '@id': SITE + '/#organization' },
    },
  ],
});

export const getBankbookJsonLd = getJsonLd;

export const BankbookPage: React.FC = () => {
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

    const oldJsonLd = document.getElementById('nahalabs-bankbook-jsonld');
    oldJsonLd?.remove();
    const script = document.createElement('script');
    script.id = 'nahalabs-bankbook-jsonld';
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
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">NAHALABS / ACCOUNTING OPERATIONS</p>
              <h1 className="mt-5 text-display font-semibold tracking-tight">
                Invoice review where a human makes every call.
              </h1>
              <p className="mt-7 max-w-3xl text-lead text-fg-2">
                BankBook is a review desk for bookkeepers. It checks extracted invoice data against its source, reconciles it with a bank statement, and records a human decision for every match.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Open the live demo <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/#contact" className="btn btn-outline">
                  Talk to NahaLabs
                </a>
              </div>
              <p className="mt-4 text-small text-fg-3">
                The demo runs on fictional South African businesses only. No real client data.
              </p>
            </div>

            <div className="mt-14 grid md:grid-cols-5 border-y border-line">
              {steps.map(([number, title, body]) => (
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
              <h2 className="mt-3 text-h1 font-semibold">Shoebox → spreadsheet → month-end panic.</h2>
            </div>
            <div className="space-y-5 text-body leading-relaxed text-fg-2">
              <p>
                Bookkeeping time should go into judgement, not into hunting for which invoice a bank line belongs to. The slow part is never the decision - it is finding the evidence for the decision.
              </p>
              <p>
                BankBook keeps the evidence next to the decision. Every extracted field points back to its source, every proposed match shows its reasoning, and the bookkeeper approves or rejects with the proof on the same screen.
              </p>
            </div>
          </div>
        </section>

        <section className="section border-b border-line">
          <div className="wrap grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">WHAT IT IS</p>
              <h2 className="mt-3 text-h1 font-semibold">A desk for checking, built for trust.</h2>
              <ul className="rule-list mt-8">
                {itIs.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body text-fg-2">
                    <Check className="w-4 h-4 mt-1 text-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">WHAT IT IS NOT</p>
              <h2 className="mt-3 text-h1 font-semibold">Honest limits, on the record.</h2>
              <ul className="rule-list mt-8">
                {itIsNot.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body text-fg-2">
                    <X className="w-4 h-4 mt-1 text-fg-3 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section border-b border-line">
          <div className="wrap">
            <div className="max-w-3xl">
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">LIVE DEMO</p>
              <h2 className="mt-3 text-h1 font-semibold">Work a real review queue, start to finish.</h2>
              <p className="mt-5 text-body text-fg-2">
                Import the sample pack, review flagged fields, approve or reject the proposed matches and export the audit trail. Everything in the demo is fictional.
              </p>
            </div>
            <div className="mt-10 overflow-hidden rounded-sm ring-1 ring-line bg-white">
              <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2 text-small">
                <span className="text-fg-2">BankBook demo desk</span>
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="link shrink-0">
                  Open directly <ArrowUpRight className="inline w-3.5 h-3.5" />
                </a>
              </div>
              <iframe
                src={DEMO_URL}
                title="BankBook live demo - invoice and bank review desk"
                className="h-[70dvh] w-full border-0"
                loading="lazy"
                allow="fullscreen; clipboard-write"
              />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="border border-line-strong bg-surface p-7 sm:p-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">BUILT TO ORDER</p>
                <h2 className="mt-3 text-h1 font-semibold">Your review workflow, your rules.</h2>
                <p className="mt-4 max-w-2xl text-body text-fg-2">
                  BankBook is a working NahaLabs system, tailored per practice: your invoice formats, your matching rules, your export shape. The demo shows the pattern - the build fits the practice.
                </p>
              </div>
              <a href="/#contact" className="btn btn-primary shrink-0">
                Talk to NahaLabs <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

import React, { useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';

const SITE = 'https://nahalabs.co.za';
const PATH = '/revenuedesk';
const TITLE = 'RevenueDesk | AI Front Desk & Revenue Recovery | NahaLabs';
const DESCRIPTION = "RevenueDesk is NahaLabs' AI front desk for service businesses: capture every enquiry, understand intent, handle follow-up and recover revenue lost between first contact and booked work.";

const verticals = [
  'Plumbing',
  'Electrical',
  'Security',
  'Solar / inverter / battery',
  'Auto workshops',
  'Mobile mechanics',
  'Towing & roadside',
  'HVAC',
  'Roofing & waterproofing',
  'Gates & electric fencing',
  'Pools',
  'Dental & aesthetics',
];

const leakTypes = [
  ['Missed enquiries', 'A message arrives, but nobody responds quickly enough.'],
  ['Weak qualification', 'A real buyer is treated like another generic enquiry.'],
  ['Quote leakage', 'A quote is sent and then quietly disappears from the pipeline.'],
  ['Follow-up gaps', 'The business knows the work should be chased, but the chase depends on memory.'],
  ['Urgency loss', 'A repair, breakdown or time-sensitive request is not surfaced clearly enough.'],
  ['Revenue blind spots', 'Nobody has a reliable view of where enquiries become jobs — or where they stop.'],
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
      name: 'RevenueDesk',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: DESCRIPTION,
      url: SITE + PATH,
      creator: { '@id': SITE + '/#organization' },
    },
    {
      '@type': 'Service',
      '@id': SITE + PATH + '#service',
      name: 'RevenueDesk',
      serviceType: 'AI front desk and revenue recovery',
      provider: { '@id': SITE + '/#organization' },
      areaServed: { '@type': 'Country', name: 'South Africa' },
      url: SITE + PATH,
      description: DESCRIPTION,
    },
  ],
});

export const getRevenueDeskJsonLd = getJsonLd;

export const RevenueDeskPage: React.FC = () => {
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

    const oldJsonLd = document.getElementById('nahalabs-revenuedesk-jsonld');
    oldJsonLd?.remove();
    const script = document.createElement('script');
    script.id = 'nahalabs-revenuedesk-jsonld';
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
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">NAHALABS / REVENUE SYSTEMS</p>
              <h1 className="mt-5 text-display font-semibold tracking-tight">
                Your front desk should do more than receive enquiries.
              </h1>
              <p className="mt-7 max-w-3xl text-lead text-fg-2">
                RevenueDesk is an AI front desk for service businesses. It captures every enquiry, understands what the customer needs, handles the next action and shows where revenue is leaking between first contact and booked work.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/audit" className="btn btn-primary">
                  Run a Revenue Leak Audit <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/#contact" className="btn btn-outline">
                  Talk to NahaLabs
                </a>
              </div>
            </div>

            <div className="mt-14 grid md:grid-cols-5 border-y border-line">
              {[
                ['01', 'Capture', 'Nothing gets lost.'],
                ['02', 'Understand', 'Intent and urgency become visible.'],
                ['03', 'Act', 'The next response is prepared.'],
                ['04', 'Recover', 'Quotes and follow-ups are chased.'],
                ['05', 'Measure', 'Revenue leakage becomes evidence.'],
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
              <h2 className="mt-3 text-h1 font-semibold">WhatsApp → phone call → quote → spreadsheet → memory.</h2>
            </div>
            <div className="space-y-5 text-body leading-relaxed text-fg-2">
              <p>
                Service businesses rarely lose revenue because they lack a CRM screen. They lose it in the gaps: a customer waits for a reply, a technician never records the urgency, a quote is sent with no chase, or the owner only discovers the missed job weeks later.
              </p>
              <p>
                RevenueDesk is designed around those gaps. The experience is industry-aware, so a plumbing emergency, an inverter fault, a vehicle breakdown and a dental enquiry do not get treated as the same generic lead.
              </p>
            </div>
          </div>
        </section>

        <section className="section border-b border-line">
          <div className="wrap">
            <div className="max-w-3xl">
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">REVENUE LEAKS</p>
              <h2 className="mt-3 text-h1 font-semibold">Find the money disappearing between enquiry and sale.</h2>
              <p className="mt-5 text-body text-fg-2">
                RevenueDesk makes leakage operational. Instead of another inbox, it gives the business a working view of what needs attention, why it matters and what should happen next.
              </p>
            </div>

            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 border-t border-line">
              {leakTypes.map(([title, body]) => (
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
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">AI FRONT DESK</p>
              <h2 className="mt-3 text-h1 font-semibold">Built around the way service businesses actually sell.</h2>
            </div>
            <div>
              <ul className="rule-list">
                {[
                  'Reads incoming enquiries across the connected customer channels.',
                  'Recognises service, urgency, location, fit and buying intent.',
                  'Surfaces the questions needed before a technician or sales person acts.',
                  'Prepares or triggers the next customer response and follow-up.',
                  'Flags quotes and high-value opportunities that have gone quiet.',
                  'Turns the interaction history into evidence for the owner or manager.',
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
          <div className="wrap">
            <div className="max-w-3xl">
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">INDUSTRY INTELLIGENCE</p>
              <h2 className="mt-3 text-h1 font-semibold">The system changes with the work.</h2>
              <p className="mt-5 text-body text-fg-2">
                RevenueDesk does not rely on an industry dropdown sitting on top of a generic CRM. Each service category gets its own qualification logic, urgency signals, common leakage patterns and customer language.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-2.5">
              {verticals.map((item) => (
                <span key={item} className="border border-line-strong rounded-full px-3.5 py-2 text-small text-fg-2 bg-surface">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="border border-line-strong bg-surface p-7 sm:p-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">START WITH EVIDENCE</p>
                <h2 className="mt-3 text-h1 font-semibold">See your revenue leaks before buying another system.</h2>
                <p className="mt-4 max-w-2xl text-body text-fg-2">
                  The NahaLabs Revenue Leak Audit is the diagnostic entry point. It shows where your current enquiry journey is weak and where RevenueDesk can turn that leakage into an operating workflow.
                </p>
              </div>
              <a href="/audit" className="btn btn-primary shrink-0">
                Run the audit <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

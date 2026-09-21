import React, { useEffect } from 'react';
import { ArrowRight, CheckCircle2, Clock3, MessageCircle, RefreshCw, ShieldCheck, XCircle } from 'lucide-react';

const CANONICAL = 'https://nahalabs.co.za/services/lead-follow-up-automation-johannesburg';
const TITLE = 'Lead Follow-Up Automation Johannesburg | NahaLabs';
const DESCRIPTION = 'Automate responses and follow-ups for Facebook, WhatsApp and website enquiries. NahaLabs helps Johannesburg businesses respond faster and follow up until leads reply, book or opt out.';

const FAQS = [
  ['What does the system actually do?', 'When a new enquiry comes in, the system captures it, sends the first response, schedules follow-ups and stops when the customer replies, books, says no or opts out.'],
  ['Do I need to replace my current website, WhatsApp or CRM?', 'No. The goal is to connect the enquiry source you already use and add the response and follow-up layer around it, where the existing system supports it.'],
  ['What happens when a customer replies?', 'The automated follow-up sequence stops so the conversation can continue normally.'],
  ['What is the Johannesburg pilot price?', 'The 15-day pilot is R990 setup plus R499 per month. The standard price after the pilot is R4,500 setup plus R1,500 per month.'],
];

export const getLeadFollowUpJsonLd = () => (
  {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': CANONICAL + '#service',
        name: 'Lead Follow-Up Automation',
        serviceType: 'Lead response and follow-up automation',
        description: DESCRIPTION,
        provider: { '@type': 'Organization', name: 'NahaLabs', url: 'https://nahalabs.co.za' },
        areaServed: [
          { '@type': 'City', name: 'Johannesburg' },
          { '@type': 'AdministrativeArea', name: 'Gauteng' },
          { '@type': 'Country', name: 'South Africa' }
        ],
        offers: {
          '@type': 'Offer',
          priceCurrency: 'ZAR',
          price: '990',
          description: '15-day Johannesburg pilot setup fee. Monthly service is R499 during the pilot.',
          url: CANONICAL
        }
      },
      {
        '@type': 'FAQPage',
        '@id': CANONICAL + '#faq',
        mainEntity: FAQS.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'NahaLabs', item: 'https://nahalabs.co.za/' },
          { '@type': 'ListItem', position: 2, name: 'Lead Follow-Up Automation Johannesburg', item: CANONICAL }
        ]
      }
    ]
  }
);

function setMeta(selector: string, attrs: Record<string, string>, content: string) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    Object.entries(attrs).forEach(([key, value]) => el!.setAttribute(key, value));
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export const LeadFollowUpAutomationPage: React.FC = () => {
  useEffect(() => {
    document.title = TITLE;
    setMeta('meta[name="description"]', { name: 'description' }, DESCRIPTION);
    setMeta('meta[name="robots"]', { name: 'robots' }, 'index, follow, max-image-preview:large, max-snippet:-1');
    setMeta('meta[property="og:title"]', { property: 'og:title' }, TITLE);
    setMeta('meta[property="og:description"]', { property: 'og:description' }, DESCRIPTION);
    setMeta('meta[property="og:url"]', { property: 'og:url' }, CANONICAL);
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, TITLE);
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, DESCRIPTION);

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = CANONICAL;

    const old = document.getElementById('nahalabs-lead-follow-up-jsonld');
    old?.remove();

    const jsonld = document.createElement('script');
    jsonld.id = 'nahalabs-lead-follow-up-jsonld';
    jsonld.type = 'application/ld+json';
    jsonld.text = JSON.stringify(getLeadFollowUpJsonLd());
    document.head.appendChild(jsonld);
    return () => jsonld.remove();
  }, []);

  const steps = [
    ['New enquiry', 'A customer comes in from Facebook, WhatsApp, your website or another connected source.', MessageCircle],
    ['Captured', 'The enquiry is recorded so it does not disappear inside an inbox.', ShieldCheck],
    ['Immediate response', 'The first response is sent straight away using the workflow you approve.', Clock3],
    ['Day 1', 'If there is no reply, the system follows up automatically.', RefreshCw],
    ['Day 3', 'Still no reply? Another follow-up goes out.', RefreshCw],
    ['Later follow-up', 'More follow-ups can be scheduled according to your rules.', RefreshCw],
    ['Customer replies or books', 'The automated sequence stops.', CheckCircle2],
    ['Customer says no or opts out', 'The sequence stops so the lead is not chased unnecessarily.', XCircle],
  ];

  return (
    <div className="min-h-screen bg-[#080909] text-[#F3F0EA]">
      <header className="border-b border-[#1b1c1f] bg-[#080909]/95">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between gap-4">
          <a href="/" className="text-[15px] font-extrabold tracking-[0.2em] text-[#F3F0EA]">NAHALABS</a>
          <div className="flex items-center gap-4">
            <a href="/insights" className="hidden sm:inline text-[11px] font-mono uppercase tracking-[0.16em] text-[#A5A29B]">Insights</a>
            <a href="/#contact" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#C8AE82] text-[#080909] text-[10px] font-mono uppercase tracking-wider font-bold">Start pilot <ArrowRight className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-[#1b1c1f]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
            <div className="max-w-4xl">
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C8AE82]">Johannesburg · Lead Response & Follow-Up</div>
              <h1 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.03] tracking-[-0.04em]">Lead Follow-Up Automation for Johannesburg Businesses</h1>
              <p className="mt-6 max-w-3xl text-lg sm:text-xl leading-relaxed text-[#A5A29B]">Every new enquiry gets an immediate response and scheduled follow-up until the customer replies, books, says no or opts out.</p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <a href="/#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C8AE82] text-[#080909] font-bold text-xs uppercase tracking-wider">Apply for the 15-day pilot <ArrowRight className="w-4 h-4" /></a>
                <a href="#how-it-works" className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-[#333] text-[#A5A29B] text-xs font-mono uppercase tracking-wider">See how it works</a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#1b1c1f]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
            <div className="max-w-3xl">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C8AE82]">The money leak</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">You already paid to get the enquiry.</h2>
              <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-[#A5A29B]">
                <p>You run an advert. Someone asks for a price. A staff member is busy. The reply comes hours later—or the next day.</p>
                <p>Or the first reply goes out, but nobody follows up when the customer disappears.</p>
                <p>That is where potential sales can die. <strong className="text-[#F3F0EA]">This system is built to close that gap.</strong></p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ['Slow first response', 'The customer contacts another business while your team is still busy.'],
                ['No follow-up', 'The lead was interested, then the conversation simply stops.'],
                ['Forgotten leads', 'Enquiries sit in inboxes, forms or spreadsheets with no next action.'],
                ['No clear view', 'You do not know which enquiries are waiting, active or lost.'],
              ].map(([title, body]) => (
                <div key={title} className="p-5 rounded-sm border border-[#222428] bg-[#0d0e10]">
                  <h3 className="text-sm font-bold text-[#F3F0EA]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#8f8c85]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-b border-[#1b1c1f]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C8AE82]">Example</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">What happens when a new customer comes in?</h2>
            <div className="mt-10 space-y-3 max-w-4xl">
              {steps.map(([title, body, Icon], index) => {
                const StepIcon = Icon as React.ComponentType<{ className?: string }>;
                return (
                  <div key={String(title)} className="grid grid-cols-[40px_1fr] gap-4 p-4 sm:p-5 rounded-sm border border-[#222428] bg-[#0d0e10]">
                    <div className="w-9 h-9 rounded-full border border-[#3a352d] flex items-center justify-center text-[#C8AE82] font-mono text-xs">{String(index + 1).padStart(2, '0')}</div>
                    <div>
                      <div className="flex items-center gap-2"><StepIcon className="w-4 h-4 text-[#C8AE82]" /><h3 className="text-sm font-semibold text-[#F3F0EA]">{title}</h3></div>
                      <p className="mt-2 text-sm leading-relaxed text-[#8f8c85]">{body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-[#1b1c1f]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-2 gap-10">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C8AE82]">Fits around your business</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Keep your current enquiry source.</h2>
              <p className="mt-5 text-base leading-relaxed text-[#A5A29B]">The goal is not to replace everything. We connect the enquiry source you already use and add the response and follow-up layer around it, where the existing system supports it.</p>
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Website forms', 'Facebook / Instagram leads', 'WhatsApp enquiries', 'CRM or lead inboxes'].map((item) => (
                  <div key={item} className="flex items-center gap-2 p-3 rounded-sm border border-[#222428] text-sm text-[#D7D3CA]"><CheckCircle2 className="w-4 h-4 text-[#C8AE82]" />{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-sm border border-[#C8AE82]/40 bg-[#101112] p-7">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C8AE82]">Johannesburg pilot</p>
              <h2 className="mt-3 text-3xl font-semibold">10 businesses. 15 days.</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#A5A29B]">The first test is limited to a small group of Johannesburg businesses so we can measure real response and follow-up behaviour.</p>
              <div className="mt-7 space-y-3">
                <div className="flex items-end justify-between border-b border-[#25272b] pb-3"><span className="text-sm text-[#A5A29B]">Pilot setup</span><span className="text-2xl font-semibold">R990</span></div>
                <div className="flex items-end justify-between border-b border-[#25272b] pb-3"><span className="text-sm text-[#A5A29B]">Pilot monthly</span><span className="text-2xl font-semibold">R499</span></div>
                <div><p className="text-[11px] font-mono uppercase tracking-wider text-[#666]">Standard pricing after pilot</p><p className="mt-1 text-lg font-semibold text-[#D7D3CA]">R4,500 setup · R1,500/month</p></div>
              </div>
              <a href="/#contact" className="mt-7 inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#C8AE82] text-[#080909] font-bold text-xs uppercase tracking-wider">Start the pilot <ArrowRight className="w-4 h-4" /></a>
            </div>
          </div>
        </section>

        <section className="border-b border-[#1b1c1f]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
            <div className="max-w-3xl">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C8AE82]">For Johannesburg</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Built for businesses in Johannesburg, Sandton, Rosebank, Randburg, Midrand and Soweto.</h2>
              <p className="mt-5 text-base leading-relaxed text-[#A5A29B]">The first pilot is focused on businesses that already receive enquiries and want a simple way to make sure those enquiries get a response and a follow-up.</p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#1b1c1f]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C8AE82]">Questions</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Simple answers.</h2>
            <div className="mt-8 max-w-4xl space-y-3">
              {FAQS.map(([question, answer]) => (
                <details key={question} className="rounded-sm border border-[#222428] bg-[#0d0e10] p-5">
                  <summary className="cursor-pointer text-sm font-semibold text-[#F3F0EA]">{question}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#8f8c85]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 text-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C8AE82]">NahaLabs</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight">Stop letting good enquiries disappear.</h2>
            <p className="mt-5 max-w-2xl mx-auto text-base leading-relaxed text-[#A5A29B]">Connect your existing enquiry source to a response and follow-up system that keeps working after the first message.</p>
            <a href="/#contact" className="mt-8 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C8AE82] text-[#080909] font-bold text-xs uppercase tracking-wider">Apply for the Johannesburg pilot <ArrowRight className="w-4 h-4" /></a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1b1c1f] bg-[#050606]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-[#666]">
          <span>© 2026 NahaLabs (PTY) Ltd · Johannesburg · South Africa</span>
          <div className="flex items-center gap-4"><a href="/" className="hover:text-[#F3F0EA]">Home</a><a href="/insights" className="hover:text-[#F3F0EA]">Insights</a><a href="/#contact" className="hover:text-[#F3F0EA]">Contact</a></div>
        </div>
      </footer>
    </div>
  );
};

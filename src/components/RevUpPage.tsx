import React, { useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';

const SITE = 'https://www.nahalabs.co.za';
const PATH = '/revup';
const APP_URL = 'https://nahalabs-growth.onrender.com';
const API_DOCS_URL = 'https://nahalabs-growth.onrender.com/api/v1/docs';
const TITLE = 'RevUp | WhatsApp Employee & Social Growth Engine | NahaLabs';
const DESCRIPTION =
  "RevUp is NahaLabs' growth system for restaurants and local businesses: pair the business WhatsApp in minutes, answer every customer, scout local demand and turn it into social posts the owner approves.";

const capabilities = [
  ['WhatsApp employee', 'Answers menu, price, hours and booking questions on the business number, day and night. Every conversation is recorded for the owner.'],
  ['Pairing in minutes', "Phone number and a one-time code on NahaLabs' own WhatsApp system. No Meta approval queue, no developer account, no waiting."],
  ['Demand radar', 'Watches local food trends and what nearby customers are asking for, so the menu and the marketing move first.'],
  ['Content agent', 'Turns demand signals and real customer questions into post drafts in the business voice. The owner steers niche, topics and pace - or switches it off.'],
  ['Approval-first publishing', 'Nothing posts itself. Drafts land in a review queue; approved posts are scheduled and published to the connected social channels.'],
  ['Inbox and analytics', 'One inbox for customer messages with drafted replies, plus per-post and per-channel analytics that show what the content earns.'],
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
      serviceType: 'Customer engagement and social growth for restaurants and local businesses',
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
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">NAHALABS / RESTAURANT &amp; LOCAL BUSINESS GROWTH</p>
              <h1 className="mt-5 text-display font-semibold tracking-tight">
                Your WhatsApp line should do more than answer messages.
              </h1>
              <p className="mt-7 max-w-3xl text-lead text-fg-2">
                RevUp is a growth system for restaurants and local businesses. It pairs with the business WhatsApp by phone number and code, answers every customer, scouts local demand and turns what it learns into social posts the owner approves before anything goes out.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={APP_URL} className="btn btn-primary">
                  Start the 7-day trial <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/contact" className="btn btn-outline">
                  Talk to NahaLabs
                </a>
              </div>
            </div>

            <div className="mt-14 grid md:grid-cols-5 border-y border-line">
              {[
                ['01', 'Pair', 'Phone number and a code. Live in minutes.'],
                ['02', 'Answer', 'Every customer gets a reply, day and night.'],
                ['03', 'Scout', 'Local demand surfaces before it is obvious.'],
                ['04', 'Draft', 'Posts written from real trends and real chats.'],
                ['05', 'Publish', 'The owner approves. The system posts.'],
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
              <h2 className="mt-3 text-h1 font-semibold">Missed message → lost customer → no time to post → invisible online.</h2>
            </div>
            <div className="space-y-5 text-body leading-relaxed text-fg-2">
              <p>
                Restaurants rarely lose business because the food is wrong. They lose it in the gaps: the lunch-time enquiry answered at four in the afternoon, the regular who never hears about the special, the social page that has not posted in three weeks because service comes first.
              </p>
              <p>
                RevUp is built around those gaps. The same system that answers the customer also watches what the neighbourhood is asking for, and turns both into content the owner reviews in minutes.
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
                RevUp is not another inbox and not another scheduler. It is one working loop: talk to customers, learn what they want, publish what wins.
              </p>
            </div>

            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 border-t border-line">
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
              <h2 className="mt-3 text-h1 font-semibold">Built around the way an owner actually runs the floor.</h2>
            </div>
            <div>
              <ul className="rule-list">
                {[
                  'Pairs with the business WhatsApp by phone number and one-time code.',
                  'Answers customer enquiries around the clock, in the tone of the house.',
                  'Scans local demand signals and turns them into content ideas.',
                  'Drafts posts for review - the owner approves, edits or discards each one.',
                  'Schedules approved posts to the connected social channels.',
                  'Records every message, draft and post as evidence the owner can check.',
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
              <h2 className="mt-3 text-h1 font-semibold">Most tools answer. RevUp hunts.</h2>
            </div>
            <div className="space-y-5 text-body leading-relaxed text-fg-2">
              <p>
                An answering bot waits for the phone to ring. RevUp works the quiet hours too: scouting what the area is asking for, watching which posts pull, and queueing the next draft before the owner asks.
              </p>
              <p>
                Customer chats become content, content becomes reach, and reach becomes more customers. That loop is the product.
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
                Every post waits in a review queue until a person approves it. The content agent takes direction on niche, topics and pace, and can be paused at any time.
              </p>
              <p>
                The 7-day trial runs the full system. When it ends, the workspace pauses and NahaLabs helps the owner choose the right plan - nothing is charged and nothing is lost.
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
                Every workspace includes a public API and an MCP endpoint: scoped keys for drafts, scheduling, media, inbox and analytics, so an operator&apos;s own systems can run the desk programmatically.
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
                  Pair the business WhatsApp, watch the first drafts arrive and approve what goes out. The trial runs the full system for 7 days; after that the workspace pauses until you choose a plan with NahaLabs.
                </p>
              </div>
              <a href={APP_URL} className="btn btn-primary shrink-0">
                Start the trial <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

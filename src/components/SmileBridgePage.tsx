import React, { useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';

const SITE = 'https://www.nahalabs.co.za';
const PATH = '/smile-bridge';
const TITLE = 'Smile Bridge | Patient Conversion for Dental Practices | NahaLabs';
const DESCRIPTION =
  'Smile Bridge is NahaLabs\' patient conversion system for dental practices: a short practice video, one question at a time, and every visitor routed to booking, WhatsApp or a callback - with emergencies escalated first.';

const dropOffs = [
  ['After-hours visitors', 'Most treatment research happens in the evening. The website lists a phone number; nobody answers until morning.'],
  ['Unanswered questions', 'A patient comparing implants or braces has real questions. A static page cannot answer them, so the comparison continues elsewhere.'],
  ['Anxious patients', 'The patients who most need reassurance are the least likely to phone a reception desk cold.'],
  ['Dormant patients', 'Recall and check-up reminders depend on memory and manual lists, so quiet patients quietly disappear.'],
  ['Emergencies in the same queue', 'A broken tooth and a whitening enquiry look identical in an inbox. One needs a person now.'],
  ['No record of interest', 'The practice never learns who visited, what they asked or where they left.'],
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
      name: 'Smile Bridge',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: DESCRIPTION,
      url: SITE + PATH,
      creator: { '@id': SITE + '/#organization' },
    },
    {
      '@type': 'Service',
      '@id': SITE + PATH + '#service',
      name: 'Smile Bridge',
      serviceType: 'Patient engagement and conversion for dental practices',
      provider: { '@id': SITE + '/#organization' },
      areaServed: { '@type': 'Country', name: 'South Africa' },
      url: SITE + PATH,
      description: DESCRIPTION,
    },
  ],
});

export const getSmileBridgeJsonLd = getJsonLd;

export const SmileBridgePage: React.FC = () => {
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

    const oldJsonLd = document.getElementById('nahalabs-smilebridge-jsonld');
    oldJsonLd?.remove();
    const script = document.createElement('script');
    script.id = 'nahalabs-smilebridge-jsonld';
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
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">NAHALABS / PATIENT ENGAGEMENT &middot; IN PILOT</p>
              <h1 className="mt-5 text-display font-semibold tracking-tight">
                Your practice website should do more than list a phone number.
              </h1>
              <p className="mt-7 max-w-3xl text-lead text-fg-2">
                Smile Bridge is a patient conversion system for dental practices. A short practice video greets the
                visitor, one question at a time finds out what they need, and every patient is routed to the right next
                step - booking, WhatsApp or a callback - with emergencies escalated to a person first.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/contact" className="btn btn-primary">
                  See it on your practice <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/#systems" className="btn btn-outline">
                  Explore the systems
                </a>
              </div>
            </div>

            <div className="mt-14 grid md:grid-cols-5 border-y border-line">
              {[
                ['01', 'Greet', 'A short practice video opens the conversation.'],
                ['02', 'Ask', 'One question at a time, from an approved bank.'],
                ['03', 'Route', 'Deterministic rules decide the next step.'],
                ['04', 'Act', 'Booking, WhatsApp or callback - with consent.'],
                ['05', 'Record', 'Every step becomes lead evidence.'],
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
              <h2 className="mt-3 text-h1 font-semibold">Website visit → phone rings → reception is busy → patient books elsewhere.</h2>
            </div>
            <div className="space-y-5 text-body leading-relaxed text-fg-2">
              <p>
                Dental practices rarely lose patients because the dentistry is wrong. They lose them in the gap between
                interest and contact: the evening researcher who cannot ask a question, the anxious patient who will not
                phone, the emergency that sits behind routine enquiries.
              </p>
              <p>
                Smile Bridge is designed around that gap. It meets the visitor on the website, in the practice&apos;s own
                voice, and moves each one to a concrete next step the practice can act on.
              </p>
            </div>
          </div>
        </section>

        <section className="section border-b border-line">
          <div className="wrap">
            <div className="max-w-3xl">
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">PATIENT DROP-OFFS</p>
              <h2 className="mt-3 text-h1 font-semibold">Find the patients disappearing between interest and appointment.</h2>
              <p className="mt-5 text-body text-fg-2">
                Smile Bridge makes patient drop-off visible. Instead of a contact form and a hope, the practice gets a
                working view of who visited, what they needed and what happened next.
              </p>
            </div>

            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 border-t border-line">
              {dropOffs.map(([title, body]) => (
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
              <h2 className="mt-3 text-h1 font-semibold">Built around the way a practice actually talks to patients.</h2>
            </div>
            <div>
              <ul className="rule-list">
                {[
                  'Opens with a short video scene from the practice, not a stock chatbot bubble.',
                  'Asks one question at a time from a question bank the practice approves.',
                  'Checks for emergency signals before anything else and escalates to a person.',
                  'Routes each patient with deterministic rules to booking, WhatsApp or a callback.',
                  'Captures contact details with explicit consent before any follow-up.',
                  'Records every funnel step as evidence the practice can review and measure.',
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
              <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">HARD BOUNDARIES</p>
              <h2 className="mt-3 text-h1 font-semibold">Where the system stops.</h2>
            </div>
            <div className="space-y-5 text-body leading-relaxed text-fg-2">
              <p>
                Smile Bridge does not diagnose, prescribe or give clinical advice. Where routing intelligence is used,
                it selects the next question only from the practice&apos;s approved bank - it never invents a clinical
                answer.
              </p>
              <p>
                Emergency symptoms are never handled by automation. They are escalated to a person first, every time.
                Patient data practices follow the same evidence discipline as every NahaLabs system: consent before
                capture, and a record the practice controls.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="border border-line-strong bg-surface p-7 sm:p-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <p className="text-caption font-mono uppercase tracking-[0.2em] text-accent">IN PILOT</p>
                <h2 className="mt-3 text-h1 font-semibold">See Smile Bridge on your practice&apos;s own material.</h2>
                <p className="mt-4 max-w-2xl text-body text-fg-2">
                  Smile Bridge is in pilot. We demonstrate it on your practice&apos;s approved questions, services and
                  brand - your real patient journey, not a generic showreel - before anything touches live patient data.
                </p>
              </div>
              <a href="/contact" className="btn btn-primary shrink-0">
                Talk to NahaLabs <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

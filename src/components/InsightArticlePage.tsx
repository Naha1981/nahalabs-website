import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';

const ARTICLE_PATH = '/insights/hidden-cost-fragmented-operational-information';
const TITLE = 'The Hidden Cost of Fragmented Operational Information';
const DESCRIPTION = 'South African businesses have more operational data than ever, but fragmented systems make delays, costs and disputes difficult to reconstruct.';
const HERO_IMAGE_URL = '/insights/hidden-cost-fragmented-operational-information/hero.svg';
const VIDEO_URL = '';
const MEDIA_ALT_TEXT = 'NahaLabs visual showing fragmented operational evidence connecting port events, fleet movement, commercial rules and financial exposure';

const upsertMeta = (selector: string, attrs: Record<string, string>, content: string) => {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    Object.entries(attrs).forEach(([key, value]) => el?.setAttribute(key, value));
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

export const InsightArticlePage: React.FC = () => {
  useEffect(() => {
    const canonicalUrl = `https://nahalabs.co.za${ARTICLE_PATH}`;
    document.title = `${TITLE} | NahaLabs`;

    upsertMeta('meta[name="description"]', { name: 'description' }, DESCRIPTION);
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, 'article');
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, `${TITLE} | NahaLabs`);
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, DESCRIPTION);
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, 'NahaLabs');
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale' }, 'en_ZA');
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, `${TITLE} | NahaLabs`);
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, DESCRIPTION);

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const existingJsonLd = document.getElementById('nahalabs-insight-jsonld');
    if (existingJsonLd) existingJsonLd.remove();

    const script = document.createElement('script');
    script.id = 'nahalabs-insight-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: TITLE,
      description: DESCRIPTION,
      author: {
        '@type': 'Organization',
        name: 'NahaLabs',
        url: 'https://nahalabs.co.za',
      },
      publisher: {
        '@type': 'Organization',
        name: 'NahaLabs',
        url: 'https://nahalabs.co.za',
      },
      datePublished: '2026-09-21',
      dateModified: '2026-09-21',
      mainEntityOfPage: canonicalUrl,
      articleSection: 'Intelligent Revenue & Operations',
      keywords: [
        'fragmented operational information',
        'logistics intelligence',
        'demurrage',
        'freight intelligence',
        'AI Opportunity Engineering',
      ],
      inLanguage: 'en-ZA',
    });
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#080909] text-[#F3F0EA]">
      <header className="sticky top-0 z-40 border-b border-[#1b1c1f] bg-[#080909]/92 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[#A5A29B] hover:text-[#F3F0EA] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            NahaLabs
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18191c] hover:bg-[#C8AE82] text-[#F3F0EA] hover:text-[#080909] border border-[#2b2d35] hover:border-[#C8AE82] text-[10px] font-mono uppercase tracking-wider font-semibold transition-all"
          >
            Start a conversation
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      <main>
        <article className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C8AE82] mb-5">
              NahaLabs Intelligence · Intelligent Revenue & Operations
            </div>
            <h1 className="text-4xl sm:text-6xl leading-[1.02] font-semibold tracking-[-0.035em] text-[#F3F0EA]">
              {TITLE}
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#A5A29B]">
              How fragmented operational data turns delays into financial exposure.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.16em] text-[#666]">
              <span>21 September 2026</span>
              <span>·</span>
              <span>South Africa</span>
              <span>·</span>
              <span>CargoIQ</span>
            </div>

            {HERO_IMAGE_URL && (
              <figure className="mt-10 overflow-hidden rounded-2xl border border-[#24262a] bg-[#0d0e10]">
                <img src={HERO_IMAGE_URL} alt={MEDIA_ALT_TEXT} className="w-full h-auto" loading="eager" />
                <figcaption className="px-4 py-3 text-[10px] font-mono uppercase tracking-[0.14em] text-[#666]">
                  NahaLabs Intelligence · Evidence → Operations → Financial consequence
                </figcaption>
              </figure>
            )}

            {VIDEO_URL && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-[#24262a] bg-black aspect-video">
                {/\\.(mp4|webm|ogg)(\\?|$)/i.test(VIDEO_URL) ? (
                  <video className="w-full h-full" controls preload="metadata" src={VIDEO_URL} />
                ) : (
                  <iframe
                    className="w-full h-full"
                    src={VIDEO_URL}
                    title={TITLE + ' video'}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
            )}
          </div>

          <div className="mt-14 sm:mt-20 max-w-3xl space-y-10 text-[17px] sm:text-[18px] leading-[1.85] text-[#D7D3CA]">
            <section className="space-y-6">
              <p>A delayed truck is visible.</p>
              <p>A delayed vessel is visible.</p>
              <p>A container sitting in a terminal is visible.</p>
              <p>What is much harder to see is the chain of evidence connecting those events to the invoice that eventually arrives weeks later.</p>
              <p>That is where an expensive operational problem begins.</p>
              <p>Across South Africa's freight and logistics environment, important information can be distributed across fleet telematics, terminal systems, vessel data, invoices, tariff schedules, email, messaging platforms, spreadsheets and customer portals.</p>
              <p>Each system may contain a legitimate piece of the truth.</p>
              <p>The problem is that the business often has no unified way to reconstruct the whole event.</p>
              <p>That matters because logistics costs are frequently time-dependent.</p>
              <p>A few hours can become another day of detention. A missed free-time window can become demurrage. A terminal disruption can create standing time, storage exposure or downstream customer disruption.</p>
              <p>And once the invoice arrives, the question is no longer simply:</p>
              <blockquote className="border-l-2 border-[#C8AE82] pl-6 text-[#F3F0EA] font-medium">
                What did we get charged?
              </blockquote>
              <p>It becomes:</p>
              <blockquote className="border-l-2 border-[#C8AE82] pl-6 text-[#F3F0EA] font-medium">
                What actually happened, when did it happen, which evidence proves it, and which part of the charge is supported by the underlying events?
              </blockquote>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F0EA]">Durban provides a useful real-world example</h2>
              <div className="mt-6 space-y-6">
                <p>In August 2026, Durban Gateway Terminal went through a major transition to the NAVIS N4 terminal operating system.</p>
                <p>Following the transition, the South African Freight and Logistics Association and the Road Freight Association reported that weekly container throughput declined by 26%, while reported terminal waiting times reached eight to twelve days. Industry reporting also cited average July vessel anchorage and berth delays of about 80 and 106 hours respectively.</p>
                <p>These are <strong>source-reported industry figures</strong>, not independent NahaLabs measurements.</p>
                <p>The consequences were not limited to vessels. Industry reporting also described severe landside pressure and reefer congestion at Durban Gateway Terminal.</p>
                <p>A separate regulatory matter illustrates the commercial tension created by such conditions. Positive Freight Solutions' Container Division, representing 140 transporters and about 6,000 workers, filed a complaint with the Competition Commission concerning Durban Gateway Terminal, Transnet and eight shipping lines. The matter was subject to preliminary assessment; the complaint is an allegation, not a finding of unlawful conduct.</p>
                <p>The important point is not which party is ultimately responsible.</p>
                <p>It is that a disruption creates a <strong>multi-party evidence problem</strong>.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F0EA]">The clock does not exist in one place</h2>
              <div className="mt-6 space-y-6">
                <p>Consider a simplified container journey.</p>
                <p>The vessel is discharged.</p>
                <p>The container becomes available.</p>
                <p>A truck is dispatched.</p>
                <p>The truck enters a staging area.</p>
                <p>The truck waits.</p>
                <p>A terminal transaction eventually occurs.</p>
                <p>The container leaves the terminal.</p>
                <p>Later, an invoice arrives.</p>
                <p>Every one of those events may exist somewhere.</p>
                <p>But they may exist in different systems.</p>
                <p>The vessel event could be in an AIS data feed.</p>
                <p>The truck movement could be in a telematics platform.</p>
                <p>The terminal transaction could sit inside a terminal operating system or appear on a receipt.</p>
                <p>The commercial rule could exist in a carrier tariff PDF.</p>
                <p>The invoice could arrive by email.</p>
                <p>The explanation for the delay could be sitting in a WhatsApp conversation.</p>
                <p>The result is a fragmented operational record.</p>
                <p>And fragmented records create an uncomfortable question:</p>
                <blockquote className="border-l-2 border-[#C8AE82] pl-6 text-[#F3F0EA] font-medium">Which clock should the business trust?</blockquote>
                <p>That is particularly important because demurrage and detention are explicitly time-based commercial mechanisms.</p>
                <p>Maersk's published South African import demurrage and detention revision, effective 15 April 2026, lists three days of import demurrage free time for standard dry containers at Durban's Pier 1, Pier 2 and Point. The same published schedule lists R2,698 per day on Day 4 and R4,391 per day from Day 5 for a 20-foot dry container.</p>
                <p>These are <strong>Maersk-specific published tariff terms</strong>, not universal South African carrier tariffs.</p>
                <p>
                  Source:{' '}
                  <a className="text-[#C8AE82] hover:text-[#E5D1B0] underline underline-offset-4" href="https://www.maersk.com/news/articles/2026/03/13/south-africa-import-demurrage-detention-revision-april" target="_blank" rel="noreferrer">
                    Maersk South Africa Import Demurrage & Detention Revision
                    <ExternalLink className="inline w-3.5 h-3.5 ml-1" />
                  </a>
                </p>
                <p>The commercial lesson is simple:</p>
                <p className="text-[#F3F0EA] font-semibold">Time is not just an operational metric. It is a financial variable.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F0EA]">South Africa's ports already recognise the cost of operational performance</h2>
              <div className="mt-6 space-y-6">
                <p>This is not only an argument made by logistics companies.</p>
                <p>The Ports Regulator of South Africa's 2026/27 Record of Decision approved an overall weighted average tariff increase of 7.57%. It also recorded a R247 million Weighted Efficiency Gains from Operations adjustment in favour of port users following a weighted efficiency loss.</p>
                <p>
                  Source:{' '}
                  <a className="text-[#C8AE82] hover:text-[#E5D1B0] underline underline-offset-4" href="https://portsregulator.org/wp-content/uploads/2025/12/2026-27-Tariff-Record-of-Decision-signed.pdf" target="_blank" rel="noreferrer">
                    Ports Regulator 2026/27 Record of Decision
                    <ExternalLink className="inline w-3.5 h-3.5 ml-1" />
                  </a>
                </p>
                <p>That does not prove that every demurrage or storage charge is invalid.</p>
                <p>It demonstrates something more fundamental:</p>
                <p className="text-[#F3F0EA] font-semibold">Operational performance has measurable economic consequences.</p>
                <p>Once time affects money, reliable event evidence becomes commercially important.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F0EA]">The problem is not a lack of software</h2>
              <div className="mt-6 space-y-6">
                <p>Most large logistics organisations already have substantial software.</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>a TMS for shipment execution;</li>
                  <li>ERP and finance systems for invoices and payments;</li>
                  <li>fleet telematics for vehicle movements;</li>
                  <li>visibility platforms for shipment tracking;</li>
                  <li>carrier portals for bookings and documents;</li>
                  <li>terminal systems for container transactions.</li>
                </ul>
                <p>The problem is that these systems were generally designed to perform their own jobs.</p>
                <p>A fleet system knows where a truck was.</p>
                <p>A terminal system knows what happened inside the terminal.</p>
                <p>An invoice system knows what was billed.</p>
                <p>A vessel-tracking system knows where a ship was.</p>
                <p>A tariff document explains how a charge should be calculated.</p>
                <p>But the commercial investigation requires something different.</p>
                <p>It requires the systems to be viewed together.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F0EA]">The missing layer is evidence orchestration</h2>
              <div className="mt-6 space-y-6">
                <p>Imagine that one container generates the following evidence:</p>
                <div className="rounded-xl border border-[#24262a] bg-[#0d0e10] p-5 sm:p-7 font-mono text-sm leading-8 text-[#D7D3CA]">
                  <div><span className="text-[#C8AE82]">08:10</span> — truck enters staging area.</div>
                  <div><span className="text-[#C8AE82]">10:35</span> — terminal transaction remains unavailable.</div>
                  <div><span className="text-[#C8AE82]">14:20</span> — carrier or terminal advisory reports operational disruption.</div>
                  <div><span className="text-[#C8AE82]">17:45</span> — truck receives access instruction.</div>
                  <div><span className="text-[#C8AE82]">18:30</span> — truck enters terminal.</div>
                  <div><span className="text-[#C8AE82]">19:10</span> — container is collected.</div>
                </div>
                <p>Separately, the commercial system calculates a charge based on the applicable free-time rules.</p>
                <p>The invoice does not necessarily contain the operational story.</p>
                <p>The operational systems do not necessarily calculate the financial consequence.</p>
                <p>And the finance team does not necessarily have the time or tools to reconstruct the evidence chain manually for every disputed charge.</p>
                <p>That is the gap.</p>
                <p>The opportunity is not simply another dashboard.</p>
                <p>It is an <strong>evidence layer</strong> that connects operational events, commercial rules and financial consequences.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F0EA]">What an intelligent system changes</h2>
              <div className="mt-6 space-y-6">
                <p>The useful application of AI here is not to let a model decide who is legally liable.</p>
                <p>It is to make fragmented information usable.</p>
                <p>An intelligent system could ingest:</p>
                <p><strong>Operational evidence</strong></p>
                <p>GPS and telematics, terminal receipts, vessel movements, gate transactions and operational advisories.</p>
                <p><strong>Commercial evidence</strong></p>
                <p>Invoices, bills of lading, contracts, tariff schedules and free-time rules.</p>
                <p><strong>Contextual evidence</strong></p>
                <p>Weather events, port notices, equipment outages, customs status and other documented external events.</p>
                <p><strong>Unstructured communication</strong></p>
                <p>Emails, PDFs and authorised messaging records.</p>
                <p>The system can then reconstruct a common event timeline.</p>
                <p>It can identify conflicting timestamps.</p>
                <p>It can identify missing evidence.</p>
                <p>It can compare the reconstructed timeline with the applicable commercial rules.</p>
                <p>And it can calculate the financial consequence using deterministic rules rather than asking an AI model to invent the number.</p>
                <p>That distinction matters.</p>
                <div className="rounded-xl border border-[#24262a] bg-[#0d0e10] p-6 sm:p-8 space-y-3 text-[#F3F0EA] font-medium">
                  <div>AI should help organise and interpret the evidence.</div>
                  <div>Rules should calculate the money.</div>
                  <div>Humans should approve material conclusions.</div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F0EA]">The goal is not automatic legal judgment</h2>
              <div className="mt-6 space-y-6">
                <p>A credible enterprise system should not say:</p>
                <blockquote className="border-l-2 border-[#8f5f5f] pl-6 text-[#F3F0EA]">“The terminal is legally responsible.”</blockquote>
                <p>That is a legal conclusion.</p>
                <p>The system should instead say something closer to:</p>
                <blockquote className="border-l-2 border-[#C8AE82] pl-6 text-[#F3F0EA]">
                  “The available evidence shows that the truck entered the staging area at 08:10, terminal access was recorded at 17:45, and the attached terminal advisory reports an operational interruption during the intervening period. The evidence currently supports a review of whether this period should be included in the charge calculation.”
                </blockquote>
                <p>That is more useful.</p>
                <p>It is precise.</p>
                <p>It is auditable.</p>
                <p>It shows the source of the conclusion.</p>
                <p>And it leaves the final commercial or legal decision with the appropriate human reviewer.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F0EA]">This is why fragmented information becomes expensive</h2>
              <div className="mt-6 space-y-6">
                <p>The cost of fragmented information is not simply the cost of switching between applications.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    ['Unmeasured operational time', 'Hours that exist physically but are difficult to prove commercially.'],
                    ['Invoice leakage', 'Charges that require investigation but may never be challenged because the evidence is scattered.'],
                    ['Administrative effort', 'Employees searching through emails, PDFs, spreadsheets, tracking systems and portals to reconstruct one shipment.'],
                    ['Dispute risk', 'A business may know that a charge looks wrong without having a sufficiently organised evidence package to support the challenge.'],
                  ].map(([title, body]) => (
                    <div key={title} className="rounded-xl border border-[#24262a] bg-[#0d0e10] p-5 sm:p-6">
                      <div className="text-[#F3F0EA] font-semibold">{title}</div>
                      <div className="mt-2 text-sm leading-7 text-[#A5A29B]">{body}</div>
                    </div>
                  ))}
                </div>
                <p><strong>Management blind spots.</strong> Leadership sees individual delays and individual invoices, but not the recurring pattern connecting them.</p>
                <p>That last point is particularly important.</p>
                <p>A single disputed invoice is a finance problem.</p>
                <p>A recurring pattern of disputed invoices caused by the same operational condition is a systems problem.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F0EA]">What the intelligent-systems opportunity looks like</h2>
              <div className="mt-6 space-y-6">
                <p>At NahaLabs, we call this <strong>AI Opportunity Engineering</strong>.</p>
                <p>The question is not:</p>
                <blockquote className="border-l-2 border-[#C8AE82] pl-6 text-[#F3F0EA]">“Where can we add AI?”</blockquote>
                <p>The better question is:</p>
                <blockquote className="border-l-2 border-[#C8AE82] pl-6 text-[#F3F0EA] font-medium">“What important business problem becomes solvable when the right software, data and AI are combined into an intelligent system?”</blockquote>
                <p>For logistics, one answer is the ability to move from fragmented operational records to an evidence-backed financial investigation.</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    ['Diagnosis', 'Analyse historical shipments, invoices, operational events and dispute outcomes. Find where money is being lost, where evidence is missing, and which recurring events create exposure.'],
                    ['Prototype', 'Take one corridor, one customer, one dispute type or one recurring charge. Combine the available evidence sources, reconstruct the timeline and test the calculations against historical cases.'],
                    ['Production', 'Integrate the evidence layer with existing operational systems. Create controlled workflows for investigation, review, approval and recovery, with provenance and human oversight.'],
                  ].map(([title, body]) => (
                    <div key={title} className="rounded-xl border border-[#24262a] bg-[#0d0e10] p-5 sm:p-6">
                      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C8AE82]">{title}</div>
                      <div className="mt-3 text-sm leading-7 text-[#A5A29B]">{body}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F0EA]">The bigger lesson</h2>
              <div className="mt-6 space-y-6">
                <p>The Durban disruption illustrates a broader pattern that exists far beyond ports.</p>
                <p>Businesses increasingly have large amounts of operational information.</p>
                <p>What they often lack is a reliable way to connect that information into a coherent explanation of what happened and what it cost.</p>
                <p>That is the hidden cost of fragmented operational information.</p>
                <p>The information already exists.</p>
                <p>The problem is that it exists in pieces.</p>
                <p>The next generation of enterprise systems will increasingly be judged not by how much data they collect, but by whether they can turn fragmented evidence into <strong>trusted operational state, explainable decisions and measurable commercial outcomes</strong>.</p>
                <p>That is the difference between adding AI to a workflow and engineering an intelligent system around a business problem.</p>
              </div>
            </section>

            <section className="rounded-2xl border border-[#2a2c30] bg-[#0c0d0e] p-7 sm:p-10">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C8AE82]">NahaLabs Perspective</div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-[#F3F0EA]">Diagnosis → Prototype → Production</h2>
              <div className="mt-5 space-y-4 text-[#A5A29B]">
                <p>NahaLabs builds intelligent systems for business problems that are too specific for generic software and too important to manage manually.</p>
                <p>In logistics, that can mean connecting operational evidence, commercial rules and financial outcomes into one controlled investigation workflow.</p>
                <p>The objective is not more software.</p>
                <p className="text-[#F3F0EA] font-semibold">It is better evidence, faster decisions and measurable recovery.</p>
              </div>
              <a href="/#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#C8AE82] hover:text-[#E5D1B0] transition-colors">
                Talk to NahaLabs about an operational evidence audit
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </section>

            <section className="pt-2 border-t border-[#1b1c1f]">
              <h2 className="pt-10 text-xl font-semibold text-[#F3F0EA]">Evidence & claim discipline</h2>
              <div className="mt-5 space-y-3 text-sm leading-7 text-[#A5A29B]">
                <p><strong className="text-[#F3F0EA]">FACT:</strong> Maersk's published South African tariff terms and the Ports Regulator's 2026/27 Record of Decision.</p>
                <p><strong className="text-[#F3F0EA]">SOURCE-REPORTED CLAIM:</strong> Durban Gateway Terminal disruption figures reported by SAFLA/RFA and industry publications.</p>
                <p><strong className="text-[#F3F0EA]">ANALYSIS:</strong> The interpretation that fragmented operational evidence creates an investigation and commercial-control gap.</p>
                <p><strong className="text-[#F3F0EA]">INFERENCE:</strong> Connecting evidence sources can reduce the manual effort required to reconstruct operational events.</p>
                <p><strong className="text-[#F3F0EA]">HYPOTHESIS:</strong> A production evidence-fusion system can materially improve recovery and dispute handling when validated against historical cases.</p>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-mono uppercase tracking-[0.18em] text-[#C8AE82]">Primary sources and reporting</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <a className="block text-[#A5A29B] hover:text-[#C8AE82] transition-colors" href="https://www.maersk.com/news/articles/2026/03/13/south-africa-import-demurrage-detention-revision-april" target="_blank" rel="noreferrer">
                    Maersk — South Africa Import Demurrage and Detention Revision
                  </a>
                  <a className="block text-[#A5A29B] hover:text-[#C8AE82] transition-colors" href="https://portsregulator.org/wp-content/uploads/2025/12/2026-27-Tariff-Record-of-Decision-signed.pdf" target="_blank" rel="noreferrer">
                    Ports Regulator of South Africa — 2026/27 Record of Decision
                  </a>
                  <a className="block text-[#A5A29B] hover:text-[#C8AE82] transition-colors" href="https://www.freightnews.co.za/article/safla-and-rfa-propose-dgt-recovery-compact" target="_blank" rel="noreferrer">
                    Freight News — SAFLA and RFA propose DGT recovery compact
                  </a>
                  <a className="block text-[#A5A29B] hover:text-[#C8AE82] transition-colors" href="https://www.freightnews.co.za/article/durban-gateway-vessels-face-80-hour-anchorage-delays" target="_blank" rel="noreferrer">
                    Freight News — Durban Gateway vessel delays
                  </a>
                </div>
              </div>
            </section>
          </div>
        </article>
      </main>

      <footer className="border-t border-[#1b1c1f] bg-[#050606]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <div className="text-sm font-bold tracking-[0.22em] text-[#F3F0EA]">NAHALABS</div>
            <div className="mt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#666]">AI Opportunity Engineering</div>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-[11px] font-mono uppercase tracking-[0.14em] text-[#666]">
            <a href="/" className="hover:text-[#F3F0EA] transition-colors">Home</a>
            <a href="/#contact" className="hover:text-[#F3F0EA] transition-colors">Contact</a>
            <a href="mailto:ai-solutions@nahalabs.co.za" className="hover:text-[#C8AE82] transition-colors">ai-solutions@nahalabs.co.za</a>
          </div>
        </div>
      </footer>
    </div>
  );
};


export const InsightIndexPage: React.FC = () => (
  <div className="min-h-screen bg-[#080909] text-[#F3F0EA]">
    <header className="sticky top-0 z-40 border-b border-[#1b1c1f] bg-[#080909]/92 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[#A5A29B] hover:text-[#F3F0EA] transition-colors"
        >
          NahaLabs
        </a>
        <a
          href="/#contact"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18191c] hover:bg-[#C8AE82] text-[#F3F0EA] hover:text-[#080909] border border-[#2b2d35] hover:border-[#C8AE82] text-[10px] font-mono uppercase tracking-wider font-semibold transition-all"
        >
          Start a conversation
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>

    <main className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <div className="max-w-3xl">
        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C8AE82]">
          NahaLabs Intelligence
        </div>
        <h1 className="mt-5 text-4xl sm:text-6xl leading-[1.02] font-semibold tracking-[-0.035em]">
          Business problems worth understanding before they become software.
        </h1>
        <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#A5A29B]">
          Evidence-led field notes on intelligent systems, revenue, operations, logistics and the places where fragmented information becomes expensive.
        </p>
      </div>

      <div className="mt-14 grid gap-6 max-w-4xl">
        <a
          href={ARTICLE_PATH}
          className="group rounded-2xl border border-[#24262a] bg-[#0c0d0e] p-7 sm:p-9 hover:border-[#C8AE82]/60 transition-all"
        >
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.16em] text-[#666]">
            <span className="text-[#C8AE82]">Intelligent Revenue & Operations</span>
            <span>·</span>
            <span>21 September 2026</span>
          </div>
          <h2 className="mt-5 text-2xl sm:text-4xl font-semibold tracking-tight text-[#F3F0EA] group-hover:text-[#E5D1B0] transition-colors">
            The Hidden Cost of Fragmented Operational Information
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-7 text-[#A5A29B]">
            South African businesses have more operational data than ever, but fragmented systems make delays, costs and disputes difficult to reconstruct.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#C8AE82]">
            Read intelligence
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </a>
      </div>
    </main>

    <footer className="border-t border-[#1b1c1f] bg-[#050606]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div>
          <div className="text-sm font-bold tracking-[0.22em]">NAHALABS</div>
          <div className="mt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#666]">AI Opportunity Engineering</div>
        </div>
        <a href="/" className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#666] hover:text-[#F3F0EA] transition-colors">
          Home
        </a>
      </div>
    </footer>
  </div>
);

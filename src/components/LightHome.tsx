import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { ContactSection } from './ContactSection';
import { Button, ButtonLink } from './Button';

interface HomeProps {
  onStartConversation: () => void;
}

const SYSTEMS = [
  {
    eyebrow: 'Hospitality',
    name: 'Flavourly',
    flow: 'Demand → Prep → Margin',
    title: 'Recover revenue hidden inside restaurant demand.',
    description:
      'Predictive kitchen prep, automated replenishment, supplier reconciliation and dish-level margin intelligence for high-volume food operations.',
    image: ASSETS.flavourly,
    alt: 'Restaurant operations representing Flavourly',
  },
  {
    eyebrow: 'Freight',
    name: 'CargoIQ',
    flow: 'Quote → Risk → Recovery',
    title: 'Protect freight margin before the loss appears.',
    description:
      'Carrier-rate validation, automated quote assembly and proactive detention and demurrage intelligence across African trade corridors.',
    image: ASSETS.cargoiq,
    alt: 'Freight terminal representing CargoIQ',
  },
  {
    eyebrow: 'Infrastructure',
    name: 'RailWatch',
    flow: 'Signal → Detection → Dispatch',
    title: 'Turn infrastructure signals into operational action.',
    description:
      'Predictive corridor monitoring, incident detection and evidence-backed dispatch intelligence for rail and heavy infrastructure.',
    image: ASSETS.railwatch,
    alt: 'Rail infrastructure representing RailWatch',
  },
  {
    eyebrow: 'Revenue',
    name: 'RevenueDesk',
    flow: 'Capture → Understand → Recover',
    title: 'Recover revenue hidden inside missed enquiries.',
    description:
      'An AI front desk for service businesses that captures enquiries, understands intent, handles follow-up and surfaces the revenue leaks that sit between first contact and booked work.',
    image: ASSETS.enterpriseJhb,
    alt: 'Johannesburg commercial environment representing RevenueDesk',
  },
];

const SIGNALS = [
  'Website',
  'WhatsApp',
  'ERP',
  'CRM',
  'Invoices',
  'Spreadsheets',
  'GPS',
  'Orders',
  'Payments',
  'Documents',
  'Reviews',
  'Email',
];

const OUTPUTS = ['Decisions', 'Predictions', 'Alerts', 'Actions', 'Recovery'];

const FAQS = [
  {
    q: 'What does NahaLabs actually build?',
    a: 'We engineer bespoke intelligent systems around a specific operational or commercial problem. That can include decision engines, AI digital workers, automation, integrations, computer vision and software — selected according to the problem rather than the technology trend.',
  },
  {
    q: 'Do you replace the software we already use?',
    a: 'Usually not. We prefer to build the intelligence layer across the systems you already depend on, connecting the signals that are trapped between them and turning those signals into action.',
  },
  {
    q: 'How does an engagement start?',
    a: 'Every engagement begins with diagnosis. We map the workflow, quantify the commercial friction and determine whether an intelligent system is technically and commercially justified before wider engineering starts.',
  },
];

function HeroFilm() {
  const [scene, setScene] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(query.matches);
    apply();
    query.addEventListener?.('change', apply);

    return () => query.removeEventListener?.('change', apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => setScene((value) => (value + 1) % SYSTEMS.length), 3600);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const current = SYSTEMS[scene];

  return (
    <figure className="nahafilm">
      <div className="nahafilm-media" aria-hidden="true">
        {SYSTEMS.map((item, index) => (
          <img
            key={item.name}
            src={item.image}
            alt=""
            className={`nahafilm-scene ${index === scene ? 'is-active' : ''}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
        <div className="nahafilm-wash" />
        <div className="nahafilm-grid" />
        <svg className="nahafilm-signal" viewBox="0 0 1000 560" preserveAspectRatio="none">
          <path d="M75 465 C280 350 330 230 515 280 C680 325 710 165 920 85" />
          <path d="M120 105 C285 145 340 315 510 300 C700 280 735 400 900 420" />
          <circle cx="515" cy="280" r="7" />
        </svg>
      </div>

      <div className="nahafilm-topline">
        <span>NAHALABS / REAL-WORLD INTELLIGENCE</span>

      </div>

      <div className="nahafilm-bottom">
        <div>
          <p className="nahafilm-eyebrow">{current.eyebrow}</p>
          <p className="nahafilm-title">{current.name}</p>
        </div>
        <div className="nahafilm-flow">
          <span>{current.flow}</span>
          <span className="nahafilm-arrow">↗</span>
        </div>
      </div>

      <figcaption className="sr-only">
        NahaLabs intelligence systems across hospitality, freight, infrastructure and commercial revenue operations.
      </figcaption>
    </figure>
  );
}

function SignalField() {
  return (
    <div className="signal-field" aria-label="Signals flowing into the NahaLabs intelligence layer">
      <div className="signal-inputs">
        {SIGNALS.map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </div>
      <div className="signal-core">
        <div className="signal-ring signal-ring-one" />
        <div className="signal-ring signal-ring-two" />
        <div className="signal-core-mark">N</div>
        <div className="signal-core-caption">NAHALABS ENGINE</div>
      </div>
      <div className="signal-outputs">
        {OUTPUTS.map((output) => (
          <span key={output}>{output}</span>
        ))}
      </div>
    </div>
  );
}

export const LightHome: React.FC<HomeProps> = ({ onStartConversation }) => {
  return (
    <div className="light-home">
      <main>
        <section id="hero" className="nh-section nh-hero" data-tone="light">
          <div className="wrap">
            <div className="nh-hero-copy">
              <p className="nh-eyebrow">Intelligent Systems Engineering · Johannesburg · South Africa</p>
              <h1 className="nh-display">
                Turn friction
                <span> into intelligence.</span>
              </h1>
              <p className="nh-hero-lede">
                NahaLabs finds the operational friction quietly costing your business money, then engineers the intelligent layer that turns scattered signals into decisions and action.
              </p>
              <div className="nh-hero-actions">
                <ButtonLink href="#systems" variant="secondary">
                  Explore the Systems <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
                </ButtonLink>
                <Button type="button" onClick={onStartConversation}>
                  Start a Conversation
                </Button>
              </div>
            </div>

            <HeroFilm />
          </div>
        </section>

        <section id="solutions" className="nh-section nh-section-tight nh-intro" data-tone="light">
          <div className="wrap nh-two-col">
            <div>
              <p className="nh-kicker">THE PROBLEM</p>
              <h2 className="nh-heading-xl">Your business already has the signals.</h2>
            </div>
            <div className="nh-intro-copy">
              <p>
                Most companies already pay for the software, data and people required to run the operation. What is missing is often the intelligence between those systems.
              </p>
              <p>
                We engineer that layer — around your workflows, your commercial rules and the outcome that matters.
              </p>
              <a href="#approach" className="nh-text-link">
                See how we work <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section id="systems" className="nh-section nh-systems" data-tone="light">
          <div className="wrap">
            <div className="nh-section-head">
              <div>
                <p className="nh-kicker">SYSTEMS</p>
                <h2 className="nh-heading-xl">Different businesses. Same problem.</h2>
              </div>
              <p>
                Each system below starts from a commercial friction point and ends with a working intelligence engine.
              </p>
            </div>

            <div className="nh-system-list">
              {SYSTEMS.map((system, index) => (
                <article key={system.name} className="nh-system-row">
                  <div className={`nh-system-image ${index % 2 ? 'nh-system-image-right' : ''}`}>
                    <img src={system.image} alt={system.alt} loading="lazy" decoding="async" width="1280" height="960" />
                    <div className="nh-image-label">{system.flow}</div>
                  </div>
                  <div className="nh-system-copy">
                    <div className="nh-system-meta">
                      <span>{system.eyebrow}</span>
                      <span>0{index + 1}</span>
                    </div>
                    <h3>{system.name}</h3>
                    <p className="nh-system-title">{system.title}</p>
                    <p className="nh-system-description">{system.description}</p>
                    <a href={system.name === 'RevenueDesk' ? '/revenuedesk' : '#contact'} className="nh-text-link">
                      {system.name === 'RevenueDesk' ? 'Explore RevenueDesk' : 'Discuss this system'} <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="nh-section nh-signals" data-tone="light">
          <div className="wrap">
            <div className="nh-signals-head">
              <p className="nh-kicker">THE INTELLIGENCE LAYER</p>
              <h2 className="nh-heading-xl">Connect what you already have. Act on what it tells you.</h2>
              <p>
                NahaLabs does not need to replace every system in your business. We connect the signals, apply the rules and models that matter, then return something operational: a decision, probability, alert or action.
              </p>
            </div>
            <SignalField />
          </div>
        </section>

        <section id="approach" className="nh-section nh-approach" data-tone="light">
          <div className="wrap">
            <div className="nh-section-head">
              <div>
                <p className="nh-kicker">THE METHOD</p>
                <h2 className="nh-heading-xl">Find it. Build it. Put it to work.</h2>
              </div>
              <p>Fixed scope. Real data. A hard line between what sounds impressive and what improves the operation.</p>
            </div>

            <div className="nh-method-grid">
              {[
                ['01', 'Diagnosis', 'What is actually broken?', 'Audit the workflow, quantify the friction and establish whether the problem deserves an intelligent system.'],
                ['02', 'Prototype', 'What should the system do?', 'Build against real or sampled data and test the core decisions, integrations and operator experience.'],
                ['03', 'Production', 'How does it run?', 'Deploy the hardened system with monitoring, documentation, handover and a defined support window.'],
              ].map(([number, title, question, body]) => (
                <article key={number} className="nh-method-item">
                  <div className="nh-method-number">{number}</div>
                  <h3>{title}</h3>
                  <p className="nh-method-question">{question}</p>
                  <p>{body}</p>
                </article>
              ))}
            </div>

            <div className="nh-method-foot">
              <p>We do not sell AI for its own sake. When intelligence is not the right tool, we tell you.</p>
              <Button type="button" onClick={onStartConversation}>
                Book a 45-Minute Diagnosis <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="nh-section nh-about" data-tone="light">
          <div className="wrap nh-about-grid">
            <div>
              <p className="nh-kicker">NAHALABS</p>
              <h2 className="nh-heading-xl">Founder-led engineering from Johannesburg.</h2>
            </div>
            <div className="nh-about-copy">
              <p className="nh-about-lede">Too sophisticated for off-the-shelf software. Too specific for generic consulting. Too valuable to keep doing manually.</p>
              <p>NahaLabs is built around one simple idea: the best intelligent systems are not the ones with the most features. They are the ones attached to a real commercial bottleneck, integrated into the operation and measured against an outcome.</p>
              <div className="nh-founder">
                <div className="nh-founder-mark">TN</div>
                <div>
                  <strong>Thabiso Naha</strong>
                  <span>Founder & Systems Architect</span>
                </div>
              </div>
              <a href="https://za.linkedin.com/in/thabiso-naha-4985316b" target="_blank" rel="noreferrer" className="nh-text-link">
                Meet the founder <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="nh-section nh-faq" data-tone="light">
          <div className="wrap nh-faq-grid">
            <div>
              <p className="nh-kicker">QUESTIONS</p>
              <h2 className="nh-heading-xl">The useful questions first.</h2>
            </div>
            <div className="nh-faq-list">
              {FAQS.map((item) => (
                <details key={item.q}>
                  <summary>
                    <span>{item.q}</span>
                    <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="nh-cta" data-tone="light">
          <div className="wrap">
            <p className="nh-kicker">THE NEXT MOVE</p>
            <h2>There is probably something in your business that should work better.</h2>
            <Button type="button" onClick={onStartConversation}>
              Let&rsquo;s Find It <ArrowRight size={20} strokeWidth={1.5} />
            </Button>
          </div>
        </section>

        <div className="nh-contact-shell">
          <ContactSection />
        </div>
      </main>
    </div>
  );
};

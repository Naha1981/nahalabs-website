import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { ContactSection } from './ContactSection';
import { Reveal } from './Reveal';
import { Button, ButtonLink } from './Button';
import { DotPattern } from './magicui/dot-pattern';
import { Marquee } from './magicui/marquee';
import { TextAnimate } from './magicui/text-animate';
import { BorderBeam } from './magicui/border-beam';
import { Magnetic } from './magicui/magnetic';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface HomeProps {
  onStartConversation: () => void;
}

interface SystemItem {
  eyebrow: string; name: string; flow: string; title: string; description: string;
  image: string; alt: string; href?: string; cta?: string;
}

const SYSTEMS: SystemItem[] = [
  {
    eyebrow: 'Hospitality',
    name: 'Flavourly',
    flow: 'Insight → Engagement → Repeat sales',
    title: 'A Restaurant Revenue OS for repeat business.',
    description:
      'An AI-powered Restaurant Revenue OS designed to help restaurants increase profits, recover lost revenue and grow repeat sales through intelligent insights, marketing, loyalty programmes and personalised engagement. WhatsApp is one part of the system.',
    image: ASSETS.enterpriseJhb,
    alt: 'Johannesburg business district, the market for Flavourly',
    href: '/systems#flavourly', cta: 'Explore the Flavourly prototype',
  },
  {
    eyebrow: 'Freight',
    name: 'CargoIQ',
    flow: 'Quote → Risk → Recovery',
    title: 'Reconstruct the delay. Inspect the evidence.',
    description:
      'A freight evidence demo for reviewing shipment events, delay timelines and the records behind detention and demurrage disputes. A review tool, not a promise of recovery.',
    image: ASSETS.cargoiq,
    alt: 'Freight terminal representing CargoIQ',
    href: '/cargo-iq', cta: 'Open the CargoIQ demo',
  },
  {
    eyebrow: 'Infrastructure',
    name: 'RailWatch',
    flow: 'Signal → Detection → Dispatch',
    title: 'Bring corridor incidents into one review.',
    description:
      'An infrastructure monitoring demo for inspecting corridor signals, incident records and response workflows. Demo scenarios are not a live railway deployment.',
    image: ASSETS.railwatch,
    alt: 'Rail infrastructure representing RailWatch',
    href: '/railwatch', cta: 'Open the RailWatch demo',
  },
  {
    eyebrow: 'Revenue',
    name: 'RevenueDesk',
    flow: 'Capture → Understand → Recover',
    title: 'Recover revenue hidden inside missed enquiries.',
    description:
      'A front-desk prototype for service businesses, designed to organise enquiries, prepare follow-up and make missed opportunities visible. Start with a workflow diagnosis.',
    image: ASSETS.enterpriseJhb,
    alt: 'Johannesburg commercial environment representing RevenueDesk',
  },
  {
    eyebrow: 'Telecoms',
    name: 'NetPulse',
    flow: 'Spreadsheet → Check → Fix',
    title: 'Turn an ISP spreadsheet into a network health report.',
    description:
      'Upload the Excel or CSV you already run on. NetPulse proposes the field mapping, finds duplicate IPs and expired equipment warranties, and tells you what to fix first. Demo uses synthetic data only.',
    image: ASSETS.netpulse,
    href: '/netpulse',
    cta: 'Open the NetPulse demo',
    alt: 'Network technicians on a Johannesburg rooftop radio mast representing NetPulse',
  },
  {
    eyebrow: 'Field evidence',
    name: 'FieldProof',
    flow: 'Notes → Checks → Report',
    title: 'Catch bad field data before it reaches the report.',
    description:
      'Paste technician pump-test notes. FieldProof runs the evidence checks, flags unit mix-ups, duplicates and missing datums, and holds the report behind a human review gate. Demo uses made-up data.',
    image: ASSETS.fieldproof,
    href: '/gtg',
    cta: 'Open the FieldProof demo',
    alt: 'Field technician capturing evidence at a telecoms cabinet representing FieldProof',
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
    a: 'We engineer bespoke intelligent systems around a specific operational or commercial problem. That can include decision engines, AI digital workers, automation, integrations, computer vision and software - selected according to the problem rather than the technology trend.',
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

const FILM_DWELL_MS = 3600;

function HeroFilm() {
  const [scene, setScene] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setScene((value) => (value + 1) % SYSTEMS.length), FILM_DWELL_MS);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const current = SYSTEMS[scene];
  const captionTransition = { duration: reduced ? 0 : 0.45, ease: EASE_OUT };

  return (
    <figure className="nahafilm">
      <BorderBeam size={130} duration={12} />
      <div className="nahafilm-media" aria-hidden="true">
        {reduced ? (
          <img src={SYSTEMS[0].image} alt="" className="nahafilm-scene is-active" loading="eager" decoding="async" />
        ) : (
          SYSTEMS.map((item, index) => (
            <motion.img
              key={item.name}
              src={item.image}
              alt=""
              className="nahafilm-scene"
              initial={false}
              animate={{
                opacity: index === scene ? 1 : 0,
                scale: index === scene ? 1.02 : 1.1,
              }}
              transition={{
                opacity: { duration: 1.05, ease: [0.4, 0, 0.2, 1] },
                scale: { duration: 5.4, ease: 'linear' },
              }}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          ))
        )}
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
        <span className="nahafilm-index">
          {String(scene + 1).padStart(2, '0')} / {String(SYSTEMS.length).padStart(2, '0')}
        </span>
      </div>

      <div className="nahafilm-bottom">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={scene}
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -10 }}
            transition={captionTransition}
          >
            <p className="nahafilm-eyebrow">{current.eyebrow}</p>
            <p className="nahafilm-title">{current.name}</p>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={scene}
            className="nahafilm-flow"
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -10 }}
            transition={{ ...captionTransition, delay: reduced ? 0 : 0.05 }}
          >
            <span>{current.flow}</span>
            <span className="nahafilm-arrow">&#8599;</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="nahafilm-progress" aria-hidden="true">
        {SYSTEMS.map((item, index) => (
          <span key={item.name} className="nahafilm-progress-segment">
            {index === scene && !reduced && (
              <motion.span
                key={scene}
                className="nahafilm-progress-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: FILM_DWELL_MS / 1000, ease: 'linear' }}
              />
            )}
          </span>
        ))}
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
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const filmY = useTransform(scrollYProgress, [0, 1], [0, -44]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 26]);

  return (
    <div className="light-home">
      <main>
        <section id="hero" className="nh-section nh-hero" data-tone="light" ref={heroRef}>
          <div className="nh-aurora" aria-hidden="true">
            <span className="nh-aurora-blob nh-aurora-b1" />
            <span className="nh-aurora-blob nh-aurora-b2" />
            <span className="nh-aurora-blob nh-aurora-b3" />
          </div>
          <DotPattern className="nh-hero-dots" />
          <div className="wrap">
            <motion.div className="nh-hero-copy" style={reduced ? undefined : { y: copyY }}>
              <motion.p
                className="nh-eyebrow"
                initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.7, ease: EASE_OUT }}
              >
                Intelligent systems for revenue &amp; operations
              </motion.p>
              <h1 className="nh-display">
                <TextAnimate as="span" className="nh-display-line" text="Intelligence," delay={reduced ? 0 : 0.12} />
                <TextAnimate as="span" className="nh-display-line nh-display-accent" text="engineered." by="char" delay={reduced ? 0 : 0.42} stagger={0.032} />
              </h1>
              <motion.p
                className="nh-hero-lede"
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.56, ease: EASE_OUT }}
              >
                Turn missed enquiries, scattered records and manual checks into a clear next action. We build intelligent systems for South African service businesses and operations teams.
              </motion.p>
              <motion.div
                className="nh-hero-actions"
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.72, ease: EASE_OUT }}
              >
                <Magnetic strength={4}>
                  <Button type="button" onClick={onStartConversation}>
                    Request a Workflow Diagnosis
                  </Button>
                </Magnetic>
                <Magnetic>
                  <ButtonLink href="#systems" variant="secondary">
                    Explore the Demos <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
                  </ButtonLink>
                </Magnetic>
              </motion.div>
              <motion.div
                className="nh-hero-meta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.94 }}
              >
                <span className="nh-hero-meta-label">See the work</span>
                <span className="nh-hero-meta-items">Working demos &middot; Early-stage products &middot; Founder-led engineering</span>
              </motion.div>
            </motion.div>

            <motion.div className="nh-hero-film" style={reduced ? undefined : { y: filmY }}>
              <motion.div
                initial={{ opacity: 0, y: reduced ? 0 : 28, scale: reduced ? 1 : 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.3, ease: EASE_OUT }}
              >
                <HeroFilm />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="nh-hero-signals"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 1.1 }}
          >
            <div className="wrap nh-hero-signals-inner">
              <span className="nh-hero-signals-label">Signals we connect</span>
              <Marquee duration={38} className="nh-hero-signals-marquee">
                {SIGNALS.map((signal) => (
                  <span key={signal} className="nh-hero-signal-chip">{signal}</span>
                ))}
              </Marquee>
            </div>
          </motion.div>
        </section>

        <section className="nh-proof" data-tone="light" aria-label="How an engagement works">
          <div className="wrap nh-proof-grid">
            {[
              ['Start with the bottleneck.', 'We map one workflow and agree what an improvement would mean before proposing a build.'],
              ['Inspect the work.', 'Our demos make the approach visible. They are engineering work, not paid-client case studies.'],
              ['Decide on evidence.', 'Scope, integrations, data access and success measures are agreed before a production commitment.'],
            ].map(([title, body]) => (
              <Reveal key={title} className="nh-proof-item">
                <h2 className="nh-proof-heading">{title}</h2>
                <p className="nh-proof-label">{body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="solutions" className="nh-section nh-section-tight nh-intro" data-tone="light">
          <div className="wrap nh-two-col">
            <Reveal>
              <p className="nh-kicker">THE PROBLEM</p>
              <h2 className="nh-heading-xl">Your business already has the signals.</h2>
            </Reveal>
            <Reveal className="nh-intro-copy nh-reveal-delay-1">
              <p>
                Most companies already pay for the software, data and people required to run the operation. What is missing is often the intelligence between those systems.
              </p>
              <p>
                We engineer that layer - around your workflows, your commercial rules and the outcome that matters.
              </p>
              <a href="#approach" className="nh-text-link">
                See how we work <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </section>

        <section id="systems" className="nh-section nh-systems" data-tone="light">
          <div className="wrap">
            <div className="nh-section-head">
              <div>
                <p className="nh-kicker">SYSTEMS</p>
                <h2 className="nh-heading-xl">Real workflows. Work you can inspect.</h2>
              </div>
              <p>
                Explore our demos and prototypes. Each starts with a specific business problem; production scope is agreed separately.
              </p>
            </div>

            <div className="nh-system-list">
              {SYSTEMS.map((system, index) => (
                <Reveal key={system.name} as="article" className="nh-system-row">
                  <div className={`nh-system-image ${index % 2 ? 'nh-system-image-right' : ''}`}>
                    <img src={system.image} alt={system.alt} loading="lazy" decoding="async" width="1280" height="960" />
                    <div className="nh-image-label">{system.flow}</div>
                  </div>
                  <div className="nh-system-copy">
                    <div className="nh-system-meta">
                      <span>{system.eyebrow} / {system.name === 'Flavourly' || system.name === 'RevenueDesk' ? 'Prototype' : 'Demo'}</span>
                      <span>0{index + 1}</span>
                    </div>
                    <h3>{system.name}</h3>
                    <p className="nh-system-title">{system.title}</p>
                    <p className="nh-system-description">{system.description}</p>
                    <a href={system.href ?? (system.name === 'RevenueDesk' ? '/revenuedesk' : '#contact')} className="nh-text-link">
                      {system.cta ?? (system.name === 'RevenueDesk' ? 'Explore RevenueDesk' : 'Discuss this system')} <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="nh-section nh-signals" data-tone="light">
          <div className="wrap">
            <Reveal className="nh-signals-head">
              <p className="nh-kicker">THE INTELLIGENCE LAYER</p>
              <h2 className="nh-heading-xl">Connect what you already have. Act on what it tells you.</h2>
              <p>
                NahaLabs does not need to replace every system in your business. We connect the signals, apply the rules and models that matter, then return something operational: a decision, probability, alert or action.
              </p>
            </Reveal>
            <Reveal className="nh-reveal-delay-1">
              <SignalField />
            </Reveal>
          </div>
        </section>

        <section id="approach" className="nh-section nh-approach" data-tone="light">
          <div className="wrap">
            <Reveal className="nh-section-head">
              <div>
                <p className="nh-kicker">THE METHOD</p>
                <h2 className="nh-heading-xl">Find it. Build it. Put it to work.</h2>
              </div>
              <p>Fixed scope. Real data. A hard line between what sounds impressive and what improves the operation.</p>
            </Reveal>

            <div className="nh-method-grid">
              {[
                ['01', 'Diagnosis', 'What is actually broken?', 'Audit the workflow, quantify the friction and establish whether the problem deserves an intelligent system.'],
                ['02', 'Prototype', 'What should the system do?', 'Build against real or sampled data and test the core decisions, integrations and operator experience.'],
                ['03', 'Production', 'How does it run?', 'Deploy the hardened system with monitoring, documentation, handover and a defined support window.'],
              ].map(([number, title, question, body]) => (
                <Reveal key={number} as="article" className={`nh-method-item${number === '02' ? ' nh-reveal-delay-1' : number === '03' ? ' nh-reveal-delay-2' : ''}`}>
                  <div className="nh-method-number">{number}</div>
                  <h3>{title}</h3>
                  <p className="nh-method-question">{question}</p>
                  <p>{body}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="nh-method-foot">
              <p>We do not sell AI for its own sake. When intelligence is not the right tool, we tell you.</p>
              <Button type="button" onClick={onStartConversation}>
                Request a Workflow Diagnosis <ArrowRight size={16} />
              </Button>
            </Reveal>
          </div>
        </section>

        <section id="about" className="nh-section nh-about" data-tone="light">
          <div className="wrap nh-about-grid">
            <Reveal>
              <p className="nh-kicker">NAHALABS</p>
              <h2 className="nh-heading-xl">Founder-led engineering from Johannesburg.</h2>
            </Reveal>
            <Reveal className="nh-about-copy nh-reveal-delay-1">
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
            </Reveal>
          </div>
        </section>

        <section className="nh-section nh-faq" data-tone="light">
          <div className="wrap nh-faq-grid">
            <Reveal>
              <p className="nh-kicker">QUESTIONS</p>
              <h2 className="nh-heading-xl">The useful questions first.</h2>
            </Reveal>
            <Reveal className="nh-faq-list nh-reveal-delay-1">
              {FAQS.map((item) => (
                <details key={item.q}>
                  <summary>
                    <span>{item.q}</span>
                    <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="nh-cta" data-tone="light">
          <Reveal className="wrap">
            <p className="nh-kicker">THE NEXT MOVE</p>
            <h2>Start with one workflow. Know what to build next.</h2>
            <Button type="button" onClick={onStartConversation}>
              Request a Workflow Diagnosis <ArrowRight size={20} strokeWidth={1.5} />
            </Button>
          </Reveal>
        </section>

        <div className="nh-contact-shell">
          <ContactSection />
        </div>
      </main>
    </div>
  );
};

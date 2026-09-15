import { CaseStudyItem } from '../types';

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'flavourly',
    number: '01',
    systemName: 'FLAVOURLY',
    headline: 'The restaurant was busy. The problem was the empty chairs.',
    intent: 'customers',
    subCategoryTag: 'Intelligent Revenue Systems',
    isConcept: false,
    businessProblemLabel: "I'm losing bookings/revenue",
    slides: [
      {
        slideNumber: 1,
        stageName: 'The Situation',
        content: [
          'A restaurant was getting enquiries through WhatsApp, Instagram and phone calls.',
          'But bookings were still being handled manually by busy floor staff.'
        ],
        highlight: 'Demand was active, but fragmented across unstructured channels.'
      },
      {
        slideNumber: 2,
        stageName: 'The Problem',
        content: [
          'Messages got buried during peak kitchen service.',
          'Customers forgot about unconfirmed reservations.',
          'Tables went empty on slow mid-week days.',
          'Floor staff spent valuable hospitality hours answering repetitive menu and reservation questions.'
        ],
        highlight: 'Empty tables on slow days represent unrecoverable perishable revenue.'
      },
      {
        slideNumber: 3,
        stageName: 'The NahaLabs Solution',
        content: [
          'Flavourly turned WhatsApp into a restaurant revenue operating system.',
          'Bookings, automated confirmations, reminders, waitlists, guest preferences, loyalty, and customer engagement were connected into one seamless workflow.'
        ],
        highlight: 'WhatsApp transformed from a messaging app into an autonomous revenue engine.'
      },
      {
        slideNumber: 4,
        stageName: 'The Business Outcome',
        content: [
          'Instead of simply answering customer chats:',
          'Flavourly helps the restaurant convert conversations into confirmed revenue, recovers cancellations through real-time waitlists, and drives mid-week covers.'
        ],
        highlight: 'Converted conversational traffic directly into paid covers and higher spend.'
      },
      {
        slideNumber: 5,
        stageName: 'The Bigger Idea',
        content: [
          'Fewer empty chairs.',
          'More happy guests.',
          'Every rand proven.'
        ],
        highlight: 'NahaLabs → Intelligent Revenue Systems'
      }
    ]
  },
  {
    id: 'leadmachine',
    number: '02',
    systemName: 'LEAD MACHINE',
    headline: "The leads weren't the problem. The response time was.",
    intent: 'customers',
    subCategoryTag: 'Intelligent Customer Acquisition',
    isConcept: false,
    businessProblemLabel: 'I need more customers / response too slow',
    slides: [
      {
        slideNumber: 1,
        stageName: 'The Situation',
        content: [
          'A business was generating steady enquiries from its website, WhatsApp and social advertising.',
          'Yet not every enquiry turned into a commercially productive conversation.'
        ],
        highlight: 'Traffic and inquiries were arriving, but conversion stalled before first contact.'
      },
      {
        slideNumber: 2,
        stageName: 'The Problem',
        content: [
          'High-value leads arrived after business hours and on weekends.',
          'Messages were answered hours or days late when buyer intent had cooled.',
          'Salespeople had to manually sort through low-intent tire-kickers.',
          'Hot enterprise prospects looked indistinguishable from casual inquiries.'
        ],
        highlight: 'Response latency directly killed deals before sales reps even opened the chat.'
      },
      {
        slideNumber: 3,
        stageName: 'The NahaLabs Solution',
        content: [
          'Lead Machine automatically qualifies incoming enquiries within seconds.',
          'It categorizes intent in real time: HOT → WARM → COLD.',
          'It instantly alerts senior sales executives the moment a high-intent prospect appears.'
        ],
        highlight: 'Instant multi-channel qualification with zero human latency.'
      },
      {
        slideNumber: 4,
        stageName: 'The Business Outcome',
        content: [
          'Salespeople stop wasting days searching through endless inbox noise.',
          'They dedicate 100% of their energy to the qualified prospects most likely to buy.'
        ],
        highlight: 'Dramatic reduction in time-to-first-meeting and significantly higher close rates.'
      },
      {
        slideNumber: 5,
        stageName: 'The Bigger Idea',
        content: [
          "Don't just generate more leads.",
          'Respond intelligently to the leads you already have.'
        ],
        highlight: 'NahaLabs → Intelligent Customer Acquisition'
      }
    ]
  },
  {
    id: 'cargoiq',
    number: '03',
    systemName: 'CARGOiQ',
    headline: 'The money was already earned. It was leaking between systems.',
    intent: 'recovery',
    subCategoryTag: 'Revenue Leakage & Recovery',
    isConcept: false,
    businessProblemLabel: 'Money is leaking from operations',
    slides: [
      {
        slideNumber: 1,
        stageName: 'The Situation',
        content: [
          'A freight forwarder handled thousands of shipments, container waybills, supplier invoices, customs documents, and operational events every month.',
          'All the operational information existed, but it lived trapped in silos.'
        ],
        highlight: 'Operations were moving at scale, but finance and logistics lived in different realities.'
      },
      {
        slideNumber: 2,
        stageName: 'The Problem',
        content: [
          'Unbilled waiting-time charges and demurrage fees went unrecovered.',
          'Invoice discrepancies between carrier rate-cards and billing went unnoticed.',
          'Manual reconciliation across hundreds of spreadsheets was impossible to sustain.',
          'Small unnoticed errors multiplied across container volumes into massive losses.'
        ],
        highlight: 'Legitimate revenue was constantly leaking through cracks between operational software.'
      },
      {
        slideNumber: 3,
        stageName: 'The NahaLabs Solution',
        content: [
          'CargoIQ sits above existing operational software and audits for revenue leakage.',
          'It autonomously connects: Documents → Shipments → Charges → Events → Money.',
          'Discrepancies are flagged immediately and reconciled with audit trails.'
        ],
        highlight: 'Continuous autonomous cross-system auditing without replacing current ERPs.'
      },
      {
        slideNumber: 4,
        stageName: 'The Business Outcome',
        content: [
          'Instead of discovering revenue leakage months later during an annual audit:',
          'Operations and finance teams identify and recover unbilled cash immediately.'
        ],
        highlight: 'Recovers 3% to 7% of operating margins straight to the enterprise bottom line.'
      },
      {
        slideNumber: 5,
        stageName: 'The Bigger Idea',
        content: [
          "CargoIQ isn't another freight system.",
          "It's an intelligence layer for finding money hidden inside freight operations."
        ],
        highlight: 'NahaLabs → Revenue Leakage & Recovery'
      }
    ]
  },
  {
    id: 'sella',
    number: '04',
    systemName: 'SELLA',
    headline: 'The creator generated the attention. Nobody could prove what happened next.',
    intent: 'customers',
    subCategoryTag: 'Intelligent Commerce Infrastructure',
    isConcept: true,
    businessProblemLabel: "I can't prove marketing actually drives sales",
    slides: [
      {
        slideNumber: 1,
        stageName: 'The Situation',
        content: [
          'A retail brand partnered with digital creators to drive foot traffic into physical stores.',
          'Creators generated hundreds of thousands of views, shares, and social engagement.'
        ],
        highlight: 'Massive online engagement, but zero measurable store-level connection.'
      },
      {
        slideNumber: 2,
        stageName: 'The Problem',
        content: [
          'The customer journey vanished the second the user looked up from their phone.',
          'Who actually influenced the buyer? Which creator? Which store? Which specific transaction?'
        ],
        highlight: 'Marketers were forced to pay for vanity impressions without sales accountability.'
      },
      {
        slideNumber: 3,
        stageName: 'The NahaLabs Solution',
        content: [
          'SELLA creates an auditable attribution chain bridging digital engagement to retail tills:',
          'Creator → Content → Campaign → Intent → Store → Transaction.'
        ],
        highlight: 'Closed-loop attribution from viral social trigger to verified in-store till slip.'
      },
      {
        slideNumber: 4,
        stageName: 'The Business Outcome',
        content: [
          'Brands move beyond vanity metrics ("Her video got 200,000 views"):',
          'To commercial certainty ("This creator influenced R140,000 in verified store sales").'
        ],
        highlight: 'Transforms creator sponsorship from speculative expense into predictable retail sales.'
      },
      {
        slideNumber: 5,
        stageName: 'The Bigger Idea',
        content: [
          'SELLA turns creator marketing from an attention game into an attribution infrastructure problem.'
        ],
        highlight: 'NahaLabs → Intelligent Commerce Infrastructure'
      }
    ]
  },
  {
    id: 'thuso',
    number: '05',
    systemName: 'THUSO',
    headline: "The problem wasn't a lack of services. It was access.",
    intent: 'operations',
    subCategoryTag: 'Accessible Intelligent Systems',
    isConcept: true,
    businessProblemLabel: 'I need accessible digital services',
    slides: [
      {
        slideNumber: 1,
        stageName: 'The Situation',
        content: [
          'People and micro-entrepreneurs need everyday commercial and administrative services.',
          'Yet accessing them requires navigating dozens of fragmented web portals and apps.'
        ],
        highlight: 'Services exist in theory, but friction locks out everyday citizens.'
      },
      {
        slideNumber: 2,
        stageName: 'The Problem',
        content: [
          'Too many apps to download, high mobile data costs, password resets, and confusing portals.',
          'Critical information is unavailable when people actually need it on the ground.'
        ],
        highlight: 'App fatigue and digital divide create friction for essential transactions.'
      },
      {
        slideNumber: 3,
        stageName: 'The NahaLabs Solution',
        content: [
          'THUSO is designed as a WhatsApp-first intelligent service layer.',
          'Users interact in natural language through the app already installed on every phone.'
        ],
        highlight: 'Zero app installation, zero training, instant conversational delivery.'
      },
      {
        slideNumber: 4,
        stageName: 'The Business Outcome',
        content: [
          'Services become radically simpler to discover, verify, and complete.',
          'One single conversation becomes the trustworthy doorway to multiple services.'
        ],
        highlight: 'Expands digital participation to 100% of mobile users across Southern Africa.'
      },
      {
        slideNumber: 5,
        stageName: 'The Bigger Idea',
        content: [
          "Don't force people to learn technology.",
          'Put the technology where people already are.'
        ],
        highlight: 'NahaLabs → Accessible Intelligent Systems'
      }
    ]
  },
  {
    id: 'dakeen',
    number: '06',
    systemName: 'DAKEEN',
    headline: "The spaza shop had customers. What it didn't have was visibility.",
    intent: 'customers',
    subCategoryTag: 'Community Retail Intelligence',
    isConcept: true,
    businessProblemLabel: 'I need better intelligence for township retail',
    slides: [
      {
        slideNumber: 1,
        stageName: 'The Situation',
        content: [
          'A township retailer processes hundreds of everyday cash and digital transactions.',
          'Yet the business intelligence stays trapped inside individual registers and till slips.'
        ],
        highlight: 'High transactional velocity with near-zero structured data visibility.'
      },
      {
        slideNumber: 2,
        stageName: 'The Problem',
        content: [
          'What products sell fastest? When? To whom? What is about to run out?',
          'Which fast-moving goods actually deliver profit versus tied-up working capital?'
        ],
        highlight: 'Retailers run on intuition, causing stockouts and tying up precious cash flow.'
      },
      {
        slideNumber: 3,
        stageName: 'The NahaLabs Solution',
        content: [
          'Dakeen turns everyday retail activity into actionable business intelligence:',
          'Transactions → Insights → Decisions.'
        ],
        highlight: 'Real-time telemetry and reordering suggestions delivered straight via phone.'
      },
      {
        slideNumber: 4,
        stageName: 'The Business Outcome',
        content: [
          "The business owner doesn't need to become a data analyst.",
          'The business autonomously tells them what to reorder, what to price, and where profit is.'
        ],
        highlight: 'Eliminates dead stock and protects working capital for township enterprises.'
      },
      {
        slideNumber: 5,
        stageName: 'The Bigger Idea',
        content: [
          "Small businesses shouldn't need enterprise budgets to access intelligent operations."
        ],
        highlight: 'NahaLabs → Intelligence for the businesses that power communities.'
      }
    ]
  },
  {
    id: 'academy',
    number: '07',
    systemName: 'NAHALABS ONLINE ACADEMY',
    headline: "The problem wasn't a lack of talent. It was a lack of access to practical technology.",
    intent: 'operations',
    subCategoryTag: 'Engineering Capability',
    isConcept: false,
    businessProblemLabel: 'I need practical technology skills',
    slides: [
      {
        slideNumber: 1,
        stageName: 'The Situation',
        content: [
          'Young Africans are surrounded by transformative technology.',
          'Yet they lack access to practical, industry-grade pathways to master it.'
        ],
        highlight: 'Enormous demographic potential without direct access to production engineering.'
      },
      {
        slideNumber: 2,
        stageName: 'The Problem',
        content: [
          'Traditional education teaches abstract theory disconnected from commerce.',
          'Enterprises desperately need practitioners who can actually: Build → Test → Deploy → Solve real problems.'
        ],
        highlight: 'Certificates without functional code output leave graduates unprepared.'
      },
      {
        slideNumber: 3,
        stageName: 'The NahaLabs Solution',
        content: [
          'NahaLabs Online Academy focuses on hands-on intelligent systems development.',
          'Students learn by building real production software around real economic bottlenecks.'
        ],
        highlight: 'Project-first, production-verified systems engineering curriculum.'
      },
      {
        slideNumber: 4,
        stageName: 'The Business Outcome',
        content: [
          'Instead of graduating with paper certificates and zero working applications:',
          'Engineers complete the program with verified production systems deployed in the real world.'
        ],
        highlight: 'Bridges the gap between raw talent and commercially valuable engineering.'
      },
      {
        slideNumber: 5,
        stageName: 'The Bigger Idea',
        content: [
          "Don't just teach people about the future.",
          'Give them the tools to build it.'
        ],
        highlight: 'NahaLabs → Building the next generation of intelligent-system engineers.'
      }
    ]
  },
  {
    id: 'netpulse',
    number: '08',
    systemName: 'NETPULSE',
    headline: 'The network looked healthy. The customer experience said otherwise.',
    intent: 'recovery',
    subCategoryTag: 'Intelligent Infrastructure Operations',
    isConcept: true,
    businessProblemLabel: 'My infrastructure produces data but not decisions',
    slides: [
      {
        slideNumber: 1,
        stageName: 'The Situation',
        content: [
          'Telecommunications and connectivity providers generate billions of telemetry events.',
          'Engineering dashboards glow green while subscriber churn quietly accelerates.'
        ],
        highlight: 'Vast telemetry streams with no translation into customer revenue impact.'
      },
      {
        slideNumber: 2,
        stageName: 'The Problem',
        content: [
          'Traditional monitoring signals an outage only after total node failure.',
          'It fails to answer: Who is impacted? Which enterprise customers are at risk? What is the revenue exposure?'
        ],
        highlight: 'SLA penalties and customer churn happen before engineers locate the incident.'
      },
      {
        slideNumber: 3,
        stageName: 'The NahaLabs Solution',
        content: [
          'NetPulse translates raw network telemetry into commercial decision intelligence:',
          'Infrastructure → Anomaly → Impact → Action.'
        ],
        highlight: 'Correlates packet loss and jitter directly with customer contract value.'
      },
      {
        slideNumber: 4,
        stageName: 'The Business Outcome',
        content: [
          'Operations shifts from reacting to catastrophic alerts to proactive resolution.',
          'Engineers and executives share an exact commercial view of infrastructure health.'
        ],
        highlight: 'Protects enterprise SLAs and prevents silent high-value subscriber churn.'
      },
      {
        slideNumber: 5,
        stageName: 'The Bigger Idea',
        content: [
          'Monitoring tells you something broke.',
          'Intelligence tells you what to do about it.'
        ],
        highlight: 'NahaLabs → Intelligent Infrastructure Operations'
      }
    ]
  },
  {
    id: 'pamela',
    number: '09',
    systemName: 'PAMELA AI',
    headline: "The team didn't need another chatbot. They needed another pair of hands.",
    intent: 'operations',
    subCategoryTag: 'Digital Workforce Systems',
    isConcept: false,
    businessProblemLabel: 'My business is drowning in repetitive work',
    slides: [
      {
        slideNumber: 1,
        stageName: 'The Situation',
        content: [
          'Skilled enterprise employees spend 15 to 25 hours every week on mundane digital tasks:',
          'Reading emails, cross-referencing PDFs, updating ERP fields, and sending follow-up reminders.'
        ],
        highlight: 'Expensive knowledge workers bogged down as human copy-paste bridges.'
      },
      {
        slideNumber: 2,
        stageName: 'The Problem',
        content: [
          "The work isn't conceptually hard, but it consumes human attention and introduces fatigue errors.",
          'Hiring more people linearly inflates overhead without solving operational bottlenecks.'
        ],
        highlight: 'Human attention wasted on mechanical data synchronization.'
      },
      {
        slideNumber: 3,
        stageName: 'The NahaLabs Solution',
        content: [
          'Pamela operates as an autonomous digital worker executing defined business workflows:',
          'Observe → Decide → Act → Report.'
        ],
        highlight: 'End-to-end task execution across spreadsheets, email, and legacy ERPs.'
      },
      {
        slideNumber: 4,
        stageName: 'The Business Outcome',
        content: [
          'Employees stop moving data between systems and return to strategic work.',
          'Workflows run 24/7 with zero typographical errors and complete cryptographic audit logs.'
        ],
        highlight: 'Adds 10x operational capacity without increasing organizational headcount.'
      },
      {
        slideNumber: 5,
        stageName: 'The Bigger Idea',
        content: [
          "The future of business isn't necessarily more software.",
          "It's digital workers operating the software you already have."
        ],
        highlight: 'NahaLabs → Digital Workforce Systems'
      }
    ]
  },
  {
    id: 'audit',
    number: '10',
    systemName: 'AI READINESS & AUTOMATION AUDIT',
    headline: "The company didn't need more AI. It needed to know where AI actually mattered.",
    intent: 'operations',
    subCategoryTag: 'AI Opportunity Engineering',
    isConcept: false,
    businessProblemLabel: 'I need to find where AI/automation will actually pay',
    slides: [
      {
        slideNumber: 1,
        stageName: 'The Situation',
        content: [
          'Leadership teams are bombarded with headlines about artificial intelligence.',
          'Board members demand an "AI strategy" without understanding where real ROI exists.'
        ],
        highlight: 'Urgency to implement AI without clear financial justification.'
      },
      {
        slideNumber: 2,
        stageName: 'The Problem',
        content: [
          'Nobody has rigorously mapped where time is wasted, where revenue leaks, or where automation actually produces positive cash flow.',
          'Companies waste millions on disconnected SaaS subscriptions that nobody adopts.'
        ],
        highlight: 'Random pilot projects fail because they target the wrong bottlenecks.'
      },
      {
        slideNumber: 3,
        stageName: 'The NahaLabs Solution',
        content: [
          'NahaLabs maps the enterprise from ground truth to balance sheet impact:',
          'Process → Bottleneck → Opportunity → Automation → ROI.'
        ],
        highlight: 'Rigorous 14-day operational diagnosis before a single line of code is written.'
      },
      {
        slideNumber: 4,
        stageName: 'The Business Outcome',
        content: [
          'Instead of buying generic, speculative AI tools:',
          'The executive team receives a prioritized architectural roadmap of high-impact systems.'
        ],
        highlight: 'Clear economic business cases with measurable payback timelines.'
      },
      {
        slideNumber: 5,
        stageName: 'The Bigger Idea',
        content: [
          'Don\'t start with: "Where can we use AI?"',
          'Start with: "Where is the business losing money, time or opportunity?"'
        ],
        highlight: 'NahaLabs → AI Opportunity Engineering'
      }
    ]
  },
  {
    id: 'revenue-os',
    number: '11',
    systemName: 'INTELLIGENT REVENUE OPERATING SYSTEMS',
    headline: "The business already had systems. What it didn't have was intelligence between them.",
    intent: 'operations',
    subCategoryTag: 'Intelligent Systems Infrastructure',
    isConcept: false,
    businessProblemLabel: 'I need intelligence across multiple legacy systems',
    slides: [
      {
        slideNumber: 1,
        stageName: 'The Situation',
        content: [
          'Mid-sized and enterprise organizations run ERPs, CRMs, accounting systems, warehouse platforms, and legacy databases.',
          'Each system operates as a functional island.'
        ],
        highlight: 'Millions invested in operational software, yet executive decisions lag by weeks.'
      },
      {
        slideNumber: 2,
        stageName: 'The Problem',
        content: [
          'Silos, manual spreadsheets handoffs, duplicate data, slow decisions, and zero real-time visibility.',
          'Replacing legacy platforms is cost-prohibitive and presents existential operational risk.'
        ],
        highlight: 'Rip-and-replace is too risky, but disconnected systems throttle growth.'
      },
      {
        slideNumber: 3,
        stageName: 'The NahaLabs Solution',
        content: [
          'NahaLabs engineers an intelligent orchestration layer across existing infrastructure:',
          'Existing Systems → Intelligence Layer → Decisions → Actions.'
        ],
        highlight: 'Non-invasive intelligence fabric that connects legacy and modern systems.'
      },
      {
        slideNumber: 4,
        stageName: 'The Business Outcome',
        content: [
          "The organisation doesn't need to embark on multi-year, high-risk ERP migrations.",
          'It makes its current operational infrastructure significantly more intelligent and agile.'
        ],
        highlight: 'Immediate cross-enterprise visibility and automated decision execution.'
      },
      {
        slideNumber: 5,
        stageName: 'The Bigger Idea',
        content: [
          "We don't always need another system.",
          'Sometimes we need intelligence connecting the systems we already have.'
        ],
        highlight: 'NahaLabs → Intelligent Systems Infrastructure'
      }
    ]
  }
];

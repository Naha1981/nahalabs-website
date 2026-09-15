import { FuelPillar, ActionScenario, FormulaLayer } from '../types';

export const FUEL_PILLARS: FuelPillar[] = [
  {
    id: 'revenue',
    title: 'REVENUE',
    shortTag: 'CASH RECOVERY & CONVERSION',
    frontHighlight: 'REVENUE',
    explanation: 'Recover leakage. Improve conversion. Find missed opportunities.',
    operationalOutcome: 'We audit transaction paths and customer touchpoints to detect dropped orders, unbilled freight, and dormant customer accounts, converting lost transactions into recovered balance sheet cash.'
  },
  {
    id: 'speed',
    title: 'SPEED',
    shortTag: 'CYCLE TIME COLLAPSE',
    frontHighlight: 'SPEED',
    explanation: 'Automate slow processes and shorten response time.',
    operationalOutcome: 'Replace multi-day manual approval loops, delayed invoice audits, and sluggish quote turnarounds with near-instant autonomous processing.'
  },
  {
    id: 'control',
    title: 'CONTROL',
    shortTag: 'OPERATIONAL VISIBILITY',
    frontHighlight: 'CONTROL',
    explanation: 'Create visibility across fragmented operations.',
    operationalOutcome: 'Consolidate siloed spreadsheets, legacy databases, and WhatsApp messages into a unified operational command layer with real-time exception alarms.'
  },
  {
    id: 'intelligence',
    title: 'INTELLIGENCE',
    shortTag: 'DECISION PRECISION',
    frontHighlight: 'INTELLIGENCE',
    explanation: 'Turn complex information into clearer decisions.',
    operationalOutcome: 'Synthesise market signals, spatial data, and transaction histories into unambiguous, mathematically grounded strategic recommendations.'
  },
  {
    id: 'capacity',
    title: 'CAPACITY',
    shortTag: 'DIGITAL WORKFORCE SCALE',
    frontHighlight: 'CAPACITY',
    explanation: 'Move repetitive valuable work to digital workers.',
    operationalOutcome: 'Deploy self-governing software agents that triage mail, reconcile invoices, and execute complex workflows without increasing fixed headcount.'
  }
];

export const ACTION_SCENARIOS: ActionScenario[] = [
  {
    id: 'restaurant',
    industry: 'HOSPITALITY & COMMERCE',
    title: 'Flavourly Yield Optimization',
    trigger: 'Late Friday cancellation creates an empty table for 6 at 19:45',
    steps: [
      {
        step: 'SIGNAL',
        signal: 'Table 14 marked cancelled in booking system',
        engine: 'Floor Inventory Sensor',
        outcome: 'Capacity gap identified 42 minutes before peak shift'
      },
      {
        step: 'UNDERSTAND',
        signal: 'History checks past VIPs who requested Friday 20:00 seating',
        engine: 'Guest Preference Graph',
        outcome: '3 qualified high-spend patrons matched within 8km radius'
      },
      {
        step: 'DECIDE',
        signal: 'Select priority contact based on loyalty score & frequency',
        engine: 'Yield Allocation Model',
        outcome: 'VIP guest contacted via discreet WhatsApp concierge'
      },
      {
        step: 'ACT',
        signal: 'Guest accepts table reservation with custom dining credit',
        engine: 'Autonomous Booking Engine',
        outcome: 'Reservation locked, kitchen prepped, zero seat vacancy'
      }
    ],
    economicImpact: 'Recovers R4,850 in perishable evening table turnover with zero manual manager phone calls.',
    systemRef: 'FLAVOURLY'
  },
  {
    id: 'freight',
    industry: 'LOGISTICS & SUPPLY CHAIN',
    title: 'CargoIQ Discrepancy Recovery',
    trigger: 'Carrier submits consolidated R340,000 monthly demurrage invoice',
    steps: [
      {
        step: 'SIGNAL',
        signal: 'PDF invoice arrives in finance shared inbox',
        engine: 'Multimodal Document Harvester',
        outcome: '48 line items, waybill IDs, and container numbers ingested'
      },
      {
        step: 'UNDERSTAND',
        signal: 'Cross-reference terminal gate-out logs with contractual grace periods',
        engine: 'Tariff Audit Engine',
        outcome: '6 container detention charges flagged as depot-caused delays'
      },
      {
        step: 'DECIDE',
        signal: 'Verify signed SLA exception clauses for port congestion',
        engine: 'Contract Rule Matrix',
        outcome: 'Calculates R41,200 in improper demurrage billing'
      },
      {
        step: 'ACT',
        signal: 'Generate timestamped dispute audit pack with gate camera logs',
        engine: 'Automated Recovery Agent',
        outcome: 'Dispute submitted to carrier billing desk within 8 minutes'
      }
    ],
    economicImpact: 'Direct R41,200 cash saved on a single billing cycle without legal counsel overhead.',
    systemRef: 'CARGOiQ'
  },
  {
    id: 'sales',
    industry: 'B2B COMMERCIAL ENTERPRISE',
    title: 'LeadMachine Intent Orchestration',
    trigger: 'Major Gauteng logistics operator appoints new Chief Operating Officer',
    steps: [
      {
        step: 'SIGNAL',
        signal: 'CIPC and public registry detects executive restructuring',
        engine: 'Commercial Registry Crawler',
        outcome: 'Operational transformation mandate detected'
      },
      {
        step: 'UNDERSTAND',
        signal: 'Analyze company current fleet size and depot infrastructure',
        engine: 'Enterprise Knowledge Graph',
        outcome: 'Identifies immediate fuel and dispatch optimization fit'
      },
      {
        step: 'DECIDE',
        signal: 'Formulate bespoke 2-sentence briefing note on siding bottlenecks',
        engine: 'Executive Intent Synthesiser',
        outcome: 'Calibrated outreach draft produced matching COO technical profile'
      },
      {
        step: 'ACT',
        signal: 'Deliver warm introduction via trusted industry channel',
        engine: 'Precision Outreach Dispatcher',
        outcome: 'Discovery workshop scheduled directly on VP calendar'
      }
    ],
    economicImpact: 'Generated R1.2M pipeline opportunity 3 days before any competitor noticed the executive shift.',
    systemRef: 'LEADMACHINE'
  },
  {
    id: 'insurance',
    industry: 'FINANCIAL SERVICES & ASSET RISK',
    title: 'Spatial Risk Assessment',
    trigger: 'Commercial property quote requested for Centurion industrial park',
    steps: [
      {
        step: 'SIGNAL',
        signal: 'Cadastral stand boundary input during online broker submission',
        engine: 'Geospatial Ingestion API',
        outcome: 'Coordinates localized to 1m resolution'
      },
      {
        step: 'UNDERSTAND',
        signal: 'Query 30-year hydrological drainage basin and stormwater integrity',
        engine: 'Hydrological Vector Pipeline',
        outcome: 'Detects recent upstream warehouse construction altering runoff'
      },
      {
        step: 'DECIDE',
        signal: 'Adjust flood peril loading from generic Tier 2 to specialized Tier 4',
        engine: 'Actuarial Underwriting Matrix',
        outcome: 'Accurate policy pricing generated in 400 milliseconds'
      },
      {
        step: 'ACT',
        signal: 'Issue tailored quote with mandatory retention weir warranty',
        engine: 'Core Policy Broker API',
        outcome: 'Underwriting margin protected before catastrophic storm event'
      }
    ],
    economicImpact: 'Eliminates unpriced catastrophic flood claims on multi-million rand industrial assets.',
    systemRef: 'INSURANCE INTELLIGENCE'
  }
];

export const FORMULA_LAYERS: FormulaLayer[] = [
  {
    id: 'data',
    layerNumber: '01',
    title: 'DATA',
    subtitle: 'Raw Ground-Truth Signals',
    components: ['Invoices & PDF Documents', 'ERP Transactions', 'WhatsApp & Email Streams', 'Cadastral & Satellite Vectors', 'IoT Telemetry & Gate Sensors'],
    outputState: 'Fragmented operational reality structured into normalized event streams.'
  },
  {
    id: 'intelligence',
    layerNumber: '02',
    title: 'INTELLIGENCE',
    subtitle: 'Reasoning & Predictive Logic',
    components: ['Domain-Calibrated LLMs', 'Actuarial & Tariff Rule Engines', 'Intent & Fraud Classifiers', 'Autonomous Reasoning Agents', 'Geospatial Pattern Recognition'],
    outputState: 'Raw data evaluated against business economics, SLAs, and commercial rules.'
  },
  {
    id: 'software',
    layerNumber: '03',
    title: 'SOFTWARE',
    subtitle: 'Deterministic Machinery',
    components: ['Resilient Microservices', 'Real-time Event Queues', 'Operational Cockpits', 'Digital Worker Runtimes', 'REST & GraphQL Gateways'],
    outputState: 'Production software orchestrating human and machine workflows reliably.'
  },
  {
    id: 'integration',
    layerNumber: '04',
    title: 'INTEGRATION',
    subtitle: 'Systemic Nervous System',
    components: ['WhatsApp Business API', 'SAP & Oracle ERP Connectors', 'Ozow / Paystack / Banking Rails', 'Model Context Protocol (MCP)', 'Legacy Database Drivers'],
    outputState: 'Zero-friction interoperability across legacy and modern cloud applications.'
  },
  {
    id: 'action',
    layerNumber: '05',
    title: 'ACTION',
    subtitle: 'Autonomous Execution',
    components: ['Recover Disputed Capital', 'Re-allocate Floor Inventory', 'Dispatch Verified Bookings', 'Trigger Fraud Alarms', 'Execute Enterprise Workflows'],
    outputState: 'MEASURABLE BUSINESS IMPACT & ECONOMIC MOMENTUM'
  }
];

export const GENERAL_INTELLIGENCE_ITEMS = [
  { title: 'Lead Generation', desc: 'Autonomous monitoring of company filings and intent signals to identify ready buyers.' },
  { title: 'Sales Follow-up', desc: 'Persistent, natural multi-touch email and WhatsApp outreach that never drops warm leads.' },
  { title: 'AI Employees', desc: 'Digital workers that manage inboxes, file claims, and handle clerical repetition.' },
  { title: 'Customer Operations', desc: '24/7 self-service triage, order tracking, and issue resolution in South African languages.' },
  { title: 'WhatsApp Automation', desc: 'Full conversational commerce, booking, and customer inquiry management.' },
  { title: 'Email Operations', desc: 'Automatic categorization, document extraction, and draft dispatch for busy teams.' },
  { title: 'Revenue Recovery', desc: 'Systematic auditing of billing, discounts, and invoices to reclaim lost margins.' },
  { title: 'Marketing Automation', desc: 'Dynamic campaign adjustment grounded in live sales data and inventory levels.' },
  { title: 'Browser Automation', desc: 'Headless agents that execute repetitive workflows across portals lacking public APIs.' }
];

export const ENTERPRISE_INDUSTRIES = [
  { name: 'Financial Services', desc: 'Risk scoring, automated credit assessment, compliance filing, and fraud pattern detection.' },
  { name: 'Insurance & Underwriting', desc: 'Precinct spatial analysis, satellite claim verification, and algorithmic rating.' },
  { name: 'Mining & Resources', desc: 'Asset utilization telemetry, remote logistics tracking, and regulatory health & safety reporting.' },
  { name: 'Logistics & Freight Transport', desc: 'Demurrage recovery, waybill reconciliation, driver dispatch, and corridor modeling.' },
  { name: 'Retail & FMCG Networks', desc: 'Real-time shelf inventory intelligence, creator commerce attribution, and route logistics.' },
  { name: 'Government & State Infrastructure', desc: 'Public record processing, citizen service routing, and asset integrity tracking.' },
  { name: 'Professional Services', desc: 'Document discovery, legal brief cross-referencing, and matter management automation.' },
  { name: 'Heavy Industrial Operations', desc: 'Preventative equipment maintenance, siding turnaround, and supply chain telemetry.' }
];

export const PROBLEM_QUESTIONS = [
  'Where is revenue disappearing?',
  'Where are decisions taking too long?',
  'Where is valuable information trapped?',
  'Where are people doing work software should be doing?',
  'Where are operational blind spots costing money?',
  'Where is compliance dependent on manual interpretation?',
  'Where are disconnected systems preventing action?'
];

export const METHOD_STAGES = [
  {
    num: '01',
    title: 'DIAGNOSE',
    desc: 'Understand how the organisation actually works. We inspect transaction flows, manual bottlenecks, data silos, and balance sheet friction.'
  },
  {
    num: '02',
    title: 'FIND THE OPPORTUNITY',
    desc: 'Identify where intelligence can create measurable value. We quantify the economic upside before writing a line of code.'
  },
  {
    num: '03',
    title: 'DESIGN',
    desc: 'Architecture, data, workflows, intelligence and integrations. Blueprints engineered for real operational resilience.'
  },
  {
    num: '04',
    title: 'PROTOTYPE',
    desc: 'Build the smallest system capable of proving the opportunity. Live validation with actual data within weeks, not quarters.'
  },
  {
    num: '05',
    title: 'PRODUCTIONISE',
    desc: 'Security, APIs, databases, authentication, monitoring and reliability. Hardened enterprise deployment ready for mission-critical scale.'
  },
  {
    num: '06',
    title: 'MEASURE',
    desc: 'Prove the system created value. Continuous tracking of recovered revenue, collapsed cycle times, and operational throughput.'
  }
];

export const LAB_TOPICS = [
  {
    title: 'Agent Systems',
    status: 'ACTIVE RESEARCH',
    summary: 'Autonomous multi-agent architectures that negotiate, plan, and execute multi-step business transactions without human micromanagement.'
  },
  {
    title: 'MCP (Model Context Protocol)',
    status: 'SYSTEM INFRASTRUCTURE',
    summary: 'Standardized protocols allowing localized intelligence models to safely access proprietary databases and internal enterprise microservices.'
  },
  {
    title: 'Browser Automation',
    status: 'DEPLOYED RUNTIME',
    summary: 'Deterministic headless browser engines navigating legacy web portals, banking interfaces, and supplier systems that lack modern APIs.'
  },
  {
    title: 'Generative Media & Spatial Intelligence',
    status: 'PILOT STUDY',
    summary: 'High-resolution satellite image analysis merged with generative synthetic terrain models for infrastructure risk modeling.'
  },
  {
    title: 'AI Infrastructure & Edge Runtimes',
    status: 'ENGINEERING',
    summary: 'Ultra-low-latency local inference servers engineered for intermittent African bandwidth and strict on-premise data residency.'
  },
  {
    title: 'Open Source Systems',
    status: 'COMMUNITY',
    summary: 'Contributing specialized South African language tokenizers, customs tariff parsers, and spatial schemas to the global developer commons.'
  }
];

export const FOUNDER_INFO = {
  name: 'THABISO NAHA',
  role: 'FOUNDER / INTELLIGENT SYSTEMS ENGINEER',
  bio: [
    'I build systems.',
    'Software. Data. Automation. AI. APIs. Agents. Geospatial intelligence. Digital workers.',
    "My interest isn't in making AI look impressive. It's in finding where intelligence can create measurable economic value — and then building the machinery to capture it.",
    'NahaLabs exists to work on problems that are too specific for generic software, too valuable to leave manual, and too important to solve with technology theatre.',
    'The approach is simple: Diagnose the problem. Find the opportunity. Engineer the system. Put it into production. Measure whether it created value.',
    'Based in Johannesburg, South Africa, NahaLabs builds for businesses in South Africa, Lesotho, the wider African market and enterprise environments where practical intelligence can materially change how work gets done.'
  ]
};

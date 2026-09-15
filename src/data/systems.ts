import { SystemItem } from '../types';
import { ASSETS } from './assets';

export const SYSTEMS_DATA: SystemItem[] = [
  {
    id: 'flavourly',
    slug: 'flavourly',
    name: 'FLAVOURLY',
    subtitle: 'Restaurant Revenue Operating System',
    category: 'Commerce & Hospitality',
    status: 'SYSTEM',
    shortProposition: 'Turn seat capacity, guest history, and booking signals into automated revenue recovery.',
    problemStatement: 'High-end restaurants in Johannesburg and Sandton face chronic revenue leakage from last-minute cancellations, empty prime mid-week tables, and unmonetised VIP customer preferences.',
    whatItDoes: [
      'Live table inventory anomaly detection paired with waitlist demand matching',
      'Automated high-value regular guest recognition & WhatsApp VIP reservations',
      'Dynamic yield prediction across shifting weather and local events',
      'Real-time spend analytics and menu margin intelligence'
    ],
    businessValue: 'Recovers up to 18% in lost floor revenue through proactive vacancy re-allocation and intelligent guest retention without discounting.',
    architectureLayers: ['POS Integration', 'Booking Webhooks', 'Conversational AI Engine', 'Yield Optimiser'],
    image: ASSETS.flavourly,
    tags: ['Hospitality', 'Revenue Recovery', 'WhatsApp Automation', 'Johannesburg']
  },
  {
    id: 'cargoiq',
    slug: 'cargoiq',
    name: 'CARGOiQ',
    subtitle: 'Freight Intelligence & Revenue Recovery',
    category: 'Logistics & Supply Chain',
    status: 'SYSTEM',
    shortProposition: 'Cross-examine waybills, demurrage fees, and tariff discrepancies to halt supply chain cash leaks.',
    problemStatement: 'Freight operators moving cargo between Durban, City Deep in Johannesburg, and regional borders lose millions annually to invoicing discrepancies, misapplied demurrage penalties, and untracked container dwell times.',
    whatItDoes: [
      'Multi-format freight invoice & bill of lading automated parsing (OCR + LLM)',
      'Algorithmic rate-card reconciliation against signed master service agreements',
      'Real-time demurrage exposure alarms and gate-out verification',
      'Automated dispute dossier generation ready for carrier submission'
    ],
    businessValue: 'Recovers between 3% and 7% of total annual freight expenditure directly from carrier billing errors.',
    architectureLayers: ['Document Pipeline', 'Tariff Validation Engine', 'Dispute Workflow Agent', 'ERP Hook'],
    image: ASSETS.cargoiq,
    tags: ['Freight', 'Logistics', 'Invoicing Audit', 'Gauteng']
  },
  {
    id: 'leadmachine',
    slug: 'leadmachine',
    name: 'LEADMACHINE',
    subtitle: 'Commercial Intelligence',
    category: 'Sales & Growth',
    status: 'SYSTEM',
    shortProposition: 'Monitor commercial signals, classify buyer intent, and orchestrate precision outreach.',
    problemStatement: 'B2B sales teams in competitive Gauteng markets spend 60% of their day manually researching prospect triggers, resulting in stale leads and lost deals.',
    whatItDoes: [
      'Continuous monitoring of CIPC filings, executive appointments, tenders, and expansion signals',
      'Autonomous qualification and ICP tiering across South African enterprise databases',
      'Hyper-contextual conversational warm-up via email and verified channels',
      'Direct dispatch of warm, qualified buying opportunities to senior account executives'
    ],
    businessValue: 'Reduces time-to-first-meeting by 74% while maintaining pristine qualification standards.',
    architectureLayers: ['Web Signal Harvester', 'Intent Classifier', 'Multi-channel Orchestrator', 'CRM Sync'],
    image: ASSETS.enterpriseJhb,
    tags: ['Commercial Intelligence', 'B2B Sales', 'Lead Gen', 'Sandton']
  },
  {
    id: 'railwatch',
    slug: 'railwatch',
    name: 'RAILWATCH',
    subtitle: 'Rail & Transport Intelligence',
    category: 'Transport & Infrastructure',
    status: 'WORK IN DEVELOPMENT',
    shortProposition: 'Infrastructure monitoring, siding utilization, and freight wagon turnaround analytics.',
    problemStatement: 'Heavy rail freight corridors experience operational blind spots, wagon idle cycles, and siding theft risks that throttle industrial supply chains.',
    whatItDoes: [
      'Geospatial asset tracking and train turnaround velocity telemetry',
      'Siding dwell duration anomaly alarms and corridor throughput modeling',
      'Automated yard reconciliation and consignment hand-off verification',
      'Predictive equipment servicing alerts based on cumulative axle loads'
    ],
    businessValue: 'Increases rail car turnaround efficiency and minimizes unbilled rolling stock demurrage.',
    architectureLayers: ['Spatial Telemetry', 'Corridor Stream Engine', 'Turnaround Predictor', 'Operations Dashboard'],
    image: ASSETS.railwatch,
    tags: ['Rail Freight', 'Transport', 'Infrastructure', 'South Africa']
  },
  {
    id: 'insurance-intelligence',
    slug: 'insurance-intelligence',
    name: 'INSURANCE INTELLIGENCE',
    subtitle: 'Spatial & Risk Intelligence',
    category: 'Financial Services & Risk',
    status: 'SOLUTION',
    shortProposition: 'Hyper-local geographic risk modeling for commercial and residential underwriting in Southern Africa.',
    problemStatement: 'Insurers rely on outdated national flood, fire, and infrastructure vulnerability tables that fail to capture precinct-level risks in Gauteng and coastal corridors.',
    whatItDoes: [
      'Micro-precinct terrain, runoff, and infrastructure integrity mapping',
      'Automated satellite and municipal service history cross-referencing',
      'Instant policy underwriting risk scoring API at point-of-quote',
      'Claims verification through historical meteorological and visual corroboration'
    ],
    businessValue: 'Enables accurate risk pricing, reducing loss ratios by up to 14% on property portfolios.',
    architectureLayers: ['GIS Vector Pipeline', 'Hydrological Models', 'Underwriting API', 'Claims Verifier'],
    image: ASSETS.insurance,
    tags: ['InsurTech', 'Spatial Risk', 'Underwriting', 'Financial Services']
  },
  {
    id: 'taxintel',
    slug: 'taxintel',
    name: 'TAXINTEL',
    subtitle: 'Tax & Regulatory Intelligence',
    category: 'Compliance & Legal',
    status: 'WORK IN DEVELOPMENT',
    shortProposition: 'Autonomous cross-referencing of SARS interpretations, customs rulings, and transactional books.',
    problemStatement: 'Corporate finance teams struggle to keep pace with dynamic SARS rulings, customs tariff classifications, and cross-border VAT reconciliation across SADC.',
    whatItDoes: [
      'Real-time semantic analysis of SARS practice notes, court rulings, and gazettes',
      'Continuous general ledger transaction reconciliation against withholding tax and VAT rules',
      'Cross-border SADC customs code verification for goods entering Lesotho and neighboring territories',
      'Automated compliance audit pack preparation'
    ],
    businessValue: 'Eliminates penalties, protects against retrospective assessments, and accelerates customs clearance.',
    architectureLayers: ['Tax Ontology Engine', 'General Ledger Connector', 'Customs Tariff Database', 'Audit Pack Generator'],
    image: ASSETS.taxintel,
    tags: ['Compliance', 'Tax Regulatory', 'SARS', 'SADC']
  },
  {
    id: 'sella',
    slug: 'sella',
    name: 'SELLA',
    subtitle: 'Creator Commerce Intelligence',
    category: 'Retail & Creator Economy',
    status: 'SYSTEM CONCEPT',
    shortProposition: 'Bridging digital creator influence with physical retail conversion and real-time inventory tracking.',
    problemStatement: 'Retail brands and township creators lack closed-loop attribution between social endorsements, QR activations, and cash/card checkouts.',
    whatItDoes: [
      'Instant frictionless checkout links embedded across social media and WhatsApp',
      'Dynamic physical store shelf QR attribution and creator commission settlement',
      'Predictive inventory allocation based on viral engagement velocity',
      'Automated micro-influencer performance analytics'
    ],
    businessValue: 'Transforms ambiguous brand sponsorship into measurable physical and online unit sales.',
    architectureLayers: ['Commerce Graph', 'QR Attribution Engine', 'WhatsApp Pay / Ozow Hooks', 'Creator Portal'],
    image: ASSETS.sella,
    tags: ['Creator Commerce', 'Retail', 'Attribution', 'Township Economy']
  },
  {
    id: 'spatial-intelligence',
    slug: 'spatial-intelligence',
    name: 'SPATIAL INTELLIGENCE',
    subtitle: 'Geospatial Decision Intelligence',
    category: 'Geospatial & Urban',
    status: 'SOLUTION',
    shortProposition: 'High-resolution geospatial analysis for site selection, route efficiency, and territory operations.',
    problemStatement: 'Commercial enterprises expand into new retail hubs, distribution zones, or branch locations using intuition rather than spatial gravity and foot-traffic data.',
    whatItDoes: [
      'Catchment population and purchasing power density analysis across Gauteng precincts',
      'Competitor proximity and road network accessibility modeling',
      'Last-mile delivery route optimization considering South African arterial conditions',
      'Territory performance benchmarking and cannibalisation forecasting'
    ],
    businessValue: 'Drives capital allocation confidence and eliminates sub-optimal site acquisitions.',
    architectureLayers: ['Satellite Imagery Processor', 'Demographic Synthesis', 'Routing Mesh', 'Executive Map Studio'],
    image: ASSETS.spatial,
    tags: ['Geospatial', 'Site Selection', 'Logistics', 'Gauteng']
  },
  {
    id: 'digital-workers',
    slug: 'digital-workers',
    name: 'DIGITAL WORKERS',
    subtitle: 'Intelligent Operational Capacity',
    category: 'Autonomous Operations',
    status: 'SYSTEM',
    shortProposition: 'Self-governing software agents executing end-to-end operational workflows with audit precision.',
    problemStatement: 'Skilled knowledge workers spend 45% of their working hours manually copy-pasting data between legacy ERPs, spreadsheets, WhatsApp chats, and client emails.',
    whatItDoes: [
      'Autonomous email inbox triage, intent extraction, and document attachment processing',
      'Cross-system data synchronization between legacy desktop software and cloud APIs',
      'Exception-based escalation to human managers only when confidence falls below set thresholds',
      'Full cryptographic audit logging of every operational decision and execution'
    ],
    businessValue: 'Adds 10x operational throughput without linear headcount expansion while virtually eliminating human clerical error.',
    architectureLayers: ['Agent Orchestration Runtime', 'Browser / API Drivers', 'Policy Engine', 'Audit Ledger'],
    image: ASSETS.digitalWorkers,
    tags: ['AI Agents', 'Automation', 'Digital Workforce', 'Operational Scale']
  }
];

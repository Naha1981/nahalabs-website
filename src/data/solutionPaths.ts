import { SolutionPathway } from '../types';

export const SOLUTION_PATHWAYS: Record<string, SolutionPathway> = {
  customers: {
    id: 'customers',
    title: 'Get More Customers',
    tagline: 'Turn enquiries, conversations and demand into more qualified customers and revenue.',
    description: 'More leads do not automatically translate to more revenue. Businesses lose high-value prospects because enquiries are answered too late, leads are not systematically qualified, follow-up is inconsistent, and buying conversations vanish across channels.',
    ctaText: 'Explore Growth & Acquisition Systems',
    examples: [
      'Multi-channel lead capture',
      'Instant intent qualification (HOT/WARM/COLD)',
      'Booking & reservation conversion',
      'High-touch VIP customer engagement',
      'Automated re-engagement & retention'
    ],
    approachSteps: [
      { step: '01', label: 'Capture', description: 'Consolidate incoming traffic from WhatsApp, website forms, social ads, and calls into a single structured pipeline.' },
      { step: '02', label: 'Qualify', description: 'Autonomously score buyer intent, budget, and urgency within seconds rather than days.' },
      { step: '03', label: 'Respond', description: 'Deliver instant, context-aware answers to eliminate response-time dropoff.' },
      { step: '04', label: 'Convert', description: 'Route high-intent prospects straight to senior closers or automated checkout.' },
      { step: '05', label: 'Retain', description: 'Systematically nurture past purchasers and VIP accounts to drive repeat commercial transactions.' }
    ],
    educationalPoints: [
      {
        heading: 'Why Traditional Lead Gen Fails',
        text: 'Pouring money into ad spend while leads sit in an inbox for 4 hours is commercial suicide. Buyer intent decays exponentially within the first 10 minutes. If your response is not immediate and tailored, your competitor wins the deal.'
      },
      {
        heading: 'The Omnichannel Friction Gap',
        text: 'Customers communicate on WhatsApp, telephone, and social direct messages. When these conversations are handled manually on personal phones, institutional memory is lost, bookings drop through the cracks, and sales pipelines cannot be audited.'
      },
      {
        heading: 'The Intelligent Acquisition Engine',
        text: 'NahaLabs transforms conversational chaos into high-velocity revenue pipelines. We engineer automated qualification workflows that alert sales executives only when a genuine buyer is ready, while nurturing exploratory prospects automatically.'
      }
    ],
    caseStudyIds: ['flavourly', 'leadmachine', 'sella', 'dakeen']
  },
  recovery: {
    id: 'recovery',
    title: 'Recover Lost Revenue',
    tagline: 'Find money disappearing through operational leakage, errors, delays and missed recovery opportunities.',
    description: 'Revenue is rarely lost in dramatic single failures. It leaks silently in the gaps between operational systems, people, and paper handoffs. Invoices are not cross-checked against rate cards, demurrage fees go unbilled, and exceptions vanish into email chains.',
    ctaText: 'Explore Revenue Recovery Systems',
    examples: [
      'Automated freight & logistics invoice audit',
      'Carrier waiting-time & demurrage recovery',
      'Commercial insurance claims leakage prevention',
      'Cross-ledger billing discrepancy reconciliation',
      'Regulatory penalty & compliance loss mitigation'
    ],
    approachSteps: [
      { step: '01', label: 'Discover', description: 'Map the exact operational checkpoints where billable services and transactions escape unbilled.' },
      { step: '02', label: 'Detect', description: 'Deploy algorithmic sensors that continuously compare waybills, timestamps, rate cards, and contracts to flag exceptions.' },
      { step: '03', label: 'Recover', description: 'Autonomously generate dispute dossiers, supplementary invoices, and corrective claims ready for immediate submission.' },
      { step: '04', label: 'Measure', description: 'Track verified recovered rand value in real time on executive financial dashboards.' }
    ],
    educationalPoints: [
      {
        heading: 'Where Revenue Leakage Actually Happens',
        text: 'In high-velocity operations (such as logistics, distribution, hospitality, and healthcare), transactions move faster than manual audit teams can verify. Discrepancies between contracted rates and supplier invoices compound across thousands of line items.'
      },
      {
        heading: 'Why Internal Audits Arrive Too Late',
        text: 'Quarterly and annual financial audits only discover leakage months after the fact—when dispute windows have closed, memories have faded, and carrier relationships make retroactive billing difficult. Real recovery requires real-time automated detection.'
      },
      {
        heading: 'The NahaLabs Recovery Layer',
        text: 'Our recovery systems sit above existing enterprise software without requiring disruptive migrations. They monitor operational telemetry, cross-examine data across multiple databases, and deliver auditable proof of recoverable capital straight to finance.'
      }
    ],
    caseStudyIds: ['cargoiq', 'netpulse']
  },
  operations: {
    id: 'operations',
    title: 'Build an Intelligent Operating System',
    tagline: 'Connect fragmented processes, data and legacy systems into an intelligent layer that helps the business see, decide and act.',
    description: 'Your enterprise already has software: ERP, CRM, accounting, spreadsheets, emails, and WhatsApp. The problem is the friction between them. Information exists, but executing decisions still requires people manually transferring files and copy-pasting numbers.',
    ctaText: 'Explore Intelligent Operations',
    examples: [
      'Non-invasive legacy ERP intelligence layer',
      'Autonomous digital workers (Pamela AI)',
      'Operational anomaly detection & decision telemetry',
      'Cross-departmental robotic process automation',
      'AI readiness & automation ROI engineering'
    ],
    approachSteps: [
      { step: '01', label: 'Connect', description: 'Securely link fragmented legacy databases, desktop software, cloud APIs, and communication streams.' },
      { step: '02', label: 'Understand', description: 'Synthesize messy, unstructured documents, tickets, and emails into structured operational facts.' },
      { step: '03', label: 'Decide', description: 'Apply strict business rules, risk thresholds, and contextual intelligence to recommend or determine action.' },
      { step: '04', label: 'Act', description: 'Direct digital workers and API integrations to execute transactions with 100% audit logging.' }
    ],
    educationalPoints: [
      {
        heading: 'The Reality of Enterprise System Silos',
        text: 'Large and growing companies often spend millions on ERP or CRM software only to discover their staff still spend half their working day in Microsoft Excel and WhatsApp. The software stores records, but it does not actively run the business.'
      },
      {
        heading: 'Why "Rip-and-Replace" Is a Trap',
        text: 'Scrapping operational systems that took a decade to stabilize introduces catastrophic operational risk. The future is not another generic all-in-one SaaS tool—it is an intelligent connective layer that makes existing systems communicate and act.'
      },
      {
        heading: 'The Rise of Autonomous Digital Workers',
        text: 'Instead of hiring more administrative staff to perform mechanical clerical tasks, NahaLabs deploys digital workers. These software agents work alongside human teams, handling routine data moves so your best people can focus on high-judgment relationships.'
      }
    ],
    caseStudyIds: ['revenue-os', 'pamela', 'audit', 'thuso', 'academy']
  }
};

/**
 * Single source of truth for the home-page FAQ.
 * Rendered visibly by FaqSection and emitted as FAQPage JSON-LD from the same
 * array, so the structured data can never drift from what visitors read.
 * Only state facts that are already published elsewhere on the site.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is NahaLabs?',
    answer:
      'NahaLabs is an intelligent systems engineering company based in Johannesburg, South Africa. It finds the operational problems that quietly cost a business money or time, then engineers the intelligent systems, AI digital workers, automations and software that fix them.',
  },
  {
    question: 'What does NahaLabs build?',
    answer:
      'Bespoke systems built around one specific operational problem. Examples on this site include Flavourly for restaurant demand and margin tracking, CargoIQ for freight quoting and demurrage risk, RailWatch for rail corridor monitoring, Revenue OS for inbound enterprise sales pipeline, and lead response and follow-up automation for Johannesburg businesses.',
  },
  {
    question: 'Who is NahaLabs for?',
    answer:
      'Enterprises and high-growth businesses in South Africa, Lesotho and the wider region that lose revenue or time to manual work, disconnected tools and slow decisions. Current focus areas include hospitality, freight and logistics, rail infrastructure and enterprise sales.',
  },
  {
    question: 'How is NahaLabs different from off-the-shelf software or consulting?',
    answer:
      'Off-the-shelf software is built for the average business, while NahaLabs engineers around your own workflows, data and commercial rules. Unlike consulting, the work does not stop at recommendations: the same team diagnoses the problem, builds the system and puts it into production. Projects are fixed-scope rather than open-ended retainers.',
  },
  {
    question: 'How does a NahaLabs project work?',
    answer:
      'Every project runs in three stages. Diagnosis (1–2 weeks) identifies what is actually broken and specifies the system. Prototype (2–3 weeks) tests a working version on your real data. Production (3–6 weeks) deploys the hardened system with security, team handover and monitoring. If automation or AI is the wrong answer, NahaLabs says so during diagnosis.',
  },
  {
    question: 'Where does NahaLabs work?',
    answer:
      'NahaLabs is headquartered in Johannesburg and works with clients across Gauteng, including Sandton and Soweto, throughout South Africa, in Lesotho and across the wider region.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Bespoke systems are scoped as fixed projects rather than open-ended retainers, and the diagnosis produces the specification and return-on-investment projection that the project is based on. Lead response and follow-up automation for Johannesburg businesses has its own published pilot pricing on its service page.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Book a 45-minute technical diagnosis. NahaLabs reviews your bottleneck, verifies technical viability and estimates return on investment before any commitment. Use the enquiry form on this page or email ai-solutions@nahalabs.co.za.',
  },
];

export const faqJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://nahalabs.co.za/#faq',
  inLanguage: 'en-ZA',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});

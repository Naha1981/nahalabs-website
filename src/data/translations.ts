export type Language = 'en' | 'st';

export interface TranslationDictionary {
  nav: {
    solutions: string;
    caseStudies: string;
    howWeWork: string;
    enterprise: string;
    systems: string;
    outcomes: string;
    lab: string;
    faq: string;
    about: string;
    regions: string;
    cta: string;
    directory: string;
    langSwitch: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    tagline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  manifesto: {
    badge: string;
    title: string;
    lead: string;
    reality1Title: string;
    reality1Desc: string;
    reality2Title: string;
    reality2Desc: string;
    reality3Title: string;
    reality3Desc: string;
    resolution: string;
    resolutionTitle: string;
    resolutionText: string;
  };
  systems: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    copyContactBtn: string;
    copied: string;
    manualInquiry: string;
  };
  businessFuel: {
    badge: string;
    title: string;
    subtitle: string;
    quote: string;
  };
  method: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    stages: Array<{ num: string; title: string; desc: string }>;
    signatureBadge: string;
    signatureFlow: string[];
    signatureDesc: string;
    verifiedGateway: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    nextStep: string;
    prevStep: string;
    submit: string;
    directDesk: string;
    locationTitle: string;
    draftRestored: string;
    clearDraft: string;
  };
  footer: {
    dispatchesBadge: string;
    dispatchesTitle: string;
    dispatchesDesc: string;
    subscribeBtn: string;
    placeholder: string;
    brandDesc: string;
    regionalHubs: string;
    methodology: string;
    rights: string;
    copyEmail: string;
    copyAddress: string;
    copied: string;
    privacy: string;
    terms: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
  };
  commandPalette: {
    placeholder: string;
    all: string;
    sections: string;
    systems: string;
    regions: string;
    noResults: string;
    noResultsDesc: string;
    navigateTip: string;
    selectTip: string;
    closeTip: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      solutions: 'Solutions',
      caseStudies: 'Case Studies',
      howWeWork: 'How We Work',
      enterprise: 'Enterprise',
      systems: 'Case Studies',
      outcomes: 'Outcomes',
      lab: 'Lab',
      faq: 'FAQ',
      about: 'About',
      regions: 'Regional Desks',
      cta: 'Diagnose an Opportunity',
      directory: 'NahaLabs Directory',
      langSwitch: 'Sesotho',
    },
    hero: {
      badge: 'Intelligent Revenue Systems',
      titleLine1: 'FIND WHERE YOUR BUSINESS IS LOSING',
      titleLine2: 'MONEY, TIME, OR OPPORTUNITY.',
      tagline: 'NahaLabs engineers intelligent systems that turn expensive business problems into measurable outcomes. We identify the bottleneck, design the solution, prototype it, and turn it into production software.',
      ctaPrimary: 'Find My Opportunity',
      ctaSecondary: 'See How We Solve Problems',
    },
    manifesto: {
      badge: '01 / SYSTEM PHILOSOPHY',
      title: 'SOFTWARE SHOULD CREATE MOMENTUM, NOT RESISTANCE.',
      lead: 'Most enterprises are slowed down by fragmented databases, disconnected SaaS tools, and manual human handoffs. NahaLabs replaces operational friction with unified intelligent automation.',
      reality1Title: 'Fragmented Tools Dilute Focus',
      reality1Desc: 'Modern enterprises subscribe to dozens of disconnected platforms that create silos and operational drag.',
      reality2Title: 'Intelligence Must Be Grounded',
      reality2Desc: 'Generic AI chatbots hallucinate. Bespoke systems connect directly into your verified proprietary databases.',
      reality3Title: 'Speed Is Competitive Advantage',
      reality3Desc: 'Systems that eliminate manual friction allow teams to act decisively at real-world market speed.',
      resolution: 'THE RESOLUTION',
      resolutionTitle: "That’s where NahaLabs operates.",
      resolutionText: 'We engineer intelligent systems around the economics, data and operations of your business.',
    },
    systems: {
      badge: '03 / SYSTEM PORTFOLIO',
      titleLine1: 'CHOOSE YOUR',
      titleLine2: 'ADVANTAGE.',
      lead: 'Different businesses have different problems. The underlying opportunity is often the same: turn fragmented information into intelligent action.',
      copyContactBtn: 'Copy Contact Email',
      copied: 'Copied!',
      manualInquiry: 'Direct Engineering Inquiry:',
    },
    businessFuel: {
      badge: '02 / BUSINESS FUEL',
      title: 'BUSINESS FUEL.',
      subtitle: 'Energy drinks fuel people. NahaLabs fuels businesses. Tap any architectural panel to reveal how intelligent systems create operational momentum.',
      quote: 'NahaLabs gives businesses the intelligence, automation and systems they need to create momentum.',
    },
    method: {
      badge: '09 / DELIVERY RIGOUR',
      titleLine1: 'FROM BUSINESS PROBLEM',
      titleLine2: 'TO PRODUCTION SYSTEM.',
      lead: 'A predictable, disciplined six-stage engineering journey designed to de-risk technological investment and validate commercial value before wide rollouts.',
      stages: [
        {
          num: '01',
          title: 'Deep Operational Diagnosis',
          desc: 'We map the actual mechanics of how work, capital, and data move through your business—identifying hidden manual handoffs, reconciliation leakages, and delayed commercial loops.',
        },
        {
          num: '02',
          title: 'Economics & Value Modeling',
          desc: 'Before writing code, we quantify target unit economic improvements, expected labour recovery, and error reduction thresholds to ensure capital efficiency.',
        },
        {
          num: '03',
          title: 'Bespoke Architecture Design',
          desc: 'We design the exact technical blueprint—selecting high-throughput foundational LLMs, private vector stores, event-driven webhooks, and deterministic validation rules.',
        },
        {
          num: '04',
          title: 'Working Pilot Prototype (14 Days)',
          desc: 'We build an end-to-end working pilot deployed against sanitized real-world company data to demonstrate functional performance before contractual lock-in.',
        },
        {
          num: '05',
          title: 'Hardened Production Rollout',
          desc: 'Full enterprise integration into existing ERP, CRM, and communication infrastructure with bank-grade encryption, audit trails, and 99.9% uptime SLAs.',
        },
        {
          num: '06',
          title: 'Continuous Autonomous Evolution',
          desc: 'Once active, the system is tuned against operational edge cases, model drift, and changing market regulations, becoming more valuable every operating month.',
        },
      ],
      signatureBadge: 'THE SIGNATURE METHODOLOGY',
      signatureFlow: ['DIAGNOSIS', 'PROTOTYPE', 'PRODUCTION'],
      signatureDesc: 'We do not lock clients into multi-year slide deck engagements. We build functional prototypes to mathematically prove upside, then scale to production.',
      verifiedGateway: 'VERIFIED GATEWAY',
    },
    contact: {
      badge: '14 / COMMERCIAL INQUIRY DESK',
      title: 'START AN ARCHITECTURAL CONVERSATION.',
      subtitle: 'Tell us where operational friction is costing your enterprise margin, speed, or focus. Our engineering principals will review your brief within 24 business hours.',
      step1Title: 'Enterprise Context',
      step2Title: 'Challenge & Volume',
      step3Title: 'Timeline & Review',
      nextStep: 'Proceed to Next Step',
      prevStep: 'Return to Previous Step',
      submit: 'Submit Architecture Brief',
      directDesk: 'Direct Engineering Desk:',
      locationTitle: 'Regional Headquarters:',
      draftRestored: 'In-progress draft restored from local storage.',
      clearDraft: 'Clear Saved Draft',
    },
    footer: {
      dispatchesBadge: 'NAHALABS ARCHITECTURAL DISPATCHES',
      dispatchesTitle: 'Executive Briefings on Bespoke Systems & Operational AI',
      dispatchesDesc: 'Curated case analyses, Southern African industrial benchmarks, and deployment breakdowns from our Johannesburg engineering desk. Strictly zero marketing noise.',
      subscribeBtn: 'Subscribe',
      placeholder: 'corporate.email@company.co.za',
      brandDesc: 'NahaLabs engineers bespoke intelligent systems, automation machinery, and business intelligence for enterprises and high-growth businesses.',
      regionalHubs: 'REGIONAL HUBS (SEO)',
      methodology: 'METHODOLOGY',
      rights: 'All rights reserved. Registered in the Republic of South Africa.',
      copyEmail: 'Copy Email',
      copyAddress: 'Copy Address',
      copied: 'Copied!',
      privacy: 'Privacy Policy',
      terms: 'Terms of Engagement',
    },
    faq: {
      badge: '12 / SPECIFICATIONS & FAQ',
      title: 'COMMONLY ASKED ARCHITECTURAL QUESTIONS.',
      subtitle: 'Direct answers on security, IP ownership, integration timelines, and commercial models.',
    },
    commandPalette: {
      placeholder: 'Search sections, systems, or regional desks... (Type or use ↑↓)',
      all: 'All',
      sections: 'Sections',
      systems: 'Systems',
      regions: 'Regional Desks',
      noResults: 'No matches found',
      noResultsDesc: 'Try searching for "Method", "Cargo", "Flavourly", "Sandton", or "Contact".',
      navigateTip: 'Navigate',
      selectTip: 'Select',
      closeTip: 'Close',
    },
  },
  st: {
    nav: {
      solutions: 'Litharollo',
      caseStudies: 'Liphuputso tsa Nnete',
      howWeWork: 'Mokgwa oa Rona',
      enterprise: 'Likhoebo',
      systems: 'Litsamaiso',
      outcomes: 'Liphetho',
      lab: 'Laboratori',
      faq: 'Lipotso',
      about: 'Mabapi',
      regions: 'Meeli & Libaka',
      cta: 'Hlahloba Monyetla',
      directory: 'Tsamaiso ea NahaLabs',
      langSwitch: 'English',
    },
    hero: {
      badge: 'Litsamaiso Tse Bohlale Tsa Lekhetho',
      titleLine1: 'FUMANA MOO KHOEBO EA HAU E LAHLANG',
      titleLine2: 'CHELLETE, NAKO, KAPA MONYETLA TENG.',
      tagline: 'NahaLabs e rala litsamaiso tse bohlale tse fetolang mathata a boima a kgwebo hore e be liphetho tse ka lekanyetsoang. Re hlahloba bothata, re rala tharollo, re bopa mohlala, ebe re e fetola tsamaiso ea sebele ea software.',
      ctaPrimary: 'Fumana Monyetla oa Ka',
      ctaSecondary: 'Sheba Kamoo Re Rarollang Mathata',
    },
    manifesto: {
      badge: '01 / MAIKEMISETSO A RONA',
      title: 'SOFTWARE E TLAMEHA HO TLAISA MATLA, ESENG TŠITISO.',
      lead: 'Likhoebo tse ngata li liehisoa ke lisebelisoa tse arohaneng, li-software tse sa kopaneng, le tsamaiso e boima ka matsoho. NahaLabs e tlosa tšitiso ena ka ho rala litsamaiso tse momahaneng tsa dijithale.',
      reality1Title: 'Lisebelisoa Tse Arohaneng Li Senya Nako',
      reality1Desc: 'Likhoebo tsa kajeno li sebelisa li-platform tse ngata tse sa buisaneng, tse bakang tieho tsamaisong ea letsatsi le letsatsi.',
      reality2Title: 'Bohlale bo Tlameha ho Eba le Motheo',
      reality2Desc: 'AI e tloaelehileng e ka fana ka likarabo tse sa nepahalang. Litsamaiso tsa rona li hokahana ka kotloloho le boitsebiso ba hau ba nnete.',
      reality3Title: 'Lebelo ke Molemo oa Tlhōlisano',
      reality3Desc: 'Litsamaiso tse felisang tšitiso ea matsoho li lumella sehlopha sa hau ho nka liqeto ka potlako le ka nepo.',
      resolution: 'THAROLO EA RONA',
      resolutionTitle: 'Moo ke moo NahaLabs e sebetsang teng.',
      resolutionText: 'Re rala litsamaiso tse bohlale ho potoloha moruo, boitsebiso le tsamaiso ea khoebo ea hau.',
    },
    systems: {
      badge: '03 / LENANE LA LITSAMAISO',
      titleLine1: 'KHETHA MOLEMO',
      titleLine2: 'OA HAO.',
      lead: 'Likhoebo tse sa tšoaneng li na le mathata a sa tšoaneng. Monyetla o motheo o tšoana: fetola tlhahisoleseling e qhalaneng hore e be ketso e bohlale le phaello.',
      copyContactBtn: 'Kopitsa Imeile ea Rona',
      copied: 'E Kopitsitsoe!',
      manualInquiry: 'Ikopanye le Baenjiniere ba Rona:',
    },
    businessFuel: {
      badge: '02 / MAFURA A KHOEBO',
      title: 'MAFURA A KHOEBO.',
      subtitle: 'Lino tse matlafatsang li fa batho matla. NahaLabs e fa likhoebo matla. Tobetsa karolo efe kapa efe ho bona kamoo litsamaiso tse bohlale li tsosolosang mosebetsi kateng.',
      quote: 'NahaLabs e fa likhoebo bohlale, boiketsetso le litsamaiso tseo li li hlokang ho theha lebelo la tsoelo-pele.',
    },
    method: {
      badge: '09 / TSAMAISO EA LITŠA',
      titleLine1: 'HO TLOsync MATHATENG A KHOEBO',
      titleLine2: 'HO EA TSAMAYSONG EA SEBELE.',
      lead: 'Leeto le hlophisitsoeng la methati e tšeletseng le reretsoeng ho fokotsa likotsi tsa thekenoloji le ho paka boleng ba khoebo pele ho katoloso.',
      stages: [
        {
          num: '01',
          title: 'Tlhahlobo e Tebileng ea Mosebetsi',
          desc: 'Re hlahloba ka botlalo mokhoa oo mosebetsi, chelete le boitsebiso li tsamaeang ka teng khwebong ea hau—ho fumana litšitiso le tieho e bakang tahlehelo.',
        },
        {
          num: '02',
          title: 'Moralo oa Moruo le Boleng',
          desc: 'Pele re ngola software, re lekanya phaello e lebelletsoeng, nako e tla bolokoa, le phokotso ea liphoso e le hore matsete a be le phaello e netefalitsoeng.',
        },
        {
          num: '03',
          title: 'Moralo o Kgethehileng oa Botekgeniki',
          desc: 'Re etsa moralo o phethahetseng oa tekgeniki—re khetha mefuta ea AI e nepahetseng, polokelo e sireletsehileng, le melao e tiileng ea netefatso.',
        },
        {
          num: '04',
          title: 'Mohlala o Sebetsang oa Matsatsi a 14',
          desc: 'Re rala mohlala o feletseng o sebetsang le boitsebiso ba hau ba sebele e le hore u bone litholoana tse phelang pele u saena likonteraka tse kholo.',
        },
        {
          num: '05',
          title: 'Ho Hlahisa Tsamaiso e Sireletsehileng',
          desc: 'Ho kenya tsamaiso ka botlalo ho li-ERP, CRM le litsamaiso tsa puisano tse nang le tšireletso ea maemo a holimo ea libanka le botsitso ba 99.9%.',
        },
        {
          num: '06',
          title: 'Ntlafatso e Tsoelang Pele',
          desc: 'Hang ha e qala ho sebetsa, tsamaiso e ntse e ithuta le ho ntlafala khoeli le khoeli ho latela maemo a fetohang a mmaraka le khoebo.',
        },
      ],
      signatureBadge: 'MOKHOA OA RONA OA SEBELE',
      signatureFlow: ['TLHAHLOBO', 'MOHLALA', 'TLHAHISO'],
      signatureDesc: 'Ha re qobelle likhoebo ho reka lipampiri tsa boeletsi tse se nang litholoana. Re haha mehlala e sebetsang ho paka phaello, ebe rea e atolosa.',
      verifiedGateway: 'MOELI O NETEFALITSOENG',
    },
    contact: {
      badge: '14 / DESKE EA PUISANO EA KHOEBO',
      title: 'QALA PUISANO EA BOTEKGENIKI LE RONA.',
      subtitle: 'Re bolelle moo khoebo ea hau e kopanang le litšitiso tsa lebelo, phaello kapa mosebetsi o boima. Baenjiniere ba rona ba tla arabela ka morao ho lihora tse 24.',
      step1Title: 'Boemo ba Khoebo',
      step2Title: 'Bothata le Bophahamo',
      step3Title: 'Nako le Tlhahlobo',
      nextStep: 'Tsoela Pele Mohatong o Latelang',
      prevStep: 'Khutlela Mohatong o Fetileng',
      submit: 'Romela Tlhahiso ea Botekgeniki',
      directDesk: 'Deske ea Baenjiniere ka Kotloloho:',
      locationTitle: 'Ntlo-kholo ea Lebatooa:',
      draftRestored: 'Moralo oa hau o ntseng o tsoela pele o khutlisitsoe polokelong ea lehae.',
      clearDraft: 'Hlakola Moralo o Bolokiloeng',
    },
    footer: {
      dispatchesBadge: 'LITLHAHISO TSA BOTEKGENIKI TSA NAHALABS',
      dispatchesTitle: 'Litlaleho tsa Baetapele Mabapi le Litsamaiso le AI ea Khoebo',
      dispatchesDesc: 'Tlhahlobo ea lithuto tsa linyeoe, litekanyetso tsa liindasteri tsa Afrika e ka Boroa, le litlaleho tse tsoang deskeng ea rona ea Johannesburg. Ha ho na lipapatso tse sa hlokahaleng.',
      subscribeBtn: 'Ingolise',
      placeholder: 'lebitso@khoebo.co.za',
      brandDesc: 'NahaLabs e rala litsamaiso tse ikhethang tsa bohlale, mechine ea boiketsetso le bohlale ba khoebo bakeng sa likhoebo tse ntseng li hōla.',
      regionalHubs: 'LIBOHO TSA MEELI LE LIBAKA',
      methodology: 'MOKHOA OA MOSEBETSI',
      rights: 'Litokelo tsohle li bolokiloe. E ngolisitsoe Rephabliking ea Afrika Boroa.',
      copyEmail: 'Kopitsa Imeile',
      copyAddress: 'Kopitsa Aterese',
      copied: 'E Kopitsitsoe!',
      privacy: 'Leano la Lekunutu',
      terms: 'Melao ea Tšebelisano',
    },
    faq: {
      badge: '12 / LITŠA LE LIPOTSO TSE TLOAELEHILENG',
      title: 'LIPOTSO TSE ATISANG HO BOTSOA KA BOTEKGENIKI.',
      subtitle: 'Likarabo tse tobileng mabapi le tšireletso, beng ba thepa ea mahlale, linako tsa ho kenya le mefuta ea khoebo.',
    },
    commandPalette: {
      placeholder: 'Batla likarolo, litsamaiso, kapa libaka... (Ngola kapa sebelisa ↑↓)',
      all: 'Tsohle',
      sections: 'Likarolo',
      systems: 'Litsamaiso',
      regions: 'Libaka tsa Meeli',
      noResults: 'Ha ho litholoana tse fumanoeng',
      noResultsDesc: 'Leka ho batla "Method", "Cargo", "Flavourly", "Sandton", kapa "Contact".',
      navigateTip: 'Tsamaisa',
      selectTip: 'Khetha',
      closeTip: 'Koala',
    },
  },
};

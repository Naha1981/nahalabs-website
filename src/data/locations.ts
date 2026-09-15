import { LocationData } from '../types';

export const LOCATIONS_DATA: Record<string, LocationData> = {
  johannesburg: {
    id: 'johannesburg',
    slug: 'johannesburg',
    city: 'Johannesburg',
    province: 'Gauteng',
    regionFocus: 'Sandton, Rosebank, Bryanston, CBD & Greater Johannesburg',
    metaTitle: 'NahaLabs | Intelligent Systems Engineering in Johannesburg',
    metaDescription: 'Bespoke intelligent systems, operational automation, and business intelligence engineered for Johannesburg enterprises, commercial leaders, and fast-growing businesses.',
    heroHeadline: 'INTELLIGENT SYSTEMS ENGINEERING IN JOHANNESBURG.',
    heroSubtext: 'From the corporate headquarters of Sandton and Rosebank to industrial hubs across City Deep and the commercial dynamism of Johannesburg, NahaLabs engineers systems that turn fragmented business operations into measurable revenue and decisive action.',
    districts: ['Sandton Financial District', 'Rosebank Commercial Hub', 'Bryanston Tech Corridor', 'City Deep Logistics Depot', 'Melrose Arch', 'Braamfontein Innovation Zone'],
    economicFocus: [
      'Financial Services & Risk Intelligence',
      'Freight, Warehousing & City Deep Logistics',
      'Commercial Real Estate & Property Underwriting',
      'High-Margin Hospitality & Restaurant Revenue Recovery',
      'Cross-Enterprise ERP & Legacy System Integration'
    ],
    strategicContext: 'Johannesburg is the commercial engine of Africa. High transaction velocity combined with legacy software fragmentation creates substantial hidden revenue leakage. NahaLabs does not deploy generic SaaS templates; we diagnose the commercial friction specific to Johannesburg enterprises and engineer production-grade systems to eliminate it.',
    coreSolutions: [
      'LeadMachine Commercial Intelligence for Sandton B2B pipelines',
      'Flavourly Revenue Operating System for premier Johannesburg dining venues',
      'Autonomous Freight Audit & Recovery for City Deep supply chains',
      'Digital Workers augmenting repetitive administrative workflows across financial institutions'
    ],
    localCaseStudy: {
      context: 'A multi-depot commercial distributor based in Johannesburg was losing 4.2% of billable revenue in freight demurrage and untracked carrier invoice discrepancies.',
      intervention: 'Engineered an automated document extraction and tariff verification pipeline connecting ERP dispatch logs with carrier waybills.',
      outcome: 'Recovered R1.84M in disputed freight charges in the first 90 days of production with zero manual audit overhead.'
    }
  },
  soweto: {
    id: 'soweto',
    slug: 'soweto',
    city: 'Soweto',
    province: 'Gauteng',
    regionFocus: 'Protea Glen, Vilakazi Street, Dobsonville, Orlando & Township Commercial Ecosystems',
    metaTitle: 'Intelligent Systems Engineering in Soweto | NahaLabs',
    metaDescription: 'Practical business intelligence, WhatsApp automation, and revenue systems engineered for high-growth township enterprises, retailers, and restaurants in Soweto.',
    heroHeadline: 'INTELLIGENT SYSTEMS ENGINEERING IN SOWETO.',
    heroSubtext: 'Soweto is one of the most commercially vigorous retail and cultural economies in Africa. NahaLabs builds practical, high-impact systems tailored to the realities of township commerce — frictionless WhatsApp operations, booking intelligence, and automated revenue recovery.',
    districts: ['Vilakazi Street Hospitality Belt', 'Protea Glen Commercial Node', 'Maponya Mall Precinct', 'Dobsonville Retail Corridor', 'Orlando West', 'Diepkloof Square'],
    economicFocus: [
      'Township Retail & Fast-Moving Consumer Goods',
      'Cultural & Destination Hospitality Revenue Systems',
      'WhatsApp-Native Ordering & Customer Loyalty Automation',
      'Creator Commerce & Community Merchant Distribution',
      'Cash Flow & Supplier Reconciliation Intelligence'
    ],
    strategicContext: 'Traditional desktop enterprise software frequently fails in township commercial environments because business moves through WhatsApp, mobile payment rails, and direct relationship networks. NahaLabs engineers systems that operate seamlessly within these native channels, converting customer conversations directly into completed transactions and inventory insights.',
    coreSolutions: [
      'Sella Creator Commerce for local brands and community retail activations',
      'Flavourly Guest & Booking Intelligence for iconic Vilakazi hospitality venues',
      'WhatsApp-First Digital Workers handling supplier orders and customer queries',
      'Micro-Distribution and Route Optimization across Soweto logistics networks'
    ],
    localCaseStudy: {
      context: 'A high-traffic Vilakazi Street restaurant lost dozens of prime weekend reservations due to unmanaged WhatsApp inquiries and manual telephone booking logs.',
      intervention: 'Deployed a WhatsApp reservation and VIP notification system integrated with table seating allocation and guest deposit confirmations.',
      outcome: 'No-show rates dropped from 26% to under 4%, generating consistent weekend capacity and unlocking an additional R48,000 monthly turnover.'
    }
  },
  gauteng: {
    id: 'gauteng',
    slug: 'gauteng',
    city: 'Gauteng Province',
    province: 'Gauteng',
    regionFocus: 'Johannesburg, Pretoria, Centurion, Midrand, Ekurhuleni & Industrial Corridors',
    metaTitle: 'Intelligent Systems Engineering in Gauteng | NahaLabs',
    metaDescription: 'Industrial-grade systems engineering, geospatial intelligence, and enterprise automation across the Gauteng economic heartland.',
    heroHeadline: 'INTELLIGENT SYSTEMS ENGINEERING IN GAUTENG.',
    heroSubtext: 'Accounting for over a third of South Africa’s GDP, the Gauteng economic corridor demands robust engineering that bridges industrial rail, mining supply chains, government institutions in Pretoria, and high-tech hubs in Midrand and Centurion.',
    districts: ['Pretoria Administrative & Research Hub', 'Centurion High-Tech Corridor', 'Midrand Distribution Axis', 'Ekurhuleni Manufacturing & Cargo Basin', 'Sandton / JHB Financial District', 'Vaal Triangle Heavy Industry'],
    economicFocus: [
      'Rail, Highway & Intermodal Freight Telemetry',
      'Public Sector & Regulatory Process Automation',
      'Mining Equipment Logistics & Siding Optimization',
      'Provincial FMCG Distribution & Warehousing',
      'Cross-Corridor Geospatial Decision Intelligence'
    ],
    strategicContext: 'Gauteng connects the continent’s primary manufacturing hubs with maritime ports and SADC export corridors. Operating here requires systems capable of handling massive data throughput, strict compliance, and complex multi-stakeholder logistics.',
    coreSolutions: [
      'RailWatch Corridor & Siding Intelligence for industrial rail operators',
      'CargoIQ Automated Rate Reconciliation for cross-provincial hauliers',
      'TaxIntel Regulatory Verification for complex multi-entity corporate structures',
      'Spatial Intelligence for provincial warehousing and distribution center site selection'
    ],
    localCaseStudy: {
      context: 'An intermodal freight terminal operating between Ekurhuleni and Pretoria experienced excessive siding dwell times and delayed cargo clearance.',
      intervention: 'Implemented predictive wagon turnaround modeling and automated customs documentation dispatch.',
      outcome: 'Reduced average yard dwell time by 31%, releasing capital tied up in delayed freight containers.'
    }
  },
  lesotho: {
    id: 'lesotho',
    slug: 'lesotho',
    city: 'Maseru & Lesotho',
    province: 'Kingdom of Lesotho',
    regionFocus: 'Maseru, Mafeteng, Leribe, Mohale’s Hoek & Southern African Cross-Border Trade',
    metaTitle: 'Intelligent Systems Engineering in Lesotho | NahaLabs',
    metaDescription: 'Practical intelligent systems, cross-border customs intelligence, and digital operations engineered for businesses and institutions in Lesotho.',
    heroHeadline: 'INTELLIGENT SYSTEMS ENGINEERING IN LESOTHO.',
    heroSubtext: 'Building from our deep regional roots, NahaLabs engineers systems tailored to Lesotho’s unique economic architecture — cross-border SADC trade, institutional operations, mobile-first consumer markets, and light manufacturing.',
    districts: ['Maseru Central Business District', 'Peka & Maseru Border Crossings', 'Thetsane Industrial Area', 'Leribe Commercial Belt', 'Roma University & Research Node'],
    economicFocus: [
      'Cross-Border Customs & SACU Tariff Intelligence',
      'Textile & Light Industrial Manufacturing Workflow Automation',
      'Mobile-First Commerce & Ecocash / M-Pesa Integration',
      'Institutional Record Digitization & Verification',
      'Agri-Logistics & Mountain Corridor Route Optimization'
    ],
    strategicContext: 'Enterprises and institutions in Lesotho operate at the intersection of SACU regulatory frameworks and mobile-first consumer ecosystems. NahaLabs brings world-class intelligent systems engineering without the bloated overhead of international consulting firms, respecting local market realities and technical constraints.',
    coreSolutions: [
      'TaxIntel Cross-Border Customs Code and VAT reconciliation for SACU importers',
      'Digital Workers automating government liaison documents and trade paperwork',
      'Mobile-first ordering and customer operations systems designed for 3G/4G connectivity',
      'Spatial risk mapping for mountain infrastructure and agricultural logistics'
    ],
    localCaseStudy: {
      context: 'A cross-border supplier moving agricultural equipment between the Free State and Maseru was facing repetitive border delays from mismatched customs tariff paperwork.',
      intervention: 'Engineered an automated customs document compilation tool validating invoice line items against Lesotho revenue authority classifications.',
      outcome: 'Cleared 98% of border consignments on initial submission, eliminating 14 to 28 hours of vehicle idle time per round trip.'
    }
  }
};

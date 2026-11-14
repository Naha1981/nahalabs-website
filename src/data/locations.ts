import { LocationData } from '../types';

export const LOCATIONS_DATA: Record<string, LocationData> = {
  johannesburg: {
    id: 'johannesburg',
    slug: 'johannesburg',
    city: 'Johannesburg',
    province: 'Gauteng',
    regionFocus: 'Sandton, Rosebank, Bryanston, CBD & Greater Johannesburg',
    metaTitle: 'NahaLabs | Intelligent Systems Engineering in Johannesburg',
    metaDescription: 'Revenue recovery and intelligent systems engineered in Johannesburg - we find the money businesses lose between their systems, then build the fix.',
    heroHeadline: 'INTELLIGENT SYSTEMS ENGINEERING IN JOHANNESBURG.',
    heroSubtext: 'From the corporate towers of Sandton to the freight yards of City Deep, money leaks in the gaps between your systems - the invoice nobody checked, the enquiry nobody answered. We build the system that closes those gaps.',
    districts: ['Sandton Financial District', 'Rosebank Commercial Hub', 'Bryanston Tech Corridor', 'City Deep Logistics Depot', 'Melrose Arch', 'Braamfontein Innovation Zone'],
    economicFocus: [
      'Financial Services & Risk Intelligence',
      'Freight, Warehousing & City Deep Logistics',
      'Commercial Real Estate & Property Underwriting',
      'Restaurant Revenue Recovery',
      'Cross-Enterprise ERP & Legacy System Integration'
    ],
    strategicContext: 'Johannesburg runs on high transaction volume and old software that does not talk to itself. That gap is where revenue leaks. We are a small, independent Johannesburg engineering desk: we diagnose the specific friction in your operation first, and we only build when the evidence says a system will pay for itself.',
    coreSolutions: [
      'LeadMachine Commercial Intelligence for Sandton B2B pipelines',
      'Flavourly Revenue Operating System for Johannesburg restaurants',
      'Autonomous Freight Audit & Recovery for City Deep supply chains',
      'Digital workers for repetitive admin in financial institutions'
    ],
    localCaseStudy: {
      context: 'Illustrative scenario: a multi-depot distributor in Johannesburg disputes a carrier invoice - the waybills sit in one system, the dispatch logs in another, and nobody can prove which record is right.',
      intervention: 'The proposed build: a document-extraction and tariff-verification pipeline connecting ERP dispatch logs with carrier waybills.',
      outcome: 'Designed to flag disputed freight charges automatically, with a full audit trail and no manual reconciliation. A proposed outcome, not a client result.'
    }
  },
  soweto: {
    id: 'soweto',
    slug: 'soweto',
    city: 'Soweto',
    province: 'Gauteng',
    regionFocus: 'Protea Glen, Vilakazi Street, Dobsonville, Orlando & Township Commercial Ecosystems',
    metaTitle: 'Intelligent Systems Engineering in Soweto | NahaLabs',
    metaDescription: 'Revenue recovery and intelligent systems engineered in Soweto - we find the money businesses lose between their systems, then build the fix.',
    heroHeadline: 'INTELLIGENT SYSTEMS ENGINEERING IN SOWETO.',
    heroSubtext: 'From the restaurants of Vilakazi Street to the retail corridors of Protea Glen, money leaks in the gaps between your systems - the weekend booking nobody confirmed, the supplier order nobody reconciled. We build the system that closes those gaps.',
    districts: ['Vilakazi Street Hospitality Belt', 'Protea Glen Commercial Node', 'Maponya Mall Precinct', 'Dobsonville Retail Corridor', 'Orlando West', 'Diepkloof Square'],
    economicFocus: [
      'Township Retail & Fast-Moving Consumer Goods',
      'Cultural & Destination Hospitality Revenue Systems',
      'WhatsApp-Native Ordering & Customer Loyalty Automation',
      'Creator Commerce & Community Merchant Distribution',
      'Cash Flow & Supplier Reconciliation Intelligence'
    ],
    strategicContext: 'Business in Soweto runs on WhatsApp, mobile payments and direct relationships. Desktop enterprise software was not built for that. We build inside the channels you already use, so a customer conversation can become a confirmed booking or a completed sale without extra staff watching a screen.',
    coreSolutions: [
      'Sella Creator Commerce for local brands and community retail activations',
      'Flavourly Guest & Booking Intelligence for Vilakazi Street restaurants',
      'WhatsApp-First Digital Workers handling supplier orders and customer queries',
      'Micro-Distribution and Route Optimization across Soweto logistics networks'
    ],
    localCaseStudy: {
      context: 'Illustrative scenario: a busy Vilakazi Street restaurant takes weekend bookings over WhatsApp and a telephone logbook. Prime tables get double-booked and no-shows go unfilled because nobody sees both records at once.',
      intervention: 'The proposed build: a WhatsApp reservation and guest-notification system linked to table allocation and deposit confirmations.',
      outcome: 'Designed to cut no-shows and turn unmanaged weekend enquiries into confirmed, deposit-backed bookings. A proposed outcome, not a client result.'
    }
  },
  gauteng: {
    id: 'gauteng',
    slug: 'gauteng',
    city: 'Gauteng Province',
    province: 'Gauteng',
    regionFocus: 'Johannesburg, Pretoria, Centurion, Midrand, Ekurhuleni & Industrial Corridors',
    metaTitle: 'Intelligent Systems Engineering in Gauteng | NahaLabs',
    metaDescription: 'Revenue recovery and intelligent systems engineered across Gauteng - we find the money businesses lose between their systems, then build the fix.',
    heroHeadline: 'INTELLIGENT SYSTEMS ENGINEERING IN GAUTENG.',
    heroSubtext: 'From the freight sidings of Ekurhuleni to the research campuses of Pretoria, money leaks in the gaps between your systems - the container that sat a day too long, the compliance deadline nobody tracked. We build the system that closes those gaps.',
    districts: ['Pretoria Administrative & Research Hub', 'Centurion High-Tech Corridor', 'Midrand Distribution Axis', 'Ekurhuleni Manufacturing & Cargo Basin', 'Sandton / JHB Financial District', 'Vaal Triangle Heavy Industry'],
    economicFocus: [
      'Rail, Highway & Intermodal Freight Telemetry',
      'Public Sector & Regulatory Process Automation',
      'Mining Equipment Logistics & Siding Optimization',
      'Provincial FMCG Distribution & Warehousing',
      'Cross-Corridor Geospatial Decision Intelligence'
    ],
    strategicContext: 'Gauteng moves goods, money and paperwork at high volume across many organisations. When the records do not line up, the difference comes out of your margin. We diagnose where your information breaks down first, and we only build when the evidence says a system will pay for itself.',
    coreSolutions: [
      'RailWatch Corridor & Siding Intelligence for industrial rail operators',
      'CargoIQ Automated Rate Reconciliation for cross-provincial hauliers',
      'TaxIntel Regulatory Verification for complex multi-entity corporate structures',
      'Spatial Intelligence for provincial warehousing and distribution center site selection'
    ],
    localCaseStudy: {
      context: 'Illustrative scenario: an intermodal freight terminal between Ekurhuleni and Pretoria loses money to long siding dwell times and slow cargo clearance, with yard records and customs documents living in different systems.',
      intervention: 'The proposed build: predictive wagon-turnaround modelling with automated customs documentation dispatch.',
      outcome: 'Designed to shorten yard dwell time and release capital tied up in delayed containers. A proposed outcome, not a client result.'
    }
  },
  lesotho: {
    id: 'lesotho',
    slug: 'lesotho',
    city: 'Maseru & Lesotho',
    province: 'Kingdom of Lesotho',
    regionFocus: 'Maseru, Mafeteng, Leribe, Mohale’s Hoek & Southern African Cross-Border Trade',
    metaTitle: 'Intelligent Systems Engineering in Lesotho | NahaLabs',
    metaDescription: 'Revenue recovery and intelligent systems engineered in Lesotho - we find the money businesses lose between their systems, then build the fix.',
    heroHeadline: 'INTELLIGENT SYSTEMS ENGINEERING IN LESOTHO.',
    heroSubtext: 'From the border posts of Maseru to the factory floors of Thetsane, money leaks in the gaps between your systems - the consignment stuck over one wrong tariff code, the record nobody could verify. We build the system that closes those gaps.',
    districts: ['Maseru Central Business District', 'Peka & Maseru Border Crossings', 'Thetsane Industrial Area', 'Leribe Commercial Belt', 'Roma University & Research Node'],
    economicFocus: [
      'Cross-Border Customs & SACU Tariff Intelligence',
      'Textile & Light Industrial Manufacturing Workflow Automation',
      'Mobile-First Commerce & Ecocash / M-Pesa Integration',
      'Institutional Record Digitization & Verification',
      'Agri-Logistics & Mountain Corridor Route Optimization'
    ],
    strategicContext: 'Business in Lesotho runs at the intersection of SACU customs rules and mobile-first customers. We build for those realities: cross-border paperwork that checks itself before the border does, and systems that work on the connections people actually have.',
    coreSolutions: [
      'TaxIntel Cross-Border Customs Code and VAT reconciliation for SACU importers',
      'Digital Workers automating government liaison documents and trade paperwork',
      'Mobile-first ordering and customer operations systems designed for 3G/4G connectivity',
      'Spatial risk mapping for mountain infrastructure and agricultural logistics'
    ],
    localCaseStudy: {
      context: 'Illustrative scenario: a supplier moving agricultural equipment between the Free State and Maseru loses days at the border because invoice line items do not match customs tariff classifications.',
      intervention: 'The proposed build: an automated customs-document tool that validates invoices against Lesotho revenue authority classifications before submission.',
      outcome: 'Designed to clear consignments on first submission and cut vehicle idle time at the border. A proposed outcome, not a client result.'
    }
  }
};

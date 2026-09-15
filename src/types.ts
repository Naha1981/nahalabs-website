export type SystemStatus = 
  | 'SYSTEM' 
  | 'SOLUTION' 
  | 'WORK IN DEVELOPMENT' 
  | 'SYSTEM CONCEPT';

export interface SystemItem {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  status: SystemStatus;
  shortProposition: string;
  problemStatement: string;
  whatItDoes: string[];
  businessValue: string;
  architectureLayers: string[];
  image: string;
  tags: string[];
}

export interface FuelPillar {
  id: string;
  title: string;
  shortTag: string;
  frontHighlight: string;
  explanation: string;
  operationalOutcome: string;
}

export interface ActionScenarioStep {
  step: string;
  signal: string;
  engine: string;
  outcome: string;
}

export interface ActionScenario {
  id: string;
  industry: string;
  title: string;
  trigger: string;
  steps: ActionScenarioStep[];
  economicImpact: string;
  systemRef: string;
}

export interface FormulaLayer {
  id: string;
  layerNumber: string;
  title: string;
  subtitle: string;
  components: string[];
  outputState: string;
}

export interface LocationData {
  id: string;
  slug: string;
  city: string;
  province: string;
  regionFocus: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubtext: string;
  districts: string[];
  economicFocus: string[];
  strategicContext: string;
  coreSolutions: string[];
  localCaseStudy: {
    context: string;
    intervention: string;
    outcome: string;
  };
}

export type BusinessIntent = 
  | 'customers' // Get More Customers
  | 'recovery'  // Recover Lost Revenue
  | 'operations'; // Build an Intelligent Operating System

export interface CaseStudySlide {
  slideNumber: number;
  stageName: 'The Situation' | 'The Problem' | 'The NahaLabs Solution' | 'The Business Outcome' | 'The Bigger Idea';
  title?: string;
  content: string[];
  highlight?: string;
}

export interface CaseStudyItem {
  id: string;
  number: string; // e.g. '01'
  systemName: string; // e.g. 'FLAVOURLY'
  headline: string; // e.g. "The restaurant was busy. The problem was the empty chairs."
  intent: BusinessIntent;
  subCategoryTag: string; // e.g. 'Intelligent Revenue Systems'
  isConcept: boolean; // true if pilot/concept, false if production
  businessProblemLabel: string; // e.g. "I'm losing bookings / table revenue"
  slides: CaseStudySlide[];
}

export interface SolutionPathway {
  id: BusinessIntent;
  title: string;
  tagline: string;
  description: string;
  ctaText: string;
  examples: string[];
  approachSteps: Array<{
    step: string;
    label: string;
    description: string;
  }>;
  educationalPoints: Array<{
    heading: string;
    text: string;
  }>;
  caseStudyIds: string[];
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  businessDescription: string;
  problemDescription: string;
  successDescription: string;
  urgency: 'Immediate (< 30 days)' | 'Quarterly priority (1-3 months)' | 'Exploratory architecture';
  businessArea: 
    | 'Revenue Recovery'
    | 'Sales Intelligence'
    | 'Operational Systems'
    | 'Customer Experience'
    | 'Compliance & Regulatory'
    | 'Data & Analytics'
    | 'Automation & Digital Workers'
    | 'AI / Intelligent Systems'
    | 'Other Enterprise Problem';
}

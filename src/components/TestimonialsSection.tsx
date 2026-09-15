import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TestimonialCardSkeleton } from './SkeletonLoader';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  MapPin,
  Pause,
  Play
} from 'lucide-react';

interface Testimonial {
  id: string;
  clientName: string;
  clientTitle: string;
  enterpriseType: string;
  location: string;
  locationCode: string;
  systemDeployed: string;
  headline: string;
  quote: string;
  metrics: {
    label: string;
    value: string;
    context: string;
  }[];
  verificationCode: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'freight-citydeep',
    clientName: 'M. Van Der Merwe',
    clientTitle: 'Chief Operating Officer',
    enterpriseType: 'Commercial Freight & Cold-Chain Logistics',
    location: 'City Deep Corridor · Johannesburg',
    locationCode: 'JHB-CD',
    systemDeployed: 'NahaLabs FreightFlow™',
    headline: 'Eliminating the 4.5-Hour Cross-Dock Manifest Bottleneck',
    quote: 'Before NahaLabs, our City Deep depot was choked by manual waybills, mismatched cold-chain manifests, and endless billing reconciliation disputes with coastal dispatchers. NahaLabs didn’t deliver slides or a rigid foreign SaaS template. They spent four days observing our dock floor, connected directly into our legacy dispatch database, and deployed an automated manifest ingestion and route-clearing pipeline. Our exception resolution dropped from 4.5 hours to 8 minutes.',
    metrics: [
      { label: 'Dwell Time Reduction', value: '-82%', context: 'Cross-dock turnaround' },
      { label: 'Invoice Audit Accuracy', value: '100%', context: 'Zero discrepancy leakage' },
      { label: 'Daily Consignments', value: '180+', context: 'Automated without extra staff' }
    ],
    verificationCode: 'REC-LOG-2025-08'
  },
  {
    id: 'hospitality-sandton',
    clientName: 'N. Sithole',
    clientTitle: 'Group Chief Financial Officer',
    enterpriseType: 'Multi-Outlet Commercial Hospitality Group (7 Locations)',
    location: 'Rosebank & Sandton · Gauteng',
    locationCode: 'GT-RS',
    systemDeployed: 'NahaLabs PrepPulse™',
    headline: 'Recovering R1.42M in Annual Perishable Food & Beverage Variance',
    quote: 'With seven busy venues across Johannesburg, managing inventory shrinkage, prep prep-levels, and POS order spikes was an endless guessing game. General managers were spending two hours every midnight tallying spreadsheets. NahaLabs PrepPulse consolidated live POS streams with reservation booking curves to dynamically forecast tomorrow’s kitchen prep down to the kilogram. Within three months, gross margin slippage decreased by 3.8% across the group.',
    metrics: [
      { label: 'Annual Waste Recovery', value: 'R1.42M', context: 'Audited gross margin savings' },
      { label: 'Weekend Forecast Accuracy', value: '98.4%', context: 'Perishable stock prep' },
      { label: 'Nightly Admin Saved', value: '14 hrs/wk', context: 'Per restaurant general manager' }
    ],
    verificationCode: 'REC-FNB-2025-03'
  },
  {
    id: 'crossborder-lesotho',
    clientName: 'T. Mokoena',
    clientTitle: 'Managing Director & Supply Chain Head',
    enterpriseType: 'Cross-Border FMCG & Regional Wholesale Distributor',
    location: 'Maseru (Lesotho) & Ekurhuleni Corridor',
    locationCode: 'LS-EK',
    systemDeployed: 'NahaLabs BorderSync™',
    headline: 'Accelerating Border Manifest Filings & Multi-Currency Settlement',
    quote: 'Moving high-volume food and consumer packaged goods between South African production facilities and Lesotho retail networks meant grappling with customs documentation delays at Maseru Bridge and currency friction between LSL and ZAR. NahaLabs BorderSync unified our multi-currency invoices and automated SARS and Lesotho Revenue Authority customs filings. Truck clearance time was cut by more than two thirds.',
    metrics: [
      { label: 'Border Clearance Speed', value: '3.2x', context: 'Faster customs manifest pass' },
      { label: 'Compliance Penalties', value: '0', context: '14 consecutive months penalty-free' },
      { label: 'Capital Cycle', value: '-12 Days', context: 'Working capital recovery' }
    ],
    verificationCode: 'REC-XBR-2025-11'
  },
  {
    id: 'fiduciary-sandton',
    clientName: 'A. Du Plessis',
    clientTitle: 'Senior Compliance Partner & Fiduciary Auditor',
    enterpriseType: 'Corporate Fiduciary & Private Wealth Advisory Practice',
    location: 'Sandton Financial District · Johannesburg',
    locationCode: 'JHB-SDN',
    systemDeployed: 'NahaLabs Knowledge Synthesizer™',
    headline: 'Compressing 3-Week FICA & Trust Deed Audits into Minutes with Verifiable Citations',
    quote: 'In high-stakes fiduciary audits, an LLM hallucination is a compliance disaster. We needed ironclad document analysis that could ingest 20-year-old scanned deeds, FICA records, and complex cross-entity shareholdings without our data ever leaving our South African jurisdiction. NahaLabs built a localized knowledge synthesizer with exact clause-level citations and cryptographic audit hashes. What previously tied up our senior associates for weeks is now verified in minutes.',
    metrics: [
      { label: 'Audit Review Acceleration', value: '94%', context: 'Turnaround on complex deeds' },
      { label: 'Source Verification', value: '100%', context: 'Cryptographic citation hashes' },
      { label: 'Data Residency', value: 'POPIA', context: 'Air-gapped on-premise deployment' }
    ],
    verificationCode: 'REC-FID-2025-06'
  },
  {
    id: 'manufacturing-ekurhuleni',
    clientName: 'K. Naidoo',
    clientTitle: 'Plant Engineering Director',
    enterpriseType: 'Industrial Heavy Component Assembly & Precision Machining',
    location: 'Germiston Industrial Belt · Ekurhuleni',
    locationCode: 'GT-EKU',
    systemDeployed: 'NahaLabs MachineSense™',
    headline: 'Preventing Catastrophic Spindle Failures & Load-Shedding Transition Scraps',
    quote: 'Our CNC precision lines produce tolerances down to microns for regional rail and heavy industry. Sudden equipment tool wear and abrupt generator switches during power transfers were causing expensive scrap batches. NahaLabs installed non-invasive acoustic and electrical sensory telemetry that flags harmonic vibration anomalies before tooling breaks. A recent 40-minute predictive warning saved us R380,000 in replacement spindle damage alone.',
    metrics: [
      { label: 'Unscheduled Downtime', value: '-28%', context: 'Across 12 manufacturing bays' },
      { label: 'Early Failure Alert', value: '45 min', context: 'Average predictive window' },
      { label: 'Tooling Damage Saved', value: 'R380k+', context: 'Single event prevention' }
    ],
    verificationCode: 'REC-MFG-2025-09'
  }
];

interface TestimonialsSectionProps {
  onConsult?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onConsult }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Progressive mount simulation with skeleton shimmer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const activeTestimonial = TESTIMONIALS[currentIndex];

  // Auto-advance carousel if not paused and in carousel mode
  useEffect(() => {
    if (viewMode !== 'carousel' || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 8500);

    return () => clearInterval(timer);
  }, [viewMode, isPaused]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section 
      id="testimonials" 
      className="py-24 sm:py-36 bg-[#090a0b] border-b border-[#181818] relative overflow-hidden"
    >
      {/* Background Architectural Grid Accent */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#C8AE82 1px, transparent 1px), linear-gradient(90deg, #C8AE82 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 sm:mb-18">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151515] border border-[#262626] text-[11px] font-mono tracking-widest text-[#C8AE82] uppercase mb-4">
              <Building2 className="w-3.5 h-3.5 text-[#C8AE82]" />
              <span>10 / CLIENT SUCCESS & AUDITED RECORDS</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.1]">
              MEASURED OUTCOMES. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] to-[#C8AE82]">
                PROVEN MOMENTUM.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* View Mode Toggle */}
            <div className="inline-flex items-center p-1 rounded-sm bg-[#121314] border border-[#222222] text-xs font-mono">
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                  viewMode === 'carousel' 
                    ? 'bg-[#C8AE82] text-[#080909] font-bold' 
                    : 'text-[#A5A29B] hover:text-[#F3F0EA]'
                }`}
              >
                CAROUSEL
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                  viewMode === 'grid' 
                    ? 'bg-[#C8AE82] text-[#080909] font-bold' 
                    : 'text-[#A5A29B] hover:text-[#F3F0EA]'
                }`}
              >
                ALL RECORDS ({TESTIMONIALS.length})
              </button>
            </div>

            {viewMode === 'carousel' && (
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[#222222] bg-[#121314] text-[11px] font-mono text-[#A5A29B] hover:text-[#F3F0EA] transition-colors"
                title={isPaused ? 'Resume Auto-Advance' : 'Pause Auto-Advance'}
                aria-label={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3 h-3 text-[#C8AE82]" />
                    <span>PAUSED</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3 text-[#A5A29B]" />
                    <span>AUTO</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* View 1: Focused Interactive Carousel */}
        {isLoading ? (
          <TestimonialCardSkeleton />
        ) : viewMode === 'carousel' ? (
          <div className="relative">
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-sm bg-[#121315] border border-[#262626] p-8 sm:p-12 lg:p-14 relative shadow-2xl"
                >
                  {/* Decorative Quotation Mark in Background */}
                  <Quote className="absolute top-6 right-8 w-24 h-24 sm:w-32 sm:h-32 text-[#C8AE82]/5 pointer-events-none" />

                  {/* Top Meta Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#202225] pb-6 mb-8">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-[#1b1d20] border border-[#2e3136] text-[11px] font-mono text-[#C8AE82] font-semibold">
                        {activeTestimonial.systemDeployed}
                      </span>
                      <span className="text-xs font-mono text-[#888] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C8AE82]" />
                        {activeTestimonial.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#A5A29B]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C8AE82]" />
                      <span>{activeTestimonial.verificationCode} · VERIFIED RECORD</span>
                    </div>
                  </div>

                  {/* Headline & Quote */}
                  <div className="max-w-4xl">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F3F0EA] tracking-tight mb-6">
                      "{activeTestimonial.headline}"
                    </h3>

                    <blockquote className="text-base sm:text-lg lg:text-xl text-[#B6B3AA] leading-relaxed font-light italic mb-10">
                      "{activeTestimonial.quote}"
                    </blockquote>
                  </div>

                  {/* Metrics & Client Credentials */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-[#202225] items-end">
                    
                    {/* Client Identity */}
                    <div className="lg:col-span-5 space-y-1">
                      <div className="text-base font-bold text-[#F3F0EA]">
                        {activeTestimonial.clientName}
                      </div>
                      <div className="text-xs font-mono text-[#C8AE82]">
                        {activeTestimonial.clientTitle}
                      </div>
                      <div className="text-xs text-[#777]">
                        {activeTestimonial.enterpriseType}
                      </div>
                    </div>

                    {/* Audited Impact Metrics */}
                    <div className="lg:col-span-7 grid grid-cols-3 gap-4 sm:gap-6 border-t lg:border-t-0 lg:border-l border-[#202225] pt-6 lg:pt-0 lg:pl-8">
                      {activeTestimonial.metrics.map((m, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#C8AE82] tracking-tight">
                            {m.value}
                          </div>
                          <div className="text-[11px] font-medium text-[#F3F0EA] leading-tight">
                            {m.label}
                          </div>
                          <div className="text-[9px] font-mono text-[#777] uppercase tracking-wider">
                            {m.context}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Navigation Controls */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Indicator Pills */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex 
                        ? 'w-8 bg-[#C8AE82]' 
                        : 'w-2 bg-[#222222] hover:bg-[#444]'
                    }`}
                    aria-label={`Jump to case study ${idx + 1}: ${t.enterpriseType}`}
                  />
                ))}
                <span className="ml-2 text-xs font-mono text-[#777]">
                  0{currentIndex + 1} / 0{TESTIMONIALS.length}
                </span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-sm bg-[#121314] border border-[#262626] text-[#A5A29B] hover:text-[#F3F0EA] hover:border-[#C8AE82] transition-colors cursor-pointer"
                  aria-label="Previous client success story"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-sm bg-[#121314] border border-[#262626] text-[#A5A29B] hover:text-[#F3F0EA] hover:border-[#C8AE82] transition-colors cursor-pointer"
                  aria-label="Next client success story"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* View 2: All Records Multi-Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-sm bg-[#121315] border border-[#222222] hover:border-[#C8AE82]/50 p-6 sm:p-8 flex flex-col justify-between transition-all"
              >
                <div>
                  {/* Top Pill */}
                  <div className="flex items-center justify-between border-b border-[#1c1d20] pb-3 mb-4">
                    <span className="text-[10px] font-mono text-[#C8AE82] uppercase tracking-wider font-semibold">
                      {item.systemDeployed}
                    </span>
                    <span className="text-[9px] font-mono text-[#777]">
                      {item.locationCode}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#F3F0EA] mb-3">
                    "{item.headline}"
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A5A29B] leading-relaxed italic mb-6">
                    "{item.quote}"
                  </p>
                </div>

                <div>
                  {/* Impact Badges */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#1c1d20] mb-4 bg-[#0d0e0f] px-2 rounded-sm">
                    {item.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="text-center">
                        <div className="text-xs sm:text-sm font-bold font-mono text-[#C8AE82]">
                          {m.value}
                        </div>
                        <div className="text-[9px] font-mono text-[#777] truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sign-off */}
                  <div className="text-xs">
                    <div className="font-semibold text-[#F3F0EA]">{item.clientName}</div>
                    <div className="text-[11px] font-mono text-[#C8AE82]">{item.clientTitle}</div>
                    <div className="text-[10px] text-[#777] truncate">{item.enterpriseType}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Strip below Testimonials */}
        <div className="mt-16 p-8 sm:p-10 rounded-sm bg-[#141517] border border-[#2a2a2a] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-[#C8AE82] tracking-[0.2em] uppercase">
              CONFIDENTIAL OPERATIONAL AUDIT
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F3F0EA]">
              Identify and Engineer Out Your Enterprise Bottlenecks
            </h3>
            <p className="text-xs sm:text-sm text-[#A5A29B] max-w-xl">
              Every deployment begins with an operational diagnosis to quantify where manual friction, slow handoffs, or uncoordinated data costs your balance sheet.
            </p>
          </div>

          {onConsult && (
            <button
              onClick={onConsult}
              className="px-6 py-3.5 rounded-full bg-[#C8AE82] text-[#080909] font-bold text-xs font-mono uppercase tracking-wider hover:bg-[#E5D1B0] transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Initiate Operational Brief</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};

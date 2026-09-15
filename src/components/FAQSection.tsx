import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Terminal, 
  ShieldAlert, 
  Cpu, 
  Clock, 
  Coins, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'method' | 'tech' | 'security' | 'commercial';
  question: string;
  answer: string;
  highlights?: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'diff-saas',
    category: 'method',
    question: 'How does NahaLabs differ from generic SaaS or commercial AI wrappers?',
    answer: 'Generic SaaS forces your unique business into rigid, pre-built functional boxes. AI wrappers, on the other hand, merely repackage public chatbots with generic system prompts that hallucinate and lack access to your live data. NahaLabs engineers bespoke production machinery directly around your enterprise’s actual operational workflows, proprietary data schemas, and margin drivers. We deliver full-stack, end-to-end software, custom event triggers, and automated pipelines tailored exclusively to your business.',
    highlights: ['Bespoke engineering vs rigid templates', 'Direct integration into live operational pipelines', 'Zero superficial wrapper layers']
  },
  {
    id: 'timeline-deployment',
    category: 'method',
    question: 'What is the typical timeframe from diagnosis to live production deployment?',
    answer: 'Following our 6-Stage Delivery Method, the initial architectural diagnosis and data audit takes 5 to 7 business days. A working interactive prototype or pilot system is delivered within 2 to 3 weeks for live stakeholder evaluation. Full enterprise production hardening, integration with your live databases, security auditing, and operational team handover typically completes within 4 to 8 weeks, depending on system complexity.',
    highlights: ['5–7 day initial diagnosis', 'Working prototype within 2–3 weeks', 'Full production hardening in 4–8 weeks']
  },
  {
    id: 'legacy-integrations',
    category: 'tech',
    question: 'Can NahaLabs integrate with our legacy ERP, bespoke SQL databases, or on-premise systems?',
    answer: 'Yes. We specialize in building robust bridge connectors, ETL pipelines, and API middleware for legacy environments—including SAP, Microsoft Dynamics, Syspro, Pastel Partner, bespoke SQL Server/PostgreSQL databases, and legacy on-premise servers. We do not require you to rip and replace existing infrastructure. Our intelligent systems layer directly on top of your existing operational stack to unlock automated intelligence without disrupting daily business.',
    highlights: ['Compatible with SAP, Syspro, Pastel, and SQL', 'No rip-and-replace disruption', 'Secure ETL pipelines and custom API middleware']
  },
  {
    id: 'security-popia',
    category: 'security',
    question: 'How do you protect proprietary operational data and ensure POPIA compliance?',
    answer: 'Data sovereignty and operational privacy are non-negotiable core architectural principles. All data pipelines can be deployed in local South African cloud availability zones (such as AWS Cape Town or Microsoft Azure South Africa North) or air-gapped on your private corporate network. We enforce end-to-end TLS 1.3 encryption, strict role-based access controls (RBAC), zero data retention on foundational LLM training, and full statutory compliance with South Africa’s Protection of Personal Information Act (POPIA).',
    highlights: ['South African cloud residency (AWS/Azure) or on-premise', 'Zero client data used for model training', 'Full statutory POPIA compliance']
  },
  {
    id: 'commercial-model',
    category: 'commercial',
    question: 'What is NahaLabs’ commercial engagement model?',
    answer: 'We provide clear, transparent, and value-aligned commercial arrangements tailored to your corporate governance:\n• Milestone-Based Engineering: Fixed-scope delivery for bespoke systems from diagnosis through production deployment.\n• Systems Engineering Retainers: Ongoing operational monitoring, model fine-tuning, latency optimization, and capability expansion.\n• Co-Engineered Outcome Models: For select enterprises where system efficiency generates quantifiable, audited bottom-line savings or margin recovery.',
    highlights: ['Fixed-scope milestone delivery', 'Ongoing engineering retainers with guaranteed SLAs', 'Outcome-aligned margin recovery options']
  },
  {
    id: 'ip-ownership',
    category: 'commercial',
    question: 'Who owns the intellectual property and source code of the deployed systems?',
    answer: 'Your enterprise retains 100% full ownership of your bespoke application code, workflow models, proprietary business rules, and operational data. NahaLabs does not lock you into proprietary black-box dependencies or recurring per-seat license traps. Upon deployment and final sign-off, we provide comprehensive documentation, runbooks, and full architectural handover to your internal technical team.',
    highlights: ['100% client code and IP ownership', 'No per-seat SaaS lock-in', 'Full architectural documentation and handover']
  },
  {
    id: 'support-sla',
    category: 'tech',
    question: 'What ongoing monitoring, SLA guarantees, and support are provided post-launch?',
    answer: 'Every production deployment is supported by active telemetry monitoring, automated exception alert routing, 99.9% uptime SLA commitments for enterprise tiers, and rapid-response engineering desks in Johannesburg. Model outputs and automated pipelines are monitored continuously for drift, latency spikes, and schema edge cases, ensuring consistent performance under fluctuating enterprise loads.',
    highlights: ['99.9% enterprise uptime SLA', 'Automated anomaly and drift monitoring', 'Johannesburg-based systems engineering desk']
  },
  {
    id: 'getting-started',
    category: 'method',
    question: 'How do we begin an engagement with NahaLabs?',
    answer: 'You can begin by submitting an Operational Brief through our intake console below, or by emailing our systems engineering desk directly at ai-solutions@nahalabs.co.za. We schedule a confidential 45-minute architectural diagnosis to review your current bottlenecks, evaluate technical feasibility, and map the projected return on investment before any commitment is made.',
    highlights: ['Confidential 45-minute architectural diagnosis', 'Technical feasibility and ROI mapping', 'No upfront commitment required']
  }
];

interface FAQSectionProps {
  onContactClick?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onContactClick }) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'diff-saas': true, // First question open by default for immediate engagement
  });
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleAccordion = (id: string) => {
    setOpenIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<string, boolean> = {};
    FAQ_DATA.forEach(item => {
      allOpen[item.id] = true;
    });
    setOpenIds(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenIds({});
  };

  // Filter items based on category and search query
  const filteredFAQs = FAQ_DATA.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      item.question.toLowerCase().includes(query) || 
      item.answer.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <section 
      id="faq" 
      className="py-24 sm:py-36 bg-[#080909] border-b border-[#181818] relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151515] border border-[#262626] text-[11px] font-mono tracking-widest text-[#C8AE82] uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#C8AE82]" />
            <span>12 / FREQUENTLY ASKED QUESTIONS</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.1]">
            SERVICES, ARCHITECTURE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] to-[#C8AE82]">
              & ENGAGEMENT SPECIFICATIONS.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A5A29B]">
            Clear, transparent answers regarding our delivery lifecycle, technology stack integrations, data sovereignty, and commercial models.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#1c1d20]">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {[
              { id: 'all', label: 'ALL INQUIRIES' },
              { id: 'method', label: 'SERVICES & METHOD' },
              { id: 'tech', label: 'INTEGRATION & TECH' },
              { id: 'security', label: 'SECURITY & POPIA' },
              { id: 'commercial', label: 'COMMERCIAL & IP' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-sm border transition-colors cursor-pointer ${
                  activeCategory === tab.id
                    ? 'border-[#C8AE82] bg-[#C8AE82]/15 text-[#F3F0EA] font-semibold'
                    : 'border-[#222222] bg-[#121314] text-[#A5A29B] hover:text-[#F3F0EA] hover:border-[#333]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Expand / Collapse & Search */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-[#777] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full bg-[#121314] border border-[#262626] rounded-sm py-1.5 pl-8 pr-3 text-xs text-[#F3F0EA] placeholder-[#666] focus:outline-none focus:border-[#C8AE82]"
              />
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#888]">
              <button 
                onClick={handleExpandAll}
                className="px-2 py-1 rounded bg-[#151515] border border-[#262626] hover:text-[#F3F0EA] hover:border-[#444] transition-colors cursor-pointer"
              >
                Expand
              </button>
              <button 
                onClick={handleCollapseAll}
                className="px-2 py-1 rounded bg-[#151515] border border-[#262626] hover:text-[#F3F0EA] hover:border-[#444] transition-colors cursor-pointer"
              >
                Collapse
              </button>
            </div>
          </div>

        </div>

        {/* Accordion List with Framer Motion Expand/Collapse */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 p-8 rounded-sm bg-[#121314] border border-[#222222]">
              <p className="text-sm font-mono text-[#A5A29B] mb-2">No matching questions found.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="text-xs font-mono text-[#C8AE82] hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFAQs.map((item, idx) => {
              const isOpen = !!openIds[item.id];
              return (
                <div 
                  key={item.id}
                  className={`rounded-sm border transition-colors duration-200 overflow-hidden ${
                    isOpen 
                      ? 'bg-[#121315] border-[#C8AE82]/50 shadow-lg' 
                      : 'bg-[#0f1011] border-[#222222] hover:border-[#333]'
                  }`}
                >
                  {/* Accordion Header Button */}
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C8AE82]"
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                      <span className="text-xs font-mono text-[#C8AE82] font-semibold mt-0.5 sm:mt-0">
                        0{idx + 1}
                      </span>
                      <h3 className={`text-base sm:text-lg font-bold transition-colors ${isOpen ? 'text-[#F3F0EA]' : 'text-[#D5D2CA] hover:text-white'}`}>
                        {item.question}
                      </h3>
                    </div>

                    <div className={`p-1.5 rounded-full border transition-all duration-300 flex-shrink-0 ${
                      isOpen 
                        ? 'border-[#C8AE82] bg-[#C8AE82]/15 text-[#C8AE82]' 
                        : 'border-[#2c2d30] text-[#777]'
                    }`}>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Accordion Body with Smooth Framer Motion AnimatePresence */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: 'auto', 
                          opacity: 1,
                          transition: {
                            height: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.25, delay: 0.05 }
                          }
                        }}
                        exit={{ 
                          height: 0, 
                          opacity: 0,
                          transition: {
                            height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.15 }
                          }
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-[#1d1f22]">
                          <div className="text-sm sm:text-base text-[#B6B3AA] leading-relaxed whitespace-pre-line pl-0 sm:pl-8">
                            {item.answer}
                          </div>

                          {/* Highlights Checklist */}
                          {item.highlights && item.highlights.length > 0 && (
                            <div className="mt-5 pt-4 border-t border-[#1a1c1e] pl-0 sm:pl-8 flex flex-wrap gap-2">
                              {item.highlights.map((h, hIdx) => (
                                <span 
                                  key={hIdx} 
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#16181b] border border-[#272a2f] text-[11px] font-mono text-[#C8AE82]"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8AE82]" />
                                  <span>{h}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Help Desk Bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-sm bg-[#121314] border border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-[#C8AE82] uppercase tracking-widest flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>CUSTOM ARCHITECTURAL INQUIRY</span>
            </div>
            <h4 className="text-base font-bold text-[#F3F0EA]">
              Have a bespoke system or legacy environment question not listed here?
            </h4>
            <p className="text-xs text-[#888]">
              Our Johannesburg systems engineering desk reviews technical briefs within 24 business hours.
            </p>
          </div>

          {onContactClick && (
            <button
              onClick={onContactClick}
              className="px-5 py-2.5 rounded-full bg-[#1b1c1e] hover:bg-[#C8AE82] text-[#F3F0EA] hover:text-[#080909] border border-[#333] hover:border-[#C8AE82] text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Ask Our Engineers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};

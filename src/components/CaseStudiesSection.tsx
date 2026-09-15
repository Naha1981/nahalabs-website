import React, { useState, useMemo } from 'react';
import { Search, Filter, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '../data/caseStudies';
import { CaseStudyCarousel } from './CaseStudyCarousel';
import { BusinessIntent } from '../types';

interface CaseStudiesSectionProps {
  onDiagnoseProblem: (systemName: string, problemLabel: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onDiagnoseProblem,
}) => {
  const [selectedIntentFilter, setSelectedIntentFilter] = useState<'all' | BusinessIntent>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCaseStudies = useMemo(() => {
    return CASE_STUDIES.filter((cs) => {
      const matchesFilter = selectedIntentFilter === 'all' || cs.intent === selectedIntentFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        cs.systemName.toLowerCase().includes(query) ||
        cs.headline.toLowerCase().includes(query) ||
        cs.subCategoryTag.toLowerCase().includes(query) ||
        cs.businessProblemLabel.toLowerCase().includes(query) ||
        cs.slides.some((s) => s.content.some((c) => c.toLowerCase().includes(query)));

      return matchesFilter && matchesSearch;
    });
  }, [selectedIntentFilter, searchQuery]);

  return (
    <section id="case-studies" className="py-24 lg:py-32 bg-[#090a0c] relative border-b border-[#1b1c20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C8AE82]/30 bg-[#14161a] text-xs font-mono tracking-widest text-[#C8AE82] uppercase">
            <Layers className="w-3.5 h-3.5 text-[#C8AE82]" />
            <span>OUTCOME-LED CASE STUDIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F3F0EA] tracking-tight">
            We've built systems around real business problems.
          </h2>

          <p className="text-base sm:text-lg text-[#A5A29B] leading-relaxed">
            Our software is not a catalog of generic SaaS tools. Each system was engineered as concrete evidence to resolve a costly operational breakdown.
          </p>
        </div>

        {/* Highlighted Evidence Statements (User's specific summary cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div className="p-5 rounded-xl border border-[#202227] bg-[#111216] flex flex-col justify-between">
            <p className="text-sm text-[#D3CFCA] font-serif italic mb-3">
              "A restaurant was losing money on slow days."
            </p>
            <div className="pt-2 border-t border-[#1c1e23] flex items-center justify-between text-xs font-mono">
              <span className="text-[#A5A29B]">We engineered:</span>
              <span className="font-bold text-[#C8AE82]">FLAVOURLY</span>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-[#202227] bg-[#111216] flex flex-col justify-between">
            <p className="text-sm text-[#D3CFCA] font-serif italic mb-3">
              "A freight operator couldn't see where revenue was leaking."
            </p>
            <div className="pt-2 border-t border-[#1c1e23] flex items-center justify-between text-xs font-mono">
              <span className="text-[#A5A29B]">We engineered:</span>
              <span className="font-bold text-[#81B29A]">CARGOiQ</span>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-[#202227] bg-[#111216] flex flex-col justify-between">
            <p className="text-sm text-[#D3CFCA] font-serif italic mb-3">
              "A business was losing high-intent leads because response was too slow."
            </p>
            <div className="pt-2 border-t border-[#1c1e23] flex items-center justify-between text-xs font-mono">
              <span className="text-[#A5A29B]">We engineered:</span>
              <span className="font-bold text-[#C8AE82]">LEAD MACHINE</span>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-[#202227] bg-[#111216] flex flex-col justify-between">
            <p className="text-sm text-[#D3CFCA] font-serif italic mb-3">
              "An enterprise had data everywhere but intelligence nowhere."
            </p>
            <div className="pt-2 border-t border-[#1c1e23] flex items-center justify-between text-xs font-mono">
              <span className="text-[#A5A29B]">We engineered:</span>
              <span className="font-bold text-[#E5D1B0]">REVENUE OS</span>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl border border-[#22242a] bg-[#111216] mb-10">
          {/* Intent Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedIntentFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors cursor-pointer ${
                selectedIntentFilter === 'all'
                  ? 'bg-[#C8AE82] text-[#080909] font-bold'
                  : 'bg-[#181a20] text-[#A5A29B] hover:text-[#F3F0EA]'
              }`}
            >
              ALL SYSTEMS ({CASE_STUDIES.length})
            </button>
            <button
              onClick={() => setSelectedIntentFilter('customers')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors cursor-pointer ${
                selectedIntentFilter === 'customers'
                  ? 'bg-[#C8AE82] text-[#080909] font-bold'
                  : 'bg-[#181a20] text-[#A5A29B] hover:text-[#F3F0EA]'
              }`}
            >
              GET MORE CUSTOMERS
            </button>
            <button
              onClick={() => setSelectedIntentFilter('recovery')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors cursor-pointer ${
                selectedIntentFilter === 'recovery'
                  ? 'bg-[#81B29A] text-[#080909] font-bold'
                  : 'bg-[#181a20] text-[#A5A29B] hover:text-[#F3F0EA]'
              }`}
            >
              RECOVER LOST REVENUE
            </button>
            <button
              onClick={() => setSelectedIntentFilter('operations')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors cursor-pointer ${
                selectedIntentFilter === 'operations'
                  ? 'bg-[#E5D1B0] text-[#080909] font-bold'
                  : 'bg-[#181a20] text-[#A5A29B] hover:text-[#F3F0EA]'
              }`}
            >
              INTELLIGENT OPERATING SYSTEMS
            </button>
          </div>

          {/* Quick Filter Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-[#666] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problem or system..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#26282e] bg-[#0c0d0f] text-xs text-[#F3F0EA] placeholder-[#666] focus:outline-none focus:border-[#C8AE82]"
            />
          </div>
        </div>

        {/* Case Studies Carousel Grid */}
        {filteredCaseStudies.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#26282e] rounded-2xl p-8">
            <p className="text-sm text-[#A5A29B]">
              No case studies match "{searchQuery}". Try selecting a different category or clearing the search.
            </p>
            <button
              onClick={() => { setSelectedIntentFilter('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded bg-[#181a20] text-xs font-mono text-[#C8AE82] hover:bg-[#22242a]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredCaseStudies.map((cs) => (
              <CaseStudyCarousel
                key={cs.id}
                caseStudy={cs}
                onDiagnoseProblem={onDiagnoseProblem}
              />
            ))}
          </div>
        )}

        {/* Central Closing Philosophy Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-2xl border border-[#2b2d35] bg-gradient-to-r from-[#121418] via-[#16181f] to-[#121418] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono text-[#C8AE82] uppercase tracking-widest block">
              THE NAHALABS PRINCIPLE
            </span>
            <p className="text-xl sm:text-2xl font-bold text-[#F3F0EA] tracking-tight">
              "Don't start with AI. Start with the business problem."
            </p>
            <p className="text-sm text-[#A5A29B] max-w-xl">
              Tell us where your business is losing money, time, or opportunity. We'll engineer the system to fix it.
            </p>
          </div>

          <button
            onClick={() => onDiagnoseProblem('Custom Enterprise System', 'General Business Bottleneck')}
            className="px-8 py-4 rounded-full bg-[#C8AE82] text-[#080909] font-bold text-xs uppercase tracking-wider hover:bg-[#E5D1B0] transition-colors cursor-pointer flex-shrink-0 shadow-xl shadow-[#C8AE82]/10"
          >
            Diagnose My Opportunity
          </button>
        </div>

      </div>
    </section>
  );
};

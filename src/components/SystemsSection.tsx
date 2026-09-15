import React, { useState, useEffect } from 'react';
import { SYSTEMS_DATA } from '../data/systems';
import { SystemItem } from '../types';
import { SystemDetailModal } from './SystemDetailModal';
import { SystemCardSkeleton } from './SkeletonLoader';
import { ArrowUpRight, Check, Eye, Copy, Mail, Send, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';

interface SystemsSectionProps {
  onConsultSystem: (systemName: string) => void;
}

export const SystemsSection: React.FC<SystemsSectionProps> = ({ onConsultSystem }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedSystem, setSelectedSystem] = useState<SystemItem | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  // Initial load simulation with skeleton shimmer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) return;
    setIsLoading(true);
    setActiveCategory(cat);
    setTimeout(() => {
      setIsLoading(false);
    }, 220);
  };

  const CONTACT_EMAIL = 'ai-solutions@nahalabs.co.za';

  const handleCopyContact = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopiedEmail(true);
      toast.success('Contact Details Copied', {
        description: `${CONTACT_EMAIL} copied to your clipboard.`,
        duration: 4000,
      });
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      toast.error('Copy Failed', {
        description: 'Unable to access clipboard. Please copy manually: ' + CONTACT_EMAIL,
      });
    }
  };

  const categories = ['ALL', 'Commerce & Hospitality', 'Logistics & Supply Chain', 'Sales & Growth', 'Autonomous Operations', 'Financial Services & Risk'];

  const filteredSystems = activeCategory === 'ALL'
    ? SYSTEMS_DATA
    : SYSTEMS_DATA.filter(s => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="systems" className="py-24 sm:py-36 bg-[#0c0d0e] border-y border-[#181818] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151515] border border-[#262626] text-[11px] font-mono tracking-widest text-[#C8AE82] uppercase mb-4">
              <span>{t.systems.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.1]">
              {t.systems.titleLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] to-[#C8AE82]">
                {t.systems.titleLine2}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#A5A29B] leading-relaxed">
            {t.systems.lead}
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#C8AE82] text-[#080909] font-bold shadow-md shadow-[#C8AE82]/20'
                  : 'bg-[#151516] text-[#A5A29B] border border-[#262626] hover:text-[#F3F0EA] hover:border-[#3a3a3a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* The 9 System Cards Grid with Skeleton Loader */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 min-h-[500px]">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <SystemCardSkeleton key={`skeleton-${idx}`} />
            ))
          ) : (
            filteredSystems.map((system) => (
            <div
              key={system.id}
              onClick={() => setSelectedSystem(system)}
              className="group relative bg-[#121314] rounded-sm border border-[#262626] hover:border-[#C8AE82] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-lg hover:-translate-y-1.5"
            >
              {/* Top Image Preview with Subtle Parallax on Hover */}
              <div className="relative h-52 w-full overflow-hidden bg-[#18191a]">
                <img
                  src={system.image}
                  alt={system.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121314] via-transparent to-black/30" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-[#080909]/90 border border-[#333] text-[9px] font-mono tracking-widest text-[#C8AE82] uppercase">
                    {system.status}
                  </span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-[10px] font-mono text-[#A5A29B]">
                    {system.category}
                  </span>
                </div>

                {/* Hover Eye indicator */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#080909]/80 backdrop-blur-md px-2.5 py-1 rounded border border-[#C8AE82]/40 flex items-center gap-1.5 text-[10px] font-mono text-[#C8AE82]">
                  <Eye className="w-3 h-3" />
                  <span>INSPECT ARCHITECTURE</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] font-mono text-[#C8AE82] tracking-widest uppercase mb-1">
                    {system.subtitle}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-[#F3F0EA] group-hover:text-white transition-colors">
                    {system.name}
                  </h3>
                  <p className="mt-2.5 text-xs text-[#A5A29B] leading-relaxed line-clamp-3">
                    {system.shortProposition}
                  </p>
                </div>

                {/* Measurable Impact Callout */}
                <div className="pt-3 border-t border-[#1f1f1f]">
                  <div className="text-[10px] font-mono text-[#A5A29B] uppercase tracking-wider mb-1">
                    BUSINESS VALUE
                  </div>
                  <p className="text-xs font-medium text-[#C8AE82] line-clamp-2">
                    {system.businessValue}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer with CTA */}
              <div className="px-6 py-3.5 bg-[#161718] border-t border-[#222] flex items-center justify-between text-xs font-mono text-[#A5A29B] group-hover:text-[#F3F0EA] transition-colors">
                <span className="text-[11px] tracking-wider uppercase">EXPLORE SYSTEM</span>
                <ArrowUpRight className="w-4 h-4 text-[#C8AE82] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          )))}
        </div>

        {/* Manual Contact Utility Strip with Copy Contact Details button */}
        <div className="mt-12 sm:mt-16 p-4 sm:p-5 rounded-sm bg-[#131416] border border-[#26282c] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1c1e22] border border-[#33373d] flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-[#C8AE82]" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#A5A29B]">
                {t.systems.manualInquiry}
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-xs sm:text-sm font-mono font-medium text-[#F3F0EA] hover:text-[#C8AE82] transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Small Copy Contact Details Button */}
            <button
              onClick={handleCopyContact}
              id="copy-contact-details-btn"
              type="button"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-sm bg-[#1b1c20] hover:bg-[#25272c] border border-[#383b42] hover:border-[#C8AE82] text-[#F3F0EA] text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer group"
              title="Copy contact email to clipboard"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-bold">{t.systems.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#C8AE82] group-hover:scale-110 transition-transform" />
                  <span className="text-[#C8AE82] font-semibold">{t.systems.copyContactBtn}</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-sm bg-[#C8AE82]/10 hover:bg-[#C8AE82]/20 border border-[#C8AE82]/40 text-[#C8AE82] text-xs font-mono tracking-wider transition-colors cursor-pointer"
              title="Send direct email"
            >
              <Send className="w-3 h-3" />
              <span className="hidden md:inline">Open Mail</span>
            </a>
          </div>
        </div>

        {/* Modal for Expanded Inspection */}
        <SystemDetailModal
          system={selectedSystem}
          onClose={() => setSelectedSystem(null)}
          onConsult={onConsultSystem}
        />

      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  Layers, 
  Compass, 
  MapPin, 
  ArrowRight, 
  CornerDownLeft, 
  X, 
  Terminal, 
  Cpu, 
  FileText, 
  HelpCircle, 
  Users, 
  Send, 
  Briefcase,
  Zap
} from 'lucide-react';
import { SYSTEMS_DATA } from '../data/systems';
import { LOCATIONS_DATA } from '../data/locations';
import { useLanguage } from '../context/LanguageContext';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onSelectSystem?: (systemId: string) => void;
  onSelectLocation: (slug: string) => void;
}

interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'section' | 'system' | 'region';
  icon: React.ReactNode;
  action: () => void;
  tags?: string[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onSelectSystem,
  onSelectLocation,
}) => {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'section' | 'system' | 'region'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Define searchable catalog
  const allItems: PaletteItem[] = useMemo(() => {
    const isSotho = lang === 'st';

    const sections: PaletteItem[] = [
      {
        id: 'sec-hero',
        title: isSotho ? 'Tsamaiso ea Overview / Hero' : 'Overview & Architecture',
        subtitle: isSotho ? 'Litsamaiso tsa bohlale bakeng sa likhoebo' : 'Intelligent systems for serious businesses',
        category: 'section',
        icon: <Zap className="w-4 h-4 text-[#C8AE82]" />,
        action: () => {
          onNavigateSection('hero');
          onClose();
        },
        tags: ['hero', 'overview', 'home', 'intro', 'start'],
      },
      {
        id: 'sec-manifesto',
        title: isSotho ? '01 / Maikemisetso a Rona (Manifesto)' : '01 / System Philosophy (Manifesto)',
        subtitle: isSotho ? 'Software e tlameha ho tlaisa matla, eseng tšitiso' : 'Software should create momentum, not resistance',
        category: 'section',
        icon: <Terminal className="w-4 h-4 text-[#C8AE82]" />,
        action: () => {
          onNavigateSection('manifesto');
          onClose();
        },
        tags: ['philosophy', 'manifesto', 'realities', 'resistance', 'momentum'],
      },
      {
        id: 'sec-fuel',
        title: isSotho ? '02 / Mafura a Khoebo (Business Fuel)' : '02 / Business Fuel & Economics',
        subtitle: isSotho ? 'Ho matlafatsa lebelo la tsamaiso ea khoebo' : 'How bespoke systems generate compound momentum',
        category: 'section',
        icon: <Cpu className="w-4 h-4 text-[#C8AE82]" />,
        action: () => {
          onNavigateSection('fuel');
          onClose();
        },
        tags: ['fuel', 'business fuel', 'energy', 'leverage', 'economics'],
      },
      {
        id: 'sec-systems',
        title: isSotho ? '03 / Lenane la Litsamaiso (Portfolio)' : '03 / System Portfolio',
        subtitle: isSotho ? 'Khetha molemo oa khoebo ea hau' : 'Deployed industrial autonomous software engines',
        category: 'section',
        icon: <Layers className="w-4 h-4 text-[#C8AE82]" />,
        action: () => {
          onNavigateSection('systems');
          onClose();
        },
        tags: ['systems', 'portfolio', 'flavourly', 'cargoiq', 'leadmachine', 'catalog'],
      },
      {
        id: 'sec-action',
        title: isSotho ? '04 / Bohlale bo Sebetsang (In Action)' : '04 / Intelligence In Action',
        subtitle: isSotho ? 'Tsamaiso ea nako ea sebele ea mosebetsi' : 'Interactive operational intelligence simulator',
        category: 'section',
        icon: <Zap className="w-4 h-4 text-[#C8AE82]" />,
        action: () => {
          onNavigateSection('action');
          onClose();
        },
        tags: ['action', 'simulator', 'flow', 'interactive', 'signals'],
      },
      {
        id: 'sec-formula',
        title: isSotho ? '05 / Mokhoa oa Bohlale (Formula)' : '05 / Intelligence Formula',
        subtitle: isSotho ? 'Motheo oa lipalo oa ntlafatso ea khoebo' : 'Mathematical operational leverage equation',
        category: 'section',
        icon: <FileText className="w-4 h-4 text-[#C8AE82]" />,
        action: () => {
          onNavigateSection('formula');
          onClose();
        },
        tags: ['formula', 'math', 'leverage', 'equation'],
      },
      {
        id: 'sec-enterprise',
        title: isSotho ? '07 / Litsamaiso tsa Likhoebo tse Khōlō' : '07 / Enterprise Systems',
        subtitle: isSotho ? 'Tsamaiso ea indasteri e phahameng ea Gauteng' : 'High-throughput Gauteng enterprise deployments',
        category: 'section',
        icon: <Briefcase className="w-4 h-4 text-[#C8AE82]" />,
        action: () => {
          onNavigateSection('enterprise');
          onClose();
        },
        tags: ['enterprise', 'gauteng', 'scale', 'infrastructure', 'security'],
      },
      {
        id: 'sec-method',
        title: isSotho ? '09 / Tsamaiso ea Litša (Methodology)' : '09 / Delivery Rigour & Method',
        subtitle: isSotho ? 'Methati e tšeletseng ea ho rala litsamaiso' : 'Six-stage engineering journey: Diagnosis → Prototype → Production',
        category: 'section',
        icon: <Compass className="w-4 h-4 text-[#C8AE82]" />,
        action: () => {
          onNavigateSection('method');
          onClose();
        },
        tags: ['method', 'stages', 'process', 'rigour', 'delivery', 'prototype'],
      },
      {
        id: 'sec-lab',
        title: isSotho ? '10 / Laboratori ea NahaLabs (Lab)' : '10 / NahaLabs Systems Lab',
        subtitle: isSotho ? 'Lipatlisiso le liteko tsa boithuto ba tekgeniki' : 'Experimental architectures, vectors, and neural pipelines',
        category: 'section',
        icon: <Cpu className="w-4 h-4 text-[#C8AE82]" />,
        action: () => {
          onNavigateSection('lab');
          onClose();
        },
        tags: ['lab', 'experimental', 'rnd', 'vectors', 'benchmarks'],
      },
      {
        id: 'sec-outcomes',
        title: isSotho ? '11 / Liphetho tsa Bareki (Client Outcomes)' : '11 / Client Outcomes & Testimonials',
        subtitle: isSotho ? 'Lipaki tsa tsoelo-pele ho tsoa likhoebong tsa sebele' : 'Verified economic impact and executive testimonials',
        category: 'section',
        icon: <Users className="w-4 h-4 text-[#C8AE82]" />,
        action: () => {
          onNavigateSection('testimonials');
          onClose();
        },
        tags: ['outcomes', 'testimonials', 'reviews', 'benchmarks', 'clients'],
      },
      {
        id: 'sec-faq',
        title: isSotho ? '12 / Lipotso Tse Tloaelehileng (FAQ)' : '12 / FAQ & Specifications',
        subtitle: isSotho ? 'Likarabo tsa tšireletso, nako le boeletsi' : 'Direct answers on security, IP ownership, and timelines',
        category: 'section',
        icon: <HelpCircle className="w-4 h-4 text-[#C8AE82]" />,
        action: () => {
          onNavigateSection('faq');
          onClose();
        },
        tags: ['faq', 'questions', 'specifications', 'security', 'ip', 'costs'],
      },
      {
        id: 'sec-contact',
        title: isSotho ? '14 / Deske ea Puisano ea Khoebo (Contact)' : '14 / Commercial Inquiry Desk (Contact)',
        subtitle: isSotho ? 'Qala puisano ea botekgeniki le baenjiniere' : 'Direct architectural consultation & brief submission',
        category: 'section',
        icon: <Send className="w-4 h-4 text-[#C8AE82]" />,
        action: () => {
          onNavigateSection('contact');
          onClose();
        },
        tags: ['contact', 'inquiry', 'email', 'consultation', 'talk', 'hire'],
      },
    ];

    // Systems & service offerings
    const systems: PaletteItem[] = SYSTEMS_DATA.map((sys) => ({
      id: `sys-${sys.id}`,
      title: sys.name,
      subtitle: `${sys.subtitle} · ${sys.category}`,
      category: 'system',
      icon: <Layers className="w-4 h-4 text-[#C8AE82]" />,
      action: () => {
        if (onSelectSystem) {
          onSelectSystem(sys.id);
        } else {
          onNavigateSection('systems');
        }
        onClose();
      },
      tags: [sys.name.toLowerCase(), sys.category.toLowerCase(), sys.subtitle.toLowerCase(), ...(sys.tags || [])],
    }));

    // Regional Desks
    const regions: PaletteItem[] = Object.values(LOCATIONS_DATA).map((loc) => ({
      id: `reg-${loc.slug}`,
      title: `${loc.city} (${loc.province})`,
      subtitle: `${loc.regionFocus}`,
      category: 'region',
      icon: <MapPin className="w-4 h-4 text-[#C8AE82]" />,
      action: () => {
        onSelectLocation(loc.slug);
        onClose();
      },
      tags: [loc.city.toLowerCase(), loc.province.toLowerCase(), loc.slug.toLowerCase(), loc.regionFocus.toLowerCase(), ...(loc.districts || []).map(d => d.toLowerCase())],
    }));

    return [...sections, ...systems, ...regions];
  }, [lang, onNavigateSection, onSelectSystem, onSelectLocation, onClose]);

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();

    return allItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Query filter
      if (!cleanQuery) return true;

      const inTitle = item.title.toLowerCase().includes(cleanQuery);
      const inSubtitle = item.subtitle.toLowerCase().includes(cleanQuery);
      const inTags = item.tags?.some((t) => t.toLowerCase().includes(cleanQuery));

      return inTitle || inSubtitle || inTags;
    });
  }, [allItems, query, selectedCategory]);

  // Keyboard navigation within the list
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < filteredItems.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette Search"
    >
      <div 
        className="w-full max-w-2xl bg-[#0c0d0e] border border-[#26282b] rounded-md shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1c1e20] bg-[#111214]">
          <Search className="w-5 h-5 text-[#C8AE82] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="command-palette-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.commandPalette.placeholder}
            className="flex-1 bg-transparent text-[#F3F0EA] placeholder-[#666] text-sm sm:text-base focus:outline-none font-mono"
            autoComplete="off"
            spellCheck="false"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-[#888] hover:text-[#F3F0EA] transition-colors"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-[#888] bg-[#191b1e] border border-[#2b2e32] rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#0d0e10] border-b border-[#1c1e20] overflow-x-auto text-xs font-mono">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#C8AE82] text-[#080909] font-bold'
                : 'bg-[#151618] text-[#888] hover:text-[#F3F0EA]'
            }`}
          >
            {t.commandPalette.all}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('section')}
            className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer ${
              selectedCategory === 'section'
                ? 'bg-[#C8AE82] text-[#080909] font-bold'
                : 'bg-[#151618] text-[#888] hover:text-[#F3F0EA]'
            }`}
          >
            {t.commandPalette.sections}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('system')}
            className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer ${
              selectedCategory === 'system'
                ? 'bg-[#C8AE82] text-[#080909] font-bold'
                : 'bg-[#151618] text-[#888] hover:text-[#F3F0EA]'
            }`}
          >
            {t.commandPalette.systems}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('region')}
            className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer ${
              selectedCategory === 'region'
                ? 'bg-[#C8AE82] text-[#080909] font-bold'
                : 'bg-[#151618] text-[#888] hover:text-[#F3F0EA]'
            }`}
          >
            {t.commandPalette.regions}
          </button>
          <span className="ml-auto text-[10px] text-[#666] hidden sm:inline">
            {filteredItems.length} result{filteredItems.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 space-y-1 max-h-[55vh]">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-sm transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#1a1c1e] text-[#F3F0EA] border-l-2 border-[#C8AE82]'
                      : 'hover:bg-[#131416] text-[#A5A29B]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded bg-[#0f1011] border border-[#222426] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#F3F0EA] truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#1f2124] text-[#C8AE82] tracking-wider">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#777] truncate mt-0.5 font-mono">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-3 flex-shrink-0">
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#C8AE82]">
                        <CornerDownLeft className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Jump</span>
                      </span>
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-[#444]" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-[#444] mx-auto mb-2" />
              <div className="text-sm font-bold text-[#F3F0EA]">
                {t.commandPalette.noResults}
              </div>
              <p className="text-xs text-[#777] max-w-sm mx-auto font-mono">
                {t.commandPalette.noResultsDesc}
              </p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-[#0a0b0c] border-t border-[#1c1e20] flex items-center justify-between text-[11px] font-mono text-[#666]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#161719] border border-[#27292c] text-[#A5A29B]">↑↓</kbd>
              <span>{t.commandPalette.navigateTip}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#161719] border border-[#27292c] text-[#A5A29B]">↵</kbd>
              <span>{t.commandPalette.selectTip}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#161719] border border-[#27292c] text-[#A5A29B]">ESC</kbd>
              <span>{t.commandPalette.closeTip}</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[#C8AE82]">
            <span>NAHALABS QUICK SEARCH</span>
          </div>
        </div>
      </div>
    </div>
  );
};

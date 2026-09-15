import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown, MapPin, Eye, Globe, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'sonner';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeLocation?: string | null;
  onSelectLocation: (slug: string) => void;
  isAmbient?: boolean;
  onToggleAmbient?: () => void;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  onSelectLocation,
  isAmbient = false,
  onToggleAmbient,
  onOpenCommandPalette,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  const handleLanguageToggle = () => {
    toggleLang();
    if (lang === 'en') {
      toast.success('Puo e Fetoletsoe ho Sesotho', {
        description: 'Karolo tsa bohlokwa joale li bontšoa ka Sesotho bakeng sa bareki ba rona ba Lesotho.',
        duration: 4000,
      });
    } else {
      toast.success('Language Switched to English', {
        description: 'Key sections are now displayed in English.',
        duration: 3500,
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    setLocationsOpen(false);
    onNavigate(id);
  };

  const handleLocationClick = (slug: string) => {
    setMobileMenuOpen(false);
    setLocationsOpen(false);
    onSelectLocation(slug);
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#080909]/90 backdrop-blur-md border-b border-[#222222]/80 py-3.5 shadow-2xl' 
          : 'bg-gradient-to-b from-[#080909]/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('hero'); }}
          className="flex items-center gap-3.5 group focus:outline-none focus:ring-1 focus:ring-[#C8AE82]"
          aria-label="NahaLabs Home"
        >
          {/* Monogram SVG */}
          <div className="w-8 h-8 flex-shrink-0">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <defs>
                <linearGradient id="navGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5D1B0" />
                  <stop offset="50%" stopColor="#C8AE82" />
                  <stop offset="100%" stopColor="#9C8358" />
                </linearGradient>
              </defs>
              <g transform="translate(22, 16)">
                <rect x="0" y="2" width="8" height="8" fill="url(#navGold)" />
                <rect x="0" y="16" width="7" height="52" fill="url(#navGold)" />
                <path d="M 2 22 L 48 68 L 40 68 L 2 30 Z" fill="url(#navGold)" />
                <path d="M 8 16 L 54 62 L 54 54 L 16 16 Z" fill="url(#navGold)" />
                <rect x="47" y="16" width="7" height="52" fill="url(#navGold)" />
                <rect x="47" y="74" width="8" height="8" fill="url(#navGold)" />
              </g>
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-[17px] font-bold tracking-[0.25em] text-[#F3F0EA] group-hover:text-[#C8AE82] transition-colors leading-none font-sans">
              NAHALABS
            </span>
            <span className="text-[8px] font-mono tracking-[0.2em] text-[#A5A29B] mt-1 uppercase hidden sm:block">
              Intelligent Systems
            </span>
          </div>
        </a>

        {/* Desktop Navigation - Streamlined & uncluttered: Solutions | Case Studies | How We Work | About */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-[13px] tracking-[0.12em] font-medium text-[#A5A29B]">
          <button 
            onClick={() => handleLinkClick('solutions')}
            className="hover:text-[#F3F0EA] transition-colors uppercase cursor-pointer"
          >
            {t.nav.solutions}
          </button>
          <button 
            onClick={() => handleLinkClick('case-studies')}
            className="hover:text-[#F3F0EA] transition-colors uppercase cursor-pointer"
          >
            {t.nav.caseStudies}
          </button>
          <button 
            onClick={() => handleLinkClick('method')}
            className="hover:text-[#F3F0EA] transition-colors uppercase cursor-pointer"
          >
            {t.nav.howWeWork}
          </button>
          <button 
            onClick={() => handleLinkClick('founder')}
            className="hover:text-[#F3F0EA] transition-colors uppercase cursor-pointer"
          >
            {t.nav.about}
          </button>

          {/* Regional Locations Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLocationsOpen(!locationsOpen)}
              className="flex items-center gap-1 hover:text-[#C8AE82] transition-colors uppercase cursor-pointer py-1"
              aria-expanded={locationsOpen}
            >
              <MapPin className="w-3.5 h-3.5 text-[#C8AE82]" />
              <span>{t.nav.regions}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${locationsOpen ? 'rotate-180' : ''}`} />
            </button>

            {locationsOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-56 bg-[#151515] border border-[#262626] shadow-2xl py-2 rounded-sm"
                onMouseLeave={() => setLocationsOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#C8AE82]/70 border-b border-[#222222]">
                  REGIONAL HUBS
                </div>
                <button
                  onClick={() => handleLocationClick('johannesburg')}
                  className="w-full text-left px-3 py-2 text-xs text-[#F3F0EA] hover:bg-[#222222] hover:text-[#C8AE82] transition-colors flex items-center justify-between"
                >
                  <span>Johannesburg & Sandton</span>
                  <span className="text-[10px] font-mono text-[#A5A29B]">JHB</span>
                </button>
                <button
                  onClick={() => handleLocationClick('soweto')}
                  className="w-full text-left px-3 py-2 text-xs text-[#F3F0EA] hover:bg-[#222222] hover:text-[#C8AE82] transition-colors flex items-center justify-between"
                >
                  <span>Soweto Commercial</span>
                  <span className="text-[10px] font-mono text-[#A5A29B]">SWT</span>
                </button>
                <button
                  onClick={() => handleLocationClick('gauteng')}
                  className="w-full text-left px-3 py-2 text-xs text-[#F3F0EA] hover:bg-[#222222] hover:text-[#C8AE82] transition-colors flex items-center justify-between"
                >
                  <span>Gauteng Corridor</span>
                  <span className="text-[10px] font-mono text-[#A5A29B]">GT</span>
                </button>
                <button
                  onClick={() => handleLocationClick('lesotho')}
                  className="w-full text-left px-3 py-2 text-xs text-[#F3F0EA] hover:bg-[#222222] hover:text-[#C8AE82] transition-colors flex items-center justify-between"
                >
                  <span>Lesotho & Cross-Border</span>
                  <span className="text-[10px] font-mono text-[#A5A29B]">LS</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Action Controls: Search [K], Language Switcher, Ambient Mode Toggle & CTA Button */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Quick Search / Command Palette Trigger */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              id="nav-search-btn"
              className="group flex items-center gap-2 px-3 py-2 rounded-full border border-[#262626] bg-[#121314] hover:border-[#C8AE82]/60 text-xs font-mono text-[#A5A29B] hover:text-[#F3F0EA] transition-all duration-200 cursor-pointer"
              title="Search sections, systems, and hubs (Press K)"
              aria-label="Open search command palette (Press K)"
            >
              <Search className="w-3.5 h-3.5 text-[#C8AE82] group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline text-[11px] text-[#A5A29B] group-hover:text-[#F3F0EA]">Search</span>
              <kbd className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#1e2023] border border-[#33373d] text-[9px] font-bold text-[#C8AE82]">
                K
              </kbd>
            </button>
          )}

          {/* Language Switcher Button (English / Sesotho) */}
          <button
            onClick={handleLanguageToggle}
            id="language-switcher-btn"
            className="group flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#262626] bg-[#121314] hover:border-[#C8AE82] text-xs font-mono transition-all duration-200 cursor-pointer"
            title={lang === 'en' ? 'Fetola ho Sesotho (Switch to Sesotho)' : 'Switch to English'}
            aria-label="Language Switcher: English or Sesotho"
          >
            <Globe className={`w-3.5 h-3.5 transition-colors ${lang === 'st' ? 'text-[#C8AE82]' : 'text-[#A5A29B] group-hover:text-[#F3F0EA]'}`} />
            <span className={`text-[11px] font-bold ${lang === 'st' ? 'text-[#C8AE82]' : 'text-[#F3F0EA]'}`}>
              {lang === 'en' ? 'EN' : 'ST'}
            </span>
            <span className="text-[10px] font-mono text-[#A5A29B] hidden xl:inline uppercase">
              {lang === 'en' ? 'Sesotho' : 'English'}
            </span>
          </button>

          {onToggleAmbient && (
            <button
              onClick={onToggleAmbient}
              id="ambient-mode-toggle"
              className={`group flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-mono transition-all duration-200 cursor-pointer ${
                isAmbient 
                  ? 'border-[#C8AE82] bg-[#C8AE82]/15 text-[#FAF8F5]' 
                  : 'border-[#262626] bg-[#121314] text-[#A5A29B] hover:text-[#F3F0EA] hover:border-[#333]'
              }`}
              title={isAmbient ? 'Ambient Mode Active (Press T)' : 'Switch to Ambient Mode (Press T)'}
              aria-label="Toggle Ambient Mode (Press T)"
            >
              <Eye className={`w-3.5 h-3.5 transition-colors ${isAmbient ? 'text-[#C8AE82]' : 'text-[#A5A29B] group-hover:text-[#F3F0EA]'}`} />
              <span className="hidden 2xl:inline text-[11px] uppercase tracking-wider">
                Ambient
              </span>
              <span className={`w-1.5 h-1.5 rounded-full ${isAmbient ? 'bg-[#C8AE82]' : 'bg-[#555]'}`} />
              <kbd className="hidden xl:inline-block text-[9px] font-mono px-1 py-0.2 rounded bg-[#1e2023] border border-[#33373d] text-[#C8AE82]">
                T
              </kbd>
            </button>
          )}

          <button 
            onClick={() => handleLinkClick('contact')}
            id="nav-cta-btn"
            className="group relative inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full border border-[#C8AE82]/50 bg-[#151515] text-[#F3F0EA] text-xs font-semibold tracking-wider uppercase hover:border-[#C8AE82] hover:bg-[#C8AE82]/10 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#C8AE82]"
            title="Start Engagement Inquiry (Press C)"
          >
            <span>{t.nav.cta}</span>
            <kbd className="hidden xl:inline-block text-[9px] font-mono px-1 py-0.2 rounded bg-[#1c1d1f] border border-[#33373d] text-[#C8AE82]">
              C
            </kbd>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C8AE82] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Mobile Search Button */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              id="mobile-search-btn"
              className="p-2 rounded-full border border-[#262626] bg-[#121314] text-[#C8AE82]"
              title="Search"
              aria-label="Open Search Command Palette"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Language Switcher */}
          <button
            onClick={handleLanguageToggle}
            id="mobile-language-switcher-btn"
            className="px-2.5 py-1.5 rounded-full border border-[#262626] bg-[#121314] text-xs font-mono text-[#F3F0EA] flex items-center gap-1"
            title="Toggle Language"
            aria-label="Toggle English or Sesotho"
          >
            <Globe className="w-3 h-3 text-[#C8AE82]" />
            <span className="text-[10px] font-bold">{lang.toUpperCase()}</span>
          </button>

          {onToggleAmbient && (
            <button
              onClick={onToggleAmbient}
              className={`p-2 rounded-full border transition-colors ${
                isAmbient ? 'border-[#C8AE82] text-[#C8AE82] bg-[#C8AE82]/10' : 'border-[#262626] text-[#A5A29B]'
              }`}
              aria-label="Toggle Ambient Mode"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F3F0EA] hover:text-[#C8AE82] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-[#080909] z-40 px-6 py-8 flex flex-col justify-between overflow-y-auto border-t border-[#222222]">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#222] pb-3">
              <span className="text-[11px] font-mono text-[#C8AE82] tracking-widest uppercase">
                {t.nav.directory}
              </span>
              <button
                onClick={handleLanguageToggle}
                className="px-3 py-1 rounded bg-[#151515] border border-[#333] text-xs font-mono text-[#C8AE82] flex items-center gap-1.5"
              >
                <Globe className="w-3 h-3" />
                <span>Puo: {lang === 'en' ? 'Sesotho' : 'English'}</span>
              </button>
            </div>
            <div className="flex flex-col gap-4 text-lg font-medium tracking-wide">
              <button
                onClick={() => handleLinkClick('solutions')}
                className="text-left text-[#F3F0EA] hover:text-[#C8AE82] py-2 border-b border-[#181818]"
              >
                {t.nav.solutions}
              </button>
              <button
                onClick={() => handleLinkClick('case-studies')}
                className="text-left text-[#F3F0EA] hover:text-[#C8AE82] py-2 border-b border-[#181818]"
              >
                {t.nav.caseStudies}
              </button>
              <button
                onClick={() => handleLinkClick('method')}
                className="text-left text-[#F3F0EA] hover:text-[#C8AE82] py-2 border-b border-[#181818]"
              >
                {t.nav.howWeWork}
              </button>
              <button
                onClick={() => handleLinkClick('founder')}
                className="text-left text-[#F3F0EA] hover:text-[#C8AE82] py-2 border-b border-[#181818]"
              >
                {t.nav.about}
              </button>
            </div>

            {/* Regional Links in Mobile */}
            <div className="pt-4 space-y-2">
              <div className="text-xs font-mono text-[#A5A29B] tracking-wider uppercase">
                Regional Hubs (SEO)
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleLocationClick('johannesburg')}
                  className="text-left text-xs bg-[#151515] p-2.5 rounded border border-[#262626] text-[#F3F0EA] hover:border-[#C8AE82]"
                >
                  Johannesburg & Sandton
                </button>
                <button
                  onClick={() => handleLocationClick('soweto')}
                  className="text-left text-xs bg-[#151515] p-2.5 rounded border border-[#262626] text-[#F3F0EA] hover:border-[#C8AE82]"
                >
                  Soweto Township Commerce
                </button>
                <button
                  onClick={() => handleLocationClick('gauteng')}
                  className="text-left text-xs bg-[#151515] p-2.5 rounded border border-[#262626] text-[#F3F0EA] hover:border-[#C8AE82]"
                >
                  Gauteng Industrial Corridor
                </button>
                <button
                  onClick={() => handleLocationClick('lesotho')}
                  className="text-left text-xs bg-[#151515] p-2.5 rounded border border-[#262626] text-[#F3F0EA] hover:border-[#C8AE82]"
                >
                  Lesotho & Cross-Border
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#222222] space-y-4">
            {onToggleAmbient && (
              <button
                onClick={onToggleAmbient}
                className={`w-full py-2.5 px-4 rounded-full border text-xs font-mono flex items-center justify-between transition-colors ${
                  isAmbient 
                    ? 'border-[#C8AE82] bg-[#C8AE82]/15 text-[#FAF8F5]' 
                    : 'border-[#262626] bg-[#151515] text-[#A5A29B]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#C8AE82]" />
                  <span>Ambient Low-Light Mode</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${isAmbient ? 'bg-[#C8AE82] text-[#080909] font-bold' : 'bg-[#222] text-[#888]'}`}>
                  {isAmbient ? 'ON' : 'OFF'}
                </span>
              </button>
            )}

            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full py-3.5 text-center rounded-full bg-[#C8AE82] text-[#080909] font-semibold text-xs tracking-wider uppercase hover:bg-[#E5D1B0]"
            >
              Start A Conversation
            </button>
            <div className="mt-4 text-center text-xs font-mono text-[#A5A29B]">
              ai-solutions@nahalabs.co.za
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

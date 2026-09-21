import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#080909]/90 backdrop-blur-md border-b border-[#1c1d21] py-4 shadow-2xl' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Monogram + Clean Wordmark */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('hero'); }}
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="NahaLabs Home"
        >
          {/* Canonical NahaLabs Monogram SVG */}
          <div className="w-7 h-7 flex-shrink-0 transition-transform group-hover:scale-105">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <defs>
                <linearGradient id="navMonogramGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5D1B0" />
                  <stop offset="50%" stopColor="#C8AE82" />
                  <stop offset="100%" stopColor="#9C8358" />
                </linearGradient>
              </defs>
              <g transform="translate(22, 16)">
                <rect x="0" y="2" width="8" height="8" fill="url(#navMonogramGold)" />
                <rect x="0" y="16" width="7" height="52" fill="url(#navMonogramGold)" />
                <path d="M 2 22 L 48 68 L 40 68 L 2 30 Z" fill="url(#navMonogramGold)" />
                <path d="M 8 16 L 54 62 L 54 54 L 16 16 Z" fill="url(#navMonogramGold)" />
                <rect x="47" y="16" width="7" height="52" fill="url(#navMonogramGold)" />
                <rect x="47" y="74" width="8" height="8" fill="url(#navMonogramGold)" />
              </g>
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-[16px] font-extrabold tracking-[0.22em] text-[#F3F0EA] group-hover:text-[#C8AE82] transition-colors leading-none font-sans">
              NAHALABS
            </span>
          </div>
        </a>

        {/* Desktop Navigation: Solutions · Systems · Approach · About */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.08em] font-medium text-[#A5A29B]">
          <button 
            onClick={() => handleLinkClick('solutions')}
            className="hover:text-[#F3F0EA] transition-colors cursor-pointer"
          >
            Solutions
          </button>
          <button 
            onClick={() => handleLinkClick('systems')}
            className="hover:text-[#F3F0EA] transition-colors cursor-pointer"
          >
            Systems
          </button>
          <button 
            onClick={() => handleLinkClick('approach')}
            className="hover:text-[#F3F0EA] transition-colors cursor-pointer"
          >
            Approach
          </button>
          <button 
            onClick={() => handleLinkClick('about')}
            className="hover:text-[#F3F0EA] transition-colors cursor-pointer"
          >
            About
          </button>
          <a
            href="/insights/hidden-cost-fragmented-operational-information"
            className="hover:text-[#F3F0EA] transition-colors"
          >
            Insights
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={() => handleLinkClick('contact')}
            id="nav-contact-cta"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18191c] hover:bg-[#C8AE82] text-[#F3F0EA] hover:text-[#080909] border border-[#2b2d35] hover:border-[#C8AE82] text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer active:scale-95 shadow-sm"
          >
            <span>Start a conversation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#A5A29B] hover:text-[#F3F0EA] hover:bg-[#18191c] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1c1d21] bg-[#0c0d0f]/95 backdrop-blur-xl px-6 py-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 text-sm font-medium text-[#A5A29B]">
            <button 
              onClick={() => handleLinkClick('solutions')}
              className="text-left py-2 hover:text-[#F3F0EA] transition-colors cursor-pointer"
            >
              Solutions
            </button>
            <button 
              onClick={() => handleLinkClick('systems')}
              className="text-left py-2 hover:text-[#F3F0EA] transition-colors cursor-pointer"
            >
              Systems
            </button>
            <button 
              onClick={() => handleLinkClick('approach')}
              className="text-left py-2 hover:text-[#F3F0EA] transition-colors cursor-pointer"
            >
              Approach
            </button>
            <button 
              onClick={() => handleLinkClick('about')}
              className="text-left py-2 hover:text-[#F3F0EA] transition-colors cursor-pointer"
            >
              About
            </button>
            <a
              href="/insights/hidden-cost-fragmented-operational-information"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 hover:text-[#F3F0EA] transition-colors"
            >
              Insights
            </a>
          </div>

          <div className="pt-3 border-t border-[#1f2025]">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full py-3 min-h-[44px] rounded-xl bg-[#C8AE82] text-[#080909] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Start a conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

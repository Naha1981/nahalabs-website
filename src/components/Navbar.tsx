import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from './Button';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const LINKS = [
  { id: 'solutions', label: 'Solutions' },
  { id: 'about', label: 'About' },
];

// Separate pages (not sections of the home page).
const PAGES = [
  { href: '/insights', label: 'Insights' },
];

const PRODUCTS = [
  { href: '/revenuedesk', label: 'RevenueDesk', note: 'Front desk for service businesses' },
  { href: '/#flavourly', label: 'Flavourly', note: 'Restaurant Revenue OS' },
  { href: '/cargo-iq', label: 'CargoIQ', note: 'Freight evidence and dispute intelligence' },
  { href: '/fieldproof', label: 'FieldProof', note: 'Field evidence for telecom crews' },
  { href: '/netpulse', label: 'NetPulse', note: 'Network inventory clean-up' },
  { href: '/smile-bridge', label: 'Smile Bridge', note: 'Patient conversion for dental practices' },
  { href: '/railwatch', label: 'RailWatch', note: 'Rail freight visibility' },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!productsOpen) return;
    const onDown = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) setProductsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProductsOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [productsOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape closes the menu and returns focus to its trigger; resizing to
  // desktop closes it so it can never be stranded open.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [mobileMenuOpen]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  const solid = isScrolled || mobileMenuOpen;

  return (
    <header
      id="main-navbar"
      data-tone="light"
      className={`fixed top-0 left-0 right-0 z-50 text-[#0B0E10] transition-[background-color,border-color] duration-300 border-b ${
        solid ? 'bg-[#F2F4F7]/95 backdrop-blur-md border-[#D1D5DB]' : 'bg-[#F2F4F7]/90 backdrop-blur-sm border-transparent'
      }`}
    >
      <div className="wrap flex items-center justify-between h-[var(--header-h)]">
        <a
          href="#hero"
          onClick={(e) => go(e, 'hero')}
          className="inline-flex items-center rounded-lg shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#355241]"
          aria-label="NahaLabs home"
        >
          <img
            src="/nahalabs-logo.svg"
            alt="NahaLabs — Intelligent Systems Engineering"
            className="block h-9 sm:h-10 w-auto max-w-[210px] object-contain"
          />
        </a>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-6 xl:gap-8 text-button">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => go(e, l.id)}
              className="min-h-12 inline-flex items-center px-1 text-sm font-medium text-[#323A42] hover:text-[#0B0E10] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div
            ref={productsRef}
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((v) => !v)}
              className="min-h-12 inline-flex items-center gap-1 px-1 text-sm font-medium text-[#323A42] hover:text-[#0B0E10] transition-colors"
            >
              Our Products
              <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {productsOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-1 z-50">
                <ul className="w-72 rounded-xl border border-[#D1D5DB] bg-white p-2 shadow-lg">
                  {PRODUCTS.map((p) => (
                    <li key={p.label}>
                      <a
                        href={p.href}
                        onClick={() => setProductsOpen(false)}
                        className="block rounded-lg px-3 py-2.5 hover:bg-[#F2F4F7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#355241]"
                      >
                        <span className="block text-sm font-semibold text-[#0B0E10]">{p.label}</span>
                        <span className="block text-xs text-[#4D5660]">{p.note}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {PAGES.map((p) => (
            <a key={p.href} href={p.href} className="min-h-12 inline-flex items-center px-1 text-sm font-medium text-[#323A42] hover:text-[#0B0E10] transition-colors">
              {p.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
          <Button
            id="nav-contact-cta"
            variant="primary"
            onClick={(e) => go(e, 'contact')}
          >
            Start a Conversation
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="lg:hidden -mr-2 w-11 h-11 inline-flex items-center justify-center rounded-lg text-[#323A42] hover:text-[#0B0E10] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#355241]"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-[#D1D5DB] bg-[#F2F4F7]">
          <nav aria-label="Mobile" className="wrap py-4 flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                className="min-h-12 flex items-center text-base text-[#0B0E10] border-b border-[#D1D5DB]"
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              aria-expanded={mobileProductsOpen}
              onClick={() => setMobileProductsOpen((v) => !v)}
              className="min-h-12 flex items-center justify-between text-base text-[#0B0E10] border-b border-[#D1D5DB]"
            >
              Our Products
              <ChevronDown className={`w-5 h-5 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {mobileProductsOpen && (
              <div className="flex flex-col border-b border-[#D1D5DB] bg-white/60">
                {PRODUCTS.map((p) => (
                  <a
                    key={p.label}
                    href={p.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-12 flex items-center pl-4 text-base text-[#0B0E10]"
                  >
                    {p.label}
                  </a>
                ))}
              </div>
            )}
            {PAGES.map((p) => (
              <a
                key={p.href}
                href={p.href}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-12 flex items-center text-body text-fg border-b border-line"
              >
                {p.label}
              </a>
            ))}
            <Button
              variant="primary"
              onClick={(e) => go(e, 'contact')}
              className="mt-5 mb-2 w-full"
            >
              Start a Conversation
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

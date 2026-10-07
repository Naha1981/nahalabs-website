import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const LINKS = [
  { id: 'solutions', label: 'Solutions' },
  { id: 'about', label: 'About' },
];

// Separate pages (not sections of the home page).
const PAGES = [
  { href: '/revenuedesk', label: 'RevenueDesk' },
  { href: '/insights', label: 'Insights' },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

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
      className={`fixed top-0 left-0 right-0 z-50 text-fg transition-[background-color,border-color] duration-300 border-b ${
        solid ? 'bg-canvas/92 backdrop-blur-md border-line' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="wrap flex items-center justify-between h-[var(--header-h)]">
        <a
          href="#hero"
          onClick={(e) => go(e, 'hero')}
          className="inline-flex items-center rounded-sm shrink-0"
          aria-label="NahaLabs home"
        >
          <img
            src="/nahalabs-logo.svg"
            alt="NahaLabs — Intelligent Systems Engineering"
            className="block h-10 sm:h-11 w-auto max-w-[210px] object-contain"
          />
        </a>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-6 xl:gap-8 text-button">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => go(e, l.id)}
              className="py-2 text-fg-2 hover:text-fg transition-colors"
            >
              {l.label}
            </a>
          ))}
          {PAGES.map((p) => (
            <a key={p.href} href={p.href} className="py-2 text-fg-2 hover:text-fg transition-colors">
              {p.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
          <button
            type="button"
            onClick={(e) => go(e, 'contact')}
            id="nav-contact-cta"
            className="btn btn-outline btn-sm"
          >
            Start a conversation
          </button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="lg:hidden -mr-2 w-11 h-11 inline-flex items-center justify-center rounded-md text-fg-2 hover:text-fg"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-line bg-canvas">
          <nav aria-label="Mobile" className="wrap py-4 flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                className="min-h-12 flex items-center text-body text-fg border-b border-line"
              >
                {l.label}
              </a>
            ))}
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
            <button
              type="button"
              onClick={(e) => go(e, 'contact')}
              className="btn btn-primary mt-5 mb-2 w-full"
            >
              Start a conversation
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

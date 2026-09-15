import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ManifestoSection } from './components/ManifestoSection';
import { BusinessFuelSection } from './components/BusinessFuelSection';
import { ProblemEntrySection } from './components/ProblemEntrySection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { SystemsSection } from './components/SystemsSection';
import { IntelligenceInAction } from './components/IntelligenceInAction';
import { IntelligenceFormula } from './components/IntelligenceFormula';
import { GeneralIntelligence } from './components/GeneralIntelligence';
import { EnterpriseIntelligence } from './components/EnterpriseIntelligence';
import { ProblemSection } from './components/ProblemSection';
import { MethodSection } from './components/MethodSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LabSection } from './components/LabSection';
import { FAQSection } from './components/FAQSection';
import { FounderSection } from './components/FounderSection';
import { ContactSection } from './components/ContactSection';
import { LocationView } from './components/LocationView';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { ExitIntentModal } from './components/ExitIntentModal';
import { KeyboardShortcutBadge } from './components/KeyboardShortcutBadge';
import { ScrollToTop } from './components/ScrollToTop';
import { CommandPalette } from './components/CommandPalette';
import { LanguageProvider } from './context/LanguageContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { LOCATIONS_DATA } from './data/locations';
import { SYSTEMS_DATA } from './data/systems';

export default function App() {
  const [activeLocationSlug, setActiveLocationSlug] = useState<string | null>(null);
  const [prefilledSystem, setPrefilledSystem] = useState<string | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  
  // Ambient Mode: Soft low-light grey palette toggle
  const [isAmbient, setIsAmbient] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nahalabs_theme_mode') === 'ambient';
    }
    return false;
  });

  // Sync Ambient mode with DOM class
  useEffect(() => {
    if (isAmbient) {
      document.documentElement.classList.add('ambient');
      localStorage.setItem('nahalabs_theme_mode', 'ambient');
    } else {
      document.documentElement.classList.remove('ambient');
      localStorage.setItem('nahalabs_theme_mode', 'standard');
    }
  }, [isAmbient]);

  const handleToggleAmbient = () => {
    setIsAmbient(prev => {
      const next = !prev;
      if (next) {
        toast('Ambient Mode Active', {
          description: 'Palette softened to subtle grey tones for comfortable low-light reading.',
        });
      } else {
        toast('Obsidian Mode Active', {
          description: 'Standard enterprise deep black contrast restored.',
        });
      }
      return next;
    });
  };

  // Sync hash routing for SEO crawlers and location URLs
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('locations/')) {
        const slug = hash.split('/')[1];
        if (LOCATIONS_DATA[slug]) {
          setActiveLocationSlug(slug);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      if (hash === '' || hash === 'hero') {
        setActiveLocationSlug(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (activeLocationSlug) {
      setActiveLocationSlug(null);
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectLocation = (slug: string) => {
    setActiveLocationSlug(slug);
    window.location.hash = `locations/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultSystem = (systemName: string) => {
    setPrefilledSystem(systemName);
    if (activeLocationSlug) {
      setActiveLocationSlug(null);
    }
    setTimeout(() => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleDiagnoseProblem = (systemOrTitle: string, problemLabel: string) => {
    setPrefilledSystem(`${systemOrTitle} — ${problemLabel}`);
    if (activeLocationSlug) {
      setActiveLocationSlug(null);
    }
    setTimeout(() => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Global Keyboard Shortcuts: 'K' for Command Palette, 'H' for Home/Hero, 'C' for Contact, 'T' for Ambient/Obsidian Theme
  useKeyboardShortcuts({
    onNavigateHome: () => handleNavigate('hero'),
    onNavigateContact: () => handleNavigate('contact'),
    onNavigateSystems: () => handleNavigate('systems'),
    onToggleTheme: handleToggleAmbient,
    onCloseModals: () => {
      setLegalModalType(null);
      setIsCommandPaletteOpen(false);
    },
    onOpenCommandPalette: () => setIsCommandPaletteOpen(true),
  });

  return (
    <LanguageProvider>
      <div className={`min-h-screen ${isAmbient ? 'bg-[#16181b] text-[#FAF8F5]' : 'bg-[#080909] text-[#F3F0EA]'} flex flex-col font-sans selection:bg-[#C8AE82] selection:text-[#080909] transition-colors duration-300`}>
        {/* Viewport Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Toast Notification Provider */}
        <Toaster 
          position="top-right" 
          richColors 
          closeButton 
          theme={isAmbient ? 'light' : 'dark'}
        />

        {/* Navigation */}
        <Navbar 
          onNavigate={handleNavigate}
          activeLocation={activeLocationSlug}
          onSelectLocation={handleSelectLocation}
          isAmbient={isAmbient}
          onToggleAmbient={handleToggleAmbient}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* Main View: Either Dedicated Location SEO Page or Master Landing Page */}
        <main className="flex-1">
          {activeLocationSlug && LOCATIONS_DATA[activeLocationSlug] ? (
            <LocationView
              location={LOCATIONS_DATA[activeLocationSlug]}
              onBack={() => {
                setActiveLocationSlug(null);
                window.location.hash = '';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onContact={() => {
                setActiveLocationSlug(null);
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />
          ) : (
            <>
              {/* Hero Section: Find where your business is losing money, time, or opportunity */}
              <Hero 
                onExploreSystems={() => handleNavigate('solutions')}
                onBringProblem={() => handleNavigate('case-studies')}
              />

              {/* Problem-First Entry: What are you trying to improve? (3 Large Intent Pathways) */}
              <ProblemEntrySection onDiagnoseProblem={handleDiagnoseProblem} />

              {/* Case Studies Evidence: We've built systems around real business problems (11 Carousels) */}
              <CaseStudiesSection onDiagnoseProblem={handleDiagnoseProblem} />

              {/* Live Pipeline Simulation with subtle Parallax scrolling */}
              <IntelligenceInAction />

              {/* Business Fuel Architectural Flipping Panels */}
              <BusinessFuelSection />

              {/* Manifesto Section */}
              <ManifestoSection />

              {/* 6-Stage Delivery Method: Diagnosis → Prototype → Production */}
              <MethodSection />

              {/* Strategic FAQ Section */}
              <FAQSection onContactClick={() => handleNavigate('contact')} />

              {/* Founder Leadership Section */}
              <FounderSection />

              {/* Final CTA & Enterprise Opportunity Diagnosis Form */}
              <ContactSection prefilledSystem={prefilledSystem} />
            </>
          )}
        </main>

        {/* Section 48: Footer */}
        <Footer 
          onNavigate={handleNavigate}
          onSelectLocation={handleSelectLocation}
          onOpenPrivacy={() => setLegalModalType('privacy')}
          onOpenTerms={() => setLegalModalType('terms')}
        />

        {/* Legal & Privacy POPIA Modal */}
        <LegalModal 
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />

        {/* Exit Intent Newsletter Briefing Modal */}
        <ExitIntentModal onNavigate={handleNavigate} />

        {/* Global Keyboard Shortcut Pill & Guide */}
        <KeyboardShortcutBadge 
          onNavigateHome={() => handleNavigate('hero')}
          onNavigateContact={() => handleNavigate('contact')}
          onToggleTheme={handleToggleAmbient}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          isAmbient={isAmbient}
        />

        {/* Floating Scroll-to-Top Button */}
        <ScrollToTop />

        {/* Global Command Palette Quick Search [K] */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigateSection={handleNavigate}
          onSelectLocation={handleSelectLocation}
          onSelectSystem={(systemId) => {
            const found = SYSTEMS_DATA.find(s => s.id === systemId);
            if (found) {
              setPrefilledSystem(found.name);
            }
            handleNavigate('systems');
          }}
        />
      </div>
    </LanguageProvider>
  );
}


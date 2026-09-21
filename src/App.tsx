import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { FeaturedSystems } from './components/FeaturedSystems';
import { ScrollMethodSection } from './components/ScrollMethodSection';
import { VisualTransformation } from './components/VisualTransformation';
import { AboutStudioSection } from './components/AboutStudioSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LOCATIONS_DATA } from './data/locations';
import { InsightArticlePage } from './components/InsightArticlePage';

const LocationView = lazy(() => import('./components/LocationView').then(m => ({ default: m.LocationView })));
const LegalModal = lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));

export default function App() {
  const [activeLocationSlug, setActiveLocationSlug] = useState<string | null>(null);
  const [prefilledSystem, setPrefilledSystem] = useState<string | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const isInsightPage = window.location.pathname === '/insights/hidden-cost-fragmented-operational-information';

  // Sync hash routing for regional hub URLs (e.g. #locations/johannesburg)
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
    if (isInsightPage) {
    return <InsightArticlePage />;
  }

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

  const handleSystemInquiry = (systemName: string, problemDesc?: string) => {
    setPrefilledSystem(`${systemName}${problemDesc ? ` — ${problemDesc}` : ''}`);
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

  return (
    <div className="min-h-screen bg-[#080909] text-[#F3F0EA] flex flex-col font-sans selection:bg-[#C8AE82] selection:text-[#080909]">
      
      {/* Toast Notification Provider */}
      <Toaster 
        position="top-right" 
        richColors 
        closeButton 
        theme="dark"
      />

      {/* 01 — Header: Clean & Confident */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="flex-1">
        {activeLocationSlug && LOCATIONS_DATA[activeLocationSlug] ? (
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-[#888] font-mono text-xs">Loading regional intelligence...</div>}>
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
          </Suspense>
        ) : (
          <>
            {/* 02 — Hero: One Dominant Idea & Cinematic Visual */}
            <Hero 
              onExploreSystems={() => handleNavigate('systems')}
              onStartConversation={() => handleNavigate('contact')}
            />

            {/* 03 — The Problem: "Businesses don't need more software. They need better systems." */}
            <ProblemSection 
              onSelectOutcome={(outcome) => handleSystemInquiry('Commercial Focus', outcome)}
            />

            {/* 04 — Featured Systems: Flavourly · CargoIQ · RailWatch · Revenue OS */}
            <FeaturedSystems 
              onSelectSystem={handleSystemInquiry}
            />

            {/* 05 — Scroll-driven "How we work": Diagnosis → Prototype → Production */}
            <ScrollMethodSection 
              onStartDiagnosis={() => handleNavigate('contact')}
            />

            {/* 06 — Visual Proof: Operational Drag → NahaLabs Intelligence Layer → Transformed Precision */}
            <VisualTransformation />

            {/* 07 — About NahaLabs: High-conviction engineering from Johannesburg */}
            <AboutStudioSection 
              onStartConversation={() => handleNavigate('contact')}
            />

            {/* 08 — Final CTA: "There is probably something in your business that should work better. Let's find it." */}
            <ContactSection prefilledSystem={prefilledSystem} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onSelectLocation={handleSelectLocation}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Legal & Privacy Modal */}
      <Suspense fallback={null}>
        {legalModalType && (
          <LegalModal 
            type={legalModalType}
            onClose={() => setLegalModalType(null)}
          />
        )}
      </Suspense>

    </div>
  );
}

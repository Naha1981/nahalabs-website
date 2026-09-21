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
import { InsightArticlePage, InsightIndexPage } from './components/InsightArticlePage';
import { GeneratedInsightPage } from './components/GeneratedInsightPage';

const LocationView = lazy(() => import('./components/LocationView').then(m => ({ default: m.LocationView })));
const LegalModal = lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));

export default function App() {
  const [activeLocationSlug, setActiveLocationSlug] = useState<string | null>(null);
  const [prefilledSystem, setPrefilledSystem] = useState<string | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const isInsightsIndexPage = normalizedPath === '/insights';
  const isInsightArticlePage = normalizedPath === '/insights/hidden-cost-fragmented-operational-information';
  const generatedInsightSlug = normalizedPath.startsWith('/insights/') && !isInsightArticlePage
    ? normalizedPath.replace('/insights/', '')
    : null;

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
      if (hash === '' || hash === 'hero') setActiveLocationSlug(null);
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
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectLocation = (slug: string) => {
    setActiveLocationSlug(slug);
    window.location.hash = 'locations/' + slug;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSystemInquiry = (systemName: string, problemDesc?: string) => {
    setPrefilledSystem(systemName + (problemDesc ? ' — ' + problemDesc : ''));
    if (activeLocationSlug) setActiveLocationSlug(null);
    setTimeout(() => {
      const contactEl = document.getElementById('contact');
      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (isInsightsIndexPage) return <InsightIndexPage />;
  if (isInsightArticlePage) return <InsightArticlePage />;
  if (generatedInsightSlug) return <GeneratedInsightPage slug={generatedInsightSlug} />;

  return (
    <div className="min-h-screen bg-[#080909] text-[#F3F0EA] flex flex-col font-sans selection:bg-[#C8AE82] selection:text-[#080909]">
      <Toaster position="top-right" richColors closeButton theme="dark" />
      <Navbar onNavigate={handleNavigate} />
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
            <Hero onExploreSystems={() => handleNavigate('systems')} onStartConversation={() => handleNavigate('contact')} />
            <ProblemSection onSelectOutcome={(outcome) => handleSystemInquiry('Commercial Focus', outcome)} />
            <FeaturedSystems onSelectSystem={handleSystemInquiry} />
            <ScrollMethodSection onStartDiagnosis={() => handleNavigate('contact')} />
            <VisualTransformation />
            <AboutStudioSection onStartConversation={() => handleNavigate('contact')} />
            <ContactSection prefilledSystem={prefilledSystem} />
          </>
        )}
      </main>
      <Footer
        onNavigate={handleNavigate}
        onSelectLocation={handleSelectLocation}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />
      <Suspense fallback={null}>
        {legalModalType && <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />}
      </Suspense>
    </div>
  );
}

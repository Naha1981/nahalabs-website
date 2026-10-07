import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'sonner';
import { LightHome } from './components/LightHome';
import { LOCATIONS_DATA } from './data/locations';
import { InsightArticlePage, InsightIndexPage } from './components/InsightArticlePage';
import { GeneratedInsightPage } from './components/GeneratedInsightPage';
import { ContentMediaUploader } from './components/ContentMediaUploader';
import { EntityProfilePage } from './components/EntityProfilePage';
import { PublicSystemsPage } from './components/PublicSystemsPage';
import { PressPage } from './components/PressPage';
import { scrollBehavior } from './lib/motion';
import { RevenueDeskPage } from './components/RevenueDeskPage';
import { SiteShell } from './components/SiteShell';
import { AuditPage } from './components/AuditPage';
import { ContactSection } from './components/ContactSection';

const LocationView = lazy(() => import('./components/LocationView').then(m => ({ default: m.LocationView })));
const LegalModal = lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));

export default function App() {
  const rawPath =
    typeof window !== 'undefined'
      ? window.location.pathname
      : (globalThis as { __SSR_PATH__?: string }).__SSR_PATH__ ?? '/';
  const normalizedPath = rawPath.replace(/\/+$/, '') || '/';

  const locationPathMatch = normalizedPath.match(/^\/locations\/([a-z0-9-]+)$/);
  const locationPathSlug = locationPathMatch && LOCATIONS_DATA[locationPathMatch[1]] ? locationPathMatch[1] : null;

  const [activeLocationSlug, setActiveLocationSlug] = useState<string | null>(locationPathSlug);
  const [prefilledSystem, setPrefilledSystem] = useState<string | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const isAboutPage = normalizedPath === '/about';
  const isSystemsPage = normalizedPath === '/systems';
  const isPressPage = normalizedPath === '/press';
  const isRevenueDeskPage = normalizedPath === '/revenuedesk';
  const isInsightsIndexPage = normalizedPath === '/insights';
  const isInsightArticlePage = normalizedPath === '/insights/hidden-cost-fragmented-operational-information';
  const isAuditPage = normalizedPath === '/audit';
  const isContactPage = normalizedPath === '/contact';
  const isContentMediaAdmin = normalizedPath === '/content-admin';
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
          window.scrollTo({ top: 0, behavior: scrollBehavior() });
          return;
        }
      }
      if ((hash === '' || hash === 'hero') && !locationPathSlug) setActiveLocationSlug(null);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [locationPathSlug]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const id = window.location.hash.replace('#', '');
    if (!id || id.startsWith('locations/')) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const goHome = (sectionId?: string) => {
    window.location.assign('/' + (sectionId ? '#' + sectionId : ''));
  };

  const handleNavigate = (sectionId: string) => {
    const isHomeRoute = normalizedPath === '/';
    if (locationPathSlug || (!isHomeRoute && !activeLocationSlug)) {
      goHome(sectionId);
      return;
    }

    if (activeLocationSlug) {
      setActiveLocationSlug(null);
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: scrollBehavior() });
      }, 100);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: scrollBehavior() });
  };

  const handleSelectLocation = (slug: string) => {
    setActiveLocationSlug(slug);
    window.location.hash = 'locations/' + slug;
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  const handleSystemInquiry = (systemName: string, problemDesc?: string) => {
    setPrefilledSystem(systemName + (problemDesc ? ' — ' + problemDesc : ''));
    if (activeLocationSlug) setActiveLocationSlug(null);
    setTimeout(() => {
      const contactEl = document.getElementById('contact');
      if (contactEl) contactEl.scrollIntoView({ behavior: scrollBehavior() });
    }, 100);
  };

  if (isContentMediaAdmin) return <ContentMediaUploader />;

  const commonShellProps = {
    onNavigate: handleNavigate,
    onSelectLocation: handleSelectLocation,
    onOpenPrivacy: () => setLegalModalType('privacy'),
    onOpenTerms: () => setLegalModalType('terms'),
  };

  let pageContent: React.ReactNode;

  if (isAboutPage) {
    pageContent = <EntityProfilePage />;
  } else if (isSystemsPage) {
    pageContent = <PublicSystemsPage />;
  } else if (isPressPage) {
    pageContent = <PressPage />;
  } else if (isRevenueDeskPage) {
    pageContent = <RevenueDeskPage />;
  } else if (isInsightsIndexPage) {
    pageContent = <InsightIndexPage />;
  } else if (isInsightArticlePage) {
    pageContent = <InsightArticlePage />;
  } else if (isAuditPage) {
    pageContent = <AuditPage />;
  } else if (isContactPage) {
    pageContent = <ContactSection prefilledSystem={prefilledSystem} />;
  } else if (generatedInsightSlug) {
    pageContent = <GeneratedInsightPage slug={generatedInsightSlug} />;
  } else {
    pageContent = (
      <>
        {activeLocationSlug && LOCATIONS_DATA[activeLocationSlug] ? (
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-fg-3 text-sm">Loading regional pages…</div>}>
            <LocationView
              location={LOCATIONS_DATA[activeLocationSlug]}
              onBack={() => {
                if (locationPathSlug) {
                  goHome();
                  return;
                }
                setActiveLocationSlug(null);
                window.location.hash = '';
                window.scrollTo({ top: 0, behavior: scrollBehavior() });
              }}
              onContact={() => {
                if (locationPathSlug) {
                  goHome('contact');
                  return;
                }
                setActiveLocationSlug(null);
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: scrollBehavior() });
                }, 100);
              }}
            />
          </Suspense>
        ) : (
          <LightHome
            onStartConversation={() => handleNavigate('contact')}
          />
        )}
      </>
    );
  }

  return (
    <SiteShell {...commonShellProps}>
      <Toaster position="top-right" richColors closeButton theme="light" />
      {pageContent}
      <Suspense fallback={null}>
        {legalModalType && <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />}
      </Suspense>
    </SiteShell>
  );
}

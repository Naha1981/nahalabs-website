import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface SiteShellProps {
  children: React.ReactNode;
  onNavigate: (sectionId: string) => void;
  onSelectLocation: (slug: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const SiteShell: React.FC<SiteShellProps> = ({
  children,
  onNavigate,
  onSelectLocation,
  onOpenPrivacy,
  onOpenTerms,
}) => (
  <div className="min-h-screen bg-[#F2F4F7] text-[#0B0E10] flex flex-col font-sans selection:bg-[#355241] selection:text-white">
    <a href="#page-content" className="skip-link">Skip to content</a>
    <Navbar onNavigate={onNavigate} />
    <div id="page-content" tabIndex={-1} className="flex-1 outline-none">
      {children}
    </div>
    <Footer
      onNavigate={onNavigate}
      onSelectLocation={onSelectLocation}
      onOpenPrivacy={onOpenPrivacy}
      onOpenTerms={onOpenTerms}
    />
  </div>
);

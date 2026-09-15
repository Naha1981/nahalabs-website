import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the hero section or use fallback height
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        // Visible once the hero section has scrolled past the viewport top
        setIsVisible(rect.bottom < 100);
      } else {
        // Fallback: 500px scroll depth
        setIsVisible(window.scrollY > 500);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:right-36 z-40 print:hidden animate-in fade-in zoom-in-95 duration-200">
      <button
        onClick={scrollToTop}
        id="scroll-to-top-btn"
        aria-label="Scroll back to top of page"
        title="Scroll to top"
        className="group flex items-center justify-center w-10 h-10 rounded-full bg-[#121315]/90 hover:bg-[#1c1e22] text-[#A5A29B] hover:text-[#C8AE82] border border-[#2a2b2f] hover:border-[#C8AE82]/70 shadow-2xl backdrop-blur-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C8AE82]"
      >
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-[#C8AE82]" />
      </button>
    </div>
  );
};

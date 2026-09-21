import React, { useEffect, useRef } from 'react';

interface RevealProps {
  as?: 'div' | 'li' | 'article' | 'section';
  className?: string;
  children: React.ReactNode;
}

/**
 * Eases a block into view once. Visibility is only ever hidden when
 * `html.js-reveal` is set (main.tsx) so content is always readable without JS
 * or when the visitor prefers reduced motion.
 */
export const Reveal: React.FC<RevealProps> = ({ as = 'div', className = '', children }) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
};

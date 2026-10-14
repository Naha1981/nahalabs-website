import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
}

/** Magic UI marquee: content duplicated, track translated -50% on a CSS loop. */
export const Marquee: React.FC<MarqueeProps> = ({ children, reverse = false, duration = 32, className = '' }) => {
  return (
    <div className={`magicui-marquee ${className}`}>
      <div
        className={`magicui-marquee-track ${reverse ? 'is-reverse' : ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="magicui-marquee-group">{children}</div>
        <div className="magicui-marquee-group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
};

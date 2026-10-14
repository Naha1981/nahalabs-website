import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface TextAnimateProps {
  text: string;
  as?: 'h1' | 'h2' | 'p' | 'span';
  className?: string;
  /** Seconds before the first word moves. */
  delay?: number;
  /** Per-word stagger in seconds. */
  stagger?: number;
  /** Words rendered in the accent colour (matched against the split words). */
  accentFrom?: number;
}

/**
 * Magic UI "Text Animate" (blur variant): each word fades in from a soft blur
 * with a slight rise, staggered. Static single render under reduced motion.
 */
export const TextAnimate: React.FC<TextAnimateProps> = ({
  text,
  as = 'span',
  className = '',
  delay = 0,
  stagger = 0.055,
  accentFrom,
}) => {
  const reduced = useReducedMotion();
  const words = text.split(' ');
  const Tag = as as 'span';

  if (reduced) {
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <span key={i} className={accentFrom !== undefined && i >= accentFrom ? 'text-animate-accent' : undefined}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={`text-animate-word ${accentFrom !== undefined && i >= accentFrom ? 'text-animate-accent' : ''}`}
          initial={{ opacity: 0, y: '0.35em', filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: '0em', filter: 'blur(0px)' }}
          transition={{ duration: 0.55, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </Tag>
  );
};

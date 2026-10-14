import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface TextAnimateProps {
  text: string;
  as?: 'h1' | 'h2' | 'p' | 'span';
  className?: string;
  /** Seconds before the first piece moves. */
  delay?: number;
  /** Per-piece stagger in seconds. */
  stagger?: number;
  /** Split by word or by character. */
  by?: 'word' | 'char';
  /** Words rendered in the accent colour (matched against the split words). */
  accentFrom?: number;
}

/**
 * Magic UI "Text Animate": pieces fade in from a soft blur with a rise,
 * staggered. Word mode is a smooth editorial reveal; char mode is a springy
 * kinetic reveal. Static single render under reduced motion.
 */
export const TextAnimate: React.FC<TextAnimateProps> = ({
  text,
  as = 'span',
  className = '',
  delay = 0,
  stagger = 0.055,
  by = 'word',
  accentFrom,
}) => {
  const reduced = useReducedMotion();
  const words = text.split(' ');
  const Tag = as as 'span';

  if (by === 'char') {
    if (reduced) return <Tag className={className}>{text}</Tag>;
    return (
      <Tag className={className} aria-label={text}>
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="text-animate-char"
            initial={{ opacity: 0, y: '0.55em', rotate: 8, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: '0em', rotate: 0, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 210, damping: 22, mass: 0.7, delay: delay + i * stagger }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </Tag>
    );
  }

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
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </Tag>
  );
};

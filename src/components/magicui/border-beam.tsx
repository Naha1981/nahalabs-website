import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface BorderBeamProps {
  duration?: number;
  size?: number;
  className?: string;
}

/**
 * Magic UI border beam: a single accent segment travelling the element's
 * border via offset-path. Place inside a relatively-positioned parent.
 */
export const BorderBeam: React.FC<BorderBeamProps> = ({ duration = 9, size = 120, className = '' }) => {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <motion.span
      aria-hidden="true"
      className={`magicui-border-beam ${className}`}
      style={{ width: size }}
      initial={{ offsetDistance: '0%' }}
      animate={{ offsetDistance: ['0%', '100%'] }}
      transition={{ duration, ease: 'linear', repeat: Infinity }}
    />
  );
};

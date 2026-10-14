import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface MagneticProps {
  children: React.ReactNode;
  /** Max pull in px. Keep tiny - this should be felt, not seen. */
  strength?: number;
  className?: string;
}

/** Subtle magnetic hover: the child eases a few px toward the cursor. */
export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 5, className = '' }) => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={`magicui-magnetic ${className}`}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 16, mass: 0.4 }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        setOffset({ x: relX * strength * 2, y: relY * strength * 2 });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  );
};

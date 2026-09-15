import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      id="scroll-progress-bar"
      style={{ scaleX }}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#9C8358] via-[#C8AE82] to-[#E5D1B0] origin-left z-[100] pointer-events-none shadow-[0_1px_8px_rgba(200,174,130,0.6)]"
    />
  );
};

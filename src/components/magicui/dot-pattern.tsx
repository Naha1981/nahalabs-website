import React, { useId } from 'react';

interface DotPatternProps {
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
}

/** Magic UI-style dot grid. Pure SVG, masked radially so it fades at the edges. */
export const DotPattern: React.FC<DotPatternProps> = ({
  width = 22,
  height = 22,
  cx = 1,
  cy = 1,
  cr = 1,
  className = '',
}) => {
  const id = useId().replace(/[:]/g, '');
  return (
    <svg aria-hidden="true" className={`magicui-dot-pattern ${className}`}>
      <defs>
        <radialGradient id={`${id}-fade`}>
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-dots`} x="0" y="0" width={width} height={height} patternUnits="userSpaceOnUse">
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
        <mask id={`${id}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-dots)`} mask={`url(#${id}-mask)`} />
    </svg>
  );
};

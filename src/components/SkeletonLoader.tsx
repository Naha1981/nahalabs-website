import React from 'react';

/**
 * SystemCardSkeleton
 * Matches the exact dimensions and layout of the SystemsPortfolio cards.
 */
export const SystemCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-sm bg-[#121314] border border-[#222222] p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden animate-pulse">
      {/* Top Shimmer line */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-[shimmer_2s_infinite]" />

      <div>
        {/* Category & Status Badges */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="h-4 w-28 bg-[#202225] rounded" />
          <div className="h-4 w-20 bg-[#1c1e20] rounded-full" />
        </div>

        {/* System Title */}
        <div className="h-7 w-3/4 bg-[#232528] rounded mb-3" />
        
        {/* Tagline */}
        <div className="h-4 w-1/2 bg-[#1c1e20] rounded mb-4" />

        {/* Description lines */}
        <div className="space-y-2 mb-6">
          <div className="h-3 w-full bg-[#181a1c] rounded" />
          <div className="h-3 w-5/6 bg-[#181a1c] rounded" />
          <div className="h-3 w-4/6 bg-[#181a1c] rounded" />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded bg-[#161719] border border-[#202224] mb-6">
          <div className="space-y-1">
            <div className="h-2.5 w-16 bg-[#25282b] rounded" />
            <div className="h-5 w-20 bg-[#2b2e32] rounded" />
          </div>
          <div className="space-y-1">
            <div className="h-2.5 w-16 bg-[#25282b] rounded" />
            <div className="h-5 w-20 bg-[#2b2e32] rounded" />
          </div>
        </div>
      </div>

      {/* Action CTA buttons */}
      <div className="flex items-center gap-3 pt-4 border-t border-[#1f2022]">
        <div className="h-9 flex-1 bg-[#202225] rounded-full" />
        <div className="h-9 w-24 bg-[#1a1c1e] rounded-full" />
      </div>
    </div>
  );
};

/**
 * TestimonialCardSkeleton
 * Matches the layout of the Testimonials & Outcomes section.
 */
export const TestimonialCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-sm bg-[#121315] border border-[#262626] p-8 sm:p-12 relative overflow-hidden animate-pulse">
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-[shimmer_2s_infinite]" />

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8">
        {/* Left: Client and deployment metadata */}
        <div className="space-y-3">
          <div className="h-3.5 w-36 bg-[#222428] rounded font-mono" />
          <div className="h-6 w-56 bg-[#2a2c30] rounded" />
          <div className="h-3.5 w-44 bg-[#1f2024] rounded" />
          <div className="h-3 w-48 bg-[#1a1c1e] rounded" />
        </div>

        {/* Right: Verification Stamp */}
        <div className="h-10 w-48 bg-[#1b1d20] rounded border border-[#282a2e]" />
      </div>

      {/* Quote Headline */}
      <div className="h-7 w-4/5 bg-[#26282d] rounded mb-6" />

      {/* Quote Paragraphs */}
      <div className="space-y-2.5 mb-10 max-w-4xl">
        <div className="h-4 w-full bg-[#1c1e22] rounded" />
        <div className="h-4 w-11/12 bg-[#1c1e22] rounded" />
        <div className="h-4 w-5/6 bg-[#1c1e22] rounded" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#222]">
        {[0, 1, 2].map(i => (
          <div key={i} className="p-4 rounded bg-[#161719] border border-[#222428] space-y-2">
            <div className="h-3 w-24 bg-[#232529] rounded" />
            <div className="h-7 w-20 bg-[#2e3136] rounded" />
            <div className="h-2.5 w-28 bg-[#1c1e22] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { ASSETS } from '../data/assets';

interface HeroProps {
  onExploreSystems: () => void;
  onStartConversation: () => void;
}

/**
 * One message, one supporting explanation, one dominant visual,
 * one primary action and one quiet secondary action.
 */
export const Hero: React.FC<HeroProps> = ({ onExploreSystems, onStartConversation }) => {
  return (
    <section
      id="hero"
      data-tone="dark"
      className="bg-canvas text-fg pt-[calc(var(--header-h)+clamp(2rem,5vw,4.5rem))] pb-[var(--section-y)]"
    >
      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12 items-center">
        <div className="hero-in lg:col-span-7">
          <h1 className="font-serif text-display font-medium">
            We engineer intelligent systems for businesses that have something worth fixing.
          </h1>

          <p className="mt-7 max-w-[34rem] text-lead text-fg-2">
            NahaLabs is an intelligent systems engineering company in Johannesburg, South Africa. We find
            where your operations are quietly losing money, then engineer the systems, AI digital workers
            and automations that fix it.
          </p>

          <div className="mt-10 flex flex-col items-stretch sm:flex-row sm:items-center gap-x-8 gap-y-2">
            <button type="button" onClick={onExploreSystems} id="hero-explore-cta" className="btn btn-primary">
              Explore our systems
            </button>
            <button type="button" onClick={onStartConversation} id="hero-conversation-cta" className="link">
              Start a conversation
            </button>
          </div>
        </div>

        <figure className="hero-visual lg:col-span-5 m-0">
          <picture>
            <source srcSet={ASSETS.hero} type="image/webp" />
            <img
              src={ASSETS.heroJpg}
              alt="A NahaLabs business intelligence system installed on a mountain ridge above a South African city at dusk"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              width={1280}
              height={1280}
              className="w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] object-cover rounded-sm ring-1 ring-line"
            />
          </picture>
        </figure>
      </div>
    </section>
  );
};

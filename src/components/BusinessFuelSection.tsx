import React, { useState } from 'react';
import { FUEL_PILLARS } from '../data/narrative';
import { RefreshCw, Zap, TrendingUp, ShieldAlert, Cpu, Users, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export const BusinessFuelSection: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const { lang, t } = useLanguage();

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'revenue': return <TrendingUp className="w-6 h-6 text-[#C8AE82]" />;
      case 'speed': return <Zap className="w-6 h-6 text-[#C8AE82]" />;
      case 'control': return <ShieldAlert className="w-6 h-6 text-[#C8AE82]" />;
      case 'intelligence': return <Cpu className="w-6 h-6 text-[#C8AE82]" />;
      case 'capacity': return <Users className="w-6 h-6 text-[#C8AE82]" />;
      default: return <RefreshCw className="w-6 h-6 text-[#C8AE82]" />;
    }
  };

  return (
    <section id="fuel" className="py-24 sm:py-32 bg-[#080909] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 sm:mb-20"
        >
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151515] border border-[#262626] text-[11px] font-mono tracking-widest text-[#C8AE82] uppercase">
              <span>{t.businessFuel.badge}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121315] border border-[#25272a] text-[11px] font-mono text-[#A5A29B] tracking-wider">
              <Clock className="w-3.5 h-3.5 text-[#C8AE82]" />
              <span>{lang === 'st' ? 'Ho bala: metsotso e 3' : '3 min read'}</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.1]">
            {t.businessFuel.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A5A29B]">
            {t.businessFuel.subtitle}
          </p>
        </motion.div>

        {/* The 5 Architectural 3D Flipping Cards with Staggered Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {FUEL_PILLARS.map((pillar, idx) => {
            const isFlipped = !!flippedCards[pillar.id];

            return (
              <motion.div 
                key={pillar.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-[380px] perspective-1000 cursor-pointer group"
                onClick={() => toggleFlip(pillar.id)}
                onMouseEnter={() => setFlippedCards(prev => ({ ...prev, [pillar.id]: true }))}
                onMouseLeave={() => setFlippedCards(prev => ({ ...prev, [pillar.id]: false }))}
                role="button"
                tabIndex={0}
                aria-label={`Pillar ${pillar.title}: ${pillar.explanation}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFlip(pillar.id);
                  }
                }}
              >
                {/* 3D Inner Container */}
                <div 
                  className={`relative w-full h-full duration-500 transform-style-3d transition-transform ease-out ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rounded-sm bg-[#121314] border border-[#262626] group-hover:border-[#C8AE82]/50 p-6 flex flex-col justify-between transition-colors shadow-lg">
                    
                    {/* Top Index & Icon */}
                    <div className="flex items-center justify-between border-b border-[#222222] pb-4">
                      <span className="font-mono text-xs text-[#A5A29B] tracking-widest">
                        0{idx + 1} / FUEL
                      </span>
                      <div className="p-2 rounded bg-[#181818] border border-[#2a2a2a]">
                        {getIcon(pillar.id)}
                      </div>
                    </div>

                    {/* Center Wordmark */}
                    <div className="my-auto py-6">
                      <div className="text-[10px] font-mono tracking-widest text-[#C8AE82] uppercase mb-1">
                        PILLAR TARGET
                      </div>
                      <h3 className="text-3xl xl:text-2xl 2xl:text-3xl font-black tracking-tight text-[#F3F0EA] uppercase">
                        {pillar.title}
                      </h3>
                      <div className="w-8 h-[2px] bg-[#C8AE82] mt-3 group-hover:w-16 transition-all duration-300" />
                    </div>

                    {/* Bottom Prompt */}
                    <div className="pt-4 border-t border-[#222222] flex items-center justify-between text-[11px] font-mono text-[#A5A29B]">
                      <span className="tracking-wider">{pillar.shortTag}</span>
                      <span className="text-[#C8AE82] text-xs">REVEAL →</span>
                    </div>
                  </div>

                  {/* BACK FACE (Rotated 180 deg) */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-sm bg-[#161719] border border-[#C8AE82] p-6 flex flex-col justify-between shadow-2xl">
                    
                    {/* Top Status */}
                    <div className="flex items-center justify-between border-b border-[#2c2c2c] pb-3">
                      <span className="text-[10px] font-mono text-[#C8AE82] tracking-widest uppercase">
                        {pillar.title} ARCHITECTURE
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#C8AE82]" />
                    </div>

                    {/* Middle Detailed Explanation */}
                    <div className="my-auto space-y-3">
                      <p className="text-sm font-bold text-[#F3F0EA] leading-snug">
                        {pillar.explanation}
                      </p>
                      <p className="text-xs text-[#A5A29B] leading-relaxed">
                        {pillar.operationalOutcome}
                      </p>
                    </div>

                    {/* Bottom Action Note */}
                    <div className="pt-3 border-t border-[#2c2c2c] text-[10px] font-mono text-[#C8AE82] tracking-wider uppercase flex items-center justify-between">
                      <span>ENGINEERED IMPACT</span>
                      <span>ACTIVE</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quote Strip below Cards with Scroll Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 p-6 rounded-sm bg-[#121314] border-l-2 border-[#C8AE82] border-y border-r border-[#222222] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-sm sm:text-base text-[#F3F0EA] italic font-medium">
            "NahaLabs gives businesses the intelligence, automation and systems they need to create momentum."
          </p>
          <span className="text-xs font-mono text-[#C8AE82] whitespace-nowrap uppercase tracking-widest">
            OPERATIONAL VELOCITY
          </span>
        </motion.div>

      </div>
    </section>
  );
};

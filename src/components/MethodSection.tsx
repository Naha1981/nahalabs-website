import React from 'react';
import { Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const MethodSection: React.FC = () => {
  const { t } = useLanguage();
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
  });

  const stages = t.method.stages;

  return (
    <section 
      id="method"
      ref={sectionRef} 
      className="py-24 sm:py-36 bg-[#0a0b0c] border-b border-[#181818] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with scroll animation */}
        <div 
          className={`max-w-3xl mb-16 sm:mb-20 transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151515] border border-[#262626] text-[11px] font-mono tracking-widest text-[#C8AE82] uppercase mb-4">
            <Compass className="w-3.5 h-3.5 text-[#C8AE82]" />
            <span>{t.method.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.1]">
            {t.method.titleLine1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] to-[#C8AE82]">
              {t.method.titleLine2}
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A5A29B]">
            {t.method.lead}
          </p>
        </div>

        {/* 6 Stages Grid with staggered intersection animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {stages.map((st, idx) => (
            <div
              key={st.num}
              style={{
                transitionDelay: `${idx * 110}ms`,
              }}
              className={`p-8 rounded-sm bg-[#121314] border border-[#222222] hover:border-[#C8AE82]/50 transition-all duration-700 ease-out flex flex-col justify-between transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-4 mb-5">
                  <span className="font-mono text-xl font-bold text-[#C8AE82]">
                    {st.num}
                  </span>
                  <span className="text-[10px] font-mono text-[#A5A29B] uppercase tracking-widest">
                    STAGE
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-[#F3F0EA] mb-3">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A5A29B] leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1a1a1a] flex items-center justify-between text-[11px] font-mono text-[#777]">
                <span>{t.method.verifiedGateway}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8AE82]" />
              </div>
            </div>
          ))}
        </div>

        {/* The Signature Progression Banner */}
        <div 
          style={{ transitionDelay: '700ms' }}
          className={`mt-16 p-8 sm:p-10 rounded-sm bg-[#151618] border border-[#2c2c2c] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <span className="text-[10px] font-mono text-[#C8AE82] uppercase tracking-widest block mb-1">
              {t.method.signatureBadge}
            </span>
            <div className="text-xl sm:text-3xl font-black text-[#F3F0EA] flex flex-wrap items-center gap-3">
              <span>{t.method.signatureFlow[0]}</span>
              <span className="text-[#C8AE82]">→</span>
              <span>{t.method.signatureFlow[1]}</span>
              <span className="text-[#C8AE82]">→</span>
              <span>{t.method.signatureFlow[2]}</span>
            </div>
          </div>
          <div className="text-xs font-mono text-[#A5A29B] max-w-sm">
            {t.method.signatureDesc}
          </div>
        </div>

      </div>
    </section>
  );
};


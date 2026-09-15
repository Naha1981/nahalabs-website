import React from 'react';
import { Terminal, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const ManifestoSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const realities = lang === 'st' ? [
    {
      num: '01',
      titleHighlight: 'SOFTWARE E TLOAELEHILENG.',
      titlePrefix: 'E BOHLALE HAHOLO HO FETISISA',
      description: 'Software e tloaelehileng (SaaS) e qobella mekhoa ea hau e ikhethang ho kena mabokoseng a thata. Ha mokhoa oa hau oa tsamaiso e le ona o o fang phaello, software e tloaelehileng ea sitoa.'
    },
    {
      num: '02',
      titleHighlight: 'BOPHALALATSI BA LITŠA BOTEKGENIKI.',
      titlePrefix: 'E KHETHEHILE HAHOLO HO FETISISA',
      description: 'Lipampiri tsa boeletsi le lipuo tsa likopano ha li sebetse li-invoice tsa lipalangoang, kapa ho laola thepa ea lireschorente. Boeletsi bo se nang mechine e sebetsang ea tlhahiso ha bo fane ka phaello ea moruo.'
    },
    {
      num: '03',
      titleHighlight: 'HO SEBETSA KA MATSOHO.',
      titlePrefix: 'E BOHLOKWA HAHOLO HO KA',
      description: 'Basebetsi ba qetang nako e ngata ea letsatsi ba kopitsa lipalo lipakeng tsa li-spreadsheet tse arohaneng ba liehisa mosebetsi ebile ba baka liphoso tse turang lefatšeng la kajeno la boiketsetso.'
    }
  ] : [
    {
      num: '01',
      titleHighlight: 'OFF-THE-SHELF SOFTWARE.',
      titlePrefix: 'TOO SOPHISTICATED FOR',
      description: 'Generic SaaS forces your unique margin advantages into rigid predefined boxes. When your operational logic is what sets you apart, off-the-shelf software breaks down.'
    },
    {
      num: '02',
      titleHighlight: 'GENERIC CONSULTING.',
      titlePrefix: 'TOO SPECIFIC FOR',
      description: 'Consulting slide decks do not process freight invoices, allocate restaurant floor inventory, or triage high-volume customer intent. Advice without working production machinery produces zero economic return.'
    },
    {
      num: '03',
      titleHighlight: 'MANAGE MANUALLY.',
      titlePrefix: 'TOO IMPORTANT TO',
      description: 'Human employees spending 40% of their workday copy-pasting numbers across disparate spreadsheets are error-prone, slow, and expensive bottlenecks in an increasingly automated world.'
    }
  ];

  return (
    <section 
      id="manifesto" 
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#0a0b0c] border-y border-[#181818] overflow-hidden"
    >
      {/* Subtle architectural vertical lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-10">
        <div className="w-[1px] h-full bg-[#C8AE82]" />
        <div className="w-[1px] h-full bg-[#C8AE82] hidden md:block" />
        <div className="w-[1px] h-full bg-[#C8AE82]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Intersection Observer slide-up */}
        <div 
          className={`flex items-center justify-between flex-wrap gap-3 mb-12 sm:mb-16 transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#C8AE82]" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#C8AE82] uppercase">
              {t.manifesto.badge}
            </span>
          </div>

          {/* Reading Time Estimate Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121315] border border-[#25272a] text-[11px] font-mono text-[#A5A29B] tracking-wider">
            <Clock className="w-3.5 h-3.5 text-[#C8AE82]" />
            <span>{lang === 'st' ? 'Ho bala: metsotso e 2' : '2 min read'}</span>
          </div>
        </div>

        {/* The Three Core Architectural Realities with Staggered Scroll-Triggered Motion */}
        <div className="space-y-10 sm:space-y-16">
          {realities.map((item, idx) => (
            <div 
              key={item.num}
              style={{ transitionDelay: `${idx * 150}ms` }}
              className={`group border-l-2 border-[#222222] hover:border-[#C8AE82] transition-all duration-700 ease-out pl-6 sm:pl-10 py-2 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-[11px] font-mono text-[#A5A29B] tracking-widest block mb-2">
                REALITY {item.num}
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.1]">
                {item.titlePrefix} <br className="hidden sm:inline" />
                <span className="text-[#A5A29B] group-hover:text-[#F3F0EA] transition-colors">
                  {item.titleHighlight}
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#777] max-w-2xl">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* The Climax Resolution with Scroll Motion */}
        <div 
          style={{ transitionDelay: '500ms' }}
          className={`mt-20 sm:mt-28 p-8 sm:p-12 rounded-sm bg-[#121314] border border-[#262626] relative transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.98]'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-[#C8AE82] tracking-[0.2em] uppercase">
                {t.manifesto.resolution}
              </div>
              <p className="text-3xl sm:text-4xl font-black tracking-tight text-[#F3F0EA]">
                {t.manifesto.resolutionTitle}
              </p>
              <p className="text-base sm:text-lg text-[#A5A29B] max-w-2xl pt-2">
                {t.manifesto.resolutionText}
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto border-t md:border-t-0 md:border-l border-[#262626] pt-4 md:pt-0 md:pl-8 text-xs font-mono text-[#A5A29B]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#C8AE82]" />
              <span>{lang === 'st' ? 'LESETHE LA BOENJINERE LA JOHANNESBURG LE LESOTHO' : 'JOHANNESBURG & LESOTHO ENGINEERING DESK'}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


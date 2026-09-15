import React, { useState } from 'react';
import { FORMULA_LAYERS } from '../data/narrative';
import { ArchitectureCore } from './ArchitectureCore';
import { Database, Cpu, Laptop, Network, Rocket, ChevronRight, Check } from 'lucide-react';

export const IntelligenceFormula: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('data');

  const getLayerIcon = (id: string) => {
    switch (id) {
      case 'data': return <Database className="w-5 h-5 text-[#C8AE82]" />;
      case 'intelligence': return <Cpu className="w-5 h-5 text-[#C8AE82]" />;
      case 'software': return <Laptop className="w-5 h-5 text-[#C8AE82]" />;
      case 'integration': return <Network className="w-5 h-5 text-[#C8AE82]" />;
      case 'action': return <Rocket className="w-5 h-5 text-[#C8AE82]" />;
      default: return <Cpu className="w-5 h-5 text-[#C8AE82]" />;
    }
  };

  const selectedLayer = FORMULA_LAYERS.find(l => l.id === selectedLayerId) || FORMULA_LAYERS[0];

  return (
    <section id="solutions" className="py-24 sm:py-36 bg-[#0a0b0c] border-b border-[#181818] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#151515] border border-[#262626] text-[11px] font-mono tracking-widest text-[#C8AE82] uppercase mb-4">
            <span>05 / THE INTELLIGENCE FORMULA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F0EA] leading-[1.1]">
            WHAT’S INSIDE.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A5A29B]">
            From raw, unmanaged ground signals to autonomous business execution. Each layer is engineered around the physics of your balance sheet.
          </p>
        </div>

        {/* 2-Column Layout: Stack on Left, Deep inspection / Architecture Core on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 5 Sequential Layers */}
          <div className="lg:col-span-6 space-y-3">
            {FORMULA_LAYERS.map((layer) => {
              const isSelected = selectedLayerId === layer.id;

              return (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`p-5 rounded-sm border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#151618] border-[#C8AE82] shadow-xl shadow-[#C8AE82]/10 translate-x-1.5'
                      : 'bg-[#101112] border-[#222222] hover:border-[#333333]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded bg-[#1a1a1b] border border-[#262626]">
                      {getLayerIcon(layer.id)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#A5A29B]">
                          LAYER {layer.layerNumber}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C8AE82]" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-[#F3F0EA] tracking-wide">
                        {layer.title}
                      </h3>
                      <p className="text-xs text-[#A5A29B]">
                        {layer.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 text-[#C8AE82] transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
                </div>
              );
            })}

            {/* Terminal Outcome Block */}
            <div className="p-6 rounded-sm bg-[#141517] border-2 border-[#C8AE82]/80 mt-6 shadow-2xl">
              <span className="text-[10px] font-mono text-[#C8AE82] tracking-widest uppercase block mb-1">
                SYSTEMIC RESULT
              </span>
              <p className="text-lg sm:text-xl font-black tracking-tight text-[#F3F0EA]">
                MEASURABLE BUSINESS IMPACT
              </p>
              <p className="text-xs text-[#A5A29B] mt-1">
                Every layer converges to recover cash, eliminate manual errors, and create durable operational momentum.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Layer Inspector + Architecture Core Canvas */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Selected Layer Components Inspection */}
            <div className="bg-[#121314] rounded-sm border border-[#262626] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#222222] pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#C8AE82] uppercase tracking-widest block">
                    INSPECTING LAYER {selectedLayer.layerNumber}
                  </span>
                  <h4 className="text-2xl font-black text-[#F3F0EA]">
                    {selectedLayer.title}
                  </h4>
                </div>
                <div className="text-xs font-mono text-[#A5A29B]">
                  {selectedLayer.subtitle}
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[11px] font-mono text-[#A5A29B] uppercase tracking-wider">
                  ACTIVE COMPONENTS & PROTOCOLS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedLayer.components.map((comp, idx) => (
                    <div 
                      key={idx}
                      className="p-2.5 rounded bg-[#18191b] border border-[#262626] text-xs text-[#F3F0EA] flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-[#C8AE82] shrink-0" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#222222]">
                  <span className="text-[10px] font-mono text-[#C8AE82] uppercase tracking-widest block mb-1">
                    LAYER OUTPUT STATE
                  </span>
                  <p className="text-xs text-[#A5A29B] font-medium leading-relaxed bg-[#161718] p-3 rounded border border-[#222222]">
                    {selectedLayer.outputState}
                  </p>
                </div>
              </div>
            </div>

            {/* Restrained Architectural 3D Core Canvas */}
            <ArchitectureCore />

          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useEffect, useRef, useState } from 'react';

export const ArchitectureCore: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeSignal, setActiveSignal] = useState<'SIGNAL' | 'INTELLIGENCE' | 'ACTION'>('SIGNAL');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 480);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };

    window.addEventListener('resize', handleResize);

    // Nodes definition
    const nodeCount = 18;
    const nodes = Array.from({ length: nodeCount }, (_, i) => {
      const theta = (i / nodeCount) * Math.PI * 2;
      return {
        baseTheta: theta,
        radius: 70 + (i % 3) * 35,
        speed: 0.005 * ((i % 2 === 0 ? 1 : -1) * (1 + (i % 3) * 0.4)),
        pulseOffset: i * 0.4
      };
    });

    const render = () => {
      angle += 0.008;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw concentric architectural rings
      const rings = [60, 95, 130];
      rings.forEach((r, idx) => {
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, r, r * 0.48, angle * (idx % 2 === 0 ? 0.3 : -0.2), 0, Math.PI * 2);
        ctx.strokeStyle = idx === 1 ? 'rgba(200, 174, 130, 0.4)' : 'rgba(70, 70, 70, 0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw data channel cross-chords
      ctx.strokeStyle = 'rgba(200, 174, 130, 0.12)';
      ctx.lineWidth = 0.8;

      const currentPoints: { x: number; y: number }[] = [];

      nodes.forEach((n, i) => {
        const currentTheta = n.baseTheta + angle * (i % 2 === 0 ? 1.2 : -0.8);
        const x = centerX + Math.cos(currentTheta) * n.radius;
        const y = centerY + Math.sin(currentTheta) * (n.radius * 0.48);
        currentPoints.push({ x, y });

        // Connect adjacent points
        if (i > 0 && i % 2 === 0) {
          ctx.beginPath();
          ctx.moveTo(currentPoints[i - 1].x, currentPoints[i - 1].y);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      });

      // Draw central core hub
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#C8AE82';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 16 + Math.sin(angle * 3) * 3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(200, 174, 130, 0.5)';
      ctx.stroke();

      // Draw nodes
      currentPoints.forEach((p, i) => {
        ctx.beginPath();
        const pulse = 2.5 + Math.sin(angle * 4 + i) * 1.2;
        ctx.arc(p.x, p.y, pulse, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? '#E5D1B0' : '#A5A29B';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full rounded-sm bg-[#0e0f10] border border-[#222222] p-6 flex flex-col items-center overflow-hidden">
      {/* Top Telemetry Header */}
      <div className="w-full flex items-center justify-between border-b border-[#1f2022] pb-3 text-[10px] font-mono text-[#A5A29B]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C8AE82] animate-pulse" />
          <span className="text-[#C8AE82]">NAHALABS ARCHITECTURAL CORE</span>
        </div>
        <span>TOPOLOGY: DISTRIBUTED / MCP</span>
      </div>

      {/* Canvas */}
      <div className="w-full relative h-[360px] flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full block" />
        
        {/* Architectural Crosshair Overlays */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
          <div className="w-[1px] h-32 bg-[#C8AE82]" />
          <div className="h-[1px] w-32 bg-[#C8AE82] absolute" />
        </div>
      </div>

      {/* Dynamic Signal State Resolver */}
      <div className="w-full pt-4 border-t border-[#1f2022] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#A5A29B]">
          <span>RESOLUTION:</span>
          <span className="text-[#F3F0EA] font-semibold">SIGNAL → UNDERSTAND → REASON → ACT</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#18181a] border border-[#2c2c2c] text-[#C8AE82]">
            LATENCY: 12ms
          </span>
          <span className="px-2 py-0.5 rounded bg-[#18181a] border border-[#2c2c2c] text-[#F3F0EA]">
            JHB REGION
          </span>
        </div>
      </div>
    </div>
  );
};

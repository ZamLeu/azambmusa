import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { RetroTerminal3D, TERMINAL_SECTIONS } from './canvas/RetroTerminal3D';
import { portfolioData } from '../data/portfolioData';
import { ArrowDown, Mail, ExternalLink } from 'lucide-react';

export interface RetroHeroHandle {
  resetCamera: () => void;
}

interface RetroHeroProps {
  onNavigateSection: (sectionId: string) => void;
}

export const RetroHero = forwardRef<RetroHeroHandle, RetroHeroProps>(({ onNavigateSection }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalInstance = useRef<RetroTerminal3D | null>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useImperativeHandle(ref, () => ({
    resetCamera: () => {
      if (terminalInstance.current) {
        terminalInstance.current.resetOrientation();
      }
    }
  }));

  useEffect(() => {
    if (containerRef.current) {
      terminalInstance.current = new RetroTerminal3D(
        containerRef.current,
        (sectionId) => {
          onNavigateSection(sectionId);
        }
      );
    }
    return () => {
      if (terminalInstance.current) {
        terminalInstance.current.destroy();
        terminalInstance.current = null;
      }
    };
  }, [onNavigateSection]);

  const handleSelectMenu = (idx: number) => {
    setSelectedIdx(idx);
    if (terminalInstance.current) {
      terminalInstance.current.setActiveSection(idx);
    }
  };

  const handleExecuteLaunch = (idx?: number) => {
    const targetIdx = idx !== undefined ? idx : selectedIdx;
    setSelectedIdx(targetIdx);
    if (terminalInstance.current) {
      terminalInstance.current.setActiveSection(targetIdx);
      terminalInstance.current.triggerLaunchCurrentSection(TERMINAL_SECTIONS[targetIdx].id);
    } else {
      onNavigateSection(TERMINAL_SECTIONS[targetIdx].id);
    }
  };

  return (
    <section id="hero" className="py-10 sm:py-16 md:py-20 border-b-2 border-[#0D0D0D] dark:border-[#E5E5E2] transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Introduction & Metadata only */}
        <div className="lg:col-span-6 flex flex-col items-start font-mono">
          {/* Status Flag */}
          <div className="text-xs font-mono tracking-wider text-[#0D0D0D] dark:text-[#F4F4F2] uppercase mb-4 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-[#059669] dark:bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse shrink-0" />
            <span>SYS.READY : {portfolioData.personal.availability}</span>
          </div>

          {/* Chunky Pixel Headline */}
          <h1 className="font-pixel text-2xl sm:text-4xl md:text-5xl text-[#0D0D0D] dark:text-[#F4F4F2] tracking-tight leading-[1.25] mb-4 uppercase">
            HEY, I'M azam
          </h1>

          {/* Role & Name */}
          <div className="text-xs sm:text-sm font-bold text-[#0D0D0D] dark:text-[#F4F4F2] mb-4">
            {portfolioData.personal.fullName} // {portfolioData.personal.title}
          </div>

          {/* Professional Introduction */}
          <p className="text-xs sm:text-sm text-[#0D0D0D] dark:text-[#EAEAE8] leading-[1.7] max-w-xl mb-6">
            {portfolioData.personal.summary}
          </p>

          {/* 16:9 Operator CRT Viewfinder & Personnel Dossier */}
          <div className="w-full max-w-xl mb-8 bg-[#EAEAE8] dark:bg-[#1A1A1A] border-2 border-[#0D0D0D] dark:border-[#E5E5E2] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#E5E5E2] overflow-hidden transition-colors">
            {/* Viewfinder Header Bar */}
            <div className="bg-[#0D0D0D] dark:bg-[#000000] text-[#F4F4F2] px-3 py-1.5 flex items-center justify-between text-[10px] font-mono border-b-2 border-[#0D0D0D] dark:border-[#E5E5E2]">
              <span className="font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,0.6)] animate-pulse" />
                [CAM_01 // OPERATOR_LIVE_FEED]
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px]">
                <span className="text-[#059669] dark:text-[#10B981] font-bold">REC ●</span>
                <span className="text-[#8E8E8A] hidden sm:inline">60FPS // 1080p</span>
              </span>
            </div>

            {/* Viewfinder 16:9 Screen Display */}
            <div className="relative w-full aspect-video bg-[#0D0D0D] overflow-hidden group select-none">
              <img
                src="/azam.jpeg"
                alt={portfolioData.personal.fullName}
                className="w-full h-full object-cover object-center grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
              />

              {/* CRT Scanlines Overlay */}
              <div className="absolute inset-0 scanlines pointer-events-none opacity-25" />

              {/* Viewfinder HUD Corner Brackets */}
              <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#F4F4F2]/80 pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#F4F4F2]/80 pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#F4F4F2]/80 pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#F4F4F2]/80 pointer-events-none" />

              {/* Viewfinder Center Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                <div className="w-6 h-px bg-[#F4F4F2]" />
                <div className="h-6 w-px bg-[#F4F4F2] -ml-3" />
              </div>

              {/* Overlay Metadata Chips */}
              <div className="absolute bottom-2 inset-x-3 flex items-center justify-between text-[9px] font-mono pointer-events-none z-10">
                <span className="bg-[#0D0D0D]/85 dark:bg-black/90 text-[#F4F4F2] px-1.5 py-0.5 border border-[#444]">
                  OPERATOR // 0xAZAM
                </span>
                <span className="bg-[#0D0D0D]/85 dark:bg-black/90 text-[#059669] dark:text-[#10B981] font-bold px-1.5 py-0.5 border border-[#444]">
                  BERANANG, MY // 2.88°N 101.87°E
                </span>
              </div>
            </div>

            {/* Personnel Specs Grid below 16:9 feed */}
            <div className="grid grid-cols-2 sm:grid-cols-[0.8fr_1.1fr_1fr_1.4fr] divide-y sm:divide-y-0 sm:divide-x border-t-2 border-[#0D0D0D] dark:border-[#E5E5E2] divide-[#0D0D0D]/15 dark:divide-[#E5E5E2]/20 text-[11px] sm:text-xs font-mono bg-[#F4F4F2] dark:bg-[#121212]">
              <div className="p-2 sm:p-2.5">
                <span className="text-[#666663] dark:text-[#A0A09C] block text-[9px] uppercase font-bold">OPERATOR</span>
                <span className="text-[#0D0D0D] dark:text-[#F4F4F2] font-bold block whitespace-nowrap">LEUU</span>
              </div>
              <div className="p-2 sm:p-2.5">
                <span className="text-[#666663] dark:text-[#A0A09C] block text-[9px] uppercase font-bold">BASE</span>
                <span className="text-[#0D0D0D] dark:text-[#F4F4F2] font-bold block whitespace-nowrap">BERANANG, MY</span>
              </div>
              <div className="p-2 sm:p-2.5">
                <span className="text-[#666663] dark:text-[#A0A09C] block text-[9px] uppercase font-bold">EDUCATION</span>
                <span className="text-[#0D0D0D] dark:text-[#F4F4F2] font-bold block whitespace-nowrap">BCS @ USAS</span>
              </div>
              <div className="p-2 sm:p-2.5">
                <span className="text-[#666663] dark:text-[#A0A09C] block text-[9px] uppercase font-bold">FOCUS</span>
                <span className="text-[#059669] dark:text-[#10B981] font-bold block whitespace-nowrap">FULL-STACK / WEB</span>
              </div>
            </div>
          </div>

          {/* Professional Action Bar for Recruiters / Collaborators */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="px-4 py-2 bg-[#0D0D0D] dark:bg-[#E5E5E2] text-[#F4F4F2] dark:text-[#0D0D0D] text-xs font-bold uppercase tracking-wider border-2 border-[#0D0D0D] dark:border-[#E5E5E2] hover:bg-[#F4F4F2] hover:text-[#0D0D0D] dark:hover:bg-[#121212] dark:hover:text-[#F4F4F2] shadow-[3px_3px_0px_#0D0D0D] dark:shadow-[3px_3px_0px_#E5E5E2] transition-colors flex items-center gap-2"
            >
              <Mail size={13} />
              <span>GET IN TOUCH</span>
            </a>
            <a
              href={portfolioData.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#F4F4F2] dark:bg-[#1A1A1A] text-[#0D0D0D] dark:text-[#F4F4F2] text-xs font-bold uppercase tracking-wider border-2 border-[#0D0D0D] dark:border-[#E5E5E2] hover:bg-[#0D0D0D] hover:text-[#F4F4F2] dark:hover:bg-[#E5E5E2] dark:hover:text-[#0D0D0D] shadow-[3px_3px_0px_#0D0D0D] dark:shadow-[3px_3px_0px_#E5E5E2] transition-colors flex items-center gap-2"
            >
              <ExternalLink size={13} />
              <span>GITHUB (ZamLeu)</span>
            </a>
          </div>
        </div>

        {/* Right Column: 3D Workstation with embedded on-screen control */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center font-mono">
          {/* 3D Canvas Box */}
          <div className="w-full relative p-2 bg-[#EAEAE8] dark:bg-[#1A1A1A] border-2 border-[#0D0D0D] dark:border-[#E5E5E2] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#E5E5E2] transition-colors overflow-hidden">
            {/* Technical Blueprint Grid & HUD Specs Background */}
            <div className="absolute inset-0 pointer-events-none select-none">
              {/* Graph Paper Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-[0.07] dark:opacity-[0.09] text-[#0D0D0D] dark:text-[#E5E5E2]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, currentColor 1px, transparent 1px),
                    linear-gradient(to bottom, currentColor 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Technical Corner Crosshairs & Blueprint Watermarks */}
              <div className="absolute top-9 left-3 text-[9px] font-mono text-[#666663] dark:text-[#A0A09C] flex items-center gap-1.5 opacity-80">
                <span className="font-bold text-[#0D0D0D] dark:text-[#F4F4F2]">+</span>
                <span>[GRID: 24×24]</span>
              </div>

              <div className="absolute top-9 right-3 text-[9px] font-mono text-[#666663] dark:text-[#A0A09C] flex items-center gap-1.5 opacity-80">
                <span>[SCHEMATIC: M0001]</span>
                <span className="font-bold text-[#0D0D0D] dark:text-[#F4F4F2]">+</span>
              </div>

              <div className="absolute bottom-3 left-3 text-[9px] font-mono text-[#666663] dark:text-[#A0A09C] flex items-center gap-1.5 opacity-80">
                <span className="font-bold text-[#0D0D0D] dark:text-[#F4F4F2]">+</span>
                <span>[AXIS: ISO_38°]</span>
              </div>

              <div className="absolute bottom-3 right-3 text-[9px] font-mono text-[#666663] dark:text-[#A0A09C] flex items-center gap-1.5 opacity-80">
                <span>[SCALE: 1:1]</span>
                <span className="font-bold text-[#0D0D0D] dark:text-[#F4F4F2]">+</span>
              </div>

              {/* Subtle Central Alignment Reticle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-dashed border-[#0D0D0D]/10 dark:border-[#E5E5E2]/15" />
            </div>

            {/* Top Bar Label */}
            <div className="relative z-10 flex items-center justify-between pb-1 px-2 border-b border-[#0D0D0D]/15 dark:border-[#E5E5E2]/20 text-[10px] text-[#666663] dark:text-[#A0A09C] font-bold">
              <span>ZM_WORKSTATION</span>
              <span className="text-[#0D0D0D] dark:text-[#F4F4F2]">DRAG TO ORBIT // CLICK TO BOOT</span>
            </div>

            <div
              ref={containerRef}
              className="w-full h-[320px] sm:h-[370px] select-none relative z-10"
              title="Interactive 3D Workstation — Click screen or command deck to boot ZM_OS, Drag to orbit"
            />
          </div>

          {/* Interactive Keyboard Command Deck below PC */}
          <div className="w-full mt-3 p-3 bg-[#F4F4F2] dark:bg-[#141414] border-2 border-[#0D0D0D] dark:border-[#E5E5E2] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#E5E5E2] transition-colors">
            <div className="text-[10px] uppercase font-bold text-[#666663] dark:text-[#A0A09C] mb-2 flex items-center justify-between">
              <span>SELECT MODULE TO BOOT :</span>
              <span className="text-[#059669] dark:text-[#10B981] font-mono font-bold">ZM_OS ↵</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TERMINAL_SECTIONS.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => handleExecuteLaunch(idx)}
                  onMouseEnter={() => handleSelectMenu(idx)}
                  className={`text-left px-2.5 py-1.5 text-xs font-mono font-bold border-2 transition-colors cursor-pointer flex items-center justify-between ${
                    selectedIdx === idx
                      ? 'bg-[#0D0D0D] text-[#F4F4F2] border-[#0D0D0D] dark:bg-[#E5E5E2] dark:text-[#0D0D0D] dark:border-[#E5E5E2]'
                      : 'bg-[#EAEAE8] text-[#0D0D0D] border-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#F4F4F2] dark:bg-[#1A1A1A] dark:text-[#F4F4F2] dark:border-[#E5E5E2] dark:hover:bg-[#E5E5E2] dark:hover:text-[#0D0D0D]'
                  }`}
                >
                  <span className="truncate">[{sec.key}] {sec.title.split('. ')[1]}</span>
                  <ArrowDown size={11} className={selectedIdx === idx ? 'opacity-100' : 'opacity-40'} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

RetroHero.displayName = 'RetroHero';

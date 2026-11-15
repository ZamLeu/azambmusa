import React, { useState } from 'react';
import { Project } from '../data/portfolioData';
import { ExternalLink, Lock, Smartphone, Layers, Sparkles } from 'lucide-react';

interface RetroProjectPreviewProps {
  project: Project;
}

export const RetroProjectPreview: React.FC<RetroProjectPreviewProps> = ({ project }) => {
  const [activeMobileTab, setActiveMobileTab] = useState<'dual' | 'screen1' | 'screen2'>('dual');
  
  // Image loading cascade: Local custom image -> Automated cloud screenshot -> Blueprint
  const [imgSrc, setImgSrc] = useState<string>(
    project.previewImage || (project.url ? `https://image.thum.io/get/width/1024/crop/700/noanimate/${project.url}` : '')
  );
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageError = () => {
    // If local custom image (/projects/...) wasn't found, try the dynamic cloud screenshot
    if (imgSrc === project.previewImage && project.url) {
      setImgSrc(`https://image.thum.io/get/width/1024/crop/700/noanimate/${project.url}`);
    } else {
      setImageError(true);
    }
  };

  // If project is a mobile app (like BuddyUp)
  if (project.previewType === 'mobile' || !project.url) {
    const mobileImages = project.previewImages || (project.previewImage ? [project.previewImage] : []);

    return (
      <div className="w-full bg-[#EAEAE8] dark:bg-[#1A1A1A] border-2 border-[#0D0D0D] dark:border-[#E5E5E2] shadow-[3px_3px_0px_#0D0D0D] dark:shadow-[3px_3px_0px_#E5E5E2] overflow-hidden font-mono select-none transition-colors">
        {/* Mobile Device Header Bar */}
        <div className="bg-[#0D0D0D] dark:bg-[#000000] text-[#F4F4F2] px-3 py-1.5 flex items-center justify-between text-[10px] font-bold border-b-2 border-[#0D0D0D] dark:border-[#E5E5E2]">
          <div className="flex items-center gap-1.5">
            <Smartphone size={11} />
            <span>FLUTTER_MOBILE_FRAME // DART</span>
          </div>

          {/* Screen Switcher Tabs */}
          {mobileImages.length > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveMobileTab('dual')}
                className={`px-1.5 py-0.5 text-[9px] font-bold border transition-colors cursor-pointer ${
                  activeMobileTab === 'dual'
                    ? 'bg-[#EA580C] text-white border-[#EA580C] dark:bg-[#F97316] dark:text-[#0D0D0D] dark:border-[#F97316]'
                    : 'bg-transparent text-[#8E8E8A] border-transparent hover:text-[#F4F4F2]'
                }`}
              >
                DUAL VIEW
              </button>
              <button
                onClick={() => setActiveMobileTab('screen1')}
                className={`px-1.5 py-0.5 text-[9px] font-bold border transition-colors cursor-pointer ${
                  activeMobileTab === 'screen1'
                    ? 'bg-[#EA580C] text-white border-[#EA580C] dark:bg-[#F97316] dark:text-[#0D0D0D] dark:border-[#F97316]'
                    : 'bg-transparent text-[#8E8E8A] border-transparent hover:text-[#F4F4F2]'
                }`}
              >
                SCR 01
              </button>
              <button
                onClick={() => setActiveMobileTab('screen2')}
                className={`px-1.5 py-0.5 text-[9px] font-bold border transition-colors cursor-pointer ${
                  activeMobileTab === 'screen2'
                    ? 'bg-[#EA580C] text-white border-[#EA580C] dark:bg-[#F97316] dark:text-[#0D0D0D] dark:border-[#F97316]'
                    : 'bg-transparent text-[#8E8E8A] border-transparent hover:text-[#F4F4F2]'
                }`}
              >
                SCR 02
              </button>
            </div>
          )}
        </div>

        {/* Mobile Screen Display Container */}
        <div className="p-3 sm:p-4 bg-[#F4F4F2] dark:bg-[#141414] relative flex items-center justify-center min-h-[240px] sm:min-h-[260px] md:min-h-[280px] border-b-2 border-[#0D0D0D] dark:border-[#E5E5E2] overflow-hidden transition-colors">
          {/* Subtle scanline overlay */}
          <div className="absolute inset-0 scanlines pointer-events-none opacity-15 z-20" />

          {/* DUAL VIEW (Two phones side-by-side) */}
          {activeMobileTab === 'dual' && mobileImages.length >= 2 && (
            <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-5 w-full">
              {/* Phone 1 */}
              <div className="w-[110px] sm:w-[130px] h-[220px] sm:h-[240px] bg-[#0D0D0D] p-1.5 rounded-xl border-2 border-[#0D0D0D] dark:border-[#E5E5E2] shadow-[3px_3px_0px_#0D0D0D] dark:shadow-[3px_3px_0px_#E5E5E2] flex flex-col justify-between overflow-hidden">
                <div className="w-8 h-1 bg-[#444] rounded-full mx-auto mb-1 shrink-0" />
                <div className="w-full flex-1 overflow-hidden rounded-md bg-[#222]">
                  <img
                    src={mobileImages[0]}
                    alt={`${project.title} screen 1`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="w-10 h-0.5 bg-[#444] rounded-full mx-auto mt-1 shrink-0" />
              </div>

              {/* Phone 2 */}
              <div className="w-[110px] sm:w-[130px] h-[220px] sm:h-[240px] bg-[#0D0D0D] p-1.5 rounded-xl border-2 border-[#0D0D0D] dark:border-[#E5E5E2] shadow-[3px_3px_0px_#0D0D0D] dark:shadow-[3px_3px_0px_#E5E5E2] flex flex-col justify-between overflow-hidden">
                <div className="w-8 h-1 bg-[#444] rounded-full mx-auto mb-1 shrink-0" />
                <div className="w-full flex-1 overflow-hidden rounded-md bg-[#222]">
                  <img
                    src={mobileImages[1]}
                    alt={`${project.title} screen 2`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="w-10 h-0.5 bg-[#444] rounded-full mx-auto mt-1 shrink-0" />
              </div>
            </div>
          )}

          {/* SINGLE VIEW (SCREEN 1) */}
          {(activeMobileTab === 'screen1' || (activeMobileTab === 'dual' && mobileImages.length < 2)) && (
            <div className="relative z-10 w-[130px] sm:w-[150px] h-[220px] sm:h-[250px] bg-[#0D0D0D] p-1.5 rounded-xl border-2 border-[#0D0D0D] dark:border-[#E5E5E2] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#E5E5E2] flex flex-col justify-between overflow-hidden">
              <div className="w-8 h-1 bg-[#444] rounded-full mx-auto mb-1 shrink-0" />
              <div className="w-full flex-1 overflow-hidden rounded-md bg-[#222]">
                <img
                  src={mobileImages[0]}
                  alt={`${project.title} screen 1`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="w-10 h-0.5 bg-[#444] rounded-full mx-auto mt-1 shrink-0" />
            </div>
          )}

          {/* SINGLE VIEW (SCREEN 2) */}
          {activeMobileTab === 'screen2' && mobileImages.length >= 2 && (
            <div className="relative z-10 w-[130px] sm:w-[150px] h-[220px] sm:h-[250px] bg-[#0D0D0D] p-1.5 rounded-xl border-2 border-[#0D0D0D] dark:border-[#E5E5E2] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#E5E5E2] flex flex-col justify-between overflow-hidden">
              <div className="w-8 h-1 bg-[#444] rounded-full mx-auto mb-1 shrink-0" />
              <div className="w-full flex-1 overflow-hidden rounded-md bg-[#222]">
                <img
                  src={mobileImages[1]}
                  alt={`${project.title} screen 2`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="w-10 h-0.5 bg-[#444] rounded-full mx-auto mt-1 shrink-0" />
            </div>
          )}
        </div>

        {/* Footer info badge */}
        <div className="bg-[#EAEAE8] dark:bg-[#1A1A1A] px-3 py-1.5 text-[10px] text-[#666663] dark:text-[#A0A09C] font-bold flex items-center justify-between transition-colors">
          <span>CROSS-PLATFORM ARCHITECTURE</span>
          <span className="text-[#0D0D0D] dark:text-[#F4F4F2]">FLUTTER / DART / FIREBASE</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#EAEAE8] dark:bg-[#1A1A1A] border-2 border-[#0D0D0D] dark:border-[#E5E5E2] shadow-[3px_3px_0px_#0D0D0D] dark:shadow-[3px_3px_0px_#E5E5E2] overflow-hidden font-mono select-none group transition-colors">
      {/* Retro Browser Address Bar & Title */}
      <div className="bg-[#0D0D0D] dark:bg-[#000000] text-[#F4F4F2] px-3 py-1.5 flex items-center justify-between gap-2 text-xs border-b-2 border-[#0D0D0D] dark:border-[#E5E5E2]">
        {/* Left: Window control dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full border border-[#EA580C] bg-[#EA580C] dark:border-[#F97316] dark:bg-[#F97316]" />
          <span className="w-2 h-2 rounded-full border border-[#F4F4F2] bg-transparent" />
          <span className="w-2 h-2 rounded-full border border-[#F4F4F2] bg-transparent" />
        </div>

        {/* Center: Monospace URL bar */}
        <div className="flex-1 max-w-md mx-auto bg-[#222] dark:bg-[#111] text-[#E5E5E2] px-2.5 py-0.5 border border-[#444] dark:border-[#333] text-[11px] flex items-center gap-1.5 truncate">
          <Lock size={10} className="text-[#10B981] shrink-0" />
          <span className="truncate">{project.url}</span>
        </div>

        {/* Right: Visit Link button */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#F4F4F2] text-[#0D0D0D] hover:bg-[#EAEAE8] px-2.5 py-0.5 text-[11px] font-bold flex items-center gap-1 transition-colors shadow-[1px_1px_0px_#F4F4F2] cursor-pointer shrink-0"
          title={`Visit live site ${project.domain}`}
        >
          <span>VISIT</span>
          <ExternalLink size={11} />
        </a>
      </div>

      {/* Main Viewport Container */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative bg-[#0D0D0D] dark:bg-[#000000] overflow-hidden cursor-pointer w-full aspect-[16/8] sm:aspect-[1885/911] transition-colors"
        title={`Click to open live ${project.title} (${project.domain})`}
      >
        {/* Scanlines layer */}
        <div className="absolute inset-0 scanlines pointer-events-none opacity-15 z-20" />

        {/* Screenshot Image (Complete uncropped view on desktop & mobile) */}
        {!imageError && (
          <img
            src={imgSrc}
            alt={`Preview capture of ${project.title}`}
            onLoad={() => setIsLoaded(true)}
            onError={handleImageError}
            className={`w-full h-full object-contain object-top transition-all duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-[1.02]`}
            loading="lazy"
          />
        )}

        {/* Loading / Fallback Retro Blueprint State */}
        {(!isLoaded || imageError) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#F4F4F2] dark:bg-[#141414] text-[#0D0D0D] dark:text-[#F4F4F2] z-10 transition-colors">
            <div className="w-full max-w-sm border-2 border-dashed border-[#0D0D0D]/40 dark:border-[#E5E5E2]/40 p-4 bg-[#EAEAE8] dark:bg-[#1A1A1A] text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#0D0D0D] dark:text-[#F4F4F2]">
                <Layers size={14} />
                <span>PREVIEW : {project.domain}</span>
              </div>
              <p className="text-[11px] text-[#666663] dark:text-[#A0A09C]">
                {project.type}
              </p>
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-[10px] font-bold uppercase text-[#0D0D0D] dark:text-[#F4F4F2]">
                  CLICK TO OPEN LIVE SITE ➔
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Hover Action Ribbon */}
        <div className="absolute bottom-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-3 py-1.5 bg-[#0D0D0D] dark:bg-[#F4F4F2] text-[#F4F4F2] dark:text-[#0D0D0D] text-xs font-bold font-mono border border-[#0D0D0D] dark:border-[#F4F4F2] shadow-[2px_2px_0px_#F4F4F2] dark:shadow-[2px_2px_0px_#0D0D0D] flex items-center gap-1.5">
            <Sparkles size={12} />
            <span>LAUNCH {project.domain} ↗</span>
          </span>
        </div>
      </a>

      {/* Browser Footer Status */}
      <div className="bg-[#EAEAE8] dark:bg-[#1A1A1A] px-3 py-1 text-[10px] text-[#666663] dark:text-[#A0A09C] font-bold flex items-center justify-between border-t border-[#0D0D0D]/20 dark:border-[#E5E5E2]/20 transition-colors">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span>PRODUCTION HOSTING: {project.domain?.toUpperCase()}</span>
        </span>
        <span className="text-[#0D0D0D] dark:text-[#F4F4F2] font-mono">STATUS: 200 OK</span>
      </div>
    </div>
  );
};

import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ExternalLink } from 'lucide-react';
import { RetroProjectPreview } from './RetroProjectPreview';

export const RetroProjects: React.FC = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 border-b-2 border-[#0D0D0D] dark:border-[#E5E5E2] font-mono transition-colors">
      {/* Section Header */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] uppercase tracking-wider mb-2">
          [01 // KEY_TECHNICAL_PROJECTS]
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-[#0D0D0D] dark:text-[#F4F4F2] tracking-tight">
          PRODUCTION WORK & LIVE PREVIEWS
        </h2>
      </div>

      <div className="space-y-8">
        {portfolioData.projects.map((proj, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 bg-[#F4F4F2] dark:bg-[#161616] border-2 border-[#0D0D0D] dark:border-[#E5E5E2] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#E5E5E2] hover:shadow-[6px_6px_0px_#0D0D0D] dark:hover:shadow-[6px_6px_0px_#E5E5E2] transition-all relative"
          >
            {/* Top Bar with Award & Type */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-[#0D0D0D]/15 dark:border-[#E5E5E2]/20">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase px-2.5 py-1 bg-[#0D0D0D] dark:bg-[#E5E5E2] text-[#F4F4F2] dark:text-[#0D0D0D] font-bold">
                  {proj.type}
                </span>
                {proj.year && (
                  <span className="text-xs font-mono px-2 py-0.5 bg-[#EAEAE8] dark:bg-[#222] border border-[#0D0D0D] dark:border-[#E5E5E2] text-[#0D0D0D] dark:text-[#F4F4F2]">
                    {proj.year}
                  </span>
                )}
                {proj.award && (
                  <span className="text-xs font-mono px-2.5 py-0.5 border-2 border-[#0D0D0D] dark:border-[#E5E5E2] bg-[#F4F4F2] dark:bg-[#1A1A1A] text-[#0D0D0D] dark:text-[#F4F4F2] font-bold">
                    ★ {proj.award}
                  </span>
                )}
              </div>

              {proj.url && (
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0D0D0D] dark:text-[#F4F4F2] hover:underline font-bold bg-[#EAEAE8] dark:bg-[#222] px-2.5 py-1 border border-[#0D0D0D] dark:border-[#E5E5E2]"
                >
                  <span>{proj.domain}</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>

            {/* 2-Column Responsive Layout: Details on Left, Live Viewport Preview on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Project Details */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <h3 className="font-pixel text-lg sm:text-2xl text-[#0D0D0D] dark:text-[#F4F4F2]">
                    {proj.title}
                  </h3>
                  <div className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] font-bold mt-1">
                    // {proj.tagline}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#0D0D0D] dark:text-[#EAEAE8] leading-relaxed max-w-2xl">
                  {proj.description}
                </p>

                {/* Feature Architecture Bullets */}
                <div className="space-y-1.5 text-xs bg-[#EAEAE8] dark:bg-[#1A1A1A] p-4 border border-[#0D0D0D] dark:border-[#E5E5E2]">
                  {proj.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5">
                      <span className="text-[#0D0D0D] dark:text-[#F4F4F2] font-bold select-none mt-0.5">{'>'}</span>
                      <span className="text-[#0D0D0D] dark:text-[#EAEAE8] leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono px-2.5 py-1 bg-[#EAEAE8] dark:bg-[#222] border border-[#0D0D0D] dark:border-[#E5E5E2] text-[#0D0D0D] dark:text-[#F4F4F2] font-bold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Live Website Viewport Preview */}
              <div className="lg:col-span-5 w-full">
                <RetroProjectPreview project={proj} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

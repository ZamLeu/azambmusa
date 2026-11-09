import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const RetroEducation: React.FC = () => {
  return (
    <section id="education" className="py-12 sm:py-16 border-b-2 border-[#0D0D0D] dark:border-[#E5E5E2] font-mono transition-colors">
      {/* Section Header */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] uppercase tracking-wider mb-2">
          [04 // CREDENTIALS & ACTIVITIES]
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-[#0D0D0D] dark:text-[#F4F4F2] tracking-tight">
          EDUCATION & ACTIVITIES
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education Column */}
        <div className="space-y-6">
          <div className="text-xs font-mono font-bold text-[#0D0D0D] dark:text-[#F4F4F2] tracking-wider uppercase pb-2 border-b-2 border-[#0D0D0D] dark:border-[#E5E5E2]">
            ACADEMIC BACKGROUND
          </div>

          {portfolioData.education.map((edu, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#F4F4F2] dark:bg-[#161616] border-2 border-[#0D0D0D] dark:border-[#E5E5E2] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#E5E5E2] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                <h3 className="font-pixel text-xs sm:text-sm text-[#0D0D0D] dark:text-[#F4F4F2]">
                  {edu.degree}
                </h3>
                <span className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] font-bold">
                  [{edu.statusOrYear}]
                </span>
              </div>

              <div className="text-xs text-[#666663] dark:text-[#A0A09C] mb-3">
                {edu.institution} // {edu.location}
              </div>

              <div className="text-xs font-mono font-bold text-[#666663] dark:text-[#A0A09C] mb-3 pb-2 border-b border-[#0D0D0D]/15 dark:border-[#E5E5E2]/20">
                CGPA: {edu.cgpa}
              </div>

              {edu.details && (
                <ul className="space-y-1 text-xs text-[#0D0D0D] dark:text-[#EAEAE8]">
                  {edu.details.map((d, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="font-bold select-none">{'>'}</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Leadership & CTF Column */}
        <div className="space-y-6">
          <div className="text-xs font-mono font-bold text-[#0D0D0D] dark:text-[#F4F4F2] tracking-wider uppercase pb-2 border-b-2 border-[#0D0D0D] dark:border-[#E5E5E2]">
            LEADERSHIP & CTF SECURITY
          </div>

          {/* FYP Showcase Director */}
          <div className="p-5 bg-[#F4F4F2] dark:bg-[#161616] border-2 border-[#0D0D0D] dark:border-[#E5E5E2] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#E5E5E2] transition-colors">
            <h3 className="font-pixel text-xs sm:text-sm text-[#0D0D0D] dark:text-[#F4F4F2] mb-1">
              {portfolioData.extracurricular[0].role}
            </h3>
            <div className="text-xs text-[#666663] dark:text-[#A0A09C] mb-3">
              {portfolioData.extracurricular[0].organization}
            </div>
            <ul className="space-y-1.5 text-xs text-[#0D0D0D] dark:text-[#EAEAE8] mb-4">
              {portfolioData.extracurricular[0].highlights.map((h, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold select-none">{'>'}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTF Security */}
          <div className="p-5 bg-[#F4F4F2] dark:bg-[#161616] border-2 border-[#0D0D0D] dark:border-[#E5E5E2] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#E5E5E2] transition-colors">
            <div className="flex items-baseline justify-between gap-1 mb-1">
              <h3 className="font-pixel text-xs sm:text-sm text-[#0D0D0D] dark:text-[#F4F4F2]">
                {portfolioData.extracurricular[1].role}
              </h3>
              <span className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] font-bold">
                [{portfolioData.extracurricular[1].period}]
              </span>
            </div>
            <div className="text-xs text-[#666663] dark:text-[#A0A09C] mb-3">
              {portfolioData.extracurricular[1].organization}
            </div>
            <p className="text-xs text-[#0D0D0D] dark:text-[#EAEAE8] leading-relaxed mb-4">
              {portfolioData.extracurricular[1].highlights[0]}
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs font-mono px-2 py-0.5 bg-[#EAEAE8] dark:bg-[#222] border border-[#0D0D0D] dark:border-[#E5E5E2] text-[#0D0D0D] dark:text-[#F4F4F2]">
                RE:UNI10N
              </span>
              <span className="text-xs font-mono px-2 py-0.5 bg-[#EAEAE8] dark:bg-[#222] border border-[#0D0D0D] dark:border-[#E5E5E2] text-[#0D0D0D] dark:text-[#F4F4F2]">
                TAMiNG
              </span>
              <span className="text-xs font-mono px-2 py-0.5 bg-[#EAEAE8] dark:bg-[#222] border border-[#0D0D0D] dark:border-[#E5E5E2] text-[#0D0D0D] dark:text-[#F4F4F2]">
                HackNyx
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


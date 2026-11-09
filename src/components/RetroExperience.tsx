import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const RetroExperience: React.FC = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 border-b-2 border-[#0D0D0D] dark:border-[#E5E5E2] font-mono transition-colors">
      {/* Section Header */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] uppercase tracking-wider mb-2">
          [02 // WORK_EXPERIENCE]
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-[#0D0D0D] dark:text-[#F4F4F2] tracking-tight">
          CAREER & RESEARCH
        </h2>
      </div>

      <div className="space-y-6">
        {portfolioData.experience.map((exp, idx) => (
          <div
            key={idx}
            className="p-6 bg-[#F4F4F2] dark:bg-[#161616] border-2 border-[#0D0D0D] dark:border-[#E5E5E2] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#E5E5E2] transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2 pb-2 border-b border-[#0D0D0D]/15 dark:border-[#E5E5E2]/20">
              <h3 className="font-pixel text-sm sm:text-base text-[#0D0D0D] dark:text-[#F4F4F2]">
                {exp.role}
              </h3>
              <span className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] font-bold">
                [{exp.period}]
              </span>
            </div>

            <div className="text-xs font-mono text-[#0D0D0D] dark:text-[#F4F4F2] font-bold mb-4">
              ORG: {exp.organization}
            </div>

            <ul className="space-y-2 mb-4 text-xs sm:text-sm text-[#0D0D0D] dark:text-[#EAEAE8] leading-relaxed">
              {exp.highlights.map((h, hIdx) => (
                <li key={hIdx} className="flex items-start gap-2">
                  <span className="text-[#0D0D0D] dark:text-[#F4F4F2] font-bold select-none">{'>'}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#0D0D0D]/15 dark:border-[#E5E5E2]/20">
              {exp.skills.map((s, sIdx) => (
                <span
                  key={sIdx}
                  className="text-xs font-mono px-2 py-0.5 bg-[#EAEAE8] dark:bg-[#222] border border-[#0D0D0D] dark:border-[#E5E5E2] text-[#0D0D0D] dark:text-[#F4F4F2]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


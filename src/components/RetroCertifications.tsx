import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const RetroCertifications: React.FC = () => {
  return (
    <section id="certifications" className="py-12 sm:py-16 border-b-2 border-[#0D0D0D] dark:border-[#333333] font-mono">
      {/* Section Header */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] uppercase tracking-wider mb-2">
          [05 // PROFESSIONAL_CREDENTIALS]
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-[#0D0D0D] dark:text-[#F4F4F2] tracking-tight">
          CERTIFICATIONS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioData.certifications.map((cert, idx) => (
          <div
            key={idx}
            className="p-6 bg-[#F4F4F2] dark:bg-[#121212] border-2 border-[#0D0D0D] dark:border-[#333333] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#222222] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono uppercase px-2 py-0.5 bg-[#059669] text-white dark:bg-[#10B981] dark:text-[#0D0D0D] font-bold">
                  PROFESSIONAL CERT
                </span>
                <span className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] font-bold">
                  [{cert.date}]
                </span>
              </div>
              <h3 className="font-pixel text-xs sm:text-sm text-[#0D0D0D] dark:text-[#F4F4F2] leading-relaxed my-3">
                {cert.title}
              </h3>
            </div>
            <div className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] pt-3 border-t border-[#0D0D0D]/15 dark:border-[#333333] font-bold">
              ISSUER: {cert.issuer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

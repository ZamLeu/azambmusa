import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const RetroSkills: React.FC = () => {
  const groups = [
    { label: 'LANGUAGES & CORE', items: portfolioData.skills.languagesAndCore },
    { label: 'CLOUD, INFRA & TOOLS', items: portfolioData.skills.cloudInfraAndTools },
    { label: 'FRAMEWORKS & APIS', items: portfolioData.skills.frameworksAndApis },
    { label: 'ENGINEERING PRACTICES', items: portfolioData.skills.engineeringPractices },
  ];

  return (
    <section id="skills" className="py-12 sm:py-16 border-b-2 border-[#0D0D0D] dark:border-[#E5E5E2] font-mono transition-colors">
      {/* Section Header */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] uppercase tracking-wider mb-2">
          [03 // TECH_CAPABILITIES]
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-[#0D0D0D] dark:text-[#F4F4F2] tracking-tight">
          TECHNICAL SKILLS
        </h2>
      </div>

      <div className="divide-y-2 divide-[#0D0D0D] dark:divide-[#E5E5E2] border-2 border-[#0D0D0D] dark:border-[#E5E5E2] bg-[#F4F4F2] dark:bg-[#161616] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#E5E5E2] transition-colors">
        {groups.map((grp, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
          >
            <div className="md:col-span-4 text-xs font-mono font-bold text-[#0D0D0D] dark:text-[#F4F4F2] tracking-wider uppercase">
              {grp.label}
            </div>
            <div className="md:col-span-8 flex flex-wrap gap-2">
              {grp.items.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-xs font-mono px-2.5 py-1 bg-[#EAEAE8] dark:bg-[#222] border border-[#0D0D0D] dark:border-[#E5E5E2] text-[#0D0D0D] dark:text-[#F4F4F2] hover:bg-[#0D0D0D] hover:text-[#F4F4F2] dark:hover:bg-[#E5E5E2] dark:hover:text-[#0D0D0D] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

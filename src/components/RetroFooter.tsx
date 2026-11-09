import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp, Globe } from 'lucide-react';
import { GithubIcon } from './icons/SocialIcons';

export const RetroFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-8 pb-4 border-t-2 border-[#0D0D0D] dark:border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#666663] dark:text-[#A0A09C]">
      <div>
        <span className="text-[#0D0D0D] dark:text-[#F4F4F2] font-bold">azambmusa</span> // {portfolioData.personal.location}
      </div>

      <div className="flex items-center gap-4">
        <a
          href={portfolioData.personal.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0D0D0D] dark:text-[#F4F4F2] hover:underline flex items-center gap-1 font-bold"
        >
          <GithubIcon size={14} />
          <span>ZamLeu</span>
        </a>
        <a
          href={portfolioData.personal.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0D0D0D] dark:text-[#F4F4F2] hover:underline flex items-center gap-1 font-bold"
        >
          <Globe size={14} />
          <span>azambmusa.my</span>
        </a>
        <button
          onClick={scrollToTop}
          className="px-2 py-1 border border-[#0D0D0D] dark:border-[#444] bg-[#F4F4F2] dark:bg-[#1A1A1A] text-[#0D0D0D] dark:text-[#F4F4F2] hover:bg-[#0D0D0D] hover:text-[#F4F4F2] dark:hover:bg-[#F4F4F2] dark:hover:text-[#0D0D0D] transition-colors flex items-center gap-1"
        >
          <span>TOP</span>
          <ArrowUp size={12} />
        </button>
      </div>
    </footer>
  );
};

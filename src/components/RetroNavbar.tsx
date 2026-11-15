import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { ZMBadgeIcon } from './ZMBadgeIcon';

interface RetroNavbarProps {
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const RetroNavbar: React.FC<RetroNavbarProps> = ({ isDarkMode, onToggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: 'PROJECTS', href: '#projects' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'EDUCATION', href: '#education' },
    { label: 'CERTIFICATIONS', href: '#certifications' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header className="relative z-20 flex items-center justify-between pb-6 sm:pb-8 border-b-2 border-[#0D0D0D] dark:border-[#E5E5E2] transition-colors">
      {/* Brand: azambmusa */}
      <a 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex items-center gap-2.5 group shrink-0 lg:mr-6 xl:mr-10 lg:pr-6 lg:border-r border-[#0D0D0D]/15 dark:border-[#E5E5E2]/20 transition-all"
      >
        <div className="p-0.5 border-2 border-[#0D0D0D] dark:border-[#E5E5E2] bg-[#F4F4F2] dark:bg-[#1A1A1A] group-hover:bg-[#0D0D0D] dark:group-hover:bg-[#E5E5E2] group-hover:text-[#F4F4F2] dark:group-hover:text-[#0D0D0D] transition-colors shadow-[2px_2px_0px_#0D0D0D] dark:shadow-[2px_2px_0px_#E5E5E2]">
          <ZMBadgeIcon size={24} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-sm sm:text-base tracking-wider text-[#0D0D0D] dark:text-[#F4F4F2]">
              azambmusa
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] dark:bg-[#F97316] shadow-[0_0_6px_rgba(249,115,22,0.6)] animate-pulse" title="System Online" />
          </div>
          <span className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] hidden sm:inline">
            azambmusa.my // BERANANG, MY
          </span>
        </div>
      </a>

      {/* Desktop Links (Centered with spacious breathing room) */}
      <nav className="hidden lg:flex items-center justify-center gap-3.5 xl:gap-6 text-xs font-mono font-medium text-[#0D0D0D] dark:text-[#F4F4F2] flex-1">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={(e) => handleScrollTo(e, l.href)}
            className="hover:underline underline-offset-4 decoration-2 decoration-[#EA580C] dark:decoration-[#F97316] hover:text-[#EA580C] dark:hover:text-[#F97316] transition-colors cursor-pointer"
          >
            [{l.label}]
          </a>
        ))}
      </nav>

      {/* Dark Mode Toggle (Clean icon-only button at right end) */}
      <div className="hidden sm:flex items-center shrink-0 lg:ml-6 xl:ml-10 lg:pl-6 lg:border-l border-[#0D0D0D]/15 dark:border-[#E5E5E2]/20">
        {onToggleDarkMode && (
          <button
            onClick={onToggleDarkMode}
            className="p-2 border-2 border-[#0D0D0D] dark:border-[#E5E5E2] bg-[#F4F4F2] dark:bg-[#1A1A1A] text-[#0D0D0D] dark:text-[#F4F4F2] hover:bg-[#0D0D0D] hover:text-[#F4F4F2] dark:hover:bg-[#E5E5E2] dark:hover:text-[#0D0D0D] transition-colors flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_#0D0D0D] dark:shadow-[2px_2px_0px_#E5E5E2] active:translate-x-[1px] active:translate-y-[1px]"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={15} className="text-[#FBBF24]" /> : <Moon size={15} />}
          </button>
        )}
      </div>

      {/* Mobile Menu & Theme Toggle */}
      <div className="flex items-center gap-2 lg:hidden">
        {onToggleDarkMode && (
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 border-2 border-[#0D0D0D] dark:border-[#E5E5E2] bg-[#F4F4F2] dark:bg-[#1A1A1A] text-[#0D0D0D] dark:text-[#F4F4F2]"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={15} className="text-[#FBBF24]" /> : <Moon size={15} />}
          </button>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 border-2 border-[#0D0D0D] dark:border-[#E5E5E2] bg-[#F4F4F2] dark:bg-[#1A1A1A] text-[#0D0D0D] dark:text-[#F4F4F2]"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#F4F4F2] dark:bg-[#161616] border-2 border-[#0D0D0D] dark:border-[#E5E5E2] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#E5E5E2] p-4 flex flex-col gap-3 lg:hidden z-50 font-mono text-xs text-[#0D0D0D] dark:text-[#F4F4F2]">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleScrollTo(e, l.href)}
              className="py-1 hover:underline font-bold cursor-pointer"
            >
              [{l.label}]
            </a>
          ))}
          <div className="pt-2 border-t border-[#0D0D0D]/15 dark:border-[#E5E5E2]/20 flex flex-col gap-2">
            <a
              href={portfolioData.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-1.5 border border-[#0D0D0D] dark:border-[#E5E5E2] font-bold"
            >
              GitHub (ZamLeu)
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="text-center py-2 bg-[#0D0D0D] dark:bg-[#E5E5E2] text-[#F4F4F2] dark:text-[#0D0D0D] font-bold"
            >
              {portfolioData.personal.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

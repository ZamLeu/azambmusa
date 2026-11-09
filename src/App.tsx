import { useState, useRef, useCallback, useEffect } from 'react';
import { RetroNavbar } from './components/RetroNavbar';
import { RetroHero, RetroHeroHandle } from './components/RetroHero';
import { RetroProjects } from './components/RetroProjects';
import { RetroExperience } from './components/RetroExperience';
import { RetroSkills } from './components/RetroSkills';
import { RetroEducation } from './components/RetroEducation';
import { RetroCertifications } from './components/RetroCertifications';
import { RetroContact } from './components/RetroContact';
import { RetroFooter } from './components/RetroFooter';
import { FloatingReturnHUD } from './components/FloatingReturnHUD';
import { RetroComputerEnvironment } from './components/RetroComputerEnvironment';

export const App: React.FC = () => {
  const [inComputerMode, setInComputerMode] = useState<boolean>(false);
  const [selectedOSSection, setSelectedOSSection] = useState<string>('projects');
  const heroRef = useRef<RetroHeroHandle>(null);

  // Dark Mode State & Persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('azambmusa_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('azambmusa_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('azambmusa_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const handleEnterComputer = useCallback((sectionId: string) => {
    setSelectedOSSection(sectionId);
    setInComputerMode(true);
  }, []);

  const handleExitComputer = useCallback(() => {
    setInComputerMode(false);
    heroRef.current?.resetCamera();
  }, []);

  const handleReturnToPC = useCallback(() => {
    const hero = document.getElementById('hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    heroRef.current?.resetCamera();
    window.history.pushState(null, '', ' ');
  }, []);

  return (
    <div className="min-h-screen bg-[#E5E5E2] dark:bg-[#0A0A0A] p-3 sm:p-6 md:p-8 flex items-center justify-center font-mono selection:bg-[#0D0D0D] selection:text-[#F4F4F2] dark:selection:bg-[#F4F4F2] dark:selection:text-[#0D0D0D] transition-colors duration-200">
      {/* Outer CRT / Retro Minimalist Monitor Frame */}
      <div className="w-full max-w-6xl bg-[#F4F4F2] dark:bg-[#121212] border-2 border-[#0D0D0D] dark:border-[#E5E5E2] rounded-2xl sm:rounded-3xl shadow-[6px_6px_0px_#0D0D0D] dark:shadow-[6px_6px_0px_#E5E5E2] p-5 sm:p-10 md:p-12 relative flex flex-col justify-between overflow-hidden transition-colors duration-200">
        
        {/* Subtle retro scanline overlay across entire CRT screen */}
        <div className="absolute inset-0 scanlines pointer-events-none opacity-20 dark:opacity-10" />

        <div className="relative z-10">
          <RetroNavbar isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
          <main>
            <RetroHero ref={heroRef} onNavigateSection={handleEnterComputer} />
            <RetroProjects />
            <RetroExperience />
            <RetroSkills />
            <RetroEducation />
            <RetroCertifications />
            <RetroContact />
          </main>
          <RetroFooter />
        </div>
      </div>

      {/* Floating Retro HUD button to return to 3D Workstation */}
      <FloatingReturnHUD onReturn={handleReturnToPC} />

      {/* Fullscreen Immersive Retro Computer Environment (ZM_OS) */}
      {inComputerMode && (
        <RetroComputerEnvironment
          initialSection={selectedOSSection}
          onExit={handleExitComputer}
        />
      )}
    </div>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface FloatingReturnHUDProps {
  onReturn: () => void;
}

export const FloatingReturnHUD: React.FC<FloatingReturnHUDProps> = ({ onReturn }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onReturn();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onReturn]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono animate-fade-in">
      <button
        onClick={onReturn}
        className="flex items-center gap-2.5 px-4 py-2.5 bg-[#0D0D0D] text-[#F4F4F2] border-2 border-[#0D0D0D] dark:bg-[#F4F4F2] dark:text-[#0D0D0D] dark:border-[#F4F4F2] text-xs font-bold tracking-wider hover:bg-[#F4F4F2] hover:text-[#0D0D0D] dark:hover:bg-[#0D0D0D] dark:hover:text-[#F4F4F2] transition-colors shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#333333] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
        title="Press ESC or Click to return to the 3D Workstation"
      >
        <ArrowUp size={14} className="animate-bounce text-[#EA580C] dark:text-[#F97316]" />
        <span>[ESC] RETURN TO 3D PC</span>
      </button>
    </div>
  );
};

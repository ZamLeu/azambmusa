import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, MapPin, Copy, Check, Globe, ExternalLink } from 'lucide-react';
import { WhatsAppIcon } from './icons/SocialIcons';
import { GithubIcon } from './icons/SocialIcons';

export const RetroContact: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 font-mono">
      {/* Section Header */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] uppercase tracking-wider mb-2">
          [06 // TRANSMIT_MESSAGE]
        </div>
        <h2 className="font-pixel text-xl sm:text-3xl text-[#0D0D0D] dark:text-[#F4F4F2] tracking-tight">
          CONTACT & CONNECT
        </h2>
      </div>

      <div className="p-6 sm:p-8 bg-[#F4F4F2] dark:bg-[#121212] border-2 border-[#0D0D0D] dark:border-[#333333] shadow-[6px_6px_0px_#0D0D0D] dark:shadow-[6px_6px_0px_#222222]">
        <p className="text-xs sm:text-sm text-[#0D0D0D] dark:text-[#D4D4D0] leading-relaxed mb-8 max-w-2xl">
          Available for software engineering internship opportunities. Reach out directly via email, phone or connect on GitHub.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Email Item */}
          <div className="p-4 bg-[#EAEAE8] dark:bg-[#1A1A1A] border-2 border-[#0D0D0D] dark:border-[#333333] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <Mail size={16} className="text-[#0D0D0D] dark:text-[#F4F4F2] shrink-0" />
              <div className="truncate">
                <div className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] uppercase">EMAIL</div>
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="text-xs sm:text-sm font-mono text-[#0D0D0D] dark:text-[#F4F4F2] hover:underline font-bold truncate block"
                >
                  {portfolioData.personal.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyText(portfolioData.personal.email, 'email')}
              className="p-1.5 border border-[#0D0D0D] dark:border-[#444] bg-[#F4F4F2] dark:bg-[#242424] text-[#0D0D0D] dark:text-[#F4F4F2] hover:bg-[#0D0D0D] hover:text-[#F4F4F2] dark:hover:bg-[#F4F4F2] dark:hover:text-[#0D0D0D] transition-colors shrink-0"
              title="Copy email"
              aria-label="Copy email"
            >
              {copiedKey === 'email' ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>

          {/* WhatsApp Item */}
          <div className="p-4 bg-[#EAEAE8] dark:bg-[#1A1A1A] border-2 border-[#0D0D0D] dark:border-[#333333] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <WhatsAppIcon size={18} className="text-[#0D0D0D] dark:text-[#F4F4F2] shrink-0" />
              <div className="truncate">
                <div className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] uppercase">WHATSAPP // DIRECT CHAT</div>
                <a
                  href={portfolioData.personal.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-mono text-[#0D0D0D] dark:text-[#F4F4F2] hover:underline font-bold truncate block"
                >
                  START A CONVERSATION ↗
                </a>
              </div>
            </div>
            <a
              href={portfolioData.personal.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border-[#0D0D0D] dark:border-[#444] bg-[#F4F4F2] dark:bg-[#242424] text-[#0D0D0D] dark:text-[#F4F4F2] hover:bg-[#0D0D0D] hover:text-[#F4F4F2] dark:hover:bg-[#F4F4F2] dark:hover:text-[#0D0D0D] transition-colors shrink-0 text-xs font-mono font-bold flex items-center gap-1.5"
              title="Open WhatsApp"
            >
              <span>CHAT</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Base Location */}
          <div className="p-4 bg-[#EAEAE8] dark:bg-[#1A1A1A] border-2 border-[#0D0D0D] dark:border-[#333333] flex items-center gap-3">
            <MapPin size={16} className="text-[#0D0D0D] dark:text-[#F4F4F2] shrink-0" />
            <div>
              <div className="text-xs font-mono text-[#666663] dark:text-[#A0A09C] uppercase">BASE LOCATION</div>
              <div className="text-xs sm:text-sm text-[#0D0D0D] dark:text-[#F4F4F2] font-bold">
                {portfolioData.personal.location}
              </div>
            </div>
          </div>

          {/* Domain & GitHub */}
          <div className="p-4 bg-[#EAEAE8] dark:bg-[#1A1A1A] border-2 border-[#0D0D0D] dark:border-[#333333] flex items-center justify-between gap-4">
            <a
              href={portfolioData.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono font-bold text-[#0D0D0D] dark:text-[#F4F4F2] hover:underline"
            >
              <GithubIcon size={16} />
              <span>GITHUB (ZamLeu)</span>
            </a>
            <a
              href={portfolioData.personal.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono font-bold text-[#0D0D0D] dark:text-[#F4F4F2] hover:underline"
            >
              <Globe size={16} />
              <span>azambmusa.my</span>
            </a>
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-start">
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="px-6 py-3.5 bg-[#0D0D0D] text-[#F4F4F2] border-2 border-[#0D0D0D] dark:bg-[#F4F4F2] dark:text-[#0D0D0D] dark:border-[#F4F4F2] font-mono text-xs sm:text-sm font-bold tracking-wider hover:bg-[#F4F4F2] hover:text-[#0D0D0D] dark:hover:bg-[#0D0D0D] dark:hover:text-[#F4F4F2] transition-colors shadow-[3px_3px_0px_#0D0D0D] dark:shadow-[3px_3px_0px_#333333] active:translate-x-[2px] active:translate-y-[2px]"
          >
            Transmit Email
          </a>
        </div>
      </div>
    </section>
  );
};

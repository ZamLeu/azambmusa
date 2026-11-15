import { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import { RetroProjectPreview } from './RetroProjectPreview';
import { 
  Folder, 
  Briefcase, 
  Cpu, 
  GraduationCap, 
  Award, 
  Mail, 
  ExternalLink, 
  Power, 
  ArrowLeft, 
  ArrowRight,
  Send,
  CheckCircle2,
} from 'lucide-react';

interface RetroComputerEnvironmentProps {
  initialSection?: string;
  onExit: () => void;
}

interface OSTab {
  id: string;
  key: string;
  title: string;
  icon: React.ReactNode;
}

const OS_TABS: OSTab[] = [
  { id: 'projects', key: '1', title: 'PROJECTS', icon: <Folder size={13} /> },
  { id: 'experience', key: '2', title: 'EXPERIENCE', icon: <Briefcase size={13} /> },
  { id: 'skills', key: '3', title: 'SKILLS', icon: <Cpu size={13} /> },
  { id: 'education', key: '4', title: 'EDUCATION', icon: <GraduationCap size={13} /> },
  { id: 'certifications', key: '5', title: 'CERTS', icon: <Award size={13} /> },
  { id: 'contact', key: '6', title: 'CONTACT', icon: <Mail size={13} /> },
];

export const RetroComputerEnvironment: React.FC<RetroComputerEnvironmentProps> = ({
  initialSection = 'projects',
  onExit,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialSection);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [systemTime, setSystemTime] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const tick = () => setSystemTime(new Date().toTimeString().split(' ')[0]);
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { handleTriggerExit(); return; }
      const n = parseInt(e.key, 10);
      if (!isNaN(n) && n >= 1 && n <= OS_TABS.length) { setActiveTab(OS_TABS[n - 1].id); return; }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const i = OS_TABS.findIndex(t => t.id === activeTab);
        setActiveTab(OS_TABS[(i + 1) % OS_TABS.length].id);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const i = OS_TABS.findIndex(t => t.id === activeTab);
        setActiveTab(OS_TABS[(i - 1 + OS_TABS.length) % OS_TABS.length].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeTab]);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeTab]);

  const handleTriggerExit = () => {
    setIsClosing(true);
    setTimeout(onExit, 260);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) return;
    setIsSent(true);
    setTimeout(() => { setContactName(''); setContactEmail(''); setContactMsg(''); setIsSent(false); }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0D0D0D]/90 dark:bg-black/95 flex items-center justify-center p-2 sm:p-3 md:p-5 select-none font-mono">
      <div 
        className={`w-full h-full max-w-7xl max-h-[96vh] bg-[#F4F4F2] dark:bg-[#121212] border-4 border-[#0D0D0D] dark:border-[#333333] rounded-xl shadow-[0_0_0_6px_#0D0D0D,0_20px_50px_rgba(0,0,0,0.8)] dark:shadow-[0_0_0_6px_#222222,0_20px_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden relative ${
          isClosing ? 'animate-crt-close' : 'animate-crt-open'
        }`}
      >
        <div className="absolute inset-0 scanlines pointer-events-none opacity-20 z-40" />

        {/* UNIFIED TOP BAR: System info + Tabs + Eject — single row */}
        <div className="bg-[#0D0D0D] dark:bg-[#0A0A0A] text-[#F4F4F2] px-2 sm:px-4 py-1.5 flex items-center gap-2 border-b-2 border-[#0D0D0D] dark:border-[#333333] z-30 flex-wrap sm:flex-nowrap">
          {/* OS Badge */}
          <span className="bg-[#059669] text-white dark:bg-[#10B981] dark:text-[#0D0D0D] px-1.5 py-0.5 font-pixel text-[10px] shrink-0 font-bold">
            ZM_OS
          </span>

          {/* Tab Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto flex-1 py-0.5">
            {OS_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2 py-1 text-[11px] font-bold border transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#F4F4F2] text-[#0D0D0D] border-[#059669] dark:bg-[#F4F4F2] dark:text-[#0D0D0D] dark:border-[#10B981] shadow-[inset_0_-2px_0_#059669] dark:shadow-[inset_0_-2px_0_#10B981]'
                      : 'bg-transparent text-[#8E8E8A] border-transparent hover:text-[#F4F4F2] hover:bg-[#333] dark:hover:bg-[#222]'
                  }`}
                >
                  <span className="opacity-60">{tab.key}</span>
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.title}</span>
                </button>
              );
            })}
          </div>

          {/* Clock + Eject */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-[#8E8E8A] hidden sm:inline">{systemTime}</span>
            <button
              onClick={handleTriggerExit}
              className="bg-[#F4F4F2] text-[#0D0D0D] hover:bg-[#EAEAE8] dark:bg-[#2A2A2A] dark:text-[#F4F4F2] dark:hover:bg-[#333333] px-2 py-1 text-[11px] font-bold flex items-center gap-1 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
              title="Return to Desk (ESC)"
            >
              <Power size={11} />
              <span className="hidden sm:inline">EJECT [ESC]</span>
              <span className="sm:hidden">ESC</span>
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA — maximum breathing room */}
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto p-5 sm:p-8 md:p-10 lg:p-12 space-y-8 select-text relative z-20 text-[#0D0D0D] dark:text-[#F4F4F2]"
        >
          {/* PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="border-b-2 border-[#0D0D0D] dark:border-[#333333] pb-4">
                <h2 className="font-pixel text-xl sm:text-3xl text-[#0D0D0D] dark:text-[#F4F4F2]">
                  PRODUCTION CODE
                </h2>
                <p className="text-sm text-[#666663] dark:text-[#A0A09C] mt-2">
                  /sys/zm_os/projects — {portfolioData.projects.length} deployed systems
                </p>
              </div>

              <div className="space-y-8">
                {portfolioData.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F4F4F2] dark:bg-[#171717] border-2 border-[#0D0D0D] dark:border-[#333333] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#222222] p-6 sm:p-8 hover:shadow-[6px_6px_0px_#0D0D0D] dark:hover:shadow-[6px_6px_0px_#2a2a2a] transition-shadow"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-[#0D0D0D]/15 dark:border-[#333333]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold uppercase px-2.5 py-1 bg-[#0D0D0D] text-[#F4F4F2] dark:bg-[#F4F4F2] dark:text-[#0D0D0D]">
                          {proj.type}
                        </span>
                        {proj.year && (
                          <span className="text-xs px-2.5 py-1 bg-[#EAEAE8] dark:bg-[#222] border border-[#0D0D0D] dark:border-[#444] text-[#0D0D0D] dark:text-[#F4F4F2]">
                            {proj.year}
                          </span>
                        )}
                        {proj.award && (
                          <span className="text-xs font-bold px-2.5 py-1 border-2 border-[#0D0D0D] dark:border-[#555] text-[#0D0D0D] dark:text-[#F4F4F2]">
                            ★ {proj.award}
                          </span>
                        )}
                      </div>
                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#EAEAE8] dark:bg-[#222] px-2.5 py-1 border border-[#0D0D0D] dark:border-[#444] text-[#0D0D0D] dark:text-[#F4F4F2] hover:bg-[#0D0D0D] hover:text-[#F4F4F2] dark:hover:bg-[#F4F4F2] dark:hover:text-[#0D0D0D] transition-colors"
                        >
                          <span>{proj.domain}</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>

                    {/* 2-Column Responsive Layout: Details on Left, Live Viewport Preview on Right */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      <div className="lg:col-span-7 space-y-4">
                        <div>
                          <h3 className="font-pixel text-lg sm:text-2xl text-[#0D0D0D] dark:text-[#F4F4F2] mb-1">
                            {proj.title}
                          </h3>
                          <div className="text-xs text-[#666663] dark:text-[#A0A09C] font-bold">
                            // {proj.tagline}
                          </div>
                        </div>

                        <p className="text-sm text-[#0D0D0D] dark:text-[#D4D4D0] leading-relaxed">
                          {proj.description}
                        </p>

                        <div className="space-y-2 text-sm bg-[#EAEAE8] dark:bg-[#1E1E1E] p-4 border border-[#0D0D0D] dark:border-[#333333]">
                          {proj.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2.5">
                              <span className="text-[#0D0D0D] dark:text-[#F4F4F2] font-bold select-none mt-0.5">{'>'}</span>
                              <span className="text-[#0D0D0D] dark:text-[#D4D4D0]">{feat}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {proj.tech.map((t, tIdx) => (
                            <span key={tIdx} className="px-2.5 py-1 text-xs bg-[#EAEAE8] dark:bg-[#222222] border border-[#0D0D0D] dark:border-[#444444] text-[#0D0D0D] dark:text-[#F4F4F2] font-bold">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-5 w-full">
                        <RetroProjectPreview project={proj} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="border-b-2 border-[#0D0D0D] dark:border-[#333333] pb-4">
                <h2 className="font-pixel text-xl sm:text-3xl text-[#0D0D0D] dark:text-[#F4F4F2]">
                  WORK & RESEARCH
                </h2>
                <p className="text-sm text-[#666663] dark:text-[#A0A09C] mt-2">
                  Industry internship & AI research records
                </p>
              </div>

              <div className="space-y-8">
                {portfolioData.experience.map((exp, idx) => (
                  <div key={idx} className="bg-[#F4F4F2] dark:bg-[#171717] border-2 border-[#0D0D0D] dark:border-[#333333] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#222222] p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-[#0D0D0D]/15 dark:border-[#333333]">
                      <span className="text-xs font-bold text-[#0D0D0D] dark:text-[#F4F4F2]">
                        {exp.organization}
                      </span>
                      <span className="text-xs text-[#666663] dark:text-[#A0A09C] bg-[#EAEAE8] dark:bg-[#222] px-2.5 py-1 border border-[#0D0D0D] dark:border-[#444]">
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="font-pixel text-lg sm:text-2xl text-[#0D0D0D] dark:text-[#F4F4F2] mb-5">
                      {exp.role}
                    </h3>

                    <div className="space-y-2.5 text-sm bg-[#EAEAE8] dark:bg-[#1E1E1E] p-5 border border-[#0D0D0D] dark:border-[#333333] mb-5">
                      {exp.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5">
                          <span className="text-[#0D0D0D] dark:text-[#F4F4F2] font-bold select-none mt-0.5">{'>'}</span>
                          <span className="text-[#0D0D0D] dark:text-[#D4D4D0] leading-relaxed">{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-3 border-t border-[#0D0D0D]/15 dark:border-[#333333]">
                      {exp.skills.map((sk, sIdx) => (
                        <span key={sIdx} className="px-2.5 py-1 text-xs bg-[#EAEAE8] dark:bg-[#222222] border border-[#0D0D0D] dark:border-[#444444] text-[#0D0D0D] dark:text-[#F4F4F2] font-bold">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="border-b-2 border-[#0D0D0D] dark:border-[#333333] pb-4">
                <h2 className="font-pixel text-xl sm:text-3xl text-[#0D0D0D] dark:text-[#F4F4F2]">
                  TECH STACK
                </h2>
                <p className="text-sm text-[#666663] dark:text-[#A0A09C] mt-2">
                  Languages, cloud, frameworks, and engineering practices
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(portfolioData.skills).map(([category, items], idx) => {
                  const titles: Record<string, string> = {
                    languagesAndCore: 'LANGUAGES & RUNTIMES',
                    cloudInfraAndTools: 'CLOUD, INFRA & TOOLS',
                    frameworksAndApis: 'FRAMEWORKS & APIS',
                    engineeringPractices: 'ENGINEERING PRACTICES',
                  };
                  return (
                    <div key={idx} className="p-6 bg-[#F4F4F2] dark:bg-[#171717] border-2 border-[#0D0D0D] dark:border-[#333333] shadow-[3px_3px_0px_#0D0D0D] dark:shadow-[3px_3px_0px_#222222]">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#0D0D0D]/15 dark:border-[#333333]">
                        <h3 className="font-pixel text-sm text-[#0D0D0D] dark:text-[#F4F4F2]">
                          {titles[category] || category.toUpperCase()}
                        </h3>
                        <span className="text-[10px] text-[#666663] dark:text-[#A0A09C] font-bold">[{items.length}]</span>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {items.map((skill, sIdx) => (
                          <span key={sIdx} className="px-3 py-1.5 text-xs bg-[#EAEAE8] dark:bg-[#222222] border border-[#0D0D0D] dark:border-[#444444] text-[#0D0D0D] dark:text-[#F4F4F2] font-bold hover:bg-[#0D0D0D] hover:text-[#F4F4F2] dark:hover:bg-[#F4F4F2] dark:hover:text-[#0D0D0D] transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="border-b-2 border-[#0D0D0D] dark:border-[#333333] pb-4">
                <h2 className="font-pixel text-xl sm:text-3xl text-[#0D0D0D] dark:text-[#F4F4F2]">
                  EDUCATION
                </h2>
                <p className="text-sm text-[#666663] dark:text-[#A0A09C] mt-2">
                  Undergraduate & vocational computing credentials
                </p>
              </div>

              <div className="space-y-8">
                {portfolioData.education.map((edu, idx) => (
                  <div key={idx} className="bg-[#F4F4F2] dark:bg-[#171717] border-2 border-[#0D0D0D] dark:border-[#333333] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#222222] p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-[#0D0D0D]/15 dark:border-[#333333]">
                      <span className="text-xs font-bold text-[#666663] dark:text-[#A0A09C]">
                        CGPA: {edu.cgpa}
                      </span>
                      <span className="text-xs text-[#666663] dark:text-[#A0A09C] bg-[#EAEAE8] dark:bg-[#222] px-2.5 py-1 border border-[#0D0D0D] dark:border-[#444]">
                        {edu.statusOrYear}
                      </span>
                    </div>

                    <h3 className="font-pixel text-lg sm:text-2xl text-[#0D0D0D] dark:text-[#F4F4F2] mb-2">
                      {edu.degree}
                    </h3>
                    <div className="text-sm font-bold text-[#666663] dark:text-[#A0A09C] mb-5">
                      {edu.institution} — {edu.location}
                    </div>

                    {edu.details && (
                      <div className="space-y-2.5 text-sm bg-[#EAEAE8] dark:bg-[#1E1E1E] p-5 border border-[#0D0D0D] dark:border-[#333333]">
                        {edu.details.map((d, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5">
                            <span className="text-[#0D0D0D] dark:text-[#F4F4F2] font-bold select-none mt-0.5">{'>'}</span>
                            <span className="text-[#0D0D0D] dark:text-[#D4D4D0]">{d}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATIONS */}
          {activeTab === 'certifications' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="border-b-2 border-[#0D0D0D] dark:border-[#333333] pb-4">
                <h2 className="font-pixel text-xl sm:text-3xl text-[#0D0D0D] dark:text-[#F4F4F2]">
                  CERTIFICATIONS
                </h2>
                <p className="text-sm text-[#666663] dark:text-[#A0A09C] mt-2">
                  Industry credentials from IBM Skills Network
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolioData.certifications.map((cert, idx) => (
                  <div key={idx} className="bg-[#F4F4F2] dark:bg-[#171717] border-2 border-[#0D0D0D] dark:border-[#333333] shadow-[3px_3px_0px_#0D0D0D] dark:shadow-[3px_3px_0px_#222222] p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#666663] dark:text-[#A0A09C] mb-4 pb-3 border-b border-[#0D0D0D]/15 dark:border-[#333333]">
                        <span className="font-bold uppercase px-2.5 py-1 bg-[#0D0D0D] text-[#F4F4F2] dark:bg-[#F4F4F2] dark:text-[#0D0D0D]">VERIFIED</span>
                        <span>{cert.date}</span>
                      </div>
                      <h3 className="font-pixel text-base sm:text-lg text-[#0D0D0D] dark:text-[#F4F4F2] mb-3 leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-[#666663] dark:text-[#A0A09C] mb-5">Issuer: {cert.issuer}</p>
                    </div>
                    <div className="text-xs font-bold bg-[#EAEAE8] dark:bg-[#222222] p-3 border border-[#0D0D0D] dark:border-[#444444] flex items-center gap-1.5 text-[#0D0D0D] dark:text-[#F4F4F2]">
                      <CheckCircle2 size={13} />
                      <span>CREDENTIAL: VERIFIED</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT */}
          {activeTab === 'contact' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="border-b-2 border-[#0D0D0D] dark:border-[#333333] pb-4">
                <h2 className="font-pixel text-xl sm:text-3xl text-[#0D0D0D] dark:text-[#F4F4F2]">
                  TRANSMIT MESSAGE
                </h2>
                <p className="text-sm text-[#666663] dark:text-[#A0A09C] mt-2">
                  Direct communication with azambmusa
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 bg-[#F4F4F2] dark:bg-[#171717] border-2 border-[#0D0D0D] dark:border-[#333333] shadow-[4px_4px_0px_#0D0D0D] dark:shadow-[4px_4px_0px_#222222] p-6 sm:p-8">
                  <div className="text-xs font-bold uppercase mb-5 pb-3 border-b border-[#0D0D0D]/15 dark:border-[#333333]">
                    TERMINAL_DISPATCH // SEND MESSAGE
                  </div>

                  {isSent ? (
                    <div className="p-8 bg-[#EAEAE8] dark:bg-[#222222] border-2 border-[#0D0D0D] dark:border-[#444] text-center space-y-3">
                      <CheckCircle2 size={28} className="mx-auto text-[#0D0D0D] dark:text-[#F4F4F2]" />
                      <h4 className="font-pixel text-sm text-[#0D0D0D] dark:text-[#F4F4F2]">MESSAGE TRANSMITTED!</h4>
                      <p className="text-xs text-[#666663] dark:text-[#A0A09C]">Azam will review your ping shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSend} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5 text-[#0D0D0D] dark:text-[#F4F4F2]">SENDER_NAME:</label>
                        <input type="text" required value={contactName} onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Recruit Manager"
                          className="w-full p-3 bg-[#EAEAE8] dark:bg-[#222222] border-2 border-[#0D0D0D] dark:border-[#444444] text-[#0D0D0D] dark:text-[#F4F4F2] text-sm font-mono focus:outline-none focus:bg-[#F4F4F2] dark:focus:bg-[#1A1A1A]" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5 text-[#0D0D0D] dark:text-[#F4F4F2]">RETURN_EMAIL:</label>
                        <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="your.email@org.com"
                          className="w-full p-3 bg-[#EAEAE8] dark:bg-[#222222] border-2 border-[#0D0D0D] dark:border-[#444444] text-[#0D0D0D] dark:text-[#F4F4F2] text-sm font-mono focus:outline-none focus:bg-[#F4F4F2] dark:focus:bg-[#1A1A1A]" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5 text-[#0D0D0D] dark:text-[#F4F4F2]">PAYLOAD:</label>
                        <textarea required rows={4} value={contactMsg} onChange={(e) => setContactMsg(e.target.value)}
                          placeholder="Your message or inquiry..."
                          className="w-full p-3 bg-[#EAEAE8] dark:bg-[#222222] border-2 border-[#0D0D0D] dark:border-[#444444] text-[#0D0D0D] dark:text-[#F4F4F2] text-sm font-mono focus:outline-none focus:bg-[#F4F4F2] dark:focus:bg-[#1A1A1A]" />
                      </div>
                      <button type="submit"
                        className="w-full py-3 bg-[#0D0D0D] text-[#F4F4F2] border-2 border-[#0D0D0D] dark:bg-[#F4F4F2] dark:text-[#0D0D0D] dark:border-[#F4F4F2] text-sm font-bold uppercase flex items-center justify-center gap-2 hover:bg-[#F4F4F2] hover:text-[#0D0D0D] dark:hover:bg-[#0D0D0D] dark:hover:text-[#F4F4F2] transition-colors cursor-pointer shadow-[3px_3px_0px_#0D0D0D] dark:shadow-[3px_3px_0px_#333333]">
                        <Send size={14} />
                        <span>DISPATCH</span>
                      </button>
                    </form>
                  )}
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-[#EAEAE8] dark:bg-[#1A1A1A] border-2 border-[#0D0D0D] dark:border-[#333333] p-6 space-y-4">
                    <div className="text-xs font-bold uppercase pb-3 border-b border-[#0D0D0D]/15 dark:border-[#333333] text-[#0D0D0D] dark:text-[#F4F4F2]">DIRECT CHANNELS</div>
                    <div>
                      <span className="text-[10px] text-[#666663] dark:text-[#A0A09C] uppercase block font-bold mb-0.5">EMAIL</span>
                      <a href={`mailto:${portfolioData.personal.email}`} className="text-sm font-bold text-[#0D0D0D] dark:text-[#F4F4F2] hover:underline">{portfolioData.personal.email}</a>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#666663] dark:text-[#A0A09C] uppercase block font-bold mb-0.5">WHATSAPP</span>
                      <a 
                        href={portfolioData.personal.whatsappUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm font-bold text-[#0D0D0D] dark:text-[#F4F4F2] hover:underline flex items-center gap-1.5"
                      >
                        <span>START CHAT</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#666663] dark:text-[#A0A09C] uppercase block font-bold mb-0.5">LOCATION</span>
                      <span className="text-sm font-bold text-[#0D0D0D] dark:text-[#F4F4F2]">{portfolioData.personal.location}</span>
                    </div>
                  </div>

                  <div className="bg-[#F4F4F2] dark:bg-[#171717] border-2 border-[#0D0D0D] dark:border-[#333333] p-6 space-y-3">
                    <div className="text-xs font-bold uppercase pb-3 border-b border-[#0D0D0D]/15 dark:border-[#333333] text-[#0D0D0D] dark:text-[#F4F4F2]">LINKS</div>
                    <a href={portfolioData.personal.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm font-bold p-3 bg-[#EAEAE8] dark:bg-[#222222] border border-[#0D0D0D] dark:border-[#444444] text-[#0D0D0D] dark:text-[#F4F4F2] hover:bg-[#0D0D0D] hover:text-[#F4F4F2] dark:hover:bg-[#F4F4F2] dark:hover:text-[#0D0D0D] transition-colors">
                      <span>GITHUB / {portfolioData.personal.githubUsername}</span>
                      <ExternalLink size={13} />
                    </a>
                    <a href={portfolioData.personal.websiteUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm font-bold p-3 bg-[#EAEAE8] dark:bg-[#222222] border border-[#0D0D0D] dark:border-[#444444] text-[#0D0D0D] dark:text-[#F4F4F2] hover:bg-[#0D0D0D] hover:text-[#F4F4F2] dark:hover:bg-[#F4F4F2] dark:hover:text-[#0D0D0D] transition-colors">
                      <span>DOMAIN / {portfolioData.personal.website}</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SLIM BOTTOM BAR */}
        <div className="bg-[#0D0D0D] dark:bg-[#0A0A0A] text-[#F4F4F2] px-3 sm:px-4 py-1.5 border-t-2 border-[#0D0D0D] dark:border-[#333333] flex items-center justify-between text-[10px] font-mono z-30">
          <span className="text-[#8E8E8A]">
            <kbd className="bg-[#333] px-1 text-[#F4F4F2]">1-6</kbd> TABS
            <span className="mx-1.5">|</span>
            <kbd className="bg-[#333] px-1 text-[#F4F4F2]">←→</kbd> CYCLE
            <span className="mx-1.5">|</span>
            <kbd className="bg-[#333] px-1 text-[#F4F4F2]">ESC</kbd> EXIT
          </span>

          <div className="flex items-center gap-1.5">
            <button onClick={() => { const i = OS_TABS.findIndex(t => t.id === activeTab); setActiveTab(OS_TABS[(i - 1 + OS_TABS.length) % OS_TABS.length].id); }}
              className="p-0.5 bg-[#333] hover:bg-[#555] cursor-pointer text-[#F4F4F2]"><ArrowLeft size={11} /></button>
            <button onClick={() => { const i = OS_TABS.findIndex(t => t.id === activeTab); setActiveTab(OS_TABS[(i + 1) % OS_TABS.length].id); }}
              className="p-0.5 bg-[#333] hover:bg-[#555] cursor-pointer text-[#F4F4F2]"><ArrowRight size={11} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

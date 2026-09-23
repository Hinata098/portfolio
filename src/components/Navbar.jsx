import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Github, Mail, Menu, X, Sparkles, MapPin } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = soundManager.toggleMute();
    setIsMuted(newState);
    if (!newState) {
      soundManager.playSuccess();
    }
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Terminal', href: '#terminal' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    soundManager.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div 
          className={`pointer-events-auto rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'floating-header-glass py-2.5 px-3 sm:px-5 shadow-2xl border-cyber-cyan/30'
              : 'bg-cyber-card/75 backdrop-blur-xl border border-cyber-border/80 py-3 px-3 sm:px-5 shadow-glass'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            
            {/* Top-Left: Round Cut Logo with Custom Image & Name */}
            <a
              href="#"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan rounded-full pr-2"
              title="MD Rifat Mohsin Tapader | Home"
            >
              {/* Circular Cut Logo Frame */}
              <div className="round-logo-frame shrink-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden relative bg-black border-2 border-[#090e1c]">
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt="MD Rifat Mohsin Tapader Avatar"
                    className="w-full h-full object-cover object-[center_32%] filter contrast-110 brightness-105 group-hover:scale-115 transition-transform duration-500 ease-out"
                    loading="eager"
                  />
                  {/* Subtle inner gloss highlight */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-white/20 pointer-events-none" />
                </div>
              </div>

              {/* Title & Location details */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-100 text-xs sm:text-sm tracking-wide group-hover:text-cyber-cyan transition-colors">
                    {PERSONAL_INFO.preferredName}
                  </span>
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyber-crimson animate-ping" />
                </div>
                <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-slate-400">
                  <MapPin size={11} className="text-cyber-cyan shrink-0" />
                  <span className="text-slate-300 font-medium">Sylhet</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400 font-semibold">Online</span>
                </div>
              </div>
            </a>

            {/* Center: Segmented Navigation Pills */}
            <nav className="hidden lg:flex items-center gap-1 px-3 py-1 rounded-full bg-cyber-bg/80 border border-cyber-border/70">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  onMouseEnter={() => soundManager.playHover()}
                  className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-cyber-cyan hover:bg-cyber-cyan/10 rounded-full transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right: Audio Waveform, GitHub & Connect CTA */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Sound Equalizer Toggle */}
              <button
                onClick={toggleSound}
                onMouseEnter={() => soundManager.playHover()}
                title={isMuted ? "Enable Audio Synthesizer" : "Mute Sound Effects"}
                className={`p-2 sm:px-2.5 sm:py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                  !isMuted 
                    ? 'bg-cyber-card border-cyber-cyan/60 text-cyber-cyan shadow-neon-cyan' 
                    : 'bg-cyber-card/70 border-cyber-border text-slate-400 hover:text-slate-200'
                }`}
                aria-label="Toggle sound effects"
              >
                {!isMuted ? (
                  <>
                    {/* Equalizer Frequency Bars */}
                    <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                      <span className="w-0.5 bg-cyber-cyan animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
                      <span className="w-0.5 bg-cyber-crimson animate-[pulse_0.8s_ease-in-out_infinite_0.2s] h-3/4" />
                      <span className="w-0.5 bg-cyber-cyan animate-[pulse_0.5s_ease-in-out_infinite_0.4s] h-full" />
                    </div>
                    <span className="hidden xl:inline text-[10px] font-mono uppercase tracking-wider font-semibold">
                      SFX ON
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX size={16} />
                    <span className="hidden xl:inline text-[10px] font-mono uppercase tracking-wider">
                      MUTED
                    </span>
                  </>
                )}
              </button>

              {/* GitHub Button */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
                title="GitHub @Rifat-Profiles"
                className="p-2 sm:p-2.5 rounded-xl bg-cyber-card border border-cyber-border text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan transition-all"
                aria-label="GitHub Profile"
              >
                <Github size={17} />
              </a>

              {/* Get in Touch CTA */}
              <a
                href="#contact"
                onClick={handleLinkClick}
                onMouseEnter={() => soundManager.playHover()}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-cyber-cyan via-blue-500 to-cyber-crimson text-black hover:opacity-95 shadow-neon-cyan transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles size={14} />
                <span>Connect</span>
              </a>

              {/* Mobile Drawer Hamburger */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden p-2 rounded-xl bg-cyber-card border border-cyber-border text-slate-200 hover:text-cyber-cyan"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

            </div>

          </div>

          {/* Mobile Collapsible Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-cyber-border/70 space-y-2 animate-float">
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-cyber-cyan hover:bg-cyber-cyan/10 bg-slate-900/60 text-center border border-cyber-border/50"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <MapPin size={12} className="text-cyber-cyan" /> Sylhet, Bangladesh
                </span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-xs font-mono text-cyber-cyan bg-cyber-cyan/10 px-3 py-1.5 rounded-lg border border-cyber-cyan/30 flex items-center gap-1"
                >
                  <Mail size={12} /> Email Me
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}

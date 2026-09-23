import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Github, Sparkles, MapPin } from 'lucide-react';
import Hero3DCanvas from './canvas/Hero3DCanvas';
import { soundManager } from '../utils/audio';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Hero() {
  const roles = [
    "Android & Mobile App Developer",
    "Modern Web & React Engineer",
    "Kotlin & Jetpack Compose Specialist",
    "3D Creative & Interactive Developer"
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFull = roles[currentRoleIndex];
    let timer;

    if (!isDeleting && displayText === currentFull) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        const nextChar = isDeleting
          ? currentFull.substring(0, displayText.length - 1)
          : currentFull.substring(0, displayText.length + 1);
        setDisplayText(nextChar);
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <section className="relative min-h-screen pt-32 pb-16 flex items-center justify-center overflow-hidden bg-cinematic-mesh">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hero Content & Intros */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            
            {/* Availability & Location Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-card/90 border border-emerald-500/40 w-fit backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-emerald-300 font-medium">
                  {PERSONAL_INFO.status}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyber-card/80 border border-cyber-border text-[11px] font-mono text-slate-300">
                <MapPin size={12} className="text-cyber-cyan" />
                <span>Sylhet, Bangladesh</span>
              </div>
            </div>

            {/* Name & Title */}
            <div>
              <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyber-cyan mb-2 flex items-center gap-2">
                <Sparkles size={15} className="text-cyber-crimson animate-pulse" />
                <span>Mobile Architecture • Creative Web • 3D</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-cyber-crimson">MD Rifat Mohsin</span>
              </h1>
            </div>

            {/* Dynamic Typewriter Subheading */}
            <div className="h-10 flex items-center font-mono text-lg sm:text-2xl text-slate-300">
              <span className="text-cyber-crimson mr-2 font-bold">&gt;</span>
              <span className="text-cyber-cyan font-semibold">{displayText}</span>
              <span className="w-2.5 h-6 bg-cyber-crimson ml-1 animate-pulse" />
            </div>

            {/* Bio paragraph */}
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Based in <span className="text-white font-medium">Sylhet, Bangladesh</span>. Creator of <span className="text-cyber-cyan font-medium">Nexload</span> (Android Media Downloader) and <span className="text-purple-400 font-medium">TaskFlow</span> (Offline Productivity Suite). Specializing in Kotlin & Compose mobile apps, paired with high-performance 3D & reactive web platforms.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
                className="px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-cyber-cyan via-blue-500 to-cyber-crimson text-black hover:opacity-95 shadow-neon-cyan flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Projects</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="#terminal"
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
                className="px-5 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider bg-cyber-card border border-cyber-border text-slate-200 hover:text-cyber-cyan hover:border-cyber-cyan/50 flex items-center gap-2 transition-all"
              >
                <Terminal size={16} />
                <span>Dev Console</span>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
                className="p-3.5 rounded-xl bg-cyber-card border border-cyber-border text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-all"
                title="GitHub @Rifat-Profiles"
              >
                <Github size={20} />
              </a>
            </div>

            {/* Fast Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-cyber-border/60">
              <div className="p-3 rounded-xl bg-cyber-card/60 border border-cyber-border/50">
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyber-cyan">Android</div>
                <div className="text-[11px] text-slate-400">Kotlin & Compose</div>
              </div>
              <div className="p-3 rounded-xl bg-cyber-card/60 border border-cyber-border/50">
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyber-crimson">Web & 3D</div>
                <div className="text-[11px] text-slate-400">React & Three.js</div>
              </div>
              <div className="p-3 rounded-xl bg-cyber-card/60 border border-cyber-border/50">
                <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400">Offline</div>
                <div className="text-[11px] text-slate-400">Room DB & Cache</div>
              </div>
              <div className="p-3 rounded-xl bg-cyber-card/60 border border-cyber-border/50">
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">Sylhet</div>
                <div className="text-[11px] text-slate-400">Global Remote</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full h-[400px] sm:h-[480px] lg:h-[540px] relative">
              
              <div className="absolute top-2 right-2 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-cyber-bg/85 border border-cyber-cyan/40 text-cyber-cyan shadow-neon-cyan">
                  3D Interactive • Drag / Hover
                </span>
              </div>

              {/* The Three.js Canvas */}
              <Hero3DCanvas />

              {/* Holographic backdrop glow */}
              <div className="absolute inset-0 bg-cyber-cyan/5 rounded-full filter blur-3xl pointer-events-none -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

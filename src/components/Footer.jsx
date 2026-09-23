import React from 'react';
import { ArrowUp, Github, Mail, Heart, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

export default function Footer() {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-cyber-border/70 relative bg-cyber-bg/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Rights */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-pulse" />
              <span className="font-bold text-slate-100 font-mono text-sm tracking-wide">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} • Engineered with React, Three.js & Tailwind CSS.
            </p>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-6">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="text-xs font-mono text-slate-400 hover:text-cyber-cyan flex items-center gap-1.5 transition-colors"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="text-xs font-mono text-slate-400 hover:text-cyber-cyan flex items-center gap-1.5 transition-colors"
            >
              <Mail size={14} />
              <span>Email</span>
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundManager.playHover()}
            className="p-3 rounded-xl bg-cyber-card border border-cyber-border text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan transition-all shadow-glass"
            aria-label="Back to top"
            title="Scroll to Top"
          >
            <ArrowUp size={18} />
          </button>

        </div>
      </div>
    </footer>
  );
}

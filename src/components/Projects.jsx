import React, { useState } from 'react';
import { Github, ExternalLink, Smartphone, Globe, Sparkles, Star, Download, ShieldCheck, Check } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

// Interactive 3D Tilt Project Card
function ProjectCard({ project }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundManager.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="glass-panel rounded-2xl p-6 sm:p-7 border border-cyber-border/80 flex flex-col justify-between relative overflow-hidden group shadow-glass"
    >
      {/* Accent Top Border Bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
        style={{ backgroundColor: project.accentColor }}
      />

      {/* Background glow on hover */}
      <div 
        className="absolute -inset-1 opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500 pointer-events-none -z-10"
        style={{ backgroundColor: project.accentColor }}
      />

      <div>
        {/* Card Header & Metadata */}
        <div className="flex items-center justify-between mb-4">
          <span 
            className="text-[11px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-semibold border"
            style={{ 
              backgroundColor: `${project.accentColor}15`, 
              color: project.accentColor, 
              borderColor: `${project.accentColor}40` 
            }}
          >
            {project.platform}
          </span>
          <span className="text-xs font-mono text-slate-400">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-xs font-mono text-cyber-cyan mb-3">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Key Highlights */}
        <div className="space-y-1.5 mb-6">
          {project.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
              <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Technologies Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-900/90 text-slate-300 border border-slate-800"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer Metrics & External Links */}
        <div className="pt-4 border-t border-cyber-border/70 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            {project.metrics}
          </span>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
                className="p-2 rounded-xl bg-cyber-card border border-cyber-border text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan transition-all"
                title="View Source on GitHub"
              >
                <Github size={16} />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
                className="p-2 rounded-xl bg-cyber-card border border-cyber-border text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan transition-all"
                title="Live View"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('ALL');

  const categories = [
    { label: 'All Works', value: 'ALL' },
    { label: 'Android Apps (Kotlin)', value: 'Android' },
    { label: 'Web & 3D Platforms', value: 'Web' },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'ALL') return true;
    if (filter === 'Android') return p.platform.includes('Android');
    if (filter === 'Web') return p.platform.includes('Web') || p.platform.includes('Backend');
    return true;
  });

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-cyber-cyan bg-cyber-card border border-cyber-border mb-3">
            <Sparkles size={14} className="text-cyber-cyan" />
            Verified Deployments
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-purple-400 to-pink-500">Live Repositories</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Real production utilities, Android APKs, and interactive web architectures built by MD Rifat Mohsin Tapader.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                soundManager.playClick();
                setFilter(cat.value);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all border ${
                filter === cat.value
                  ? 'bg-cyber-card text-cyber-cyan border-cyber-cyan shadow-neon-cyan'
                  : 'bg-cyber-card/60 text-slate-400 border-cyber-border hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom GitHub Profile Callout */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 glass-panel px-6 py-4 rounded-2xl border border-cyber-border">
            <span className="text-xs sm:text-sm font-mono text-slate-300">
              Want to inspect more code, commit history, and active branches?
            </span>
            <a
              href="https://github.com/Rifat-Profiles"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-cyber-card text-cyber-cyan border border-cyber-cyan/50 hover:bg-cyber-cyan/10 transition-colors"
            >
              <Github size={16} />
              <span>Explore GitHub (@Rifat-Profiles)</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { Smartphone, Globe, Server, Cpu, Check, Sparkles } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

const iconMap = {
  Smartphone: Smartphone,
  Globe: Globe,
  Server: Server,
  Cpu: Cpu,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="py-24 relative bg-cyber-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-purple-400 bg-cyber-card border border-cyber-border mb-3">
            <Sparkles size={14} className="text-purple-400" />
            Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Specialized Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-purple-400">Tech Stack</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Modern mobile architectures, responsive web technologies, and scalable backend primitives.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Cpu;
            const isActive = activeCategory === idx;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  soundManager.playClick();
                  setActiveCategory(idx);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? 'bg-cyber-card text-cyber-cyan border-cyber-cyan shadow-neon-cyan'
                    : 'bg-cyber-card/60 text-slate-400 border-cyber-border hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                <Icon size={16} style={{ color: isActive ? cat.color : undefined }} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Skill Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {SKILL_CATEGORIES[activeCategory].skills.map((skill, index) => (
            <div
              key={skill.name}
              onMouseEnter={() => soundManager.playHover()}
              className="glass-panel glass-panel-hover p-5 rounded-2xl border border-cyber-border/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-base text-slate-100 font-mono flex items-center gap-2">
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: SKILL_CATEGORIES[activeCategory].color }}
                    />
                    {skill.name}
                  </span>
                  <span className="text-xs font-mono text-cyber-cyan font-bold">
                    {skill.level}%
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {skill.desc}
                </p>
              </div>

              {/* Progress Track */}
              <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden p-0.5 border border-slate-700/50">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor: SKILL_CATEGORIES[activeCategory].color,
                    boxShadow: `0 0 10px ${SKILL_CATEGORIES[activeCategory].color}80`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Skill Badges ticker */}
        <div className="mt-16 pt-8 border-t border-cyber-border/60 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
            Ecosystem Highlights & Tooling
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
            {[
              "Kotlin 2.0", "Jetpack Compose", "Android Coroutines", "Room Database", 
              "React 18", "Three.js / WebGL", "Tailwind CSS", "JavaScript ES2024", 
              "Node.js", "Express", "RESTful Architecture", "Git & GitHub Workflow",
              "Offline-First Design", "Material Design 3", "MVVM Pattern"
            ].map((badge) => (
              <span
                key={badge}
                onMouseEnter={() => soundManager.playHover()}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-cyber-card border border-cyber-border/70 text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-colors"
              >
                #{badge}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

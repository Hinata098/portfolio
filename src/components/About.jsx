import React from 'react';
import { Smartphone, Globe, Layers, Zap, CheckCircle2, Shield, HeartHandshake } from 'lucide-react';
import TechSphereCanvas from './canvas/TechSphereCanvas';
import { PERSONAL_INFO, WORK_PHILOSOPHY } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-cyber-cyan bg-cyber-card border border-cyber-border mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse"></span>
            Profile Matrix
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering With <span className="text-cyber-cyan">Precision</span> & <span className="text-purple-400">Scale</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Bridging the gap between robust native mobile engineering in Kotlin and immersive, dynamic web applications with React and Three.js.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Interactive 3D Sphere & Ecosystem */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full glass-panel rounded-2xl p-6 border border-cyber-border relative overflow-hidden group">
              <div className="flex items-center justify-between border-b border-cyber-border/70 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="text-xs font-mono text-slate-400 ml-2">system://orbit_matrix</span>
                </div>
                <span className="text-[10px] font-mono text-cyber-cyan">Rotatable 3D</span>
              </div>

              {/* 3D Tech Sphere */}
              <TechSphereCanvas />

              <div className="mt-4 text-center">
                <p className="text-xs font-mono text-slate-300">
                  <span className="text-cyber-cyan font-bold">Interactive Node Cloud:</span> Visualizing synchronized data flow between Android Services, Web Clients & Cloud APIs.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Details & Core Pillars */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyber-border/80">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Layers className="text-cyber-cyan" size={20} />
                <span>The Dual-Discipline Advantage</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                I specialize in both <strong className="text-white">Android Mobile Development</strong> and <strong className="text-white">Modern Full-Stack Web Applications</strong>. This combination allows me to architect end-to-end solutions that are responsive, intuitive, and thoroughly optimized from client down to database persistence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-cyber-cyan shrink-0" />
                  <span>Kotlin Coroutines & Flow</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                  <span>Jetpack Compose UI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Offline-First (Room DB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                  <span>React & 3D Three.js Web</span>
                </div>
              </div>
            </div>

            {/* Philosophy Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {WORK_PHILOSOPHY.map((pillar, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => soundManager.playHover()}
                  className="glass-panel glass-panel-hover p-4 rounded-xl border border-cyber-border/60"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${pillar.color}15`, border: `1px solid ${pillar.color}40` }}
                  >
                    <Zap size={16} style={{ color: pillar.color }} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 mb-1">{pillar.title}</h4>
                  <p className="text-[12px] text-slate-400 leading-snug">{pillar.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

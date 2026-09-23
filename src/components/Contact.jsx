import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, MessageSquare, Sparkles, MapPin, ExternalLink, Laptop } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Mobile App (Android)',
    message: ''
  });
  const [dispatchMethod, setDispatchMethod] = useState('gmail'); // 'gmail' | 'mailapp' | 'copy'
  const [statusMessage, setStatusMessage] = useState('');

  const copyEmail = () => {
    soundManager.playSuccess();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDispatch = (e) => {
    e.preventDefault();
    soundManager.playSuccess();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });

    const subject = `[Portfolio Inquiry] ${formData.projectType} from ${formData.name}`;
    const body = `Hi Rifat,\n\nMy name is ${formData.name} (${formData.email}).\nProject Category: ${formData.projectType}\n\nMessage:\n${formData.message}\n\nSent from your 3D Portfolio`;

    if (dispatchMethod === 'gmail') {
      // Direct Web Gmail compose URL - 100% reliable in any web browser without local email software
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        PERSONAL_INFO.email
      )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.open(gmailUrl, '_blank');
      setStatusMessage('✓ Opening Gmail in a new tab with your pre-filled message...');
    } else if (dispatchMethod === 'mailapp') {
      // Default local mail app (Outlook, Apple Mail, Thunderbird)
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      
      window.location.href = mailtoUrl;
      setStatusMessage('✓ Launching your device’s default mail app...');
    } else {
      // Copy formatted message to clipboard
      navigator.clipboard.writeText(`To: ${PERSONAL_INFO.email}\nSubject: ${subject}\n\n${body}`);
      setStatusMessage('✓ Formatted transmission copied to clipboard! You can paste it into any mail app.');
    }

    setTimeout(() => setStatusMessage(''), 6000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-cyber-cyan bg-cyber-card border border-cyber-border mb-3">
            <Sparkles size={14} className="text-cyber-crimson animate-pulse" />
            Direct Communication
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-cyber-crimson">Extraordinary</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Have an Android app concept, high-performance web platform, or engineering opportunity? Let's talk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Credentials & Status */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Email Copy Card */}
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-cyber-border/80 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Direct Inquiries</span>
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Inbox
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 border border-cyber-border mb-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail className="text-cyber-cyan shrink-0" size={18} />
                  <span className="font-mono text-xs sm:text-sm text-slate-100 truncate select-all">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
                <button
                  onClick={copyEmail}
                  onMouseEnter={() => soundManager.playHover()}
                  title="Copy email to clipboard"
                  className="p-2 rounded-lg bg-cyber-card hover:bg-cyber-cyan/15 text-slate-300 hover:text-cyber-cyan transition-all border border-cyber-border shrink-0 ml-2"
                  aria-label="Copy Email"
                >
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>

              {copied && (
                <p className="text-xs font-mono text-emerald-400 mb-2 animate-pulse">
                  ✓ Copied {PERSONAL_INFO.email} to clipboard!
                </p>
              )}

              <p className="text-xs text-slate-400 leading-relaxed">
                Direct inquiries are routed directly to <span className="text-slate-200 font-mono">{PERSONAL_INFO.email}</span> with guaranteed replies within 24 hours.
              </p>
            </div>

            {/* Social & Location Info */}
            <div className="glass-panel p-6 rounded-2xl border border-cyber-border/80 space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2.5 rounded-xl bg-cyber-card border border-cyber-border text-cyber-cyan">
                  <Github size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">GitHub Profile</div>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playClick()}
                    onMouseEnter={() => soundManager.playHover()}
                    className="font-bold text-sm text-slate-100 hover:text-cyber-cyan transition-colors"
                  >
                    github.com/Rifat-Profiles
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2.5 rounded-xl bg-cyber-card border border-cyber-border text-cyber-crimson">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Location</div>
                  <div className="text-sm font-semibold text-slate-100">
                    Sylhet, Bangladesh (Available Worldwide Remote)
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyber-border/80">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="text-cyber-cyan" size={20} />
                  <span>Transmit a Message</span>
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Ready to Dispatch
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mb-6">
                Choose your preferred transmission channel and dispatch directly to <span className="text-cyber-cyan">{PERSONAL_INFO.email}</span>.
              </p>

              <form onSubmit={handleDispatch} className="space-y-4">
                
                {/* Dispatch Channel Selector */}
                <div className="p-2 rounded-xl bg-slate-950/80 border border-cyber-border/80 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setDispatchMethod('gmail');
                    }}
                    className={`flex-1 min-w-[120px] py-1.5 px-3 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${
                      dispatchMethod === 'gmail'
                        ? 'bg-cyber-card text-cyber-cyan border border-cyber-cyan/50 shadow-neon-cyan font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <ExternalLink size={13} />
                    <span>Gmail (Browser)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setDispatchMethod('mailapp');
                    }}
                    className={`flex-1 min-w-[120px] py-1.5 px-3 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${
                      dispatchMethod === 'mailapp'
                        ? 'bg-cyber-card text-cyber-crimson border border-cyber-crimson/50 shadow-neon-crimson font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Laptop size={13} />
                    <span>Default Mail App</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setDispatchMethod('copy');
                    }}
                    className={`flex-1 min-w-[120px] py-1.5 px-3 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${
                      dispatchMethod === 'copy'
                        ? 'bg-cyber-card text-purple-300 border border-purple-400/50 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Copy size={13} />
                    <span>Copy Form Data</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Hunter"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyber-border text-slate-100 text-sm focus:outline-none focus:border-cyber-cyan transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@domain.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyber-border text-slate-100 text-sm focus:outline-none focus:border-cyber-cyan transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Project Focus / Role
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyber-border text-slate-100 text-sm focus:outline-none focus:border-cyber-cyan transition-colors"
                  >
                    <option value="Android Mobile App (Kotlin/Compose)">Android Mobile App (Kotlin / Compose)</option>
                    <option value="Full-Stack Web Development (React/Node)">Full-Stack Web Development (React / Node)</option>
                    <option value="3D Interactive / Creative Web Experience">3D Interactive / Creative Web Experience</option>
                    <option value="Full-Time Engineering Role">Full-Time Engineering Role</option>
                    <option value="Other Project Inquiry">Other Project Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Message / Specs
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, and goals..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyber-border text-slate-100 text-sm focus:outline-none focus:border-cyber-cyan transition-colors resize-none"
                  />
                </div>

                {/* Status Notice Banner */}
                {statusMessage && (
                  <div className="p-3 rounded-xl bg-cyber-card border border-cyber-cyan/50 text-xs font-mono text-cyber-cyan animate-pulse">
                    {statusMessage}
                  </div>
                )}

                <button
                  type="submit"
                  onMouseEnter={() => soundManager.playHover()}
                  className="w-full py-3.5 rounded-xl font-mono text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-cyber-cyan via-blue-500 to-cyber-crimson text-black hover:opacity-95 shadow-neon-cyan flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Send size={16} />
                  <span>
                    {dispatchMethod === 'gmail'
                      ? 'Dispatch via Gmail (Web)'
                      : dispatchMethod === 'mailapp'
                      ? 'Dispatch via Default Mail App'
                      : 'Copy Formatted Transmission'}
                  </span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

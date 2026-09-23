import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Play, Sparkles, RefreshCw } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

export default function Terminal() {
  const [history, setHistory] = useState([
    { text: "RifatOS v2.4.0 (x86_64-android-web)", type: "system" },
    { text: "Type 'help' to view available commands, or click any quick command below.", type: "system" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    soundManager.playKey();

    if (!trimmed) return;

    const newHistory = [...history, { text: `user@rifat-dev:~$ ${cmd}`, type: "command" }];

    switch (trimmed) {
      case "help":
        newHistory.push({
          text: `Available Commands:
  - about       : Learn about Rifat Mohsin & background
  - skills      : Overview of mobile & web capabilities
  - projects    : List featured Android APKs and Web apps
  - nexload     : Deep-dive into Nexload Android Downloader
  - taskflow    : Deep-dive into TaskFlow offline productivity app
  - contact     : Get email (rifatmohisn716@gmail.com) and links
  - github      : Launch GitHub profile (@Rifat-Profiles)
  - matrix      : Trigger holographic matrix sequence
  - clear       : Clear terminal window
  - sudo        : Execute with superuser privileges`,
          type: "output"
        });
        break;

      case "about":
        newHistory.push({
          text: `${PERSONAL_INFO.name} (${PERSONAL_INFO.title})
Location : ${PERSONAL_INFO.location}
Status   : ${PERSONAL_INFO.status}
Bio      : ${PERSONAL_INFO.bio}`,
          type: "output"
        });
        break;

      case "skills":
        newHistory.push({
          text: `[MOBILE & ANDROID]
  - Kotlin, Jetpack Compose, Coroutines, MVVM, Room DB, WorkManager
[WEB & FRONTEND]
  - React, TypeScript, Next.js, Three.js, WebGL, Tailwind CSS
[BACKEND & STORAGE]
  - Node.js, Express, REST APIs, Firebase, SQLite/PostgreSQL
[TOOLS & WORKFLOW]
  - Git/GitHub, Android Studio, VS Code, Linux, Vite`,
          type: "output"
        });
        break;

      case "projects":
        newHistory.push({
          text: `1. Nexload - Android Media Downloader APK
   > High-speed multi-platform social media video & image downloader APK.
   > Repo: https://github.com/Rifat-Profiles/Nexload-Android-Downloader-APK

2. TaskFlow - Offline Productivity App (to-do-app)
   > Premium offline habit tracker & task planner with Room DB & Jetpack Compose.
   > Repo: https://github.com/Rifat-Profiles/to-do-app

3. NovaSphere 3D Developer Portal
   > Immersive Three.js 3D spatial web showcase with procedural Web Audio synthesis.
   > Repo: https://github.com/Rifat-Profiles`,
          type: "output"
        });
        break;

      case "nexload":
        newHistory.push({
          text: `[NEXLOAD ANDROID DOWNLOADER APK]
Status     : Active Public Release (MIT License)
Tech Stack : Kotlin, Android SDK, Coroutines, Material 3
Features   : High-concurrency media parser, background download notifications,
             multi-format social media extraction, zero telemetry bloat.
GitHub URL : https://github.com/Rifat-Profiles/Nexload-Android-Downloader-APK`,
          type: "output"
        });
        break;

      case "taskflow":
        newHistory.push({
          text: `[TASKFLOW OFFLINE PRODUCTIVITY APP]
Status     : Active Public Release
Tech Stack : Jetpack Compose, Kotlin, Room Database, StateFlow
Features   : 100% offline-first local persistence, zero cloud dependency,
             habit streaks, custom priority categorization, instant reactive UI.
GitHub URL : https://github.com/Rifat-Profiles/to-do-app`,
          type: "output"
        });
        break;

      case "contact":
        newHistory.push({
          text: `Direct Email  : ${PERSONAL_INFO.email}
GitHub        : ${PERSONAL_INFO.github}
Availability  : Open for Android App & Web Development opportunities.`,
          type: "output"
        });
        break;

      case "github":
        newHistory.push({ text: "Opening https://github.com/Rifat-Profiles...", type: "output" });
        window.open(PERSONAL_INFO.github, "_blank");
        break;

      case "email":
        newHistory.push({ text: `Opening mailto:${PERSONAL_INFO.email}...`, type: "output" });
        window.location.href = `mailto:${PERSONAL_INFO.email}`;
        break;

      case "matrix":
        newHistory.push({
          text: `01000011 01001111 01000100 01000101 
01010010 01001001 01000110 01000001 01010100
[!] Matrix reality initialized. Follow the white rabbit...`,
          type: "cyan"
        });
        soundManager.playSuccess();
        break;

      case "sudo":
        newHistory.push({
          text: "Permission denied: user is already supreme commander of this portfolio.",
          type: "error"
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newHistory.push({
          text: `Command not found: '${trimmed}'. Type 'help' to see valid commands.`,
          type: "error"
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    }
  };

  const quickPills = ["help", "about", "projects", "skills", "nexload", "taskflow", "contact", "matrix", "clear"];

  return (
    <section id="terminal" className="py-24 relative bg-cyber-bg/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-emerald-400 bg-cyber-card border border-cyber-border mb-3">
            <TerminalIcon size={14} className="text-emerald-400" />
            CLI Dev Sandbox
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive <span className="text-emerald-400">Terminal</span> Console
          </h2>
          <p className="mt-4 text-slate-400 text-sm">
            For engineers, reviewers, and terminal lovers: query my stack and projects directly via CLI.
          </p>
        </div>

        {/* Quick Command Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-xs font-mono text-slate-400 mr-1">Quick execute:</span>
          {quickPills.map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                handleCommand(cmd);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="px-3 py-1 rounded-lg text-xs font-mono bg-cyber-card border border-cyber-border text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-all"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window Box */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="glass-panel rounded-2xl border border-cyber-border/90 shadow-2xl overflow-hidden cursor-text"
        >
          {/* Terminal Title Bar */}
          <div className="bg-slate-900/90 px-4 py-3 border-b border-cyber-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-2">rifat@portfolio-kernel:~</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE BASH</span>
            </div>
          </div>

          {/* Terminal Log Area */}
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm min-h-[320px] max-h-[460px] overflow-y-auto space-y-3 bg-[#050811]/90">
            {history.map((line, idx) => {
              let colorClass = "text-slate-300";
              if (line.type === "command") colorClass = "text-cyber-cyan font-bold";
              else if (line.type === "system") colorClass = "text-slate-400";
              else if (line.type === "cyan") colorClass = "text-emerald-400 font-semibold";
              else if (line.type === "error") colorClass = "text-rose-400";

              return (
                <div key={idx} className={`whitespace-pre-wrap leading-relaxed ${colorClass}`}>
                  {line.text}
                </div>
              );
            })}

            {/* Input Prompt */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-cyber-cyan font-bold">user@rifat-dev:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => {
                  soundManager.playKey();
                  setInputVal(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder="type a command (e.g. 'skills' or 'nexload')..."
                className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-xs sm:text-sm placeholder:text-slate-600 focus:ring-0"
              />
              <button
                onClick={() => handleCommand(inputVal)}
                className="text-slate-400 hover:text-emerald-400 p-1"
                aria-label="Submit command"
              >
                <CornerDownLeft size={16} />
              </button>
            </div>

            <div ref={terminalEndRef} />
          </div>
        </div>

      </div>
    </section>
  );
}

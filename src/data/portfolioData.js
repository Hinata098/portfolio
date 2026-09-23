// Authentic profile and showcase data for MD Rifat Mohsin Tapader

export const PERSONAL_INFO = {
  name: "MD Rifat Mohsin Tapader",
  preferredName: "Rifat Mohsin",
  handle: "Rifat-Profiles",
  title: "Web & Mobile App Developer",
  status: "Available for freelance projects & full-time roles",
  email: "rifatmohisn716@gmail.com",
  github: "https://github.com/Rifat-Profiles",
  location: "Sylhet, Bangladesh",
  avatar: "/custom-logo.jpg",
  bio: "Passionate Web and Android App Developer based in Sylhet, Bangladesh. Specializing in reactive frontends, high-performance Android applications, and robust backend integrations. Crafting fluid UI/UX with modern tooling and scalable architectures.",
  metrics: [
    { label: "Code Quality", value: "Clean MVVM / Clean Arch" },
    { label: "Target Platforms", value: "Android & Modern Web" },
    { label: "Specialty", value: "Kotlin & React Ecosystem" },
    { label: "Location", value: "Sylhet, Bangladesh" }
  ]
};

export const SKILL_CATEGORIES = [
  {
    name: "Mobile & Android Engineering",
    icon: "Smartphone",
    color: "#00f5ff",
    skills: [
      { name: "Kotlin", level: 90, desc: "Modern syntax, coroutines, flows & functional paradigms" },
      { name: "Jetpack Compose", level: 88, desc: "Declarative UI, state hoisting, animations & Material 3" },
      { name: "Android SDK & Architecture", level: 85, desc: "MVVM, Clean Architecture, Room DB, WorkManager" },
      { name: "Offline-First & Media", level: 88, desc: "Multi-threaded downloads, caching, background services" },
      { name: "Android Studio & Gradle", level: 84, desc: "Build optimizations, ProGuard, multi-module setup" }
    ]
  },
  {
    name: "Web & Frontend Architecture",
    icon: "Globe",
    color: "#a855f7",
    skills: [
      { name: "React.js", level: 88, desc: "Hooks, context, component composition, state management" },
      { name: "JavaScript / TypeScript", level: 86, desc: "ES6+, async/await, modular code, strict typing" },
      { name: "Tailwind CSS", level: 92, desc: "Custom themes, responsive glassmorphism, micro-animations" },
      { name: "Three.js / WebGL", level: 80, desc: "3D scenes, particle fields, shaders, custom geometry" },
      { name: "HTML5 & Modern CSS", level: 94, desc: "Semantic markup, CSS Grid/Flexbox, accessibility" }
    ]
  },
  {
    name: "Backend, APIs & Databases",
    icon: "Server",
    color: "#10b981",
    skills: [
      { name: "Node.js & Express", level: 82, desc: "RESTful APIs, middleware, routing, error handling" },
      { name: "Room DB & SQLite", level: 86, desc: "Local persistence, migrations, DAOs, live observables" },
      { name: "Firebase Ecosystem", level: 80, desc: "Firestore, authentication, cloud storage, FCM" },
      { name: "REST APIs & Integration", level: 90, desc: "Network clients, Axios, Retrofit, JSON serialization" }
    ]
  },
  {
    name: "Tools, Workflow & DevOps",
    icon: "Cpu",
    color: "#ff2a5f",
    skills: [
      { name: "Git & GitHub", level: 90, desc: "Version control, branching strategies, releases, PRs" },
      { name: "VS Code & Android Studio", level: 92, desc: "Advanced debugging, profiling, linting, extensions" },
      { name: "UI/UX & Figma", level: 82, desc: "Wireframing, design systems, responsive prototyping" },
      { name: "Vite & Modern Bundlers", level: 88, desc: "Fast HMR, chunk splitting, tree-shaking, production builds" }
    ]
  }
];

export const PROJECTS = [
  {
    id: "nexload",
    title: "Nexload - Android Media Downloader APK",
    tagline: "High-speed multi-platform social media video & image downloader APK",
    description: "A lightweight, secure, and blazing-fast Android utility that allows users to seamlessly download high-definition media from multiple social platforms with optimized thread concurrency.",
    featured: true,
    platform: "Android APK",
    category: "Mobile Utility",
    technologies: ["Kotlin", "Android SDK", "Coroutines", "Media Downloader", "Material 3", "Utility Tool"],
    githubUrl: "https://github.com/Rifat-Profiles/Nexload-Android-Downloader-APK",
    liveUrl: null,
    metrics: "4★ on GitHub • Fast & Secure • Multi-thread Engine",
    accentColor: "#00f5ff",
    highlights: [
      "High-speed multi-threaded media parsing and downloading engine",
      "Sleek and intuitive Material 3 user interface with dark theme",
      "Background download services with notification progress bar",
      "Zero telemetry bloat — privacy focused and lightweight"
    ]
  },
  {
    id: "todo-taskflow",
    title: "TaskFlow - Offline Productivity App",
    tagline: "A premium offline productivity & habit management app for Android",
    description: "An offline-first Android application designed with Jetpack Compose and Room DB for seamless task organization, daily habits, and productivity tracking without latency or reliance on external cloud servers.",
    featured: true,
    platform: "Android App",
    category: "Productivity",
    technologies: ["Jetpack Compose", "Kotlin", "Room DB", "Coroutines", "MVVM", "Offline-First"],
    githubUrl: "https://github.com/Rifat-Profiles/to-do-app",
    liveUrl: null,
    metrics: "100% Offline • Zero Latency • Jetpack Compose",
    accentColor: "#a855f7",
    highlights: [
      "Modern declarative UI powered by Android Jetpack Compose",
      "Robust local persistence with Room Database and SQLite DAOs",
      "Instant reactivity using Kotlin Coroutines and StateFlow",
      "Habit streaks, custom priority tags, and fluid micro-animations"
    ]
  },
  {
    id: "holographic-portal",
    title: "NovaSphere 3D Developer Portal",
    tagline: "Immersive WebGL & Three.js 3D spatial interactive web showcase",
    description: "An experimental 3D interactive web environment with procedural particle constellations, floating geometric shaders, spatial audio synthesis, and reactive physics that respond to mouse and gyroscope movement.",
    featured: true,
    platform: "Web & 3D",
    category: "Creative Dev",
    technologies: ["React", "Three.js", "Tailwind CSS", "Web Audio API", "Vite"],
    githubUrl: "https://github.com/Rifat-Profiles",
    liveUrl: "https://rifat-profiles.github.io",
    metrics: "60+ FPS WebGL • Procedural Audio • Dynamic Shaders",
    accentColor: "#ff2a5f",
    highlights: [
      "Interactive 3D geometry with custom particle vortex shaders",
      "Procedural Web Audio API sound synthesis with zero media assets",
      "Fluid glassmorphic responsive layout with responsive breakpoints",
      "Interactive Dev CLI console with real-time command processing"
    ]
  },
  {
    id: "pulse-api",
    title: "PulseREST - Microservice Engine",
    tagline: "High-throughput asynchronous REST API service with auth & caching",
    description: "A robust backend service featuring secure JWT authentication, rate limiting, request validation, structured logging, and persistent data handling.",
    featured: false,
    platform: "Backend Service",
    category: "Backend / API",
    technologies: ["Node.js", "Express", "SQLite/Postgres", "JWT", "REST API"],
    githubUrl: "https://github.com/Rifat-Profiles",
    liveUrl: null,
    metrics: "Sub-20ms Response • JWT Secured • Clean Endpoints",
    accentColor: "#10b981",
    highlights: [
      "Structured MVC design with middleware-driven security layers",
      "Token-based authentication and role-based access control",
      "Optimized query handlers and comprehensive error catching"
    ]
  }
];

export const WORK_PHILOSOPHY = [
  {
    title: "Performance & Battery First",
    desc: "Whether optimizing Android memory allocations and coroutine lifecycles or WebGL render loops, speed and battery efficiency are non-negotiable.",
    icon: "Zap",
    color: "#00f5ff"
  },
  {
    title: "Clean, Scalable Architecture",
    desc: "Strict adherence to MVVM, SOLID principles, and modular design. Code written today should be painless to maintain and scale tomorrow.",
    icon: "Layers",
    color: "#a855f7"
  },
  {
    title: "Sensory & Intuitive UI/UX",
    desc: "Every button hover, page transition, and gesture should feel satisfying, responsive, and natural across all screen formats.",
    icon: "Sparkles",
    color: "#ff2a5f"
  }
];

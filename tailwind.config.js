/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#030712",
          card: "#090e1c",
          panel: "#0f182f",
          border: "#1c2b4d",
          cyan: "#00f5ff",
          crimson: "#ff2a5f",
          purple: "#a855f7",
          violet: "#7c3aed",
          emerald: "#10b981",
          amber: "#f59e0b",
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'JetBrains Mono', 'Menlo', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'radar': 'radar 3s linear infinite',
        'glow-ring': 'glowRing 4s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        glowRing: {
          '0%': { boxShadow: '0 0 15px rgba(0, 245, 255, 0.4), inset 0 0 15px rgba(255, 42, 95, 0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(255, 42, 95, 0.6), inset 0 0 20px rgba(0, 245, 255, 0.4)' },
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 25px -4px rgba(0, 245, 255, 0.45)',
        'neon-crimson': '0 0 25px -4px rgba(255, 42, 95, 0.5)',
        'neon-purple': '0 0 25px -4px rgba(168, 85, 247, 0.45)',
        'neon-multi': '0 0 30px -5px rgba(0, 245, 255, 0.35), 0 0 20px -2px rgba(255, 42, 95, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

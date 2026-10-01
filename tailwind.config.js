/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        musika: {
          bg: '#080c14',
          surface: '#0f172a',
          surfaceHover: '#1e293b',
          card: '#111928',
          cardHover: '#1a2438',
          border: '#1f293d',
          accent: '#6366f1', // Indigo primary
          accentHover: '#4f46e5',
          accentSecondary: '#06b6d4', // Cyan
          accentPink: '#ec4899',
          accentGreen: '#10b981',
          textMuted: '#94a3b8',
          textSubtle: '#64748b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'bounce-subtle': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
};

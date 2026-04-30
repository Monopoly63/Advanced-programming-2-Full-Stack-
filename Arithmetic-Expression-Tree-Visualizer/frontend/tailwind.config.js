/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // DeFi dark theme
        bg: {
          DEFAULT: '#0A0E1A',
          deep: '#070912',
          elevated: '#0D1117',
          card: '#111827',
        },
        neon: {
          50:  '#F5FFD6',
          100: '#EBFFAD',
          200: '#DCFF7A',
          300: '#C6FF3D',
          400: '#B4FF39',
          500: '#9EE62A',
          600: '#7BC41B',
        },
        primary: {
          50:  '#ECFDF5',
          100: '#D1FAE5',
          300: '#6EE7B7',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'Space Grotesk', 'Segoe UI', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Fira Code', 'monospace'],
        arabic: ['Cairo', 'Noto Sans Arabic', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(198, 255, 61, 0.45), 0 0 40px rgba(198, 255, 61, 0.2)',
        'neon-sm': '0 0 10px rgba(198, 255, 61, 0.35)',
        'neon-lg': '0 0 40px rgba(198, 255, 61, 0.55), 0 0 80px rgba(198, 255, 61, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'radial-neon': 'radial-gradient(circle at 30% 20%, rgba(198,255,61,0.18), transparent 40%), radial-gradient(circle at 80% 80%, rgba(100,200,255,0.10), transparent 45%)',
        'grid': 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 4px rgba(198,255,61,0.6))' },
          '100%': { filter: 'drop-shadow(0 0 14px rgba(198,255,61,0.95))' },
        },
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep-space backgrounds
        base:      '#04070F',
        elevated:  '#080D1A',
        subtle:    '#0C1220',

        // Accents
        accent: {
          DEFAULT: '#3B7BFF',
          hover:   '#5A93FF',
          purple:  '#7B5BFF',
          cyan:    '#00D4FF',
          gold:    '#F5A623',
        },

        // Text
        ink: {
          primary:   '#FFFFFF',
          secondary: '#8B9CBD',
          muted:     '#4A5568',
        },

        // Kept for backward compatibility with any residual class
        primary: {
          500: '#3B7BFF',
          600: '#3B7BFF',
          700: '#5A93FF',
        },
      },
      fontFamily: {
        sans:   ['Plus Jakarta Sans', 'Sora', 'system-ui', 'sans-serif'],
        display:['Sora', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono:   ['JetBrains Mono', 'Fira Code', 'monospace'],
        arabic: ['Cairo', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm':  '0 0 18px rgba(59,123,255,0.25)',
        'glow':     '0 0 30px rgba(59,123,255,0.35)',
        'glow-lg':  '0 0 45px rgba(59,123,255,0.55)',
        'glass':    '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'glass-accent':
          '0 0 30px rgba(59,123,255,0.12), 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #3B7BFF 0%, #7B5BFF 100%)',
        'hero-text':        'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 55%, #7B9EFF 100%)',
      },
      borderRadius: {
        pill: '100px',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.7' },
          '50%':     { opacity: '1' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glow': 'pulseGlow 6s ease-in-out infinite',
        'floaty':     'floaty 4s ease-in-out infinite',
        'shimmer':    'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
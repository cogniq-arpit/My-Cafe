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
        // Brand palette
        'cafe-brown':   '#6F4E37',
        'cafe-brown-light': '#8B6349',
        'cafe-brown-dark':  '#4A3423',
        'cafe-cream':   '#F5F0E8',
        'cafe-beige':   '#E8DCC8',
        'cafe-warm':    '#FF8C42',
        'cafe-warm-light': '#FFB27A',
        'cafe-dark':    '#1A1512',
        'cafe-darker':  '#0D0A08',
        'cafe-light':   '#FDFAF6',
        'cafe-muted':   '#8B7D6E',
        'cafe-gold':    '#C9A84C',
        'cafe-green':   '#4CAF50',
        'cafe-red':     '#E53935',
      },
      fontFamily: {
        sans:    ['Inter', 'ui-sans-serif', 'system-ui'],
        poppins: ['Poppins', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(111,78,55,0.12)',
        'warm':    '0 4px 20px rgba(111,78,55,0.18)',
        'warm-lg': '0 8px 40px rgba(111,78,55,0.22)',
        'warm-xl': '0 16px 60px rgba(111,78,55,0.28)',
        'glow':    '0 0 30px rgba(255,140,66,0.25)',
        'glow-lg': '0 0 60px rgba(255,140,66,0.35)',
        'inner-warm': 'inset 0 2px 10px rgba(111,78,55,0.08)',
      },
      backgroundImage: {
        'gradient-warm':   'linear-gradient(135deg, #6F4E37 0%, #FF8C42 100%)',
        'gradient-cream':  'linear-gradient(135deg, #F5F0E8 0%, #E8DCC8 100%)',
        'gradient-dark':   'linear-gradient(135deg, #1A1512 0%, #2D1F14 100%)',
        'gradient-hero':   'linear-gradient(to bottom right, rgba(26,21,18,0.85), rgba(111,78,55,0.65))',
        'gradient-card':   'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))',
      },
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'float-slow':    'float 8s ease-in-out infinite',
        'steam':         'steam 2s ease-in-out infinite',
        'pulse-warm':    'pulseWarm 2s ease-in-out infinite',
        'slide-up':      'slideUp 0.5s ease-out',
        'fade-in':       'fadeIn 0.6s ease-out',
        'spin-slow':     'spin 8s linear infinite',
        'bounce-slow':   'bounce 2s infinite',
        'shimmer':       'shimmer 1.5s infinite',
        'waveform':      'waveform 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        steam: {
          '0%':   { opacity: 1, transform: 'translateY(0) scaleX(1)' },
          '50%':  { opacity: 0.5, transform: 'translateY(-8px) scaleX(1.2)' },
          '100%': { opacity: 0, transform: 'translateY(-16px) scaleX(0.8)' },
        },
        pulseWarm: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,140,66,0.4)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(255,140,66,0)' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        waveform: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%':      { transform: 'scaleY(1)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}

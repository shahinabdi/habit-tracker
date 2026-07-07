/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        canvas: v('canvas'),
        surface: v('surface'),
        inset: v('inset'),
        edge: { DEFAULT: v('edge'), strong: v('edge-strong') },
        ink: v('ink'),
        soft: v('soft'),
        faint: v('faint'),
        accent: {
          DEFAULT: v('accent'),
          hover: v('accent-hover'),
          soft: v('accent-soft'),
        },
        status: {
          completed: { DEFAULT: v('status-completed'), soft: v('status-completed-soft') },
          partial: { DEFAULT: v('status-partial'), soft: v('status-partial-soft') },
          missed: { DEFAULT: v('status-missed'), soft: v('status-missed-soft') },
          none: { DEFAULT: v('status-none'), soft: v('status-none-soft') },
        },
        today: { DEFAULT: v('today'), soft: v('today-soft') },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'view-enter': 'viewEnter 0.25s ease-out',
        'sheet-up': 'sheetUp 0.25s ease-out',
        'backdrop-in': 'backdropIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        viewEnter: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sheetUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        backdropIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

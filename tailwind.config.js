/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        dark: '#141414',
        darker: '#1a1a1a',
        cyan: '#00B4D8',
        'cyan-dark': '#0090a8',
        'cyan-glow': 'rgba(0, 180, 216, 0.3)',
        gray: {
          DEFAULT: '#888888',
          light: '#aaaaaa',
        },
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out',
        'pulse-slow': 'pulse 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

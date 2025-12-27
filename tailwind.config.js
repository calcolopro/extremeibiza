/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        dark: '#141414',
        cyan: '#1E9BD9',
        gray: '#888888',
      },
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

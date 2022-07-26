/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        mainDark: '#2C3333',
        mainNavy: '#395B64',
        mainTeal: '#A5C9CA',
        mainLight: '#E7F6F2',
      },
    },
  },
  plugins: [],
};

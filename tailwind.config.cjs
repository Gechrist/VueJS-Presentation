/** @type {import('tailwindcss').Config} */
const withAnimations = require('animated-tailwindcss');

module.exports = withAnimations({
  content: ['./index.html', './src/**/*.{vue,js,jsx}'],
  theme: {
    screens: {
      xs: '350px',
      sm: '370px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
});

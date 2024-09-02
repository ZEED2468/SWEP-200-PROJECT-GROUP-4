/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  content: ['./index.html',
   "./src/*.{jsx,js}"],
  theme: {
    screens: {
      '2xl': { 'max': '1535px' },
      'xl': { 'max': '1279px' },
      'lg': { 'max': '1023px' },
      'md': { 'max': '767px' },
      'sm': { 'max': '428px' },
    },
    extend: {},
  },
  plugins: [],
};



/** @type {import('tailwindcss').Config} */
<<<<<<< HEAD
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
=======
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

>>>>>>> ea43ec87e945744aff5f8e87a25a4ac85e171fee

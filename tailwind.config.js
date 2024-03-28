/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      'colors':{
        'textColor':'#f8f9fa', // white
        'primarybg':'#000814', // matt black
        'secondarybg':'#edf2f4', //matt white
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},

    colors: {
      'dark': '#1D1F21',
      'dark-gray': '#3D4348',
      'cyan': '#44F6E1',
      'off-white': '#D9D9D9',
      'black': '#000000',
      'white': '#ffffff',
    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif']
    }
  },
  plugins: [require("daisyui")],
}


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
      'teal': '#44F6E1',
      'off-white': '#DDE6ED',
    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif']
    }
  },
  plugins: [require("daisyui")],
}


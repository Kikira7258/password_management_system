/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#1D1F21',
        'dark-gray': '#3D4348',
        'cyan': '#44F6E1',
        'blue': '#345193',
        'off-white': '#D9D9D9',
        'black': '#000000',
        'white': '#ffffff',
        'red': '#FF543E'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },

    },

  },
  plugins: [require("daisyui")],
}


/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: false, 
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('flowbite/plugin')
  ],
  safelist: [
    {
      pattern: /bg-+|border-+/, // 👈  This includes bg of all colors and shades
    },
  ],
}

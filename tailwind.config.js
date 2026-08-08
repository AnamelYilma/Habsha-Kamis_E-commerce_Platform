/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#f3e5ab',
          DEFAULT: '#d4af37',
          dark: '#aa8010',
        },
        ethioGreen: '#078732',
        ethioYellow: '#FCD116',
        ethioRed: '#E51F1F',
      },
    },
  },
  plugins: [],
}
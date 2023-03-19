/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    container: {
      padding: '.5rem'
    },
    fontFamily: {
      'sans': 'Open Sans',
      'fredoka': 'Fredoka One'
    }
  },
  plugins: [],
}

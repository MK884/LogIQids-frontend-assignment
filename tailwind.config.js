/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#685bf7'
        }
      },
      backgroundImage: {
        gradient: 'linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);'
      }
    },
  },
  plugins: [],
}
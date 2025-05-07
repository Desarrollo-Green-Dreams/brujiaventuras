/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        aleo: ['"Aleo"', 'serif'],
      },
    },
  },
  plugins: [],
}


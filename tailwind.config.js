/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./client/**/*.{js,ts,jsx,tsx}", // Adjust path to cover all client-side files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"], // Maps font-sans to 'Varela Round'
        display: ["var(--font-display)", "sans-serif"], // Maps font-display to 'Titan One'
      },
    },
  },
  plugins: [],
};

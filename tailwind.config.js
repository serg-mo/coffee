/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Trebuchet MS", "monospace"],
      },
      fontSize: {
        base: "12px",
      },
    },
  },
  plugins: [],
};

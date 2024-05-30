/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["MyCustomFont", "sans-serif"],
      },
      colors: {
        customMessage: "#e9e9eb",
        customBlue: "#2495fd",
      },
    },
  },
  plugins: [],
};

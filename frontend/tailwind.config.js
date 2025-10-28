/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a73e8", // Google Blue
        secondary: "#5f6368", // Google Gray
        accent: "#34a853", // Google Green
        danger: "#ea4335", // Google Red
        warning: "#fbbc04", // Google Yellow
      },
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

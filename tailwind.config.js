/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-color": "#0E1016",
        "navy-color": "#181B25",
        "navy-dark-color": "#12151C",
      },
    },
  },
  plugins: [],
};

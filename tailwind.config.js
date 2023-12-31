/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // "background-color": "#0E1016",
        "background-color": "#1A202C",
        "background-light-dark-color": "#232A3A",
        "navy-color": "#181B25",
        "navy-dark-color": "#12151C",
        "grey-color": "#6e7ba0",
        "white-color": "#ECEEF3",
        "white-dark-color": "#ACB2C9",
        green: "#64FFDA",
      },
      fontFamily: {
        sans: ["Calibre", "sans-serif"],
        mono: ["SF Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

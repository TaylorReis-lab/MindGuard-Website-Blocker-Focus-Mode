/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./popupConfig/code.html"],
  theme: {
    extend: {
      colors: {
        primary: "#2C097F",
        "background-light": "#f6f6f8",
        "background-dark": "#151022",
      },
      fontFamily: {
        display: "Manrope",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};

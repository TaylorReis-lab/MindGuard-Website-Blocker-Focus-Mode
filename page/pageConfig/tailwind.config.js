/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./page/pageConfig/blockedConfig.html"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        "background-light": "#ffffff",
        "background-dark": "#0f172a",
        "surface-dark": "#1c212c",
        "border-dark": "#292e38",
        "text-secondary": "#9ea7b7",
        text: "#111517",
        muted: "#6b7280",
        bg: "#ffffff",
        border: "#e5e7eb",
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter, sans-serif",
      },
      colors: {
        "dark-background": "#1c1c1c",
        "base-background": "#212120",
        "light-background": "#2c2d2c",
        "lighter-background": "#323232",
        "base-text": "#fffefe",
        "light-text": "#cccccc",
        primary: "#fbd38d",
      },
    },
  },
  plugins: [],
};

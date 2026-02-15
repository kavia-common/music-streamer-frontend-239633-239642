/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: "#1DB954",
          black: "#121212",
          dark: "#181818",
          card: "#242424"
        }
      },
      boxShadow: {
        top: "0 -10px 30px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
};

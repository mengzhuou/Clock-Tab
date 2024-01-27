/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-primary": "#00668A",
        "theme-secondary": "#004E71",
      }
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container:{
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    }
  },
  plugins: [],
}


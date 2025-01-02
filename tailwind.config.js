/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffcf3a",
        secondary: "#0063ff",
      },
    },
  },
  plugins: [],
};

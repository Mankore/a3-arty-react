/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        artillery: "#4d4fe2",
        target: "#e24d4f",
      },
    },
  },
  plugins: [],
};

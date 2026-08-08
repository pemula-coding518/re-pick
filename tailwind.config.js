/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        milano: "#A90E02",
        milanoLight: "#D31A0C",
        ember: "#FF6A50",
        chiffon: "#FFFBD4",
        onyx: "#0E0E10",
        carbon: "#121214",
      },
      fontFamily: {
        display: ["Anton", "system-ui", "sans-serif"],
        sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

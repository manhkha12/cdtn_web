/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B4A8B",
        primaryDark: "#083B70",
        accent: "#F6314A",
        bgSoft: "#F5F7FB",
        borderSoft: "#E6EBF2",
        textMain: "#1D2A3B",
        textSub: "#7E8A9A",
      },
      borderRadius: {
        xl2: "20px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(15, 41, 77, 0.06)",
      },
    },
  },
  plugins: [],
};

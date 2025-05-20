// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gloock: ["Gloock", "serif"],
      },
      animation: {
        bounce: "bounce 0.5s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-delay": "fadeIn 0.5s ease-in-out 0.5s",
        "fade-in-delay-2": "fadeIn 0.5s ease-in-out 1s",
        "fade-in-delay-3": "fadeIn 0.5s ease-in-out 1.5s",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};

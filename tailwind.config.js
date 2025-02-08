export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "slide-down": "slideDown 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        breeze: "breeze 3s ease-in-out infinite",
        sway: "sway 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        expand: "expand 1s ease-out forwards",
        "float-up": "floatUpAndReset 15s linear infinite",
        "float-up-slow": "floatUpAndReset 20s linear infinite",
        "float-up-fast": "floatUpAndReset 12s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        breeze: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(15deg)" },
          "75%": { transform: "rotate(-15deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        sway: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(3deg)" },
          "75%": { transform: "rotate(-3deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        expand: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        floatUpAndReset: {
          "0%": { transform: "translateY(100vh)", opacity: "0" },
          "10%": { opacity: "0.2" },
          "90%": { opacity: "0.2" },
          "100%": { transform: "translateY(-100vh)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

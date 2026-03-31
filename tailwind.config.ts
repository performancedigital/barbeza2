/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#8B8555",
          light: "#A8A270",
          dark: "#5C5838",
          muted: "#6B6745",
          pale: "#C4C09A",
        },
        dark: {
          DEFAULT: "#0D0D08",
          surface: "#161610",
          card: "#1E1E14",
          border: "#2A2A1A",
        },
        cream: {
          DEFAULT: "#F5F5F0",
          light: "#FFFFFF",
          muted: "#C8C8B8",
          dim: "#8A8A7A",
        },
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        playfair: ['"Playfair Display"', "serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        "shimmer": "shimmer 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-brand": "pulseBrand 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseBrand: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(139,133,85,0.4)" },
          "50%": { boxShadow: "0 0 0 14px rgba(139,133,85,0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #5C5838 0%, #8B8555 50%, #A8A270 100%)",
        "dark-gradient": "linear-gradient(180deg, #0D0D08 0%, #161610 100%)",
      },
    },
  },
  plugins: [],
}

/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        forest:  { DEFAULT:"#3D5A3D", light:"#4E7A4E", dark:"#2A3D2A", deep:"#0F1A0F" },
        olive:   { DEFAULT:"#8B8555", light:"#A8A270", dark:"#5C5838" },
        natural: { DEFAULT:"#FAFAF5", alt:"#F0EDE5", card:"#FFFFFF", border:"#D8D5C8" },
        ink:     { DEFAULT:"#1A2A1A", muted:"#5A6B5A", dim:"#8A9A8A" },
        cream:   { DEFAULT:"#F5F5F0", light:"#FFFFFF", muted:"#C8C8B8" },
        dark:    { DEFAULT:"#0F1A0F", surface:"#162316", card:"#1E2E1E", border:"#2A3A2A" },
      },
      fontFamily: {
        raleway:  ['"Raleway"', "sans-serif"],
        playfair: ['"Playfair Display"', "serif"],
        inter:    ["Inter", "sans-serif"],
        oswald:   ["Oswald", "sans-serif"],
      },
      animation: {
        "shimmer":      "shimmer 3s linear infinite",
        "float":        "float 6s ease-in-out infinite",
        "pulse-forest": "pulseForest 2s ease-in-out infinite",
        "fade-in":      "fadeIn 0.6s ease-out forwards",
        "slide-up":     "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        shimmer:      { "0%":{"backgroundPosition":"-200% center"},"100%":{"backgroundPosition":"200% center"} },
        float:        { "0%,100%":{transform:"translateY(0px)"},"50%":{transform:"translateY(-20px)"} },
        pulseForest:  { "0%,100%":{boxShadow:"0 0 0 0 rgba(61,90,61,0.4)"},"50%":{boxShadow:"0 0 0 14px rgba(61,90,61,0)"} },
        fadeIn:       { from:{opacity:"0"},to:{opacity:"1"} },
        slideUp:      { from:{opacity:"0",transform:"translateY(30px)"},to:{opacity:"1",transform:"translateY(0)"} },
      },
      backgroundImage: {
        "forest-gradient": "linear-gradient(135deg,#2A3D2A 0%,#3D5A3D 50%,#4E7A4E 100%)",
        "natural-gradient":"linear-gradient(180deg,#FAFAF5 0%,#F0EDE5 100%)",
      },
    },
  },
  plugins: [],
}

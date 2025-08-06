import { yellow } from "@mui/material/colors";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003399",
        darkPrimary: "#001F5C",
        darkPrimary1: "#00297A",
        labelBlue: "#00143D",
        grayText: "#8F96A3",
        lightgreen: "#E7FCF0",
        disabledBg: "#F4F6FB",
        disabledText: "#99ADD6",
        disabledBgBorder: "#CCD6EB",
        grayBg: "#E6EBF5",
        grayBg2: "#EDF0F8",
        gray3: "#98A2B3",
        primaryGreen: "#0DDE65",
        placeholderText: "#C7CBD1",
        borderRed: "#a51010",
        lightred: "#fbd0cf",
        yellow: "#ffff00",
      },
      screens: {
        xs: "400px",
        xss: "480px",
        sm: "640px", // Small screens
        sm1: "740px",
        md: "768px", // Medium screens
        md1: "880px", // Medium screens
        mdd: "926px", // Medium screens
        lg: "1050px", // Large scree
        lg1: "1091px", // Large scree
        xl: "1220px", // Extra-large screens
        xl1: "1300px", // Extra-large screens
        xl2: "1350px", // Extra-large screens
        "2xl": "1536px", // Extra-extra-large screens (default for Tailwind)
        // Add custom breakpoints
        "3xl": "1920px", // Custom breakpoint example
        "4xl": "2560px", // Another custom breakpoint example
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s ease-out forwards",
        shake: "shake 0.5s ease-in-out",
      },
    },
    fontFamily: {
      "sequel-sans": ["sequel-sans"],
      "sequel-sans-bold": ["sequel-sans-bold"],
    },
  },
  plugins: [],
};
export default config;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': {'min': '320px', 'max': '576px'},
        // => @media (min-width: 320px and max-width: 639px) { ... }
        'sm': {'min': '576px', 'max': '767px'},
        // => @media (min-width: 640px and max-width: 767px) { ... }
        'md': {'min': '768px', 'max': '1023px'},
        // => @media (min-width: 768px and max-width: 1023px) { ... }
        'lg': {'min': '1024px', 'max': '1279px'},
        // => @media (min-width: 1024px and max-width: 1279px) { ... }
        'xl': {'min': '1280px', 'max': '1535px'},
        // => @media (min-width: 1280px and max-width: 1535px) { ... }
        '2xl': {'min': '1536px'},
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          500: '#FF9933',
          600: '#EA7A00',
          700: '#C25E00',
        },
        navy: {
          800: '#1E3A5F',
          900: '#0F2A43',
          950: '#091B2C',
        },
        indiangreen: {
          500: '#16A34A',
          600: '#138808',
          700: '#0F6906',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(15, 42, 67, 0.08)',
        'card-hover': '0 20px 30px -10px rgba(15, 42, 67, 0.12)',
      }
    },
  },
  plugins: [],
}

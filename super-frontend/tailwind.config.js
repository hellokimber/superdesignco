/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['GT Walsheim Pro', 'system-ui', 'sans-serif'],
        serif: ['Young Serif', 'Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        brand: {
          yellow: '#F9EC31',
          ink: '#050505',
        },
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'mserrat' : ['Montserrat', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["night", "nord"],
  },
}

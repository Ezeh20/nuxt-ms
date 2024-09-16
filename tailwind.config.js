/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
      "./error.vue",
    ],
    theme: {
      extend: {
        colors: {
          'primary-color': '#e84e01',
          'secondary-color': '#7654321',
          'text-color': '#C8C8C8',
          'background-color': '#02120C',
        },
        fontSize: {
            'xs': '0.75rem',    // 12px
            'sm': '0.875rem',   // 14px
            'base': '1rem',     // 16px
            'lg': '1.125rem',   // 18px
            'xl': '1.25rem',    // 20px
            '2xl': '1.5rem',    // 24px
            '3xl': '1.875rem',  // 30px
            '4xl': '2.25rem',   // 36px
            '5xl': '3rem',      // 48px
        },
        fontFamily: {
            'base-font': ['Inter', 'sans-serif'],
            'alt-font': ['Merriweather', 'serif'],
            '3rd-font': ['Montserrat', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
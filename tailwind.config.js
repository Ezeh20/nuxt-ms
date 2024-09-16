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
          'primary-color': '#1234567',
          'secondary-color': '#7654321',
          'text-color': '#C8C8C8',
          'background-color': '#02120C',
          // Add more custom colors here
        },
      },
    },
    plugins: [],
  }
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
  ],
  tailwindcss:{
    cssPath:"~/assets/css/tailwind.css",
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config:{},
    injectPosition:0,
    viewer:true
    
  },
  googleFonts: {
    families: {
      Roboto: true,
      'Inter': [300, 400, 600, 700, 800],
      'Merriweather': [300, 400, 600, 700, 800],
      'Montserrat': [300, 400, 600, 700, 800],
    },
    display: 'swap',
    prefetch: true,
    preload: true,
  },
  icon: {
    size: '18px',
    class: 'icon',
    mode:"css"
  },
})
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
   '@pinia/nuxt',
   '@nuxtjs/google-fonts',
   '@nuxt/ui',
  ],
  css: ['@/assets/css/base.css'],
  tailwindcss:{
    cssPath:"~/assets/css/tailwind.css",
    configPath: 'tailwind.config.js',
    exposeConfig: true,
    injectPosition:0,
    viewer:true
  },
  googleFonts: {
    families: {
      Roboto: true,
      'Inter': [300, 400, 600, 700, 800],
      'Merriweather': [300, 400, 600, 700, 800],
      'Montserrat': [300, 400, 600, 700, 800]
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
  runtimeConfig:{
    SP_CLIENT_ID:process.env.SP_CLIENT_ID,
    SP_CLIENT_SECRET:process.env.SP_CLIENT_SECRET,
    SP_REDIRECT_URI:process.env.SP_REDIRECT_URI,
    SP_LIVE_REDIRECT_URI:process.env.SP_LIVE_REDIRECT_URI,
    public:{
      SP_BASE_URL:process.env.SP_BASE_URL,
    }
  },
  plugins: [
    '~/plugins/spotify.js',
  ],
})
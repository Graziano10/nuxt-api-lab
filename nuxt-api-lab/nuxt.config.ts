export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  /* =======================
     MODULES
  ======================= */
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/scripts'
  ],

  /* =======================
     CSS
  ======================= */
  css: ['~/assets/css/tailwind.css'],

  /* =======================
     BUILD (Leaflet)
  ======================= */
  build: {
    transpile: ['leaflet']
  },

  vite: {
    optimizeDeps: {
      exclude: ['leaflet']
    }
  },

  /* =======================
     NITRO (Vercel)
  ======================= */
  nitro: {
    externals: {
      inline: ['leaflet']
    }
  },

  /* =======================
     RUNTIME CONFIG
  ======================= */
  runtimeConfig: {
    // 🔒 server-only
    weatherApiKey: process.env.WEATHER_API_KEY,
    openWeatherKey: process.env.OPENWEATHER_KEY
  }
})

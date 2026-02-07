// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/scripts'
  ],

  css: ['~/assets/css/tailwind.css'],

  build: {
    transpile: ['leaflet']
  },

  vite: {
    ssr: {
      noExternal: ['leaflet']
    },
    optimizeDeps: {
      include: ['leaflet']
    }
  },

  nitro: {
    preset: 'vercel'
  },

  runtimeConfig: {
    weatherApiKey: process.env.WEATHER_API_KEY,
    openWeatherKey: process.env.OPENWEATHER_KEY
  }
})

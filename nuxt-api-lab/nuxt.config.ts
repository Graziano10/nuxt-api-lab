export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/scripts'
  ],

  css: ['~/assets/css/tailwind.css'],

  runtimeConfig: {
    // 🔒 SOLO SERVER
    weatherApiKey: process.env.WEATHER_API_KEY,
    openWeatherKey: process.env.OPENWEATHER_KEY
  }
})

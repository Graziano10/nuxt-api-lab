import { getWeather } from '../services/weather.service'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const config = useRuntimeConfig(event)

  if (!config.weatherApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Weather API key not configured'
    })
  }

  return getWeather(query, config.weatherApiKey)
})

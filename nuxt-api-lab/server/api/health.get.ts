import { getWeather } from '../services/weather.service'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  return await getWeather(query.city as string, config.weatherApiKey)
})

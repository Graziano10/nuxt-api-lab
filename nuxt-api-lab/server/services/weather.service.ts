import { fetchWeather } from '../adapters/openweather.adapter'
import { parseOrThrow } from '../utils/zod'

import {
  WeatherQuerySchema,
  WeatherResponseSchema,
  OpenWeatherResponseSchema
} from '../schemas/weather.schema'

import type { WeatherResponse } from '../schemas/weather.schema'

const storage = useStorage('cache')

export async function getWeather(query: unknown, apiKey: string): Promise<WeatherResponse> {
  const { city, unit } = parseOrThrow(WeatherQuerySchema, query)

  const normalizedCity = city.trim().toLowerCase()
  const normalizedUnit = unit ?? 'metric'

  const cacheKey = `weather:${normalizedCity}:${normalizedUnit}`

  const cached = await storage.getItem<WeatherResponse>(cacheKey)
  if (cached) return cached

  const data = OpenWeatherResponseSchema.parse(
    await fetchWeather(normalizedCity, apiKey, normalizedUnit)
  )

  const result = WeatherResponseSchema.parse({
    city: data.name,
    country: data.sys.country,

    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    min: Math.round(data.main.temp_min),
    max: Math.round(data.main.temp_max),

    humidity: data.main.humidity,
    pressure: data.main.pressure,

    windSpeed: data.wind.speed,
    windDirection: data.wind.deg,

    clouds: data.clouds.all,
    rainLastHour: data.rain?.['1h'] ?? 0,

    condition: data.weather[0].description,
    icon: data.weather[0].icon,

    sunrise: data.sys.sunrise * 1000,
    sunset: data.sys.sunset * 1000
  })

  await storage.setItem(cacheKey, result, { ttl: 600 })

  return result
}

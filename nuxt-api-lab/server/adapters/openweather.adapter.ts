import { FetchError } from 'ofetch'
import { createError } from 'h3'

export async function fetchWeather(
  city: string,
  apiKey: string,
  unit: 'metric' | 'imperial' = 'metric'
): Promise<unknown> {
  try {
    return await $fetch('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city.trim().toLowerCase(),
        units: unit,
        appid: apiKey
      },
      timeout: 5_000,
      retry: 1
    })
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      const status = error.response?.status

      if (status === 404) {
        throw createError({
          statusCode: 404,
          statusMessage: 'City not found'
        })
      }

      if (status === 401) {
        throw createError({
          statusCode: 502,
          statusMessage: 'Invalid OpenWeather API key'
        })
      }
    }

    throw createError({
      statusCode: 503,
      statusMessage: 'Weather service unavailable'
    })
  }
}

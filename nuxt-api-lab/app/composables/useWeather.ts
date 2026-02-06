import type { WeatherResponse } from "~~/server/schemas/weather.schema"

export function useWeather() {
  const data = ref<WeatherResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchWeather(city: string, unit: 'metric' | 'imperial' = 'metric') {
    loading.value = true
    error.value = null

    try {
      data.value = await $fetch<WeatherResponse>('/api/weather', {
        params: { city, unit }
      })
    } catch {
  error.value = 'Error fetching weather'
}finally {
      loading.value = false // ⬅️ QUESTO È OBBLIGATORIO
    }
  }

  return { data, loading, error, fetchWeather }
}

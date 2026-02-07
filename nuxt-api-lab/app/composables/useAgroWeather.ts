import type { AgroWeatherItem } from '../../types/agro'

interface AgroWeatherResponse {
  success: true
  data: AgroWeatherItem[]
}

export function useAgroWeather(params: {
  polygonId: string
  start?: number
  end?: number
}) {
  const { data, pending, error } = useAsyncData(
    `agro-weather-${params.polygonId}-${params.start}-${params.end}`,
    async () => {
      const res = await $fetch<AgroWeatherResponse>(
        '/api/agro/weather',
        {
          params: {
            polygon_id: params.polygonId,
            start: params.start,
            end: params.end
          }
        }
      )

      return res.data
    },
    {
      immediate: !!params.polygonId
    }
  )

  return { data, pending, error }
}

export default defineEventHandler(async (event) => {
  try {
    const { polygon_id, start, end } = getQuery(event)

    if (!polygon_id || typeof polygon_id !== 'string') {
      badRequest('polygon_id is required')
    }

    const now = Math.floor(Date.now() / 1000)
    const defaultStart = now - 7 * 24 * 60 * 60 // ultimi 7 giorni

 const data = await httpRequest(
  'https://api.openweathermap.org/agro/1.0/weather/history',
  {
    method: 'GET',
    query: {
      appid: process.env.OPENWEATHER_KEY!,
      polyid: polygon_id,
      start: Number(start ?? defaultStart),
      end: Number(end ?? now)
    }
  }
)

    return ok(data)
  } catch (error: unknown) {
    console.error('[AGRO WEATHER ERROR]', error)

    serviceUnavailable('Failed to fetch agro weather data')
  }
})

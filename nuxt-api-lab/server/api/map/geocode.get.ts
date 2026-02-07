export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = query.q as string

  if (!q) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing query'
    })
    }
    
    const origin = getRequestHeader(event, 'origin') || 'https://nuxt-api-lab.vercel.app'

  const res = await $fetch('https://nominatim.openstreetmap.org/search', {
    params: {
      q,
      format: 'json',
      limit: 1
    },
    headers: {
      'User-Agent': 'NuxtApiLab/1.0 (https://nuxt-api-lab.vercel.app)',
  'Referer': origin,
      'Accept-Language': 'it'
    }
  })

  return res
})

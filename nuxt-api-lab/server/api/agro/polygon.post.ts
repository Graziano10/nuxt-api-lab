export default defineEventHandler(async event => {
  const body = await readBody(event)

  return await $fetch('https://api.openweathermap.org/agro/1.0/polygons', {
    method: 'POST',
    query: { appid: process.env.OPENWEATHER_KEY },
    body
  })
})

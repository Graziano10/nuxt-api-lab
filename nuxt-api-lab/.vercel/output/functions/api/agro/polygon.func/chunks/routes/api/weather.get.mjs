import {
  d as defineEventHandler,
  a as getQuery,
  b as useRuntimeConfig,
  c as createError
} from '../../_/nitro.mjs'
import { g as getWeather } from '../../_/weather.service.mjs'
import 'node:http'
import 'node:https'
import 'node:events'
import 'node:buffer'
import 'node:fs'
import 'node:path'
import 'node:crypto'
import 'zod'
import '../../_/http.mjs'

const weather_get = defineEventHandler(async event => {
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

export { weather_get as default }
//# sourceMappingURL=weather.get.mjs.map

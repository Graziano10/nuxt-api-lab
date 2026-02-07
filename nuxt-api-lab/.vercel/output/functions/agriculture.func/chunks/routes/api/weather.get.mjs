import { F as FetchError, c as createError, e as useStorage, d as defineEventHandler, a as getQuery, f as useRuntimeConfig } from '../../_/nitro.mjs';
import { ZodError, z } from 'zod';
import { b as badRequest } from '../../_/http.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

async function fetchWeather(city, apiKey, unit = "metric") {
  var _a;
  try {
    return await $fetch("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: city.trim().toLowerCase(),
        units: unit,
        appid: apiKey
      },
      timeout: 5e3,
      retry: 1
    });
  } catch (error) {
    if (error instanceof FetchError) {
      const status = (_a = error.response) == null ? void 0 : _a.status;
      if (status === 404) {
        throw createError({
          statusCode: 404,
          statusMessage: "City not found"
        });
      }
      if (status === 401) {
        throw createError({
          statusCode: 502,
          statusMessage: "Invalid OpenWeather API key"
        });
      }
    }
    throw createError({
      statusCode: 503,
      statusMessage: "Weather service unavailable"
    });
  }
}

function parseOrThrow(schema, input) {
  var _a, _b;
  try {
    return schema.parse(input);
  } catch (err) {
    if (err instanceof ZodError) {
      const message = (_b = (_a = err.issues.at(0)) == null ? void 0 : _a.message) != null ? _b : "Invalid request payload";
      badRequest(message);
    }
    throw err;
  }
}

const WeatherQuerySchema = z.object({
  city: z.string().min(1, "City is required"),
  unit: z.enum(["metric", "imperial"]).optional()
});
const WeatherItemSchema = z.object({
  description: z.string(),
  icon: z.string()
});
const OpenWeatherResponseSchema = z.object({
  name: z.string(),
  weather: z.tuple([WeatherItemSchema]).rest(WeatherItemSchema),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    humidity: z.number(),
    pressure: z.number()
  }),
  wind: z.object({
    speed: z.number(),
    deg: z.number()
  }),
  clouds: z.object({
    all: z.number()
  }),
  rain: z.object({
    "1h": z.number()
  }).optional(),
  sys: z.object({
    country: z.string(),
    sunrise: z.number(),
    sunset: z.number()
  })
});
const WeatherResponseSchema = z.object({
  city: z.string(),
  country: z.string(),
  temperature: z.number(),
  feelsLike: z.number(),
  min: z.number(),
  max: z.number(),
  humidity: z.number(),
  pressure: z.number(),
  windSpeed: z.number(),
  windDirection: z.number(),
  clouds: z.number(),
  rainLastHour: z.number(),
  condition: z.string(),
  icon: z.string(),
  sunrise: z.number(),
  sunset: z.number()
});

const storage = useStorage("cache");
async function getWeather(query, apiKey) {
  var _a, _b;
  const { city, unit } = parseOrThrow(WeatherQuerySchema, query);
  const normalizedCity = city.trim().toLowerCase();
  const normalizedUnit = unit != null ? unit : "metric";
  const cacheKey = `weather:${normalizedCity}:${normalizedUnit}`;
  const cached = await storage.getItem(cacheKey);
  if (cached) return cached;
  const data = OpenWeatherResponseSchema.parse(
    await fetchWeather(normalizedCity, apiKey, normalizedUnit)
  );
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
    rainLastHour: (_b = (_a = data.rain) == null ? void 0 : _a["1h"]) != null ? _b : 0,
    condition: data.weather[0].description,
    icon: data.weather[0].icon,
    sunrise: data.sys.sunrise * 1e3,
    sunset: data.sys.sunset * 1e3
  });
  await storage.setItem(cacheKey, result, { ttl: 600 });
  return result;
}

const weather_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const config = useRuntimeConfig(event);
  if (!config.weatherApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Weather API key not configured"
    });
  }
  return getWeather(query, config.weatherApiKey);
});

export { weather_get as default };
//# sourceMappingURL=weather.get.mjs.map

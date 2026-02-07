import { z } from 'zod'

/** Input validation */
export const WeatherQuerySchema = z.object({
  city: z.string().min(1, 'City is required'),
  unit: z.enum(['metric', 'imperial']).optional()
})

/** External API validation (OpenWeather) */
const WeatherItemSchema = z.object({
  description: z.string(),
  icon: z.string()
})

export const OpenWeatherResponseSchema = z.object({
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

  rain: z
    .object({
      '1h': z.number()
    })
    .optional(),

  sys: z.object({
    country: z.string(),
    sunrise: z.number(),
    sunset: z.number()
  })
})

/** Output verso FE */
export const WeatherResponseSchema = z.object({
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
})

export type WeatherResponse = z.infer<typeof WeatherResponseSchema>
export type OpenWeatherResponse = z.infer<typeof OpenWeatherResponseSchema>

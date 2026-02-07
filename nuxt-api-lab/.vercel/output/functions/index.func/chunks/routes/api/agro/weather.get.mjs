import { c as createError, d as defineEventHandler, a as getQuery } from '../../../_/nitro.mjs';
import { b as badRequest, o as ok, s as serviceUnavailable } from '../../../_/http.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

function isExternalServiceError(error) {
  if (typeof error !== "object" || error === null) {
    return false;
  }
  if (!("statusCode" in error)) {
    return false;
  }
  const statusCode = error.statusCode;
  return typeof statusCode === "number";
}
async function httpRequest(url, options) {
  try {
    const response = await $fetch(url, options);
    return response;
  } catch (err) {
    if (isExternalServiceError(err)) {
      throw createError({
        statusCode: 503,
        statusMessage: "External service unavailable",
        data: {
          upstreamStatus: err.statusCode
        }
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
}

const weather_get = defineEventHandler(async (event) => {
  try {
    const { polygon_id, start, end } = getQuery(event);
    if (!polygon_id || typeof polygon_id !== "string") {
      badRequest("polygon_id is required");
    }
    const now = Math.floor(Date.now() / 1e3);
    const defaultStart = now - 7 * 24 * 60 * 60;
    const data = await httpRequest("https://api.openweathermap.org/agro/1.0/weather/history", {
      method: "GET",
      query: {
        appid: process.env.OPENWEATHER_KEY,
        polyid: polygon_id,
        start: Number(start != null ? start : defaultStart),
        end: Number(end != null ? end : now)
      }
    });
    return ok(data);
  } catch (error) {
    console.error("[AGRO WEATHER ERROR]", error);
    serviceUnavailable("Failed to fetch agro weather data");
  }
});

export { weather_get as default };
//# sourceMappingURL=weather.get.mjs.map

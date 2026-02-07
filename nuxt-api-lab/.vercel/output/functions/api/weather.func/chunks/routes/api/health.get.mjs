import { d as defineEventHandler, a as getQuery, b as useRuntimeConfig } from '../../_/nitro.mjs';
import { g as getWeather } from '../../_/weather.service.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'zod';
import '../../_/http.mjs';

const health_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  return await getWeather(
    query.city,
    config.weatherApiKey
  );
});

export { health_get as default };
//# sourceMappingURL=health.get.mjs.map

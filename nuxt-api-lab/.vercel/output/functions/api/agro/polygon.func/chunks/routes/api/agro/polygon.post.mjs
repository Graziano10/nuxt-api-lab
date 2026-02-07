import { d as defineEventHandler, r as readBody } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const polygon_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await $fetch(
    "https://api.openweathermap.org/agro/1.0/polygons",
    {
      method: "POST",
      query: { appid: process.env.OPENWEATHER_KEY },
      body
    }
  );
});

export { polygon_post as default };
//# sourceMappingURL=polygon.post.mjs.map

import { d as defineEventHandler, a as getQuery, c as createError, b as getRequestHeader } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const geocode_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const q = query.q;
  if (!q) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing query"
    });
  }
  const origin = getRequestHeader(event, "origin") || "https://nuxt-api-lab.vercel.app";
  const res = await $fetch("https://nominatim.openstreetmap.org/search", {
    params: {
      q,
      format: "json",
      limit: 1
    },
    headers: {
      "User-Agent": "NuxtApiLab/1.0 (https://nuxt-api-lab.vercel.app)",
      Referer: origin,
      "Accept-Language": "it"
    }
  });
  return res;
});

export { geocode_get as default };
//# sourceMappingURL=geocode.get.mjs.map

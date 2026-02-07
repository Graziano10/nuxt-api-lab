import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-CGeMN2y-.mjs';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

function useAgroWeather(params) {
  const { data, pending, error } = useAsyncData(
    `agro-weather-${params.polygonId}-${params.start}-${params.end}`,
    async () => {
      const res = await $fetch(
        "/api/agro/weather",
        {
          params: {
            polygon_id: params.polygonId,
            start: params.start,
            end: params.end
          }
        }
      );
      return res.data;
    },
    {
      immediate: !!params.polygonId
    }
  );
  return { data, pending, error };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "agriculture",
  __ssrInlineRender: true,
  setup(__props) {
    const polygonId = ref("YOUR_POLYGON_ID_HERE");
    const now = Math.floor(Date.now() / 1e3);
    const oneWeekAgo = now - 7 * 24 * 60 * 60;
    const { data, pending, error } = useAgroWeather({
      polygonId: polygonId.value,
      start: oneWeekAgo,
      end: now
    });
    const averageTemperature = computed(() => {
      if (!data.value || data.value.length === 0) return null;
      const sum = data.value.reduce(
        (acc, item) => acc + item.temp.average,
        0
      );
      return (sum / data.value.length).toFixed(1);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-8 space-y-6" }, _attrs))}><h1 class="text-3xl font-bold"> 🌱 Agriculture Dashboard </h1>`);
      if (unref(pending)) {
        _push(`<div class="text-gray-500"> Loading agro weather data... </div>`);
      } else if (unref(error)) {
        _push(`<div class="text-red-600"> Failed to load data </div>`);
      } else if (unref(data)) {
        _push(`<div><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="p-4 bg-white shadow rounded"><p class="text-sm text-gray-500">Avg temperature</p><p class="text-2xl font-semibold">${ssrInterpolate(averageTemperature.value)} °C </p></div><div class="p-4 bg-white shadow rounded"><p class="text-sm text-gray-500">Days</p><p class="text-2xl font-semibold">${ssrInterpolate(unref(data).length)}</p></div></div><pre class="mt-6 bg-gray-100 p-4 rounded text-xs overflow-auto">${ssrInterpolate(unref(data))}
      </pre></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/agriculture.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=agriculture-DgOGEXot.mjs.map

import { _ as __nuxt_component_0$1 } from './nuxt-link-iGR7udGI.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, computed, toValue, reactive, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { A as hash } from '../_/nitro.mjs';
import { isPlainObject } from '@vue/shared';
import { f as fetchDefaults, u as useNuxtApp } from './server.mjs';
import { u as useAsyncData } from './asyncData-CGeMN2y-.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ApiCard",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {},
    to: {},
    status: {}
  },
  setup(__props) {
    const statusClass = computed(
      () => ({
        planned: "bg-yellow-500/10 text-yellow-400",
        active: "bg-green-500/10 text-green-400"
      })
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: __props.to,
        class: "block rounded-xl border border-gray-800 bg-gray-900 p-6 hover:border-gray-700 hover:bg-gray-800 transition"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-2"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>${ssrInterpolate(__props.title)}</h3><span class="${ssrRenderClass([unref(statusClass), "text-xs px-2 py-1 rounded-full"])}"${_scopeId}>${ssrInterpolate(__props.status)}</span></div><p class="text-gray-400 text-sm"${_scopeId}>${ssrInterpolate(__props.description)}</p>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                createVNode("h3", { class: "text-lg font-semibold" }, toDisplayString(__props.title), 1),
                createVNode("span", {
                  class: ["text-xs px-2 py-1 rounded-full", unref(statusClass)]
                }, toDisplayString(__props.status), 3)
              ]),
              createVNode("p", { class: "text-gray-400 text-sm" }, toDisplayString(__props.description), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ApiCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "ApiCard" });
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function useRequestFetch() {
  return useRequestEvent()?.$fetch || globalThis.$fetch;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = [{}, arg1];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  const asyncData = useAsyncData(watchSources === false ? key.value : key, (_, { signal }) => {
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  const segments = [
    toValue(opts.method)?.toUpperCase() || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.query || opts.params]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const obj = {};
      for (const entry of value.entries()) {
        const [key, val] = entry;
        obj[key] = val instanceof File ? val.name : val;
      }
      segments.push(hash(obj));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: health } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/health",
      "$Mst-AFRJgE"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ApiCard = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))}><header class="space-y-4"><h1 class="text-3xl font-bold tracking-tight" to="/index"> Nuxt API Lab </h1><p class="text-gray-400 max-w-2xl"> Laboratorio pratico per l’integrazione sicura e scalabile di API di terze parti utilizzando Nuxt 4, Vue 3 e Tailwind CSS. </p></header><div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">`);
      _push(ssrRenderComponent(_component_ApiCard, {
        title: "Weather API",
        description: "Integrazione di una API meteo reale con proxy server-side e gestione errori.",
        to: "/weather",
        status: "planned"
      }, null, _parent));
      _push(ssrRenderComponent(_component_ApiCard, {
        title: "Weather API",
        description: "Integrazione di una API meteo reale con proxy server-side e gestione errori.",
        to: "/agriculture",
        status: "planned"
      }, null, _parent));
      _push(ssrRenderComponent(_component_ApiCard, {
        title: "Maps / Earth",
        description: "Visualizzazione mappe interattive e layer satellitari tramite SDK esterni.",
        to: "/maps",
        status: "planned"
      }, null, _parent));
      _push(ssrRenderComponent(_component_ApiCard, {
        title: "Trading Charts",
        description: "Grafici finanziari con dati real-time e gestione performance.",
        to: "/trading",
        status: "planned"
      }, null, _parent));
      _push(`</div><div class="rounded-xl border border-gray-800 bg-gray-900 p-6"><h2 class="text-lg font-semibold mb-2">Server status</h2><pre class="text-sm text-green-400">${ssrInterpolate(unref(health))}
      </pre></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CXz6D0U9.mjs.map

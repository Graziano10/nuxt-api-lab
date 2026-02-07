import { _ as __nuxt_component_0$1 } from './nuxt-link-De7_2xbq.mjs';
import { mergeProps, defineComponent, computed, withCtx, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
    const statusClass = computed(() => ({
      planned: "bg-yellow-500/10 text-yellow-400",
      active: "bg-green-500/10 text-green-400"
    }));
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
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ApiCard = __nuxt_component_0;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))}><header class="space-y-4"><h1 class="text-3xl font-bold tracking-tight" to="/index">Nuxt API Lab</h1><p class="text-gray-400 max-w-2xl"> Laboratorio pratico per l’integrazione sicura e scalabile di API di terze parti utilizzando Nuxt 4, Vue 3 e Tailwind CSS. </p></header><div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">`);
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
  _push(`</div></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-CDc8BoBa.mjs.map

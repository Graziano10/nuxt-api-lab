import { _ as __nuxt_component_0 } from './nuxt-link-De7_2xbq.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "mt-24 border-t border-gray-800 bg-gray-950" }, _attrs))}><div class="max-w-7xl mx-auto px-6 py-10"><div class="grid gap-8 md:grid-cols-3"><div class="space-y-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-lg font-bold tracking-tight hover:text-primary transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Nuxt API Lab `);
          } else {
            return [
              createTextVNode(" Nuxt API Lab ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-sm text-gray-400 max-w-sm"> Laboratorio pratico per sperimentare integrazioni API sicure, performanti e scalabili con Nuxt, Vue e Tailwind. </p></div><div class="space-y-3"><h3 class="text-sm font-semibold uppercase tracking-wide text-gray-300">Sezioni</h3><div class="flex flex-wrap gap-2 text-sm">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "rounded-md border border-gray-700 px-3 py-1.5 text-gray-400 transition hover:border-gray-500 hover:text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Home `);
          } else {
            return [
              createTextVNode(" Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/weather",
        class: "rounded-md border border-gray-700 px-3 py-1.5 text-gray-400 transition hover:border-gray-500 hover:text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Weather `);
          } else {
            return [
              createTextVNode(" Weather ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/maps",
        class: "rounded-md border border-gray-700 px-3 py-1.5 text-gray-400 transition hover:border-gray-500 hover:text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Maps `);
          } else {
            return [
              createTextVNode(" Maps ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/trading",
        class: "rounded-md border border-gray-700 px-3 py-1.5 text-gray-400 transition hover:border-gray-500 hover:text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Trading `);
          } else {
            return [
              createTextVNode(" Trading ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="space-y-3"><h3 class="text-sm font-semibold uppercase tracking-wide text-gray-300">Info</h3><ul class="space-y-2 text-sm text-gray-400"><li>Nuxt 4 · Vue 3</li><li>API-first architecture</li><li>Server-side proxy &amp; caching</li></ul></div></div><div class="mt-10 flex flex-col gap-4 border-t border-gray-800 pt-6 md:flex-row md:items-center md:justify-between"><p class="text-xs text-gray-500">© ${ssrInterpolate(unref(year))} Nuxt API Lab — All rights reserved.</p><p class="text-xs text-gray-500">Built for learning · Designed for scale</p></div></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppFooter = Object.assign(_sfc_main$1, { __name: "AppFooter" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-950 text-gray-100" }, _attrs))}><header class="border-b border-gray-800"><div class="max-w-7xl mx-auto px-6 py-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-xl font-bold hover:text-primary hover:border-b-2 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Nuxt API Lab `);
          } else {
            return [
              createTextVNode(" Nuxt API Lab ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header><main class="max-w-7xl mx-auto px-6 py-8">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-BxBcnNwh.mjs.map

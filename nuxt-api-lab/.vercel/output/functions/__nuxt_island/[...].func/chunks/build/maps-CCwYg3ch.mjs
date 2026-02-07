import { defineComponent, mergeProps, ref, computed, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { B as BaseInput, a as BaseButton, b as BaseAlert } from './BaseInput-DZ87Co4w.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MapView.client",
  __ssrInlineRender: true,
  setup(__props) {
    const city = ref("");
    const lat = ref("");
    const lon = ref("");
    const error = ref(null);
    let map;
    let mapLayer;
    let satelliteLayer;
    const canSearch = computed(() => {
      return Boolean(
        city.value.trim() || lat.value.trim() && lon.value.trim()
      );
    });
    function setMapLayer() {
      if (map.hasLayer(satelliteLayer)) {
        map.removeLayer(satelliteLayer);
      }
      mapLayer.addTo(map);
    }
    function setSatelliteLayer() {
      if (map.hasLayer(mapLayer)) {
        map.removeLayer(mapLayer);
      }
      satelliteLayer.addTo(map);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="grid grid-cols-1 md:grid-cols-4 gap-2">`);
      _push(ssrRenderComponent(BaseInput, {
        modelValue: city.value,
        "onUpdate:modelValue": ($event) => city.value = $event,
        placeholder: "Città o indirizzo"
      }, null, _parent));
      _push(ssrRenderComponent(BaseInput, {
        modelValue: lat.value,
        "onUpdate:modelValue": ($event) => lat.value = $event,
        placeholder: "Latitudine",
        type: "number"
      }, null, _parent));
      _push(ssrRenderComponent(BaseInput, {
        modelValue: lon.value,
        "onUpdate:modelValue": ($event) => lon.value = $event,
        placeholder: "Longitudine",
        type: "number"
      }, null, _parent));
      _push(ssrRenderComponent(BaseButton, {
        type: "submit",
        variant: "primary",
        size: "sm",
        disabled: !unref(canSearch)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cerca `);
          } else {
            return [
              createTextVNode(" Cerca ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="relative"><div id="map" class="h-[500px] w-full rounded-card shadow-card"></div><div class="absolute top-4 right-4 z-[1000] flex gap-2 rounded-card bg-surface p-2 shadow-card">`);
      _push(ssrRenderComponent(BaseButton, {
        size: "sm",
        variant: "secondary",
        onClick: setMapLayer
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Mappa `);
          } else {
            return [
              createTextVNode(" Mappa ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(BaseButton, {
        size: "sm",
        variant: "secondary",
        onClick: setSatelliteLayer
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Satellite `);
          } else {
            return [
              createTextVNode(" Satellite ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (error.value) {
        _push(ssrRenderComponent(BaseAlert, { type: "error" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(error.value)}`);
            } else {
              return [
                createTextVNode(toDisplayString(error.value), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</form>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MapView.client.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MapViewClient = Object.assign(_sfc_main$1, { __name: "MapView" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "maps",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 space-y-4" }, _attrs))}><h1 class="text-3xl font-bold">Mappe interattive</h1><p class="text-gray-600 max-w-2xl"> In questa pagina integriamo una mappa stile Google Earth usando OpenStreetMap, Leaflet e tiles satellitari ESRI. </p>`);
      _push(ssrRenderComponent(MapViewClient, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/maps.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=maps-CCwYg3ch.mjs.map

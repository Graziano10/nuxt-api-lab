import { defineComponent, ref, computed, watch, mergeProps, withCtx, createTextVNode, unref, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, withModifiers, resolveDynamicComponent, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderSlot, ssrRenderVNode } from 'vue/server-renderer';
import { MapPin, Search, Thermometer, Droplets, Wind, Sunrise } from 'lucide-vue-next';
import { B as BaseInput, a as BaseButton, b as BaseAlert } from './BaseInput-DZ87Co4w.mjs';
import { _ as _export_sfc } from './server.mjs';
import { useDebounceFn } from '@vueuse/core';
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

const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "rounded-card bg-surface shadow-card p-6" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</section>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/BaseCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const BaseCard = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]), { __name: "UiBaseCard" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Typography",
  __ssrInlineRender: true,
  props: {
    variant: { default: "body" },
    as: { default: void 0 },
    muted: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const defaultTag = {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      body: "p",
      "body-sm": "p",
      caption: "span",
      label: "label"
    };
    const variantClasses = {
      h1: "text-2xl font-semibold text-text-primary",
      h2: "text-xl font-semibold text-text-primary",
      h3: "text-lg font-medium text-text-primary",
      h4: "text-base font-medium text-text-primary",
      body: "text-base text-text-primary",
      "body-sm": "text-sm text-text-secondary",
      caption: "text-xs text-text-secondary",
      label: "text-sm font-medium text-text-secondary"
    };
    const tag = computed(() => props.as ?? defaultTag[props.variant]);
    const classes = computed(
      () => [
        variantClasses[props.variant],
        props.muted && "text-text-secondary"
      ].filter(Boolean).join(" ")
    );
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tag.value), mergeProps({ class: classes.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Typography.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Typography = Object.assign(_sfc_main$1, { __name: "UiTypography" });
function useWeather() {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);
  async function fetchWeather(city, unit = "metric") {
    loading.value = true;
    error.value = null;
    try {
      data.value = await $fetch("/api/weather", {
        params: { city, unit }
      });
    } catch {
      error.value = "Error fetching weather";
    } finally {
      loading.value = false;
    }
  }
  return { data, loading, error, fetchWeather };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "weather",
  __ssrInlineRender: true,
  setup(__props) {
    const city = ref("");
    const unit = ref("metric");
    const { data, loading, error, fetchWeather } = useWeather();
    const canSubmit = computed(
      () => city.value.trim().length > 0 && !loading.value
    );
    async function onSubmit() {
      if (!canSubmit.value) return;
      await fetchWeather(city.value.trim(), unit.value);
    }
    const debouncedCity = ref("");
    const debounceCity = useDebounceFn(
      (value) => {
        debouncedCity.value = value;
      },
      500
    );
    watch(city, (value) => {
      debounceCity(value.trim());
    });
    watch(debouncedCity, async (value) => {
      if (value.length < 2) return;
      await fetchWeather(value, unit.value);
    });
    watch(unit, async () => {
      if (!city.value.trim()) return;
      await fetchWeather(city.value.trim(), unit.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex justify-center px-4 py-16" }, _attrs))}>`);
      _push(ssrRenderComponent(BaseCard, { class: "w-full max-w-md space-y-6" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<header${_scopeId}>`);
            _push2(ssrRenderComponent(Typography, { variant: "h1" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Weather API Lab `);
                } else {
                  return [
                    createTextVNode(" Weather API Lab ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(Typography, {
              variant: "body-sm",
              muted: "",
              class: "mt-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Real-time weather data powered by OpenWeather `);
                } else {
                  return [
                    createTextVNode(" Real-time weather data powered by OpenWeather ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</header><form class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(BaseInput, {
              modelValue: city.value,
              "onUpdate:modelValue": ($event) => city.value = $event,
              label: "City",
              placeholder: "e.g. Rome"
            }, {
              "icon-left": withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(MapPin), { class: "h-5 w-5 text-text-secondary" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(MapPin), { class: "h-5 w-5 text-text-secondary" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(BaseButton, {
              type: "submit",
              loading: unref(loading),
              disabled: !canSubmit.value
            }, {
              "icon-left": withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!unref(loading)) {
                    _push3(ssrRenderComponent(unref(Search), { class: "h-5 w-5" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    !unref(loading) ? (openBlock(), createBlock(unref(Search), {
                      key: 0,
                      class: "h-5 w-5"
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Get Weather `);
                } else {
                  return [
                    createTextVNode(" Get Weather ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form>`);
            if (unref(loading)) {
              _push2(ssrRenderComponent(BaseCard, { class: "animate-pulse space-y-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="h-5 bg-gray-200 rounded w-2/3"${_scopeId2}></div><div class="h-10 bg-gray-200 rounded w-1/2"${_scopeId2}></div><div class="grid grid-cols-2 gap-4"${_scopeId2}><div class="h-4 bg-gray-200 rounded"${_scopeId2}></div><div class="h-4 bg-gray-200 rounded"${_scopeId2}></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "h-5 bg-gray-200 rounded w-2/3" }),
                      createVNode("div", { class: "h-10 bg-gray-200 rounded w-1/2" }),
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode("div", { class: "h-4 bg-gray-200 rounded" }),
                        createVNode("div", { class: "h-4 bg-gray-200 rounded" })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(error)) {
              _push2(ssrRenderComponent(BaseAlert, { type: "error" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(error))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(error)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(data) && !unref(loading)) {
              _push2(ssrRenderComponent(BaseCard, { class: "bg-surface-muted space-y-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center gap-3"${_scopeId2}><img${ssrRenderAttr("src", `https://openweathermap.org/img/wn/${unref(data).icon}@2x.png`)}${ssrRenderAttr("alt", unref(data).condition)} class="h-12 w-12"${_scopeId2}><div${_scopeId2}>`);
                    _push3(ssrRenderComponent(Typography, { variant: "h3" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(data).city)}, ${ssrInterpolate(unref(data).country)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(data).city) + ", " + toDisplayString(unref(data).country), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(Typography, {
                      variant: "body-sm",
                      muted: "",
                      class: "capitalize"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(data).condition)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(data).condition), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(BaseButton, {
                      size: "sm",
                      onClick: ($event) => unit.value = unit.value === "metric" ? "imperial" : "metric"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unit.value === "metric" ? "°C" : "°F")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unit.value === "metric" ? "°C" : "°F"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div><div class="grid grid-cols-2 gap-4 text-sm text-text-secondary"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Thermometer), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Feels like: ${ssrInterpolate(unref(data).feelsLike)}°${ssrInterpolate(unit.value === "metric" ? "C" : "F")}</div><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Droplets), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Humidity: ${ssrInterpolate(unref(data).humidity)}% </div><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Wind), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Wind: ${ssrInterpolate(unref(data).windSpeed)} ${ssrInterpolate(unit.value === "metric" ? "m/s" : "mph")}</div><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Sunrise), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(new Date(unref(data).sunrise).toLocaleTimeString())}</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("img", {
                          src: `https://openweathermap.org/img/wn/${unref(data).icon}@2x.png`,
                          alt: unref(data).condition,
                          class: "h-12 w-12"
                        }, null, 8, ["src", "alt"]),
                        createVNode("div", null, [
                          createVNode(Typography, { variant: "h3" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(data).city) + ", " + toDisplayString(unref(data).country), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(Typography, {
                            variant: "body-sm",
                            muted: "",
                            class: "capitalize"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(data).condition), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(BaseButton, {
                          size: "sm",
                          onClick: ($event) => unit.value = unit.value === "metric" ? "imperial" : "metric"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unit.value === "metric" ? "°C" : "°F"), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4 text-sm text-text-secondary" }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Thermometer), { class: "h-4 w-4" }),
                          createTextVNode(" Feels like: " + toDisplayString(unref(data).feelsLike) + "°" + toDisplayString(unit.value === "metric" ? "C" : "F"), 1)
                        ]),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Droplets), { class: "h-4 w-4" }),
                          createTextVNode(" Humidity: " + toDisplayString(unref(data).humidity) + "% ", 1)
                        ]),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Wind), { class: "h-4 w-4" }),
                          createTextVNode(" Wind: " + toDisplayString(unref(data).windSpeed) + " " + toDisplayString(unit.value === "metric" ? "m/s" : "mph"), 1)
                        ]),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Sunrise), { class: "h-4 w-4" }),
                          createTextVNode(" " + toDisplayString(new Date(unref(data).sunrise).toLocaleTimeString()), 1)
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (!unref(data) && !unref(error) && !unref(loading)) {
              _push2(ssrRenderComponent(Typography, {
                variant: "caption",
                muted: "",
                class: "text-center"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Enter a city name to retrieve current weather information `);
                  } else {
                    return [
                      createTextVNode(" Enter a city name to retrieve current weather information ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("header", null, [
                createVNode(Typography, { variant: "h1" }, {
                  default: withCtx(() => [
                    createTextVNode(" Weather API Lab ")
                  ]),
                  _: 1
                }),
                createVNode(Typography, {
                  variant: "body-sm",
                  muted: "",
                  class: "mt-1"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Real-time weather data powered by OpenWeather ")
                  ]),
                  _: 1
                })
              ]),
              createVNode("form", {
                class: "space-y-4",
                onSubmit: withModifiers(onSubmit, ["prevent"])
              }, [
                createVNode(BaseInput, {
                  modelValue: city.value,
                  "onUpdate:modelValue": ($event) => city.value = $event,
                  label: "City",
                  placeholder: "e.g. Rome"
                }, {
                  "icon-left": withCtx(() => [
                    createVNode(unref(MapPin), { class: "h-5 w-5 text-text-secondary" })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(BaseButton, {
                  type: "submit",
                  loading: unref(loading),
                  disabled: !canSubmit.value
                }, {
                  "icon-left": withCtx(() => [
                    !unref(loading) ? (openBlock(), createBlock(unref(Search), {
                      key: 0,
                      class: "h-5 w-5"
                    })) : createCommentVNode("", true)
                  ]),
                  default: withCtx(() => [
                    createTextVNode(" Get Weather ")
                  ]),
                  _: 1
                }, 8, ["loading", "disabled"])
              ], 32),
              unref(loading) ? (openBlock(), createBlock(BaseCard, {
                key: 0,
                class: "animate-pulse space-y-4"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "h-5 bg-gray-200 rounded w-2/3" }),
                  createVNode("div", { class: "h-10 bg-gray-200 rounded w-1/2" }),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", { class: "h-4 bg-gray-200 rounded" }),
                    createVNode("div", { class: "h-4 bg-gray-200 rounded" })
                  ])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              unref(error) ? (openBlock(), createBlock(BaseAlert, {
                key: 1,
                type: "error"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(error)), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              unref(data) && !unref(loading) ? (openBlock(), createBlock(BaseCard, {
                key: 2,
                class: "bg-surface-muted space-y-4"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("img", {
                      src: `https://openweathermap.org/img/wn/${unref(data).icon}@2x.png`,
                      alt: unref(data).condition,
                      class: "h-12 w-12"
                    }, null, 8, ["src", "alt"]),
                    createVNode("div", null, [
                      createVNode(Typography, { variant: "h3" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(data).city) + ", " + toDisplayString(unref(data).country), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(Typography, {
                        variant: "body-sm",
                        muted: "",
                        class: "capitalize"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(data).condition), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(BaseButton, {
                      size: "sm",
                      onClick: ($event) => unit.value = unit.value === "metric" ? "imperial" : "metric"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unit.value === "metric" ? "°C" : "°F"), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4 text-sm text-text-secondary" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(unref(Thermometer), { class: "h-4 w-4" }),
                      createTextVNode(" Feels like: " + toDisplayString(unref(data).feelsLike) + "°" + toDisplayString(unit.value === "metric" ? "C" : "F"), 1)
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(unref(Droplets), { class: "h-4 w-4" }),
                      createTextVNode(" Humidity: " + toDisplayString(unref(data).humidity) + "% ", 1)
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(unref(Wind), { class: "h-4 w-4" }),
                      createTextVNode(" Wind: " + toDisplayString(unref(data).windSpeed) + " " + toDisplayString(unit.value === "metric" ? "m/s" : "mph"), 1)
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(unref(Sunrise), { class: "h-4 w-4" }),
                      createTextVNode(" " + toDisplayString(new Date(unref(data).sunrise).toLocaleTimeString()), 1)
                    ])
                  ])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              !unref(data) && !unref(error) && !unref(loading) ? (openBlock(), createBlock(Typography, {
                key: 3,
                variant: "caption",
                muted: "",
                class: "text-center"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Enter a city name to retrieve current weather information ")
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/weather.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=weather-Dy7IimNy.mjs.map

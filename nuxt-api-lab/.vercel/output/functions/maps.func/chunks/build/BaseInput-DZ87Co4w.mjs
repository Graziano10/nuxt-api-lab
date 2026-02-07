import { defineComponent, mergeProps, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderSlot } from 'vue/server-renderer';

const base = "inline-flex items-center justify-center gap-2 font-medium rounded-app transition focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "BaseButton",
  __ssrInlineRender: true,
  props: {
    variant: { default: "primary" },
    size: { default: "md" },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    type: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const isDisabled = computed(() => props.disabled || props.loading);
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-hover",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      danger: "bg-danger text-white hover:bg-red-700"
    };
    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-5 py-3 text-lg"
    };
    const classes = computed(
      () => [base, variants[props.variant], sizes[props.size]].join(" ")
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: props.type,
        class: classes.value,
        disabled: isDisabled.value,
        "aria-disabled": isDisabled.value,
        "aria-busy": props.loading
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "icon-left", {}, null, _push, _parent);
      if (!props.loading) {
        _push(`<span>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      } else {
        _push(`<span class="flex items-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>`);
        ssrRenderSlot(_ctx.$slots, "loading", {}, () => {
          _push(`Loading`);
        }, _push, _parent);
        _push(`</span>`);
      }
      ssrRenderSlot(_ctx.$slots, "icon-right", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/BaseButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const BaseButton = Object.assign(_sfc_main$2, { __name: "UiBaseButton" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BaseAlert",
  __ssrInlineRender: true,
  props: {
    type: { default: "info" }
  },
  setup(__props) {
    const styles = {
      info: "bg-blue-50 text-blue-700 border-blue-200",
      error: "bg-red-50 text-red-700 border-red-200"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        role: "alert",
        class: ["rounded-app border p-3 text-sm", styles[__props.type]]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/BaseAlert.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const BaseAlert = Object.assign(_sfc_main$1, { __name: "UiBaseAlert" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    label: {},
    placeholder: {},
    error: {},
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label class="text-sm font-medium text-text-secondary">${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} class="w-full rounded-app border px-4 py-3 text-base bg-surface focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100 disabled:cursor-not-allowed text-text-secondary">`);
      if (__props.error) {
        _push(`<p class="text-sm text-danger">${ssrInterpolate(__props.error)}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/BaseInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BaseInput = Object.assign(_sfc_main, { __name: "UiBaseInput" });

export { BaseInput as B, BaseButton as a, BaseAlert as b };
//# sourceMappingURL=BaseInput-DZ87Co4w.mjs.map

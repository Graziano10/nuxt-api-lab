<script setup lang="ts">
import { computed } from 'vue'

/* =======================
   TYPES
======================= */
type Variant = 'primary' | 'secondary' | 'danger'
type Size = 'sm' | 'md' | 'lg'

/* =======================
   PROPS (UNA SOLA VOLTA)
======================= */
const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    loading?: boolean
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    loading: false,
    disabled: false
  }
)

/* =======================
   STATE
======================= */
const isDisabled = computed(() => props.disabled || props.loading)

/* =======================
   CLASSES
======================= */
const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-app transition focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  danger: 'bg-danger text-white hover:bg-red-700'
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-3 text-lg'
}

const classes = computed(() =>
  [base, variants[props.variant], sizes[props.size]].join(' ')
)
</script>

<template>
  <button
    :type="props.type"
    :class="classes"
    :disabled="isDisabled"
    :aria-disabled="isDisabled"
    :aria-busy="props.loading"
  >
    <!-- Left icon -->
    <slot name="icon-left" />

    <!-- Content -->
    <span v-if="!props.loading">
      <slot />
    </span>

    <!-- Loading -->
    <span
      v-else
      class="flex items-center gap-2"
    >
      <span
        class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
      />
      <slot name="loading">Loading</slot>
    </span>

    <!-- Right icon -->
    <slot name="icon-right" />
  </button>
</template>

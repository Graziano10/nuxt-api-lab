<script setup lang="ts">
  import { computed } from 'vue'

  type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body-sm' | 'caption' | 'label'

  const props = withDefaults(
    defineProps<{
      variant?: Variant
      as?: keyof HTMLElementTagNameMap
      muted?: boolean
    }>(),
    {
      variant: 'body',
      as: undefined
    }
  )

  const defaultTag: Record<Variant, keyof HTMLElementTagNameMap> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    body: 'p',
    'body-sm': 'p',
    caption: 'span',
    label: 'label'
  }

  const variantClasses: Record<Variant, string> = {
    h1: 'text-2xl font-semibold text-text-primary',
    h2: 'text-xl font-semibold text-text-primary',
    h3: 'text-lg font-medium text-text-primary',
    h4: 'text-base font-medium text-text-primary',
    body: 'text-base text-text-primary',
    'body-sm': 'text-sm text-text-secondary',
    caption: 'text-xs text-text-secondary',
    label: 'text-sm font-medium text-text-secondary'
  }

  const tag = computed(() => props.as ?? defaultTag[props.variant])

  const classes = computed(() =>
    [variantClasses[props.variant], props.muted && 'text-text-secondary'].filter(Boolean).join(' ')
  )
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>

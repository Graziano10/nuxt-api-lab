<script setup lang="ts">
defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>


<template>
  <div class="space-y-1">
    <label
      v-if="label"
      class="text-sm font-medium text-text-secondary"
    >
      {{ label }}
    </label>

  <input
  :value="modelValue"
  :placeholder="placeholder"
  :disabled="disabled"
  class="w-full rounded-app border px-4 py-3 text-base bg-surface
         focus:outline-none focus:ring-2 focus:ring-primary
         disabled:bg-gray-100 disabled:cursor-not-allowed text-text-secondary"
  @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
>

    <p v-if="error" class="text-sm text-danger">
      {{ error }}
    </p>
  </div>
</template>

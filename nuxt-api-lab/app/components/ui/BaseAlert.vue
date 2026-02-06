<script setup lang="ts">
type AlertType = 'info' | 'error'

const { type = 'info' } = defineProps<{
  type?: 'info' | 'error'
}>()


const styles: Record<AlertType, string> = {
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  error: 'bg-red-50 text-red-700 border-red-200'
}
</script>

<template>
  <div
    role="alert"
    class="rounded-app border p-3 text-sm"
  :class="styles[type]"
  >
    <slot />
  </div>
</template>

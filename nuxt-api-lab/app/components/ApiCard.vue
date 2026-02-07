<template>
  <NuxtLink
    :to="to"
    class="block rounded-xl border border-gray-800 bg-gray-900 p-6 hover:border-gray-700 hover:bg-gray-800 transition"
  >
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-lg font-semibold">
        {{ title }}
      </h3>

      <span class="text-xs px-2 py-1 rounded-full" :class="statusClass">
        {{ status }}
      </span>
    </div>

    <p class="text-gray-400 text-sm">
      {{ description }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
    description: string
    to: string
    status: 'planned' | 'active'
  }>()

  const statusClass = computed(() => ({
    planned: 'bg-yellow-500/10 text-yellow-400',
    active: 'bg-green-500/10 text-green-400'
  }))
</script>

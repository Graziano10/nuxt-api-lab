<template>
  <div class="space-y-4">
    <h2 class="text-2xl font-semibold">API Integration Lab</h2>

    <p class="text-gray-400">
      Progetto dimostrativo per integrazione sicura di API di terze parti con Nuxt 3.
    </p>

    <pre class="bg-gray-900 p-4 rounded-lg text-sm">
{{ health }}
    </pre>
  </div>
</template>

<script setup lang="ts">
const { data: health } = await useFetch('/api/health')
</script>

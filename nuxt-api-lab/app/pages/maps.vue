<template>
  <div class="p-6 space-y-4">
    <h1 class="text-3xl font-bold">Mappe interattive</h1>

    <p class="text-gray-600 max-w-2xl">
      In questa pagina integriamo una mappa interattiva con Leaflet.
    </p>

    <ClientOnly>
      <MapView />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import MapView from '~/components/MapView.client.vue'
</script>

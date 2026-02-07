<template>
  <section class="space-y-12">
    <!-- Hero -->
    <header class="space-y-4">
      <h1 class="text-3xl font-bold tracking-tight" to ="/index">
        Nuxt API Lab
      </h1>

      <p class="text-gray-400 max-w-2xl">
        Laboratorio pratico per l’integrazione sicura e scalabile di API di terze parti
        utilizzando Nuxt 4, Vue 3 e Tailwind CSS.
      </p>
    </header>

    <!-- API Cards -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ApiCard
        title="Weather API"
        description="Integrazione di una API meteo reale con proxy server-side e gestione errori."
        to="/weather"
        status="planned"
      />

      <ApiCard
        title="Weather API"
        description="Integrazione di una API meteo reale con proxy server-side e gestione errori."
        to="/agriculture"
        status="planned"
      />

      <ApiCard
        title="Maps / Earth"
        description="Visualizzazione mappe interattive e layer satellitari tramite SDK esterni."
        to="/maps"
        status="planned"
      />

      <ApiCard
        title="Trading Charts"
        description="Grafici finanziari con dati real-time e gestione performance."
        to="/trading"
        status="planned"
      />
    </div>

    <!-- Health check -->
    <div class="rounded-xl border border-gray-800 bg-gray-900 p-6">
      <h2 class="text-lg font-semibold mb-2">Server status</h2>

      <pre class="text-sm text-green-400">
{{ health }}
      </pre>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: health } = await useFetch('/api/health')
</script>

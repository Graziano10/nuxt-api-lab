<template>
  <footer class="mt-24 border-t border-gray-800 bg-gray-950">
    <div class="max-w-7xl mx-auto px-6 py-10">
      <!-- TOP -->
      <div class="grid gap-8 md:grid-cols-3">
        <!-- BRAND -->
        <div class="space-y-3">
          <NuxtLink to="/" class="text-lg font-bold tracking-tight hover:text-primary transition">
            Nuxt API Lab
          </NuxtLink>

          <p class="text-sm text-gray-400 max-w-sm">
            Laboratorio pratico per sperimentare integrazioni API sicure, performanti e scalabili
            con Nuxt, Vue e Tailwind.
          </p>
        </div>

        <!-- NAV -->
        <div class="space-y-3">
          <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-300">Sezioni</h3>

          <div class="flex flex-wrap gap-2 text-sm">
            <NuxtLink
              to="/"
              class="rounded-md border border-gray-700 px-3 py-1.5 text-gray-400 transition hover:border-gray-500 hover:text-white"
            >
              Home
            </NuxtLink>

            <NuxtLink
              to="/weather"
              class="rounded-md border border-gray-700 px-3 py-1.5 text-gray-400 transition hover:border-gray-500 hover:text-white"
            >
              Weather
            </NuxtLink>

            <NuxtLink
              to="/maps"
              class="rounded-md border border-gray-700 px-3 py-1.5 text-gray-400 transition hover:border-gray-500 hover:text-white"
            >
              Maps
            </NuxtLink>

            <NuxtLink
              to="/trading"
              class="rounded-md border border-gray-700 px-3 py-1.5 text-gray-400 transition hover:border-gray-500 hover:text-white"
            >
              Trading
            </NuxtLink>
          </div>
        </div>

        <!-- META -->
        <div class="space-y-3">
          <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-300">Info</h3>

          <ul class="space-y-2 text-sm text-gray-400">
            <li>Nuxt 4 · Vue 3</li>
            <li>API-first architecture</li>
            <li>Server-side proxy & caching</li>
          </ul>
        </div>
      </div>

      <!-- BOTTOM -->
      <div
        class="mt-10 flex flex-col gap-4 border-t border-gray-800 pt-6 md:flex-row md:items-center md:justify-between"
      >
        <p class="text-xs text-gray-500">© {{ year }} Nuxt API Lab — All rights reserved.</p>

        <p class="text-xs text-gray-500">Built for learning · Designed for scale</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  const year = new Date().getFullYear()
</script>

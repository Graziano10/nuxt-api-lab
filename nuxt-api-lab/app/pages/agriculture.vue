<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAgroWeather } from '~/composables/useAgroWeather'
  import type { AgroWeatherItem } from '../../types/agro'

  const polygonId = ref<string>('YOUR_POLYGON_ID_HERE')

  const now = Math.floor(Date.now() / 1000)
  const oneWeekAgo = now - 7 * 24 * 60 * 60

  const { data, pending, error } = useAgroWeather({
    polygonId: polygonId.value,
    start: oneWeekAgo,
    end: now
  })

  const averageTemperature = computed(() => {
    if (!data.value || data.value.length === 0) return null

    const sum = data.value.reduce(
      (acc: number, item: AgroWeatherItem) => acc + item.temp.average,
      0
    )

    return (sum / data.value.length).toFixed(1)
  })
</script>

<template>
  <div class="p-8 space-y-6">
    <h1 class="text-3xl font-bold">🌱 Agriculture Dashboard</h1>

    <div v-if="pending" class="text-gray-500">Loading agro weather data...</div>

    <div v-else-if="error" class="text-red-600">Failed to load data</div>

    <div v-else-if="data">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-white shadow rounded">
          <p class="text-sm text-gray-500">Avg temperature</p>
          <p class="text-2xl font-semibold">{{ averageTemperature }} °C</p>
        </div>

        <div class="p-4 bg-white shadow rounded">
          <p class="text-sm text-gray-500">Days</p>
          <p class="text-2xl font-semibold">
            {{ data.length }}
          </p>
        </div>
      </div>

      <pre class="mt-6 bg-gray-100 p-4 rounded text-xs overflow-auto"
        >{{ data }}
      </pre>
    </div>
  </div>
</template>

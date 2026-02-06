<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Search,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Sunrise
} from 'lucide-vue-next'

import BaseAlert from '~/components/ui/BaseAlert.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import BaseCard from '~/components/ui/BaseCard.vue'
import BaseInput from '~/components/ui/BaseInput.vue'
import Typography from '~/components/ui/Typography.vue'

import { useDebounceFn } from '@vueuse/core'

const city = ref('')
const unit = ref<'metric' | 'imperial'>('metric')

const { data, loading, error, fetchWeather } = useWeather()

const canSubmit = computed(
  () => city.value.trim().length > 0 && !loading.value
)

async function onSubmit() {
  if (!canSubmit.value) return
  await fetchWeather(city.value.trim(), unit.value)
}

/* ---------------- Debounce ---------------- */

const debouncedCity = ref('')

const debounceCity = useDebounceFn(
  (value: string) => {
    debouncedCity.value = value
  },
  500
)

watch(city, (value) => {
  debounceCity(value.trim())
})

watch(debouncedCity, async (value) => {
  if (value.length < 2) return
  await fetchWeather(value, unit.value)
})

/* ---------------- Unit toggle ---------------- */

watch(unit, async () => {
  if (!city.value.trim()) return
  await fetchWeather(city.value.trim(), unit.value)
})
</script>


<template>
  <main class="min-h-screen flex justify-center px-4 py-16">
    <BaseCard class="w-full max-w-md space-y-6">
      <!-- Header -->
      <header>
        <Typography variant="h1">
          Weather API Lab
        </Typography>

        <Typography
          variant="body-sm"
          muted
          class="mt-1"
        >
          Real-time weather data powered by OpenWeather
        </Typography>
      </header>

      <!-- Form -->
      <form
        class="space-y-4"
        @submit.prevent="onSubmit"
      >
        <BaseInput
          v-model="city"
          label="City"
          placeholder="e.g. Rome"
        >
          <template #icon-left>
            <MapPin class="h-5 w-5 text-text-secondary" />
          </template>
        </BaseInput>

        <BaseButton
          type="submit"
          :loading="loading"
          :disabled="!canSubmit"
        >
          <template #icon-left>
            <Search
              v-if="!loading"
              class="h-5 w-5"
            />
          </template>

          Get Weather
        </BaseButton>
      </form>

      <!-- Skeleton -->
      <BaseCard
        v-if="loading"
        class="animate-pulse space-y-4"
      >
        <div class="h-5 bg-gray-200 rounded w-2/3" />
        <div class="h-10 bg-gray-200 rounded w-1/2" />
        <div class="grid grid-cols-2 gap-4">
          <div class="h-4 bg-gray-200 rounded" />
          <div class="h-4 bg-gray-200 rounded" />
        </div>
      </BaseCard>

      <!-- Error -->
      <BaseAlert
        v-if="error"
        type="error"
      >
        {{ error }}
      </BaseAlert>

      <!-- Result -->
      <BaseCard
        v-if="data && !loading"
        class="bg-surface-muted space-y-4"
      >
        <div class="flex items-center gap-3">
<img
  :src="`https://openweathermap.org/img/wn/${data.icon}@2x.png`"
  :alt="data.condition"
  class="h-12 w-12">


          <div>
            <Typography variant="h3">
              {{ data.city }}, {{ data.country }}
            </Typography>

            <Typography
              variant="body-sm"
              muted
              class="capitalize"
            >
              {{ data.condition }}
            </Typography>
          </div>

          <BaseButton
  size="sm"
  @click="unit = unit === 'metric' ? 'imperial' : 'metric'"
>
  {{ unit === 'metric' ? '°C' : '°F' }}
</BaseButton>

        </div>

        <div class="grid grid-cols-2 gap-4 text-sm text-text-secondary">
          <div class="flex items-center gap-2">
            <Thermometer class="h-4 w-4" />
       Feels like: {{ data.feelsLike }}°{{ unit === 'metric' ? 'C' : 'F' }}
          </div>

          <div class="flex items-center gap-2">
            <Droplets class="h-4 w-4" />
            Humidity: {{ data.humidity }}%
          </div>

          <div class="flex items-center gap-2">
            <Wind class="h-4 w-4" />
     Wind: {{ data.windSpeed }} {{ unit === 'metric' ? 'm/s' : 'mph' }}
          </div>

          <div class="flex items-center gap-2">
            <Sunrise class="h-4 w-4" />
            {{ new Date(data.sunrise).toLocaleTimeString() }}
          </div>
        </div>
      </BaseCard>

      <!-- Empty -->
      <Typography
        v-if="!data && !error && !loading"
        variant="caption"
        muted
        class="text-center"
      >
        Enter a city name to retrieve current weather information
      </Typography>
    </BaseCard>
  </main>
</template>

<template>
  <div class="space-y-4">
    <!-- SEARCH -->
    <form
      class="grid grid-cols-1 md:grid-cols-4 gap-2"
      @submit.prevent="searchLocation"
    >
      <BaseInput
        v-model="city"
        placeholder="Città o indirizzo"
      />

      <BaseInput
        v-model="lat"
        placeholder="Latitudine"
        type="number"
      />

      <BaseInput
        v-model="lon"
        placeholder="Longitudine"
        type="number"
      />

      <BaseButton
        type="submit"
        size="sm"
        :disabled="!canSearch"
      >
        Cerca
      </BaseButton>
    </form>

    <!-- MAP -->
    <div
      id="map"
      class="h-[500px] w-full rounded-lg shadow"
    />

    <!-- ERROR -->
    <BaseAlert v-if="error" type="error">
      {{ error }}
    </BaseAlert>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import * as L from 'leaflet'

import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseAlert from '@/components/ui/BaseAlert.vue'

/* =======================
   TYPES
======================= */
interface NominatimResult {
  lat: string
  lon: string
}

/* =======================
   STATE
======================= */
const city = ref('')
const lat = ref('')
const lon = ref('')
const error = ref<string | null>(null)

/* =======================
   DERIVED
======================= */
const canSearch = computed(() =>
  Boolean(city.value.trim() || (lat.value && lon.value))
)

/* =======================
   LEAFLET
======================= */
let map: L.Map | null = null
let marker: L.Marker | null = null

/* =======================
   MAP INIT (CLIENT ONLY)
======================= */
onMounted(() => {
  const mapEl = document.getElementById('map')
  if (!mapEl) return

  map = L.map(mapEl).setView([45.4642, 9.19], 6)

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: '&copy; OpenStreetMap contributors' }
  ).addTo(map)

  // click sulla mappa → aggiorna coordinate
map.on('click', (e: L.LeafletMouseEvent) => {
  const { lat: la, lng: lo } = e.latlng

  lat.value = la.toFixed(6)
  lon.value = lo.toFixed(6)
  city.value = ''
  flyTo(la, lo)
})

  // fix rendering Nuxt
  setTimeout(() => map?.invalidateSize(), 0)
})

/* =======================
   SEARCH
======================= */
async function searchLocation() {
  error.value = null

  try {
    // 🔹 ricerca per città
    if (city.value.trim()) {
      const results = await $fetch<NominatimResult[]>(
        '/api/map/geocode',
        { params: { q: city.value } }
      )

    const result = results[0]
if (!result) {
  error.value = 'Nessun risultato trovato'
  return
}

lat.value = result.lat
lon.value = result.lon
    }

    if (!lat.value || !lon.value) {
      error.value = 'Inserisci una città o coordinate'
      return
    }

    const latNum = Number(lat.value)
    const lonNum = Number(lon.value)

    if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
      error.value = 'Coordinate non valide'
      return
    }

    flyTo(latNum, lonNum)
  } catch (e) {
    console.error(e)
    error.value = 'Errore nella ricerca della località'
  }
}

/* =======================
   HELPERS
======================= */
function flyTo(lat: number, lon: number) {
  if (!map) return

  map.setView([lat, lon], 12)

  if (marker) {
    marker.setLatLng([lat, lon])
  } else {
    marker = L.marker([lat, lon]).addTo(map)
  }
}

</script>

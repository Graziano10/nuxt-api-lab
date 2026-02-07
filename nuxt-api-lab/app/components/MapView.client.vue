<template>
  <form class="space-y-4" @submit.prevent="searchLocation">
    <!-- SEARCH CONTROLS -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
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
  variant="primary"
  size="sm"
  :disabled="!canSearch"
>
  Cerca
</BaseButton>
    </div>

    <!-- MAP -->
    <div class="relative">
      <div
        id="map"
        class="h-[500px] w-full rounded-card shadow-card"
      />

      <!-- LAYERS -->
      <div
        class="absolute top-4 right-4 z-[1000] flex gap-2 rounded-card bg-surface p-2 shadow-card"
      >
        <BaseButton size="sm" variant="secondary" @click="setMapLayer">
          Mappa
        </BaseButton>
        <BaseButton size="sm" variant="secondary" @click="setSatelliteLayer">
          Satellite
        </BaseButton>
      </div>
    </div>

    <!-- FEEDBACK -->
    <BaseAlert v-if="error" type="error">
      {{ error }}
    </BaseAlert>
  </form>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'

import BaseButton from '@/components/ui/BaseButton.vue'
import BaseAlert from '@/components/ui/BaseAlert.vue'
import BaseInput from '@/components/ui/BaseInput.vue'

import type {
  Map as LeafletMap,
  TileLayer,
  Marker
} from 'leaflet'

interface NominatimResult {
  lat: string
  lon: string
  display_name: string
}


/* =======================
   STATE
======================= */
const city = ref('')
const lat = ref('')
const lon = ref('')
const error = ref<string | null>(null)

/* =======================
   LEAFLET
======================= */
let map: LeafletMap
let mapLayer: TileLayer
let satelliteLayer: TileLayer
let marker: Marker | null = null
let L: typeof import('leaflet')

const canSearch = computed(() => {
  return Boolean(
    city.value.trim() ||
    (lat.value.trim() && lon.value.trim())
  )
})
/* =======================
   MAP INIT
======================= */
onMounted(async () => {
  L = await import('leaflet')
  await import('leaflet/dist/leaflet.css')

  map = L.map('map').setView([45.4642, 9.19], 6)

  mapLayer = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: '&copy; OpenStreetMap contributors' }
  )

  satelliteLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { attribution: 'Tiles © Esri' }
  )

  mapLayer.addTo(map)
})

/* =======================
   SEARCH
======================= */
async function searchLocation() {
  error.value = null

  // 🔹 PRIORITÀ: città / indirizzo
  if (city.value.trim()) {
    try {
      const results = await $fetch<NominatimResult[]>(
        'https://nominatim.openstreetmap.org/search',
        {
          params: {
            q: city.value,
            format: 'json',
            limit: 1
          },
          headers: {
            'Accept-Language': 'it'
          }
        }
      )

      const result = results[0]
      if (!result) {
        error.value = 'Nessun risultato trovato'
        return
      }

      const latNum = Number(result.lat)
      const lonNum = Number(result.lon)

      // aggiorna anche i campi
      lat.value = String(latNum)
      lon.value = String(lonNum)

      flyTo(latNum, lonNum)
      return
    } catch {
      error.value = 'Errore nella ricerca della località'
      return
    }
  }

  // 🔹 FALLBACK: coordinate manuali
  if (lat.value && lon.value) {
    flyTo(Number(lat.value), Number(lon.value))
    return
  }

  error.value = 'Inserisci una città o coordinate'
}



/* =======================
   MAP HELPERS
======================= */
function flyTo(lat: number, lon: number) {
  map.setView([lat, lon], 12, { animate: true })

  if (marker) {
    marker.setLatLng([lat, lon])
  } else {
    marker = L.marker([lat, lon]).addTo(map)
  }
}

/* =======================
   LAYERS
======================= */
function setMapLayer() {
  if (map.hasLayer(satelliteLayer)) {
    map.removeLayer(satelliteLayer)
  }
  mapLayer.addTo(map)
}

function setSatelliteLayer() {
  if (map.hasLayer(mapLayer)) {
    map.removeLayer(mapLayer)
  }
  satelliteLayer.addTo(map)
}
</script>

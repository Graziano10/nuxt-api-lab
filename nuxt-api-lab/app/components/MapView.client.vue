<template>
  <div class="space-y-4">
    <!-- SEARCH -->
    <form class="grid grid-cols-1 md:grid-cols-4 gap-2" @submit.prevent="searchLocation">
      <BaseInput v-model="city" placeholder="Città o indirizzo" />
      <BaseInput v-model="lat" placeholder="Latitudine" />
      <BaseInput v-model="lon" placeholder="Longitudine" />

      <BaseButton type="submit" size="sm" :disabled="!canSearch">Cerca</BaseButton>
    </form>

    <!-- MAP -->
    <div id="map" class="h-[500px] w-full rounded-lg shadow" />

    <BaseAlert v-if="error" type="error">
      {{ error }}
    </BaseAlert>
  </div>
</template>
<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'

  import BaseInput from '@/components/ui/BaseInput.vue'
  import BaseButton from '@/components/ui/BaseButton.vue'
  import BaseAlert from '@/components/ui/BaseAlert.vue'

  /* =======================
   LEAFLET TYPES ONLY
======================= */
  import type {
    Map as LeafletMap,
    Marker as LeafletMarker,
    LeafletMouseEvent,
    TileLayer
  } from 'leaflet'

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

  const canSearch = computed(() => Boolean(city.value.trim() || (lat.value && lon.value)))

  /* =======================
   LEAFLET INSTANCES
======================= */
  let map: LeafletMap | null = null
  let marker: LeafletMarker | null = null
  let tileLayer: TileLayer | null = null

  // 👇 runtime-only module reference
  let Leaflet: typeof import('leaflet') | null = null

  /* =======================
   MAP INIT (CLIENT ONLY)
======================= */
  onMounted(async () => {
    Leaflet = await import('leaflet')

    const mapEl = document.getElementById('map')
    if (!mapEl || !Leaflet) return

    map = Leaflet.map(mapEl).setView([45.4642, 9.19], 6)

    tileLayer = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    })

    tileLayer.addTo(map)

    map.on('click', (e: LeafletMouseEvent) => {
      const { lat: la, lng: lo } = e.latlng

      lat.value = la.toFixed(6)
      lon.value = lo.toFixed(6)
      city.value = ''

      flyTo(la, lo)
    })

    // Nuxt layout fix
    setTimeout(() => map?.invalidateSize(), 0)
  })

  /* =======================
   SEARCH
======================= */
  async function searchLocation() {
    error.value = null

    try {
      if (city.value.trim()) {
        const results = await $fetch<NominatimResult[]>('/api/map/geocode', {
          params: { q: city.value }
        })

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
    } catch (err) {
      console.error(err)
      error.value = 'Errore nella ricerca della località'
    }
  }

  /* =======================
   HELPERS
======================= */
  function flyTo(lat: number, lon: number) {
    if (!map || !Leaflet) return

    map.setView([lat, lon], 12)

    if (marker) {
      marker.setLatLng([lat, lon])
    } else {
      marker = Leaflet.marker([lat, lon]).addTo(map)
    }
  }
</script>

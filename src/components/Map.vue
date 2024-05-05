<template>
  <div class="map-container">
    <l-map
      :useGlobalLeaflet="false"
      :crs="crs"
      :minZoom="minZoom"
      :maxZoom="maxZoom"
      :maxBounds="maxBounds"
      :maxBoundsViscosity="maxBoundsViscosity"
      :center="center"
      :zoom="zoom"
    >
      <l-image-overlay
        :url="imageUrl"
        :bounds="imageBounds"
      ></l-image-overlay>
      <l-marker v-for="marker in markers" :lat-lng="[marker.lat, marker.lng]">
        <l-tooltip>{{ marker.name + ", " + marker.type.region }}</l-tooltip>
        <l-icon :icon-url="marker.type.url" :icon-size="marker.type.size"></l-icon>
      </l-marker>
    </l-map>
  </div>
</template>

<script lang="ts" setup>
import "leaflet/dist/leaflet.css";
import {ref, onBeforeMount, onMounted} from 'vue';
import { LIcon, LImageOverlay, LMap, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";
import { CRS } from 'leaflet';
import axios from "axios";

const crs = CRS.Simple;
const minZoom = 0;
const maxZoom = 3;
const center = ref([344.83, 344.83]);
const zoom = ref(2);
const maxBounds = ref([[0, 0], [689.66, 689.66]]);
const maxBoundsViscosity = 1.0;
const imageUrl = 'src/assets/map.png';
const imageBounds = ref([[0, 0], [689.66, 689.66]]);

interface Marker {
  name: string
  type: MarkerType
  lat: number
  lng: number
}
interface MarkerType {
  name: string
  region: string
  size: number[]
  url: string
}
interface Region {
  name: string
}

const markers = ref<Marker[]>([])

// const markers = ref<Marker[]>([
//   {
//     name: "Dünsberg",
//     type: {
//       name: "Dorf",
//       region: "Thaugrien",
//       size: [40, 40],
//       url: './src/assets/markers/marker_village_thaugrien.png'
//     },
//     lat: 344,
//     lng: 344
//   }
// ])

const fetchMarkers = async () => {
  try {
    const response = await fetch('http://localhost:1337/markers')
    const data = await response.json()
    markers.value = data.data
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

const putMarkers = async (marker: Marker) => {
  const markerData = {

  }

  try {
    const res = await axios.post('http://localhost:1337/save-order', markerData)
    alert(res)
  } catch (err) {
    console.error('Error: ', err)
  }

  // User Feedback
}

onMounted(fetchMarkers)
</script>

<style scoped>
.map-container {
  height: 100vh;
  width: 100%;
}
</style>

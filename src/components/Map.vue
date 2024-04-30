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
import { ref, onBeforeMount } from 'vue';
import { LIcon, LImageOverlay, LMap, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";
import { CRS } from 'leaflet';

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
interface MarkerPosition {
  lat: number
  lng: number
}

const markers = ref<Marker[]>([
  {
    name: "Dünsberg",
    type: {
      name: "Dorf",
      region: "Thaugrien",
      size: [40, 40],
      url: './src/assets/markers/marker_village_thaugrien.png'
    },
    lat: 344,
    lng: 344
  }
])

const crs = CRS.Simple;
const minZoom = 0;
const maxZoom = 3;
const center = ref([344.83, 344.83]);
const zoom = ref(2);
const maxBounds = ref([[0, 0], [689.66, 689.66]]);
const maxBoundsViscosity = 1.0;
const imageUrl = 'src/assets/map.png';
const imageBounds = ref([[0, 0], [689.66, 689.66]]);

</script>

<style scoped>
.map-container {
  height: 100vh;
  width: 100%;
}
</style>

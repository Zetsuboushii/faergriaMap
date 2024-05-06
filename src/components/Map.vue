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
      @click="addMarker"
    >
      <l-image-overlay
        :url="imageUrl"
        :bounds="imageBounds"
      ></l-image-overlay>
      <l-marker v-for="marker in markers" :lat-lng="[marker.m_lat, marker.m_lng]">
        <l-tooltip>{{ marker.m_name }}</l-tooltip>
        <l-icon
          :icon-url="'src/assets/markers/marker_' + marker.mt_url + '_' + marker.r_name + '.png'"
          :icon-size="marker.mt_size"></l-icon>
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
  fk_m_type: number;
  fk_mt_region: string;
  m_id: number;
  m_lat: number;
  m_lng: number;
  m_name: string;
  mt_id: number;
  mt_name: string;
  mt_size: number;
  mt_url: string;
  r_id: string;
  r_name: string;
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
    markers.value = data.data.map((marker: Marker) => ({
      fk_m_type: marker.fk_m_type,
      fk_mt_region: marker.fk_mt_region,
      m_id: marker.m_id,
      m_lat: marker.m_lat,
      m_lng: marker.m_lng,
      m_name: marker.m_name,
      mt_id: marker.mt_id,
      mt_name: marker.mt_name,
      mt_size: marker.mt_size,
      mt_url: marker.mt_url,
      r_id: marker.r_id,
      r_name: marker.r_name
    }))
    console.log(markers.value)
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

const addMarker = (event) => {
  const latLng = event.latlng
  markers.value.push({
    fk_m_type: 2,
    fk_mt_region: "faergria",
    m_id: -1,
    m_lat: latLng.lat,
    m_lng: latLng.lng,
    m_name: "New Marker",
    mt_id: 2,
    mt_name: "Dorf",
    mt_size: 40,
    mt_url: "poi",
    r_id: "faergria",
    r_name: "Faergria"
  })

  putMarker(latLng.lat, latLng.lng)
}

const putMarker = async (lat: number, lng: number) => {
  const markerData = {
    m_name: "New Marker",
    fk_m_type: 2,
    m_lat: lat,
    m_lng: lng
  }

  try {
    const res = await axios.post('http://localhost:1337/put-marker', markerData)
  } catch (err) {
    console.error('Error: ', err)
  }
}

onMounted(fetchMarkers)
</script>

<style scoped>
.map-container {
  height: 100vh;
  width: 100%;
}
</style>

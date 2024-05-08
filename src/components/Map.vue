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
      <l-marker
        v-for="marker in markers.concat(selectedMarker ? [selectedMarker] : [])"
        :key="marker.m_id"
        :lat-lng="[marker.m_lat, marker.m_lng]"
        @click="editMarker(marker)"
      >
        <l-tooltip>{{ marker.m_name }}</l-tooltip>
        <l-icon
          :icon-url="'src/assets/markers/marker_' + marker.mt_url + '_' + marker.r_name + '.png'"
          :icon-size="[marker.mt_size, marker.mt_size]"
        ></l-icon>
      </l-marker>
    </l-map>
  </div>
  <v-card v-if="selectedMarker && drawerOpened" class="drawer">
    <v-card-title class="headline">Marker Info</v-card-title>
    <v-card-text>
      <v-text-field label="Name" v-model="selectedMarker.m_name"></v-text-field>
      <v-row class="icon-grid">
        <v-col
          v-for="marker in markerTypes"
          :key="marker.mt_id"
          class="d-flex child-flex"
          cols="4"
        >
          <v-img
            :src="'src/assets/markers/marker_' + marker.mt_url + '_' + marker.fk_mt_region + '.png'"
            aspect-ratio="1"
            cover
            @click="selectedMarker.fk_m_type = marker.mt_id"
          >
            <template v-slot:placeholder>
              <v-row
                align="center"
                class="fill-height ma-0"
                justify="center"
              >
                <v-progress-circular
                  color="grey-lighten-5"
                  indeterminate
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="markerAdded" color="primary" @click="updateMarker(selectedMarker)">Update</v-btn>
      <v-btn v-if="markerAdded" @click="selectedMarker && deleteMarker(selectedMarker)">Delete</v-btn>
      <v-btn v-if="!markerAdded" @click="putMarker(selectedMarker.m_lat, selectedMarker.m_lng)">Add Marker</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import "leaflet/dist/leaflet.css";
import {onMounted, ref} from 'vue';
import {LIcon, LImageOverlay, LMap, LMarker, LTooltip} from "@vue-leaflet/vue-leaflet";
import {CRS} from 'leaflet';
import axios from "axios";

const crs = CRS.Simple;
const minZoom = 0;
const maxZoom = 4;
const center = ref([344.83, 344.83]);
const zoom = ref(2);
const maxBounds = ref([[0, 0], [689.66, 689.66]]);
const maxBoundsViscosity = 1.0;
const imageUrl = 'src/assets/map_iconless.png';
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

interface MarkerType {
  mt_id: number
  mt_name: string
  mt_url: string
  fk_mt_region: string
  mt_size: number
}

const markers = ref<Marker[]>([])
const markerTypes = ref<MarkerType[]>([])
const markerCeiling = ref()
const selectedMarker = ref<Marker>()

const drawerOpened = ref<boolean>(false)
const markerAdded = ref<boolean>(true)

const getDistance = (xA: number, yA: number, xB: number, yB: number) => {
  return Math.sqrt(Math.pow((xB - xA), 2) + Math.pow((yB - yA), 2))
}

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
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

const fetchMarkerTypes = async () => {
  try {
    const response = await fetch('http://localhost:1337/marker-types')
    const data = await response.json()
    markerTypes.value = data.data.map((markerType: MarkerType) => ({
      mt_id: markerType.mt_id,
      mt_name: markerType.mt_name,
      mt_url: markerType.mt_url,
      fk_mt_region: markerType.fk_mt_region,
      mt_size: markerType.mt_size
    }))
    markerTypes.value.sort((a, b) => a.mt_name.localeCompare(b.mt_name))
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

const fetchMarkerCeiling = async () => {
  try {
    const response = await fetch('http://localhost:1337/marker-ceiling')
    const data = await response.json()
    markerCeiling.value = data.data
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

const addMarker = (event) => {
  const latLng = event.latlng
  selectedMarker.value = {
    fk_m_type: 2,
    fk_mt_region: "faergria",
    m_id: markerCeiling.value.seq + 1,
    m_lat: latLng.lat,
    m_lng: latLng.lng,
    m_name: "New Marker",
    mt_id: 2,
    mt_name: "Dorf",
    mt_size: 40,
    mt_url: "poi",
    r_id: "faergria",
    r_name: "Faergria"
  }
  drawerOpened.value = true
  markerAdded.value = false
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
    markerAdded.value = true
  } catch (err) {
    console.error('Error: ', err)
  }

  await fetchMarkerCeiling()
  await fetchMarkers()
}

const deleteMarker = async (marker: Marker) => {
  const m_id = marker.m_id
  try {
    const res = await axios.post('http://localhost:1337/delete-marker', {m_id})
    selectedMarker.value = undefined
    drawerOpened.value = false
  } catch (err) {
    console.error('Error: ', err)
  }
  await fetchMarkerCeiling()
  await fetchMarkers()
}

const editMarker = (marker: Marker) => {
  selectedMarker.value = marker
  drawerOpened.value = true
  fetchMarkerCeiling()
}

const updateMarker = async (marker: Marker) => {
  try {
    const res = await axios.post('http://localhost:1337/update-marker', marker)
  } catch (err) {
    console.error('Error: ', err)
  }
  await fetchMarkerCeiling()
  await fetchMarkers()
}

onMounted(fetchMarkers)
onMounted(fetchMarkerTypes)
onMounted(fetchMarkerCeiling)
</script>

<style scoped>
.map-container {
  height: 100vh;
  width: 100%;
  z-index: 1;
}

.leaflet-container {
  z-index: 1;
}

.drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: 10%;
  min-width: 300px;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
}

.icon-grid {
  height: 50vh;
  overflow-y: scroll;
}
</style>

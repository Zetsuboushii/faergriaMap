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
      @keyup.space="console.log('knechto')"
    >
      <l-image-overlay
        :url="imageUrl"
        :bounds="imageBounds"
      ></l-image-overlay>
      <div v-if="showPolygons" v-for="territory in territories" :key="territory.t_id">
        <l-polygon :lat-lngs="territory.t_coords.map(coord => [coord.c_lat, coord.c_lng])"
                   :options="{ color: regionColors[territory.fk_t_region] }"></l-polygon>
      </div>
      <l-marker
        v-for="marker in markers.concat(selectedMarker ? [selectedMarker] : [])"
        :key="marker.m_id"
        :lat-lng="[marker.m_lat, marker.m_lng]"
        @click="editMarker(marker)"
        @contextmenu="handleMarkerContextMenu($event, marker)"
      >
        <l-tooltip>{{ marker.m_name }}</l-tooltip>
        <l-icon
          :icon-url="'src/assets/markers/marker_' + marker.mt_url + '_' + marker.fk_mt_region + '.png'"
          :icon-size="[marker.mt_size, marker.mt_size]"
        />
      </l-marker>
    </l-map>
  </div>
  <v-card v-if="selectedMarker && drawerOpened" class="drawer">
    <v-icon icon="mdi-close" @click="closeMarker" class="close-btn"></v-icon>
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
  <div v-if="showAlert && selectedMarker" class="alert-overlay">
    <v-alert
      border="start"
      border-color="deep-purple accent-4"
      elevation="2"
    >
      <v-icon icon="mdi-close" @click="showAlert = false" class="close-btn"></v-icon>
      Distance: {{ distance.toFixed(2) }}km
    </v-alert>
  </div>
</template>

<script lang="ts" setup>
import "leaflet/dist/leaflet.css";
import {onMounted, ref} from 'vue';
import {LIcon, LImageOverlay, LMap, LMarker, LPolygon, LTooltip} from "@vue-leaflet/vue-leaflet";
import axios from "axios";
import {
  API_URL,
  center,
  crs,
  imageBounds,
  imageUrl,
  Marker,
  MarkerType,
  maxBounds,
  maxBoundsViscosity,
  maxZoom,
  minZoom,
  regionColors,
  Territory,
  TerritoryCoord,
  zoom
} from "@/lib/api/mapData";

const markers = ref<Marker[]>([])
const markerTypes = ref<MarkerType[]>([])
const markerCeiling = ref()
const territories = ref<Territory[]>([])

const selectedMarker = ref<Marker>()
const drawerOpened = ref<boolean>(false)
const markerAdded = ref<boolean>(true)
const distance = ref<number>(0)
const showAlert = ref<boolean>(false)
const showPolygons = ref<boolean>(false)

const getDistance = (a: Marker, b: Marker) => {
  return Math.sqrt(Math.pow((b.m_lat - a.m_lat), 2) + Math.pow((b.m_lng - a.m_lng), 2))
}

const addMarker = (event: any) => {
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

const editMarker = (marker: Marker) => {
  selectedMarker.value = marker
  drawerOpened.value = true
  markerAdded.value = true
  getMarkerCeiling()
}

const closeMarker = () => {
  drawerOpened.value = false
  markerAdded.value = true
  selectedMarker.value = undefined
}

const handleMarkerContextMenu = (event: any, marker: Marker) => {
  if (selectedMarker && selectedMarker.value != undefined) {
    showAlert.value = true
    distance.value = getDistance(selectedMarker.value, marker)
  }
}

/*
  Database queries
 */

const getMarkers = async () => {
  try {
    const response = await fetch(API_URL + '/markers')
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

const getMarkerTypes = async () => {
  try {
    const response = await fetch(API_URL + '/marker-types')
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

const getMarkerCeiling = async () => {
  try {
    const response = await fetch(API_URL + '/marker-ceiling')
    const data = await response.json()
    markerCeiling.value = data.data
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

const getTerritories = async () => {
  try {
    const response = await fetch(API_URL + '/territories')
    const data = await response.json()
    for (const territory of data.data) {
      const coords = await getTerritoryCoords(territory.t_id)
      territories.value.push({
        t_id: territory.t_id,
        t_name: territory.t_name,
        fk_t_region: territory.fk_t_region,
        t_coords: coords
      })
    }
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

const getTerritoryCoords = async (t_id: number) => {
  try {
    const response = await fetch(API_URL + '/territory-coords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({t_id: t_id})
    })
    const data = await response.json()
    return data.data.map((coord: TerritoryCoord) => ({
      c_lat: coord.c_lat,
      c_lng: coord.c_lng
    }))
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

const putMarker = async (lat: number, lng: number) => {
  const markerData = {
    m_name: "New Marker",
    fk_m_type: 2,
    m_lat: lat,
    m_lng: lng
  }

  try {
    const res = await axios.post(API_URL + '/put-marker', markerData)
    markerAdded.value = true
  } catch (err) {
    console.error('Error: ', err)
  }

  await getMarkerCeiling()
  await getMarkers()
}

const deleteMarker = async (marker: Marker) => {
  const m_id = marker.m_id
  try {
    const res = await axios.post(API_URL + '/delete-marker', {m_id})
    selectedMarker.value = undefined
    drawerOpened.value = false
  } catch (err) {
    console.error('Error: ', err)
  }
  await getMarkerCeiling()
  await getMarkers()
}

const updateMarker = async (marker: Marker) => {
  try {
    const res = await axios.post(API_URL + '/update-marker', marker)
    selectedMarker.value = marker
    markerAdded.value = true
  } catch (err) {
    console.error('Error: ', err)
  }
  await getMarkerCeiling()
  await getMarkers()
}

onMounted(() => {
  getMarkers()
  getMarkerTypes()
  getMarkerCeiling()
  getTerritories()
})
</script>

<style scoped>
.map-container {
  height: 100vh;
  width: 100%;
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
  z-index: 9999;
}

.icon-grid {
  height: 50vh;
  overflow-y: scroll;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

.alert-overlay {
  position: fixed;
  bottom: 0;
  left: 20px;
  width: 300px;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
</style>

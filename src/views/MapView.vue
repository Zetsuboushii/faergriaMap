<template>
  <Map/>
  <MarkerInfoDrawer/>
  <OptionsOverlay/>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue'
import {activeGroup, getMarkerCeiling, getMarkers, getMarkerTypes, getTerritories} from "@/lib/api/mapData"
import MarkerInfoDrawer from "@/components/MarkerInfoDrawer.vue"
import Map from "@/components/map/Map.vue";
import OptionsOverlay from "@/components/OptionsOverlay.vue";

onMounted(() => {
  getMarkerTypes()
  getTerritories()
  activeGroup.value.g_code = localStorage.groupCode
  setInterval(() => {
    getMarkers()
    getMarkerCeiling()
  }, 500)
})
</script>

<style scoped>
@import "src/styles/main.css";
</style>

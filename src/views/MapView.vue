<template>
  <RegionHeader v-if="currentRegion && territoriesShow"/>
  <Map/>
  <MarkerInfoDrawer/>
  <LegendCard v-if="currentChart?.c_id == 1" class="overlay-card"/>
  <OptionsCard class="overlay-card"/>
  <DistanceCard class="overlay-card" v-if="distance"/>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue'
import {
  currentChart,
  currentRegion,
  distance,
  getCharts,
  getMarkerCeiling,
  getMarkers,
  getMarkerTypes,
  getRegions,
  getTerritories,
  territoriesShow
} from "@/lib/api/mapData"
import MarkerInfoDrawer from "@/components/MarkerInfoDrawer.vue"
import Map from "@/components/map/Map.vue";
import RegionHeader from "@/components/RegionHeader.vue";
import OptionsCard from "@/components/OptionsCard.vue";
import LegendCard from "@/components/LegendCard.vue";
import DistanceCard from "@/components/DistanceCard.vue";

onMounted(() => {
  getCharts()
  getMarkerTypes()
  getTerritories()
  getRegions()
  setInterval(() => {
    getMarkers()
    getMarkerCeiling()
  }, 500)
})
</script>

<style scoped>
.overlay-card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
</style>

<template>
  <RegionHeader v-if="currentRegion && territoriesShow"/>
  <Map/>
  <MarkerInfoDrawer/>
  <LegendCard/>
  <OptionsCard/>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue'
import {
  activeGroup,
  currentRegion,
  getMarkerCeiling,
  getMarkers,
  getMarkerTypes, getRegions,
  getTerritories, territoriesShow
} from "@/lib/api/mapData"
import MarkerInfoDrawer from "@/components/MarkerInfoDrawer.vue"
import Map from "@/components/map/Map.vue";
import RegionHeader from "@/components/RegionHeader.vue";
import OptionsCard from "@/components/OptionsCard.vue";
import LegendCard from "@/components/LegendCard.vue";

onMounted(() => {
  getMarkerTypes()
  getTerritories()
  getRegions()
  activeGroup.value = localStorage.groupCode
  setInterval(() => {
    getMarkers()
    getMarkerCeiling()
  }, 500)
})
</script>

<template>
  <div v-for="territory in territories" :key="territory.t_id">
    <!-- TODO -->
    <l-polygon
      v-if="territoriesShow"
      :lat-lngs="territory.t_coords.map(coord => [coord.c_lat, coord.c_lng])"
      :options="{
            color: regionColors[territory.fk_t_region],
            opacity: 1,
            fillOpacity: 0.2
          }"
      @mouseover="currentRegion = territory.t_name"
    ></l-polygon>
    <l-polygon
      v-if="!territoriesShow"
      :lat-lngs="territory.t_coords.map(coord => [coord.c_lat, coord.c_lng])"
      :options="{
            color: regionColors[territory.fk_t_region],
            opacity: 0,
            fillOpacity: 0
          }"
      @mouseover="currentRegion = territory.t_name"
    ></l-polygon>
  </div>
</template>

<script setup lang="ts">
import {currentRegion, regionColors, territories, territoriesShow} from "@/lib/api/mapData"
import {LPolygon} from "@vue-leaflet/vue-leaflet"
</script>

<style scoped>
@import "src/styles/main.css";
</style>

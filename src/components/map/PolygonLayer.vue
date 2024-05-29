<template>
  <div v-for="territory in territories" :key="territory.t_id">
    <l-polygon
      :lat-lngs="territory.t_coords.map((coord: any) => [coord.c_lat, coord.c_lng])"
      :options="{
            color: regionColors[territory.r_id],
            opacity: poly.opacity[Number(territoriesShow)],
            fillOpacity: poly.fillOpacity[Number(territoriesShow)]
          }"
      @mouseover="handlePolygonMouseOver(territory)"
      :visible="territoriesShow"
    >
    </l-polygon>
  </div>
</template>

<script setup lang="ts">
import {poly, regionColors, territories, territoriesShow} from "@/lib/api/mapData"
import {LPolygon} from "@vue-leaflet/vue-leaflet"
import {handlePolygonMouseOver} from "@/lib/api/eventHandler";
</script>

<style scoped>
.knecht {
  visibility: hidden;
}
</style>

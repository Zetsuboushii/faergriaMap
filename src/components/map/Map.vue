<template>
  <div class="map-container">
    <l-map v-if="currentChart !== undefined"
      ref="mapRef"
      :useGlobalLeaflet="false"
      :crs="currentChart.c_map.crs"
      :minZoom="zoom.minZoom"
      :maxZoom="zoom.maxZoom"
      :zoom="zoom.zoom"
      :maxBounds="currentChart.c_bounds.maxBounds"
      :maxBoundsViscosity="currentChart.c_bounds.maxBoundsViscosity"
      :center="currentChart.c_map.center"
      @click="handleMapClick"
      @keydown="handleKeyDown"
    >
      <l-image-overlay
        :url="currentChart.c_image.imageUrl"
        :bounds="currentChart.c_image.imageBounds"
      ></l-image-overlay>
      <PolygonLayer/>
      <PolylineLayer v-if="distance"/>
      <MarkerLayer/>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import {currentChart, distance, zoom} from "@/lib/api/mapData";
import {handleKeyDown, handleMapClick} from "@/lib/api/eventHandler";
import {LImageOverlay, LMap} from "@vue-leaflet/vue-leaflet";
import PolygonLayer from "@/components/map/PolygonLayer.vue";
import MarkerLayer from "@/components/map/MarkerLayer.vue";
import PolylineLayer from "@/components/map/PolylineLayer.vue";
</script>

<style scoped>
@import "leaflet/dist/leaflet.css";

.map-container {
  height: 100vh;
  width: 100%;
  z-index: 1;
}
</style>

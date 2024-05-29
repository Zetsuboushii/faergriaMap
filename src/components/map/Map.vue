<template>
  <div class="map-container">
    <l-map
      ref="mapRef"
      :useGlobalLeaflet="false"
      :crs="map.crs"
      :minZoom="zoom.minZoom"
      :maxZoom="zoom.maxZoom"
      :zoom="zoom.zoom"
      :maxBounds="bounds.maxBounds"
      :maxBoundsViscosity="bounds.maxBoundsViscosity"
      :center="map.center"
      @click="handleMapClick"
      @keydown="handleKeyDown"
    >
      <l-image-overlay
        :url="image.imageUrl"
        :bounds="image.imageBounds"
      ></l-image-overlay>
      <PolygonLayer/>
      <PolylineLayer v-if="distance"/>
      <MarkerLayer/>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import {bounds, distance, image, map, zoom} from "@/lib/api/mapData";
import {handleKeyDown, handleMapClick} from "@/lib/api/eventHandler";
import { LImageOverlay, LMap } from "@vue-leaflet/vue-leaflet";
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

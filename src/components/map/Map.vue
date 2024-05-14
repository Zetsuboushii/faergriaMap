<template>
  <div class="map-container">
    <RegionHeader/>
    <l-map
      :useGlobalLeaflet="false"
      :crs="crs"
      :minZoom="minZoom"
      :maxZoom="maxZoom"
      :maxBounds="maxBounds"
      :maxBoundsViscosity="maxBoundsViscosity"
      :center="center"
      :zoom="zoom"
      @click="isMoveMode ? moveMarker($event) : addMarker"
    >
      <l-image-overlay
        :url="imageUrl"
        :bounds="imageBounds"
      ></l-image-overlay>
      <PolygonLayer/>
      <MarkerLayer/>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import {
  center,
  crs,
  imageBounds,
  imageUrl,
  isMoveMode,
  maxBounds,
  maxBoundsViscosity,
  maxZoom,
  minZoom,
  zoom
} from "@/lib/api/mapData";
import {addMarker, moveMarker} from "@/lib/api/markerHandler";
import RegionHeader from "@/components/RegionHeader.vue";
import {LImageOverlay, LMap} from "@vue-leaflet/vue-leaflet";
import PolygonLayer from "@/components/map/PolygonLayer.vue";
import MarkerLayer from "@/components/map/MarkerLayer.vue";
</script>

<style scoped>
@import "leaflet/dist/leaflet.css";
@import "src/styles/main.css";
</style>

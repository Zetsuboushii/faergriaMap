<template>
  <div class="map-container">
    <l-map
      :useGlobalLeaflet="false"
      :crs="map.crs"
      :minZoom="zoom.minZoom"
      :maxZoom="zoom.maxZoom"
      :zoom="zoom.zoom"
      :maxBounds="bounds.maxBounds"
      :maxBoundsViscosity="bounds.maxBoundsViscosity"
      :center="map.center"
      @click="handleMapClick($event)"
    >
      <l-image-overlay
        :url="image.imageUrl"
        :bounds="image.imageBounds"
      ></l-image-overlay>
      <PolygonLayer/>
      <l-polyline
        v-if="distance > 0"
        :lat-lngs="getPolylinePoints"
        :color="'red'"
      ></l-polyline>
      <MarkerLayer/>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import {bounds, distance, image, map, zoom} from "@/lib/api/mapData";
import {getPolylinePoints, handleMapClick} from "@/lib/api/markerHandler";
import RegionHeader from "@/components/RegionHeader.vue";
import {LImageOverlay, LMap, LPolyline} from "@vue-leaflet/vue-leaflet";
import PolygonLayer from "@/components/map/PolygonLayer.vue";
import MarkerLayer from "@/components/map/MarkerLayer.vue";
</script>

<style scoped>
@import "leaflet/dist/leaflet.css";
@import "@/styles/main.css";
</style>

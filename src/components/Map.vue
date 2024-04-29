<template>
  <div style="height:600px; width:800px">
    <l-map
      :useGlobalLeaflet="false"
      :crs="crs"
      :minZoom="minZoom"
      :maxZoom="maxZoom"
      :maxBounds="maxBounds"
      :maxBoundsViscosity="maxBoundsViscosity"
      :center="center"
      :zoom="zoom"
    >
      <l-image-overlay
        :url="imageUrl"
        :bounds="imageBounds"
      ></l-image-overlay>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css"
import {LImageOverlay, LMap} from "@vue-leaflet/vue-leaflet";
import {CRS} from "leaflet";

export default {
  components: {
    LMap,
    LImageOverlay
  },
  data() {
    return {
      crs: CRS.Simple,
      minZoom: 2,
      maxZoom: 3,
      center: [344.83, 344.83],
      zoom: 2,
      maxBounds: [[0, 0], [689.66, 689.66]],
      maxBoundsViscosity: 1.0,
      imageUrl: 'src/assets/map.png',
      imageBounds: [[0, 0], [689.66, 689.66]],
    };
  },
  async beforeMount() {
    this.mapIsReady = true;
  },
};
</script>

<style scoped>

</style>

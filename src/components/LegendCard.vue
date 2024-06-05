<template>
  <v-card class="color-legend">
    <v-card-title class="color-legend-title">Legend</v-card-title>
    <v-list dense class="color-legend-list">
      <v-list-item v-for="region in regions.filter((r) => r.r_id != 2 && r.r_id != 11)" :key="region.r_id" class="legend-item">
        <div class="region-color-box" :style="{ backgroundColor: regionColors[region.r_id] }"></div>
        <span class="region-label">{{ region.r_name }}</span>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import {regionColors, regions} from "@/lib/api/mapData";
</script>

<style scoped>
.color-legend {
  position: fixed;
  left: 10px;
  top: 10px;
  max-width: 200px;
  z-index: 1001;
  background: rgba( 255, 255, 255, 0.4 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}

.color-legend-title {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #ddd;
}

.color-legend-list {
  height: 400px;
  overflow-y: scroll;
  background: rgba( 255, 255, 255, 0.4 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
}

.legend-item {
  display: flow;
  margin-bottom: 8px;
}

.region-color-box {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border: 1px solid #000;
}

.region-label {
  font-size: 14px;
}
</style>

<template>
  <v-card class="color-legend">
    <v-card-title class="color-legend-title">Legend</v-card-title>
    <v-list dense>
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
  height: 500px;
  z-index: 1001;
  overflow-y: scroll;
}

.color-legend-title {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  border-bottom: 1px solid #ddd;
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

<template>
  <v-card class="color-legend">
    <v-list dense>
      <v-list-item v-for="region in regions" :key="region.r_id" class="legend-item">
        <div class="color-box" :style="{ backgroundColor: regionColors[region.r_id] }"></div>
        <span class="label">{{ region.r_name }}</span>
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
  left: 0;
  top: 0;
  padding: 5px;
  max-width: 200px;
  z-index: 1001;
}

.legend-item {
  display: flow;
  margin-bottom: 8px;
}

.color-box {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border: 1px solid #000;
}

.label {
  font-size: 14px;
}
</style>

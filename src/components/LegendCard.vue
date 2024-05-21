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
@import "src/styles/main.css";
</style>

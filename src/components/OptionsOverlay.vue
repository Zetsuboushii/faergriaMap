<template>
  <v-card
    border="start"
    border-color="deep-purple accent-4"
    elevation="2"
    class="map-option-overlay"
  >
    <v-text-field
      label="Group Code"
      v-model="activeGroup.g_code"
    ></v-text-field>
    <v-checkbox
      v-model="territoriesShow"
      label="Show Regions"
      class="regionChecker"
    ></v-checkbox>
    <div v-if="selectedMarker" class="distance">
      Distance: {{ distance.toFixed(2) }}km
    </div>
  </v-card>
</template>

<script setup lang="ts">
import {activeGroup, distance, selectedMarker, territoriesShow} from "@/lib/api/mapData";
</script>

<style scoped>
@import "src/styles/main.css";
</style>

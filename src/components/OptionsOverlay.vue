<template>
  <v-card
    border="start"
    border-color="deep-purple accent-4"
    elevation="2"
    class="map-option-overlay"
  >
    <v-row dense align="center">
      <v-col cols="auto">
        <v-checkbox
          v-model="territoriesShow"
          label="Show Regions"
          class="regionChecker"
        ></v-checkbox>
      </v-col>
      <v-col cols="auto" class="text-right">
        <div v-if="selectedMarker" class="distance">
          Distance: {{ distance.toFixed(2) }}km
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import {distance, selectedMarker, territoriesShow} from "@/lib/api/mapData";
</script>

<style scoped>
@import "src/styles/main.css";
</style>

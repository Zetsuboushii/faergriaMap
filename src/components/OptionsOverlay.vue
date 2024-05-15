<template>

  <v-card
    border="start"
    border-color="deep-purple accent-4"
    elevation="2"
    class="map-option-overlay d-flex flex-column"
    title="Options"
  >
    <v-icon icon="mdi-close" @click="closeMarker" class="close-btn"></v-icon>
    <v-text-field
      label="Group Code"
      v-model="activeGroup.g_code"
      @change="setGroupStorage"
    ></v-text-field>
    <v-checkbox
      v-model="territoriesShow"
      label="Show Regions"
      class="region-checker"
    ></v-checkbox>
  </v-card>
</template>

<script setup lang="ts">
import {activeGroup, setGroupStorage, territoriesShow} from "@/lib/api/mapData";
import {closeMarker} from "@/lib/api/markerHandler";
</script>

<style scoped>
@import "src/styles/main.css";
</style>

<template>
  <div class="region-header">
    <v-row class="fill-height" align="center">
      <v-col>
        <span class="region-header-text text-h4">{{ currentTerritory + " - " + currentRegion }}</span>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {currentRegion, currentTerritory} from "@/lib/api/mapData"
</script>

<style scoped>
@import "src/styles/main.css";
</style>

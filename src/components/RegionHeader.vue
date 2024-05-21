<template>
  <div class="region-header">
    <v-row class="fill-height" align="center">
      <v-col>
        <span class="region-header-text text-h4">{{ currentTerritory }}</span>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {currentRegion, currentTerritory, territoriesShow} from "@/lib/api/mapData"
import {watch} from "vue";
</script>

<style scoped>
.region-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  padding: 10px;
  text-align: center;
}

.region-header-text {
  font-weight: bold;
  font-family: serif;
  color: white;
  position: relative;
  text-decoration: underline;
  text-decoration-color: white;
  text-shadow: 1px 1px 2px black;
}
</style>

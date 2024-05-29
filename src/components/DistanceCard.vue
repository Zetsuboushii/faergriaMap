<template>
  <v-card class="fixed-bottom-center">
    <v-card-title>Distance</v-card-title>
    <v-card-text>
      {{ distance.toFixed(2) }}km
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">

import {distance} from "../lib/api/mapData";
</script>

<style scoped>
.fixed-bottom-center {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  z-index: 1002;
}
</style>

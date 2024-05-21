<template>
  <div class="map-option-wrapper" @mouseover="showOptions = true" @mouseleave="showOptions = false">
    <v-card
      elevation="2"
      class="map-option-card d-flex flex-column"
      title="Options"
    >
      <div v-if="showOptions">
        <v-text-field
          label="Group Code"
          v-model="activeGroup"
          @change="setGroupStorage"
        ></v-text-field>
        <v-checkbox
          v-model="territoriesShow"
          label="Show Regions"
          class="region-checker"
        ></v-checkbox>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import {activeGroup, setGroupStorage, showOptions, territoriesShow} from "@/lib/api/mapData";
</script>

<style>
@import "src/styles/main.css";
</style>

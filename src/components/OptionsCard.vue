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
.map-option-card {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 10px;
  bottom: 10px;
  padding: 5px;
  z-index: 1002;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  max-height: 60px;
  width: auto;
  background: rgba( 255, 255, 255, 0.4 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}

.map-option-wrapper {
  position: relative;
  max-height: 60px;
}

.map-option-wrapper:hover .map-option-card {
  max-height: 500px;
}
</style>

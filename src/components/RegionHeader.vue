<template>
  <div class="region-header">
    <v-row class="fill-height" align="center">
      <v-col>
        <img :src="regionSvg" alt="Region Header" class="region-header-svg" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {createRegionSvg} from "@/lib/api/regionHeaderGenerator";
import {currentTerritory} from "@/lib/api/mapData";

const regionSvg = ref(createRegionSvg(currentTerritory.value))

// Optionally, if currentTerritory is reactive and changes dynamically, use a watcher
watch(() => currentTerritory.value, (newTerritory) => {
  regionSvg.value = createRegionSvg(newTerritory);
});
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

.region-header-svg {
  display: block;
  margin: 0 auto;
}
</style>

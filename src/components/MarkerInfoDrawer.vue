<template>
  <v-card v-if="selectedMarker && drawerOpened" class="marker-info-drawer">
    <v-icon icon="mdi-close" @click="closeMarker" class="close-btn"></v-icon>
    <v-card-title class="headline">Marker Info</v-card-title>
    <v-card-text>
      <v-text-field
        label="Name"
        v-model="selectedMarker.m_name"
        @change="updateMarker(selectedMarker)"
      ></v-text-field>
      <v-row class="marker-icon-grid">
        <v-col
          v-for="type in markerTypes"
          :key="type.mt_id"
          class="d-flex child-flex"
          cols="4"
        >
          <v-img
            :src="'src/assets/markers/marker_' + type.mt_url + '_' + type.r_url + '.png'"
            aspect-ratio="1"
            cover
            @click="updateType(type); updateMarker(selectedMarker)"
          >
            <template v-slot:placeholder>
              <v-row
                align="center"
                class="fill-height ma-0"
                justify="center"
              >
                <v-progress-circular
                  color="grey-lighten-5"
                  indeterminate
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="markerAdded" @click="selectedMarker && deleteMarker(selectedMarker)">Delete</v-btn>
      <v-btn v-if="!markerAdded" @click="putMarker(selectedMarker)">Add Marker</v-btn>
      <v-btn v-if="markerAdded" @click="toggleMoveMode()">Move: {{isMoveMode}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import {
  deleteMarker,
  drawerOpened,
  isMoveMode,
  markerAdded,
  markerTypes,
  putMarker,
  selectedMarker,
  updateMarker
} from "@/lib/api/mapData"
import {closeMarker, toggleMoveMode, updateType} from "@/lib/api/markerHandler"
</script>

<style scoped>
.marker-info-drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: 10%;
  min-width: 300px;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.marker-icon-grid {
  height: 50vh;
  overflow-y: scroll;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>

<template>
  <v-card v-if="selectedMarker && drawerOpened && selectedMarker.m_editable == 1" class="marker-info-drawer">
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
            :src="'src/assets/markers/marker_' + type.mt_url + '_' + type.fk_mt_region + '.png'"
            aspect-ratio="1"
            cover
            @click="selectedMarker.m_type = type; updateMarker(selectedMarker)"
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
  drawerOpened, isMoveMode,
  markerAdded,
  markerTypes,
  putMarker,
  selectedMarker,
  updateMarker
} from "@/lib/api/mapData"
import {closeMarker, toggleMoveMode} from "@/lib/api/markerHandler"
</script>

<style scoped>
@import "src/styles/main.css";
</style>

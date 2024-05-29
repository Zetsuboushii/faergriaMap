<template>
  <l-marker
    v-for="marker in markers"
    :key="marker.m_id"
    :lat-lng="[marker.m_lat, marker.m_lng]"
    @click="editMarker(marker)"
    @contextmenu="handleMarkerContextMenu($event, marker)"
  >
    <l-tooltip>{{ marker.m_name }}</l-tooltip>
    <l-icon
      :icon-url="'src/assets/markers/marker_' + marker.m_type.mt_url + '_' + marker.r_url + '.png'"
      :icon-size="[marker.m_type.mt_size, marker.m_type.mt_size]"
    />
  </l-marker>
</template>

<script setup lang="ts">
import {markers} from "@/lib/api/mapData"
import {editMarker, handleMarkerContextMenu} from "@/lib/api/eventHandler"
import {LIcon, LMarker, LPopup, LTooltip} from "@vue-leaflet/vue-leaflet"
</script>

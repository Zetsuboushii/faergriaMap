<template>
  <l-polyline :lat-lngs="polyLineLatLngs" :color="'red'"></l-polyline>
</template>

<script setup lang="ts">
import {polyLineLatLngs} from "@/lib/api/mapData";
import { LPolyline } from '@vue-leaflet/vue-leaflet';
</script>

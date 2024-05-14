import {
  distance,
  drawerOpened,
  getMarkerCeiling, isMoveMode,
  Marker,
  markerAdded,
  markerCeiling,
  selectedMarker,
  showAlert, updateMarker
} from "@/lib/api/mapData"

export function addMarker(event: any) {
  const latLng = event.latlng
  selectedMarker.value = {
    fk_m_type: 2,
    fk_mt_region: "faergria",
    m_id: markerCeiling.value.seq + 1,
    m_lat: latLng.lat,
    m_lng: latLng.lng,
    m_name: "New Marker",
    r_id: "faergria",
    r_name: "Faergria",
    m_editable: 1,
    m_type: {
      mt_id: 2,
      mt_name: "Point of Interest",
      mt_url: "poi",
      fk_mt_region: "faergria",
      mt_size: 40
    }
  }
  drawerOpened.value = true
  markerAdded.value = false
  //putMarker(selectedMarker.value)
}

export function editMarker(marker: Marker) {
  selectedMarker.value = marker
  drawerOpened.value = true
  markerAdded.value = true
  getMarkerCeiling()
}

export function getDistance(a: Marker, b: Marker) {
  return Math.sqrt(Math.pow(b.m_lat - a.m_lat, 2) + Math.pow(b.m_lng - a.m_lng, 2))
}

export function handleMarkerContextMenu(event: any, marker: Marker) {
  if (selectedMarker && selectedMarker.value != undefined) {
    showAlert.value = true
    distance.value = getDistance(selectedMarker.value, marker)
  }
}

export function toggleMoveMode() {
  isMoveMode.value = !isMoveMode.value
}

export function moveMarker(event: any) {
  if (isMoveMode.value && selectedMarker.value) {
    console.log("knecht")
    const latLng = event.latlng
    selectedMarker.value.m_lat = latLng.lat
    selectedMarker.value.m_lng = latLng.lng
    updateMarker(selectedMarker.value)
  }
}

export function closeMarker() {
  drawerOpened.value = false
  markerAdded.value = true
  selectedMarker.value = undefined
}

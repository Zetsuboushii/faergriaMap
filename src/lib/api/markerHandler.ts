import {
  activeGroup, currentRegion, currentTerritory,
  destinationMarker,
  distance,
  drawerOpened,
  isMoveMode,
  Marker,
  markerAdded,
  markerCeiling,
  MarkerType,
  putMarker,
  selectedMarker,
  showAlert, Territory,
  updateMarker
} from "@/lib/api/mapData"
import {LatLngExpression} from "leaflet";

// Function to add a new marker to the map
export function addMarker(event: any) {
  if (activeGroup !== undefined) {
    // Extract the latitude and longitude from the event
    const latLng = event.latlng

    // Set the selected marker with initial properties
    selectedMarker.value = {
      fk_m_type: 2,
      m_id: markerCeiling.value.seq + 1, // Unique marker ID
      m_lat: latLng.lat, // Latitude from event
      m_lng: latLng.lng, // Longitude from event
      m_name: "New Marker", // Initial marker name
      r_url: "faergria", // Region ID
      r_name: "Faergria", // Region name
      fk_m_group: activeGroup.value.g_code, // Group ID
      m_type: {
        mt_id: 2, // Marker type ID
        mt_name: "Point of Interest", // Marker type name
        mt_url: "poi", // URL for marker type
        r_url: "faergria", // Region ID for marker type
        mt_size: 40 // Size of the marker
      }
    }

    // Open the marker drawer
    drawerOpened.value = true
    // Set the markerAdded flag to false indicating a new marker is being added
    markerAdded.value = false
    // Add the new marker to the database; Dev-only function
    // putMarker(selectedMarker.value)
  }
}

// Function to edit an existing marker
export function editMarker(marker: Marker) {
  if (activeGroup.value !== undefined && marker.fk_m_group === activeGroup.value.g_code) {
    // Set the selected marker to the marker being edited
    selectedMarker.value = marker
    // Open the marker drawer
    drawerOpened.value = true
    // Set the markerAdded flag to true indicating an existing marker is being edited
    markerAdded.value = true
  }
}

// Function to calculate the distance between two markers using the Pythagorean theorem
export function getDistance(a: Marker, b: Marker) {
  return Math.sqrt(Math.pow(b.m_lat - a.m_lat, 2) + Math.pow(b.m_lng - a.m_lng, 2))
}

// Function to handle the right-click context menu on a marker
export function handleMarkerContextMenu(event: any, marker: Marker) {
  // Check if there is a selected marker
  if (selectedMarker && selectedMarker.value != undefined) {
    // Show the alert for context menu
    showAlert.value = true
    // Calculate the distance between the selected marker and the clicked marker
    distance.value = getDistance(selectedMarker.value, marker)
    // Set destination marker
    destinationMarker.value = marker
  }
}

export function getPolylinePoints() {
  if (selectedMarker.value !== undefined && destinationMarker.value !== undefined) {
    return [
      [selectedMarker.value.m_lat, selectedMarker.value.m_lng] as LatLngExpression,
      [destinationMarker.value.m_lat, destinationMarker.value.m_lng] as LatLngExpression
    ]
  }
  return []
}

// Function to toggle the move mode
export function toggleMoveMode() {
  // Toggle the isMoveMode flag
  isMoveMode.value = !isMoveMode.value
}

// Function to move an existing marker to a new location
export function moveMarker(event: any) {
  // Check if move mode is enabled and there is a selected marker
  if (isMoveMode.value && selectedMarker.value) {
    // Extract the latitude and longitude from the event
    const latLng = event.latlng
    // Update the selected marker's latitude and longitude
    selectedMarker.value.m_lat = latLng.lat
    selectedMarker.value.m_lng = latLng.lng
    // Update the marker in the database
    updateMarker(selectedMarker.value)
  }
}

// Function to close the marker drawer and reset relevant states
export function closeMarker() {
  drawerOpened.value = false
  markerAdded.value = true
  selectedMarker.value = undefined
  isMoveMode.value = false
}

// Function to handle map click events
export function handleMapClick(event: any) {
  if (isMoveMode.value) {
    moveMarker(event)
  } else {
    addMarker(event)
  }
}

export function updateType(type: MarkerType) {
  if (selectedMarker.value !== undefined) {
    selectedMarker.value.m_type = type
  }
}

export function handlePolygonMouseOver(territory: Territory) {
  currentTerritory.value = territory.t_name
  currentRegion.value = territory.r_name
}

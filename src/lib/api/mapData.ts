import {CRS, LatLngBoundsExpression, LatLngExpression, PointExpression} from "leaflet"
import {ref} from "vue"
import axios from "axios"

// Set the API URL based on the environment (development or production)
export const API_URL = import.meta.env.DEV ? "http://localhost:1338" : ""

export const initialChartName = "Königreich Faergria"

//export const map= {
//  // Define the Coordinate Reference System (CRS) as Simple for Leaflet
//  crs: CRS.Simple,
//  // Define the initial center point of the map and bind it to a reactive reference
//  center: [0, 0] as PointExpression
//}

export const zoom = {
  // Define the initial zoom level of the map and bind it to a reactive reference
  zoom: 1,
  // Define the minimum and maximum zoom levels for the map
  minZoom: -1,
  maxZoom: 4
}

//export const bounds = {
//  // Define the bounds of the map and bind it to a reactive reference
//  maxBounds: [[0, 0], [0, 0]],
//  // Define the viscosity of the map bounds
//  maxBoundsViscosity: 1.0
//}
//
//export const image = {
//  // Define the URL of the image to be used as the map overlay
//  imageUrl: "src/assets/maps/faergria.png",
//  // Define the bounds of the image overlay and bind it to a reactive reference
//  imageBounds: bounds.maxBounds as LatLngBoundsExpression,
//}

export const poly = {
  opacity: [0, 1],
  fillOpacity: [0, 0.125]
}

// Define a color mapping for different regions
export const regionColors: { [key: number]: string } = {
  1: "#967bb6",
  3: "#dddd62",
  4: "#4bd2d8",
  5: "#ffffff",
  6: "#227f1c",
  7: "#d28030",
  8: "#ffd700",
  9: "#c62b2b",
  10: "#9b3e22"
}

export interface Chart {
  c_id: number,
  c_name: string,
  c_url: string,
  c_lat: number,
  c_lng: number,
  c_map: {
    crs: CRS,
    center: PointExpression
  },
  c_bounds: {
    maxBounds: [[number, number], [number, number]]
    maxBoundsViscosity: number
  },
  c_image: {
    imageUrl: string,
    imageBounds: LatLngBoundsExpression
  }
}

// Define interfaces for the data models
export interface Marker {
  fk_m_type: number
  m_id: number
  m_lat: number
  m_lng: number
  m_name: string
  r_url: string
  r_name: string
  fk_m_group: string
  m_type: MarkerType
  fk_m_chart: number
}

export interface MarkerType {
  mt_id: number
  mt_name: string
  mt_url: string
  r_url: string
  mt_size: number
}

export interface Territory {
  t_id: number
  t_name: string
  r_id: number
  r_name: string
  t_coords: TerritoryCoord[]
}

export interface TerritoryCoord {
  c_lat: number
  c_lng: number
}

export interface Region {
  r_id: number
  r_url: string
  r_name: string
}

// Create reactive arrays for storing markers, marker types, and territories
export const charts = ref<Chart[]>([])
export const markers = ref<Marker[]>([])
export const markerTypes = ref<MarkerType[]>([])
export const territories = ref<Territory[]>([])
export const groups = ref<string[]>([])
export const regions = ref<Region[]>([])

// Create reactive variables for dynamic values
export const currentChart = ref<Chart>()
export const selectedMarker = ref<Marker>()
export const destinationMarker = ref<Marker>()
export const currentTerritory = ref<string>()
export const distance = ref<number>(0)
export const markerCeiling = ref()
export const activeGroup = ref<string>("#00000")
export const currentRegion = ref<string>()
export const polyLineLatLngs = ref<LatLngExpression[]>([[100, 100], [200, 200]])
export const polyLineCenter = ref<LatLngExpression>()

// Create reactive flags for various states
export const drawerOpened = ref<boolean>(false)
export const markerAdded = ref<boolean>(true)
export const showAlert = ref<boolean>(false)
export const territoriesShow = ref<boolean>(true)
export const isMoveMode = ref<boolean>(false)
export const showOptions = ref<boolean>(false)

export async function changeChart(name: string) {
  currentChart.value = charts.value.find(chart => chart.c_name === name)
  console.log(currentChart.value)
  updateChartMeta(currentChart.value)
}

export function updateChartMeta(chart: Chart | undefined) {
  if (chart !== undefined) {
    chart.c_map = {
      crs: CRS.Simple,
      center: [chart.c_lat / 2, chart.c_lng / 2] as PointExpression
    }
    chart.c_bounds = {
      maxBounds: [[0, 0], [chart.c_lat, chart.c_lng]],
      maxBoundsViscosity: 1.0
    }
    chart.c_image = {
      imageUrl: "src/assets/maps/" + chart.c_url + ".png",
      imageBounds: chart.c_bounds.maxBounds as LatLngBoundsExpression,
    }
    console.log("changed")
  }
}

// Function to fetch markers from the API and update the markers array
export async function getMarkers() {
  try {
    const response = await fetch(API_URL + '/markers')
    const data = await response.json()
    markers.value = data.data.filter((marker: Marker) =>
      marker.fk_m_group === "#00000" || marker.fk_m_group === activeGroup.value
    ).map((marker: Marker) => ({
      m_id: marker.m_id,
      m_lat: marker.m_lat,
      m_lng: marker.m_lng,
      m_name: marker.m_name,
      r_url: marker.r_url,
      r_name: marker.r_name,
      fk_m_group: marker.fk_m_group,
      fk_m_chart: marker.fk_m_chart,
      m_type: markerTypes.value.find((type) => marker.fk_m_type === type.mt_id)
    }))
  } catch (error) {
    console.error("An error occurred: ", error)
  }
}

// Function to fetch marker types from the API and update the markerTypes array
export async function getCharts() {
  try {
    const response = await fetch(API_URL + '/charts')
    const data = await response.json()
    charts.value = data.data.map((chart: Chart) => ({
      c_id: chart.c_id,
      c_name: chart.c_name,
      c_url: chart.c_url,
      c_lat: chart.c_lat,
      c_lng: chart.c_lng,
    }))
    await changeChart(initialChartName)
  } catch (error) {
    console.error("An error occurred: ", error)
  }
}

// Function to fetch marker types from the API and update the markerTypes array
export async function getMarkerTypes() {
  try {
    const response = await fetch(API_URL + '/marker-types')
    const data = await response.json()
    markerTypes.value = data.data.map((markerType: MarkerType) => ({
      mt_id: markerType.mt_id,
      mt_name: markerType.mt_name,
      mt_url: markerType.mt_url,
      r_url: markerType.r_url,
      mt_size: markerType.mt_size
    }))
  } catch (error) {
    console.error("An error occurred: ", error)
  }
}

export async function getGroups() {
  try {
    const response = await fetch(API_URL + '/groups')
    const data = await response.json()
    groups.value = data.data
  } catch (error) {
    console.error("An error occurred: ", error)
  }
}

// Function to fetch the marker ceiling from the API and update the markerCeiling variable
export async function getMarkerCeiling() {
  try {
    const response = await fetch(API_URL + '/marker-ceiling')
    const data = await response.json()
    markerCeiling.value = data.data
  } catch (error) {
    console.error("An error occurred: ", error)
  }
}

// Function to fetch territories from the API and update the territories array
export async function getTerritories() {
  try {
    const response = await fetch(API_URL + '/territories')
    const data = await response.json()
    for (const territory of data.data) {
      const coords = await getTerritoryCoords(territory.t_id)
      territories.value.push({
        t_id: territory.t_id,
        t_name: territory.t_name,
        r_id: territory.r_id,
        r_name: territory.r_name,
        t_coords: coords
      })
    }
  } catch (error) {
    console.error("An error occurred: ", error)
  }
}

// Function to fetch the coordinates of a specific territory from the API
export async function getTerritoryCoords(t_id: number) {
  try {
    const response = await fetch(API_URL + '/territory-coords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({t_id: t_id})
    })
    const data = await response.json()
    return data.data.map((coord: TerritoryCoord) => ({
      c_lat: coord.c_lat,
      c_lng: coord.c_lng
    }))
  } catch (error) {
    console.error("An error occurred: ", error)
  }
}

export async function getRegions() {
  try {
    const response = await fetch(API_URL + '/regions')
    const data = await response.json()
    regions.value = data.data.map((region: Region) => ({
      r_id: region.r_id,
      r_url: region.r_url,
      r_name: region.r_name
    }))
  } catch (error) {
    console.error("An error occurred: ", error)
  }
}

// Function to add a new marker to the database via the API
export async function putMarker(marker: Marker) {
  const markerData = {
    m_name: marker.m_name,
    fk_m_type: marker.m_type.mt_id,
    m_lat: marker.m_lat,
    m_lng: marker.m_lng,
    fk_m_group: marker.fk_m_group,
    fk_m_chart: marker.fk_m_chart
  }

  try {
    const res = await axios.post(API_URL + '/put-marker', markerData)
    markerAdded.value = true
  } catch (err) {
    console.error('Error: ', err)
  }
}

// Function to delete a marker from the database via the API
export async function deleteMarker(marker: Marker) {
  const m_id = marker.m_id
  try {
    const res = await axios.post(API_URL + '/delete-marker', {m_id})
    selectedMarker.value = undefined
    drawerOpened.value = false
  } catch (err) {
    console.error('Error: ', err)
  }
}

// Function to update an existing marker in the database via the API
export async function updateMarker(marker: Marker) {
  try {
    const res = await axios.post(API_URL + '/update-marker', marker)
  } catch (err) {
    console.error('Error: ', err)
  }
}

export function setGroupStorage() {
  console.log(activeGroup.value)
  if (activeGroup.value !== undefined) {
    localStorage.groupCode = activeGroup.value
    console.log(localStorage.groupCode)
  }
}

import {CRS, LatLngBoundsExpression, PointExpression} from "leaflet"
import {ref} from "vue"
import axios from "axios"

export const API_URL = import.meta.env.DEV ? "http://localhost:1338" : ""
export const crs = CRS.Simple
export const minZoom = 0
export const maxZoom = 4
export const center = ref<PointExpression>([689.66, 689.66])
export const zoom = ref(1)
export const maxBounds = ref([[0, 0], [1379.32, 1379.32]])
export const maxBoundsViscosity = 1.0
export const imageUrl = 'src/assets/map_iconless.png'
export const imageBounds = ref<LatLngBoundsExpression>([[0, 0], [1379.32, 1379.32]])
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

export interface Marker {
  fk_m_type: number
  fk_mt_region: string
  m_id: number
  m_lat: number
  m_lng: number
  m_name: string
  r_id: string
  r_name: string
  m_editable: number,
  m_type: MarkerType
}

export interface MarkerType {
  mt_id: number
  mt_name: string
  mt_url: string
  fk_mt_region: string
  mt_size: number
}

export interface Territory {
  t_id: number
  t_name: string
  fk_t_region: number
  t_coords: TerritoryCoord[]
}

export interface TerritoryCoord {
  c_lat: number
  c_lng: number
}

// Arrays
export const markers = ref<Marker[]>([])
export const markerTypes = ref<MarkerType[]>([])
export const territories = ref<Territory[]>([])

// Dynamische Werte
export const selectedMarker = ref<Marker>()
export const currentRegion = ref<string>()
export const distance = ref<number>(0)
export const markerCeiling = ref()

// Flags
export const drawerOpened = ref<boolean>(false)
export const markerAdded = ref<boolean>(true)
export const showAlert = ref<boolean>(false)
export const territoriesShow = ref<boolean>(true)
export const isMoveMode = ref<boolean>(false)


/*

  Database queries

 */
export async function getMarkers() {
  try {
    const response = await fetch(API_URL + '/markers')
    const data = await response.json()
    markers.value = data.data.map((marker: Marker) => ({
      fk_mt_region: marker.fk_mt_region,
      m_id: marker.m_id,
      m_lat: marker.m_lat,
      m_lng: marker.m_lng,
      m_name: marker.m_name,
      r_id: marker.r_id,
      r_name: marker.r_name,
      m_editable: marker.m_editable,
      m_type: markerTypes.value.find((type) => marker.fk_m_type === type.mt_id)
    }))
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

export async function getMarkerTypes() {
  try {
    const response = await fetch(API_URL + '/marker-types')
    const data = await response.json()
    markerTypes.value = data.data.map((markerType: MarkerType) => ({
      mt_id: markerType.mt_id,
      mt_name: markerType.mt_name,
      mt_url: markerType.mt_url,
      fk_mt_region: markerType.fk_mt_region,
      mt_size: markerType.mt_size
    }))
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

export async function getMarkerCeiling() {
  try {
    const response = await fetch(API_URL + '/marker-ceiling')
    const data = await response.json()
    markerCeiling.value = data.data
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

export async function getTerritories() {
  try {
    const response = await fetch(API_URL + '/territories')
    const data = await response.json()
    for (const territory of data.data) {
      const coords = await getTerritoryCoords(territory.t_id)
      territories.value.push({
        t_id: territory.t_id,
        t_name: territory.t_name,
        fk_t_region: territory.fk_t_region,
        t_coords: coords
      })
    }
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

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
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

export async function putMarker(marker: Marker) {
  const markerData = {
    m_name: marker.m_name,
    fk_m_type: marker.m_type.mt_id,
    m_lat: marker.m_lat,
    m_lng: marker.m_lng,
    m_editable: marker.m_editable
  }

  try {
    const res = await axios.post(API_URL + '/put-marker', markerData)
    markerAdded.value = true
  } catch (err) {
    console.error('Error: ', err)
  }
}

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

export async function updateMarker(marker: Marker) {
  try {
    const res = await axios.post(API_URL + '/update-marker', marker)
  } catch (err) {
    console.error('Error: ', err)
  }
}

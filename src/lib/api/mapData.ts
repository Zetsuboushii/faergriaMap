import {CRS, LatLngBoundsExpression, PointExpression} from "leaflet"
import {ref} from "vue"

export const crs = CRS.Simple
export const minZoom = 0
export const maxZoom = 4
export const center = ref<PointExpression>([689.66, 689.66])
export const zoom = ref(1)
export const maxBounds = ref([[0, 0], [1379.32, 1379.32]])
export const maxBoundsViscosity = 1.0
export const imageUrl = 'src/assets/map_iconless.png'
export const imageBounds = ref<LatLngBoundsExpression>([[0, 0], [1379.32, 1379.32]])
export const API_URL = import.meta.env.DEV ? "http://localhost:1338" : ""
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

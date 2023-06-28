"use client"

import { Reducer, createContext, useReducer } from "react"
import mapboxgl, { Map } from "mapbox-gl"
import { IControl, Layer, Source } from "mapbox-gl"

export type MapState = {
  map: Map | null,
  loaded: Boolean,
  controls: IControl[]
}

export type MapDispatch = (arg1: MapAction) => void

type InitializeMapAction = {
  type: "Map.Initialize",
  map: Map
}

type RemoveMapAction = {
  type: "Map.Remove"
}

type LoadedMapAction = {
  type: "Map.Loaded",
}

type AddSourceMapAction = {
  type: "Map.AddSource",
  source: Source
}

type AddLayerMapAction = {
  type: "Map.AddLayer",
  source: Layer
}

type MapAction = InitializeMapAction | RemoveMapAction | AddSourceMapAction | AddLayerMapAction | LoadedMapAction

const reducer: (arg0: MapState, arg1: MapAction) => MapState = (state: MapState, action: MapAction) => {
  switch (action.type) {
    case "Map.Initialize":
      return {
        ...state,
        map: action.map
      }
    case "Map.Remove":
      return {
        ...state,
        map: null,
        loaded: false
      }
    case "Map.Loaded":
      return {
        ...state,
        loaded: true
      }
    default:
      return state
  }
}

const initialState: MapState = {
  map: null,
  loaded: false,
  controls: []
}

export const MapContext = createContext<[MapState, MapDispatch]>([initialState, () => {}])

export default function MapProvider({ children }: { children: React.ReactNode }) {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN as string || ""

  const [state, dispatch] = useReducer<Reducer<MapState, MapAction>>(reducer, initialState)

  return (
    <MapContext.Provider value={[state, dispatch]}>
      {children}
    </MapContext.Provider>
  )
}

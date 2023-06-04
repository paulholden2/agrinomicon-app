"use client"

import { useReducer, createContext, Reducer } from "react"
import mapboxgl from "mapbox-gl"
import { Control, Layer, Source } from "mapbox-gl"

type MapInstance = {
  map: mapboxgl.Map | null,
  loaded: Boolean
}

export type MapState = {
  instances: { [key: string]: MapInstance }
}

export type MapDispatch = (arg1: MapAction) => void

type InitializeMapAction = {
  type: "Map.Initialize",
  map: mapboxgl.Map,
  containerId: string
}

type LoadedMapAction = {
  type: "Map.Loaded",
  containerId: string
}

type RemoveMapAction = {
  type: "Map.Remove",
  containerId: string
}

type AddControlMapAction = {
  type: "Map.AddControl",
  control: Control
}

type AddSourceMapAction = {
  type: "Map.AddSource",
  source: Source
}

type AddLayerMapAction = {
  type: "Map.AddLayer",
  source: Layer
}

type MapAction = InitializeMapAction | AddControlMapAction | AddSourceMapAction | AddLayerMapAction | LoadedMapAction | RemoveMapAction

const reducer: (arg0: MapState, arg1: MapAction) => MapState = (state: MapState, action: MapAction) => {
  switch (action.type) {
    case "Map.Initialize":
      return {
        ...state,
        instances: {
          ...state.instances,
          [action.containerId]: {
            map: action.map,
            loaded: false
          }
        }
      }
    case "Map.Loaded": {
      const { containerId } = action
      return {
        ...state,
        instances: {
          ...state.instances,
          [containerId]: {
            ...state.instances[containerId],
            loaded: true
          }
        }
      }
    }
    case "Map.Remove": {
      const instances = { ...state.instances }
      delete instances[action.containerId]
      return {
        ...state,
        instances
      }
    }
    default:
      return state
  }
}

const initialState: MapState = {
  instances: {}
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

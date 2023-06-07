"use client"

import { useContext } from "react"
import { MapContext, MapState, MapDispatch } from "@/providers/MapProvider"

export default function useMap() {
  const [state, dispatch] = useContext<[MapState, MapDispatch]>(MapContext)

  return {
    map: state.map,
    loaded: state.loaded
  }
}

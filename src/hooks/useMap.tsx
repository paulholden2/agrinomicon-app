"use client"

import { useContext } from "react"
import mapboxgl from "mapbox-gl"
import { MapContext, MapState, MapDispatch } from "@/providers/MapProvider"

export default function useMap() {
  const [state, dispatch] = useContext<[MapState, MapDispatch]>(MapContext)

  const initialize = (opts: mapboxgl.MapboxOptions) => {
    if (state.map) return

    const camera = localStorage.getItem(`camera-${opts.container}`)
    const [lng, lat, zoom, bearing, pitch] = camera ? camera.split(",").map((s) => parseFloat(s)) : [-119.09, 35.26, 9, 0, 0]

    const map = new mapboxgl.Map({
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],
      zoom,
      bearing,
      pitch,
      ...opts
    })

    dispatch({
      type: "Map.Initialize",
      map
    })

    map.on("load", () => {
      setTimeout(() => dispatch({
        type: "Map.Loaded"
      }), 0)

      const listener = () => {
        const {lng, lat} = map.getCenter()
        const zoom = map.getZoom()
        const bearing = map.getBearing()
        const pitch = map.getPitch()
        const data = [lng, lat, zoom, bearing, pitch]
        const camera = data.map((n: number) => `${n.toFixed(3)}`).join(",")
        localStorage.setItem(`camera-${opts.container}`, camera)
      }

      map.on("move", listener)
      map.on("remove", () => {
        map.off("move", listener)
      })
    })
  }

  return {
    initialize
  }
}

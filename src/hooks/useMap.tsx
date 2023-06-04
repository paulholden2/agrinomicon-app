"use client"

import { useContext } from "react"
import mapboxgl from "mapbox-gl"
import { MapContext, MapState, MapDispatch } from "@/providers/MapProvider"

export default function useMap(containerId: string) {
  const [state, dispatch] = useContext<[MapState, MapDispatch]>(MapContext)

  // Initialize the map. Returns a function that can be called to
  // cleanup the map instance and free resources associated with it.
  //
  // Example
  //
  //   function MyMap() {
  //     const { initialize } = useMap("mapContainer")
  //     useEffect(() => initialize(), [])
  //     return <div id="mapContainer" />
  //   }
  //
  const initialize = (opts: mapboxgl.MapboxOptions = { container: containerId }) => {
    if (state.instances[containerId]?.map) return

    const camera = localStorage.getItem(`camera-${containerId}`)
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
      map,
      containerId
    })

    map.on("load", () => {
      setTimeout(() => dispatch({
        type: "Map.Loaded",
        containerId
      }), 0)

      const listener = () => {
        const {lng, lat} = map.getCenter()
        const zoom = map.getZoom()
        const bearing = map.getBearing()
        const pitch = map.getPitch()
        const data = [lng, lat, zoom, bearing, pitch]
        const camera = data.map((n: number) => `${n.toFixed(3)}`).join(",")
        localStorage.setItem(`camera-${containerId}`, camera)
      }

      map.on("move", listener)
      map.on("remove", () => {
        map.off("move", listener)
      })
    })

    return () => map.remove()
  }

  return {
    initialize
  }
}

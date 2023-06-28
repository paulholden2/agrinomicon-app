"use client"

import { useContext, useEffect } from "react"
import mapboxgl from "mapbox-gl"
import MapProvider, { MapContext } from "@/providers/MapProvider"
import Camera from "@/types/Camera"

type MapProps = {
  children?: React.ReactNode,
  containerId: string,
  onCameraChange?: (arg0: Camera) => void
}

function Init({
  children,
  containerId,
  onCameraChange
}: MapProps) {
  const [_, dispatch] = useContext(MapContext)

  useEffect(() => {
    const camera = localStorage.getItem(`camera-${containerId}`)
    const [lng, lat, zoom, bearing, pitch] = camera ? camera.split(",").map((s) => parseFloat(s)) : [-119.09, 35.26, 9, 0, 0]

    const map = new mapboxgl.Map({
      style: "mapbox://styles/mapbox/satellite-streets-v12", // mapbox://styles/bronsonholden/cljatla22003p01pzf6vt9qux
      center: [lng, lat],
      zoom,
      bearing,
      pitch,
      container: containerId
    })

    const loadHandler = () => {
      dispatch({
        type: "Map.Loaded"
      })

      const listener = () => {
        const {lng, lat} = map.getCenter()
        const zoom = map.getZoom()
        const bearing = map.getBearing()
        const pitch = map.getPitch()
        const data = [lng, lat, zoom, bearing, pitch]
        const camera = data.map((n: number) => `${n.toFixed(3)}`).join(",")
        localStorage.setItem(`camera-${containerId}`, camera)
      }

      map
        .on("move", listener)
        .on("remove", () => {
          map.off("move", listener)
        })
    }

    map.on("load", loadHandler)

    dispatch({
      type: "Map.Initialize",
      map
    })

    console.log("+ map")

    return () => {
      map.off("load", loadHandler)
      console.log("- map")
      map.remove()
    }
  }, [containerId, dispatch])

  return (
    <div className="h-full w-full" id={containerId}>
      {children}
    </div>
  )
}

export default function Map(props: MapProps) {
  return (
    <MapProvider>
      <Init {...props} />
    </MapProvider>
  )
}

"use client"

import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import PropTypes from "prop-types"
import mapboxgl from "mapbox-gl"
import useMap from "@/hooks/useMap"

export default function MapPopup({
  children,
  lngLat
}: {
  children: React.ReactNode,
  lngLat: {lng: number, lat: number}
}) {
  const { map, loaded } = useMap()

  useEffect(() => {
    if (map && loaded) {
      const popup = new mapboxgl.Popup()
      const div = document.createElement("div")

      const root = createRoot(div)
      root.render(<>{children}</>)

      popup
        .setDOMContent(div)
        .setLngLat(lngLat)
        .addTo(map)

      return () => {
        if (!map._removed) popup.remove()
      }
    }
  }, [map, loaded, children])

  return null
}

MapPopup.propTypes = {
  children: PropTypes.node,
  lngLat: PropTypes.object
}

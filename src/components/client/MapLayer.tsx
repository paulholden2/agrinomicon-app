"use client"

import { useEffect } from "react"
import PropTypes from "prop-types"
import { MapDataEvent, MapMouseEvent } from "mapbox-gl"
import useMap from "@/hooks/useMap"

export default function MapLayer({
  id,
  source,
  type,
  layout = {},
  paint = {},
  onClick,
}: {
  id: string,
  source: string,
  type: ("line" | "fill"),
  layout: any,
  paint: any,
  onClick?: (event: MapMouseEvent) => void
}) {
  const { map, loaded } = useMap()

  useEffect(() => {
    if (map && loaded) {
      const layer = {
        id,
        type,
        source,
        layout,
        paint
      }

      const handler = (event: MapDataEvent) => {
        const { isSourceLoaded, sourceId } = event as any
        if (isSourceLoaded && sourceId === source) {
          console.log("+ layer")
          map.addLayer(layer)
          map.off("sourcedata", handler)
        }
      }

      if (!(map as any)._removed && !map.getLayer(id)) map.on("sourcedata", handler)

      const cleanup = () => {
        console.log("- layer")
        // map.remove() cleans up layers
        if (!(map as any)._removed) map.removeLayer(id)
      }

      map.on("remove", cleanup)

      return () => {
        map.off("sourcedata", handler)
        map.off("remove", cleanup)
      }
    }
  }, [map, loaded, id, source, type, layout, paint])

  useEffect(() => {
    if (map && loaded && onClick) {
      const handler = (event: MapMouseEvent) => {
        onClick(event)
      }

      map.on("click", id, handler)

      return () => {
        if (!(map as any)._removed) map.off("click", handler)
      }
    }
  }, [map, loaded, id, onClick])

  return null
}

MapLayer.propTypes = {
  id: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["line", "fill"]),
  layout: PropTypes.oneOfType([PropTypes.object]),
  paint: PropTypes.oneOfType([PropTypes.object]),
  onClick: PropTypes.func
}

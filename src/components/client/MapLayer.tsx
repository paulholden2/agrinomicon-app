"use client"

import { useEffect } from "react"
import PropTypes from "prop-types"
import useMap from "@/hooks/useMap"

export default function MapLayer({
  id,
  source,
  type,
  layout = {},
  paint = {}
}: {
  id: string,
  source: string,
  type: ("line" | "fill"),
  layout: any,
  paint: any
}) {
  const { map } = useMap()

  useEffect(() => {
    if (map) {
      const layer = {
        id,
        type,
        source,
        layout,
        paint
      }

      map.once("load", () => {
        map.addLayer(layer)
      })

      return () => {
        map.once("load", () => {
          map.removeLayer(id)
        })
      }
    }
  }, [map, id, source, type, layout, paint])

  return null
}

MapLayer.propTypes = {
  id: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["line", "fill"]),
  layout: PropTypes.oneOfType([PropTypes.object]),
  paint: PropTypes.oneOfType([PropTypes.object])
}

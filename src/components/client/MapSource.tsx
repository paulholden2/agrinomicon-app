"use client"

import { useEffect } from "react"
import PropTypes from "prop-types"
import useMap from "@/hooks/useMap"

export default function MapSource({
  id,
  type,
  data
}: {
  id: string,
  type: ("geojson"),
  data: any
}) {
  const { map } = useMap()

  useEffect(() => {
    if (map) {
      const source = {
        type,
        data
      }

      map.once("load", () => {
        map.addSource(id, source)
      })

      return () => {
        map.once("load", () => {
          map.removeSource(id)
        })
      }
    }
  }, [map, id, type])

  return null
}

MapSource.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["geojson"]),
  data: PropTypes.oneOfType([PropTypes.object])
}

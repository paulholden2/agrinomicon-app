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
  const { map, loaded } = useMap()

  // cleanup
  useEffect(() => {
    if (!!map) {
      const handler = () => {
        // map.remove() cleans up sources
        console.log("- source")
        if (!(map as any)._removed) map.removeSource(id)
      }

      map.on("remove", handler)

      return () => {
        map.off("remove", handler)
      }
    }
  }, [map])

  useEffect(() => {
    if (map && loaded) {
      if (!map.getSource(id)) {
        const source = {
          type,
          data
        }

        map.addSource(id, source)
        console.log("+ source")
      } else {
        map.getSource(id).setData(data)
      }
    }
  }, [map, loaded, id, type, data])

  return null
}

MapSource.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["geojson"]),
  data: PropTypes.oneOfType([PropTypes.object])
}

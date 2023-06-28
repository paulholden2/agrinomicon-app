"use client"

import { useEffect } from "react"
import PropTypes from "prop-types"
import useMap from "@/hooks/useMap"

export default function MapSource({
  id,
  type,
  data,
  children
}: {
  id: string,
  type: ("geojson"),
  data: any,
  children?: React.ReactNode
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
  }, [map, id])

  useEffect(() => {
    if (map && loaded && !(map as any)._removed) {
      if (!map.getSource(id)) {
        const source = {
          type,
          data
        }

        map.addSource(id, source)
        console.log("+ source")
      } else {
        (map.getSource(id) as any).setData(data)
      }
    }
  }, [map, loaded, id, type, data])

  return <>{children}</>
}

MapSource.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["geojson"]),
  data: PropTypes.oneOfType([PropTypes.object])
}

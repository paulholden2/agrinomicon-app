"use client"

import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import mapboxgl from "mapbox-gl"
import MapboxDraw from "@mapbox/mapbox-gl-draw"
import { DRAW_STYLES } from "@/util/mapboxgl"

export default function Map({
  draw = true
}: {
  draw: Boolean,
  children?: React.ReactNode
}) {
  const [map, setMap] = useState<mapboxgl.Map | null>(null)
  const [drawControl, setDrawControl] = useState<MapboxDraw | null>(null)

  useEffect(() => {
    if (map) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN as string || ""

    const m = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [-119.09, 35.26],
      zoom: 9
    })

    m.on("load", () => {
      m.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14
      })
      m.setTerrain({ source: "mapbox-dem", exaggeration: 1.2 })
    })

    setMap(m)
  }, [setMap, map])

  useEffect(() => {
    if (!map) return

    if (draw) {
      const control = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          line_string: true,
          point: true,
          trash: true,
          combine_features: true,
          uncombine_features: true
        },
        userProperties: true,
        styles: [...DRAW_STYLES]
      })

      setDrawControl(control)
      map.addControl(control)
    } else if (drawControl) {
      map.removeControl(drawControl)
      setDrawControl(null)
    }
  }, [map, draw])

  return (
    <div className="h-full w-full" id="map">
    </div>
  )
}

Map.propTypes = {
  children: PropTypes.node,
  draw: PropTypes.bool.isRequired
}

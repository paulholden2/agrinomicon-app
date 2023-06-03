"use client"

import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import mapboxgl from "mapbox-gl"
import MapboxDraw from "@mapbox/mapbox-gl-draw"
import { DRAW_STYLES } from "@/util/mapboxgl"
import Feature from "@/types/Feature"

export default function Map({
  draw = true,
  features = []
}: {
  draw: Boolean,
  children?: React.ReactNode,
  features: Feature[]
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

  useEffect(() => {
    if (map && features) {
      map.on("load", () => {
        map.addSource("features", {
          type: "geojson",
          data: {
            features: features as any,
            type: "FeatureCollection"
          }
        })

        map.addLayer({
          id: "maine",
          type: "fill",
          source: "features",
          layout: {},
          paint: {
            "fill-color": "#0080ff",
            "fill-opacity": 0.5
          }
        })

        map.addLayer({
          id: "outline",
          type: "line",
          source: "features",
          layout: {},
          paint: {
            "line-color": "#000000",
            "line-width": 2
          }
        })

      })
    }
  }, [features, map])

  return (
    <div className="h-full w-full" id="map">
    </div>
  )
}

Map.propTypes = {
  children: PropTypes.node,
  draw: PropTypes.bool.isRequired
}

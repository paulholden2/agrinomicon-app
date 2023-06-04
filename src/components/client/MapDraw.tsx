"use client"

import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import useMap from "@/hooks/useMap"
import MapboxDraw from "@mapbox/mapbox-gl-draw"
import { Feature, FeatureCollection } from "geojson"

export default function MapDraw({
  onDrawFeature
}: {
  onDrawFeature?: (features: Feature[], allFeatures: FeatureCollection) => void
}) {
  const [control, setControl] = useState<MapboxDraw | null>(null)
  const { map, loaded } = useMap()

  useEffect(() => {
    if (control) return
    if (map && loaded) {
      const draw = new MapboxDraw({
        displayControlsDefault: true
      })

      map.on("draw.create", ({ features }: { features: Feature[] }) => {
        onDrawFeature?.(features, draw.getAll())
      })

      map
        .addControl(draw)
        .on("remove", () => map.removeControl(draw))

      setControl(draw)
    }
  }, [loaded])

  return null
}

MapDraw.propTypes = {
  onDrawFeature: PropTypes.func
}

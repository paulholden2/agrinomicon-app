"use client"

import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import useMap from "@/hooks/useMap"
import MapboxDraw from "@mapbox/mapbox-gl-draw"
import { Feature } from "geojson"
import { DRAW_STYLES } from "@/util/mapboxgl"

export default function MapDraw({
  features,
  modes,
  onCreateFeatures,
  onCombineFeatures,
  onUncombineFeatures,
  onUpdateFeatures,
  onDeleteFeatures
}: {
  modes?: string[],
  features: any[],
  onCreateFeatures?: (features: Feature[]) => void,
  onCombineFeatures?: (features: Feature[], result: Feature[]) => void,
  onUncombineFeatures?: (features: Feature[], result: Feature[]) => void,
  onUpdateFeatures?: (features: Feature[]) => void,
  onDeleteFeatures?: (features: Feature[]) => void
}) {
  const [control, setControl] = useState<MapboxDraw>()
  const { map } = useMap()

  useEffect(() => {
    if (map) {
      const draw = new MapboxDraw({
        styles: DRAW_STYLES,
        controls: {
          line_string: modes?.includes("line_string"),
          point: modes?.includes("point"),
          polygon: modes?.includes("polygon"),
          combine_features: false,
          trash: true
        },
        userProperties: true
      })

      console.log("+ draw")
      map.addControl(draw)

      setControl(draw)

      return () => {
        console.log("- draw")
        if (!(map as any)._removed) map.removeControl(draw)
        setControl(undefined)
      }
    }
  }, [map, modes])

  useEffect(() => {
    if (map && control) {
      const handler = ({ features }: { features: Feature[] }) => {
        onCreateFeatures?.(features)
        control.delete((features as any).map(({ id }: { id: string }) => id))
      }

      map.on("draw.create", handler)
      return () => { map.off("draw.create", handler) }
    }
  }, [control, map, onCreateFeatures])

  useEffect(() => {
    if (map && control) {
      const handler =  ({ features, action: _ }: { features: Feature[], action: string }) => {
        onUpdateFeatures?.(features)
      }

      map.on("draw.update", handler)
      return () => { map.off("draw.update", handler) }
    }
  }, [control, map, onUpdateFeatures])

  useEffect(() => {
    if (map && control) {
      const handler =  ({ features, action: _ }: { features: Feature[], action: string }) => {
        onDeleteFeatures?.(features)
      }

      map.on("draw.delete", handler)
      return () => { map.off("draw.delete", handler) }
    }
  }, [control, map, onDeleteFeatures])

  useEffect(() => {
    if (map && control) {
      const handler =  ({
        deletedFeatures,
        createdFeatures
      }: { deletedFeatures: Feature[], createdFeatures: Feature[]
      }) => {
        onCombineFeatures?.(deletedFeatures, createdFeatures)
      }

      map.on("draw.combine", handler)
      return () => { map.off("draw.combine", handler) }
    }
  }, [control, map, onCombineFeatures])

  useEffect(() => {
    if (map && control) {
      const handler =  ({
        deletedFeatures,
        createdFeatures
      }: {
        deletedFeatures: Feature[],
        createdFeatures: Feature[]
      }) => {
        onUncombineFeatures?.(deletedFeatures, createdFeatures)
      }

      map.on("draw.uncombine", handler)
      return () => { map.off("draw.uncombine", handler) }
    }
  }, [control, map, onUncombineFeatures])

  useEffect(() => {
    if (map && control && features?.length && map.hasControl(control)) {
      control.add({
        type: "FeatureCollection",
        features: features.map((feature) => ({
          ...feature,
          type: "Feature"
        }))
      })
    }
  }, [control, map, features])

  return null
}

MapDraw.propTypes = {
  modes: PropTypes.arrayOf(PropTypes.oneOf(["polygon", "line_string", "point"])),
  onDrawFeatures: PropTypes.func,
  features: PropTypes.arrayOf(PropTypes.object)
}

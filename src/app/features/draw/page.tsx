"use client"

import Map from "@/components/client/Map"
import MapDraw from "@/components/client/MapDraw"
import { Feature, FeatureCollection } from "geojson"

export default function DrawFeatures() {
  const onDrawFeature = (_features: Feature[], _allFeatures: FeatureCollection) => {
  }

  return (
    <div>
      <div className="absolute top-[3.5rem] bottom-0 left-0 right-0">
        <div className="p-2 flex gap-2 shallow:flex-col">
          <div className="flex-grow" />
          <button type="button" className="bg-lime-700 px-3 py-1 rounded text-sm">Save</button>
        </div>
          <Map containerId="drawFeaturesMap">
            <MapDraw onDrawFeature={onDrawFeature} />
          </Map>
      </div>
    </div>
  )
}

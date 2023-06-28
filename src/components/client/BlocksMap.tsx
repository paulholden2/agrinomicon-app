"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Map from "@/components/client/Map"
import MapSource from "@/components/client/MapSource"
import MapLayer from "@/components/client/MapLayer"
import MapPopup from "@/components/client/MapPopup"
import { Geometry } from "geojson"

type SelectedBlock = {
  lngLat: {lng: number, lat: number},
  block: SparseBlock
}

type SparseBlock = {
  id: string,
  name?: string,
  feature: {
    id: string,
    geometry: Geometry
  },
  tenures: {
    distributions: {
      classification: { common_names: string[] },
      coverage: number
    }[]
  }[]
}

export default function BlocksMap() {
  const [blocks, setBlocks] = useState<SparseBlock[]>([])
  const [selection, setSelection] = useState<SelectedBlock>()

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
      method: "POST",
      signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query GetBlocks($sort_by: String, $sort_dir: String, $limit: Int) {
          blocks {
            id
            name
            tenures(sort_by: $sort_by, sort_dir: $sort_dir, limit: $limit) {
              distributions {
                classification { common_names, geometry_color }
                coverage
              }
            }
            feature { id, geometry }
          }
        }
        `,
        variables: {
          sort_by: "occupied_at",
          sort_dir: "desc",
          limit: 1
        }
      })
    }).then(async (res) => {
      if (res.ok) return res.json()
      else return await res.json()
    }).then(({
      data: { blocks }
    }: {
      data: { blocks: SparseBlock[] }
    }) => {
      setBlocks(blocks)
    })

    return () => {
      controller.abort()
    }
  }, [])

  const onClickBlock = (event: any) => {
    setSelection({
      lngLat: event.lngLat,
      block: blocks.find(({ id }: { id: string }) => id === event.features[0].properties.block_id) as SparseBlock
    })
  }

  const geojson = useMemo(() => blocks?.length ? {
    type: "FeatureCollection",
    features: blocks.map((block: any) => {
      return {
        ...block.feature,
        properties: {
          ...block.feature.properties,
          block_id: block.id,
          color: block.tenures[0]?.distributions[0]?.classification.geometry_color ? `#${block.tenures[0]?.distributions[0].classification.geometry_color}` : null
        },
        type: "Feature"
      }
    })
  } : null, [blocks])

  return (
    <Map containerId="blocks">
      <MapSource id="blocks" type="geojson" data={geojson}>
        <MapLayer onClick={onClickBlock} id="blocksLayer" source="blocks" type="fill" paint={{
          "fill-color": ["coalesce", ["get", "color"], "#0080ff"],
          "fill-opacity": 0.5
        }} />
      </MapSource>
      {selection && (
        <MapPopup lngLat={selection.lngLat}>
          <div className="pt-2 font-body">
            <div className="text-lg font-medium">
              {!!selection.block.name ? selection.block.name : "Untitled block"}
            </div>
            {selection.block.tenures[0]?.distributions.map((dist: any, idx: number) => {
              return (
                <div key={idx}>
                  {dist.coverage}% {dist.classification?.common_names?.[0]}
                </div>
              )
            })}
            <Link className="font-medium" href={`/blocks/${selection.block.id}`}>View</Link>
          </div>
        </MapPopup>
      )}
    </Map>
  )
}

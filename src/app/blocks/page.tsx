"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Map from "@/components/client/Map"
import MapSource from "@/components/client/MapSource"
import MapLayer from "@/components/client/MapLayer"
import MapPopup from "@/components/client/MapPopup"

type SelectedBlock = {
  lngLat: {lng: number, lat: number},
  block: any
}

export default function Blocks() {
  const [blocks, setBlocks] = useState<any>([])
  const [selection, setSelection] = useState<SelectedBlock>()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/graphql" },
      body: `
      query GetBlocks {
        blocks {
          id
          feature { id, geometry }
        }
      }
      `
    }).then(async (res) => {
      if (res.ok) return res.json()
      else return await res.json()
    }).then(({ data }) => {
      setBlocks(data.blocks)
    })
  }, [])

  const onClickBlock = (event: any) => {
    setSelection({
      lngLat: event.lngLat,
      block: blocks.find(({ id }: { id: string }) => id === event.features[0].properties.block_id)
    })
  }

  const geojson = useMemo(() => blocks?.length ? {
    type: "FeatureCollection",
    features: blocks.map((block: any) => ({
      ...block.feature,
      properties: {
        ...block.feature.properties,
        block_id: block.id
      },
      type: "Feature"
    }))
  } : null, [blocks])

  return (
    <div>
      <div className="absolute top-[3.5rem] bottom-0 left-0 right-0">
        <div className="p-2 flex gap-2 shallow:flex-col">
          <div className="flex-grow" />
          <Link href="/blocks/edit" className="bg-lime-700 px-3 py-1 rounded text-sm">New</Link>
        </div>
        <Map containerId="blocks">
          <MapLayer onClick={onClickBlock} id="blocksLayer" source="blocks" type="fill" paint={{ "fill-color": "#0080ff", "fill-opacity": 0.5 }} />
          <MapSource id="blocks" type="geojson" data={geojson} />
          {selection && (
            <MapPopup lngLat={selection.lngLat}>
              <div className="pt-2 font-body">
                <div className="text-lg font-medium">{!!selection.block.name ? selection.block.name : "Untitled block"}</div>
                <Link className="font-medium" href={`/blocks/${selection.block.id}`}>View</Link>
              </div>
            </MapPopup>
          )}
        </Map>
      </div>
    </div>
  )
}

export const revalidate = 60

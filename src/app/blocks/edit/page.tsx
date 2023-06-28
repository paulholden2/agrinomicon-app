"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Map from "@/components/client/Map"
import MapDraw from "@/components/client/MapDraw"
import { Feature } from "geojson"
import Camera from "@/types/Camera"

export default function NewBlock() {
  const [features, setFeatures] = useState([])
  const [refetch, setRefetch] = useState(true)

  useEffect(() => {
    if (refetch) {
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
                  classification { geometry_color }
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
      }).then((res) => res.json()).then(({ data }) => {
        setRefetch(false)
        setFeatures(data.blocks.map(({ id, feature, tenures }: { id: string, feature: any, tenures: any[] }) => ({
          ...feature,
          properties: {
            ...feature.properties,
            color: tenures[0]?.distributions[0]?.classification.geometry_color ? `#${tenures[0]?.distributions[0]?.classification.geometry_color}` : null,
            block_id: id
          }
        })))
      })

      return () => {
        controller.abort()
      }
    }
  }, [refetch, setRefetch])

  const onCameraChange = (camera: Camera) => {
  }

  const onCreateFeatures = (features: Feature[]) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blocks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        block: {
          feature: {
            geometry: features[0].geometry
          }
        }
      })
    }).then((res) => res.json()).then(() => {
      setRefetch(true)
    })
  }

  const onUpdateFeatures = (features: Feature[]) => {
    Promise.all(features.map((feature) => feature.properties?.block_id ? fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blocks/${feature.properties.block_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        block: {
          feature: { ...feature, geometry: feature.geometry }
        }
      })
    }) : Promise.resolve())).then(() => {
      setRefetch(true)
    })
  }
  const onDeleteFeatures = (features: Feature[]) => {
    Promise.all(features.map((feature) => feature.properties?.block_id ? fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blocks/${feature.properties.block_id}`, {
      method: "DELETE"
    }) : Promise.resolve())).then(() => {
      setRefetch(true)
    })
  }

  const onCombineFeatures = (_features: Feature[], _result: Feature[]) => {
  }

  const onUncombineFeatures = (_features: Feature[], _result: Feature[]) => {
  }

  const modes = useMemo(() => ["polygon"], [])

  return (
    <div>
      <div className="absolute top-[3.5rem] bottom-0 left-0 right-0">
        <div className="p-2 flex gap-2 shallow:flex-col">
          <div className="flex-grow" />
          <Link href="/blocks" className="bg-lime-700 px-3 py-1 rounded text-sm">Done</Link>
        </div>
          <Map containerId="blocks" onCameraChange={onCameraChange}>
            <MapDraw
              modes={modes}
              features={features}
              onCreateFeatures={onCreateFeatures}
              onCombineFeatures={onCombineFeatures}
              onUncombineFeatures={onUncombineFeatures}
              onUpdateFeatures={onUpdateFeatures}
              onDeleteFeatures={onDeleteFeatures}
            />
          </Map>
      </div>
    </div>
  )
}

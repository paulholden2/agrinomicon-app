import Link from "next/link"
import Map from "@/components/client/Map"
import MapSource from "@/components/client/MapSource"
import MapLayer from "@/components/client/MapLayer"

export default async function Blocks() {
  const { data, errors: _ } = await fetch(`${process.env.API_URL}/graphql`, {
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
  }).then((res) => res.json())

  const geojson = {
    type: "FeatureCollection",
    features: data.blocks.map((block: any) => ({ ...block.feature, type: "Feature" }))
  }

  return (
    <div>
      <div className="absolute top-[3.5rem] bottom-0 left-0 right-0">
        <div className="p-2 flex gap-2 shallow:flex-col">
          <div className="flex-grow" />
          <Link href="/blocks/edit" className="bg-lime-700 px-3 py-1 rounded text-sm">New</Link>
        </div>
        <Map containerId="blocks">
          <MapSource id="blocks" type="geojson" data={geojson} />
          <MapLayer id="blocksLayer" source="blocks" type="fill" paint={{ "fill-color": "#0080ff", "fill-opacity": 0.5 }} />
        </Map>
      </div>
    </div>
  )
}

export const revalidate = 60

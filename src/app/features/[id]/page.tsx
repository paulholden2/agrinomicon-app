import Map from "@/components/client/Map"

export default async function Feature({ params: { id } }: { params: { id: string }}) {
  const { data: feature } = await fetch(`${process.env.API_URL}/api/features/${id}`).then((res) => res.json())

  return (
    <div>
      <div className="h-96">
        <Map containerId={feature.id} />
      </div>
    </div>
  )
}

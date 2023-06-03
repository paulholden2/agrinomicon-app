import MapComponent from "@/components/client/Map"

export default async function Map() {
  const { data } = await fetch(`${process.env.API_URL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/graphql" },
    body: `
    query GetFeatures {
      features {
        id
        geometry
      }
    }
    `
  }).then((res) => res.json())

  return (
    <div>
      <div className="absolute top-[3.5rem] bottom-0 left-0 right-0">
        <MapComponent draw={false} features={data.features}>
        </MapComponent>
      </div>
    </div>
  )
}

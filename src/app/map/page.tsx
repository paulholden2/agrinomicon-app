import MapComponent from "@/components/client/Map"

export default async function Map() {
  return (
    <div>
      <div className="absolute top-[3.5rem] bottom-0 left-0 right-0">
        <MapComponent draw={false}>
        </MapComponent>
      </div>
    </div>
  )
}

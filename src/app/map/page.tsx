import MapComponent from "@/components/client/Map"
import MapProvider from "@/providers/MapProvider"

export default async function Map() {
  return (
    <div>
      <div className="absolute top-[3.5rem] bottom-0 left-0 right-0">
        <MapProvider>
          <MapComponent />
        </MapProvider>
      </div>
    </div>
  )
}

import Link from "next/link"
import BlocksMap from "@/components/client/BlocksMap"

export default async function Blocks() {

  return (
    <div>
      <div className="absolute top-[3.5rem] bottom-0 left-0 right-0">
        <div className="p-2 flex gap-2 shallow:flex-col">
          <div className="flex-grow" />
          <Link href="/blocks/edit" className="bg-lime-700 px-3 py-1 rounded text-sm">New</Link>
        </div>
        <BlocksMap />
      </div>
    </div>
  )
}

export const revalidate = 60

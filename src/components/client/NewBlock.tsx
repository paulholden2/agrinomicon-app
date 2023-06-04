"use client"

import { useState } from "react"
import classNames from "classnames"
import Link from "next/link"
import Map from "@/components/client/Map"

export default function NewBlock() {
  const [showData, setShowData] = useState<Boolean>(false)

  const onSubmit = () => {}

  return (
    <div className="absolute top-[3.5rem] bottom-0 left-0 right-0">
      <form className="w-full h-full flex flex-col shallow:flex-row">
        <div className="p-2 flex gap-2 shallow:flex-col">
          <button type="button" className="bg-neutral-700 px-3 py-1 rounded text-sm whitespace-nowrap" onClick={() => setShowData(!showData)}>{showData ? "Map" : "Data"}</button>
          <div className="flex-grow" />
          <button type="button" onClick={onSubmit} className="bg-lime-700 px-3 py-1 rounded text-sm">Save</button>
          <Link href="/blocks" className="text-center bg-neutral-700 px-3 py-1 rounded text-sm">Cancel</Link>
        </div>
        <div className={classNames("w-full h-full", {
          hidden: showData
        })}>
          <Map containerId="newBlockMap" />
        </div>
        <div className={classNames({ hidden: !showData })}>
        </div>
      </form>
    </div>
  )
}

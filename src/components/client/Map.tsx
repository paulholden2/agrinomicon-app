"use client"

import { useEffect } from "react"
import useMap from "@/hooks/useMap"

export default function Map() {
  const { initialize } = useMap("globalMap")

  useEffect(() => initialize(), [])

  // Little hack to reload page after fast refresh since the map
  // gets removed but isn't reinitialized
  useEffect(() => {
    if (process.env.NODE_ENV === "development")
      return () => window.location.reload()
  }, [])

  return (
    <div className="h-full w-full" id="globalMap" />
  )
}

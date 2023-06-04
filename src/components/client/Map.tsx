"use client"

import { useEffect } from "react"
import PropTypes from "prop-types"
import useMap from "@/hooks/useMap"
import MapProvider from "@/providers/MapProvider"

function Init({
  children,
  containerId
}: {
  children: React.ReactNode,
  containerId: string
}) {
  const { initialize } = useMap()

  useEffect(() => {
    initialize({ container: containerId })
  }, [])

  return (
    <div className="h-full w-full" id={containerId}>
      {children}
    </div>
  )
}

Init.propTypes = {
  children: PropTypes.node,
  containerId: PropTypes.string.isRequired
}

export default function Map({
  children = [],
  containerId
}: {
  children?: React.ReactNode,
  containerId: string
}) {
  return (
    <MapProvider>
      <Init containerId={containerId} children={children} />
    </MapProvider>
  )
}

Map.propTypes = {
  children: PropTypes.node,
  containerId: PropTypes.string.isRequired
}

"use client"

import { useEffect, useState } from "react"

export default function ClassificationSelect(props: any) {
  const [classifications, setClassifications] = useState<any>()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetClassifications {
            classifications {
              id
              binomial_name
            }
          }
        `
      })
    })
      .then((res) => res.json())
      .then(({
        data: { classifications }
      }: {
        data: {
          classifications:{ id: string, binomial_name: string }[]
        }
      }) => {
        setClassifications(classifications)
      })
  }, [])

  if (!classifications) return null

  return (
    <select {...props}>
      {classifications?.map((classification: any) => {
        return (
          <option key={classification.id} value={classification.id}>{classification.binomial_name}</option>
        )
      })}
    </select>
  )
}

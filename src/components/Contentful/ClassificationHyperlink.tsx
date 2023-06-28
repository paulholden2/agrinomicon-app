"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import RichText from "@/components/Contentful/RichText"
import Classification from "@/types/Classification"
import { Entry } from "@/types/Contentful"

export default function ClassificationHyperlink({ entry }: { entry: Entry }) {
  const [match, setMatch] = useState<Classification | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
      method: "POST",
      signal,
      headers: { "Accept": "application/json", "Content-Type": "application/graphql" },
      body: `
        query GetClassifications {
          classifications {
            id
            binomial_name
          }
        }
      `
    })
      .then((res) => res.json())
      .then(({ data: { classifications } }: { data: { classifications: Classification[] }}) => {
        const result = classifications.find(({ binomial_name }: { binomial_name: String }) =>
          binomial_name.toLowerCase() === (entry.fields.binomialName as string).toLowerCase()
        )
        if (!!result) setMatch(result)
      })
      .catch((err) => {
        console.error(err)
      })

    return () => {
      controller.abort()
    }
  }, [entry])

  return (
    <Link className="font-semibold text-lime-800 hover:text-lime-600 dark:hover:text-lime-400 dark:text-lime-600" href={match?.id ? `/classifications/${match.id}` : "#"}>
      <RichText section={entry.fields.body} inline={true} />
    </Link>
  )
}

import Link from "next/link"
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid"
import BlockTenures from "@/components/client/BlockTenures"
import { Geometry } from "geojson"

type BlockSpec = {
  id: string,
  feature: { geometry: Geometry },
  tenures: {
    occupied_at?: string,
    distributions: {
      id: string,
      coverage: number,
      classification: {
        id: string,
        binomial_name: string
      }
    }[]
  }[]
}

export default async function Block({ params: { id } }: { params: { id: string } }) {
  const {
    data: { block },
    errors: _
  }: {
    data: { block: BlockSpec },
    errors: any
  } = await fetch(`${process.env.API_URL}/graphql`, {
    next: { revalidate: 0 },
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query GetBlock($id: ID!) {
          block(id: $id) {
            id
            feature { geometry }
            tenures {
              id
              occupied_at
              distributions {
                id
                coverage
                classification {
                  id,
                  binomial_name
                }
              }
            }
          }
        }`,
      variables: { id }
    })
  })
    .then((res) => {
      const json = res.json()
      if (res.ok) return json
      else throw json
    })
    .catch((err) => {
      console.error(err)
    })

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start gap-2 sm:items-center justify-between">
        <div className="font-display text-2xl">Block name</div>
        <Link
          href="/blocks"
          className="flex items-center text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-full font-medium whitespace-nowrap"
        >
          All Blocks
          <ArrowUturnLeftIcon className="inline-block h-3 w-3 sm:h-4 sm:w-4 ml-2" />
        </Link>
      </div>
      <div>
        Tenures
        <BlockTenures block={block} />
      </div>
    </div>
  )
}

export const revalidate = 10

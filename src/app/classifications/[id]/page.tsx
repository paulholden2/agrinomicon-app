import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid"
import Content from "@/components/Contentful/Content"
import { Entry } from "@/types/Contentful"

export default async function Classification({ params: { id }}: { params: { id: String }}) {
  const { data: classification } = await fetch(`${process.env.API_URL}/api/classifications/${id}`)
    .then((res) => res.json())

  if (typeof classification === "undefined") notFound()

  const { data: details } = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/contentful/entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content_type: "classification",
      "fields.binomialNames": classification.binomial_name
    })
  }).then((res) => res.json())

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start gap-2 sm:items-center justify-between">
        <div className="font-display text-2xl italic">{classification.binomial_name}</div>
        <Link
          href="/classifications"
          className="flex items-center text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-full font-medium whitespace-nowrap"
        >
          All Classifications
          <ArrowUturnLeftIcon className="inline-block h-3 w-3 sm:h-4 sm:w-4 ml-2" />
        </Link>
      </div>
      {details?.length ? (
        <details open className="border rounded-lg my-8 p-3 sm:p-6 border-transparent open:border-slate-300 dark:open:border-slate-700">
          <summary className="select-none text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white cursor-pointer">
            <span className="ml-2">Details</span>
          </summary>
          {details.map(async (entry: Entry) => await Content({ entry }))}
        </details>
      ) : null}
    </>
  )
}

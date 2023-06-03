import Link from "next/link"
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid"

export default async function Block() {
  return (
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
  )
}

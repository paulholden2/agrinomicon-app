import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/20/solid"

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto container p-3 sm:p-6 my-10">
      <h1 className="text-4xl font-bold text-slate-600 dark:text-slate-500 font-display">Not Found!</h1>
      <p className="my-8">We were unable to find that page</p>
      <Link
        href="/"
        className="inline-block text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium whitespace-nowrap"
      >
        <ArrowLeftIcon className="inline-block h-4 w-4 mr-1 mb-[3px]"/>Back to home
      </Link>
    </div>
  )
}

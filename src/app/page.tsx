import Link from "next/link"
import Logo from "@/components/Logo"

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto container p-3 sm:p-6">
      <div className="my-8">
        <div className="flex items-center gap-4 mb-2">
          <Logo />
          <h1 className="text-lg font-bold text-green-800 dark:text-lime-400">Agrinomicon</h1>
        </div>
      </div>
      <p className="font-display text-5xl font-semibold tracking-tighter my-8 px-2">Knowledgebase and tools for modern ag.</p>
      <ul className="max-w-2xl grid grid-cols-2 gap-4">
        <li>
          <Link className="rounded-lg block p-4 hover:bg-zinc-300/40 dark:hover:bg-zinc-700/30" href="/blocks">
            Blocks
          </Link>
        </li>
        <li>
          <Link className="rounded-lg block p-4 hover:bg-zinc-300/40 dark:hover:bg-zinc-700/30" href="/classifications">
            Taxonomy
          </Link>
        </li>
      </ul>
    </main>
  )
}

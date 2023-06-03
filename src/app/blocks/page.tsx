import Link from "next/link"

export default async function Blocks() {
  const { data } = await fetch(`${process.env.API_URL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/graphql" },
    body: `
    query GetBlocks {
      blocks {
        id
        name
        feature {
          geometry
        }
      }
    }
    `
  }).then((res) => res.json())

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start gap-2 sm:items-center justify-between">
        <div className="font-display text-2xl">Block name</div>
        <Link
          href="/blocks/new"
          className="flex items-center text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-full font-medium whitespace-nowrap"
        >
          New Block
        </Link>
      </div>
      <table cellPadding="0" className="my-8">
        <thead>
          <tr className="text-left font-bold text-md">
            <th className="px-4">Name</th>
          </tr>
        </thead>
        <tbody>
          {data.blocks.map((block: any) => (
            <tr key={block.name as string}>
              <td className="first:rounded-l-md last:rounded-r-md">
                <Link className="italic w-full h-full px-4 block font-semibold text-lime-800 hover:text-lime-600 dark:hover:text-lime-400 dark:text-lime-600" href={`/blocks/${block.id}`}>{block.name || "Untitled block"}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

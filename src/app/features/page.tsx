import Link from "next/link"

export default async function Features() {
  const { data } = await fetch(`${process.env.API_URL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/graphql" },
    body: `
    query GetFeatures {
      features {
        id
      }
    }
    `
  }).then((res) => res.json())

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start gap-2 sm:items-center justify-between">
        <div className="font-display text-2xl">Feature</div>
      </div>
      <table cellPadding="0" className="my-8">
        <thead>
          <tr className="text-left font-bold text-md">
            <th className="px-4">ID</th>
          </tr>
        </thead>
        <tbody>
          {data.features.map((feature: any) => (
            <tr key={feature.id as string}>
              <td className="first:rounded-l-md last:rounded-r-md">
                <Link className="italic w-full h-full px-4 block font-semibold text-lime-800 hover:text-lime-600 dark:hover:text-lime-400 dark:text-lime-600" href={`/features/${feature.id}`}>{feature.id}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

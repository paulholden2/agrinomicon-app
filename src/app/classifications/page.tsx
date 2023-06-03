import Link from "next/link"
import Classification from "@/types/Classification"

export default async function Classifications() {
  const response: { data: { classifications: Classification[] } } = await fetch(`${process.env.API_URL}/graphql`, {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/graphql" },
    body: `
      query GetClassifications {
        classifications {
          id
          binomial_name
          kingdom
          common_names
        }
      }
    `
  }).then((res) => res.json())

  return (
    <div>
      <div className="flex items-center">
        <div className="font-display text-2xl">Classifications</div>
      </div>
      <table cellPadding="0" className="my-8">
        <thead>
          <tr className="text-left font-bold text-md">
            <th className="px-4">Kingdom</th>
            <th className="px-4">Binomial name</th>
            <th className="px-4">Common name(s)</th>
          </tr>
        </thead>
        <tbody>
          {response.data.classifications.map((classification: Classification) => (
            <tr key={classification.binomial_name as string}>
              <td className="first:rounded-l-md last:rounded-r-md px-4">
                {classification.kingdom}
              </td>
              <td className="first:rounded-l-md last:rounded-r-md">
                <Link className="italic w-full h-full px-4 block font-semibold text-lime-800 hover:text-lime-600 dark:hover:text-lime-400 dark:text-lime-600" href={`/classifications/${classification.id}`}>{classification.binomial_name}</Link>
              </td>
              <td className="first:rounded-l-md last:rounded-r-md px-4">
                {classification.common_names?.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

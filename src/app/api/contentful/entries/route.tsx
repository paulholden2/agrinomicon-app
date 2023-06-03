import { NextResponse } from "next/server"
import { createClient } from "contentful"

const contentfulClient = createClient({
  environment: process.env.CONTENTFUL_ENV,
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_API_TOKEN || "",
  host: process.env.CONTENTFUL_API_HOST
})

export async function POST(request: Request) {
  return NextResponse.json({ data: await contentfulClient
    .getEntries(await request.json())
    .then((entries) => entries.items)
  })
}

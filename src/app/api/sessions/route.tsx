import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const response = NextResponse.json({ data: { status: "ok" } })

  response.cookies.set({
    name: "access_token",
    value: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ0b3RhbF92aWV3IiwiZXhwIjoxNjg4MDY3NDA4LCJpYXQiOjE2ODU2NDgyMDgsImlzcyI6InRvdGFsX3ZpZXciLCJqdGkiOiJlOTE0NzIyYy03ZmY1LTRhZmEtOGZhMi1hYWQ4MzJhOGIzYzYiLCJuYmYiOjE2ODU2NDgyMDcsInN1YiI6ImVhMzA1ZDY1LTA4NTEtNDQ0ZC04MGUzLTE0MDY2YzJlNjU4ZSIsInR5cCI6InVzZXIifQ.raJWW2t0N7EGVVE5tGj56B_RsJ7Py7b0s8UwdmpbJy-nf6KcZT7x4CvUL3KKOswLz69uBIidxyKCfGlx7QH1_Q",
    path: "/",
    httpOnly: true,
    secure: true
  })

  return response
}

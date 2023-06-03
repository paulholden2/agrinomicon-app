import "./globals.css"
import { Inter, Crimson_Pro } from "next/font/google"
import classNames from "classnames"

const inter = Inter({ subsets: ["latin"] })
const crimsonPro = Crimson_Pro({ subsets: ["latin"], variable: "--font-crimson-pro" })

export const metadata = {
  title: "Agrinomicon",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css" type="text/css" />
        <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.0/mapbox-gl-draw.css" type="text/css" />
      </head>
      <body className={classNames(
        inter.className,
        crimsonPro.variable,
        "bg-white text-black",
        "dark:bg-neutral-900 dark:text-white"
      )}>{children}</body>
    </html>
  )
}

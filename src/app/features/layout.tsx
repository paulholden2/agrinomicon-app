import Topbar from "@/components/Topbar"

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full">
      <Topbar />
      {children}
    </div>
  )
}

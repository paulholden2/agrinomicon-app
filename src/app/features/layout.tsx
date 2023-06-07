import Topbar from "@/components/Topbar"

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full">
      <Topbar />
      <div className="max-w-4xl mx-auto container p-3 sm:p-6 my-10">
        {children}
      </div>
    </div>
  )
}

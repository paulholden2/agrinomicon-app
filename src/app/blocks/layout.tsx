import Topbar from "@/components/Topbar"

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Topbar />
      <div className="max-w-4xl mx-auto container p-3 sm:p-6 my-10">
        {children}
      </div>
    </div>
  )
}

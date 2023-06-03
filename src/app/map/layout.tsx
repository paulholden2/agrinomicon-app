import Topbar from "@/components/Topbar"

export default function ClassificationsLayout({
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

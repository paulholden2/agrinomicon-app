import Image from "next/image"

export default function Logo() {
  return (
    <Image priority alt="Agrinomicon" src="/logo.svg" width="48" height="48" />
  )
}

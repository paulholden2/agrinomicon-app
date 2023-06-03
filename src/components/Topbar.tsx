"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Logo from "@/components/Logo"
import classNames from "classnames"

function containsRelatedTarget(event: FocusEvent) {
  if (event.currentTarget instanceof HTMLElement && event.relatedTarget instanceof HTMLElement) {
    return event.currentTarget.contains(event.relatedTarget);
  }

  return false
}

export default function Topbar() {
  const ref = useRef<any>()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const links = [
    { href: "/", children: <div className="py-1"><Logo /></div>, className: "hidden sm:block" },
    { href: "/", children: "Home", className: "block sm:hidden" },
    { href: "/map", children: "Map" },
    { href: "/blocks", children: "Blocks" },
    { href: "/classifications", children: "Taxonomy" }
  ]

  useEffect(() => {
    if (ref.current) {
      const handleFocusIn = () => {
        if (!ref.current) setShowMobileMenu(true)
      }

      const handleFocusOut = (event: FocusEvent) => {
        if (ref.current && !containsRelatedTarget(event)) setShowMobileMenu(false)
      }

      ref.current.addEventListener("focusin", handleFocusIn)
      ref.current.addEventListener("focusout", handleFocusOut)

      return () => {
        ref.current?.removeEventListener("focusin", handleFocusIn)
        ref.current?.removeEventListener("focusout", handleFocusOut)
      }
    }
  }, [ref.current])

  return (
    <header className="sm:relative sm:bg-neutral-900 sm:dark:bg-neutral-800 text-white dark:text-white pt-[4.5rem] sm:pt-0">
      <nav className="relative">
        {/* Mobile menu */}
        <button
          className="sm:hidden px-3 py-1 fixed top-0 left-0 z-50"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <Logo />
        </button>
        <ul
          ref={ref}
          className={classNames(
            "sm:hidden overflow-hidden fixed z-40 top-0 left-0 right-0 bottom-0 bg-neutral-900 dark:bg-neutral-800",
            {
              "h-[0px]": !showMobileMenu
            }
          )}
        >
          <li className="pt-[5rem]" />
          {links.map(({ href, children, className }, idx) =>
            <li className={className} key={idx}>
              <Link
                href={href}
                onFocus={() => setShowMobileMenu(true)}
                onClick={() => setShowMobileMenu(false)}
                className="py-3 px-6 block flex items-center h-full px-3 text-sm text-neutral-400 text-neutral-50 text-neutral-200 font-semibold whitespace-nowrap"
              >
                {children}
              </Link>
            </li>
          )}
        </ul>
        {/* Desktop menu */}
        <ul className="items-stretch sm:flex hidden">
          {links.map(({ href, children, className }, idx) =>
            <li className={className} key={idx}>
              <Link
                href={href}
                className="hover:bg-neutral-800 dark:hover:bg-neutral-700/50 block flex items-center h-full px-3 text-sm text-neutral-400 hover:text-neutral-50 dark:text-neutral-400 dark:hover:text-neutral-200 font-semibold whitespace-nowrap"
              >
                {children}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

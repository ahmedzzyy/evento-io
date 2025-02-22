"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sm:hidden">
      <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      {isOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4">
          <Link href="#" className="text-gray-600 hover:text-salmon-600">
            Browse Events
          </Link>
          <Link href="#" className="text-gray-600 hover:text-salmon-600">
            Create Event
          </Link>
          <Link href="#" className="text-gray-600 hover:text-salmon-600">
            Login
          </Link>
          <Button className="bg-gradient-to-r from-salmon-500 to-salmon-600 hover:from-salmon-600 hover:to-salmon-700 text-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            Sign Up
          </Button>
        </nav>
      )}
    </div>
  )
}
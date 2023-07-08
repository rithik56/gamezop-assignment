'use client'

import React, { useState } from 'react'
import Navigation from "@/components/navigation"
import Drawer from "@/components/drawer"
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  function toggleDrawer() {
    setIsOpen(!isOpen)
  }
  return (
    <html lang="en">
      <body>
        <Navigation toggleDrawer={toggleDrawer} />
        <Drawer isOpen={isOpen} />
        {children}
      </body>
    </html>
  )
}

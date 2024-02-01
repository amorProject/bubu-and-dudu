"use client"

import * as React from "react"
import { Toaster } from "./ui/sonner"
import { Triangle } from 'react-loader-spinner'
import { Navbar } from "./layout/navbar"

export default function Layout({ children }: LayoutProps) {
  const [loading, setLoading] = React.useState(true)
  
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500);
  }, [])

  if (loading) return (
    <div className="w-screen h-screen z-50 bg-background flex justify-center items-center">
      <Triangle
        color="white"
        height={100}
        width={100}
      />
    </div>
  )

  return (
    <main className="max-h-screen min-h-screen">
      <Navbar />
      {children}
      <Toaster />
    </main>
  )
}

type LayoutProps = {
  children: React.ReactNode
}
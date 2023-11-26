"use client"

import Navbar from '@/components/navbar'
import Disclaimer from '@/components/disclaimer'
import { Toaster } from '@/components/ui/toaster'
import Providers from './providers'
import Mouse from './mouse'

export default function Layout({ children }: { children: React.ReactNode }) {  
  return (
    <Providers>
      <Disclaimer />
      <div className="w-screen h-screen overflow-hidden p-4 flex justify-center items-center">
        {children}
      </div>
      <Navbar />
      <Mouse />
      <Toaster />
    </Providers>
  )
}

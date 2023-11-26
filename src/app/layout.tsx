"use client"

import Navbar from '@/components/navbar'
import './globals.css'
import Disclaimer from '@/components/disclaimer'
import Mouse from '@/components/mouse'
import { useEffect, useState } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SessionProvider } from "next-auth/react";
import { Toaster } from '@/components/ui/toaster'
import { UserProvider, useUser } from '@/components/context/userContext'
import { SettingsProvider } from '@/components/context/settingsContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <title>Bubu & Dudu Time</title>
          <meta name="description" content='Get matching profile pictures for you and your partner(s) :D' />
          <link rel="icon" href='/images/bubu.png' />
          <link rel="shortcut icon" href='/images/bubu.png' />
          <link rel="apple-touch-icon" href='/images/bubu.png' />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#121212" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body style={{ overflow: "hidden" }}>
          <Mouse />
          <Disclaimer />
          <div className="w-screen h-screen overflow-hidden p-4 flex justify-center items-center">
            {children}
          </div>
          <Navbar />
          <Toaster />
        </body>
      </html>
    </Providers>
  )
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SessionProvider>
        <UserProvider>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </UserProvider>
      </SessionProvider>
    </TooltipProvider>
  )
}

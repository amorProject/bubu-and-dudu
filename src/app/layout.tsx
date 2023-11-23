"use client"

import Navbar from '@/components/navbar'
import './globals.css'
import type { Metadata } from 'next'
import Disclaimer from '@/components/disclaimer'
import Mouse from '@/components/mouse'
import { useEffect, useState } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SessionProvider } from "next-auth/react";
import { Profile } from '@/lib/auth'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Bubu & Dudu Time',
  description: 'Get matching profile pictures for you and your partner(s) :D',
  icons: {
    icon: '/bubu.png',
    shortcut: '/bubu.png',
    apple: '/bubu.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [areStarsEnabled, setAreStarsEnabled] = useState<boolean>(true);
  const [user, setUser] = useState<Profile | null>(null);

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return;
        setUser(data);
      });
  }, []);

  return (
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
        <Providers>
          {areStarsEnabled && ( <Mouse /> )}
          <Disclaimer />
          <div className="w-screen h-screen overflow-hidden p-4 flex justify-center items-center">
            {children}
          </div>
          <Navbar starsEnabled={areStarsEnabled} setStarsEnabled={setAreStarsEnabled} user={user} />
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SessionProvider>
        {children}
      </SessionProvider>
    </TooltipProvider>
  )
}

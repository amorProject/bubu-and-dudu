"use client"

import Navbar from '@/components/navbar'
import './globals.css'
import Disclaimer from '@/components/disclaimer'
import Mouse from '@/components/mouse'
import { useContext, useEffect, useState } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SessionProvider } from "next-auth/react";
import { Toaster } from '@/components/ui/toaster'
import { UserContext, UserProvider } from '@/components/context/userContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [areStarsEnabled, setAreStarsEnabled] = useState<boolean>(true);
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch('/api/user');
      const data = await response.json();
      setUser(data.error ? null : data);
      console.log(user)
    }
  fetchUser()
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
        <UserProvider>
          {children}
        </UserProvider>
      </SessionProvider>
    </TooltipProvider>
  )
}

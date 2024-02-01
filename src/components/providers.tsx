"use client"

import { SessionProvider } from "next-auth/react"
import * as React from "react"
import { SelectedProvider } from "./providers/selected"

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <SelectedProvider>
        {children}
      </SelectedProvider>
    </SessionProvider>
  )
}

type ProvidersProps = {
  children: React.ReactNode
}

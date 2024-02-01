"use client"

import { SessionProvider } from "next-auth/react"
import * as React from "react"
import { SelectedProvider } from "./providers/selected"
import { Triangle } from "react-loader-spinner"

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <React.Suspense fallback={
        <div className="flex items-center justify-center h-screen">
          <Triangle color="#4F46E5" height={100} width={100} />
        </div>
      }>
        <SelectedProvider>
          {children}
        </SelectedProvider>
      </React.Suspense>
    </SessionProvider>
  )
}

type ProvidersProps = {
  children: React.ReactNode
}

import Navbar from '@/components/navbar'
import './globals.css'
import type { Metadata } from 'next'
import Disclaimer from '@/components/disclaimer'


export const metadata: Metadata = {
  title: 'Bubu & Dudu Time',
  description: 'Get matching profile pictures for you and your partner :D',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Disclaimer />
        <div className="w-screen h-screen overflow-hidden p-4 justify-center">
          {children}
        </div>
        <Navbar />
      </body>
    </html>
  )
}

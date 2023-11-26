import './globals.css'
import { Metadata } from 'next'
import Layout from '@/components/layout'

export const metadata: Metadata = {
  title: 'Bubu & Dudu Time',
  icons: {
    icon: '/images/bubu.png',
    apple: '/images/bubu.png',
    shortcut: '/images/bubu.png',
  },
  themeColor: '#121212',
  description: 'Get matching profile pictures for you and your partner(s) :D',
  keywords: 'bubu,bubuanddudu,dudu,budududu,matching,match,pfp,status,discord,discord pfp,matching pfp,cute,cutepfp,cute pfp,',
  robots: 'index',
  authors: [
    { name: 'fabra', url: 'https://github.com/ivanoliverfabra' },
    { name: 'yakisn0w', url: 'https://github.com/yakisn0w' },
    { name: 'AmorProject', url: 'https://github.com/amorproject' }
  ],
  openGraph: {
    type: 'website',
    title: 'Bubu & Dudu Time',
    description: 'Get matching profile pictures for you and your partner(s) :D',
    images: [
      {
        url: '/images/bubu.png',
        width: 512,
        height: 512,
        alt: 'Bubu & Dudu Time',
      }
    ],
    siteName: 'Bubu & Dudu Time',
    url: 'https://fabra.gay'
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      '/images/bubu.png'
    ],
    title: 'Bubu & Dudu Time',
    description: 'Get matching profile pictures for you and your partner(s) :D'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ overflow: "hidden" }}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
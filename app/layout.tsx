import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dynamic Showcase | Tesla-Inspired Layout',
  description: 'A modern, customizable showcase website inspired by Tesla\'s design language',
  keywords: 'showcase, tesla, modern, customizable, dynamic',
  authors: [{ name: 'Dynamic Showcase Team' }],
  openGraph: {
    title: 'Dynamic Showcase',
    description: 'A modern, customizable showcase website inspired by Tesla\'s design language',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
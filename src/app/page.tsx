'use client'

import { useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import { ContentProvider } from './Context/ContentContext'

export default function Home() {
  const [isAdminOpen, setIsAdminOpen] = useState(false)

  return (
    <ContentProvider>
      <main className="min-h-screen">
        <Navigation onAdminClick={() => setIsAdminOpen(true)} />
        <Hero />
        <h1 className="text-4xl font-bold text-center py-20">Test Page</h1>
        <p className="text-center">If you can see this, the basic setup is working.</p>
      </main>
    </ContentProvider>
  )
}

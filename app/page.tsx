'use client'

import { useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Features from './components/Features'
import Gallery from './components/Gallery'
import Statistics from './components/Statistics'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'
import { ContentProvider } from './context/ContentContext'

export default function Home() {
  const [isAdminOpen, setIsAdminOpen] = useState(false)

  return (
    <ContentProvider>
      <main className="min-h-screen">
        <Navigation onAdminClick={() => setIsAdminOpen(true)} />
        <Hero />
        <Features />
        <Gallery />
        <Statistics />
        <Footer />
        <AdminPanel 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
        />
      </main>
    </ContentProvider>
  )
}
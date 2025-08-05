'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface HeroContent {
  title: string
  subtitle: string
  imageUrl: string
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
}

export interface GalleryItem {
  id: string
  title: string
  imageUrl: string
  description: string
}

export interface Statistic {
  id: string
  value: string
  label: string
}

interface ContentContextType {
  hero: HeroContent
  features: Feature[]
  gallery: GalleryItem[]
  statistics: Statistic[]
  updateHero: (hero: HeroContent) => void
  addFeature: (feature: Omit<Feature, 'id'>) => void
  removeFeature: (id: string) => void
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void
  removeGalleryItem: (id: string) => void
  addStatistic: (stat: Omit<Statistic, 'id'>) => void
  removeStatistic: (id: string) => void
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

const defaultHero: HeroContent = {
  title: 'Dynamic Content Showcase',
  subtitle: 'Experience the future of customizable web layouts',
  imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
}

const defaultFeatures: Feature[] = [
  {
    id: '1',
    title: 'Lightning Fast',
    description: 'Built with performance in mind, delivering exceptional speed and efficiency.',
    icon: '⚡'
  },
  {
    id: '2',
    title: 'Fully Customizable',
    description: 'Tailor every aspect of your content to match your unique vision and brand.',
    icon: '🎨'
  },
  {
    id: '3',
    title: 'Modern Design',
    description: 'Clean, contemporary aesthetics inspired by the best in modern web design.',
    icon: '✨'
  }
]

const defaultGallery: GalleryItem[] = [
  {
    id: '1',
    title: 'Innovation',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Pushing boundaries with cutting-edge technology'
  },
  {
    id: '2',
    title: 'Design Excellence',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Crafted with attention to every detail'
  },
  {
    id: '3',
    title: 'User Experience',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Intuitive interfaces that delight users'
  }
]

const defaultStatistics: Statistic[] = [
  { id: '1', value: '50,000+', label: 'Active Users' },
  { id: '2', value: '99.9%', label: 'Uptime' },
  { id: '3', value: '24/7', label: 'Support' },
  { id: '4', value: '150+', label: 'Countries' }
]

export function ContentProvider({ children }: { children: ReactNode }) {
  const [hero, setHero] = useState<HeroContent>(defaultHero)
  const [features, setFeatures] = useState<Feature[]>(defaultFeatures)
  const [gallery, setGallery] = useState<GalleryItem[]>(defaultGallery)
  const [statistics, setStatistics] = useState<Statistic[]>(defaultStatistics)

  const updateHero = (newHero: HeroContent) => {
    setHero(newHero)
  }

  const addFeature = (feature: Omit<Feature, 'id'>) => {
    const newFeature = { ...feature, id: Date.now().toString() }
    setFeatures(prev => [...prev, newFeature])
  }

  const removeFeature = (id: string) => {
    setFeatures(prev => prev.filter(feature => feature.id !== id))
  }

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() }
    setGallery(prev => [...prev, newItem])
  }

  const removeGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(item => item.id !== id))
  }

  const addStatistic = (stat: Omit<Statistic, 'id'>) => {
    const newStat = { ...stat, id: Date.now().toString() }
    setStatistics(prev => [...prev, newStat])
  }

  const removeStatistic = (id: string) => {
    setStatistics(prev => prev.filter(stat => stat.id !== id))
  }

  return (
    <ContentContext.Provider
      value={{
        hero,
        features,
        gallery,
        statistics,
        updateHero,
        addFeature,
        removeFeature,
        addGalleryItem,
        removeGalleryItem,
        addStatistic,
        removeStatistic,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}
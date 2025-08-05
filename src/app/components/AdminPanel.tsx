
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContent } from '../Context/ContentContext'
import { X, Plus, Trash2, Edit3, Image, BarChart3, Star, Save } from 'lucide-react'

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

type TabType = 'hero' | 'features' | 'gallery' | 'statistics'

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const {
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
  } = useContent()

  const [activeTab, setActiveTab] = useState<TabType>('hero')
  const [heroForm, setHeroForm] = useState(hero)
  const [featureForm, setFeatureForm] = useState({
    title: '',
    description: '',
    icon: '⚡',
  })
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    imageUrl: '',
    description: '',
  })
  const [statForm, setStatForm] = useState({
    value: '',
    label: '',
  })

  const tabs = [
    { id: 'hero' as TabType, label: 'Hero Section', icon: Star },
    { id: 'features' as TabType, label: 'Features', icon: Edit3 },
    { id: 'gallery' as TabType, label: 'Gallery', icon: Image },
    { id: 'statistics' as TabType, label: 'Statistics', icon: BarChart3 },
  ]

  const handleHeroUpdate = () => {
    updateHero(heroForm)
    alert('Hero section updated successfully!')
  }

  const handleAddFeature = () => {
    if (featureForm.title && featureForm.description) {
      addFeature(featureForm)
      setFeatureForm({ title: '', description: '', icon: '⚡' })
      alert('Feature added successfully!')
    } else {
      alert('Please fill in all fields')
    }
  }

  const handleAddGalleryItem = () => {
    if (galleryForm.title && galleryForm.imageUrl && galleryForm.description) {
      addGalleryItem(galleryForm)
      setGalleryForm({ title: '', imageUrl: '', description: '' })
      alert('Gallery item added successfully!')
    } else {
      alert('Please fill in all fields')
    }
  }

  const handleAddStatistic = () => {
    if (statForm.value && statForm.label) {
      addStatistic(statForm)
      setStatForm({ value: '', label: '' })
      alert('Statistic added successfully!')
    } else {
      alert('Please fill in all fields')
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-tesla-black text-white p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Edit3 className="text-tesla-blue" size={24} />
              <h2 className="text-xl font-bold">Content Management</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-tesla-blue border-b-2 border-tesla-blue bg-white'
                      : 'text-gray-600 hover:text-tesla-blue'
                  }`}
                >
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
            {/* Hero Tab */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-tesla-black">Hero Section Settings</h3>
                
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={heroForm.title}
                      onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tesla-blue"
                      placeholder="Enter hero title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={heroForm.subtitle}
                      onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tesla-blue"
                      placeholder="Enter hero subtitle"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Image URL
                    </label>
                    <input
                      type="url"
                      value={heroForm.imageUrl}
                      onChange={(e) => setHeroForm({ ...heroForm, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tesla-blue"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <button
                    onClick={handleHeroUpdate}
                    className="flex items-center justify-center space-x-2 bg-tesla-blue text-white px-6 py-3 rounded-lg hover:bg-tesla-blue/90 transition-colors"
                  >
                    <Save size={16} />
                    <span>Update Hero Section</span>
                  </button>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-tesla-black">Features Management</h3>
                
                {/* Add Feature Form */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-4">Add New Feature</h4>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Feature Title
                      </label>
                      <input
                        type="text"
                        value={featureForm.title}
                        onChange={(e) => setFeatureForm({ ...featureForm, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tesla-blue"
                        placeholder="Enter feature title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={featureForm.description}
                        onChange={(e) => setFeatureForm({ ...featureForm, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tesla-blue"
                        placeholder="Enter feature description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon (emoji or symbol)
                      </label>
                      <input
                        type="text"
                        value={featureForm.icon}
                        onChange={(e) => setFeatureForm({ ...featureForm, icon: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tesla-blue"
                        placeholder="⚡"
                      />
                    </div>

                    <button
                      onClick={handleAddFeature}
                      className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Plus size={16} />
                      <span>Add Feature</span>
                    </button>
                  </div>
                </div>

                {/* Features List */}
                <div>
                  <h4 className="font-medium mb-4">Current Features ({features.length})</h4>
                  <div className="space-y-3">
                    {features.map((feature) => (
                      <div key={feature.id} className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                         <span className="text-2xl">{feature.icon}</span>
                          <div>
                            <h5 className="font-medium">{feature.title}</h5>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFeature(feature.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-tesla-black">Gallery Management</h3>
                
                {/* Add Gallery Item Form */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-4">Add New Gallery Item</h4>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Title
                      </label>
                      <input
                        type="text"
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tesla-blue"
                        placeholder="Enter image title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={galleryForm.imageUrl}
                        onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tesla-blue"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={galleryForm.description}
                        onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tesla-blue"
                        placeholder="Enter image description"
                      />
                    </div>

                    <button
                      onClick={handleAddGalleryItem}
                      className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Plus size={16} />
                      <span>Add Gallery Item</span>
                    </button>
                  </div>
                </div>

                {/* Gallery Items List */}
                <div>
                  <h4 className="font-medium mb-4">Current Gallery Items ({gallery.length})</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {gallery.map((item) => (
                      <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="aspect-video bg-gray-100 relative">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium">{item.title}</h5>
                            <button
                              onClick={() => removeGalleryItem(item.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === 'statistics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-tesla-black">Statistics Management</h3>
                
                {/* Add Statistic Form */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-4">Add New Statistic</h4>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Value
                      </label>
                      <input
                        type="text"
                        value={statForm.value}
                        onChange={(e) => setStatForm({ ...statForm, value: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tesla-blue"
                        placeholder="e.g., 50,000+, 99.9%, 24/7"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Label
                      </label>
                     <input
                        type="text"
                        value={statForm.label}
                        onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tesla-blue"
                        placeholder="e.g., Active Users, Uptime, Support"
                      />
                    </div>

                    <button
                      onClick={handleAddStatistic}
                      className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Plus size={16} />
                      <span>Add Statistic</span>
                    </button>
                  </div>
                </div>

                {/* Statistics List */}
                <div>
                  <h4 className="font-medium mb-4">Current Statistics ({statistics.length})</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {statistics.map((stat) => (
                      <div key={stat.id} className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                       <div className="text-center">
                          <div className="text-2xl font-bold text-tesla-blue">{stat.value}</div>
                          <div className="text-sm text-gray-600 uppercase tracking-wide">{stat.label}</div>
                        </div>
                        <button
                          onClick={() => removeStatistic(stat.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

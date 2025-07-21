'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Heart, Search, Baby } from 'lucide-react'
import { useItems } from '@/hooks/useItems'
import { ItemCard } from '@/components/ItemCard'
import { AddItemForm } from '@/components/AddItemForm'

export default function Home() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterPurchased, setFilterPurchased] = useState<'all' | 'available' | 'purchased'>('all')
  
  const { data: items = [], isLoading, error } = useItems()

  // Filter items based on search and filters
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = !filterCategory || item.category === filterCategory
    
    const matchesPurchased = filterPurchased === 'all' ||
                           (filterPurchased === 'available' && !item.purchased) ||
                           (filterPurchased === 'purchased' && item.purchased)
    
    return matchesSearch && matchesCategory && matchesPurchased
  })

  const categories = [...new Set(items.map(item => item.category).filter(Boolean))] as string[]
  const totalItems = items.length
  const purchasedItems = items.filter(item => item.purchased).length
  const progressPercentage = totalItems > 0 ? (purchasedItems / totalItems) * 100 : 0

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-baby-neutral-800 mb-2">Something went wrong</h2>
          <p className="text-baby-neutral-600">Unable to load the registry items.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-baby border-b border-baby-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-4xl"
              >
                👶
              </motion.div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-baby-blue-600 to-baby-pink-600 bg-clip-text text-transparent">
                  Baby Shower Registry
                </h1>
                <p className="text-baby-neutral-600 mt-1">
                  Help us welcome our little bundle of joy! 💕
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Progress */}
              <div className="bg-baby-blue-50 rounded-xl p-4 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="text-baby-pink-500" size={16} />
                  <span className="text-sm font-medium text-baby-neutral-700">
                    Progress
                  </span>
                </div>
                <div className="bg-baby-neutral-200 rounded-full h-2 mb-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-gradient-to-r from-baby-blue-500 to-baby-pink-500 h-2 rounded-full"
                  />
                </div>
                <p className="text-xs text-baby-neutral-600">
                  {purchasedItems} of {totalItems} items purchased
                </p>
              </div>

              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-baby-blue-500 to-baby-pink-500 text-white px-6 py-3 rounded-xl hover:from-baby-blue-600 hover:to-baby-pink-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
              >
                <Plus size={20} />
                Add Item
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-baby p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-baby-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-baby-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border border-baby-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent transition-all"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Purchased Filter */}
            <select
              value={filterPurchased}
              onChange={(e) => setFilterPurchased(e.target.value as 'all' | 'available' | 'purchased')}
              className="px-4 py-3 border border-baby-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">All Items</option>
              <option value="available">Available</option>
              <option value="purchased">Purchased</option>
            </select>
          </div>
        </div>

        {/* Items Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="text-4xl mb-4"
              >
                🍼
              </motion.div>
              <p className="text-baby-neutral-600">Loading your registry...</p>
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">
              {items.length === 0 ? '📝' : '🔍'}
            </div>
            <h3 className="text-xl font-semibold text-baby-neutral-800 mb-2">
              {items.length === 0 ? 'No items yet' : 'No items found'}
            </h3>
            <p className="text-baby-neutral-600 mb-6">
              {items.length === 0 
                ? "Start building your registry by adding your first item!"
                : "Try adjusting your search or filters."
              }
            </p>
            {items.length === 0 && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-baby-blue-500 to-baby-pink-500 text-white px-6 py-3 rounded-xl hover:from-baby-blue-600 hover:to-baby-pink-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 font-medium mx-auto"
              >
                <Plus size={20} />
                Add Your First Item
              </button>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ItemCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Add Item Form Modal */}
      <AddItemForm 
        isOpen={showAddForm} 
        onClose={() => setShowAddForm(false)} 
      />

      {/* Footer */}
      <footer className="bg-white border-t border-baby-neutral-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Baby className="text-baby-blue-500" size={24} />
              <span className="text-lg font-semibold text-baby-neutral-700">
                Baby Shower Registry
              </span>
            </div>
            <p className="text-baby-neutral-600">
              Thank you for helping us prepare for our little one! 💕
            </p>
            <div className="mt-4 text-xs text-baby-neutral-500">
              Built with love using Next.js, Tailwind CSS, and lots of baby emojis 👶
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

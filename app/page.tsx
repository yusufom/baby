'use client'

import React, { useState, useEffect } from 'react'
import { Plus, ShoppingCart, CheckCircle, ExternalLink, Baby, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import SampleData from '../components/SampleData'

const CATEGORIES = [
  'All',
  'Feeding',
  'Sleeping',
  'Diapering',
  'Baby Gear',
  'Health & Safety',
  'Bathing',
  'Nursery & Decor',
  'Clothing',
]

interface Item {
  id: string
  name: string
  description: string
  amazonLink: string
  price: string
  imageUrl?: string
  isPurchased: boolean
  purchasedBy?: string
  category: string
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    amazonLink: '',
    price: '',
    imageUrl: '',
    category: 'Feeding',
  })
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')
  const [filterPurchased, setFilterPurchased] = useState<'all' | 'purchased' | 'not_purchased'>('all')

  // Load items from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('babyShowerItems')
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    }
  }, [])

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('babyShowerItems', JSON.stringify(items))
  }, [items])

  const addItem = () => {
    if (!newItem.name || !newItem.amazonLink) return

    const item: Item = {
      id: Date.now().toString(),
      name: newItem.name,
      description: newItem.description,
      amazonLink: newItem.amazonLink,
      price: newItem.price,
      imageUrl: newItem.imageUrl,
      isPurchased: false,
      category: newItem.category,
    }

    setItems([...items, item])
    setNewItem({ name: '', description: '', amazonLink: '', price: '', imageUrl: '', category: 'Feeding' })
    setShowAddForm(false)
  }

  const togglePurchased = (id: string) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, isPurchased: !item.isPurchased, purchasedBy: !item.isPurchased ? 'Anonymous' : undefined }
        : item
    ))
  }

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const addSampleData = () => {
    const sampleItems: Item[] = [
      {
        id: '1',
        name: 'Baby Monitor',
        description: 'Smart baby monitor with night vision and two-way audio',
        amazonLink: 'https://www.amazon.com/dp/B08N5WRWNW',
        price: '$89.99',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L._AC_SL1500_.jpg',
        isPurchased: false,
        category: 'Health & Safety',
      },
      {
        id: '2',
        name: 'Diaper Bag',
        description: 'Large capacity diaper bag with changing pad and insulated bottle pockets',
        amazonLink: 'https://www.amazon.com/dp/B07FZ8S74R',
        price: '$45.99',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L._AC_SL1500_.jpg',
        isPurchased: false,
        category: 'Diapering',
      },
      {
        id: '3',
        name: 'Baby Bottles Set',
        description: 'Set of 6 anti-colic baby bottles with slow flow nipples',
        amazonLink: 'https://www.amazon.com/dp/B00X4WHP5E',
        price: '$24.99',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L._AC_SL1500_.jpg',
        isPurchased: false,
        category: 'Feeding',
      },
      {
        id: '4',
        name: 'Baby Crib',
        description: 'Convertible crib that grows with your baby from newborn to toddler',
        amazonLink: 'https://www.amazon.com/dp/B07FZ8S74R',
        price: '$199.99',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L._AC_SL1500_.jpg',
        isPurchased: false,
        category: 'Sleeping',
      },
      {
        id: '5',
        name: 'Baby Clothes Set',
        description: 'Organic cotton baby clothes set with 5 onesies and 3 sleepers',
        amazonLink: 'https://www.amazon.com/dp/B00X4WHP5E',
        price: '$34.99',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L._AC_SL1500_.jpg',
        isPurchased: false,
        category: 'Clothing',
      }
    ]
    setItems(sampleItems)
  }

  // Filtering and sorting logic
  let filteredItems = items
  if (selectedCategory !== 'All') {
    filteredItems = filteredItems.filter(item => item.category === selectedCategory)
  }
  if (filterPurchased === 'purchased') {
    filteredItems = filteredItems.filter(item => item.isPurchased)
  } else if (filterPurchased === 'not_purchased') {
    filteredItems = filteredItems.filter(item => !item.isPurchased)
  }
  if (sortBy === 'price_asc') {
    filteredItems = [...filteredItems].sort((a, b) => parseFloat(a.price.replace(/[^\d.]/g, '')) - parseFloat(b.price.replace(/[^\d.]/g, '')))
  } else if (sortBy === 'price_desc') {
    filteredItems = [...filteredItems].sort((a, b) => parseFloat(b.price.replace(/[^\d.]/g, '')) - parseFloat(a.price.replace(/[^\d.]/g, '')))
  } else if (sortBy === 'name') {
    filteredItems = [...filteredItems].sort((a, b) => a.name.localeCompare(b.name))
  }

  const purchasedCount = items.filter(item => item.isPurchased).length
  const totalCount = items.length

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Baby className="w-12 h-12 text-soft-blue mr-3 animate-bounce-gentle" />
            <h1 className="text-4xl font-bold gradient-text">Baby Shower Registry</h1>
            <Heart className="w-12 h-12 text-soft-pink ml-3 animate-bounce-gentle" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to our baby shower registry! Browse through our carefully selected items 
            and help us prepare for our little one's arrival. 💕
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Progress: {purchasedCount} of {totalCount} items purchased
            </span>
            <span className="text-sm text-gray-500">
              {totalCount > 0 ? Math.round((purchasedCount / totalCount) * 100) : 0}%
            </span>
          </div>
          <div className="w-full bg-white rounded-full h-3 baby-shadow">
            <div 
              className="bg-gradient-to-r from-soft-blue to-soft-pink h-3 rounded-full transition-all duration-500"
              style={{ width: `${totalCount > 0 ? (purchasedCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Sample Data Component */}
        {items.length === 0 && (
          <SampleData onAddSampleData={addSampleData} />
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-full font-medium transition-all duration-200',
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-soft-blue to-soft-pink text-white shadow'
                  : 'bg-white text-gray-700 baby-shadow hover:baby-shadow-hover'
              )}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-2 text-xs text-gray-400 font-normal">(
                  {items.filter(item => item.category === cat).length}
                )</span>
              )}
            </button>
          ))}
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <div>
            <label className="mr-2 text-sm text-gray-600">Sort:</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-soft-blue"
            >
              <option value="default">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
          <div>
            <label className="mr-2 text-sm text-gray-600">Show:</label>
            <select
              value={filterPurchased}
              onChange={e => setFilterPurchased(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-soft-blue"
            >
              <option value="all">All</option>
              <option value="not_purchased">Not Purchased</option>
              <option value="purchased">Purchased</option>
            </select>
          </div>
        </div>

        {/* Add Item Button */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center px-6 py-3 bg-white rounded-full baby-shadow hover:baby-shadow-hover transition-all duration-300 text-gray-700 font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Item
          </button>
        </div>

        {/* Add Item Form */}
        {showAddForm && (
          <div className="mb-8 bg-white rounded-2xl p-6 baby-shadow animate-slide-up">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Item</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Item name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Price (e.g., $29.99)"
                value={newItem.price}
                onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
              />
              <input
                type="url"
                placeholder="Amazon link"
                value={newItem.amazonLink}
                onChange={(e) => setNewItem({...newItem, amazonLink: e.target.value})}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent md:col-span-2"
              />
              <textarea
                placeholder="Description (optional)"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent md:col-span-2"
                rows={3}
              />
              <input
                type="url"
                placeholder="Image URL (optional)"
                value={newItem.imageUrl}
                onChange={(e) => setNewItem({...newItem, imageUrl: e.target.value})}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent md:col-span-2"
              />
              <select
                value={newItem.category}
                onChange={e => setNewItem({...newItem, category: e.target.value})}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
              >
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={addItem}
                className="px-6 py-2 bg-gradient-to-r from-soft-blue to-soft-pink text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Add Item
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={cn(
                "bg-white rounded-2xl p-6 baby-shadow card-hover",
                item.isPurchased && "opacity-75"
              )}
            >
              {/* Item Image */}
              {item.imageUrl && (
                <div className="mb-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}

              {/* Item Content */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800 flex-1">
                  {item.name}
                </h3>
                {item.isPurchased && (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 ml-2" />
                )}
              </div>

              {item.category && (
                <span className="inline-block text-xs px-2 py-1 rounded-full bg-baby-blue text-gray-700 mb-2">
                  {item.category}
                </span>
              )}

              {item.description && (
                <p className="text-gray-600 mb-3 text-sm">
                  {item.description}
                </p>
              )}

              {item.price && (
                <p className="text-lg font-bold text-soft-blue mb-4">
                  {item.price}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <a
                  href={item.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-soft-blue to-soft-pink text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy on Amazon
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
                
                <button
                  onClick={() => togglePurchased(item.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                    item.isPurchased
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {item.isPurchased ? "Purchased" : "Mark Purchased"}
                </button>
              </div>

              {/* Purchased Info */}
              {item.isPurchased && item.purchasedBy && (
                <p className="text-sm text-green-600 mt-2">
                  Purchased by {item.purchasedBy}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Baby className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No items yet</h3>
            <p className="text-gray-400">Add some items to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}
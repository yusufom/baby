'use client'

import { Item } from '@prisma/client'
import { ExternalLink, Heart, Check, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useUpdateItem } from '@/hooks/useItems'
import { useState } from 'react'
import Image from 'next/image'

interface ItemCardProps {
  item: Item
}

const priorityColors = {
  HIGH: 'bg-baby-pink-100 text-baby-pink-700 border-baby-pink-200',
  MEDIUM: 'bg-baby-blue-100 text-baby-blue-700 border-baby-blue-200',
  LOW: 'bg-baby-yellow-100 text-baby-yellow-700 border-baby-yellow-200',
}

const priorityIcons = {
  HIGH: '🌟',
  MEDIUM: '⭐',
  LOW: '✨',
}

export function ItemCard({ item }: ItemCardProps) {
  const [purchaserName, setPurchaserName] = useState('')
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)
  const updateItem = useUpdateItem()

  const handlePurchaseClick = () => {
    if (item.purchased) return
    setShowPurchaseForm(true)
  }

  const handleMarkAsPurchased = () => {
    if (!purchaserName.trim()) return
    
    updateItem.mutate({
      id: item.id,
      data: {
        purchased: true,
        purchasedBy: purchaserName.trim(),
      }
    })
    
    setShowPurchaseForm(false)
    setPurchaserName('')
  }

  const handleMarkAsUnpurchased = () => {
    updateItem.mutate({
      id: item.id,
      data: {
        purchased: false,
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`relative bg-white rounded-2xl shadow-baby overflow-hidden transition-all duration-300 ${
        item.purchased ? 'opacity-75' : 'hover:shadow-baby-lg'
      }`}
    >
      {/* Purchase Badge */}
      {item.purchased && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg">
            <Check size={14} />
            Purchased
          </div>
        </div>
      )}

      {/* Priority Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[item.priority]} shadow-sm`}>
          <span className="mr-1">{priorityIcons[item.priority]}</span>
          {item.priority}
        </div>
      </div>

      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-baby-blue-100 to-baby-pink-100 flex items-center justify-center overflow-hidden">
        {item.imageUrl ? (
          <Image 
            src={item.imageUrl} 
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="text-6xl opacity-50">
            🍼
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-baby-neutral-800 mb-2 line-clamp-2">
            {item.name}
          </h3>
          
          {item.description && (
            <p className="text-baby-neutral-600 text-sm mb-3 line-clamp-3">
              {item.description}
            </p>
          )}

          <div className="flex items-center justify-between mb-4">
            {item.price && (
              <div className="text-xl font-bold text-baby-blue-600">
                ${item.price.toFixed(2)}
              </div>
            )}
            {item.category && (
              <div className="text-xs text-baby-neutral-500 bg-baby-neutral-100 px-2 py-1 rounded-full">
                {item.category}
              </div>
            )}
          </div>
        </div>

        {/* Purchased Info */}
        {item.purchased && item.purchasedBy && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 text-green-700 text-sm">
              <Heart size={14} className="text-green-500" />
              <span>
                Purchased by <strong>{item.purchasedBy}</strong>
              </span>
            </div>
            {item.purchasedAt && (
              <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <Clock size={12} />
                {new Date(item.purchasedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        )}

        {/* Purchase Form */}
        {showPurchaseForm && !item.purchased && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-baby-blue-50 border border-baby-blue-200 rounded-lg p-4 mb-4"
          >
            <label className="block text-sm font-medium text-baby-blue-800 mb-2">
              Your name (so the parents know who to thank! 💕)
            </label>
            <input
              type="text"
              value={purchaserName}
              onChange={(e) => setPurchaserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-baby-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent"
              autoFocus
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleMarkAsPurchased}
                disabled={!purchaserName.trim() || updateItem.isPending}
                className="flex-1 bg-baby-blue-500 text-white py-2 px-4 rounded-lg hover:bg-baby-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                {updateItem.isPending ? 'Marking...' : 'Mark as Purchased'}
              </button>
              <button
                onClick={() => setShowPurchaseForm(false)}
                className="px-4 py-2 border border-baby-neutral-300 text-baby-neutral-700 rounded-lg hover:bg-baby-neutral-50 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href={item.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-baby-blue-500 to-baby-pink-500 text-white py-3 px-4 rounded-xl hover:from-baby-blue-600 hover:to-baby-pink-600 transition-all duration-300 text-center font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <ExternalLink size={16} />
            View on Amazon
          </a>
          
          {!item.purchased ? (
            <button
              onClick={handlePurchaseClick}
              className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-colors shadow-md hover:shadow-lg"
              title="Mark as purchased"
            >
              <Check size={16} />
            </button>
          ) : (
            <button
              onClick={handleMarkAsUnpurchased}
              className="bg-baby-neutral-400 text-white p-3 rounded-xl hover:bg-baby-neutral-500 transition-colors shadow-md hover:shadow-lg"
              title="Mark as unpurchased"
            >
              <Clock size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
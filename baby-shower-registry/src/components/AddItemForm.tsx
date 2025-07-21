'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X, Package, DollarSign, Image, Link, Tag, Star } from 'lucide-react'
import { useCreateItem, CreateItemData } from '@/hooks/useItems'
import { Priority } from '@prisma/client'

interface AddItemFormProps {
  isOpen: boolean
  onClose: () => void
}

export function AddItemForm({ isOpen, onClose }: AddItemFormProps) {
  const [formData, setFormData] = useState<CreateItemData>({
    name: '',
    description: '',
    price: undefined,
    imageUrl: '',
    amazonUrl: '',
    category: '',
    priority: Priority.MEDIUM,
  })

  const createItem = useCreateItem()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.amazonUrl.trim()) {
      return
    }

    createItem.mutate(formData, {
      onSuccess: () => {
        setFormData({
          name: '',
          description: '',
          price: undefined,
          imageUrl: '',
          amazonUrl: '',
          category: '',
          priority: Priority.MEDIUM,
        })
        onClose()
      }
    })
  }

  const handleInputChange = (field: keyof CreateItemData, value: string | number | Priority | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-baby-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-baby-neutral-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-baby-neutral-800 flex items-center gap-2">
              <Plus className="text-baby-blue-500" size={24} />
              Add New Item
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-baby-neutral-100 rounded-full transition-colors"
            >
              <X size={20} className="text-baby-neutral-500" />
            </button>
          </div>
          <p className="text-baby-neutral-600 mt-1">
            Add a new item to your baby shower registry
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-baby-neutral-700 mb-2 flex items-center gap-2">
              <Package size={16} className="text-baby-blue-500" />
              Item Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Baby Monitor, Stroller, Diapers"
              className="w-full px-4 py-3 border border-baby-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-baby-neutral-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of the item..."
              rows={3}
              className="w-full px-4 py-3 border border-baby-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Price and Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-baby-neutral-700 mb-2 flex items-center gap-2">
                <DollarSign size={16} className="text-baby-green-500" />
                Price
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price || ''}
                onChange={(e) => handleInputChange('price', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0.00"
                className="w-full px-4 py-3 border border-baby-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-baby-neutral-700 mb-2 flex items-center gap-2">
                <Tag size={16} className="text-baby-pink-500" />
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-baby-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select a category</option>
                <option value="Clothing">Clothing</option>
                <option value="Feeding">Feeding</option>
                <option value="Diapers & Care">Diapers & Care</option>
                <option value="Toys">Toys</option>
                <option value="Furniture">Furniture</option>
                <option value="Safety">Safety</option>
                <option value="Bath Time">Bath Time</option>
                <option value="Travel">Travel</option>
                <option value="Books">Books</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-baby-neutral-700 mb-2 flex items-center gap-2">
              <Star size={16} className="text-baby-yellow-500" />
              Priority
            </label>
            <div className="grid grid-cols-3 gap-3">
              {Object.values(Priority).map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => handleInputChange('priority', priority)}
                  className={`p-3 rounded-xl border-2 transition-all font-medium text-sm ${
                    formData.priority === priority
                      ? priority === Priority.HIGH
                        ? 'border-baby-pink-300 bg-baby-pink-100 text-baby-pink-700'
                        : priority === Priority.MEDIUM
                        ? 'border-baby-blue-300 bg-baby-blue-100 text-baby-blue-700'
                        : 'border-baby-yellow-300 bg-baby-yellow-100 text-baby-yellow-700'
                      : 'border-baby-neutral-200 bg-white text-baby-neutral-600 hover:border-baby-neutral-300'
                  }`}
                >
                  <div className="text-lg mb-1">
                    {priority === Priority.HIGH ? '🌟' : priority === Priority.MEDIUM ? '⭐' : '✨'}
                  </div>
                  {priority}
                </button>
              ))}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-baby-neutral-700 mb-2 flex items-center gap-2">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image size={16} className="text-baby-purple-500" />
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border border-baby-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-baby-neutral-500 mt-1">
              Optional: Link to an image of the item
            </p>
          </div>

          {/* Amazon URL */}
          <div>
            <label className="block text-sm font-medium text-baby-neutral-700 mb-2 flex items-center gap-2">
              <Link size={16} className="text-baby-orange-500" />
              Amazon URL *
            </label>
            <input
              type="url"
              value={formData.amazonUrl}
              onChange={(e) => handleInputChange('amazonUrl', e.target.value)}
              placeholder="https://amazon.com/..."
              className="w-full px-4 py-3 border border-baby-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-baby-blue-500 focus:border-transparent transition-all"
              required
            />
            <p className="text-xs text-baby-neutral-500 mt-1">
              The Amazon link where people can purchase this item
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-baby-neutral-300 text-baby-neutral-700 rounded-xl hover:bg-baby-neutral-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createItem.isPending || !formData.name.trim() || !formData.amazonUrl.trim()}
              className="flex-1 bg-gradient-to-r from-baby-blue-500 to-baby-pink-500 text-white py-3 px-6 rounded-xl hover:from-baby-blue-600 hover:to-baby-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2"
            >
              {createItem.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Adding...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Add Item
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
'use client'

import React from 'react'
import { Baby, Heart, ShoppingCart } from 'lucide-react'

interface SampleDataProps {
  onAddSampleData: () => void
}

export default function SampleData({ onAddSampleData }: SampleDataProps) {
  return (
    <div className="bg-white rounded-2xl p-6 baby-shadow mb-8 animate-fade-in">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Baby className="w-8 h-8 text-soft-blue mr-2" />
          <h3 className="text-xl font-semibold text-gray-800">Welcome to Your Baby Shower Registry!</h3>
          <Heart className="w-8 h-8 text-soft-pink ml-2" />
        </div>
        <p className="text-gray-600 mb-4">
          Get started by adding some sample items to see how your registry will look.
        </p>
        <button
          onClick={onAddSampleData}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-soft-blue to-soft-pink text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add Sample Items
        </button>
      </div>
    </div>
  )
}
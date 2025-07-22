"use client";

import { useState } from "react";

interface PurchaseLink {
  id: string;
  label: string;
  url: string;
}

interface Purchase {
  id: string;
  name: string;
  message?: string;
  quantity: number;
}

interface RegistryItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  quantity: number;
  category: string;
  imageUrl: string;
  purchaseLinks: PurchaseLink[];
  purchases: Purchase[];
}

interface ItemCardProps {
  item: RegistryItem;
  onMarkPurchased: (itemId: string) => void;
}

export default function ItemCard({ item, onMarkPurchased }: ItemCardProps) {
  // Calculate purchased quantity
  const purchasedQuantity = item.purchases.reduce(
    (sum, purchase) => sum + purchase.quantity,
    0
  );
  const remainingQuantity = item.quantity - purchasedQuantity;
  const isFullyPurchased = remainingQuantity === 0;

  // Get buyer names for fully purchased items
  const buyerNames = isFullyPurchased
    ? [...new Set(item.purchases.map((p) => p.name))]
    : [];

  return (
    <div className="overflow-hidden rounded-lg bg-white border border-gray-200">
      <div className="relative">
        {/* Item Image */}
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-64 w-full object-cover"
        />

        {/* Status Badge */}
        {isFullyPurchased && (
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium text-green-600">
              <svg
                className="mr-1 h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Purchased
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-2 right-2 rounded-md bg-gray-800 bg-opacity-75 px-2 py-1 text-xs font-medium text-white">
          {item.category}
        </div>

        {/* Quantity Badge */}
        {!isFullyPurchased && (
          <div className="absolute bottom-2 right-2 rounded-md bg-black px-2 py-1 text-xs font-medium text-white">
            Qty: {remainingQuantity}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-1 text-lg font-medium text-gray-900">{item.name}</h3>

        {item.description && (
          <p className="mb-2 text-sm text-gray-600">
            {item.description.length > 80
              ? `${item.description.substring(0, 80)}...`
              : item.description}
          </p>
        )}

        {item.price && (
          <p className="mb-3 text-lg font-medium text-gray-900">
            ${item.price.toFixed(2)}
          </p>
        )}

        {isFullyPurchased ? (
          <button
            disabled
            className="w-full rounded-md bg-gray-100 py-2 px-4 text-center text-sm font-medium text-gray-500"
          >
            Already Purchased
          </button>
        ) : (
          <button
            onClick={() => onMarkPurchased(item.id)}
            className="w-full rounded-md bg-gray-100 py-2 px-4 text-center text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Mark as Purchased
          </button>
        )}

        {/* Buyer Names (if fully purchased) */}
        {isFullyPurchased && buyerNames.length > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            <span className="font-medium">Purchased by: </span>
            {buyerNames.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}

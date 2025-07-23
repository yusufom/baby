"use client";

import { useState } from "react";
import Image from "next/image";

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
  priority?: "high" | "medium" | "low";
}

interface ItemCardProps {
  item: RegistryItem;
  onMarkPurchased: (itemId: string) => void;
}

export default function ItemCard({ item, onMarkPurchased }: ItemCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  // Priority badge styling
  const priorityColors = {
    high: "bg-red-100 text-red-800 border border-red-300",
    medium: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    low: "bg-green-100 text-green-800 border border-green-300",
  };

  return (
    <div
      className="overflow-hidden rounded-lg gradient-card shadow transition-shadow hover:shadow-md card-hover h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Item Image */}
        <div className="h-[300px]">
          <Image
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-contain"
            fill={true}
            // layout="responsive"
          />
        </div>

        {/* Status Badge */}
        <div className="absolute top-2 left-2 rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm">
          {isFullyPurchased ? (
            <span className="flex items-center text-green-700">
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
          ) : (
            <span className="text-gray-800">Available</span>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 right-2 rounded-md gradient-primary px-2 py-1 text-xs font-medium text-white shadow-sm">
          {item.category}
        </div>

        {/* Priority Badge (if exists) */}
        {item.priority && (
          <div
            className={`absolute bottom-2 left-2 rounded-md px-2 py-1 text-xs font-medium shadow-sm ${
              priorityColors[item.priority]
            }`}
          >
            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}{" "}
            Priority
          </div>
        )}

        {/* Quantity Badge */}
        <div className="absolute bottom-2 right-2 rounded-md bg-gray-800 bg-opacity-90 px-2 py-1 text-xs font-medium text-white shadow-sm">
          Qty: {isFullyPurchased ? "0" : remainingQuantity}
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-1 text-lg font-medium text-gray-900">{item.name}</h3>

        <div className="h-[70px]">
          {item.description ? (
            <p className="mb-2 text-sm text-gray-700">
              {item.description.length > 100
                ? `${item.description.substring(0, 100)}...`
                : item.description}
            </p>
          ) : (
            <p>..</p>
          )}
        </div>

        <div className="h-[30px]">
          {item.price ? (
            <p className="mb-3 text-lg font-semibold text-gray-900">
              ${item.price.toFixed(2)}
            </p>
          ) : (
            <p>$ --</p>
          )}
        </div>

        {/* Purchase Links */}
        <div className="mb-4 space-y-2 ">
          {item.purchaseLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-md gradient-button py-2 px-4 text-sm font-medium text-white"
            >
              <svg
                className="mr-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Buy on {link.label}
            </a>
          ))}
        </div>

        {/* Mark as Purchased Button */}
        <button
          onClick={() => onMarkPurchased(item.id)}
          disabled={isFullyPurchased}
          className={`w-full rounded-md py-2 px-4 text-center text-sm font-medium ${
            isFullyPurchased
              ? "cursor-not-allowed bg-gray-200 text-gray-600"
              : "gradient-accent text-gray-800 hover:opacity-90"
          }`}
        >
          {isFullyPurchased ? "Already Purchased" : "Mark as Purchased"}
        </button>

        {/* Buyer Names (if fully purchased) */}
        {isFullyPurchased && buyerNames.length > 0 && (
          <div className="mt-2 text-xs text-gray-700">
            <span className="font-medium">Purchased by: </span>
            {buyerNames.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}

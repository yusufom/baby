"use client";

import { useState, useEffect } from "react";
import ItemCard from "@/components/ItemCard";
import MarkPurchasedModal from "@/components/MarkPurchasedModal";
import { useItems, useMarkItemPurchased } from "@/hooks/useItems";

interface PurchaseLink {
  id: string;
  label: string;
  url: string;
  itemId: string;
}

interface Purchase {
  id: string;
  name: string;
  message?: string;
  quantity: number;
  itemId: string;
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
  createdAt: string;
}

// Available categories for filtering
const categories = [
  "Nursery",
  "Clothes",
  "Feeding",
  "Toys",
  "Travel",
  "Bathing",
  "Books",
  "Other",
];

export default function Home() {
  const { data: items = [], isLoading, error: queryError } = useItems();
  const markPurchasedMutation = useMarkItemPurchased();

  const [filteredItems, setFilteredItems] = useState<RegistryItem[]>([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showPurchasedModal, setShowPurchasedModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);

  useEffect(() => {
    // Filter items when search term or category changes
    filterItems();
  }, [items, searchTerm, selectedCategory]);

  const filterItems = () => {
    let filtered = [...items];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          (item.description && item.description.toLowerCase().includes(term))
      );
    }

    setFilteredItems(filtered);
  };

  const handleMarkPurchased = (itemId: string) => {
    const item = items.find((item: RegistryItem) => item.id === itemId);
    if (item) {
      setSelectedItem(item);
      setShowPurchasedModal(true);
    }
  };

  const handlePurchaseSubmit = async (data: {
    name: string;
    quantity: number;
    message?: string;
  }) => {
    if (!selectedItem) return;

    try {
      await markPurchasedMutation.mutateAsync({
        id: selectedItem.id,
        data,
      });

      // Close the modal
      setShowPurchasedModal(false);
      setSelectedItem(null);
    } catch (err: unknown) {
      const error =
        err instanceof Error ? err.message : "Failed to mark item as purchased";
      throw new Error(error);
    }
  };

  // Calculate stats
  const totalItems = items.length;
  const purchasedItems = items.reduce((count: number, item: RegistryItem) => {
    const purchasedQty = item.purchases.reduce(
      (sum: number, p: Purchase) => sum + p.quantity,
      0
    );
    return purchasedQty > 0 ? count + 1 : count;
  }, 0);
  const remainingItems = totalItems - purchasedItems;

  // Format error message for display
  const errorMessage = error || (queryError ? String(queryError) : "");

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-baby-purple border-t-transparent"></div>
          <p className="text-lg text-gray-700">Loading registry items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-1">
                <span className="text-xl font-bold text-black">L+L</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold">
                  London&apos;s Baby Registry
                </h1>
                <p className="text-xs text-gray-300">Due December 5, 2025</p>
              </div>
            </div>
            <button className="rounded-full bg-white px-4 py-1 text-sm font-medium text-black">
              Share
            </button>
          </div>
        </div>
      </header>

      {/* Category Filters */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-2">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const count = items.filter(
                (item: RegistryItem) => item.category === category
              ).length;
              return (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category ? "" : category
                    )
                  }
                  className={`rounded-md px-3 py-1 text-sm font-medium ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m-8-8h16"
                />
              </svg>
              Price
            </button>

            <button className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                />
              </svg>
              Sort
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="relative mx-auto w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Total Items</span>
              <span className="font-medium text-gray-900">{totalItems}</span>
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-4 w-4 text-green-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Purchased</p>
                  <p className="font-medium text-green-600">{purchasedItems}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-100">
                  <svg
                    className="h-4 w-4 text-pink-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Remaining</p>
                  <p className="font-medium text-pink-600">{remainingItems}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {errorMessage && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
            {errorMessage}
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-lg bg-gray-50 p-6">
            <p className="text-gray-500">
              {searchTerm || selectedCategory
                ? "No items match your search or filter criteria."
                : "No registry items found."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onMarkPurchased={handleMarkPurchased}
              />
            ))}
          </div>
        )}
      </main>

      {/* Purchase Modal */}
      <MarkPurchasedModal
        isOpen={showPurchasedModal}
        onClose={() => {
          setShowPurchasedModal(false);
          setSelectedItem(null);
        }}
        onSubmit={handlePurchaseSubmit}
        item={selectedItem}
      />
    </div>
  );
}

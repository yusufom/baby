"use client";

import { useState, useEffect } from "react";
import ItemCard from "@/components/ItemCard";
import MarkPurchasedModal from "@/components/MarkPurchasedModal";
import { motion } from "framer-motion";
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

// Sample data for testing
const sampleItems: RegistryItem[] = [
  {
    id: "1",
    name: "Modern Baby Crib",
    description: "Beautiful white wooden crib with adjustable mattress height",
    price: 299.99,
    quantity: 1,
    category: "Nursery",
    imageUrl:
      "https://images.unsplash.com/photo-1586370434639-0fe43b4daa6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmFieSUyMGNyaWJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    purchaseLinks: [
      { id: "1", label: "Amazon", url: "https://amazon.com", itemId: "1" },
      { id: "2", label: "Target", url: "https://target.com", itemId: "1" },
    ],
    purchases: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Organic Cotton Onesies Set",
    description: "Pack of 5 organic cotton onesies in size 0-3 months",
    price: 24.99,
    quantity: 3,
    category: "Clothes",
    imageUrl:
      "https://images.unsplash.com/photo-1586370434639-0fe43b4daa6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmFieSUyMGNyaWJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    purchaseLinks: [
      { id: "3", label: "Amazon", url: "https://amazon.com", itemId: "2" },
    ],
    purchases: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Adjustable High Chair",
    description: "Modern wooden high chair that grows with your baby",
    price: 179.99,
    quantity: 1,
    category: "Feeding",
    imageUrl:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhpZ2glMjBjaGFpcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    purchaseLinks: [
      { id: "4", label: "Amazon", url: "https://amazon.com", itemId: "3" },
      { id: "5", label: "Walmart", url: "https://walmart.com", itemId: "3" },
    ],
    purchases: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Baby Carrier",
    description: "Ergonomic baby carrier with multiple carrying positions",
    price: 89.99,
    quantity: 2,
    category: "Travel",
    imageUrl:
      "https://images.unsplash.com/photo-1586370434639-0fe43b4daa6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmFieSUyMGNyaWJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    purchaseLinks: [
      { id: "6", label: "Amazon", url: "https://amazon.com", itemId: "4" },
    ],
    purchases: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Soft Play Mat",
    description: "Non-toxic foam play mat with colorful design",
    price: 49.99,
    quantity: 1,
    category: "Toys",
    imageUrl:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhpZ2glMjBjaGFpcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    purchaseLinks: [
      { id: "7", label: "Amazon", url: "https://amazon.com", itemId: "5" },
    ],
    purchases: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Changing Table",
    description: "Wooden changing table with storage drawers",
    price: 149.99,
    quantity: 1,
    category: "Nursery",
    imageUrl:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhpZ2glMjBjaGFpcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    purchaseLinks: [
      { id: "8", label: "Amazon", url: "https://amazon.com", itemId: "6" },
    ],
    purchases: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Smart Baby Monitor",
    description: "HD video monitor with night vision and two-way audio",
    price: 129.99,
    quantity: 1,
    category: "Nursery",
    imageUrl:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhpZ2glMjBjaGFpcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    purchaseLinks: [
      { id: "9", label: "Amazon", url: "https://amazon.com", itemId: "7" },
    ],
    purchases: [
      {
        id: "1",
        name: "John & Sarah",
        message: "Congrats on your baby!",
        quantity: 1,
        itemId: "7",
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Baby Bottle Set",
    description: "Set of 4 BPA-free baby bottles",
    price: 34.99,
    quantity: 1,
    category: "Feeding",
    imageUrl:
      "https://images.unsplash.com/photo-1586370434639-0fe43b4daa6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmFieSUyMGNyaWJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    purchaseLinks: [
      { id: "10", label: "Amazon", url: "https://amazon.com", itemId: "8" },
    ],
    purchases: [],
    createdAt: new Date().toISOString(),
  },
];

// Available categories for filtering
const categories = [
  "All",
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPurchasedModal, setShowPurchasedModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);

  useEffect(() => {
    // Filter items when search term or category changes
    filterItems();
  }, [items, searchTerm, selectedCategory]);

  const filterItems = () => {
    let filtered = [...items];

    // Filter by category
    if (selectedCategory !== "All") {
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
    } catch (err: any) {
      throw new Error(err.message || "Failed to mark item as purchased");
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
        <p className="text-lg">Loading registry items...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Hannah&apos;s Baby Registry
              </h1>
              <p className="text-sm text-gray-500">Due March 2024</p>
            </div>
            <a
              href="/admin/login"
              className="text-sm text-gray-600 hover:underline"
            >
              Admin
            </a>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="border-b border-gray-200 bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search registry items..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 6).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Total Items</span>
              <span className="font-semibold text-gray-900">{totalItems}</span>
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

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-5 w-5 text-green-600"
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
                  <p className="font-semibold text-green-600">
                    {purchasedItems}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                  <svg
                    className="h-5 w-5 text-orange-500"
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
                  <p className="font-semibold text-orange-500">
                    {remainingItems}
                  </p>
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
          <div className="flex h-40 items-center justify-center rounded-lg bg-white p-6 shadow">
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== "All"
                ? "No items match your search or filter criteria."
                : "No registry items found."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

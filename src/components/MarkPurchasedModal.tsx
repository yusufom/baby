"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface RegistryItem {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  purchases: any[];
}

interface MarkPurchasedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    quantity: number;
    message?: string;
  }) => Promise<void>;
  item: RegistryItem | null;
}

export default function MarkPurchasedModal({
  isOpen,
  onClose,
  onSubmit,
  item,
}: MarkPurchasedModalProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setName("");
      setQuantity(1);
      setMessage("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (quantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }

    if (item && quantity > item.quantity) {
      setError(`Maximum quantity available is ${item.quantity}`);
      return;
    }

    try {
      await onSubmit({ name, quantity, message });
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to mark as purchased");
    }
  };

  if (!isOpen || !item) return null;

  const remainingQuantity = item.quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md rounded-lg gradient-card p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Mark as Purchased
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <p className="font-medium text-gray-800">{item.name}</p>
          <p className="text-sm text-gray-700">
            Available: {remainingQuantity}{" "}
            {remainingQuantity > 1 ? "items" : "item"}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-800"
            >
              Your Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-400 p-2 text-gray-800 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="mb-1 block text-sm font-medium text-gray-800"
            >
              Quantity <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 0))
              }
              min={1}
              max={remainingQuantity}
              className="w-full rounded-md border border-gray-400 p-2 text-gray-800 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-gray-800"
            >
              Message (Optional)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-gray-400 p-2 text-gray-800 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Add a message to the registry owner"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md gradient-button px-4 py-2 text-sm font-medium text-white"
            >
              Mark as Purchased
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

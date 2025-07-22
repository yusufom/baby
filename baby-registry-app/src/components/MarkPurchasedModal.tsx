"use client";

import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate max available quantity
  const maxQuantity = item
    ? item.quantity - item.purchases.reduce((sum, p) => sum + p.quantity, 0)
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!item) return;

    // Validate form
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (quantity < 1 || quantity > maxQuantity) {
      setError(`Please enter a quantity between 1 and ${maxQuantity}`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onSubmit({
        name: name.trim(),
        quantity,
        message: message.trim() || undefined,
      });

      // Reset form
      setName("");
      setQuantity(1);
      setMessage("");
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to mark item as purchased");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Mark as Purchased
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <div className="mb-4 flex items-center">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="mr-3 h-16 w-16 rounded-md object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500">
              {maxQuantity} of {item.quantity} available
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Your Name*
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Quantity*
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              min="1"
              max={maxQuantity}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Add a personal message..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? "Submitting..." : "Mark as Purchased"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

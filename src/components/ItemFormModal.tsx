"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PurchaseLink {
  id?: string;
  label: string;
  url: string;
  itemId?: string;
}

interface RegistryItem {
  id?: string;
  name: string;
  description?: string;
  price?: number | null;
  quantity: number;
  category: string;
  imageUrl: string;
  purchaseLinks: PurchaseLink[];
}

interface ItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: RegistryItem) => Promise<void>;
  item?: RegistryItem;
}

const defaultItem: RegistryItem = {
  name: "",
  description: "",
  price: null,
  quantity: 1,
  category: "Nursery",
  imageUrl: "",
  purchaseLinks: [{ label: "Amazon", url: "" }],
};

const categories = [
  "Nursery",
  "Clothing",
  "Feeding",
  "Bathing",
  "Travel",
  "Toys",
  "Books",
  "Other",
];

export default function ItemFormModal({
  isOpen,
  onClose,
  onSave,
  item,
}: ItemFormModalProps) {
  const [formData, setFormData] = useState<RegistryItem>(defaultItem);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize form with item data if provided (for editing)
  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData(defaultItem);
    }
  }, [item, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantity" ? Number(value) || 0 : value,
    }));
  };

  const handleLinkChange = (
    index: number,
    field: "label" | "url",
    value: string
  ) => {
    const updatedLinks = [...formData.purchaseLinks];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      purchaseLinks: updatedLinks,
    }));
  };

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      purchaseLinks: [...prev.purchaseLinks, { label: "", url: "" }],
    }));
  };

  const removeLink = (index: number) => {
    const updatedLinks = [...formData.purchaseLinks];
    updatedLinks.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      purchaseLinks: updatedLinks,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.quantity ||
        !formData.category ||
        !formData.imageUrl
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Validate at least one purchase link
      if (formData.purchaseLinks.length === 0) {
        throw new Error("Please add at least one purchase link");
      }

      // Validate all purchase links have label and URL
      if (formData.purchaseLinks.some((link) => !link.label || !link.url)) {
        throw new Error("All purchase links must have both a label and URL");
      }

      await onSave(formData);
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to save item");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {item ? "Edit Item" : "Add New Item"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category*
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Quantity*
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Image URL*
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Purchase Links*
              </label>
              <button
                type="button"
                onClick={addLink}
                className="text-sm text-pink-500 hover:text-pink-700"
              >
                + Add Link
              </button>
            </div>

            {formData.purchaseLinks.map((link, index) => (
              <div key={index} className="mb-2 grid grid-cols-5 gap-2">
                <div className="col-span-2">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) =>
                      handleLinkChange(index, "label", e.target.value)
                    }
                    placeholder="Store name"
                    className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) =>
                      handleLinkChange(index, "url", e.target.value)
                    }
                    placeholder="https://..."
                    className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    required
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    disabled={formData.purchaseLinks.length === 1}
                    className="w-full rounded-md border border-gray-300 p-2 text-sm text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
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
              className="rounded-md bg-pink-500 px-4 py-2 text-white hover:bg-pink-600 disabled:bg-pink-300"
            >
              {loading ? "Saving..." : item ? "Update Item" : "Add Item"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

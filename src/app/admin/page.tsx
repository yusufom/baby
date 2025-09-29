/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import ItemFormModal from "@/components/ItemFormModal";
import {
  useItems,
  useCreateItem,
  useUpdateItem,
  useDeleteItem,
} from "@/hooks/useItems";
import Image from "next/image";
import Link from "next/link";
import { LoadingOverlay } from "@mantine/core";

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

export default function AdminDashboard() {
  const { data: items = [], isLoading, error: queryError } = useItems();
  const createItemMutation = useCreateItem();
  const updateItemMutation = useUpdateItem();
  const deleteItemMutation = useDeleteItem();

  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<RegistryItem | undefined>(
    undefined
  );
  // const router = useRouter();

  // Stats
  const totalItems = items.length;
  const totalQuantity = items.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0
  );
  const purchasedQuantity = items.reduce(
    (sum: any, item: any) =>
      sum + item.purchases.reduce((pSum: any, p: any) => pSum + p.quantity, 0),
    0
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      await deleteItemMutation.mutateAsync(id);
    } catch (err: any) {
      setError(err.message || "Failed to delete item");
    }
  };

  const handleEdit = (item: RegistryItem) => {
    setEditingItem(item);
    setShowAddModal(true);
  };

  const handleSaveItem = async (itemData: any) => {
    try {
      if (editingItem) {
        // Update existing item
        await updateItemMutation.mutateAsync({
          ...itemData,
          id: editingItem.id,
        });
      } else {
        // Create new item
        await createItemMutation.mutateAsync(itemData);
      }

      // Close modal and reset editing state
      setShowAddModal(false);
      setEditingItem(undefined);
    } catch (err: any) {
      throw new Error(err.message || "Failed to save item");
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingItem(undefined);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "#9D4EDD", type: "bars" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="rounded-md bg-pink-500 py-2 px-4 text-white hover:bg-pink-600"
          >
            Add Item
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Items</h3>
            <p className="text-2xl font-bold">{totalItems}</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Total Quantity
            </h3>
            <p className="text-2xl font-bold">{totalQuantity}</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <h3 className="text-sm font-medium text-gray-500">Purchased</h3>
            <p className="text-2xl font-bold">{purchasedQuantity}</p>
          </div>
        </div>

        {(error || queryError) && (
          <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
            {error || (queryError as Error)?.message}
          </div>
        )}

        {/* Items List */}
        <div className="rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Purchased
                </th>
                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Purchased By
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item: any) => {
                const purchasedQty = item.purchases.reduce(
                  (sum: any, p: any) => sum + p.quantity,
                  0
                );
                const remainingQty = item.quantity - purchasedQty;

                const isFullyPurchased = remainingQty === 0;

                const buyerNames = isFullyPurchased
                  ? [...new Set(item.purchases.map((p: any) => p.name))]
                  : [];

                return (
                  <tr key={item.id}>
                    <td className=" px-6 py-4 w-2/6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 relative ">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-10 w-10 rounded-full object-cover"
                            fill={true}
                          />
                        </div>
                        <div className="ml-4 w-2/3 ">
                          <div className="font-medium text-gray-900 max-h-20 overflow-hidden text-ellipsis">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.price
                              ? `£${item.price.toFixed(2)}`
                              : "No price"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className=" px-6 py-4 w-1/6">
                      <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                        {item.category}
                      </span>
                    </td>
                    <td className=" px-6 py-4 text-sm text-gray-500 w-1/6">
                      {item.quantity}
                    </td>
                    <td className=" px-6 py-4 text-sm text-gray-500 w-1/6">
                      <div className="flex flex-col">
                        <span>{purchasedQty} purchased</span>
                        <span
                          className={
                            remainingQty === 0 ? "font-bold text-green-600" : ""
                          }
                        >
                          {remainingQty} remaining
                        </span>
                      </div>
                    </td>
                    <td className=" px-6 py-4 text-left text-sm font-medium w-1/6">
                      {(isFullyPurchased && buyerNames.length > 0) ? (
                        <div className="mt-2 text-xs text-gray-700">
                          {buyerNames.join(", ")}
                        </div>
                      ): (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className=" px-6 py-4 text-right text-sm font-medium w-1/6">
                      <button
                        onClick={() => handleEdit(item)}
                        className="mr-2 text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}

              {items.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No items found. Add your first registry item!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Item Form Modal */}
        <ItemFormModal
          isOpen={showAddModal}
          onClose={closeModal}
          onSave={handleSaveItem}
          item={editingItem}
        />

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-pink-500 hover:underline">
            View Public Registry
          </Link>
        </div>
      </div>
    </div>
  );
}

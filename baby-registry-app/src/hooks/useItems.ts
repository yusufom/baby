import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface PurchaseLink {
    id?: string;
    label: string;
    url: string;
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

interface PurchaseData {
    name: string;
    quantity: number;
    message?: string;
}

// Fetch all items
const fetchItems = async () => {
    const response = await fetch('/api/items');

    if (!response.ok) {
        throw new Error('Failed to fetch registry items');
    }

    return response.json();
};

// Create a new item
const createItem = async (item: RegistryItem) => {
    const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });

    if (!response.ok) {
        throw new Error('Failed to create item');
    }

    return response.json();
};

// Update an existing item
const updateItem = async ({ id, ...item }: RegistryItem) => {
    const response = await fetch(`/api/items/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });

    if (!response.ok) {
        throw new Error('Failed to update item');
    }

    return response.json();
};

// Delete an item
const deleteItem = async (id: string) => {
    const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete item');
    }

    return response.json();
};

// Mark an item as purchased
const markItemPurchased = async ({ id, data }: { id: string; data: PurchaseData }) => {
    const response = await fetch(`/api/items/${id}/buy`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to mark item as purchased');
    }

    return response.json();
};

// Hook to fetch all items
export const useItems = () => {
    return useQuery({
        queryKey: ['items'],
        queryFn: fetchItems
    });
};

// Hook to create a new item
export const useCreateItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
};

// Hook to update an existing item
export const useUpdateItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
};

// Hook to delete an item
export const useDeleteItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
};

// Hook to mark an item as purchased
export const useMarkItemPurchased = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markItemPurchased,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
}; 

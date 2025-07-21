import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Item, Priority } from '@prisma/client'

// Types
export interface CreateItemData {
  name: string
  description?: string
  price?: number
  imageUrl?: string
  amazonUrl: string
  category?: string
  priority?: Priority
}

export interface UpdateItemData {
  purchased: boolean
  purchasedBy?: string
}

// API functions
const fetchItems = async (): Promise<Item[]> => {
  const response = await fetch('/api/items')
  if (!response.ok) {
    throw new Error('Failed to fetch items')
  }
  return response.json()
}

const createItem = async (data: CreateItemData): Promise<Item> => {
  const response = await fetch('/api/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create item')
  }
  return response.json()
}

const updateItem = async (id: string, data: UpdateItemData): Promise<Item> => {
  const response = await fetch(`/api/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update item')
  }
  return response.json()
}

const deleteItem = async (id: string): Promise<void> => {
  const response = await fetch(`/api/items/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete item')
  }
}

// Hooks
export const useItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
  })
}

export const useCreateItem = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  })
}

export const useUpdateItem = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateItemData }) =>
      updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  })
}

export const useDeleteItem = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  })
}
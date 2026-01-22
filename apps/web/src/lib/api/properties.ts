import { apiClient } from './client'
import { Property } from '@/types'

export const propertiesApi = {
  getAll: async (params?: {
    city?: string
    country?: string
    minPrice?: number
    maxPrice?: number
    guests?: number
    propertyType?: string
  }) => {
    const response = await apiClient.get<Property[]>('/properties', { params })
    return response.data
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Property>(`/properties/${id}`)
    return response.data
  },

  create: async (data: Partial<Property>) => {
    const response = await apiClient.post<Property>('/properties', data)
    return response.data
  },

  update: async (id: string, data: Partial<Property>) => {
    const response = await apiClient.patch<Property>(`/properties/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    await apiClient.delete(`/properties/${id}`)
  },

  publish: async (id: string) => {
    const response = await apiClient.patch<Property>(`/properties/${id}/publish`)
    return response.data
  },

  getMyProperties: async () => {
    const response = await apiClient.get<Property[]>('/properties/my-properties')
    return response.data
  },
}
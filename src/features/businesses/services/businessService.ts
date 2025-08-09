import { useQuery } from '@tanstack/react-query';
import { BUSINESS_ENDPOINTS } from '../../../constants/endpoints';
import { axiosInstance } from '../../../lib/axios';
import type { BusinessesResponse } from '../types';

interface GetBusinessesParams {
  limit?: number;
  page?: number;
  order?: 'ASC' | 'DESC';
  sort?: string;
  category_id?: string;
  lat?: number;
  lng?: number;
}

export const useBusinessService = () => {
  const getBusinesses = async (params: GetBusinessesParams = {}): Promise<BusinessesResponse> => {
    const response = await axiosInstance.get<BusinessesResponse>(BUSINESS_ENDPOINTS.GET_ALL, { params });
    return response.data;
  };

  const useBusinesses = (params: GetBusinessesParams = {}) => {
    return useQuery({
      queryKey: ['businesses', params],
      queryFn: () => getBusinesses(params),
    });
  };

  const useBusinessesByCategory = (categoryId: string | null, params: Omit<GetBusinessesParams, 'category_id'> = {}) => {
    return useQuery({
      queryKey: ['businesses', 'category', categoryId, params],
      queryFn: () => {
        if (!categoryId) return getBusinesses(params);
        return getBusinesses({ ...params, category_id: categoryId });
      },
      enabled: true,
    });
  };

  const useBusinessesByLocation = (lat: number | null, lng: number | null, params: Omit<GetBusinessesParams, 'lat' | 'lng'> = {}) => {
    return useQuery({
      queryKey: ['businesses', 'location', lat, lng, params],
      queryFn: () => {
        if (!lat || !lng) return getBusinesses(params);
        return getBusinesses({ ...params, lat, lng });
      },
      enabled: lat !== null && lng !== null,
    });
  };

  return {
    useBusinesses,
    useBusinessesByCategory,
    useBusinessesByLocation,
  };
}; 
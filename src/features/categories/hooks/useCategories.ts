import { useQuery } from '@tanstack/react-query';
import { CATEGORY_ENDPOINTS } from '../../../constants/endpoints';
import { axiosInstance } from '../../../lib/axios';
import { Category } from '../types';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const { data } = await axiosInstance.get<Category[]>(CATEGORY_ENDPOINTS.GET_ALL);
      return data;
    },
  });
}; 
import { CATEGORY_ENDPOINTS } from '../../../constants/endpoints';
import { axiosInstance } from '../../../lib/axios';
import { Category } from '../types';

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    try {
      const { data } = await axiosInstance.get<Category[]>(CATEGORY_ENDPOINTS.GET_ALL);
      return data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },
}; 
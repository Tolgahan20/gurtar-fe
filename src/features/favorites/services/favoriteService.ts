import { FAVORITE_ENDPOINTS } from '../../../constants/endpoints';
import { axiosInstance } from '../../../lib/axios';
import { BusinessFavorite } from '../../businesses/types';

interface FavoriteResponse {
  data: BusinessFavorite[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

class FavoriteService {
  async getFavorites(): Promise<BusinessFavorite[]> {
    const response = await axiosInstance.get<FavoriteResponse>(FAVORITE_ENDPOINTS.GET_ALL);
    console.log('Favorites API Response:', JSON.stringify(response.data, null, 2));
    return response.data.data || [];
  }

  async addFavorite(businessId: string): Promise<void> {
    await axiosInstance.post(FAVORITE_ENDPOINTS.ADD, {
      business_id: businessId,
    });
  }

  async removeFavorite(businessId: string): Promise<void> {
    await axiosInstance.delete(FAVORITE_ENDPOINTS.REMOVE(businessId));
  }
}

export const favoriteService = new FavoriteService(); 
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '../../../context/ToastContext';
import { BusinessFavorite } from '../../businesses/types';
import { favoriteService } from '../services/favoriteService';

export function useFavorites() {
  const [favorites, setFavorites] = useState<BusinessFavorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await favoriteService.getFavorites();
      setFavorites(data as BusinessFavorite[]);
    } catch (err) {
      console.log(err);
      setError('Failed to fetch favorites');
      showToast({
        type: 'error',
        message: 'Failed to fetch favorites. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const addFavorite = useCallback(async (businessId: string) => {
    try {
      await favoriteService.addFavorite(businessId);
      await fetchFavorites(); // Refresh the list
      showToast({
        type: 'success',
        message: 'Added to favorites successfully',
      });
    } catch (err) {
      console.log(err);
      showToast({
        type: 'error',
        message: 'Failed to add to favorites. Please try again.',
      });
    }
  }, [fetchFavorites, showToast]);

  const removeFavorite = useCallback(async (businessId: string) => {
    try {
      await favoriteService.removeFavorite(businessId);
      await fetchFavorites(); // Refresh the list
      showToast({
        type: 'success',
        message: 'Removed from favorites successfully',
      });
    } catch (err) {
      console.log(err);
      showToast({
        type: 'error',
        message: 'Failed to remove from favorites. Please try again.',
      });
    }
  }, [fetchFavorites, showToast]);

  // Check if a business is in favorites
  const isFavorite = useCallback((businessId: string) => {
    return favorites.some(favorite => favorite.business.id === businessId);
  }, [favorites]);

  // Toggle favorite status
  const toggleFavorite = useCallback((businessId: string) => {
    if (isFavorite(businessId)) {
      removeFavorite(businessId);
    } else {
      addFavorite(businessId);
    }
  }, [isFavorite, removeFavorite, addFavorite]);

  // Load favorites on mount
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return {
    favorites,
    loading,
    error,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
} 
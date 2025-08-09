import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category } from '../types';
import { categoryService } from './categoryService';

const CACHE_KEY = '@categories';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

interface CacheData {
  categories: Category[];
  timestamp: number;
}

export const categoryCache = {
  async get(): Promise<Category[] | null> {
    try {
      console.log('Checking category cache...');
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (!cached) {
        console.log('No cached categories found');
        return null;
      }

      const data: CacheData = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is expired
      if (now - data.timestamp > CACHE_EXPIRY) {
        console.log('Category cache expired');
        await AsyncStorage.removeItem(CACHE_KEY);
        return null;
      }

      console.log('Returning cached categories:', data.categories);
      return data.categories;
    } catch (error) {
      console.error('Error reading category cache:', error);
      return null;
    }
  },

  async set(categories: Category[]): Promise<void> {
    try {
      console.log('Caching categories:', categories);
      const data: CacheData = {
        categories,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error writing category cache:', error);
    }
  },

  async getWithFallback(): Promise<Category[]> {
    try {
      console.log('Getting categories with fallback...');
      const cached = await this.get();
      if (cached) {
        console.log('Using cached categories');
        return cached;
      }

      console.log('Cache miss, fetching fresh categories');
      const fresh = await categoryService.getCategories();
      if (fresh.length > 0) {
        console.log('Caching fresh categories');
        await this.set(fresh);
      }
      return fresh;
    } catch (error) {
      console.error('Error in getWithFallback:', error);
      return [];
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CACHE_KEY);
    } catch (error) {
      console.error('Error clearing category cache:', error);
    }
  },
}; 
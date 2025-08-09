import { Business } from '../businesses/types';

export enum PackageSection {
  TOP_RATED = 'top_rated',
  ENDING_SOON = 'ending_soon',
  NEW_ARRIVALS = 'new_arrivals',
  NEAR_YOU = 'near_you',
  BEST_VALUE = 'best_value',
}

export interface Package {
  id: string;
  name: string;
  description: string;
  image_url: string;
  original_price: number;
  price: number;
  estimated_weight: number;
  quantity_available: number;
  pickup_start_time: string;
  pickup_end_time: string;
  allergens: string[];
  business: Business;
}

export interface PackagesResponse {
  data: Package[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PackagesQueryParams {
  page?: number;
  limit?: number;
  city?: string;
  categoryId?: string;
  section?: PackageSection;
} 
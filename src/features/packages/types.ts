
export enum PackageSection {
  TOP_RATED = 'top_rated',
  ENDING_SOON = 'ending_soon',
  NEW_ARRIVALS = 'new_arrivals',
  NEAR_YOU = 'near_you',
  BEST_VALUE = 'best_value',
}

export interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  original_price: number;
  quantity_available: number;
  image_url?: string;
  pickup_start_time: string;
  pickup_end_time: string;
  business: {
    id: string;
    name: string;
    cover_image_url: string;
    address: string;
    city: string;
    rating?: number;
  };
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
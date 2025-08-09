export interface Category {
  id: string;
  name: string;
}

export interface Business {
  id: string;
  name: string;
  city: string;
  address: string;
  cover_image_url?: string;
  description?: string;
  rating?: number;
  categories: Category[];
}

export interface BusinessesResponse {
  data: Business[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface BusinessesQueryParams {
  page?: number;
  limit?: number;
  ratingSort?: 'asc' | 'desc';
  name?: string;
  categoryId?: string;
  city?: string;
}

export interface BusinessListProps {
  title: string;
  businesses: Business[];
  onSeeAllPress?: () => void;
  onBusinessPress?: (business: Business) => void;
}

export interface BusinessCardProps {
  business: Business;
  onPress?: () => void;
} 
export interface Category {
  id: string;
  name: string;
}

export interface Business {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  description: string;
  phone_number: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postal_code: string;
  logo_url: string;
  cover_image_url: string;
  is_verified: boolean;
  is_active: boolean;
}

export interface BusinessFavorite {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  business: Business;
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
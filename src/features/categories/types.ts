export interface Category {
  id?: string;
  name: string;
  description: string;
  parent_id: string | null;
  parent?: string;
  subcategories?: string[];
  businesses?: any[];
}

export interface CategoriesResponse {
  data: Category[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CategoryListProps {
  onCategorySelect?: (category: Category | null) => void;
  selectedCategoryId?: string;
  categories: Category[];
}

export interface CategoryCardProps {
  category: Category;
  isSelected?: boolean;
  onPress?: () => void;
} 
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { spacing } from '../../../constants/theme';
import { Category } from '../types';
import { CategoryCard } from './CategoryCard';

export interface CategoryListProps {
  onCategorySelect?: (category: Category | null) => void;
  selectedCategoryId?: string;
  categories: Category[];
}

export function CategoryList({
  onCategorySelect,
  selectedCategoryId,
  categories,
}: CategoryListProps) {
  const { t } = useTranslation();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <CategoryCard
        key="all"
        category={{
          id: 'all',
          name: t('common.categories.all.name'),
          description: t('common.categories.all.description'),
          parent_id: null,
        }}
        isSelected={!selectedCategoryId}
        onPress={() => onCategorySelect?.(null)}
      />
      {categories?.map((category, index) => (
        <CategoryCard
          key={category.id || `category-${index}`}
          category={category}
          isSelected={category.id === selectedCategoryId}
          onPress={() => onCategorySelect?.(category)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
}); 
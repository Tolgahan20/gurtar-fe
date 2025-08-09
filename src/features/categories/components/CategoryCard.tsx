import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Body } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  isSelected?: boolean;
  onPress?: () => void;
}

export function CategoryCard({ category, isSelected, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Body 
        style={
          isSelected 
            ? { ...styles.text, ...styles.selectedText }
            : styles.text
        }
        numberOfLines={1}
      >
        {category.name}
      </Body>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    backgroundColor: colors.surfaceLight,
    minWidth: 80,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedContainer: {
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 12,
    color: colors.primary,
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedText: {
    color: colors.textLight,
    fontWeight: '600',
  },
}); 
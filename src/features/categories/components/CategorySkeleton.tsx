import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../../constants/theme';

interface CategorySkeletonProps {
  count?: number;
}

export function CategorySkeleton({ count = 5 }: CategorySkeletonProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.category} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  category: {
    height: 32,
    width: 100,
    backgroundColor: colors.border,
    borderRadius: 16,
  },
}); 
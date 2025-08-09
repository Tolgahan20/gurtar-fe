import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../../constants/theme';

interface PackageSkeletonProps {
  isHorizontal?: boolean;
  count?: number;
}

function SingleSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.image} />
        <View style={styles.favoriteButton} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.businessName} />
          <View style={styles.rating} />
        </View>

        <View style={styles.title} />
        <View style={[styles.title, styles.titleShort]} />

        <View style={styles.footer}>
          <View style={styles.collectInfo}>
            <View style={styles.timeInfo} />
          </View>

          <View style={styles.priceContainer}>
            <View style={styles.originalPrice} />
            <View style={styles.price} />
          </View>
        </View>
      </View>
    </View>
  );
}

export function PackageSkeleton({ isHorizontal = false, count = 3 }: PackageSkeletonProps) {
  if (!isHorizontal) {
    return (
      <View style={styles.verticalContainer}>
        {Array.from({ length: count }).map((_, index) => (
          <SingleSkeleton key={index} />
        ))}
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalScroll}
    >
      {Array.from({ length: count }).map((_, index) => (
        <View 
          key={index} 
          style={[
            styles.horizontalContainer,
            index < count - 1 && styles.horizontalSpacing,
          ]}
        >
          <SingleSkeleton />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.textLight,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  horizontalContainer: {
    width: 300,
  },
  horizontalSpacing: {
    marginRight: spacing.md,
  },
  horizontalScroll: {
    paddingHorizontal: spacing.md,
  },
  verticalContainer: {
    gap: spacing.md,
    marginHorizontal: spacing.md,
  },
  imageContainer: {
    height: 130,
    width: '100%',
    backgroundColor: colors.surfaceLight,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.border,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: -16,
    right: spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
  },
  content: {
    padding: spacing.md,
    paddingTop: spacing.md + 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  businessName: {
    height: 16,
    flex: 1,
    backgroundColor: colors.border,
    borderRadius: 4,
  },
  rating: {
    width: 40,
    height: 16,
    backgroundColor: colors.border,
    borderRadius: 4,
  },
  title: {
    height: 14,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginBottom: spacing.xs,
  },
  titleShort: {
    width: '60%',
    marginBottom: spacing.sm,
  },
  footer: {
    gap: spacing.xs,
  },
  collectInfo: {
    gap: spacing.xs,
  },
  timeInfo: {
    height: 14,
    backgroundColor: colors.border,
    borderRadius: 4,
    width: '70%',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  originalPrice: {
    width: 60,
    height: 14,
    backgroundColor: colors.border,
    borderRadius: 4,
  },
  price: {
    width: 80,
    height: 18,
    backgroundColor: colors.border,
    borderRadius: 4,
  },
}); 
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body, H2 } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';
import { Package } from '../types';
import { PackageCard } from './PackageCard';

interface HorizontalPackageListProps {
  title: string;
  packages: Package[];
  onSeeAll?: () => void;
  seeAllText?: string;
  onPackagePress?: (pkg: Package) => void;
  isFavorite: (packageId: string) => boolean;
  onFavoritePress: (packageId: string) => void;
}

export function HorizontalPackageList({
  title,
  packages,
  onSeeAll,
  seeAllText = 'See All',
  onPackagePress,
  isFavorite,
  onFavoritePress,
}: HorizontalPackageListProps) {
  if (!packages?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <H2>{title}</H2>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll}>
            <Body style={styles.seeAll}>{seeAllText}</Body>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {packages.map(pkg => (
          <View key={pkg.id} style={styles.cardContainer}>
            <PackageCard
              package={pkg}
              onPress={() => onPackagePress?.(pkg)}
              isHorizontal
              isFavorite={isFavorite(pkg.business.id)}
              onFavoritePress={onFavoritePress}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 20,
  },
  seeAll: {
    color: colors.primary,
    fontSize: 14,
    textDecorationLine: 'underline',

  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xxl,
  },
  cardContainer: {
    width: 280,
  },
  emptyContainer: {
    height: 200,
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    marginHorizontal: spacing.lg,
  },
}); 
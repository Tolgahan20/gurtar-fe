import React from 'react';
import { StyleSheet, View } from 'react-native';
import { EmptyState } from '../../../components/ui/EmptyState';
import { spacing } from '../../../constants/theme';
import { Package } from '../types';
import { PackageCard } from './PackageCard';
import { PackageSkeleton } from './PackageSkeleton';

interface PackageListProps {
  packages: Package[];
  loading?: boolean;
  onPackagePress?: (pkg: Package) => void;
  isFavorite: (packageId: string) => boolean;
  onFavoritePress: (packageId: string) => void;
}

export function PackageList({
  packages,
  loading,
  onPackagePress,
  isFavorite,
  onFavoritePress,
}: PackageListProps) {
  if (loading) {
    return (
      <View style={styles.container}>
        {[...Array(2)].map((_, index) => (
          <PackageSkeleton key={index} />
        ))}
      </View>
    );
  }

  if (!packages?.length) {
    return (
      <EmptyState
        icon="fast-food-outline"
        title="No Packages Found"
        description="Try adjusting your filters or check back later for new packages."
        iconSize={48}
      />
    );
  }

  return (
    <View style={styles.container}>
      {packages.map(pkg => (
        <PackageCard
          key={pkg.id}
          package={pkg}
          onPress={() => onPackagePress?.(pkg)}
          isFavorite={isFavorite(pkg.business.id)}
          onFavoritePress={onFavoritePress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: spacing.md,
    gap: spacing.md,
  },
  emptyContentContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 0,
    minHeight: 400,
  },
  container: {
    padding: spacing.md,
    gap: spacing.md,
  },
}); 
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Body, H1 } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';
import { Package } from '../types';
import { PackageCard } from './PackageCard';

interface HorizontalPackageListProps {
  title: string;
  packages: Package[];
  onPackagePress?: (pkg: Package) => void;
  onSeeAllPress?: () => void;
}

export function HorizontalPackageList({
  title,
  packages = [],
  onPackagePress,
  onSeeAllPress,
}: HorizontalPackageListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <H1 style={styles.title}>{title}</H1>
        {packages.length > 0 && (
          <TouchableOpacity onPress={onSeeAllPress}>
            <Body style={styles.seeAll}>See all</Body>
          </TouchableOpacity>
        )}
      </View>
      
      {packages.length === 0 ? (
        <EmptyState
          icon="fast-food-outline"
          title="No Packages Yet"
          description="Stay tuned! New packages will be added soon."
          iconSize={48}
          containerStyle={styles.emptyContainer}
        />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {packages.map((pkg) => (
            <View key={pkg.id} style={styles.cardContainer}>
              <PackageCard
                package={pkg}
                onPress={() => onPackagePress?.(pkg)}
                isHorizontal
              />
            </View>
          ))}
        </ScrollView>
      )}
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
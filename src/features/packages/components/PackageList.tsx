import React from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet } from 'react-native';
import { EmptyState } from '../../../components/ui/EmptyState';
import { colors, spacing } from '../../../constants/theme';
import { Package } from '../types';
import { PackageCard } from './PackageCard';

interface PackageListProps {
  packages: Package[];
  onPackagePress?: (pkg: Package) => void;
  onEndReached?: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  searchQuery?: string;
}

export function PackageList({
  packages = [],
  onPackagePress,
  onEndReached,
  refreshing = false,
  onRefresh,
  ListHeaderComponent,
  searchQuery,
}: PackageListProps) {
  const renderItem: ListRenderItem<Package> = ({ item }) => {
    if (!item || !item.business) {
      return null;
    }
    return (
      <PackageCard
        package={item}
        onPress={() => onPackagePress?.(item)}
      />
    );
  };

  const renderEmptyComponent = () => {
    if (searchQuery) {
      return (
        <EmptyState
          icon="search-outline"
          title="No Results Found"
          description={`We couldn't find any packages matching "${searchQuery}". Try adjusting your search or filters.`}
          containerStyle={styles.emptyContainer}
        />
      );
    }
    
    return (
      <EmptyState
        icon="fast-food-outline"
        title="No Packages Available"
        description="There are no packages available at the moment. Check back later for new offerings!"
        containerStyle={styles.emptyContainer}
      />
    );
  };

  return (
    <FlatList
      data={packages}
      renderItem={renderItem}
      keyExtractor={(item) => item?.id || Math.random().toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
        />
      }
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={renderEmptyComponent}
      contentContainerStyle={[
        styles.contentContainer,
        packages.length === 0 && styles.emptyContentContainer,
      ]}
    />
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
}); 
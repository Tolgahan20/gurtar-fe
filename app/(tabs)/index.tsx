import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { EmptyState } from '../../src/components/ui/EmptyState';
import { Body } from '../../src/components/ui/Typography';
import { colors, spacing } from '../../src/constants/theme';
import { CategoryList } from '../../src/features/categories/components/CategoryList';
import { CategorySkeleton } from '../../src/features/categories/components/CategorySkeleton';
import { useCategories } from '../../src/features/categories/hooks/useCategories';
import { useFavorites } from '../../src/features/favorites/hooks/useFavorites';
import { LocationSelector } from '../../src/features/location/components/LocationSelector';
import { HorizontalPackageList } from '../../src/features/packages/components/HorizontalPackageList';
import { PackageSkeleton } from '../../src/features/packages/components/PackageSkeleton';
import { useHomeScreen } from '../../src/features/packages/hooks/useHomeScreen';
import { Package, PackageSection } from '../../src/features/packages/types';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { 
    sections, 
    refreshing, 
    selectedCategory,
    error,
    noResults,
    handleRefresh,
    handleCategorySelect,
  } = useHomeScreen();

  const { isFavorite, toggleFavorite } = useFavorites();

  const handlePackagePress = useCallback((pkg: Package) => {
    if (pkg?.id) {
      router.push({
        pathname: '/(tabs)/package/[id]',
        params: { id: pkg.id }
      } as any);
    }
  }, [router]);

  const handleSeeAllPress = useCallback((section: PackageSection) => {
    router.push({
      pathname: '/(tabs)/explore',
      params: { section }
    } as any);
  }, [router]);

  const getSectionTitle = (key: PackageSection): string => {
    const sectionKeyMap = {
      [PackageSection.TOP_RATED]: 'topRated',
      [PackageSection.ENDING_SOON]: 'endingSoon',
      [PackageSection.NEW_ARRIVALS]: 'newArrivals',
      [PackageSection.NEAR_YOU]: 'nearYou',
      [PackageSection.BEST_VALUE]: 'bestValue',
    };

    return t(`common.packages.sections.${sectionKeyMap[key]}`);
  };

  const renderSections = () => {
    // Show loading state if any section is loading
    const isLoading = Object.values(sections).some(section => section.loading);
    if (isLoading) {
      return Object.entries(sections).map(([key, section]) => (
        <View key={key} style={styles.section}>
          <Body style={styles.sectionTitle}>{getSectionTitle(key as PackageSection)}</Body>
          <PackageSkeleton isHorizontal count={3} />
        </View>
      ));
    }

    // Show empty state if no packages in any section
    if (noResults) {
      return (
        <EmptyState
          icon="fast-food-outline"
          title={t('common.packages.empty.title')}
          description={selectedCategory 
            ? t('common.packages.empty.withCategory', { category: selectedCategory.name })
            : t('common.packages.empty.description')}
          containerStyle={styles.emptyStateContainer}
        />
      );
    }

    // Show sections with packages
    return Object.entries(sections).map(([key, section]) => {
      if (section.packages.length > 0) {
        const sectionKey = key as PackageSection;
        return (
          <View key={key} style={styles.section}>
            <HorizontalPackageList
              title={getSectionTitle(sectionKey)}
              packages={section.packages}
              onPackagePress={(pkg) => {
                handlePackagePress(pkg);
              }}
              onSeeAll={() => handleSeeAllPress(sectionKey)}
              seeAllText={t('common.packages.actions.seeAll')}
              isFavorite={isFavorite}
              onFavoritePress={toggleFavorite}
            />
          </View>
        );
      }
      return null;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={[
          styles.scrollContent,
          noResults && styles.scrollContentEmpty
        ]}
      >
        <View style={styles.header}>
          <LocationSelector />
          {loadingCategories ? (
            <CategorySkeleton />
          ) : (
            <CategoryList
              onCategorySelect={handleCategorySelect}
              selectedCategoryId={selectedCategory?.id}
              categories={categories || []}
            />
          )}
          {error && (
            <Body style={styles.errorText}>{error}</Body>
          )}
        </View>

        {renderSections()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  scrollContentEmpty: {
    flexGrow: 1,
  },
  header: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyStateContainer: {
    flex: 1,
  },
});

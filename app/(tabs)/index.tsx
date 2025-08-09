import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { EmptyState } from '../../src/components/ui/EmptyState';
import { Body } from '../../src/components/ui/Typography';
import { colors, spacing } from '../../src/constants/theme';
import { CategoryList } from '../../src/features/categories/components/CategoryList';
import { CategorySkeleton } from '../../src/features/categories/components/CategorySkeleton';
import { useCategories } from '../../src/features/categories/hooks/useCategories';
import { LocationSelector } from '../../src/features/location/components/LocationSelector';
import { HorizontalPackageList } from '../../src/features/packages/components/HorizontalPackageList';
import { PackageSkeleton } from '../../src/features/packages/components/PackageSkeleton';
import { useHomeScreen } from '../../src/features/packages/hooks/useHomeScreen';
import { Package, PackageSection } from '../../src/features/packages/types';

export default function HomeScreen() {
  const router = useRouter();
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

  const renderSections = () => {
    // Show loading state if any section is loading
    const isLoading = Object.values(sections).some(section => section.loading);
    if (isLoading) {
      return Object.entries(sections).map(([key, section]) => (
        <View key={key} style={styles.section}>
          <Body style={styles.sectionTitle}>{section.title}</Body>
          <PackageSkeleton isHorizontal count={3} />
        </View>
      ));
    }

    // Show empty state if no packages in any section
    if (noResults) {
      return (
        <EmptyState
          icon="fast-food-outline"
          title="No Packages Found"
          description={selectedCategory 
            ? `We couldn't find any packages in the "${selectedCategory.name}" category. Try selecting a different category.`
            : "No packages available at the moment. Check back later for new offerings!"}
          containerStyle={styles.emptyStateContainer}
        />
      );
    }

    // Show sections with packages
    return Object.entries(sections).map(([key, section]) => {
      if (section.packages.length > 0) {
        return (
          <View key={key} style={styles.section}>
            <HorizontalPackageList
              title={section.title}
              packages={section.packages}
              onPackagePress={handlePackagePress}
              onSeeAllPress={() => handleSeeAllPress(key as PackageSection)}
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
    flexGrow: 1,
  },
  scrollContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  emptyStateContainer: {
    flex: 1,
    minHeight: 400,
    justifyContent: 'center',
  },
});

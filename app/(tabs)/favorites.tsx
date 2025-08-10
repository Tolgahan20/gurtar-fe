import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { IllustratedEmptyState } from '../../src/components/ui/IllustratedEmptyState';
import { H1 } from '../../src/components/ui/Typography';
import { colors, spacing } from '../../src/constants/theme';
import { BusinessCard } from '../../src/features/businesses/components/BusinessCard';
import { useFavorites } from '../../src/features/favorites/hooks/useFavorites';

export default function FavoritesScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { favorites, loading, fetchFavorites, toggleFavorite } = useFavorites();

  const handleFindPackages = () => {
    router.push('/(tabs)');
  };

  if (!loading && (!favorites || favorites.length === 0)) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <IllustratedEmptyState
          title={t('common.favorites.emptyState.title')}
          description={t('common.favorites.emptyState.description')}
          buttonText={t('common.favorites.emptyState.button')}
          onButtonPress={handleFindPackages}
          illustrationType="favorite"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <H1>{t('common.favorites.title')}</H1>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchFavorites}
            tintColor={colors.primary}
          />
        }
      >
        {favorites?.map((favorite) => (
          <View key={favorite.id} style={styles.cardContainer}>
            <BusinessCard
              business={favorite.business}
              isFavorite={true}
              onFavoritePress={() => toggleFavorite(favorite.business.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl * 1.5,
    paddingBottom: spacing.lg,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  cardContainer: {
    width: '100%',
  },
}); 
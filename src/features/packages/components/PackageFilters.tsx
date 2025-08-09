import { Ionicons } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Body } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';

export interface Filters {
  pickupTimeSort?: 'asc' | 'desc';
  priceSort?: 'asc' | 'desc';
  ratingSort?: 'asc' | 'desc';
  todayOnly: boolean;
  minQuantity?: number;
  maxPrice?: number;
}

interface PackageFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function PackageFilters({ filters, onFiltersChange }: PackageFiltersProps) {
  const toggleSort = useCallback((
    key: 'pickupTimeSort' | 'priceSort' | 'ratingSort',
    currentValue?: 'asc' | 'desc'
  ) => {
    const newValue = !currentValue ? 'asc' : currentValue === 'asc' ? 'desc' : undefined;
    onFiltersChange({ ...filters, [key]: newValue });
  }, [filters, onFiltersChange]);

  const toggleTodayOnly = useCallback(() => {
    onFiltersChange({ ...filters, todayOnly: !filters.todayOnly });
  }, [filters, onFiltersChange]);

  const getSortIcon = (sort?: 'asc' | 'desc') => {
    if (!sort) return 'swap-vertical-outline';
    return sort === 'asc' ? 'arrow-up-outline' : 'arrow-down-outline';
  };

  const getFilterButtonStyle = (isActive: boolean): ViewStyle => ({
    ...styles.filterButton,
    ...(isActive ? styles.activeFilter : {}),
  });

  const getTextStyle = (isActive: boolean): TextStyle => ({
    ...styles.buttonText,
    ...(isActive ? styles.activeText : {}),
  });

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={getFilterButtonStyle(filters.todayOnly)}
          onPress={toggleTodayOnly}
        >
          <Ionicons
            name="today-outline"
            size={16}
            color={filters.todayOnly ? colors.textLight : colors.textPrimary}
          />
          <Body style={getTextStyle(filters.todayOnly)}>
            Today Only
          </Body>
        </TouchableOpacity>

        <TouchableOpacity
          style={getFilterButtonStyle(!!filters.pickupTimeSort)}
          onPress={() => toggleSort('pickupTimeSort', filters.pickupTimeSort)}
        >
          <Ionicons
            name={getSortIcon(filters.pickupTimeSort)}
            size={16}
            color={filters.pickupTimeSort ? colors.textLight : colors.textPrimary}
          />
          <Body style={getTextStyle(!!filters.pickupTimeSort)}>
            Pickup Time
          </Body>
        </TouchableOpacity>

        <TouchableOpacity
          style={getFilterButtonStyle(!!filters.priceSort)}
          onPress={() => toggleSort('priceSort', filters.priceSort)}
        >
          <Ionicons
            name={getSortIcon(filters.priceSort)}
            size={16}
            color={filters.priceSort ? colors.textLight : colors.textPrimary}
          />
          <Body style={getTextStyle(!!filters.priceSort)}>
            Price
          </Body>
        </TouchableOpacity>

        <TouchableOpacity
          style={getFilterButtonStyle(!!filters.ratingSort)}
          onPress={() => toggleSort('ratingSort', filters.ratingSort)}
        >
          <Ionicons
            name={getSortIcon(filters.ratingSort)}
            size={16}
            color={filters.ratingSort ? colors.textLight : colors.textPrimary}
          />
          <Body style={getTextStyle(!!filters.ratingSort)}>
            Rating
          </Body>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
  scrollContent: {
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    backgroundColor: colors.surfaceLight,
    gap: spacing.xs,
    marginRight: spacing.xs,
  },
  activeFilter: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: 12,
  },
  activeText: {
    color: colors.textLight,
  },
}); 
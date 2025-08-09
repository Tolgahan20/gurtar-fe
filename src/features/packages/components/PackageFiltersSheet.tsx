import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import { Body } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';
import { Filters } from './PackageFilters';

interface PackageFiltersSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export default function PackageFiltersSheet({ 
  bottomSheetRef, 
  filters, 
  onFiltersChange 
}: PackageFiltersSheetProps) {
  const snapPoints = React.useMemo(() => ['50%'], []);

  const handleSortChange = (
    key: 'pickupTimeSort' | 'priceSort' | 'ratingSort',
    currentValue?: 'asc' | 'desc'
  ) => {
    const newValue = !currentValue ? 'asc' : currentValue === 'asc' ? 'desc' : undefined;
    onFiltersChange({ ...filters, [key]: newValue });
  };

  const handleTodayOnlyChange = () => {
    onFiltersChange({ ...filters, todayOnly: !filters.todayOnly });
  };

  const sortOptions = [
    { key: 'pickupTimeSort' as const, label: 'Pickup Time', value: filters.pickupTimeSort },
    { key: 'priceSort' as const, label: 'Price', value: filters.priceSort },
    { key: 'ratingSort' as const, label: 'Rating', value: filters.ratingSort },
  ];

  const getOptionTextStyle = (isActive: boolean): TextStyle => ({
    ...styles.optionText,
    ...(isActive ? styles.optionTextActive : {}),
  });

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      index={-1}
      animateOnMount
      handleStyle={styles.handle}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.background}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      )}
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.header}>
          <Body style={styles.title}>Filters</Body>
          <TouchableOpacity 
            onPress={() => bottomSheetRef.current?.close()}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Body style={styles.sectionTitle}>Sort by</Body>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={styles.option}
              onPress={() => handleSortChange(option.key, option.value)}
            >
              <Body style={getOptionTextStyle(!!option.value)}>
                {option.label}
              </Body>
              <View style={styles.optionRight}>
                {option.value && (
                  <Ionicons 
                    name={option.value === 'asc' ? 'arrow-up' : 'arrow-down'} 
                    size={20} 
                    color={colors.primary} 
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.separator} />

        <View style={styles.section}>
          <Body style={styles.sectionTitle}>Other Filters</Body>
          <TouchableOpacity
            style={styles.option}
            onPress={handleTodayOnlyChange}
          >
            <Body style={getOptionTextStyle(filters.todayOnly)}>
              Today Only
            </Body>
            <View style={[
              styles.checkbox,
              filters.todayOnly && styles.checkboxActive
            ]}>
              {filters.todayOnly && (
                <Ionicons name="checkmark" size={16} color={colors.textLight} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  handle: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  indicator: {
    backgroundColor: colors.border,
    width: 40,
    height: 4,
  },
  background: {
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: spacing.xs,
    position: 'absolute',
    right: 0,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  optionText: {
    fontSize: 16,
  },
  optionTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.lg,
  },
}); 
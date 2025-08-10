import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body, H2 } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';
import { City } from '../types';

interface CitySelectionSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal>;
  cities: City[];
  selectedCity: City | null;
  setSelectedCity: (city: City) => void;
  handleClose: () => void;
}

export function CitySelectionSheet({
  bottomSheetRef,
  cities,
  selectedCity,
  setSelectedCity,
  handleClose,
}: CitySelectionSheetProps) {
  const { t } = useTranslation();
  const snapPoints = useMemo(() => ['50%'], []);

  const handleCitySelect = useCallback((city: City) => {
    setSelectedCity(city);
    handleClose();
  }, [setSelectedCity, handleClose]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      onDismiss={handleClose}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.indicator}
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.header}>
          <H2 style={styles.title}>{t('common.location.selectCity')}</H2>
          <View style={styles.separator} />
        </View>
        {cities.map((city) => (
          <TouchableOpacity
            key={city.id}
            style={[
              styles.cityButton,
              selectedCity?.id === city.id && styles.selectedButton,
            ]}
            onPress={() => handleCitySelect(city)}
          >
            <Body style={
              selectedCity?.id === city.id 
                ? { ...styles.cityText, ...styles.selectedText }
                : styles.cityText
            }>
              {t(`common.location.cities.${city.id}`)}
            </Body>
          </TouchableOpacity>
        ))}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: colors.textLight,
  },
  indicator: {
    backgroundColor: colors.border,
  },
  container: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: spacing.sm,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: -spacing.md,
  },
  cityButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  selectedButton: {
    backgroundColor: colors.surfaceLight,
  },
  cityText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  selectedText: {
    color: colors.primary,
    fontWeight: '600',
  },
}); 
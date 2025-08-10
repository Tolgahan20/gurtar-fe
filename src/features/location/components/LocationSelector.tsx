import { Ionicons } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';
import { useLocation } from '../context/LocationContext';

export function LocationSelector() {
  const { t } = useTranslation();
  const { selectedCity, openCitySelection } = useLocation();

  const handlePress = useCallback(() => {
    openCitySelection();
  }, [openCitySelection]);

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="location-outline" size={18} color={colors.primary} />
        </View>
        <View style={styles.textContainer}>
          <Body style={styles.label}>{t('common.location.chosenLocation')}</Body>
          <View style={styles.valueContainer}>
            <Body style={styles.value}>
              {selectedCity?.name || t('common.location.selectCity')}
            </Body>
            <Ionicons name="chevron-down" size={14} color={colors.textSecondary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    paddingTop: spacing.xxl,
    marginTop: spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 1,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
}); 
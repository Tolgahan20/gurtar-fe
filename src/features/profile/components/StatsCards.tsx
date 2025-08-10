import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Body, H2 } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';

interface StatsCardProps {
  co2Saved: number; // in kilograms
  moneySaved: number;
}

export function StatsCards({ co2Saved, moneySaved }: StatsCardProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statsCard}>
        <H2 style={styles.statsTitle}>{t('common.profile.co2Avoided')}</H2>
        <View style={styles.statsIconContainer}>
          <Ionicons name="leaf-outline" size={32} color={colors.primary} />
        </View>
        <H2 style={styles.statsValue}>{co2Saved}</H2>
        <Body style={styles.statsLabel}>kg</Body>
      </View>

      <View style={styles.statsCard}>
        <H2 style={styles.statsTitle}>{t('common.profile.moneySaved')}</H2>
        <View style={styles.statsIconContainer}>
          <Ionicons name="cash-outline" size={32} color={colors.primary} />
        </View>
        <H2 style={styles.statsValue}>{moneySaved}</H2>
        <Body style={styles.statsLabel}>EUR</Body>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  statsCard: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 14,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  statsIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  statsValue: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  statsLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
}); 
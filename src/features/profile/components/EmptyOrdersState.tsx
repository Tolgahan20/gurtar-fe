import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body, H2 } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';

export function EmptyOrdersState() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleFindPress = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.emptyState}>
      <View style={styles.iconContainer}>
        <Ionicons name="bag-handle-outline" size={40} color={colors.primary} />
      </View>
      <H2 style={styles.title}>{t('common.profile.noOrders')}</H2>
      <Body style={styles.description}>
        {t('common.profile.noOrdersDescription')}
      </Body>
      <TouchableOpacity 
        style={styles.findButton}
        onPress={handleFindPress}
      >
        <Body style={styles.findButtonText}>
          {t('common.profile.findSurpriseBag')}
        </Body>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  findButton: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.sm,
  },
  findButtonText: {
    color: colors.primary,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
}); 
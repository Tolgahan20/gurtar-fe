import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body, H2 } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';

interface InviteCardProps {
  onPress: () => void;
  daysLeft: number;
}

export function InviteCard({ onPress, daysLeft }: InviteCardProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.inviteCard}>
      <View style={styles.inviteContent}>
        <View style={styles.textContent}>
          <H2 style={styles.title}>{t('common.profile.inviteFriends')}</H2>
          <Body style={styles.description}>
            {t('common.profile.inviteDescription', { days: daysLeft })}
          </Body>
          <TouchableOpacity 
            style={styles.earnButton}
            onPress={onPress}
          >
            <Ionicons name="ticket-outline" size={20} color={colors.primary} />
            <Body style={styles.earnButtonText}>
              {t('common.profile.earnVouchers')}
            </Body>
          </TouchableOpacity>
        </View>
        <View style={styles.inviteImagePlaceholder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inviteCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    marginHorizontal: spacing.lg,
  },
  inviteContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContent: {
    flex: 1,
    marginRight: spacing.lg,
  },
  title: {
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  inviteImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: colors.border,
  },
  earnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 100,
    alignSelf: 'flex-start',
    gap: spacing.xs,
  },
  earnButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
}); 
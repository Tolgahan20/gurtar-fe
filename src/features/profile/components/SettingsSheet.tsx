import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, spacing } from '../../../constants/theme';
import { useAuth } from '../../auth/context/AuthContext';

interface SettingsSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal>;
  onClose: () => void;
}

const SECTIONS = [
  {
    key: 'settings',
    items: [
      { icon: 'person-outline', key: 'accountDetails' },
      { icon: 'card-outline', key: 'paymentCards' },
      { icon: 'ticket-outline', key: 'vouchers' },
      { icon: 'gift-outline', key: 'specialRewards' },
      { icon: 'notifications-outline', key: 'notifications' },
    ]
  },
  {
    key: 'community',
    items: [
      { icon: 'people-outline', key: 'inviteFriends' },
      { icon: 'chatbubble-outline', key: 'recommendStore' },
      { icon: 'storefront-outline', key: 'signUpStore' },
    ]
  },
  {
    key: 'support',
    items: [
      { icon: 'bag-handle-outline', key: 'helpOrder' },
      { icon: 'help-circle-outline', key: 'howItWorks' },
      { icon: 'people-outline', key: 'joinUs' },
    ]
  },
  {
    key: 'other',
    items: [
      { icon: 'eye-off-outline', key: 'hiddenStores' },
      { icon: 'document-text-outline', key: 'legal' },
    ]
  }
];

export function SettingsSheet({ bottomSheetRef, onClose }: SettingsSheetProps) {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const snapPoints = useMemo(() => ['90%'], []);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }, [signOut, onClose]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      onDismiss={onClose}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.indicator}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{t('common.profile.settings.title')}</Text>
        <TouchableOpacity 
          onPress={onClose}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <BottomSheetScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {SECTIONS.map((section) => (
          <View key={section.key} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t(`common.profile.settings.sections.${section.key}.title`)}
            </Text>
            {section.items.map((item) => (
              <TouchableOpacity 
                key={item.key} 
                style={styles.menuItem}
              >
                <Ionicons name={item.icon as any} size={24} color={colors.textPrimary} />
                <Text style={styles.menuText}>
                  {t(`common.profile.settings.sections.${section.key}.${item.key}`)}
                </Text>
                <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleSignOut}
        >
          <Text style={styles.logoutText}>{t('common.profile.signOut')}</Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: colors.background,
  },
  indicator: {
    backgroundColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    position: 'relative',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    paddingTop: spacing.md,
    color: colors.textPrimary,
  },
  closeButton: {
    position: 'absolute',
    right: spacing.lg,
    padding: spacing.xs,
    top: spacing.lg + spacing.md, // Align with title's top padding
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  logoutButton: {
    marginTop: spacing.xl * 2,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: 100,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '600',
  },
}); 
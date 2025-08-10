import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { H2 } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';

interface ProfileTopBarProps {
  name: string;
  onSettingsPress: () => void;
}

export function ProfileTopBar({ name, onSettingsPress }: ProfileTopBarProps) {
  return (
    <View style={styles.header}>
      <H2 style={styles.name}>{name}</H2>
      <TouchableOpacity 
        style={styles.settingsButton} 
        onPress={onSettingsPress}
      >
        <Ionicons name="settings-outline" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  name: {
    fontSize: 20,
  },
  settingsButton: {
    padding: spacing.sm,
  },
}); 
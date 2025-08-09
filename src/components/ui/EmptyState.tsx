import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../constants/theme';
import { Body, H2 } from './Typography';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  iconSize?: number;
  iconColor?: string;
  containerStyle?: object;
}

export function EmptyState({
  icon = 'search',
  title,
  description,
  iconSize = 64,
  iconColor = colors.primary,
  containerStyle,
}: EmptyStateProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={iconSize} color={iconColor} />
        </View>
        <H2 style={styles.title}>{title}</H2>
        <Body style={styles.description}>{description}</Body>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  title: {
    textAlign: 'center',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  description: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
}); 
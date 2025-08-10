import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, spacing } from '../../constants/theme';
import { Body, H1 } from './Typography';

interface IllustratedEmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonPress?: () => void;
  illustrationType?: 'favorite' | 'custom';
  customIllustration?: React.ReactNode;
}

export function IllustratedEmptyState({
  title,
  description,
  buttonText,
  onButtonPress,
  illustrationType = 'favorite',
  customIllustration,
}: IllustratedEmptyStateProps) {
  const renderIllustration = () => {
    if (customIllustration) {
      return customIllustration;
    }

    switch (illustrationType) {
      case 'favorite':
        return (
          <View style={styles.illustration}>
            <View style={styles.cardPlaceholder}>
              <View style={styles.circle} />
              <View style={styles.heartContainer}>
                <Ionicons name="heart-outline" size={24} color={colors.textSecondary} />
              </View>
            </View>
            <View style={styles.arrow}>
              <Ionicons 
                name="arrow-forward" 
                size={32} 
                color={colors.primary}
                style={{ transform: [{ rotate: '45deg' }] }}
              />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <H1 style={styles.title}>{title}</H1>
      <Body style={styles.description}>{description}</Body>
      
      {renderIllustration()}

      {buttonText && onButtonPress && (
        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
          <Body style={styles.buttonText}>{buttonText}</Body>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing.xl * 2,
  },
  illustration: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.xl * 2,
    position: 'relative',
  },
  cardPlaceholder: {
    width: '80%',
    height: 160,
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    position: 'relative',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    position: 'absolute',
    left: spacing.lg,
    top: spacing.lg,
  },
  heartContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceLight,
    position: 'absolute',
    right: spacing.lg,
    top: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    position: 'absolute',
    right: '5%',
    top: '30%',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textLight,
  },
}); 
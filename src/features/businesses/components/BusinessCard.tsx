import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body, H2 } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';
import { Business } from '../types';

interface BusinessCardProps {
  business: Business;
  onPress?: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

export function BusinessCard({ 
  business, 
  onPress, 
  onFavoritePress,
  isFavorite = false,
}: BusinessCardProps) {
  const { 
    name, 
    description, 
    address,
    city, 
    logo_url,
    cover_image_url,
    is_verified,
  } = business;

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.95}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ 
            uri: cover_image_url
          }} 
          style={styles.coverImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: logo_url }} 
            style={styles.logo}
            resizeMode="cover"
          />
        </View>
        {onFavoritePress && (
          <TouchableOpacity 
            onPress={onFavoritePress}
            style={styles.favoriteButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? colors.error : colors.textLight} 
            />
          </TouchableOpacity>
        )}
        <View style={styles.imageContent}>
          <View style={styles.titleContainer}>
            <H2 style={styles.imageTitle} numberOfLines={1}>
              {name}
            </H2>
            {is_verified && (
              <Ionicons 
                name="checkmark-circle" 
                size={16} 
                color={colors.primary}
                style={styles.verifiedIcon}
              />
            )}
          </View>
          <View style={styles.imageLocation}>
            <Ionicons 
              name="location-outline" 
              size={14} 
              color={colors.textLight}
              style={styles.imageIcon}
            />
            <Body style={styles.imageLocationText} numberOfLines={1}>
              {city}
            </Body>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Body style={styles.description} numberOfLines={2}>
          {description}
        </Body>

        <View style={styles.footer}>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Ionicons 
                name="map-outline" 
                size={16} 
                color={colors.textSecondary}
                style={styles.icon}
              />
              <Body style={styles.infoText} numberOfLines={1}>
                {address}
              </Body>
            </View>
            <View style={styles.infoItem}>
              <Ionicons 
                name="time-outline" 
                size={16} 
                color={colors.textSecondary}
                style={styles.icon}
              />
              <Body style={styles.infoText}>
                Open Today • 9:00 - 22:00
              </Body>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    height: 200,
    width: '100%',
    backgroundColor: colors.surfaceLight,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  logoContainer: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.surface,
    padding: 4,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  imageContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  imageTitle: {
    color: colors.textLight,
    fontSize: 20,
    marginRight: spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  verifiedIcon: {
    marginTop: 2,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  imageLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageIcon: {
    marginRight: 4,
    opacity: 0.9,
  },
  imageLocationText: {
    color: colors.textLight,
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    padding: spacing.md,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  infoContainer: {
    gap: spacing.sm,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.xs,
    opacity: 0.7,
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: 14,
    flex: 1,
  },
}); 
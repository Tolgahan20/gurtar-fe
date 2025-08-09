import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Body } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';
import { Package } from '../types';

interface PackageCardProps {
  package: Package;
  onPress?: () => void;
  isHorizontal?: boolean;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

export function PackageCard({ 
  package: pkg, 
  onPress, 
  isHorizontal = false,
  onFavoritePress,
  isFavorite = false,
}: PackageCardProps) {
  if (!pkg || !pkg.business) {
    return null;
  }

  const { 
    business, 
    name, 
    image_url,
    pickup_start_time,
    pickup_end_time,
  } = pkg;

  const price = typeof pkg.price === 'string' ? parseFloat(pkg.price) : (pkg.price || 0);
  const original_price = typeof pkg.original_price === 'string' ? parseFloat(pkg.original_price) : (pkg.original_price || 0);
  const quantity_available = typeof pkg.quantity_available === 'number' ? pkg.quantity_available : 0;

  const pickupStartTime = pickup_start_time ? new Date(pickup_start_time) : new Date();
  const pickupEndTime = pickup_end_time ? new Date(pickup_end_time) : new Date();

  const containerStyle: ViewStyle = {
    ...styles.container,
    ...(isHorizontal ? styles.horizontalContainer : styles.verticalContainer),
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity 
        style={styles.touchable} 
        onPress={onPress}
        activeOpacity={0.95}
      >
        <View style={styles.imageContainer}>
          {image_url && (
            <Image 
              source={{ uri: image_url }} 
              style={styles.image}
              resizeMode="cover"
            />
          )}
          {quantity_available > 0 && quantity_available <= 3 && (
            <View style={styles.quantityBadge}>
              <Body style={styles.quantityText}>{quantity_available} left</Body>
            </View>
          )}
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={onFavoritePress}
            activeOpacity={0.9}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={22} 
              color={isFavorite ? colors.error : colors.textLight} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Body style={styles.businessName} numberOfLines={1}>
              {business?.name || ''}
            </Body>
            {business?.rating && (
              <View style={styles.rating}>
                <Ionicons name="star" size={12} color={colors.primary} />
                <Body style={styles.ratingText}>{business.rating.toFixed(1)}</Body>
              </View>
            )}
          </View>

          <Body style={styles.title} numberOfLines={2}>{name || ''}</Body>

          <View style={styles.footer}>
            <View style={styles.collectInfo}>
              <Ionicons name="time-outline" size={13} color={colors.textSecondary} />
              <Body style={styles.collectTime}>
                {format(pickupStartTime, 'HH:mm')} - {format(pickupEndTime, 'HH:mm')}
              </Body>
              <Body style={styles.dot}>•</Body>
              <Body style={styles.distance}>{business?.city || ''}</Body>
            </View>

            <View style={styles.priceContainer}>
              <Body style={styles.originalPrice}>{original_price.toFixed(2)} TL</Body>
              <Body style={styles.price}>{price.toFixed(2)} TL</Body>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.textLight,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  horizontalContainer: {
    width: 300,
  },
  verticalContainer: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  touchable: {
    flex: 1,
  },
  imageContainer: {
    height: 130,
    width: '100%',
    backgroundColor: colors.surfaceLight,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  quantityBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.textLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityText: {
    color: colors.error,
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    bottom: -16,
    right: spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.textLight,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    padding: spacing.md,
    paddingTop: spacing.md + 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  businessName: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 18,
  },
  footer: {
    gap: spacing.xs,
  },
  collectInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  collectTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  dot: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  distance: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  originalPrice: {
    color: colors.textSecondary,
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  price: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
}); 
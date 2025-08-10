import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body, H2 } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';
import { Package } from '../types';

interface PackageCardProps {
  package: Package;
  onPress?: () => void;
  isHorizontal?: boolean;
  isFavorite: boolean;
  onFavoritePress: (businessId: string) => void;
}

export function PackageCard({ 
  package: pkg, 
  onPress, 
  isHorizontal = false,
  isFavorite,
  onFavoritePress,
}: PackageCardProps) {
  const { t } = useTranslation();

  if (!pkg || !pkg.business) {
    return null;
  }

  const { 
    business, 
    title, 
    image_url,
    pickup_start_time,
    pickup_end_time,
    price,
    original_price,
    quantity_available,
  } = pkg;

  const formattedPrice = typeof price === 'string' ? parseFloat(price) : (price || 0);
  const formattedOriginalPrice = typeof original_price === 'string' ? parseFloat(original_price) : (original_price || 0);
  const discount = Math.round(((formattedOriginalPrice - formattedPrice) / formattedOriginalPrice) * 100);
  const pickupStartTime = pickup_start_time ? new Date(pickup_start_time) : new Date();
  const pickupEndTime = pickup_end_time ? new Date(pickup_end_time) : new Date();

  const containerStyle = [
    styles.container,
    isHorizontal ? styles.horizontalContainer : styles.verticalContainer,
  ];

  return (
    <TouchableOpacity 
      style={containerStyle} 
      onPress={onPress}
      activeOpacity={0.95}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: image_url }} 
          style={styles.coverImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        
        <View style={styles.badgeContainer}>
          {quantity_available > 0 && (
            <View style={[
              styles.quantityBadge,
              quantity_available <= 3 && styles.quantityBadgeUrgent
            ]}>
              <Ionicons 
                name={quantity_available <= 3 ? "flash" : "cube-outline"} 
                size={14} 
                color={colors.textLight} 
              />
              <Body style={styles.badgeText}>
                {quantity_available === 1 
                  ? t('common.packages.card.quantity.one', { count: quantity_available })
                  : t('common.packages.card.quantity.other', { count: quantity_available })
                }
              </Body>
            </View>
          )}
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Ionicons name="pricetag" size={14} color={colors.textLight} />
              <Body style={styles.badgeText}>
                {t('common.packages.card.savePercent', { percent: discount })}
              </Body>
            </View>
          )}
        </View>

        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => onFavoritePress(business.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? colors.error : colors.textLight} 
          />
        </TouchableOpacity>

        <View style={styles.imageContent}>
          <Body style={styles.packageTitle} numberOfLines={2}>
            {title}
          </Body>
          <View style={styles.businessInfo}>
            <View style={styles.businessNameContainer}>
              <View style={styles.logoContainer}>
                <Image 
                  source={{ uri: business.cover_image_url }} 
                  style={styles.logo}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.nameRatingContainer}>
                <H2 style={styles.businessName} numberOfLines={1}>
                  {business.name}
                </H2>
                {business.rating && (
                  <View style={styles.rating}>
                    <Ionicons name="star" size={14} color={colors.primary} />
                    <Body style={styles.ratingText}>{business.rating.toFixed(1)}</Body>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons 
              name="location" 
              size={14} 
              color={colors.textSecondary}
              style={styles.infoIcon}
            />
            <Body style={styles.infoText}>{business.address}</Body>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoItem}>
            <Ionicons 
              name="time" 
              size={14} 
              color={colors.textSecondary}
              style={styles.infoIcon}
            />
            <Body style={styles.infoText}>
              {format(pickupStartTime, 'HH:mm')} - {format(pickupEndTime, 'HH:mm')}
            </Body>
          </View>
        </View>

        <View style={styles.priceRow}>
          <View style={styles.priceContainer}>
            <Body style={styles.originalPrice}>{formattedOriginalPrice.toFixed(2)} TL</Body>
            <H2 style={styles.price}>{formattedPrice.toFixed(2)} TL</H2>
          </View>
          <View style={styles.savingsContainer}>
            <Body style={styles.savingsText}>
              {t('common.packages.card.save', { amount: (formattedOriginalPrice - formattedPrice).toFixed(2) })}
            </Body>
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
  horizontalContainer: {
    width: 300,
  },
  verticalContainer: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  imageContainer: {
    height: 180,
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  badgeContainer: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    gap: spacing.xs,
  },
  quantityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.textSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  quantityBadgeUrgent: {
    backgroundColor: colors.error,
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  badgeText: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '600',
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
    paddingBottom: spacing.xl,
  },
  packageTitle: {
    color: colors.textLight,
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginBottom: spacing.lg,
  },
  businessInfo: {
    marginTop: 'auto',
  },
  businessNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: spacing.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  nameRatingContainer: {
    flex: 1,
  },
  businessName: {
    color: colors.textLight,
    fontSize: 16,
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: colors.textLight,
    fontSize: 13,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    padding: spacing.md,
    paddingTop: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  separator: {
    width: 1,
    height: 16,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  infoIcon: {
    marginRight: 4,
    opacity: 0.7,
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  originalPrice: {
    color: colors.textSecondary,
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  price: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '600',
  },
  savingsContainer: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 6,
  },
  savingsText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
}); 
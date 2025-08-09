import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body, H2 } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';
import type { BusinessCardProps } from '../types';

export function BusinessCard({ business, onPress }: BusinessCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: business.cover_image_url || 'https://via.placeholder.com/300x200' }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <H2 style={styles.name} numberOfLines={1}>
          {business.name}
        </H2>
        <Body style={styles.description} numberOfLines={2}>
          {business.description || 'No description available'}
        </Body>
        <View style={styles.footer}>
          <Body style={styles.address} numberOfLines={1}>
            {business.address || 'Address not available'}
          </Body>
          {typeof business.rating === 'number' && (
            <View style={styles.rating}>
              <Body style={styles.ratingText}>
                {business.rating.toFixed(1)}
              </Body>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: spacing.md,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: colors.surfaceDark,
  },
  content: {
    padding: spacing.md,
  },
  name: {
    fontSize: 18,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {
    color: colors.textSecondary,
    fontSize: 12,
    flex: 1,
    marginRight: spacing.sm,
  },
  rating: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  ratingText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
}); 
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body, H2 } from '../../../components/ui/Typography';
import { colors, spacing } from '../../../constants/theme';
import type { BusinessListProps } from '../types';
import { BusinessCard } from './BusinessCard';

export function BusinessList({ title, businesses, onSeeAllPress, onBusinessPress }: BusinessListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <H2 style={styles.title}>{title}</H2>
        <TouchableOpacity onPress={onSeeAllPress} activeOpacity={0.7}>
          <Body style={styles.seeAll}>Tümünü Gör</Body>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {businesses.map((business) => (
          <BusinessCard
            key={business.id}
            business={business}
            onPress={() => onBusinessPress?.(business)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 20,
  },
  seeAll: {
    color: colors.primary,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
  },
}); 
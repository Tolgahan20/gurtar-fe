import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Stack, useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../src/constants/theme';
import { EmptyOrdersState } from '../../src/features/profile/components/EmptyOrdersState';
import { ProfileTopBar } from '../../src/features/profile/components/ProfileTopBar';
import { SettingsSheet } from '../../src/features/profile/components/SettingsSheet';
import { StatsCards } from '../../src/features/profile/components/StatsCards';

export default function ProfileScreen() {
  const settingsRef = useRef<BottomSheetModal>(null);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const router = useRouter();

  const handleSettingsPress = () => {
    setIsSettingsOpen(true);
    settingsRef.current?.present();
  };

  const handleSettingsClose = () => {
    settingsRef.current?.dismiss();
    setIsSettingsOpen(false);
  };

  React.useEffect(() => {
    if (isSettingsOpen) {
      router.setParams({ modal: 'open' });
    } else {
      router.setParams({ modal: undefined });
    }
  }, [isSettingsOpen]);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />

      <ProfileTopBar
        name="Tolgahan Dayanikli"
        onSettingsPress={handleSettingsPress}
      />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <EmptyOrdersState />
        
  

        <StatsCards
          co2Saved={0}
          moneySaved={0}
        />
      </ScrollView>

      <SettingsSheet
        bottomSheetRef={settingsRef}
        onClose={handleSettingsClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: spacing.xl,
    paddingBottom: spacing.xxl * 2, // Extra padding for tab bar
  },
}); 
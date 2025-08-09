
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ErrorHandler } from '../src/components/ErrorHandler';
import { ToastProvider } from '../src/context/ToastContext';
import { AuthProvider } from '../src/features/auth/context/AuthContext';
import { LocationProvider } from '../src/features/location/context/LocationContext';
import '../src/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ToastProvider>
            <AuthProvider>
              <LocationProvider>
                <ErrorHandler />
                <Stack screenOptions={{ headerShown: false }} />
              </LocationProvider>
            </AuthProvider>
          </ToastProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

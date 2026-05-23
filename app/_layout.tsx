import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Manrope_900ExtraBold } from '@expo-google-fonts/manrope';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserStore } from '../store/useUserStore';
import { PaywallModal } from '../components/paywall/PaywallModal';
import { colors } from '../theme/colors';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 60 * 1000 } },
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Manrope_900ExtraBold,
  });
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    // In production: read from MMKV. Default false so onboarding shows on first launch.
    setHasSeenOnboarding(false);
  }, []);

  useEffect(() => {
    if (hasSeenOnboarding === null || !fontsLoaded) return;
    if (!hasSeenOnboarding) {
      router.replace('/(onboarding)/step-name');
    } else if (!isAuthenticated) {
      router.replace('/(auth)/login');
    } else {
      router.replace('/(tabs)');
    }
  }, [hasSeenOnboarding, isAuthenticated, fontsLoaded]);

  if (!fontsLoaded || hasSeenOnboarding === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.canvas }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="class/[id]" />
        <Stack.Screen name="settings" />
      </Stack>
      <PaywallModal />
    </QueryClientProvider>
  );
}

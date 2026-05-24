import { useEffect, useRef } from 'react';
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
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Manrope_900ExtraBold,
  });
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const navigated = useRef(false);

  // Treat font error as ready so a network failure doesn't block the app
  const appReady = fontsLoaded || !!fontError;

  useEffect(() => {
    if (!appReady || navigated.current) return;
    navigated.current = true;
    // Give the Stack one tick to mount before navigating
    const t = setTimeout(() => {
      router.replace('/(onboarding)/step-name');
    }, 50);
    return () => clearTimeout(t);
  }, [appReady]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="class/[id]" />
        <Stack.Screen name="settings" />
      </Stack>
      {appReady && <PaywallModal />}
      {!appReady && (
        <View style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          justifyContent: 'center', alignItems: 'center',
          backgroundColor: colors.canvas,
        }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      )}
    </QueryClientProvider>
  );
}

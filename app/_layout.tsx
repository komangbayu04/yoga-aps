import { useEffect, useRef } from 'react';
import { Stack, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Manrope_900ExtraBold } from '@expo-google-fonts/manrope';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { useUserStore } from '../store/useUserStore';
import { PaywallModal } from '../components/paywall/PaywallModal';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 60 * 1000 } },
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Manrope_900ExtraBold,
  });
  const navigated = useRef(false);

  const appReady = fontsLoaded || !!fontError;

  useEffect(() => {
    if (!appReady || navigated.current) return;
    navigated.current = true;
    SplashScreen.hideAsync();
    router.replace('/(onboarding)/step-name');
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
      <PaywallModal />
    </QueryClientProvider>
  );
}

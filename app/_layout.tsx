import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Manrope_900ExtraBold } from '@expo-google-fonts/manrope';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaywallModal } from '../components/paywall/PaywallModal';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 60 * 1000 } },
});

export default function RootLayout() {
  useFonts({ Inter_400Regular, Inter_600SemiBold, Manrope_900ExtraBold });

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

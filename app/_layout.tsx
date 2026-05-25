import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Manrope_900ExtraBold } from '@expo-google-fonts/manrope';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaywallModal } from '../components/paywall/PaywallModal';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 60 * 1000 } },
});

interface ErrorBoundaryState { error: Error | null }

class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <ScrollView style={styles.errContainer}>
          <Text style={styles.errTitle}>App Crash — JS Error</Text>
          <Text style={styles.errMsg}>{this.state.error.message}</Text>
          <Text style={styles.errStack}>{this.state.error.stack}</Text>
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

export default function RootLayout() {
  useFonts({ Inter_400Regular, Inter_600SemiBold, Manrope_900ExtraBold });

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  errContainer: { flex: 1, backgroundColor: '#1a0000', padding: 16, paddingTop: 48 },
  errTitle: { color: '#ff4444', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  errMsg: { color: '#ffaaaa', fontSize: 14, marginBottom: 16 },
  errStack: { color: '#ff8888', fontSize: 11, fontFamily: 'monospace' },
});

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { Button } from '../../components/ui/Button';
import { useSubscriptionStore } from '../../store/useSubscriptionStore';

const planLabels: Record<string, string> = {
  free: 'Gratis',
  premium_monthly: 'Premium Bulanan',
  premium_yearly: 'Premium Tahunan',
};

export default function SubscriptionScreen() {
  const { plan, showPaywall } = useSubscriptionStore();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Langganan</Text>
        <Text style={styles.currentPlan}>Plan aktif: {planLabels[plan]}</Text>
        {plan === 'free' && (
          <Button
            label="Upgrade ke Premium"
            variant="primary"
            fullWidth
            onPress={() => showPaywall('session_7')}
          />
        )}
        {plan !== 'free' && (
          <View style={styles.activeCard}>
            <Text style={styles.activeText}>✓ Premium aktif</Text>
            <Text style={styles.activeSub}>
              Nikmati semua fitur tanpa batas
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvasSoft },
  container: { padding: 24, gap: 16 },
  title: { fontFamily: 'Manrope_900ExtraBold', fontSize: 28, color: colors.ink },
  currentPlan: { fontFamily: 'Inter_400Regular', fontSize: 16, color: colors.body },
  activeCard: {
    backgroundColor: colors.primaryPale,
    borderRadius: 24,
    padding: 20,
    gap: 4,
  },
  activeText: { fontFamily: 'Inter_600SemiBold', fontSize: 16, color: colors.positiveDeep },
  activeSub: { fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.body },
});

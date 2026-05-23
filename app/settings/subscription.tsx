import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { Button } from '../../components/ui/Button';
import { useSubscriptionStore } from '../../store/useSubscriptionStore';

export default function SubscriptionScreen() {
  const { plan, showPaywall } = useSubscriptionStore();
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Langganan</Text>
        <Text style={styles.currentPlan}>
          Plan aktif: {plan === 'free' ? 'Gratis' : plan === 'premium_monthly' ? 'Premium Bulanan' : 'Premium Tahunan'}
        </Text>
        {plan === 'free' && (
          <Button label="Upgrade ke Premium" variant="primary" fullWidth onPress={() => showPaywall('session_7')} />
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
});

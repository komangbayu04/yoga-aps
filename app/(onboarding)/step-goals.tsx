import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { Button } from '../../components/ui/Button';
import { useUserStore } from '../../store/useUserStore';

const goalOptions = [
  { id: 'pain', label: 'Kurangi Nyeri', icon: '💆' },
  { id: 'relax', label: 'Lebih Rileks', icon: '🧘' },
  { id: 'posture', label: 'Improve Postur', icon: '🦒' },
  { id: 'habit', label: 'Mulai Kebiasaan Sehat', icon: '🌱' },
];

function ProgressDots({ current }: { current: number }) {
  return (
    <View style={styles.dots}>
      {[0, 1, 2, 3].map((i) => (
        <View key={i} style={[styles.dot, i === current && styles.dotActive]} />
      ))}
    </View>
  );
}

export default function StepGoals() {
  const [selected, setSelected] = useState<string | null>(null);
  const setGoals = useUserStore((s) => s.setGoals);
  const setUser = useUserStore((s) => s.setUser);
  const complaints = useUserStore((s) => s.complaints);

  const handleFinish = () => {
    if (!selected) return;
    setGoals([selected]);
    setUser({
      id: 'mock-user-id',
      name: 'Pengguna',
      email: 'user@example.com',
      jobType: 'kantor',
      complaints,
      goals: [selected],
    });
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <ProgressDots current={3} />
        <View style={styles.content}>
          <Text style={styles.heading}>Apa tujuan utama kamu?</Text>
          <Text style={styles.sub}>Pilih satu yang paling sesuai</Text>
          <View style={styles.grid}>
            {goalOptions.map((opt) => (
              <TouchableOpacity
                key={opt.id}
                style={[styles.card, selected === opt.id && styles.cardSelected]}
                onPress={() => setSelected(opt.id)}
                activeOpacity={0.85}
              >
                <Text style={styles.cardIcon}>{opt.icon}</Text>
                <Text style={styles.cardLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            label="Mulai Sekarang →"
            variant="primary"
            fullWidth
            onPress={handleFinish}
            disabled={!selected}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.canvasSoft },
  inner: { flex: 1, padding: 24 },
  dots: { flexDirection: 'row', gap: 8, marginTop: 16 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.mute },
  dotActive: { backgroundColor: colors.primary },
  content: { flex: 1, justifyContent: 'center', gap: 12 },
  heading: { fontFamily: 'Manrope_900ExtraBold', fontSize: 28, color: colors.ink },
  sub: { fontFamily: 'Inter_400Regular', fontSize: 15, color: colors.body },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  card: {
    width: '47%',
    backgroundColor: colors.canvas,
    borderRadius: radius.lg,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: { borderColor: colors.primary },
  cardIcon: { fontSize: 28 },
  cardLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: colors.ink,
    textAlign: 'center',
  },
  footer: { paddingBottom: 16 },
});

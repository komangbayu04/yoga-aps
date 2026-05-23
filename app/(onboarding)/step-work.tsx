import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { Button } from '../../components/ui/Button';

const workOptions = [
  { id: 'kantor', label: 'Kantor', icon: '🏢' },
  { id: 'wfh', label: 'WFH', icon: '🏠' },
  { id: 'hybrid', label: 'Hybrid', icon: '💼' },
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

export default function StepWork() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <ProgressDots current={1} />
        <View style={styles.content}>
          <Text style={styles.heading}>Kamu bekerja dari mana?</Text>
          <Text style={styles.sub}>Pilih yang paling sesuai</Text>
          <View style={styles.grid}>
            {workOptions.map((opt) => (
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
            label="Lanjut →"
            variant="primary"
            fullWidth
            onPress={() => router.push('/(onboarding)/step-complaints')}
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
  grid: { flexDirection: 'row', gap: 12, marginTop: 8 },
  card: {
    flex: 1,
    backgroundColor: colors.canvas,
    borderRadius: radius.lg,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: { borderColor: colors.primary },
  cardIcon: { fontSize: 32 },
  cardLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.ink },
  footer: { paddingBottom: 16 },
});

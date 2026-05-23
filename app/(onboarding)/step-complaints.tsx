import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { Button } from '../../components/ui/Button';
import { complaints } from '../../constants/complaints';
import { useUserStore } from '../../store/useUserStore';

function ProgressDots({ current }: { current: number }) {
  return (
    <View style={styles.dots}>
      {[0, 1, 2, 3].map((i) => (
        <View key={i} style={[styles.dot, i === current && styles.dotActive]} />
      ))}
    </View>
  );
}

export default function StepComplaints() {
  const [selected, setSelected] = useState<string[]>([]);
  const setComplaints = useUserStore((s) => s.setComplaints);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleNext = () => {
    setComplaints(selected);
    router.push('/(onboarding)/step-goals');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <ProgressDots current={2} />
        <View style={styles.content}>
          <Text style={styles.heading}>Keluhan apa yang sering kamu rasakan?</Text>
          <Text style={styles.sub}>Pilih satu atau lebih</Text>
          <View style={styles.grid}>
            {complaints.map((item) => {
              const isSelected = selected.includes(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.chip,
                    isSelected ? styles.chipSelected : styles.chipDefault,
                  ]}
                  onPress={() => toggle(item.id)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.chipIcon}>{item.emoji}</Text>
                  <Text
                    style={[
                      styles.chipLabel,
                      isSelected && styles.chipLabelSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            label="Lanjut →"
            variant="primary"
            fullWidth
            onPress={handleNext}
            disabled={selected.length === 0}
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
  heading: { fontFamily: 'Manrope_900ExtraBold', fontSize: 24, color: colors.ink },
  sub: { fontFamily: 'Inter_400Regular', fontSize: 15, color: colors.body },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8 },
  chip: {
    width: '47%',
    borderRadius: radius.lg,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    borderWidth: 2,
  },
  chipDefault: { backgroundColor: colors.canvasSoft, borderColor: colors.mute },
  chipSelected: { backgroundColor: colors.primaryPale, borderColor: colors.primary },
  chipIcon: { fontSize: 24 },
  chipLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: colors.mute,
    textAlign: 'center',
  },
  chipLabelSelected: { color: colors.ink },
  footer: { paddingBottom: 16 },
});

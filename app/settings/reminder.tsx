import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { Button } from '../../components/ui/Button';
import { radius } from '../../theme/radius';

const presets = [
  { id: 'morning', icon: '☀️', label: 'Pagi Semangat', time: '07:00' },
  { id: 'lunch', icon: '🍽', label: 'Istirahat Siang', time: '12:30' },
  { id: 'evening', icon: '🌙', label: 'Malam Rileks', time: '20:00' },
];

const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

export default function ReminderSettings() {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customOn, setCustomOn] = useState(false);
  const [smartNudge, setSmartNudge] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Sen', 'Sel', 'Rab', 'Kam', 'Jum']);
  const [dndOn, setDndOn] = useState(false);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Pengingat</Text>

        {/* Presets */}
        <Text style={styles.sectionLabel}>Pilih Waktu Pengingat</Text>
        {presets.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[styles.presetCard, selectedPreset === p.id && styles.presetCardSelected]}
            onPress={() => setSelectedPreset(selectedPreset === p.id ? null : p.id)}
            activeOpacity={0.85}
          >
            <Text style={styles.presetIcon}>{p.icon}</Text>
            <View style={styles.presetInfo}>
              <Text style={styles.presetLabel}>{p.label}</Text>
              <Text style={styles.presetTime}>{p.time}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Custom */}
        <View style={styles.customCard}>
          <View style={styles.customHeader}>
            <Text style={styles.sectionLabel}>Pengingat Kustom</Text>
            <Switch value={customOn} onValueChange={setCustomOn} thumbColor={colors.canvas} trackColor={{ true: colors.primary, false: colors.mute }} />
          </View>
          {customOn && (
            <View style={styles.dayRow}>
              {days.map((d) => (
                <TouchableOpacity
                  key={d}
                  style={[styles.dayChip, selectedDays.includes(d) && styles.dayChipSelected]}
                  onPress={() => toggleDay(d)}
                >
                  <Text style={[styles.dayText, selectedDays.includes(d) && styles.dayTextSelected]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Smart Nudge */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Ingatkan kalau belum yoga jam 15:00</Text>
              <Text style={styles.rowSub}>Notifikasi lembut jika belum ada sesi hari ini</Text>
            </View>
            <Switch value={smartNudge} onValueChange={setSmartNudge} thumbColor={colors.canvas} trackColor={{ true: colors.primary, false: colors.mute }} />
          </View>
        </View>

        {/* DND */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Jangan Ganggu</Text>
            <Switch value={dndOn} onValueChange={setDndOn} thumbColor={colors.canvas} trackColor={{ true: colors.primary, false: colors.mute }} />
          </View>
        </View>

        <Button label="Simpan Pengingat" variant="primary" fullWidth onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvasSoft },
  container: { padding: 24, gap: 12 },
  title: { fontFamily: 'Manrope_900ExtraBold', fontSize: 28, color: colors.ink, marginBottom: 4 },
  sectionLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.body },
  presetCard: { backgroundColor: colors.canvas, borderRadius: radius.lg, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 2, borderColor: 'transparent' },
  presetCardSelected: { borderColor: colors.primary },
  presetIcon: { fontSize: 28 },
  presetInfo: { flex: 1 },
  presetLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: colors.ink },
  presetTime: { fontFamily: 'Inter_400Regular', fontSize: 13, color: colors.mute },
  customCard: { backgroundColor: colors.canvas, borderRadius: radius.lg, padding: 16, gap: 12 },
  customHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dayRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  dayChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.ink },
  dayChipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  dayText: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: colors.ink },
  dayTextSelected: { color: colors.canvas },
  card: { backgroundColor: colors.canvas, borderRadius: radius.lg, padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: colors.ink },
  rowSub: { fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.mute, marginTop: 2 },
});

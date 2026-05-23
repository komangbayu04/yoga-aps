import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { ClassCard } from '../../components/class/ClassCard';
import { useClasses } from '../../hooks/useClasses';

const durationFilters = ['Semua', '5–7 mnt', '10–15 mnt', '20–30 mnt'];
const categoryFilters = ['Quick Fix', 'Pagi', 'Siang', 'Malam', 'Weekend'];
const complaintFilters = ['Punggung Bawah', 'Leher & Bahu', 'Stres & Mental', 'Mata Lelah', 'Pergelangan Tangan'];

function FilterChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected ? styles.chipSelected : styles.chipDefault]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : styles.chipTextDefault]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function LibraryScreen() {
  const { data: allClasses } = useClasses();
  const [duration, setDuration] = useState('Semua');
  const [category, setCategory] = useState<string | null>(null);
  const [complaint, setComplaint] = useState<string | null>(null);

  const filtered = (allClasses ?? []).filter((c) => {
    if (duration === '5–7 mnt' && !(c.duration_min >= 5 && c.duration_min <= 7)) return false;
    if (duration === '10–15 mnt' && !(c.duration_min >= 10 && c.duration_min <= 15)) return false;
    if (duration === '20–30 mnt' && !(c.duration_min >= 20 && c.duration_min <= 30)) return false;
    if (category) {
      const catMap: Record<string, string> = { 'Quick Fix': 'quick_fix', Pagi: 'pagi', Siang: 'siang', Malam: 'malam', Weekend: 'weekend' };
      if (c.category !== catMap[category]) return false;
    }
    if (complaint && !c.complaints.includes(complaint)) return false;
    return true;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {durationFilters.map((f) => <FilterChip key={f} label={f} selected={duration === f} onPress={() => setDuration(f)} />)}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {categoryFilters.map((f) => <FilterChip key={f} label={f} selected={category === f} onPress={() => setCategory(category === f ? null : f)} />)}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {complaintFilters.map((f) => <FilterChip key={f} label={f} selected={complaint === f} onPress={() => setComplaint(complaint === f ? null : f)} />)}
        </ScrollView>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <ClassCard item={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvasSoft },
  filterBar: { backgroundColor: colors.canvas, paddingTop: 12, paddingBottom: 8, gap: 6 },
  filterRow: { paddingHorizontal: 16, gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: radius.pill },
  chipDefault: { backgroundColor: colors.canvas, borderWidth: 1, borderColor: colors.ink },
  chipSelected: { backgroundColor: colors.primary },
  chipText: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  chipTextDefault: { color: colors.ink },
  chipTextSelected: { color: colors.canvas },
  grid: { padding: 16, paddingBottom: 32 },
  row: { gap: 12, marginBottom: 12 },
});

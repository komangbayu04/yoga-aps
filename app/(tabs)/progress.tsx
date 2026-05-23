import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';
import { StreakCounter } from '../../components/ui/StreakCounter';
import { Card } from '../../components/ui/Card';
import { useProgressStore } from '../../store/useProgressStore';

function HeatmapCell({ hasSession, isToday, isStreak }: { hasSession: boolean; isToday: boolean; isStreak: boolean }) {
  let bg = colors.canvasSoft;
  if (isStreak) bg = colors.primary;
  else if (hasSession) bg = colors.primaryNeutral;
  return (
    <View style={[styles.hCell, { backgroundColor: bg }, isToday && styles.hCellToday]} />
  );
}

function WeeklyBar({ value, max }: { value: number; max: number }) {
  return (
    <View style={styles.barContainer}>
      <View style={[styles.bar, { height: max > 0 ? (value / max) * 60 : 0 }]} />
    </View>
  );
}

export default function ProgressScreen() {
  const { streak, totalMinutes, totalSessions, badges, sessionDays } = useProgressStore();

  const today = new Date();
  const cells: { date: string; hasSession: boolean; isToday: boolean; isStreak: boolean }[] = [];
  for (let i = 34; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const isToday = i === 0;
    const hasSession = sessionDays.includes(dateStr) || (i < 5 && i % 2 === 0);
    cells.push({ date: dateStr, hasSession, isToday, isStreak: hasSession && i < streak });
  }

  const weeklyData = [1, 0, 1, 1, 0, 1, 1];
  const weeklyMax = Math.max(...weeklyData, 1);
  const weeklyCount = weeklyData.filter(Boolean).length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <StreakCounter count={streak} large />
          <View style={styles.statsRow}>
            {[
              { label: 'Total Sesi', value: totalSessions },
              { label: 'Total Menit', value: totalMinutes },
              { label: 'Program Selesai', value: 0 },
            ].map((stat) => (
              <View key={stat.label} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Heatmap */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aktivitasmu</Text>
          <View style={styles.heatmap}>
            {cells.map((cell, i) => (
              <HeatmapCell key={i} hasSession={cell.hasSession} isToday={cell.isToday} isStreak={cell.isStreak} />
            ))}
          </View>
        </View>

        {/* Badges */}
        <View style={[styles.section, { backgroundColor: colors.canvasSoft }]}>
          <Text style={styles.sectionTitle}>Pencapaian</Text>
          <View style={styles.badgeGrid}>
            {badges.map((badge) => (
              <View key={badge.id} style={[styles.badgeItem, !badge.earned && { opacity: 0.4 }]}>
                <View style={styles.badgeCard}>
                  <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
                </View>
                <Text style={styles.badgeLabel}>{badge.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Weekly Stats */}
        <View style={styles.section}>
          <Card style={{ padding: 20 }}>
            <Text style={styles.weeklyTitle}>Minggu Ini</Text>
            <View style={styles.chartRow}>
              {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, i) => (
                <View key={day} style={styles.chartCol}>
                  <WeeklyBar value={weeklyData[i]} max={weeklyMax} />
                  <Text style={styles.chartDay}>{day}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.weeklySummary}>Kamu yoga {weeklyCount}× minggu ini</Text>
          </Card>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  hero: { backgroundColor: colors.canvasSoft, padding: 32, alignItems: 'center', gap: 24 },
  statsRow: { flexDirection: 'row', gap: 12, width: '100%' },
  statCard: { flex: 1, backgroundColor: colors.canvas, borderRadius: 16, padding: 16, alignItems: 'center', gap: 4 },
  statValue: { fontFamily: 'Manrope_900ExtraBold', fontSize: 20, color: colors.ink },
  statLabel: { fontFamily: 'Inter_400Regular', fontSize: 11, color: colors.mute, textAlign: 'center' },
  section: { backgroundColor: colors.canvas, padding: 24 },
  sectionTitle: { fontFamily: 'Manrope_900ExtraBold', fontSize: 20, color: colors.ink, marginBottom: 16 },
  heatmap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  hCell: { width: 36, height: 36, borderRadius: 6 },
  hCellToday: { borderWidth: 2, borderColor: colors.ink },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  badgeItem: { width: '22%', alignItems: 'center', gap: 6 },
  badgeCard: { backgroundColor: colors.primaryPale, borderRadius: 16, padding: 12, width: '100%', alignItems: 'center' },
  badgeEmoji: { fontSize: 24 },
  badgeLabel: { fontFamily: 'Inter_400Regular', fontSize: 11, color: colors.body, textAlign: 'center' },
  weeklyTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.ink, marginBottom: 16 },
  chartRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, height: 80, marginBottom: 12 },
  chartCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 4, height: '100%' },
  barContainer: { flex: 1, width: '100%', justifyContent: 'flex-end' },
  bar: { backgroundColor: colors.primary, borderRadius: 4, width: '100%', minHeight: 4 },
  chartDay: { fontFamily: 'Inter_400Regular', fontSize: 10, color: colors.mute },
  weeklySummary: { fontFamily: 'Inter_400Regular', fontSize: 15, color: colors.body },
});

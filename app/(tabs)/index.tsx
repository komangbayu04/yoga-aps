import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../theme/colors';
import { StreakCounter } from '../../components/ui/StreakCounter';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { ClassCard } from '../../components/class/ClassCard';
import { useUserStore } from '../../store/useUserStore';
import { useProgressStore } from '../../store/useProgressStore';
import { useClasses, useRecommendedClasses } from '../../hooks/useClasses';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Selamat pagi';
  if (hour < 17) return 'Selamat siang';
  return 'Selamat malam';
}

export default function HomeScreen() {
  const user = useUserStore((s) => s.user);
  const { streak, activeProgram } = useProgressStore();
  const { data: allClasses } = useClasses();
  const { data: recommended } = useRecommendedClasses();

  const quickFix = allClasses?.filter((c) => c.category === 'quick_fix') ?? [];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero Band */}
        <View style={styles.heroBand}>
          <Text style={styles.greeting}>
            {getGreeting()}, {user?.name ?? 'teman'} 👋
          </Text>
          <Text style={styles.heroParagraph}>
            Kelas hari ini sudah menunggumu. Yuk mulai!
          </Text>
          <StreakCounter count={streak} />
        </View>

        {/* Quick Fix */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>MULAI SEKARANG</Text>
          <Text style={styles.sectionTitle}>5 menit di meja kerja</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hScroll}
          >
            {quickFix.map((cls) => (
              <View key={cls.id} style={styles.hCard}>
                <ClassCard item={cls} compact />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recommended */}
        <View style={[styles.section, { backgroundColor: colors.canvasSoft }]}>
          <Text style={styles.sectionTitle}>Untukmu Hari Ini</Text>
          <View style={styles.vList}>
            {(recommended ?? []).map((cls) => (
              <ClassCard key={cls.id} item={cls} />
            ))}
          </View>
        </View>

        {/* Active Program Banner */}
        {activeProgram && (
          <View style={styles.programBanner}>
            <Text style={styles.programTitle}>{activeProgram.title}</Text>
            <Text style={styles.programDay}>
              Hari {activeProgram.currentDay} dari {activeProgram.totalDays}
            </Text>
            <ProgressBar
              progress={activeProgram.currentDay / activeProgram.totalDays}
              style={{ marginVertical: 12 }}
            />
            <Button
              label="Lanjutkan"
              variant="primary"
              size="small"
              onPress={() => router.push('/(tabs)/programs')}
            />
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  scroll: { flex: 1 },
  heroBand: {
    backgroundColor: colors.canvasSoft,
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
    gap: 8,
  },
  greeting: {
    fontFamily: 'Manrope_900ExtraBold',
    fontSize: 24,
    color: colors.ink,
  },
  heroParagraph: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: colors.body,
  },
  section: { backgroundColor: colors.canvas, padding: 24 },
  eyebrow: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: colors.mute,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: 'Manrope_900ExtraBold',
    fontSize: 20,
    color: colors.ink,
    marginBottom: 16,
  },
  hScroll: { paddingRight: 24, gap: 12 },
  hCard: { width: 160 },
  vList: { gap: 12 },
  programBanner: {
    backgroundColor: colors.ink,
    margin: 24,
    borderRadius: 24,
    padding: 24,
  },
  programTitle: {
    fontFamily: 'Manrope_900ExtraBold',
    fontSize: 20,
    color: colors.primary,
  },
  programDay: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: colors.canvas,
    marginTop: 4,
  },
});

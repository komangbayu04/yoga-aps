import React, { useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../theme/colors';
import { StreakCounter } from '../../components/ui/StreakCounter';
import { Button } from '../../components/ui/Button';
import { ClassCard } from '../../components/class/ClassCard';
import { ProgramRecommendationCard } from '../../components/program/ProgramRecommendationCard';
import { ActiveSessionCard } from '../../components/program/ActiveSessionCard';
import { useUserStore } from '../../store/useUserStore';
import { useProgressStore } from '../../store/useProgressStore';
import { useSubscriptionStore } from '../../store/useSubscriptionStore';
import { useClasses } from '../../hooks/useClasses';
import { usePrograms } from '../../hooks/usePrograms';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Selamat pagi';
  if (hour < 17) return 'Selamat siang';
  return 'Selamat malam';
}

export default function HomeScreen() {
  const user = useUserStore((s) => s.user);
  const userComplaints = useUserStore((s) => s.complaints);
  const { streak, activeProgram, todayCompleted } = useProgressStore();
  const { plan } = useSubscriptionStore();
  const isPremium = plan !== 'free';

  const { data: allClasses } = useClasses();
  const { data: programs } = usePrograms();

  const quickFix = allClasses?.filter((c) => c.category === 'quick_fix') ?? [];

  const fullProgram = useMemo(
    () => programs?.find((p) => p.id === activeProgram?.id) ?? null,
    [programs, activeProgram?.id]
  );

  const todayClass = useMemo(() => {
    if (!activeProgram || !allClasses || !fullProgram) return null;
    const matching = allClasses.filter((c) => c.complaints.includes(fullProgram.complaint));
    const pool = matching.length > 0 ? matching : allClasses;
    return pool[(activeProgram.currentDay - 1) % pool.length] ?? null;
  }, [activeProgram, allClasses, fullProgram]);

  const nextClass = useMemo(() => {
    if (!activeProgram || !allClasses || !fullProgram) return null;
    const matching = allClasses.filter((c) => c.complaints.includes(fullProgram.complaint));
    const pool = matching.length > 0 ? matching : allClasses;
    return pool[activeProgram.currentDay % pool.length] ?? null;
  }, [activeProgram, allClasses, fullProgram]);

  const relevantPrograms = useMemo(() => {
    const all = programs ?? [];
    if (userComplaints.length === 0) return all;
    return all.filter((p) => userComplaints.includes(p.complaint));
  }, [programs, userComplaints]);

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

        {/* Active Session — shown between hero and quick fix if program is active */}
        {activeProgram !== null && (
          <View style={styles.section}>
            <Text style={styles.eyebrow}>PROGRAM AKTIF</Text>
            <ActiveSessionCard
              programTitle={activeProgram.title}
              programIcon={fullProgram?.icon ?? '🧘'}
              currentDay={activeProgram.currentDay}
              totalDays={activeProgram.totalDays}
              todayClass={todayClass}
              nextClassId={nextClass?.id ?? null}
              todayCompleted={todayCompleted}
            />
          </View>
        )}

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

        {/* Untukmu Hari Ini */}
        <View style={[styles.section, { backgroundColor: colors.canvasSoft }]}>
          <Text style={styles.sectionTitle}>Untukmu Hari Ini</Text>
          <Text style={styles.sectionSub}>
            {activeProgram !== null
              ? 'Atau jelajahi program lainnya'
              : 'Pilih program untuk mulai perjalananmu'}
          </Text>
          <View style={styles.vList}>
            {relevantPrograms.map((program) => (
              <ProgramRecommendationCard key={program.id} program={program} />
            ))}
          </View>
          <Button
            label="Lihat semua program →"
            variant="tertiary"
            fullWidth
            onPress={() => router.push('/(tabs)/programs')}
            style={{ marginTop: 12 }}
          />
        </View>

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
  greeting: { fontFamily: 'Manrope_900ExtraBold', fontSize: 24, color: colors.ink },
  heroParagraph: { fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.body },
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
    marginBottom: 4,
  },
  sectionSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: colors.mute,
    marginBottom: 16,
  },
  hScroll: { paddingRight: 24, gap: 12 },
  hCard: { width: 160 },
  vList: { gap: 12 },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useProgramDetail } from '../../hooks/usePrograms';
import { useProgressStore } from '../../store/useProgressStore';
import { useSubscriptionStore } from '../../store/useSubscriptionStore';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';

function showToast(msg: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert('', msg, [{ text: 'OK' }]);
  }
}

type DayStatus = 'completed' | 'active' | 'locked';

export default function ProgramDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: program } = useProgramDetail(id ?? '');
  const { activeProgram, setActiveProgram } = useProgressStore();
  const { plan, showPaywall } = useSubscriptionStore();
  const isPremium = plan !== 'free';

  if (!program) return null;

  const isActive = activeProgram?.id === program.id;
  const currentDay = isActive ? activeProgram!.currentDay : 0;

  function getDayStatus(dayNum: number): DayStatus {
    if (!isPremium && program!.is_premium) return 'locked';
    if (dayNum < currentDay) return 'completed';
    if (dayNum === currentDay || (!isActive && dayNum === 1)) return 'active';
    return 'locked';
  }

  function handleDayPress(day: { day: number; classId: string }) {
    const status = getDayStatus(day.day);
    if (status === 'locked') {
      if (!isPremium && program!.is_premium) {
        showPaywall('program_lock');
      } else {
        showToast('Selesaikan hari sebelumnya dulu');
      }
      return;
    }
    router.push(`/class/${day.classId}`);
  }

  function handleCTA() {
    if (!isPremium && program!.is_premium) {
      showPaywall('program_lock');
      return;
    }
    if (!isActive) {
      setActiveProgram({ id: program!.id, title: program!.title, currentDay: 1, totalDays: program!.total_days });
      const first = program!.days.find((d) => d.day === 1);
      if (first) router.push(`/class/${first.classId}`);
    } else {
      const today = program!.days.find((d) => d.day === currentDay);
      if (today) router.push(`/class/${today.classId}`);
    }
  }

  const ctaLabel = isActive ? `Lanjutkan Hari ${currentDay}` : 'Mulai Program';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>← Kembali</Text>
          </Pressable>
          <Text style={styles.programIcon}>{program.icon}</Text>
          <Text style={styles.programTitle}>{program.title}</Text>
          <View style={styles.metaRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{program.complaint}</Text>
            </View>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>{program.total_days} hari · {program.minutes_per_day} mnt/hari</Text>
          </View>
          {program.is_premium && !isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>🔒 Program Premium</Text>
            </View>
          )}
          <Text style={styles.description}>{program.description}</Text>
          {isActive && (
            <View style={{ marginTop: 16 }}>
              <Text style={styles.progressLabel}>Hari {currentDay} dari {program.total_days}</Text>
              <ProgressBar progress={currentDay / program.total_days} height={4} style={{ marginTop: 8 }} />
            </View>
          )}
        </View>

        <View style={styles.dayListSection}>
          <Text style={styles.sectionLabel}>Jadwal Harian</Text>
          <View style={styles.dayList}>
            {program.days.map((day) => {
              const status = getDayStatus(day.day);
              return (
                <Pressable
                  key={day.day}
                  style={[
                    styles.dayCard,
                    status === 'active' && styles.dayCardActive,
                    status === 'completed' && styles.dayCardCompleted,
                  ]}
                  onPress={() => handleDayPress(day)}
                >
                  <View style={[
                    styles.dayCircle,
                    status === 'completed' && styles.dayCircleCompleted,
                    status === 'active' && styles.dayCircleActive,
                  ]}>
                    <Text style={[styles.dayNum, status === 'active' && styles.dayNumActive]}>
                      {status === 'completed' ? '✓' : `H${day.day}`}
                    </Text>
                  </View>
                  <View style={styles.dayInfo}>
                    <Text style={[styles.dayTitle, status === 'locked' && styles.textMuted]}>
                      {day.title}
                    </Text>
                    <Text style={styles.dayMeta}>{day.duration_min} mnt</Text>
                  </View>
                  <Text style={styles.statusIcon}>
                    {status === 'active' ? '▶' : status === 'locked' ? '🔒' : ''}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.stickyBottom}>
        <Button label={ctaLabel} variant="primary" fullWidth onPress={handleCTA} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  header: {
    backgroundColor: colors.canvasSoft,
    paddingTop: 48,
    paddingBottom: 28,
    paddingHorizontal: 24,
  },
  backBtn: { marginBottom: 20 },
  backText: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.primary },
  programIcon: { fontSize: 48, marginBottom: 12 },
  programTitle: {
    fontFamily: 'Manrope_900ExtraBold',
    fontSize: 28,
    color: colors.ink,
    marginBottom: 12,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' },
  tag: {
    backgroundColor: colors.primaryPale,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  tagText: { fontFamily: 'Inter_600SemiBold', fontSize: 12, color: colors.positiveDeep },
  metaDot: { fontFamily: 'Inter_400Regular', fontSize: 13, color: colors.mute },
  metaText: { fontFamily: 'Inter_400Regular', fontSize: 13, color: colors.mute },
  premiumBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.ink,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginBottom: 12,
  },
  premiumText: { fontFamily: 'Inter_600SemiBold', fontSize: 12, color: colors.canvas },
  description: { fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.body, lineHeight: 22 },
  progressLabel: { fontFamily: 'Inter_400Regular', fontSize: 13, color: colors.mute },
  dayListSection: { padding: 24 },
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: colors.mute,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  dayList: { gap: 10 },
  dayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.canvasSoft,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dayCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.canvas,
  },
  dayCardCompleted: {
    backgroundColor: colors.canvasSoft,
    opacity: 0.8,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryPale,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  dayCircleActive: { backgroundColor: colors.primary },
  dayCircleCompleted: { backgroundColor: colors.positive },
  dayNum: { fontFamily: 'Inter_600SemiBold', fontSize: 11, color: colors.primary },
  dayNumActive: { color: colors.canvas },
  dayInfo: { flex: 1 },
  dayTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.ink },
  textMuted: { color: colors.mute },
  dayMeta: { fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.mute, marginTop: 2 },
  statusIcon: { fontSize: 14 },
  stickyBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.canvas,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: colors.canvasSoft,
  },
});

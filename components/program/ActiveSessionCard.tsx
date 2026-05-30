import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { colors } from '../../theme/colors';

interface TodayClass {
  id: string;
  title: string;
  duration_min: number;
  location: string;
}

interface Props {
  programTitle: string;
  programIcon: string;
  currentDay: number;
  totalDays: number;
  todayClass: TodayClass | null;
  nextClassId: string | null;
  todayCompleted: boolean;
}

export function ActiveSessionCard({
  programTitle,
  programIcon,
  currentDay,
  totalDays,
  todayClass,
  nextClassId,
  todayCompleted,
}: Props) {
  return (
    <Card padding={20}>
      {todayCompleted && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}

      <View style={styles.topRow}>
        <Text style={styles.programName} numberOfLines={1}>{programTitle}</Text>
        <Text style={styles.dayCounter}>Hari {currentDay} dari {totalDays}</Text>
      </View>

      <ProgressBar progress={currentDay / totalDays} height={4} style={styles.progress} />

      <View style={styles.classRow}>
        <View style={styles.iconSquare}>
          <Text style={styles.iconText}>{programIcon}</Text>
        </View>
        <View style={styles.classInfo}>
          <Text style={styles.className} numberOfLines={2}>{todayClass?.title ?? '—'}</Text>
          <Text style={styles.classMeta}>
            {todayClass ? `${todayClass.duration_min} mnt · ${todayClass.location}` : ''}
          </Text>
        </View>
      </View>

      {todayCompleted ? (
        <View style={styles.completedRow}>
          <Text style={styles.completedText}>Selesai hari ini ✓</Text>
          {nextClassId && (
            <Button
              label="Lihat Besok"
              variant="secondary"
              size="small"
              onPress={() => router.push(`/class/${nextClassId}`)}
            />
          )}
        </View>
      ) : (
        <View style={styles.ctaRow}>
          <Button
            label="Lanjutkan →"
            variant="primary"
            size="small"
            onPress={() => todayClass && router.push(`/class/${todayClass.id}`)}
          />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  checkmark: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.positive,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  checkmarkText: { fontFamily: 'Inter_600SemiBold', fontSize: 11, color: colors.canvas, lineHeight: 14 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingRight: 28,
  },
  programName: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: colors.primary, flex: 1 },
  dayCounter: { fontFamily: 'Inter_400Regular', fontSize: 13, color: colors.mute, marginLeft: 8 },
  progress: { marginBottom: 12 },
  classRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  iconSquare: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: colors.primaryPale,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconText: { fontSize: 32 },
  classInfo: { flex: 1 },
  className: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: colors.ink, marginBottom: 4 },
  classMeta: { fontFamily: 'Inter_400Regular', fontSize: 13, color: colors.mute },
  ctaRow: { alignItems: 'flex-end' },
  completedRow: { gap: 8 },
  completedText: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: colors.positive },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { useSubscriptionStore } from '../../store/useSubscriptionStore';
import { useProgressStore } from '../../store/useProgressStore';

interface ProgramCardProps {
  program: {
    id: string;
    title: string;
    icon: string;
    total_days: number;
    minutes_per_day: number;
    description: string;
    complaint: string;
    is_premium: boolean;
    status: string;
    current_day: number;
  };
}

export function ProgramCard({ program }: ProgramCardProps) {
  const showPaywall = useSubscriptionStore((s) => s.showPaywall);
  const setActiveProgram = useProgressStore((s) => s.setActiveProgram);

  const handleStart = () => {
    if (program.status === 'locked') {
      showPaywall('program_lock');
      return;
    }
    setActiveProgram({
      id: program.id,
      title: program.title,
      currentDay: 1,
      totalDays: program.total_days,
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{program.icon}</Text>
      <View style={styles.content}>
        <Text style={styles.title}>{program.title}</Text>
        <Text style={styles.meta}>
          {program.total_days} hari · {program.minutes_per_day} mnt/hari
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {program.description}
        </Text>
        {program.status === 'active' && (
          <>
            <Text style={styles.dayText}>
              Hari {program.current_day} dari {program.total_days}
            </Text>
            <ProgressBar
              progress={program.current_day / program.total_days}
              style={{ marginVertical: 8 }}
            />
            <Badge label="Sedang Berjalan" variant="positive" />
          </>
        )}
        {program.status === 'completed' && <Badge label="✓ Selesai" variant="pale" />}
        {program.status === 'not_started' && (
          <Button
            label="Mulai Program"
            variant="tertiary"
            size="small"
            onPress={handleStart}
            style={{ marginTop: 8 }}
          />
        )}
        {program.status === 'locked' && (
          <Button
            label="🔒 Premium"
            variant="secondary"
            size="small"
            onPress={handleStart}
            style={{ marginTop: 8 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.canvasSoft,
    borderRadius: radius.lg,
    padding: 20,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  icon: { fontSize: 40 },
  content: { flex: 1, gap: 4 },
  title: {
    fontFamily: 'Manrope_900ExtraBold',
    fontSize: 18,
    color: colors.ink,
  },
  meta: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: colors.mute,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: colors.body,
    marginTop: 4,
  },
  dayText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: colors.primary,
    marginTop: 6,
  },
});

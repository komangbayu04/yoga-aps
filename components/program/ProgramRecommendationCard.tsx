import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';

interface Program {
  id: string;
  title: string;
  icon: string;
  total_days: number;
  minutes_per_day: number;
  complaint: string;
  is_premium: boolean;
}

interface Props {
  program: Program;
}

export function ProgramRecommendationCard({ program }: Props) {
  return (
    <Card variant="green" padding={20}>
      <View style={styles.row}>
        <View style={styles.iconSquare}>
          <Text style={styles.iconText}>{program.icon}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>{program.title}</Text>
          <View style={styles.tagRow}>
            <Text style={styles.tag}>{program.complaint}</Text>
          </View>
          <Text style={styles.meta}>{program.total_days} hari · {program.minutes_per_day} mnt/hari</Text>
          {program.is_premium && <Text style={styles.premiumBadge}>🔒 Premium</Text>}
        </View>
        <Button
          label="Lihat →"
          variant="primary"
          size="small"
          onPress={() => router.push(`/program/${program.id}`)}
          style={styles.btn}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconSquare: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primaryPale,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconText: { fontSize: 26 },
  content: { flex: 1 },
  title: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: colors.ink, marginBottom: 4 },
  tagRow: { flexDirection: 'row', marginBottom: 2 },
  tag: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: colors.positiveDeep,
    backgroundColor: colors.canvas,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  meta: { fontFamily: 'Inter_400Regular', fontSize: 13, color: colors.mute, marginTop: 2 },
  premiumBadge: { fontFamily: 'Inter_400Regular', fontSize: 11, color: colors.mute, marginTop: 2 },
  btn: { flexShrink: 0 },
});

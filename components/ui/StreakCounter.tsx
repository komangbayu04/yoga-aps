import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';

interface StreakCounterProps {
  count: number;
  large?: boolean;
}

export function StreakCounter({ count, large }: StreakCounterProps) {
  if (large) {
    return (
      <View style={[styles.pill, styles.pillLarge]}>
        <Text style={styles.countLarge}>🔥 {count}</Text>
        <Text style={styles.labelLarge}>Hari berturut-turut</Text>
      </View>
    );
  }
  return (
    <View style={styles.pill}>
      <Text style={styles.text}>🔥 {count} hari berturut-turut</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor: colors.ink,
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  pillLarge: {
    flexDirection: 'column',
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingVertical: 24,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: colors.primary,
  },
  countLarge: {
    fontFamily: 'Manrope_900ExtraBold',
    fontSize: 48,
    lineHeight: 56,
    color: colors.primary,
  },
  labelLarge: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: colors.canvas,
  },
});

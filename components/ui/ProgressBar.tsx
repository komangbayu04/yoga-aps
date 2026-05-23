import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';

interface ProgressBarProps {
  progress: number;
  height?: number;
  style?: ViewStyle;
}

export function ProgressBar({ progress, height = 6, style }: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, progress));
  return (
    <View style={[styles.track, { height }, style]}>
      <View style={[styles.fill, { width: `${clamped * 100}%`, height }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: colors.canvasSoft,
    borderRadius: radius.pill,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
  },
});

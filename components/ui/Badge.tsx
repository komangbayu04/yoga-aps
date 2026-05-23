import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';

type BadgeVariant = 'default' | 'positive' | 'pale';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

export function Badge({ label, variant = 'default', style }: BadgeProps) {
  return (
    <View style={[styles.base, variantBg[variant], style]}>
      <Text style={[styles.label, variantText[variant]]}>{label}</Text>
    </View>
  );
}

const variantBg: Record<string, ViewStyle> = {
  default: { backgroundColor: colors.canvasSoft },
  positive: { backgroundColor: colors.positive },
  pale: { backgroundColor: colors.primaryPale },
};

const variantText: Record<string, object> = {
  default: { color: colors.body },
  positive: { color: colors.canvas },
  pale: { color: colors.positiveDeep },
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    lineHeight: 16,
  },
});

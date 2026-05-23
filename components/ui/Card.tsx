import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';

type CardVariant = 'default' | 'sage' | 'green' | 'dark';

interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
}

export function Card({ variant = 'default', children, style, padding = 24 }: CardProps) {
  return (
    <View style={[styles.base, variantStyles[variant], { padding }, style]}>
      {children}
    </View>
  );
}

const variantStyles = {
  default: { backgroundColor: colors.canvas },
  sage: { backgroundColor: colors.canvasSoft },
  green: { backgroundColor: colors.primaryPale },
  dark: { backgroundColor: colors.ink },
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
  },
});

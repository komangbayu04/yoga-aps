import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'default' | 'small';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({ label, onPress, variant = 'primary', size = 'default', disabled, fullWidth, style }: ButtonProps) {
  const containerStyle: ViewStyle = {
    ...styles.base,
    ...(variantStyles[variant].container as ViewStyle),
    ...(size === 'small' ? styles.small : {}),
    ...(fullWidth ? styles.fullWidth : {}),
    ...(disabled ? styles.disabled : {}),
    ...style,
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress} disabled={disabled} activeOpacity={0.8}>
      <Text style={[styles.label, variantStyles[variant].label, size === 'small' && styles.labelSmall]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const variantStyles = {
  primary: {
    container: { backgroundColor: colors.primary },
    label: { color: colors.canvas },
  },
  secondary: {
    container: { backgroundColor: colors.canvasSoft },
    label: { color: colors.ink },
  },
  tertiary: {
    container: { backgroundColor: colors.canvas, borderWidth: 1, borderColor: colors.ink },
    label: { color: colors.ink },
  },
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
  },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.4 },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
  labelSmall: { fontSize: 13, lineHeight: 20 },
});

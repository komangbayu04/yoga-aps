import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { Button } from '../../components/ui/Button';

function ProgressDots({ current }: { current: number }) {
  return (
    <View style={styles.dots}>
      {[0, 1, 2, 3].map((i) => (
        <View key={i} style={[styles.dot, i === current && styles.dotActive]} />
      ))}
    </View>
  );
}

export default function StepName() {
  const [name, setName] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ProgressDots current={0} />
        <View style={styles.content}>
          <Text style={styles.heading}>Hai! 👋</Text>
          <Text style={styles.sub}>Kami panggil kamu apa?</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nama kamu..."
            placeholderTextColor={colors.mute}
            autoFocus
          />
        </View>
        <View style={styles.footer}>
          <Button
            label="Lanjut →"
            variant="primary"
            fullWidth
            onPress={() => router.push('/(onboarding)/step-work')}
            disabled={!name.trim()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.canvasSoft },
  inner: { flex: 1, padding: 24 },
  dots: { flexDirection: 'row', gap: 8, marginTop: 16 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.mute },
  dotActive: { backgroundColor: colors.primary },
  content: { flex: 1, justifyContent: 'center', gap: 12 },
  heading: {
    fontFamily: 'Manrope_900ExtraBold',
    fontSize: 32,
    color: colors.ink,
  },
  sub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: colors.body,
  },
  input: {
    backgroundColor: colors.canvas,
    borderRadius: radius.lg,
    padding: 16,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: colors.ink,
    marginTop: 8,
  },
  footer: { paddingBottom: 16 },
});

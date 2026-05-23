import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../theme/colors';
import { Button } from '../../components/ui/Button';
import { useUserStore } from '../../store/useUserStore';

export default function Login() {
  const setUser = useUserStore((s) => s.setUser);

  const handleLogin = () => {
    setUser({
      id: 'guest',
      name: 'Tamu',
      email: '',
      jobType: 'kantor',
      complaints: [],
      goals: [],
    });
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.logo}>🧘</Text>
        <Text style={styles.title}>OfficeFlex Yoga</Text>
        <Text style={styles.sub}>Yoga untuk pekerja kantoran yang sibuk</Text>
        <View style={styles.buttons}>
          <Button label="Masuk dengan Google" variant="primary" fullWidth onPress={handleLogin} />
          <Button label="Lanjut sebagai Tamu" variant="secondary" fullWidth onPress={handleLogin} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.canvasSoft },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  logo: { fontSize: 72 },
  title: {
    fontFamily: 'Manrope_900ExtraBold',
    fontSize: 32,
    color: colors.ink,
    textAlign: 'center',
  },
  sub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: colors.body,
    textAlign: 'center',
  },
  buttons: { width: '100%', gap: 12, marginTop: 24 },
});

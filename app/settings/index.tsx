import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../theme/colors';
import { useUserStore } from '../../store/useUserStore';

export default function SettingsScreen() {
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Pengaturan</Text>
        <TouchableOpacity style={styles.row} onPress={() => router.push('/settings/reminder')}>
          <Text style={styles.rowLabel}>⏰ Pengingat</Text>
          <Text style={styles.rowArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => router.push('/settings/subscription')}>
          <Text style={styles.rowLabel}>💎 Langganan</Text>
          <Text style={styles.rowArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={logout}>
          <Text style={[styles.rowLabel, { color: colors.negative }]}>Keluar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvasSoft },
  container: { padding: 24, gap: 12 },
  title: { fontFamily: 'Manrope_900ExtraBold', fontSize: 28, color: colors.ink, marginBottom: 8 },
  row: { backgroundColor: colors.canvas, borderRadius: 24, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 16, color: colors.ink },
  rowArrow: { fontFamily: 'Inter_400Regular', fontSize: 20, color: colors.mute },
});

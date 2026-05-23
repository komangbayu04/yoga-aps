import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../theme/colors';
import { ProgramCard } from '../../components/program/ProgramCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { usePrograms } from '../../hooks/usePrograms';
import { useProgressStore } from '../../store/useProgressStore';

export default function ProgramsScreen() {
  const { data: programs } = usePrograms();
  const { activeProgram } = useProgressStore();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Program Keluhan</Text>
          <Text style={styles.headerSub}>Sesi harian 5–15 menit</Text>
        </View>
        {activeProgram && (
          <View style={styles.activeBanner}>
            <Text style={styles.activeProgramName}>{activeProgram.title}</Text>
            <Text style={styles.activeProgramDay}>Hari {activeProgram.currentDay} dari {activeProgram.totalDays}</Text>
            <ProgressBar progress={activeProgram.currentDay / activeProgram.totalDays} style={{ marginVertical: 10 }} />
            <Button label="Lanjutkan Hari Ini" variant="primary" size="small" onPress={() => router.push('/class/1')} />
          </View>
        )}
        <View style={styles.list}>
          {(programs ?? []).map((prog) => (
            <ProgramCard key={prog.id} program={prog} />
          ))}
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  header: { backgroundColor: colors.canvasSoft, padding: 24, paddingTop: 48 },
  headerTitle: { fontFamily: 'Manrope_900ExtraBold', fontSize: 30, color: colors.ink },
  headerSub: { fontFamily: 'Inter_400Regular', fontSize: 15, color: colors.body, marginTop: 4 },
  activeBanner: { backgroundColor: colors.ink, margin: 16, borderRadius: 24, padding: 20 },
  activeProgramName: { fontFamily: 'Manrope_900ExtraBold', fontSize: 20, color: colors.primary },
  activeProgramDay: { fontFamily: 'Inter_400Regular', fontSize: 13, color: colors.canvas, marginTop: 4 },
  list: { padding: 16, gap: 12 },
});

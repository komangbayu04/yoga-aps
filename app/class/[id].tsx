import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { VideoView, useVideoPlayer } from 'expo-video';
import { colors } from '../../theme/colors';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ClassCard } from '../../components/class/ClassCard';
import { useClassById, useClasses } from '../../hooks/useClasses';
import { useProgressStore } from '../../store/useProgressStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ClassPlayer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: cls } = useClassById(id);
  const { data: allClasses } = useClasses();
  const addSession = useProgressStore((s) => s.addSession);
  const incrementStreak = useProgressStore((s) => s.incrementStreak);

  const [isFinished, setIsFinished] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<VideoView>(null);

  const player = useVideoPlayer(cls?.video_url ?? null, (p) => {
    p.loop = false;
  });

  if (!cls) return null;

  const isPlaying = player.playing;
  const related = (allClasses ?? [])
    .filter((c) => c.id !== cls.id && c.complaints.some((cp) => cls.complaints.includes(cp)))
    .slice(0, 3);

  const togglePlay = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleComplete = () => {
    addSession(cls.duration_min);
    incrementStreak();
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Video */}
      <TouchableOpacity onPress={() => setShowControls((v) => !v)} activeOpacity={1}>
        <View style={styles.videoContainer}>
          <VideoView
            ref={videoRef}
            player={player}
            style={styles.video}
            contentFit="contain"
            nativeControls={false}
          />
          {showControls && (
            <View style={styles.controls}>
              <TouchableOpacity onPress={togglePlay} style={styles.playBtn}>
                <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Details */}
      <ScrollView style={styles.details}>
        <View style={styles.metaRow}>
          <Badge label={cls.level} />
          <Text style={styles.durationPill}>⏱ {cls.duration_min} mnt</Text>
        </View>
        <Text style={styles.title}>{cls.title}</Text>
        <View style={styles.instructorRow}>
          <View style={styles.avatarPlaceholder}>
            <Text>👤</Text>
          </View>
          <Text style={styles.instructorName}>{cls.instructor?.name}</Text>
        </View>
        <View style={styles.complaintRow}>
          {cls.complaints.map((c) => (
            <View key={c} style={styles.complaintPill}>
              <Text style={styles.complaintText}>{c}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.description}>{cls.description}</Text>

        {related.length > 0 && (
          <>
            <Text style={styles.relatedTitle}>Kelas Terkait</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {related.map((r) => (
                <View key={r.id} style={{ width: 200, marginRight: 12 }}>
                  <ClassCard item={r} compact />
                </View>
              ))}
            </ScrollView>
          </>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky CTA */}
      <View style={styles.stickyBtn}>
        {!isPlaying && !isFinished && (
          <Button label="▶ Mulai Sesi" variant="primary" fullWidth onPress={togglePlay} />
        )}
        {isFinished && (
          <Button label="✓ Tandai Selesai" variant="primary" fullWidth onPress={handleComplete} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  videoContainer: { width: SCREEN_WIDTH, aspectRatio: 16 / 9, backgroundColor: colors.ink, position: 'relative' },
  video: { width: '100%', height: '100%' },
  controls: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  playBtn: { backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 40, padding: 16 },
  playIcon: { fontSize: 28 },
  details: { flex: 1, padding: 24 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  durationPill: { fontFamily: 'Inter_400Regular', fontSize: 13, color: colors.mute },
  title: { fontFamily: 'Manrope_900ExtraBold', fontSize: 22, color: colors.ink, marginBottom: 12 },
  instructorRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  avatarPlaceholder: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.canvasSoft, alignItems: 'center', justifyContent: 'center' },
  instructorName: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.ink },
  complaintRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  complaintPill: { backgroundColor: colors.primaryPale, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999 },
  complaintText: { fontFamily: 'Inter_400Regular', fontSize: 13, color: colors.positiveDeep },
  description: { fontFamily: 'Inter_400Regular', fontSize: 15, color: colors.body, lineHeight: 24, marginBottom: 24 },
  relatedTitle: { fontFamily: 'Manrope_900ExtraBold', fontSize: 18, color: colors.ink, marginBottom: 12 },
  stickyBtn: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.canvas, padding: 16, paddingBottom: 28 },
});

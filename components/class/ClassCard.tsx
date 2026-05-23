import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { Badge } from '../ui/Badge';
import { useSubscriptionStore } from '../../store/useSubscriptionStore';
import { useUserStore } from '../../store/useUserStore';

interface ClassItem {
  id: string;
  title: string;
  duration_min: number;
  level: string;
  location: string;
  thumbnail_url: string;
  is_premium: boolean;
  category: string;
}

interface ClassCardProps {
  item: ClassItem;
  compact?: boolean;
}

export function ClassCard({ item, compact }: ClassCardProps) {
  const showPaywall = useSubscriptionStore((s) => s.showPaywall);
  const isPremium = useUserStore((s) => s.isPremium);
  const isLocked = item.is_premium && !isPremium;

  const handlePress = () => {
    if (isLocked) {
      showPaywall('class_lock');
      return;
    }
    router.push(`/class/${item.id}`);
  };

  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.cardCompact]}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: item.thumbnail_url }}
          style={[styles.thumbnail, compact && styles.thumbnailCompact]}
          resizeMode="cover"
        />
        {isLocked && (
          <View style={styles.lockOverlay}>
            <Text style={styles.lockText}>🔒 Premium</Text>
          </View>
        )}
      </View>
      <View style={styles.body}>
        <Badge label={item.level} />
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>⏱ {item.duration_min} mnt</Text>
          <Text style={styles.metaText}>🪑 {item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.canvas,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  cardCompact: {
    width: 160,
  },
  thumbnailContainer: { position: 'relative' },
  thumbnail: { width: '100%', aspectRatio: 16 / 9 },
  thumbnailCompact: { width: 160, height: 90 },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(14,15,12,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: colors.canvas,
  },
  body: { padding: 12, gap: 6 },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: colors.ink,
    lineHeight: 20,
  },
  meta: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  metaText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: colors.mute,
  },
});

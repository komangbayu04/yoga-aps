import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useSubscriptionStore } from '../../store/useSubscriptionStore';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const features = [
  'Akses semua 50+ kelas video',
  'Unlimited program keluhan',
  'Download offline (10 video)',
  'Reminder tidak terbatas',
  'Bebas iklan',
  'Konten baru lebih awal',
];

export function PaywallModal() {
  const { paywallVisible, hidePaywall, setPlan } = useSubscriptionStore();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const handleSubscribe = () => {
    setPlan(selectedPlan === 'yearly' ? 'premium_yearly' : 'premium_monthly');
    hidePaywall();
  };

  return (
    <Modal
      visible={paywallVisible}
      animationType="slide"
      transparent
      presentationStyle="overFullScreen"
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🧘 OfficeFlex</Text>
            <Text style={styles.headerSub}>Buka semua fitur</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.featureSection}>
              {features.map((f) => (
                <View key={f} style={styles.featureRow}>
                  <Text style={styles.check}>✓</Text>
                  <Text style={styles.featureText}>{f}</Text>
                </View>
              ))}
            </View>
            <View style={styles.pricingRow}>
              <TouchableOpacity
                style={[
                  styles.planCard,
                  styles.planCardSage,
                  selectedPlan === 'monthly' && styles.planSelected,
                ]}
                onPress={() => setSelectedPlan('monthly')}
                activeOpacity={0.85}
              >
                <Text style={styles.planLabel}>Bulanan</Text>
                <Text style={styles.planPrice}>Rp 49.000</Text>
                <Text style={styles.planSub}>/bulan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.planCard,
                  styles.planCardDark,
                  selectedPlan === 'yearly' && styles.planSelectedDark,
                ]}
                onPress={() => setSelectedPlan('yearly')}
                activeOpacity={0.85}
              >
                <View style={styles.saveBadge}>
                  <Badge label="HEMAT 32%" variant="positive" />
                </View>
                <Text style={[styles.planLabel, { color: colors.primary }]}>Tahunan</Text>
                <Text style={[styles.planPrice, { color: colors.primary }]}>Rp 399.000</Text>
                <Text style={[styles.planSub, { color: colors.mute }]}>Rp 33.250/bln</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.trialNote}>Coba gratis 7 hari — batalkan kapan saja</Text>
            <View style={styles.ctaSection}>
              <Button
                label="Mulai 7 Hari Gratis"
                variant="primary"
                fullWidth
                onPress={handleSubscribe}
              />
              <TouchableOpacity onPress={hidePaywall} style={styles.dismissBtn}>
                <Text style={styles.dismissText}>Tidak sekarang</Text>
              </TouchableOpacity>
              <Text style={styles.finePrint}>
                Pembayaran melalui Google Play. Diperbarui otomatis.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.canvas,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.mute,
    borderRadius: radius.pill,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  header: {
    backgroundColor: colors.ink,
    padding: 24,
    alignItems: 'center',
    gap: 4,
  },
  headerTitle: {
    fontFamily: 'Manrope_900ExtraBold',
    fontSize: 24,
    color: colors.primary,
  },
  headerSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: colors.canvasSoft,
  },
  featureSection: { padding: 24, gap: 14 },
  featureRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  check: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: colors.primary,
  },
  featureText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: colors.ink,
    flex: 1,
  },
  pricingRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 24 },
  planCard: {
    flex: 1,
    borderRadius: radius.lg,
    padding: 16,
    alignItems: 'center',
    gap: 4,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  planCardSage: { backgroundColor: colors.canvasSoft },
  planCardDark: { backgroundColor: colors.ink },
  planSelected: { borderColor: colors.primary },
  planSelectedDark: { borderColor: colors.primary },
  saveBadge: { position: 'absolute', top: -8, right: -8 },
  planLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: colors.ink,
  },
  planPrice: {
    fontFamily: 'Manrope_900ExtraBold',
    fontSize: 22,
    color: colors.ink,
  },
  planSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: colors.mute,
  },
  trialNote: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: colors.body,
    textAlign: 'center',
    marginVertical: 16,
  },
  ctaSection: { paddingHorizontal: 24, paddingBottom: 32, gap: 12 },
  dismissBtn: { alignItems: 'center' },
  dismissText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: colors.mute,
  },
  finePrint: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: colors.mute,
    textAlign: 'center',
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Sizes } from '../../constants/Sizes';

interface ProgressBarProps {
  current: number;
  total: number;
  stars: number;
}

export default function ProgressBar({ current, total, stars }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <View style={styles.container}>
      {/* Level Label */}
      <View style={styles.levelContainer}>
        <Ionicons name="trophy" size={20} color={Colors.primary} />
        <Text style={styles.levelText}>Level 1: Adjectives</Text>
      </View>

      {/* Stars */}
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <View key={star} style={styles.starWrapper}>
            <Ionicons
              name={star <= stars ? 'star' : 'star-outline'}
              size={24}
              color={star <= stars ? '#FFD700' : '#D0D0D0'}
            />
          </View>
        ))}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]}>
          <View style={styles.progressBarGradient} />
        </View>
      </View>

      {/* Progress Text */}
      <View style={styles.progressTextContainer}>
        <Ionicons name="checkbox-outline" size={16} color={Colors.textSecondary} />
        <Text style={styles.progressText}>
          {current} of {total} completed
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.lg,
    paddingVertical: Sizes.lg,
    backgroundColor: Colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Sizes.sm,
    marginBottom: Sizes.sm,
  },
  levelText: {
    fontSize: Sizes.fontLarge,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Sizes.lg,
    gap: 8,
  },
  starWrapper: {
    padding: 2,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#E8E8E8',
    borderRadius: Sizes.radiusFull,
    overflow: 'hidden',
    marginBottom: Sizes.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.success,
    borderRadius: Sizes.radiusFull,
    position: 'relative',
  },
  progressBarGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: Sizes.radiusFull,
  },
  progressTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  progressText: {
    fontSize: Sizes.fontSmall,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
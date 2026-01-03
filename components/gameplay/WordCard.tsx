import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Sizes } from '../../constants/Sizes';

interface WordCardProps {
  word: string;
  description: string;
  image: string;
}

export default function WordCard({ word, description, image }: WordCardProps) {
  return (
    <View style={styles.container}>
      {/* Image/Icon */}
      <View style={styles.imageContainer}>
        <Text style={styles.image}>{image}</Text>
        <View style={styles.helperIcon}>
          <Text style={styles.helperText}>💡</Text>
        </View>
      </View>

      {/* Word */}
      <Text style={styles.word}>{word}</Text>

      {/* Description */}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Sizes.radiusLarge,
    padding: Sizes.lg,
    alignItems: 'center',
    marginHorizontal: Sizes.lg,
    marginVertical: Sizes.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    width: 160,
    height: 160,
    backgroundColor: '#E8F4F8',
    borderRadius: Sizes.radiusLarge,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Sizes.lg,
    position: 'relative',
  },
  image: {
    fontSize: 80,
  },
  helperIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    backgroundColor: Colors.primary,
    borderRadius: Sizes.radiusFull,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperText: {
    fontSize: 18,
  },
  word: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: Sizes.sm,
    letterSpacing: 2,
  },
  description: {
    fontSize: Sizes.fontMedium,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
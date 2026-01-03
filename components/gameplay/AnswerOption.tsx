import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Sizes } from '../../constants/Sizes';

interface AnswerOptionProps {
  letter: string;
  text: string;
  backgroundColor: string;
  onPress: () => void;
  isSelected?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  disabled?: boolean;
}

export default function AnswerOption({
  letter,
  text,
  backgroundColor,
  onPress,
  isSelected = false,
  isCorrect = false,
  isWrong = false,
  disabled = false,
}: AnswerOptionProps) {
  const getBackgroundColor = () => {
    if (isCorrect) return Colors.success;
    if (isWrong) return Colors.error;
    if (isSelected) return backgroundColor;
    return backgroundColor;
  };

  const getBorderColor = () => {
    if (isCorrect) return Colors.success;
    if (isWrong) return Colors.error;
    if (isSelected) return Colors.textPrimary;
    return 'transparent';
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.letterCircle}>
        <Text style={styles.letter}>{letter}</Text>
      </View>
      <Text style={styles.text}>{text}</Text>
      {isCorrect && <Text style={styles.checkmark}>✓</Text>}
      {isWrong && <Text style={styles.crossmark}>✗</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Sizes.md,
    borderRadius: Sizes.radiusMedium,
    marginBottom: Sizes.md,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  letterCircle: {
    width: 36,
    height: 36,
    borderRadius: Sizes.radiusFull,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Sizes.md,
  },
  letter: {
    fontSize: Sizes.fontLarge,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  text: {
    flex: 1,
    fontSize: Sizes.fontLarge,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  checkmark: {
    fontSize: 24,
    color: Colors.textWhite,
    marginLeft: Sizes.sm,
  },
  crossmark: {
    fontSize: 24,
    color: Colors.textWhite,
    marginLeft: Sizes.sm,
  },
});
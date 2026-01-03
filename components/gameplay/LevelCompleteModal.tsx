import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Sizes } from '../../constants/Sizes';

interface LevelCompleteModalProps {
    visible: boolean;
    score: number;
    stars: number;
    onNextLevel: () => void;
    onReplayLevel: () => void;
    onClose: () => void;
}

export default function LevelCompleteModal({
    visible,
    score,
    stars,
    onNextLevel,
    onReplayLevel,
    onClose,
}: LevelCompleteModalProps) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Title */}
                    <Text style={styles.title}>Level</Text>
                    <Text style={styles.complete}>Complete!</Text>

                    {/* Stars */}
                    <View style={styles.starsContainer}>
                        {[1, 2, 3].map((star) => (
                            <Text key={star} style={styles.star}>
                                {star <= stars ? '⭐' : '☆'}
                            </Text>
                        ))}
                    </View>

                    {/* Score */}
                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreLabel}>Score:</Text>
                        <Text style={styles.scoreValue}>{score} pts</Text>
                    </View>

                    {/* Buttons */}
                    <TouchableOpacity
                        style={[styles.button, styles.nextButton]}
                        onPress={onNextLevel}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Next Level</Text>
                        <Text style={styles.arrow}>→</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.replayButton]}
                        onPress={onReplayLevel}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.replayIcon}>🔄</Text>
                        <Text style={styles.buttonText}>Replay Level</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#B8E6FF',
        borderRadius: Sizes.radiusXLarge,
        padding: Sizes.xl,
        alignItems: 'center',
        width: Sizes.screenWidth - 64,
        borderWidth: 4,
        borderColor: Colors.primary,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    complete: {
        fontSize: 32,
        fontWeight: '700',
        color: Colors.primary,
        marginBottom: Sizes.lg,
    },
    starsContainer: {
        flexDirection: 'row',
        gap: Sizes.sm,
        marginBottom: Sizes.lg,
    },
    star: {
        fontSize: 48,
    },
    scoreContainer: {
        backgroundColor: Colors.cardBackground,
        paddingHorizontal: Sizes.xl,
        paddingVertical: Sizes.md,
        borderRadius: Sizes.radiusMedium,
        marginBottom: Sizes.xl,
    },
    scoreLabel: {
        fontSize: Sizes.fontMedium,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: 4,
    },
    scoreValue: {
        fontSize: Sizes.fontXXLarge,
        fontWeight: '800',
        color: Colors.textPrimary,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Sizes.md,
        borderRadius: Sizes.radiusMedium,
        marginBottom: Sizes.md,
        gap: Sizes.sm,
    },
    nextButton: {
        backgroundColor: Colors.primary,
    },
    replayButton: {
        backgroundColor: Colors.cardBackground,
    },
    buttonText: {
        fontSize: Sizes.fontLarge,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    arrow: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    replayIcon: {
        fontSize: 20,
    },
});
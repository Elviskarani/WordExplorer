import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Sizes } from '../constants/Sizes';
import { QUESTIONS } from '../constants/GameData';
import { storageService } from '../services/StorageService';
import Header from '../components/shared/Header';
import WordCard from '../components/gameplay/WordCard';
import AnswerOption from '../components/gameplay/AnswerOption';

const OPTION_COLORS = ['#E3F2FD', '#FFF9C4', '#FFCDD2', '#C8E6C9'];
const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export default function DailyWordScreen() {
    const router = useRouter();
    const [isCompleted, setIsCompleted] = useState(false);
    const [streak, setStreak] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    // Get a random question for today
    const dailyQuestion = QUESTIONS[new Date().getDate() % QUESTIONS.length];

    useEffect(() => {
        checkDailyWordStatus();
    }, []);

    const checkDailyWordStatus = async () => {
        const completed = await storageService.isDailyWordCompleted();
        const currentStreak = await storageService.getDailyWordStreak();
        setIsCompleted(completed);
        setStreak(currentStreak);
    };

    const handleAnswerPress = async (index: number) => {
        if (showResult || isCompleted) return;

        setSelectedAnswer(index);
        setShowResult(true);

        const isCorrect = index === dailyQuestion.correctAnswer;

        if (isCorrect) {
            await storageService.completeDailyWord();
            await storageService.updateTotalScore(100);

            // Check for streak stickers
            const newStreak = await storageService.getDailyWordStreak();
            if (newStreak === 3) {
                await storageService.unlockSticker('daily_streak_3');
            } else if (newStreak === 7) {
                await storageService.unlockSticker('daily_streak_7');
            }

            setTimeout(() => {
                Alert.alert(
                    '🎉 Daily Word Complete!',
                    `Great job! You earned 100 points!\nCurrent streak: ${newStreak} days`,
                    [{ text: 'OK', onPress: () => router.back() }]
                );
            }, 1500);
        } else {
            setTimeout(() => {
                Alert.alert(
                    '😔 Wrong Answer',
                    'Try again tomorrow!',
                    [{ text: 'OK', onPress: () => router.back() }]
                );
            }, 1500);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header
                    title="Daily Word"
                    showBack={true}
                    onBackPress={() => router.back()}
                />

                {/* Streak Display */}
                <View style={styles.streakContainer}>
                    <Text style={styles.streakIcon}>🔥</Text>
                    <Text style={styles.streakText}>{streak} Day Streak</Text>
                </View>

                {isCompleted ? (
                    <View style={styles.completedContainer}>
                        <Text style={styles.completedEmoji}>✅</Text>
                        <Text style={styles.completedTitle}>Already Completed!</Text>
                        <Text style={styles.completedText}>
                            Come back tomorrow for a new daily word!
                        </Text>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Text style={styles.backButtonText}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.content}>
                        <Text style={styles.title}>Word of the Day</Text>
                        <Text style={styles.subtitle}>Complete today's challenge!</Text>

                        <WordCard
                            word={dailyQuestion.word}
                            description={dailyQuestion.description}
                            image={dailyQuestion.image}
                        />

                        <View style={styles.optionsContainer}>
                            {dailyQuestion.options.map((option, index) => (
                                <AnswerOption
                                    key={index}
                                    letter={OPTION_LETTERS[index]}
                                    text={option}
                                    backgroundColor={OPTION_COLORS[index]}
                                    onPress={() => handleAnswerPress(index)}
                                    isSelected={selectedAnswer === index}
                                    isCorrect={showResult && index === dailyQuestion.correctAnswer}
                                    isWrong={showResult && selectedAnswer === index && index !== dailyQuestion.correctAnswer}
                                    disabled={showResult}
                                />
                            ))}
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
    },
    streakContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.md,
        backgroundColor: Colors.primary,
        gap: Sizes.sm,
    },
    streakIcon: {
        fontSize: 24,
    },
    streakText: {
        fontSize: Sizes.fontLarge,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: Sizes.fontXXLarge,
        fontWeight: '800',
        color: Colors.textPrimary,
        textAlign: 'center',
        marginTop: Sizes.lg,
    },
    subtitle: {
        fontSize: Sizes.fontMedium,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Sizes.lg,
    },
    optionsContainer: {
        paddingHorizontal: Sizes.lg,
        marginTop: Sizes.md,
    },
    completedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Sizes.xl,
    },
    completedEmoji: {
        fontSize: 80,
        marginBottom: Sizes.lg,
    },
    completedTitle: {
        fontSize: Sizes.fontXXLarge,
        fontWeight: '800',
        color: Colors.textPrimary,
        marginBottom: Sizes.sm,
        textAlign: 'center',
    },
    completedText: {
        fontSize: Sizes.fontLarge,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Sizes.xl,
    },
    backButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Sizes.xl,
        paddingVertical: Sizes.md,
        borderRadius: Sizes.radiusMedium,
    },
    backButtonText: {
        fontSize: Sizes.fontLarge,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
});
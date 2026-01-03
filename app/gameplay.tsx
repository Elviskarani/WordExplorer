import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Sizes } from '../constants/Sizes';
import { QUESTIONS, Question } from '../constants/GameData';
import { storageService } from '../services/StorageService';
import { hapticService } from '../services/HapticService';
import Header from '../components/shared/Header';
import WordCard from '../components/gameplay/WordCard';
import AnswerOption from '../components/gameplay/AnswerOption';
import ProgressBar from '../components/gameplay/ProgressBar';
import LevelCompleteModal from '../components/gameplay/LevelCompleteModal';
import SettingsModal from '../components/shared/SettingsModal';

const OPTION_COLORS = ['#E3F2FD', '#FFF9C4', '#FFCDD2', '#C8E6C9'];
const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export default function GameplayScreen() {
    const router = useRouter();
    const { categoryId } = useLocalSearchParams();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [stars, setStars] = useState(3);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [showLevelComplete, setShowLevelComplete] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // Filter questions by category (or show all if no category)
    const questions = categoryId
        ? QUESTIONS.filter(q => q.category === categoryId)
        : QUESTIONS;

    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        // Reset if no questions available
        if (!currentQuestion) {
            Alert.alert('No Questions', 'No questions available for this category');
            router.back();
        }
    }, [currentQuestion]);

    const handleBackPress = () => {
        Alert.alert(
            'Exit Game?',
            'Are you sure you want to exit? Your progress will be lost.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Exit', onPress: () => router.back(), style: 'destructive' },
            ]
        );
    };

    const handleAnswerPress = async (index: number) => {
        if (showResult) return;

        setSelectedAnswer(index);
        setShowResult(true);

        const isCorrect = index === currentQuestion.correctAnswer;

        if (isCorrect) {
            setScore(score + 50);
            await hapticService.triggerSuccess();
        } else {
            // Reduce stars on wrong answer
            if (stars > 0) {
                setStars(stars - 1);
            }
            await hapticService.triggerError();
        }

        // Move to next question after delay
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
                setShowResult(false);
            } else {
                // Game complete - save progress and show modal
                handleLevelComplete();
            }
        }, 1500);
    };

    const handleLevelComplete = async () => {
        const finalScore = score;
        const finalStars = stars;

        // Save progress
        await storageService.saveCategoryProgress(
            categoryId as string,
            finalStars,
            finalScore
        );

        // Unlock stickers based on performance
        if (finalStars === 3) {
            await storageService.unlockSticker('perfect_score');
        }

        // Unlock category-specific stickers
        const categoryStickers: { [key: string]: string } = {
            synonyms: 'synonym_master',
            opposites: 'opposite_guru',
            animals: 'animal_friend',
            space: 'space_explorer',
            riddles: 'riddle_solver',
            spelling: 'spelling_bee',
        };

        if (categoryId && categoryStickers[categoryId as string]) {
            await storageService.unlockSticker(categoryStickers[categoryId as string]);
        }

        // Check for score milestone
        const progress = await storageService.getUserProgress();
        if (progress.totalScore >= 500) {
            await storageService.unlockSticker('score_500');
        }

        setShowLevelComplete(true);
    };

    const resetGame = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setStars(3);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowLevelComplete(false);
    };

    const handleNextLevel = () => {
        setShowLevelComplete(false);
        router.back(); // Go back to categories to select next level
    };

    const handleReplayLevel = () => {
        resetGame();
    };

    if (!currentQuestion) {
        return null;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <Header
                    title="Playing"
                    showBack={true}
                    onBackPress={handleBackPress}
                    onSettingsPress={() => setShowSettings(true)}
                    score={score}
                />

                {/* Progress Bar */}
                <ProgressBar
                    current={currentQuestionIndex + 1}
                    total={questions.length}
                    stars={stars}
                />

                {/* Content */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Word Card */}
                    <WordCard
                        word={currentQuestion.word}
                        description={currentQuestion.description}
                        image={currentQuestion.image}
                    />

                    {/* Answer Options */}
                    <View style={styles.optionsContainer}>
                        {currentQuestion.options.map((option, index) => (
                            <AnswerOption
                                key={index}
                                letter={OPTION_LETTERS[index]}
                                text={option}
                                backgroundColor={OPTION_COLORS[index]}
                                onPress={() => handleAnswerPress(index)}
                                isSelected={selectedAnswer === index}
                                isCorrect={showResult && index === currentQuestion.correctAnswer}
                                isWrong={showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer}
                                disabled={showResult}
                            />
                        ))}
                    </View>
                </ScrollView>

                {/* Level Complete Modal */}
                <LevelCompleteModal
                    visible={showLevelComplete}
                    score={score}
                    stars={stars}
                    onNextLevel={handleNextLevel}
                    onReplayLevel={handleReplayLevel}
                    onClose={() => setShowLevelComplete(false)}
                />

                {/* Settings Modal */}
                <SettingsModal
                    visible={showSettings}
                    onClose={() => setShowSettings(false)}
                />
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: Sizes.xl,
    },
    optionsContainer: {
        paddingHorizontal: Sizes.lg,
        marginTop: Sizes.md,
    },
});
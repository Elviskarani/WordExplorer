import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Sizes } from '../constants/Sizes';
import { storageService } from '../services/StorageService';
import OwlMascot from '../components/home/OwlMascot';
import PlayButton from '../components/home/PlayButton';
import ActionButtons from '../components/home/ActionButtons';
import SettingsModal from '../components/shared/SettingsModal';

export default function HomeScreen() {
    const router = useRouter();
    const [showSettings, setShowSettings] = useState(false);
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const progress = await storageService.getUserProgress();
        setTotalScore(progress.totalScore);
    };

    const handlePlayPress = () => {
        router.push('/categories');
    };

    const handleDailyWordPress = () => {
        router.push('/daily-word');
    };

    const handleMyStickersPress = () => {
        router.push('/stickers');
    };

    const handleSettingsPress = () => {
        setShowSettings(true);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header Icons */}
                <View style={styles.header}>

                    <TouchableOpacity
                        style={styles.headerIcon}
                        onPress={handleSettingsPress}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="settings-outline" size={24} color={Colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* Main Content */}
                <View style={styles.content}>
                    {/* Owl Mascot */}
                    <OwlMascot />

                    {/* Title */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.wordText}>Word</Text>
                        <Text style={styles.explorerText}>Explorer</Text>
                    </View>

                    {/* Subtitle */}
                    <Text style={styles.subtitle}>Ready to learn?</Text>

                    {/* Play Button */}
                    <PlayButton onPress={handlePlayPress} />

                    {/* Action Buttons */}
                    <ActionButtons
                        onDailyWordPress={handleDailyWordPress}
                        onMyStickersPress={handleMyStickersPress}
                    />
                </View>

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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.lg,
        paddingTop: Sizes.md,
    },
    headerIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.cardBackground,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    scoreDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingHorizontal: Sizes.md,
        paddingVertical: Sizes.sm,
        borderRadius: Sizes.radiusMedium,
        gap: 4,
    },
    scoreIcon: {
        fontSize: 20,
    },
    scoreText: {
        fontSize: Sizes.fontLarge,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    lockIcon: {
        fontSize: 20,
    },
    settingsIcon: {
        fontSize: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: -30,
        marginBottom: Sizes.sm,
        paddingHorizontal: Sizes.xxl,
        paddingVertical: Sizes.lg,
        backgroundColor: Colors.textWhite,
        borderRadius: Sizes.radiusLarge,
        borderWidth: 4,
        borderColor: '#B8E6F0',
        borderStyle: 'dashed',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    wordText: {
        fontSize: 40,
        fontWeight: '700',
        color: '#4DD9E8',
    },
    explorerText: {
        fontSize: 40,
        fontWeight: '700',
        color: Colors.primary,
    },
    subtitle: {
        fontSize: Sizes.fontMedium,
        color: Colors.textSecondary,
        marginBottom: Sizes.sm,
    },
});
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Sizes } from '../constants/Sizes';
import { STICKERS } from '../constants/GameData';
import { storageService } from '../services/StorageService';
import Header from '../components/shared/Header';

export default function StickersScreen() {
    const router = useRouter();
    const [unlockedStickers, setUnlockedStickers] = useState<string[]>([]);

    useEffect(() => {
        loadUnlockedStickers();
    }, []);

    const loadUnlockedStickers = async () => {
        const stickers = await storageService.getUnlockedStickers();
        setUnlockedStickers(stickers);
    };

    const isUnlocked = (stickerId: string) => {
        return unlockedStickers.includes(stickerId);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header
                    title="My Stickers"
                    showBack={true}
                    onBackPress={() => router.back()}
                />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.subtitle}>
                        Collect stickers by completing challenges!
                    </Text>

                    <View style={styles.grid}>
                        {STICKERS.map((sticker) => {
                            const unlocked = isUnlocked(sticker.id);
                            return (
                                <View
                                    key={sticker.id}
                                    style={[
                                        styles.stickerCard,
                                        !unlocked && styles.stickerCardLocked,
                                    ]}
                                >
                                    <Text style={[styles.stickerEmoji, !unlocked && styles.locked]}>
                                        {unlocked ? sticker.emoji : '🔒'}
                                    </Text>
                                    <Text style={styles.stickerName}>
                                        {unlocked ? sticker.name : '???'}
                                    </Text>
                                    <Text style={styles.stickerDescription}>
                                        {unlocked ? sticker.description : sticker.unlockCondition}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
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
        padding: Sizes.lg,
    },
    subtitle: {
        fontSize: Sizes.fontMedium,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Sizes.lg,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Sizes.md,
        justifyContent: 'space-between',
    },
    stickerCard: {
        width: (Sizes.screenWidth - Sizes.lg * 2 - Sizes.md) / 2,
        backgroundColor: Colors.cardBackground,
        borderRadius: Sizes.radiusMedium,
        padding: Sizes.md,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    stickerCardLocked: {
        opacity: 0.5,
    },
    stickerEmoji: {
        fontSize: 48,
        marginBottom: Sizes.sm,
    },
    locked: {
        opacity: 0.3,
    },
    stickerName: {
        fontSize: Sizes.fontMedium,
        fontWeight: '700',
        color: Colors.textPrimary,
        textAlign: 'center',
        marginBottom: 4,
    },
    stickerDescription: {
        fontSize: Sizes.fontSmall,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
});
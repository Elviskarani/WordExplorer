import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Sizes } from '../../constants/Sizes';

interface HeaderProps {
    title: string;
    subtitle?: string;
    score?: number;
    onBackPress?: () => void;
    showBack?: boolean;
    onSettingsPress?: () => void;
}

export default function Header({
    title,
    subtitle,
    score,
    onBackPress,
    showBack = false,
    onSettingsPress,
}: HeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                {showBack && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={onBackPress}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.centerSection}>
                <View style={styles.titleContainer}>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <Ionicons name="rocket" size={20} color={Colors.primary} />
                </View>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>

            <View style={styles.rightSection}>
                {onSettingsPress && (
                    <TouchableOpacity
                        style={styles.settingsButton}
                        onPress={onSettingsPress}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="settings-outline" size={20} color={Colors.textPrimary} />
                    </TouchableOpacity>
                )}
                {score !== undefined && (
                    <View style={styles.scoreContainer}>
                        <Ionicons name="star" size={16} color="#FFF" />
                        <Text style={styles.scoreText}>{score}</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.md,
        paddingVertical: Sizes.md,
        backgroundColor: Colors.cardBackground,
    },
    leftSection: {
        width: 60,
    },
    centerSection: {
        flex: 1,
        alignItems: 'center',
    },
    rightSection: {
        width: 60,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: Sizes.xs,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: Sizes.radiusSmall,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsButton: {
        width: 40,
        height: 40,
        borderRadius: Sizes.radiusSmall,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Sizes.sm,
    },
    titleTextContainer: {
        maxWidth: 180,
    },
    title: {
        fontSize: Sizes.fontXLarge,
        fontWeight: '700',
        color: Colors.textPrimary,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: Sizes.fontSmall,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingHorizontal: Sizes.sm,
        paddingVertical: 4,
        borderRadius: Sizes.radiusSmall,
        gap: 4,
    },
    scoreText: {
        fontSize: Sizes.fontMedium,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
});
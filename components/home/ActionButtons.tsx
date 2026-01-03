import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Sizes } from '../../constants/Sizes';

interface ActionButtonsProps {
    onDailyWordPress: () => void;
    onMyStickersPress: () => void;
}

export default function ActionButtons({
    onDailyWordPress,
    onMyStickersPress,
}: ActionButtonsProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, styles.dailyWordButton]}
                onPress={onDailyWordPress}
                activeOpacity={0.8}
            >
                <Ionicons name="star" size={22} color={Colors.textWhite} />
                <Text style={styles.buttonText}>Daily Word</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.stickersButton]}
                onPress={onMyStickersPress}
                activeOpacity={0.8}
            >
                <MaterialCommunityIcons name="sticker-emoji" size={22} color={Colors.textWhite} />
                <Text style={styles.buttonText}>My Stickers</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: Sizes.md,
        paddingHorizontal: Sizes.lg,
        width: '100%',
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.lg,
        paddingHorizontal: Sizes.md,
        borderRadius: Sizes.radiusLarge,
        borderColor: Colors.textWhite,
        borderWidth: 2,
        gap: Sizes.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    dailyWordButton: {
        backgroundColor: '#6BCB77',
    },
    stickersButton: {
        backgroundColor: '#4D96FF',
    },
    icon: {
        fontSize: Sizes.fontLarge,
    },
    buttonText: {
        color: Colors.textWhite,
        fontSize: Sizes.fontMedium,
        fontWeight: '700',
    },
});
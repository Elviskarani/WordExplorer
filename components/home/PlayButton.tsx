import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Sizes } from '../../constants/Sizes';

interface PlayButtonProps {
    onPress: () => void;
}

export default function PlayButton({ onPress }: PlayButtonProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.playIcon}>
                <Text style={styles.playIconText}>▶</Text>
            </View>
            <Text style={styles.playText}>PLAY!</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        borderRadius: Sizes.radiusFull,
        backgroundColor: Colors.primary,
        borderColor: Colors.textWhite,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
        marginVertical: Sizes.xl,
    },
    playIcon: {
        marginBottom: Sizes.sm,
    },
    playIconText: {
        fontSize: 40,
        color: Colors.textPrimary,
        marginLeft: 6,
    },
    playText: {
        fontSize: Sizes.fontXXLarge,
        fontWeight: '800',
        color: Colors.textPrimary,
    },
});
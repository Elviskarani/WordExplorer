import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Sizes } from '../../constants/Sizes';

interface CategoryCardProps {
    title: string;
    icon: string;
    color: string;
    onPress: () => void;
}

export default function CategoryCard({
    title,
    icon,
    color,
    onPress,
}: CategoryCardProps) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
        >
            <Animated.View
                style={[
                    styles.container,
                    { backgroundColor: color, transform: [{ scale: scaleAnim }] },
                ]}
            >
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{icon}</Text>
                </View>
                <Text style={styles.title}>{title}</Text>
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Sizes.categoryCardSize,
        height: Sizes.categoryCardSize,
        borderRadius: Sizes.radiusLarge,
        borderColor: Colors.textWhite,
        borderWidth: 1,
        padding: Sizes.md,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: Sizes.radiusMedium,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Sizes.sm,
    },
    icon: {
        fontSize: 36,
    },
    title: {
        fontSize: Sizes.fontLarge,
        fontWeight: '700',
        color: Colors.textPrimary,
        textAlign: 'center',
    },
});
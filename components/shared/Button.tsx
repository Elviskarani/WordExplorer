import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Sizes } from '../../constants/Sizes';

interface ButtonProps {
    title: string;
    onPress: () => void;
    backgroundColor?: string;
    textColor?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export default function Button({
    title,
    onPress,
    backgroundColor = Colors.primary,
    textColor = Colors.textPrimary,
    style,
    textStyle,
}: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }, style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.buttonText, { color: textColor }, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: Sizes.buttonHeight,
        borderRadius: Sizes.radiusFull,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Sizes.xl,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        fontSize: Sizes.fontXLarge,
        fontWeight: '700',
    },
});
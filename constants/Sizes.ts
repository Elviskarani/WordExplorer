import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Sizes = {
    // Screen dimensions
    screenWidth: width,
    screenHeight: height,

    // Spacing
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,

    // Border radius
    radiusSmall: 8,
    radiusMedium: 12,
    radiusLarge: 16,
    radiusXLarge: 24,
    radiusFull: 9999,

    // Font sizes
    fontSmall: 12,
    fontMedium: 14,
    fontLarge: 16,
    fontXLarge: 20,
    fontXXLarge: 24,
    fontHuge: 32,
    fontTitle: 48,

    // Icon sizes
    iconSmall: 20,
    iconMedium: 24,
    iconLarge: 32,
    iconXLarge: 48,
    iconHuge: 64,

    // Button sizes
    buttonHeight: 56,
    buttonSmallHeight: 44,

    // Card sizes
    categoryCardSize: (width - 64) / 2, // 2 columns with spacing
};
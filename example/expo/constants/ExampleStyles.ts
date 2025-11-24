import { Platform, StyleSheet } from 'react-native';

// Color Palette
export const Colors = {
    primary: '#4A90E2',
    primaryDark: '#2E5C8A',
    primaryLight: '#E8F4FD',

    secondary: '#FF6B6B',
    secondaryLight: '#FFF5F5',

    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',

    background: '#F5F5F5',
    surface: '#FFFFFF',
    surfaceAlt: '#F8F9FA',

    text: '#333333',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textInverse: '#FFFFFF',

    border: '#E0E0E0',
    borderLight: '#F0F0F0',

    shadow: '#000000',
};

// Spacing
export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
};

// Typography
export const Typography = {
    fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        xxxl: 28,
    },
    fontWeight: {
        regular: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
    },
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
};

// Border Radius
export const BorderRadius = {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    round: 999,
};

// Shadows
export const Shadows = {
    small: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    medium: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    large: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
};

// Common Styles
export const CommonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    section: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.xl,
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.xl,
        ...Shadows.medium,
    },
    sectionTitle: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.text,
        marginBottom: Spacing.lg,
    },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPrimary: {
        backgroundColor: Colors.primary,
    },
    buttonSecondary: {
        backgroundColor: Colors.secondary,
    },
    buttonSuccess: {
        backgroundColor: Colors.success,
    },
    buttonError: {
        backgroundColor: Colors.error,
    },
    buttonText: {
        color: Colors.textInverse,
        fontSize: Typography.fontSize.md,
        fontWeight: Typography.fontWeight.semibold,
    },
    input: {
        borderWidth: 2,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        fontSize: Typography.fontSize.md,
        color: Colors.text,
    },
    inputFocused: {
        borderColor: Colors.primary,
    },
    inputError: {
        borderColor: Colors.error,
    },
});

// Platform-specific helpers
export const platformSelect = <T,>(options: { ios?: T; android?: T; default: T }): T => {
    if (Platform.OS === 'ios' && options.ios !== undefined) {
        return options.ios;
    }
    if (Platform.OS === 'android' && options.android !== undefined) {
        return options.android;
    }
    return options.default;
};

// OTP Input Sizes
export const OTPSizes = {
    small: {
        width: 40,
        height: 40,
        fontSize: 18,
    },
    medium: {
        width: 50,
        height: 50,
        fontSize: 22,
    },
    large: {
        width: 60,
        height: 60,
        fontSize: 26,
    },
};

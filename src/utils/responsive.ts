import { Dimensions, PixelRatio } from 'react-native';

/**
 * ResponsiveHelper provides utility functions for responsive sizing
 * across different screen sizes without external dependencies
 */
export class ResponsiveHelper {
    private static baseWidth = 375; // iPhone SE width as base
    private static baseHeight = 667; // iPhone SE height as base

    /**
     * Get current window width
     */
    static getWidth(): number {
        return Dimensions.get('window').width;
    }

    /**
     * Get current window height
     */
    static getHeight(): number {
        return Dimensions.get('window').height;
    }

    /**
     * Scale size based on screen width
     * @param size - The size to scale
     */
    static scale(size: number): number {
        const scale = this.getWidth() / this.baseWidth;
        return Math.round(PixelRatio.roundToNearestPixel(size * scale));
    }

    /**
     * Scale size based on screen height
     * @param size - The size to scale
     */
    static verticalScale(size: number): number {
        const scale = this.getHeight() / this.baseHeight;
        return Math.round(PixelRatio.roundToNearestPixel(size * scale));
    }

    /**
     * Moderate scale - scales with a factor to prevent extreme scaling
     * @param size - The size to scale
     * @param factor - Scaling factor (0-1), default 0.5
     */
    static moderateScale(size: number, factor: number = 0.5): number {
        return Math.round(size + (this.scale(size) - size) * factor);
    }
}

/**
 * Size configuration interface
 */
export interface SizeConfig {
    width: number;
    height: number;
    fontSize: number;
    spacing: number;
    borderRadius: number;
}

/**
 * Preset sizes for OTP input fields
 */
export const SIZES: Record<'small' | 'medium' | 'large', SizeConfig> = {
    small: {
        width: ResponsiveHelper.moderateScale(40),
        height: ResponsiveHelper.moderateScale(40),
        fontSize: ResponsiveHelper.moderateScale(16),
        spacing: ResponsiveHelper.moderateScale(8),
        borderRadius: ResponsiveHelper.moderateScale(6),
    },
    medium: {
        width: ResponsiveHelper.moderateScale(50),
        height: ResponsiveHelper.moderateScale(50),
        fontSize: ResponsiveHelper.moderateScale(20),
        spacing: ResponsiveHelper.moderateScale(10),
        borderRadius: ResponsiveHelper.moderateScale(6),
    },
    large: {
        width: ResponsiveHelper.moderateScale(60),
        height: ResponsiveHelper.moderateScale(60),
        fontSize: ResponsiveHelper.moderateScale(24),
        spacing: ResponsiveHelper.moderateScale(12),
        borderRadius: ResponsiveHelper.moderateScale(8),
    },
};

/**
 * Get size configuration based on size prop
 * @param size - Size preset or 'custom'
 * @param customConfig - Custom size configuration (used when size is 'custom')
 */
export const getSizeConfig = (
    size: 'small' | 'medium' | 'large' | 'custom' = 'medium',
    customConfig?: Partial<SizeConfig>
): SizeConfig => {
    if (size === 'custom' && customConfig) {
        return {
            width: customConfig.width ?? SIZES.medium.width,
            height: customConfig.height ?? SIZES.medium.height,
            fontSize: customConfig.fontSize ?? SIZES.medium.fontSize,
            spacing: customConfig.spacing ?? SIZES.medium.spacing,
            borderRadius: customConfig.borderRadius ?? SIZES.medium.borderRadius,
        };
    }
    return size !== 'custom' ? SIZES[size] : SIZES.medium;
};

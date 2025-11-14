/**
 * ResponsiveHelper provides utility functions for responsive sizing
 * across different screen sizes without external dependencies
 */
export declare class ResponsiveHelper {
    private static baseWidth;
    private static baseHeight;
    /**
     * Get current window width
     */
    static getWidth(): number;
    /**
     * Get current window height
     */
    static getHeight(): number;
    /**
     * Scale size based on screen width
     * @param size - The size to scale
     */
    static scale(size: number): number;
    /**
     * Scale size based on screen height
     * @param size - The size to scale
     */
    static verticalScale(size: number): number;
    /**
     * Moderate scale - scales with a factor to prevent extreme scaling
     * @param size - The size to scale
     * @param factor - Scaling factor (0-1), default 0.5
     */
    static moderateScale(size: number, factor?: number): number;
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
export declare const SIZES: Record<'small' | 'medium' | 'large', SizeConfig>;
/**
 * Get size configuration based on size prop
 * @param size - Size preset or 'custom'
 * @param customConfig - Custom size configuration (used when size is 'custom')
 */
export declare const getSizeConfig: (size?: "small" | "medium" | "large" | "custom", customConfig?: Partial<SizeConfig>) => SizeConfig;
//# sourceMappingURL=responsive.d.ts.map
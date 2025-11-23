"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSizeConfig = exports.SIZES = exports.ResponsiveHelper = void 0;
const react_native_1 = require("react-native");
/**
 * ResponsiveHelper provides utility functions for responsive sizing
 * across different screen sizes without external dependencies
 */
class ResponsiveHelper {
    /**
     * Get current window width
     */
    static getWidth() {
        return react_native_1.Dimensions.get('window').width;
    }
    /**
     * Get current window height
     */
    static getHeight() {
        return react_native_1.Dimensions.get('window').height;
    }
    /**
     * Scale size based on screen width
     * @param size - The size to scale
     */
    static scale(size) {
        const scale = this.getWidth() / this.baseWidth;
        return Math.round(react_native_1.PixelRatio.roundToNearestPixel(size * scale));
    }
    /**
     * Scale size based on screen height
     * @param size - The size to scale
     */
    static verticalScale(size) {
        const scale = this.getHeight() / this.baseHeight;
        return Math.round(react_native_1.PixelRatio.roundToNearestPixel(size * scale));
    }
    /**
     * Moderate scale - scales with a factor to prevent extreme scaling
     * @param size - The size to scale
     * @param factor - Scaling factor (0-1), default 0.5
     */
    static moderateScale(size, factor = 0.5) {
        return Math.round(size + (this.scale(size) - size) * factor);
    }
}
exports.ResponsiveHelper = ResponsiveHelper;
ResponsiveHelper.baseWidth = 375; // iPhone SE width as base
ResponsiveHelper.baseHeight = 667; // iPhone SE height as base
/**
 * Preset sizes for OTP input fields
 */
exports.SIZES = {
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
const getSizeConfig = (size = 'medium', customConfig) => {
    var _a, _b, _c, _d, _e;
    if (size === 'custom' && customConfig) {
        return {
            width: (_a = customConfig.width) !== null && _a !== void 0 ? _a : exports.SIZES.medium.width,
            height: (_b = customConfig.height) !== null && _b !== void 0 ? _b : exports.SIZES.medium.height,
            fontSize: (_c = customConfig.fontSize) !== null && _c !== void 0 ? _c : exports.SIZES.medium.fontSize,
            spacing: (_d = customConfig.spacing) !== null && _d !== void 0 ? _d : exports.SIZES.medium.spacing,
            borderRadius: (_e = customConfig.borderRadius) !== null && _e !== void 0 ? _e : exports.SIZES.medium.borderRadius,
        };
    }
    return size !== 'custom' ? exports.SIZES[size] : exports.SIZES.medium;
};
exports.getSizeConfig = getSizeConfig;
//# sourceMappingURL=responsive.js.map
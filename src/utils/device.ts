import { Platform } from 'react-native';

/**
 * Check if iOS version supports autofill (iOS 12+)
 */
const majorVersionIOS = parseInt(String(Platform.Version), 10);
export const isAutoFillSupported = Platform.OS === 'ios' && majorVersionIOS >= 12;

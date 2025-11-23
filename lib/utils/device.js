"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAutoFillSupported = void 0;
const react_native_1 = require("react-native");
/**
 * Check if iOS version supports autofill (iOS 12+)
 */
const majorVersionIOS = parseInt(String(react_native_1.Platform.Version), 10);
exports.isAutoFillSupported = react_native_1.Platform.OS === 'ios' && majorVersionIOS >= 12;
//# sourceMappingURL=device.js.map
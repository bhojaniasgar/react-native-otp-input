"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOtpVerify = void 0;
exports.getOtp = getOtp;
exports.startOtpListener = startOtpListener;
exports.getHash = getHash;
exports.requestHint = requestHint;
exports.addListener = addListener;
exports.removeListener = removeListener;
const react_native_1 = require("react-native");
const react_1 = require("react");
const RNOtpVerify = react_native_1.Platform.OS === 'android' ? (react_native_1.NativeModules.OtpVerify || react_native_1.NativeModules.RNOtpVerify) : null;
const eventEmitter = RNOtpVerify ? new react_native_1.NativeEventEmitter(RNOtpVerify) : null;
async function getOtp() {
    if (react_native_1.Platform.OS === 'ios') {
        return false;
    }
    if (!RNOtpVerify) {
        return false;
    }
    return RNOtpVerify.getOtp();
}
function startOtpListener(handler) {
    return getOtp().then((success) => {
        if (!success) {
            return null;
        }
        return addListener(handler);
    });
}
const useOtpVerify = ({ numberOfDigits } = { numberOfDigits: 0 }) => {
    const [message, setMessage] = (0, react_1.useState)(null);
    const [otp, setOtp] = (0, react_1.useState)(null);
    const [timeoutError, setTimeoutError] = (0, react_1.useState)(false);
    const [hash, setHash] = (0, react_1.useState)([]);
    const handleMessage = (response) => {
        if (response === 'Timeout Error.') {
            setTimeoutError(true);
        }
        else {
            setMessage(response);
            if (numberOfDigits && response) {
                const otpDigits = new RegExp(`(\\d{${numberOfDigits}})`, 'g').exec(response);
                if (otpDigits && otpDigits[1])
                    setOtp(otpDigits[1]);
            }
        }
    };
    (0, react_1.useEffect)(() => {
        if (react_native_1.Platform.OS === 'ios') {
            return;
        }
        getHash().then(setHash).catch(() => {
            // Native module not available
        });
        startOtpListener(handleMessage).catch(() => {
            // Native module not available
        });
        return () => {
            removeListener();
        };
    }, []);
    const startListener = () => {
        if (react_native_1.Platform.OS === 'ios') {
            return;
        }
        setOtp('');
        setMessage('');
        startOtpListener(handleMessage).catch(() => {
            // Native module not available
        });
    };
    const stopListener = () => {
        if (react_native_1.Platform.OS === 'ios') {
            return;
        }
        removeListener();
    };
    return { otp, message, hash, timeoutError, stopListener, startListener };
};
exports.useOtpVerify = useOtpVerify;
/**
 * Gets the app signature hash required for SMS Retriever API.
 * This hash is computed from your app's package name and signing certificate.
 *
 * IMPORTANT: Your SMS messages MUST include this exact hash for the SMS Retriever
 * API to deliver them to your app.
 *
 * SMS Format: <#> Your OTP is 123456 [YOUR_HASH_HERE]
 * Example: <#> Your OTP is 123456 L1lD8GP/5Eo
 *
 * @returns Array of signature hashes (usually contains one hash)
 */
async function getHash() {
    if (react_native_1.Platform.OS === 'ios') {
        return [];
    }
    if (!RNOtpVerify) {
        return [];
    }
    return RNOtpVerify.getHash();
}
async function requestHint() {
    if (react_native_1.Platform.OS === 'ios') {
        return '';
    }
    if (!RNOtpVerify) {
        return '';
    }
    return RNOtpVerify.requestHint();
}
function addListener(handler) {
    if (!eventEmitter) {
        return null;
    }
    return eventEmitter.addListener('com.asgar.otpVerify:otpReceived', handler);
}
function removeListener() {
    if (!eventEmitter) {
        return;
    }
    return eventEmitter.removeAllListeners('com.asgar.otpVerify:otpReceived');
}
const OtpVerify = {
    getOtp,
    getHash,
    addListener,
    removeListener,
    startOtpListener,
    requestHint,
};
exports.default = OtpVerify;
//# sourceMappingURL=OtpVerify.js.map
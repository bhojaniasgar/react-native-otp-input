"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOtpVerify = void 0;
exports.getOtp = getOtp;
exports.startOtpListener = startOtpListener;
exports.getHash = getHash;
exports.setHash = setHash;
exports.requestHint = requestHint;
exports.addListener = addListener;
exports.removeListener = removeListener;
const react_native_1 = require("react-native");
const react_1 = require("react");
const LINKING_ERROR = `The package '@bhojaniasgar/react-native-otp-input' doesn't seem to be linked. Make sure: \n\n` +
    react_native_1.Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo managed workflow\n';
const RNOtpVerify = react_native_1.NativeModules.OtpVerify || react_native_1.NativeModules.RNOtpVerify;
if (!RNOtpVerify) {
    console.error(LINKING_ERROR);
    console.error('Available NativeModules:', Object.keys(react_native_1.NativeModules));
}
const eventEmitter = RNOtpVerify ? new react_native_1.NativeEventEmitter(RNOtpVerify) : null;
async function getOtp() {
    if (react_native_1.Platform.OS === 'ios') {
        console.warn('Not Supported on iOS');
        return false;
    }
    if (!RNOtpVerify) {
        throw new Error(LINKING_ERROR);
    }
    return RNOtpVerify.getOtp();
}
function startOtpListener(handler) {
    return getOtp().then(() => addListener(handler));
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
            console.warn('Not Supported on iOS');
            return;
        }
        getHash().then(setHash);
        startOtpListener(handleMessage);
        return () => {
            removeListener();
        };
    }, []);
    const startListener = () => {
        if (react_native_1.Platform.OS === 'ios') {
            console.warn('Not Supported on iOS');
            return;
        }
        setOtp('');
        setMessage('');
        startOtpListener(handleMessage);
    };
    const stopListener = () => {
        if (react_native_1.Platform.OS === 'ios') {
            console.warn('Not Supported on iOS');
            return;
        }
        removeListener();
    };
    return { otp, message, hash, timeoutError, stopListener, startListener };
};
exports.useOtpVerify = useOtpVerify;
async function getHash() {
    if (react_native_1.Platform.OS === 'ios') {
        console.warn('Not Supported on iOS');
        return [];
    }
    if (!RNOtpVerify) {
        throw new Error(LINKING_ERROR);
    }
    return RNOtpVerify.getHash();
}
async function setHash(hash) {
    if (react_native_1.Platform.OS === 'ios') {
        console.warn('Not Supported on iOS');
        return false;
    }
    if (!RNOtpVerify) {
        throw new Error(LINKING_ERROR);
    }
    return RNOtpVerify.setHash(hash);
}
async function requestHint() {
    if (react_native_1.Platform.OS === 'ios') {
        console.warn('Not Supported on iOS');
        return '';
    }
    if (!RNOtpVerify) {
        throw new Error(LINKING_ERROR);
    }
    return RNOtpVerify.requestHint();
}
function addListener(handler) {
    if (!eventEmitter) {
        throw new Error(LINKING_ERROR);
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
    setHash,
    addListener,
    removeListener,
    startOtpListener,
    requestHint,
};
exports.default = OtpVerify;
//# sourceMappingURL=OtpVerify.js.map
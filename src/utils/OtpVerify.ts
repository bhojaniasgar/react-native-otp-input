import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { useEffect, useState } from 'react';

const RNOtpVerify = Platform.OS === 'android' ? (NativeModules.OtpVerify || NativeModules.RNOtpVerify) : null;

const eventEmitter = RNOtpVerify ? new NativeEventEmitter(RNOtpVerify) : null;

interface OtpVerify {
  getOtp: () => Promise<boolean>;
  getHash: () => Promise<string[]>;
  requestHint: () => Promise<string>;
  startOtpListener: (
    handler: (value: string) => void
  ) => Promise<import('react-native').EmitterSubscription | null>;
  addListener: (
    handler: (value: string) => void
  ) => import('react-native').EmitterSubscription | null;
  removeListener: () => void;
}

export async function getOtp(): Promise<boolean> {
  if (Platform.OS === 'ios') {
    return false;
  }
  if (!RNOtpVerify) {
    return false;
  }
  return RNOtpVerify.getOtp();
}

export function startOtpListener(
  handler: (value: string) => void
): Promise<import('react-native').EmitterSubscription | null> {
  return getOtp().then((success) => {
    if (!success) {
      return null;
    }
    return addListener(handler);
  });
}

export const useOtpVerify = ({ numberOfDigits } = { numberOfDigits: 0 }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);
  const [timeoutError, setTimeoutError] = useState<boolean>(false);
  const [hash, setHash] = useState<string[] | null>([]);

  const handleMessage = (response: string) => {
    if (response === 'Timeout Error.') {
      setTimeoutError(true);
    } else {
      setMessage(response);
      if (numberOfDigits && response) {
        const otpDigits = new RegExp(`(\\d{${numberOfDigits}})`, 'g').exec(response);
        if (otpDigits && otpDigits[1]) setOtp(otpDigits[1]);
      }
    }
  };
  useEffect(() => {
    if (Platform.OS === 'ios') {
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
    if (Platform.OS === 'ios') {
      return;
    }
    setOtp('');
    setMessage('');
    startOtpListener(handleMessage).catch(() => {
      // Native module not available
    });
  };
  const stopListener = () => {
    if (Platform.OS === 'ios') {
      return;
    }
    removeListener();
  };
  return { otp, message, hash, timeoutError, stopListener, startListener };
};

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
export async function getHash(): Promise<string[]> {
  if (Platform.OS === 'ios') {
    return [];
  }
  if (!RNOtpVerify) {
    return [];
  }
  return RNOtpVerify.getHash();
}

export async function requestHint(): Promise<string> {
  if (Platform.OS === 'ios') {
    return '';
  }
  if (!RNOtpVerify) {
    return '';
  }
  return RNOtpVerify.requestHint();
}

export function addListener(
  handler: (value: string) => void
): import('react-native').EmitterSubscription | null {
  if (!eventEmitter) {
    return null;
  }
  return eventEmitter.addListener(
    'com.asgar.otpVerify:otpReceived',
    handler
  );
}

export function removeListener(): void {
  if (!eventEmitter) {
    return;
  }
  return eventEmitter.removeAllListeners(
    'com.asgar.otpVerify:otpReceived'
  );
}

const OtpVerify: OtpVerify = {
  getOtp,
  getHash,
  addListener,
  removeListener,
  startOtpListener,
  requestHint,
};

export default OtpVerify;

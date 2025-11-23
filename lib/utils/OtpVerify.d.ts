interface OtpVerify {
    getOtp: () => Promise<boolean>;
    getHash: () => Promise<string[]>;
    requestHint: () => Promise<string>;
    startOtpListener: (handler: (value: string) => void) => Promise<import('react-native').EmitterSubscription | null>;
    addListener: (handler: (value: string) => void) => import('react-native').EmitterSubscription | null;
    removeListener: () => void;
}
export declare function getOtp(): Promise<boolean>;
export declare function startOtpListener(handler: (value: string) => void): Promise<import('react-native').EmitterSubscription | null>;
export declare const useOtpVerify: ({ numberOfDigits }?: {
    numberOfDigits: number;
}) => {
    otp: string | null;
    message: string | null;
    hash: string[] | null;
    timeoutError: boolean;
    stopListener: () => void;
    startListener: () => void;
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
export declare function getHash(): Promise<string[]>;
export declare function requestHint(): Promise<string>;
export declare function addListener(handler: (value: string) => void): import('react-native').EmitterSubscription | null;
export declare function removeListener(): void;
declare const OtpVerify: OtpVerify;
export default OtpVerify;
//# sourceMappingURL=OtpVerify.d.ts.map
interface OtpVerify {
    getOtp: () => Promise<boolean>;
    getHash: () => Promise<string[]>;
    setHash: (hash: string) => Promise<boolean>;
    requestHint: () => Promise<string>;
    startOtpListener: (handler: (value: string) => void) => Promise<import('react-native').EmitterSubscription>;
    addListener: (handler: (value: string) => void) => import('react-native').EmitterSubscription;
    removeListener: () => void;
}
export declare function getOtp(): Promise<boolean>;
export declare function startOtpListener(handler: (value: string) => void): Promise<import('react-native').EmitterSubscription>;
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
export declare function getHash(): Promise<string[]>;
export declare function setHash(hash: string): Promise<boolean>;
export declare function requestHint(): Promise<string>;
export declare function addListener(handler: (value: string) => void): import('react-native').EmitterSubscription;
export declare function removeListener(): void;
declare const OtpVerify: OtpVerify;
export default OtpVerify;
//# sourceMappingURL=OtpVerify.d.ts.map
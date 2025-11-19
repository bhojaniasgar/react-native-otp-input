import type { TurboModule } from 'react-native';
export interface Spec extends TurboModule {
    getOtp(): Promise<boolean>;
    getHash(): Promise<string[]>;
    requestHint(): Promise<string>;
    addListener(eventName: string): void;
    removeListeners(count: number): void;
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeOtpVerify.d.ts.map
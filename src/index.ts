// Main component exports
export { default, OtpInputView } from './components';

// Type exports
export type { OTPInputProps, OTPInputState } from './types';

// Utility exports (for advanced users)
export { ResponsiveHelper, SIZES, getSizeConfig, codeToArray, isAutoFillSupported } from './utils';
export type { SizeConfig } from './utils/responsive';

// OTP Verification exports (Android SMS Retriever API)
export {
  getOtp,
  getHash,
  setHash,
  requestHint,
  startOtpListener,
  addListener,
  removeListener,
  useOtpVerify,
  default as OtpVerify,
} from './utils/OtpVerify';


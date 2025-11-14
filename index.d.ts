/*
 * Typescript declaration file for @asgar/react-native-otp-input
 */

import * as React from 'react';
import type { OTPInputProps, OTPInputState } from './lib/types';

declare module '@asgar/react-native-otp-input' {
  export type { OTPInputProps, OTPInputState };

  export default class OTPInputView extends React.Component<OTPInputProps, OTPInputState> {}
}


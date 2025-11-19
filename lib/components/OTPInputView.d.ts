import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { OTPInputProps, OTPInputState } from '../types';
declare class OTPInputView extends Component<OTPInputProps, OTPInputState> {
    static defaultProps: Partial<OTPInputProps>;
    private fields;
    private keyboardDidHideListener?;
    private timer?;
    private hasCheckedClipBoard?;
    private clipBoardCode?;
    constructor(props: OTPInputProps);
    componentDidUpdate(prevProps: OTPInputProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private copyCodeFromClipBoardOnAndroid;
    bringUpKeyBoardIfNeeded: () => void;
    getDigits: () => string[];
    private handleKeyboardDidHide;
    private notifyCodeChanged;
    checkPinCodeFromClipBoard: () => Promise<void>;
    private handleChangeText;
    private handleKeyPressTextInput;
    private handleFocus;
    private handleBlur;
    focusField: (index?: number) => void;
    blurAllFields: () => void;
    clearAllFields: () => void;
    /**
     * Public method to set OTP value programmatically
     * @param value - OTP code to set
     */
    setValue: (value: string) => void;
    /**
     * Public method to clear all fields
     */
    clear: () => void;
    renderOneInputField: (_: TextInput | null, index: number) => React.JSX.Element;
    renderTextFields: () => React.JSX.Element[];
    render(): React.JSX.Element;
}
export default OTPInputView;
//# sourceMappingURL=OTPInputView.d.ts.map
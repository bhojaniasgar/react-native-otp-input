import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { OTPInputProps, OTPInputState } from '../types';
export default class OTPInputView extends Component<OTPInputProps, OTPInputState> {
    static defaultProps: Partial<OTPInputProps>;
    private fields;
    private keyboardDidHideListener?;
    private timer?;
    constructor(props: OTPInputProps);
    componentDidUpdate(prevProps: OTPInputProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    bringUpKeyBoardIfNeeded: () => void;
    getDigits: () => string[];
    private handleKeyboardDidHide;
    private notifyCodeChanged;
    private handleChangeText;
    private handleKeyPressTextInput;
    private handleFocus;
    private handleBlur;
    focusField: (index: number) => void;
    blurAllFields: () => void;
    clearAllFields: () => void;
    renderOneInputField: (_: TextInput | null, index: number) => React.JSX.Element;
    renderTextFields: () => React.JSX.Element[];
    render(): React.JSX.Element;
}
//# sourceMappingURL=OTPInputView.d.ts.map
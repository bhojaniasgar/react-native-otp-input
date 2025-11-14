import React, { Component } from 'react';
import {
    EmitterSubscription,
    I18nManager,
    Keyboard, TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { OTPInputProps, OTPInputState } from '../types';
import { codeToArray } from '../utils/codeToArray';
import { getSizeConfig } from '../utils/responsive';

export default class OTPInputView extends Component<OTPInputProps, OTPInputState> {
    static defaultProps: Partial<OTPInputProps> = {
        pinCount: 6,
        autoFocusOnLoad: true,
        secureTextEntry: false,
        editable: true,
        keyboardAppearance: 'default',
        keyboardType: 'number-pad',
        clearInputs: false,
        placeholderCharacter: '',
        selectionColor: '#000',
        size: 'medium',
        error: false,
    };

    private fields: (TextInput | null)[] = [];
    private keyboardDidHideListener?: EmitterSubscription;
    private timer?: NodeJS.Timeout;

    constructor(props: OTPInputProps) {
        super(props);
        const { code, pinCount = 6 } = props;
        this.state = {
            digits: codeToArray(code),
            selectedIndex: props.autoFocusOnLoad ? 0 : -1,
        };
        // Initialize fields array for this instance
        this.fields = new Array(pinCount).fill(null);
    }

    componentDidUpdate(prevProps: OTPInputProps) {
        const { code } = this.props;
        if (prevProps.code !== code) {
            this.setState({ digits: codeToArray(code) });
        }
    }

    componentDidMount() {
        const { pinCount = 6 } = this.props;
        if (pinCount === 6) {
            setTimeout(() => this.bringUpKeyBoardIfNeeded(), 300);
            this.keyboardDidHideListener = Keyboard.addListener(
                'keyboardDidHide',
                this.handleKeyboardDidHide
            );
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.keyboardDidHideListener?.remove();
        // Clear field references to prevent memory leaks and interference
        this.fields = [];
    }

    bringUpKeyBoardIfNeeded = () => {
        const { autoFocusOnLoad, pinCount = 6 } = this.props;
        const digits = this.getDigits();
        const focusIndex = digits.length ? digits.length - 1 : 0;
        if (focusIndex < pinCount && autoFocusOnLoad) {
            this.focusField(focusIndex);
        }
    };

    getDigits = (): string[] => {
        const { digits: innerDigits } = this.state;
        const { code } = this.props;
        return code === undefined ? innerDigits : code.split('');
    };

    private handleKeyboardDidHide = () => {
        this.blurAllFields();
    };

    private notifyCodeChanged = () => {
        const { digits } = this.state;
        const code = digits.join('');
        const { onCodeChanged } = this.props;
        if (onCodeChanged) {
            onCodeChanged(code);
        }
    };

    private handleChangeText = (index: number, text: string) => {
        const { onCodeFilled, pinCount = 6 } = this.props;
        const digits = this.getDigits();
        let newDigits = [...digits];

        if (text.length === 0) {
            // Remove the last digit when backspacing
            newDigits = newDigits.slice(0, newDigits.length - 1);
        } else {
            // Update digits based on the input text
            text.split('').forEach((value, i) => {
                if (index + i < pinCount) {
                    newDigits[index + i] = value;
                }
            });
        }

        this.setState({ digits: newDigits }, () => {
            this.notifyCodeChanged();

            const result = newDigits.join('');

            if (result.length >= pinCount) {
                // Notify code filled when the pin is complete
                onCodeFilled?.(result);
                this.focusField(pinCount - 1);
                this.blurAllFields();
            } else if (text.length > 0 && index < pinCount - 1) {
                // Move focus to the next input field
                this.focusField(index + 1);
            }
        });
    };

    private handleKeyPressTextInput = (index: number, key: string) => {
        const digits = this.getDigits();
        if (key === 'Backspace') {
            if (!digits[index] && index > 0) {
                this.handleChangeText(index - 1, '');
                this.focusField(index - 1);
            }
        }
    };

    private handleFocus = (index: number) => {
        const { onFocus } = this.props;
        if (onFocus) {
            onFocus(index);
        }
    };

    private handleBlur = (index: number) => {
        const { onBlur } = this.props;
        if (onBlur) {
            onBlur(index);
        }
    };

    focusField = (index: number) => {
        const { pinCount = 6 } = this.props;
        // Ensure index is within bounds
        const safeIndex = Math.max(0, Math.min(index, pinCount - 1));

        if (safeIndex < this.fields.length && this.fields[safeIndex]) {
            this.fields[safeIndex]?.focus();
            this.setState({
                selectedIndex: safeIndex,
            });
        }
    };

    blurAllFields = () => {
        this.fields.forEach((field: TextInput | null) => {
            if (field) {
                field.blur();
            }
        });
        this.setState({
            selectedIndex: -1,
        });
    };

    clearAllFields = () => {
        const { clearInputs, code } = this.props;
        if (clearInputs && code === '') {
            this.setState({
                digits: [],
                selectedIndex: 0,
            });
        }
    };

    renderOneInputField = (_: TextInput | null, index: number) => {
        const {
            codeInputFieldStyle,
            codeInputHighlightStyle,
            filledInputFieldStyle,
            errorInputFieldStyle,
            secureTextEntry,
            editable,
            keyboardType,
            selectionColor,
            keyboardAppearance,
            clearInputs,
            placeholderCharacter,
            placeholderTextColor,
            size = 'medium',
            inputWidth,
            inputHeight,
            fontSize,
            borderRadius,
            error,
        } = this.props;

        const { selectedIndex, digits } = this.state;

        // Get size configuration
        const sizeConfig = getSizeConfig(size, {
            width: inputWidth,
            height: inputHeight,
            fontSize,
            borderRadius,
        });

        // Default style
        const defaultTextFieldStyle = {
            width: sizeConfig.width,
            height: sizeConfig.height,
            fontSize: sizeConfig.fontSize,
            borderRadius: sizeConfig.borderRadius,
            textAlignVertical: 'center' as const,
            textAlign: 'center' as const,
            color: '#000',
            borderColor: '#ccc',
            borderWidth: 1,
        };

        // Determine which styles to apply
        const isFocused = selectedIndex === index;
        const isFilled = digits[index] !== undefined && digits[index] !== '';
        const hasError = error;

        const inputStyle = [
            defaultTextFieldStyle,
            codeInputFieldStyle,
            isFocused && codeInputHighlightStyle,
            isFilled && filledInputFieldStyle,
            hasError && errorInputFieldStyle,
        ];

        return (
            <View pointerEvents="none" key={`${index}view`} testID="inputSlotView">
                <TextInput
                    testID="textInput"
                    underlineColorAndroid="rgba(0,0,0,0)"
                    style={inputStyle}
                    ref={(ref: TextInput | null) => {
                        this.fields[index] = ref;
                    }}
                    onChangeText={(text: string) => {
                        this.handleChangeText(index, text);
                    }}
                    onKeyPress={({ nativeEvent: { key } }: { nativeEvent: { key: string } }) => {
                        this.handleKeyPressTextInput(index, key);
                    }}
                    onFocus={() => this.handleFocus(index)}
                    onBlur={() => this.handleBlur(index)}
                    value={clearInputs ? '' : digits[index]}
                    keyboardAppearance={keyboardAppearance}
                    keyboardType={keyboardType}
                    textContentType="none"
                    key={index}
                    autoComplete="off"
                    selectionColor={selectionColor}
                    secureTextEntry={secureTextEntry}
                    editable={editable}
                    placeholder={placeholderCharacter}
                    placeholderTextColor={placeholderTextColor}
                />
            </View>
        );
    };

    renderTextFields = () => {
        const { pinCount = 6 } = this.props;
        const array = new Array(pinCount).fill(null);
        return array.map(this.renderOneInputField);
    };

    render() {
        const { pinCount = 6, clearInputs, containerStyle, size = 'medium', inputSpacing } = this.props;
        const digits = this.getDigits();

        // Get size configuration for spacing
        const sizeConfig = getSizeConfig(size, { spacing: inputSpacing });

        const mainContainerStyle = {
            height: sizeConfig.height + 10,
        };

        const txtFieldMainView = {
            flexDirection: (I18nManager.isRTL ? 'row-reverse' : 'row') as 'row' | 'row-reverse',
            justifyContent: 'space-between' as const,
            alignItems: 'center' as const,
            width: '100%' as const,
            height: '100%' as const,
            gap: sizeConfig.spacing,
        };

        return (
            <View testID="OTPInputView" style={[mainContainerStyle, containerStyle]}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        if (clearInputs) {
                            this.clearAllFields();
                            this.focusField(0);
                        } else {
                            const filledPinCount = digits.filter((digit: string | null | undefined) => {
                                return digit !== null && digit !== undefined;
                            }).length;
                            this.focusField(Math.min(filledPinCount, pinCount - 1));
                        }
                    }}
                >
                    <View style={txtFieldMainView}>{this.renderTextFields()}</View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

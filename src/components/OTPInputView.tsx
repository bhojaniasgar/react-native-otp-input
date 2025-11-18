import React, { Component } from 'react';
import {
    EmitterSubscription,
    I18nManager,
    Keyboard,
    Platform,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { OTPInputProps, OTPInputState } from '../types';
import { codeToArray } from '../utils/codeToArray';
import { getSizeConfig } from '../utils/responsive';
import Clipboard from '@react-native-clipboard/clipboard';

export default class OTPInputView extends Component<OTPInputProps, OTPInputState> {
    static defaultProps: Partial<OTPInputProps> = {
        pinCount: 6,
        autoFocusOnLoad: true,
        autoFill: false,
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
    private hasCheckedClipBoard?: boolean;
    private clipBoardCode?: string;

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
        const { pinCount = 6, autoFill } = this.props;
        if (pinCount === 6) {
            // Enable clipboard autofill for Android if autoFill is enabled
            if (autoFill) {
                this.copyCodeFromClipBoardOnAndroid();
            }
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

    private copyCodeFromClipBoardOnAndroid = () => {
        if (Platform.OS === 'android' && Clipboard) {
            this.checkPinCodeFromClipBoard();
            this.timer = setInterval(this.checkPinCodeFromClipBoard, 400);
        }
    };

    bringUpKeyBoardIfNeeded = () => {
        const { autoFocusOnLoad, pinCount = 6, autoFill } = this.props;
        const digits = this.getDigits();
        // For autofill mode, calculate focus based on filled count
        const focusIndex = autoFill
            ? Math.min(digits.filter((d: string) => d && d !== '').length, pinCount - 1)
            : digits.length ? digits.length - 1 : 0;
        if (autoFocusOnLoad) {
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

    checkPinCodeFromClipBoard = async () => {
        if (!Clipboard) return;

        const { pinCount = 6, onCodeFilled, autoFill } = this.props;
        
        // Only check clipboard if autoFill is enabled
        if (!autoFill) return;

        const regexp = new RegExp(`^\\d{${pinCount}}$`, 'u');

        try {
            const code = await Clipboard.getString();

            if (this.hasCheckedClipBoard && regexp.test(code) && this.clipBoardCode !== code) {
                const digits = code.split('');
                this.setState(
                    {
                        digits,
                    },
                    () => {
                        this.notifyCodeChanged();
                        onCodeFilled?.(code);
                        // Set focus to the next empty field or last field if all filled
                        const nextEmptyIndex = digits.findIndex((d: string) => !d);
                        if (nextEmptyIndex === -1) {
                            this.blurAllFields();
                        } else {
                            this.focusField(nextEmptyIndex);
                        }
                    }
                );
            }

            this.clipBoardCode = code;
            this.hasCheckedClipBoard = true;
        } catch {
            // Silently handle clipboard read errors
        }
    };

    private handleChangeText = (index: number, text: string) => {
        const { onCodeFilled, pinCount = 6, autoFill } = this.props;
        const digits = this.getDigits();
        let newDigits = [...digits];

        if (autoFill) {
            // AutoFill mode - supports paste operations and better field management
            if (text.length === 0) {
                // Clear the current field when deleting
                newDigits[index] = '';
                // Remove any trailing empty strings to keep array clean
                while (newDigits.length > 0 && newDigits[newDigits.length - 1] === '') {
                    newDigits.pop();
                }
            } else if (text.length === 1) {
                // Single character input - normal typing
                newDigits[index] = text;
            } else {
                /*
                 * Multiple characters input - likely pasted content
                 * Clear existing digits and fill from the beginning
                 */
                newDigits = new Array(pinCount).fill('');
                const pastedDigits = text
                    .replace(/\D/gu, '')
                    .split('')
                    .slice(0, pinCount);
                pastedDigits.forEach((digit, i) => {
                    if (i < pinCount) {
                        newDigits[i] = digit;
                    }
                });
            }

            this.setState({ digits: newDigits }, () => {
                this.notifyCodeChanged();

                const result = newDigits.join('');
                const filledLength = newDigits.filter((d) => d !== '').length;

                if (filledLength >= pinCount) {
                    // Code is complete
                    onCodeFilled?.(result);
                    this.blurAllFields();
                } else if (text.length === 1 && filledLength > index) {
                    // Move to next field for single character input
                    const nextIndex = Math.min(filledLength, pinCount - 1);
                    this.focusField(nextIndex);
                } else if (text.length > 1) {
                    // For pasted content, focus on the next empty field or last field
                    const nextEmptyIndex = newDigits.findIndex((d) => d === '');
                    if (nextEmptyIndex === -1) {
                        this.focusField(Math.min(filledLength, pinCount - 1));
                    } else {
                        this.focusField(nextEmptyIndex);
                    }
                }
            });
        } else {
            // Standard mode - simple sequential input
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
        }
    };

    private handleKeyPressTextInput = (index: number, key: string) => {
        const { autoFill } = this.props;
        const digits = this.getDigits();
        
        if (key === 'Backspace') {
            if (autoFill) {
                // AutoFill mode - better backspace handling
                if (digits[index]) {
                    this.handleChangeText(index, '');
                }
                const prevIndex = index - 1;
                this.focusField(prevIndex);
                setTimeout(() => {
                    this.handleChangeText(prevIndex, '');
                }, 50);
            } else {
                // Standard mode
                if (!digits[index] && index > 0) {
                    this.handleChangeText(index - 1, '');
                    this.focusField(index - 1);
                }
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
            autoFill,
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
                    contextMenuHidden={autoFill ? true : undefined}
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
        const { pinCount = 6, clearInputs, containerStyle, size = 'medium', inputSpacing, autoFill } = this.props;
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
                                return digit !== null && digit !== undefined && (autoFill ? digit !== '' : true);
                            }).length;
                            const nextIndex = autoFill && filledPinCount >= pinCount ? pinCount - 1 : filledPinCount;
                            this.focusField(Math.min(nextIndex, pinCount - 1));
                        }
                    }}
                >
                    <View style={txtFieldMainView}>{this.renderTextFields()}</View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const codeToArray_1 = require("../utils/codeToArray");
const responsive_1 = require("../utils/responsive");
const clipboard_1 = __importDefault(require("@react-native-clipboard/clipboard"));
class OTPInputView extends react_1.Component {
    constructor(props) {
        super(props);
        this.fields = [];
        this.copyCodeFromClipBoardOnAndroid = () => {
            if (react_native_1.Platform.OS === 'android' && clipboard_1.default) {
                this.checkPinCodeFromClipBoard();
                this.timer = setInterval(this.checkPinCodeFromClipBoard, 400);
            }
        };
        this.bringUpKeyBoardIfNeeded = () => {
            const { autoFocusOnLoad, pinCount = 6, autoFill } = this.props;
            const digits = this.getDigits();
            // For autofill mode, calculate focus based on filled count
            const focusIndex = autoFill
                ? Math.min(digits.filter((d) => d && d !== '').length, pinCount - 1)
                : digits.length ? digits.length - 1 : 0;
            if (autoFocusOnLoad) {
                this.focusField(focusIndex);
            }
        };
        this.getDigits = () => {
            const { digits: innerDigits } = this.state;
            const { code } = this.props;
            return code === undefined ? innerDigits : code.split('');
        };
        this.handleKeyboardDidHide = () => {
            this.blurAllFields();
        };
        this.notifyCodeChanged = () => {
            const { digits } = this.state;
            const code = digits.join('');
            const { onCodeChanged } = this.props;
            if (onCodeChanged) {
                onCodeChanged(code);
            }
        };
        this.checkPinCodeFromClipBoard = async () => {
            if (!clipboard_1.default)
                return;
            const { pinCount = 6, onCodeFilled, autoFill } = this.props;
            // Only check clipboard if autoFill is enabled
            if (!autoFill)
                return;
            const regexp = new RegExp(`^\\d{${pinCount}}$`, 'u');
            try {
                const code = await clipboard_1.default.getString();
                if (this.hasCheckedClipBoard && regexp.test(code) && this.clipBoardCode !== code) {
                    const digits = code.split('');
                    this.setState({
                        digits,
                    }, () => {
                        this.notifyCodeChanged();
                        onCodeFilled === null || onCodeFilled === void 0 ? void 0 : onCodeFilled(code);
                        // Set focus to the next empty field or last field if all filled
                        const nextEmptyIndex = digits.findIndex((d) => !d);
                        if (nextEmptyIndex === -1) {
                            this.blurAllFields();
                        }
                        else {
                            this.focusField(nextEmptyIndex);
                        }
                    });
                }
                this.clipBoardCode = code;
                this.hasCheckedClipBoard = true;
            }
            catch (_a) {
                // Silently handle clipboard read errors
            }
        };
        this.handleChangeText = (index, text) => {
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
                }
                else if (text.length === 1) {
                    // Single character input - normal typing
                    newDigits[index] = text;
                }
                else {
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
                        onCodeFilled === null || onCodeFilled === void 0 ? void 0 : onCodeFilled(result);
                        this.blurAllFields();
                    }
                    else if (text.length === 1 && filledLength > index) {
                        // Move to next field for single character input
                        const nextIndex = Math.min(filledLength, pinCount - 1);
                        this.focusField(nextIndex);
                    }
                    else if (text.length > 1) {
                        // For pasted content, focus on the next empty field or last field
                        const nextEmptyIndex = newDigits.findIndex((d) => d === '');
                        if (nextEmptyIndex === -1) {
                            this.focusField(Math.min(filledLength, pinCount - 1));
                        }
                        else {
                            this.focusField(nextEmptyIndex);
                        }
                    }
                });
            }
            else {
                // Standard mode - simple sequential input
                if (text.length === 0) {
                    // Remove the last digit when backspacing
                    newDigits = newDigits.slice(0, newDigits.length - 1);
                }
                else {
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
                        onCodeFilled === null || onCodeFilled === void 0 ? void 0 : onCodeFilled(result);
                        this.focusField(pinCount - 1);
                        this.blurAllFields();
                    }
                    else if (text.length > 0 && index < pinCount - 1) {
                        // Move focus to the next input field
                        this.focusField(index + 1);
                    }
                });
            }
        };
        this.handleKeyPressTextInput = (index, key) => {
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
                }
                else {
                    // Standard mode
                    if (!digits[index] && index > 0) {
                        this.handleChangeText(index - 1, '');
                        this.focusField(index - 1);
                    }
                }
            }
        };
        this.handleFocus = (index) => {
            const { onFocus } = this.props;
            if (onFocus) {
                onFocus(index);
            }
        };
        this.handleBlur = (index) => {
            const { onBlur } = this.props;
            if (onBlur) {
                onBlur(index);
            }
        };
        this.focusField = (index) => {
            var _a;
            const { pinCount = 6 } = this.props;
            // Ensure index is within bounds
            const safeIndex = Math.max(0, Math.min(index, pinCount - 1));
            if (safeIndex < this.fields.length && this.fields[safeIndex]) {
                (_a = this.fields[safeIndex]) === null || _a === void 0 ? void 0 : _a.focus();
                this.setState({
                    selectedIndex: safeIndex,
                });
            }
        };
        this.blurAllFields = () => {
            this.fields.forEach((field) => {
                if (field) {
                    field.blur();
                }
            });
            this.setState({
                selectedIndex: -1,
            });
        };
        this.clearAllFields = () => {
            const { clearInputs, code } = this.props;
            if (clearInputs && code === '') {
                this.setState({
                    digits: [],
                    selectedIndex: 0,
                });
            }
        };
        this.renderOneInputField = (_, index) => {
            const { codeInputFieldStyle, codeInputHighlightStyle, filledInputFieldStyle, errorInputFieldStyle, secureTextEntry, editable, keyboardType, selectionColor, keyboardAppearance, clearInputs, placeholderCharacter, placeholderTextColor, size = 'medium', inputWidth, inputHeight, fontSize, borderRadius, error, autoFill, } = this.props;
            const { selectedIndex, digits } = this.state;
            // Get size configuration
            const sizeConfig = (0, responsive_1.getSizeConfig)(size, {
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
                textAlignVertical: 'center',
                textAlign: 'center',
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
            return (<react_native_1.View pointerEvents="none" key={`${index}view`} testID="inputSlotView">
                <react_native_1.TextInput testID="textInput" underlineColorAndroid="rgba(0,0,0,0)" style={inputStyle} ref={(ref) => {
                    this.fields[index] = ref;
                }} onChangeText={(text) => {
                    this.handleChangeText(index, text);
                }} onKeyPress={({ nativeEvent: { key } }) => {
                    this.handleKeyPressTextInput(index, key);
                }} onFocus={() => this.handleFocus(index)} onBlur={() => this.handleBlur(index)} value={clearInputs ? '' : digits[index]} keyboardAppearance={keyboardAppearance} contextMenuHidden={autoFill ? true : undefined} keyboardType={keyboardType} textContentType="none" key={index} autoComplete="off" selectionColor={selectionColor} secureTextEntry={secureTextEntry} editable={editable} placeholder={placeholderCharacter} placeholderTextColor={placeholderTextColor}/>
            </react_native_1.View>);
        };
        this.renderTextFields = () => {
            const { pinCount = 6 } = this.props;
            const array = new Array(pinCount).fill(null);
            return array.map(this.renderOneInputField);
        };
        const { code, pinCount = 6 } = props;
        this.state = {
            digits: (0, codeToArray_1.codeToArray)(code),
            selectedIndex: props.autoFocusOnLoad ? 0 : -1,
        };
        // Initialize fields array for this instance
        this.fields = new Array(pinCount).fill(null);
    }
    componentDidUpdate(prevProps) {
        const { code } = this.props;
        if (prevProps.code !== code) {
            this.setState({ digits: (0, codeToArray_1.codeToArray)(code) });
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
            this.keyboardDidHideListener = react_native_1.Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
        }
    }
    componentWillUnmount() {
        var _a;
        if (this.timer) {
            clearInterval(this.timer);
        }
        (_a = this.keyboardDidHideListener) === null || _a === void 0 ? void 0 : _a.remove();
        // Clear field references to prevent memory leaks and interference
        this.fields = [];
    }
    render() {
        const { pinCount = 6, clearInputs, containerStyle, size = 'medium', inputSpacing, autoFill } = this.props;
        const digits = this.getDigits();
        // Get size configuration for spacing
        const sizeConfig = (0, responsive_1.getSizeConfig)(size, { spacing: inputSpacing });
        const mainContainerStyle = {
            height: sizeConfig.height + 10,
        };
        const txtFieldMainView = {
            flexDirection: (react_native_1.I18nManager.isRTL ? 'row-reverse' : 'row'),
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            gap: sizeConfig.spacing,
        };
        return (<react_native_1.View testID="OTPInputView" style={[mainContainerStyle, containerStyle]}>
                <react_native_1.TouchableWithoutFeedback onPress={() => {
                if (clearInputs) {
                    this.clearAllFields();
                    this.focusField(0);
                }
                else {
                    const filledPinCount = digits.filter((digit) => {
                        return digit !== null && digit !== undefined && (autoFill ? digit !== '' : true);
                    }).length;
                    const nextIndex = autoFill && filledPinCount >= pinCount ? pinCount - 1 : filledPinCount;
                    this.focusField(Math.min(nextIndex, pinCount - 1));
                }
            }}>
                    <react_native_1.View style={txtFieldMainView}>{this.renderTextFields()}</react_native_1.View>
                </react_native_1.TouchableWithoutFeedback>
            </react_native_1.View>);
    }
}
OTPInputView.defaultProps = {
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
exports.default = OTPInputView;
//# sourceMappingURL=OTPInputView.js.map
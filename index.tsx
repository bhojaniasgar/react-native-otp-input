// @ts-ignore
import { InputProps, OTPInputViewState } from '@asgar/react-native-otp-input';
import { Component } from 'react';
import { EmitterSubscription, Keyboard, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import styles from './styles';
import { codeToArray } from './helpers/codeToArray';

export default class OTPInputView extends Component<InputProps, OTPInputViewState> {
    static defaultProps: InputProps = {
        pinCount: 6,
        autoFocusOnLoad: true,
        secureTextEntry: false,
        editable: true,
        keyboardAppearance: 'default',
        keyboardType: 'number-pad',
        clearInputs: false,
        placeholderCharacter: '',
        selectionColor: '#000',
    }

    private fields: TextInput[] | null[] = []
    private keyboardDidHideListener?: EmitterSubscription;
    private timer?: any;

    constructor(props: InputProps) {
        super(props)
        const { code } = props
        this.state = {
            digits: codeToArray(code),
            selectedIndex: props.autoFocusOnLoad ? 0 : -1,
        }
        // Initialize fields array for this instance
        this.fields = new Array(props.pinCount).fill(null);
    }

    componentDidUpdate(prevProps: InputProps) {
        const { code } = this.props;
        if (prevProps.code !== code) {
            this.setState({ digits: codeToArray(code) });
        }
    }


    componentDidMount() {
        const { pinCount } = this.props
        if (pinCount === 6) {
            setTimeout(() => this.bringUpKeyBoardIfNeeded(), 300);
            this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide)
        }

    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer)
        }
        this.keyboardDidHideListener?.remove()
        // Clear field references to prevent memory leaks and interference
        this.fields = []
    }


    bringUpKeyBoardIfNeeded = () => {
        const {
            autoFocusOnLoad,
            pinCount
        } = this.props
        const digits = this.getDigits()
        const focusIndex = digits.length ? digits.length - 1 : 0
        if (focusIndex < pinCount && autoFocusOnLoad) {
            this.focusField(focusIndex)
        }
    }

    getDigits = () => {
        const { digits: innerDigits } = this.state
        const { code } = this.props
        return code === undefined ? innerDigits : code.split('')
    }

    private handleKeyboardDidHide = () => {
        this.blurAllFields()
    }

    private notifyCodeChanged = () => {
        const { digits } = this.state
        const code = digits.join('')
        const { onCodeChanged } = this.props
        if (onCodeChanged) {
            onCodeChanged(code)
        }
    }

    private handleChangeText = (index: number, text: string) => {
        const {
            onCodeFilled,
            pinCount
        } = this.props;
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
        const digits = this.getDigits()
        if (key === 'Backspace') {
            if (!digits[index] && index > 0) {
                this.handleChangeText(index - 1, '')
                this.focusField(index - 1)
            }
        }
    }

    focusField = (index: number) => {
        const { pinCount } = this.props;
        // Ensure index is within bounds
        const safeIndex = Math.max(0, Math.min(index, pinCount - 1));

        if (safeIndex < this?.fields?.length && this?.fields[safeIndex]) {
            (this?.fields[safeIndex] as TextInput)?.focus();
            this.setState({
                selectedIndex: safeIndex
            })
        }
    }

    blurAllFields = () => {
        this.fields.forEach((field: TextInput | null) => {
            if (field) {
                (field as TextInput).blur()
            }
        })
        this.setState({
            selectedIndex: -1,
        })
    }


    clearAllFields = () => {
        const {
            clearInputs,
            code
        } = this.props;
        if (clearInputs && code === '') {
            this.setState({
                digits: [],
                selectedIndex: 0
            })
        }
    }

    renderOneInputField = (_: TextInput, index: number) => {
        const {
            codeInputFieldStyle,
            codeInputHighlightStyle,
            secureTextEntry,
            editable,
            keyboardType,
            selectionColor,
            keyboardAppearance
        } = this.props
        const { defaultTextFieldStyle } = styles
        const {
            selectedIndex,
            digits
        } = this.state
        const {
            clearInputs,
            placeholderCharacter,
            placeholderTextColor
        } = this.props

        return (
            <View pointerEvents="none" key={`${index}view`} testID="inputSlotView">
                <TextInput
                    testID="textInput"
                    underlineColorAndroid="rgba(0,0,0,0)"
                    style={selectedIndex === index ? [
                        defaultTextFieldStyle,
                        codeInputFieldStyle,
                        codeInputHighlightStyle
                    ] : [
                        defaultTextFieldStyle,
                        codeInputFieldStyle
                    ]}
                    ref={(ref) => {
                        this.fields[index] = ref
                    }}
                    onChangeText={(text) => {
                        this.handleChangeText(index, text)
                    }}
                    onKeyPress={({ nativeEvent: { key } }) => {
                        this.handleKeyPressTextInput(index, key)
                    }}
                    value={clearInputs ? '' : digits[index]}
                    keyboardAppearance={keyboardAppearance}
                    keyboardType={keyboardType}
                    textContentType={'none'}
                    key={index}
                    autoComplete="off"
                    textAlign={'center'}
                    selectionColor={selectionColor}
                    secureTextEntry={secureTextEntry}
                    editable={editable}
                    placeholder={placeholderCharacter}
                    placeholderTextColor={placeholderTextColor}
                />
            </View>
        )
    }

    renderTextFields = () => {
        const { pinCount } = this.props
        const array = new Array(pinCount).fill(0)
        return array.map(this.renderOneInputField)
    }

    render() {
        const {
            pinCount,
            clearInputs
        } = this.props
        const digits = this.getDigits()
        const {
            mainContainerStyle,
            txtFieldMainView,
            touchableView
        } = styles
        return (
            <View
                testID="OTPInputView"
                style={mainContainerStyle}
            >
                <TouchableWithoutFeedback
                    style={touchableView}
                    onPress={() => {
                        if (clearInputs) {
                            this.clearAllFields();
                            this.focusField(0)
                        } else {
                            const filledPinCount = digits.filter((digit: null | undefined) => {
                                return digit !== null && digit !== undefined
                            }).length
                            this.focusField(Math.min(filledPinCount, pinCount - 1))
                        }
                    }}
                >
                    <View style={txtFieldMainView}>
                        {this.renderTextFields()}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
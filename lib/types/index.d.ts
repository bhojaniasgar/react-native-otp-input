import { TextStyle, ViewStyle, KeyboardTypeOptions } from 'react-native';
/**
 * OTP Input component props interface
 */
export interface OTPInputProps {
    /**
     * Number of OTP digits
     * @default 6
     */
    pinCount?: number;
    /**
     * Current OTP code value
     */
    code?: string;
    /**
     * Callback fired when any digit changes
     * @param code - Current OTP code
     */
    onCodeChanged?: (code: string) => void;
    /**
     * Callback fired when all digits are filled
     * @param code - Complete OTP code
     */
    onCodeFilled?: (code: string) => void;
    /**
     * Auto focus first input on component mount
     * @default true
     */
    autoFocusOnLoad?: boolean;
    /**
     * Enable automatic OTP code detection from clipboard (Android only)
     * When enabled, the component will automatically check clipboard for OTP codes
     * @default false
     */
    autoFill?: boolean;
    /**
     * Hide input text (for secure entry)
     * @default false
     */
    secureTextEntry?: boolean;
    /**
     * Enable/disable input editing
     * @default true
     */
    editable?: boolean;
    /**
     * Clear all inputs when true
     * @default false
     */
    clearInputs?: boolean;
    /**
     * Keyboard type for input
     * @default 'number-pad'
     */
    keyboardType?: KeyboardTypeOptions;
    /**
     * Keyboard appearance theme
     * @default 'default'
     */
    keyboardAppearance?: 'default' | 'dark' | 'light';
    /**
     * Style for the main container
     */
    containerStyle?: ViewStyle;
    /**
     * Style for input fields (default state)
     */
    codeInputFieldStyle?: TextStyle;
    /**
     * Style for focused input field
     */
    codeInputHighlightStyle?: TextStyle;
    /**
     * Style for filled input fields
     */
    filledInputFieldStyle?: TextStyle;
    /**
     * Style for input fields in error state
     */
    errorInputFieldStyle?: TextStyle;
    /**
     * Preset size for inputs (small, medium, large, custom)
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large' | 'custom';
    /**
     * Spacing between input fields (used when size is 'custom')
     */
    inputSpacing?: number;
    /**
     * Width of each input field (used when size is 'custom')
     */
    inputWidth?: number;
    /**
     * Height of each input field (used when size is 'custom')
     */
    inputHeight?: number;
    /**
     * Font size for input text (used when size is 'custom')
     */
    fontSize?: number;
    /**
     * Border radius for input fields (used when size is 'custom')
     */
    borderRadius?: number;
    /**
     * Character to show in empty inputs
     * @default ''
     */
    placeholderCharacter?: string;
    /**
     * Color for placeholder text
     */
    placeholderTextColor?: string;
    /**
     * Color for text selection and cursor
     * @default '#000'
     */
    selectionColor?: string;
    /**
     * Show error state styling
     * @default false
     */
    error?: boolean;
    /**
     * Callback fired when an input receives focus
     * @param index - Index of focused input
     */
    onFocus?: (index: number) => void;
    /**
     * Callback fired when an input loses focus
     * @param index - Index of blurred input
     */
    onBlur?: (index: number) => void;
}
/**
 * OTP Input component state interface
 */
export interface OTPInputState {
    /**
     * Array of digit values
     */
    digits: string[];
    /**
     * Index of currently selected input (-1 if none)
     */
    selectedIndex: number;
}
/**
 * Size configuration for OTP inputs
 */
export interface SizeConfig {
    width: number;
    height: number;
    fontSize: number;
    spacing: number;
    borderRadius: number;
}
//# sourceMappingURL=index.d.ts.map
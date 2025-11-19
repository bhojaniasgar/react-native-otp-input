import { TextStyle, ViewStyle, KeyboardTypeOptions } from 'react-native';

/**
 * OTP Input component props interface
 */
export interface OTPInputProps {
    // Core functionality
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

    // Behavior
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

    // Keyboard
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

    // Styling - Container
    /**
     * Style for the main container
     */
    containerStyle?: ViewStyle;

    // Styling - Input Fields
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

    // Spacing and Size
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

    // Placeholder
    /**
     * Character to show in empty inputs
     * @default ''
     */
    placeholderCharacter?: string;

    /**
     * Color for placeholder text
     */
    placeholderTextColor?: string;

    // Selection
    /**
     * Color for text selection and cursor
     * @default '#000'
     */
    selectionColor?: string;

    // Error state
    /**
     * Show error state styling
     * @default false
     */
    error?: boolean;

    // Callbacks
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

/**
 * OTP Input component ref methods
 */
export interface OTPInputViewRef {
    /**
     * Set the OTP value programmatically
     * @param value - OTP code to set
     */
    setValue: (value: string) => void;

    /**
     * Clear all input fields
     */
    clear: () => void;

    /**
     * Focus on a specific input field
     * @param index - Index of field to focus (default: 0)
     */
    focusField: (index?: number) => void;

    /**
     * Blur all input fields
     */
    blurAllFields: () => void;
}

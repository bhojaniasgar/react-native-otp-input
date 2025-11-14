# @bhojaniasgar/react-native-otp-input

[![npm version](https://badge.fury.io/js/%40bhojaniasgar%2Freact-native-otp-input.svg)](https://www.npmjs.com/package/@bhojaniasgar/react-native-otp-input)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Expo Compatible](https://img.shields.io/badge/Expo-Compatible-blue.svg)](https://expo.dev)

A fully customizable, responsive OTP (One-Time Password) input component for React Native with autofill support for Android and iOS.

**✅ Works with Expo** | **✅ Works with React Native CLI**

## ✨ Features

- 🎨 **Fully Customizable** - Extensive styling options for every state (default, focused, filled, error)
- 📱 **Responsive** - Built-in responsive sizing without external dependencies
- 🔄 **Auto-fill Support** - Automatic clipboard detection on Android
- ⌨️ **Smart Keyboard Handling** - Intelligent focus management and keyboard interactions
- 🌍 **RTL Support** - Full support for right-to-left languages
- 📦 **TypeScript** - Complete type definitions included
- 🔒 **Secure Entry** - Support for masked/secure text entry
- ♿ **Accessible** - Built with accessibility in mind
- ✅ **Expo Compatible** - Works seamlessly with Expo and React Native CLI

## 📦 Installation

### npm

npx expo install @bhojaniasgar/react-native-otp-input

### For React Native CLI Projects

```bash
npm install @bhojaniasgar/react-native-otp-input

yarn add @bhojaniasgar/react-native-otp-input

pnpm add @bhojaniasgar/react-native-otp-input

bun add @bhojaniasgar/react-native-otp-input
```

### Third Party Dependency

```bash
# Expo
npx expo install @react-native-clipboard/clipboard

# React Native CLI
npm install @react-native-clipboard/clipboard
```

## 🚀 Quick Start

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import OTPInputView from '@bhojaniasgar/react-native-otp-input';

function App() {
  const [code, setCode] = useState('');

  return (
    <View style={{ padding: 20 }}>
      <OTPInputView
        pinCount={6}
        code={code}
        onCodeChanged={setCode}
        onCodeFilled={(code) => {
          console.log(`OTP is ${code}, you are good to go!`);
        }}
        autoFocusOnLoad
      />
    </View>
  );
}
```

## 📖 Examples

For comprehensive examples including custom styling, size variants, auto-fill, error states, and more
 <!-- check out our **[Examples Documentation](./example/EXAMPLES.md)**. -->

The examples include:
- 🎨 Custom styling and themes
- 📏 Size presets and variants
- 🔄 Auto-fill support
- ❌ Error state handling
- 🔒 Secure entry

### Note - Expo Example Comming soon
<!-- **[View All Examples →](./example/EXAMPLES.md)** -->

## 📚 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pinCount` | `number` | `6` | Number of OTP digits |
| `code` | `string` | `undefined` | Controlled value for the OTP |
| `onCodeChanged` | `(code: string) => void` | `undefined` | Callback fired when any digit changes |
| `onCodeFilled` | `(code: string) => void` | `undefined` | Callback fired when all digits are filled |
| `autoFocusOnLoad` | `boolean` | `true` | Auto focus first input on mount |
| `secureTextEntry` | `boolean` | `false` | Hide input text (secure entry) |
| `editable` | `boolean` | `true` | Enable/disable input editing |
| `clearInputs` | `boolean` | `false` | Clear all inputs when true |
| `keyboardType` | `KeyboardTypeOptions` | `'number-pad'` | Keyboard type for input |
| `keyboardAppearance` | `'default' \| 'dark' \| 'light'` | `'default'` | Keyboard appearance theme |
| `containerStyle` | `ViewStyle` | `undefined` | Style for the main container |
| `codeInputFieldStyle` | `TextStyle` | `undefined` | Style for input fields (default state) |
| `codeInputHighlightStyle` | `TextStyle` | `undefined` | Style for focused input field |
| `filledInputFieldStyle` | `TextStyle` | `undefined` | Style for filled input fields |
| `errorInputFieldStyle` | `TextStyle` | `undefined` | Style for error state |
| `size` | `'small' \| 'medium' \| 'large' \| 'custom'` | `'medium'` | Preset size for inputs |
| `inputSpacing` | `number` | `undefined` | Spacing between inputs (custom size) |
| `inputWidth` | `number` | `undefined` | Width of each input (custom size) |
| `inputHeight` | `number` | `undefined` | Height of each input (custom size) |
| `fontSize` | `number` | `undefined` | Font size for input text (custom size) |
| `borderRadius` | `number` | `undefined` | Border radius for inputs (custom size) |
| `placeholderCharacter` | `string` | `''` | Character to show in empty inputs |
| `placeholderTextColor` | `string` | `undefined` | Color for placeholder text |
| `selectionColor` | `string` | `'#000'` | Color for text selection and cursor |
| `error` | `boolean` | `false` | Show error state styling |
| `onFocus` | `(index: number) => void` | `undefined` | Callback when an input receives focus |
| `onBlur` | `(index: number) => void` | `undefined` | Callback when an input loses focus |


## 🎯 Size Presets

The component includes three built-in size presets:

| Size | Width | Height | Font Size | Spacing |
|------|-------|--------|-----------|---------|
| Small | 40px | 40px | 16px | 8px |
| Medium | 50px | 50px | 20px | 10px |
| Large | 60px | 60px | 24px | 12px |

All sizes are responsive and scale based on screen dimensions.

## 🔧 Running the Examples

Want to see the component in action? Check out our example apps:

- **[Expo Example](./example/expo)** - Modern Liquid Glass Design with Expo Router
- **[React Native CLI Example](./example/BareCLi)** - Traditional React Native setup

**[View Examples Documentation →](./example/EXAMPLES.md)**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT © Asgar

## 🙏 Acknowledgments

- Inspired by the need for a fully customizable, dependency-free OTP input component
- Built with ❤️ for the React Native community

## 📞 Support

- 📧 Email: [im.bhojaniasgar@gmail.com](mailto:im.bhojaniasgar@gmail.com)
- 🐛 Issues: [GitHub Issues](https://github.com/bhojaniasgar/react-native-otp-input/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/bhojaniasgar/react-native-otp-input/discussions)

---

Made with ❤️ by Asgar

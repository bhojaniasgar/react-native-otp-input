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
import { OtpInputView } from '@bhojaniasgar/react-native-otp-input';

function App() {
  const [code, setCode] = useState('');

  return (
    <View style={{ padding: 20 }}>
      <OtpInputView
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

## 🔄 Auto-Fill Support

### Clipboard Auto-Fill (Android)

Enable automatic OTP code detection from clipboard on Android devices:

```tsx
import { OtpInputView } from '@bhojaniasgar/react-native-otp-input';

<OtpInputView
  pinCount={6}
  code={code}
  onCodeChanged={setCode}
  onCodeFilled={(code) => console.log('Auto-filled:', code)}
  autoFill={true} // Enable clipboard auto-detection
/>
```

**How it works:**
- When `autoFill` is enabled, the component monitors the clipboard for OTP codes
- Automatically detects numeric codes matching the `pinCount` length
- Works seamlessly on Android devices
- Provides better paste support and field management
- No manual intervention required - just copy the OTP and it auto-fills!

**Requirements:**
- `@react-native-clipboard/clipboard` must be installed (see Installation section)
- Only works on Android platform
- OTP code must be numeric and match the specified `pinCount`

### SMS Retriever API (Android)

For automatic SMS OTP detection using Android's SMS Retriever API:

```tsx
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { 
  OtpInputView, 
  getHash, 
  startOtpListener, 
  removeListener 
} from '@bhojaniasgar/react-native-otp-input';

function App() {
  const [code, setCode] = useState('');

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Get app hash for SMS format
      // IMPORTANT: This hash is computed from your app's signing certificate
      // and cannot be changed. Use this EXACT hash in your backend SMS.
      getHash()
        .then((hashes) => {
          console.log('App Hash:', hashes);
          // Use this hash in your backend SMS: <#> Your OTP is 123456 [hash]
          // Example: <#> Your OTP is 123456 L1lD8GP/5Eo
        })
        .catch((error) => console.error('Error getting hash:', error));

      // Start listening for OTP SMS
      startOtpListener((message: string) => {
        if (!message) return;
        
        // Extract OTP from SMS message
        const otp = /(\d{6})/g.exec(message);
        if (otp && otp[1]) {
          setCode(otp[1]);
        }
      });

      // Cleanup listener on unmount
      return () => removeListener();
    }
  }, []);

  return (
    <OtpInputView
      pinCount={6}
      code={code}
      onCodeChanged={setCode}
      onCodeFilled={(code) => console.log('OTP verified:', code)}
    />
  );
}
```

**Available SMS Retriever API Functions:**

```tsx
import {
  getHash,           // Get app hash for SMS format
  startOtpListener,  // Start listening for OTP SMS
  addListener,       // Add custom listener
  removeListener,    // Remove all listeners
  getOtp,           // Request OTP (triggers SMS Retriever)
  requestHint,      // Request phone number hint
  useOtpVerify,     // React hook for OTP verification
} from '@bhojaniasgar/react-native-otp-input';
```

**Understanding App Hash:**

The app hash is computed from your app's package name and signing certificate. This hash **cannot be changed at runtime** - it's determined by Android based on your app's signature.

```tsx
import { getHash } from '@bhojaniasgar/react-native-otp-input';

// Get your app's computed hash
const hashes = await getHash(); 
console.log('App Hash:', hashes); // e.g., ['L1lD8GP/5Eo']

// IMPORTANT: Use this EXACT hash in your backend SMS messages
// The hash is computed from your app's signing certificate and cannot be changed
```

**SMS Format Requirements:**
- SMS must start with `<#>`
- Must contain your app hash at the end (exact match required)
- Example: `<#> Your OTP is 123456 L1lD8GP/5Eo`

**Security & Hash Validation:** 
The Android SMS Retriever API validates the hash at the **system level**. Only SMS messages with the **exact matching hash** will be delivered to your app.

Examples:
- ✅ App hash: `L1lD8GP/5Eo` | SMS: `<#> Your OTP is 123456 L1lD8GP/5Eo` → **Works**
- ❌ App hash: `L1lD8GP/5Eo` | SMS: `<#> Your OTP is 123456 L1lD8GP/5Eo1wdf` → **Blocked by Android**
- ❌ App hash: `L1lD8GP/5Eo` | SMS: `<#> Your OTP is 123456 DIFFERENT` → **Blocked by Android**

**Important Notes:**
- The hash is tied to your app's signing certificate
- Debug builds and release builds may have different hashes (different certificates)
- You cannot override or change this hash - it's computed by Android
- Always use `getHash()` to get the correct hash for your SMS messages

**Note:** SMS Retriever API only works on Android. iOS users should use clipboard auto-fill or manual entry.

## 📖 Documentation

### Getting Started && Examples
- **[Installation & Setup](#-installation)** - Installation instructions
- **[Examples](./example/)** - Live code examples 💻

### Examples Include:
- 🎨 Custom styling and themes
- 📏 Size presets and variants
- 🔄 Auto-fill support (clipboard & SMS)
- ❌ Error state handling
- 🔒 Secure entry
- ⚙️ Advanced configurations

### Note
Expo Example Coming Soon!

## 📚 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pinCount` | `number` | `6` | Number of OTP digits |
| `code` | `string` | `undefined` | Controlled value for the OTP |
| `onCodeChanged` | `(code: string) => void` | `undefined` | Callback fired when any digit changes |
| `onCodeFilled` | `(code: string) => void` | `undefined` | Callback fired when all digits are filled |
| `autoFocusOnLoad` | `boolean` | `true` | Auto focus first input on mount |
| `autoFill` | `boolean` | `false` | Enable automatic OTP detection from clipboard (Android only) |
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


## 🤝 Contributing

Contributions are welcome! We'd love your help making this package better.

**[Read the Contributing Guide →](./CONTRIBUTING.md)**

Quick steps:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📄 License

MIT © Asgar

## 🙏 Acknowledgments

- Inspired by the need for a fully customizable, dependency-free OTP input component
- Built with ❤️ for the React Native community

## 📞 Support

- 📧 Email: [im.bhojaniasgar@gmail.com](mailto:im.bhojaniasgar@gmail.com)
- 🐛 Issues: [GitHub Issues](https://github.com/bhojaniasgar/react-native-otp-input/issues)

---

Made with ❤️ by Asgar

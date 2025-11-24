# Native Tabs Migration

This document describes the migration from custom tab implementation to Expo Router's native tabs.

## Changes Made

### 1. Package Dependencies Removed

The following packages were removed as they're no longer needed with native tabs:

- `@react-navigation/bottom-tabs`
- `@react-navigation/elements`
- `@react-navigation/native`
- `expo-blur`
- `expo-haptics`
- `expo-symbols`
- `@expo/vector-icons`
- `expo-device`
- `expo-image`
- `expo-web-browser`
- `react-native-worklets`

### 2. Configuration Updates

**app.json**
- Added `extra.router.nativeTabs: true` to enable native tabs

### 3. Files Removed

**Components:**
- `components/haptic-tab.tsx` - Native tabs handle haptics automatically
- `components/ui/TabBarBackground.tsx` - Native blur is built-in
- `components/ui/TabBarBackground.ios.tsx` - Native blur is built-in
- `components/ui/LiquidGlass.tsx` - Native blur is built-in
- `components/ui/icon-symbol.tsx` - Native tabs use SF Symbols directly
- `components/ui/icon-symbol.ios.tsx` - Not needed
- `components/ui/collapsible.tsx` - Unused template component
- `components/external-link.tsx` - Unused template component
- `components/hello-wave.tsx` - Unused template component
- `components/parallax-scroll-view.tsx` - Unused template component
- `components/themed-text.tsx` - Unused template component
- `components/themed-view.tsx` - Unused template component

**Hooks:**
- `hooks/use-color-scheme.ts` - Not needed with native tabs
- `hooks/use-theme-color.ts` - Unused template hook

**Constants:**
- `constants/theme.ts` - Native tabs use system colors

**Documentation:**
- `LIQUID_GLASS_IMPLEMENTATION.md` - Replaced by native implementation

### 4. Code Updates

**app/(tabs)/_layout.tsx**
- Simplified to use native Expo Router tabs
- Removed custom styling and blur effects
- Removed icon components (native tabs use SF Symbols on iOS)
- Added `headerShown: true` for each screen

**app/_layout.tsx**
- Removed `@react-navigation/native` ThemeProvider
- Simplified to basic Stack layout

**src/utils/OtpVerify.ts**
- Changed error logging to only show in production builds
- Removed verbose NativeModules logging that was cluttering console

## Benefits

1. **Smaller Bundle**: Removed ~10 unnecessary packages
2. **Native Performance**: Uses platform-native tab bars
3. **iOS Native Features**: Automatic blur, SF Symbols, haptics
4. **Simpler Code**: Less custom styling and configuration
5. **Better UX**: Native look and feel on each platform

## Running the App

Native tabs require a development build:

```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

**Note**: Native tabs are not supported in Expo Go.

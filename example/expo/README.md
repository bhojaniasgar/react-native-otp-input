# OTP Input Examples - Expo App

This is an [Expo](https://expo.dev) project showcasing various implementations of the `@bhojaniasgar/react-native-otp-input` package.

## Features

- **Native Tabs**: Uses Expo Router's native tabs for iOS and Android
- **6 Example Screens**: Basic, Custom, Auto-Fill, Sizes, Error, and Advanced
- **iOS Native UI**: Large titles, transparent headers, and system blur effects
- **Android Support**: SMS auto-fill with OTP Verify API (requires development build)

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Run on device/simulator

   For iOS (native tabs require development build):
   ```bash
   npx expo run:ios
   ```

   For Android:
   ```bash
   npx expo run:android
   ```

**Important Notes**:
- Native tabs are not supported in Expo Go
- Android SMS auto-fill requires a development build with native modules
- You need to create a development build to see the full native experience
- In Expo Go, the OTP input will work but auto-fill features will be disabled

## Project Structure

- `app/(tabs)/` - Tab screens with OTP examples
- `components/examples/` - Shared UI components (PageHeader, CodeBlock)
- `constants/` - Styling constants and configurations

## Development Builds vs Expo Go

### Expo Go (Limited Features)
- Quick testing without building
- OTP input works normally
- Android SMS auto-fill is **not available**
- You'll see warnings about native modules

### Development Build (Full Features)
- Requires building the app
- All features work including Android SMS auto-fill
- Run: `npx expo run:android` or `npx expo run:ios`

To create a development build:
```bash
# For Android
npx expo run:android

# For iOS
npx expo run:ios
```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

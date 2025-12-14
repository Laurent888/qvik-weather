# Qvik Weather

A simple weather app built with React Native and Expo.

<img src="./assets/images/qvik-weather.png" alt="Qvik Weather Screenshot" width="300" />

## Features

- 🔍 City search
- 🌡️ Current weather display
- 📅 7-day forecast
- 🌓 Dark/Light theme toggle

## Stack

- React Native & Expo
- Expo Router
- TypeScript
- TanStack React Query
- Axios
- React Native Reanimated
- Testing with Maestro

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Yarn](https://yarnpkg.com/) or npm
- [OpenWeatherMap API key](https://openweathermap.org/api) (free tier available)

### For iOS development (macOS only)

- [Xcode](https://developer.apple.com/xcode/) with iOS Simulator

### For Android development

- [Android Studio](https://developer.android.com/studio) with an emulator configured

## Getting Started

### 1. Install dependencies

```bash
yarn install
# or
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```bash
EXPO_PUBLIC_OPEN_WEATHER_API_KEY=your_api_key_here
```

You can get a free API key from [OpenWeatherMap](https://openweathermap.org/api) by signing up and subscribing to the "One Call API 3.0" plan.

### 3. Start the development server

```bash
yarn start
```

### 4. Run the app

This project uses [Expo CNG (Continuous Native Generation)](https://docs.expo.dev/workflow/continuous-native-generation/) with a development build, so Expo Go is not supported.

**On iOS Simulator (macOS only):**

```bash
yarn ios
```

**On Android Emulator:**

```bash
yarn android
```

**On physical device:**

1. Run `yarn ios --device` or `yarn android --device` to build and install on a connected device
2. Alternatively, use [EAS Build](https://docs.expo.dev/build/introduction/) to create a development build for your device

## Available Scripts

| Command        | Description                       |
| -------------- | --------------------------------- |
| `yarn start`   | Start the Expo development server |
| `yarn ios`     | Run on iOS Simulator              |
| `yarn android` | Run on Android Emulator           |
| `yarn web`     | Run in web browser                |
| `yarn lint`    | Run ESLint                        |

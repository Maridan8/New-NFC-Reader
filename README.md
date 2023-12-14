# This is the report about our working so far.

>**NOTE:** So many deprecated, no longer supported node modules and native modules, we've struggled into our work hardly.

# Comprehensive
# 1.Get started React Native TypeScript!

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

**This may seem like a silly story, but it's an important one.**

...

## ✔️Using template

```bash
npx react-native init NFC --template react-native-template-typescript[@6.12.*]
```

> Best matches with react-native-nfc-passport-reader module follow the below:

| React-native | template |
| ------------ | -------- |
| 0.70         | 6.12.\*  |
| 0.69         | 6.11.\*  |
| 0.68         | 6.10.\*  |
| 0.67         | 6.9.\*   |
| 0.66         | 6.8.\*   |
> **NOTE:** We 'll intend to install a template comes with Gradle7.0~7.2.
Because NFC modules typically have compitability with Gradle7.0~7.2.
To build or release your App, this is very important step.

> **NOTE:** After install a template, to avoide some errors, remove the "node_modules" directory.
> And then, at first, install @best-network/react-native-nfc-passport-reader before another modules (react, react-native etc.)

## ✔️Running your first App

> **Note**:Make sure that you have installed the Android Studio (or only Emulator) and followed [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)

Once you installed your first template, you can execute your first App by the following commands:

```bash
#using npm
npm run start

#in another terminal
npm run android
```

(in the case of me, Android 2022, JDK 17)

# 2.Realse App

> **NOTE:** If you are ready to release your Apk, make sure that you follow the below steps

## ✔️STEP1: Linking & Setting



``````
# navigate into android/app/src0/main/AndroidManifest.xml, insert the below:

<uses-permission android:name="android.permission.NFC" />
<uses-feature
    android:name="android.hardware.nfc"
    android:required="true" />
<application>
...
</application>
``````

## ✔️STEP2: Keytool install!

> **Note**:Make sure that you have installed keytool
> if didn't so, you can follow this- [Keytool install Guide](https://codewithandrea.com/articles/keytool-command-not-found-how-to-fix-windows-macos/)

### -Install JDK

[Download JDK](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)

### -Set Environment Variable

```
example: C:\Program Files\Java\jdk-17\bin
```

## ✔️STEP3: Perfect Release Guide!(by both the React Native CLI and Android)

> **Note**:Follow this guide!-[How to Release your App](https://instamobile.io/android-development/generate-react-native-release-build-android/)

# 3.Error Report
Here are some errors i've encountered while working on our project.

## ✔️1.Define Error (This is very general)
``````
Error: not defined "react-native-nfc-passport-reader"
Solution: create a file named with 'index.d.ts', after then, insert "" into that file.
``````
## ✔️2.Module no Match Error(This error can't find out by VS.Code Editor, caused at compile.)
``````
Error: compileSDK version not defined
Solution: Open node_modules/@better-network/react-native-nfc-passport-reader/android/build.gradle
make sure that have the following:
compileSdkVersion getExtOrIntegerDefault('compileSdkVersion')
``````
## ✔️3.'mavin' error
``````
Error: could not found  plugin with id 'mavin'
Solution: rewrite 'mavin' into 'mavin-publish'
``````
## ✔️4. no command error
``````
Error: bundle no command
Solution: 
#cmd
npm uninstall -g react-native-cli
npm uninstall -g react-native
npm install -g react-native-cli
npm install -g react-native
``````

>**NOTE:**
Three available native modules for NFC.<br>
1.react-native-nfc-card-reader<br>
2.react-native-nfc-manager<br>
3.@better-network/react-native-nfc-passport-reader<br>
I personally recommend , you are using @better-network/react-native-nfc-passport-reader.